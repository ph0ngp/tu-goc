import type { Exercise } from "../exercise-types";
import { matchOptionOrder } from "../exercises/answer-order";
import { InlineMarkdown, inlineMarkdownText } from "./inline-markdown";

type ExerciseResponseProps = {
  id: string;
  exercise: Exercise;
  single: string;
  selectedIndexes: number[];
  values: Record<string, string>;
  input: string;
  onSingleChange: (value: string) => void;
  onIndexesChange: (value: number[]) => void;
  onValueChange: (key: string, value: string) => void;
  onInputChange: (value: string) => void;
};

export function ExerciseResponse(props: ExerciseResponseProps) {
  const { exercise } = props;

  if (exercise.kind === "choice" || exercise.kind === "context") {
    return (
      <ChoiceResponse
        id={props.id}
        options={exercise.options}
        value={props.single}
        onChange={props.onSingleChange}
      />
    );
  }
  if (exercise.kind === "timeline") {
    return (
      <TimelineResponse
        id={props.id}
        exercise={exercise}
        value={props.single}
        onChange={props.onSingleChange}
      />
    );
  }
  if (exercise.kind === "match") {
    return <MatchResponse exercise={exercise} values={props.values} onChange={props.onValueChange} />;
  }
  if (exercise.kind === "sort") {
    return <SortResponse exercise={exercise} values={props.values} onChange={props.onValueChange} />;
  }
  if (exercise.kind === "grid") {
    return <GridResponse exercise={exercise} values={props.values} onChange={props.onValueChange} />;
  }
  if (exercise.kind === "dropdown") {
    return <DropdownResponse exercise={exercise} values={props.values} onChange={props.onValueChange} />;
  }
  if (exercise.kind === "tap") {
    return (
      <TapResponse
        exercise={exercise}
        selectedIndexes={props.selectedIndexes}
        onChange={props.onIndexesChange}
      />
    );
  }
  if (exercise.kind === "order") {
    return (
      <OrderResponse
        exercise={exercise}
        selectedIndexes={props.selectedIndexes}
        onChange={props.onIndexesChange}
      />
    );
  }
  if (exercise.kind === "repair") {
    return <RepairResponse exercise={exercise} value={props.single} onChange={props.onSingleChange} />;
  }

  return (
    <label className="practice-input-label">
      <span>Câu trả lời</span>
      <input
        type="text"
        value={props.input}
        onChange={(event) => props.onInputChange(event.target.value)}
        autoComplete="off"
      />
    </label>
  );
}

function ChoiceResponse({
  id,
  options,
  value,
  onChange,
}: {
  id: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="practice-options">
      <legend className="sr-only">Chọn một đáp án</legend>
      {options.map((option, index) => (
        <label key={`${option}-${index}`}>
          <input
            type="radio"
            name={`${id}-choice`}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <code>{option}</code>
        </label>
      ))}
    </fieldset>
  );
}

