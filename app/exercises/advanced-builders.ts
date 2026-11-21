import type { Exercise } from "../exercise-types.ts";
import { scrambledPieces } from "./answer-order.ts";
import { b1Difference, escapeRegExp, gridExplanation, maskAnswerTerms, maskDecidingParts, matchExplanation, sentenceTokens } from "./basic-builders.ts";

export { b1Difference };

/**
 * Phần bổ sung tùy chọn của một hạt nội dung:
 * - `parallelVariants`: những cách xếp khác của câu song song cũng đúng (dùng
 *   đúng các mảnh ấy), để bài sắp xếp và bài gõ câu chấp nhận chúng;
 * - `distractors`: phương án sai thêm cho câu hỏi chọn câu, khi bài thật sự có
 *   hơn hai cách nói dễ nhầm.
 */
type AdvancedSeedExtra = {
  parallelVariants?: string[];
  distractors?: string[];
};

type B1PracticeSeed = [
  cue: string,
  answer: string,
  distractor: string,
  parallelSentence: string,
  explanation: string,
  extra?: AdvancedSeedExtra,
];

/** So khớp các mảnh không phân biệt chữ hoa: cách xếp khác có thể đổi chữ hoa đầu câu. */
function sameTokens(left: string[], right: string[]): boolean {
  const key = (tokens: string[]) => tokens.map((token) => token.toLocaleLowerCase("en")).sort().join("\u0000");
  return key(left) === key(right);
}

/**
 * Cách xếp khác viết bằng chính các mảnh của câu song song: mảnh trùng chữ được lấy
 * trước, rồi mới tới mảnh chỉ khác chữ hoa (`Please` ở đầu câu thành `please` ở giữa câu).
 */
function variantTiles(variant: string, sentence: string): string[] {
  const tiles = sentenceTokens(sentence);
  const used = new Set<number>();
  const take = (token: string, match: (tile: string) => boolean) => {
    const index = tiles.findIndex((tile, position) => !used.has(position) && match(tile));
    if (index < 0) return undefined;
    used.add(index);
    return tiles[index];
  };
  const tokens = sentenceTokens(variant);
  const exact = tokens.map((token) => take(token, (tile) => tile === token));
  return tokens.map((token, index) =>
    exact[index] ?? take(token, (tile) => tile.toLocaleLowerCase("en") === token.toLocaleLowerCase("en")) ?? token,
  );
}

/** Các cách xếp khác của câu song song; mỗi cách phải dùng đúng các mảnh của câu. */
function parallelVariantsOf(seed: B1PracticeSeed): string[] {
  const variants = seed[5]?.parallelVariants ?? [];
  const tokens = sentenceTokens(seed[3]);
  for (const variant of variants) {
    if (!sameTokens(sentenceTokens(variant), tokens)) {
      throw new Error(`Cách xếp “${variant}” không dùng đúng các mảnh của “${seed[3]}”.`);
    }
  }
  return variants;
}

