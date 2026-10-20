import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import {
  bookLessonForLegacyId,
  bookLessons,
} from "../app/book-content.generated.ts";

const projectRoot = new URL("../", import.meta.url);

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(pathname = "/") {
  return renderWith(await loadWorker(), pathname);
}

function renderWith(worker, pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders one documentation-style grammar book", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-security-policy") ?? "", /default-src 'self'/);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.match(response.headers.get("permissions-policy") ?? "", /camera=\(\)/);
  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, "").replace(/<!-- -->/g, "");

  assert.match(html, /<title>Từ Gốc — Ngữ pháp tiếng Anh cho mọi người<\/title>/i);
  assert.match(html, /src="\/tu-goc-logo-v3\.png"/);
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
  const response = await render(`/ngu-phap/${lesson.slug}`);
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
  assert.match(html, new RegExp(`href="/ngu-phap/${lesson.slug}/luyen-tap"`));
  assert.match(html, /property="og:image" content="https:\/\/tu-goc\.hphongp\.chatgpt\.site\/og\.png"/);
  assert.match(html, /name="twitter:image" content="https:\/\/tu-goc\.hphongp\.chatgpt\.site\/og\.png"/);
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
  const response = await render(`/ngu-phap/${lesson.slug}/luyen-tap`);
  assert.equal(response.status, 200);

  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, "").replace(/<!-- -->/g, "");
  assert.match(html, new RegExp(`Luyện tập: ${lesson.title}`));
  assert.match(html, /class="practice-list"/);
  assert.match(visibleText, /Câu 25/);
  assert.match(visibleText, /Ghép mỗi tên tiếng Việt với tên tiếng Anh tương ứng/);
  assert.match(html, new RegExp(`href="/ngu-phap/${lesson.slug}"`));
  assert.match(html, /property="og:image" content="https:\/\/tu-goc\.hphongp\.chatgpt\.site\/og\.png"/);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
  assert.doesNotMatch(html, /class="lesson-markdown"/);
  assert.doesNotMatch(html, /practice-prompt|practice-context/);
  assert.doesNotMatch(visibleText, /Ghép tên tiếng Việt với tên tiếng AnhBốn tên gọi/);
});

test("renders inline code in grid rows and keeps their labels plain", async () => {
  const lesson = bookLessonForLegacyId("b1-question-tags");
  assert.ok(lesson);
  const response = await render(`/ngu-phap/${lesson.slug}/luyen-tap`);
  assert.equal(response.status, 200);

  // Dữ liệu hydrate trong <script> vẫn giữ Markdown gốc; chỉ xét phần HTML hiển thị.
  const markup = (await response.text()).replace(/<script[\s\S]*?<\/script>/g, "");
  assert.match(markup, /<td>Câu chính có <code>hardly<\/code>, mang nghĩa gần phủ định\.<\/td>/);
  assert.match(markup, /aria-label="Trả lời cho Câu chính có hardly, mang nghĩa gần phủ định\."/);
  assert.doesNotMatch(markup, /`hardly`/);
});

test("keeps Markdown backticks out of answer options, table cells and labels", async () => {
  const worker = await loadWorker();
  const practiceMarkup = async (slug) => {
    const response = await renderWith(worker, `/ngu-phap/${slug}/luyen-tap`);
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
    /<option value="`What` làm chủ ngữ nên động từ quá khứ đứng ngay sau, không thêm `did`\.">“What” làm chủ ngữ nên động từ quá khứ đứng ngay sau, không thêm “did”\.<\/option>/,
  );

  const match = await lessonMarkup("b1-question-tags");
  assert.match(match, /<td><span>xác nhận một câu có <code>never<\/code><\/span><\/td>/);
  assert.match(match, /aria-label="Ghép với xác nhận một câu có never"/);

  const choice = await lessonMarkup("sentence-order");
  assert.match(choice, /<span>trước <code>read<\/code><\/span><\/label>/);

  // Câu tiếng Anh có `café` vẫn là hình thức tiếng Anh, không bị coi là lời tiếng Việt.
  const englishForms = await lessonMarkup("b1-relative-whose-where-when");
  assert.match(englishForms, /<td><code>This is the café where we first met\.<\/code><\/td>/);

  for (const lesson of bookLessons) {
    const markup = await practiceMarkup(lesson.slug);
    const shown = [
      ...[...markup.matchAll(/<(option|td|label)\b[^>]*>([\s\S]*?)<\/\1>/g)]
        .map(([, , content]) => content.replace(/<[^>]+>/g, "")),
      ...[...markup.matchAll(/aria-label="([^"]*)"/g)].map(([, label]) => label),
    ];
    const withBacktick = shown.find((text) => text.includes("`"));
    assert.equal(withBacktick, undefined, `${lesson.slug}: ${withBacktick}`);
  }
});

