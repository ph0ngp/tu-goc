/* Dữ liệu luyện tập chính thức. Lý thuyết chỉ nằm trong thư mục book/src. */
import type { Exercise } from "./exercise-types.ts";
import { preA1ExerciseData } from "./exercises/data/pre-a1/index.ts";
import { a1ExerciseData } from "./exercises/data/a1/index.ts";
import { a2ExerciseData } from "./exercises/data/a2/index.ts";
import { b1ExerciseData } from "./exercises/data/b1/index.ts";
import { b2ExerciseData } from "./exercises/data/b2/index.ts";
import { c1ExerciseData } from "./exercises/data/c1/index.ts";
import { arrangeAnswerPositions } from "./exercises/answer-order.ts";
import { diversifyRepeatedGridAnswers, withQualityMetadata } from "./exercises/quality.ts";

const rawExerciseData: Record<string, Exercise[]> = {
  ...preA1ExerciseData,
  ...a1ExerciseData,
  ...a2ExerciseData,
  ...b1ExerciseData,
  ...b2ExerciseData,
  ...c1ExerciseData,
};

export const exerciseDataByLegacyId = Object.fromEntries(
  Object.entries(rawExerciseData).map(([legacyLessonId, exercises]) => [
    legacyLessonId,
    arrangeAnswerPositions(
      legacyLessonId,
      diversifyRepeatedGridAnswers(exercises).map((exercise) =>
        withQualityMetadata(legacyLessonId, exercise),
      ),
    ),
  ]),
) as Record<string, Exercise[]>;

export function exercisesForLegacyId(legacyLessonId?: string): Exercise[] {
  return legacyLessonId ? exerciseDataByLegacyId[legacyLessonId] ?? [] : [];
}
