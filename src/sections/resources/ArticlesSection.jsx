import { useTranslation } from "react-i18next";
import { Section, Container, Reveal, SectionHeading } from "@/components/ui";
import { ArticleCard } from "./ArticleCard";
import { cn } from "@/lib/cn";

/**
 * Grid section rendering resources articles with optional featured presentation.
 *
 * @param {Object} props
 * @param {Array<Object>} props.articles - List of visible article objects
 * @param {boolean} [props.isSearching=false] - Whether search is currently active
 */
export function ArticlesSection({ articles, isSearching = false }) {
  const { t } = useTranslation();

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <Section tone="default" spacing="lg">
      <Container>
        <Reveal>
          <SectionHeading title={t("resources:articles.title")} />
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {articles.map((article, index) => {
              const isFeatured = !isSearching && index === 0;
              return (
                <li
                  key={article.id}
                  className={cn("flex", isFeatured && "md:col-span-2")}
                >
                  <ArticleCard article={article} featured={isFeatured} />
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
