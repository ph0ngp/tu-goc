/* Luyện tập A1 — Chương 5: Nói có gì và ở đâu. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { binaryChoiceDrills, compactPracticeSet } from "../../basic-builders.ts";

const a1Chapter05BaseExerciseData: Record<string, Exercise[]> = {
  "countable-uncountable": compactPracticeSet({
    prefix: "a1cu",
    focus: "danh từ đếm được và không đếm được",
    choices: [
      ["Danh từ nào thường không đếm được khi nói chung?", ["water", "bottle", "apple"], "water", "`Water` là một chất; muốn đếm thường cần đơn vị như `glass` hoặc `bottle`."],
      ["Cụm nào đúng?", ["a piece of information", "an information", "two informations"], "a piece of information", "`Information` không đếm được; dùng `a piece of` để đếm một mục."],
      ["Cách nào có nghĩa “hai miếng bánh mì”?", ["two pieces of bread", "two breads", "two piece of bread"], "two pieces of bread", "`Bread` không đếm được nên giữ nguyên; từ chỉ đơn vị `piece` mới nhận số nhiều: `pieces`."],
      ["Câu nào dùng `be` đúng?", ["The rice is hot.", "The rice are hot.", "The rices are hot."], "The rice is hot.", "`Rice` không đếm được và đi với động từ số ít khi làm chủ ngữ."],
      ["Trong câu nào, `coffee` được dùng như danh từ đếm được?", ["Two coffees, please.", "Coffee is cheap here.", "I like coffee."], "Two coffees, please.", "Khi gọi đồ trong quán, `two coffees` nghĩa là hai cốc cà phê, nên `coffee` được đếm theo từng cốc. Khi nói về cà phê nói chung, `coffee` không đếm được."],
      ["Cụm nào đúng khi nói một chiếc ghế?", ["a chair", "chair", "an chair"], "a chair", "Danh từ đếm được số ít cần từ đứng trước; `chair` bắt đầu bằng âm phụ âm."],
      ["Cách nào đếm lượng sữa?", ["three bottles of milk", "three milks", "three bottle of milks"], "three bottles of milk", "Chuyển `bottle` sang số nhiều; `milk` giữ nguyên."],
      ["Danh từ nào có thể thêm `-s` để nói nhiều?", ["book", "money", "sugar"], "book", "Thử đặt `two` trước từng từ: chỉ `book` là thứ đếm được từng cái, nên có số nhiều thêm `-s`. Tiền và đường không được đếm từng cái theo cách này."],
      ["Câu nào dùng `bread` đúng khi nói bánh mì nói chung?", ["Bread is cheap in this shop.", "A bread is cheap in this shop.", "Breads are cheap in this shop."], "Bread is cheap in this shop.", "`Bread` thường không đếm được, không dùng `a` và không thêm `-s` trong nghĩa này."],
      ["Câu nào đúng khi nói về thông tin này?", ["This information is useful.", "These informations are useful.", "An information is useful."], "This information is useful.", "`Information` không đếm được và không có số nhiều `informations` trong nghĩa này."],
    ],
    orders: [
      ["Sắp xếp cụm “hai cốc nước”.", ["water", "glasses", "of", "two"], ["two", "glasses", "of", "water"], "Danh từ đếm được `glass` mang số nhiều; `water` giữ nguyên."],
      ["Sắp xếp câu “Đường ở trong bát.”", ["sugar", "The", "in", "is", "the", "bowl", "."], ["The", "sugar", "is", "in", "the", "bowl", "."], "`Sugar` không đếm được nên đi với `is` và không thêm `-s`."],
      ["Sắp xếp cụm “ba mẩu thông tin”.", ["information", "pieces", "three", "of"], ["three", "pieces", "of", "information"], "Đếm `pieces`, không thêm `-s` vào `information`."],
      ["Sắp xếp câu “Những quả táo này tươi.”", ["fresh", "These", "are", "apples", "."], ["These", "apples", "are", "fresh", "."], "`Apples` là danh từ đếm được số nhiều."],
    ],
    repairs: [
      ["Chọn dạng danh từ đúng sau `two cups of`.", ["We", "need", "two", "cups", "of", "waters", "."], 5, ["water", "waters", "a water"], "water", "Danh từ không đếm được giữ nguyên sau đơn vị."],
      ["Chọn cụm đúng cho một quyển sách.", ["This", "is", "book", "."], 2, ["a book", "book", "books"], "a book", "Một quyển sách là danh từ đếm được số ít, nên `book` cần một từ đứng trước như `a`."],
      ["Chọn dạng đúng của `information`.", ["This", "informations", "is", "important", "."], 1, ["information", "informations", "an information"], "information", "`Information` là danh từ không đếm được nên giữ nguyên dạng."],
    ],
    taps: [
      ["Trong `Two bottles of milk are in the fridge`, chọn danh từ đang được đếm.", ["Two", "bottles", "of", "milk", "are", "in", "the", "fridge", "."], [1], "Số `two` đếm các chai; `milk` là chất bên trong."],
      ["Trong `Bread is food`, chọn tất cả danh từ không đếm được trong cách dùng này.", ["Bread", "is", "food", "."], [0, 2], "`Bread` và `food` đang được nói chung như chất/loại thức ăn."],
      ["Trong `A chicken is an animal. We eat chicken.`, chọn từ `chicken` chỉ con vật đếm được.", ["A", "chicken", "is", "an", "animal", ".", "We", "eat", "chicken", "."], [1], "`A chicken` là một con gà; `chicken` sau `eat` chỉ thịt gà nói chung."],
    ],
    matchPrompt: "Ghép mỗi hình thức với cách hiểu đúng về tính đếm được.",
    pairs: [{ left: "a chair", right: "một vật đếm được" }, { left: "chairs", right: "nhiều vật đếm được" }, { left: "water", right: "một chất không đếm trực tiếp" }, { left: "a bottle of water", right: "một vật chứa đếm được cùng chất bên trong" }],
    sortPrompt: "Phân loại danh từ theo cách dùng thông thường trong bài.",
    buckets: ["Đếm được", "Không đếm được"],
    items: [{ text: "chair", bucket: "Đếm được" }, { text: "child", bucket: "Đếm được" }, { text: "bottle", bucket: "Đếm được" }, { text: "milk", bucket: "Không đếm được" }, { text: "money", bucket: "Không đếm được" }, { text: "information", bucket: "Không đếm được" }],
    gridPrompts: ["Chọn dạng danh từ phù hợp với từng số lượng.", "Chọn `is` hoặc `are` theo danh từ.", "Chọn cách đếm tự nhiên cho từng lượng."],
    gridRows: [
      { cue: "one ___", options: ["apple", "apples", "water"], answer: "apple", completed: "one apple" },
      { cue: "two ___", options: ["chairs", "chair", "rice"], answer: "chairs", completed: "two chairs" },
      { cue: "___ bread", options: ["one piece of", "one pieces of", "one piece"], answer: "one piece of", completed: "one piece of bread" },
      { cue: "The milk ___ cold.", options: ["is", "are", "be"], answer: "is", completed: "The milk is cold." },
      { cue: "The bottles ___ empty.", options: ["is", "are", "am"], answer: "are", completed: "The bottles are empty." },
      { cue: "This information ___ useful.", options: ["is", "are", "am"], answer: "is", completed: "This information is useful." },
      { cue: "hai cốc nước", options: ["two glasses of water", "two glass of water", "two glasses of waters"], answer: "two glasses of water", completed: "two glasses of water" },
      { cue: "hai bát cơm", options: ["two bowls of rice", "two bowl of rice", "two bowls of rices"], answer: "two bowls of rice", completed: "two bowls of rice" },
      { cue: "một chai sữa", options: ["a bottle of milk", "a bottle milk", "a bottles of milk"], answer: "a bottle of milk", completed: "a bottle of milk" },
    ],
  }),
  "there-and-place": [
    {
      "id": "tp1",
      "kind": "choice",
      "prompt": "___ two books on the table.",
      "hint": "Có two books—nhiều hơn một.",
      "explanation": "There are đi với danh từ số nhiều.",
      "options": [
        "There is",
        "There are",
        "They are"
      ],
      "answer": "There are"
    },
    {
      "id": "tp5",
      "kind": "tap",
      "prompt": "Trong `There is a cat and there are two dogs in the garden`, chọn dạng `be` đi với nhiều con vật.",
      "hint": "Xem cụm danh từ đứng ngay sau mỗi dạng của `be`: một con hay nhiều con?",
      "explanation": "`Are` đi với `two dogs` (hai con chó, số nhiều); `is` đi với `a cat` (một con mèo). Cả câu nghĩa là “Có một con mèo và hai con chó trong vườn”.",
      "tokens": [
        "There",
        "is",
        "a",
        "cat",
        "and",
        "there",
        "are",
        "two",
        "dogs",
        "in",
        "the",
        "garden",
        "."
      ],
      "answerIndexes": [
        6
      ],
      "selectionMode": "single"
    },
    {
      "id": "tp6",
      "kind": "repair",
      "prompt": "Sửa dạng của `be` để câu có nghĩa “Có hai quyển sách trên bàn”.",
      "hint": "two books là số nhiều.",
      "explanation": "There are two books... là câu đúng.",
      "tokens": [
        "There",
        "is",
        "two books",
        "on the table",
        "."
      ],
      "targetIndex": 1,
      "replacements": [
        "is",
        "are",
        "am"
      ],
      "answer": "are"
    },
    {
      "id": "tp8",
      "kind": "choice",
      "prompt": "Câu nào có nghĩa “Có một quyển sách trên bàn”?",
      "hint": "Đếm xem có mấy quyển sách, rồi chọn dạng `be` hợp với số lượng ấy.",
      "explanation": "There is + a book + vị trí.",
      "options": [
        "There are a book on the table.",
        "There is a book on the table.",
        "There is books on the table."
      ],
      "answer": "There is a book on the table."
    },
    {
      "id": "th5",
      "kind": "choice",
      "prompt": "___ an apple.",
      "hint": "an apple là số ít.",
      "explanation": "There is an apple. nghĩa là có một quả táo.",
      "options": [
        "There is",
        "There are",
        "They are"
      ],
      "answer": "There is"
    },
    {
      "id": "th6",
      "kind": "choice",
      "prompt": "___ there two books?",
      "hint": "Viết câu kể trước (`two books` là số nhiều), rồi đưa dạng `be` của câu kể lên trước `there`.",
      "explanation": "Are there two books? là câu hỏi đúng.",
      "options": [
        "Is",
        "Are",
        "Am"
      ],
      "answer": "Are"
    },
    {
      "id": "th7",
      "kind": "choice",
      "prompt": "Is there a cat? — No, ___.",
      "hint": "Câu hỏi dùng Is there.",
      "explanation": "No, there isn’t. trả lời rằng không có.",
      "options": [
        "there isn’t",
        "it isn’t",
        "there aren’t"
      ],
      "answer": "there isn’t"
    },
    {
      "id": "th8",
      "kind": "grid",
      "prompt": "Chọn câu đúng với mục đích giao tiếp.",
      "hint": "Xác định ý chính là tồn tại hay vị trí.",
      "explanation": "Mỗi câu phục vụ đúng mục đích và đúng số lượng.",
      "rows": [
        {
          "cue": "Cho biết trên bàn có một quyển sách mà người nghe chưa biết",
          "options": [
            "There is a book on the table.",
            "The book is on the table.",
            "There are a book."
          ],
          "answer": "There is a book on the table.",
          "completed": "There is a book on the table."
        },
        {
          "cue": "Nói vị trí quyển sách đã biết",
          "options": [
            "The book is on the table.",
            "There is the book.",
            "The book are on the table."
          ],
          "answer": "The book is on the table.",
          "completed": "The book is on the table."
        },
        {
          "cue": "Hỏi xem có sách không, khi nói về nhiều quyển",
          "options": [
            "Are there books?",
            "Is there books?",
            "Are there book?"
          ],
          "answer": "Are there books?",
          "completed": "Are there books?"
        }
      ]
    },
    {
      "id": "th9",
      "kind": "grid",
      "prompt": "Chọn câu giới thiệu đúng cho từng thứ có trong nhà.",
      "hint": "Với mỗi hàng, xét thứ được giới thiệu là một vật đếm được, nhiều vật hay một chất không đếm được.",
      "explanation": "Một vật đếm được dùng `there is a/an`; nhiều vật dùng `there are`; sữa không đếm được dùng `there is` và không có `a` hay `-s`.",
      "rows": [
        {
          "cue": "Có một chiếc đồng hồ trong phòng.",
          "options": [
            "There is a clock in the room.",
            "There are a clock in the room.",
            "There is clock in the room."
          ],
          "answer": "There is a clock in the room.",
          "completed": "There is a clock in the room."
        },
        {
          "cue": "Có ba chiếc ghế trong bếp.",
          "options": [
            "There are three chairs in the kitchen.",
            "There is three chairs in the kitchen.",
            "There are three chair in the kitchen."
          ],
          "answer": "There are three chairs in the kitchen.",
          "completed": "There are three chairs in the kitchen."
        },
        {
          "cue": "Có sữa trong tủ lạnh.",
          "options": [
            "There is milk in the fridge.",
            "There are milk in the fridge.",
            "There is milks in the fridge."
          ],
          "answer": "There is milk in the fridge.",
          "completed": "There is milk in the fridge."
        }
      ]
    },
    {
      "id": "th10",
      "kind": "grid",
      "prompt": "Chọn câu phủ định theo số lượng.",
      "hint": "Một vật dùng is not/isn’t; nhiều vật dùng are not/aren’t.",
      "explanation": "Ba câu phủ định đã khớp với số lượng của danh từ.",
      "rows": [
        {
          "cue": "Không có con mèo nào.",
          "options": [
            "There isn’t a cat.",
            "There aren’t a cat.",
            "There isn’t cats."
          ],
          "answer": "There isn’t a cat.",
          "completed": "There isn’t a cat."
        },
        {
          "cue": "Không có quyển sách nào.",
          "options": [
            "There are no books.",
            "There is no books.",
            "There are no book."
          ],
          "answer": "There are no books.",
          "completed": "There are no books."
        },
        {
          "cue": "Không có quả táo nào.",
          "options": [
            "There is not an apple.",
            "There are not an apple.",
            "There is not apples."
          ],
          "answer": "There is not an apple.",
          "completed": "There is not an apple."
        }
      ]
    },
    {
      "id": "th11",
      "kind": "match",
      "prompt": "Ghép mỗi câu hỏi với câu trả lời phù hợp.",
      "hint": "Câu hỏi với there cần câu trả lời ngắn giữ there và đúng is/are; câu hỏi Where cần một vị trí.",
      "explanation": "Is there a cat in the room? → Yes, there is. Are there books on the desk? → No, there aren’t. Where is the cat? hỏi vị trí của con mèo đã biết → It’s under the chair.",
      "pairs": [
        {
          "left": "Is there a cat in the room?",
          "right": "Yes, there is."
        },
        {
          "left": "Are there books on the desk?",
          "right": "No, there aren’t."
        },
        {
          "left": "Where is the cat?",
          "right": "It’s under the chair."
        }
      ]
    },
    {
      "id": "th12",
      "kind": "choice",
      "prompt": "Câu nào có cùng nghĩa với `There’s a book.`?",
      "hint": "Thử mở rộng dấu nháy trong `There’s`: nó thay cho chữ nào?",
      "explanation": "Hai câu đều có nghĩa “Có một quyển sách”.",
      "options": [
        "There is a book.",
        "There are books.",
        "The book is there."
      ],
      "answer": "There is a book."
    },
    {
      "id": "th13",
      "kind": "grid",
      "prompt": "Chọn câu hỏi đúng cho từng điều muốn biết.",
      "hint": "Xác định thứ được hỏi là một vật, nhiều vật hay một chất không đếm được, rồi đưa dạng `be` hợp với nó lên trước `there`.",
      "explanation": "Câu hỏi với `there` đưa `is` hoặc `are` lên trước `there`; dạng `be` vẫn theo danh từ được hỏi.",
      "rows": [
        {
          "cue": "Hỏi trong phòng có một chiếc giường không.",
          "options": [
            "Is there a bed in the room?",
            "Are there a bed in the room?",
            "Is there bed in the room?"
          ],
          "answer": "Is there a bed in the room?",
          "completed": "Is there a bed in the room?"
        },
        {
          "cue": "Hỏi trong lớp có ba mươi học sinh không.",
          "options": [
            "Are there thirty students in the class?",
            "Is there thirty students in the class?",
            "Are there thirty student in the class?"
          ],
          "answer": "Are there thirty students in the class?",
          "completed": "Are there thirty students in the class?"
        },
        {
          "cue": "Hỏi trong cốc có nước không.",
          "options": [
            "Is there water in the glass?",
            "Are there water in the glass?",
            "Is there waters in the glass?"
          ],
          "answer": "Is there water in the glass?",
          "completed": "Is there water in the glass?"
        }
      ]
    },
    {
      "id": "th14",
      "kind": "grid",
      "prompt": "Chọn câu trả lời ngắn đúng cho từng câu hỏi.",
      "hint": "Câu trả lời ngắn giữ `there` và dùng lại đúng dạng `be` của câu hỏi.",
      "explanation": "Câu trả lời ngắn lặp lại `there` và dạng `be` đã dùng trong câu hỏi; khi trả lời không, thêm `not` ở dạng viết tắt.",
      "rows": [
        {
          "cue": "Are there five apples in the bag? (Có.)",
          "options": [
            "Yes, there are.",
            "Yes, there is.",
            "Yes, they are."
          ],
          "answer": "Yes, there are.",
          "completed": "Are there five apples in the bag? — Yes, there are."
        },
        {
          "cue": "Is there sugar in the bowl? (Không.)",
          "options": [
            "No, there isn’t.",
            "No, there aren’t.",
            "No, it isn’t."
          ],
          "answer": "No, there isn’t.",
          "completed": "Is there sugar in the bowl? — No, there isn’t."
        },
        {
          "cue": "Are there chairs in the garden? (Không.)",
          "options": [
            "No, there aren’t.",
            "No, there isn’t.",
            "No, they aren’t."
          ],
          "answer": "No, there aren’t.",
          "completed": "Are there chairs in the garden? — No, there aren’t."
        }
      ]
    },
    {
      "id": "th15",
      "kind": "grid",
      "prompt": "Chọn câu trả lời đúng: giới thiệu điều mới hay nói vị trí của thứ đã biết.",
      "hint": "Câu hỏi “có gì” cần câu giới thiệu với `there`; câu hỏi “ở đâu” nói về thứ đã biết nên bắt đầu bằng chính thứ đó.",
      "explanation": "Câu hỏi “có gì” được trả lời bằng `there is/are` để giới thiệu thứ mới; câu hỏi “ở đâu” được trả lời bằng `the + danh từ + be + nơi chốn`.",
      "rows": [
        {
          "cue": "“Trong túi có gì?” — Có một quả cam.",
          "options": [
            "There is an orange in the bag.",
            "The orange is in the bag.",
            "There is orange in the bag."
          ],
          "answer": "There is an orange in the bag.",
          "completed": "There is an orange in the bag."
        },
        {
          "cue": "“Con mèo ở đâu?” — Con mèo ở trong bếp.",
          "options": [
            "The cat is in the kitchen.",
            "There is a cat in the kitchen.",
            "The cat are in the kitchen."
          ],
          "answer": "The cat is in the kitchen.",
          "completed": "The cat is in the kitchen."
        },
        {
          "cue": "“Những chiếc xe đạp ở đâu?” — Những chiếc xe đạp ở ngoài vườn.",
          "options": [
            "The bikes are in the garden.",
            "There are bikes in the garden.",
            "The bikes is in the garden."
          ],
          "answer": "The bikes are in the garden.",
          "completed": "The bikes are in the garden."
        }
      ]
    }
  ],
  "some-any-there": compactPracticeSet({
    prefix: "a1sa",
    focus: "some và any với there is/are",
    choices: [
      ["Câu khẳng định nào đúng với danh từ số nhiều?", ["There are some apples.", "There is some apples.", "There are any apples."], "There are some apples.", "Câu khẳng định dùng `some`; `apples` số nhiều đi với `are`."],
      ["Câu phủ định nào tự nhiên?", ["There isn't any milk.", "There isn't some milk.", "There aren't any milk."], "There isn't any milk.", "`Milk` không đếm được đi với `isn't any`."],
      ["Câu hỏi trung lập nào đúng?", ["Are there any shops nearby?", "Are there some shops nearby?", "Is there any shops nearby?"], "Are there any shops nearby?", "Câu hỏi trung lập dùng `any`; `shops` đi với `are`."],
      ["Câu khẳng định nào đúng với `tea`?", ["There is some tea.", "There are some tea.", "There is any tea."], "There is some tea.", "Câu khẳng định dùng `some`; `tea` không đếm được nên dùng `is`."],
      ["Cách nào đúng với một danh từ đếm được số ít?", ["There is a book.", "There is some book.", "There are any book."], "There is a book.", "Trong mẫu cơ bản, dùng `a/an` với một danh từ đếm được số ít."],
      ["Câu nào có nghĩa “Không có quả trứng nào”?", ["There aren't any eggs.", "There isn't any eggs.", "There aren't some eggs."], "There aren't any eggs.", "`Eggs` số nhiều dùng `aren't any`."],
      ["Câu nào không dùng hai lần phủ định?", ["There is no bread.", "There isn't no bread.", "There is not no bread."], "There is no bread.", "Có thể dùng `no` hoặc `not ... any`, không dùng cả hai."],
      ["Câu hỏi trung lập nào đúng với `water`?", ["Is there any water?", "Are there any water?", "Is there some waters?"], "Is there any water?", "Câu hỏi trung lập dùng `any`; `water` không đếm được nên dùng `is`."],
      ["Câu nào đúng với `rice`?", ["There is some rice.", "There are some rice.", "There is some rices."], "There is some rice.", "`Rice` không đếm được, dùng `is` và không thêm `-s`."],
      ["Trong câu trả lời khẳng định sau câu hỏi với `any`, từ nào thường xuất hiện?", ["some", "any", "no"], "some", "Khi xác nhận có một lượng, ta thường chuyển sang `some`."],
    ],
    orders: [
      ["Sắp xếp câu “Có vài chiếc ghế trong phòng.”", ["chairs", "There", "some", "room", "are", "in", "the", "."], ["There", "are", "some", "chairs", "in", "the", "room", "."], "`Some chairs` số nhiều đi với `there are`."],
      ["Sắp xếp câu hỏi “Có chút đường nào không?”", ["sugar", "there", "Is", "any", "?"], ["Is", "there", "any", "sugar", "?"], "Danh từ không đếm được dùng `Is there any ...?`."],
      ["Sắp xếp câu “Không có xe buýt nào hôm nay.”", ["aren’t", "There", "buses", "today", "any", "."], ["There", "aren’t", "any", "buses", "today", "."], "`Buses` số nhiều dùng `aren't any`."],
      ["Sắp xếp câu “Có một ít nước ép trong tủ lạnh.”", ["juice", "There", "some", "fridge", "is", "in", "the", "."], ["There", "is", "some", "juice", "in", "the", "fridge", "."], "Câu khẳng định dùng `some`; `juice` không đếm được nên dùng `is`."],
    ],
    repairs: [
      ["Chọn từ chỉ lượng phù hợp trong câu khẳng định.", ["There", "are", "any", "flowers", "outside", "."], 2, ["some", "any", "a"], "some", "Câu khẳng định thông thường dùng `some`."],
      ["Chọn từ chỉ lượng phù hợp sau `isn't`.", ["There", "isn't", "no", "rice", "in", "the", "kitchen", "."], 2, ["any", "no", "some"], "any", "`Isn't` đã mang nghĩa phủ định; câu chỉ cần một từ phủ định, nên sau `isn't` dùng `any`."],
      ["Chọn dạng của `be` phù hợp với `water`.", ["There", "are", "some", "water", "in", "the", "bottle", "."], 1, ["is", "are", "be"], "is", "`Water` không đếm được nên dùng `there is`."],
    ],
    taps: [
      ["Trong `There aren't any clean cups`, chọn các từ tạo phần phủ định.", ["There", "aren't", "any", "clean", "cups", "."], [1, 2], "`Aren't any` diễn tả không có chiếc cốc nào."],
      ["Trong `There is some bread on the table`, chọn từ chỉ lượng không xác định.", ["There", "is", "some", "bread", "on", "the", "table", "."], [2], "`Some` cho biết có một lượng bánh mì nhưng không nêu chính xác bao nhiêu."],
      ["Trong `Are there any apples or oranges?`, chọn tất cả danh từ được hỏi số lượng.", ["Are", "there", "any", "apples", "or", "oranges", "?"], [3, 5], "`Any` bao phủ hai danh từ số nhiều nối bằng `or`."],
    ],
    matchPrompt: "Ghép mỗi kiểu câu với mẫu từ chỉ lượng phù hợp.",
    pairs: [{ left: "khẳng định — số nhiều", right: "There are some books." }, { left: "khẳng định — không đếm được", right: "There is some milk." }, { left: "phủ định — số nhiều", right: "There aren't any books." }, { left: "câu hỏi — không đếm được", right: "Is there any milk?" }],
    sortPrompt: "Phân loại tình huống thường dùng `some` hoặc `any`.",
    buckets: ["some", "any"],
    items: [{ text: "khẳng định có vài quyển sách", bucket: "some" }, { text: "khẳng định có một ít sữa", bucket: "some" }, { text: "khẳng định có vài người", bucket: "some" }, { text: "câu hỏi trung lập", bucket: "any" }, { text: "câu phủ định với not", bucket: "any" }, { text: "hỏi có cửa hàng nào không", bucket: "any" }],
    gridPrompts: ["Chọn `some` hoặc `any` theo kiểu câu.", "Chọn `is` hoặc `are` theo danh từ sau từ chỉ lượng.", "Chọn câu hoàn chỉnh đúng cho từng tình huống."],
    gridRows: [
      { cue: "There are ___ students here.", options: ["some", "any", "a"], answer: "some", completed: "There are some students here." },
      { cue: "There isn't ___ coffee.", options: ["any", "some", "an"], answer: "any", completed: "There isn't any coffee." },
      { cue: "Are there ___ questions? (câu hỏi trung lập)", options: ["any", "some", "a"], answer: "any", completed: "Are there any questions?" },
      { cue: "There ___ some bread.", options: ["is", "are", "am"], answer: "is", completed: "There is some bread." },
      { cue: "There ___ some oranges.", options: ["are", "is", "am"], answer: "are", completed: "There are some oranges." },
      { cue: "___ there any water?", options: ["Is", "Are", "Am"], answer: "Is", completed: "Is there any water?" },
      { cue: "một quyển sách", options: ["There is a book.", "There is some book.", "There are any book."], answer: "There is a book.", completed: "There is a book." },
      { cue: "một vài quyển sách", options: ["There are some books.", "There is some books.", "There are a books."], answer: "There are some books.", completed: "There are some books." },
      { cue: "không có sữa", options: ["There isn't any milk.", "There aren't any milk.", "There isn't some milks."], answer: "There isn't any milk.", completed: "There isn't any milk." },
    ],
  }),
  "prepositions-place": [
    {
      "id": "tp2",
      "kind": "match",
      "prompt": "Ghép mỗi vị trí so với chiếc hộp với cụm tiếng Anh đúng.",
      "hint": "Hình dung con mèo nằm bên trong hộp, nằm trên mặt hộp hay nằm ngay bên dưới hộp.",
      "explanation": "bên trong hộp → in the box; trên chiếc hộp → on the box; dưới chiếc hộp → under the box.",
      "pairs": [
        {
          "left": "bên trong hộp",
          "right": "in the box"
        },
        {
          "left": "trên chiếc hộp",
          "right": "on the box"
        },
        {
          "left": "dưới chiếc hộp",
          "right": "under the box"
        }
      ]
    },
    {
      "id": "tp7",
      "kind": "context",
      "prompt": "Chọn giới từ đúng.",
      "hint": "Chiếc hộp có bao quanh con mèo không?",
      "explanation": "Khi một vật ở bên trong một không gian được bao quanh, dùng `in`: `in the box` là ở trong hộp.",
      "context": "Con mèo ở bên trong chiếc hộp.",
      "options": [
        "in",
        "on",
        "under"
      ],
      "answer": "in"
    },
    {
      "id": "pl5",
      "kind": "choice",
      "prompt": "Giới từ nào nói quyển sách nằm trên và chạm vào mặt bàn?",
      "hint": "Xét ba quan hệ: được bao quanh, chạm vào bề mặt hay nằm ngay bên dưới. Quyển sách ở đây thuộc quan hệ nào?",
      "explanation": "on the table là trên mặt bàn: vật nằm trên và tiếp xúc với bề mặt.",
      "options": [
        "in",
        "on",
        "under"
      ],
      "answer": "on"
    },
    {
      "id": "pl6",
      "kind": "order",
      "prompt": "Sắp xếp câu “Chiếc túi ở dưới ghế.”",
      "hint": "Câu cần chủ ngữ, be, giới từ rồi nơi làm mốc.",
      "explanation": "The bag is under the chair. đúng cấu trúc.",
      "tokens": [
        "under",
        "The bag",
        "the chair",
        "is",
        "."
      ],
      "answer": [
        "The bag",
        "is",
        "under",
        "the chair",
        "."
      ]
    },
    {
      "id": "pl7",
      "kind": "choice",
      "prompt": "The books ___ in the box.",
      "hint": "The books là số nhiều.",
      "explanation": "The books are in the box. là câu đầy đủ.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "answer": "are"
    },
    {
      "id": "pl8",
      "kind": "grid",
      "prompt": "Chọn giới từ và giữ đủ be trong câu.",
      "hint": "Tìm quan hệ vị trí rồi kiểm tra be.",
      "explanation": "Ba câu đều có chủ ngữ + be + giới từ + nơi chốn.",
      "rows": [
        {
          "cue": "Con mèo ở trong hộp.",
          "options": [
            "The cat is in the box.",
            "The cat in the box.",
            "The cat is on the box."
          ],
          "answer": "The cat is in the box.",
          "completed": "The cat is in the box."
        },
        {
          "cue": "Sách ở trên bàn.",
          "options": [
            "The books are on the table.",
            "The books is on the table.",
            "The books are under the table."
          ],
          "answer": "The books are on the table.",
          "completed": "The books are on the table."
        },
        {
          "cue": "Túi ở dưới ghế.",
          "options": [
            "The bag is under the chair.",
            "The bag under the chair.",
            "The bag is in the chair."
          ],
          "answer": "The bag is under the chair.",
          "completed": "The bag is under the chair."
        }
      ]
    },
    {
      "id": "pl9",
      "kind": "tap",
      "prompt": "Trong `The bag is under the chair`, chọn giới từ chỉ vị trí.",
      "hint": "Từ nào có nghĩa “ở dưới”?",
      "explanation": "under là giới từ chỉ vị trí phía dưới; the chair là vật làm mốc.",
      "tokens": [
        "The bag",
        "is",
        "under",
        "the chair",
        "."
      ],
      "answerIndexes": [
        2
      ],
      "selectionMode": "single"
    },
    {
      "id": "pl10",
      "kind": "sort",
      "prompt": "Phân loại mỗi cụm theo vị trí của vật so với vật làm mốc.",
      "hint": "Hình dung vị trí của vật so với từng vật làm mốc: hộp, túi, bàn, tường, ghế hay giường.",
      "explanation": "`In` chỉ bên trong, `on` chỉ trên và chạm bề mặt, `under` chỉ ngay bên dưới vật làm mốc.",
      "buckets": [
        "Bên trong",
        "Trên bề mặt",
        "Phía dưới"
      ],
      "items": [
        {
          "text": "in the box",
          "bucket": "Bên trong"
        },
        {
          "text": "in the bag",
          "bucket": "Bên trong"
        },
        {
          "text": "on the table",
          "bucket": "Trên bề mặt"
        },
        {
          "text": "on the wall",
          "bucket": "Trên bề mặt"
        },
        {
          "text": "under the chair",
          "bucket": "Phía dưới"
        },
        {
          "text": "under the bed",
          "bucket": "Phía dưới"
        }
      ]
    }
  ],
  "prepositions-place-time": compactPracticeSet({
    prefix: "a1pt",
    focus: "in, on và at với nơi chốn và thời gian",
    choices: [
      ["Giới từ nào phù hợp với `___ the kitchen` khi nói ở bên trong bếp?", ["in", "on", "at"], "in", "`In` nhìn nơi chốn như một không gian bao quanh."],
      ["Cụm nào đúng khi nói “trên tường”?", ["on the wall", "in the wall", "at the wall"], "on the wall", "Một vật gắn trên bề mặt tường dùng `on`."],
      ["Cụm nào nói “tại điểm dừng xe buýt”?", ["at the bus stop", "in the bus stop", "on the bus stop"], "at the bus stop", "`At` nhìn địa điểm như một điểm cụ thể."],
      ["Giới từ nào dùng trước `Monday`?", ["on", "in", "at"], "on", "Ngày trong tuần dùng `on`."],
      ["Cụm nào đúng để nói “vào tháng Bảy”?", ["in July", "on July", "at July"], "in July", "Tháng là một khoảng thời gian rộng, dùng `in`."],
      ["Cụm nào đúng để nói “lúc bảy giờ”?", ["at seven o'clock", "on seven o'clock", "in seven o'clock"], "at seven o'clock", "Thời điểm cụ thể dùng `at`."],
      ["Cụm cố định nào đúng?", ["at night", "in night", "on night"], "at night", "Nói `in the morning` nhưng `at night`."],
      ["Cách nào đúng để nói “thứ Hai tới”?", ["next Monday", "on next Monday", "in next Monday"], "next Monday", "Không đặt `in/on/at` trước `next` trong cụm này."],
      ["Câu nào nhấn mạnh đang ở bên trong tòa nhà trường?", ["She is in the school.", "She is at school.", "She is on school."], "She is in the school.", "`In the school` nhấn mạnh bên trong tòa nhà; `at school` thường nói địa điểm hoạt động học."],
      ["Cụm nào dùng đúng giới từ để nói “vào sáng thứ Sáu”?", ["on Friday morning", "in Friday morning", "at Friday morning"], "on Friday morning", "Khi buổi trong ngày gắn với một thứ cụ thể, ta dùng giới từ đi với ngày, không dùng giới từ đi với buổi."],
    ],
    orders: [
      ["Sắp xếp câu “Chúng tôi ở nhà vào buổi tối.”", ["evening", "We", "home", "are", "at", "in", "the", "."], ["We", "are", "at", "home", "in", "the", "evening", "."], "`At home` là nơi chốn; `in the evening` là thời gian."],
      ["Sắp xếp câu “Lớp học vào thứ Ba lúc chín giờ.”", ["Tuesday", "class", "at", "The", "nine", "is", "on", "."], ["The", "class", "is", "on", "Tuesday", "at", "nine", "."], "Ngày dùng `on`; giờ dùng `at`."],
      ["Sắp xếp câu “Bức ảnh ở trên tường trong phòng khách.”", ["the", "the", "picture", "living", "on", "is", "wall", "The", "in", "room", "."], ["The", "picture", "is", "on", "the", "wall", "in", "the", "living", "room", "."], "Vật trên bề mặt dùng `on`; không gian bao quanh dùng `in`."],
      ["Sắp xếp câu “Lễ hội diễn ra ở Huế vào tháng Sáu.”", ["June", "is", "Hue", "in", "The", "festival", "in", "."], ["The", "festival", "is", "in", "Hue", "in", "June", "."], "Thành phố và tháng đều dùng `in` trong các mẫu này."],
    ],
    repairs: [
      ["Chọn giới từ đúng trước ngày.", ["We", "study", "in", "Monday", "."], 2, ["in", "on", "at"], "on", "Dùng `on Monday`."],
      ["Chọn giới từ đúng trước thời điểm `noon`.", ["Lunch", "is", "in", "noon", "."], 2, ["in", "on", "at"], "at", "`At noon` là cụm chỉ thời điểm cụ thể."],
      ["Chọn cụm thời gian đúng.", ["I", "am", "busy", "in this morning", "."], 3, ["this morning", "in this morning", "on this morning"], "this morning", "Không dùng giới từ trước `this morning`."],
    ],
    taps: [
      ["Trong `The keys are on the desk in the office`, chọn tất cả giới từ vị trí.", ["The", "keys", "are", "on", "the", "desk", "in", "the", "office", "."], [3, 6], "`On` chỉ bề mặt bàn; `in` chỉ không gian văn phòng."],
      ["Trong `We meet on Friday at six`, chọn tất cả giới từ thời gian.", ["We", "meet", "on", "Friday", "at", "six", "."], [2, 4], "`On` đi với ngày; `at` đi với giờ."],
      ["Trong `I work at home every day`, chọn cụm thời gian không cần giới từ.", ["I", "work", "at", "home", "every", "day", "."], [4, 5], "`Every day` không có `in/on/at` phía trước."],
    ],
    matchPrompt: "Ghép mỗi cụm với giới từ đúng và lý do.",
    pairs: [{ left: "___ March", right: "in — một khoảng thời gian rộng" }, { left: "___ Saturday", right: "on — một ngày cụ thể" }, { left: "___ ten o'clock", right: "at — một giờ cụ thể" }, { left: "___ the desk", right: "on — một bề mặt" }],
    sortPrompt: "Phân loại các cụm theo giới từ đúng.",
    buckets: ["in", "on", "at"],
    items: [{ text: "___ the room", bucket: "in" }, { text: "___ 2026", bucket: "in" }, { text: "___ the floor", bucket: "on" }, { text: "___ Sunday", bucket: "on" }, { text: "___ home", bucket: "at" }, { text: "___ midnight", bucket: "at" }],
    gridPrompts: ["Chọn giới từ nơi chốn cho từng cụm.", "Chọn giới từ thời gian cho từng mốc.", "Chọn cách viết đúng với các từ thời gian đặc biệt."],
    gridRows: [
      { cue: "___ Vietnam", options: ["in", "on", "at"], answer: "in", completed: "in Vietnam" },
      { cue: "___ the door", options: ["at", "in", "on"], answer: "at", completed: "at the door" },
      { cue: "___ the table", options: ["on", "in", "at"], answer: "on", completed: "on the table" },
      { cue: "___ winter", options: ["in", "on", "at"], answer: "in", completed: "in winter" },
      { cue: "___ 5 August", options: ["on", "in", "at"], answer: "on", completed: "on 5 August" },
      { cue: "___ night", options: ["at", "in", "on"], answer: "at", completed: "at night" },
      { cue: "___ last year", options: ["không có giới từ", "in", "on"], answer: "không có giới từ", completed: "last year" },
      { cue: "___ every morning", options: ["không có giới từ", "in", "at"], answer: "không có giới từ", completed: "every morning" },
      { cue: "___ Monday morning", options: ["on", "in", "at"], answer: "on", completed: "on Monday morning" },
    ],
  }),
};

const a1Chapter05TopUps: Partial<Record<string, Exercise[]>> = {
  "there-and-place": [
    ...binaryChoiceDrills("a1thx", 1, "there is/are", [
      ["một ngân hàng gần đây", "There is a bank near here.", "There are a bank near here.", "Một danh từ đếm được số ít dùng `there is`."],
      ["ba cửa sổ trong phòng", "There are three windows in the room.", "There is three windows in the room.", "Danh từ số nhiều dùng `there are`."],
      ["câu “Có nước trong chai”", "There is water in the bottle.", "There are water in the bottle.", "Danh từ không đếm được dùng `there is`."],
      ["phủ định một chuyến xe buýt", "There isn't a bus today.", "There aren't a bus today.", "Một danh từ số ít dùng `isn't`."],
      ["không có chiếc ghế nào", "There are no chairs.", "There is no chairs.", "Danh từ số nhiều `chairs` dùng `are`."],
      ["câu hỏi về một nhà vệ sinh", "Is there a bathroom?", "Are there a bathroom?", "Một danh từ số ít dùng `Is there...?`."],
      ["câu hỏi về hai lối vào", "Are there two entrances?", "Is there two entrances?", "Số nhiều dùng `Are there...?`."],
      ["câu trả lời ngắn cho `Is there a lift?`", "Yes, there is.", "Yes, it is.", "Câu trả lời giữ `there`."],
    ]),
    {
      id: "a1thx9", kind: "sort", prompt: "Phân loại cụm được giới thiệu theo dạng `there is` hoặc `there are`.",
      buckets: ["there is", "there are"],
      items: [{ text: "a child", bucket: "there is" }, { text: "water", bucket: "there is" }, { text: "an apple", bucket: "there is" }, { text: "two children", bucket: "there are" }, { text: "books", bucket: "there are" }, { text: "people", bucket: "there are" }],
      hint: "Nhìn danh từ là một/không đếm được hay số nhiều.", explanation: "`There is` dùng cho một hoặc không đếm được; `there are` dùng cho số nhiều.",
    },
    {
      id: "a1thx10", kind: "order", prompt: "Sắp xếp câu “Có hai con mèo dưới bàn.”",
      tokens: ["cats", "table", "There", "two", "the", "under", "are", "."],
      answer: ["There", "are", "two", "cats", "under", "the", "table", "."],
      hint: "Bắt đầu bằng `there are` rồi nêu vật và nơi chốn.", explanation: "`Two cats` là số nhiều nên dùng `there are`.",
    },
  ],
  "prepositions-place": [
    ...binaryChoiceDrills("a1plx", 1, "in, on và under", [
      ["con mèo ở bên trong hộp", "The cat is in the box.", "The cat is on the box.", "Chiếc hộp bao quanh con mèo, tức con mèo ở bên trong một không gian, nên dùng `in`."],
      ["quyển sách nằm trên mặt bàn", "The book is on the table.", "The book is in the table.", "Trên và tiếp xúc bề mặt dùng `on`."],
      ["quả bóng nằm ngay dưới mặt ghế", "The ball is under the chair.", "The ball is on the chair.", "Mặt ghế ở ngay phía trên quả bóng, nên cần giới từ `under`."],
      ["bức tranh gắn trên tường", "The picture is on the wall.", "The picture is in the wall.", "Tiếp xúc với bề mặt tường dùng `on`."],
      ["chìa khóa ở trong túi", "The keys are in the bag.", "The keys are on the bag.", "Túi bao quanh chìa khóa nên dùng `in`."],
      ["đôi giày ở dưới giường", "The shoes are under the bed.", "The shoes are in the bed.", "Giày ở ngay bên dưới giường, mặt giường ở phía trên chúng, nên dùng `under`."],
      ["một chiếc cốc trên bàn", "There is a cup on the table.", "There are a cup on the table.", "Một chiếc cốc dùng `there is`; vị trí bề mặt dùng `on`."],
      ["nhiều quyển sách trong hộp", "There are books in the box.", "There is books in the box.", "`Books` là danh từ số nhiều, nên câu giới thiệu dùng `there are`; hộp bao quanh sách nên dùng `in`."],
      ["một con chó dưới chiếc bàn lớn", "The dog is under the big table.", "The dog are under the big table.", "`The dog` là một con chó, chủ ngữ số ít, nên dùng `is`; giới từ `under` không đổi theo chủ ngữ."],
      ["nhiều con mèo trong vườn", "The cats are in the garden.", "The cats is in the garden.", "`The cats` là nhiều con mèo, chủ ngữ số nhiều, nên dùng `are`; khu vườn bao quanh chúng nên dùng `in`."],
      ["cụm “trên giá”", "on the shelf", "on shelf", "Danh từ đếm được số ít `shelf` cần một từ đứng trước như `the` hoặc `a`; cụm giới từ vẫn phải có đủ cụm danh từ phía sau."],
      ["câu giới thiệu có điện thoại trong túi", "There is a phone in the bag.", "The phone is in the bag.", "Câu giới thiệu một chiếc điện thoại người nghe chưa biết, nên dùng cấu trúc báo sự hiện diện."],
      ["câu nói vị trí của điện thoại đã biết", "The phone is in the bag.", "There is a phone in the bag.", "Chiếc điện thoại đã được biết, nên câu nói vị trí của nó và bắt đầu bằng chính vật ấy."],
      ["chiếc cốc vừa ở trên bàn vừa ở trong bếp", "The cup is on the table in the kitchen.", "The cup is in the table on the kitchen.", "Hãy xét từng vật làm mốc: chiếc cốc chạm mặt bàn, còn căn bếp bao quanh cả bàn lẫn cốc."],
      ["điện thoại trên bàn của Lan", "The phone is on Lan's desk.", "The phone is in Lan's desk.", "Vật nằm trên bề mặt bàn dùng `on`."],
      ["một quả táo trong bát", "There is an apple in the bowl.", "There are an apple on the bowl.", "Đếm số quả táo để chọn dạng `be`, rồi xét chiếc bát có bao quanh quả táo không."],
      ["nhiều quả táo trong bát", "There are apples in the bowl.", "There is apples in the bowl.", "`Apples` là số nhiều nên câu giới thiệu dùng `there are`."],
    ]),
  ],
  "prepositions-place-time": [
    {
      id: "a1pt26", kind: "choice", prompt: "Trong câu nào, `on` nói về thời gian chứ không nói vị trí?",
      options: ["The party is on Saturday.", "The cat is on the sofa.", "The keys are on the desk."], answer: "The party is on Saturday.",
      hint: "Xem danh từ đứng ngay sau `on`: đó là một bề mặt hay một ngày?",
      explanation: "`On Saturday` nói ngày diễn ra bữa tiệc (Bữa tiệc vào thứ Bảy). Với `the sofa` và `the desk`, `on` nói vật nằm trên một bề mặt.",
    },
    {
      id: "a1pt27", kind: "choice", prompt: "Câu nào đúng để nói “Bố tôi đang ở chỗ làm”?",
      options: ["My father is at work.", "My father is in work.", "My father is on work."], answer: "My father is at work.",
      hint: "Chỗ làm là một địa điểm sinh hoạt quen thuộc, giống trường học và nhà.",
      explanation: "Giống `at school` và `at home`, `at work` là cụm cố định chỉ địa điểm hoạt động: đang ở chỗ làm.",
    },
    {
      id: "a1pt28", kind: "choice", prompt: "Cụm nào đúng để nói “vào buổi chiều”?",
      options: ["in the afternoon", "on the afternoon", "at the afternoon"], answer: "in the afternoon",
      hint: "Buổi trong ngày, khi không gắn với một thứ cụ thể, đi cùng giới từ của khoảng thời gian.",
      explanation: "Buổi trong ngày là một khoảng thời gian, nên nói `in the morning`, `in the afternoon`, `in the evening`; chỉ `at night` là cụm cố định khác.",
    },
  ],
};

const a1Chapter05DepthExtensions: Partial<Record<string, Exercise[]>> = {
  "prepositions-place": [{
    id: "a1depth-place-1", kind: "match", prompt: "Ghép mỗi vị trí với câu miêu tả chính xác vị trí đó.",
    hint: "Hình dung vật được bao quanh, chạm bề mặt hay nằm ngay bên dưới vật làm mốc.",
    explanation: "`In` chỉ bên trong, `on` chỉ trên và chạm bề mặt, còn `under` chỉ ngay bên dưới vật làm mốc.",
    pairs: [
      { left: "chiếc nhẫn ở bên trong hộp", right: "The ring is in the box." },
      { left: "chiếc khăn nằm trên giường", right: "The towel is on the bed." },
      { left: "quả bóng nằm dưới ghế", right: "The ball is under the chair." },
    ],
  }],
};

export const a1Chapter05ExerciseData = mergeExerciseRecords(
  a1Chapter05BaseExerciseData,
  a1Chapter05TopUps,
  a1Chapter05DepthExtensions,
);
