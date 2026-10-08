import type { Exercise } from "../exercise-types.ts";
import { gridExplanation, sentenceTokens, specificHint } from "./basic-builders.ts";
import { b1Difference } from "./advanced-builders.ts";

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
];

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
  const gridPrompt = `Đối chiếu thêm các trường hợp dễ nhầm về ${focus}.`;
  const focusedRows = rows.map((row) => {
    const distractor = row.options.find((option) => option !== row.answer);
    if (!distractor) return row;
    const difference = b1Difference(row.answer, distractor);
    if (!difference.answerChunk || !difference.distractorChunk) return row;
    return {
      cue: `${row.cue} Chọn riêng mảnh tạo ra sự khác biệt.`,
      options: [difference.answerChunk, difference.distractorChunk],
      answer: difference.answerChunk,
      completed: row.completed,
    };
  });

  return [
    {
      id: `${prefix}d1`,
      kind: "grid",
      prompt: gridPrompt,
      rows: focusedRows,
      hint: specificHint(
        "grid",
        gridPrompt,
        "",
        focusedRows.map((row) => row.answer),
        focusedRows.map((row) => row.cue),
      ),
      explanation: gridExplanation(focusedRows, focus),
    },
    ...orders.map(([prompt, sentence, explanation], index) => {
      const answer = sentenceTokens(sentence);
      const shift = 2 + (index % Math.max(1, answer.length - 2));
      return {
        id: `${prefix}d${index + 2}`,
        kind: "order" as const,
        prompt,
        tokens: [...answer.slice(shift), ...answer.slice(0, shift)],
        answer,
        hint: specificHint("order", prompt, explanation, [sentence]),
        explanation: `${explanation} Câu hoàn chỉnh là \`${sentence}\`.`,
      };
    }),
  ];
}
