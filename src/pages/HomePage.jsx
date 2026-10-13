import { Seo } from "@/components/common/Seo";
import { HomeHero } from "@/sections/home/HomeHero";
import { ProblemSection } from "@/sections/home/ProblemSection";
import { HomeApproachSection } from "@/sections/home/HomeApproachSection";
import { CapabilitiesSection } from "@/sections/home/CapabilitiesSection";
import { IndustrySelectorSection } from "@/sections/home/IndustrySelectorSection";
import { JourneySection } from "@/sections/home/JourneySection";
import { ProductPreviewSection } from "@/sections/home/ProductPreviewSection";
import { HomeFinalCta } from "@/sections/home/HomeFinalCta";

/**
 * Home page for the NELIAS marketing portal.
 * Follows PDF Section 3 skeleton with embedded V3 interactive modules.
 */
export default function HomePage() {
  return (
    <>
      <Seo pageKey="home" />
      <HomeHero />
      <ProblemSection />
      <HomeApproachSection />
      <CapabilitiesSection />
      <IndustrySelectorSection />
      <JourneySection />
      <ProductPreviewSection />
      <HomeFinalCta />
    </>
  );
}