function variantNote(variants: string[]): string {
  if (!variants.length) return "";
  return ` Cách xếp ${variants.map((variant) => `\`${variant}\``).join(", ")} cũng đúng.`;
}

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
  if (!cueVerbPattern.test(normalizedCue)) return `cho đúng yêu cầu “${normalizedCue}”`;
  // Yêu cầu đã có “để” bên trong thì không thêm “để” lần nữa (“để dùng X để nói Y”).
  return /(?<![\p{L}])để(?![\p{L}])/u.test(normalizedCue) ? `sao cho câu ${normalizedCue}` : `để ${normalizedCue}`;
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

/**
 * Gợi ý dựa vào quy tắc trong lời giải, đã che đáp án. Khi biết phương án sai,
 * che thêm phần làm câu đúng khác câu sai (`maskDecidingParts`), vì lời giải
 * thường gọi thẳng tên phần ấy.
 */
function b1Hint(explanation: string, answers: string[], decide?: { answer: string; others: string[] }): string {
  const masked = maskAnswerTerms(explanation, answers);
  const hint = (decide ? maskDecidingParts(masked, decide.answer, decide.others) : masked).trim();
  return hint && hint !== "___" ? hint : "Xác định ý nghĩa và cấu trúc cần dùng trước khi chọn.";
}

/**
 * Gợi ý của câu hỏi đặt hai câu cạnh nhau: dựa vào quy tắc trong lời giải (đã
 * che đáp án), không nhắc lại yêu cầu. Phần quyết định của cả hai câu được che
 * thêm ở bước hoàn thiện dữ liệu (`quality.ts`).
 */
function contrastHint(explanation: string, shown: string, seedAnswer: string, distractor: string): string {
  // Câu hiện ra có thể là câu song song, khác câu sai ở cả câu; phần quyết định trong lời giải là
  // chỗ câu chính của hạt khác câu sai, nên che theo cả hai cặp.
  const masked = b1Hint(explanation, [shown, seedAnswer], { answer: shown, others: [distractor] });
  return `Tìm chỗ hai câu khác nhau rồi áp dụng quy tắc: ${shown === seedAnswer ? masked : maskDecidingParts(masked, seedAnswer, [distractor])}`;
}

/** Gợi ý của bài sửa: phần sai đã hiện trong câu, nên gợi ý nêu quy tắc cần áp dụng ở đó. */
function repairHint(explanation: string, answer: string, wrong: string): string {
  return `Xét phần đang bị gạch trong câu theo quy tắc: ${b1Hint(explanation, [answer], { answer, others: [wrong] })}`;
}

/** Tập từ có nghĩa của một lời mô tả, để đo hai lời mô tả giống nhau đến đâu. */
function descriptionWords(text: string): Set<string> {
  return new Set((text.replaceAll("`", " ").toLocaleLowerCase("vi").match(/[\p{L}\p{N}]+/gu) ?? []).filter((word) => word.length > 1));
}

