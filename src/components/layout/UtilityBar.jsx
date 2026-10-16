import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { site } from "@/config/site";
import { toTelHref } from "@/lib/contact";

/**
 * Top utility bar visible on desktop (xl and up).
 */
export function UtilityBar() {
  const { t } = useTranslation();

  return (
    <div
      data-tone="inverse"
      className="hidden h-9 border-b border-white/10 bg-surface-inverse-deep text-sm xl:block"
    >
      <Container className="h-full">
        <div className="flex h-full items-center justify-between text-xs">
          {/* Left: Contact methods */}
          <div className="flex items-center gap-6">
            {site.contact.email && (
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex min-h-9 items-center gap-2 text-fg-inverse-muted transition-colors hover:text-white hover:underline"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{site.contact.email}</span>
              </a>
            )}
            {site.contact.phone && (
              <a
                href={toTelHref(site.contact.phone)}
                className="inline-flex min-h-9 items-center gap-2 text-fg-inverse-muted transition-colors hover:text-white hover:underline"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{site.contact.phone}</span>
              </a>
            )}
          </div>

          {/* Right: Theme toggle, Language switcher, Contact, Sign in */}
          <div className="flex items-center gap-5">
            <ThemeToggle variant="onDark" size="sm" />
            <LanguageSwitcher variant="onDark" />
            <NavLink
              to="/contact"
              className="inline-flex min-h-9 items-center text-fg-inverse-muted transition-colors hover:text-white hover:underline"
            >
              {t("nav.contact")}
            </NavLink>
            <a
              href={site.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center text-fg-inverse-muted transition-colors hover:text-white hover:underline"
            >
              {t("nav.signIn")}
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
