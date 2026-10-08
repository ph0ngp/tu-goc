import type { Exercise } from "../exercise-types.ts";

type ExerciseRecord = Partial<Record<string, Exercise[]>>;

/**
 * Hợp nhất các lớp biên soạn ngay trong một chương thành một nguồn chính thức.
 * Thứ tự lớp được giữ nguyên và mỗi mảng đầu ra là một bản sao độc lập.
 */
export function mergeExerciseRecords(
  ...records: ExerciseRecord[]
): Record<string, Exercise[]> {
  const merged: Record<string, Exercise[]> = {};

  for (const record of records) {
    for (const [lessonId, exercises] of Object.entries(record)) {
      if (!exercises) continue;
      merged[lessonId] = [...(merged[lessonId] ?? []), ...exercises];
    }
  }

  return merged;
}
