import { LegalPage } from "@/sections/legal/LegalPage.jsx";

// TODO(Debass): the SEO title and description are derived from the document header; no approved SEO text exists for legal pages.
// TODO(Debass): article 10 states hosting facts definitively (Hodi in Grand-Bassam, disaster recovery in Johannesburg, storage remains in Africa) while the marketing FAQ says hosting "is being planned… subject to contractual confirmation". Align them.
// TODO(Debass): the Terms reference the Terms of Sale (CGV), the DPA, the SLA and the Privacy Policy. They appear as plain text; add links when those pages exist.
// TODO(Debass): two contact addresses appear (info@debasstechnologies.com and contact@nelias.app). Confirm this is intentional.

/**
 * Terms of Use legal document page.
 *
 * @returns {import("react").JSX.Element}
 */
export default function TermsPage() {
  return <LegalPage ns="terms" />;
}
