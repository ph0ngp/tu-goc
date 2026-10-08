import type { Exercise } from "../../../exercise-types.ts";
import { b1Chapter20ExerciseData } from "./chapter-20.ts";
import { b1Chapter21ExerciseData } from "./chapter-21.ts";
import { b1Chapter22ExerciseData } from "./chapter-22.ts";
import { b1Chapter23ExerciseData } from "./chapter-23.ts";
import { b1Chapter24ExerciseData } from "./chapter-24.ts";
import { b1Chapter25ExerciseData } from "./chapter-25.ts";
import { b1Chapter26ExerciseData } from "./chapter-26.ts";
import { b1Chapter27ExerciseData } from "./chapter-27.ts";
import { b1Chapter28ExerciseData } from "./chapter-28.ts";
import { b1Chapter29ExerciseData } from "./chapter-29.ts";

export const b1ExerciseData: Record<string, Exercise[]> = {
  ...b1Chapter20ExerciseData,
  ...b1Chapter21ExerciseData,
  ...b1Chapter22ExerciseData,
  ...b1Chapter23ExerciseData,
  ...b1Chapter24ExerciseData,
  ...b1Chapter25ExerciseData,
  ...b1Chapter26ExerciseData,
  ...b1Chapter27ExerciseData,
  ...b1Chapter28ExerciseData,
  ...b1Chapter29ExerciseData,
};
