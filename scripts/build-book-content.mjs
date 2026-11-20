import { readdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compactSearchText, normalizeSearchText } from "../lib/search-normalization.mjs";
import { absoluteUrl, HOME_HREF, lessonHref, practiceHref } from "../lib/site.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(projectRoot, "book", "src");
const outputPath = path.join(projectRoot, "app", "book-content.generated.ts");
const summaryOutputPath = path.join(projectRoot, "app", "book-summary.generated.ts");
const searchOutputPath = path.join(projectRoot, "app", "book-search-index.generated.ts");
const exerciseLoaderOutputPath = path.join(projectRoot, "app", "exercise-loaders.generated.ts");
const sitemapOutputPath = path.join(projectRoot, "public", "sitemap.xml");

async function markdownFiles(directory) {
  const entries = (await readdir(directory, { withFileTypes: true }))
    .sort((left, right) => left.name.localeCompare(right.name, "en"));
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return markdownFiles(entryPath);
      return entry.isFile() && entry.name.endsWith(".md") ? [entryPath] : [];
    }),
  );
  return nested.flat();
}

function parseChapter(source, relativePath) {
  let markdown = source;
  const metadata = {};
  if (markdown.startsWith("---\n")) {
    const end = markdown.indexOf("\n---\n", 4);
    if (end >= 0) {
      for (const line of markdown.slice(4, end).split("\n")) {
        const separator = line.indexOf(":");
        if (separator > 0) {
          metadata[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
        }
      }
      markdown = markdown.slice(end + 5).trim();
    }
  }
  const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? relativePath;
  return {
    sourcePath: relativePath.replaceAll(path.sep, "/"),
    slug: metadata.slug ?? (relativePath === "index.md" ? "introduction" : undefined),
    legacyLessonId: metadata.legacyLessonId,
    status: metadata.status ?? "published",
    title,
    markdown,
  };
}

const files = (await markdownFiles(sourceRoot)).filter(
  (filePath) => path.basename(filePath) !== "SUMMARY.md",
);
const chapters = await Promise.all(
  files.map(async (filePath) =>
    parseChapter(
      await readFile(filePath, "utf8"),
      path.relative(sourceRoot, filePath),
    ),
  ),
);
const chapterByPath = new Map(chapters.map((chapter) => [chapter.sourcePath, chapter]));

function assertUnique(items, key, label) {
  const seen = new Map();
  for (const item of items) {
    const value = item[key];
    if (!value) continue;
    const previous = seen.get(value);
    if (previous) {
      throw new Error(`${label} bị trùng “${value}”: ${previous} và ${item.sourcePath}`);
    }
    seen.set(value, item.sourcePath);
  }
}

assertUnique(chapters, "sourcePath", "Đường dẫn Markdown");
assertUnique(chapters, "slug", "Slug");
assertUnique(chapters, "legacyLessonId", "Mã bài cũ");

for (const chapter of chapters) {
  if (!new Set(["published", "planned"]).has(chapter.status)) {
    throw new Error(`Trạng thái không hợp lệ trong ${chapter.sourcePath}: ${chapter.status}`);
  }
  if (chapter.sourcePath !== "index.md" && !chapter.slug) {
    throw new Error(`Bài học thiếu slug: ${chapter.sourcePath}`);
  }
}

const summarySource = await readFile(path.join(sourceRoot, "SUMMARY.md"), "utf8");
const sections = [];
let currentSection;
let currentModule;
let introduction;

function hrefFor(sourcePath) {
  if (sourcePath === "index.md") return HOME_HREF;
  const chapter = chapterByPath.get(sourcePath);
  if (!chapter?.slug) {
    throw new Error(`SUMMARY.md trỏ tới bài không tồn tại hoặc thiếu slug: ${sourcePath}`);
  }
  return lessonHref(chapter.slug);
}

for (const rawLine of summarySource.split("\n")) {
  const line = rawLine.trimEnd();
  if (!line || line === "# Summary") continue;
  const sectionMatch = line.match(/^#\s+(.+)$/);
  if (sectionMatch) {
    currentSection = { title: sectionMatch[1].trim(), modules: [] };
    sections.push(currentSection);
    currentModule = undefined;
    continue;
  }
  const linkMatch = line.match(/^(\s*)(?:-\s+)?\[([^\]]+)\]\(([^)]+)\)$/);
  if (!linkMatch) {
    const moduleTitleMatch = line.match(/^-\s+(.+)$/);
    if (moduleTitleMatch) {
      if (!currentSection) {
        currentSection = { title: "Nội dung", modules: [] };
        sections.push(currentSection);
      }
      currentModule = { title: moduleTitleMatch[1].trim(), lessons: [] };
      currentSection.modules.push(currentModule);
    }
    continue;
  }
  const [, indentation, title, sourcePath] = linkMatch;
  const item = { title, href: hrefFor(sourcePath), sourcePath };
  if (!line.trimStart().startsWith("- ")) {
    introduction = item;
  } else if (indentation.length === 0) {
    if (!currentSection) {
      currentSection = { title: "Nội dung", modules: [] };
      sections.push(currentSection);
    }
    currentModule = { ...item, lessons: [] };
    currentSection.modules.push(currentModule);
  } else if (currentModule) {
    currentModule.lessons.push(item);
  }
}

