import assert from "node:assert/strict";
import test from "node:test";
import { exerciseDataByLegacyId } from "../app/exercise-data.ts";
import {
  isAlignedMatchOrder,
  isPredictableSortOrder,
  isRotationOf,
  matchOptionOrder,
} from "../app/exercises/answer-order.ts";
import { sentenceTokens } from "../app/exercises/basic-builders.ts";
import { allLessonTopicHints, lessonTopicHint } from "../app/exercises/quality.ts";

const entries = Object.entries(exerciseDataByLegacyId);
const allExercises = entries.flatMap(([, exercises]) => exercises);
const a1LessonIds = [
  "possessives", "possessive-s", "possessive-pronouns", "whose-questions",
  "irregular-plurals", "apostrophes", "countable-uncountable", "there-and-place",
  "some-any-there", "prepositions-place", "prepositions-place-time", "action-vs-be",
  "present-simple-base", "third-person", "present-simple-negative",
  "present-simple-questions", "present-simple-wh", "have-have-got", "frequency",
  "objects-and-links", "quantity-basic", "how-much-many", "ability-can",
  "can-requests", "question-helpers", "instructions-and-can", "lets-suggestions",
  "would-like", "continuous-form", "continuous-questions", "continuous-uses",
  "simple-vs-continuous", "states-and-plans", "adjectives-position",
  "adverbs-manner", "sentence-order", "connectors-basic",
];

function sameMultiset(left, right) {
  return [...left].sort().join("\u0000") === [...right].sort().join("\u0000");
}

test("stores one final exercise set for every available lesson", () => {
  assert.ok(entries.length > 0);
  assert.ok(entries.every(([, exercises]) => exercises.length > 0));
  assert.equal(new Set(allExercises.map((exercise) => exercise.id)).size, allExercises.length);
});

test("keeps every exercise answer valid and checkable", () => {
  for (const exercise of allExercises) {
    assert.ok(exercise.id && exercise.prompt);
    assert.ok(exercise.hint && exercise.explanation);
    assert.notEqual(exercise.hint.trim(), exercise.explanation.trim(), `${exercise.id}: gợi ý không được chép nguyên lời giải`);
    assert.ok(!exercise.hint.includes("___"), `${exercise.id}: gợi ý không được để lại chỗ trống máy móc`);
    assert.doesNotMatch(exercise.prompt, /[.?!]”\./, `${exercise.id}: câu hỏi có hai dấu kết thúc liên tiếp`);
    assert.doesNotMatch(exercise.hint, /[.?!]”\./, `${exercise.id}: gợi ý có hai dấu kết thúc liên tiếp`);
    assert.doesNotMatch(exercise.explanation, /[.?!]”\./, `${exercise.id}: lời giải có hai dấu kết thúc liên tiếp`);
    for (const [label, value] of [["câu hỏi", exercise.prompt], ["gợi ý", exercise.hint], ["lời giải", exercise.explanation]]) {
      assert.doesNotMatch(value, /””/, `${exercise.id}: ${label} có hai dấu ngoặc kép đóng liền nhau`);
      assert.doesNotMatch(value, /`[^`]*[.?!]`[.,]/, `${exercise.id}: ${label} lặp dấu câu ngay sau nội dung mã`);
    }
    if (exercise.kind === "context") {
      assert.ok(exercise.context.trim(), `${exercise.id}: bài có ngữ cảnh phải chứa ngữ cảnh thật`);
    }

    switch (exercise.kind) {
      case "choice":
      case "context":
        assert.ok(exercise.options.includes(exercise.answer), exercise.id);
        break;
      case "order":
        assert.ok(sameMultiset(exercise.tokens, exercise.answer), exercise.id);
        break;
      case "match":
        assert.ok(exercise.pairs.length > 0, exercise.id);
        break;
      case "sort":
        assert.ok(exercise.items.every((item) => exercise.buckets.includes(item.bucket)), exercise.id);
        break;
      case "tap":
        assert.ok(exercise.answerIndexes.length > 0, exercise.id);
        assert.ok(exercise.answerIndexes.every((index) => index >= 0 && index < exercise.tokens.length));
        assert.equal(exercise.selectionMode, exercise.answerIndexes.length === 1 ? "single" : "multiple");
        break;
      case "repair":
        assert.ok(exercise.targetIndex >= 0 && exercise.targetIndex < exercise.tokens.length, exercise.id);
        assert.ok(exercise.replacements.includes(exercise.answer), exercise.id);
        assert.equal(new Set(exercise.replacements).size, exercise.replacements.length, exercise.id);
        assert.notEqual(exercise.tokens[exercise.targetIndex], exercise.answer, `${exercise.id}: mảnh nguồn đã đúng sẵn`);
        break;
      case "grid":
        assert.ok(exercise.rows.every((row) => row.options.includes(row.answer)), exercise.id);
        break;
      case "dropdown":
        assert.ok(
          exercise.slots.every((slot) =>
            slot.acceptedAnswers.every((answer) => slot.options.includes(answer)),
          ),
          exercise.id,
        );
        break;
      case "exact-input":
        assert.ok(exercise.acceptedAnswers.length > 0, exercise.id);
        assert.ok(exercise.acceptedAnswers.every((answer) => !answer.includes("`")), `${exercise.id}: đáp án nhập không được chứa ký hiệu Markdown`);
        break;
      case "timeline":
        assert.ok(exercise.options.some((option) => option.id === exercise.answerId), exercise.id);
        break;
      default:
        assert.fail(`Loại bài tập không được hỗ trợ: ${exercise.kind}`);
    }
  }
});

test("never lets the position of an option give away the answer", () => {
  for (const [lessonId, exercises] of entries) {
    const slots = [];
    for (const exercise of exercises) {
      if (exercise.kind === "choice" || exercise.kind === "context") {
        slots.push([exercise.options.indexOf(exercise.answer), exercise.options.length]);
      } else if (exercise.kind === "repair") {
        slots.push([exercise.replacements.indexOf(exercise.answer), exercise.replacements.length]);
      } else if (exercise.kind === "timeline") {
        slots.push([exercise.options.findIndex((option) => option.id === exercise.answerId), exercise.options.length]);
      } else if (exercise.kind === "grid") {
        for (const row of exercise.rows) slots.push([row.options.indexOf(row.answer), row.options.length]);
      } else if (exercise.kind === "dropdown") {
        for (const slot of exercise.slots) {
          slots.push([slot.options.findIndex((option) => slot.acceptedAnswers.includes(option)), slot.options.length]);
        }
      } else if (exercise.kind === "order" && exercise.answer.length >= 3) {
        assert.ok(!isRotationOf(exercise.tokens, exercise.answer), `${exercise.id}: các mảnh đang xoay vòng từ câu đúng`);
      } else if (exercise.kind === "sort" && exercise.items.length >= 3 && new Set(exercise.items.map((item) => item.bucket)).size > 1) {
        assert.ok(!isPredictableSortOrder(exercise.items, exercise.buckets), `${exercise.id}: thứ tự mục để lộ nhóm`);
      } else if (exercise.kind === "match") {
        assert.ok(!isAlignedMatchOrder(exercise.pairs, matchOptionOrder(exercise)), `${exercise.id}: lựa chọn xếp theo thứ tự hàng`);
      }
    }

    // Câu hỏi in sẵn các mảnh (bài sắp xếp, bài gõ lại câu) không được in theo vòng xoay của câu đúng.
    for (const exercise of exercises) {
      const printed = exercise.prompt.match(/mảnh `([^`]+)`/)?.[1]?.split(" · ");
      if (!printed || printed.length < 3) continue;
      const answer = exercise.kind === "order" ? exercise.answer
        : exercise.kind === "exact-input" ? sentenceTokens(exercise.acceptedAnswers[0]) : null;
      if (answer) assert.ok(!isRotationOf(printed, answer), `${exercise.id}: câu hỏi in các mảnh theo thứ tự của câu đúng`);
    }
    for (const exercise of exercises) {
      assert.doesNotMatch(exercise.hint, /“[^”]+” trong phương án còn lại/, `${exercise.id}: gợi ý chỉ ra phương án sai`);
    }

    // Phương án được xáo khi hiển thị, nên lời giải thích không được chỉ “câu đầu”, “cách trên”...
    const positional = /(câu|phương án|lựa chọn|đáp án|cách|cụm)\s+(đầu tiên|đầu|thứ nhất|thứ hai|thứ ba|trên|dưới)(?![\p{L}])/iu;
    for (const exercise of exercises) {
      if (!["choice", "context", "grid", "dropdown", "repair", "timeline"].includes(exercise.kind)) continue;
      const options = exercise.kind === "choice" || exercise.kind === "context" ? exercise.options
        : exercise.kind === "grid" ? exercise.rows.flatMap((row) => row.options)
          : exercise.kind === "dropdown" ? exercise.slots.flatMap((slot) => slot.options)
            : exercise.kind === "repair" ? exercise.replacements : [];
      for (const text of [exercise.hint, exercise.explanation, ...options]) {
        assert.ok(!positional.test(text.replace(/`[^`]*`/g, "")), `${exercise.id}: chỉ phương án theo vị trí — ${text}`);
      }
    }

    const choiceSlots = slots.filter(([, optionCount]) => optionCount >= 2);
    for (let position = 0; position < 4; position++) {
      const actual = choiceSlots.filter(([index]) => index === position).length;
      const expected = choiceSlots.reduce(
        (total, [, optionCount]) => total + (optionCount > position ? 1 / optionCount : 0),
        0,
      );
      assert.ok(
        actual <= expected + 3,
        `${lessonId}: đáp án nằm ở vị trí ${position + 1} trong ${actual}/${choiceSlots.length} lựa chọn, kỳ vọng khoảng ${expected.toFixed(1)}`,
      );
    }
  }
});

