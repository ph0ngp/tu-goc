import assert from "node:assert/strict";
import test from "node:test";
import { compactSearchText, normalizeSearchText, searchTerms } from "../lib/search-normalization.mjs";

test("normalizes Vietnamese search consistently", () => {
  assert.equal(normalizeSearchText("Động từ"), "dong tu");
  assert.equal(normalizeSearchText("động từ"), "dong tu");
  assert.deepEqual(searchTerms("Thì hiện tại?"), ["thi", "hien", "tai"]);
});

test("keeps one copy of each searchable token", () => {
  assert.equal(compactSearchText("động từ, ĐỘNG TỪ và danh từ"), "dong tu va danh");
});
