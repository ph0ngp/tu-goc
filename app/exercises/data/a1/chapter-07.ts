/* Luyện tập A1 — Chương 7: Số lượng cơ bản. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { compactPracticeSet } from "../../basic-builders.ts";

const a1Chapter07BaseExerciseData: Record<string, Exercise[]> = {
  "quantity-basic": compactPracticeSet({
    prefix: "a1qb",
    focus: "much, many và a lot of",
    choices: [
      ["Từ nào đi với danh từ đếm được số nhiều?", ["many", "much", "a"], "many", "Dùng `many books/people/children`."],
      ["Từ nào đi với danh từ không đếm được?", ["much", "many", "an"], "much", "Dùng `much water/time/money`."],
      ["Cụm nào đúng với `chairs`?", ["many chairs", "much chairs", "a lot chair"], "many chairs", "`Chairs` là danh từ đếm được số nhiều."],
      ["Cụm nào đúng với `information`?", ["much information", "many information", "many informations"], "much information", "`Information` không đếm được."],
      ["Câu khẳng định thông thường nào tự nhiên?", ["We have a lot of work.", "We have many work.", "We have a lot work."], "We have a lot of work.", "`A lot of` tự nhiên trong câu khẳng định và dùng với `work` không đếm được."],
      ["Câu hỏi nào đúng?", ["Are there many students?", "Are there much students?", "Is there many students?"], "Are there many students?", "`Students` là danh từ đếm được số nhiều, nên cả từ chỉ lượng lẫn dạng của `be` đều phải hợp với số nhiều."],
      ["Câu phủ định nào đúng?", ["We don't have much time.", "We don't have many time.", "We doesn't have much time."], "We don't have much time.", "`Time` không đếm được, dùng `much`."],
      ["Cụm nào có nghĩa “quá nhiều xe”?", ["too many cars", "too much cars", "very many cars"], "too many cars", "`Cars` đếm được số nhiều; muốn nói số lượng vượt mức thì cần `too`, còn `very` chỉ nhấn mạnh rằng số lượng lớn."],
      ["Cụm nào có nghĩa “quá nhiều đường”?", ["too much sugar", "too many sugar", "a lot sugar"], "too much sugar", "`Sugar` không đếm được nên dùng `too much`."],
      ["`A lot of` dùng được với nhóm nào?", ["cả danh từ số nhiều và không đếm được", "chỉ danh từ số nhiều", "chỉ danh từ không đếm được"], "cả danh từ số nhiều và không đếm được", "Ta có `a lot of books` và `a lot of water`."],
    ],
    orders: [
      ["Sắp xếp câu “Ở đây không có nhiều cửa hàng.”", ["many", "aren’t", "shops", "There", "here", "."], ["There", "aren’t", "many", "shops", "here", "."], "`Shops` là số nhiều nên dùng `many`."],
      ["Sắp xếp câu “Cô ấy uống nhiều nước.”", ["water", "lot", "drinks", "a", "She", "of", "."], ["She", "drinks", "a", "lot", "of", "water", "."], "Câu khẳng định dùng `a lot of water`."],
      ["Sắp xếp câu hỏi “Có nhiều sữa không?”", ["there", "milk", "Is", "much", "?"], ["Is", "there", "much", "milk", "?"], "`Milk` không đếm được nên dùng `much` và `is`."],
      ["Sắp xếp câu “Có quá nhiều người trong phòng.”", ["people", "There", "too", "room", "are", "the", "in", "many", "."], ["There", "are", "too", "many", "people", "in", "the", "room", "."], "`People` là số nhiều nên dùng `too many`."],
    ],
    repairs: [
      ["Chọn từ chỉ lượng phù hợp với `books`.", ["She", "has", "much", "books", "."], 2, ["many", "much", "a"], "many", "`Books` là danh từ đếm được số nhiều."],
      ["Chọn từ chỉ lượng phù hợp với `money`.", ["I", "don’t", "have", "many", "money", "."], 3, ["much", "many", "an"], "much", "`Money` không đếm được."],
      ["Chọn cụm đúng cho câu khẳng định thông thường.", ["They", "have", "much", "friends", "."], 2, ["a lot of", "much", "a lot"], "a lot of", "`A lot of friends` tự nhiên trong câu khẳng định."],
    ],
    taps: [
      ["Trong `We don't have much food or many drinks`, chọn tất cả từ chỉ lượng.", ["We", "don’t", "have", "much", "food", "or", "many", "drinks", "."], [3, 6], "Hai từ chỉ lượng đứng ngay trước một danh từ không đếm được (`food`) và một danh từ số nhiều (`drinks`)."],
      ["Trong `A lot of children need a lot of water`, chọn hai cụm `a lot of`.", ["A", "lot", "of", "children", "need", "a", "lot", "of", "water", "."], [0, 1, 2, 5, 6, 7], "Cả danh từ số nhiều và không đếm được đều dùng được với `a lot of`."],
      ["Trong `Too much noise and too many people make me tired`, chọn hai danh từ quyết định `much/many`.", ["Too", "much", "noise", "and", "too", "many", "people", "make", "me", "tired", "."], [2, 6], "Hai từ quyết định là hai danh từ đứng ngay sau từ chỉ lượng: một danh từ không đếm được và một danh từ số nhiều."],
    ],
    matchPrompt: "Ghép mỗi từ với loại danh từ đứng sau nó.",
    pairs: [{ left: "many", right: "danh từ đếm được số nhiều" }, { left: "much", right: "danh từ không đếm được" }, { left: "a lot of", right: "danh từ đếm được số nhiều hoặc không đếm được" }, { left: "a/an", right: "danh từ đếm được số ít" }],
    sortPrompt: "Phân loại các cụm theo danh từ đếm được hoặc không đếm được.",
    buckets: ["many", "much"],
    items: [{ text: "___ books", bucket: "many" }, { text: "___ people", bucket: "many" }, { text: "___ questions", bucket: "many" }, { text: "___ water", bucket: "much" }, { text: "___ time", bucket: "much" }, { text: "___ information", bucket: "much" }],
    gridPrompts: ["Chọn `much` hoặc `many` theo danh từ.", "Chọn cụm tự nhiên trong câu khẳng định.", "Chọn `too much` hoặc `too many` theo điều vượt mức."],
    gridRows: [
      { cue: "___ chairs", options: ["many", "much", "a"], answer: "many", completed: "many chairs" },
      { cue: "___ rice", options: ["much", "many", "an"], answer: "much", completed: "much rice" },
      { cue: "___ children", options: ["many", "much", "a lot"], answer: "many", completed: "many children" },
      { cue: "She has ___ friends.", options: ["a lot of", "much", "a lot"], answer: "a lot of", completed: "She has a lot of friends." },
      { cue: "We drink ___ water.", options: ["a lot of", "many", "a lot"], answer: "a lot of", completed: "We drink a lot of water." },
      { cue: "They do ___ work.", options: ["a lot of", "many", "a lots of"], answer: "a lot of", completed: "They do a lot of work." },
      { cue: "___ bags", options: ["too many", "too much", "very many"], answer: "too many", completed: "too many bags" },
      { cue: "___ salt", options: ["too much", "too many", "a lot of"], answer: "too much", completed: "too much salt" },
      { cue: "___ noise", options: ["too much", "too many", "many"], answer: "too much", completed: "too much noise" },
    ],
  }),
  "how-much-many": compactPracticeSet({
    prefix: "a1hm",
    focus: "how much/how many và đơn vị đo, chứa, phần",
    choices: [
      ["Cụm hỏi nào đúng với `chairs`?", ["how many chairs", "how much chairs", "how many chair"], "how many chairs", "Đây là danh từ đếm được, nên cụm hỏi phải dùng từ dành cho danh từ đếm được và giữ danh từ ở số nhiều."],
      ["Cụm hỏi nào đúng với `sugar`?", ["how much sugar", "how many sugar", "how much sugars"], "how much sugar", "Đây là danh từ không đếm được, nên cụm hỏi phải dùng từ dành cho danh từ không đếm được, và danh từ không thêm `-s`."],
      ["Câu nào đúng?", ["How many books do you have?", "How much books do you have?", "How many book do you have?"], "How many books do you have?", "Sau `how many`, danh từ ở số nhiều."],
      ["Câu nào đúng với `milk`?", ["How much milk is there?", "How many milk are there?", "How much milks is there?"], "How much milk is there?", "`Milk` không đếm được, dùng `how much` và `is`."],
      ["Câu nào hỏi giá của một quyển sách?", ["How much is this book?", "How many is this book?", "How much are this book?"], "How much is this book?", "Khi hỏi giá, cụm hỏi đứng một mình, không cần danh từ theo sau; dạng của `be` hợp với `book` số ít."],
      ["Cụm nào đúng?", ["two bottles of water", "two bottle of waters", "two waters bottles"], "two bottles of water", "Đơn vị `bottle` chuyển sang số nhiều; `water` giữ nguyên."],
      ["Muốn hỏi số tách cà phê, dùng câu nào?", ["How many cups of coffee?", "How much cups of coffee?", "How many coffee?"], "How many cups of coffee?", "Ta đang đếm `cups`, nên dùng `how many`."],
      ["Đơn vị nào tự nhiên với `information`?", ["a piece of information", "a glass of information", "an information"], "a piece of information", "`A piece of information` là một mẩu/một thông tin."],
      ["Cách nào đúng khi nói hai lít sữa?", ["two litres of milk", "two litre of milks", "two milks litres"], "two litres of milk", "Danh từ đơn vị `litre` mang số nhiều."],
      ["Câu nào hỏi tổng lượng cà phê chứ không hỏi số tách?", ["How much coffee do you drink?", "How many cups of coffee do you drink?", "How many coffee do you drink?"], "How much coffee do you drink?", "Không có đơn vị đếm, nên hỏi tổng lượng bằng `how much`."],
    ],
    orders: [
      ["Sắp xếp câu hỏi “Bạn có bao nhiêu người bạn?”", ["friends", "How", "have", "many", "you", "do", "?"], ["How", "many", "friends", "do", "you", "have", "?"], "`How many + danh từ số nhiều` đứng đầu."],
      ["Sắp xếp câu hỏi “Bạn cần bao nhiêu nước?”", ["water", "need", "How", "you", "do", "much", "?"], ["How", "much", "water", "do", "you", "need", "?"], "`Water` không đếm được nên dùng `how much`; `you` đi với `do`."],
      ["Sắp xếp cụm “ba lát bánh mì”.", ["bread", "slices", "of", "three"], ["three", "slices", "of", "bread"], "Đếm `slices`; `bread` giữ nguyên."],
      ["Sắp xếp câu hỏi “Những chiếc giày này giá bao nhiêu?”", ["these", "How", "shoes", "are", "much", "?"], ["How", "much", "are", "these", "shoes", "?"], "Khi hỏi giá, `how much` đứng trước `are these shoes`."],
    ],
    repairs: [
      ["Chọn `many` hoặc `much` theo `children`.", ["How", "much", "children", "are", "there", "?"], 1, ["many", "much", "a lot"], "many", "`Children` là danh từ số nhiều."],
      ["Chọn dạng danh từ đúng sau `how many`.", ["How", "many", "chair", "do", "we", "need", "?"], 2, ["chair", "chairs", "a chair"], "chairs", "Sau `how many`, dùng danh từ số nhiều."],
      ["Chọn dạng đơn vị đúng sau `two`.", ["We", "need", "two", "bottle", "of", "milk", "."], 3, ["bottles", "bottle", "milks"], "bottles", "Số hai làm đơn vị `bottle` chuyển thành số nhiều."],
    ],
    taps: [
      ["Chọn danh từ đang được đếm trực tiếp trong câu `How many pieces of cake are there?`", ["How", "many", "pieces", "of", "cake", "are", "there", "?"], [2], "Ta đếm số `pieces`, không đếm `cake` trực tiếp."],
      ["Chọn cụm dùng để hỏi giá trong câu `How much are those bags?`", ["How", "much", "are", "those", "bags", "?"], [0, 1], "`How much` đứng một mình để hỏi giá."],
      ["Trong `Three bowls of rice are on the table`, chọn toàn bộ cụm `số + đơn vị + of + danh từ`.", ["Three", "bowls", "of", "rice", "are", "on", "the", "table", "."], [0, 1, 2, 3], "Cụm chỉ lượng bắt đầu bằng con số và kết thúc ở danh từ chỉ chất: `three bowls of rice`."],
    ],
    matchPrompt: "Ghép mỗi câu hỏi với loại thông tin nó yêu cầu.",
    pairs: [{ left: "How many books?", right: "số quyển sách" }, { left: "How much water?", right: "lượng nước" }, { left: "How much is this book?", right: "giá của quyển sách" }, { left: "How many bottles of water?", right: "số chai nước" }],
    sortPrompt: "Phân loại các câu hỏi theo `how many` hoặc `how much`.",
    buckets: ["how many", "how much"],
    items: [{ text: "___ students?", bucket: "how many" }, { text: "___ bottles?", bucket: "how many" }, { text: "___ pieces of cake?", bucket: "how many" }, { text: "___ water?", bucket: "how much" }, { text: "___ money?", bucket: "how much" }, { text: "`___ is this?` (giá)", bucket: "how much" }],
    gridPrompts: ["Chọn `how many` hoặc `how much` cho từng danh từ.", "Chọn dạng đơn vị đúng cho từng lượng.", "Chọn câu hỏi hoàn chỉnh đúng cho từng tình huống."],
    gridRows: [
      { cue: "___ apples", options: ["how many", "how much", "how many of"], answer: "how many", completed: "How many apples?" },
      { cue: "___ rice", options: ["how much", "how many", "how much of"], answer: "how much", completed: "How much rice?" },
      { cue: "___ people", options: ["how many", "how much", "how many of"], answer: "how many", completed: "How many people?" },
      { cue: "one ___ of tea", options: ["cup", "cups", "tea"], answer: "cup", completed: "one cup of tea" },
      { cue: "three ___ of tea", options: ["cups", "cup", "teas"], answer: "cups", completed: "three cups of tea" },
      { cue: "two ___ of information", options: ["pieces", "piece", "informations"], answer: "pieces", completed: "two pieces of information" },
      { cue: "hỏi số quyển sách", options: ["How many books do you have?", "How much books do you have?", "How many book do you have?"], answer: "How many books do you have?", completed: "How many books do you have?" },
      { cue: "hỏi lượng thời gian", options: ["How much time do we have?", "How many time do we have?", "How much times do we have?"], answer: "How much time do we have?", completed: "How much time do we have?" },
      { cue: "hỏi giá đôi giày", options: ["How much are these shoes?", "How many are these shoes?", "How much is these shoes?"], answer: "How much are these shoes?", completed: "How much are these shoes?" },
    ],
  }),
};

/**
 * Hoạt động bổ sung cho hai nhánh dễ nhầm mà bộ khung chưa kiểm tra đủ:
 * `a lot of` trong câu hỏi, câu phủ định và `too many` khác `very many`;
 * đếm đơn vị bằng `how many` và giữ nguyên danh từ không đếm được sau `of`.
 */
