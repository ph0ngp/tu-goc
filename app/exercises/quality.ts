import type { Exercise } from "../exercise-types.ts";
import { answerUsageKey } from "./advanced-builders.ts";
import { escapeRegExp, gridExplanation, hintLeads, joinSentenceTokens, maskAnswerTerms, matchExplanation, sortExplanation } from "./basic-builders.ts";

function correctAnswerStrings(exercise: Exercise): string[] {
  if (exercise.kind === "choice" || exercise.kind === "context" || exercise.kind === "repair") {
    return [exercise.answer];
  }
  if (exercise.kind === "order") return [exercise.answer, ...(exercise.alternatives ?? [])].map(joinSentenceTokens);
  if (exercise.kind === "tap") return exercise.answerIndexes.map((index) => exercise.tokens[index]);
  if (exercise.kind === "grid") return exercise.rows.map((row) => row.answer);
  if (exercise.kind === "dropdown") return exercise.slots.flatMap((slot) => slot.acceptedAnswers);
  if (exercise.kind === "exact-input") return exercise.acceptedAnswers;
  if (exercise.kind === "timeline") {
    return exercise.options.filter((option) => option.id === exercise.answerId).map((option) => option.label);
  }
  return [];
}

/** Các phương án sai hiển thị cạnh đáp án; nhắc tới từ chung của chúng không làm lộ đáp án. */
function otherOptionStrings(exercise: Exercise): string[] {
  if (exercise.kind === "choice" || exercise.kind === "context") {
    return exercise.options.filter((option) => option !== exercise.answer);
  }
  if (exercise.kind === "repair") return exercise.replacements.filter((option) => option !== exercise.answer);
  return [];
}

