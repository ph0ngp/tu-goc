import type { Exercise } from "../../../exercise-types.ts";
import { a2Chapter11ExerciseData } from "./chapter-11.ts";
import { a2Chapter12ExerciseData } from "./chapter-12.ts";
import { a2Chapter13ExerciseData } from "./chapter-13.ts";
import { a2Chapter14ExerciseData } from "./chapter-14.ts";
import { a2Chapter15ExerciseData } from "./chapter-15.ts";
import { a2Chapter16ExerciseData } from "./chapter-16.ts";
import { a2Chapter17ExerciseData } from "./chapter-17.ts";
import { a2Chapter18ExerciseData } from "./chapter-18.ts";
import { a2Chapter19ExerciseData } from "./chapter-19.ts";

export const a2ExerciseData: Record<string, Exercise[]> = {
  ...a2Chapter11ExerciseData,
  ...a2Chapter12ExerciseData,
  ...a2Chapter13ExerciseData,
  ...a2Chapter14ExerciseData,
  ...a2Chapter15ExerciseData,
  ...a2Chapter16ExerciseData,
  ...a2Chapter17ExerciseData,
  ...a2Chapter18ExerciseData,
  ...a2Chapter19ExerciseData,
};
