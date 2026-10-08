import type { Exercise } from "../../../exercise-types.ts";
import { c1Chapter36ExerciseData } from "./chapter-36.ts";
import { c1Chapter37ExerciseData } from "./chapter-37.ts";
import { c1Chapter38ExerciseData } from "./chapter-38.ts";
import { c1Chapter39ExerciseData } from "./chapter-39.ts";

export const c1ExerciseData: Record<string, Exercise[]> = {
  ...c1Chapter36ExerciseData,
  ...c1Chapter37ExerciseData,
  ...c1Chapter38ExerciseData,
  ...c1Chapter39ExerciseData,
};