test("does not recycle one answer across many different activities", () => {
  function answersFor(exercise) {
    if (["choice", "context", "repair"].includes(exercise.kind)) return [exercise.answer];
    if (exercise.kind === "order") return [exercise.answer.join(" ")];
    if (exercise.kind === "match") return exercise.pairs.map((pair) => pair.right);
    if (exercise.kind === "grid") return exercise.rows.map((row) => row.answer);
    if (exercise.kind === "dropdown") return exercise.slots.flatMap((slot) => slot.acceptedAnswers);
    if (exercise.kind === "exact-input") return exercise.acceptedAnswers;
    if (exercise.kind === "tap") return [exercise.answerIndexes.map((index) => exercise.tokens[index]).join(" ")];
    return [];
  }

  for (const [lessonId, exercises] of entries) {
    const counts = new Map();
    for (const exercise of exercises) {
      for (const answer of answersFor(exercise)) {
        const normalized = answer.replaceAll("`", "").trim().toLocaleLowerCase("vi");
        if (normalized.length < 8) continue;
        counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
      }
    }
    assert.ok(Math.max(0, ...counts.values()) <= 2, `${lessonId}: một đáp án dài đang bị dùng quá hai lần`);
  }
});

test("keeps hints well-formed after hiding answer terms", () => {
  for (const exercise of allExercises) {
    assert.equal((exercise.hint.match(/`/g) ?? []).length % 2, 0, `${exercise.id}: gợi ý có dấu backtick không cân bằng`);
    assert.doesNotMatch(exercise.hint, /hình thức cần tìm[\p{L}\p{N}]|[\p{L}\p{N}]hình thức cần tìm/u, exercise.id);
    assert.doesNotMatch(exercise.hint, /hình thức cần tìm/u, exercise.id);
  }

  const advancedTapExercises = entries
    .filter(([lessonId]) => /^(?:b2|c1)-/.test(lessonId))
    .flatMap(([, exercises]) => exercises)
    .filter((exercise) => exercise.kind === "tap");
  assert.deepEqual(advancedTapExercises, [], "B2–C1 không được sinh bài chạm từ phép so sánh chuỗi máy móc");
});

test("keeps exercise objectives, hints, prompts, and feedback pedagogically specific", () => {
  const bannedHintFragments = [
    "Trọng tâm là",
    "Dựa vào nghĩa tiếng Việt để dựng khung câu trước khi đặt dấu câu",
    "Đọc lại câu sau mỗi phương án thay thế",
    "Chọn theo công việc mà yêu cầu nêu",
    "Nếu yêu cầu nói “tất cả”",
  ];
  const bannedFeedbackStarts = [
    "Các cặp đúng cùng thể hiện",
    "Mỗi mục đã được phân loại theo",
    "Mỗi hàng cần một lựa chọn duy nhất phù hợp",
  ];

  for (const [lessonId, exercises] of entries) {
    const objectiveIds = new Set();
    const hintCounts = new Map();
    assert.equal(new Set(exercises.map((exercise) => exercise.prompt.trim())).size, exercises.length, `${lessonId}: không lặp nguyên câu hỏi`);
    for (const exercise of exercises) {
      assert.match(exercise.objectiveId ?? "", new RegExp(`^${lessonId}:`), exercise.id);
      objectiveIds.add(exercise.objectiveId);
      hintCounts.set(exercise.hint, (hintCounts.get(exercise.hint) ?? 0) + 1);
      for (const fragment of bannedHintFragments) assert.doesNotMatch(exercise.hint, new RegExp(fragment, "i"), exercise.id);
      for (const fragment of bannedFeedbackStarts) assert.ok(!exercise.explanation.startsWith(fragment), exercise.id);
      if (["choice", "context", "repair"].includes(exercise.kind)) {
        const answer = exercise.answer.replaceAll("`", "").trim();
        const hint = exercise.hint.replaceAll("`", "");
        if (answer.length >= 2) {
          const escaped = answer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          assert.doesNotMatch(hint, new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "iu"), exercise.id);
        }
      }
    }
    assert.ok(objectiveIds.size >= 4, `${lessonId}: cần ít nhất bốn kiểu mục tiêu luyện tập`);
    assert.ok(Math.max(...hintCounts.values()) <= 3, `${lessonId}: một gợi ý đang bị lặp quá nhiều`);
  }

  const source = JSON.stringify(exerciseDataByLegacyId);
  assert.doesNotMatch(source, /\b(?:biger|comfortabler|dangerer)\b/i);
  assert.doesNotMatch(source, /A book is useful nói chung|A car is blocking the gate, dù|If it rains, we stay home tomorrow chắc chắn|She plans travelling theo mẫu|I want that you wait theo mẫu|I made myself the cake luôn|Anything is broken trong câu/i);
  assert.equal(exerciseDataByLegacyId["a2-comparative-modifiers"].find((exercise) => exercise.id === "a2cm24")?.prompt, "Chọn cụm diễn tả đúng từng mức độ so sánh.");

  for (const id of ["a2pb21", "a2pc21"]) {
    const exercise = allExercises.find((item) => item.id === id);
    assert.equal(exercise?.kind, "match");
    assert.equal(new Set(exercise.pairs.map((pair) => pair.left)).size, exercise.pairs.length, id);
    assert.equal(new Set(exercise.pairs.map((pair) => pair.right)).size, exercise.pairs.length, id);
    assert.ok(exercise.pairs.every((pair) => /\b(?:was|were)\b/.test(pair.left) && /`(?:was|were)`/.test(pair.right)), id);
  }
});

function displayedInstructions(exercise) {
  return [
    ["câu hỏi", exercise.prompt],
    ...(exercise.kind === "grid" ? exercise.rows.map((row) => ["hàng", row.cue]) : []),
    ...(exercise.kind === "dropdown" ? exercise.slots.map((slot) => ["ô chọn", slot.label]) : []),
  ];
}