test("pre-renders every lesson and uses static document navigation", async () => {
  const [nextConfig, chrome, toc, tabs, page, lessonPage, neighbors, markdownDocument, notFoundPage, prerenderManifest] = await Promise.all([
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/book-chrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/book-toc.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/lesson-navigation.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/book-lesson-page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/lesson-neighbors.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/markdown-document.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/not-found.tsx", import.meta.url), "utf8"),
    readFile(new URL("../dist/server/vinext-prerender.json", import.meta.url), "utf8"),
  ]);
  const manifest = JSON.parse(prerenderManifest);
  const renderedPaths = new Set(
    manifest.routes
      .filter((route) => route.status === "rendered")
      .map((route) => route.path ?? route.route),
  );

  assert.match(nextConfig, /output:\s*["']export["']/);
  assert.match(chrome, /closeMobileSidebar/);
  assert.match(toc, /onNavigate/);
  const navigationSources = [chrome, toc, tabs, page, lessonPage, neighbors, markdownDocument, notFoundPage].join("\n");
  assert.doesNotMatch(navigationSources, /next\/link|\bprefetch\b|bookNavigating/);
  assert.match(toc, /<a href=\{lesson\.href\}/);
  assert.match(tabs, /<a[\s\S]+\/luyen-tap/);
  assert.match(neighbors, /<a href=\{`\/ngu-phap\/\$\{next\.slug\}`\}/);

  for (const lesson of bookLessons) {
    assert.ok(renderedPaths.has(`/ngu-phap/${lesson.slug}`), lesson.slug);
    assert.ok(
      renderedPaths.has(`/ngu-phap/${lesson.slug}/luyen-tap`),
      `${lesson.slug}/luyen-tap`,
    );
  }
});

test("moves between lessons in the exact Markdown book order", async () => {
  const current = bookLessonForLegacyId("word-jobs");
  assert.ok(current);
  const currentIndex = bookLessons.findIndex((lesson) => lesson.slug === current.slug);
  const expectedNext = bookLessons[currentIndex + 1];

  const response = await render(`/ngu-phap/${current.slug}`);
  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, "").replace(/<!-- -->/g, "");
  assert.match(
    visibleText,
    new RegExp(`Bài tiếp theo[\\s\\S]{0,800}${expectedNext.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
  );
});

test("removes the public reference, search, and glossary routes", async () => {
  for (const pathname of ["/tra-cuu", "/tim-kiem", "/thuat-ngu"]) {
    const response = await render(pathname);
    assert.equal(response.status, 404, pathname);
  }
});

test("renders a useful 404 page without indexing it", async () => {
  const response = await render("/ngu-phap/khong-ton-tai");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /Không tìm thấy trang/);
  assert.match(html, /Về trang giới thiệu và mở mục lục/);
  assert.match(html, /<meta[^>]+content="noindex"[^>]+name="robots"/);
});

test("redirects legacy lesson URLs without generating duplicate pages", async () => {
  const lesson = bookLessonForLegacyId("language-units");
  assert.ok(lesson);

  const response = await render("/bai-hoc/language-units");
  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("location"),
    `http://localhost/ngu-phap/${lesson.slug}`,
  );

  const missing = await render("/bai-hoc/not-a-real-lesson");
  assert.equal(missing.status, 404);
});

test("keeps a Rust-by-Example-style Markdown source architecture", async () => {
  const [page, layout, lessonPage, practicePage, worker, markdownDocument, exerciseData, practiceDocument, lessonNavigation, bookTheme, bookToc, bookChrome, summary, firstChapter, packageJson] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/book-lesson-page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/book-practice-page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
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
  assert.match(lessonNavigation, /\/luyen-tap/);
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

  assert.match(worker, /legacyRedirects\[legacyId\]/);
  assert.match(worker, /Response\.redirect/);
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
