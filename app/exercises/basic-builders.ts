import type { Exercise } from "../exercise-types.ts";

type ChoiceSeed = [
  prompt: string,
  options: string[],
  answer: string,
  hint: string,
  explanation: string,
];

type ContextSeed = [
  context: string,
  prompt: string,
  options: string[],
  answer: string,
  hint: string,
  explanation: string,
];

type RepairSeed = [
  prompt: string,
  tokens: string[],
  targetIndex: number,
  replacements: string[],
  answer: string,
  hint: string,
  explanation: string,
];

type OrderSeed = [
  prompt: string,
  tokens: string[],
  answer: string[],
  hint: string,
  explanation: string,
  alternatives?: string[][],
];

type TapSeed = [
  prompt: string,
  tokens: string[],
  answerIndexes: number[],
  hint: string,
  explanation: string,
];

type CompactChoiceSeed = [
  prompt: string,
  options: string[],
  answer: string,
  explanation: string,
];

type CompactOrderSeed = [
  prompt: string,
  tokens: string[],
  answer: string[],
  explanation: string,
  /** Những cách xếp khác cũng đúng (chẳng hạn trạng ngữ thời gian đứng đầu hoặc cuối câu). */
  alternatives?: string[][],
];

type CompactRepairSeed = [
  prompt: string,
  tokens: string[],
  targetIndex: number,
  replacements: string[],
  answer: string,
  explanation: string,
];

type CompactTapSeed = [
  prompt: string,
  tokens: string[],
  answerIndexes: number[],
  explanation: string,
];

type CompactGridRow = {
  cue: string;
  options: string[];
  answer: string;
  completed: string;
};

type CompactPracticeConfig = {
  prefix: string;
  focus: string;
  choices: CompactChoiceSeed[];
  orders: CompactOrderSeed[];
  repairs: CompactRepairSeed[];
  taps: CompactTapSeed[];
  matchPrompt: string;
  pairs: Array<{ left: string; right: string }>;
  sortPrompt: string;
  buckets: string[];
  items: Array<{ text: string; bucket: string }>;
  gridPrompts: [string, string, string];
  gridRows: CompactGridRow[];
};

type A2OrderSeed = [prompt: string, sentence: string, explanation: string, alternatives?: string[]];
type A2RepairSeed = [
  prompt: string,
  sentence: string,
  wrongToken: string,
  replacements: string[],
  answer: string,
  explanation: string,
];
type A2TapSeed = [prompt: string, sentence: string, selectedTokens: string[], explanation: string];
type A2PracticeConfig = Omit<CompactPracticeConfig, "orders" | "repairs" | "taps"> & {
  orders: A2OrderSeed[];
  repairs: A2RepairSeed[];
  taps: A2TapSeed[];
};

const sentenceTokenPattern = /[\p{L}]+(?:[-'’][\p{L}]+)*|\d+(?:[.:]\d+)?(?:°[\p{L}])?|[.,?!:;—"“”'‘’()]/gu;

export function sentenceTokens(sentence: string): string[] {
  return sentence.match(sentenceTokenPattern) ?? [];
}

/** Vị trí của từng mảnh trong câu gốc, để cắt lại một đoạn câu mà giữ nguyên khoảng trắng quanh dấu câu. */
export function sentenceTokenSpans(sentence: string): Array<{ start: number; end: number }> {
  return [...sentence.matchAll(sentenceTokenPattern)].map((match) => ({
    start: match.index,
    end: match.index + match[0].length,
  }));
}

/** Đoạn câu gồm các mảnh từ `from` tới trước `to`, cắt từ câu gốc để không có khoảng trắng trước dấu câu. */
export function sentenceSlice(sentence: string, from: number, to: number): string {
  const spans = sentenceTokenSpans(sentence);
  if (from >= to || !spans[from] || !spans[to - 1]) return "";
  return sentence.slice(spans[from].start, spans[to - 1].end);
}

/** Ghép lại các mảnh thành câu: không có khoảng trắng trước dấu câu, sau dấu mở ngoặc hay trước dấu đóng ngoặc. */
export function joinSentenceTokens(tokens: string[]): string {
  return tokens.join(" ").replace(/\s+([.,?!:;)])/g, "$1").replace(/\(\s+/g, "(");
}

/**
 * Chỗ khác nhau giữa câu đúng và câu dễ nhầm, tính theo mảnh. Phần giống nhau ở
 * đầu và cuối hai câu được bỏ qua; nếu một câu chỉ thêm mảnh so với câu kia, lấy
 * thêm một mảnh kề bên để cả hai phần đều có chữ.
 */
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
    /** Hai phần khác nhau, cắt từ câu gốc nên dấu câu giữ đúng khoảng trắng. */
    answerText: sentenceSlice(answer, start, answerEnd),
    distractorText: sentenceSlice(distractor, start, distractorEnd),
  };
}

