import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata, TITLE_TEMPLATE } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Upcoming" });
  return {
    ...buildPageMetadata({
      locale,
      path: "/upcoming",
      title: t("metaTitle"),
      description: t("metaDesc"),
    }),
    // Re-stash the brand template for any child route that defines its own title.
    title: { default: t("metaTitle"), template: TITLE_TEMPLATE },
  };
}

export default function UpcomingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
