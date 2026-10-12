import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Seo } from "@/components/common/Seo";

export default function NotFoundPage() {
  return (
    <Section>
      <Container>
        <Seo title="Page not found | NELIAS" noIndex />
        <h1 className="font-display text-h1">404</h1>
        <p className="mt-4 text-fg-muted">The page you are looking for does not exist.</p>
      </Container>
    </Section>
  );
}
