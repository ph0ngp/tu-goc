import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  bookLessonForLegacyId,
  bookLessons,
} from "../app/book-content.generated.ts";
import { bookReadings, readingLevels } from "../app/book-readings.generated.ts";
import { BASE_PATH, HOME_HREF, lessonHref, practiceHref, READINGS_HREF, readingHref, readingLevelHref, SITE_URL } from "../lib/site.mjs";

const projectRoot = new URL("../", import.meta.url);
const siteRoot = fileURLToPath(new URL("../dist/client/", import.meta.url));

/**
 * Đọc trang đúng như GitHub Pages phục vụ: `href` (có BASE_PATH) trỏ tới
 * `<thư-mục>/index.html`; không có tệp thì trả 404.html với mã 404.
 */
async function render(href = HOME_HREF) {
  assert.ok(href.startsWith(`${BASE_PATH}/`) && href.endsWith("/"), href);
  const filePath = path.join(siteRoot, href.slice(BASE_PATH.length), "index.html");
  try {
    return new Response(await readFile(filePath, "utf8"), { status: 200 });
  } catch {
    return new Response(await readFile(path.join(siteRoot, "404.html"), "utf8"), { status: 404 });
  }
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
    }),
  );
  return nested.flat();
}

test("server-renders one documentation-style grammar book", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, "").replace(/<!-- -->/g, "");

  assert.match(html, /<title>Từ Gốc — Ngữ pháp tiếng Anh cho mọi người<\/title>/i);
  assert.match(html, /src="\/tu-goc\/tu-goc-logo-v3\.png"/);
  assert.match(html, /class="book-toc"/);
  assert.match(html, /aria-label="Đóng hoặc mở mục lục"/);
  assert.match(html, /aria-label="Chọn giao diện màu"/);
  assert.match(html, /aria-label="Tìm kiếm trong sách"/);
  assert.match(visibleText, /Giới thiệu/);
  assert.match(html, /<summary>1\. Câu tiếng Anh được tạo ra thế nào<\/summary>/);
  assert.match(html, /<summary>39\. Độ chính xác và văn phong<\/summary>/);
  assert.doesNotMatch(html, /<summary>Chương \d+\./);
  assert.match(visibleText, /Ngữ pháp tiếng Anh cho mọi người/);
  assert.match(visibleText, /Cách đọc cuốn sách/);
  assert.match(visibleText, /Mở bài đầu tiên/);
  assert.match(visibleText, /Tác giả: Phan Hải Phong · © 2026/);
  assert.doesNotMatch(html, /Tra cứu|Tìm kiếm ngữ pháp|Luyện tập/);
  assert.doesNotMatch(visibleText, /\bChặng\b/i);
  assert.doesNotMatch(html, /roadmap-atlas|course-summary-card/);
  assert.doesNotMatch(html, /<span class="inline-english"|sound-control|speaker-button|tiến độ/i);
});

test("server-renders a bookmarkable Markdown lesson with the full book index", async () => {
  const lesson = bookLessonForLegacyId("nouns-and-number");
  assert.ok(lesson);
  const response = await render(lessonHref(lesson.slug));
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Danh từ và số nhiều/);
  assert.match(html, /class="book-toc"/);
  assert.match(html, /class="[^\"]*active[^\"]*"/);
  assert.match(html, /class="lesson-markdown"/);
  assert.match(html, /class="markdown-table-wrap"/);
  assert.match(html, /<table>/);
  assert.match(html, /aria-label="Nội dung bài"/);
  assert.match(html, />Bài học</);
  assert.match(html, />Luyện tập</);
  assert.match(html, /class="lesson-practice-cta"/);
  assert.ok(html.includes(`href="${practiceHref(lesson.slug)}"`));
  assert.ok(html.includes(`<link rel="canonical" href="${SITE_URL}/ngu-phap/${lesson.slug}/"/>`));
  assert.ok(html.includes(`property="og:image" content="${SITE_URL}/og.png"`));
  assert.ok(html.includes(`name="twitter:image" content="${SITE_URL}/og.png"`));
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
  assert.ok(html.indexOf("<h1") < html.indexOf("<h2"), "Tiêu đề chính phải xuất hiện trước mọi tiêu đề phụ trong HTML");
  const sidebar = html.match(/<nav class="book-toc"[\s\S]*?<\/nav>/)?.[0] ?? "";
  assert.doesNotMatch(sidebar, /<h[1-6]/, "Nhãn cấp độ trong mục lục không được chiếm cấp tiêu đề của tài liệu");
  assert.doesNotMatch(html, /class="practice-list"/);
  assert.doesNotMatch(html, /markdown-example|lesson-panel-practice/);
  assert.doesNotMatch(html, /<span class="inline-english"/);
});

