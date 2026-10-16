import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/TextLink";
import { Reveal } from "@/components/ui/Reveal";
import { CapabilityCard } from "./CapabilityCard";
import { capabilityCards } from "@/data/home-content";

export function CapabilitiesSection() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(null);

  const activeCard =
    capabilityCards.find((card) => card.id === activeId) || null;

  return (
    <Section
      id="capabilities"
      tone="tint"
      spacing="lg"
      aria-labelledby="capabilities-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            as="h2"
            id="capabilities-heading"
            title={t("home:capabilities.title")}
            lead={t("home:capabilities.lead")}
          />
        </Reveal>

        <Reveal delay={90}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {capabilityCards.map((card) => (
              <CapabilityCard
                key={card.id}
                id={card.id}
                icon={card.icon}
                onClick={() => setActiveId(card.id)}
              />
            ))}
          </div>
        </Reveal>

        {/* Modal with bullet points in 2 columns (two in each row) */}
        <Modal
          open={Boolean(activeCard)}
          onClose={() => setActiveId(null)}
          title={activeCard ? t(`home:capabilities.items.${activeCard.id}.title`) : ""}
          size="md"
        >
          {activeCard && (() => {
            const points = t(`home:capabilities.items.${activeCard.id}.points`, {
              returnObjects: true,
              defaultValue: [],
            });
            const hasPoints = Array.isArray(points) && points.length > 0;

            return (
              <div className="space-y-6">
                <div>
                  <Badge tone="info" size="sm" className="mb-3">
                    {t(`features:areas.${activeCard.area}.name`)}
                  </Badge>
                  <p className="text-sm text-fg-muted mb-4">
                    {t(`features:areas.${activeCard.area}.description`)}
                  </p>
                </div>

                {hasPoints ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                    {points.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2.5 text-base font-semibold text-heading"
                      >
                        <span
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-tint text-link border border-accent-line"
                          aria-hidden="true"
                        >
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base text-fg-muted leading-relaxed">
                    {t(`features:areas.${activeCard.area}.description`)}
                  </p>
                )}

                <div className="pt-2">
                  <TextLink
                    to="/features"
                    onClick={() => {
                      setActiveId(null);
                    }}
                  >
                    {t("home:capabilities.modalLink")}
                  </TextLink>
                </div>
              </div>
            );
          })()}
        </Modal>
      </Container>
    </Section>
  );
}
