import type { Exercise } from "../exercise-types.ts";

/*
 * Khi biên soạn, đáp án đúng thường được viết trước rồi mới tới phương án nhiễu,
 * và câu sắp xếp thường được tạo bằng cách xoay vòng câu đúng. Bước này sắp lại
 * thứ tự hiển thị để vị trí của một phương án không bao giờ tiết lộ đáp án.
 * Thứ tự được tính từ mã bài nên luôn giống nhau giữa các lần dựng trang.
 */

function hashSeed(text: string): number {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRandom(seedText: string): () => number {
  let state = hashSeed(seedText);
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: T[], random: () => number): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

/**
 * Mỗi số lượng phương án có một chồng vị trí riêng: trong một chồng, mọi vị trí
 * xuất hiện đều nhau nhưng thứ tự rút ra được xáo trộn. Nhờ vậy đáp án phân bố
 * đều trong cả bài mà người học vẫn không đoán được vị trí của câu tiếp theo.
 */
function createPositionDealer(random: () => number) {
  const decks = new Map<number, number[]>();
  return (optionCount: number): number => {
    let deck = decks.get(optionCount);
    if (!deck?.length) {
      const rounds = Math.max(2, Math.ceil(6 / optionCount));
      deck = shuffled(
        Array.from({ length: optionCount * rounds }, (_, index) => index % optionCount),
        random,
      );
      decks.set(optionCount, deck);
    }
    return deck.pop() ?? 0;
  };
}

function moveToPosition<T>(options: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex < 0 || fromIndex === toIndex) return options;
  const rest = options.filter((_, index) => index !== fromIndex);
  return [...rest.slice(0, toIndex), options[fromIndex], ...rest.slice(toIndex)];
}

/** Một vòng xoay giữ nguyên các cặp từ liền nhau, nên người học đọc ra ngay câu đúng. */
export function isRotationOf(tokens: string[], answer: string[]): boolean {
  if (tokens.length !== answer.length) return false;
  for (let shift = 0; shift < tokens.length; shift++) {
    if (tokens.every((token, index) => token === answer[(index + shift) % answer.length])) return true;
  }
  return false;
}

/**
 * Thứ tự mục để lộ cách phân nhóm khi các mục đi theo đúng (hoặc ngược) thứ tự
 * nhóm, hoặc khi mục của mỗi nhóm đứng liền thành khối, chẳng hạn A A B B C.
 */
export function isPredictableSortOrder(items: Array<{ bucket: string }>, buckets: string[]): boolean {
  const positions = items.map((item) => buckets.indexOf(item.bucket));
  const ascending = positions.every((position, index) => index === 0 || position >= positions[index - 1]);
  const descending = positions.every((position, index) => index === 0 || position <= positions[index - 1]);
  const groupCount = new Set(positions).size;
  const changes = positions.filter((position, index) => index > 0 && position !== positions[index - 1]).length;
  const blocks = changes === groupCount - 1 && groupCount < items.length;
  return ascending || descending || blocks;
}

function scrambledTokens(tokens: string[], answer: string[], random: () => number): string[] {
  if (answer.length < 3 || !isRotationOf(tokens, answer)) return tokens;
  for (let attempt = 0; attempt < 30; attempt++) {
    const candidate = shuffled(tokens, random);
    if (!isRotationOf(candidate, answer)) return candidate;
  }
  return tokens;
}

function scrambledItems<T extends { bucket: string }>(items: T[], buckets: string[], random: () => number): T[] {
  if (items.length < 3 || new Set(items.map((item) => item.bucket)).size < 2) return items;
  if (!isPredictableSortOrder(items, buckets)) return items;
  for (let attempt = 0; attempt < 30; attempt++) {
    const candidate = shuffled(items, random);
    if (!isPredictableSortOrder(candidate, buckets)) return candidate;
  }
  return items;
}

/** Hàng thứ i ghép với lựa chọn thứ i, hoặc ngược lại từ cuối danh sách. */
export function isAlignedMatchOrder(pairs: Array<{ right: string }>, options: string[]): boolean {
  if (pairs.length < 3) return false;
  return (
    pairs.every((pair, index) => options.indexOf(pair.right) === index) ||
    pairs.every((pair, index) => options.indexOf(pair.right) === options.length - 1 - index)
  );
}

/**
 * Bài ghép tự sinh danh sách lựa chọn từ các cặp, nên thứ tự được xáo ngay tại
 * đây theo mã hoạt động để không trùng hoặc ngược với thứ tự các hàng.
 */
export function matchOptionOrder(exercise: { id: string; pairs: Array<{ right: string }> }): string[] {
  const rights = [...new Set(exercise.pairs.map((pair) => pair.right))];
  const random = createRandom(exercise.id);
  let options = shuffled(rights, random);
  for (let attempt = 0; attempt < 30 && isAlignedMatchOrder(exercise.pairs, options); attempt++) {
    options = shuffled(rights, random);
  }
  return options;
}

export function arrangeAnswerPositions(legacyLessonId: string, exercises: Exercise[]): Exercise[] {
  const random = createRandom(legacyLessonId);
  const dealPosition = createPositionDealer(random);
  const place = <T>(options: T[], isAnswer: (option: T) => boolean): T[] => {
    if (options.length < 2) return options;
    return moveToPosition(options, options.findIndex(isAnswer), dealPosition(options.length));
  };

  return exercises.map((exercise): Exercise => {
    if (exercise.kind === "choice" || exercise.kind === "context") {
      return { ...exercise, options: place(exercise.options, (option) => option === exercise.answer) };
    }
    if (exercise.kind === "repair") {
      return {
        ...exercise,
        replacements: place(exercise.replacements, (option) => option === exercise.answer),
      };
    }
    if (exercise.kind === "timeline") {
      return { ...exercise, options: place(exercise.options, (option) => option.id === exercise.answerId) };
    }
    if (exercise.kind === "grid") {
      return {
        ...exercise,
        rows: exercise.rows.map((row) => ({
          ...row,
          options: place(row.options, (option) => option === row.answer),
        })),
      };
    }
    if (exercise.kind === "dropdown") {
      return {
        ...exercise,
        slots: exercise.slots.map((slot) => ({
          ...slot,
          options: place(slot.options, (option) => slot.acceptedAnswers.includes(option)),
        })),
      };
    }
    if (exercise.kind === "order") {
      return { ...exercise, tokens: scrambledTokens(exercise.tokens, exercise.answer, random) };
    }
    if (exercise.kind === "sort") {
      return { ...exercise, items: scrambledItems(exercise.items, exercise.buckets, random) };
    }
    return exercise;
  });
}
