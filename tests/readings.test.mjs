import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { bookSummary } from "../app/book-summary.generated.ts";
import { bookReadings, readingLevels } from "../app/book-readings.generated.ts";

const readingsRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "book", "readings");

test("keeps graded readings in Markdown, one folder per book level", async () => {
  assert.deepEqual(readingLevels, bookSummary.sections.map((section) => section.title));

  const files = [];
  for (const level of await readdir(readingsRoot)) {
    for (const name of await readdir(path.join(readingsRoot, level))) files.push(`readings/${level}/${name}`);
  }
  assert.deepEqual(new Set(bookReadings.map((reading) => reading.sourcePath)), new Set(files));

  for (const reading of bookReadings) {
    assert.equal(reading.sourcePath.split("/")[1], reading.level.toLowerCase(), reading.sourcePath);
    assert.equal(reading.markdown.match(/^# .+$/gm)?.length, 1, `${reading.slug}: đúng một tiêu đề cấp 1`);
    assert.ok(reading.summary.length > 20, `${reading.slug}: cần lời giới thiệu tiếng Việt`);
    assert.match(reading.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, reading.slug);
  }

  const levelOrder = bookReadings.map((reading) => readingLevels.indexOf(reading.level));
  assert.deepEqual(levelOrder, [...levelOrder].sort((left, right) => left - right), "bài văn xếp theo trình độ");
  assert.equal(bookReadings.find((reading) => reading.slug === "phucs-first-night")?.level, "A1");
});

test("keeps Pre-A1 and A1 readings free of grammar taught from A2 on", () => {
  // Lưới an toàn cho những dấu hiệu dễ thấy; người viết vẫn phải tự rà toàn bài.
  const laterGrammar = [
    [/\b(?:was|were|did|didn't|had)\b/i, "thì quá khứ"],
    [/\b(?:will|won't)\b|\w'll\b/i, "will"],
    [/\bgoing to\b/i, "be going to"],
    [/\bwould(?! like)\b|\w'd(?! like)\b/i, "would ngoài would like"],
    [/\b(?:should|must|could|might|shall|may)\b/i, "động từ tình thái ngoài can"],
    [/\b(?:than|more|most)\b/i, "so sánh"],
    [/\bif\b/i, "câu điều kiện"],
    [/\b(?:have|has|haven't|hasn't) (?!got\b)\w+ed\b|\b(?:been|gone)\b/i, "hiện tại hoàn thành"],
  ];
  for (const reading of bookReadings.filter((candidate) => ["Pre-A1", "A1"].includes(candidate.level))) {
    for (const [pattern, label] of laterGrammar) {
      const found = reading.markdown.match(pattern);
      assert.equal(found, null, `${reading.slug}: “${found?.[0]}” thuộc ${label}`);
    }
  }
});
