import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ServicesPageClient } from "@/components/services/ServicesPageClient";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    openGraph: { title: t("metaTitle"), description: t("metaDesc") },
  };
}

const serviceConfig = [
  { id: "network", icon: "Network", color: "#00d2d2" },
  { id: "web",     icon: "Globe",   color: "#3d7fff" },
  { id: "mobile",  icon: "Smartphone", color: "#a78bfa" },
  { id: "integration", icon: "Layers", color: "#fb923c" },
  { id: "ai",      icon: "Bot",     color: "#34d399" },
  { id: "it",      icon: "Server",  color: "#f472b6" },
] as const;

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Services" });

  const services = serviceConfig.map(({ id, icon, color }) => ({
    id,
    icon,
    color,
    title: t(`${id}.title`),
    outcome: t(`${id}.outcome`),
    scope: t(`${id}.scope`),
    timeline: t(`${id}.timeline`),
    stack: t(`${id}.stack`),
    price: t(`${id}.price`),
    cta: t(`${id}.cta`),
  }));

  return <ServicesPageClient services={services} />;
}
