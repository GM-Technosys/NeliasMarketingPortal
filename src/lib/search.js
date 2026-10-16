/**
 * Search helpers for client-side multi-word matching.
 */

/**
 * Normalizes text for search comparison:
 * - lowercase
 * - unicode NFD decomposition
 * - strip combining diacritical marks (\p{M})
 * - replace curly apostrophes with straight apostrophe
 * - collapse multiple whitespaces
 * - trim
 *
 * @param {string} [text=""]
 * @returns {string}
 */
export function normalize(text = "") {
  if (typeof text !== "string") return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Checks whether a haystack contains all whitespace-separated tokens of a query.
 *
 * @param {string} haystack
 * @param {string} query
 * @returns {boolean} True if query is empty or every token is in normalized haystack.
 */
export function matches(haystack, query) {
  const normQuery = normalize(query);
  if (!normQuery) return true;

  const normHaystack = normalize(haystack);
  const tokens = normQuery.split(" ").filter(Boolean);

  return tokens.every((token) => normHaystack.includes(token));
}
