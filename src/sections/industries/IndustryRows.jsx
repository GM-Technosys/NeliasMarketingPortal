import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { industries } from "@/data/industries";
import { industryProfiles } from "@/data/home-content";
import { track, EVENTS } from "@/lib/analytics";

/**
 * List of industry rows for the Industries landing page.
 *
 * @returns {import("react").JSX.Element}
 */
export function IndustryRows() {
  const { t } = useTranslation();

  return (
    <Section tone="default" spacing="lg">
      <Container>
        <Reveal>
          <ul className="divide-y divide-line border-y border-line">
            {industries.map((slug) => {
              const Icon = industryProfiles[slug]?.icon;
              const name = t(`industries:items.${slug}.name`);
              const summary = t(`industries:items.${slug}.summary`);

              return (
                <li
                  key={slug}
                  className="group/row relative -mx-4 grid items-center gap-4 rounded-lg px-4 py-7 transition-colors hover:bg-surface-tint sm:-mx-5 sm:px-5 md:grid-cols-12 md:gap-8 md:py-9 has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus"
                >
                  {/* Name cell */}
                  <div className="flex items-center gap-4 md:col-span-5">
                    {Icon && (
                      <IconBadge
                        icon={Icon}
                        size="lg"
                        tone="azure"
                        className="shrink-0"
                      />
                    )}
                    <h2 className="font-display text-h3 font-semibold text-heading">
                      <Link
                        to={`/industries/${slug}`}
                        onClick={() =>
                          track(EVENTS.NAV_CLICK, { key: "industry", slug })
                        }
                        className="after:absolute after:inset-0 hover:underline underline-offset-4"
                      >
                        {name}
                        <span className="sr-only">
                          {" "}
                          {t("industries:landing.viewIndustry", { name })}
                        </span>
                      </Link>
                    </h2>
                  </div>

                  {/* Summary cell */}
                  <div className="md:col-span-6">
                    <p className="text-fg-muted">{summary}</p>
                  </div>

                  {/* Affordance */}
                  <div
                    aria-hidden="true"
                    className="grid h-11 w-11 place-items-center justify-self-end rounded-full border border-line-strong text-fg-subtle transition-colors group-hover/row:border-accent group-hover/row:text-link md:col-span-1"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
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
