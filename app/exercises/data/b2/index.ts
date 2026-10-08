import type { Exercise } from "../../../exercise-types.ts";
import { b2Chapter30ExerciseData } from "./chapter-30.ts";
import { b2Chapter31ExerciseData } from "./chapter-31.ts";
import { b2Chapter32ExerciseData } from "./chapter-32.ts";
import { b2Chapter33ExerciseData } from "./chapter-33.ts";
import { b2Chapter34ExerciseData } from "./chapter-34.ts";
import { b2Chapter35ExerciseData } from "./chapter-35.ts";

export const b2ExerciseData: Record<string, Exercise[]> = {
  ...b2Chapter30ExerciseData,
  ...b2Chapter31ExerciseData,
  ...b2Chapter32ExerciseData,
  ...b2Chapter33ExerciseData,
  ...b2Chapter34ExerciseData,
  ...b2Chapter35ExerciseData,
};
