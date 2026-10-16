import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { industryProfiles } from "@/data/home-content";
import { areaIcons } from "@/data/industry-content";
import { capabilityStates, AVAILABILITY } from "@/data/feature-states";

// TODO(Debass): the capability mapping is derived only from words in each approved industry summary; confirm.
// TODO(Debass): availability badges show the placeholder state "demo-only" until each area is confirmed in feature-states.js.

/**
 * Suggested capabilities section for industry detail pages.
 *
 * @param {Object} props
 * @param {string} props.slug
 * @returns {import("react").JSX.Element}
 */
export function CapabilityList({ slug }) {
  const { t } = useTranslation();
  const profile = industryProfiles[slug] || {};
  const rawAreas = profile.areas || [];

  const visibleAreas = rawAreas.filter(
    (areaKey) => capabilityStates[areaKey] !== AVAILABILITY.HIDDEN,
  );

  return (
    <Section tone="muted" spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading
            as="h2"
            title={t("industries:detail.capabilitiesTitle")}
          />

          <ul className="grid gap-x-12 md:grid-cols-2">
            {visibleAreas.map((areaKey) => {
              const Icon = areaIcons[areaKey];
              const state = capabilityStates[areaKey];

              return (
                <li
                  key={areaKey}
                  className="flex gap-4 border-t border-line py-6"
                >
                  {Icon && (
                    <IconBadge
                      icon={Icon}
                      tone="azure"
                      size="md"
                      className="shrink-0"
                    />
                  )}
                  <div>
                    <h3 className="font-display text-xl font-semibold text-heading">
                      {t(`features:areas.${areaKey}.name`)}
                    </h3>
                    <p className="mt-1 text-fg-muted">
                      {t(`features:areas.${areaKey}.description`)}
                    </p>
                    {state !== AVAILABILITY.AVAILABLE && (
                      <div className="mt-3">
                        <AvailabilityBadge state={state} />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
