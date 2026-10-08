import type { Exercise } from "./exercise-types.ts";
import { loadRawExercisesForLegacyId } from "./exercise-loaders.generated.ts";
import { diversifyRepeatedGridAnswers, withQualityMetadata } from "./exercises/quality.ts";

/**
 * Chỉ nạp file dữ liệu của chương đang mở, rồi mới bổ sung metadata chất lượng
 * cho những hoạt động thực sự được hiển thị.
 */
export async function loadExercisesForLegacyId(
  legacyLessonId?: string,
): Promise<Exercise[]> {
  if (!legacyLessonId) return [];
  const exercises = await loadRawExercisesForLegacyId(legacyLessonId);
  return diversifyRepeatedGridAnswers(exercises).map((exercise) =>
    withQualityMetadata(legacyLessonId, exercise),
  );
}
