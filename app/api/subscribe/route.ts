import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { CONTACT_EMAILS } from "@/lib/site-config";
import { SITE_URL } from "@/lib/seo";
import { checkRateLimit, clientKeyFromHeaders } from "@/lib/rate-limit";

/**
 * Lead capture for the Scope & Price Estimator and the homepage magnet.
 *
 * Replaces a handler that POSTed to a hardcoded Formspree placeholder and
 * reported success without sending anything. The governing rule (constraint
 * C-009 / FR-002) is that success means *delivered to Resend* — never merely
 * attempted. Every degraded path returns a structured, non-200 response so the
 * client can surface a real fallback instead of a false "check your inbox".
 */

// The Resend SDK is not edge-safe.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_ELAPSED_MS = 1500;

const subscribeSchema = z.object({
  email: z.string().email().max(254),
  locale: z.enum(["es", "en"]).optional(),
  source: z.string().min(1).max(64).optional(),
  service: z.string().max(64).optional(),
  /** Honeypot: must be empty. Real users never see it. */
  hp: z.string().max(200).optional(),
  /** Milliseconds between form render and submit. */
  elapsedMs: z.number().int().nonnegative().optional(),
});

type ErrorCode = "invalid_payload" | "rate_limited" | "unavailable" | "send_failed";

function fail(code: ErrorCode, status: number) {
  return NextResponse.json({ ok: false, code }, { status });
}

/** Silently accept and drop. Returning an error would teach bots which field tripped. */
function dropSilently() {
  return NextResponse.json({ ok: true }, { status: 200 });
}

type Locale = "es" | "en";

function resourceUrl(locale: Locale) {
  return `${SITE_URL}/${locale}/resources/it-audit-checklist`;
}

function buildSubscriberEmail(locale: Locale, service?: string) {
  const link = resourceUrl(locale);

  if (locale === "en") {
    return {
      subject: "Your scope checklist, and what comes next",
      html: `
        <div style="font-family:sans-serif;line-height:1.6;color:#1a1a1a;max-width:560px">
          <p>Thanks — you're on the list.</p>
          <p>
            Your <strong>IT Audit Checklist</strong> is here:
            <a href="${link}">${link}</a>
          </p>
          <p>
            It is a working document, not a brochure. Work through it before your next
            infrastructure decision and you will know exactly which questions to ask.
          </p>
          ${service ? `<p>You asked about <strong>${service}</strong>. The service page has the published starting price and what it excludes.</p>` : ""}
          <p>
            Next step is a 30-minute call where you leave with a written fixed price.
            Just reply to this email and we will find a time.
          </p>
          <p style="color:#666;font-size:13px">
            Nereid Systems · <a href="mailto:${CONTACT_EMAILS.hello}">${CONTACT_EMAILS.hello}</a>
          </p>
        </div>
      `,
    };
  }

  return {
    subject: "Tu lista de verificación, y qué sigue",
    html: `
      <div style="font-family:sans-serif;line-height:1.6;color:#1a1a1a;max-width:560px">
        <p>Gracias — ya estás en la lista.</p>
        <p>
          Tu <strong>Lista de Verificación de Auditoría de TI</strong> está aquí:
          <a href="${link}">${link}</a>
        </p>
        <p>
          Es un documento de trabajo, no un folleto. Revísalo antes de tu próxima decisión
          de infraestructura y sabrás exactamente qué preguntas hacer.
        </p>
        ${service ? `<p>Preguntaste por <strong>${service}</strong>. La página del servicio tiene el precio inicial publicado y qué no incluye.</p>` : ""}
        <p>
          El siguiente paso es una llamada de 30 minutos donde sales con un precio fijo por
          escrito. Solo responde a este correo y coordinamos.
        </p>
        <p style="color:#666;font-size:13px">
          Nereid Systems · <a href="mailto:${CONTACT_EMAILS.hello}">${CONTACT_EMAILS.hello}</a>
        </p>
      </div>
    `,
  };
}

