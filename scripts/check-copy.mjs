/**
 * check-copy.mjs
 * Scans src/ and index.html for banned pre-launch phrases.
 * Exits with code 1 if any are found, 0 otherwise.
 *
 * Usage: node scripts/check-copy.mjs
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");

const BANNED = [
  "coming soon",
  "waitlist",
  "waiting list",
  "pre-launch",
  "prelaunch",
  "countdown",
  "launching soon",
  "january 2027",
  "stay tuned",
];

const EXTENSIONS = new Set([".js", ".jsx", ".json", ".css"]);

/**
 * Recursively collect files with matching extensions from a directory.
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function collectFiles(dir) {
  const entries = await readdir(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const info = await stat(fullPath);

    if (info.isDirectory()) {
      // Skip node_modules
      if (entry === "node_modules") continue;
      const nested = await collectFiles(fullPath);
      files.push(...nested);
    } else if (EXTENSIONS.has(extname(entry).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const srcDir = join(projectRoot, "src");
  const indexHtml = join(projectRoot, "index.html");

  // Collect source files
  const files = await collectFiles(srcDir);
  files.push(indexHtml);

  let hitCount = 0;

  for (const filePath of files) {
    const content = await readFile(filePath, "utf-8");
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const lineLower = lines[i].toLowerCase();
      for (const phrase of BANNED) {
        if (lineLower.includes(phrase)) {
          // Show relative path from project root
          const relPath = filePath.replace(projectRoot, "").replace(/\\/g, "/").replace(/^\//, "");
          console.log(`${relPath}:${i + 1} ${phrase}`);
          hitCount++;
        }
      }
    }
  }

  if (hitCount > 0) {
    console.log(`\n${hitCount} banned phrase(s) found.`);
    process.exit(1);
  } else {
    console.log("check:copy OK");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
