import type { Exercise } from "../exercise-types.ts";
import { answerUsageKey } from "./advanced-builders.ts";
import { escapeRegExp, gridExplanation, maskAnswerTerms, matchExplanation, sortExplanation } from "./basic-builders.ts";

function correctAnswerStrings(exercise: Exercise): string[] {
  if (exercise.kind === "choice" || exercise.kind === "context" || exercise.kind === "repair") {
    return [exercise.answer];
  }
  if (exercise.kind === "order") return [exercise.answer.join(" ")];
  if (exercise.kind === "tap") return exercise.answerIndexes.map((index) => exercise.tokens[index]);
  if (exercise.kind === "grid") return exercise.rows.map((row) => row.answer);
  if (exercise.kind === "dropdown") return exercise.slots.flatMap((slot) => slot.acceptedAnswers);
  if (exercise.kind === "exact-input") return exercise.acceptedAnswers;
  if (exercise.kind === "timeline") {
    return exercise.options.filter((option) => option.id === exercise.answerId).map((option) => option.label);
  }
  return [];
}

export function diversifyRepeatedGridAnswers(exercises: Exercise[]): Exercise[] {
  const answersFor = (exercise: Exercise): string[] => {
    if (exercise.kind === "match") return exercise.pairs.map((pair) => pair.right);
    if (exercise.kind === "tap") {
      return [exercise.answerIndexes.map((index) => exercise.tokens[index]).join(" ")];
    }
    return correctAnswerStrings(exercise);
  };
  const countAnswers = (items: Exercise[]) => {
    const counts = new Map<string, number>();
    for (const exercise of items) {
      for (const answer of answersFor(exercise)) {
        const key = answerUsageKey(answer);
        if (key.length < 8) continue;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
    return counts;
  };

  let counts = countAnswers(exercises);
  let diversified = exercises.map((exercise) => {
    if (exercise.kind !== "match") return exercise;
    if (!exercise.pairs.some((pair) => (counts.get(answerUsageKey(pair.right)) ?? 0) > 2)) return exercise;
    return {
      ...exercise,
      prompt: `Ghép mỗi cách diễn đạt với yêu cầu tương ứng; ví dụ đầu tiên là ${exercise.pairs[0].right}.`,
      pairs: exercise.pairs.map((pair) => ({ left: pair.right, right: pair.left })),
    };
  });

  counts = countAnswers(diversified);
  diversified = diversified.map((exercise) => {
    if (exercise.kind !== "repair" || (counts.get(answerUsageKey(exercise.answer)) ?? 0) <= 2) return exercise;
    const repaired = [...exercise.tokens];
    repaired[exercise.targetIndex] = exercise.answer;
    const correctSentence = joinSentenceTokens(repaired);
    const originalSentence = joinSentenceTokens(exercise.tokens);
    return {
      id: exercise.id,
      kind: "choice" as const,
      objectiveId: exercise.objectiveId,
      prompt: `Câu nào đáp ứng đúng yêu cầu sau khi sửa phần chưa phù hợp: ${exercise.prompt.replace(/[.?]$/, "")}?`,
      options: [correctSentence, originalSentence],
      answer: correctSentence,
      hint: exercise.hint,
      explanation: exercise.explanation,
    };
  });

  counts = countAnswers(diversified);
  return diversified.map((exercise) => {
    if (exercise.kind !== "grid") return exercise;
    const rows = exercise.rows.map((row) => {
      const key = answerUsageKey(row.answer);
      if ((counts.get(key) ?? 0) <= 2) return row;
      const distractor = row.options.find((option) => option !== row.answer);
      if (!distractor || row.completed === row.answer) return row;
      const pattern = new RegExp(escapeRegExp(row.answer), "i");
      if (!pattern.test(row.completed)) return row;
      const wrongCompleted = row.completed.replace(pattern, distractor);
      if (wrongCompleted === row.completed) return row;
      counts.set(key, (counts.get(key) ?? 1) - 1);
      const completedKey = answerUsageKey(row.completed);
      counts.set(completedKey, (counts.get(completedKey) ?? 0) + 1);
      return {
        ...row,
        cue: `${row.cue} Chọn câu hoàn chỉnh.`,
        options: [row.completed, wrongCompleted],
        answer: row.completed,
      };
    });
    return { ...exercise, rows };
  });
}

function objectiveCategory(exercise: Exercise): string {
  if (exercise.kind === "order") return "controlled-production";
  if (exercise.kind === "repair") return "error-correction";
  if (exercise.kind === "match") return "relationship";
  if (exercise.kind === "sort") return "classification";
  if (exercise.kind === "tap") return "form-identification";
  if (exercise.kind === "grid" || exercise.kind === "dropdown") return "guided-application";
  if (exercise.kind === "exact-input") return "independent-production";
  if (exercise.kind === "timeline") return "time-meaning";
  if (exercise.kind === "context") return "contextual-choice";
  if (/vì sao|khác|phân biệt|có phải/i.test(exercise.prompt)) return "rule-reasoning";
  if (/nghĩa|tình huống|tự nhiên|diễn tả|nói /i.test(exercise.prompt)) return "meaning-and-use";
  return "form-choice";
}

function joinSentenceTokens(tokens: string[]): string {
  return tokens.join(" ").replace(/\s+([.,?!:;])/g, "$1");
}

function quotedStatement(value: string): string {
  const safeValue = value.replaceAll("`", "'");
  return `\`${safeValue}\`${/[.?!]$/.test(value.trim()) ? "" : "."}`;
}

function normalizeEditorialPunctuation(value: string): string {
  return value
    .replace(/(`[^`\n]*[.?!]`)[.,](?=\s|$)/g, "$1")
    .replace(/([.?!])”\./g, "$1”")
    .replace(/([.?!])””/g, "$1”");
}

function promptAwareHint(exercise: Exercise, legacyLessonId: string): string {
  const prompt = maskAnswerTerms(exercise.prompt, correctAnswerStrings(exercise))
    .replaceAll("___", "…")
    .replace(/[.?]$/, "");
  const lower = prompt.toLocaleLowerCase("vi");

  if (exercise.kind === "order") {
    return `Ghép trước những từ thuộc cùng một cụm, rồi đọc lại toàn câu theo yêu cầu sau: ${prompt}.`;
  }
  if (exercise.kind === "repair") {
    return `Đọc cả câu với từng phương án thay thế và chỉ chọn dạng đáp ứng trọn yêu cầu sau: ${prompt}.`;
  }
  if (exercise.kind === "tap") {
    return `Xét công việc của từng mảnh trong cả câu và chỉ chọn phần trực tiếp đáp ứng yêu cầu sau: ${prompt}.`;
  }
  if (exercise.kind === "match") {
    return `Xử lý từng vế độc lập theo đúng quan hệ được nêu sau đây: ${prompt}; mỗi vế chỉ được dùng một lần.`;
  }
  if (exercise.kind === "sort") {
    return `Xác định một tiêu chí chung từ yêu cầu sau, rồi kiểm tra từng mục riêng trước khi xếp nhóm: ${prompt}.`;
  }
  if (exercise.kind === "grid" || exercise.kind === "dropdown") {
    return `Giải từng hàng riêng theo yêu cầu sau, rồi kiểm tra lại sự hòa hợp và ý nghĩa của toàn bộ các hàng: ${prompt}.`;
  }

  if (/possess|whose|apostroph/.test(legacyLessonId) || /sở hữu|của ai|\bcủa\b|whose|mine|yours|hers|ours|theirs|dấu nháy/.test(lower)) {
    return `Xác định người hoặc vật có quan hệ sở hữu, rồi kiểm tra dạng cần đứng trước danh từ hay thay cho cả cụm theo yêu cầu: ${prompt}.`;
  }
  if (/article|countable|uncountable|irregular-plural/.test(legacyLessonId) || /mạo từ|a\/an|đếm được|không đếm được|số nhiều bất quy tắc/.test(lower)) {
    return `Xác định danh từ đang là số ít, số nhiều hay không đếm được, rồi mới chọn hình thức theo yêu cầu: ${prompt}.`;
  }
  if (/demonstrative/.test(legacyLessonId) || /\bthis\b|\bthat\b|\bthese\b|\bthose\b|ở gần|ở xa|một vật|nhiều vật|“[^”]*(?:này|kia)[^”]*”/.test(lower)) {
    return `Xác định lần lượt hai điều: có một hay nhiều, rồi ở gần hay xa người nói theo yêu cầu: ${prompt}.`;
  }
  if (/pronoun|subjects-and-pronouns|objects-and-links/.test(legacyLessonId) || /đại từ|chủ ngữ|tân ngữ|người nói|người nghe|thay cho/.test(lower)) {
    return `Xác định người hoặc vật đang được nói tới và công việc của vị trí cần chọn theo yêu cầu: ${prompt}.`;
  }
  if (/^be-(?:forms|meanings|negative|questions|wh-questions)$/.test(legacyLessonId)) {
    return `Xác định chủ ngữ là \`I\`, số ít hay số nhiều, rồi chọn đúng dạng của \`be\` theo yêu cầu: ${prompt}.`;
  }
  if (/hiện tại|quá khứ|tương lai|thời gian|mốc|thói quen|đang xảy ra|hiện tại hoàn thành|quá khứ hoàn thành|tiếp diễn|when|while|since|for|ago|yesterday|tomorrow|now|every/.test(lower)) {
    return `Tìm dấu hiệu thời gian và xác định người nói đang nhìn hành động như thói quen, quá trình hay sự việc hoàn tất theo yêu cầu: ${prompt}.`;
  }
  if (/câu hỏi|phủ định|khẳng định|trả lời|trợ động từ|do\/does|did|yes|no/.test(lower)) {
    return `Xác định kiểu câu và trợ động từ hoặc dạng của \`be\` cần giữ lại trước khi xử lý yêu cầu: ${prompt}.`;
  }
  if (/giới từ|nơi chốn|vị trí|\bin\b|\bon\b|\bat\b|under|above|between/.test(lower)) {
    return `Hình dung quan hệ thật giữa vật cần tìm và vật hoặc mốc làm chuẩn trước khi trả lời yêu cầu: ${prompt}.`;
  }
  if (/từ nối|lý do|kết quả|tương phản|lựa chọn|although|because|so that|unless|if/.test(lower)) {
    return `Xác định quan hệ giữa hai ý — thêm, đối lập, nguyên nhân, kết quả hay điều kiện — rồi xử lý yêu cầu: ${prompt}.`;
  }
  if (/so sánh|hơn|nhất|bằng nhau|as\.\.\.as|more|most/.test(lower)) {
    return `Xác định hai đối tượng đang được so sánh và mức so sánh cần diễn đạt trước khi trả lời yêu cầu: ${prompt}.`;
  }
  if (/bị động|chủ động|tác nhân|by|with/.test(lower)) {
    return `Xác định câu cần tập trung vào người thực hiện hay đối tượng chịu tác động trước khi trả lời yêu cầu: ${prompt}.`;
  }
  if (/động từ tình thái|modal|can|could|may|might|must|should|would/.test(lower)) {
    return `Xác định sắc thái khả năng, nghĩa vụ, lời khuyên hoặc mức chắc chắn mà yêu cầu sau cần diễn đạt: ${prompt}.`;
  }
  if (/danh từ|động từ|tính từ|trạng từ|từ loại|gọi tên|hành động|miêu tả|đặc điểm/.test(lower)) {
    return `Hỏi mỗi từ đang gọi tên, nói hành động hay miêu tả đặc điểm theo yêu cầu: ${prompt}.`;
  }
  return `Đọc lại toàn bộ yêu cầu sau và loại từng phương án không đáp ứng đủ cả hình thức lẫn ý nghĩa: ${prompt}.`;
}

function enrichedExplanation(exercise: Exercise): string {
  if (exercise.explanation.trim().split(/\s+/).length >= 5) return exercise.explanation;
  if (exercise.kind === "order") {
    return `${exercise.explanation} Câu hoàn chỉnh là “${joinSentenceTokens(exercise.answer)}”.`;
  }
  if (exercise.kind === "repair") {
    const repaired = [...exercise.tokens];
    repaired[exercise.targetIndex] = exercise.answer;
    return `${exercise.explanation} Sau khi thay, nội dung đúng là “${joinSentenceTokens(repaired)}”.`;
  }
  if (exercise.kind === "tap") {
    const selected = exercise.answerIndexes.map((index) => exercise.tokens[index]).join(" · ");
    return `${exercise.explanation} Phần được chọn chính xác là “${selected}”.`;
  }
  if (exercise.kind === "match") return matchExplanation(exercise.pairs, "quan hệ mà câu hỏi yêu cầu");
  if (exercise.kind === "sort") return sortExplanation(exercise.buckets, exercise.items);
  return exercise.explanation;
}

function answerAppliedExplanation(exercise: Exercise, explanation: string): string {
  if (exercise.kind === "choice" || exercise.kind === "context") {
    return `${explanation} Vì vậy, phương án phù hợp là ${quotedStatement(exercise.answer)}`;
  }
  if (exercise.kind === "order") {
    return `${explanation} Các mảnh tạo thành câu ${quotedStatement(joinSentenceTokens(exercise.answer))}`;
  }
  if (exercise.kind === "repair") {
    const repaired = [...exercise.tokens];
    repaired[exercise.targetIndex] = exercise.answer;
    return `${explanation} Sau khi thay bằng \`${exercise.answer.replaceAll("`", "'")}\`, câu hoàn chỉnh là ${quotedStatement(joinSentenceTokens(repaired))}`;
  }
  if (exercise.kind === "tap") {
    const selected = exercise.answerIndexes.map((index) => exercise.tokens[index]).join(" · ");
    return `${explanation} Phần thể hiện đúng đặc điểm cần tìm là “${selected}”.`;
  }
  if (exercise.kind === "match") return matchExplanation(exercise.pairs, explanation.replace(/[.]$/, ""));
  if (exercise.kind === "sort") return sortExplanation(exercise.buckets, exercise.items);
  if (exercise.kind === "grid") return gridExplanation(exercise.rows, explanation.replace(/[.]$/, ""));
  if (exercise.kind === "dropdown") {
    return `${explanation} Các lựa chọn hoàn chỉnh lần lượt là ${exercise.slots.map((slot) => `“${slot.acceptedAnswers[0]}”`).join("; ")}.`;
  }
  if (exercise.kind === "exact-input") {
    return `${explanation} Một câu trả lời hoàn chỉnh được chấp nhận là ${quotedStatement(exercise.acceptedAnswers[0])}`;
  }
  if (exercise.kind === "timeline") {
    const answer = exercise.options.find((option) => option.id === exercise.answerId)?.label;
    return answer ? `${explanation} Dòng thời gian phù hợp là “${answer}”.` : explanation;
  }
  return explanation;
}

export function withQualityMetadata(legacyLessonId: string, exercise: Exercise): Exercise {
  const answers = correctAnswerStrings(exercise);
  const normalizedHint = exercise.hint.toLocaleLowerCase("vi").replaceAll("`", "");
  const containsFullAnswer = answers.some((answer) => {
    const clean = answer.replaceAll("`", "").trim().toLocaleLowerCase("vi");
    return clean.length >= 2 && normalizedHint.includes(clean);
  });
  const rawHint = containsFullAnswer ? maskAnswerTerms(exercise.hint, answers) : exercise.hint;
  const hint =
    rawHint.includes("___") || rawHint.includes("hình thức cần tìm")
      ? promptAwareHint(exercise, legacyLessonId)
      : rawHint;
  const enriched = enrichedExplanation(exercise);
  const explanation = hint.trim() === enriched.trim()
    ? answerAppliedExplanation(exercise, enriched)
    : enriched;
  return {
    ...exercise,
    prompt: normalizeEditorialPunctuation(exercise.prompt),
    objectiveId: exercise.objectiveId
      ? `${legacyLessonId}:${exercise.objectiveId}`
      : `${legacyLessonId}:${objectiveCategory(exercise)}`,
    hint: normalizeEditorialPunctuation(hint),
    explanation: normalizeEditorialPunctuation(explanation),
  };
}
