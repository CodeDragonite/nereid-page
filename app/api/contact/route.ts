import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { CONTACT_EMAILS } from "@/lib/site-config";

/**
 * Contact / service-inquiry handler.
 *
 * The previous version awaited `resend.emails.send` and threw its result away:
 * a returned error object was ignored, `{ ok: true }` was returned with a 200
 * regardless, and every thrown error collapsed into a 400. The form therefore
 * told visitors their message had been sent even when nothing was delivered,
 * and reported a server misconfiguration as if the visitor had typed something
 * wrong. Constraint C-009 / FR-004: success means *confirmed delivered*, and a
 * missing or placeholder configuration must fail loudly.
 */

// The Resend SDK is not edge-safe.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email().max(254),
  company: z.string().max(200).optional(),
  service: z.string().min(1).max(100),
  message: z.string().min(20).max(5000),
});

type ErrorCode = "invalid_payload" | "unavailable" | "send_failed";

function fail(code: ErrorCode, status: number) {
  return NextResponse.json({ ok: false, code }, { status });
}

/**
 * Escape interpolated values before they land in the notification HTML.
 * The payload is attacker-influenced, so treating it as markup would let a
 * submitter inject arbitrary content into the inbox rendering.
 */
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("invalid_payload", 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return fail("invalid_payload", 400);

  const data = parsed.data;

  // --- Configuration. Fail loudly rather than pretending the message sent. ---
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] MISCONFIGURED: RESEND_API_KEY is not set");
    return fail("unavailable", 503);
  }

  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
      <h2>New Service Inquiry</h2>
      <hr />
      <p><b>Name:</b> ${esc(data.name)}</p>
      <p><b>Email:</b> <a href="mailto:${esc(data.email)}">${esc(data.email)}</a></p>
      <p><b>Company:</b> ${esc(data.company || "Not provided")}</p>
      <p><b>Service:</b> ${esc(data.service)}</p>
      <br />
      <p><b>Message:</b></p>
      <blockquote style="border-left: 4px solid #ccc; padding-left: 15px; margin-left: 0;">
        ${esc(data.message).replace(/\n/g, "<br>")}
      </blockquote>
    </div>
  `;

  // --- Delivery. Must be confirmed before success is reported. ---
  try {
    const { data: sent, error } = await resend.emails.send({
      from: CONTACT_EMAILS.from,
      to: CONTACT_EMAILS.notify,
      replyTo: CONTACT_EMAILS.hello,
      subject: `New inquiry: ${data.service} from ${data.name}`,
      html,
    });

    // The SDK does not always throw — a returned error is still a failure.
    if (error) {
      console.error("[contact] resend returned an error:", error);
      return fail("send_failed", 500);
    }

    console.log("[contact]", {
      name: data.name,
      email: data.email,
      service: data.service,
      messageLength: data.message.length,
      resendId: sent?.id,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    // A transport failure is a server problem, not a client validation error.
    console.error("[contact] resend threw:", err);
    return fail("send_failed", 500);
  }
}
