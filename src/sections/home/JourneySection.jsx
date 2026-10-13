import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessSteps } from "@/components/patterns/ProcessSteps";

export function JourneySection() {
  const { t } = useTranslation();
  const steps = t("home:journey.steps", { returnObjects: true });

  const safeSteps = Array.isArray(steps) ? steps : [];

  return (
    <Section
      id="journey"
      tone="tint"
      spacing="lg"
      aria-labelledby="journey-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            as="h2"
            id="journey-heading"
            align="center"
            title={t("home:journey.title")}
          />
        </Reveal>

        <Reveal delay={90}>
          <ProcessSteps
            steps={safeSteps}
            columns={4}
            animated={true}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
