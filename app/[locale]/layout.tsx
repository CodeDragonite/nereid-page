import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "../globals.css";

const metadataBase = new URL("https://nereidsystems.com");

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const alternates = routing.locales.reduce((map, code) => {
    map[code] = `${metadataBase.origin}/${code}`;
    return map;
  }, {} as Record<string, string>);

  return {
    metadataBase,
    title: {
      default: "Nereid Systems — Full-Stack Development & IT Management",
      template: "%s | Nereid Systems",
    },
    description:
      "Full-stack development, AI automation, and IT management for companies that want to focus on their business—not their infrastructure.",
    openGraph: {
      siteName: "Nereid Systems",
      type: "website",
      images: [
        {
          url: "/nereid-logo.png",
          width: 1200,
          height: 630,
          alt: "Nereid Systems",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nereid Systems — Full-stack development & IT management",
      description:
        "Full-stack development, AI automation, and IT management for companies that want to focus on their business—not their infrastructure.",
      images: ["/nereid-logo.png"],
    },
    verification: {
      google: "LidLJwBfYULmSxre9UO2fhZLFWJXTI_CYsUahF6HGUQ",
      other: {
        "msvalidate.01": "E790E7EA591EFA0B0F3F186A288FDCB8",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${metadataBase.origin}/${locale}`,
      languages: alternates,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://calendly.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "Nereid Systems",
                  "url": "https://nereidsystems.com",
                  "logo": "https://nereidsystems.com/nereid-logo.png",
                },
                {
                  "@type": "WebSite",
                  "url": "https://nereidsystems.com",
                  "name": "Nereid Systems",
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <a href="#main-content" className="skip-link">
              {locale === "es" ? "Ir al contenido principal" : "Skip to main content"}
            </a>
            <Navbar />
            <div id="main-content">{children}</div>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
