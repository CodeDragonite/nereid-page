import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TITLE_TEMPLATE } from "@/lib/seo";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif-display",
  display: "swap",
});

const metadataBase = new URL("https://nereidsystems.com");

/**
 * The six published services, in the same order the hub renders them.
 * Names are read from the localized `Services` messages so the JSON-LD catalogue
 * always matches the offers a visitor can see in the same language.
 */
const SERVICE_IDS = ["network", "web", "mobile", "integration", "ai", "it"] as const;

type MessageTree = { [key: string]: string | MessageTree | undefined };

function serviceOffers(messages: unknown) {
  const services = (messages as MessageTree | undefined)?.Services as
    | MessageTree
    | undefined;

  return SERVICE_IDS.map((id) => {
    const entry = services?.[id];
    const title =
      typeof entry === "object" && entry !== null ? entry.title : undefined;

    return {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: typeof title === "string" ? title : id,
      },
    };
  });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const homeTitle = t("homeTitle");
  const homeDescription = t("homeDescription");

  return {
    metadataBase,
    title: {
      default: homeTitle,
      template: TITLE_TEMPLATE,
    },
    description: homeDescription,
    openGraph: {
      siteName: "Nereid Systems",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: homeTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: homeTitle,
      description: homeDescription,
      images: ["/og-image.png"],
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

  // FR-028: never assert a region the business does not serve. Panama is the home
  // market (Spanish copy); the English page advertises remote delivery instead.
  // ASSUMPTION: "Worldwide" still needs the owner's confirmation before deploy.
  const areaServed = locale === "es" ? "Panamá" : "Worldwide";

  return (
    <html lang={locale} suppressHydrationWarning className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
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
                  "inLanguage": locale,
                },
                {
                  "@type": "ProfessionalService",
                  "name": "Nereid Systems",
                  "url": "https://nereidsystems.com",
                  "image": "https://nereidsystems.com/nereid-logo.png",
                  "email": "hello@nereidsystems.com",
                  "priceRange": "$$",
                  "description":
                    "Full-stack development, AI automation, and IT management for companies that want to focus on their business—not their infrastructure.",
                  "areaServed": areaServed,
                  "availableLanguage": ["Spanish", "English"],
                  "knowsAbout": [
                    "Full-Stack Web Development",
                    "Mobile App Development",
                    "AI Automation & LLM Integration",
                    "Cloud Network Infrastructure",
                    "Enterprise IT Management"
                  ],
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Services",
                    "itemListElement": serviceOffers(messages),
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ScrollProgress />
            <a href="#main-content" className="skip-link">
              {locale === "es" ? "Ir al contenido principal" : "Skip to main content"}
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
