import type { Exercise } from "../exercise-types.ts";
import { scrambledPieces } from "./answer-order.ts";
import { escapeRegExp, gridExplanation, maskAnswerTerms, matchExplanation, sentenceTokens } from "./basic-builders.ts";

type B1PracticeSeed = [
  cue: string,
  answer: string,
  distractor: string,
  parallelSentence: string,
  explanation: string,
];

type B1PracticeProfile = "form" | "contrast" | "meaning" | "discourse";

type B1PracticeSetting = {
  target: number;
  profile: B1PracticeProfile;
};

/**
 * Số lượng và trọng tâm được quyết định riêng cho từng bài. Các bài có nhiều
 * ranh giới nghĩa hoặc nhiều phép biến đổi nhận thêm hoạt động; bài hẹp dừng
 * sớm hơn. Việc khai báo tường minh này ngăn toàn bộ B1 quay về một bộ 25 câu
 * giống hệt nhau.
 */
const b1PracticeSettings: Record<string, B1PracticeSetting> = {
  b1soq: { target: 29, profile: "form" },
  b1neq: { target: 27, profile: "discourse" },
  b1inq: { target: 31, profile: "form" },
  b1whc: { target: 29, profile: "form" },
  b1iwc: { target: 29, profile: "contrast" },
  b1dnr: { target: 29, profile: "contrast" },
  b1rcc: { target: 29, profile: "contrast" },
  b1rww: { target: 28, profile: "form" },
  b1rps: { target: 28, profile: "form" },
  b1pur: { target: 29, profile: "contrast" },
  b1car: { target: 31, profile: "contrast" },
  b1con: { target: 29, profile: "contrast" },
  b1pun: { target: 31, profile: "form" },
  b1scd: { target: 29, profile: "contrast" },
  b1zfs: { target: 29, profile: "contrast" },
  b1upa: { target: 28, profile: "contrast" },
  b1ici: { target: 27, profile: "contrast" },
  b1wio: { target: 29, profile: "meaning" },
  b1papr: { target: 28, profile: "form" },
  b1pct: { target: 29, profile: "form" },
  b1pmi: { target: 29, profile: "form" },
  b1pbw: { target: 28, profile: "contrast" },
  b1avp: { target: 29, profile: "discourse" },
  b1rsb: { target: 32, profile: "discourse" },
  b1rrs: { target: 29, profile: "discourse" },
  b1req: { target: 31, profile: "form" },
  b1rca: { target: 29, profile: "meaning" },
  b1sta: { target: 31, profile: "discourse" },
  b1voi: { target: 29, profile: "form" },
  b1vit: { target: 28, profile: "contrast" },
  b1srf: { target: 29, profile: "contrast" },
  b1trg: { target: 29, profile: "contrast" },
  b1dot: { target: 29, profile: "contrast" },
  b1fvp: { target: 28, profile: "form" },
  b1pvs: { target: 29, profile: "form" },
  b1pdm: { target: 28, profile: "meaning" },
  b1csc: { target: 28, profile: "meaning" },
  b1she: { target: 27, profile: "meaning" },
  b1qta: { target: 28, profile: "discourse" },
  b1snr: { target: 29, profile: "discourse" },
};

const b2PracticeSettings: Record<string, B1PracticeSetting> = {
  b2ppc: { target: 31, profile: "contrast" },
  b2fp: { target: 29, profile: "form" },
  b2fpc: { target: 29, profile: "contrast" },
  b2fip: { target: 31, profile: "contrast" },
  b2dsp: { target: 31, profile: "meaning" },
  b2pdm: { target: 31, profile: "meaning" },
  b2sha: { target: 29, profile: "meaning" },
  b2ndt: { target: 31, profile: "contrast" },
  b2cmh: { target: 31, profile: "contrast" },
  b2c3: { target: 32, profile: "form" },
  b2mix: { target: 32, profile: "contrast" },
  b2wpp: { target: 29, profile: "meaning" },
  b2wrs: { target: 29, profile: "form" },
  b2itp: { target: 28, profile: "meaning" },
  b2asa: { target: 30, profile: "contrast" },
  b2pmd: { target: 31, profile: "discourse" },
  b2dic: { target: 30, profile: "contrast" },
  b2pcp: { target: 30, profile: "form" },
  b2pig: { target: 30, profile: "form" },
  b2get: { target: 28, profile: "contrast" },
  b2caus: { target: 31, profile: "form" },
  b2rpass: { target: 32, profile: "form" },
  b2rvp: { target: 34, profile: "form" },
  b2cbm: { target: 31, profile: "contrast" },
  b2gen: { target: 29, profile: "contrast" },
  b2sac: { target: 32, profile: "contrast" },
  b2pna: { target: 32, profile: "form" },
  b2cnm: { target: 30, profile: "meaning" },
  b2cnp: { target: 31, profile: "form" },
  b2agr: { target: 34, profile: "contrast" },
  b2rrc: { target: 31, profile: "form" },
  b2part: { target: 32, profile: "form" },
  b2inf: { target: 31, profile: "form" },
  b2app: { target: 29, profile: "contrast" },
  b2itc: { target: 29, profile: "discourse" },
  b2whc: { target: 29, profile: "discourse" },
  b2edf: { target: 30, profile: "discourse" },
  b2punc: { target: 32, profile: "form" },
};

