import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  bookChapterBySlug,
  bookChapters,
  bookLessonBySlug,
  bookLessonForLegacyId,
  bookLessons,
} from "../app/book-content.generated.ts";
import { bookSummary } from "../app/book-summary.generated.ts";
import { exerciseDataByLegacyId } from "../app/exercise-data.ts";
import { loadExercisesForLegacyId } from "../app/exercise-loader.ts";

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

test("uses the Markdown book as the single ordered catalog", () => {
  const modules = bookSummary.sections.flatMap((section) => section.modules);
  const summaryLessons = bookSummary.sections.flatMap((section) =>
    section.modules.flatMap((moduleEntry) => moduleEntry.lessons),
  );

  assert.equal(bookLessons.length, 216);
  assert.equal(summaryLessons.length, bookLessons.length);
  assert.equal(bookChapters.length, bookLessons.length + 1);
  assert.deepEqual(
    new Set(bookChapters.map((chapter) => chapter.sourcePath)),
    new Set(["index.md", ...bookLessons.map((lesson) => lesson.sourcePath)]),
  );
  assert.deepEqual(
    summaryLessons.map((lesson) => lesson.sourcePath),
    bookLessons.map((lesson) => lesson.sourcePath),
  );
  assert.equal(bookLessons[0].level, "Pre-A1");
  assert.equal(bookLessons.at(-1)?.level, "C1");
  assert.ok(bookLessons.every((lesson) => lesson.level !== "C2"));
  assert.equal(new Set(bookLessons.map((lesson) => lesson.slug)).size, bookLessons.length);
  assert.equal(new Set(bookLessons.map((lesson) => lesson.sourcePath)).size, bookLessons.length);
  assert.deepEqual(
    modules.map((moduleEntry) => moduleEntry.title),
    modules.map((moduleEntry, index) =>
      moduleEntry.title.replace(/^Chương \d+\./, `Chương ${index + 1}.`),
    ),
  );
  assert.ok(modules.every((moduleEntry) => /^Chương \d+\./.test(moduleEntry.title)));
  assert.equal(modules[0]?.title, "Chương 1. Câu tiếng Anh được tạo ra thế nào");
  assert.doesNotMatch(JSON.stringify({ bookSummary, exerciseDataByLegacyId }), /\bchặng\b/i);

  for (const lesson of bookLessons) {
    const chapter = bookChapterBySlug(lesson.slug);
    assert.ok(chapter, lesson.slug);
    assert.equal(chapter.sourcePath, lesson.sourcePath);
    assert.equal(chapter.title, lesson.title, `${lesson.slug}: tiêu đề SUMMARY và bài học phải đồng nhất`);
    assert.equal(bookLessonBySlug(lesson.slug), lesson);
  }

  const c1Titles = bookLessons
    .filter((lesson) => lesson.level === "C1")
    .map((lesson) => lesson.title)
    .join("\n");
  assert.doesNotMatch(
    c1Titles,
    /\b(?:Perfect|passive non-finite|Valency|complementation|phrasal|prepositional|Mandative|subjunctive formulae|Modal verbs|stance|evidential|Fronting|topicalisation|given-new|Existential|presentational|extraposition|Ellipsis|Heads|tails|dislocation|fragments|situational|Predeterminers|partitives|Notional agreement|proximity agreement|Nominalisation|clause-noun|Hedging|boosting|stance adverbials)\b/i,
  );
});

test("keeps legacy links and exercises joined through Markdown frontmatter", () => {
  const published = bookLessons.filter((lesson) => lesson.status === "published");
  const exerciseKeys = Object.keys(exerciseDataByLegacyId);
  const legacyIds = published.map((lesson) => lesson.legacyLessonId);

  assert.ok(published.every((lesson) => lesson.legacyLessonId));
  assert.equal(new Set(legacyIds).size, legacyIds.length);
  assert.deepEqual(new Set(exerciseKeys), new Set(legacyIds));

  for (const legacyId of exerciseKeys) {
    assert.equal(bookLessonForLegacyId(legacyId)?.legacyLessonId, legacyId);
  }
});