export function a2PracticeSet(config: A2PracticeConfig): Exercise[] {
  return compactPracticeSet({
    ...config,
    orders: config.orders.map(([prompt, sentence, explanation, alternatives], index) => {
      const answer = sentenceTokens(sentence);
      const shift = 2 + (index % Math.max(1, answer.length - 2));
      return [prompt, [...answer.slice(shift), ...answer.slice(0, shift)], answer, explanation, alternatives?.map(sentenceTokens)];
    }),
    repairs: config.repairs.map(([prompt, sentence, wrongToken, replacements, answer, explanation]) => {
      // Mảnh cần sửa có thể gồm nhiều từ (`been knowing` → `known`); khi đó gộp chúng thành một ô.
      // Nếu mảnh xuất hiện nhiều lần, vị trí đầu tiên được đánh dấu.
      const sentenceParts = sentenceTokens(sentence);
      const wrongParts = sentenceTokens(wrongToken);
      const targetIndex = sentenceParts.findIndex((_, index) =>
        wrongParts.every((part, offset) => sentenceParts[index + offset] === part),
      );
      if (targetIndex < 0) throw new Error(`Không tìm thấy mảnh cần sửa “${wrongToken}” trong “${sentence}”.`);
      const tokens = [
        ...sentenceParts.slice(0, targetIndex),
        wrongParts.join(" "),
        ...sentenceParts.slice(targetIndex + wrongParts.length),
      ];
      return [prompt, tokens, targetIndex, replacements, answer, explanation];
    }),
    taps: config.taps.map(([prompt, sentence, selectedTokens, explanation]) => {
      const tokens = sentenceTokens(sentence);
      const answerIndexes = tokens.flatMap((token, index) => selectedTokens.includes(token) ? [index] : []);
      if (answerIndexes.length !== selectedTokens.length) {
        throw new Error(`Các mảnh cần chọn trong “${sentence}” phải xuất hiện đúng một lần.`);
      }
      return [prompt, tokens, answerIndexes, explanation];
    }),
  });
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Che đáp án trong gợi ý. Với đáp án ngắn, từng từ của đáp án cũng bị che,
 * trừ những từ cũng có trong phương án sai: nhắc tới chúng không chỉ ra đáp án
 * (gợi ý “Sau `can`, dùng động từ cơ bản” không lộ câu `I can swim.` khi phương
 * án sai cũng có `can`).
 */
export function maskAnswerTerms(text: string, answers: string[], otherOptions: string[] = []): string {
  const sharedWords = new Set(
    otherOptions.flatMap((option) =>
      (option.replaceAll("`", "").match(/[\p{L}]+(?:['’][\p{L}]+)?/gu) ?? []).map((word) => word.toLocaleLowerCase("en")),
    ),
  );
  const terms = new Set<string>();
  for (const answer of answers) {
    const clean = answer.replaceAll("`", "").trim();
    if (!clean) continue;
    terms.add(clean);
    const tokens = clean.match(/[\p{L}]+(?:['’][\p{L}]+)?/gu) ?? [];
    if (tokens.length <= 3) {
      for (const token of tokens) {
        if (!sharedWords.has(token.toLocaleLowerCase("en"))) terms.add(token);
      }
    }
  }

  let masked = text;
  for (const term of [...terms].sort((left, right) => right.length - left.length)) {
    const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(term)}(?![\\p{L}\\p{N}])`, "giu");
    masked = masked.replace(pattern, "___");
  }
  return masked
    .replace(/`([^`\n]*___[^`\n]*)`/g, "$1")
    .replace(/(?:___\s*){2,}/g, "___")
    .replace(/(?<=[\p{L}\p{N}])___/gu, " ___")
    .replace(/___(?=[\p{L}\p{N}])/gu, "___ ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tên tiếng Việt của dấu câu, để gợi ý không gọi thẳng tên dấu câu là đáp án. */
const punctuationNames: Record<string, string[]> = {
  ",": ["dấu phẩy"],
  ".": ["dấu chấm"],
  "?": ["dấu chấm hỏi", "dấu hỏi"],
  "!": ["dấu chấm than"],
  ";": ["dấu chấm phẩy"],
  ":": ["dấu hai chấm"],
  "—": ["gạch ngang dài", "dấu gạch ngang dài", "dấu gạch ngang"],
};

/** Phần làm đáp án khác từng phương án sai, và phần tương ứng của phương án sai (tối đa bốn mảnh). */
function decidingParts(answer: string, others: string[]): { answerParts: string[]; otherParts: string[] } {
  const answerParts = new Set<string>();
  const otherParts = new Set<string>();
  const clean = (value: string) => value.replaceAll("`", "").trim();
  for (const other of others) {
    if (!other || clean(other) === clean(answer)) continue;
    const difference = b1Difference(clean(answer), clean(other));
    const keep = (text: string, target: Set<string>) => {
      if (!text || text.split(/\s+/).length > 4) return;
      const trimmed = /[\p{L}\p{N}]/u.test(text) ? text.replace(/[.?!]+$/, "") : text;
      if (trimmed) target.add(trimmed);
    };
    keep(difference.answerText, answerParts);
    keep(difference.distractorText, otherParts);
    // Trong một phần khác nhau dài, những từ chỉ có ở một bên (`had known` trong `had known the answer`
    // so với `knew the answer yesterday`) là chỗ quyết định thật sự; lời giải hay gọi tên riêng chúng.
    const ownRuns = (chunk: string[], otherSentence: string) => {
      const otherWords = new Set(sentenceTokens(otherSentence).map((token) => token.toLocaleLowerCase("en")));
      const runs: string[][] = [[]];
      for (const token of chunk) {
        if (/[\p{L}\p{N}]/u.test(token) && !otherWords.has(token.toLocaleLowerCase("en"))) runs.at(-1)!.push(token);
        else if (runs.at(-1)!.length) runs.push([]);
      }
      return runs.filter((run) => run.length && run.length < chunk.length);
    };
    for (const run of ownRuns(difference.answerTokens.slice(difference.start, difference.answerEnd), clean(other))) {
      keep(joinSentenceTokens(run), answerParts);
    }
    for (const run of ownRuns(difference.distractorTokens.slice(difference.start, difference.distractorEnd), clean(answer))) {
      keep(joinSentenceTokens(run), otherParts);
    }
    // Một bên chỉ thêm mảnh so với bên kia (`listened to` / `listened`): phần thêm vào mới là chỗ quyết định.
    const answerChunk = difference.answerChunk.split(" ");
    const otherChunk = difference.distractorChunk.split(" ");
    const [longer, shorter, target] = answerChunk.length > otherChunk.length
      ? [answerChunk, otherChunk, answerParts]
      : [otherChunk, answerChunk, otherParts];
    if (shorter.length && longer.length > shorter.length) {
      const extra = longer.slice(0, shorter.length).join(" ") === shorter.join(" ")
        ? longer.slice(shorter.length)
        : longer.slice(-shorter.length).join(" ") === shorter.join(" ")
          ? longer.slice(0, longer.length - shorter.length)
          : [];
      if (extra.length && extra.length <= 4) keep(joinSentenceTokens(extra), target);
    }
  }
  for (const part of answerParts) otherParts.delete(part);
  return { answerParts: [...answerParts], otherParts: [...otherParts] };
}

/** Thay `pattern` bằng chỗ trống, chỉ trong các đoạn mã (`...`) nếu `codeOnly`. */
function replaceInText(text: string, pattern: RegExp, codeOnly: boolean): string {
  if (!codeOnly) return text.replace(pattern, "___");
  return text.split(/(`[^`\n]*`)/).map((segment) =>
    segment.startsWith("`") && segment.endsWith("`") && segment.length > 1 ? segment.replace(pattern, "___") : segment,
  ).join("");
}

/**
 * Che phần quyết định đáp án trong gợi ý: chỗ câu đúng khác các phương án sai,
 * kể cả tên tiếng Việt của dấu câu khi chính dấu câu là chỗ khác nhau. Phần của
 * phương án sai chỉ bị che khi gợi ý gạt nó đi (“không dùng X”, “thay vì X”),
 * vì khi chỉ có hai phương án, gạt một phương án đi là chỉ ra đáp án. Từ rất
 * ngắn như `do`, `to`, `an` cũng là chữ tiếng Việt, nên chỉ bị che trong đoạn mã.
 */
export function maskDecidingParts(text: string, answer: string, others: string[]): string {
  const { answerParts, otherParts } = decidingParts(answer, others);
  let masked = text;
  const wordPatternFor = (part: string) =>
    new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(part)}(?![\\p{L}\\p{N}])`, "giu");
  for (const part of [...answerParts].sort((left, right) => right.length - left.length)) {
    if (!/[\p{L}\p{N}]/u.test(part)) {
      masked = masked.replaceAll(`\`${part}\``, "___");
      for (const name of punctuationNames[part] ?? []) {
        masked = masked.replace(new RegExp(`(?<![\\p{L}])${escapeRegExp(name)}(?![\\p{L}])`, "giu"), "___");
      }
      continue;
    }
    masked = replaceInText(masked, wordPatternFor(part), part.length <= 3);
  }
  for (const part of [...otherParts].sort((left, right) => right.length - left.length)) {
    const isWord = /[\p{L}\p{N}]/u.test(part);
    const partPattern = isWord ? wordPatternFor(part) : new RegExp(escapeRegExp(part), "g");
    // Sau lời gạt đi (“không dùng”, “thay vì”…) là một đoạn mã hoặc chính phần ấy viết trần.
    const rejected = new RegExp(
      `((?:không|thay vì|chứ)(?:\\s+[\\p{L}]+){0,2}\\s+)(\`[^\`\\n]*\`|${isWord ? escapeRegExp(part) : "(?!)"})(?![\\p{L}\\p{N}])`,
      "giu",
    );
    masked = masked.replace(rejected, (_, lead: string, target: string) => {
      if (!target.startsWith("`")) return `${lead}___`;
      return `${lead}${target.replace(partPattern, "___")}`;
    });
    for (const name of isWord ? [] : punctuationNames[part] ?? []) {
      masked = masked.replace(
        new RegExp(`((?:không|thay vì|chứ)(?:\\s+[\\p{L}]+){0,2}\\s+)${escapeRegExp(name)}(?![\\p{L}])`, "giu"),
        "$1___",
      );
    }
  }
  if (masked === text) return text;
  return masked
    .replace(/`([^`\n]*___[^`\n]*)`/g, "$1")
    .replace(/(?:___\s*){2,}/g, "___")
    .replace(/(?<=[\p{L}\p{N}])___/gu, " ___")
    .replace(/___(?=[\p{L}\p{N}])/gu, "___ ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Câu dẫn theo dạng hoạt động đứng trước quy tắc trong gợi ý tự sinh. */
export const hintLeads = {
  order: "Hãy xác định cụm từ nào phải đứng liền nhau, rồi đặt các thành phần còn lại quanh cụm đó.",
  repair: "Nhìn hai mảnh ở hai bên vị trí cần sửa.",
  tap: "Xét công việc của từng mảnh trong cả câu.",
  grid: "Giải riêng từng hàng; chú ý lần lượt các dấu hiệu",
} as const;

export function specificHint(
  kind: Exercise["kind"],
  prompt: string,
  explanation: string,
  answers: string[],
  cues: string[] = [],
  otherOptions: string[] = [],
): string {
  const masked = maskAnswerTerms(explanation, answers, otherOptions);
  const rule = (kind === "choice" || kind === "context" || kind === "repair") && answers.length === 1
    ? maskDecidingParts(masked, answers[0], otherOptions)
    : masked;
  if (kind === "choice" || kind === "context") return rule;
  if (kind === "order") return `${hintLeads.order} ${rule}`;
  if (kind === "repair") return `${hintLeads.repair} ${rule}`;
  if (kind === "tap") return `${hintLeads.tap} ${rule}`;
  if (kind === "match") {
    return `Đọc từng vế và tìm đúng quan hệ được nêu sau đây: ${prompt.replace(/[.?]$/, "")}; mỗi vế chỉ dùng một lần.`;
  }
  if (kind === "sort") {
    return `Dùng đúng tiêu chí trong yêu cầu sau và kiểm tra từng mục độc lập trước khi phân nhóm: ${prompt.replace(/[.?]$/, "")}.`;
  }
  return `${hintLeads.grid} ${cues.map((cue) => `“${cue}”`).join(", ")}.`;
}

/**
 * Lời giải của bài ghép nêu từng cặp; `note` là lời giải thích riêng của hoạt
 * động nếu có. Không tự thêm “mỗi cặp cho thấy <trọng tâm bài>”, vì bài ghép
 * thường đặt cấu trúc của bài cạnh một cấu trúc khác để đối chiếu.
 */
export function matchExplanation(pairs: Array<{ left: string; right: string }>, note = ""): string {
  const listed = `Các cặp đúng là: ${pairs.map(({ left, right }) => `“${left}” → “${right}”`).join("; ")}.`;
  return note ? `${listed} ${note}` : listed;
}

export function sortExplanation(buckets: string[], items: Array<{ text: string; bucket: string }>): string {
  return buckets.map((bucket) => {
    const members = items.filter((item) => item.bucket === bucket).map((item) => `“${item.text}”`).join(", ");
    return `Nhóm “${bucket}” gồm ${members}`;
  }).join(". ") + ".";
}

function inlineExample(value: string): string {
  return `\`${value.replaceAll("`", "'")}\``;
}

/**
 * Lời giải của bảng nêu từng câu hoàn chỉnh. Không thêm câu kiểu “mỗi lựa chọn
 * khớp với <trọng tâm bài>”: nhiều bảng đối chiếu hai nhóm (loại 0 với loại 1,
 * hiện tại hoàn thành với quá khứ đơn), nên câu ấy sai với một nửa số hàng.
 */
export function gridExplanation(rows: CompactGridRow[]): string {
  const completed = rows.map((row) => inlineExample(row.completed)).join("; ");
  return `Các câu hoàn chỉnh lần lượt là: ${completed}${/[.?!]`$/.test(completed) ? "" : "."}`;
}

/**
 * Bộ khung A1 dùng chung hình dạng dữ liệu nhưng để số hoạt động do nội dung
 * của từng bài quyết định. Tình huống, đáp án và lời giải vẫn được khai báo
 * riêng; hàm này không tự sinh thêm câu chỉ để chạm một con số cố định.
 */
export function compactPracticeSet(config: CompactPracticeConfig): Exercise[] {
  const exercises: Exercise[] = [];
  let nextId = 1;

  for (const [prompt, options, answer, explanation] of config.choices) {
    exercises.push({ id: `${config.prefix}${nextId++}`, kind: "choice", prompt, options, answer, hint: specificHint("choice", prompt, explanation, [answer], [], options.filter((option) => option !== answer)), explanation });
  }
  for (const [prompt, tokens, answer, explanation, alternatives] of config.orders) {
    exercises.push({
      id: `${config.prefix}${nextId++}`, kind: "order", prompt, tokens, answer,
      ...(alternatives?.length ? { alternatives } : {}),
      hint: specificHint("order", prompt, explanation, [answer, ...(alternatives ?? [])].map(joinSentenceTokens)),
      explanation,
    });
  }
  for (const [prompt, tokens, targetIndex, replacements, answer, explanation] of config.repairs) {
    exercises.push({ id: `${config.prefix}${nextId++}`, kind: "repair", prompt, tokens, targetIndex, replacements, answer, hint: specificHint("repair", prompt, explanation, [answer], [], replacements.filter((option) => option !== answer)), explanation });
  }
  for (const [prompt, tokens, answerIndexes, explanation] of config.taps) {
    const answers = answerIndexes.map((answerIndex) => tokens[answerIndex]);
    exercises.push({
      id: `${config.prefix}${nextId++}`,
      kind: "tap",
      prompt,
      tokens,
      answerIndexes,
      selectionMode: answerIndexes.length === 1 ? "single" : "multiple",
      hint: specificHint("tap", prompt, explanation, answers),
      explanation,
    });
  }
  exercises.push({
    id: `${config.prefix}${nextId++}`,
    kind: "match",
    prompt: config.matchPrompt,
    pairs: config.pairs,
    hint: specificHint("match", config.matchPrompt, "", []),
    explanation: matchExplanation(config.pairs),
  });
  exercises.push({
    id: `${config.prefix}${nextId++}`,
    kind: "sort",
    prompt: config.sortPrompt,
    buckets: config.buckets,
    items: config.items,
    hint: specificHint("sort", config.sortPrompt, "", []),
    explanation: sortExplanation(config.buckets, config.items),
  });
  for (let index = 0; index < config.gridPrompts.length; index += 1) {
    const rows = config.gridRows.slice(index * 3, index * 3 + 3);
    exercises.push({
      id: `${config.prefix}${nextId++}`,
      kind: "grid",
      prompt: config.gridPrompts[index],
      rows,
      hint: specificHint("grid", config.gridPrompts[index], "", rows.map((row) => row.answer), rows.map((row) => row.cue)),
      explanation: gridExplanation(rows),
    });
  }

  if (exercises.length < 25 || exercises.length > 40 || config.gridRows.length !== config.gridPrompts.length * 3) {
    throw new Error(`Bộ luyện tập ${config.prefix} phải có 25–40 hoạt động và ba hàng cho mỗi bảng.`);
  }
  return exercises;
}

type BinaryDrillSeed = [
  cue: string,
  answer: string,
  distractor: string,
  explanation: string,
];

export function binaryChoiceDrills(
  prefix: string,
  start: number,
  focus: string,
  seeds: BinaryDrillSeed[],
): Exercise[] {
  const promptBuilders = [
    (cue: string) => `Cách diễn đạt nào đúng cho ${cue}?`,
    (cue: string) => `Với ${cue}, phương án nào phù hợp?`,
    (cue: string) => `Chọn cách nói đúng để diễn đạt ${cue}.`,
    (cue: string) => `Phương án nào thể hiện đúng ${cue}?`,
  ];
  return seeds.map(([cue, answer, distractor, explanation], index) => ({
    id: `${prefix}${start + index}`,
    kind: "choice" as const,
    prompt: promptBuilders[index % promptBuilders.length](cue),
    options: [answer, distractor],
    answer,
    hint: specificHint("choice", promptBuilders[index % promptBuilders.length](cue), explanation, [answer], [], [distractor]),
    explanation,
  }));
}

export function choiceExercises(prefix: string, start: number, seeds: ChoiceSeed[]): Exercise[] {
  return seeds.map(([prompt, options, answer, hint, explanation], index) => ({
    id: `${prefix}${start + index}`,
    kind: "choice",
    prompt,
    options,
    answer,
    hint,
    explanation,
  }));
}

export function contextExercises(prefix: string, start: number, seeds: ContextSeed[]): Exercise[] {
  return seeds.map(([context, prompt, options, answer, hint, explanation], index) => ({
    id: `${prefix}${start + index}`,
    kind: "context",
    context,
    prompt,
    options,
    answer,
    hint,
    explanation,
  }));
}

export function repairExercises(prefix: string, start: number, seeds: RepairSeed[]): Exercise[] {
  return seeds.map(([
    prompt,
    tokens,
    targetIndex,
    replacements,
    answer,
    hint,
    explanation,
  ], index) => ({
    id: `${prefix}${start + index}`,
    kind: "repair",
    prompt,
    tokens,
    targetIndex,
    replacements,
    answer,
    hint,
    explanation,
  }));
}

export function orderExercises(prefix: string, start: number, seeds: OrderSeed[]): Exercise[] {
  return seeds.map(([prompt, tokens, answer, hint, explanation, alternatives], index) => ({
    id: `${prefix}${start + index}`,
    kind: "order",
    prompt,
    tokens,
    answer,
    ...(alternatives?.length ? { alternatives } : {}),
    hint,
    explanation,
  }));
}

export function tapExercises(prefix: string, start: number, seeds: TapSeed[]): Exercise[] {
  return seeds.map(([prompt, tokens, answerIndexes, hint, explanation], index) => ({
    id: `${prefix}${start + index}`,
    kind: "tap",
    prompt,
    tokens,
    answerIndexes,
    selectionMode: answerIndexes.length === 1 ? "single" : "multiple",
    hint,
    explanation,
  }));
}
