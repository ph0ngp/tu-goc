import type { Exercise } from "./exercise-types";

type ExactInputNormalization = Extract<Exercise, { kind: "exact-input" }>["normalization"];

/**
 * Chuẩn hóa những khác biệt hình thức không làm thay đổi câu trả lời, nhất là
 * các ký tự mà bàn phím điện thoại thường tự đổi. Dấu câu cần học vẫn được giữ.
 */
export function normalizeExactInput(
  value: string,
  normalization: ExactInputNormalization,
): string {
  let normalized = value
    .normalize("NFKC")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:?!)])/g, "$1")
    .replace(/\(\s+/g, "(")
    // Gạch ngang dài viết liền hay cách hai bên đều là kiểu trình bày được chấp nhận.
    .replace(/\s*—\s*/g, "—")
    .replace(/"\s+/g, '"')
    .replace(/\s+"/g, '"');

  if (normalization.trim) normalized = normalized.trim();
  if (normalization.ignoreFinalPeriod) normalized = normalized.replace(/\.$/, "");
  if (normalization.ignoreInitialCapital) {
    normalized = normalized.replace(/[A-Z]/, (character) => character.toLocaleLowerCase("en"));
  }
  return normalized;
}