const c1PracticeSettings: Record<string, B1PracticeSetting> = {
  c1fpr: { target: 31, profile: "form" },
  c1fre: { target: 32, profile: "contrast" },
  c1ccl: { target: 33, profile: "meaning" },
  c1npf: { target: 33, profile: "form" },
  c1val: { target: 34, profile: "contrast" },
  c1mwv: { target: 34, profile: "form" },
  c1msj: { target: 32, profile: "form" },
  c1irr: { target: 30, profile: "contrast" },
  c1cinv: { target: 32, profile: "form" },
  c1mst: { target: 33, profile: "discourse" },
  c1ninv: { target: 34, profile: "form" },
  c1osin: { target: 33, profile: "form" },
  c1finf: { target: 32, profile: "discourse" },
  c1tit: { target: 33, profile: "contrast" },
  c1sub: { target: 32, profile: "contrast" },
  c1aell: { target: 32, profile: "form" },
  c1cell: { target: 31, profile: "contrast" },
  c1spok: { target: 32, profile: "discourse" },
  c1adet: { target: 34, profile: "form" },
  c1nagr: { target: 34, profile: "contrast" },
  c1ref: { target: 33, profile: "discourse" },
  c1nom: { target: 32, profile: "contrast" },
  c1hed: { target: 33, profile: "discourse" },
  c1reg: { target: 33, profile: "discourse" },
  c1pdisc: { target: 33, profile: "discourse" },
};

const b1BaseMix: Record<B1PracticeProfile, Record<"choice" | "order" | "repair" | "tap" | "match" | "grid" | "exact" | "dropdown", number>> = {
  form: { choice: 6, order: 5, repair: 4, tap: 3, match: 2, grid: 2, exact: 2, dropdown: 1 },
  contrast: { choice: 7, order: 4, repair: 4, tap: 2, match: 2, grid: 2, exact: 2, dropdown: 2 },
  meaning: { choice: 8, order: 3, repair: 3, tap: 2, match: 2, grid: 3, exact: 2, dropdown: 2 },
  discourse: { choice: 8, order: 3, repair: 3, tap: 2, match: 2, grid: 3, exact: 2, dropdown: 2 },
};

const b1ExtraOrder: Record<B1PracticeProfile, Array<keyof typeof b1BaseMix.form>> = {
  form: ["repair", "order", "exact", "tap", "choice", "grid"],
  contrast: ["choice", "repair", "exact", "grid", "order", "match"],
  meaning: ["choice", "grid", "match", "exact", "order", "dropdown"],
  discourse: ["choice", "exact", "grid", "match", "repair", "dropdown"],
};

/**
 * B2 không dùng lại cơ cấu B1 một cách máy móc. Bài thiên về hình thức cần sửa
 * và sắp xếp nhiều hơn; bài thiên về nghĩa hoặc diễn ngôn dành nhiều chỗ cho
 * lựa chọn có ngữ cảnh, đối chiếu nhiều hàng và quan hệ giữa các cách diễn đạt.
 * Số 25 là lõi; phần vượt mức này được thêm theo thứ tự riêng của từng hồ sơ.
 */
const b2BaseMix: Record<B1PracticeProfile, Record<keyof typeof b1BaseMix.form, number>> = {
  form: { choice: 3, order: 5, repair: 4, tap: 2, match: 3, grid: 3, exact: 4, dropdown: 1 },
  contrast: { choice: 5, order: 4, repair: 3, tap: 0, match: 3, grid: 4, exact: 4, dropdown: 2 },
  meaning: { choice: 7, order: 3, repair: 0, tap: 2, match: 3, grid: 4, exact: 3, dropdown: 3 },
  discourse: { choice: 7, order: 3, repair: 0, tap: 0, match: 3, grid: 4, exact: 4, dropdown: 4 },
};

const b2ExtraOrder: Record<B1PracticeProfile, Array<keyof typeof b1BaseMix.form>> = {
  form: ["order", "exact", "grid", "choice", "repair", "tap", "dropdown", "exact", "dropdown"],
  contrast: ["choice", "repair", "order", "exact", "dropdown", "choice", "order", "exact", "dropdown"],
  meaning: ["choice", "tap", "order", "exact", "dropdown", "order", "exact", "choice", "tap"],
  discourse: ["choice", "exact", "order", "choice", "exact", "order", "choice", "exact", "order"],
};

/**
 * Ở C1, bài thiên về nghĩa hoặc diễn ngôn phải dành phần lớn thời gian cho
 * lựa chọn có ngữ cảnh và đối chiếu. Sắp xếp/chép lại câu vẫn có mặt nhưng chỉ
 * đóng vai trò kiểm tra hình thức, không được lấn át quyết định về nghĩa.
 */
const c1MeaningMix: Record<"meaning" | "discourse", Record<keyof typeof b1BaseMix.form, number>> = {
  meaning: { choice: 8, order: 2, repair: 0, tap: 1, match: 4, grid: 4, exact: 2, dropdown: 4 },
  discourse: { choice: 9, order: 2, repair: 0, tap: 0, match: 5, grid: 3, exact: 2, dropdown: 4 },
};

const c1MeaningExtraOrder: Record<"meaning" | "discourse", Array<keyof typeof b1BaseMix.form>> = {
  meaning: ["choice", "dropdown", "grid", "match", "choice", "dropdown", "grid", "choice", "match"],
  discourse: ["choice", "dropdown", "grid", "match", "choice", "dropdown", "grid", "choice", "match"],
};

function b1SeedOffset(prefix: string): number {
  return [...prefix].reduce((total, character) => total + character.charCodeAt(0), 0) % 12;
}

function b1SeedAt(seeds: B1PracticeSeed[], index: number, offset: number): B1PracticeSeed {
  return seeds[b1SeedIndex(seeds, index, offset)];
}

function b1SeedIndex(seeds: B1PracticeSeed[], index: number, offset: number): number {
  return (index + offset) % seeds.length;
}