test("server-renders practice at its own bookmarkable URL", async () => {
  const lesson = bookLessonForLegacyId("language-units");
  assert.ok(lesson);
  const response = await render(practiceHref(lesson.slug));
  assert.equal(response.status, 200);

  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, "").replace(/<!-- -->/g, "");
  assert.match(html, new RegExp(`Luyện tập: ${lesson.title}`));
  assert.match(html, /class="practice-list"/);
  assert.match(visibleText, /Câu 25/);
  assert.match(visibleText, /Ghép mỗi tên tiếng Việt với tên tiếng Anh tương ứng/);
  assert.ok(html.includes(`href="${lessonHref(lesson.slug)}"`));
  assert.ok(html.includes(`property="og:image" content="${SITE_URL}/og.png"`));
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
  assert.doesNotMatch(html, /class="lesson-markdown"/);
  assert.doesNotMatch(html, /practice-prompt|practice-context/);
  assert.doesNotMatch(visibleText, /Ghép tên tiếng Việt với tên tiếng AnhBốn tên gọi/);
});

test("renders inline code in grid rows and keeps their labels plain", async () => {
  const lesson = bookLessonForLegacyId("b1-question-tags");
  assert.ok(lesson);
  const response = await render(practiceHref(lesson.slug));
  assert.equal(response.status, 200);

  // Dữ liệu hydrate trong <script> vẫn giữ Markdown gốc; chỉ xét phần HTML hiển thị.
  const markup = (await response.text()).replace(/<script[\s\S]*?<\/script>/g, "");
  assert.match(markup, /<td>Câu chính có <code>hardly<\/code>, mang nghĩa gần phủ định\.<\/td>/);
  assert.match(markup, /aria-label="Trả lời cho Câu chính có hardly, mang nghĩa gần phủ định\."/);
  assert.doesNotMatch(markup, /`hardly`/);
});

test("keeps Markdown backticks out of prompts, hints, answer options, table cells and labels", async () => {
  const practiceMarkup = async (slug) => {
    const response = await render(practiceHref(slug));
    assert.equal(response.status, 200, slug);
    // Dữ liệu hydrate trong <script> vẫn giữ Markdown gốc; chỉ xét phần HTML hiển thị.
    return (await response.text()).replace(/<script[\s\S]*?<\/script>/g, "");
  };
  const lessonMarkup = (legacyId) => {
    const lesson = bookLessonForLegacyId(legacyId);
    assert.ok(lesson, legacyId);
    return practiceMarkup(lesson.slug);
  };

  // <option> không chứa được <code>: hiện ngoặc kép, còn value vẫn là dữ liệu gốc để chấm.
  const dropdown = await lessonMarkup("b1-subject-object-questions-deep");
  assert.match(
    dropdown,
    /<option value="`What` làm chủ ngữ nên động từ quá khứ đứng ngay sau, không mượn trợ động từ của câu hỏi\.">“What” làm chủ ngữ nên động từ quá khứ đứng ngay sau, không mượn trợ động từ của câu hỏi\.<\/option>/,
  );

  // Bài sửa hiện sẵn phần sai (gạch ngang) ngay trước ô chọn phần thay thế, nên câu hỏi “sửa/thay” khớp với giao diện.
  const repair = await lessonMarkup("possessives");
  assert.match(repair, /<del><code>we<\/code><\/del>/);
  assert.match(repair, /aria-label="Chọn phần thay cho “we”"/);

  const match = await lessonMarkup("b1-question-tags");
  assert.match(match, /<td><span>xác nhận một câu có <code>never<\/code><\/span><\/td>/);
  assert.match(match, /aria-label="Ghép với xác nhận một câu có never"/);

  const choice = await lessonMarkup("sentence-order");
  assert.match(choice, /<span>trước <code>read<\/code><\/span><\/label>/);

  // Câu tiếng Anh có `café` vẫn là hình thức tiếng Anh, không bị coi là lời tiếng Việt.
  const englishForms = await lessonMarkup("b1-relative-whose-where-when");
  assert.match(englishForms, /<td><code>This is the café where we first met\.<\/code><\/td>/);

  // Mục phân loại có lời tiếng Việt hiện như văn xuôi; hình thức tiếng Anh trần vẫn là code.
  const sort = await lessonMarkup("a2-perfect-unfinished-time");
  assert.match(sort, /<td><span><code>this month<\/code> \(tháng còn tiếp diễn\)<\/span><\/td>/);
  assert.match(sort, /<td><code>in 2021<\/code><\/td>/);
  assert.match(sort, /aria-label="Phân loại this month \(tháng còn tiếp diễn\)"/);

  // Khi hai câu chỉ khác nhau ở dấu câu, gợi ý vẫn nêu đúng dấu câu đó thay vì một khối code rỗng.
  const punctuation = await lessonMarkup("b1-punctuation-direct-relative-apposition");
  assert.match(punctuation, /<code>\?<\/code> hay <code>\?,<\/code>/);

  for (const lesson of bookLessons) {
    const markup = await practiceMarkup(lesson.slug);
    const shown = [
      ...[...markup.matchAll(/<(option|td|label|p|h2)\b[^>]*>([\s\S]*?)<\/\1>/g)]
        .map(([, , content]) => content.replace(/<[^>]+>/g, "")),
      ...[...markup.matchAll(/aria-label="([^"]*)"/g)].map(([, label]) => label),
    ];
    const withBacktick = shown.find((text) => text.includes("`"));
    assert.equal(withBacktick, undefined, `${lesson.slug}: ${withBacktick}`);
  }
});

