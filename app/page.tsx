import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { SocialProof } from "@/components/home/SocialProof";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { UpcomingPreview } from "@/components/home/UpcomingPreview";
import { LeadMagnet } from "@/components/home/LeadMagnet";

export const metadata: Metadata = {
  title: "Nereid Systems — Full-Stack Development & IT Management",
  description:
    "Full-stack development, AI automation, and IT management for companies that want to focus on their business—not their infrastructure.",
  openGraph: {
    title: "Nereid Systems — Full-Stack Development & IT Management",
    description:
      "We build what's next. Full-stack dev, AI automation, and IT management for growing companies.",
    url: "https://nereidsystems.com",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Nereid Systems",
            url: "https://nereidsystems.com",
          }),
        }}
      />
      <HeroSection />
      <ServicesGrid />
      <SocialProof />
      <Testimonials />
      <PortfolioPreview />
      <UpcomingPreview />
      <LeadMagnet />
    </>
  );
}
