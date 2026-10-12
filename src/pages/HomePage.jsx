import { Seo } from "@/components/common/Seo";
import { HomeHero } from "@/sections/home/HomeHero";
import { ScenarioSection } from "@/sections/home/ScenarioSection";
import { CapabilitiesSection } from "@/sections/home/CapabilitiesSection";
import { IndustrySelectorSection } from "@/sections/home/IndustrySelectorSection";
import { JourneySection } from "@/sections/home/JourneySection";
import { ProductPreviewSection } from "@/sections/home/ProductPreviewSection";
import { HomeFinalCta } from "@/sections/home/HomeFinalCta";

/**
 * Home page for the NELIAS marketing portal.
 * Renders all seven sections following the V3 commercial vision.
 */
export default function HomePage() {
  return (
    <>
      <Seo pageKey="home" />
      <HomeHero />
      <ScenarioSection />
      <CapabilitiesSection />
      <IndustrySelectorSection />
      <JourneySection />
      <ProductPreviewSection />
      <HomeFinalCta />
    </>
  );
}
