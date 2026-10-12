import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Modal } from "@/components/ui/Modal";
import { TextLink } from "@/components/ui/TextLink";
import { Reveal } from "@/components/ui/Reveal";
import { CapabilityCard } from "./CapabilityCard";
import { capabilityCards } from "@/data/home-content";

// TODO(Debass): the PDF promises a "plain-language use case" per card but supplies none. The shared capability sentence is a stand-in, and Customers/Sales (and Purchasing/Inventory) show the same stand-in sentence.
export function CapabilitiesSection() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(null);

  const activeCard = capabilityCards.find((card) => card.id === activeId) || null;

  return (
    <Section
      id="capabilities"
      tone="default"
      spacing="lg"
      aria-labelledby="capabilities-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="capabilities-heading"
            title={t("home:capabilities.title")}
          />
        </Reveal>

        <Reveal delay={120}>
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

        {/* Single shared use-case modal */}
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
                {hasPoints ? (
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                    {points.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2.5 text-base font-medium text-navy-900"
                      >
                        <span
                          className="h-2 w-2 shrink-0 rounded-full bg-azure-500"
                          aria-hidden="true"
                        />
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
                    onClick={() => setActiveId(null)}
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
