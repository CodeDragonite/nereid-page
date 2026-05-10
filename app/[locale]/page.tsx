import { HeroSection } from "@/components/home/HeroSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { SocialProof } from "@/components/home/SocialProof";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { UpcomingPreview } from "@/components/home/UpcomingPreview";
import { LeadMagnet } from "@/components/home/LeadMagnet";

export default function HomePage() {
  return (
    <>
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
