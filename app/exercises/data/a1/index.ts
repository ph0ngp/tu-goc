import type { Exercise } from "../../../exercise-types.ts";
import { a1Chapter04ExerciseData } from "./chapter-04.ts";
import { a1Chapter05ExerciseData } from "./chapter-05.ts";
import { a1Chapter06ExerciseData } from "./chapter-06.ts";
import { a1Chapter07ExerciseData } from "./chapter-07.ts";
import { a1Chapter08ExerciseData } from "./chapter-08.ts";
import { a1Chapter09ExerciseData } from "./chapter-09.ts";
import { a1Chapter10ExerciseData } from "./chapter-10.ts";

export const a1ExerciseData: Record<string, Exercise[]> = {
  ...a1Chapter04ExerciseData,
  ...a1Chapter05ExerciseData,
  ...a1Chapter06ExerciseData,
  ...a1Chapter07ExerciseData,
  ...a1Chapter08ExerciseData,
  ...a1Chapter09ExerciseData,
  ...a1Chapter10ExerciseData,
};
