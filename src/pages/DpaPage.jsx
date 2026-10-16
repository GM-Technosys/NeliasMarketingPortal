import { LegalPage } from "@/sections/legal/LegalPage.jsx";

// TODO(Debass): the SEO title and description are derived from the document header; no approved SEO text exists for legal pages.
// TODO(Debass): the DPA references the Privacy Policy (article 2), the Terms of Sale (articles 5 and 15), the Terms of Use (article 15), the Contract and its annexes. They appear as plain text; add links when those pages exist. The Terms of Use and Terms of Sale pages should link to this DPA.
// TODO(Debass): the hosting statements here (main hosting in Grand-Bassam, recovery plan in Johannesburg, "planned recovery copies remain in Africa") must stay consistent with article 10 of the Terms of Use and with the marketing FAQ on hosting. Align them.
// TODO(Debass): articles 5 and 13 name Hodi and CRMPUNCH as sub-processors and say other providers are listed in the customer area. Confirm the list matches the services actually activated.
// TODO(Debass): legal review of articles 1 (Ivorian law no. 2013-450), 8 (breach notification), 9 (audits) and 10 (return of data) before publication.

/**
 * Data Processing Agreement (DPA) legal document page.
 *
 * @returns {import("react").JSX.Element}
 */
export default function DpaPage() {
  return <LegalPage ns="dpa" />;
}