for (const section of sections) {
  for (const moduleEntry of section.modules) {
    for (const lesson of moduleEntry.lessons) {
      lesson.status = chapterByPath.get(lesson.sourcePath)?.status ?? "planned";
    }
  }
}

if (!introduction || introduction.sourcePath !== "index.md") {
  throw new Error("SUMMARY.md phải có liên kết Giới thiệu tới index.md");
}

const summaryOutput = `/* This file is generated from book/src/SUMMARY.md. Do not edit directly. */\n` +
  `export type BookSummary = { introduction: { title: string; href: string; sourcePath: string }; sections: Array<{ title: string; modules: Array<{ title: string; lessons: Array<{ title: string; href: string; sourcePath: string; status: string }> }> }> };\n\n` +
  `export const bookSummary: BookSummary = ${JSON.stringify({ introduction, sections }, null, 2)};\n`;
await writeFile(summaryOutputPath, summaryOutput, "utf8");

function plainMarkdown(value) {
  return value
    .replace(/[`*_>#|\[\]()~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const contextByPath = new Map();
for (const section of sections) {
  for (const moduleEntry of section.modules) {
    for (const lesson of moduleEntry.lessons) {
      contextByPath.set(lesson.sourcePath, {
        context: moduleEntry.title,
        level: section.title,
      });
    }
  }
}

const bookLessons = sections.flatMap((section) =>
  section.modules.flatMap((moduleEntry) =>
    moduleEntry.lessons.map((lesson) => {
      const chapter = chapterByPath.get(lesson.sourcePath);
      if (!chapter?.slug) {
        throw new Error(`Bài trong SUMMARY.md thiếu nội dung hoặc slug: ${lesson.sourcePath}`);
      }
      return {
        sourcePath: chapter.sourcePath,
        slug: chapter.slug,
        legacyLessonId: chapter.legacyLessonId,
        status: chapter.status,
        title: chapter.title,
        level: section.title,
        moduleTitle: moduleEntry.title,
      };
    }),
  ),
);

assertUnique(bookLessons, "slug", "Slug bài học trong mục lục");
assertUnique(bookLessons, "legacyLessonId", "Mã bài cũ trong mục lục");

for (const lesson of bookLessons) {
  const chapter = chapterByPath.get(lesson.sourcePath);
  const summaryLesson = sections
    .flatMap((section) => section.modules)
    .flatMap((moduleEntry) => moduleEntry.lessons)
    .find((item) => item.sourcePath === lesson.sourcePath);
  if (chapter && summaryLesson && chapter.title !== summaryLesson.title) {
    throw new Error(
      `Tiêu đề không đồng nhất trong ${lesson.sourcePath}: “${summaryLesson.title}” và “${chapter.title}”`,
    );
  }
}

const referencedPaths = new Set([introduction.sourcePath, ...bookLessons.map((lesson) => lesson.sourcePath)]);
const orphanedChapters = chapters.filter((chapter) => !referencedPaths.has(chapter.sourcePath));
if (orphanedChapters.length) {
  throw new Error(
    `Các tệp Markdown chưa có trong SUMMARY.md: ${orphanedChapters.map((chapter) => chapter.sourcePath).join(", ")}`,
  );
}

const output = `/* Tệp được tạo từ book/src. Không sửa trực tiếp. */\n` +
  `export type BookChapter = { sourcePath: string; slug?: string; legacyLessonId?: string; status: string; title: string; markdown: string };\n` +
  `export type BookLesson = { sourcePath: string; slug: string; legacyLessonId?: string; status: string; title: string; level: string; moduleTitle: string };\n` +
  `export const bookChapters: BookChapter[] = ${JSON.stringify(chapters, null, 2)};\n\n` +
  `export const bookLessons: BookLesson[] = ${JSON.stringify(bookLessons, null, 2)};\n\n` +
  `export const bookChapterBySlug = (slug: string) => bookChapters.find((chapter) => chapter.slug === slug);\n` +
  `export const bookLessonBySlug = (slug: string) => bookLessons.find((lesson) => lesson.slug === slug);\n` +
  `export const bookLessonForLegacyId = (legacyLessonId: string) => bookLessons.find((lesson) => lesson.legacyLessonId === legacyLessonId);\n` +
  `export const bookIntroduction = bookChapters.find((chapter) => chapter.sourcePath === "index.md");\n`;

await writeFile(outputPath, output, "utf8");

const exerciseChapterLoaders = [];
const exerciseChapterByLegacyLessonId = {};

for (const section of sections) {
  const levelPath = section.title.toLowerCase();
  const exportPrefix = levelPath === "pre-a1" ? "preA1" : levelPath;

  for (const moduleEntry of section.modules) {
    const chapterNumber = moduleEntry.title.match(/^Chương\s+(\d+)\./)?.[1];
    if (!chapterNumber) {
      throw new Error(`Tên chương không có số hợp lệ: ${moduleEntry.title}`);
    }

    const paddedChapter = chapterNumber.padStart(2, "0");
    const chapterKey = `${levelPath}/chapter-${paddedChapter}`;
    exerciseChapterLoaders.push({
      key: chapterKey,
      importPath: `./exercises/data/${chapterKey}`,
      exportName: `${exportPrefix}Chapter${paddedChapter}ExerciseData`,
    });

    for (const summaryLesson of moduleEntry.lessons) {
      const legacyLessonId = chapterByPath.get(summaryLesson.sourcePath)?.legacyLessonId;
      if (!legacyLessonId) {
        throw new Error(`Bài luyện tập thiếu legacyLessonId: ${summaryLesson.sourcePath}`);
      }
      exerciseChapterByLegacyLessonId[legacyLessonId] = chapterKey;
    }
  }
}

const exerciseLoaderOutput = `/* Tệp được tạo từ book/src/SUMMARY.md. Không sửa trực tiếp. */\n` +
  `import type { Exercise } from "./exercise-types.ts";\n\n` +
  `type ChapterExerciseData = Record<string, Exercise[]>;\n` +
  `type ChapterExerciseLoader = () => Promise<ChapterExerciseData>;\n\n` +
  `const chapterLoaders: Record<string, ChapterExerciseLoader> = {\n` +
  exerciseChapterLoaders.map(({ key, importPath, exportName }) =>
    `  ${JSON.stringify(key)}: async () => (await import(${JSON.stringify(`${importPath}.ts`)})).${exportName},\n`,
  ).join("") +
  `};\n\n` +
  `const chapterByLegacyLessonId: Readonly<Record<string, string>> = ${JSON.stringify(exerciseChapterByLegacyLessonId, null, 2)};\n\n` +
  `export async function loadRawExercisesForLegacyId(legacyLessonId?: string): Promise<Exercise[]> {\n` +
  `  if (!legacyLessonId) return [];\n` +
  `  const chapterKey = chapterByLegacyLessonId[legacyLessonId];\n` +
  `  const loadChapter = chapterKey ? chapterLoaders[chapterKey] : undefined;\n` +
  `  if (!loadChapter) return [];\n` +
  `  return (await loadChapter())[legacyLessonId] ?? [];\n` +
  `}\n`;

await writeFile(exerciseLoaderOutputPath, exerciseLoaderOutput, "utf8");

const sitemapUrls = [
  HOME_HREF,
  ...bookLessons.flatMap((lesson) => [lessonHref(lesson.slug), practiceHref(lesson.slug)]),
];
await writeFile(
  sitemapOutputPath,
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    sitemapUrls.map((href) => `  <url><loc>${absoluteUrl(href)}</loc></url>\n`).join("") +
    `</urlset>\n`,
  "utf8",
);

const searchIndex = chapters
  .filter((chapter) => chapter.slug && chapter.slug !== "introduction")
  .map((chapter) => {
    const plain = plainMarkdown(chapter.markdown);
    const context = contextByPath.get(chapter.sourcePath) ?? { context: "", level: "" };
    return {
      id: chapter.slug,
      href: lessonHref(chapter.slug),
      title: chapter.title,
      context: context.context,
      level: context.level,
      normalizedTitle: normalizeSearchText(chapter.title),
      text: compactSearchText(`${chapter.title} ${context.context} ${plain}`),
      excerpt: plain.replace(chapter.title, "").trim().slice(0, 180),
    };
  });

const appEntries = await readdir(path.join(projectRoot, "app"));
await Promise.all(
  appEntries
    .filter((name) => /^book-search-index-.+\.generated\.ts$/.test(name))
    .map((name) => unlink(path.join(projectRoot, "app", name))),
);

const searchOutput = `/* This file is generated and loaded only when search opens. */\n` +
  `export type BookSearchEntry = { id: string; href: string; title: string; context: string; level: string; normalizedTitle: string; text: string; excerpt: string };\n\n` +
  `const bookSearchIndex: BookSearchEntry[] = ${JSON.stringify(searchIndex, null, 2)};\n\n` +
  `export async function loadBookSearchIndex(): Promise<BookSearchEntry[]> {\n` +
  `  return bookSearchIndex;\n` +
  `}\n`;
await writeFile(searchOutputPath, searchOutput, "utf8");
