import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Night Game Athletics Command Privacy Policy",
  description: "Privacy information for Night Game Athletics Command on the Play Store.",
};

export default async function NightGameAthleticsCommandPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col px-6 py-16 text-slate-900 dark:text-slate-100 sm:px-8 lg:px-12">
      <article className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 sm:p-10">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400">Play Store Privacy Information</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy for Night Game Athletics Command</h1>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Effective Date: June 19, 2026 (Draft)</p>

        <div className="mt-8 space-y-8 text-base leading-7 text-slate-700 dark:text-slate-200">
          <p>
            Night Game Athletics Command ("we," "our," or "the App") is committed to protecting your privacy. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you use our mobile application.
          </p>

          <section>
            <h2 className="text-xl font-semibold">1. Zero Data Collection</h2>
            <p className="mt-3">We believe that your tactical practice plans and team data are yours alone.</p>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                <strong>No Personal Information:</strong> The App does not collect, require, or transmit any personally identifiable information (PII) such as your name, email address, phone number, or location.
              </li>
              <li>
                <strong>No Usage Tracking:</strong> We do not use third-party analytics, tracking pixels, or any software designed to monitor your behavior or usage patterns within the App.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. Local Data Storage</h2>
            <p className="mt-3">All data created within the App—including practice schedules, drill details, and custom templates—is stored <strong>locally and exclusively</strong> on your mobile device.</p>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                <strong>No Cloud Sync:</strong> We do not host servers or cloud storage for your data in this version of the App.
              </li>
              <li>
                <strong>Data Deletion:</strong> If you delete the App or clear its storage cache via your device settings, all your saved practice plans and data will be permanently erased. We cannot recover this data for you as we never have access to it.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Permissions and Their Use</h2>
            <p className="mt-3">To provide a professional-grade coaching experience, the App requires specific Android permissions:</p>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                <strong>POST_NOTIFICATIONS:</strong> Used solely to alert you when a practice period transitions or a timer ends.
              </li>
              <li>
                <strong>FOREGROUND_SERVICE &amp; FOREGROUND_SERVICE_SPECIAL_USE:</strong> Required to ensure the practice timer remains accurate and continues to run if you navigate away from the App, lock your screen, or use other tactical tools during practice. This ensures you never lose track of time in a high-intensity environment.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Third-Party Services</h2>
            <p className="mt-3">The App does not contain advertisements and does not share any information with third-party service providers.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Children&apos;s Privacy</h2>
            <p className="mt-3">Our App is designed for use by sports coaches and athletic staff. It does not knowingly collect any information from children under the age of 13, in compliance with the Children&apos;s Online Privacy Protection Act (COPPA).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Security</h2>
            <p className="mt-3">Since all data remains on your physical device, the security of your practice plans depends on the security measures (such as PIN, biometric lock, or encryption) you have enabled on your mobile device.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Changes to This Privacy Policy</h2>
            <p className="mt-3">We may update our Privacy Policy from time to time. Any changes will be reflected in a new version of the App and an updated "Effective Date" at the top of this policy. We encourage you to review this policy periodically.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. Contact Us</h2>
            <p className="mt-3">
              If you have any questions or suggestions about our Privacy Policy, contact us at:{" "}
              <a
                className="text-cyan-700 underline decoration-cyan-500/60 underline-offset-4 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
                href="mailto:hello@nereidsystems.com"
              >
                hello@nereidsystems.com
              </a>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
