import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { bookLessons } from "../app/book-content.generated.ts";

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const sourceRoot = path.join(projectRoot, "book", "src");

const chapterOnePaths = [
  "m00/tu-cum-tu-menh-de-va-cau-meta-01.md",
  "m00/danh-tu-dai-tu-dong-tu-va-tinh-tu-meta-02.md",
  "m00/chu-ngu-va-vi-ngu-sent-01.md",
  "m00/dai-tu-chu-ngu-pron-01.md",
  "m00/ba-khung-cau-nen-tang-sent-02.md",
  "m00/tan-ngu-dau-tien-sent-03.md",
  "m00/chu-hoa-dau-cham-va-dau-hoi-punc-01.md",
];

const chapterTwoPaths = [
  "m01/danh-tu-chung-danh-tu-rieng-va-danh-tu-dem-duoc-so-it-noun-01.md",
  "m01/mao-tu-a-an-art-01.md",
  "m01/danh-tu-va-so-nhieu-noun-02.md",
  "m01/this-that-these-those-dem-01.md",
];

const chapterThreePaths = [
  "m02/ba-dang-cua-be-be-01.md",
  "m02/ten-goi-dac-diem-noi-chon-be-02.md",
  "m02/phu-dinh-voi-be-be-03.md",
  "m02/cau-hoi-voi-be-be-04.md",
  "m02/who-what-where-how-old-voi-be-be-05.md",
];