function MatchResponse({ exercise, values, onChange }: ExtractedResponseProps<"match">) {
  const options = matchOptionOrder(exercise);
  return (
    <div className="practice-table-wrap">
      <table>
        <thead><tr><th>Phần bên trái</th><th>Phần tương ứng</th></tr></thead>
        <tbody>
          {exercise.pairs.map((pair, index) => (
            <tr key={`${pair.left}-${index}`}>
              <td><code>{pair.left}</code></td>
              <td>
                <SelectAnswer
                  label={`Ghép với ${pair.left}`}
                  value={values[`match-${index}`] ?? ""}
                  options={options}
                  onChange={(value) => onChange(`match-${index}`, value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortResponse({ exercise, values, onChange }: ExtractedResponseProps<"sort">) {
  return (
    <div className="practice-table-wrap">
      <table>
        <thead><tr><th>Từ hoặc cụm từ</th><th>Nhóm</th></tr></thead>
        <tbody>
          {exercise.items.map((item, index) => (
            <tr key={`${item.text}-${index}`}>
              <td><code>{item.text}</code></td>
              <td>
                <SelectAnswer
                  label={`Phân loại ${item.text}`}
                  value={values[`sort-${index}`] ?? ""}
                  options={exercise.buckets}
                  onChange={(value) => onChange(`sort-${index}`, value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GridResponse({ exercise, values, onChange }: ExtractedResponseProps<"grid">) {
  return (
    <div className="practice-table-wrap">
      <table>
        <thead><tr><th>Nội dung</th><th>Trả lời</th></tr></thead>
        <tbody>
          {exercise.rows.map((row, index) => (
            <tr key={`${row.cue}-${index}`}>
              <td><InlineMarkdown>{row.cue}</InlineMarkdown></td>
              <td>
                <SelectAnswer
                  label={`Trả lời cho ${inlineMarkdownText(row.cue)}`}
                  value={values[`grid-${index}`] ?? ""}
                  options={row.options}
                  onChange={(value) => onChange(`grid-${index}`, value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DropdownResponse({ exercise, values, onChange }: ExtractedResponseProps<"dropdown">) {
  return (
    <div className="practice-fields">
      {exercise.slots.map((slot) => (
        <label key={slot.id}>
          <span><InlineMarkdown>{slot.label}</InlineMarkdown></span>
          <SelectAnswer
            label={inlineMarkdownText(slot.label)}
            value={values[`dropdown-${slot.id}`] ?? ""}
            options={slot.options}
            onChange={(value) => onChange(`dropdown-${slot.id}`, value)}
          />
        </label>
      ))}
    </div>
  );
}

function TimelineResponse({
  id,
  exercise,
  value,
  onChange,
}: {
  id: string;
  exercise: Extract<Exercise, { kind: "timeline" }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="practice-options timeline-options">
      <legend className="sr-only">Chọn một dòng thời gian</legend>
      {exercise.options.map((option) => (
        <label key={option.id}>
          <input
            type="radio"
            name={`${id}-timeline`}
            checked={value === option.id}
            onChange={() => onChange(option.id)}
          />
          <span><strong>{option.label}</strong><small>{option.points.join(" · ")}</small></span>
        </label>
      ))}
    </fieldset>
  );
}

function TapResponse({
  exercise,
  selectedIndexes,
  onChange,
}: {
  exercise: Extract<Exercise, { kind: "tap" }>;
  selectedIndexes: number[];
  onChange: (value: number[]) => void;
}) {
  const toggle = (index: number) => {
    if (exercise.selectionMode === "single") {
      onChange(selectedIndexes.includes(index) ? [] : [index]);
      return;
    }
    onChange(
      selectedIndexes.includes(index)
        ? selectedIndexes.filter((candidate) => candidate !== index)
        : [...selectedIndexes, index],
    );
  };

  return (
    <div className="practice-tokens" role="group" aria-label="Các mảnh có thể chọn">
      {exercise.tokens.map((token, index) => (
        <button
          type="button"
          key={`${token}-${index}`}
          className={selectedIndexes.includes(index) ? "selected" : undefined}
          aria-pressed={selectedIndexes.includes(index)}
          onClick={() => toggle(index)}
        >
          {token}
        </button>
      ))}
    </div>
  );
}

function OrderResponse({
  exercise,
  selectedIndexes,
  onChange,
}: {
  exercise: Extract<Exercise, { kind: "order" }>;
  selectedIndexes: number[];
  onChange: (value: number[]) => void;
}) {
  const available = exercise.tokens
    .map((token, index) => ({ token, index }))
    .filter(({ index }) => !selectedIndexes.includes(index));

  return (
    <div className="practice-order">
      <div className="practice-order-answer" aria-label="Câu đang sắp xếp">
        {selectedIndexes.length ? selectedIndexes.map((tokenIndex, position) => (
          <button
            type="button"
            key={`${tokenIndex}-${position}`}
            onClick={() => onChange(selectedIndexes.filter((_, index) => index !== position))}
          >
            {exercise.tokens[tokenIndex]}
          </button>
        )) : <span>Chọn các mảnh theo đúng thứ tự.</span>}
      </div>
      <div className="practice-tokens" aria-label="Các mảnh chưa dùng">
        {available.map(({ token, index }) => (
          <button
            type="button"
            key={`${token}-${index}`}
            onClick={() => onChange([...selectedIndexes, index])}
          >
            {token}
          </button>
        ))}
      </div>
    </div>
  );
}

function RepairResponse({
  exercise,
  value,
  onChange,
}: {
  exercise: Extract<Exercise, { kind: "repair" }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="practice-repair" aria-label="Chọn đáp án đúng cho vị trí còn trống">
      {exercise.tokens.map((token, index) => index === exercise.targetIndex ? (
        <SelectAnswer
          key={`${token}-${index}`}
          label="Chọn đáp án đúng cho vị trí còn trống"
          value={value}
          options={exercise.replacements}
          onChange={onChange}
        />
      ) : <code key={`${token}-${index}`}>{token}</code>)}
    </div>
  );
}

function SelectAnswer({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">Chọn…</option>
      {options.map((option, index) => (
        <option key={`${option}-${index}`} value={option}>{option}</option>
      ))}
    </select>
  );
}

type ExtractedResponseProps<K extends Exercise["kind"]> = {
  exercise: Extract<Exercise, { kind: K }>;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
};