test("pre-renders every lesson and uses static document navigation", async () => {
  const [nextConfig, chrome, toc, tabs, page, lessonPage, neighbors, markdownDocument, notFoundPage] = await Promise.all([
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/book-chrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/book-toc.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/lesson-navigation.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/book-lesson-page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/lesson-neighbors.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/markdown-document.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/not-found.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(nextConfig, /output:\s*["']export["']/);
  assert.match(nextConfig, /trailingSlash:\s*true/);
  assert.match(chrome, /closeMobileSidebar/);
  assert.match(toc, /onNavigate/);
  const navigationSources = [chrome, toc, tabs, page, lessonPage, neighbors, markdownDocument, notFoundPage].join("\n");
  assert.doesNotMatch(navigationSources, /next\/link|\bprefetch\b|bookNavigating/);
  assert.match(toc, /<a href=\{lesson\.href\}/);
  assert.match(tabs, /<a[\s\S]+href=\{practiceHref\(slug\)\}/);
  assert.match(neighbors, /<a href=\{lessonHref\(next\.slug\)\}/);

  for (const lesson of bookLessons) {
    await access(path.join(siteRoot, "ngu-phap", lesson.slug, "index.html"));
    await access(path.join(siteRoot, "ngu-phap", lesson.slug, "luyen-tap", "index.html"));
  }
});

test("publishes graded readings with one sidebar link and one page per level", async () => {
  const visible = (html) => html.replace(/<[^>]+>/g, "").replace(/<!-- -->/g, "").replace(/&#x27;/g, "'");
  const home = await (await render()).text();
  assert.match(home, /<details class="toc-module toc-readings"><summary>Bài văn luyện tập<\/summary>/);
  for (const level of readingLevels) {
    assert.ok(home.includes(`<a href="${readingLevelHref(level)}">${level}</a>`), level);
  }

  const index = await render(READINGS_HREF);
  assert.equal(index.status, 200);
  const indexHtml = await index.text();
  assert.match(indexHtml, /<title>Bài văn luyện tập — Từ Gốc<\/title>/);
  assert.match(indexHtml, /<h1>Bài văn luyện tập<\/h1>/);
  assert.match(indexHtml, /<details class="toc-module toc-readings" open="">/);

  for (const level of readingLevels) {
    const readings = bookReadings.filter((reading) => reading.level === level);
    assert.ok(indexHtml.includes(`href="${readingLevelHref(level)}"`), level);

    const page = await render(readingLevelHref(level));
    assert.equal(page.status, 200, level);
    const html = await page.text();
    assert.ok(visible(html).includes(`Bài văn luyện tập ${level}`), level);
    assert.match(html, new RegExp(`<li class="active[^"]*"><a href="${readingLevelHref(level)}">`), level);
    assert.equal(/<meta name="robots" content="noindex/.test(html), readings.length === 0, `${level}: chỉ trang trống mới noindex`);
    if (!readings.length) assert.ok(visible(html).includes(`Chưa có bài văn ở trình độ ${level}.`), level);

    for (const reading of readings) {
      assert.ok(html.includes(`href="${readingHref(level, reading.slug)}"`), reading.slug);
      assert.ok(visible(html).includes(reading.summary), reading.slug);

      const readingPage = await render(readingHref(level, reading.slug));
      assert.equal(readingPage.status, 200, reading.slug);
      const readingHtml = await readingPage.text();
      assert.match(readingHtml, /<article class="lesson-markdown" lang="en"><h1>/);
      assert.ok(visible(readingHtml).includes(reading.title), reading.title);
      assert.ok(visible(readingHtml).includes(`Bài văn luyện tập › ${level}`), reading.slug);
      assert.ok(visible(readingHtml).includes("Chỉ dùng ngữ pháp"), reading.slug);
      assert.match(readingHtml, new RegExp(`<li class="active"><a href="${readingLevelHref(level)}">`), reading.slug);
    }
  }
  assert.equal(bookReadings.find((reading) => reading.slug === "phucs-first-night")?.level, "A1");
});

test("points every internal link and asset at a file in the static export", async () => {
  const files = (await listFiles(siteRoot)).map((file) => path.relative(siteRoot, file).split(path.sep).join("/"));
  const published = new Set(files);
  const pages = files.filter((file) => file.endsWith(".html"));
  assert.ok(pages.length > bookLessons.length * 2, "thiếu trang HTML trong bản xuất");
  assert.ok(!files.some((file) => file.endsWith(".rsc")), "tệp .rsc không cần cho điều hướng tĩnh");

  const missing = new Set();
  for (const page of pages) {
    const html = await readFile(path.join(siteRoot, page), "utf8");
    for (const [, target] of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
      assert.ok(target.startsWith(`${BASE_PATH}/`), `${page}: ${target} thiếu ${BASE_PATH}`);
      const file = target.slice(BASE_PATH.length + 1);
      const resolved = file === "" || file.endsWith("/") ? `${file}index.html` : file;
      if (!published.has(resolved)) missing.add(`${page} → ${target}`);
    }
  }
  assert.deepEqual([...missing].slice(0, 10), []);
});

test("keeps first loads light", async () => {
  const html = await (await render()).text();
  assert.doesNotMatch(html, /as="font"/, "không tải trước phông chữ; unicode-range chỉ tải phần chữ cần dùng");
  assert.doesNotMatch(html, /_vinext_fonts|fonts\.googleapis/);
  assert.match(html, /<script type="speculationrules">/);
  const logo = await readFile(new URL("../public/tu-goc-logo-v3.png", import.meta.url));
  assert.ok(logo.length < 16_000, `logo ${logo.length} byte`);
});

test("moves between lessons in the exact Markdown book order", async () => {
  const current = bookLessonForLegacyId("word-jobs");
  assert.ok(current);
  const currentIndex = bookLessons.findIndex((lesson) => lesson.slug === current.slug);
  const expectedNext = bookLessons[currentIndex + 1];

  const response = await render(lessonHref(current.slug));
  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, "").replace(/<!-- -->/g, "");
  assert.match(
    visibleText,
    new RegExp(`Bài tiếp theo[\\s\\S]{0,800}${expectedNext.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
  );
});

test("removes the public reference, search, and glossary routes", async () => {
  for (const pathname of ["/tra-cuu/", "/tim-kiem/", "/thuat-ngu/"]) {
    const response = await render(`${BASE_PATH}${pathname}`);
    assert.equal(response.status, 404, pathname);
  }
});

test("renders a useful 404 page without indexing it", async () => {
  const response = await render(lessonHref("khong-ton-tai"));
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /Không tìm thấy trang/);
  assert.match(html, /Về trang giới thiệu và mở mục lục/);
  assert.match(html, /<meta[^>]+content="noindex"[^>]+name="robots"/);
});

test("keeps a Rust-by-Example-style Markdown source architecture", async () => {
  const [page, layout, lessonPage, practicePage, markdownDocument, exerciseData, practiceDocument, lessonNavigation, bookTheme, bookToc, bookChrome, summary, firstChapter, packageJson] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/book-lesson-page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/book-practice-page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/_components/markdown-document.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/exercise-data.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/practice-document.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/lesson-navigation.tsx", import.meta.url), "utf8"),
      Promise.all([
        "tokens", "chrome", "content", "practice", "navigation", "responsive",
      ].map((name) => readFile(new URL(`../app/styles/${name}.css`, import.meta.url), "utf8")))
        .then((styles) => styles.join("\n")),
      readFile(new URL("../app/book-toc.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/book-chrome.tsx", import.meta.url), "utf8"),
      readFile(new URL("../book/src/SUMMARY.md", import.meta.url), "utf8"),
      readFile(new URL("../book/src/m00/tu-cum-tu-menh-de-va-cau-meta-01.md", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
    ]);

  assert.doesNotMatch(page, /InlineLearningText|english-glossary|isEnglishLearningTerm|inline-english/);
  assert.doesNotMatch(page, /ExerciseCard/);
  assert.doesNotMatch(
    `${page}\n${practiceDocument}`,
    /AudioContext|SpeechSynthesisUtterance|SpeakerButton|localStorage|tu-goc-progress/,
  );

  assert.match(markdownDocument, /ReactMarkdown/);
  assert.match(markdownDocument, /remarkPlugins=\{\[remarkGfm\]\}/);
  assert.match(markdownDocument, /className="markdown-table-wrap"/);
  assert.match(lessonPage, /<LessonNavigation/);
  assert.match(practicePage, /<LessonNavigation/);
  assert.match(practicePage, /<PracticeDocument/);
  assert.match(practicePage, /loadExercisesForLegacyId/);
  assert.doesNotMatch(practicePage, /exercise-data/);
  assert.match(lessonNavigation, /practiceHref\(slug\)/);
  assert.match(practiceDocument, /className="practice-list"/);
  assert.match(practiceDocument, /exercises\.map/);
  assert.doesNotMatch(practiceDocument, /exercise\.instruction|practice-prompt|practice-context/);
  assert.doesNotMatch(practiceDocument, /Câu cần sửa|Thay \$\{token\}/);
  assert.doesNotMatch(practiceDocument, /wrongAttempts|currentExercise|nextExercise|Tiếp theo/);
  assert.doesNotMatch(exerciseData, /TheoryBlock|lessonTheoryMarkdown/);
  assert.doesNotMatch(exerciseData, /\binstruction\s*:/);
  assert.match(exerciseData, /exerciseDataByLegacyId/);

  assert.match(bookToc, /function BookTableOfContents/);
  assert.match(bookToc, /sidebarChapterTitle/);
  assert.match(bookToc, /bookSummary\.sections\.map/);
  assert.doesNotMatch(bookToc, /catalogCode|META-01|SENT-01/);
  assert.match(bookTheme, /\.book-toc/);
  assert.match(bookTheme, /\.markdown-table-wrap/);
  assert.match(bookTheme, /data-book-theme="rust"/);
  assert.match(bookTheme, /data-book-theme="navy"/);
  assert.match(bookChrome, /Đóng hoặc mở mục lục/);
  assert.match(bookChrome, /Chọn giao diện màu/);
  assert.match(bookChrome, /Tìm kiếm trong sách/);
  assert.match(bookChrome, /inert=\{sidebarHidden \|\| undefined\}/);
  assert.match(bookChrome, /aria-hidden=\{sidebarHidden \|\| undefined\}/);
  assert.match(bookChrome, /event\.key === "\/"/);
  assert.match(summary, /^# Summary/m);
  assert.match(summary, /\[Giới thiệu\]\(index\.md\)/);
  assert.match(summary, /^- Chương 1\. Câu tiếng Anh được tạo ra thế nào$/m);
  assert.doesNotMatch(summary, /^- \[Chương 1\. Câu tiếng Anh được tạo ra thế nào\]/m);
  assert.match(summary, /\[Từ, cụm từ, mệnh đề và câu\]/);
  assert.match(firstChapter, /^# Từ, cụm từ, mệnh đề và câu/m);
  assert.match(firstChapter, /word\s+→\s+phrase\s+→\s+clause\s+→\s+sentence/);
  assert.match(firstChapter, /## 1\. Từ là một mảnh riêng/);
  assert.match(firstChapter, /## Nhìn một ý lớn dần lên/);
  assert.match(firstChapter, /```text/);
  assert.match(firstChapter, /\| Đơn vị \| Cách hiểu ban đầu \| Ví dụ \| Nghĩa tiếng Việt \|/);
  assert.match(firstChapter, /^> Các tên tiếng Anh trong bảng chỉ để bạn làm quen\./m);
  assert.doesNotMatch(firstChapter, /mệnh đề phụ thuộc|câu mệnh lệnh|\bSVC\b|\bSVO\b/);
  assert.match(firstChapter, /\[danh từ, đại từ, động từ và tính từ\]/);
  assert.match(firstChapter, /\[Chủ ngữ và vị ngữ\]\(chu-ngu-va-vi-ngu-sent-01\.md\)/);

  assert.match(layout, /import "\.\/book-theme\.css"/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(layout, /<html lang="vi" suppressHydrationWarning>/);

  for (const removed of [
    "app/tra-cuu/page.tsx",
    "app/thuat-ngu/page.tsx",
    "app/tim-kiem/page.tsx",
    "app/tim-kiem/search-catalog.tsx",
    "app/catalog-search.ts",
    "app/english-glossary.ts",
    "app/catalog-shell.tsx",
    "app/lesson-data.ts",
    "app/canonical-catalog.ts",
    "app/globals.css",
    "app/lesson-tabs.tsx",
    "app/bai-hoc/[slug]/page.tsx",
    "worker/index.ts",
    ".openai/hosting.json",
  ]) {
    await assert.rejects(access(new URL(removed, projectRoot)));
  }
});

test("keeps Chapter 1 concise, cumulative, and ordered by dependency", async () => {
  const chapterOneFiles = [
    "tu-cum-tu-menh-de-va-cau-meta-01.md",
    "danh-tu-dai-tu-dong-tu-va-tinh-tu-meta-02.md",
    "chu-ngu-va-vi-ngu-sent-01.md",
    "dai-tu-chu-ngu-pron-01.md",
    "ba-khung-cau-nen-tang-sent-02.md",
    "tan-ngu-dau-tien-sent-03.md",
    "chu-hoa-dau-cham-va-dau-hoi-punc-01.md",
  ];
  const chapters = await Promise.all(
    chapterOneFiles.map((file) =>
      readFile(new URL(`../book/src/m00/${file}`, import.meta.url), "utf8"),
    ),
  );

  assert.deepEqual(
    bookLessons.slice(0, chapterOneFiles.length).map((lesson) => lesson.sourcePath),
    chapterOneFiles.map((file) => `m00/${file}`),
  );

  for (const chapter of chapters) {
    const wordCount = chapter.trim().split(/\s+/).length;
    assert.ok(wordCount >= 500 && wordCount <= 1200, `unexpected Chapter 1 length: ${wordCount}`);
    assert.match(chapter, /^# /m);
    assert.match(chapter, /## Ghi nhớ/);
  }

  const [units, wordClasses, subjectPredicate, pronouns, frames, objects, punctuation] = chapters;
  assert.doesNotMatch(units, /mệnh đề phụ thuộc|câu mệnh lệnh|\bSVC\b|\bSVO\b/);
  assert.match(wordClasses, /\| \*noun\* \|/);
  assert.match(wordClasses, /\| \*pronoun\* \|/);
  assert.match(wordClasses, /\| \*verb\* \|/);
  assert.match(wordClasses, /\| \*adjective\* \|/);
  assert.match(subjectPredicate, /Vị ngữ luôn chứa động từ/);
  assert.match(pronouns, /I · you · he · she · it · we · they/);
  assert.match(frames, /SV[\s\S]*SVC[\s\S]*SVO/);
  assert.match(objects, /Không phải động từ nào cũng cần tân ngữ/);
  assert.match(punctuation, /Cách tạo câu hỏi sẽ được học sau/);
});