const a1Chapter07TopUps: Partial<Record<string, Exercise[]>> = {
  "quantity-basic": [
    {
      id: "a1qbx1", kind: "choice", prompt: "Câu nào hỏi “Bạn có nhiều bạn không?” một cách đúng?",
      options: ["Do you have a lot of friends?", "Do you have a lot friends?", "Do you have much friends?"],
      answer: "Do you have a lot of friends?",
      hint: "`Friends` là danh từ đếm được số nhiều; kiểm tra thêm cụm chỉ lượng đứng trước nó đã đủ từ chưa.",
      explanation: "`A lot of` cũng đúng trong câu hỏi; không bỏ `of`, và `friends` đếm được số nhiều nên không đi với `much`.",
    },
    {
      id: "a1qbx2", kind: "choice", prompt: "Câu phủ định nào nói đúng “Họ không có nhiều tiền”?",
      options: ["They don't have a lot of money.", "They don't have many money.", "They don't have a lot money."],
      answer: "They don't have a lot of money.",
      hint: "`Money` là danh từ không đếm được; cụm chỉ lượng đứng trước nó phải đủ từ.",
      explanation: "`A lot of` cũng đúng trong câu phủ định; `money` không đếm được nên không đi với `many`, và `a lot` cần `of` trước danh từ.",
    },
    {
      id: "a1qbx3", kind: "context", prompt: "Chọn câu nói đúng điều đang xảy ra.",
      context: "Lớp học chỉ có ba mươi chỗ ngồi nhưng có bốn mươi học sinh, nên lớp quá đông.",
      options: ["There are too many students in the class.", "There are very many students in the class.", "There are too much students in the class."],
      answer: "There are too many students in the class.",
      hint: "Tình huống nói số học sinh vượt mức và gây vấn đề, không chỉ nói số học sinh lớn.",
      explanation: "`Too many` nói số lượng vượt mức cần hoặc mong muốn; `very many` chỉ nhấn mạnh số lượng lớn, còn `students` đếm được nên không đi với `much`.",
    },
  ],
  "how-much-many": [
    {
      id: "a1hmx1", kind: "choice", prompt: "Bạn muốn biết cần mua mấy chai sữa. Câu nào phù hợp?",
      options: ["How many bottles of milk do we need?", "How much bottles of milk do we need?", "How many milk do we need?"],
      answer: "How many bottles of milk do we need?",
      hint: "Thứ được đếm ở đây là cái chai, không phải sữa.",
      explanation: "Ta đếm `bottles`, một danh từ đếm được, nên dùng `how many`; `milk` sau `of` vẫn không đếm được và giữ nguyên.",
    },
    {
      id: "a1hmx2", kind: "order", prompt: "Sắp xếp câu hỏi “Chúng ta cần bao nhiêu ki-lô-gam gạo?”",
      tokens: ["kilos", "How", "rice", "of", "many", "we", "need", "do", "?"],
      answer: ["How", "many", "kilos", "of", "rice", "do", "we", "need", "?"],
      hint: "Đặt cụm hỏi cùng đơn vị được đếm lên đầu, rồi đến `do` và chủ ngữ.",
      explanation: "Ta đếm `kilos`, nên dùng `how many`; `rice` đứng sau `of` và giữ nguyên.",
    },
    {
      id: "a1hmx3", kind: "repair", prompt: "Sửa danh từ đứng sau `of`.",
      tokens: ["I", "drink", "two", "cups", "of", "teas", "every", "day", "."], targetIndex: 5,
      replacements: ["tea", "teas", "a tea"], answer: "tea",
      hint: "Từ chỉ đơn vị đã mang số nhiều; danh từ chỉ chất sau `of` là danh từ không đếm được.",
      explanation: "`Cups` đã cho biết có hai đơn vị; `tea` sau `of` không đếm được nên giữ nguyên: `two cups of tea`.",
    },
  ],
};

export const a1Chapter07ExerciseData = mergeExerciseRecords(
  a1Chapter07BaseExerciseData,
  a1Chapter07TopUps,
);
