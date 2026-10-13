import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ScenarioSection } from "./ScenarioSection";

/**
 * Problem section highlighting fragmented business tools and visibility challenges.
 * Follows PDF Section 3 copy as skeleton, embedding the ScenarioSection interactive module.
 */
export function ProblemSection() {
  const { t } = useTranslation();

  return (
    <Section
      id="problem"
      tone="tint"
      spacing="lg"
      aria-labelledby="problem-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            as="h2"
            id="problem-heading"
            title={t("home:problem.title")}
            lead={t("home:problem.body")}
            leadClassName="max-w-none"
          />

          <div className="mt-10 md:mt-14">
            <ScenarioSection />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
