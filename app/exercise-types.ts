type ExerciseBase = {
  id: string;
  /** Mục tiêu nội bộ dùng để kiểm tra độ bao phủ; không hiển thị cho người học. */
  objectiveId?: string;
  prompt: string;
  hint: string;
  explanation: string;
};

type ChoiceExercise = ExerciseBase & {
  kind: "choice";
  options: string[];
  answer: string;
};

type OrderExercise = ExerciseBase & {
  kind: "order";
  tokens: string[];
  answer: string[];
};

type MatchExercise = ExerciseBase & {
  kind: "match";
  pairs: Array<{ left: string; right: string }>;
};

type SortExercise = ExerciseBase & {
  kind: "sort";
  buckets: string[];
  items: Array<{ text: string; bucket: string }>;
};

type TapExercise = ExerciseBase & {
  kind: "tap";
  tokens: string[];
  answerIndexes: number[];
  selectionMode: "single" | "multiple";
};

type RepairExercise = ExerciseBase & {
  kind: "repair";
  tokens: string[];
  targetIndex: number;
  replacements: string[];
  answer: string;
};

type ContextExercise = ExerciseBase & {
  kind: "context";
  context: string;
  options: string[];
  answer: string;
};

type GridExercise = ExerciseBase & {
  kind: "grid";
  rows: Array<{
    cue: string;
    options: string[];
    answer: string;
    completed: string;
  }>;
};

type DropdownExercise = ExerciseBase & {
  kind: "dropdown";
  slots: Array<{
    id: string;
    label: string;
    options: string[];
    acceptedAnswers: string[];
  }>;
};

type ExactInputExercise = ExerciseBase & {
  kind: "exact-input";
  acceptedAnswers: string[];
  normalization: {
    trim: boolean;
    ignoreInitialCapital: boolean;
    ignoreFinalPeriod: boolean;
  };
};

type TimelineExercise = ExerciseBase & {
  kind: "timeline";
  options: Array<{
    id: string;
    label: string;
    points: string[];
  }>;
  answerId: string;
};

export type Exercise =
  | ChoiceExercise
  | OrderExercise
  | MatchExercise
  | SortExercise
  | TapExercise
  | RepairExercise
  | ContextExercise
  | GridExercise
  | DropdownExercise
  | ExactInputExercise
  | TimelineExercise;
