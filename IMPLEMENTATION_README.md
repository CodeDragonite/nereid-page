# Mail and Messaging Implementation Guide

This guide covers setting up email sending, contact forms, and messaging integrations for Nereid Systems website.

## Email Service Setup

### Option 1: Resend (Recommended)

1. **Sign up for Resend**:
   - Go to [resend.com](https://resend.com)
   - Create account and verify domain

2. **Install Resend SDK**:
   ```bash
   npm install resend
   ```

3. **Environment Variables**:
   Add to `.env.local`:
   ```
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Update Contact API** (`app/api/contact/route.ts`):
   ```typescript
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function POST(req: NextRequest) {
     // ... existing validation ...

     await resend.emails.send({
       from: 'noreply@nereidsystems.com',
       to: 'hello@nereidsystems.com',
       subject: `New inquiry: ${data.service}`,
       html: `
         <h2>New Contact Form Submission</h2>
         <p><strong>From:</strong> ${data.name} (${data.email})</p>
         <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
         <p><strong>Service:</strong> ${data.service}</p>
         <p><strong>Message:</strong></p>
         <p>${data.message}</p>
       `,
     });

     return NextResponse.json({ ok: true }, { status: 200 });
   }
   ```

### Option 2: SendGrid

1. **Sign up and get API key** from SendGrid dashboard
2. **Install SDK**:
   ```bash
   npm install @sendgrid/mail
   ```
3. **Configure** similar to Resend but with SendGrid's API

## Calendly Integration

### Setup Calendly Embed

1. **Create Calendly account** and scheduling links
2. **Update environment variables**:
   ```
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/nereidsystems/15min
   ```
3. **Contact page** already has Calendly embed placeholder

## Contact Form Enhancements

### Rate Limiting

Add rate limiting to prevent spam:

```typescript
// Install @upstash/ratelimit
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  // ... rest of the code
}
```

### Form Validation

Using Zod (already installed):

```typescript
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});
```

## Newsletter Signup

For the upcoming projects notification:

1. **Choose service**: Mailchimp, ConvertKit, or Resend audiences
2. **API integration**: Add `/api/newsletter/route.ts`
3. **Form handling**: Update upcoming page with actual submission

## Cloudflare-Specific Setup

Since deploying to Cloudflare:

1. **Environment variables**: Set in Cloudflare dashboard or via `wrangler secret put`
2. **Email domains**: Verify domain in Resend for Cloudflare
3. **Rate limiting**: Use Cloudflare Workers KV for rate limiting instead of Upstash

## Testing

1. **Local testing**: Use Ethereal Email for testing email sends
2. **Form testing**: Test all validation scenarios
3. **Rate limiting**: Test with multiple submissions
4. **Calendly**: Ensure embed loads correctly

## Security Considerations

- **Input sanitization**: Use DOMPurify for any HTML content
- **CORS**: Configure appropriate CORS headers
- **Spam protection**: Implement hCaptcha or similar
- **Data privacy**: Ensure GDPR compliance for contact data

## Monitoring

- **Error tracking**: Set up Sentry or similar for API errors
- **Analytics**: Track form submissions and email metrics
- **Performance**: Monitor API response times