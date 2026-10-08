/* Luyện tập B1 — Chương 29: Xác nhận, đồng tình và câu đáp rút gọn. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";
import { b1DepthPack } from "../../b1-depth-builders.ts";

const b1Chapter29BaseExerciseData: Record<string, Exercise[]> = {
  "b1-question-tags": b1PracticeSet("b1qta", "question tags", [
    ["đuôi sau câu `Lan is here`", "Lan is here, isn't she?", "Lan is here, is she?", "Minh is tired, isn't he?", "Câu khẳng định thường nhận đuôi phủ định."],
    ["đuôi sau câu phủ định", "You don't know Minh, do you?", "You don't know Minh, don't you?", "They aren't ready, are they?", "Câu phủ định nhận đuôi khẳng định."],
    ["đuôi hiện tại đơn với Mai", "Mai likes coffee, doesn't she?", "Mai likes coffee, isn't she?", "Nam works here, doesn't he?", "Động từ thường hiện tại đơn dùng `does`."],
    ["đuôi quá khứ đơn", "They left early, didn't they?", "They left early, weren't they?", "Lan called, didn't she?", "Quá khứ đơn dùng `did`."],
    ["đuôi với modal", "Lan can swim, can't she?", "Lan can swim, doesn't she?", "You will come, won't you?", "Lặp đúng modal trong đuôi."],
    ["đuôi hiện tại hoàn thành", "You haven't finished, have you?", "You haven't finished, did you?", "Mai has left, hasn't she?", "Lặp `have/has` của thì hoàn thành."],
    ["đuôi với `I am`", "I'm next, aren't I?", "I'm next, amn't I?", "I'm not late, am I?", "Dạng phủ định thông dụng sau `I am` là `aren't I`."],
    ["đuôi với `there is`", "There's a problem, isn't there?", "There's a problem, isn't it?", "There were two errors, weren't there?", "Giữ `there` trong đuôi."],
    ["đuôi sau `never`", "Lan never complains, does she?", "Lan never complains, doesn't she?", "He hardly speaks, does he?", "Từ mang nghĩa phủ định cần đuôi khẳng định."],
    ["đuôi sau `nobody`", "Nobody called, did they?", "Nobody called, didn't he?", "Everybody is ready, aren't they?", "Đại từ đuôi hiện đại thường là `they`."],
    ["đuôi của `Let's`", "Let's take a break, shall we?", "Let's take a break, will we?", "Let's start now, shall we?", "`Let's` dùng mẫu cố định `shall we`."],
    ["đuôi với mệnh lệnh", "Open the window, will you?", "Open the window, don't you?", "Don't be late, will you?", "Mệnh lệnh thường dùng đuôi `will you`."],
  ]),
  "b1-so-neither-short-responses": b1PracticeSet("b1snr", "so/neither/nor và câu đáp rút gọn", [
    ["đồng tình với `Lan is tired`", "So am I.", "So do I.", "I am too.", "Lặp đúng dạng `be` và đảo trước chủ ngữ."],
    ["đồng tình với hiện tại đơn", "So does Minh.", "So is Minh.", "Nam does too.", "Hiện tại đơn cần `do/does`."],
    ["đồng tình với quá khứ đơn", "So did we.", "So were we.", "They did too.", "Quá khứ đơn dùng `did`."],
    ["đồng tình với modal", "So can her brother.", "So does her brother can.", "Her sister can too.", "Lặp modal `can`."],
    ["đồng tình phủ định với `be`", "Neither am I.", "Neither do I.", "I'm not either.", "Câu phủ định có `be` dùng `neither + be + subject`."],
    ["đồng tình phủ định hiện tại đơn", "Neither does Nam.", "Neither is Nam.", "Nam doesn't either.", "Lặp trợ động từ `does`."],
    ["đồng tình phủ định quá khứ", "Nor did we.", "Nor were we did.", "We didn't either.", "`Nor/neither + did + subject`."],
    ["dùng `either` cuối câu phủ định", "Nam doesn't either.", "Nam doesn't too.", "I haven't either.", "`Either` đi cuối một câu phủ định."],
    ["đồng tình hiện tại hoàn thành", "So has Lan.", "So does Lan have.", "Mai has too.", "Lặp trợ động từ `has`."],
    ["trả lời rút gọn cho `Who has finished?`", "I have.", "I do have finished.", "Lan has.", "Trợ động từ thay phần vị ngữ đã rõ."],
    ["xác nhận Lan đã làm điều cô nói", "Lan said she would call, and she did.", "Lan said she would call, and she was.", "Mai promised to help, and she did.", "`Did` thay động từ hành động đã nhắc."],
    ["thay cả mệnh đề bằng `so`", "I think so.", "I think it so is.", "I hope so.", "`So` có thể thay một mệnh đề sau `think/hope`."],
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
