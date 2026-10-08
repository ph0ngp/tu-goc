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
      ["Cách nào có nghĩa “hai ổ bánh mì”?", ["two loaves of bread", "two breads", "two bread"], "two loaves of bread", "`Bread` giữ nguyên sau đơn vị đếm được `loaves`."],
      ["Câu nào dùng `be` đúng?", ["The rice is hot.", "The rice are hot.", "The rices are hot."], "The rice is hot.", "`Rice` không đếm được và đi với động từ số ít khi làm chủ ngữ."],
      ["Danh từ nào đếm được trong nghĩa đang dùng?", ["a chicken — một con gà", "chicken — thịt gà", "water — nước"], "a chicken — một con gà", "Con gà là một đơn vị có thể đếm."],
      ["Cụm nào đúng khi nói một chiếc ghế?", ["a chair", "chair", "an chair"], "a chair", "Danh từ đếm được số ít cần từ đứng trước; `chair` bắt đầu bằng âm phụ âm."],
      ["Cách nào đếm lượng sữa?", ["three bottles of milk", "three milks", "three bottle of milks"], "three bottles of milk", "Chuyển `bottle` sang số nhiều; `milk` giữ nguyên."],
      ["Danh từ nào có dạng số nhiều thông thường trong lựa chọn?", ["books", "money", "sugar"], "books", "`Book` là danh từ đếm được: `book/books`."],
      ["Câu nào dùng `bread` đúng khi nói bánh mì nói chung?", ["Bread is fresh.", "A bread is fresh.", "Breads are fresh."], "Bread is fresh.", "`Bread` thường không đếm được, không dùng `a` và không thêm `-s` trong nghĩa này."],
      ["Câu nào đúng khi nói thông tin nói chung?", ["This information is useful.", "These informations are useful.", "An information is useful."], "This information is useful.", "`Information` không đếm được và không có số nhiều `informations` trong nghĩa này."],
    ],
    orders: [
      ["Sắp xếp cụm “hai cốc nước”.", ["water", "glasses", "of", "two"], ["two", "glasses", "of", "water"], "Danh từ đếm được `glass` mang số nhiều; `water` giữ nguyên."],
      ["Sắp xếp câu “Có đường trong bát.”", ["sugar", "There", "in", "is", "the", "bowl", "."], ["There", "is", "sugar", "in", "the", "bowl", "."], "`Sugar` không đếm được nên dùng `there is`; danh từ giữ nguyên."],
      ["Sắp xếp cụm “ba mẩu thông tin”.", ["information", "pieces", "three", "of"], ["three", "pieces", "of", "information"], "Đếm `pieces`, không thêm `-s` vào `information`."],
      ["Sắp xếp câu “Những quả táo này tươi.”", ["fresh", "These", "are", "apples", "."], ["These", "apples", "are", "fresh", "."], "`Apples` là danh từ đếm được số nhiều."],
    ],
    repairs: [
      ["Chọn dạng danh từ đúng sau `two cups of`.", ["We", "need", "two", "cups", "of", "waters", "."], 5, ["water", "waters", "a water"], "water", "Danh từ không đếm được giữ nguyên sau đơn vị."],
      ["Chọn từ đứng trước danh từ đếm được số ít.", ["I", "have", "book", "."], 2, ["a book", "book", "books"], "a book", "Danh từ đếm được số ít `book` cần một từ như `a`."],
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
      { cue: "This information ___ useful.", options: ["is", "are", "do"], answer: "is", completed: "This information is useful." },
      { cue: "nước", options: ["two glasses of water", "two waters", "two glass of water"], answer: "two glasses of water", completed: "two glasses of water" },
      { cue: "bánh mì", options: ["three pieces of bread", "three breads", "three piece of breads"], answer: "three pieces of bread", completed: "three pieces of bread" },
      { cue: "sữa", options: ["a bottle of milk", "a milk", "a bottle milk"], answer: "a bottle of milk", completed: "a bottle of milk" },
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
      "prompt": "Chạm vào cụm dùng cho nhiều vật.",
      "hint": "Nhiều vật đi với are.",
      "explanation": "There are dùng cho danh từ số nhiều.",
      "tokens": [
        "There is",
        "There are"
      ],
      "answerIndexes": [
        1
      ],
      "selectionMode": "single"
    },
    {
      "id": "tp6",
      "kind": "repair",
      "prompt": "Có hai quyển sách. Hãy sửa be.",
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
      "prompt": "Có một quyển sách trên bàn.",
      "hint": "Một quyển sách dùng There is.",
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
      "hint": "Câu kể là There are; đưa are lên đầu để hỏi.",
      "explanation": "Are there two books? là câu hỏi đúng.",
      "options": [
        "Is",
        "Are",
        "Do"
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
          "cue": "Giới thiệu một quyển sách mới",
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
          "cue": "Hỏi có nhiều sách không",
          "options": [
            "Are there books?",
            "Is there books?",
            "Do there books?"
          ],
          "answer": "Are there books?",
          "completed": "Are there books?"
        }
      ]
    },
    {
      "id": "th9",
      "kind": "grid",
      "prompt": "Kết hợp be, a/an, chỉ định, sở hữu, vị trí và there is/there are.",
      "hint": "Kiểm tra từng phần: số lượng, từ trước danh từ, be và vị trí.",
      "explanation": "Ba câu tổng hợp toàn bộ kiến thức của chương.",
      "rows": [
        {
          "cue": "Một quả táo ở trong hộp.",
          "options": [
            "There is an apple in the box.",
            "There are an apple in the box.",
            "There is a apple on the box."
          ],
          "answer": "There is an apple in the box.",
          "completed": "There is an apple in the box."
        },
        {
          "cue": "Những quyển sách này ở trên bàn.",
          "options": [
            "These books are on the table.",
            "This books is on the table.",
            "Those book are under the table."
          ],
          "answer": "These books are on the table.",
          "completed": "These books are on the table."
        },
        {
          "cue": "Túi của Lan ở dưới ghế.",
          "options": [
            "Lan’s bag is under the chair.",
            "Lan bag are under the chair.",
            "Her bag is on the chair."
          ],
          "answer": "Lan’s bag is under the chair.",
          "completed": "Lan’s bag is under the chair."
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
            "There doesn’t a cat."
          ],
          "answer": "There isn’t a cat.",
          "completed": "There isn’t a cat."
        },
        {
          "cue": "Không có quyển sách nào.",
          "options": [
            "There are no books.",
            "There is no books.",
            "There do no books."
          ],
          "answer": "There are no books.",
          "completed": "There are no books."
        },
        {
          "cue": "Không có một quả táo.",
          "options": [
            "There is not an apple.",
            "There are not an apple.",
            "There does not an apple."
          ],
          "answer": "There is not an apple.",
          "completed": "There is not an apple."
        }
      ]
    },
    {
      "id": "th11",
      "kind": "match",
      "prompt": "Giữ lại there và đúng dạng is hoặc are.",
      "hint": "Is there đi với there is; Are there đi với there are.",
      "explanation": "Mỗi câu trả lời ngắn giữ đúng số lượng.",
      "pairs": [
        {
          "left": "Is there a cat?",
          "right": "Yes, there is."
        },
        {
          "left": "Are there books?",
          "right": "No, there aren’t."
        },
        {
          "left": "Are there two chairs?",
          "right": "Yes, there are."
        }
      ]
    },
    {
      "id": "th12",
      "kind": "choice",
      "prompt": "There’s a book. có cùng nghĩa với câu nào?",
      "hint": "There’s là dạng rút gọn của There is.",
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
      "prompt": "Kết hợp số lượng, âm đầu và khoảng cách.",
      "hint": "Kiểm tra một/nhiều, âm đầu và gần/xa.",
      "explanation": "Ba cụm danh từ đã dùng đúng từ đứng trước.",
      "rows": [
        {
          "cue": "Một quả táo",
          "options": [
            "an apple",
            "a apple",
            "an apples"
          ],
          "answer": "an apple",
          "completed": "an apple"
        },
        {
          "cue": "Một quyển sách ở gần",
          "options": [
            "this book",
            "these books",
            "that books"
          ],
          "answer": "this book",
          "completed": "this book"
        },
        {
          "cue": "Nhiều con mèo ở xa",
          "options": [
            "those cats",
            "that cat",
            "these cat"
          ],
          "answer": "those cats",
          "completed": "those cats"
        }
      ]
    },
    {
      "id": "th14",
      "kind": "grid",
      "prompt": "Chọn từ sở hữu hoặc ’s theo người được nêu.",
      "hint": "Nêu tên thì dùng ’s; dùng đại từ thì chọn dạng sở hữu.",
      "explanation": "Ba cụm đã chỉ đúng người có liên hệ.",
      "rows": [
        {
          "cue": "Quyển sách của tôi",
          "options": [
            "my book",
            "I book",
            "me book"
          ],
          "answer": "my book",
          "completed": "my book"
        },
        {
          "cue": "Chiếc túi của Lan",
          "options": [
            "Lan’s bag",
            "Lan bag",
            "her’s bag"
          ],
          "answer": "Lan’s bag",
          "completed": "Lan’s bag"
        },
        {
          "cue": "Ngôi nhà của họ",
          "options": [
            "their house",
            "they house",
            "them house"
          ],
          "answer": "their house",
          "completed": "their house"
        }
      ]
    },
    {
      "id": "th15",
      "kind": "grid",
      "prompt": "Kết hợp câu phủ định, câu hỏi, vị trí và sự tồn tại.",
      "hint": "Tìm be, kiểm tra số lượng rồi xác định câu đang nói vị trí hay sự tồn tại.",
      "explanation": "Ba câu tổng hợp những cấu trúc quan trọng nhất của chương về động từ be.",
      "rows": [
        {
          "cue": "Cô ấy không ở nhà.",
          "options": [
            "She isn’t at home.",
            "She doesn’t at home.",
            "She not is at home."
          ],
          "answer": "She isn’t at home.",
          "completed": "She isn’t at home."
        },
        {
          "cue": "Những quyển sách có ở trong hộp không?",
          "options": [
            "Are the books in the box?",
            "Is the books in the box?",
            "Do the books in the box?"
          ],
          "answer": "Are the books in the box?",
          "completed": "Are the books in the box?"
        },
        {
          "cue": "Có hai con mèo dưới ghế.",
          "options": [
            "There are two cats under the chair.",
            "There is two cats under the chair.",
            "Two cats are there under chair."
          ],
          "answer": "There are two cats under the chair.",
          "completed": "There are two cats under the chair."
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
      ["Câu nào không dùng hai lần phủ định?", ["There is no bread.", "There isn't no bread.", "There doesn't no bread."], "There is no bread.", "Có thể dùng `no` hoặc `not ... any`, không dùng cả hai."],
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
      ["Chọn từ chỉ lượng phù hợp trong câu hỏi trung lập.", ["Are", "there", "some", "banks", "near", "here", "?"], 2, ["some", "any", "no"], "any", "Câu hỏi trung lập dùng `any`."],
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
      { cue: "Are there ___ questions?", options: ["any", "some", "a"], answer: "any", completed: "Are there any questions?" },
      { cue: "There ___ some bread.", options: ["is", "are", "do"], answer: "is", completed: "There is some bread." },
      { cue: "There ___ some oranges.", options: ["are", "is", "does"], answer: "are", completed: "There are some oranges." },
      { cue: "___ there any water?", options: ["Is", "Are", "Do"], answer: "Is", completed: "Is there any water?" },
      { cue: "một quyển sách", options: ["There is a book.", "There is some book.", "There are any book."], answer: "There is a book.", completed: "There is a book." },
      { cue: "một ít sách", options: ["There are some books.", "There is some books.", "There are a books."], answer: "There are some books.", completed: "There are some books." },
      { cue: "không có sữa", options: ["There isn't any milk.", "There aren't any milk.", "There isn't some milks."], answer: "There isn't any milk.", completed: "There isn't any milk." },
    ],
  }),
  "prepositions-place": [
    {
      "id": "tp2",
      "kind": "match",
      "prompt": "Dùng hình dung về chiếc hộp.",
      "hint": "in = trong; on = trên; under = dưới.",
      "explanation": "Ba giới từ mô tả ba vị trí khác nhau.",
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
      "hint": "Bên trong = in.",
      "explanation": "in the box diễn tả ở trong hộp.",
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
      "prompt": "Quyển sách nằm trên và chạm vào mặt bàn.",
      "hint": "on diễn tả trên bề mặt.",
      "explanation": "on the table là trên mặt bàn.",
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
      "prompt": "Chiếc túi ở dưới ghế.",
      "hint": "Câu cần chủ ngữ, be, giới từ rồi nơi làm mốc.",
      "explanation": "The bag is under the chair. đúng cấu trúc.",
      "tokens": [
        "under",
        "The bag",
        "the chair",
        "is"
      ],
      "answer": [
        "The bag",
        "is",
        "under",
        "the chair"
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
      "prompt": "Chạm vào cụm chỉ vị trí",
      "hint": "Từ nào có nghĩa “ở dưới”?",
      "explanation": "under là giới từ chỉ vị trí phía dưới.",
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
      "prompt": "Đặt từng cụm vào đúng ý nghĩa.",
      "hint": "Hình dung vị trí của vật so với chiếc hộp, bàn hoặc ghế.",
      "explanation": "in, on và under đã được ghép đúng với vị trí.",
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
          "text": "on the table",
          "bucket": "Trên bề mặt"
        },
        {
          "text": "under the chair",
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
      ["Cụm nào đúng trước tháng?", ["in July", "on July", "at July"], "in July", "Tháng là một khoảng thời gian rộng, dùng `in`."],
      ["Cụm nào đúng trước giờ?", ["at seven o'clock", "on seven o'clock", "in seven o'clock"], "at seven o'clock", "Thời điểm cụ thể dùng `at`."],
      ["Cụm cố định nào đúng?", ["at night", "in night", "on night"], "at night", "Nói `in the morning` nhưng `at night`."],
      ["Cách nào không dùng giới từ?", ["next Monday", "on next Monday", "in next Monday"], "next Monday", "Không đặt `in/on/at` trước `next` trong cụm này."],
      ["Câu nào nhấn mạnh đang ở bên trong tòa nhà trường?", ["She is in the school.", "She is at school.", "She is on school."], "She is in the school.", "`In the school` nhấn mạnh bên trong tòa nhà; `at school` thường nói địa điểm hoạt động học."],
      ["Câu nào dùng cùng một giới từ cho thời gian?", ["on Friday morning", "in Friday morning", "at Friday morning"], "on Friday morning", "Khi buổi đi cùng ngày cụ thể, dùng `on`."],
    ],
    orders: [
      ["Sắp xếp câu “Chúng tôi ở nhà vào buổi tối.”", ["evening", "We", "home", "are", "at", "in", "the", "."], ["We", "are", "at", "home", "in", "the", "evening", "."], "`At home` là nơi chốn; `in the evening` là thời gian."],
      ["Sắp xếp câu “Lớp học vào thứ Ba lúc chín giờ.”", ["Tuesday", "class", "at", "The", "nine", "is", "on", "."], ["The", "class", "is", "on", "Tuesday", "at", "nine", "."], "Ngày dùng `on`; giờ dùng `at`."],
      ["Sắp xếp câu “Bức ảnh ở trên tường trong phòng khách.”", ["the", "the", "picture", "living", "on", "is", "wall", "The", "in", "room", "."], ["The", "picture", "is", "on", "the", "wall", "in", "the", "living", "room", "."], "Vật trên bề mặt dùng `on`; không gian bao quanh dùng `in`."],
      ["Sắp xếp câu “Tôi làm việc ở Hà Nội vào năm 2026.”", ["2026", "work", "Hanoi", "in", "I", "in", "."], ["I", "work", "in", "Hanoi", "in", "2026", "."], "Thành phố và năm đều dùng `in` trong các mẫu này."],
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
    matchPrompt: "Ghép mỗi loại mốc với giới từ thường dùng.",
    pairs: [{ left: "tháng/năm", right: "in — khoảng thời gian rộng" }, { left: "ngày cụ thể", right: "on — ngày" }, { left: "giờ cụ thể", right: "at — thời điểm" }, { left: "bề mặt", right: "on — bề mặt" }],
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
      ["một ít nước trong chai", "There is water in the bottle.", "There are water in the bottle.", "Danh từ không đếm được dùng `there is`."],
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
      ["con mèo ở bên trong hộp", "The cat is in the box.", "The cat is on the box.", "Bên trong một không gian dùng `in`."],
      ["quyển sách nằm trên mặt bàn", "The book is on the table.", "The book is in the table.", "Trên và tiếp xúc bề mặt dùng `on`."],
      ["quả bóng ở phía dưới ghế", "The ball is under the chair.", "The ball is on the chair.", "Phía dưới vật làm mốc dùng `under`."],
      ["bức tranh gắn trên tường", "The picture is on the wall.", "The picture is in the wall.", "Tiếp xúc với bề mặt tường dùng `on`."],
      ["chìa khóa ở trong túi", "The keys are in the bag.", "The keys are on the bag.", "Túi bao quanh chìa khóa nên dùng `in`."],
      ["đôi giày ở dưới giường", "The shoes are under the bed.", "The shoes are in the bed.", "Vị trí thấp hơn giường dùng `under`."],
      ["một chiếc cốc trên bàn", "There is a cup on the table.", "There are a cup on the table.", "Một chiếc cốc dùng `there is`; vị trí bề mặt dùng `on`."],
      ["nhiều quyển sách trong hộp", "There are books in the box.", "There is books in the box.", "Danh từ số nhiều dùng `there are`."],
      ["một con chó dưới chiếc bàn lớn", "The dog is under the big table.", "The dog are under the big table.", "Chủ ngữ số ít dùng `is`."],
      ["nhiều con mèo trong vườn", "The cats are in the garden.", "The cats is in the garden.", "Chủ ngữ số nhiều dùng `are`."],
      ["cụm chưa thành câu “trên giá”", "on the shelf", "The shelf on.", "Cụm giới từ bắt đầu bằng `on`."],
      ["câu giới thiệu có điện thoại trong túi", "There is a phone in the bag.", "The phone is in the bag.", "`There is` giới thiệu sự hiện diện của một điện thoại chưa xác định."],
      ["câu nói vị trí của điện thoại đã biết", "The phone is in the bag.", "There is a phone in the bag.", "Bắt đầu bằng `the phone` khi vật đã xác định."],
      ["hai quan hệ cùng đúng của cốc trong bếp và trên bàn", "The cup is on the table in the kitchen.", "The cup is under the kitchen on the table.", "Một vật có thể `on` bàn và `in` bếp cùng lúc."],
      ["điện thoại trên bàn của Lan", "The phone is on Lan's desk.", "The phone is in Lan's desk.", "Vật nằm trên bề mặt bàn dùng `on`."],
      ["một quả táo trong bát", "There is an apple in the bowl.", "There are an apple on the bowl.", "Một quả táo dùng `there is`; bên trong bát dùng `in`."],
      ["nhiều quả táo trong bát", "There are apples in the bowl.", "There is apples in the bowl.", "Nhiều quả táo dùng `there are`."],
    ]),
  ],
};

const a1Chapter05DepthExtensions: Partial<Record<string, Exercise[]>> = {
  "prepositions-place": [{
    id: "a1depth-place-1", kind: "match", prompt: "Ghép mỗi vị trí với câu miêu tả chính xác vị trí đó.",
    hint: "Hình dung vật được bao quanh, chạm bề mặt hay nằm thấp hơn vật làm mốc.",
    explanation: "`In` chỉ bên trong, `on` chỉ trên bề mặt và `under` chỉ phía dưới.",
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
