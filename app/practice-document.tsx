"use client";

import { useId, useState } from "react";
import { ExerciseResponse } from "./_components/exercise-response";
import { InlineMarkdown } from "./_components/inline-markdown";
import { evaluateExercise, type AnswerStatus } from "./exercise-evaluator";
import type { Exercise } from "./exercise-types";

export function PracticeDocument({
  lessonTitle,
  exercises,
}: {
  lessonTitle: string;
  exercises: Exercise[];
}) {
  return (
    <article className="practice-markdown">
      <header>
        <h1>Luyện tập: {lessonTitle}</h1>
        <p>Làm lần lượt từ câu nhận biết đến các câu kết hợp kiến thức.</p>
      </header>

      {exercises.length ? (
        <ol className="practice-list">
          {exercises.map((exercise, index) => (
            <li key={exercise.id}>
              <ExerciseQuestion exercise={exercise} number={index + 1} />
            </li>
          ))}
        </ol>
      ) : (
        <blockquote>Phần luyện tập của bài này chưa có câu hỏi.</blockquote>
      )}
    </article>
  );
}

function ExerciseQuestion({
  exercise,
  number,
}: {
  exercise: Exercise;
  number: number;
}) {
  const id = useId();
  const [single, setSingle] = useState("");
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<AnswerStatus>("idle");

  const markChanged = () => setStatus("idle");
  const setValue = (key: string, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    markChanged();
  };
  const setSingleResponse = (value: string) => {
    setSingle(value);
    markChanged();
  };
  const setIndexResponse = (value: number[]) => {
    setSelectedIndexes(value);
    markChanged();
  };
  const setInputResponse = (value: string) => {
    setInput(value);
    markChanged();
  };

  const check = () => {
    setStatus(evaluateExercise(exercise, single, selectedIndexes, values, input));
  };

  const reset = () => {
    setSingle("");
    setSelectedIndexes([]);
    setValues({});
    setInput("");
    setStatus("idle");
  };

  const hasResponse =
    single !== "" ||
    selectedIndexes.length > 0 ||
    Object.values(values).some(Boolean) ||
    input !== "";
  const question = exercise.kind === "context"
    ? `${exercise.context} ${exercise.prompt}`
    : exercise.prompt;

  return (
    <section className="practice-question" aria-labelledby={`${id}-title`}>
      <span className="practice-question-number">Câu {number}</span>
      <h2 id={`${id}-title`}><InlineMarkdown>{question}</InlineMarkdown></h2>

      <div className="practice-response">
        <ExerciseResponse
          id={id}
          exercise={exercise}
          single={single}
          selectedIndexes={selectedIndexes}
          values={values}
          input={input}
          onSingleChange={setSingleResponse}
          onIndexesChange={setIndexResponse}
          onValueChange={setValue}
          onInputChange={setInputResponse}
        />
      </div>

      <details className="practice-hint">
        <summary>Cần một gợi ý</summary>
        <p><InlineMarkdown>{exercise.hint}</InlineMarkdown></p>
      </details>

      <div className="practice-actions">
        <button type="button" className="practice-check" onClick={check}>
          Kiểm tra
        </button>
        {hasResponse && (
          <button type="button" className="practice-reset" onClick={reset}>
            Làm lại
          </button>
        )}
      </div>

      {status !== "idle" && (
        <blockquote className={`practice-feedback ${status}`} aria-live="polite">
          {status === "correct" && (
            <><strong>Đúng.</strong>{" "}<InlineMarkdown>{exercise.explanation}</InlineMarkdown></>
          )}
          {status === "incorrect" && (
            <><strong>Chưa đúng.</strong> Hãy xem lại lựa chọn của bạn.</>
          )}
          {status === "incomplete" && (
            <><strong>Chưa hoàn thành.</strong> Hãy trả lời đủ các phần của câu hỏi.</>
          )}
        </blockquote>
      )}
    </section>
  );
}
