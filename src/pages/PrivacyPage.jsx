import { LegalPage } from "@/sections/legal/LegalPage.jsx";

// TODO(Debass): the SEO title and description are derived from the document header; no approved SEO text exists for legal pages.
// TODO(Debass): the Privacy Policy references the DPA (articles 1 and 9). It appears as plain text; add a link when the DPA page is linked from here. The other legal pages should link to this policy.
// TODO(Debass): article 5 states hosting facts definitively (Hodi in Grand-Bassam, recovery site in Johannesburg, copies remain in Africa). Keep it consistent with the DPA (article 6, annex 2), the Terms of Use (article 10) and the marketing FAQ.
// TODO(Debass): article 8 says non-essential cookies and optional marketing are subject to separate choices and that consent can be withdrawn through mechanisms provided. Confirm the site actually provides these (cookie consent, analytics, newsletter or marketing forms) and that mandatory form fields are indicated, as article 3 states.
// TODO(Debass): confirm the retention periods in article 3 (3 years, 12 months, 30 days) match real practice and the DPA return period; article 2 mentions payments by a specialised provider and article 4 other providers "where actually activated": confirm which providers are in use.
// TODO(Debass): two contact addresses appear (info@debasstechnologies.com and contact@nelias.app, article 7 and 10). Confirm this is intentional.
// TODO(Debass): legal review of articles 3 (legal bases and retention), 7 (rights, Ivorian law no. 2013-450, ARTCI) and 8 (cookies and marketing) before publication.

/**
 * Privacy Policy legal document page.
 *
 * @returns {import("react").JSX.Element}
 */
export default function PrivacyPage() {
  return <LegalPage ns="privacy" />;
}