function buildOwnerEmail(data: {
  email: string;
  locale: Locale;
  source: string;
  service?: string;
}) {
  return {
    subject: `[Lead] ${data.service ?? data.source} — ${data.email}`,
    html: `
      <div style="font-family:sans-serif;line-height:1.6">
        <h2>New lead</h2>
        <p><b>Email:</b> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><b>Locale:</b> ${data.locale}</p>
        <p><b>Source:</b> ${data.source}</p>
        ${data.service ? `<p><b>Service of interest:</b> ${data.service}</p>` : ""}
      </div>
    `,
  };
}

/** One greppable line per outcome. Never logs the full address. */
function logEvent(event: Record<string, unknown>) {
  console.log(JSON.stringify({ evt: "subscribe", ts: new Date().toISOString(), ...event }));
}

function emailDomain(email: string) {
  const at = email.lastIndexOf("@");
  return at === -1 ? "unknown" : email.slice(at + 1);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("invalid_payload", 400);
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) return fail("invalid_payload", 400);

  const { email: rawEmail, hp, elapsedMs } = parsed.data;
  const email = rawEmail.trim().toLowerCase();
  const locale: Locale = parsed.data.locale ?? "es";
  const source = parsed.data.source ?? "homepage";
  const service = parsed.data.service;

  // --- Bot guards. Both drop silently rather than revealing which tripped. ---
  if (hp && hp.length > 0) {
    logEvent({ ok: true, dropped: "honeypot", source, locale });
    return dropSilently();
  }
  if (typeof elapsedMs === "number" && elapsedMs < MIN_ELAPSED_MS) {
    logEvent({ ok: true, dropped: "too_fast", source, locale });
    return dropSilently();
  }

  // --- Rate limit ---
  const limit = checkRateLimit(clientKeyFromHeaders(req.headers));
  if (!limit.allowed) {
    logEvent({ ok: false, code: "rate_limited", source, locale, retryAfterMs: limit.retryAfterMs });
    return fail("rate_limited", 429);
  }

  // --- Configuration. Fail loudly: this is the bug that started all of this. ---
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[subscribe] MISCONFIGURED: RESEND_API_KEY is not set");
    logEvent({ ok: false, code: "unavailable", source, locale, reason: "missing_api_key" });
    return fail("unavailable", 503);
  }

  const resend = new Resend(apiKey);
  const template = buildSubscriberEmail(locale, service);

  // --- Subscriber email. Must be confirmed before success is reported. ---
  let resendId: string | undefined;
  try {
    const { data, error } = await resend.emails.send({
      from: CONTACT_EMAILS.from,
      to: email,
      replyTo: CONTACT_EMAILS.hello,
      subject: template.subject,
      html: template.html,
    });

    // The SDK does not always throw — a returned error is still a failure.
    if (error) {
      console.error("[subscribe] resend returned an error:", error);
      logEvent({ ok: false, code: "send_failed", source, locale, reason: "resend_error" });
      return fail("send_failed", 500);
    }
    resendId = data?.id;
  } catch (err) {
    console.error("[subscribe] resend threw:", err);
    logEvent({ ok: false, code: "send_failed", source, locale, reason: "resend_threw" });
    return fail("send_failed", 500);
  }

  // --- Optional suppression list. Only when an audience is configured. ---
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (audienceId) {
    try {
      await resend.contacts.create({ audienceId, email, unsubscribed: false });
    } catch {
      // Duplicate contact or audience misconfiguration must not fail the signup.
    }
  }

  // --- Owner notification. Fire-and-forget: its failure never affects the subscriber. ---
  const owner = buildOwnerEmail({ email, locale, source, service });
  void resend.emails
    .send({
      from: CONTACT_EMAILS.from,
      to: CONTACT_EMAILS.notify,
      replyTo: email,
      subject: owner.subject,
      html: owner.html,
    })
    .catch((err) => console.error("[subscribe] owner notification failed:", err));

  logEvent({
    ok: true,
    source,
    locale,
    service,
    resendId,
    domain: emailDomain(email),
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
