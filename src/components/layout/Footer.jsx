import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/common/Logo";
import { footerNav } from "@/config/navigation";
import { site } from "@/config/site";
import { toTelHref, toWhatsAppHref } from "@/lib/contact";

/**
 * Site footer with brand ribbon, plate logo, explore links, and contact channels.
 */
export function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="site-footer" data-tone="inverse" className="relative bg-brand-deep text-fg-inverse">
      {/* 4px top brand ribbon */}
      <div className="h-1 w-full bg-brand-ribbon" role="presentation" />

      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand column */}
          <div className="flex flex-col items-start lg:col-span-5">
            <Logo variant="plate" />
            <p className="mt-4 max-w-[34rem] text-sm leading-relaxed text-fg-inverse-muted">
              {t("brand.footerTagline")}
            </p>
          </div>

          {/* Explore column */}
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-base font-semibold text-white">
              {t("footer.exploreHeading")}
            </h2>
            <nav aria-label={t("footer.navLabel")}>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-1">
                {footerNav.map(({ key, to }) => (
                  <li key={key}>
                    <NavLink
                      to={to}
                      className="inline-flex min-h-9 items-center text-sm text-fg-inverse-muted transition-colors hover:text-white hover:underline"
                    >
                      {t(`nav.${key}`)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-4">
            <h2 className="mb-4 text-base font-semibold text-white">
              {t("footer.contactHeading")}
            </h2>
            <ul className="flex flex-col gap-2">
              {site.contact.email && (
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex min-h-9 items-center gap-3 text-sm text-fg-inverse-muted transition-colors hover:text-white hover:underline"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-azure-400" aria-hidden="true" />
                    <span>{site.contact.email}</span>
                  </a>
                </li>
              )}
              {site.contact.phone && (
                <li>
                  <a
                    href={toTelHref(site.contact.phone)}
                    className="inline-flex min-h-9 items-center gap-3 text-sm text-fg-inverse-muted transition-colors hover:text-white hover:underline"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-azure-400" aria-hidden="true" />
                    <span>{site.contact.phone}</span>
                  </a>
                </li>
              )}
              {site.contact.whatsapp && (
                <li>
                  <a
                    href={toWhatsAppHref(site.contact.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("footer.whatsapp")} ${site.contact.whatsapp}`}
                    className="inline-flex min-h-9 items-center gap-3 text-sm text-fg-inverse-muted transition-colors hover:text-white hover:underline"
                  >
                    <MessageSquare className="h-4 w-4 shrink-0 text-azure-400" aria-hidden="true" />
                    <span>
                      {t("footer.whatsapp")}: {site.contact.whatsapp}
                    </span>
                  </a>
                </li>
              )}
              {site.address && (
                <li className="inline-flex min-h-9 items-center gap-3 text-sm text-fg-inverse-muted">
                  <MapPin className="h-4 w-4 shrink-0 text-azure-400" aria-hidden="true" />
                  <span>{site.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom hairline & legal bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-fg-inverse-muted sm:flex-row">
          <p>{t("brand.copyright")}</p>
          <nav aria-label={t("footer.legalNavLabel")} className="flex items-center gap-6">
            <NavLink
              to="/privacy"
              className="inline-flex min-h-9 items-center text-fg-inverse-muted transition-colors hover:text-white hover:underline"
            >
              {t("nav.privacy")}
            </NavLink>
            <NavLink
              to="/terms"
              className="inline-flex min-h-9 items-center text-fg-inverse-muted transition-colors hover:text-white hover:underline"
            >
              {t("nav.terms")}
            </NavLink>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
