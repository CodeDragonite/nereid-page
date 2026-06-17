import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Stoic Guard Accessibility Validation",
  description: "Accessibility service demonstration for Stoic Guard Google Play validation.",
};

export default async function AccessibilityValidationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col px-6 py-16 text-slate-900 dark:text-slate-100 sm:px-8 lg:px-12">
      <article className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 sm:p-10">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400">Google Play Validation</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Accessibility Service Demonstration</h1>
        <p className="mt-4 text-base text-slate-700 dark:text-slate-200">
          This video demonstrates how Stoic Guard uses the Accessibility Service to detect the foreground application and enforce user-defined time limits.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-lg dark:border-slate-800">
          <video 
            src="/accesibility-video.webm" 
            controls 
            className="w-full aspect-video"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="mt-8 space-y-4 text-sm text-slate-500 dark:text-slate-400">
          <p>
            <strong>App Name:</strong> Stoic Guard
          </p>
          <p>
            <strong>Purpose:</strong> This demonstration is provided for the Google Play review team to verify compliance with Accessibility Service policies.
          </p>
        </div>
      </article>
    </main>
  );
}