function wordPattern(value: string): RegExp {
  return new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(value)}(?![\\p{L}\\p{N}])`, "iu");
}

function capitalizeLike(found: string, replacement: string): string {
  const first = found.charAt(0);
  return first !== first.toLocaleLowerCase("en") && first === first.toLocaleUpperCase("en")
    ? replacement.charAt(0).toLocaleUpperCase("en") + replacement.slice(1)
    : replacement;
}

/**
 * Bài ghép bị đảo chiều để câu trả lời lặp lại chuyển sang cột trái. Câu hỏi
 * “Ghép mỗi X với Y phù hợp” được đảo thành “Ghép mỗi Y với X phù hợp”; câu hỏi
 * có dạng khác nhận một mệnh lệnh chung khớp với tiêu đề hai cột của bảng.
 */
function flippedMatchPrompt(prompt: string): string {
  const match = prompt.trim().match(/^Ghép (?:mỗi )?(.+?) với (.+?)( phù hợp| tương ứng)?\.$/u);
  if (!match) return "Với mỗi phần bên trái, chọn phần tương ứng.";
  const right = match[2].replace(/ của (?:nó|chúng)$/u, "");
  return `Ghép mỗi ${right} với ${match[1]}${match[3] ?? " tương ứng"}.`;
}

/**
 * Bài sửa lỗi được đổi thành câu hỏi chọn câu hoàn chỉnh. Chỉ đổi khi yêu cầu
 * gốc có thể viết lại thành một câu hỏi tự nhiên; nếu không, giữ nguyên bài sửa.
 */
function repairAsChoicePrompt(prompt: string): string | undefined {
  const text = prompt.trim().replace(/[.?]$/, "");
  const fixTo = text.match(/^Sửa (?:câu |lỗi )?để (.+)$/u);
  if (fixTo) return `Câu nào ${fixTo[1]}?`;
  const add = text.match(/^Bổ sung (.+)$/u);
  if (add) return `Câu nào đã bổ sung đúng ${add[1]}?`;
  const pick = text.match(/^Chọn (cụm|từ|dạng) đúng (cho|trong|với) (.+)$/u);
  if (pick) return `Câu nào dùng ${pick[1]} đúng ${pick[2]} ${pick[3]}?`;
  const line = text.match(/^Trong (dòng|câu) `[^`]+`, hãy thay .+? để (?:dòng|câu) trở thành đúng(.*)$/u);
  if (line) return `${line[1].charAt(0).toLocaleUpperCase("vi")}${line[1].slice(1)} nào đúng${line[2]}?`;
  return undefined;
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
    const prompt = flippedMatchPrompt(exercise.prompt);
    const pairs = exercise.pairs.map((pair) => ({ left: pair.right, right: pair.left }));
    // Lời giải và gợi ý dựng theo chiều cũ được dựng lại theo chiều mới.
    const oldList = matchExplanation(exercise.pairs);
    const explanation = exercise.explanation.startsWith(oldList)
      ? matchExplanation(pairs, exercise.explanation.slice(oldList.length).trim())
      : exercise.explanation;
    const oldPrompt = exercise.prompt.trim().replace(/[.?]$/, "");
    const hint = exercise.hint.includes(oldPrompt)
      ? exercise.hint.replace(oldPrompt, prompt.replace(/[.?]$/, ""))
      : exercise.hint;
    return { ...exercise, prompt, pairs, hint, explanation };
  });

  counts = countAnswers(diversified);
  diversified = diversified.map((exercise) => {
    if (exercise.kind !== "repair" || (counts.get(answerUsageKey(exercise.answer)) ?? 0) <= 2) return exercise;
    const prompt = repairAsChoicePrompt(exercise.prompt);
    if (!prompt) return exercise;
    const sentenceWith = (replacement: string) => {
      const tokens = [...exercise.tokens];
      tokens[exercise.targetIndex] = replacement;
      return joinSentenceTokens(tokens);
    };
    const correctSentence = sentenceWith(exercise.answer);
    const options = [...new Set([
      correctSentence,
      ...exercise.replacements.map(sentenceWith),
      joinSentenceTokens(exercise.tokens),
    ])];
    return {
      id: exercise.id,
      kind: "choice" as const,
      objectiveId: exercise.objectiveId,
      prompt,
      options,
      answer: correctSentence,
      hint: exercise.hint.startsWith(hintLeads.repair) ? exercise.hint.slice(hintLeads.repair.length).trim() : exercise.hint,
      explanation: exercise.explanation,
    };
  });

  counts = countAnswers(diversified);
  return diversified.map((exercise) => {
    if (exercise.kind !== "grid") return exercise;
    const rows = exercise.rows.map((row) => {
      const key = answerUsageKey(row.answer);
      if ((counts.get(key) ?? 0) <= 2 || row.completed === row.answer) return row;
      const pattern = wordPattern(row.answer);
      if (!pattern.test(row.completed)) return row;
      // Phương án sai được dựng lại thành câu hoàn chỉnh, giữ chữ hoa đầu câu như câu đúng.
      const wrongCompleted = [...new Set(
        row.options
          .filter((option) => option !== row.answer && /^[\p{L}\p{N}\s'’-]+$/u.test(option))
          .map((option) => row.completed.replace(pattern, (found) => capitalizeLike(found, option)))
          .filter((sentence) => sentence !== row.completed),
      )];
      if (!wrongCompleted.length) return row;
      counts.set(key, (counts.get(key) ?? 1) - 1);
      const completedKey = answerUsageKey(row.completed);
      counts.set(completedKey, (counts.get(completedKey) ?? 0) + 1);
      return {
        ...row,
        options: [row.completed, ...wrongCompleted],
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

function quotedStatement(value: string): string {
  const safeValue = value.replaceAll("`", "'");
  return `\`${safeValue}\`${/[.?!]$/.test(value.trim()) ? "" : "."}`;
}

function normalizeEditorialPunctuation(value: string): string {
  return value
    // Câu trong code đã có dấu kết câu thì bỏ dấu câu lặp phía sau, trừ dấu phẩy ngăn hai mục code trong danh sách.
    .replace(/(`[^`\n]*[.?!]`)(?:\.|,(?!\s+`))(?=\s|$)/g, "$1")
    .replace(/([.?!])”\./g, "$1”")
    .replace(/([.?!])””/g, "$1”")
    // Một câu được ghép vào cuối mệnh lệnh không được để lại “?.” hay “..”.
    .replace(/([?!])\.(?=\s|$)/g, "$1")
    .replace(/(?<!\.)\.\.(?=\s|$)/g, ".");
}

/**
 * Gợi ý chủ đề được chọn theo mã bài học, không theo từ khóa trong câu hỏi:
 * một câu hỏi có chữ “của” hay “nơi chốn” không có nghĩa là bài đang dạy sở
 * hữu hay giới từ. Câu gợi ý không nêu dạng tiếng Anh cụ thể để khỏi chỉ thẳng
 * vào đáp án; phần riêng của từng câu đến từ lời giải đã được che đáp án.
 */
const lessonTopicHints: Array<[lessonIds: string[], hint: string]> = [
  [["word-jobs"], "Hỏi từ đang xét dùng để gọi tên, thay cho tên, nói hành động hay trạng thái, hay miêu tả đặc điểm."],
  [["noun-types"], "Danh từ riêng là tên của một người, một nơi hay một vật cụ thể và luôn viết hoa; danh từ chung gọi tên cả một loại."],
  [["subjects-and-pronouns"], "Xác định người được nói tới là người nói, người nghe hay người, vật khác, và đó là một hay nhiều."],
  [["articles-demonstratives"], "Xét từ đứng ngay sau: tên riêng và danh từ số nhiều không đi với mạo từ này; với một người hay vật chưa được chỉ rõ, nghe âm đầu là phụ âm hay nguyên âm."],
  [["demonstratives"], "Xác định lần lượt hai điều: một hay nhiều vật, rồi vật ở gần hay ở xa người nói."],
  [["be-forms", "be-meanings", "be-negative", "be-questions", "be-wh-questions"], "Xác định chủ ngữ là chính người nói, một người hay vật, hay nhiều người hoặc vật, rồi chọn dạng của `be` đi với chủ ngữ ấy."],
  [["possessives"], "Xác định ai là người sở hữu: người nói, người nghe hay người, vật khác, một hay nhiều; từ sở hữu luôn đứng ngay trước danh từ."],
  [["possessive-s"], "Xác định ai là người sở hữu, người hay vật ấy là một hay nhiều, và danh từ đã tận cùng bằng `s` chưa, rồi mới đặt dấu nháy đơn."],
  [["possessive-pronouns"], "Xác định ai là người sở hữu, rồi xét từ cần tìm đứng ngay trước một danh từ hay đứng một mình thay cho cả cụm."],
  [["whose-questions"], "Từ hỏi về chủ sở hữu có thể đứng ngay trước danh từ hoặc đứng một mình khi vật đã rõ; đừng nhầm nó với dạng viết tắt của “ai là”."],
  [["apostrophes"], "Xác định dấu nháy đơn đang chỉ sở hữu hay đang thay cho chữ bị lược trong dạng viết tắt; số nhiều thông thường không có dấu nháy."],
  [["nouns-and-number", "irregular-plurals"], "Xác định danh từ cần ở số ít hay số nhiều, rồi nhớ lại danh từ ấy chỉ thêm `-s` hay có dạng số nhiều riêng."],
  [["countable-uncountable", "quantity-basic", "how-much-many"], "Xác định danh từ đếm được hay không đếm được, số ít hay số nhiều, rồi mới chọn từ đi cùng nó."],
  [["there-and-place"], "Danh từ đứng sau cho biết có một hay nhiều thứ, và điều đó quyết định dạng của `be`; câu hỏi và câu trả lời ngắn dùng lại đúng dạng ấy."],
  [["some-any-there"], "Xác định câu là khẳng định, phủ định hay câu hỏi; từ chỉ lượng không quyết định dạng của `be`, danh từ phía sau mới quyết định."],
  [["prepositions-place"], "Hình dung vị trí thật: vật ở bên trong một không gian, nằm trên và chạm một bề mặt, hay ở ngay bên dưới vật làm mốc."],
  [["prepositions-place-time"], "Hình dung vị trí thật: bên trong một không gian, trên một bề mặt hay tại một điểm; với thời gian, xét đó là một khoảng dài, một ngày cụ thể hay một giờ cụ thể."],
  [["action-vs-be"], "Xem câu đã có một động từ thường chưa: nếu có, động từ ấy tự làm động từ chính; nếu sau chủ ngữ chỉ là tính từ, danh từ hay nơi chốn thì cần `be`."],
  [["present-simple-base"], "Với chủ ngữ là người nói, người nghe hay nhiều người, vật, động từ giữ dạng cơ bản; không chèn `be` trước động từ thường."],
  [["third-person"], "Xác định chủ ngữ có phải một người hay vật số ít không, rồi nhìn chữ cuối của động từ để chọn cách thêm đuôi."],
  [["present-simple-negative", "present-simple-questions"], "Xác định chủ ngữ có phải một người hay vật số ít không, và câu là khẳng định, phủ định hay câu hỏi, rồi chọn dạng động từ và trợ động từ phù hợp."],
  [["present-simple-wh"], "Xác định thông tin cần hỏi để chọn từ hỏi, rồi chọn trợ động từ theo chủ ngữ; nếu từ hỏi chính là chủ ngữ thì không cần trợ động từ."],
  [["have-have-got"], "Xác định câu dùng mẫu có trợ động từ đi với `have` hay mẫu `have got`, rồi giữ đúng hình thức của chính mẫu ấy trong cả câu, kể cả câu hỏi và câu trả lời ngắn."],
  [["objects-and-links"], "Xác định người được nhắc tới đứng trước động từ làm chủ ngữ hay đứng sau động từ làm tân ngữ, rồi chọn dạng đại từ của vị trí ấy."],
  [["ability-can"], "Sau từ chỉ khả năng, động từ chính ở dạng cơ bản và không đổi theo chủ ngữ; khi hỏi hay trả lời ngắn, chính từ chỉ khả năng ấy được đưa lên đầu hoặc dùng lại."],
  [["can-requests"], "Xác định ai sẽ làm việc được nói tới, người nói hay người nghe, để biết câu đang xin phép, nhờ hay đề nghị giúp; nếu là lời đáp, chọn cách đáp lịch sự hợp với ý đó."],
  [["question-helpers"], "Câu có `be` đưa `be` lên trước chủ ngữ, câu có động từ thường cần trợ động từ, câu có từ chỉ khả năng đưa chính từ ấy lên; câu trả lời ngắn dùng lại đúng từ đã hỏi."],
  [["instructions-and-can"], "Câu mệnh lệnh bắt đầu thẳng bằng động từ ở dạng cơ bản, không có chủ ngữ; muốn bảo ai đừng làm gì thì đặt dạng phủ định của trợ động từ trước động từ ấy."],
  [["lets-suggestions"], "Lời rủ cùng làm bao gồm cả người nói lẫn người nghe, và động từ theo sau ở dạng cơ bản; lời đáp phải hợp với việc đồng ý hay từ chối."],
  [["would-like"], "Phân biệt nói sở thích chung với nói mong muốn cụ thể lúc này; nếu là lời mời hay lời đáp, chọn cách mời, nhận hay từ chối lịch sự."],
  [["continuous-form"], "Hiện tại tiếp diễn cần đủ hai phần: dạng của `be` hợp với chủ ngữ và động từ thêm `-ing`."],
  [["continuous-questions", "continuous-uses"], "Hiện tại tiếp diễn cần đủ hai phần: dạng của `be` hợp với chủ ngữ và động từ thêm `-ing`; câu hỏi đưa dạng `be` ấy lên trước chủ ngữ."],
  [["simple-vs-continuous"], "Xác định câu nói thói quen, sự thật hay tình trạng ổn định, hay nói một việc đang diễn ra, tạm thời hoặc đang thay đổi; từ chỉ thời gian chỉ là dấu hiệu hỗ trợ."],
  [["states-and-plans"], "Xác định động từ chỉ trạng thái như hiểu, cần, thích hay chỉ một hành động đang diễn ra; động từ trạng thái thường dùng hiện tại đơn."],
  [["adjectives-position"], "Tính từ đứng trước danh từ hoặc sau động từ nối, và không thêm đuôi số nhiều."],
  [["adverbs-manner"], "Xác định từ cần tìm miêu tả một người hay vật (dùng tính từ) hay miêu tả cách một hành động diễn ra (dùng trạng từ)."],
  [["sentence-order"], "Nhớ lại trật tự cơ bản của các thành phần trong câu, rồi xét từ hoặc cụm đang hỏi thuộc thành phần nào."],
  [["connectors-basic"], "Xác định quan hệ giữa hai ý: thêm một ý, đối lập, đưa ra lựa chọn, nêu lý do hay nêu kết quả, rồi chọn từ nối diễn tả đúng quan hệ ấy."],
  [["a2-past-be"], "Xác định chủ ngữ để chọn dạng quá khứ của `be`, rồi xét câu là khẳng định, phủ định hay câu hỏi."],
  [["a2-past-regular"], "Động từ có quy tắc thêm `-ed` ở quá khứ đơn và dùng như nhau cho mọi chủ ngữ; chú ý cách viết khi thêm đuôi."],
  [["a2-past-irregular"], "Động từ bất quy tắc không thêm `-ed` mà có dạng quá khứ riêng, dùng như nhau cho mọi chủ ngữ."],
  [["a2-past-did"], "Câu phủ định và câu hỏi với động từ hành động cần trợ động từ quá khứ, nên động từ chính trở về dạng cơ bản; câu có `be` không cần trợ động từ ấy mà đưa dạng quá khứ của `be` lên trước chủ ngữ."],
  [["a2-past-time"], "Xác định từ chỉ thời gian là một ngày đã qua, một khoảng tính lùi từ bây giờ, hay một năm, ngày hoặc giờ cụ thể cần giới từ; mỗi mốc chỉ cần một cách đánh dấu."],
  [["a2-subject-object-questions"], "Xác định từ hỏi đang thay cho người hoặc vật làm hành động (chủ ngữ) hay chịu hành động (tân ngữ); câu hỏi về chủ ngữ không cần trợ động từ."],
  [["a2-commas-basic"], "Xác định câu có danh sách từ ba mục trở lên, phần mở đầu, hai mệnh đề nối bằng từ nối hay lời gọi tên người nghe; hai mục ngắn nối bằng một từ nối thì không cần dấu phẩy."],
  [["a2-past-continuous"], "Quá khứ tiếp diễn gồm dạng quá khứ của `be` hợp với chủ ngữ và động từ thêm `-ing`; câu trả lời ngắn dùng lại dạng `be` ấy."],
  [["a2-past-simple-continuous", "a2-when-while-as"], "Xác định đâu là hoạt động nền đang kéo dài và đâu là sự việc ngắn xen vào tại một thời điểm."],
  [["a2-used-to"], "Xác định câu đang nói thói quen hay trạng thái cũ, rồi kiểm tra dạng của động từ theo sau và trợ động từ trong câu phủ định, câu hỏi."],
  [["a2-going-to"], "Mẫu này nói ý định hoặc dự đoán dựa vào dấu hiệu, và cần đủ ba phần: dạng của `be` hợp với chủ ngữ, cụm chỉ tương lai và động từ chính ở dạng cơ bản."],
  [["a2-will-decisions", "a2-will-predictions"], "Xác định câu đang nói một quyết định ngay lúc nói, một lời hứa hay một dự đoán; động từ đi sau từ chỉ tương lai này không đổi theo chủ ngữ."],
  [["a2-comparatives"], "Xác định tính từ ngắn hay dài và có dạng bất quy tắc hay không, rồi mới tạo dạng so sánh hơn."],
  [["a2-superlatives"], "Xác định tính từ ngắn hay dài và có dạng bất quy tắc hay không, rồi mới tạo dạng so sánh nhất; nhóm hoặc nơi làm phạm vi so sánh đứng sau giới từ."],
  [["a2-equality"], "Xác định hai đối tượng bằng nhau hay không bằng nhau và đang so sánh tính chất hay số lượng (đếm được hay không), rồi giữ đủ khung của phép so sánh ngang bằng."],
  [["a2-comparative-modifiers"], "Xác định mức chênh lệch là nhiều hay ít, rồi đặt từ chỉ mức độ ngay trước dạng so sánh hơn; không phải từ chỉ mức độ nào cũng đứng được ở vị trí này."],
  [["a2-too-enough-so-such"], "Xác định câu nói mức quá cao, mức vừa đủ hay chỉ nhấn mạnh mức độ, rồi xem phía sau là tính từ, trạng từ hay cụm danh từ để đặt từ chỉ mức độ đúng chỗ."],
  [["a2-could-past-ability"], "Xác định câu nói về khả năng chung trong quá khứ hay một lần làm được một việc cụ thể, và câu là khẳng định, phủ định hay câu hỏi."],
  [["a2-polite-could-may"], "Xác định người nói đang xin phép cho chính mình, nhờ người khác làm gì hay đáp lại một lời đề nghị, rồi kiểm tra trật tự từ của câu hỏi."],
  [["a2-possibility-modals"], "Xác định người nói chắc chắn đến mức nào rằng sự việc sẽ xảy ra hay đang đúng, và câu đang khẳng định hay phủ định khả năng ấy."],
  [["a2-advice-modals"], "Xác định câu đang khuyên nên làm, khuyên không nên làm hay hỏi xin lời khuyên, và lời khuyên ấy gắn với vấn đề nào trong tình huống."],
  [["a2-obligation"], "Xác định sự bắt buộc đến từ người nói hay từ quy định, hoàn cảnh bên ngoài, và câu nói về hiện tại hay quá khứ; chú ý phần nào phải chia theo chủ ngữ."],
  [["a2-prohibition-no-necessity"], "Hỏi “người ấy có được làm việc đó không?”: nếu không được làm thì đó là lời cấm; nếu được làm nhưng không bắt buộc thì đó là việc không cần làm."],
  [["a2-articles-countability", "a2-first-mention-the", "a2-definite-article", "a2-generic-reference"], "Xác định danh từ đếm được hay không, số ít hay số nhiều, và người nghe đã biết đúng người hay vật nào chưa, rồi mới chọn mạo từ."],
  [["a2-few-little"], "Xác định danh từ là đếm được số nhiều hay không đếm được, rồi xét người nói thấy lượng ấy còn đủ dùng hay gần như không có."],
  [["a2-all-every-each-whole", "a2-both-either-neither"], "Xác định danh từ đi sau là số ít hay số nhiều, có từ hạn định hoặc đại từ đứng sau hay không, và người nói nhìn cả nhóm hay từng thành viên."],
  [["a2-present-perfect-form"], "Hiện tại hoàn thành gồm trợ động từ hợp với chủ ngữ và quá khứ phân từ; với động từ bất quy tắc, quá khứ phân từ là dạng thứ ba trong bảng động từ."],
  [["a2-perfect-experience"], "Xác định câu đang hỏi về trải nghiệm vào bất kỳ lúc nào tính đến nay, nói chưa từng có trải nghiệm ấy, hay kể một lần cụ thể có mốc quá khứ đã kết thúc."],
  [["a2-perfect-just-already-yet"], "Xác định từ chỉ thời điểm hoàn tất này đứng giữa trợ động từ và quá khứ phân từ, hay thường đứng cuối câu hỏi và câu phủ định."],
  [["a2-perfect-unfinished-time", "a2-perfect-vs-past"], "Xác định khoảng thời gian trong câu còn kéo dài tới bây giờ hay đã kết thúc, vì điều đó quyết định giữa hiện tại hoàn thành và quá khứ đơn."],
  [["a2-since-for-how-long"], "Xác định phần thời gian là một mốc bắt đầu hay một độ dài."],
  [["a2-been-gone"], "Xác định người được nói tới đã đi rồi trở về hay đã đi và vẫn còn ở nơi đó; hai quá khứ phân từ dễ nhầm ở đây thuộc về hai động từ khác nhau."],
  [["a2-relative-subject"], "Xác định danh từ được bổ nghĩa là người hay vật, và động từ trong mệnh đề quan hệ chia theo danh từ ấy; đại từ quan hệ ở đây làm chủ ngữ nên không thêm một chủ ngữ khác."],
  [["a2-relative-object-whose-where"], "Xác định danh từ được bổ nghĩa là người, vật hay nơi chốn, và từ nối đang làm chủ ngữ, tân ngữ, chỉ sở hữu hay chỉ nơi xảy ra sự việc."],
  [["a2-zero-conditional", "a2-first-conditional"], "Xác định điều kiện là sự thật luôn đúng hay một khả năng cụ thể trong tương lai; mệnh đề điều kiện vẫn dùng hiện tại đơn."],
  [["a2-future-time-clauses"], "Tách câu thành mệnh đề chỉ thời điểm (khi, trước khi, sau khi, cho đến khi, ngay khi) và mệnh đề chính: mệnh đề chỉ thời điểm dùng hiện tại đơn dù nói về tương lai."],
  [["a2-reflexive-reciprocal"], "Đại từ phản thân dùng khi chủ ngữ và tân ngữ là cùng một người hay vật, với đuôi số ít hay số nhiều theo chủ ngữ; khi hai bên làm cho nhau, dùng cụm chỉ quan hệ qua lại."],
  [["a2-indefinite-pronouns"], "Xác định câu khẳng định, phủ định hay câu hỏi trung tính và đang nói về người hay vật; đại từ bất định đi với động từ số ít, còn tính từ đứng sau nó."],
  [["a2-one-ones"], "Xác định danh từ được thay là đếm được hay không, số ít hay số nhiều, và có tính từ hoặc từ hạn định nào phải giữ lại trước từ thay thế."],
  [["a2-other-forms"], "Xác định phía sau còn danh từ hay không, danh từ ấy số ít hay số nhiều, và người nói nói về phần còn lại đã xác định hay chỉ một cái khác bất kỳ."],
  [["a2-verb-patterns", "a2-object-infinitive-purpose-prep-ing"], "Xác định động từ hoặc giới từ đứng trước đòi hỏi dạng nào theo sau."],
  [["a2-ed-ing-adjectives"], "Tính từ đuôi `-ed` nói cảm xúc của người; tính từ đuôi `-ing` nói tính chất của người, vật hay việc gây ra cảm xúc."],
];

const topicHintByLesson = new Map(
  lessonTopicHints.flatMap(([lessonIds, hint]) => lessonIds.map((lessonId) => [lessonId, hint] as const)),
);

/** Gợi ý chủ đề của một bài học, hoặc `undefined` nếu bài chưa có gợi ý riêng. */
export function lessonTopicHint(legacyLessonId: string): string | undefined {
  return topicHintByLesson.get(legacyLessonId);
}

/** Mọi gợi ý chủ đề, để test kiểm tra mỗi gợi ý chỉ xuất hiện trong bài của nó. */
export const allLessonTopicHints: readonly string[] = lessonTopicHints.map(([, hint]) => hint);

const kindLeads: Partial<Record<Exercise["kind"], string>> = {
  choice: "Đối chiếu từng phương án với yêu cầu, cả về hình thức lẫn ý nghĩa.",
  context: "Đọc kỹ tình huống rồi đối chiếu từng phương án, cả về hình thức lẫn ý nghĩa.",
  order: "Ghép trước những từ thuộc cùng một cụm, rồi đọc lại cả câu.",
  repair: "Thử đặt từng phương án vào vị trí cần sửa rồi đọc lại cả câu.",
  tap: "Xét công việc của từng mảnh trong cả câu.",
  match: "Xử lý từng vế riêng; mỗi phương án chỉ dùng một lần.",
  sort: "Dùng một tiêu chí cho mọi mục và xét từng mục riêng.",
  grid: "Giải riêng từng hàng rồi đọc lại câu hoàn chỉnh của hàng đó.",
  dropdown: "Giải riêng từng ô rồi đọc lại cả câu.",
  "exact-input": "Kiểm tra lần lượt chủ ngữ, động từ và trật tự từ của câu cần viết.",
  timeline: "Xác định hành động xảy ra trước, sau hay đang diễn ra so với mốc thời gian.",
};

function meaningfulWordCount(text: string): number {
  const withoutLead = Object.values(hintLeads).reduce(
    (current, lead) => current.startsWith(lead) ? current.slice(lead.length) : current,
    text,
  );
  return (withoutLead.replaceAll("…", " ").match(/[\p{L}\p{N}]+/gu) ?? []).length;
}

/**
 * Dựng gợi ý khi gợi ý gốc phải che đáp án. Phần riêng của câu là chính lời
 * giải với chỗ đáp án được thay bằng dấu “…”. Khi phần ấy còn quá ít chữ để
 * dẫn đường, gợi ý thêm phần chủ đề của bài học (hoặc lời dẫn theo dạng hoạt
 * động) ở trước.
 */
function promptAwareHint(exercise: Exercise, legacyLessonId: string, maskedHint: string): string {
  const specific = maskedHint
    .replaceAll("hình thức cần tìm", "___")
    .replace(/(?:___\s*){2,}/g, "___")
    .replaceAll("___", "…")
    .replace(/…(?:\s*(?:\.\.\.|…))+/g, "…")
    .replace(/\s+/g, " ")
    .trim();
  const topic = lessonTopicHint(legacyLessonId);
  const kindLead = kindLeads[exercise.kind] ?? kindLeads.choice!;
  const hasOwnLead = Object.values(hintLeads).some((hintLead) => specific.startsWith(hintLead));
  const words = meaningfulWordCount(specific);
  const holes = specific.split("…").length - 1;
  if (words >= 7 && holes <= 1) return specific;
  if (words >= 1) return [topic ?? (hasOwnLead ? "" : kindLead), specific].filter(Boolean).join(" ");
  const prompt = maskAnswerTerms(exercise.prompt, correctAnswerStrings(exercise), otherOptionStrings(exercise))
    .replaceAll("___", "…")
    .replace(/[.?]$/, "");
  return `${topic ?? kindLead} Áp dụng vào câu hỏi “${prompt}”.`;
}

/** Lời giải đã tự nêu mọi phần của đáp án chưa (mọi cặp, mọi mục, mọi câu hoàn chỉnh). */
function namesEveryPart(explanation: string, parts: string[]): boolean {
  const plain = explanation.replaceAll("`", "").replace(/[’]/g, "'").toLocaleLowerCase("vi");
  return parts.every((part) => plain.includes(part.replaceAll("`", "").replace(/[’]/g, "'").replace(/[.?!]+$/, "").toLocaleLowerCase("vi")));
}

/**
 * Phản hồi của bài ghép, phân loại và bảng phải nêu cụ thể các cặp, nhóm hoặc
 * câu hoàn chỉnh. Lời giải riêng của hoạt động được giữ lại; danh sách được nối
 * thêm khi lời giải chưa tự nêu đủ.
 */
function listedExplanation(exercise: Exercise): string | undefined {
  const own = exercise.explanation.trim();
  if (exercise.kind === "match") {
    if (own.startsWith("Các cặp đúng là") || namesEveryPart(own, exercise.pairs.flatMap((pair) => [pair.left, pair.right]))) return own;
    return matchExplanation(exercise.pairs, own);
  }
  if (exercise.kind === "sort") {
    if (own.startsWith("Nhóm “") || namesEveryPart(own, exercise.items.map((item) => item.text))) return own;
    return `${own} ${sortExplanation(exercise.buckets, exercise.items)}`;
  }
  if (exercise.kind === "grid") {
    if (own.includes("Các câu hoàn chỉnh lần lượt là") || namesEveryPart(own, exercise.rows.map((row) => row.completed))) return own;
    return `${own} ${gridExplanation(exercise.rows)}`;
  }
  return undefined;
}

function enrichedExplanation(exercise: Exercise): string {
  const listed = listedExplanation(exercise);
  if (listed !== undefined) return listed;
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
  if (exercise.kind === "match") return matchExplanation(exercise.pairs);
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
  if (exercise.kind === "match") return matchExplanation(exercise.pairs, explanation);
  if (exercise.kind === "sort") return sortExplanation(exercise.buckets, exercise.items);
  if (exercise.kind === "grid") return `${explanation} ${gridExplanation(exercise.rows)}`;
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

/** Bài sắp xếp có nhiều cách xếp đúng thì lời giải nêu cả những cách ấy. */
function withAlternativeOrders(exercise: Exercise, explanation: string): string {
  if (exercise.kind !== "order" || !exercise.alternatives?.length) return explanation;
  const variants = exercise.alternatives.map(joinSentenceTokens).filter((variant) => !explanation.includes(variant));
  if (!variants.length) return explanation;
  return `${explanation} Cách xếp ${variants.map((variant) => `\`${variant}\``).join(", ")} cũng đúng.`;
}

export function withQualityMetadata(legacyLessonId: string, exercise: Exercise): Exercise {
  const answers = correctAnswerStrings(exercise);
  const plainHint = exercise.hint.replaceAll("`", "");
  const containsFullAnswer = answers.some((answer) => {
    const clean = answer.replaceAll("`", "").trim();
    return clean.length >= 2 && wordPattern(clean).test(plainHint);
  });
  const rawHint = containsFullAnswer ? maskAnswerTerms(exercise.hint, answers, otherOptionStrings(exercise)) : exercise.hint;
  const hint =
    rawHint.includes("___") || rawHint.includes("hình thức cần tìm")
      ? promptAwareHint(exercise, legacyLessonId, rawHint)
      : rawHint;
  const enriched = withAlternativeOrders(exercise, enrichedExplanation(exercise));
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