test("keeps Chapter 1 concise, cumulative, and ordered", async () => {
  assert.deepEqual(
    bookLessons.slice(0, chapterOnePaths.length).map((lesson) => lesson.sourcePath),
    chapterOnePaths,
  );

  const chapters = await Promise.all(
    chapterOnePaths.map((sourcePath) => readFile(path.join(sourceRoot, sourcePath), "utf8")),
  );
  for (const chapter of chapters) {
    const body = chapter.replace(/^---[\s\S]*?---\s*/, "");
    const wordCount = body.trim().split(/\s+/).length;
    assert.ok(wordCount >= 500 && wordCount <= 1200, `Độ dài bất thường: ${wordCount}`);
    assert.match(body, /^# /m);
    assert.match(body, /## Ghi nhớ/);
    assert.match(body, /\| ---/);
    assert.match(body, /```text/);
  }

  const [units, wordClasses, subjectPredicate, pronouns, frames, objects, punctuation] = chapters;
  assert.doesNotMatch(units, /mệnh đề phụ thuộc|câu mệnh lệnh|\bSVC\b|\bSVO\b/);
  assert.match(wordClasses, /\| \*noun\* \|/);
  assert.match(wordClasses, /\| \*pronoun\* \|/);
  assert.match(wordClasses, /\| \*verb\* \|/);
  assert.match(wordClasses, /\| \*adjective\* \|/);
  assert.match(subjectPredicate, /Câu đang nói về ai hoặc điều gì/);
  assert.match(pronouns, /I · you · he · she · it · we · they/);
  assert.doesNotMatch(pronouns, /cách dùng số ít sẽ được giải thích khi cần/);
  assert.match(frames, /SV[\s\S]*SVC[\s\S]*SVO/);
  assert.match(objects, /Không phải động từ nào cũng cần tân ngữ/);
  assert.match(punctuation, /Cách tạo câu hỏi sẽ được học sau/);
});

test("keeps Chapter 2 complete, cumulative, and limited to first noun phrases", async () => {
  assert.deepEqual(
    bookLessons
      .slice(chapterOnePaths.length, chapterOnePaths.length + chapterTwoPaths.length)
      .map((lesson) => lesson.sourcePath),
    chapterTwoPaths,
  );

  const chapters = await Promise.all(
    chapterTwoPaths.map((sourcePath) => readFile(path.join(sourceRoot, sourcePath), "utf8")),
  );
  for (const chapter of chapters) {
    const body = chapter.replace(/^---[\s\S]*?---\s*/, "");
    const wordCount = body.trim().split(/\s+/).length;
    assert.ok(wordCount >= 700 && wordCount <= 1100, `Độ dài Chương 2 bất thường: ${wordCount}`);
    assert.equal((body.match(/^# /gm) ?? []).length, 1);
    assert.match(body, /## Ghi nhớ/);
    assert.match(body, /\| ---/);
    assert.match(body, /```text/);
  }

  const [nounTypes, articles, plurals, demonstratives] = chapters;
  assert.match(nounTypes, /Danh từ chung[\s\S]*Danh từ riêng[\s\S]*Danh từ đếm được[\s\S]*Số ít/);
  assert.match(articles, /âm phụ âm[\s\S]*âm nguyên âm[\s\S]*a university[\s\S]*an hour/);
  assert.match(plurals, /thêm `-s`/);
  assert.match(plurals, /`s`, `ss`, `sh`, `ch`, `x` hoặc `z`/);
  assert.match(plurals, /`quiz`[\s\S]*`quizzes`/);
  assert.match(plurals, /`-ies`/);
  assert.match(plurals, /dấu nháy đơn/);
  assert.match(demonstratives, /\| một \| `this`[\s\S]*`that`[\s\S]*\| nhiều \| `these`[\s\S]*`those`/);
  assert.doesNotMatch(demonstratives, /`(?:am|is|are)`/);
});

test("keeps Chapter 3 complete, cumulative, and divided into clear be lessons", async () => {
  const chapterThreeStart = chapterOnePaths.length + chapterTwoPaths.length;
  assert.deepEqual(
    bookLessons
      .slice(chapterThreeStart, chapterThreeStart + chapterThreePaths.length)
      .map((lesson) => lesson.sourcePath),
    chapterThreePaths,
  );

  const chapters = await Promise.all(
    chapterThreePaths.map((sourcePath) => readFile(path.join(sourceRoot, sourcePath), "utf8")),
  );
  for (const chapter of chapters) {
    const body = chapter.replace(/^---[\s\S]*?---\s*/, "");
    const wordCount = body.trim().split(/\s+/).length;
    assert.ok(wordCount >= 700 && wordCount <= 1100, `Độ dài Chương 3 bất thường: ${wordCount}`);
    assert.equal((body.match(/^# /gm) ?? []).length, 1);
    assert.match(body, /## Ghi nhớ/);
    assert.match(body, /\| ---/);
    assert.match(body, /```text/);
  }

  const [forms, meanings, negatives, yesNoQuestions, whQuestions] = chapters;
  assert.match(forms, /`I` đi với `am`/);
  assert.match(forms, /`he`, `she`, `it` \| `is`/);
  assert.match(forms, /`you`, `we`, `they` \| `are`/);
  assert.match(forms, /`I am` \| `I'm`/);
  assert.match(forms, /`this`, `that` \| `is`[\s\S]*`these`, `those` \| `are`/);

  for (const topic of ["tên gọi", "đặc điểm", "nơi chốn", "tuổi", "nguồn gốc", "ngày", "giờ"]) {
    assert.match(meanings, new RegExp(topic, "i"), topic);
  }
  assert.match(negatives, /chủ ngữ \+ am\/is\/are \+ not/);
  assert.match(negatives, /`isn't`[\s\S]*`aren't`[\s\S]*`I'm not`/);
  assert.match(negatives, /không dùng `amn't`/);

  assert.match(yesNoQuestions, /\*yes\/no question\*/);
  assert.match(yesNoQuestions, /Yes, chủ ngữ \+ be/);
  assert.match(yesNoQuestions, /Không viết tắt câu trả lời khẳng định/);
  assert.doesNotMatch(yesNoQuestions, /^## Dùng (?:who|what|where|how old)/gim);

  assert.match(whQuestions, /\| `who` \| ai/);
  assert.match(whQuestions, /\| `what` \| cái gì, điều gì/);
  assert.match(whQuestions, /\| `where` \| ở đâu/);
  assert.match(whQuestions, /\| `how old` \| bao nhiêu tuổi/);
  assert.match(whQuestions, /từ hỏi \+ am\/is\/are \+ chủ ngữ/);
  assert.match(whQuestions, /không chỉ `Yes` hoặc[\s\n]+  `No`/);
});

test("keeps every A1 theory lesson complete, published, and aligned with the catalog", async () => {
  const a1Lessons = bookLessons.filter((lesson) => lesson.level === "A1");
  assert.equal(a1Lessons.length, 37);
  assert.ok(a1Lessons.every((lesson) => lesson.status === "published"));
  assert.deepEqual(
    [...new Set(a1Lessons.map((lesson) => lesson.moduleTitle))],
    [
      "Chương 4. Đại từ và sở hữu",
      "Chương 5. Nói có gì và ở đâu",
      "Chương 6. Hiện tại đơn",
      "Chương 7. Số lượng cơ bản",
      "Chương 8. Khả năng và tương tác cơ bản",
      "Chương 9. Hiện tại tiếp diễn",
      "Chương 10. Tính từ, trạng từ và trật tự câu",
    ],
  );

  for (const lesson of a1Lessons) {
    const source = await readFile(path.join(sourceRoot, lesson.sourcePath), "utf8");
    const body = source.replace(/^---[\s\S]*?---\s*/, "");
    const words = body.trim().split(/\s+/).length;
    assert.ok(words >= 550 && words <= 1100, `${lesson.sourcePath}: ${words}`);
    assert.equal((body.match(/^# /gm) ?? []).length, 1, lesson.sourcePath);
    assert.ok((body.match(/^## /gm) ?? []).length >= 5, `${lesson.sourcePath}: thiếu các bước giải thích`);
    assert.equal(body.match(/^# (.+)$/m)?.[1], lesson.title, lesson.sourcePath);
    assert.match(body, /## Ghi nhớ/, lesson.sourcePath);
    assert.match(body, /\| ---/, lesson.sourcePath);
    assert.doesNotMatch(body, /đang được biên soạn|nội dung tạm|TODO/i, lesson.sourcePath);
  }

  const imperatives = await readFile(
    path.join(sourceRoot, "m07/menh-lenh-let-s-imp-01.md"),
    "utf8",
  );
  const suggestions = await readFile(
    path.join(sourceRoot, "m07/let-s-va-de-nghi-cung-lam-imp-02.md"),
    "utf8",
  );
  assert.match(imperatives, /# Mệnh lệnh khẳng định và phủ định/);
  assert.doesNotMatch(imperatives, /^## .*Let's/gm);
  assert.match(suggestions, /Let's \+ base verb/);

  const countability = await readFile(
    path.join(sourceRoot, "m04/danh-tu-dem-duoc-va-khong-dem-duoc-noun-04.md"),
    "utf8",
  );
  const howMuchMany = await readFile(
    path.join(sourceRoot, "m06/how-much-how-many-va-cac-don-vi-do-chua-phan-quant-02.md"),
    "utf8",
  );
  assert.match(countability, /We eat chicken/);
  assert.doesNotMatch(countability, /Chicken is food/);
  assert.doesNotMatch(howMuchMany, /\ba little\b|\ba few\b/);

  const a1ExpandedLessons = new Map([
    ["question-helpers", /## Ba câu gần giống nhưng hỏi ba điều khác nhau[\s\S]*## `Do\/does` không mang một nghĩa riêng/],
    ["continuous-questions", /## Phân biệt người thực hiện với người nhận hành động[\s\S]*## Đừng nhầm với hiện tại đơn/],
    ["connectors-basic", /## Cùng một quan hệ nguyên nhân–kết quả, hai cách nhìn/],
    ["sentence-order", /## Lắp một câu từ phần cốt lõi ra ngoài[\s\S]*## Không phải động từ nào cũng có tân ngữ/],
  ]);
  for (const [legacyLessonId, marker] of a1ExpandedLessons) {
    const lesson = a1Lessons.find((entry) => entry.legacyLessonId === legacyLessonId);
    assert.ok(lesson, legacyLessonId);
    const source = await readFile(path.join(sourceRoot, lesson.sourcePath), "utf8");
    assert.match(source, marker, legacyLessonId);
  }
});

test("keeps every A2 theory lesson complete, published, and pedagogically bounded", async () => {
  const a2Lessons = bookLessons.filter((lesson) => lesson.level === "A2");
  assert.equal(a2Lessons.length, 54);
  assert.ok(a2Lessons.every((lesson) => lesson.status === "published"));
  assert.deepEqual(
    [...new Set(a2Lessons.map((lesson) => lesson.moduleTitle))],
    [
      "Chương 11. Quá khứ đơn",
      "Chương 12. Quá khứ tiếp diễn và thói quen quá khứ",
      "Chương 13. Các cách nói tương lai",
      "Chương 14. So sánh và mức độ",
      "Chương 15. Khả năng, lời khuyên và nghĩa vụ",
      "Chương 16. Mạo từ và từ hạn định",
      "Chương 17. Hiện tại hoàn thành",
      "Chương 18. Mệnh đề và mẫu động từ cơ bản",
      "Chương 19. Miêu tả và tham chiếu mở rộng",
    ],
  );

  for (const lesson of a2Lessons) {
    const source = await readFile(path.join(sourceRoot, lesson.sourcePath), "utf8");
    const body = source.replace(/^---[\s\S]*?---\s*/, "");
    const words = body.trim().split(/\s+/).length;
    assert.ok(words >= 550 && words <= 1150, `${lesson.sourcePath}: ${words}`);
    assert.equal((body.match(/^# /gm) ?? []).length, 1, lesson.sourcePath);
    assert.ok((body.match(/^## /gm) ?? []).length >= 5, `${lesson.sourcePath}: thiếu các bước giải thích`);
    assert.equal(body.match(/^# (.+)$/m)?.[1], lesson.title, lesson.sourcePath);
    assert.match(body, /## Ghi nhớ/, lesson.sourcePath);
    assert.doesNotMatch(body, /đang được biên soạn|nội dung tạm|TODO/i, lesson.sourcePath);
  }

  const byId = async (legacyLessonId) => {
    const lesson = a2Lessons.find((entry) => entry.legacyLessonId === legacyLessonId);
    assert.ok(lesson, legacyLessonId);
    return readFile(path.join(sourceRoot, lesson.sourcePath), "utf8");
  };
  assert.match(await byId("a2-past-regular"), /\/ɪd\/[\s\S]*\/t\/[\s\S]*\/d\//);
  assert.match(await byId("a2-past-did"), /didn't \+ động từ cơ bản/);
  assert.match(await byId("a2-past-continuous"), /was\/were \+ V-ing/);
  assert.match(await byId("a2-past-simple-continuous"), /`When` và `while` không tự chọn thì[\s\S]*## Cách chọn từng bước/);
  assert.match(await byId("a2-future-forms"), /`will \+ động từ`[\s\S]*`be going to \+ động từ`[\s\S]*hiện tại tiếp diễn[\s\S]*hiện tại đơn/);
  assert.match(await byId("a2-obligation"), /đừng coi “must = bên trong, have to = bên ngoài” là quy tắc tuyệt đối/iu);
  assert.match(await byId("a2-perfect-vs-past"), /## Hai dòng thời gian[\s\S]*## Bảng quyết định chính[\s\S]*Nếu không có từ chỉ thời gian, đừng tự động chọn hiện tại hoàn thành/);
  assert.match(await byId("a2-relative-subject"), /không được lược/);
  assert.match(await byId("a2-first-conditional"), /If \+ hiện tại đơn[\s\S]*will \+ động từ cơ bản/);
  assert.match(await byId("a2-comparatives"), /`Less \+ tính từ \+ than`/i);
  assert.match(await byId("a2-superlatives"), /`The least \+ tính từ`/i);
  assert.match(await byId("a2-indefinite-pronouns"), /`somebody`[\s\S]*`anybody`[\s\S]*`nobody`/i);
  assert.doesNotMatch(await byId("a2-definite-article"), /the people we met yesterday/i);

  const expandedDecisionLessons = new Map([
    ["a2-equality", /## Cách chọn giữa/],
    ["a2-comparative-modifiers", /## Chọn từ chỉ mức chênh/],
    ["a2-possibility-modals", /## Phân biệt động từ tình thái với/],
    ["a2-advice-modals", /## Quy trình chọn cấu trúc/],
    ["a2-obligation", /## Cùng một tình huống, khác trọng tâm/],
    ["a2-prohibition-no-necessity", /## Quy trình chọn trong tình huống thật/],
    ["a2-few-little", /## Chọn đúng bằng hai quyết định/],
    ["a2-all-every-each-whole", /## Quy trình chọn và kiểm tra hòa hợp/],
    ["a2-both-either-neither", /## Ba câu hỏi để tránh nhầm/],
    ["a2-relative-object-whose-where", /## Ghép câu mà không lặp thành phần/],
    ["a2-zero-conditional", /## Quy trình nhận ra loại 0/],
    ["a2-first-conditional", /## Lắp câu theo nghĩa/],
    ["a2-future-time-clauses", /## Chọn từ nối bằng dòng thời gian/],
    ["a2-verb-patterns", /## Quy trình dùng một mẫu động từ/],
    ["a2-object-infinitive-purpose-prep-ing", /## Đối chiếu ba câu gần giống nhau/],
    ["a2-reflexive-reciprocal", /## Xác định hướng của hành động/],
    ["a2-indefinite-pronouns", /## Chọn theo người\/vật và loại câu/],
    ["a2-one-ones", /## Ba điều kiện để dùng/],
    ["a2-when-while-as", /## Cùng sự việc, khác điểm nhìn[\s\S]*## Cách chọn từ nối và thì/],
    ["a2-future-forms", /## Cùng một việc gọi điện, ba điểm nhìn[\s\S]*## Những lỗi lựa chọn thường gặp/],
    ["a2-other-forms", /## Nhìn toàn bộ hệ thống cạnh nhau[\s\S]*`the other books`/],
  ]);
  for (const [legacyLessonId, marker] of expandedDecisionLessons) {
    assert.match(await byId(legacyLessonId), marker, legacyLessonId);
  }
});

test("keeps every B1 theory lesson complete, published, and bounded before B2", async () => {
  const b1Lessons = bookLessons.filter((lesson) => lesson.level === "B1");
  assert.equal(b1Lessons.length, 46);
  assert.ok(b1Lessons.every((lesson) => lesson.status === "published"));
  assert.deepEqual(
    [...new Set(b1Lessons.map((lesson) => lesson.moduleTitle))],
    [
      "Chương 20. Thì, thể và dòng thời gian",
      "Chương 21. Câu hỏi và mệnh đề danh từ",
      "Chương 22. Mệnh đề quan hệ và dấu câu",
      "Chương 23. Mục đích, nguyên nhân, kết quả và nhượng bộ",
      "Chương 24. Điều kiện và mong ước",
      "Chương 25. Câu bị động",
      "Chương 26. Câu tường thuật",
      "Chương 27. Mẫu động từ và cụm động từ",
      "Chương 28. Suy đoán và mức độ chắc chắn",
      "Chương 29. Xác nhận, đồng tình và câu đáp rút gọn",
    ],
  );

  for (const lesson of b1Lessons) {
    const source = await readFile(path.join(sourceRoot, lesson.sourcePath), "utf8");
    const body = source.replace(/^---[\s\S]*?---\s*/, "");
    const words = body.trim().split(/\s+/).length;
    assert.ok(words >= 650 && words <= 1150, `${lesson.sourcePath}: ${words}`);
    assert.equal((body.match(/^# /gm) ?? []).length, 1, lesson.sourcePath);
    assert.ok((body.match(/^## /gm) ?? []).length >= 5, `${lesson.sourcePath}: thiếu các bước giải thích`);
    assert.equal(body.match(/^# (.+)$/m)?.[1], lesson.title, lesson.sourcePath);
    assert.match(body, /## Ghi nhớ/, lesson.sourcePath);
    assert.doesNotMatch(body, /đang được biên soạn|nội dung tạm|TODO/i, lesson.sourcePath);
  }

  const byId = async (legacyLessonId) => {
    const lesson = b1Lessons.find((entry) => entry.legacyLessonId === legacyLessonId);
    assert.ok(lesson, legacyLessonId);
    return readFile(path.join(sourceRoot, lesson.sourcePath), "utf8");
  };
  assert.match(await byId("b1-perfect-simple-vs-continuous"), /kết quả[\s\S]*quá trình[\s\S]*động từ trạng thái/i);
  assert.match(await byId("b1-past-perfect"), /không phải cứ có hai hành động quá khứ/i);
  assert.match(await byId("b1-defining-nondefining-relatives"), /không dùng `that`[\s\S]*không lược/i);
  assert.match(await byId("b1-second-conditional"), /if \+ past simple, would\/could\/might \+ V/i);
  assert.match(await byId("b1-active-vs-passive-choice"), /không dùng bị động để che mất thông tin/i);
  assert.match(await byId("b1-say-tell-ask-no-backshift"), /dạng quá khứ tường thuật không tự động có nghĩa/i);
  assert.match(await byId("b1-phrasal-verbs-separability"), /đại từ bắt buộc ở giữa/i);
  assert.match(await byId("b1-present-deduction-modals"), /không dùng `mustn't` cho suy luận/i);
});

test("keeps every B2 theory lesson complete, published, and explicit about advanced choices", async () => {
  const b2Lessons = bookLessons.filter((lesson) => lesson.level === "B2");
  assert.equal(b2Lessons.length, 38);
  assert.ok(b2Lessons.every((lesson) => lesson.status === "published"));
  assert.deepEqual(
    [...new Set(b2Lessons.map((lesson) => lesson.moduleTitle))],
    [
      "Chương 30. Thì và thể nâng cao",
      "Chương 31. Modal perfect và phản thực",
      "Chương 32. Giả định và khoảng cách lịch sự",
      "Chương 33. Bị động và tường thuật nâng cao",
      "Chương 34. Cụm danh từ và hệ thống tham chiếu",
      "Chương 35. Rút gọn và nhấn mạnh",
    ],
  );

  for (const lesson of b2Lessons) {
    const source = await readFile(path.join(sourceRoot, lesson.sourcePath), "utf8");
    const body = source.replace(/^---[\s\S]*?---\s*/, "");
    const words = body.trim().split(/\s+/).length;
    assert.ok(words >= 700 && words <= 1150, `${lesson.sourcePath}: ${words}`);
    assert.equal((body.match(/^# /gm) ?? []).length, 1, lesson.sourcePath);
    assert.ok((body.match(/^## /gm) ?? []).length >= 5, `${lesson.sourcePath}: thiếu các bước giải thích`);
    assert.equal(body.match(/^# (.+)$/m)?.[1], lesson.title, lesson.sourcePath);
    assert.match(body, /## Ghi nhớ/, lesson.sourcePath);
    assert.doesNotMatch(body, /đang được biên soạn|nội dung tạm|TODO/i, lesson.sourcePath);
  }

  const byId = async (legacyLessonId) => {
    const lesson = b2Lessons.find((entry) => entry.legacyLessonId === legacyLessonId);
    assert.ok(lesson, legacyLessonId);
    return readFile(path.join(sourceRoot, lesson.sourcePath), "utf8");
  };

  assert.match(
    await byId("b2-past-perfect-continuous"),
    /quá trình gây ra kết quả[\s\S]*động từ trạng thái[\s\S]*quá khứ tiếp diễn/i,
  );
  assert.match(
    await byId("b2-future-perfect"),
    /`By Friday`[\s\S]*`Until Friday`[\s\S]*mệnh đề thời gian/i,
  );
  assert.match(
    await byId("b2-past-deduction-modal-perfect"),
    /must have[\s\S]*may\/might\/could have[\s\S]*can't\/couldn't have[\s\S]*mustn't have/is,
  );
  assert.match(
    await byId("b2-past-deduction-modal-perfect"),
    /cấu trúc tình thái hoàn thành[\s\S]*động từ tình thái/i,
  );
  assert.match(
    await byId("b2-neednt-have"),
    /needn't have[\s\S]*didn't need to[\s\S]*thực tế/i,
  );
  assert.match(
    await byId("b2-mixed-conditionals"),
    /quá khứ[\s\S]*hiện tại[\s\S]*hiện tại[\s\S]*quá khứ/i,
  );
  assert.match(
    await byId("b2-reporting-passive"),
    /to be \+ V-ing[\s\S]*to have \+ past participle[\s\S]*to have been \+ past participle/i,
  );
  assert.match(
    await byId("b2-countability-by-meaning"),
    /glass[\s\S]*paper[\s\S]*chicken[\s\S]*experience/i,
  );
  assert.match(
    await byId("b2-complex-agreement"),
    /A number of[\s\S]*the number of[\s\S]*collective/i,
  );
  assert.match(
    await byId("b2-reduced-relative-clauses"),
    /V-ing[\s\S]*bị động[\s\S]*to-infinitive[\s\S]*Khi nào không rút gọn/i,
  );
  assert.match(
    await byId("b2-special-article-contexts"),
    /from the age of six/i,
  );
  assert.doesNotMatch(
    await byId("b2-special-article-contexts"),
    /go to school at six/i,
  );
  assert.match(
    await byId("b2-participle-clauses"),
    /phân từ hoàn thành\*{0,2} \(\*perfect participle\*\)/i,
  );
  assert.match(
    await byId("b2-colon-semicolon-dash"),
    /dấu hai chấm[\s\S]*dấu chấm phẩy[\s\S]*gạch ngang dài[\s\S]*lỗi nối hai mệnh đề bằng dấu phẩy/i,
  );

  const c1ContentClause = bookLessons.find((lesson) => lesson.slug === "content-clauses-sau-danh-tu-tinh-tu-va-dong-tu-nclause-03");
  assert.equal(c1ContentClause?.title, "Mệnh đề nội dung làm bổ ngữ của động từ và tính từ");
});

test("keeps every C1 theory lesson complete, published, and discourse-aware", async () => {
  const c1Lessons = bookLessons.filter((lesson) => lesson.level === "C1");
  assert.equal(c1Lessons.length, 25);
  assert.ok(c1Lessons.every((lesson) => lesson.status === "published"));
  assert.deepEqual(
    [...new Set(c1Lessons.map((lesson) => lesson.moduleTitle))],
    [
      "Chương 36. Mệnh đề và hệ thống bổ ngữ nâng cao",
      "Chương 37. Thức, tình thái và đảo ngữ",
      "Chương 38. Cấu trúc thông tin, lược bỏ và ngữ pháp văn nói",
      "Chương 39. Độ chính xác và văn phong",
    ],
  );

  for (const lesson of c1Lessons) {
    const source = await readFile(path.join(sourceRoot, lesson.sourcePath), "utf8");
    const body = source.replace(/^---[\s\S]*?---\s*/, "");
    const words = body.trim().split(/\s+/).length;
    assert.ok(words >= 1000 && words <= 1450, `${lesson.sourcePath}: ${words}`);
    assert.equal((body.match(/^# /gm) ?? []).length, 1, lesson.sourcePath);
    assert.ok((body.match(/^## /gm) ?? []).length >= 7, `${lesson.sourcePath}: thiếu các bước giải thích C1`);
    assert.equal(body.match(/^# (.+)$/m)?.[1], lesson.title, lesson.sourcePath);
    assert.match(body, /## Ghi nhớ/, lesson.sourcePath);
    assert.doesNotMatch(body, /đang được biên soạn|nội dung tạm|TODO/i, lesson.sourcePath);
    assert.match(body, /không|tránh|giới hạn|chỉ khi|không phải/i, `${lesson.sourcePath}: cần nêu giới hạn hoặc lỗi dễ nhầm`);
  }

  const byId = async (legacyLessonId) => {
    const lesson = c1Lessons.find((entry) => entry.legacyLessonId === legacyLessonId);
    assert.ok(lesson, legacyLessonId);
    return readFile(path.join(sourceRoot, lesson.sourcePath), "utf8");
  };

  assert.match(await byId("c1-fronted-prepositions"), /giới từ đứng trước[\s\S]*whom[\s\S]*which[\s\S]*không dùng `that`/i);
  assert.match(await byId("c1-free-relatives"), /cả mệnh đề[\s\S]*the thing that[\s\S]*whoever[\s\S]*whatever/i);
  assert.match(await byId("c1-content-complements"), /factive[\s\S]*whether[\s\S]*extraposition/i);
  assert.match(await byId("c1-valency-complementation"), /argument[\s\S]*adjunct[\s\S]*complex-transitive/i);
  assert.match(await byId("c1-mandative-subjunctive"), /base verb[\s\S]*should[\s\S]*Anh Anh/i);
  assert.match(await byId("c1-conditional-inversion"), /Had \+ subject[\s\S]*Were \+ subject[\s\S]*Should \+ subject/i);
  assert.match(await byId("c1-modal-stance"), /bằng chứng[\s\S]*mức cam kết[\s\S]*phần trăm xác suất cố định/i);
  assert.match(await byId("c1-there-it-information"), /existential[\s\S]*extraposition[\s\S]*tham chiếu/i);
  assert.match(await byId("c1-comparative-ellipsis"), /than me[\s\S]*than I am[\s\S]*mơ hồ/i);
  assert.match(await byId("c1-spoken-grammar"), /Cấu trúc đầu[\s\S]*Cấu trúc đuôi[\s\S]*Lược bỏ theo tình huống/i);
  assert.match(await byId("c1-advanced-determiners"), /predeterminer[\s\S]*central determiner[\s\S]*partitive/i);
  assert.match(await byId("c1-notional-agreement"), /ngữ pháp[\s\S]*theo nghĩa[\s\S]*từ gần/i);
  assert.match(await byId("c1-reference-ambiguity"), /tiền ngữ[\s\S]*reflexive[\s\S]*mơ hồ/i);
  assert.match(await byId("c1-nominalisation"), /tác nhân[\s\S]*nguyên nhân[\s\S]*danh hóa bị dùng quá nhiều/i);
  assert.match(await byId("c1-hedging-boosting"), /hedging[\s\S]*boosting[\s\S]*quy nguồn/i);
  assert.match(await byId("c1-register-choice"), /văn nói[\s\S]*văn viết[\s\S]*thân mật[\s\S]*trang trọng/i);
  assert.match(await byId("c1-punctuation-discourse"), /dấu chấm phẩy[\s\S]*dấu hai chấm[\s\S]*dấu gạch ngang dài[\s\S]*sự mơ hồ/i);

  const perfectNonFinite = await byId("c1-perfect-passive-nonfinite");
  assert.match(perfectNonFinite, /Having been rejected twice[\s\S]*là câu đúng/i);
  assert.doesNotMatch(perfectNonFinite, /Having been rejected twice[^\n]*có vấn đề về chủ thể/i);

  const advancedDeterminers = await byId("c1-advanced-determiners");
  assert.match(advancedDeterminers, /all three of these reports/i);
  assert.doesNotMatch(advancedDeterminers, /^- `all of these three reports`/im);

  const registerChoice = await byId("c1-register-choice");
  assert.match(registerChoice, /email hoặc thông báo cần tự đứng độc lập hơn/i);
  assert.doesNotMatch(registerChoice, /Báo cáo phải tự đứng độc lập hơn:[\s\S]{0,100}Have you seen/i);
});

test("resolves every relative Markdown lesson link", async () => {
  for (const lesson of bookLessons.filter((entry) => entry.status === "published")) {
    const absolutePath = path.join(sourceRoot, lesson.sourcePath);
    const source = await readFile(absolutePath, "utf8");
    for (const match of source.matchAll(/\[[^\]]+\]\(([^)]+\.md)\)/g)) {
      const target = path.resolve(path.dirname(absolutePath), match[1]);
      await assert.doesNotReject(readFile(target, "utf8"), `${lesson.sourcePath} → ${match[1]}`);
    }
  }
});

test("keeps the punctuation curriculum spiral visible in the roadmap", () => {
  const punctuation = bookLessons.filter((lesson) => /-punc-\d+\.md$/.test(lesson.sourcePath));
  assert.deepEqual(
    punctuation.map((lesson) => lesson.level),
    ["Pre-A1", "A1", "A2", "B1", "B2", "C1"],
  );
});
