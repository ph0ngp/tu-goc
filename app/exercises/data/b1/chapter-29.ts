/* Luyện tập B1 — Chương 29: Xác nhận, đồng tình và câu đáp rút gọn. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";
import { b1DepthPack } from "../../b1-depth-builders.ts";

const b1Chapter29BaseExerciseData: Record<string, Exercise[]> = {
  "b1-question-tags": b1PracticeSet("b1qta", "question tags", [
    ["xác nhận một câu khẳng định với `is` có chủ ngữ chỉ người", "Lan is here, isn't she?", "Lan is here, isn't Lan?", "Minh is tired, isn't he?", "Đuôi lặp `is` ở dạng phủ định và dùng đại từ `he/she` thay cho tên người."],
    ["xác nhận một câu kể phủ định có `don't` hoặc `aren't`", "You don't know Minh, do you?", "You don't know Minh, don't you?", "They aren't ready, are they?", "Câu có `don't/aren't` là câu phủ định, nên đuôi khẳng định lặp lại `do/are`."],
    ["xác nhận một sở thích hoặc công việc thường ngày ở hiện tại đơn", "Mai likes coffee, doesn't she?", "Mai likes coffee, isn't she?", "Nam works here, doesn't he?", "Câu khẳng định ở hiện tại đơn với động từ thường dùng `doesn't` trong đuôi khi chủ ngữ là ngôi thứ ba số ít."],
    ["xác nhận một việc ai đó đã làm ở quá khứ đơn", "They left early, didn't they?", "They left early, weren't they?", "Lan called, didn't she?", "Câu khẳng định ở quá khứ đơn với động từ thường dùng `didn't` trong đuôi."],
    ["xác nhận một câu kể có modal `can` hoặc `will`", "Lan can swim, can't she?", "Lan can swim, doesn't she?", "You will come, won't you?", "Câu kể có `can/will` lặp lại đúng modal đó ở dạng phủ định trong đuôi."],
    ["xác nhận một câu ở thì hiện tại hoàn thành", "You haven't finished, have you?", "You haven't finished, did you?", "Nam has finished his homework, hasn't he?", "Đuôi lặp `have/has` của thì hiện tại hoàn thành."],
    ["xác nhận một câu khẳng định với `I am`", "I'm next, aren't I?", "I'm next, am not I?", "I'm in the right room, aren't I?", "Sau câu khẳng định với `I am`, đuôi phủ định thông dụng là `aren't I`."],
    ["xác nhận một câu bắt đầu bằng `there` và một dạng của `be`", "There's a problem, isn't there?", "There's a problem, isn't it?", "There were two errors, weren't there?", "Với `there is/are/was/were`, đuôi giữ `there` làm chủ ngữ."],
    ["xác nhận một câu có `never`", "Lan never complains, does she?", "Lan never complains, doesn't she?", "She never eats meat, does she?", "`Never` làm câu mang nghĩa phủ định nên đuôi dùng dạng khẳng định."],
    ["xác nhận một câu có chủ ngữ `nobody`", "Nobody was late, were they?", "Nobody was late, weren't they?", "Nobody saw us, did they?", "`Nobody` làm câu mang nghĩa phủ định nên đuôi khẳng định, và đại từ trong đuôi thường là `they`."],
    ["dùng câu hỏi đuôi sau lời rủ bắt đầu bằng `Let's`", "Let's take a break, shall we?", "Let's take a break, will we?", "Let's go for a walk, shall we?", "`Let's` đi với đuôi cố định `shall we`."],
    ["dùng câu hỏi đuôi sau một câu mệnh lệnh", "Open the window, will you?", "Open the window, don't you?", "Don't be late, will you?", "Câu mệnh lệnh thường dùng đuôi `will you`."],
  ]),
  "b1-so-neither-short-responses": b1PracticeSet("b1snr", "so/neither/nor và câu đáp rút gọn", [
    ["đồng tình với câu `Lan is tired`", "So am I.", "So do I.", "I am too.", "Câu gốc có `be`, nên lời đồng tình lặp `be`: `so + be + chủ ngữ` hoặc `chủ ngữ + be + too`."],
    ["đồng tình với câu `I like jazz` bằng cách nói về một người khác", "So does Minh.", "So is Minh.", "Nam does too.", "Câu gốc ở hiện tại đơn với động từ thường, nên lời đáp dùng `does` cho chủ ngữ số ít."],
    ["đồng tình với câu `Mai can swim` bằng cách nói về anh chị em của Mai", "So can her brother.", "So does her brother.", "Her sister can too.", "Câu gốc có modal `can`, nên lời đáp lặp lại `can`."],
    ["đồng tình với câu `Lan went home early`", "So did we.", "So were we.", "Minh did too.", "Câu gốc ở quá khứ đơn với động từ thường, nên lời đáp dùng `did`."],
    ["đồng tình với câu `Lan isn't tired`", "Neither am I.", "Neither do I.", "I'm not either.", "Câu gốc phủ định với `be`, nên lời đáp lặp `be`: `neither + be + chủ ngữ` hoặc `chủ ngữ + be + not + either`."],
    ["đồng tình với câu `I don't eat meat` bằng cách nói về một người khác", "Neither does Nam.", "Neither is Nam.", "My sister doesn't either.", "Câu gốc phủ định ở hiện tại đơn, nên lời đáp dùng `does` cho chủ ngữ số ít."],
    ["đồng tình với câu `They didn't complain`", "Nor did we.", "Nor were we.", "We didn't either.", "Câu gốc phủ định ở quá khứ đơn, nên lời đáp dùng `did`: `nor/neither + did + chủ ngữ` hoặc `chủ ngữ + didn't + either`."],
    ["đồng tình với câu `She hasn't finished`", "I haven't either.", "I haven't too.", "Neither have I.", "Lời đáp phủ định lặp `have`, rồi dùng `either` ở cuối câu hoặc `neither` ở đầu câu."],
    ["đồng tình với câu `I've seen the film` bằng cách nói về một người khác", "So has Lan.", "So does Lan.", "Mai has too.", "Câu gốc ở hiện tại hoàn thành, nên lời đáp lặp trợ động từ `has`."],
    ["trả lời ngắn câu hỏi `Who has finished`", "I have.", "I do.", "Lan has.", "Câu hỏi dùng `has`, nên câu trả lời ngắn lặp trợ động từ `have/has` thay cho cả vị ngữ."],
    ["xác nhận một người đã thật sự làm điều họ nói hoặc hứa", "Lan said she would call, and she did.", "Lan said she would call, and she was.", "Mai promised to help, and she did.", "`Did` thay cho cả cụm động từ đã nhắc trước đó để tránh lặp."],
    ["trả lời rằng mình nghĩ hoặc hy vọng là có mà không lặp lại cả mệnh đề", "I think so.", "I think yes.", "I hope so.", "Sau `think/hope`, `so` thay cho cả mệnh đề đã được nhắc tới."],
  ]),
};

const b1Chapter29DepthExerciseData: Partial<Record<string, Exercise[]>> = {
  "b1-question-tags": [
    ...b1DepthPack("b1qtx", "trợ động từ và cực tính của câu hỏi đuôi", [
      { cue: "Câu chính khẳng định với hiện tại hoàn thành.", options: ["Mai has left, hasn't she?", "Mai has left, doesn't she?"], answer: "Mai has left, hasn't she?", completed: "Mai has left, hasn't she?" },
      { cue: "Câu chính có `hardly`, mang nghĩa gần phủ định.", options: ["He hardly speaks, does he?", "He hardly speaks, doesn't he?"], answer: "He hardly speaks, does he?", completed: "He hardly speaks, does he?" },
      { cue: "Câu bắt đầu bằng `Let's`.", options: ["Let's begin, shall we?", "Let's begin, will we?"], answer: "Let's begin, shall we?", completed: "Let's begin, shall we?" },
    ], [
      ["Sắp xếp câu có đuôi hỏi sau `Nobody`.", "Nobody called, did they?", "Từ phủ định cần đuôi khẳng định; đại từ thường là `they`."],
    ]),
    {
      id: "b1qtxi1", kind: "grid", prompt: "Ngữ điệu của mỗi câu hỏi đuôi cho thấy người nói chắc đến mức nào?", rows: [
        { cue: "Lan is here, isn't she? ↗", options: ["Người nói chưa chắc và thật sự muốn kiểm tra.", "Người nói khá chắc và chủ yếu chờ người nghe đồng tình."], answer: "Người nói chưa chắc và thật sự muốn kiểm tra.", completed: "Lan is here, isn't she? ↗ — Người nói chưa chắc và thật sự muốn kiểm tra." },
        { cue: "Lan is here, isn't she? ↘", options: ["Người nói chưa chắc và thật sự muốn kiểm tra.", "Người nói khá chắc và chủ yếu chờ người nghe đồng tình."], answer: "Người nói khá chắc và chủ yếu chờ người nghe đồng tình.", completed: "Lan is here, isn't she? ↘ — Người nói khá chắc và chủ yếu chờ người nghe đồng tình." },
      ],
      hint: "Mũi tên đi lên gần với một câu hỏi thật; mũi tên đi xuống gần với lời xác nhận.",
      explanation: "Ngữ điệu đi lên thường cho thấy người nói thật sự chưa chắc. Ngữ điệu đi xuống thường cho thấy người nói đã khá chắc và muốn người nghe xác nhận.",
    },
    {
      id: "b1qtxa1", kind: "choice", prompt: "Một người hỏi `You don't work here, do you?`; nếu bạn thật sự làm việc ở đây, bạn trả lời thế nào?", options: ["Yes, I do.", "No, I do.", "Yes, I don't."], answer: "Yes, I do.",
      hint: "Câu trả lời phải theo sự thật của bạn, không theo hình thức phủ định của câu hỏi.",
      explanation: "`Yes, I do` xác nhận sự thật rằng bạn có làm việc ở đây. Trong tiếng Anh, `yes` đi với mệnh đề khẳng định.",
    },
    {
      id: "b1qtxa2", kind: "choice", prompt: "Một người hỏi `You don't work here, do you?`; nếu bạn thật sự không làm việc ở đây, bạn trả lời thế nào?", options: ["No, I don't.", "Yes, I don't.", "No, I do."], answer: "No, I don't.",
      hint: "Hãy trả lời theo sự thật rằng bạn không làm việc ở đây.",
      explanation: "`No, I don't` xác nhận sự thật phủ định. Trong tiếng Anh, `no` đi với mệnh đề phủ định.",
    },
  ],
  "b1-so-neither-short-responses": [
    {
      id: "b1snrx1", kind: "choice", prompt: "Mai hỏi `Is Lan coming?`; bạn nghĩ Lan sẽ không đến nhưng không hoàn toàn chắc, câu đáp nào tự nhiên?", options: ["I don't think so.", "I think not so.", "I don't think it so."], answer: "I don't think so.",
      hint: "Sau `think`, `so` có thể thay cả mệnh đề đã được nhắc đến.",
      explanation: "`I don't think so` là cách tự nhiên để nói “Tôi nghĩ là không” mà không lặp lại cả mệnh đề `Lan is coming`.",
    },
    {
      id: "b1snrx2", kind: "choice", prompt: "Có người hỏi `Will it rain during the picnic?`; bạn mong điều đó không xảy ra, câu đáp nào phù hợp?", options: ["I hope not.", "I don't hope so.", "I hope no."], answer: "I hope not.",
      hint: "Sau `hope`, dạng phủ định rút gọn thường dùng `not`.",
      explanation: "`I hope not` thay cho “I hope it will not rain”. Với `hope`, dạng phủ định rút gọn tự nhiên là `hope not`.",
    },
    {
      id: "b1snrx3", kind: "choice", prompt: "Lan nói `I love jazz`, còn bạn thích nhạc cổ điển hơn; câu đáp nào diễn đạt đúng mà không giả vờ đồng tình cùng một nội dung?", options: ["Really? I prefer classical music.", "So do I.", "Neither do I."], answer: "Really? I prefer classical music.",
      hint: "`So do I` chỉ dùng khi bạn cũng yêu thích nhạc jazz như Lan.",
      explanation: "Ý của hai người khác nhau nên không dùng `so` hoặc `neither` để đồng tình. Câu đáp trực tiếp nêu sở thích khác là phù hợp.",
    },
  ],
};

export const b1Chapter29ExerciseData = mergeExerciseRecords(
  b1Chapter29BaseExerciseData,
  b1Chapter29DepthExerciseData,
);
