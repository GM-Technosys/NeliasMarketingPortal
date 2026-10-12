import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { HeaderCtas } from "@/components/layout/HeaderCtas";
import { cn } from "@/lib/cn";

/**
 * Full-width call-to-action band section on dark brand navy background.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.body
 * @param {import("react").ReactNode} [props.actions]
 * @param {string} [props.className]
 */
export function CtaBand({
  title,
  body,
  actions,
  className,
  id,
  "aria-labelledby": ariaLabelledBy,
  ...rest
}) {
  const headingId = ariaLabelledBy || (id ? `${id}-heading` : undefined);

  return (
    <Section
      id={id}
      tone="inverse"
      spacing="md"
      aria-labelledby={headingId}
      className={cn("relative overflow-hidden", className)}
      {...rest}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2
              id={headingId}
              className="font-display text-h2 leading-tight font-semibold tracking-tight text-white"
            >
              {title}
            </h2>
            {body && (
              <p className="mt-4 max-w-2xl text-lead leading-relaxed text-fg-inverse-muted">
                {body}
              </p>
            )}
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:col-span-5 lg:justify-end">
            {actions || <HeaderCtas location="cta-band" size="lg" onDark />}
          </div>
        </div>
      </Container>
    </Section>
  );
}
