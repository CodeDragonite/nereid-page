import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(20),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Replace with your actual email service (Resend, SendGrid, etc.)
    // Example with Resend:
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'noreply@nereidsystems.com',
      to: 'nereidsystems@gmail.com',
      subject: `New inquiry: ${data.service} from ${data.name}`,
      // Using a template literal for better readability
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2>New Service Inquiry</h2>
          <hr />
          <p><b>Name:</b> ${data.name}</p>
          <p><b>Email:</b> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><b>Company:</b> ${data.company || 'Not provided'}</p>
          <p><b>Service:</b> ${data.service}</p>
          <br />
          <p><b>Message:</b></p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 15px; margin-left: 0;">
            ${data.message.replace(/\n/g, '<br>') /* Preserves line breaks */}
          </blockquote>
        </div>
      `
    });
    // Log for now (replace with actual send in production)
    console.log("[contact]", {
      name: data.name,
      email: data.email,
      service: data.service,
      messageLength: data.message.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    // Log details server-side only
    console.error("[contact] error:", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