const cueVerbPattern = /^(hỏi|nói|dùng|đặt|thuật lại|tường thuật|nêu|nhấn|giữ|lược|phân biệt|kiểm tra|mong|ước|xác nhận|ngạc nhiên|gợi ý|trả lời|viết|đưa|phủ định|loại trừ|suy đoán|đồng tình|chuyển|tránh|hướng dẫn|gọi|dự đoán|thể hiện|làm rõ|mô tả|diễn tả|hòa hợp|duy trì|nhận ra|chia|tiếc|thêm|khôi phục|phê bình|để ngỏ|thay|lùi|chọn|nối|rút gọn|bày tỏ|đánh giá|giới thiệu|nhắc lại|lặp|đổi|đếm|đo)(?=\s|$)/iu;

function cueText(cue: string): string {
  return cue.trim().replace(/[.?]$/, "");
}

/**
 * Yêu cầu của hạt nội dung thường bắt đầu bằng động từ (“hỏi ai đã…”), nên
 * ghép thẳng thành một câu hỏi: “Câu nào hỏi ai đã…?”. Yêu cầu không bắt đầu
 * bằng động từ được đặt trong ngoặc kép để câu hỏi vẫn là một câu liền mạch.
 */
function whichSentence(cue: string, lead = "Câu nào"): string {
  const normalizedCue = cueText(cue);
  return cueVerbPattern.test(normalizedCue)
    ? `${lead} ${normalizedCue}?`
    : `${lead} phù hợp với yêu cầu “${normalizedCue}”?`;
}

function forCue(cue: string): string {
  const normalizedCue = cueText(cue);
  return cueVerbPattern.test(normalizedCue) ? `để ${normalizedCue}` : `cho đúng yêu cầu “${normalizedCue}”`;
}

function b1ChoicePrompt(cue: string): string {
  return whichSentence(cue);
}

function b1ContrastPrompt(cue: string): string {
  return whichSentence(cue, "Trong hai câu sau, câu nào");
}

/**
 * Các bảng, bài ghép và bài chọn mô tả trong cùng một bài học cần câu hỏi khác
 * nhau. Mỗi câu dưới đây là một mệnh lệnh trọn vẹn; chỉ số nhóm chọn cách nói,
 * không chép lại nội dung một hàng vào câu hỏi.
 */
const gridPrompts = [
  "Ở mỗi hàng, chọn phương án đáp ứng đúng yêu cầu của hàng đó.",
  "Đọc yêu cầu ở từng hàng rồi chọn phương án phù hợp.",
  "Với mỗi yêu cầu trong bảng, chọn phương án làm đúng điều được nêu.",
  "Chọn cho từng hàng một phương án thực hiện được yêu cầu ghi ở hàng ấy.",
  "Ở từng hàng, xác định phương án khớp với yêu cầu nêu bên trái.",
  "Lần lượt xét từng hàng và chọn phương án đúng với yêu cầu của hàng.",
  "Hoàn thành bảng bằng cách chọn phương án phù hợp cho mỗi yêu cầu.",
];

const forwardMatchPrompts = [
  "Ghép mỗi yêu cầu với câu đáp ứng yêu cầu đó.",
  "Tìm cho mỗi yêu cầu một câu thực hiện đúng điều được nêu.",
  "Nối từng yêu cầu với câu tiếng Anh phù hợp.",
  "Với mỗi yêu cầu, chọn câu làm đúng điều ấy.",
];

const reverseMatchPrompts = [
  "Ghép mỗi câu với yêu cầu mà câu đó đáp ứng.",
  "Với mỗi câu, chọn yêu cầu mà câu ấy thực hiện.",
  "Nối từng câu tiếng Anh với yêu cầu tương ứng.",
  "Xác định mỗi câu đang đáp ứng yêu cầu nào.",
];

const dropdownPrompts = [
  "Chọn mô tả đúng cho từng câu dưới đây.",
  "Với mỗi câu, chọn điều mà câu đó thực sự diễn đạt.",
  "Xác định yêu cầu mà từng câu dưới đây đáp ứng.",
  "Ở mỗi câu, chọn lời mô tả khớp với cách dùng ngữ pháp trong câu.",
  "Đọc từng câu rồi chọn mô tả đúng với câu ấy.",
  "Chọn cho mỗi câu lời giải thích phù hợp với nghĩa và hình thức của nó.",
  "Xét từng câu và chọn mô tả nói đúng điều câu ấy làm.",
];

function variantFor(variants: string[], index: number, label: string): string {
  const variant = variants[index];
  if (!variant) throw new Error(`Chưa có đủ cách hỏi khác nhau cho ${label} thứ ${index + 1}.`);
  return variant;
}

/**
 * Lấy đúng đoạn trong câu gốc ứng với các mảnh, giữ nguyên khoảng trắng quanh
 * dấu câu và bỏ dấu kết thúc câu ở cuối đoạn.
 */
function chunkText(chunk: string, sentence: string): string {
  const pattern = chunk.split(" ").map(escapeRegExp).join("\\s*");
  const text = sentence.match(new RegExp(pattern, "u"))?.[0] ?? chunk;
  // Bỏ dấu kết câu ở cuối phần khác nhau, trừ khi chính dấu câu là chỗ khác nhau.
  const trimmed = text.replace(/[.?!]+$/, "");
  return /[\p{L}\p{N}]/u.test(trimmed) ? trimmed : text;
}

/** Phần làm câu đúng khác câu sai, đủ ngắn để nêu trong gợi ý và không phải cả câu. */
function keyChunk(answer: string, distractor: string): string | undefined {
  const { answerChunk } = b1Difference(answer, distractor);
  if (!answerChunk || answerChunk.split(" ").length > 4) return undefined;
  const text = chunkText(answerChunk, answer);
  return text && text !== answer.replace(/[.?!]+$/, "") ? text : undefined;
}

