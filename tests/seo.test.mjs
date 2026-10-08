import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { bookLessons } from "../app/book-content.generated.ts";
import { SITE_URL } from "../app/site-metadata.ts";

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

test("publishes crawlable canonical URLs for every lesson and practice page", async () => {
  const sitemapSource = await readFile(path.join(projectRoot, "app/sitemap.ts"), "utf8");
  assert.match(sitemapSource, /bookLessons\.flatMap/);
  assert.match(sitemapSource, /\/ngu-phap\/\$\{lesson\.slug\}/);
  assert.match(sitemapSource, /\/luyen-tap/);
  for (const lesson of bookLessons) {
    assert.ok(lesson.slug);
  }
});

test("allows crawling and advertises the sitemap", async () => {
  const robotsSource = await readFile(path.join(projectRoot, "app/robots.ts"), "utf8");
  assert.match(robotsSource, /userAgent:\s*"\*"/);
  assert.match(robotsSource, /allow:\s*"\/"/);
  assert.match(robotsSource, /sitemap:\s*`\$\{SITE_URL\}\/sitemap\.xml`/);
  assert.equal(SITE_URL, "https://tu-goc.hphongp.chatgpt.site");
});