test("shows one natural instruction instead of stacked generator templates", () => {
  const stackedTemplates = [
    /hàng đầu tiên nêu/i,
    /bắt đầu từ (?:nội dung|ví dụ)/i,
    /nhóm \d+ bắt đầu bằng/i,
    /Cách diễn đạt sau đáp ứng yêu cầu nào/i,
    /Câu nào diễn đạt đúng điều sau/i,
    /So sánh trực tiếp hai phương án/i,
    /sau khi sửa phần chưa phù hợp/i,
    /ví dụ đầu tiên là/i,
    /Chọn (?:cả câu diễn đạt đúng|một cách diễn đạt khác vẫn đúng) yêu cầu sau/i,
    /mảnh `[^`]+` (?:thành một câu|để viết một câu|để thể hiện)[^.]*(?:thể hiện|đúng về)/i,
    /\. Chọn câu hoàn chỉnh\.$/,
    /Chọn riêng mảnh/i,
  ];
  // Một mệnh lệnh không được nối thêm mệnh lệnh thứ hai sau dấu hai chấm hay chấm phẩy.
  const secondInstruction = /[:;]\s*(?:Chọn|Câu nào|Cách diễn đạt|Ghép|Sắp xếp|Hãy)(?![\p{L}])/u;
  for (const exercise of allExercises) {
    for (const [label, text] of displayedInstructions(exercise)) {
      for (const template of stackedTemplates) {
        assert.doesNotMatch(text, template, `${exercise.id}: ${label} còn ghép nhãn mẫu — ${text}`);
      }
      assert.doesNotMatch(text, secondInstruction, `${exercise.id}: ${label} chứa hai mệnh lệnh — ${text}`);
    }
  }
});

test("never ends a sentence with doubled punctuation", () => {
  const doubled = /[?!]\.(?=\s|$)|(?<!\.)\.\.(?=\s|$)/;
  for (const exercise of allExercises) {
    for (const [label, text] of [
      ...displayedInstructions(exercise),
      ["gợi ý", exercise.hint],
      ["lời giải", exercise.explanation],
    ]) {
      assert.doesNotMatch(text, doubled, `${exercise.id}: ${label} có hai dấu kết thúc liên tiếp — ${text}`);
    }
  }
});

test("chooses topic hints by lesson, not by loose words in the prompt", () => {
  for (const [lessonId, exercises] of entries) {
    for (const exercise of exercises) {
      for (const topic of allLessonTopicHints) {
        if (exercise.hint.includes(topic)) {
          assert.equal(lessonTopicHint(lessonId), topic, `${exercise.id}: gợi ý mang chủ đề của bài khác`);
        }
      }
    }
  }

  const possessionLessons = new Set(["possessives", "possessive-s", "possessive-pronouns", "whose-questions"]);
  const possessionHint = /Xác định người hoặc vật có quan hệ sở hữu|Xác định ai là người sở hữu/;
  for (const [lessonId, exercises] of entries) {
    for (const exercise of exercises) {
      if (possessionHint.test(exercise.hint)) {
        assert.ok(possessionLessons.has(lessonId), `${exercise.id}: gợi ý sở hữu xuất hiện ngoài bài về sở hữu`);
      }
    }
  }

  // Các câu từng nhận gợi ý sai chủ đề chỉ vì câu hỏi có chữ “của”, “nơi chốn”, “sớm hơn”...
  const offTopic = {
    nt7: /sở hữu/,
    wj7: /giới từ|mốc làm chuẩn|nơi chốn thật/,
    a1hm8: /dấu hiệu thời gian|thói quen/,
    a2jy2: /so sánh/,
    a2pi1: /sở hữu/,
    a2cp6: /sở hữu/,
    a1cax1: /sở hữu/,
    aa16: /không đếm được/,
  };
  for (const [id, pattern] of Object.entries(offTopic)) {
    const exercise = allExercises.find((item) => item.id === id);
    assert.ok(exercise, id);
    assert.doesNotMatch(exercise.hint, pattern, `${id}: gợi ý nói về chủ đề khác — ${exercise.hint}`);
  }
});

test("gives each generated grid, match, and dropdown its own specific hint", () => {
  for (const exercise of allExercises) {
    if (exercise.kind !== "dropdown") continue;
    assert.doesNotMatch(exercise.hint, /^Trong nhóm \d+/, `${exercise.id}: gợi ý chung cho mọi bài chọn mô tả`);
    // Gợi ý phải nhắc tới chính các câu của hoạt động.
    const quoted = [...exercise.hint.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
    assert.ok(quoted.length > 0, `${exercise.id}: gợi ý không chỉ vào câu nào`);
    for (const fragment of quoted) {
      assert.ok(
        exercise.slots.some((slot) => slot.label.includes(fragment)) || exercise.hint.includes("cách nói dễ nhầm"),
        `${exercise.id}: gợi ý nhắc tới “${fragment}” nhưng không câu nào chứa phần đó`,
      );
    }
  }

  const generatedLessons = entries.filter(([lessonId]) => /^(?:b1|b2|c1)-/.test(lessonId));
  for (const [lessonId, exercises] of generatedLessons) {
    for (const exercise of exercises) {
      if (!["grid", "match", "dropdown"].includes(exercise.kind)) continue;
      // Bảng dựng bằng compactPracticeSet (một số bài B1 chương 20) vẫn liệt kê dấu hiệu từng hàng; ở đây chỉ xét bộ sinh B1–C1.
      if (exercise.hint.startsWith("Giải riêng từng hàng; chú ý lần lượt các dấu hiệu")) continue;
      const rowText = exercise.kind === "grid" ? exercise.rows.map((row) => row.cue)
        : exercise.kind === "match" ? exercise.pairs.map((pair) => pair.left) : [];
      for (const text of rowText) {
        assert.ok(!exercise.hint.includes(text), `${lessonId}/${exercise.id}: gợi ý chỉ chép lại một hàng`);
      }
    }
  }
});

test("does not claim that every row of a contrast activity shows the lesson focus", () => {
  for (const exercise of allExercises) {
    assert.doesNotMatch(exercise.explanation, /Mỗi lựa chọn khớp với|^Các cặp đúng là: .*\. Mỗi cặp cho thấy/, `${exercise.id}: lời giải gán trọng tâm bài cho mọi hàng`);
  }
  for (const id of ["a2fc25", "a2zc25", "a2tc25", "a2utp25", "a2ca24"]) {
    const exercise = allExercises.find((item) => item.id === id);
    assert.equal(exercise?.kind, "grid", id);
    assert.match(exercise.explanation, /^Các câu hoàn chỉnh lần lượt là: /, id);
  }
});

test("turns overused answers into natural activities instead of appending instructions", () => {
  const byId = (id) => allExercises.find((exercise) => exercise.id === id);

  const nounTypes = byId("nt3");
  for (const row of nounTypes.rows) {
    assert.doesNotMatch(row.cue, /Chọn/, "nt3: hàng phân loại không được nhận thêm mệnh lệnh");
    if (row.options.some((option) => option.includes("—"))) {
      assert.ok(row.options.every((option) => option.startsWith(`${row.cue} — `)), `nt3: ${row.cue}`);
    }
  }

  // Câu hoàn chỉnh dựng lại từ phương án sai giữ chữ hoa đầu câu như câu đúng.
  for (const row of byId("a1hm23").rows) {
    if (row.answer === row.completed) {
      assert.ok(row.options.every((option) => /^[A-Z]/.test(option)), `a1hm23: ${row.options.join(" | ")}`);
    }
  }

  assert.equal(byId("bq10").prompt, "Ghép mỗi câu trả lời khẳng định với câu hỏi phù hợp.");
  assert.equal(byId("bq11").prompt, "Ghép mỗi câu trả lời phủ định với câu hỏi phù hợp.");
  assert.equal(byId("a1aj21").prompt, "Ghép mỗi ví dụ với loại tính từ tương ứng.");

  assert.equal(byId("nt22").kind, "choice");
  assert.equal(byId("nt22").prompt, "Dòng nào đúng?");
  assert.equal(byId("a2rr16").prompt, "Câu nào diễn tả hành động qua lại?");
  assert.ok(byId("a2rr16").options.length >= 3, "a2rr16: giữ đủ các phương án thay thế của bài sửa gốc");
});

test("gives Chapter 1 varied practice without leaving the taught scope", () => {
  const chapterOneIds = [
    "language-units",
    "word-jobs",
    "subject-predicate",
    "subjects-and-pronouns",
    "action-sentences",
    "objects-basic",
    "sentence-signals",
  ];

  for (const lessonId of chapterOneIds) {
    const exercises = exerciseDataByLegacyId[lessonId];
    assert.ok(exercises);
    assert.ok(exercises.length >= 25, `${lessonId}: ${exercises.length}`);
    assert.ok(new Set(exercises.map((exercise) => exercise.kind)).size >= 4, lessonId);
  }

  const pronounSort = exerciseDataByLegacyId["subjects-and-pronouns"].find(
    (exercise) => exercise.id === "pro2",
  );
  assert.deepEqual(pronounSort?.buckets, [
    "Chỉ riêng người nói",
    "Người nghe — một hoặc nhiều",
    "Một đối tượng khác",
    "Nhóm có người nói",
    "Nhóm khác",
  ]);

  const frameGrid = exerciseDataByLegacyId["action-sentences"].find(
    (exercise) => exercise.id === "fr6",
  );
  assert.equal(
    frameGrid?.prompt,
    "Chọn khung SV, SVC hoặc SVO phù hợp cho từng câu.",
  );

  const chapterOneSource = JSON.stringify(
    Object.fromEntries(chapterOneIds.map((lessonId) => [lessonId, exerciseDataByLegacyId[lessonId]])),
  );
  assert.doesNotMatch(chapterOneSource, /\bplay\b/i);

  const pronounRepair = exerciseDataByLegacyId["subjects-and-pronouns"].find(
    (exercise) => exercise.id === "pro4",
  );
  assert.equal(pronounRepair?.answer, "she");
  const animalPronounSelection = exerciseDataByLegacyId["subjects-and-pronouns"].find(
    (exercise) => exercise.id === "pro20",
  );
  assert.match(animalPronounSelection?.prompt ?? "", /the cat/);
  assert.equal(animalPronounSelection?.answer, "it");

  const finalPunctuationOrder = exerciseDataByLegacyId["sentence-signals"].find(
    (exercise) => exercise.id === "pun24",
  );
  assert.deepEqual(finalPunctuationOrder?.answer, ["We", "help", "Nam", "."]);

  const chapterOneExercises = chapterOneIds.flatMap(
    (lessonId) => exerciseDataByLegacyId[lessonId],
  );
  const selectSlotExercises = chapterOneExercises.filter(
    (exercise) => exercise.kind === "repair",
  );
  assert.equal(selectSlotExercises.length, 16);
  for (const exercise of selectSlotExercises) {
    assert.doesNotMatch(exercise.prompt, /\bsửa\b/i, exercise.id);
  }
  const promptPatternsByKind = {
    match: /\bGhép\b/,
    sort: /^(?:Chọn|Phân loại|Đặt|Trong)/,
    choice: /\?$/,
    context: /\?$/,
    grid: /^(?:Chọn|Trả lời)/,
    repair: /^(?:Chọn|`|Trong|Lan|Nam|Mai|Đại từ)/,
    order: /^(?:Xếp|Sắp xếp)/,
    tap: /^(?:Trong|Chọn)/,
  };
  for (const exercise of chapterOneExercises) {
    const expectedPattern = promptPatternsByKind[exercise.kind];
    assert.ok(expectedPattern, `Chưa khai báo quy tắc cho ${exercise.kind}`);
    assert.match(exercise.prompt, expectedPattern, exercise.id);
  }
  const outdatedPromptFragments = [
    "Bốn tên gọi chỉ bốn tầng",
    "Mỗi ví dụ làm một công việc khác nhau",
    "Dựa vào các ví dụ đã xuất hiện",
    "Tìm phần mà câu đang nói tới",
    "Nhìn công việc của phần đứng sau động từ",
    "Mỗi dấu có một mục đích chính",
  ];
  for (const exercise of chapterOneExercises) {
    assert.ok(
      outdatedPromptFragments.every((fragment) => !exercise.prompt.includes(fragment)),
      exercise.id,
    );
  }
});