function codeList(values: string[]): string {
  return [...new Set(values)].map((value) => `\`${value.replaceAll("`", "'")}\``).join(", ");
}

function b1Hint(explanation: string, answers: string[]): string {
  const hint = maskAnswerTerms(explanation, answers).trim();
  return hint && hint !== "___" ? hint : "Xác định ý nghĩa và cấu trúc cần dùng trước khi chọn.";
}

export function b1Difference(answer: string, distractor: string) {
  const answerTokens = sentenceTokens(answer);
  const distractorTokens = sentenceTokens(distractor);
  let start = 0;
  while (start < answerTokens.length && start < distractorTokens.length && answerTokens[start] === distractorTokens[start]) start += 1;
  let answerEnd = answerTokens.length;
  let distractorEnd = distractorTokens.length;
  while (answerEnd > start && distractorEnd > start && answerTokens[answerEnd - 1] === distractorTokens[distractorEnd - 1]) {
    answerEnd -= 1;
    distractorEnd -= 1;
  }
  if (answerEnd === start || distractorEnd === start) {
    if (start > 0) start -= 1;
    else {
      answerEnd = Math.min(answerTokens.length, answerEnd + 1);
      distractorEnd = Math.min(distractorTokens.length, distractorEnd + 1);
    }
  }
  return {
    answerTokens,
    distractorTokens,
    start,
    answerEnd,
    distractorEnd,
    answerChunk: answerTokens.slice(start, answerEnd).join(" "),
    distractorChunk: distractorTokens.slice(start, distractorEnd).join(" "),
  };
}

type AnswerUsage = Map<string, number>;

export function answerUsageKey(value: string): string {
  return value.replaceAll("`", "").trim().toLocaleLowerCase("vi");
}

function reserveAnswer(usage: AnswerUsage, value: string): void {
  const key = answerUsageKey(value);
  usage.set(key, (usage.get(key) ?? 0) + 1);
}

function answerUseCount(usage: AnswerUsage, value: string): number {
  return usage.get(answerUsageKey(value)) ?? 0;
}

function chooseLessUsedAnswer(
  usage: AnswerUsage,
  candidates: string[],
  disallowed: Set<string> = new Set(),
): string {
  const available = candidates.filter((candidate, index) =>
    candidates.indexOf(candidate) === index && !disallowed.has(answerUsageKey(candidate)),
  );
  const pool = available.length ? available : candidates;
  return [...pool].sort((left, right) =>
    answerUseCount(usage, left) - answerUseCount(usage, right),
  )[0];
}

function advancedGridRow(
  seeds: B1PracticeSeed[],
  seedIndex: number,
  usage: AnswerUsage,
) {
  const [cue, answer, distractor, parallelSentence, explanation] = seeds[seedIndex];
  const difference = b1Difference(answer, distractor);
  if (!difference.answerChunk || !difference.distractorChunk) {
    throw new Error(`Không tạo được hàng chọn mảnh cho yêu cầu: ${cue}`);
  }
  // Câu tiếng Anh nằm trong ngoặc kép vì ô của bảng hiển thị chữ thường, không hiển thị Markdown.
  const candidates = [
    {
      cue: `Chọn mảnh thay thế trong câu “${distractor}” ${forCue(cue)}.`,
      options: [difference.answerChunk, difference.distractorChunk],
      answer: difference.answerChunk,
      completed: answer,
    },
    {
      cue: whichSentence(cue),
      options: [answer, distractor],
      answer,
      completed: answer,
    },
    {
      cue: whichSentence(cue),
      options: [parallelSentence, distractor],
      answer: parallelSentence,
      completed: parallelSentence,
    },
  ];
  const selected = [...candidates].sort((left, right) =>
    answerUseCount(usage, left.answer) - answerUseCount(usage, right.answer),
  )[0];
  reserveAnswer(usage, selected.answer);
  return { row: selected, explanation };
}

type AdvancedGridRow = ReturnType<typeof advancedGridRow>;

/**
 * Gợi ý của bảng chỉ ra chỗ hai câu khác nhau ở các hàng chọn cả câu, nêu cả
 * hai phần theo thứ tự chữ cái để không lộ phần nào đúng. Bảng chỉ có hàng chọn
 * mảnh dùng quy tắc của một hàng mà không nhắc tới đáp án của hàng đó.
 */
function advancedGridHint(rows: AdvancedGridRow[]): string {
  // Không nêu phần nào trùng đáp án của hàng chọn mảnh: phần đó sẽ bị che và nửa còn lại chỉ ra đáp án.
  const fragmentAnswers = rows
    .filter(({ row }) => row.answer !== row.completed)
    .map(({ row }) => new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(row.answer)}(?![\\p{L}\\p{N}])`, "iu"));
  const contrasts = rows.flatMap(({ row }) => {
    if (row.answer !== row.completed) return [];
    const other = row.options.find((option) => option !== row.answer);
    if (!other) return [];
    const { answerChunk, distractorChunk } = b1Difference(row.answer, other);
    if (!answerChunk || !distractorChunk || answerChunk.split(" ").length > 4 || distractorChunk.split(" ").length > 4) return [];
    if (fragmentAnswers.some((pattern) => pattern.test(answerChunk) || pattern.test(distractorChunk))) return [];
    const [first, second] = [chunkText(answerChunk, row.answer), chunkText(distractorChunk, other)].sort((left, right) => left.localeCompare(right, "en"));
    if (!first.trim() || !second.trim() || first === second) return [];
    return [`\`${first}\` hay \`${second}\``];
  });
  if (contrasts.length === 1) {
    return `Ở hàng phải chọn cả câu, hai câu chỉ khác nhau ở ${contrasts[0]}; hãy hỏi phần nào làm đúng yêu cầu của hàng.`;
  }
  if (contrasts.length > 1) {
    return `Ở các hàng phải chọn cả câu, hai câu lần lượt chỉ khác nhau ở ${contrasts.join("; ")}; hãy hỏi phần nào làm đúng yêu cầu của từng hàng.`;
  }
  const answers = rows.map(({ row }) => row.answer);
  const rule = rows
    .map(({ explanation }) => maskAnswerTerms(explanation, answers))
    .find((text) => !text.includes("___"));
  return rule
    ? `Ở mỗi hàng, đọc lại cả câu với phương án đã chọn. ${rule}`
    : "Ở mỗi hàng, đọc lại cả câu với phương án đã chọn: chỉ một phương án làm câu đáp ứng đúng yêu cầu.";
}