test("loads only the requested chapter without changing exercise data", async () => {
  for (const lesson of bookLessons) {
    assert.ok(lesson.legacyLessonId, lesson.slug);
    assert.deepEqual(
      await loadExercisesForLegacyId(lesson.legacyLessonId),
      exerciseDataByLegacyId[lesson.legacyLessonId],
      `${lesson.slug}: dữ liệu nạp theo chương phải giống nguồn kiểm thử toàn cục`,
    );
  }
});

test("keeps exercise source in one discoverable module per book chapter", async () => {
  const modules = bookSummary.sections.flatMap((section) =>
    section.modules.map((moduleEntry) => ({ level: section.title.toLowerCase(), moduleEntry })),
  );
  assert.equal(modules.length, 39);

  for (const { level, moduleEntry } of modules) {
    const chapterNumber = moduleEntry.title.match(/^Chương (\d+)\./)?.[1];
    assert.ok(chapterNumber, moduleEntry.title);
    const fileName = `chapter-${chapterNumber.padStart(2, "0")}.ts`;
    const filePath = path.join(projectRoot, "app", "exercises", "data", level, fileName);
    const source = await readFile(filePath, "utf8");

    assert.equal(
      source.match(/export const \w+ExerciseData\b/g)?.length,
      1,
      `${level}/${fileName} chỉ được xuất một map luyện tập chính thức`,
    );
    assert.doesNotMatch(
      source,
      /export const \w+(?:TopUps|DepthExtensions|DepthExerciseData)\b/,
      `${level}/${fileName} không được làm rò rỉ lớp biên soạn nội bộ`,
    );

    for (const summaryLesson of moduleEntry.lessons) {
      const lesson = bookLessons.find((candidate) => candidate.sourcePath === summaryLesson.sourcePath);
      assert.ok(lesson?.legacyLessonId, summaryLesson.sourcePath);
      assert.match(
        source,
        new RegExp(`${JSON.stringify(lesson.legacyLessonId)}\\s*:`),
        `${lesson.legacyLessonId} phải nằm trong ${level}/${fileName}`,
      );
    }
  }

  for (const level of bookSummary.sections.map((section) => section.title.toLowerCase())) {
    const levelIndexPath = path.join(projectRoot, "app", "exercises", "data", level, "index.ts");
    await access(levelIndexPath);
    assert.doesNotMatch(
      await readFile(levelIndexPath, "utf8"),
      /TopUps|DepthExtensions|DepthExerciseData/,
      `${level}/index.ts chỉ được ghép map cuối cùng của từng chương`,
    );
  }

  for (const removedMonolith of [
    "pre-a1.ts",
    "a1.ts",
    "a1-extensions.ts",
    "a2.ts",
    "b1.ts",
    "b2.ts",
    "c1.ts",
  ]) {
    await assert.rejects(
      access(path.join(projectRoot, "app", "exercises", "data", removedMonolith)),
    );
  }
});

test("contains no handwritten TypeScript theory or obsolete lesson model", async () => {
  const appDirectory = path.join(projectRoot, "app");
  const sourceFiles = (await readdir(appDirectory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /\.(?:ts|tsx)$/.test(entry.name))
    .map((entry) => entry.name)
    .filter((name) => !name.endsWith(".generated.ts"));
  const source = (
    await Promise.all(
      sourceFiles.map((name) => readFile(path.join(appDirectory, name), "utf8")),
    )
  ).join("\n");

  assert.doesNotMatch(
    source,
    /TheoryBlock|beginnerTheoryRevisions|lessonTheoryMarkdown|lessonIntroductions/,
  );
  assert.doesNotMatch(source, /introduction:\s*["`]|theory:\s*\[/);

  for (const removedPath of [
    "app/lesson-data.ts",
    "app/canonical-catalog.ts",
    "app/globals.css",
  ]) {
    await assert.rejects(access(path.join(projectRoot, removedPath)));
  }
});
