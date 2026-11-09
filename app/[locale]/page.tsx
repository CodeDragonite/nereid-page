import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { KineticTicker } from "@/components/home/KineticTicker";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { UpcomingPreview } from "@/components/home/UpcomingPreview";
import { LeadMagnet } from "@/components/home/LeadMagnet";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildPageMetadata({
    locale,
    path: "/",
    title: { absolute: t("homeTitle") },
    description: t("homeDescription"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <KineticTicker />
      <ServicesGrid />
      <UpcomingPreview />
      <LeadMagnet />
    </>
  );
}