function advancedDropdownSlot(
  prefix: string,
  group: number,
  index: number,
  seeds: B1PracticeSeed[],
  seedIndex: number,
  usage: AnswerUsage,
) {
  const [cue, answer, distractor, , explanation] = seeds[seedIndex];
  const alternateCue = seeds[(seedIndex + 5) % seeds.length][0];
  const alternateExplanation = seeds[(seedIndex + 5) % seeds.length][4];
  const acceptedAnswer = chooseLessUsedAnswer(usage, [cue, explanation]);
  const alternateAnswer = acceptedAnswer === cue ? alternateCue : alternateExplanation;
  reserveAnswer(usage, acceptedAnswer);
  return {
    slot: {
      id: `${prefix}-slot-${group}-${index}`,
      label: answer,
      options: [acceptedAnswer, alternateAnswer],
      acceptedAnswers: [acceptedAnswer],
    },
    key: keyChunk(answer, distractor),
    distractor,
  };
}

type AdvancedDropdownSlot = ReturnType<typeof advancedDropdownSlot>;

/**
 * Gợi ý của bài chọn mô tả chỉ ra phần làm nên nghĩa của từng câu. Khi câu khác
 * cách nói dễ nhầm ở quá nhiều chỗ (thường gặp ở bài về văn phong), gợi ý đặt
 * một câu cạnh cách nói dễ nhầm đó để người học tự thấy câu đang làm gì.
 */