function similarity(left: string, right: string): number {
  const a = descriptionWords(left);
  const b = descriptionWords(right);
  const shared = [...a].filter((word) => b.has(word)).length;
  return shared / Math.max(1, Math.min(a.size, b.size));
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

type ShownItems = Set<string>;

function shownKey(...parts: string[]): string {
  return parts.map(answerUsageKey).join("\u0000");
}

/** Ba cách dựng một hàng của bảng từ một hạt: chọn mảnh, chọn cả câu, chọn câu song song. */
function gridCandidates(seed: B1PracticeSeed) {
  const [cue, answer, distractor, parallelSentence] = seed;
  const difference = b1Difference(answer, distractor);
  if (!difference.answerText || !difference.distractorText) {
    throw new Error(`Không tạo được hàng chọn mảnh cho yêu cầu: ${cue}`);
  }
  // Câu tiếng Anh nằm trong ngoặc kép vì ô của bảng hiển thị chữ thường, không hiển thị Markdown.
  // Mảnh được cắt từ câu gốc để dấu câu không bị tách bằng khoảng trắng.
  // Khi hai câu khác nhau ở gần như cả câu (chủ động và bị động), “mảnh thay thế” thực ra là cả câu:
  // bỏ hàng chọn mảnh nếu phần khác nhau dài hơn bốn mảnh và chiếm quá nửa câu.
  const chunkLength = difference.answerEnd - difference.start;
  const tooLong = chunkLength > 4 && chunkLength * 2 > difference.answerTokens.length;
  const fragment = tooLong ? [] : [{
    cue: `Chọn mảnh thay thế trong câu “${distractor}” ${forCue(cue)}.`,
    options: [difference.answerText, difference.distractorText],
    answer: difference.answerText,
    completed: answer,
  }];
  return [
    ...fragment,
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
}

/**
 * Chọn một phương án trong các ứng viên theo thứ tự ưu tiên: không lặp lại
 * nguyên một mục đã có trong bài, không dùng một đáp án quá hai lần, rồi giữ
 * thứ tự hạt vốn có của bộ sinh và ưu tiên đáp án ít dùng.
 */
function bestCandidate<T>(candidates: Array<{ value: T; repeated: boolean; uses: number; step: number }>): T | undefined {
  return [...candidates].sort((left, right) =>
    Number(left.repeated) - Number(right.repeated) ||
    Number(left.uses >= 2) - Number(right.uses >= 2) ||
    left.step - right.step ||
    left.uses - right.uses,
  )[0]?.value;
}

/** Ba hàng của một bảng, mỗi hàng từ một hạt khác nhau, bắt đầu từ hạt `base`. */
function advancedGridRows(seeds: B1PracticeSeed[], base: number, usage: AnswerUsage, shown: ShownItems) {
  const rows: Array<{ row: ReturnType<typeof gridCandidates>[number]; explanation: string }> = [];
  const usedSeeds = new Set<number>();
  while (rows.length < 3) {
    const picked = bestCandidate(Array.from({ length: seeds.length }, (_, step) => (base + step) % seeds.length)
      .filter((seedIndex) => !usedSeeds.has(seedIndex))
      .flatMap((seedIndex, step) => gridCandidates(seeds[seedIndex]).map((row) => ({
        value: { row, seedIndex },
        repeated: shown.has(shownKey(row.cue, ...[...row.options].sort())),
        uses: answerUseCount(usage, row.answer),
        step,
      }))));
    if (!picked) throw new Error("Không đủ hạt để dựng bảng.");
    usedSeeds.add(picked.seedIndex);
    reserveAnswer(usage, picked.row.answer);
    shown.add(shownKey(picked.row.cue, ...[...picked.row.options].sort()));
    rows.push({ row: picked.row, explanation: seeds[picked.seedIndex][4] });
  }
  return rows;
}

type AdvancedGridRow = ReturnType<typeof advancedGridRows>[number];

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
  // Quy tắc chỉ lấy từ hàng chọn mảnh, sau khi che cả phần đúng lẫn phần bị gạt đi: lời giải của
  // hàng chọn cả câu thường gọi thẳng tên khung câu đúng.
  const answers = rows.map(({ row }) => row.answer);
  const rule = rows
    .filter(({ row }) => row.answer !== row.completed)
    .map(({ row, explanation }) => maskDecidingParts(
      maskAnswerTerms(explanation, answers),
      row.answer,
      row.options.filter((option) => option !== row.answer),
    ))
    .find((text) => !text.includes("___"));
  return rule
    ? `Ở mỗi hàng, đọc lại cả câu với phương án đã chọn. ${rule}`
    : "Ở mỗi hàng, đọc lại cả câu với phương án đã chọn: chỉ một phương án làm câu đáp ứng đúng yêu cầu.";
}

/**
 * Lời mô tả sai mượn từ một hạt khác. Hạt cách năm vị trí được thử trước; nếu
 * lời mô tả của nó gần với lời mô tả đúng (cùng một quy tắc, chỉ khác ví dụ),
 * nó có thể cũng đúng với câu đang xét, nên chuyển sang hạt kế tiếp.
 */
function dropdownFoil(seeds: B1PracticeSeed[], seedIndex: number, field: 0 | 4): string {
  const own = seeds[seedIndex];
  const candidates = Array.from({ length: seeds.length - 1 }, (_, step) => seeds[(seedIndex + 5 + step) % seeds.length])
    .filter((seed) => seed !== own && seed[field] !== own[field]);
  const distinct = candidates.find((seed) =>
    similarity(seed[0], own[0]) < 0.5 && similarity(seed[4], own[4]) < 0.5,
  );
  const chosen = distinct ?? [...candidates].sort((left, right) =>
    (similarity(left[0], own[0]) + similarity(left[4], own[4])) - (similarity(right[0], own[0]) + similarity(right[4], own[4])),
  )[0];
  return chosen[field];
}

/**
 * Một ô chọn mô tả. Câu đã được hỏi ở một ô trước đó thì nhường chỗ cho câu
 * song song của hạt, được mô tả bằng chính yêu cầu của hạt.
 */
function advancedDropdownSlots(
  prefix: string,
  group: number,
  seeds: B1PracticeSeed[],
  base: number,
  usage: AnswerUsage,
  shown: ShownItems,
) {
  const slots: Array<{ slot: { id: string; label: string; options: string[]; acceptedAnswers: string[] }; key?: string; distractor?: string }> = [];
  const usedSeeds = new Set<number>();
  while (slots.length < 3) {
    const picked = bestCandidate(Array.from({ length: seeds.length }, (_, step) => (base + step) % seeds.length)
      .filter((seedIndex) => !usedSeeds.has(seedIndex))
      .flatMap((seedIndex, step) => {
        const [cue, answer, , parallelSentence, explanation] = seeds[seedIndex];
        return ([[answer, cue], [answer, explanation], [parallelSentence, cue]] as const).map(([label, accepted]) => ({
          value: { seedIndex, label, accepted },
          repeated: shown.has(shownKey(label)),
          uses: answerUseCount(usage, accepted),
          step,
        }));
      }));
    if (!picked) throw new Error("Không đủ hạt để dựng bài chọn mô tả.");
    const { seedIndex, label, accepted } = picked;
    const [cue, answer, distractor] = seeds[seedIndex];
    usedSeeds.add(seedIndex);
    reserveAnswer(usage, accepted);
    shown.add(shownKey(label));
    slots.push({
      slot: {
        id: `${prefix}-slot-${group}-${slots.length}`,
        label,
        options: [accepted, dropdownFoil(seeds, seedIndex, accepted === cue ? 0 : 4)],
        acceptedAnswers: [accepted],
      },
      key: label === answer ? keyChunk(answer, distractor) : undefined,
      distractor: label === answer ? distractor : undefined,
    });
  }
  return slots;
}

type AdvancedDropdownSlot = ReturnType<typeof advancedDropdownSlots>[number];

/**
 * Gợi ý của bài chọn mô tả chỉ ra phần làm nên nghĩa của từng câu. Khi câu khác
 * cách nói dễ nhầm ở quá nhiều chỗ (thường gặp ở bài về văn phong), gợi ý đặt
 * một câu cạnh cách nói dễ nhầm đó để người học tự thấy câu đang làm gì.
 */
function advancedDropdownActivity(slots: AdvancedDropdownSlot[]) {
  const keys = slots.flatMap(({ key }) => key ? [key] : []);
  // Cách nói dễ nhầm chỉ đi với câu chính của hạt, không đi với câu song song.
  const unkeyed = slots.find(({ key, distractor }) => !key && distractor);
  return {
    slots: slots.map(({ slot }) => slot),
    hint: unkeyed
      ? `Đặt \`${unkeyed.slot.label}\` cạnh cách nói dễ nhầm \`${unkeyed.distractor}\`: chỗ khác nhau cho biết câu đang làm gì; xét các câu còn lại theo cách tương tự.`
      : keys.length
        ? `Phần quyết định nghĩa của các câu nằm ở ${codeList(keys)}; hãy chọn mô tả nói đúng công việc của phần ấy trong từng câu.`
        : `Trong \`${slots[0].slot.label}\`, tìm phần mang điểm ngữ pháp chính rồi chọn mô tả nói đúng công việc của phần ấy; xét các câu còn lại theo cách tương tự.`,
    explanation: `Mô tả đúng cho từng câu: ${slots.map(({ slot }) => `\`${slot.label}\` → “${slot.acceptedAnswers[0]}”`).join("; ")}.`,
  };
}

function advancedMatchPairs(
  seeds: B1PracticeSeed[],
  start: number,
  offset: number,
  usage: AnswerUsage,
  reverse: boolean,
  shown: ShownItems,
) {
  const rights = new Set<string>();
  const keys: string[] = [];
  const clues: string[] = [];
  const pairs: Array<{ left: string; right: string }> = [];
  const usedSeeds = new Set<number>();
  const base = b1SeedIndex(seeds, start, offset);
  // Một cặp (yêu cầu, câu) đã ghép ở bài ghép trước thì không ghép lại y hệt.
  while (pairs.length < 4) {
    const picked = bestCandidate(Array.from({ length: seeds.length }, (_, step) => (base + step) % seeds.length)
      .filter((seedIndex) => !usedSeeds.has(seedIndex))
      .flatMap((seedIndex, step) => {
        const [cue, answer, , parallelSentence] = seeds[seedIndex];
        return [answer, parallelSentence].map((sentence) => ({ cue, sentence, right: reverse ? cue : sentence }))
          .filter(({ right }) => !rights.has(answerUsageKey(right)))
          .map((candidate) => ({
            value: { seedIndex, ...candidate },
            repeated: shown.has(shownKey(candidate.cue, candidate.sentence)),
            uses: answerUseCount(usage, candidate.right),
            step,
          }));
      }));
    if (!picked) throw new Error("Không đủ hạt để dựng bài ghép.");
    const { seedIndex, cue, sentence, right } = picked;
    const [, answer, distractor, , explanation] = seeds[seedIndex];
    usedSeeds.add(seedIndex);
    clues.push(explanation);
    const key = sentence === answer ? keyChunk(answer, distractor) : undefined;
    if (key) keys.push(key);
    rights.add(answerUsageKey(right));
    reserveAnswer(usage, right);
    shown.add(shownKey(cue, sentence));
    pairs.push({ left: reverse ? sentence : cue, right });
  }
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
  exclude: Set<B1PracticeSeed> = new Set(),
): B1PracticeSeed {
  const candidates = Array.from({ length: seeds.length }, (_, step) =>
    b1SeedAt(seeds, start + step, offset),
  );
  // Hai bài gõ câu không bao giờ hỏi cùng một câu.
  const pool = candidates.filter((seed) => !exclude.has(seed));
  return [...(pool.length ? pool : candidates)].sort((left, right) =>
    answerUseCount(usage, left[3]) - answerUseCount(usage, right[3]),
  )[0];
}

function choiceOptions(seed: B1PracticeSeed, answer: string): string[] {
  return [...new Set([answer, seed[2], ...(seed[5]?.distractors ?? [])])];
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
  const shown: ShownItems = new Set();
  const typedSeeds = new Set<B1PracticeSeed>();
  let nextId = 1;
  let primaryCursor = 0;
  let parallelCursor = 0;

  for (let index = 0; index < mix.choice; index += 1) {
    const seed = b1SeedAt(seeds, primaryCursor, offset);
    const [cue, answer, , , explanation] = seed;
    primaryCursor += 1;
    const prompt = b1ChoicePrompt(cue);
    reserveAnswer(usage, answer);
    const options = choiceOptions(seed, answer);
    exercises.push({ id: `${prefix}${nextId++}`, kind: "choice", prompt, options, answer, hint: b1Hint(explanation, [answer], { answer, others: options.filter((option) => option !== answer) }), explanation });
  }

  for (let index = 0; index < mix.order; index += 1) {
    const seed = b1SeedAt(seeds, parallelCursor, offset + 5);
    const [, , , sentence, explanation] = seed;
    parallelCursor += 1;
    const answer = sentenceTokens(sentence);
    const variants = parallelVariantsOf(seed);
    const alternatives = variants.map((variant) => variantTiles(variant, sentence));
    const tokens = scrambledPieces(answer, `${prefix}${nextId}`, alternatives);
    const prompt = `Sắp xếp các mảnh \`${tokens.join(" · ")}\` thành một câu hoàn chỉnh.`;
    reserveAnswer(usage, sentence);
    exercises.push({
      id: `${prefix}${nextId++}`, kind: "order", prompt, tokens, answer,
      ...(alternatives.length ? { alternatives } : {}),
      hint: b1Hint(explanation, [sentence, ...variants]),
      explanation: `${explanation} Câu hoàn chỉnh là \`${sentence}\`.${variantNote(variants)}`,
    });
  }

  for (let index = 0; index < mix.repair; index += 1) {
    const [cue, answer, distractor, , explanation] = b1SeedAt(seeds, primaryCursor, offset);
    primaryCursor += 1;
    const difference = b1Difference(answer, distractor);
    if (!difference.answerText || !difference.distractorText) throw new Error(`Không tạo được vị trí sửa cho ${prefix}: ${cue}`);
    const tokens = [
      ...difference.distractorTokens.slice(0, difference.start),
      difference.distractorText,
      ...difference.distractorTokens.slice(difference.distractorEnd),
    ];
    const prompt = `Chọn phần thay thế để câu ${cue.replace(/[.?]$/, "")}.`;
    reserveAnswer(usage, difference.answerText);
    exercises.push({
      id: `${prefix}${nextId++}`, kind: "repair", prompt, tokens, targetIndex: difference.start,
      replacements: [difference.answerText, difference.distractorText], answer: difference.answerText,
      hint: repairHint(explanation, difference.answerText, difference.distractorText), explanation,
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
      hint: contrastHint(explanation, selectedAnswer, answer, distractor),
      explanation,
    });
  }

  for (let group = 0; group < mix.match; group += 1) {
    const reverse = group % 2 === 1;
    const { pairs, hint } = advancedMatchPairs(seeds, group * 4, offset + 2, usage, reverse, shown);
    const prompt = variantFor(reverse ? reverseMatchPrompts : forwardMatchPrompts, Math.floor(group / 2), `bài ghép của ${prefix}`);
    exercises.push({ id: `${prefix}${nextId++}`, kind: "match", prompt, pairs, hint, explanation: matchExplanation(pairs) });
  }

  for (let group = 0; group < mix.grid; group += 1) {
    const gridRows = advancedGridRows(seeds, b1SeedIndex(seeds, group * 3, offset + 4), usage, shown);
    const rows = gridRows.map(({ row }) => row);
    const prompt = variantFor(gridPrompts, group, `bảng của ${prefix}`);
    exercises.push({ id: `${prefix}${nextId++}`, kind: "grid", prompt, rows, hint: advancedGridHint(gridRows), explanation: gridExplanation(rows) });
  }

  for (let index = 0; index < mix.exact; index += 1) {
    const seed = leastUsedParallelSeed(seeds, parallelCursor, offset + 5, usage, typedSeeds);
    typedSeeds.add(seed);
    const [, , , sentence, explanation] = seed;
    const variants = parallelVariantsOf(seed);
    parallelCursor += 1;
    const words = scrambledPieces(sentenceTokens(sentence), `${prefix}${nextId}`, variants.map((variant) => variantTiles(variant, sentence)));
    const prompt = `Dùng đủ các mảnh \`${words.join(" · ")}\` để viết một câu hoàn chỉnh.`;
    reserveAnswer(usage, sentence);
    exercises.push({
      id: `${prefix}${nextId++}`, kind: "exact-input", prompt, acceptedAnswers: [sentence, ...variants],
      normalization: { trim: true, ignoreInitialCapital: true, ignoreFinalPeriod: true },
      hint: b1Hint(explanation, [sentence, ...variants]), explanation: `${explanation} Câu hoàn chỉnh là \`${sentence}\`.${variantNote(variants)}`,
    });
  }

  for (let group = 0; group < mix.dropdown; group += 1) {
    const activity = advancedDropdownActivity(advancedDropdownSlots(
      prefix,
      group,
      seeds,
      b1SeedIndex(seeds, group * 3, offset + 8),
      usage,
      shown,
    ));
    const prompt = variantFor(dropdownPrompts, group, `bài chọn mô tả của ${prefix}`);
    exercises.push({ id: `${prefix}${nextId++}`, kind: "dropdown", prompt, ...activity });
  }

  if (exercises.length !== setting.target) throw new Error(`Bộ ${prefix} có ${exercises.length} hoạt động, cần ${setting.target}.`);
  return exercises;
}

