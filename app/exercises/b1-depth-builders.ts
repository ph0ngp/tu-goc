import type { Exercise } from "../exercise-types.ts";
import { b1Difference, escapeRegExp, gridExplanation, sentenceSlice, sentenceTokens, sentenceTokenSpans, specificHint } from "./basic-builders.ts";

type B1DepthRow = {
  cue: string;
  options: string[];
  answer: string;
  completed: string;
};

type B1DepthOrder = [
  prompt: string,
  sentence: string,
  explanation: string,
  /** Những cách xếp khác cũng đúng. */
  alternatives?: string[],
];

const rowOrdinals = ["nhất", "hai", "ba", "tư", "năm", "sáu"];

/**
 * Câu gốc với dấu “…” thay cho các mảnh từ `from` tới trước `to`. Khi chỗ trống
 * ở cuối câu, bỏ dấu chấm để không thành “….”.
 */
function gapFrame(sentence: string, from: number, to: number): string {
  const spans = sentenceTokenSpans(sentence);
  const before = sentence.slice(0, spans[from].start).trimEnd();
  const after = sentence.slice(spans[to - 1].end).trim();
  const gap = before ? `${before} …` : "…";
  if (!after || after === ".") return gap;
  return /^[.,?!:;]/.test(after) ? `${gap}${after}` : `${gap} ${after}`;
}

/**
 * Hàng của bảng chỉ hiện hai phần khác nhau, nên gợi ý đưa lại câu của từng hàng
 * với chỗ trống để người học đặt thử từng phần vào. Bỏ câu chỉ còn dấu câu, hoặc
 * câu có chứa đáp án của một hàng (gợi ý sẽ bị che và lộ hàng đó).
 */
function depthGridHint(rows: Array<{ answer: string; frame?: string }>): string {
  const answerPatterns = rows.map(({ answer }) =>
    new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(answer)}(?![\\p{L}\\p{N}])`, "iu"),
  );
  const frames = rows.flatMap(({ frame }, index) => {
    if (!frame || !/\p{L}/u.test(frame) || answerPatterns.some((pattern) => pattern.test(frame))) return [];
    return [`\`${frame}\` ở hàng thứ ${rowOrdinals[index] ?? index + 1}`];
  });
  if (!frames.length) {
    return "Mỗi phương án chỉ là phần khác nhau giữa hai câu; hình dung cả câu với từng phần rồi giữ phần làm câu khớp với nội dung của hàng.";
  }
  const listed = frames.length > 1 ? `${frames.slice(0, -1).join(", ")} và ${frames.at(-1)}` : frames[0];
  return `Phần cần chọn lấp vào chỗ trống trong câu ${listed}. Đặt thử từng phương án vào chỗ trống rồi giữ phần làm câu khớp với nội dung của hàng.`;
}

/**
 * Tạo một nhóm bài đối chiếu sâu cho B1 từ các cặp dễ nhầm và các câu cần
 * sắp xếp. Hàm nằm ngoài dữ liệu chương để mọi file nội dung chỉ còn đặc tả.
 */
export function b1DepthPack(
  prefix: string,
  focus: string,
  rows: B1DepthRow[],
  orders: B1DepthOrder[],
): Exercise[] {
  const gridPrompt = `Theo nội dung từng hàng, chọn phần câu đúng ở chỗ hai cách nói khác nhau về ${focus}.`;
  const focusedRows = rows.map((row) => {
    const distractor = row.options.find((option) => option !== row.answer);
    if (!distractor) return { row };
    const difference = b1Difference(row.answer, distractor);
    if (!difference.answerChunk || !difference.distractorChunk) return { row };
    const answer = sentenceSlice(row.answer, difference.start, difference.answerEnd);
    return {
      row: {
        cue: row.cue,
        options: [answer, sentenceSlice(distractor, difference.start, difference.distractorEnd)],
        answer,
        completed: row.completed,
      },
      frame: gapFrame(row.answer, difference.start, difference.answerEnd),
    };
  });
  const gridRows = focusedRows.map(({ row }) => row);

  return [
    {
      id: `${prefix}d1`,
      kind: "grid",
      prompt: gridPrompt,
      rows: gridRows,
      hint: depthGridHint(focusedRows.map(({ row, frame }) => ({ answer: row.answer, frame }))),
      explanation: gridExplanation(gridRows),
    },
    ...orders.map(([prompt, sentence, explanation, alternatives], index) => {
      const answer = sentenceTokens(sentence);
      const shift = 2 + (index % Math.max(1, answer.length - 2));
      return {
        id: `${prefix}d${index + 2}`,
        kind: "order" as const,
        prompt,
        tokens: [...answer.slice(shift), ...answer.slice(0, shift)],
        answer,
        ...(alternatives?.length ? { alternatives: alternatives.map(sentenceTokens) } : {}),
        hint: specificHint("order", prompt, explanation, [sentence, ...(alternatives ?? [])]),
        explanation: `${explanation} Câu hoàn chỉnh là \`${sentence}\`.`,
      };
    }),
  ];
}