function advancedDropdownActivity(slots: AdvancedDropdownSlot[]) {
  const keys = slots.flatMap(({ key }) => key ? [key] : []);
  const unkeyed = slots.find(({ key }) => !key);
  return {
    slots: slots.map(({ slot }) => slot),
    hint: unkeyed
      ? `Đặt \`${unkeyed.slot.label}\` cạnh cách nói dễ nhầm \`${unkeyed.distractor}\`: chỗ khác nhau cho biết câu đang làm gì; xét các câu còn lại theo cách tương tự.`
      : `Phần quyết định nghĩa của các câu nằm ở ${codeList(keys)}; hãy chọn mô tả nói đúng công việc của phần ấy trong từng câu.`,
    explanation: `Mô tả đúng cho từng câu: ${slots.map(({ slot }) => `\`${slot.label}\` → “${slot.acceptedAnswers[0]}”`).join("; ")}.`,
  };
}

function advancedMatchPairs(
  seeds: B1PracticeSeed[],
  start: number,
  offset: number,
  usage: AnswerUsage,
  reverse: boolean,
) {
  const rights = new Set<string>();
  const keys: string[] = [];
  const clues: string[] = [];
  const pairs = Array.from({ length: 4 }, (_, index) => {
    const seed = b1SeedAt(seeds, start + index, offset);
    const [cue, answer, distractor, parallelSentence, explanation] = seed;
    clues.push(explanation);
    const sentence = chooseLessUsedAnswer(usage, [answer, parallelSentence]);
    const right = reverse ? cue : chooseLessUsedAnswer(usage, [answer, parallelSentence], rights);
    const left = reverse ? sentence : cue;
    const shownSentence = reverse ? left : right;
    const key = shownSentence === answer ? keyChunk(answer, distractor) : undefined;
    if (key) keys.push(key);
    rights.add(answerUsageKey(right));
    reserveAnswer(usage, right);
    return { left, right };
  });
  return {
    pairs,
    hint: keys.length
      ? `Tìm trong mỗi câu phần mang điểm ngữ pháp chính, chẳng hạn ${codeList(keys)}, rồi đối chiếu với từng yêu cầu; mỗi phương án chỉ dùng một lần.`
      : `Gợi ý cho một cặp: ${clues[0]} Các cặp còn lại làm theo cách tương tự; mỗi phương án chỉ dùng một lần.`,
  };
}

function leastUsedParallelSeed(
  seeds: B1PracticeSeed[],
  start: number,
  offset: number,
  usage: AnswerUsage,
): B1PracticeSeed {
  const candidates = Array.from({ length: seeds.length }, (_, step) =>
    b1SeedAt(seeds, start + step, offset),
  );
  return [...candidates].sort((left, right) =>
    answerUseCount(usage, left[3]) - answerUseCount(usage, right[3]),
  )[0];
}

function advancedPracticeSet(
  prefix: string,
  focus: string,
  seeds: B1PracticeSeed[],
  setting: B1PracticeSetting,
): Exercise[] {
  if (seeds.length !== 12) throw new Error(`Bộ luyện tập ${prefix} phải có đúng 12 hạt nội dung nâng cao.`);
  const mix = { ...b1BaseMix[setting.profile] };
  const extraOrder = b1ExtraOrder[setting.profile];
  for (let index = 25; index < setting.target; index += 1) mix[extraOrder[(index - 25) % extraOrder.length]] += 1;

  const exercises: Exercise[] = [];
  const offset = b1SeedOffset(prefix);
  const usage: AnswerUsage = new Map();
  let nextId = 1;
  let primaryCursor = 0;
  let parallelCursor = 0;

  for (let index = 0; index < mix.choice; index += 1) {
    const [cue, answer, distractor, , explanation] = b1SeedAt(seeds, primaryCursor, offset);
    primaryCursor += 1;
    const prompt = b1ChoicePrompt(cue);
    reserveAnswer(usage, answer);
    exercises.push({ id: `${prefix}${nextId++}`, kind: "choice", prompt, options: [answer, distractor], answer, hint: b1Hint(explanation, [answer]), explanation });
  }

  for (let index = 0; index < mix.order; index += 1) {
    const [, , , sentence, explanation] = b1SeedAt(seeds, parallelCursor, offset + 5);
    parallelCursor += 1;
    const answer = sentenceTokens(sentence);
    const tokens = scrambledPieces(answer, `${prefix}${nextId}`);
    const prompt = `Sắp xếp các mảnh \`${tokens.join(" · ")}\` thành một câu hoàn chỉnh.`;
    reserveAnswer(usage, sentence);
    exercises.push({ id: `${prefix}${nextId++}`, kind: "order", prompt, tokens, answer, hint: b1Hint(explanation, [sentence]), explanation: `${explanation} Câu hoàn chỉnh là \`${sentence}\`.` });
  }

  for (let index = 0; index < mix.repair; index += 1) {
    const [cue, answer, distractor, , explanation] = b1SeedAt(seeds, primaryCursor, offset);
    primaryCursor += 1;
    const difference = b1Difference(answer, distractor);
    if (!difference.answerChunk || !difference.distractorChunk) throw new Error(`Không tạo được vị trí sửa cho ${prefix}: ${cue}`);
    const tokens = [
      ...difference.distractorTokens.slice(0, difference.start),
      difference.distractorChunk,
      ...difference.distractorTokens.slice(difference.distractorEnd),
    ];
    const prompt = `Chọn phần thay thế để câu ${cue.replace(/[.?]$/, "")}.`;
    reserveAnswer(usage, difference.answerChunk);
    exercises.push({
      id: `${prefix}${nextId++}`, kind: "repair", prompt, tokens, targetIndex: difference.start,
      replacements: [difference.answerChunk, difference.distractorChunk], answer: difference.answerChunk,
      hint: b1Hint(explanation, [difference.answerChunk]), explanation,
    });
  }

  for (let index = 0; index < mix.tap; index += 1) {
    const [cue, answer, distractor, parallelSentence, explanation] = b1SeedAt(seeds, primaryCursor, offset);
    primaryCursor += 1;
    const selectedAnswer = chooseLessUsedAnswer(usage, [answer, parallelSentence]);
    const prompt = b1ContrastPrompt(cue);
    reserveAnswer(usage, selectedAnswer);
    exercises.push({
      id: `${prefix}${nextId++}`, kind: "choice", prompt,
      options: [selectedAnswer, distractor], answer: selectedAnswer,
      hint: `Lỗi ở phương án còn lại cũng có thể xuất hiện khi muốn ${cue}; hãy đối chiếu hình thức ngữ pháp, không chỉ nghĩa từ vựng.`,
      explanation,
    });
  }

  for (let group = 0; group < mix.match; group += 1) {
    const reverse = group % 2 === 1;
    const { pairs, hint } = advancedMatchPairs(seeds, group * 4, offset + 2, usage, reverse);
    const prompt = variantFor(reverse ? reverseMatchPrompts : forwardMatchPrompts, Math.floor(group / 2), `bài ghép của ${prefix}`);
    exercises.push({ id: `${prefix}${nextId++}`, kind: "match", prompt, pairs, hint, explanation: matchExplanation(pairs) });
  }

  for (let group = 0; group < mix.grid; group += 1) {
    const gridRows = Array.from({ length: 3 }, (_, index) => advancedGridRow(
      seeds,
      b1SeedIndex(seeds, group * 3 + index, offset + 4),
      usage,
    ));
    const rows = gridRows.map(({ row }) => row);
    const prompt = variantFor(gridPrompts, group, `bảng của ${prefix}`);
    exercises.push({ id: `${prefix}${nextId++}`, kind: "grid", prompt, rows, hint: advancedGridHint(gridRows), explanation: gridExplanation(rows) });
  }

  for (let index = 0; index < mix.exact; index += 1) {
    const [, , , sentence, explanation] = leastUsedParallelSeed(seeds, parallelCursor, offset + 5, usage);
    parallelCursor += 1;
    const words = scrambledPieces(sentenceTokens(sentence), `${prefix}${nextId}`);
    const prompt = `Dùng đủ các mảnh \`${words.join(" · ")}\` để viết một câu hoàn chỉnh.`;
    reserveAnswer(usage, sentence);
    exercises.push({
      id: `${prefix}${nextId++}`, kind: "exact-input", prompt, acceptedAnswers: [sentence],
      normalization: { trim: true, ignoreInitialCapital: true, ignoreFinalPeriod: true },
      hint: b1Hint(explanation, [sentence]), explanation: `${explanation} Câu hoàn chỉnh là \`${sentence}\`.`,
    });
  }

  for (let group = 0; group < mix.dropdown; group += 1) {
    const activity = advancedDropdownActivity(Array.from({ length: 3 }, (_, index) => advancedDropdownSlot(
      prefix,
      group,
      index,
      seeds,
      b1SeedIndex(seeds, group * 3 + index, offset + 8),
      usage,
    )));
    const prompt = variantFor(dropdownPrompts, group, `bài chọn mô tả của ${prefix}`);
    exercises.push({ id: `${prefix}${nextId++}`, kind: "dropdown", prompt, ...activity });
  }

  if (exercises.length !== setting.target) throw new Error(`Bộ ${prefix} có ${exercises.length} hoạt động, cần ${setting.target}.`);
  return exercises;
}

function b2SafeClue(text: string, answers: string[]): string {
  return maskAnswerTerms(text, answers)
    .replaceAll("___", "hình thức cần tìm")
    .replace(/(?<=[\p{L}\p{N}])hình thức cần tìm/gu, " hình thức cần tìm")
    .replace(/hình thức cần tìm(?=[\p{L}\p{N}])/gu, "hình thức cần tìm ")
    .replace(/\s+/g, " ")
    .trim();
}

