/**
 * check-legal.mjs
 * Validates structural parity and schema conformance of legal document locales.
 *
 * Checks per namespace and language (en, fr):
 * - articles array has expected length (e.g. 15 for terms)
 * - titles match ^\d+\.  and numbers are consecutive 1, 2, 3...
 * - every article has non-empty blocks array
 * - each block entry has exactly one key ("p" or "ul")
 * - p values are non-empty strings
 * - ul values are non-empty arrays of non-empty strings
 * - article 6 (index 5) has exactly one ul block with 5 items in both languages
 * - block-type sequence of each article is identical between en and fr
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");
const localesDir = join(projectRoot, "src", "i18n", "locales");

const LEGAL_NAMESPACES = ["terms", "cgv", "dpa", "privacy", "sla"];
const expected = {
  terms: 15,
  cgv: 19,
  dpa: 15,
  privacy: 10,
  sla: 14,
};
const lists = {
  terms: { 6: 5 },
  cgv: { 19: 5 },
  dpa: { 14: 5 },
  privacy: {},
  sla: {},
};
const tables = {
  dpa: {
    12: { cols: 2, rows: 5 },
    13: { cols: 2, rows: 2 },
  },
  privacy: {
    3: { cols: 4, rows: 7 },
  },
  sla: {
    3: { cols: 3, rows: 4 },
    7: { cols: 3, rows: 4 },
  },
};

async function checkLegal() {
  let hasErrors = false;

  for (const ns of LEGAL_NAMESPACES) {
    const expectedCount = expected[ns];
    const data = {};

    for (const lng of ["en", "fr"]) {
      const filePath = join(localesDir, lng, `${ns}.json`);
      let parsed;
      try {
        const raw = await readFile(filePath, "utf-8");
        parsed = JSON.parse(raw);
        data[lng] = parsed;
      } catch (err) {
        console.error(`X [${lng}/${ns}.json] Failed to read or parse JSON: ${err.message}`);
        hasErrors = true;
        continue;
      }

      const fileErrors = [];
      const articles = parsed.articles;

      if (!Array.isArray(articles)) {
        fileErrors.push("Property 'articles' is not an array");
      } else {
        if (articles.length !== expectedCount) {
          fileErrors.push(`Expected ${expectedCount} articles, found ${articles.length}`);
        }

        articles.forEach((art, idx) => {
          const expectedNum = idx + 1;
          const expectedPrefix = `${expectedNum}. `;

          if (!art.title || typeof art.title !== "string") {
            fileErrors.push(`Article ${expectedNum}: title is missing or not a string`);
          } else if (!art.title.startsWith(expectedPrefix)) {
            fileErrors.push(
              `Article ${expectedNum}: title "${art.title}" does not start with "${expectedPrefix}"`,
            );
          }

          if (!Array.isArray(art.blocks) || art.blocks.length === 0) {
            fileErrors.push(`Article ${expectedNum}: blocks is missing or empty`);
          } else {
            art.blocks.forEach((block, bIdx) => {
              const keys = Object.keys(block);
              if (
                keys.length !== 1 ||
                (keys[0] !== "p" && keys[0] !== "ul" && keys[0] !== "table")
              ) {
                fileErrors.push(
                  `Article ${expectedNum}, block ${bIdx + 1}: block must have exactly one key ('p', 'ul' or 'table'), got [${keys.join(", ")}]`,
                );
              } else if (keys[0] === "p") {
                if (typeof block.p !== "string" || block.p.trim() === "") {
                  fileErrors.push(
                    `Article ${expectedNum}, block ${bIdx + 1}: 'p' value must be a non-empty string`,
                  );
                }
              } else if (keys[0] === "ul") {
                if (
                  !Array.isArray(block.ul) ||
                  block.ul.length === 0 ||
                  block.ul.some((item) => typeof item !== "string" || item.trim() === "")
                ) {
                  fileErrors.push(
                    `Article ${expectedNum}, block ${bIdx + 1}: 'ul' value must be a non-empty array of non-empty strings`,
                  );
                }
              } else if (keys[0] === "table") {
                const tbl = block.table;
                if (!tbl || typeof tbl !== "object" || Array.isArray(tbl)) {
                  fileErrors.push(
                    `Article ${expectedNum}, block ${bIdx + 1}: 'table' value must be an object`,
                  );
                } else if (
                  !Array.isArray(tbl.head) ||
                  tbl.head.length === 0 ||
                  tbl.head.some((col) => typeof col !== "string" || col.trim() === "")
                ) {
                  fileErrors.push(
                    `Article ${expectedNum}, block ${bIdx + 1}: 'table.head' must be a non-empty array of non-empty strings`,
                  );
                } else if (
                  !Array.isArray(tbl.rows) ||
                  tbl.rows.length === 0 ||
                  tbl.rows.some(
                    (row) =>
                      !Array.isArray(row) ||
                      row.length !== tbl.head.length ||
                      row.some((cell) => typeof cell !== "string" || cell.trim() === ""),
                  )
                ) {
                  fileErrors.push(
                    `Article ${expectedNum}, block ${bIdx + 1}: 'table.rows' must be a non-empty array of rows where each row has ${tbl.head.length} non-empty strings`,
                  );
                }
              }
            });
          }
        });

        // List block checks from lists[ns] (e.g. terms art 6 has 5 items, cgv art 19 has 5 items, dpa art 14 has 5 items)
        const nsLists = lists[ns] || {};
        for (const [artNumStr, reqItems] of Object.entries(nsLists)) {
          const artNum = Number(artNumStr);
          const artIdx = artNum - 1;
          const targetArticle = articles[artIdx];
          if (targetArticle && Array.isArray(targetArticle.blocks)) {
            const ulBlocks = targetArticle.blocks.filter((b) => b.ul !== undefined);
            if (ulBlocks.length !== 1) {
              fileErrors.push(
                `Article ${artNum}: expected exactly one 'ul' block, found ${ulBlocks.length}`,
              );
            } else if (!Array.isArray(ulBlocks[0].ul) || ulBlocks[0].ul.length !== reqItems) {
              fileErrors.push(
                `Article ${artNum}: expected exactly ${reqItems} items in 'ul' block, found ${ulBlocks[0].ul?.length}`,
              );
            }
          }
        }

        // Table block checks from tables[ns]
        const nsTables = tables[ns] || {};
        for (const [artNumStr, reqTbl] of Object.entries(nsTables)) {
          const artNum = Number(artNumStr);
          const artIdx = artNum - 1;
          const targetArticle = articles[artIdx];
          if (targetArticle && Array.isArray(targetArticle.blocks)) {
            const tblBlocks = targetArticle.blocks.filter((b) => b.table !== undefined);
            if (tblBlocks.length !== 1) {
              fileErrors.push(
                `Article ${artNum}: expected exactly one 'table' block, found ${tblBlocks.length}`,
              );
            } else {
              const tbl = tblBlocks[0].table;
              if (tbl && Array.isArray(tbl.head) && Array.isArray(tbl.rows)) {
                if (tbl.head.length !== reqTbl.cols) {
                  fileErrors.push(
                    `Article ${artNum}: expected ${reqTbl.cols} columns in 'table' block, found ${tbl.head.length}`,
                  );
                }
                if (tbl.rows.length !== reqTbl.rows) {
                  fileErrors.push(
                    `Article ${artNum}: expected ${reqTbl.rows} rows in 'table' block, found ${tbl.rows.length}`,
                  );
                }
              }
            }
          }
        }
      }

      if (fileErrors.length > 0) {
        hasErrors = true;
        console.error(`X [${lng}/${ns}.json] Validation failed:`);
        fileErrors.forEach((e) => console.error(`    - ${e}`));
      } else {
        console.log(`OK: ${lng}/${ns}.json`);
      }
    }

    // Parity check between en and fr
    if (data.en && data.fr && Array.isArray(data.en.articles) && Array.isArray(data.fr.articles)) {
      const enArts = data.en.articles;
      const frArts = data.fr.articles;
      const minLen = Math.min(enArts.length, frArts.length);

      for (let i = 0; i < minLen; i++) {
        const enBlocks = enArts[i]?.blocks || [];
        const frBlocks = frArts[i]?.blocks || [];

        const enSequence = enBlocks.map((b) => Object.keys(b)[0]).join(",");
        const frSequence = frBlocks.map((b) => Object.keys(b)[0]).join(",");

        if (enSequence !== frSequence) {
          console.error(
            `X [${ns}] Block sequence mismatch in Article ${i + 1}: EN=[${enSequence}] vs FR=[${frSequence}]`,
          );
          hasErrors = true;
        }

        // Table shape parity check
        enBlocks.forEach((b, bIdx) => {
          if (b.table && frBlocks[bIdx]?.table) {
            const enTbl = b.table;
            const frTbl = frBlocks[bIdx].table;
            if (
              enTbl.head?.length !== frTbl.head?.length ||
              enTbl.rows?.length !== frTbl.rows?.length
            ) {
              console.error(
                `X [${ns}] Table shape mismatch in Article ${i + 1}, block ${bIdx + 1}: EN=[${enTbl.head?.length} cols, ${enTbl.rows?.length} rows] vs FR=[${frTbl.head?.length} cols, ${frTbl.rows?.length} rows]`,
              );
              hasErrors = true;
            }
          }
        });
      }
    }
  }

  if (hasErrors) {
    console.error("\ncheck:legal FAILED.");
    process.exit(1);
  } else {
    console.log("\ncheck:legal OK");
    process.exit(0);
  }
}

checkLegal().catch((err) => {
  console.error("Fatal error in check:legal:", err);
  process.exit(1);
});
