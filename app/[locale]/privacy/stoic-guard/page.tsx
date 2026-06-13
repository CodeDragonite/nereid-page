import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Stoic Guard Privacy Policy",
  description: "Privacy information for Stoic Guard on the Play Store.",
};

export default async function StoicGuardPrivacyPage({
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
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy for Stoic Guard</h1>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Last updated: June 13, 2026</p>

        <div className="mt-8 space-y-6 text-base leading-7 text-slate-700 dark:text-slate-200">
          <p>
            Stoic Guard does not collect, transmit, or share any personal data. All app usage data is processed entirely on your device and is never sent to any server or third party.
          </p>

          <section>
            <h2 className="text-xl font-semibold">Permissions used</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                <strong>Usage Access:</strong> to measure time spent in tracked apps. This data stays on your device.
              </li>
              <li>
                <strong>Accessibility Service:</strong> to detect the foreground app and enforce time limits. No input is logged.
              </li>
              <li>
                <strong>Post Notifications:</strong> to deliver the Daily Review reminder at your chosen time.
              </li>
              <li>
                <strong>Schedule Exact Alarm:</strong> to fire the Daily Review notification at the correct time.
              </li>
            </ul>
          </section>

          <p>
            If you have questions, contact: <a className="text-cyan-700 underline decoration-cyan-500/60 underline-offset-4 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200" href="mailto:hello@nereidsystems.com">hello@nereidsystems.com</a>
          </p>
        </div>
      </article>
    </main>
  );
}