function b2ChoiceHint(cue: string, answer: string, distractor: string): string {
  const difference = b1Difference(answer, distractor);
  const safeCue = b2SafeClue(cue, [answer]);
  const shortChunk = (chunk: string) => chunk.split(" ").length <= 4;
  if (shortChunk(difference.answerChunk) && shortChunk(difference.distractorChunk) && difference.answerChunk && difference.distractorChunk) {
    // Nêu cả hai phần khác nhau theo thứ tự chữ cái để gợi ý không chỉ ra phương án nào sai.
    const [first, second] = [difference.answerChunk, difference.distractorChunk].sort((left, right) =>
      left.localeCompare(right, "en"),
    );
    return `Hai phương án chỉ khác nhau ở “${first}” và “${second}”; hỏi phần nào đáp ứng yêu cầu ${safeCue}.`;
  }
  return `Đọc kỹ yêu cầu ${safeCue}, rồi đối chiếu cả nghĩa lẫn hình thức của hai câu.`;
}

function b2SequenceHint(index: number, focus: string): string {
  const hints = [
    `Tìm chủ ngữ và cụm động từ chính trước, rồi đặt các thành phần còn lại theo quan hệ của ${focus}.`,
    `Xác định mốc thời gian hoặc quan hệ nghĩa trước khi ghép các mảnh của câu về ${focus}.`,
    `Ghép những từ thuộc cùng một cụm trước; sau đó kiểm tra trật tự của toàn câu về ${focus}.`,
    `Sau khi sắp xếp, đọc lại cả câu để kiểm tra nghĩa, hòa hợp và dấu câu của ${focus}.`,
  ];
  return hints[index % hints.length];
}

