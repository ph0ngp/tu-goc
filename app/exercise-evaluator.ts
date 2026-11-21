import { normalizeExactInput } from "./exercise-normalization.ts";
import type { Exercise } from "./exercise-types";

export type AnswerStatus = "idle" | "incomplete" | "correct" | "incorrect";

export function evaluateExercise(
  exercise: Exercise,
  single: string,
  selectedIndexes: number[],
  values: Record<string, string>,
  input: string,
): Exclude<AnswerStatus, "idle"> {
  if (exercise.kind === "choice" || exercise.kind === "context") {
    if (!single) return "incomplete";
    return single === exercise.answer ? "correct" : "incorrect";
  }
  if (exercise.kind === "timeline") {
    if (!single) return "incomplete";
    return single === exercise.answerId ? "correct" : "incorrect";
  }
  if (exercise.kind === "repair") {
    if (!single) return "incomplete";
    return single === exercise.answer ? "correct" : "incorrect";
  }
  if (exercise.kind === "tap") {
    if (selectedIndexes.length !== exercise.answerIndexes.length) return "incomplete";
    const selected = [...selectedIndexes].sort((a, b) => a - b);
    const answer = [...exercise.answerIndexes].sort((a, b) => a - b);
    return selected.every((value, index) => value === answer[index]) ? "correct" : "incorrect";
  }
  if (exercise.kind === "order") {
    if (selectedIndexes.length !== exercise.answer.length) return "incomplete";
    const selected = selectedIndexes.map((index) => exercise.tokens[index]);
    return [exercise.answer, ...(exercise.alternatives ?? [])].some((accepted) =>
      accepted.length === selected.length && selected.every((value, index) => value === accepted[index]),
    ) ? "correct" : "incorrect";
  }
  if (exercise.kind === "match") {
    if (!exercise.pairs.every((_, index) => values[`match-${index}`])) return "incomplete";
    return exercise.pairs.every((pair, index) => values[`match-${index}`] === pair.right)
      ? "correct"
      : "incorrect";
  }
  if (exercise.kind === "sort") {
    if (!exercise.items.every((_, index) => values[`sort-${index}`])) return "incomplete";
    return exercise.items.every((item, index) => values[`sort-${index}`] === item.bucket)
      ? "correct"
      : "incorrect";
  }
  if (exercise.kind === "grid") {
    if (!exercise.rows.every((_, index) => values[`grid-${index}`])) return "incomplete";
    return exercise.rows.every((row, index) => values[`grid-${index}`] === row.answer)
      ? "correct"
      : "incorrect";
  }
  if (exercise.kind === "dropdown") {
    if (!exercise.slots.every((slot) => values[`dropdown-${slot.id}`])) return "incomplete";
    return exercise.slots.every((slot) =>
      slot.acceptedAnswers.includes(values[`dropdown-${slot.id}`]),
    ) ? "correct" : "incorrect";
  }

  if (!input.trim()) return "incomplete";
  const normalizedInput = normalizeExactInput(input, exercise.normalization);
  return exercise.acceptedAnswers.some(
    (answer) => normalizeExactInput(answer, exercise.normalization) === normalizedInput,
  ) ? "correct" : "incorrect";
}
