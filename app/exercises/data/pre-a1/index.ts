import type { Exercise } from "../../../exercise-types.ts";
import { preA1Chapter01ExerciseData } from "./chapter-01.ts";
import { preA1Chapter02ExerciseData } from "./chapter-02.ts";
import { preA1Chapter03ExerciseData } from "./chapter-03.ts";

export const preA1ExerciseData: Record<string, Exercise[]> = {
  ...preA1Chapter01ExerciseData,
  ...preA1Chapter02ExerciseData,
  ...preA1Chapter03ExerciseData,
};