function b2AdvancedPracticeSet(
  prefix: string,
  focus: string,
  seeds: B1PracticeSeed[],
  setting: B1PracticeSetting,
  mode: "b2" | "c1" = "b2",
): Exercise[] {
  if (seeds.length !== 12) throw new Error(`Bộ luyện tập ${prefix} phải có đúng 12 hạt nội dung nâng cao.`);
  const c1MeaningProfile = mode === "c1" && (setting.profile === "meaning" || setting.profile === "discourse")
    ? setting.profile
    : undefined;
  const mix = c1MeaningProfile
    ? { ...c1MeaningMix[c1MeaningProfile] }
    : { ...b2BaseMix[setting.profile] };
  const extraOrder = c1MeaningProfile
    ? c1MeaningExtraOrder[c1MeaningProfile]
    : b2ExtraOrder[setting.profile];
  for (let index = 25; index < setting.target; index += 1) mix[extraOrder[index - 25]] += 1;

  const exercises: Exercise[] = [];
  const offset = b1SeedOffset(prefix);
  const usage: AnswerUsage = new Map();
  let nextId = 1;
  let primaryCursor = 0;
  let parallelCursor = 0;

  for (let index = 0; index < mix.choice; index += 1) {
    const seedIndex = b1SeedIndex(seeds, primaryCursor, offset);
    const [cue, answer, distractor, , explanation] = seeds[seedIndex];
    primaryCursor += 1;
    reserveAnswer(usage, answer);
    exercises.push({
      id: `${prefix}${nextId++}`,
      kind: "choice",
      ...(mode === "c1" ? { objectiveId: `seed-${seedIndex + 1}` } : {}),
      prompt: b1ChoicePrompt(cue),
      options: [answer, distractor],
      answer,
      hint: b2ChoiceHint(cue, answer, distractor),
      explanation,
    });
  }

  for (let index = 0; index < mix.order; index += 1) {
    const seedIndex = b1SeedIndex(seeds, parallelCursor, offset + 5);
    const [, , , sentence, explanation] = seeds[seedIndex];
    parallelCursor += 1;
    const answer = sentenceTokens(sentence);
    const tokens = scrambledPieces(answer, `${prefix}${nextId}`);
    exercises.push({
      id: `${prefix}${nextId++}`,
      kind: "order",
      ...(mode === "c1" ? { objectiveId: `seed-${seedIndex + 1}` } : {}),
      prompt: `Sắp xếp các mảnh \`${tokens.join(" · ")}\` thành một câu hoàn chỉnh.`,
      tokens,
      answer,
      hint: mode === "c1" ? b1Hint(explanation, [sentence]) : b2SequenceHint(index, focus),
      explanation: `${explanation} Câu hoàn chỉnh là \`${sentence}\`.`,
    });
    reserveAnswer(usage, sentence);
  }

  for (let index = 0; index < mix.repair; index += 1) {
    const seedIndex = b1SeedIndex(seeds, primaryCursor, offset);
    const [cue, answer, distractor, , explanation] = seeds[seedIndex];
    primaryCursor += 1;
    const difference = b1Difference(answer, distractor);
    if (!difference.answerChunk || !difference.distractorChunk) throw new Error(`Không tạo được vị trí sửa cho ${prefix}: ${cue}`);
    const tokens = [
      ...difference.distractorTokens.slice(0, difference.start),
      difference.distractorChunk,
      ...difference.distractorTokens.slice(difference.distractorEnd),
    ];
    reserveAnswer(usage, difference.answerChunk);
    exercises.push({
      id: `${prefix}${nextId++}`,
      kind: "repair",
      ...(mode === "c1" ? { objectiveId: `seed-${seedIndex + 1}` } : {}),
      prompt: `Hãy thay phần chưa phù hợp để câu ${cue}.`,
      tokens,
      targetIndex: difference.start,
      replacements: [difference.answerChunk, difference.distractorChunk],
      answer: difference.answerChunk,
      hint: `Câu hiện có một phần chưa phù hợp. Hãy kiểm tra vị trí được đánh dấu theo yêu cầu ${b2SafeClue(cue, [difference.answerChunk])}.`,
      explanation,
    });
  }

  for (let index = 0; index < mix.tap; index += 1) {
    const seedIndex = b1SeedIndex(seeds, primaryCursor, offset);
    const [cue, answer, distractor, parallelSentence, explanation] = seeds[seedIndex];
    primaryCursor += 1;
    const selectedAnswer = chooseLessUsedAnswer(usage, [answer, parallelSentence]);
    reserveAnswer(usage, selectedAnswer);
    exercises.push({
      id: `${prefix}${nextId++}`,
      kind: "choice",
      ...(mode === "c1" ? { objectiveId: `seed-${seedIndex + 1}` } : {}),
      prompt: b1ContrastPrompt(cue),
      options: [selectedAnswer, distractor],
      answer: selectedAnswer,
      hint: `Lỗi ở phương án còn lại cũng có thể xuất hiện khi muốn ${cue}; hãy kiểm tra hình thức ngữ pháp thay vì chỉ so nghĩa từ vựng.`,
      explanation,
    });
  }

  for (let group = 0; group < mix.match; group += 1) {
    const reverse = group % 2 === 1;
    const { pairs, hint } = advancedMatchPairs(
      seeds,
      group * (mode === "c1" ? 5 : 4),
      offset + 2,
      usage,
      reverse,
    );
    exercises.push({
      id: `${prefix}${nextId++}`,
      kind: "match",
      ...(mode === "c1" ? { objectiveId: `integration-match-${group + 1}` } : {}),
      prompt: variantFor(reverse ? reverseMatchPrompts : forwardMatchPrompts, Math.floor(group / 2), `bài ghép của ${prefix}`),
      pairs,
      hint,
      explanation: matchExplanation(pairs),
    });
  }

  for (let group = 0; group < mix.grid; group += 1) {
    const gridRows = Array.from({ length: 3 }, (_, index) => advancedGridRow(
      seeds,
      b1SeedIndex(seeds, group * (mode === "c1" ? 5 : 3) + index, offset + 6),
      usage,
    ));
    const rows = gridRows.map(({ row }) => row);
    exercises.push({
      id: `${prefix}${nextId++}`,
      kind: "grid",
      ...(mode === "c1" ? { objectiveId: `integration-grid-${group + 1}` } : {}),
      prompt: variantFor(gridPrompts, group, `bảng của ${prefix}`),
      rows,
      hint: advancedGridHint(gridRows),
      explanation: gridExplanation(rows),
    });
  }

  for (let index = 0; index < mix.exact; index += 1) {
    const selectedSeed = leastUsedParallelSeed(seeds, parallelCursor, offset + 5, usage);
    const seedIndex = seeds.indexOf(selectedSeed);
    const [, , , sentence, explanation] = selectedSeed;
    parallelCursor += 1;
    const words = scrambledPieces(sentenceTokens(sentence), `${prefix}${nextId}`);
    reserveAnswer(usage, sentence);
    exercises.push({
      id: `${prefix}${nextId++}`,
      kind: "exact-input",
      ...(mode === "c1" ? { objectiveId: `seed-${seedIndex + 1}` } : {}),
      prompt: `Viết một câu hoàn chỉnh dùng toàn bộ các mảnh \`${words.join(" · ")}\`.`,
      acceptedAnswers: [sentence],
      normalization: { trim: true, ignoreInitialCapital: true, ignoreFinalPeriod: true },
      hint: mode === "c1" ? b1Hint(explanation, [sentence]) : b2SequenceHint(index + mix.order, focus),
      explanation: `${explanation} Câu hoàn chỉnh là \`${sentence}\`.`,
    });
  }

  for (let group = 0; group < mix.dropdown; group += 1) {
    const activity = advancedDropdownActivity(Array.from({ length: 3 }, (_, index) => advancedDropdownSlot(
      prefix,
      group,
      index,
      seeds,
      b1SeedIndex(seeds, group * (mode === "c1" ? 5 : 3) + index, offset + 9),
      usage,
    )));
    exercises.push({
      id: `${prefix}${nextId++}`,
      kind: "dropdown",
      ...(mode === "c1" ? { objectiveId: `integration-dropdown-${group + 1}` } : {}),
      prompt: variantFor(dropdownPrompts, group, `bài chọn mô tả của ${prefix}`),
      ...activity,
    });
  }

  if (exercises.length !== setting.target) throw new Error(`Bộ ${prefix} có ${exercises.length} hoạt động, cần ${setting.target}.`);
  return exercises;
}

export function b1PracticeSet(prefix: string, focus: string, seeds: B1PracticeSeed[]): Exercise[] {
  const setting = b1PracticeSettings[prefix];
  if (!setting) throw new Error(`Chưa khai báo độ sâu luyện tập B1 cho ${prefix}.`);
  return advancedPracticeSet(prefix, focus, seeds, setting);
}

export function b2PracticeSet(prefix: string, focus: string, seeds: B1PracticeSeed[]): Exercise[] {
  const setting = b2PracticeSettings[prefix];
  if (!setting) throw new Error(`Chưa khai báo độ sâu luyện tập B2 cho ${prefix}.`);
  return b2AdvancedPracticeSet(prefix, focus, seeds, setting);
}

export function c1PracticeSet(prefix: string, focus: string, seeds: B1PracticeSeed[]): Exercise[] {
  const setting = c1PracticeSettings[prefix];
  if (!setting) throw new Error(`Chưa khai báo độ sâu luyện tập C1 cho ${prefix}.`);
  return b2AdvancedPracticeSet(prefix, focus, seeds, setting, "c1");
}
