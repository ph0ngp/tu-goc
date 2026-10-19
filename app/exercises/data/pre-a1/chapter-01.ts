/* Luyện tập PRE-A1 — Chương 1: Câu tiếng Anh được tạo ra thế nào. */
import type { Exercise } from "../../../exercise-types.ts";
import { choiceExercises, contextExercises, orderExercises, repairExercises, tapExercises } from "../../basic-builders.ts";

export const preA1Chapter01ExerciseData: Record<string, Exercise[]> = {
  "language-units": [
    {
      "id": "lu1",
      "kind": "match",
      "prompt": "Ghép mỗi tên tiếng Việt với tên tiếng Anh tương ứng.",
      "hint": "Đọc lại bảng bốn đơn vị ở đầu bài.",
      "explanation": "word là từ; phrase là cụm từ; clause là mệnh đề; sentence là câu.",
      "pairs": [
        {
          "left": "từ",
          "right": "word"
        },
        {
          "left": "cụm từ",
          "right": "phrase"
        },
        {
          "left": "mệnh đề",
          "right": "clause"
        },
        {
          "left": "câu",
          "right": "sentence"
        }
      ]
    },
    {
      "id": "lu2",
      "kind": "sort",
      "prompt": "Chọn đơn vị lớn nhất đang được trình bày trong mỗi ví dụ.",
      "hint": "Câu viết hoàn chỉnh bắt đầu bằng chữ hoa và có dấu cuối; mệnh đề đã nói về một đối tượng và cho biết điều gì đó về đối tượng ấy.",
      "explanation": "Bốn ví dụ thể hiện lần lượt từ, cụm từ, mệnh đề và câu.",
      "buckets": [
        "Từ",
        "Cụm từ",
        "Mệnh đề",
        "Câu"
      ],
      "items": [
        {
          "text": "sleep",
          "bucket": "Từ"
        },
        {
          "text": "under the table",
          "bucket": "Cụm từ"
        },
        {
          "text": "the small cat sleeps",
          "bucket": "Mệnh đề"
        },
        {
          "text": "The cat sleeps.",
          "bucket": "Câu"
        }
      ]
    },
    {
      "id": "lu3",
      "kind": "choice",
      "prompt": "Ví dụ nào gồm nhiều từ cùng hoạt động như một khối nhưng chưa truyền đạt một thông điệp hoàn chỉnh?",
      "hint": "Cụm này cùng gọi một quyển sách nhưng chưa nói điều gì về quyển sách.",
      "explanation": "a small book, nghĩa là “một quyển sách nhỏ”, là một cụm từ.",
      "options": [
        "book",
        "a small book",
        "The cat sleeps."
      ],
      "answer": "a small book"
    },
    {
      "id": "lu4",
      "kind": "choice",
      "prompt": "Ví dụ nào đã có phần được nói tới và phần nói về nó, nhưng chưa được viết thành một câu hoàn chỉnh?",
      "hint": "Nhóm từ này đã cho biết con mèo nhỏ ngủ, nhưng chưa có hình thức của một câu viết hoàn chỉnh.",
      "explanation": "the small cat sleeps, nghĩa là “con mèo nhỏ ngủ”, là một mệnh đề; phiên bản có chữ hoa và dấu chấm là một câu viết hoàn chỉnh.",
      "options": [
        "the small cat",
        "the small cat sleeps",
        "The small cat sleeps."
      ],
      "answer": "the small cat sleeps"
    },
    {
      "id": "lu5",
      "kind": "context",
      "prompt": "Cách viết nào là một câu hoàn chỉnh?",
      "hint": "Câu viết hoàn chỉnh cần chữ hoa và dấu kết thúc.",
      "explanation": "The cat sleeps. nghĩa là “Con mèo ngủ” và là một câu hoàn chỉnh trong phạm vi bài.",
      "context": "Bạn muốn viết một thông điệp trọn vẹn có nghĩa “Con mèo ngủ”.",
      "options": [
        "the cat",
        "the cat sleeps",
        "The cat sleeps."
      ],
      "answer": "The cat sleeps."
    },
    {
      "id": "lu6",
      "kind": "grid",
      "prompt": "Chọn tên đơn vị phù hợp cho `book`, `under the table` và `The small cat sleeps.`.",
      "hint": "Nhìn một mảnh riêng, một nhóm cùng làm việc và một thông điệp hoàn chỉnh.",
      "explanation": "Ba ví dụ lần lượt là từ, cụm từ và câu.",
      "rows": [
        {
          "cue": "book",
          "options": [
            "từ",
            "cụm từ",
            "câu"
          ],
          "answer": "từ",
          "completed": "book"
        },
        {
          "cue": "under the table",
          "options": [
            "từ",
            "cụm từ",
            "mệnh đề"
          ],
          "answer": "cụm từ",
          "completed": "under the table"
        },
        {
          "cue": "The small cat sleeps.",
          "options": [
            "cụm từ",
            "mệnh đề chưa thành câu",
            "câu"
          ],
          "answer": "câu",
          "completed": "The small cat sleeps."
        }
      ]
    },
    ...choiceExercises("lu", 7, [
      ["Dấu chấm trong `The cat sleeps.` là gì?", ["một từ", "một dấu câu", "một cụm từ"], "một dấu câu", "Dấu chấm giúp kết thúc câu nhưng không phải là một từ.", "Dấu chấm là dấu câu; ba từ là The, cat và sleeps."],
      ["`teacher`, nghĩa là “giáo viên”, là đơn vị nào?", ["từ", "cụm từ", "câu"], "từ", "Ví dụ chỉ có một mảnh riêng.", "`Teacher` là một từ riêng lẻ gọi tên nghề nghiệp; nó chưa tạo thành cụm từ hay câu."],
      ["`a new book`, nghĩa là “một quyển sách mới”, là đơn vị nào?", ["từ", "cụm từ", "câu"], "cụm từ", "Nhiều từ đang cùng gọi một vật.", "a new book là một cụm từ."],
      ["`Lan reads`, nghĩa là “Lan đọc”, là đơn vị nào trong bài này?", ["cụm từ", "mệnh đề", "câu viết hoàn chỉnh"], "mệnh đề", "Nhóm từ đã có phần nêu Lan và phần nói Lan đọc, nhưng chưa có dấu cuối.", "Lan reads là một mệnh đề chưa được trình bày thành câu viết hoàn chỉnh."],
      ["`Birds fly.` nghĩa là “Chim bay” và là đơn vị nào?", ["cụm từ", "mệnh đề chưa thành câu", "câu"], "câu", "Ví dụ bắt đầu bằng chữ hoa, có dấu cuối và truyền đạt một thông điệp.", "Birds fly. là một câu."],
      ["`a red ball`, nghĩa là “một quả bóng đỏ”, là gì?", ["một từ", "một cụm từ", "một câu"], "một cụm từ", "Các từ đi cùng nhau như một khối nhưng chưa tạo thành thông điệp hoàn chỉnh.", "a red ball là một cụm từ."],
      ["Ví dụ nào đã có phần được nói tới và phần nói về nó?", ["the cat", "the cat sleeps", "a small book"], "the cat sleeps", "Tìm ví dụ vừa nêu con mèo vừa cho biết nó ngủ.", "the cat sleeps có hai phần cốt lõi nên là một mệnh đề."],
      ["Đặc điểm nào giúp nhận ra một câu viết hoàn chỉnh trong phạm vi bài?", ["chỉ có nhiều từ", "bắt đầu bằng chữ hoa và có dấu cuối", "luôn có đúng ba từ"], "bắt đầu bằng chữ hoa và có dấu cuối", "Hãy nhìn hình thức của The cat sleeps.", "Câu viết hoàn chỉnh trong bài bắt đầu bằng chữ hoa và có dấu kết thúc."],
      ["Trong `We read.`, nghĩa là “Chúng tôi đọc”, có bao nhiêu từ?", ["hai từ", "ba từ", "bốn từ"], "hai từ", "Dấu chấm không được tính là một từ.", "We và read là hai từ; dấu chấm là dấu câu."],
      ["Nhận xét nào đúng về quan hệ giữa từ, cụm từ và mệnh đề?", ["Cụm từ có thể nằm trong một mệnh đề", "Mọi từ đều là một câu", "Mọi cụm từ đều truyền đạt thông điệp hoàn chỉnh"], "Cụm từ có thể nằm trong một mệnh đề", "the cat là một cụm từ nằm trong the cat sleeps.", "Một cụm từ có thể là một phần của mệnh đề lớn hơn."],
    ]),
    ...contextExercises("lu", 17, [
      ["Bạn chỉ nhìn thấy mảnh `happy`, nghĩa là “vui”.", "Mảnh này là từ, cụm từ hay câu?", ["từ", "cụm từ", "câu"], "từ", "Chỉ có một mảnh riêng.", "`Happy` chỉ là một từ riêng lẻ; nó chưa kết hợp với từ khác để tạo cụm từ hay câu."],
      ["Bạn nhìn thấy `a kind teacher`, nghĩa là “một giáo viên tốt bụng”, nhưng chưa có thông tin người ấy làm gì.", "Nhóm này là từ, cụm từ hay câu?", ["từ", "cụm từ", "câu"], "cụm từ", "Nhóm từ cùng gọi một người.", "a kind teacher là một cụm từ."],
      ["Bạn muốn viết trọn vẹn thông điệp “Chúng tôi đọc”.", "Cách viết nào là một câu?", ["we", "we read", "We read."], "We read.", "Câu viết cần chữ hoa và dấu kết thúc.", "We read. là câu hoàn chỉnh."],
    ]),
    ...repairExercises("lu", 20, [
      ["Chọn tên đơn vị phù hợp cho `the baby sleeps`, nghĩa là “em bé ngủ”.", ["the baby sleeps", "=", "câu"], 2, ["từ", "cụm từ", "mệnh đề", "câu"], "mệnh đề", "Ví dụ chưa được viết hoa và chưa có dấu cuối.", "the baby sleeps là một mệnh đề trong phạm vi bài."],
      ["Chọn tên đơn vị phù hợp cho `under the table`.", ["under the table", "=", "từ"], 2, ["từ", "cụm từ", "mệnh đề"], "cụm từ", "Nhiều từ đang cùng hoạt động như một khối.", "under the table, nghĩa là “ở dưới cái bàn”, là một cụm từ."],
    ]),
    ...orderExercises("lu", 22, [
      ["Xếp bốn đơn vị từ nhỏ đến lớn.", ["câu", "từ", "mệnh đề", "cụm từ"], ["từ", "cụm từ", "mệnh đề", "câu"], "Bắt đầu từ một mảnh riêng rồi tăng dần.", "Thứ tự là từ → cụm từ → mệnh đề → câu."],
      ["Sắp xếp thành câu “Lan đọc”.", [".", "reads", "Lan"], ["Lan", "reads", "."], "Chữ hoa đứng đầu và dấu chấm đứng cuối.", "Lan reads. là câu hoàn chỉnh."],
    ]),
    ...tapExercises("lu", 24, [
      ["Trong câu `Birds fly.`, nghĩa là “Chim bay”, chọn tất cả các từ và không chọn dấu câu.", ["Birds", "fly", "."], [0, 1], "Dấu chấm không phải là một từ.", "Birds và fly là hai từ."],
      ["Trong `Lan reads a new book`, chọn toàn bộ cụm từ có nghĩa là “một quyển sách mới”.", ["Lan", "reads", "a", "new", "book"], [2, 3, 4], "Cụm gọi quyển sách bắt đầu bằng a và kết thúc bằng book.", "a new book là cả cụm từ được yêu cầu."],
    ])
  ],
  "word-jobs": [
    {
      "id": "wj1",
      "kind": "match",
      "prompt": "Ghép mỗi từ với loại từ phù hợp.",
      "hint": "Hỏi lần lượt: gọi tên, thay cho tên, nói hành động hay miêu tả?",
      "explanation": "Nam gọi tên; they thay cho tên; help nói hành động; red miêu tả.",
      "pairs": [
        {
          "left": "Nam",
          "right": "danh từ"
        },
        {
          "left": "they",
          "right": "đại từ"
        },
        {
          "left": "help",
          "right": "động từ"
        },
        {
          "left": "red",
          "right": "tính từ"
        }
      ]
    },
    {
      "id": "wj2",
      "kind": "sort",
      "prompt": "Phân loại mỗi từ vào nhóm danh từ, đại từ, động từ hoặc tính từ.",
      "hint": "Hỏi lần lượt: gọi tên, thay cho tên, nói hành động hay miêu tả?",
      "explanation": "Tám từ đã được phân loại theo bốn công việc cơ bản.",
      "buckets": [
        "Danh từ",
        "Đại từ",
        "Động từ",
        "Tính từ"
      ],
      "items": [
        {
          "text": "book",
          "bucket": "Danh từ"
        },
        {
          "text": "teacher",
          "bucket": "Danh từ"
        },
        {
          "text": "she",
          "bucket": "Đại từ"
        },
        {
          "text": "they",
          "bucket": "Đại từ"
        },
        {
          "text": "run",
          "bucket": "Động từ"
        },
        {
          "text": "sleep",
          "bucket": "Động từ"
        },
        {
          "text": "small",
          "bucket": "Tính từ"
        },
        {
          "text": "kind",
          "bucket": "Tính từ"
        }
      ]
    },
    {
      "id": "wj3",
      "kind": "choice",
      "prompt": "Từ nào gọi tên một đồ vật?",
      "hint": "book nghĩa là quyển sách.",
      "explanation": "book là danh từ vì gọi tên một đồ vật.",
      "options": [
        "book",
        "read",
        "happy"
      ],
      "answer": "book"
    },
    {
      "id": "wj4",
      "kind": "choice",
      "prompt": "Từ nào có thể thay cho Lan sau khi tên Lan đã được nhắc đến?",
      "hint": "Lan là một người nữ trong tình huống này.",
      "explanation": "she là đại từ có thể thay cho Lan.",
      "options": [
        "she",
        "sleep",
        "small"
      ],
      "answer": "she"
    },
    {
      "id": "wj5",
      "kind": "context",
      "prompt": "Từ nào có nghĩa là “vui” và dùng để miêu tả?",
      "hint": "Tìm từ cho biết một người hoặc vật như thế nào.",
      "explanation": "happy là tính từ nghĩa là vui.",
      "context": "Bạn muốn nói đến đặc điểm “vui”, chưa cần tạo cả câu.",
      "options": [
        "happy",
        "read",
        "book"
      ],
      "answer": "happy"
    },
    {
      "id": "wj6",
      "kind": "grid",
      "prompt": "Chọn đúng loại từ của phần được hỏi trong mỗi ví dụ.",
      "hint": "Đừng chỉ nhìn từ; hãy xem nó đang giúp phần nào của ý nghĩa.",
      "explanation": "Ba từ lần lượt gọi tên, nói hành động và miêu tả.",
      "rows": [
        {
          "cue": "teacher trong The teacher reads.",
          "options": [
            "danh từ",
            "động từ",
            "tính từ"
          ],
          "answer": "danh từ",
          "completed": "The teacher reads."
        },
        {
          "cue": "run trong They run.",
          "options": [
            "đại từ",
            "động từ",
            "tính từ"
          ],
          "answer": "động từ",
          "completed": "They run."
        },
        {
          "cue": "kind trong a kind teacher",
          "options": [
            "danh từ",
            "đại từ",
            "tính từ"
          ],
          "answer": "tính từ",
          "completed": "a kind teacher"
        }
      ]
    },
    ...choiceExercises("wj", 7, [
      ["Từ nào là danh từ chỉ nơi chốn?", ["school", "sleep", "small"], "school", "school nghĩa là trường học.", "school là danh từ vì gọi tên một nơi chốn."],
      ["Từ nào là đại từ?", ["they", "teacher", "kind"], "they", "Đại từ có thể thay cho tên hoặc cụm từ gọi tên.", "they là đại từ, thường nghĩa là họ hoặc chúng."],
      ["Từ nào là động từ?", ["help", "book", "red"], "help", "Tìm từ có nghĩa là “giúp”.", "help là động từ nói hành động giúp."],
      ["Từ nào là tính từ?", ["red", "read", "school"], "red", "Tìm từ miêu tả màu sắc.", "red là tính từ nghĩa là đỏ."],
      ["`school`, nghĩa là “trường học”, làm công việc gì?", ["gọi tên một nơi", "nói hành động", "miêu tả đặc điểm"], "gọi tên một nơi", "school là tên gọi của một nơi.", "school là danh từ dùng để gọi tên một nơi."],
      ["`they`, nghĩa là “họ” hoặc “chúng”, làm công việc gì?", ["gọi tên đồ vật", "thay cho tên", "nói hành động"], "thay cho tên", "they có thể thay cho một nhóm đã được nhắc đến.", "they là đại từ vì thay cho một nhóm người hoặc vật."],
      ["`help`, nghĩa là “giúp”, thuộc loại từ nào?", ["danh từ", "động từ", "tính từ"], "động từ", "Từ này cho biết một người làm gì.", "help là động từ trong các ví dụ của bài."],
      ["`red`, nghĩa là “đỏ”, thuộc loại từ nào?", ["đại từ", "động từ", "tính từ"], "tính từ", "Màu đỏ là một đặc điểm.", "red là tính từ miêu tả màu sắc."],
      ["`be`, thường mang nghĩa “là/thì/ở”, thuộc loại từ nào?", ["danh từ", "động từ", "tính từ"], "động từ", "Bài học đã báo trước đây là một động từ đặc biệt.", "be là động từ; cách dùng từng dạng sẽ được học sau."],
      ["Trong `We read.`, từ nào là đại từ?", ["We", "read", "."], "We", "Đại từ đang thay cho một nhóm có người nói.", "We là đại từ; read là động từ."],
    ]),
    ...contextExercises("wj", 17, [
      ["Bạn muốn chọn một từ có nghĩa là “tốt bụng”.", "Từ nào miêu tả đặc điểm ấy?", ["kind", "teacher", "help"], "kind", "Từ cần chọn phải miêu tả tính cách.", "kind là tính từ nghĩa là tốt bụng."],
      ["Bạn muốn chọn một từ có nghĩa là “chạy”.", "Từ nào nói hành động ấy?", ["run", "red", "school"], "run", "Tìm động từ đã xuất hiện trong bài.", "run là động từ nghĩa là chạy."],
      ["Bạn muốn gọi tên nơi học tập.", "Từ nào phù hợp?", ["school", "sleep", "small"], "school", "Từ cần chọn nghĩa là trường học.", "school là danh từ gọi tên một nơi chốn."],
    ]),
    ...repairExercises("wj", 20, [
      ["`teacher`, nghĩa là “giáo viên”, thuộc loại từ nào?", ["teacher", "=", "tính từ"], 2, ["danh từ", "đại từ", "động từ", "tính từ"], "danh từ", "teacher gọi tên một người.", "teacher là danh từ nghĩa là giáo viên."],
      ["`kind`, nghĩa là “tốt bụng”, thuộc loại từ nào?", ["kind", "=", "động từ"], 2, ["danh từ", "đại từ", "động từ", "tính từ"], "tính từ", "kind miêu tả tính cách.", "kind là tính từ nghĩa là tốt bụng."],
    ]),
    ...tapExercises("wj", 22, [
      ["Chọn danh từ trong cụm `red book`.", ["red", "book"], [1], "Từ cần chọn gọi tên đồ vật.", "book là danh từ; red là tính từ."],
      ["Chọn tính từ trong cụm `kind teacher`.", ["kind", "teacher"], [0], "Từ cần chọn miêu tả tính cách.", "`Kind` là tính từ vì nó miêu tả đặc điểm của người giáo viên."],
      ["Chọn động từ trong `Birds fly.`", ["Birds", "fly", "."], [1], "Tìm từ cho biết những con chim làm gì.", "fly là động từ nghĩa là bay."],
      ["Chọn đại từ trong `We help Nam.`", ["We", "help", "Nam", "."], [0], "Từ này thay cho một nhóm có người nói.", "We là đại từ chủ ngữ."],
    ])
  ],
  "subject-predicate": [
    {
      "id": "subp1",
      "kind": "match",
      "prompt": "Ghép mỗi câu với chủ ngữ của câu đó.",
      "hint": "Chủ ngữ thường đứng trước vị ngữ trong các câu này.",
      "explanation": "Mỗi câu đã được ghép với đúng chủ ngữ.",
      "pairs": [
        {
          "left": "Lan reads.",
          "right": "Lan"
        },
        {
          "left": "The cat sleeps.",
          "right": "The cat"
        },
        {
          "left": "They read.",
          "right": "They"
        }
      ]
    },
    {
      "id": "subp2",
      "kind": "sort",
      "prompt": "Phân loại mỗi phần thành chủ ngữ hoặc vị ngữ.",
      "hint": "Chủ ngữ là phần được nói tới; động từ và những từ đi sau nó tạo thành vị ngữ trong các câu này.",
      "explanation": "Birds/We là chủ ngữ; fly/help Nam là vị ngữ.",
      "buckets": [
        "Chủ ngữ",
        "Vị ngữ"
      ],
      "items": [
        {
          "text": "Birds",
          "bucket": "Chủ ngữ"
        },
        {
          "text": "fly",
          "bucket": "Vị ngữ"
        },
        {
          "text": "We",
          "bucket": "Chủ ngữ"
        },
        {
          "text": "help Nam",
          "bucket": "Vị ngữ"
        }
      ]
    },
    {
      "id": "subp3",
      "kind": "choice",
      "prompt": "Trong `The baby sleeps.`, câu đang nói về ai?",
      "hint": "Chủ ngữ thường đứng trước vị ngữ trong câu kể cơ bản này.",
      "explanation": "The baby là chủ ngữ vì câu đang nói về em bé.",
      "options": [
        "The baby",
        "sleeps",
        "The baby sleeps"
      ],
      "answer": "The baby"
    },
    {
      "id": "subp4",
      "kind": "tap",
      "prompt": "Trong câu dưới đây, chọn toàn bộ vị ngữ.",
      "hint": "Trong câu này, động từ và phần đi sau nó tạo thành vị ngữ.",
      "explanation": "read books là toàn bộ vị ngữ.",
      "tokens": [
        "They",
        "read",
        "books",
        "."
      ],
      "answerIndexes": [
        1,
        2
      ],
      "selectionMode": "multiple"
    },
    {
      "id": "subp5",
      "kind": "context",
      "prompt": "Cách viết nào là một câu kể đầy đủ có chủ ngữ rõ ràng?",
      "hint": "Câu kể cơ bản cần phần cho biết ai đọc và phần nói hành động.",
      "explanation": "I là chủ ngữ; read là vị ngữ.",
      "context": "Bạn muốn viết thông điệp “Tôi đọc”.",
      "options": [
        "I read.",
        "I",
        "read books"
      ],
      "answer": "I read."
    },
    {
      "id": "subp6",
      "kind": "grid",
      "prompt": "Chọn chủ ngữ hoặc vị ngữ được yêu cầu trong mỗi câu.",
      "hint": "Chủ ngữ là phần được nói tới; động từ và những từ đi sau nó tạo thành vị ngữ trong các câu này.",
      "explanation": "Ba lựa chọn xác định đúng chủ ngữ hoặc vị ngữ.",
      "rows": [
        {
          "cue": "Birds fly. → chủ ngữ",
          "options": [
            "Birds",
            "fly",
            "Birds fly"
          ],
          "answer": "Birds",
          "completed": "Birds fly."
        },
        {
          "cue": "Lan helps Nam. → vị ngữ",
          "options": [
            "Lan",
            "helps",
            "helps Nam"
          ],
          "answer": "helps Nam",
          "completed": "Lan helps Nam."
        },
        {
          "cue": "The small cat sleeps. → vị ngữ",
          "options": [
            "The small cat",
            "sleeps",
            "The small cat sleeps"
          ],
          "answer": "sleeps",
          "completed": "The small cat sleeps."
        }
      ]
    },
    ...choiceExercises("subp", 7, [
      ["Chủ ngữ trong `The baby sleeps.` là phần nào?", ["The baby", "sleeps", "The baby sleeps"], "The baby", "Câu đang nói về em bé.", "The baby là chủ ngữ."],
      ["Vị ngữ trong `Cats sleep.` là phần nào?", ["Cats", "sleep", "Cats sleep"], "sleep", "Vị ngữ cho biết những con mèo làm gì.", "sleep là vị ngữ và cũng là động từ trong câu ngắn này."],
      ["Chủ ngữ trong `We help Nam.` là gì?", ["We", "help Nam", "We help"], "We", "Câu đang nói về nhóm có người nói.", "`We` là chủ ngữ vì đây là phần chỉ những người thực hiện hành động giúp."],
      ["Vị ngữ trong `Lan reads books.` là gì?", ["reads", "books", "reads books"], "reads books", "Chọn cả phần cho biết Lan làm gì và đọc gì.", "Toàn bộ reads books là vị ngữ."],
      ["Động từ nằm trong vị ngữ `help Nam` là từ nào?", ["help", "Nam", "help Nam"], "help", "Động từ cho biết hành động giúp.", "help là động từ; help Nam là toàn bộ vị ngữ."],
      ["Nhận xét nào đúng về vị ngữ?", ["Vị ngữ luôn chứa một động từ", "Vị ngữ luôn chỉ có một từ", "Vị ngữ luôn đứng trước chủ ngữ"], "Vị ngữ luôn chứa một động từ", "Vị ngữ có thể dài hơn động từ.", "Trong các mệnh đề đang học, vị ngữ luôn có động từ và có thể có thêm từ khác."],
      ["Phần nào chưa đủ làm câu kể cơ bản vì thiếu chủ ngữ?", ["Reads books.", "Lan reads books.", "They read."], "Reads books.", "Tìm ví dụ không cho biết ai đọc.", "Reads books. thiếu chủ ngữ trong mẫu câu kể đang học."],
      ["Đại từ có thể làm chủ ngữ trong câu nào?", ["We read.", "Reads books.", "The book"], "We read.", "We là đại từ đứng trước vị ngữ read.", "We là chủ ngữ của câu We read."],
      ["Cụm từ có thể làm chủ ngữ trong câu nào?", ["The cat sleeps.", "Sleeps.", "help Nam"], "The cat sleeps.", "The cat là cả một cụm từ gọi con mèo.", "The cat là cụm từ làm chủ ngữ."],
      ["Trong `Lan helps Nam.`, vì sao `helps` không phải toàn bộ vị ngữ?", ["Vì vị ngữ còn gồm Nam", "Vì helps là chủ ngữ", "Vì câu không có động từ"], "Vì vị ngữ còn gồm Nam", "Vị ngữ nói cả việc giúp và người được giúp.", "helps là động từ; helps Nam mới là toàn bộ vị ngữ."],
    ]),
    ...contextExercises("subp", 17, [
      ["Bạn đang phân tích câu `I read.` — “Tôi đọc”.", "Phần được nói tới là gì?", ["I", "read", "I read"], "I", "Câu đang nói về chính người nói.", "`I` là chủ ngữ vì câu đang nói về chính người thực hiện hành động đọc."],
      ["Bạn đang phân tích câu `They help Lan.` — “Họ giúp Lan”.", "Phần nói điều gì đó về họ là gì?", ["They", "help", "help Lan"], "help Lan", "Chọn cả động từ và phần đi sau nó.", "help Lan là vị ngữ."],
      ["Bạn muốn viết câu kể cơ bản “Chúng tôi đọc”.", "Cách viết nào có đủ chủ ngữ và vị ngữ?", ["We read.", "We", "Read."], "We read.", "Cần phần nêu chúng tôi và phần cho biết hành động đọc.", "We read. có đủ chủ ngữ và vị ngữ."],
    ]),
    ...repairExercises("subp", 20, [
      ["Trong `The teacher reads.`, `The teacher` làm thành phần nào?", ["The teacher", "=", "vị ngữ"], 2, ["chủ ngữ", "vị ngữ", "động từ"], "chủ ngữ", "Câu đang nói về người giáo viên.", "The teacher là chủ ngữ."],
      ["Trong `We read books.`, `read books` làm thành phần nào?", ["read books", "=", "chủ ngữ"], 2, ["chủ ngữ", "vị ngữ", "động từ"], "vị ngữ", "Phần này cho biết chúng tôi làm gì và đọc gì.", "read books là toàn bộ vị ngữ."],
    ]),
    ...orderExercises("subp", 22, [
      ["Sắp xếp thành câu có chủ ngữ đứng trước vị ngữ.", ["books", "read", "They", "."], ["They", "read", "books", "."], "Đặt nhóm được nói tới trước phần nói về nhóm ấy.", "They là chủ ngữ; read books là vị ngữ."],
      ["Sắp xếp thành câu “Chúng tôi giúp Nam”.", ["help Nam", ".", "We"], ["We", "help Nam", "."], "Chủ ngữ đứng trước vị ngữ.", "We là chủ ngữ; help Nam là vị ngữ."],
    ]),
    ...tapExercises("subp", 24, [
      ["Chọn toàn bộ vị ngữ trong câu.", ["We", "help", "Nam", "."], [1, 2], "Vị ngữ gồm động từ và phần đi sau nó.", "help Nam là toàn bộ vị ngữ."],
      ["Chọn toàn bộ chủ ngữ trong câu.", ["The", "small", "cat", "sleeps", "."], [0, 1, 2], "Câu đang nói về cả con mèo nhỏ.", "The small cat là toàn bộ chủ ngữ."],
    ])
  ],
  "subjects-and-pronouns": [
    {
      "id": "pro1",
      "kind": "match",
      "prompt": "Trong tình huống này, Mai là bạn nữ và Nam là bạn nam. Ghép mỗi người hoặc vật với đại từ có thể thay thế.",
      "hint": "Xét một hay nhiều và loại đối tượng.",
      "explanation": "Mai→she, Nam→he, the cat→it, Mai and Nam→they.",
      "pairs": [
        {
          "left": "Mai",
          "right": "she"
        },
        {
          "left": "Nam",
          "right": "he"
        },
        {
          "left": "the cat",
          "right": "it"
        },
        {
          "left": "Mai and Nam",
          "right": "they"
        }
      ]
    },
    {
      "id": "pro2",
      "kind": "sort",
      "prompt": "Đặt đại từ vào nhóm phù hợp.",
      "hint": "I chỉ riêng người nói; you chỉ người nghe; we là nhóm có người nói; they là nhóm khác.",
      "explanation": "Bảy đại từ đã được đặt vào các nhóm không chồng lấn.",
      "buckets": [
        "Chỉ riêng người nói",
        "Người nghe — một hoặc nhiều",
        "Một đối tượng khác",
        "Nhóm có người nói",
        "Nhóm khác"
      ],
      "items": [
        {
          "text": "I",
          "bucket": "Chỉ riêng người nói"
        },
        {
          "text": "you",
          "bucket": "Người nghe — một hoặc nhiều"
        },
        {
          "text": "he",
          "bucket": "Một đối tượng khác"
        },
        {
          "text": "she",
          "bucket": "Một đối tượng khác"
        },
        {
          "text": "it",
          "bucket": "Một đối tượng khác"
        },
        {
          "text": "we",
          "bucket": "Nhóm có người nói"
        },
        {
          "text": "they",
          "bucket": "Nhóm khác"
        }
      ]
    },
    {
      "id": "pro3",
      "kind": "choice",
      "prompt": "Đại từ nào có thể thay cho “Nam và tôi”?",
      "hint": "Nhóm có người đang nói.",
      "explanation": "Nam và tôi được thay bằng we.",
      "options": [
        "I",
        "we",
        "they"
      ],
      "answer": "we"
    },
    {
      "id": "pro4",
      "kind": "repair",
      "prompt": "Mai là một bạn nữ; đại từ nào có thể thay cho Mai?",
      "hint": "Mai là một bạn nữ trong tình huống này.",
      "explanation": "she có thể thay cho Mai.",
      "tokens": [
        "Mai",
        "→",
        "he"
      ],
      "targetIndex": 2,
      "replacements": [
        "he",
        "she",
        "it"
      ],
      "answer": "she"
    },
    {
      "id": "pro5",
      "kind": "context",
      "prompt": "Đại từ nào chỉ hai người đang nghe bạn nói?",
      "hint": "You dùng cho cả một và nhiều người nghe.",
      "explanation": "you chỉ những người đang nghe.",
      "context": "Bạn đang nói trực tiếp với hai người trước mặt.",
      "options": [
        "you",
        "we",
        "they"
      ],
      "answer": "you"
    },
    {
      "id": "pro6",
      "kind": "grid",
      "prompt": "Chọn đại từ chủ ngữ phù hợp cho mỗi tình huống.",
      "hint": "Xác định người nói có trong nhóm hay không và số lượng.",
      "explanation": "Ba tình huống dùng đúng I, we và they.",
      "rows": [
        {
          "cue": "Tôi tự nói về mình.",
          "options": [
            "I",
            "you",
            "we"
          ],
          "answer": "I",
          "completed": "I"
        },
        {
          "cue": "Nam và tôi.",
          "options": [
            "we",
            "they",
            "she"
          ],
          "answer": "we",
          "completed": "we"
        },
        {
          "cue": "Ba quả bóng.",
          "options": [
            "it",
            "they",
            "we"
          ],
          "answer": "they",
          "completed": "they"
        }
      ]
    },
    ...choiceExercises("pro", 7, [
      ["Đại từ nào chỉ chính người đang nói?", ["I", "you", "they"], "I", "Từ này thường được hiểu là “tôi”.", "I chỉ người đang nói."],
      ["Đại từ nào dùng cho người hoặc những người đang nghe?", ["you", "we", "they"], "you", "Cùng một từ dùng cho một hoặc nhiều người nghe.", "you chỉ người nghe, dù có một hay nhiều người."],
      ["Nam là một người nam đã được nhắc đến. Đại từ nào có thể thay cho Nam?", ["he", "she", "it"], "he", "Từ cần chọn thường nghĩa là “anh ấy”.", "he có thể thay cho Nam trong tình huống này."],
      ["Mai là một người nữ đã được nhắc đến. Đại từ nào có thể thay cho Mai?", ["he", "she", "it"], "she", "Từ cần chọn thường nghĩa là “cô ấy”.", "she có thể thay cho Mai trong tình huống này."],
      ["Một quả bóng thường được thay bằng đại từ nào?", ["he", "it", "we"], "it", "Đây là một đồ vật, không phải một người.", "it thường thay cho một đồ vật số ít."],
      ["Đại từ nào chỉ một nhóm có người nói?", ["you", "we", "they"], "we", "Người nói nằm bên trong nhóm.", "we chỉ nhóm có người nói."],
      ["Đại từ nào chỉ một nhóm khác đang được nói tới?", ["you", "we", "they"], "they", "Nhóm này không phải người nói và không phải những người đang được nói trực tiếp với.", "they chỉ một nhóm khác đang được nói tới."],
      ["Bạn đang nói trực tiếp với ba người. Đại từ nào chỉ cả ba người ấy?", ["you", "we", "they"], "you", "you dùng cho cả một và nhiều người nghe.", "Ba người đang nghe vẫn được gọi là you."],
      ["Một con chó chưa rõ giới tính thường được thay bằng đại từ nào?", ["he", "she", "it"], "it", "Với con vật chưa cần nói giới tính, dùng lựa chọn trung tính.", "it là lựa chọn trung tính trong tình huống này."],
      ["Đại từ nào luôn được viết hoa?", ["I", "you", "he"], "I", "Đây là quy tắc riêng của đại từ chỉ người nói.", "I luôn được viết hoa."],
    ]),
    ...contextExercises("pro", 17, [
      ["Cô Hoa là một người nữ đã được nhắc đến.", "Đại từ nào có thể thay cho cô Hoa?", ["he", "she", "it"], "she", "Chọn đại từ cho một người nữ khác.", "she có thể thay cho cô Hoa trong tình huống này."],
      ["Một cậu bé đã được nhắc đến bằng cụm `the boy`, nghĩa là “cậu bé”.", "Đại từ nào có thể thay cho `the boy`?", ["he", "she", "it"], "he", "Chọn đại từ cho một người nam khác.", "he có thể thay cho the boy trong tình huống này."],
      ["Người nói đang nhắc đến Nam và Mai nhưng không nói trực tiếp với họ.", "Đại từ nào có thể thay cho “Nam and Mai”?", ["you", "we", "they"], "they", "Đây là một nhóm khác đang được nói tới.", "they có thể thay cho Nam and Mai."],
    ]),
    ...repairExercises("pro", 20, [
      ["Đại từ nào có thể thay cho `the cat`, nghĩa là “con mèo”, khi chưa cần nói giới tính?", ["the cat", "→", "she"], 2, ["he", "she", "it"], "it", "Chọn đại từ trung tính cho một con vật số ít.", "the cat được thay bằng it trong tình huống này."],
      ["Đại từ nào có thể thay cho “Mai và tôi”?", ["Mai and I", "→", "they"], 2, ["I", "we", "they"], "we", "Nhóm này có người nói.", "Mai and I được thay bằng we."],
    ]),
    ...orderExercises("pro", 22, [
      ["Sắp xếp lại câu đã có sẵn từ: “Anh ấy ngủ”.", ["sleeps", "He", "."], ["He", "sleeps", "."], "Đại từ chủ ngữ đứng đầu câu.", "He là đại từ chủ ngữ trong He sleeps."],
      ["Sắp xếp lại câu đã có sẵn từ: “Chúng tôi đọc”.", [".", "read", "We"], ["We", "read", "."], "Đặt đại từ chủ ngữ trước động từ.", "We là đại từ chủ ngữ trong We read."],
    ]),
    ...tapExercises("pro", 24, [
      ["Chọn đại từ thay cho “Nam và Mai” khi bạn đang nói về họ.", ["you", "we", "they"], [2], "Người nói không nằm trong nhóm này.", "Nam và Mai được thay bằng they."],
      ["Chọn đại từ thay cho `the red ball`, nghĩa là “quả bóng đỏ”.", ["it", "they", "she"], [0], "Đây là một đồ vật số ít.", "the red ball được thay bằng it."],
    ])
  ],
  "action-sentences": [
    {
      "id": "fr1",
      "kind": "match",
      "prompt": "Ghép mỗi khung SV, SVC và SVO với mô tả tương ứng.",
      "hint": "C là bổ ngữ; O là tân ngữ.",
      "explanation": "Ba mã đã được ghép đúng với ba khung câu.",
      "pairs": [
        {
          "left": "SV",
          "right": "chủ ngữ + động từ"
        },
        {
          "left": "SVC",
          "right": "chủ ngữ + động từ + bổ ngữ"
        },
        {
          "left": "SVO",
          "right": "chủ ngữ + động từ + tân ngữ"
        }
      ]
    },
    {
      "id": "fr2",
      "kind": "sort",
      "prompt": "Phân loại mỗi câu theo khung SV, SVC hoặc SVO.",
      "hint": "Bổ ngữ nói về chủ ngữ; tân ngữ là đối tượng mà động từ liên quan tới.",
      "explanation": "Sáu câu đã được phân loại theo SV, SVC và SVO.",
      "buckets": [
        "SV",
        "SVC",
        "SVO"
      ],
      "items": [
        {
          "text": "Birds fly.",
          "bucket": "SV"
        },
        {
          "text": "The baby sleeps.",
          "bucket": "SV"
        },
        {
          "text": "Lan is happy.",
          "bucket": "SVC"
        },
        {
          "text": "Nam is a student.",
          "bucket": "SVC"
        },
        {
          "text": "Lan reads books.",
          "bucket": "SVO"
        },
        {
          "text": "We help Nam.",
          "bucket": "SVO"
        }
      ]
    },
    {
      "id": "fr3",
      "kind": "choice",
      "prompt": "Câu nào dùng phần cuối để miêu tả chủ ngữ?",
      "hint": "kind miêu tả Nam và đứng sau is.",
      "explanation": "Nam is kind. nghĩa là “Nam tốt bụng” và có khung SVC.",
      "options": [
        "The baby sleeps.",
        "Nam is kind.",
        "They read books."
      ],
      "answer": "Nam is kind."
    },
    {
      "id": "fr4",
      "kind": "order",
      "prompt": "Sắp xếp các mảnh thành câu có nghĩa “Chúng tôi giúp Lan”.",
      "hint": "Chủ ngữ trước, động từ ở giữa, tân ngữ ở sau.",
      "explanation": "We help Lan. có đúng thứ tự SVO.",
      "tokens": [
        "Lan",
        "We",
        "help"
      ],
      "answer": [
        "We",
        "help",
        "Lan"
      ]
    },
    {
      "id": "fr5",
      "kind": "context",
      "prompt": "Câu nào dùng phần cuối để gọi tên chính Mai?",
      "hint": "Tìm câu có bổ ngữ miêu tả chủ ngữ.",
      "explanation": "Mai is a teacher. dùng khung SVC; hai câu còn lại lần lượt dùng SV và SVO.",
      "context": "Bạn muốn viết câu có nghĩa “Mai là một giáo viên”.",
      "options": [
        "Mai is a teacher.",
        "Cats sleep.",
        "I read books."
      ],
      "answer": "Mai is a teacher."
    },
    {
      "id": "fr6",
      "kind": "grid",
      "prompt": "Chọn khung SV, SVC hoặc SVO phù hợp cho từng câu.",
      "hint": "Xem sau động từ không có phần nào, có phần nói về chủ ngữ hay có đối tượng mà động từ liên quan tới.",
      "explanation": "Ba câu lần lượt dùng SV, SVC và SVO.",
      "rows": [
        {
          "cue": "Cats sleep.",
          "options": [
            "SV",
            "SVC",
            "SVO"
          ],
          "answer": "SV",
          "completed": "Cats sleep."
        },
        {
          "cue": "Mai is kind.",
          "options": [
            "SV",
            "SVC",
            "SVO"
          ],
          "answer": "SVC",
          "completed": "Mai is kind."
        },
        {
          "cue": "I read a book.",
          "options": [
            "SV",
            "SVC",
            "SVO"
          ],
          "answer": "SVO",
          "completed": "I read a book."
        }
      ]
    },
    ...choiceExercises("fr", 7, [
      ["`The dog runs.`, nghĩa là “Con chó chạy”, dùng khung nào?", ["SV", "SVC", "SVO"], "SV", "Sau động từ runs không cần thêm thành phần nào trong ý này.", "The dog là S và runs là V, nên câu dùng khung SV."],
      ["`The book is new.`, nghĩa là “Quyển sách này còn mới”, dùng khung nào?", ["SV", "SVC", "SVO"], "SVC", "new miêu tả chính quyển sách.", "The book is new. dùng khung SVC."],
      ["`They like music.`, nghĩa là “Họ thích âm nhạc”, dùng khung nào?", ["SV", "SVC", "SVO"], "SVO", "music là thứ được thích.", "They like music. dùng khung SVO."],
      ["Trong các chữ SV, SVC và SVO, `S` là gì?", ["chủ ngữ", "động từ", "tân ngữ"], "chủ ngữ", "S là chữ đầu của subject.", "`S` viết tắt cho chủ ngữ (*subject*), tức phần chỉ người hoặc vật được câu nói tới."],
      ["Trong các chữ SV, SVC và SVO, `V` là gì?", ["chủ ngữ", "động từ", "bổ ngữ"], "động từ", "V là chữ đầu của verb.", "`V` viết tắt cho động từ (*verb*), phần cho biết hành động hoặc trạng thái trong câu."],
      ["Trong khung SVC, `C` là gì?", ["câu", "bổ ngữ", "tân ngữ"], "bổ ngữ", "C là chữ đầu của complement.", "`C` viết tắt cho bổ ngữ (*complement*), phần gọi tên hoặc miêu tả lại chủ ngữ trong khung SVC."],
      ["Trong khung SVO, `O` là gì?", ["tân ngữ", "chủ ngữ", "động từ"], "tân ngữ", "O là chữ đầu của object.", "`O` viết tắt cho tân ngữ (*object*), người hoặc vật mà hành động hướng tới trong khung SVO."],
      ["Phần cuối của khung SVC làm công việc gì?", ["gọi tên hoặc miêu tả chủ ngữ", "chỉ đối tượng mà động từ liên quan tới", "luôn chỉ nơi chốn"], "gọi tên hoặc miêu tả chủ ngữ", "Bổ ngữ nói về chính chủ ngữ.", "Trong khung SVC, bổ ngữ gọi tên hoặc miêu tả chủ ngữ."],
      ["Phần cuối của khung SVO làm công việc gì?", ["chỉ đối tượng mà động từ liên quan tới", "miêu tả chủ ngữ", "thay cho động từ"], "chỉ đối tượng mà động từ liên quan tới", "O là người hoặc vật giúp hoàn chỉnh ý nghĩa của động từ.", "Tân ngữ trong SVO chỉ đối tượng mà động từ liên quan tới."],
      ["Trong `Nam is a student.`, `a student` làm công việc gì?", ["bổ ngữ", "tân ngữ", "động từ"], "bổ ngữ", "Nam và a student nói về cùng một người.", "a student gọi tên Nam nên là bổ ngữ."],
    ]),
    ...contextExercises("fr", 17, [
      ["Trong câu `Nam helps a teacher.`, Nam và người giáo viên là hai người khác nhau.", "`a teacher` làm công việc gì?", ["chủ ngữ", "bổ ngữ", "tân ngữ"], "tân ngữ", "Đây là người nhận hành động giúp.", "a teacher là tân ngữ, nên câu dùng khung SVO."],
      ["Trong câu `They sleep.`, động từ sleep đã tạo được ý cơ bản.", "`They sleep.` dùng khung SV, SVC hay SVO?", ["SV", "SVC", "SVO"], "SV", "Không có bổ ngữ hoặc tân ngữ phía sau.", "They sleep. dùng khung SV."],
      ["Trong câu `Mai is kind.`, phần `kind` miêu tả Mai.", "`Mai is kind.` dùng khung SV, SVC hay SVO?", ["SV", "SVC", "SVO"], "SVC", "Phần cuối cho biết Mai như thế nào.", "Mai is kind. dùng khung SVC."],
    ]),
    ...repairExercises("fr", 20, [
      ["`The cat is small.` thuộc khung câu nào?", ["The cat is small.", "=", "SVO"], 2, ["SV", "SVC", "SVO"], "SVC", "small miêu tả chính con mèo.", "Câu dùng khung SVC: `The cat` là chủ ngữ, `is` là động từ và `small` là bổ ngữ miêu tả chủ ngữ."],
      ["`I read a book.` thuộc khung câu nào?", ["I read a book.", "=", "SVC"], 2, ["SV", "SVC", "SVO"], "SVO", "a book là thứ được đọc.", "Câu dùng khung SVO: `I` là chủ ngữ, `read` là động từ và `a book` là tân ngữ được đọc."],
    ]),
    ...orderExercises("fr", 22, [
      ["Sắp xếp thành câu khung SV “Họ ngủ”.", ["sleep", "They", "."], ["They", "sleep", "."], "Đặt S trước V.", "They sleep. có khung SV."],
      ["Sắp xếp thành câu khung SVC “Nam tốt bụng”.", ["kind", ".", "is", "Nam"], ["Nam", "is", "kind", "."], "Đặt chủ ngữ, động từ rồi bổ ngữ.", "Nam is kind. có khung SVC."],
    ]),
    ...tapExercises("fr", 24, [
      ["Chọn bổ ngữ trong câu.", ["The book", "is", "new", "."], [2], "Phần này miêu tả quyển sách.", "`New` là bổ ngữ vì nó miêu tả trạng thái của chủ ngữ `The book` sau `is`."],
      ["Chọn tân ngữ trong câu.", ["We", "help", "Mai", "."], [2], "Đây là người được giúp.", "`Mai` là tân ngữ vì đây là người nhận hành động `help`."],
    ])
  ],
  "objects-basic": [
    {
      "id": "obj1",
      "kind": "match",
      "prompt": "Ghép mỗi câu với tân ngữ của câu đó.",
      "hint": "Tìm thứ được đọc, người được giúp và thứ được thích.",
      "explanation": "Ba câu đã được ghép với đúng tân ngữ.",
      "pairs": [
        {
          "left": "I read books.",
          "right": "books"
        },
        {
          "left": "We help Lan.",
          "right": "Lan"
        },
        {
          "left": "They like tea.",
          "right": "tea"
        }
      ]
    },
    {
      "id": "obj2",
      "kind": "sort",
      "prompt": "Trong câu `We read books.`, hãy phân loại ba mảnh thành chủ ngữ, động từ và tân ngữ.",
      "hint": "Ai đọc? làm gì? đọc cái gì?",
      "explanation": "We là chủ ngữ; read là động từ; books là tân ngữ.",
      "buckets": [
        "Chủ ngữ",
        "Động từ",
        "Tân ngữ"
      ],
      "items": [
        {
          "text": "We",
          "bucket": "Chủ ngữ"
        },
        {
          "text": "read",
          "bucket": "Động từ"
        },
        {
          "text": "books",
          "bucket": "Tân ngữ"
        }
      ]
    },
    {
      "id": "obj3",
      "kind": "choice",
      "prompt": "Trong `They like music.`, họ thích gì?",
      "hint": "Hỏi like, nghĩa là thích, hướng đến cái gì.",
      "explanation": "music, nghĩa là “âm nhạc”, là tân ngữ của like.",
      "options": [
        "They",
        "like",
        "music"
      ],
      "answer": "music"
    },
    {
      "id": "obj4",
      "kind": "tap",
      "prompt": "Trong câu dưới đây, chọn toàn bộ tân ngữ.",
      "hint": "Tìm cả cụm trả lời câu hỏi “mở cái gì?”.",
      "explanation": "the red door, nghĩa là “cánh cửa đỏ”, là toàn bộ tân ngữ.",
      "tokens": [
        "I",
        "open",
        "the",
        "red",
        "door",
        "."
      ],
      "answerIndexes": [
        2,
        3,
        4
      ],
      "selectionMode": "multiple"
    },
    {
      "id": "obj5",
      "kind": "context",
      "prompt": "Câu nào đã đủ ý cơ bản và không có tân ngữ?",
      "hint": "fly trong ý này không cần trả lời “bay ai/cái gì”.",
      "explanation": "Birds fly. không có tân ngữ.",
      "context": "Hãy chú ý xem động từ có hướng đến một người hoặc vật khác hay không.",
      "options": [
        "Birds fly.",
        "They read books.",
        "I help Nam."
      ],
      "answer": "Birds fly."
    },
    {
      "id": "obj6",
      "kind": "grid",
      "prompt": "Chọn tân ngữ, bổ ngữ hoặc không có phần nào.",
      "hint": "Xem phần cuối là đối tượng mà động từ liên quan tới, thông tin về chủ ngữ hay không xuất hiện.",
      "explanation": "Ba câu cho thấy tân ngữ, bổ ngữ và câu không có tân ngữ.",
      "rows": [
        {
          "cue": "We help Mai. → Mai",
          "options": [
            "tân ngữ",
            "bổ ngữ",
            "không có"
          ],
          "answer": "tân ngữ",
          "completed": "We help Mai."
        },
        {
          "cue": "The book is new. → new",
          "options": [
            "tân ngữ",
            "bổ ngữ",
            "không có"
          ],
          "answer": "bổ ngữ",
          "completed": "The book is new."
        },
        {
          "cue": "Trong Cats sleep., sau sleep có thành phần nào?",
          "options": [
            "tân ngữ",
            "bổ ngữ",
            "không có"
          ],
          "answer": "không có",
          "completed": "Cats sleep."
        }
      ]
    },
    ...choiceExercises("obj", 7, [
      ["Tân ngữ trong `Lan reads books.` là gì?", ["Lan", "reads", "books"], "books", "Hỏi: đọc cái gì?", "books là thứ được đọc nên là tân ngữ."],
      ["Tân ngữ trong `I help Mai.` là gì?", ["I", "help", "Mai"], "Mai", "Hỏi: giúp ai?", "Mai là người được giúp nên là tân ngữ."],
      ["Tân ngữ trong `We like tea.` là gì?", ["We", "like", "tea"], "tea", "Hỏi: thích cái gì?", "tea là thứ được thích nên là tân ngữ."],
      ["Tân ngữ trong `They open the door.` là gì?", ["They", "open", "the door"], "the door", "Hỏi: mở cái gì?", "the door là vật được mở nên là tân ngữ."],
      ["Câu nào không có tân ngữ?", ["The dog runs.", "I read a book.", "We help Mai."], "The dog runs.", "runs đã tạo được ý cơ bản mà không hướng đến một đối tượng.", "The dog runs. nghĩa là “Con chó chạy” và không có tân ngữ."],
      ["Câu nào chỉ nói một hành động mà không hướng đến người hay vật nào?", ["Birds fly.", "We like tea.", "I open the door."], "Birds fly.", "Không thể hỏi “bay ai/cái gì” trong ý này.", "Birds fly. không có tân ngữ."],
      ["Toàn bộ tân ngữ trong `I read a new book.` là gì?", ["book", "new book", "a new book"], "a new book", "Chọn cả cụm trả lời câu hỏi “đọc cái gì?”.", "a new book là toàn bộ tân ngữ."],
      ["Toàn bộ tân ngữ trong `They find the red ball.` là gì?", ["ball", "red ball", "the red ball"], "the red ball", "Chọn cả cụm gọi quả bóng đỏ.", "the red ball là toàn bộ tân ngữ."],
      ["Trong `Nam is kind.`, `kind` là gì?", ["tân ngữ", "bổ ngữ", "chủ ngữ"], "bổ ngữ", "kind miêu tả chính Nam, không phải đối tượng của hành động.", "`Kind` là bổ ngữ vì nó miêu tả trực tiếp chủ ngữ Nam sau động từ `is`."],
      ["Trong `We help a teacher.`, `a teacher` là gì?", ["tân ngữ", "bổ ngữ", "động từ"], "tân ngữ", "a teacher là người được giúp.", "a teacher là tân ngữ của help."],
    ]),
    ...contextExercises("obj", 17, [
      ["Trong `Lan opens the door.`, bạn đang tìm phần trả lời câu hỏi “Lan mở cái gì?”.", "Cụm nào trả lời đầy đủ câu hỏi “Lan mở cái gì?”?", ["Lan", "opens", "the door"], "the door", "Tìm vật được mở.", "the door là toàn bộ tân ngữ."],
      ["Trong `They help Nam.`, bạn đang tìm phần trả lời câu hỏi “Họ giúp ai?”.", "Từ nào trả lời câu hỏi “Họ giúp ai?”?", ["They", "help", "Nam"], "Nam", "Tìm người được giúp.", "`Nam` là tân ngữ vì đây là người nhận hành động `help`."],
      ["Bạn cần tìm câu mà hành động không hướng đến một người hoặc vật khác.", "Câu nào đáp ứng yêu cầu này?", ["The baby sleeps.", "They read books.", "We help Lan."], "The baby sleeps.", "sleeps đã tạo được ý cơ bản trong câu này.", "The baby sleeps. không có tân ngữ."],
    ]),
    ...repairExercises("obj", 20, [
      ["Trong `They like music.`, `music` làm thành phần nào?", ["music", "=", "bổ ngữ"], 2, ["chủ ngữ", "bổ ngữ", "tân ngữ"], "tân ngữ", "music là thứ được thích.", "`Music` là tân ngữ vì đây là điều mà chủ ngữ `They` thích."],
      ["Trong `The cat is small.`, `small` làm thành phần nào?", ["small", "=", "tân ngữ"], 2, ["chủ ngữ", "bổ ngữ", "tân ngữ"], "bổ ngữ", "small miêu tả chính con mèo.", "small là bổ ngữ, không phải tân ngữ."],
    ]),
    ...orderExercises("obj", 22, [
      ["Sắp xếp thành câu có tân ngữ `books`.", ["books", "We", ".", "read"], ["We", "read", "books", "."], "Chủ ngữ trước, động từ ở giữa, tân ngữ ở sau.", "We read books. có books là tân ngữ."],
      ["Sắp xếp thành câu có tân ngữ `Lan`.", ["Lan", "help", "I", "."], ["I", "help", "Lan", "."], "Đặt người được giúp sau động từ help.", "I help Lan. có Lan là tân ngữ."],
    ]),
    ...tapExercises("obj", 24, [
      ["Trong câu sau, chọn toàn bộ cụm từ làm tân ngữ.", ["They", "open", "the", "red", "door", "."], [2, 3, 4], "Tìm cả cụm trả lời “mở cái gì?”.", "the red door là toàn bộ tân ngữ."],
      ["Trong câu sau, chọn toàn bộ cụm từ chỉ vật được tìm thấy.", ["Lan", "finds", "a", "small", "book", "."], [2, 3, 4], "Tìm cả cụm gọi vật được tìm thấy.", "a small book là toàn bộ tân ngữ."],
    ])
  ],
  "sentence-signals": [
    {
      "id": "pun1",
      "kind": "match",
      "prompt": "Ghép mỗi dấu cuối câu với công việc tương ứng.",
      "hint": "Câu cung cấp thông tin dùng dấu chấm; câu hỏi dùng dấu hỏi.",
      "explanation": "Dấu chấm kết thúc câu kể; dấu hỏi kết thúc câu hỏi.",
      "pairs": [
        {
          "left": ".",
          "right": "kết thúc câu kể"
        },
        {
          "left": "?",
          "right": "kết thúc câu hỏi trực tiếp"
        }
      ]
    },
    {
      "id": "pun2",
      "kind": "sort",
      "prompt": "Phân loại mỗi ví dụ thành câu kể hoặc câu hỏi.",
      "hint": "Dấu chấm thường đi với câu kể; dấu hỏi đi với câu hỏi trực tiếp.",
      "explanation": "Bốn câu đã được phân loại theo mục đích.",
      "buckets": [
        "Câu kể",
        "Câu hỏi"
      ],
      "items": [
        {
          "text": "The cat sleeps.",
          "bucket": "Câu kể"
        },
        {
          "text": "We read books.",
          "bucket": "Câu kể"
        },
        {
          "text": "Where is Mai?",
          "bucket": "Câu hỏi"
        },
        {
          "text": "Where is Nam?",
          "bucket": "Câu hỏi"
        }
      ]
    },
    {
      "id": "pun4",
      "kind": "repair",
      "prompt": "Chọn cách viết đúng của tên riêng Mai trong câu.",
      "hint": "Mai là tên riêng.",
      "explanation": "We help Mai. viết hoa đúng tên riêng.",
      "tokens": [
        "We",
        "help",
        "mai",
        "."
      ],
      "targetIndex": 2,
      "replacements": [
        "mai",
        "Mai",
        "MAI"
      ],
      "answer": "Mai"
    },
    {
      "id": "pun3",
      "kind": "choice",
      "prompt": "Cách viết nào đúng cho câu kể “Lan đọc.”?",
      "hint": "Tên Lan và từ đầu câu cần viết hoa; câu kể dùng dấu chấm.",
      "explanation": "Lan reads. có chữ hoa và dấu chấm đúng.",
      "options": [
        "lan reads.",
        "Lan reads.",
        "Lan reads ?"
      ],
      "answer": "Lan reads."
    },
    {
      "id": "pun5",
      "kind": "context",
      "prompt": "Cách viết nào đúng cho câu hỏi trực tiếp này?",
      "hint": "Câu hỏi dùng dấu hỏi và từ đầu câu viết hoa.",
      "explanation": "Are you ready? được viết đúng.",
      "context": "Bạn đang trực tiếp hỏi người nghe đã sẵn sàng chưa.",
      "options": [
        "Are you ready.",
        "Are you ready?",
        "are you ready?"
      ],
      "answer": "Are you ready?"
    },
    {
      "id": "pun6",
      "kind": "grid",
      "prompt": "Chọn câu đúng về chữ hoa, khoảng cách và dấu cuối.",
      "hint": "Kiểm tra từ đầu, I/tên riêng, khoảng trắng và đúng một dấu cuối.",
      "explanation": "Ba câu đều được viết đúng theo phạm vi Chương 1.",
      "rows": [
        {
          "cue": "Tôi giúp Nam.",
          "options": [
            "I help Nam.",
            "i help Nam.",
            "I help Nam ."
          ],
          "answer": "I help Nam.",
          "completed": "I help Nam."
        },
        {
          "cue": "Mai ở đâu?",
          "options": [
            "Where is Mai?",
            "Where is mai?",
            "Where is Mai ?"
          ],
          "answer": "Where is Mai?",
          "completed": "Where is Mai?"
        },
        {
          "cue": "Chim bay.",
          "options": [
            "Birds fly.",
            "birds fly.",
            "Birds fly?."
          ],
          "answer": "Birds fly.",
          "completed": "Birds fly."
        }
      ]
    },
    {
      "id": "pun7",
      "kind": "grid",
      "prompt": "Chọn đáp án đúng cho từng câu hỏi ôn tập từ đầu Chương 1.",
      "hint": "Nhìn lần lượt đơn vị ngôn ngữ, loại từ và thành phần câu.",
      "explanation": "Ba câu hỏi ôn lại cụm từ, tính từ và chủ ngữ.",
      "rows": [
        {
          "cue": "a new book là gì?",
          "options": [
            "một từ",
            "một cụm từ",
            "một câu"
          ],
          "answer": "một cụm từ",
          "completed": "a new book"
        },
        {
          "cue": "kind làm công việc gì?",
          "options": [
            "gọi tên",
            "nói hành động",
            "miêu tả đặc điểm"
          ],
          "answer": "miêu tả đặc điểm",
          "completed": "kind"
        },
        {
          "cue": "They trong They help Nam. là gì?",
          "options": [
            "chủ ngữ",
            "động từ",
            "tân ngữ"
          ],
          "answer": "chủ ngữ",
          "completed": "They help Nam."
        }
      ]
    },
    {
      "id": "pun8",
      "kind": "grid",
      "prompt": "Trả lời bốn câu hỏi tổng hợp về khung câu, tân ngữ, đại từ và cách viết.",
      "hint": "Kiểm tra cấu trúc, tân ngữ, đại từ rồi đến cách viết cả câu.",
      "explanation": "Bốn lựa chọn kết nối các kiến thức chính của toàn Chương 1.",
      "rows": [
        {
          "cue": "Câu nào có khung SV?",
          "options": [
            "Cats sleep.",
            "The book is new.",
            "They like music."
          ],
          "answer": "Cats sleep.",
          "completed": "Cats sleep."
        },
        {
          "cue": "Tân ngữ trong I open the door. là gì?",
          "options": [
            "I",
            "open",
            "the door"
          ],
          "answer": "the door",
          "completed": "I open the door."
        },
        {
          "cue": "Nam và Mai được thay bằng đại từ nào khi ta nói về họ?",
          "options": [
            "you",
            "we",
            "they"
          ],
          "answer": "they",
          "completed": "they"
        },
        {
          "cue": "Câu hỏi nào được viết đúng?",
          "options": [
            "Where is Lan?",
            "where is Lan?",
            "Where is Lan ."
          ],
          "answer": "Where is Lan?",
          "completed": "Where is Lan?"
        }
      ]
    },
    ...choiceExercises("pun", 9, [
      ["Cách viết nào bắt đầu câu đúng?", ["we read books.", "We read books.", "WE read books."], "We read books.", "Chữ đầu tiên của câu cần viết hoa.", "We read books. bắt đầu bằng chữ hoa đúng chuẩn."],
      ["Cách viết nào đúng tên riêng Nam?", ["nam", "Nam", "NAM"], "Nam", "Tên riêng bắt đầu bằng chữ hoa, các chữ còn lại không cần viết hoa toàn bộ.", "Nam là cách viết đúng tên riêng này."],
      ["Cách viết nào đúng đại từ nghĩa là “tôi”?", ["i", "I", "Í"], "I", "Đại từ này luôn được viết hoa.", "I luôn được viết hoa."],
      ["Dấu nào kết thúc câu kể `They read books`?", [".", "?", ","], ".", "Câu này cung cấp thông tin.", "Dấu chấm kết thúc câu kể: They read books."],
      ["Dấu nào kết thúc câu hỏi trực tiếp `Are you ready`?", [".", "?", ","], "?", "Câu này yêu cầu người nghe trả lời.", "Dấu hỏi kết thúc câu hỏi trực tiếp: Are you ready?"],
      ["Cách đặt dấu chấm nào đúng?", ["We help Lan.", "We help Lan .", "We help Lan  ."], "We help Lan.", "Dấu chấm đứng sát từ cuối cùng.", "We help Lan. không có khoảng trắng trước dấu chấm."],
      ["Cách kết thúc câu hỏi nào đúng?", ["Where is Nam?", "Where is Nam?.", "Where is Nam.?"], "Where is Nam?", "Dấu hỏi đã tự kết thúc câu.", "Không viết thêm dấu chấm sau dấu hỏi."],
      ["Cách viết hai câu liên tiếp nào đúng?", ["The baby sleeps.Birds fly.", "The baby sleeps. Birds fly.", "The baby sleeps. birds fly."], "The baby sleeps. Birds fly.", "Sau dấu chấm có một khoảng trắng và câu mới bắt đầu bằng chữ hoa.", "The baby sleeps. Birds fly. có khoảng trắng và chữ hoa đúng."],
      ["Cách viết tên nước nào đúng?", ["vietnam", "Vietnam", "VIETNAM"], "Vietnam", "Tên nước bắt đầu bằng chữ hoa.", "Vietnam là cách viết đúng trong tiếng Anh."],
    ]),
    ...contextExercises("pun", 18, [
      ["Bạn muốn viết hai thông tin: “Lan đọc. Nam ngủ.”", "Cách nào viết đúng hai câu liên tiếp?", ["Lan reads. Nam sleeps.", "Lan reads.Nam sleeps.", "lan reads. nam sleeps."], "Lan reads. Nam sleeps.", "Kiểm tra dấu chấm, khoảng trắng và chữ hoa đầu mỗi câu.", "Lan reads. Nam sleeps. viết đúng hai câu liên tiếp."],
      ["Bạn đang viết tên thành phố Hà Nội bằng tiếng Anh.", "Tên thành phố này cần được viết thế nào?", ["hanoi", "Hanoi", "HANOI"], "Hanoi", "Tên thành phố là tên riêng và bắt đầu bằng chữ hoa.", "Hanoi là cách viết đúng tên thành phố này."],
      ["Bạn đang trực tiếp hỏi: “Hà Nội ở đâu?”", "Cách nào viết đúng câu hỏi trực tiếp này?", ["Where is Hanoi?", "Where is Hanoi.", "where is Hanoi?"], "Where is Hanoi?", "Câu hỏi cần chữ hoa đầu câu và dấu hỏi cuối câu.", "Where is Hanoi? được viết đúng."],
    ]),
    ...repairExercises("pun", 21, [
      ["Chọn cách viết đúng tên thành phố Hà Nội bằng tiếng Anh.", ["Tên thành phố:", "hanoi"], 1, ["hanoi", "Hanoi", "HANOI"], "Hanoi", "Tên thành phố là tên riêng.", "Hanoi bắt đầu bằng chữ hoa."],
      ["Chọn dấu kết thúc đúng cho câu hỏi.", ["Where", "is", "Lan", "?."], 3, [".", "?", "?."], "?", "Không đặt thêm dấu chấm sau dấu hỏi.", "Where is Lan? kết thúc bằng đúng một dấu hỏi."],
    ]),
    ...orderExercises("pun", 23, [
      ["Sắp xếp và đặt dấu cuối cho câu kể “Em bé ngủ”.", [".", "sleeps", "The baby"], ["The baby", "sleeps", "."], "Chữ hoa đứng đầu; dấu chấm đứng cuối.", "The baby sleeps. là câu kể được viết đúng."],
      ["Sắp xếp và đặt dấu cuối cho câu kể “Chúng tôi giúp Nam”.", [".", "Nam", "We", "help"], ["We", "help", "Nam", "."], "Giữ trật tự câu kể đã học và đặt dấu chấm ở cuối.", "We help Nam. là câu kể được viết đúng."],
    ]),
    ...tapExercises("pun", 25, [
      ["Chọn các từ phải bắt đầu bằng chữ hoa trong câu đã cho.", ["Mai", "and", "I", "read", "."], [0, 2], "Tên riêng và đại từ I đều viết hoa.", "Mai là tên riêng và I luôn được viết hoa."],
    ])
  ],
};
