import { useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/patterns/PageHeader";
import { Section, Container, Alert, Button } from "@/components/ui";
import { articles, faqKeys } from "@/data/resources";
import { AVAILABILITY } from "@/data/feature-states";
import { matches } from "@/lib/search";
import { track, EVENTS } from "@/lib/analytics";
import { ResourceSearch } from "@/sections/resources/ResourceSearch";
import { ArticlesSection } from "@/sections/resources/ArticlesSection";
import { ResourcesFaq } from "@/sections/resources/ResourcesFaq";
import { ResourcesClosing } from "@/sections/resources/ResourcesClosing";

// TODO(Debass): the PDF gives no SEO copy for Resources; the title follows the approved "<Page> | NELIAS BMP" pattern and the description is the approved summary of the first article.
// TODO(Debass): the PDF gives no headline or intro for Resources; the title is the navigation label.

/**
 * Resources page directory with real-time article and FAQ search.
 *
 * @returns {import("react").JSX.Element}
 */
export default function ResourcesPage() {
  const { t, i18n } = useTranslation();
  const [params, setParams] = useSearchParams();

  const rawQuery = params.get("q") ?? "";
  const query = rawQuery.trim().slice(0, 80);

  const handleQueryChange = (val) => {
    const nextVal = val.slice(0, 80);
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (nextVal) {
          next.set("q", nextVal);
        } else {
          next.delete("q");
        }
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  };

  const handleClear = () => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("q");
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  };

  // Filtered articles memoized on query and active language
  const visibleArticles = useMemo(() => {
    return articles.filter((article) => {
      if (article.state === AVAILABILITY.HIDDEN) {
        return false;
      }
      const title = t(`resources:articles.items.${article.id}.title`);
      const summary = t(`resources:articles.items.${article.id}.summary`);
      return matches(`${title} ${summary}`, query);
    });
  }, [query, i18n.language, t]);

  // Filtered FAQ keys memoized on query and active language
  const visibleFaq = useMemo(() => {
    return faqKeys.filter((key) => {
      const question = t(`faq:items.${key}.q`);
      const answer = t(`faq:items.${key}.a`);
      return matches(`${question} ${answer}`, query);
    });
  }, [query, i18n.language, t]);

  // Track search results count with 800ms debounce
  useEffect(() => {
    if (!query) return;

    const timer = setTimeout(() => {
      track(EVENTS.SEARCH, {
        articles: visibleArticles.length,
        faq: visibleFaq.length,
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [query, visibleArticles.length, visibleFaq.length]);

  const totalCount = visibleArticles.length + visibleFaq.length;
  const isSearchEmpty = Boolean(query) && totalCount === 0;

  return (
    <>
      <Seo
        title={t("resources:seo.title")}
        description={t("resources:seo.description")}
      />

      <PageHeader
        title={t("common:nav.resources")}
        tone="tint"
        spacing="sm"
        className="py-6 md:py-8 lg:py-10"
        accent
        actions={
          <ResourceSearch
            query={rawQuery}
            onChange={handleQueryChange}
            onClear={handleClear}
            totalCount={totalCount}
          />
        }
      />

      {isSearchEmpty ? (
        <Section tone="default" spacing="lg">
          <Container className="max-w-3xl">
            <Alert tone="note" live="polite">
              <p>{t("resources:search.empty")}</p>
              <div className="mt-4">
                <Button variant="outline" size="sm" onClick={handleClear}>
                  {t("resources:search.clear")}
                </Button>
              </div>
            </Alert>
          </Container>
        </Section>
      ) : (
        <>
          {visibleArticles.length > 0 && (
            <ArticlesSection
              articles={visibleArticles}
              isSearching={Boolean(query)}
            />
          )}

          {visibleFaq.length > 0 && (
            <ResourcesFaq faqKeys={visibleFaq} query={query} />
          )}
        </>
      )}

      <ResourcesClosing />
    </>
  );
}