function b2ChoiceHint(answer: string, distractors: string[], explanation: string): string {
  const rule = b1Hint(explanation, [answer], { answer, others: distractors });
  // Khi có hơn hai phương án, câu “hai phương án chỉ khác nhau ở…” không còn đúng.
  if (distractors.length > 1) return `So từng phương án với yêu cầu, cả nghĩa lẫn hình thức. ${rule}`;
  const [distractor] = distractors;
  const difference = b1Difference(answer, distractor);
  const shortChunk = (chunk: string) => chunk.split(" ").length <= 4;
  if (shortChunk(difference.answerChunk) && shortChunk(difference.distractorChunk) && difference.answerText && difference.distractorText) {
    // Nêu cả hai phần khác nhau theo thứ tự chữ cái để gợi ý không chỉ ra phương án nào sai.
    const [first, second] = [difference.answerText, difference.distractorText].sort((left, right) =>
      left.localeCompare(right, "en"),
    );
    return `Hai phương án chỉ khác nhau ở “${first}” và “${second}”. ${rule}`;
  }
  return `Đối chiếu cả nghĩa lẫn hình thức của hai câu. ${rule}`;
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

/** Mã mục tiêu C1: loại năng lực được kiểm tra, kèm hạt nội dung để theo dõi độ bao phủ. */
function c1Objective(mode: "b2" | "c1", competence: string, seedIndex: number) {
  return mode === "c1" ? { objectiveId: `${competence}-seed-${seedIndex + 1}` } : {};
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
  const shown: ShownItems = new Set();
  const typedSeeds = new Set<B1PracticeSeed>();
  let nextId = 1;
  let primaryCursor = 0;
  let parallelCursor = 0;

  for (let index = 0; index < mix.choice; index += 1) {
    const seedIndex = b1SeedIndex(seeds, primaryCursor, offset);
    const seed = seeds[seedIndex];
    const [cue, answer, , , explanation] = seed;
    primaryCursor += 1;
    reserveAnswer(usage, answer);
    exercises.push({
      id: `${prefix}${nextId++}`,
      kind: "choice",
      ...c1Objective(mode, "meaning-choice", seedIndex),
      prompt: b1ChoicePrompt(cue),
      options: choiceOptions(seed, answer),
      answer,
      hint: b2ChoiceHint(answer, choiceOptions(seed, answer).filter((option) => option !== answer), explanation),
      explanation,
    });
  }

  for (let index = 0; index < mix.order; index += 1) {
    const seedIndex = b1SeedIndex(seeds, parallelCursor, offset + 5);
    const seed = seeds[seedIndex];
    const [, , , sentence, explanation] = seed;
    parallelCursor += 1;
    const answer = sentenceTokens(sentence);
    const variants = parallelVariantsOf(seed);
    const alternatives = variants.map((variant) => variantTiles(variant, sentence));
    const tokens = scrambledPieces(answer, `${prefix}${nextId}`, alternatives);
    exercises.push({
      id: `${prefix}${nextId++}`,
      kind: "order",
      ...c1Objective(mode, "controlled-production", seedIndex),
      prompt: `Sắp xếp các mảnh \`${tokens.join(" · ")}\` thành một câu hoàn chỉnh.`,
      tokens,
      answer,
      ...(alternatives.length ? { alternatives } : {}),
      hint: mode === "c1" ? b1Hint(explanation, [sentence, ...variants]) : b2SequenceHint(index, focus),
      explanation: `${explanation} Câu hoàn chỉnh là \`${sentence}\`.${variantNote(variants)}`,
    });
    reserveAnswer(usage, sentence);
  }

  for (let index = 0; index < mix.repair; index += 1) {
    const seedIndex = b1SeedIndex(seeds, primaryCursor, offset);
    const [cue, answer, distractor, , explanation] = seeds[seedIndex];
    primaryCursor += 1;
    const difference = b1Difference(answer, distractor);
    if (!difference.answerText || !difference.distractorText) throw new Error(`Không tạo được vị trí sửa cho ${prefix}: ${cue}`);
    const tokens = [
      ...difference.distractorTokens.slice(0, difference.start),
      difference.distractorText,
      ...difference.distractorTokens.slice(difference.distractorEnd),
    ];
    reserveAnswer(usage, difference.answerText);
    exercises.push({
      id: `${prefix}${nextId++}`,
      kind: "repair",
      ...c1Objective(mode, "error-correction", seedIndex),
      prompt: `Hãy thay phần đang bị gạch để câu ${cue.replace(/[.?]$/, "")}.`,
      tokens,
      targetIndex: difference.start,
      replacements: [difference.answerText, difference.distractorText],
      answer: difference.answerText,
      hint: repairHint(explanation, difference.answerText, difference.distractorText),
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
      ...c1Objective(mode, "contrast-judgement", seedIndex),
      prompt: b1ContrastPrompt(cue),
      options: [selectedAnswer, distractor],
      answer: selectedAnswer,
      hint: contrastHint(explanation, selectedAnswer, answer, distractor),
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
      shown,
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
    const gridRows = advancedGridRows(seeds, b1SeedIndex(seeds, group * (mode === "c1" ? 5 : 3), offset + 6), usage, shown);
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
    const selectedSeed = leastUsedParallelSeed(seeds, parallelCursor, offset + 5, usage, typedSeeds);
    typedSeeds.add(selectedSeed);
    const seedIndex = seeds.indexOf(selectedSeed);
    const [, , , sentence, explanation] = selectedSeed;
    const variants = parallelVariantsOf(selectedSeed);
    parallelCursor += 1;
    const words = scrambledPieces(sentenceTokens(sentence), `${prefix}${nextId}`, variants.map((variant) => variantTiles(variant, sentence)));
    reserveAnswer(usage, sentence);
    exercises.push({
      id: `${prefix}${nextId++}`,
      kind: "exact-input",
      ...c1Objective(mode, "independent-production", seedIndex),
      prompt: `Viết một câu hoàn chỉnh dùng toàn bộ các mảnh \`${words.join(" · ")}\`.`,
      acceptedAnswers: [sentence, ...variants],
      normalization: { trim: true, ignoreInitialCapital: true, ignoreFinalPeriod: true },
      hint: mode === "c1" ? b1Hint(explanation, [sentence, ...variants]) : b2SequenceHint(index + mix.order, focus),
      explanation: `${explanation} Câu hoàn chỉnh là \`${sentence}\`.${variantNote(variants)}`,
    });
  }

  for (let group = 0; group < mix.dropdown; group += 1) {
    const activity = advancedDropdownActivity(advancedDropdownSlots(
      prefix,
      group,
      seeds,
      b1SeedIndex(seeds, group * (mode === "c1" ? 5 : 3), offset + 9),
      usage,
      shown,
    ));
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
