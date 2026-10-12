import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/common/Logo";
import { DesktopNav } from "./DesktopNav";
import { HeaderCtas } from "./HeaderCtas";
import { MobileMenu } from "./MobileMenu";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";

/**
 * Sticky main site header.
 * Adjusts heights (64px mobile, 72px from md) and reveals shadow on scroll.
 */
export function Header() {
  const { t } = useTranslation();
  const isScrolled = useScrolled(8);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white transition-shadow duration-200",
        isScrolled && "border-b border-line shadow-card",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Logo />

        <DesktopNav />

        {/* Right cluster: CTAs and Mobile Menu Button */}
        <div className="flex items-center gap-3">
          {/* Desktop (xl+): show dual CTAs when configurator enabled */}
          <div className="hidden xl:block">
            <HeaderCtas location="header" size="md" showSecondary={true} />
          </div>

          {/* Tablet (md to xl): show primary CTA only */}
          <div className="hidden md:block xl:hidden">
            <HeaderCtas location="header" size="md" showSecondary={false} />
          </div>

          {/* Hamburger button visible below xl */}
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={t("a11y.openMenu")}
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md text-ink-700 transition-colors hover:bg-ink-100 hover:text-navy-900 xl:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
