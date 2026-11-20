import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { bookLessons } from "../app/book-content.generated.ts";
import { absoluteUrl, HOME_HREF, lessonHref, practiceHref, SITE_URL } from "../lib/site.mjs";

test("publishes the book at its GitHub Pages address", () => {
  assert.equal(SITE_URL, "https://ph0ngp.github.io/tu-goc");
});

test("lists every lesson and practice page in the sitemap", async () => {
  const sitemap = await readFile(new URL("../dist/client/sitemap.xml", import.meta.url), "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
  const expected = [
    HOME_HREF,
    ...bookLessons.flatMap((lesson) => [lessonHref(lesson.slug), practiceHref(lesson.slug)]),
  ].map(absoluteUrl);

  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.deepEqual(locations, expected);
});
