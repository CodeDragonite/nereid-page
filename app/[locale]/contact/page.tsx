import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: t("metaTitle"),
    description: t("metaDesc"),
  });
}

export default function ContactPage() {
  return <ContactPageClient />;
}