test("gives every Chapter 2 lesson broad practice within the taught noun-phrase scope", () => {
  const chapterTwoIds = [
    "noun-types",
    "articles-demonstratives",
    "nouns-and-number",
    "demonstratives",
  ];

  for (const lessonId of chapterTwoIds) {
    const exercises = exerciseDataByLegacyId[lessonId];
    assert.ok(exercises, lessonId);
    assert.ok(exercises.length >= 25 && exercises.length <= 40, `${lessonId}: ${exercises.length}`);
    assert.ok(new Set(exercises.map((exercise) => exercise.kind)).size >= 6, lessonId);
  }

  const nounTypesSource = JSON.stringify(exerciseDataByLegacyId["noun-types"]);
  assert.match(nounTypesSource, /danh từ chung/);
  assert.match(nounTypesSource, /danh từ riêng/);
  assert.match(nounTypesSource, /danh từ đếm được/);
  assert.match(nounTypesSource, /số ít/);

  const articleSource = JSON.stringify(exerciseDataByLegacyId["articles-demonstratives"]);
  assert.match(articleSource, /a university/);
  assert.match(articleSource, /an hour/);
  assert.match(articleSource, /Từ đứng ngay sau mạo từ/);

  const pluralSource = JSON.stringify(exerciseDataByLegacyId["nouns-and-number"]);
  for (const form of ["books", "buses", "dishes", "watches", "boxes", "quizzes", "babies", "toys"]) {
    assert.match(pluralSource, new RegExp(`\\b${form}\\b`), form);
  }
  assert.match(pluralSource, /book's/);
  assert.doesNotMatch(
    pluralSource,
    /\b(?:bookes|buss|classs|dishs|watchs|boxs|babys|citys|familys|boies|toies|keies)\b/,
  );

  const demonstrativeSource = JSON.stringify(exerciseDataByLegacyId["demonstratives"]);
  for (const form of ["this", "that", "these", "those"]) {
    assert.match(demonstrativeSource, new RegExp(`\\b${form}\\b`), form);
  }
  assert.doesNotMatch(demonstrativeSource, /\b(?:am|is|are)\b/i);

  const chapterTwoExercises = chapterTwoIds.flatMap(
    (lessonId) => exerciseDataByLegacyId[lessonId],
  );
  const prompts = chapterTwoExercises.map((exercise) => exercise.prompt.trim());
  assert.equal(new Set(prompts).size, prompts.length);
  for (const exercise of chapterTwoExercises) {
    assert.doesNotMatch(exercise.prompt, /^(?:Chọn đáp án đúng|Chọn theo tình huống)$/i, exercise.id);
  }
});

test("gives every Chapter 3 lesson comprehensive and unambiguous be practice", () => {
  const chapterThreeIds = [
    "be-forms",
    "be-meanings",
    "be-negative",
    "be-questions",
    "be-wh-questions",
  ];

  for (const lessonId of chapterThreeIds) {
    const exercises = exerciseDataByLegacyId[lessonId];
    assert.ok(exercises, lessonId);
    assert.ok(exercises.length >= 25 && exercises.length <= 40, `${lessonId}: ${exercises.length}`);
    assert.ok(new Set(exercises.map((exercise) => exercise.kind)).size >= 6, lessonId);
  }

  const chapterThreeExercises = chapterThreeIds.flatMap(
    (lessonId) => exerciseDataByLegacyId[lessonId],
  );
  const prompts = chapterThreeExercises.map((exercise) => exercise.prompt.trim());
  assert.equal(new Set(prompts).size, prompts.length);

  for (const exercise of chapterThreeExercises) {
    assert.doesNotMatch(exercise.prompt, /^(?:Chọn đáp án đúng|Chọn theo tình huống)$/i, exercise.id);
    assert.doesNotMatch(exercise.prompt, /[\r\n]/, exercise.id);
    assert.notEqual(exercise.kind, "context", exercise.id);
    if (exercise.kind === "match") {
      const leftSides = exercise.pairs.map((pair) => pair.left);
      const rightSides = exercise.pairs.map((pair) => pair.right);
      assert.equal(new Set(leftSides).size, leftSides.length, exercise.id);
      assert.equal(new Set(rightSides).size, rightSides.length, exercise.id);
    }
    if (exercise.kind === "choice") {
      assert.equal(new Set(exercise.options).size, exercise.options.length, exercise.id);
      assert.equal(exercise.options.filter((option) => option === exercise.answer).length, 1, exercise.id);
    }
    if (exercise.kind === "grid") {
      for (const row of exercise.rows) {
        assert.equal(new Set(row.options).size, row.options.length, exercise.id);
        assert.equal(row.options.filter((option) => option === row.answer).length, 1, exercise.id);
      }
    }
    if (exercise.kind === "repair") {
      assert.equal(new Set(exercise.replacements).size, exercise.replacements.length, exercise.id);
      assert.equal(
        exercise.replacements.filter((replacement) => replacement === exercise.answer).length,
        1,
        exercise.id,
      );
    }
  }

  const chapterThreeSource = JSON.stringify(
    Object.fromEntries(
      chapterThreeIds.map((lessonId) => [lessonId, exerciseDataByLegacyId[lessonId]]),
    ),
  );
  assert.doesNotMatch(
    chapterThreeSource,
    /\b(?:she're|she'm|we's|we'm|they's|they'm|amn't)\b/i,
  );
  assert.doesNotMatch(
    chapterThreeSource,
    /\b(?:my|your|his|her|its|our|their)\b/i,
  );
  assert.doesNotMatch(chapterThreeSource, /You are tired\?|Lan is here\?|They are ready\?|I am late\?/);
  assert.doesNotMatch(chapterThreeSource, /The class is at three o'clock/);
  assert.doesNotMatch(chapterThreeSource, /What are the shoes\?|Who are the shoes\?/);
  assert.doesNotMatch(chapterThreeSource, /Is An from Hue\?|Minh is twelve/);

  const areContractionTap = exerciseDataByLegacyId["be-forms"].find(
    (exercise) => exercise.id === "b20",
  );
  assert.equal(areContractionTap?.prompt, "Chọn tất cả dạng được rút gọn từ cụm có `are`.");

  const subjectDescriptionMatch = exerciseDataByLegacyId["be-forms"].find(
    (exercise) => exercise.id === "b26",
  );
  assert.equal(subjectDescriptionMatch?.kind, "match");
  assert.deepEqual(
    subjectDescriptionMatch?.pairs.map((pair) => pair.right),
    ["người nói — dùng am", "một con vật — dùng is", "hai người — dùng are", "nhiều vật — dùng are"],
  );

  const yesNoSource = JSON.stringify(exerciseDataByLegacyId["be-questions"]);
  assert.doesNotMatch(yesNoSource, /\b(?:who|what|where|how old)\b/i);
  assert.match(yesNoSource, /Yes, she is\./);
  assert.match(yesNoSource, /No, they aren't\./);
  assert.match(yesNoSource, /Am I late\?/);

  const whSource = JSON.stringify(exerciseDataByLegacyId["be-wh-questions"]);
  for (const questionWord of ["who", "what", "where", "how old"]) {
    assert.match(whSource, new RegExp(questionWord, "i"), questionWord);
  }
  assert.match(whSource, /Cần thông tin cụ thể/);
});

test("gives all 37 A1 lessons comprehensive, varied, and unambiguous practice", () => {
  assert.equal(a1LessonIds.length, 37);
  assert.ok(
    a1LessonIds.some((lessonId) => exerciseDataByLegacyId[lessonId].length > 25),
    "Số hoạt động phải do độ rộng của bài quyết định, không được ép mọi bài về đúng 25.",
  );

  const allIds = [];
  for (const lessonId of a1LessonIds) {
    const exercises = exerciseDataByLegacyId[lessonId];
    assert.ok(exercises, lessonId);
    assert.ok(exercises.length >= 25 && exercises.length <= 40, `${lessonId}: ${exercises.length}`);
    assert.ok(new Set(exercises.map((exercise) => exercise.kind)).size >= 6, lessonId);
    assert.ok(
      exercises.filter((exercise) => exercise.kind === "choice").length / exercises.length <= 0.75,
      `${lessonId} phụ thuộc quá nhiều vào dạng chọn đáp án`,
    );
    assert.ok(
      new Set(exercises.map((exercise) => exercise.hint)).size >= Math.ceil(exercises.length * 0.7),
      `${lessonId} lặp gợi ý quá nhiều`,
    );
    assert.equal(
      new Set(exercises.map((exercise) => exercise.prompt.trim())).size,
      exercises.length,
      `Câu hỏi lặp trong ${lessonId}`,
    );

    for (const exercise of exercises) {
      allIds.push(exercise.id);
      assert.doesNotMatch(exercise.prompt, /[\r\n]/, exercise.id);
      assert.doesNotMatch(exercise.prompt, /^(?:Chọn đáp án đúng|Chọn theo tình huống)$/i, exercise.id);
      if (exercise.kind === "match") {
        const left = exercise.pairs.map((pair) => pair.left);
        const right = exercise.pairs.map((pair) => pair.right);
        assert.equal(new Set(left).size, left.length, exercise.id);
        assert.equal(new Set(right).size, right.length, exercise.id);
      }
      if (exercise.kind === "choice" || exercise.kind === "context") {
        assert.equal(new Set(exercise.options).size, exercise.options.length, exercise.id);
        assert.equal(exercise.options.filter((option) => option === exercise.answer).length, 1, exercise.id);
      }
      if (exercise.kind === "repair") {
        assert.equal(new Set(exercise.replacements).size, exercise.replacements.length, exercise.id);
        assert.equal(
          exercise.replacements.filter((replacement) => replacement === exercise.answer).length,
          1,
          exercise.id,
        );
      }
      if (exercise.kind === "grid") {
        for (const row of exercise.rows) {
          assert.equal(new Set(row.options).size, row.options.length, exercise.id);
          assert.equal(row.options.filter((option) => option === row.answer).length, 1, exercise.id);
        }
      }
    }
  }
  assert.equal(new Set(allIds).size, allIds.length);
});

test("keeps A1 practice inside the knowledge available at each lesson boundary", () => {
  const sourceFor = (lessonId) => JSON.stringify(exerciseDataByLegacyId[lessonId]);

  assert.doesNotMatch(
    sourceFor("possessive-s"),
    /\b(?:children|men|women|people|teeth|feet|mice)\b/i,
  );
  assert.doesNotMatch(
    sourceFor("apostrophes"),
    /\b(?:don't|doesn't|can't|let's)\b/i,
  );
  assert.doesNotMatch(
    sourceFor("some-any-there"),
    /\b(?:Can I|Can you|Would I|Would you|Would we|Would they|Would he|Would she)\b/i,
  );
  assert.doesNotMatch(
    sourceFor("present-simple-questions"),
    /\b(?:where|what|when|why|who|how)\b/i,
  );
  assert.doesNotMatch(
    sourceFor("ability-can"),
    /\b(?:Let's|Don't|because|so)\b/i,
  );
  assert.doesNotMatch(sourceFor("instructions-and-can"), /\bLet's\b/i);

  const a1Source = JSON.stringify(
    Object.fromEntries(a1LessonIds.map((lessonId) => [lessonId, exerciseDataByLegacyId[lessonId]])),
  );
  assert.doesNotMatch(
    a1Source,
    /every fact|exact moment|every this|every today|right this|as a fact|for this minute|now every|permanent habit|this week every week/i,
  );
  assert.doesNotMatch(
    a1Source,
    /personses|childrens|womans|womens|foots|feets|tooths|toothes|fishs|mouses|mices|teachers's|boys's|apples's|hardlyly|happyly|wellly|goodly|smallly|smalls|workking|makeing|writeing|runing|swiming|playying|fixxing|lieing|\bseing\b|can nots|amn't/i,
  );
  assert.doesNotMatch(a1Source, /Những quả táo màu đỏ tươi/);
  assert.match(a1Source, /Những quả táo đỏ này còn tươi/);
  assert.doesNotMatch(
    JSON.stringify(exerciseDataByLegacyId["irregular-plurals"]),
    /"person"[^\n]*"persons"/,
  );
});

test("gives all 54 A2 lessons comprehensive, varied, and mechanically sound practice", () => {
  const a2LessonIds = [
    "a2-past-be", "a2-past-regular", "a2-past-irregular", "a2-past-did", "a2-past-time", "a2-subject-object-questions", "a2-commas-basic",
    "a2-past-continuous", "a2-past-simple-continuous", "a2-when-while-as", "a2-used-to",
    "a2-going-to", "arranged-plans", "a2-timetables", "a2-will-decisions", "a2-will-predictions", "a2-future-forms",
    "a2-comparatives", "a2-superlatives", "a2-equality", "a2-comparative-modifiers", "a2-too-enough-so-such",
    "a2-could-past-ability", "a2-polite-could-may", "a2-possibility-modals", "a2-advice-modals", "a2-obligation", "a2-prohibition-no-necessity",
    "a2-articles-countability", "a2-first-mention-the", "a2-definite-article", "a2-generic-reference", "a2-few-little", "a2-all-every-each-whole", "a2-both-either-neither",
    "a2-present-perfect-form", "a2-perfect-experience", "a2-perfect-just-already-yet", "a2-perfect-unfinished-time", "a2-since-for-how-long", "a2-been-gone", "a2-perfect-vs-past",
    "a2-relative-subject", "a2-relative-object-whose-where", "a2-zero-conditional", "a2-first-conditional", "a2-future-time-clauses", "a2-verb-patterns", "a2-object-infinitive-purpose-prep-ing",
    "a2-reflexive-reciprocal", "a2-indefinite-pronouns", "a2-one-ones", "a2-other-forms", "a2-ed-ing-adjectives",
  ];
  assert.equal(a2LessonIds.length, 54);
  const activityCounts = a2LessonIds.map((lessonId) => exerciseDataByLegacyId[lessonId].length);
  assert.ok(new Set(activityCounts).size >= 4, "Số hoạt động A2 phải thay đổi theo độ rộng thật của bài.");
  assert.ok(Math.max(...activityCounts) >= 31, "Bài A2 nhiều ranh giới nghĩa cần được luyện sâu hơn mức nền.");
  const presentPerfectLessonIds = [
    "a2-present-perfect-form", "a2-perfect-experience", "a2-perfect-just-already-yet",
    "a2-perfect-unfinished-time", "a2-since-for-how-long", "a2-been-gone", "a2-perfect-vs-past",
  ];
  for (const lessonId of presentPerfectLessonIds) {
    assert.ok(exerciseDataByLegacyId[lessonId].length >= 27, `${lessonId}: cần luyện sâu hơn bộ nền`);
  }
  assert.ok(exerciseDataByLegacyId["a2-past-simple-continuous"].length >= 29);
  assert.ok(exerciseDataByLegacyId["a2-other-forms"].length >= 31);
  const otherFormsSource = JSON.stringify(exerciseDataByLegacyId["a2-other-forms"]);
  assert.match(otherFormsSource, /the other reports/);
  assert.match(otherFormsSource, /my other glove/);
  const ids = [];
  for (const lessonId of a2LessonIds) {
    const exercises = exerciseDataByLegacyId[lessonId];
    assert.ok(exercises, lessonId);
    assert.ok(exercises.length >= 25 && exercises.length <= 40, `${lessonId}: ${exercises.length}`);
    assert.ok(new Set(exercises.map((exercise) => exercise.kind)).size >= 6, lessonId);
    for (const exercise of exercises) {
      ids.push(exercise.id);
      assert.doesNotMatch(exercise.prompt, /[\r\n]/, exercise.id);
      assert.doesNotMatch(exercise.prompt, /^(?:Chọn đáp án đúng|Chọn theo tình huống)$/i, exercise.id);
      if (exercise.kind === "choice") {
        assert.equal(new Set(exercise.options).size, exercise.options.length, exercise.id);
        assert.equal(exercise.options.filter((option) => option === exercise.answer).length, 1, exercise.id);
        for (const option of exercise.options) {
          assert.doesNotMatch(option, /^(?:I|we|you|he|she|they|Lan|Mai|Nam|Minh|Have|Has|Did|Where|Which)\b[^\n]*\b(?:và|luôn luôn)\b/i, `${exercise.id}: không trộn hai ngôn ngữ trong một phương án`);
          assert.doesNotMatch(
            option,
            /[A-Za-z][^\n]*(?:,\s*|\s+)(?:với (?:ý|nghĩa)|khi chỉ|không có ngữ cảnh|nhấn (?:vẫn|gần)|nên chắc chắn|bắt buộc dù|luôn là chiếc|cho (?:cả|nhóm))/i,
            `${exercise.id}: không trộn lời chú thích tiếng Việt vào phương án tiếng Anh`,
          );
        }
      }
      if (exercise.kind === "repair") {
        assert.equal(new Set(exercise.replacements).size, exercise.replacements.length, exercise.id);
        assert.equal(exercise.replacements.filter((value) => value === exercise.answer).length, 1, exercise.id);
        const repaired = [...exercise.tokens];
        repaired[exercise.targetIndex] = exercise.answer;
        const repairedSentence = repaired.join(" ").replace(/\s+([.,?!:;])/g, "$1");
        assert.doesNotMatch(
          repairedSentence,
          /\b(am|is|are|was|were|have|has|had|will|could|should|must)\s+\1\b/i,
          `${exercise.id}: câu sau khi sửa bị lặp trợ động từ`,
        );
      }
      if (exercise.kind === "grid") {
        for (const row of exercise.rows) {
          assert.equal(new Set(row.options).size, row.options.length, exercise.id);
          assert.equal(row.options.filter((option) => option === row.answer).length, 1, exercise.id);
          for (const option of row.options) {
            assert.doesNotMatch(option, /^(?:I|we|you|he|she|they|Lan|Mai|Nam|Minh|Have|Has|Did|Where|Which)\b[^\n]*\b(?:và|luôn luôn)\b/i, `${exercise.id}: không trộn hai ngôn ngữ trong một phương án`);
            assert.doesNotMatch(
              option,
              /[A-Za-z][^\n]*(?:,\s*|\s+)(?:với (?:ý|nghĩa)|khi chỉ|không có ngữ cảnh|nhấn (?:vẫn|gần)|nên chắc chắn|bắt buộc dù|luôn là chiếc|cho (?:cả|nhóm))/i,
              `${exercise.id}: không trộn lời chú thích tiếng Việt vào phương án tiếng Anh`,
            );
          }
        }
      }
      if (exercise.kind === "match") {
        assert.equal(new Set(exercise.pairs.map((pair) => pair.left)).size, exercise.pairs.length, exercise.id);
        assert.equal(new Set(exercise.pairs.map((pair) => pair.right)).size, exercise.pairs.length, exercise.id);
      }
    }
  }
  assert.equal(new Set(ids).size, ids.length);

  const source = JSON.stringify(Object.fromEntries(a2LessonIds.map((id) => [id, exerciseDataByLegacyId[id]])));
  assert.doesNotMatch(
    source,
    /\b(?:busyer|hoter|carefuller|gooder|badder|farrer|heavyer|difficulter|littler|manyer|mucher|weter|bigest|easyest|comfortablest|breaked|drived|swimmed|sended|musted|usself|theirselves|informations|advices|luggages|bookes|pianoes)\b/i,
  );
  assert.match(JSON.stringify(exerciseDataByLegacyId["a2-first-mention-the"]), /café/);
  assert.match(JSON.stringify(exerciseDataByLegacyId["a2-zero-conditional"]), /100°C/);
  assert.doesNotMatch(JSON.stringify(exerciseDataByLegacyId["a2-will-decisions"]), /when I arrive/i);
  assert.doesNotMatch(JSON.stringify(exerciseDataByLegacyId["a2-definite-article"]), /that you lent me/i);
  assert.doesNotMatch(JSON.stringify(exerciseDataByLegacyId["a2-perfect-unfinished-time"]), /\bnobody\b/i);
  assert.match(JSON.stringify(exerciseDataByLegacyId["a2-indefinite-pronouns"]), /somebody[\s\S]*anybody[\s\S]*nobody/i);
});

test("gives all 46 B1 lessons comprehensive practice within the B1 boundary", () => {
  const b1LessonIds = [
    "b1-present-perfect-continuous", "b1-perfect-simple-vs-continuous", "b1-past-perfect", "b1-narrative-tenses", "b1-past-habits", "b1-future-continuous",
    "b1-subject-object-questions-deep", "b1-negative-questions", "b1-indirect-questions", "b1-wh-noun-clauses", "b1-if-whether-clauses",
    "b1-defining-nondefining-relatives", "b1-relative-clause-commas", "b1-relative-whose-where-when", "b1-relative-preposition-stranding", "b1-purpose-clauses", "b1-cause-result-clauses", "b1-concession-clauses", "b1-punctuation-direct-relative-apposition",
    "b1-second-conditional", "b1-zero-first-second-conditionals", "b1-unless-provided-as-long-as", "b1-in-case-vs-if", "b1-wish-if-only-present",
    "b1-passive-principle", "b1-passive-common-tenses", "b1-passive-modals-infinitive", "b1-passive-by-with", "b1-active-vs-passive-choice",
    "b1-reported-statements-backshift", "b1-reported-reference-shifts", "b1-reported-questions", "b1-reported-commands-requests-advice", "b1-say-tell-ask-no-backshift",
    "b1-verb-object-infinitive-let-make-help", "b1-verbs-ing-or-to-similar", "b1-stop-remember-forget-patterns", "b1-try-regret-go-on-mean-patterns", "b1-double-objects-to-for", "b1-fixed-verb-prepositions", "b1-phrasal-verbs-separability",
    "b1-present-deduction-modals", "b1-certainty-scale", "b1-should-expectation", "b1-question-tags", "b1-so-neither-short-responses",
  ];
  assert.equal(b1LessonIds.length, 46);
  const b1ActivityCounts = b1LessonIds.map((lessonId) => exerciseDataByLegacyId[lessonId].length);
  assert.ok(new Set(b1ActivityCounts).size >= 7, "Số bài B1 phải thay đổi theo độ rộng thật của chủ đề.");
  assert.ok(Math.max(...b1ActivityCounts) >= 33, "Các bài B1 có nhiều ranh giới nghĩa cần luyện sâu hơn mức nền.");
  assert.ok(b1ActivityCounts.reduce((sum, count) => sum + count, 0) / b1ActivityCounts.length >= 28, "B1 không được mỏng hơn các cấp độ trước.");
  const ids = [];
  let choiceAndOrderCount = 0;
  let activityCount = 0;
  for (const lessonId of b1LessonIds) {
    const exercises = exerciseDataByLegacyId[lessonId];
    assert.ok(exercises, lessonId);
    assert.ok(exercises.length >= 25 && exercises.length <= 40, `${lessonId}: ${exercises.length}`);
    assert.ok(new Set(exercises.map((exercise) => exercise.kind)).size >= 7, lessonId);
    assert.equal(new Set(exercises.map((exercise) => exercise.prompt.trim())).size, exercises.length, lessonId);
    choiceAndOrderCount += exercises.filter((exercise) => exercise.kind === "choice" || exercise.kind === "order").length;
    activityCount += exercises.length;
    for (const exercise of exercises) {
      ids.push(exercise.id);
      assert.doesNotMatch(exercise.prompt, /[\r\n]/, exercise.id);
      if (exercise.kind === "choice") {
        assert.equal(new Set(exercise.options).size, exercise.options.length, exercise.id);
        assert.equal(exercise.options.filter((option) => option === exercise.answer).length, 1, exercise.id);
      }
      if (exercise.kind === "match") {
        assert.equal(new Set(exercise.pairs.map((pair) => pair.left)).size, exercise.pairs.length, exercise.id);
        assert.equal(new Set(exercise.pairs.map((pair) => pair.right)).size, exercise.pairs.length, exercise.id);
      }
      if (exercise.kind === "grid") {
        for (const row of exercise.rows) {
          assert.equal(new Set(row.options).size, row.options.length, exercise.id);
          assert.equal(row.options.filter((option) => option === row.answer).length, 1, exercise.id);
        }
      }
    }
  }
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(choiceAndOrderCount / activityCount < 0.6, "B1 phải dùng đa dạng thao tác, không được phụ thuộc chủ yếu vào chọn và sắp xếp.");

  const source = JSON.stringify(Object.fromEntries(b1LessonIds.map((id) => [id, exerciseDataByLegacyId[id]])));
  assert.doesNotMatch(source, /\b(?:had been working for years before|will have|will have been|should have|must have|needn't have|could have|might have)\b/i);
  assert.doesNotMatch(source, /I wish I had studied|If I had studied, I would have/i);
  assert.doesNotMatch(
    source,
    /tomorrow yesterday|all future|every next step|every state|from every later day|from any later date|as the same form|as a real plan|as the intentional agent|as a deliberate worker|as the recipient marker|as a separable object|when the focus is|when nobody knows|when responsibility must|when the paragraph is|when the finders are|as the only possible form|order is irrelevant/i,
    "Đáp án nhiễu B1 phải là lỗi học viên có thể thật sự mắc, không phải câu ghép vô nghĩa.",
  );
  assert.doesNotMatch(
    source,
    /every past day|someone unknown person|storm tool|friendly direct email|only then|from a changed viewpoint|as a question|same explanation|exactly twenty percent|had been on her way tomorrow/i,
    "Không được đưa câu tiếng Anh vô nghĩa vào phương án nhiễu B1.",
  );
  assert.doesNotMatch(
    source,
    /Cách diễn đạt nào đúng cho|Chọn cách diễn đạt đúng cho|Với [^?]{0,120}phương án nào phù hợp|Dùng điểm này để loại từng phương án|Giữ những từ tạo thành cùng một cụm/i,
    "Câu hỏi và gợi ý B1 phải tự nhiên, cụ thể, không được sinh từ nhãn mẫu chung chung.",
  );
  assert.match(JSON.stringify(exerciseDataByLegacyId["b1-question-tags"]), /ngữ điệu[\s\S]*Yes, I do\.[\s\S]*No, I don't\./i);
  assert.match(JSON.stringify(exerciseDataByLegacyId["b1-so-neither-short-responses"]), /I don't think so\.[\s\S]*I hope not\.[\s\S]*prefer classical music/i);
  assert.doesNotMatch(JSON.stringify(exerciseDataByLegacyId["b1-reported-statements-backshift"]), /Lan said that she saw Minh\./i);
});

test("gives all 38 B2 lessons comprehensive, varied, and editorially clean practice", () => {
  const b2LessonIds = [
    "b2-past-perfect-continuous", "b2-future-perfect", "b2-future-perfect-continuous", "b2-future-in-the-past", "b2-dynamic-stative-progressive",
    "b2-past-deduction-modal-perfect", "b2-should-ought-have", "b2-neednt-have", "b2-could-might-have", "b2-third-conditional", "b2-mixed-conditionals", "b2-wish-past-perfect",
    "b2-would-rather-sooner", "b2-its-time-past", "b2-as-if-as-though", "b2-past-modal-distance", "b2-implied-conditionals",
    "b2-passive-continuous-perfect", "b2-passive-infinitive-gerund", "b2-get-passive", "b2-causative-have-get", "b2-reporting-passive", "b2-reporting-verb-patterns",
    "b2-countability-by-meaning", "b2-generic-reference", "b2-special-article-contexts", "b2-proper-names-articles", "b2-compound-noun-modifiers", "b2-complex-noun-phrases", "b2-complex-agreement",
    "b2-reduced-relative-clauses", "b2-participle-clauses", "b2-infinitive-clauses", "b2-apposition-content-clauses", "b2-it-clefts", "b2-wh-clefts", "b2-emphatic-do-fronting", "b2-colon-semicolon-dash",
  ];
  assert.equal(b2LessonIds.length, 38);

  const counts = b2LessonIds.map((lessonId) => exerciseDataByLegacyId[lessonId]?.length ?? 0);
  assert.ok(new Set(counts).size >= 6, "Độ sâu B2 phải thay đổi theo phạm vi thật của bài.");
  assert.ok(Math.min(...counts) >= 25 && Math.max(...counts) <= 40);
  assert.ok(Math.max(...counts) >= 34, "Bài B2 có nhiều nhánh nghĩa cần được luyện sâu hơn bộ nền.");
  assert.ok(counts.reduce((sum, count) => sum + count, 0) / counts.length >= 30, "B2 không được mỏng hơn các cấp trước.");

  const allIds = [];
  let choiceAndOrderCount = 0;
  let activityCount = 0;
  let identicalHintAndExplanationCount = 0;
  const kindSignatures = new Set();
  const commentaryInCandidate = /(?:without (?:any evidence|a future reference point|a present result|any contrast or correction|a known meal)|with (?:an exact .* probability|an explicit concession|the same .* structure|no ambiguity|only one possible meaning)|as (?:future in the past|type (?:two|three)|visual perception|a (?:standard|normal|neutral|formal|general) .*|the (?:standard|normal|only|general) .*|purpose|receivers)|when (?:no explanatory relation is intended|.* is meant|.* should be the subject|.* selects which)|in (?:the )?(?:standard|normal|same|formal|past-distance) .*pattern|(?:the )?speaker (?:rejects|knows)|definitely (?:happened|brought)|American English requires zero article|exact moment only|now only|necessarily supplementary|hung only)/i;

  for (const lessonId of b2LessonIds) {
    const exercises = exerciseDataByLegacyId[lessonId];
    const correctExpressions = [];
    assert.ok(exercises, lessonId);
    assert.ok(exercises.length >= 25 && exercises.length <= 40, `${lessonId}: ${exercises.length}`);
    const kinds = new Set(exercises.map((exercise) => exercise.kind));
    assert.ok(kinds.size >= 6, `${lessonId}: dạng bài phải phục vụ mục tiêu bài học, không được mỏng hơn sáu thao tác có ý nghĩa`);
    kindSignatures.add([...kinds].sort().map((kind) => `${kind}:${exercises.filter((exercise) => exercise.kind === kind).length}`).join("|"));
    assert.equal(new Set(exercises.map((exercise) => exercise.prompt.trim())).size, exercises.length, lessonId);
    choiceAndOrderCount += exercises.filter((exercise) => exercise.kind === "choice" || exercise.kind === "order").length;
    activityCount += exercises.length;

    for (const exercise of exercises) {
      allIds.push(exercise.id);
      if (exercise.hint.trim() === exercise.explanation.trim()) identicalHintAndExplanationCount += 1;
      assert.doesNotMatch(exercise.prompt, /[\r\n]/, exercise.id);
      assert.doesNotMatch(exercise.prompt, /^(?:Chọn đáp án đúng|Chọn theo tình huống)$/i, exercise.id);
      const candidates = [];
      if (exercise.kind === "choice" || exercise.kind === "context") {
        assert.equal(new Set(exercise.options).size, exercise.options.length, exercise.id);
        assert.equal(exercise.options.filter((option) => option === exercise.answer).length, 1, exercise.id);
        candidates.push(...exercise.options);
        correctExpressions.push(exercise.answer);
      }
      if (exercise.kind === "repair") {
        assert.equal(new Set(exercise.replacements).size, exercise.replacements.length, exercise.id);
        assert.equal(exercise.replacements.filter((value) => value === exercise.answer).length, 1, exercise.id);
        candidates.push(...exercise.replacements);
        correctExpressions.push(exercise.answer);
      }
      if (exercise.kind === "grid") {
        for (const row of exercise.rows) {
          assert.equal(new Set(row.options).size, row.options.length, exercise.id);
          assert.equal(row.options.filter((option) => option === row.answer).length, 1, exercise.id);
          candidates.push(...row.options);
          correctExpressions.push(row.answer);
        }
      }
      if (exercise.kind === "dropdown") {
        for (const slot of exercise.slots) {
          assert.equal(new Set(slot.options).size, slot.options.length, exercise.id);
          assert.equal(slot.options.filter((option) => slot.acceptedAnswers.includes(option)).length, 1, exercise.id);
          candidates.push(...slot.options);
          correctExpressions.push(...slot.acceptedAnswers);
        }
      }
      if (exercise.kind === "match") {
        assert.equal(new Set(exercise.pairs.map((pair) => pair.left)).size, exercise.pairs.length, exercise.id);
        assert.equal(new Set(exercise.pairs.map((pair) => pair.right)).size, exercise.pairs.length, exercise.id);
        correctExpressions.push(...exercise.pairs.map((pair) => pair.right));
      }
      if (exercise.kind === "order") correctExpressions.push(exercise.answer.join(" "));
      if (exercise.kind === "tap") {
        correctExpressions.push(exercise.answerIndexes.map((index) => exercise.tokens[index]).join(" "));
      }
      if (exercise.kind === "exact-input") correctExpressions.push(...exercise.acceptedAnswers);
      for (const candidate of candidates) {
        assert.doesNotMatch(candidate, commentaryInCandidate, `${exercise.id}: phương án chứa lời bình thay vì ngôn ngữ cần xét`);
      }
    }
    assert.ok(
      new Set(correctExpressions.map((value) => value.toLowerCase().trim())).size >= 20,
      `${lessonId}: cần nhiều câu và ngữ cảnh đúng khác nhau, không chỉ đổi thao tác trên cùng ví dụ`,
    );
    const expressionCounts = new Map();
    for (const expression of correctExpressions) {
      const normalized = expression.toLowerCase().trim();
      expressionCounts.set(normalized, (expressionCounts.get(normalized) ?? 0) + 1);
    }
    assert.ok(
      Math.max(...expressionCounts.values()) <= 4,
      `${lessonId}: một cách diễn đạt đang bị tái dùng quá nhiều lần dưới các thao tác khác nhau`,
    );
    assert.ok(exercises.every((exercise) => !exercise.hint.includes("___")), `${lessonId}: gợi ý không được để lại chỗ trống máy móc`);
  }

  assert.equal(new Set(allIds).size, allIds.length);
  assert.ok(kindSignatures.size >= 3, "Các bài B2 không được dùng nguyên một cơ cấu dạng bài giống hệt nhau.");
  assert.ok(choiceAndOrderCount / activityCount < 0.6, "B2 phải dùng đa dạng thao tác, không phụ thuộc chủ yếu vào chọn và sắp xếp.");
  assert.equal(identicalHintAndExplanationCount, 0, "Gợi ý phải dẫn đường; phần giải thích phải làm rõ đáp án sau khi trả lời.");

  const sourceFor = (lessonId) => JSON.stringify(exerciseDataByLegacyId[lessonId]);
  assert.match(sourceFor("b2-neednt-have"), /need not have[\s\S]*did not need to/i);
  assert.match(sourceFor("b2-mixed-conditionals"), /now[\s\S]*(?:yesterday|deadline)|(?:yesterday|deadline)[\s\S]*now/i);
  assert.match(sourceFor("b2-reporting-verb-patterns"), /admitted[\s\S]*suggested[\s\S]*apologised/i);
  assert.match(sourceFor("b2-countability-by-meaning"), /glass[\s\S]*paper[\s\S]*chicken[\s\S]*experience/i);
  assert.match(sourceFor("b2-dynamic-stative-progressive"), /is being rude[\s\S]*think[\s\S]*tasting/i);
  assert.match(sourceFor("b2-colon-semicolon-dash"), /:[\s\S]*;[\s\S]*—/);
  assert.doesNotMatch(sourceFor("b2-dynamic-stative-progressive"), /I see the dentist tomorrow|I am seeing your point right now/i);
  assert.doesNotMatch(sourceFor("b2-apposition-content-clauses"), /this claim caused concern/i);
  assert.doesNotMatch(
    JSON.stringify(Object.fromEntries(b2LessonIds.map((id) => [id, exerciseDataByLegacyId[id]]))),
    /which proves I took one|old historical view|established expression|after be in every style|as its current state|thirty-percent probability|therefore it was impossible|so it certainly did|and the action happened|perhaps wondering if you might maybe possibly|standard hypothetical pattern/i,
    "Phương án nhiễu B2 phải là câu người học có thể thật sự cân nhắc, không phải lời bình được ghép vào câu.",
  );

  const punctuationOrders = exerciseDataByLegacyId["b2-colon-semicolon-dash"].filter(
    (exercise) => exercise.kind === "order",
  );
  assert.ok(punctuationOrders.some((exercise) => exercise.answer.includes("—")), "Bài sắp xếp về dash phải giữ chính dấu dash.");
});

test("gives all 25 C1 lessons deep, varied, and editorially clean practice", () => {
  const c1LessonIds = [
    "c1-fronted-prepositions", "c1-free-relatives", "c1-content-complements", "c1-perfect-passive-nonfinite", "c1-valency-complementation", "c1-multiword-verbs",
    "c1-mandative-subjunctive", "c1-irrealis-were", "c1-conditional-inversion", "c1-modal-stance", "c1-negative-inversion", "c1-so-such-only-inversion",
    "c1-fronting-information", "c1-there-it-information", "c1-substitution", "c1-auxiliary-ellipsis", "c1-comparative-ellipsis", "c1-spoken-grammar",
    "c1-advanced-determiners", "c1-notional-agreement", "c1-reference-ambiguity", "c1-nominalisation", "c1-hedging-boosting", "c1-register-choice", "c1-punctuation-discourse",
  ];
  assert.equal(c1LessonIds.length, 25);

  const counts = c1LessonIds.map((lessonId) => exerciseDataByLegacyId[lessonId]?.length ?? 0);
  assert.ok(new Set(counts).size >= 5, "Độ sâu C1 phải thay đổi theo phạm vi thật của bài.");
  assert.ok(Math.min(...counts) >= 25 && Math.max(...counts) <= 40);
  assert.ok(Math.max(...counts) >= 34, "Bài C1 nhiều nhánh phải được luyện sâu hơn mức nền.");
  assert.ok(counts.reduce((sum, count) => sum + count, 0) / counts.length >= 31, "C1 không được mỏng hơn B2.");

  const allIds = [];
  const kindSignatures = new Set();
  let choiceAndOrderCount = 0;
  let activityCount = 0;
  const meaningAndDiscourseIds = new Set([
    "c1-content-complements", "c1-modal-stance", "c1-fronting-information", "c1-spoken-grammar",
    "c1-reference-ambiguity", "c1-hedging-boosting", "c1-register-choice", "c1-punctuation-discourse",
  ]);
  const commentaryInCandidate = /(?:as an optional place|as a claim about the past|when we know he is an adult|when we have no evidence|as a legal requirement|when entry is forbidden|and no source is named|although the claim is unverified|when the rule requires them|the modal alone gives no exact percentage|probability is exactly thirty percent|as ordinary neutral word order|without any (?:prior|discourse)|only the first is possible|as a context-free|when evaluating|when referring|when preserving|as a tail after|as the same response|as a head with|as the neutral default|as the most neutral|when treated as|when emphasizing|when both mean|as the same referential|where it must mean|necessarily means|when no contrast is intended|when naming what rose|writer takes full responsibility|when the effect is direct|when expressing regret|with the same clear scope|when no explanatory relation|when both brothers are meant|when a pause is needed)/i;

  for (const lessonId of c1LessonIds) {
    const exercises = exerciseDataByLegacyId[lessonId];
    const correctExpressions = [];
    assert.ok(exercises, lessonId);
    assert.ok(exercises.length >= 25 && exercises.length <= 40, `${lessonId}: ${exercises.length}`);
    const kinds = new Set(exercises.map((exercise) => exercise.kind));
    assert.ok(kinds.size >= 6, `${lessonId}: cần ít nhất sáu thao tác có ý nghĩa`);
    assert.ok(new Set(exercises.map((exercise) => exercise.objectiveId)).size >= 15, `${lessonId}: mục tiêu nội bộ còn quá chung chung`);
    if (meaningAndDiscourseIds.has(lessonId)) {
      const mechanicalCount = exercises.filter((exercise) => exercise.kind === "order" || exercise.kind === "exact-input").length;
      assert.ok(mechanicalCount <= 4, `${lessonId}: bài thiên về nghĩa/diễn ngôn có quá nhiều thao tác xếp hoặc chép câu`);
    }
    kindSignatures.add([...kinds].sort().map((kind) => `${kind}:${exercises.filter((exercise) => exercise.kind === kind).length}`).join("|"));
    assert.equal(new Set(exercises.map((exercise) => exercise.prompt.trim())).size, exercises.length, lessonId);
    choiceAndOrderCount += exercises.filter((exercise) => exercise.kind === "choice" || exercise.kind === "order").length;
    activityCount += exercises.length;

    for (const exercise of exercises) {
      allIds.push(exercise.id);
      assert.doesNotMatch(exercise.prompt, /[\r\n]/, exercise.id);
      assert.doesNotMatch(exercise.prompt, /^(?:Chọn đáp án đúng|Chọn theo tình huống)$/i, exercise.id);
      assert.notEqual(exercise.hint.trim(), exercise.explanation.trim(), `${exercise.id}: gợi ý không được chép phản hồi`);
      const candidates = [];
      if (exercise.kind === "choice" || exercise.kind === "context") {
        assert.equal(new Set(exercise.options).size, exercise.options.length, exercise.id);
        assert.equal(exercise.options.filter((option) => option === exercise.answer).length, 1, exercise.id);
        candidates.push(...exercise.options);
        correctExpressions.push(exercise.answer);
      }
      if (exercise.kind === "repair") {
        assert.equal(new Set(exercise.replacements).size, exercise.replacements.length, exercise.id);
        assert.equal(exercise.replacements.filter((value) => value === exercise.answer).length, 1, exercise.id);
        candidates.push(...exercise.replacements);
        correctExpressions.push(exercise.answer);
      }
      if (exercise.kind === "grid") {
        for (const row of exercise.rows) {
          assert.equal(new Set(row.options).size, row.options.length, exercise.id);
          assert.equal(row.options.filter((option) => option === row.answer).length, 1, exercise.id);
          candidates.push(...row.options);
          correctExpressions.push(row.answer);
        }
      }
      if (exercise.kind === "dropdown") {
        for (const slot of exercise.slots) {
          assert.equal(new Set(slot.options).size, slot.options.length, exercise.id);
          assert.equal(slot.options.filter((option) => slot.acceptedAnswers.includes(option)).length, 1, exercise.id);
          candidates.push(...slot.options);
          correctExpressions.push(...slot.acceptedAnswers);
        }
      }
      if (exercise.kind === "match") {
        assert.equal(new Set(exercise.pairs.map((pair) => pair.left)).size, exercise.pairs.length, exercise.id);
        assert.equal(new Set(exercise.pairs.map((pair) => pair.right)).size, exercise.pairs.length, exercise.id);
        correctExpressions.push(...exercise.pairs.map((pair) => pair.right));
      }
      if (exercise.kind === "order") correctExpressions.push(exercise.answer.join(" "));
      if (exercise.kind === "tap") correctExpressions.push(exercise.answerIndexes.map((index) => exercise.tokens[index]).join(" "));
      if (exercise.kind === "exact-input") correctExpressions.push(...exercise.acceptedAnswers);
      for (const candidate of candidates) {
        assert.doesNotMatch(candidate, commentaryInCandidate, `${exercise.id}: phương án chứa lời bình thay vì câu cần xét`);
      }
    }

    const normalizedExpressions = correctExpressions.map((value) => value.toLowerCase().trim());
    assert.ok(new Set(normalizedExpressions).size >= 20, `${lessonId}: cần ít nhất hai mươi cách diễn đạt đúng khác nhau`);
    const expressionCounts = new Map();
    for (const expression of normalizedExpressions) {
      expressionCounts.set(expression, (expressionCounts.get(expression) ?? 0) + 1);
    }
    assert.ok(Math.max(...expressionCounts.values()) <= 5, `${lessonId}: một ví dụ đúng bị tái dùng quá nhiều`);
    assert.ok(exercises.every((exercise) => !exercise.hint.includes("___")), `${lessonId}: gợi ý còn chỗ trống máy móc`);
    assert.ok(exercises.every((exercise) => !/Tìm chủ ngữ và cụm động từ chính trước|Xác định mốc thời gian hoặc quan hệ nghĩa trước|Ghép những từ thuộc cùng một cụm trước|đọc lại cả câu để kiểm tra nghĩa, hòa hợp và dấu câu/i.test(exercise.hint)), `${lessonId}: gợi ý C1 còn dùng lời nhắc sắp xếp chung chung`);
  }

  assert.equal(new Set(allIds).size, allIds.length);
  assert.ok(kindSignatures.size >= 3, "Các bài C1 không được dùng nguyên một cơ cấu thao tác.");
  assert.ok(choiceAndOrderCount / activityCount < 0.6, "C1 không được phụ thuộc chủ yếu vào chọn và sắp xếp.");

  const sourceFor = (lessonId) => JSON.stringify(exerciseDataByLegacyId[lessonId]);
  assert.match(sourceFor("c1-fronted-prepositions"), /to whom[\s\S]*on which[\s\S]*of whom[\s\S]*of which/i);
  assert.match(sourceFor("c1-content-complements"), /whether to[\s\S]*claim[\s\S]*It is clear/i);
  assert.match(sourceFor("c1-conditional-inversion"), /Had I known[\s\S]*Were I[\s\S]*Should you/i);
  assert.match(sourceFor("c1-negative-inversion"), /Never have I/i);
  assert.match(sourceFor("c1-negative-inversion"), /No sooner/i);
  assert.match(sourceFor("c1-negative-inversion"), /Hardly had/i);
  assert.match(sourceFor("c1-there-it-information"), /There are/i);
  assert.match(sourceFor("c1-there-it-information"), /There's two/i);
  assert.match(sourceFor("c1-there-it-information"), /It is clear/i);
  assert.match(sourceFor("c1-notional-agreement"), /A number of[\s\S]*The number of[\s\S]*per cent/i);
  assert.match(sourceFor("c1-punctuation-discourse"), /:[\s\S]*;[\s\S]*—/);

  const allC1Source = c1LessonIds.map(sourceFor).join("\n");
  assert.doesNotMatch(allC1Source, /as topicalisation|where the first .*there.*names that place|No came students|as though he be a child|All of the three reports|I know that it is|The committee is divided in its opinion/i);
  assert.match(sourceFor("c1-nominalisation"), /giữ đúng tác nhân và đối tượng khi chuyển mệnh đề bị động sang nominalisation/i);
  assert.match(sourceFor("c1-punctuation-discourse"), /toàn bộ các quản lý được mời đều đã hoàn thành khóa học/i);
});

test("contains no tracking, rewards, audio, or hidden theory model", () => {
  const source = JSON.stringify(exerciseDataByLegacyId);
  assert.doesNotMatch(source, /localStorage|mastery|spaced.review|reward|AudioContext|SpeechSynthesis/i);
  assert.doesNotMatch(source, /theoryBlock|introduction|markdown/i);
});
