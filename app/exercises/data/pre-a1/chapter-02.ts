/* Luyện tập PRE-A1 — Chương 2: Cụm danh từ đầu tiên. */
import type { Exercise } from "../../../exercise-types.ts";
import { choiceExercises, orderExercises, repairExercises, tapExercises } from "../../basic-builders.ts";

export const preA1Chapter02ExerciseData: Record<string, Exercise[]> = {
  "noun-types": [
    {
      "id": "nt1",
      "kind": "match",
      "prompt": "Ghép mỗi khái niệm với cách hiểu phù hợp.",
      "hint": "Phân biệt tên gọi chung, tên riêng, khả năng đếm và số lượng một.",
      "explanation": "Bốn khái niệm đã được ghép với đúng phạm vi của chúng.",
      "pairs": [
        { "left": "danh từ chung", "right": "gọi tên một loại" },
        { "left": "danh từ riêng", "right": "gọi đúng tên một người hoặc nơi" },
        { "left": "danh từ đếm được", "right": "có thể đếm thành từng đơn vị" },
        { "left": "số ít", "right": "chỉ đúng một người hoặc vật" }
      ]
    },
    {
      "id": "nt2",
      "kind": "sort",
      "prompt": "Phân loại các danh từ thành tên gọi chung hoặc tên riêng.",
      "hint": "Tên riêng gọi đúng tên và bắt đầu bằng chữ hoa.",
      "explanation": "teacher, cat, book và school là tên gọi chung; Lan, Nam, Hanoi và Vietnam là tên riêng.",
      "buckets": ["Danh từ chung", "Danh từ riêng"],
      "items": [
        { "text": "teacher", "bucket": "Danh từ chung" },
        { "text": "cat", "bucket": "Danh từ chung" },
        { "text": "book", "bucket": "Danh từ chung" },
        { "text": "school", "bucket": "Danh từ chung" },
        { "text": "Lan", "bucket": "Danh từ riêng" },
        { "text": "Nam", "bucket": "Danh từ riêng" },
        { "text": "Hanoi", "bucket": "Danh từ riêng" },
        { "text": "Vietnam", "bucket": "Danh từ riêng" }
      ]
    },
    {
      "id": "nt3",
      "kind": "grid",
      "prompt": "Chọn cách phân loại đúng cho từng danh từ.",
      "hint": "Hỏi từ ấy gọi một loại hay gọi đúng tên.",
      "explanation": "Mai và Vietnam là tên riêng; cat và school là tên gọi chung.",
      "rows": [
        { "cue": "Mai", "options": ["danh từ chung", "danh từ riêng"], "answer": "danh từ riêng", "completed": "Mai — danh từ riêng" },
        { "cue": "cat", "options": ["danh từ chung", "danh từ riêng"], "answer": "danh từ chung", "completed": "cat — danh từ chung" },
        { "cue": "Vietnam", "options": ["danh từ chung", "danh từ riêng"], "answer": "danh từ riêng", "completed": "Vietnam — danh từ riêng" },
        { "cue": "school", "options": ["danh từ chung", "danh từ riêng"], "answer": "danh từ chung", "completed": "school — danh từ chung" }
      ]
    },
    ...choiceExercises("nt", 4, [
      ["Từ nào là danh từ chung gọi tên một nghề nghiệp?", ["teacher", "Lan", "Vietnam"], "teacher", "teacher nghĩa là giáo viên, một tên nghề nghiệp chung.", "teacher là danh từ chung gọi tên một loại người."],
      ["Từ nào là tên riêng của một người?", ["Mai", "teacher", "cat"], "Mai", "Tên riêng gọi đích danh một người.", "Mai là danh từ riêng và bắt đầu bằng chữ hoa."],
      ["Từ nào là danh từ chung gọi tên một nơi?", ["school", "Hanoi", "Vietnam"], "school", "school nghĩa là trường học nói chung.", "school là danh từ chung gọi tên một loại nơi chốn."],
      ["Từ nào là tên riêng của một thành phố?", ["Hanoi", "city", "school"], "Hanoi", "Hanoi là tên tiếng Anh của thành phố Hà Nội.", "Hanoi là danh từ riêng."],
      ["Trong một câu viết bình thường, cách nào viết đúng tên nước Việt Nam bằng tiếng Anh?", ["vietnam", "Vietnam", "vietNam"], "Vietnam", "Tên riêng bắt đầu bằng chữ hoa và các chữ còn lại viết thường trong cách viết thông thường.", "Vietnam là cách viết thông thường của tên riêng này."],
      ["Từ nào là danh từ đếm được trong nghĩa đang xét?", ["book", "happy", "read"], "book", "Ta có thể đếm từng quyển sách.", "book là danh từ đếm được; happy là tính từ và read là động từ."],
      ["Khái niệm số ít nói đến số lượng nào?", ["đúng một", "từ hai trở lên", "không có số lượng"], "đúng một", "So sánh “một quyển sách” với “hai quyển sách”: chữ “ít” trong “số ít” ứng với trường hợp nào?", "Số ít dùng khi nói về đúng một người hoặc vật."],
      ["Nhận xét nào đúng về danh từ riêng?", ["Danh từ riêng gọi đúng tên", "Danh từ riêng luôn gọi một loại", "Danh từ riêng luôn viết thường"], "Danh từ riêng gọi đúng tên", "Hãy nghĩ đến Lan hoặc Hanoi.", "Danh từ riêng gọi đúng tên một người, nơi hoặc tổ chức cụ thể."],
      ["Khi đứng giữa câu, danh từ chung có nghĩa “quyển sách” thường được viết thế nào?", ["book", "Book", "BOOK"], "book", "Danh từ chung không tự nhiên mang chữ hoa chỉ vì nó là danh từ.", "book thường viết thường khi không đứng đầu câu và không thuộc tên riêng."],
      ["Vì sao `Lan` là danh từ riêng?", ["Vì nó gọi đúng tên một người cụ thể", "Vì nó gọi tên cả một loại người", "Vì nó nói một hành động"], "Vì nó gọi đúng tên một người cụ thể", "Hỏi: từ này dùng chung cho nhiều người, hay là tên của một người?", "`Lan` là tên của một người cụ thể, nên là danh từ riêng và luôn viết hoa."],
      ["Vì sao `city`, nghĩa là “thành phố”, là danh từ chung, còn `Hanoi` là danh từ riêng?", ["city gọi một loại nơi; Hanoi gọi đúng tên một thành phố", "city gọi đúng tên một nơi; Hanoi gọi một loại thành phố", "city là tính từ; Hanoi là danh từ"], "city gọi một loại nơi; Hanoi gọi đúng tên một thành phố", "Hỏi: từ nào dùng được cho mọi thành phố, từ nào chỉ dùng cho một thành phố?", "`city` dùng cho mọi thành phố nên là danh từ chung; `Hanoi` là tên của đúng một thành phố nên là danh từ riêng."],
      ["`teacher`, nghĩa là “giáo viên”, được hiểu thế nào trong bài này?", ["danh từ chung đếm được", "danh từ riêng", "đại từ"], "danh từ chung đếm được", "Ta có thể đếm từng giáo viên.", "teacher vừa là danh từ chung vừa là danh từ đếm được trong nghĩa đang xét."],
      ["`Hanoi` được hiểu thế nào?", ["tên riêng của một nơi", "tên chung của mọi thành phố", "động từ chỉ hành động"], "tên riêng của một nơi", "Hanoi gọi đúng tên thành phố Hà Nội.", "Hanoi là danh từ riêng chỉ nơi chốn."],
      ["Trong các mẫu cơ bản của bài, cách gọi tên một người tên Lan là gì?", ["Lan", "a Lan", "an Lan"], "Lan", "Tên riêng được dùng trực tiếp trong phạm vi bài.", "Ta dùng Lan, không đặt a/an trước tên riêng trong mẫu cơ bản này."],
      ["Điều nào cho thấy `book` là danh từ đếm được?", ["Có thể nói một, hai hoặc ba quyển sách", "book miêu tả một đặc điểm", "book thay cho tên một người"], "Có thể nói một, hai hoặc ba quyển sách", "Danh từ đếm được có thể chia thành từng đơn vị.", "Ta có thể đếm từng quyển sách nên book là danh từ đếm được."],
      ["Muốn biến `book` thành một cụm mang nghĩa như “một quyển sách”, tiếng Anh thường cần làm gì?", ["Thêm một từ phù hợp trước book", "Luôn viết Book bằng chữ hoa", "Luôn đổi book thành books"], "Thêm một từ phù hợp trước book", "Bài sau sẽ dạy hai từ a và an.", "Danh từ chung đếm được số ít thường cần một từ phù hợp đứng trước khi tạo thành cụm danh từ."],
      ["Cặp nào gồm một danh từ chung và một danh từ riêng theo đúng thứ tự?", ["school — Hanoi", "Lan — teacher", "Vietnam — Nam"], "school — Hanoi", "Từ đầu phải gọi một loại; từ sau phải gọi đúng tên.", "school là danh từ chung; Hanoi là danh từ riêng."],
    ]),
    ...repairExercises("nt", 21, [
      ["Trong dòng đang cho, hãy thay `hanoi` bằng cách viết thông thường của tên thành phố Hà Nội trong tiếng Anh.", ["Tên thành phố:", "hanoi"], 1, ["hanoi", "Hanoi", "HaNoi"], "Hanoi", "Tên riêng bắt đầu bằng chữ hoa và các chữ còn lại viết thường trong cách viết thông thường.", "Hanoi là cách viết thông thường của tên riêng này."],
      ["Trong dòng `book = danh từ riêng`, hãy thay phần phân loại để dòng trở thành đúng.", ["book", "=", "danh từ riêng"], 2, ["danh từ chung", "danh từ riêng", "đại từ"], "danh từ chung", "book gọi tên một loại đồ vật.", "book là danh từ chung."],
      ["Trong dòng `teacher = danh từ riêng`, hãy thay phần phân loại để dòng trở thành đúng với nghĩa “giáo viên”.", ["teacher", "=", "danh từ riêng"], 2, ["danh từ chung", "danh từ riêng", "tính từ"], "danh từ chung", "teacher gọi tên một nghề nghiệp nói chung.", "teacher là danh từ chung."],
    ]),
    ...tapExercises("nt", 24, [
      ["Chọn tất cả danh từ riêng.", ["Lan", "teacher", "Hanoi", "book"], [0, 2], "Tên riêng gọi đúng tên và bắt đầu bằng chữ hoa.", "Lan và Hanoi là danh từ riêng."],
      ["Chọn tất cả danh từ chung.", ["Vietnam", "cat", "school", "Nam"], [1, 2], "Danh từ chung gọi tên một loại.", "cat và school là danh từ chung."],
      ["Chọn tất cả danh từ đếm được trong nghĩa đã học.", ["book", "happy", "teacher", "run"], [0, 2], "Ta có thể đếm từng quyển sách và từng giáo viên.", "book và teacher là danh từ đếm được; happy là tính từ, run là động từ."],
      ["Chọn tất cả danh từ chung đếm được số ít.", ["cat", "Lan", "book", "Vietnam"], [0, 2], "Tìm tên gọi chung của một đơn vị có thể đếm.", "cat và book là danh từ chung đếm được ở dạng số ít."],
    ])
  ],
  "articles-demonstratives": [
    {
      "id": "ad1",
      "kind": "sort",
      "prompt": "Đặt mỗi từ vào nhóm dùng `a` hoặc `an`.",
      "hint": "Đọc to từng từ: âm đầu tiên nghe như nguyên âm hay phụ âm?",
      "explanation": "a book/a cat; an apple/an orange.",
      "buckets": [
        "a",
        "an"
      ],
      "items": [
        {
          "text": "book",
          "bucket": "a"
        },
        {
          "text": "apple",
          "bucket": "an"
        },
        {
          "text": "cat",
          "bucket": "a"
        },
        {
          "text": "orange",
          "bucket": "an"
        }
      ]
    },
    {
      "id": "ad4",
      "kind": "tap",
      "prompt": "Trong cụm `an apple`, chọn mạo từ.",
      "hint": "Mạo từ đứng trước danh từ apple.",
      "explanation": "an là mạo từ; apple là danh từ.",
      "tokens": [
        "an",
        "apple"
      ],
      "answerIndexes": [
        0
      ],
      "selectionMode": "single"
    },
    {
      "id": "ad6",
      "kind": "repair",
      "prompt": "Chọn mạo từ đúng trước `apple`.",
      "hint": "apple bắt đầu bằng âm nguyên âm.",
      "explanation": "an apple nghĩa là một quả táo.",
      "tokens": [
        "a",
        "apple"
      ],
      "targetIndex": 0,
      "replacements": [
        "a",
        "an",
        "two"
      ],
      "answer": "an"
    },
    {
      "id": "ad8",
      "kind": "choice",
      "prompt": "Cụm nào có nghĩa là “một quả cam”?",
      "hint": "orange bắt đầu bằng âm nguyên âm và đang ở số ít.",
      "explanation": "an orange là cụm đúng.",
      "options": [
        "a orange",
        "an orange",
        "an oranges"
      ],
      "answer": "an orange"
    },
    {
      "id": "aa5",
      "kind": "choice",
      "prompt": "Mạo từ nào hoàn thành cụm `___ cat`?",
      "hint": "cat bắt đầu bằng âm phụ âm.",
      "explanation": "a cat nghĩa là một con mèo.",
      "options": [
        "a",
        "an",
        "two"
      ],
      "answer": "a"
    },
    {
      "id": "aa6",
      "kind": "choice",
      "prompt": "Mạo từ nào hoàn thành cụm `___ old book`?",
      "hint": "Nghe âm đầu của old, không phải book.",
      "explanation": "old bắt đầu bằng âm nguyên âm nên dùng an; two cần danh từ số nhiều.",
      "options": [
        "a",
        "an",
        "two"
      ],
      "answer": "an"
    },
    {
      "id": "aa7",
      "kind": "sort",
      "prompt": "Phân loại các cụm theo việc chúng dùng mạo từ và số lượng đúng hay chưa đúng.",
      "hint": "a/an dùng với một danh từ số ít; chọn theo âm đầu.",
      "explanation": "Hai cụm đúng vừa khớp số lượng vừa khớp âm đầu.",
      "buckets": [
        "Đúng",
        "Chưa đúng"
      ],
      "items": [
        {
          "text": "a book",
          "bucket": "Đúng"
        },
        {
          "text": "an apple",
          "bucket": "Đúng"
        },
        {
          "text": "a books",
          "bucket": "Chưa đúng"
        },
        {
          "text": "an cat",
          "bucket": "Chưa đúng"
        }
      ]
    },
    {
      "id": "aa8",
      "kind": "grid",
      "prompt": "Chọn `a` hoặc `an` cho từng cụm dựa vào âm đầu của từ đứng ngay sau.",
      "hint": "Nghe book, apple và red.",
      "explanation": "Ba cụm dùng đúng mạo từ theo âm đầu.",
      "rows": [
        {
          "cue": "___ book",
          "options": [
            "a",
            "an"
          ],
          "answer": "a",
          "completed": "a book"
        },
        {
          "cue": "___ apple",
          "options": [
            "a",
            "an"
          ],
          "answer": "an",
          "completed": "an apple"
        },
        {
          "cue": "___ red apple",
          "options": [
            "a",
            "an"
          ],
          "answer": "a",
          "completed": "a red apple"
        }
      ]
    },
    {
      "id": "aa9",
      "kind": "choice",
      "prompt": "Mạo từ nào hoàn thành cụm `___ university`, nghĩa là “một trường đại học”?",
      "hint": "university mở đầu bằng âm gần “yu”, giống một âm phụ âm.",
      "explanation": "a university là cụm đúng dù university được viết bằng chữ u.",
      "options": [
        "a",
        "an",
        "two"
      ],
      "answer": "a"
    },
    {
      "id": "aa10",
      "kind": "choice",
      "prompt": "Cụm nào có nghĩa là “một giờ”?",
      "hint": "Trong hour, chữ h không được phát âm nên từ bắt đầu bằng âm nguyên âm.",
      "explanation": "an hour dùng an vì âm đầu của hour là âm nguyên âm.",
      "options": [
        "a hour",
        "an hour",
        "an hours"
      ],
      "answer": "an hour"
    },
    {
      "id": "aa11",
      "kind": "match",
      "prompt": "Ghép mỗi cụm với lý do chọn `a` hoặc `an` của cụm đó.",
      "hint": "Với mỗi cụm, tìm từ đứng ngay sau mạo từ rồi đọc to âm đầu của từ ấy.",
      "explanation": "Âm đầu của từ đứng ngay sau mạo từ quyết định chọn `a` hay `an`, kể cả khi chữ cái đầu dễ gây nhầm.",
      "pairs": [
        { "left": "a university", "right": "chữ cái đầu là u nhưng âm đầu giống âm phụ âm" },
        { "left": "an hour", "right": "chữ h ở đầu không được đọc" },
        { "left": "an old book", "right": "tính từ đứng ngay sau mạo từ bắt đầu bằng âm nguyên âm" },
        { "left": "a red apple", "right": "danh từ bắt đầu bằng âm nguyên âm nhưng từ đứng ngay sau mạo từ thì không" }
      ]
    },
    ...choiceExercises("aa", 12, [
      ["Bạn muốn nói đến một bác sĩ nhưng chưa chỉ rõ người nào; cụm nào phù hợp?", ["a doctor", "an doctor", "two doctors"], "a doctor", "doctor bắt đầu bằng âm phụ âm và đang ở số ít.", "a doctor dùng a trước âm phụ âm và mang ý một bác sĩ chưa được chỉ rõ."],
      ["Mạo từ nào đứng trước `umbrella` trong cụm mang nghĩa “một chiếc ô”?", ["a", "an", "two"], "an", "umbrella bắt đầu bằng âm nguyên âm.", "an umbrella là cụm đúng."],
      ["Cụm nào có nghĩa là “một chiếc túi màu xanh”?", ["a blue bag", "an blue bag", "a bag blue"], "a blue bag", "Từ đứng ngay sau mạo từ là blue và bắt đầu bằng âm phụ âm.", "a blue bag dùng đúng mạo từ và đúng trật tự tính từ trước danh từ."],
      ["Từ đứng ngay sau mạo từ là `interesting`; cần dùng mạo từ nào trong `___ interesting story`?", ["a", "an", "two"], "an", "interesting bắt đầu bằng âm nguyên âm.", "an interesting story dùng an trước âm nguyên âm của interesting."],
      ["Trong các mẫu cơ bản, cách nào gọi trực tiếp tên Mai?", ["Mai", "a Mai", "an Mai"], "Mai", "Mai là danh từ riêng.", "Tên riêng Mai được dùng trực tiếp, không cần a/an trong mẫu này."],
      ["Trong bảng Một/Nhiều của bài, cách nào biểu thị “những quyển sách”?", ["books", "a books", "an books"], "books", "a/an chỉ đi với một danh từ đếm được số ít.", "books là dạng nhiều; không đặt a/an trực tiếp trước nó."],
      ["Khi nào ta dùng a hoặc an trong phạm vi bài này?", ["Trước một danh từ chung đếm được số ít", "Trước mọi tên riêng", "Trước mọi danh từ số nhiều"], "Trước một danh từ chung đếm được số ít", "a/an thường mang ý một.", "a/an đứng trước một danh từ chung đếm được số ít trong phạm vi bài."],
      ["Nếu có tính từ, từ nào quyết định chọn a hay an?", ["Từ đứng ngay sau mạo từ", "Danh từ cuối cụm trong mọi trường hợp", "Tên người nói"], "Từ đứng ngay sau mạo từ", "So sánh a red apple và an old book.", "Âm đầu của từ đứng ngay sau mạo từ quyết định lựa chọn."],
      ["Nhận xét nào đúng?", ["Chọn a/an theo âm đầu, không chỉ theo chữ cái đầu", "Mọi từ bắt đầu bằng chữ u đều dùng an", "Mọi từ bắt đầu bằng chữ h đều dùng a"], "Chọn a/an theo âm đầu, không chỉ theo chữ cái đầu", "Hãy nhớ a university và an hour.", "Quy tắc dựa vào âm đọc thực sự của từ đứng sau."],
    ]),
    {
      "id": "aa21",
      "kind": "grid",
      "prompt": "Chọn mạo từ phù hợp dựa vào âm đầu của từ đứng ngay sau.",
      "hint": "Chú ý hai trường hợp âm đọc đặc biệt university và hour.",
      "explanation": "egg và hour dùng an; university và red apple dùng a.",
      "rows": [
        { "cue": "___ egg", "options": ["a", "an"], "answer": "an", "completed": "an egg" },
        { "cue": "___ university", "options": ["a", "an"], "answer": "a", "completed": "a university" },
        { "cue": "___ hour", "options": ["a", "an"], "answer": "an", "completed": "an hour" },
        { "cue": "___ red apple", "options": ["a", "an"], "answer": "a", "completed": "a red apple" }
      ]
    },
    ...repairExercises("aa", 22, [
      ["Chọn mạo từ đúng trước `doctor`.", ["an", "doctor"], 0, ["a", "an", "two"], "a", "doctor bắt đầu bằng âm phụ âm.", "a doctor nghĩa là một bác sĩ."],
      ["Chọn mạo từ đúng trước `umbrella`.", ["a", "umbrella"], 0, ["a", "an", "one"], "an", "umbrella bắt đầu bằng âm nguyên âm.", "an umbrella nghĩa là một chiếc ô."],
      ["Chọn mạo từ đúng trước cụm `empty room`.", ["a", "empty", "room"], 0, ["a", "an", "two"], "an", "empty là từ đứng ngay sau và bắt đầu bằng âm nguyên âm.", "an empty room nghĩa là một căn phòng trống."],
    ]),
    ...orderExercises("aa", 25, [
      ["Sắp xếp thành cụm có nghĩa “một chiếc túi màu xanh”.", ["bag", "a", "blue"], ["a", "blue", "bag"], "Mạo từ đứng trước tính từ và danh từ.", "a blue bag là cụm đúng."],
      ["Sắp xếp thành cụm có nghĩa “một câu chuyện thú vị”.", ["story", "interesting", "an"], ["an", "interesting", "story"], "interesting đứng ngay sau an.", "an interesting story là cụm đúng."],
      ["Sắp xếp thành cụm có nghĩa “một trường đại học cũ”.", ["university", "old", "an"], ["an", "old", "university"], "Tính từ đứng giữa mạo từ và danh từ.", "`an old university`: `old` đứng ngay sau mạo từ và bắt đầu bằng âm nguyên âm nên dùng `an`; tính từ đứng trước danh từ."],
    ]),
    ...tapExercises("aa", 28, [
      ["Trong cụm `a young doctor`, chọn mạo từ.", ["a", "young", "doctor"], [0], "Mạo từ đứng đầu cụm.", "Từ `a` là mạo từ đứng trước toàn bộ cụm tính từ + danh từ `young doctor`."],
      ["Trong cụm `an empty room`, chọn từ có âm đầu quyết định mạo từ.", ["an", "empty", "room"], [1], "Tìm từ đứng ngay sau an.", "empty đứng ngay sau mạo từ nên âm đầu của empty quyết định dùng an."],
      ["Chọn tất cả các cụm dùng a/an đúng.", ["a cat", "an umbrella", "a orange", "an doctor"], [0, 1], "So sánh âm đầu của cat, umbrella, orange và doctor.", "a cat và an umbrella dùng đúng mạo từ."],
    ])
  ],
  "nouns-and-number": [
    {
      "id": "n1",
      "kind": "match",
      "prompt": "Ghép mỗi danh từ với cách tạo dạng số nhiều của nó.",
      "hint": "Nhìn chữ cuối của từ; nếu từ kết thúc bằng y, nhìn thêm chữ đứng ngay trước y.",
      "explanation": "Cách viết số nhiều phụ thuộc vào phần cuối của danh từ số ít: desks, classes, quizzes, families, keys.",
      "pairs": [
        { "left": "desk", "right": "thêm -s" },
        { "left": "class", "right": "thêm -es" },
        { "left": "quiz", "right": "gấp đôi z rồi thêm -es" },
        { "left": "family", "right": "đổi y thành -ies" },
        { "left": "key", "right": "giữ y rồi thêm -s" }
      ]
    },
    {
      "id": "n2",
      "kind": "choice",
      "prompt": "Cách nói nào có nghĩa là “hai giáo viên”?",
      "hint": "Số lượng từ hai trở lên cần danh từ ở dạng nào?",
      "explanation": "`two teachers`: từ hai trở lên dùng danh từ số nhiều; `two teacher` thiếu dạng số nhiều, còn `a` không đứng trước danh từ số nhiều.",
      "options": ["two teacher", "two teachers", "a teachers"],
      "answer": "two teachers"
    },
    {
      "id": "n3",
      "kind": "sort",
      "prompt": "Phân loại từng danh từ thành số ít hoặc số nhiều.",
      "hint": "Trong bốn ví dụ này, dạng số nhiều có đuôi -s.",
      "explanation": "teacher và book là số ít; apples và cats là số nhiều.",
      "buckets": [
        "Số ít",
        "Số nhiều"
      ],
      "items": [
        {
          "text": "teacher",
          "bucket": "Số ít"
        },
        {
          "text": "apples",
          "bucket": "Số nhiều"
        },
        {
          "text": "cats",
          "bucket": "Số nhiều"
        },
        {
          "text": "book",
          "bucket": "Số ít"
        }
      ]
    },
    {
      "id": "n4",
      "kind": "tap",
      "prompt": "Chọn tất cả danh từ số nhiều.",
      "hint": "Các dạng số nhiều có thể kết thúc bằng -s, -es hoặc -ies.",
      "explanation": "teachers và cities là số nhiều; box và toy là số ít.",
      "tokens": ["teachers", "box", "cities", "toy"],
      "answerIndexes": [0, 2],
      "selectionMode": "multiple"
    },
    {
      "id": "n5",
      "kind": "tap",
      "prompt": "Từ nào đang ở dạng số ít?",
      "hint": "Chỉ một từ chưa mang đuôi số nhiều.",
      "explanation": "key là số ít; buses và families là số nhiều.",
      "tokens": ["buses", "key", "families"],
      "answerIndexes": [1],
      "selectionMode": "single"
    },
    {
      "id": "n6",
      "kind": "repair",
      "prompt": "Chọn đuôi cần thêm vào `cat` để tạo dạng số nhiều.",
      "hint": "Nhìn chữ cuối của `cat`: nó có thuộc nhóm s, ss, sh, ch, x, z hay kết thúc bằng y không?",
      "explanation": "Thêm -s vào cat để tạo cats.",
      "tokens": ["cat", "+", "-es"],
      "targetIndex": 2,
      "replacements": ["-s", "-es", "-ies"],
      "answer": "-s"
    },
    {
      "id": "n7",
      "kind": "choice",
      "prompt": "Trên bàn có ba quyển sách; cụm nào diễn tả đúng số lượng ấy?",
      "hint": "Ba quyển là số nhiều: kiểm tra cả dấu hiệu số nhiều ở cuối danh từ.",
      "explanation": "`three books` dùng số nhiều thêm `-s`; `three book` thiếu dấu hiệu số nhiều, còn `book's` có dấu nháy đơn nên không phải dạng số nhiều thông thường.",
      "options": ["three book", "three books", "three book's"],
      "answer": "three books"
    },
    {
      "id": "n8",
      "kind": "choice",
      "prompt": "Dòng nào chuyển `apple` từ dạng một quả sang dạng nhiều quả?",
      "hint": "Kiểm tra dòng nào đổi cả số lượng lẫn dạng của danh từ, và nhớ từ nào không đứng trước danh từ số nhiều.",
      "explanation": "`one apple → two apples`: khi số lượng từ hai trở lên, danh từ chuyển sang số nhiều; `two apple` thiếu `-s`, còn `a` không đứng trước danh từ số nhiều.",
      "options": ["one apple → two apples", "one apple → two apple", "one apple → a apples"],
      "answer": "one apple → two apples"
    },
    {
      "id": "n9",
      "kind": "grid",
      "prompt": "Chọn cách biến đổi phù hợp cho từng danh từ.",
      "hint": "Nhìn chữ cuối và chữ đứng ngay trước y.",
      "explanation": "Bốn danh từ lần lượt dùng thêm -s, thêm -es, bỏ y thêm -ies và giữ y thêm -s.",
      "rows": [
        {
          "cue": "cat",
          "options": ["thêm -s", "thêm -es", "bỏ y rồi thêm -ies"],
          "answer": "thêm -s",
          "completed": "cat → cats"
        },
        {
          "cue": "box",
          "options": ["thêm -s", "thêm -es", "giữ y rồi thêm -s"],
          "answer": "thêm -es",
          "completed": "box → boxes"
        },
        {
          "cue": "baby",
          "options": ["thêm -es", "bỏ y rồi thêm -ies", "giữ y rồi thêm -s"],
          "answer": "bỏ y rồi thêm -ies",
          "completed": "baby → babies"
        },
        {
          "cue": "toy",
          "options": ["thêm -es", "bỏ y rồi thêm -ies", "giữ y rồi thêm -s"],
          "answer": "giữ y rồi thêm -s",
          "completed": "toy → toys"
        }
      ]
    },
    {
      "id": "n10",
      "kind": "sort",
      "prompt": "Phân loại các danh từ theo cách tạo số nhiều.",
      "hint": "Nhìn tận cùng của từ số ít và chữ đứng trước y.",
      "explanation": "Mỗi từ đã được xếp theo đúng quy tắc chính tả của nó.",
      "buckets": ["thêm -s", "thêm -es", "đổi y thành -ies"],
      "items": [
        { "text": "cup", "bucket": "thêm -s" },
        { "text": "brush", "bucket": "thêm -es" },
        { "text": "story", "bucket": "đổi y thành -ies" },
        { "text": "desk", "bucket": "thêm -s" },
        { "text": "watch", "bucket": "thêm -es" },
        { "text": "city", "bucket": "đổi y thành -ies" }
      ]
    },
    {
      "id": "n11",
      "kind": "tap",
      "prompt": "Chọn tất cả danh từ thêm `-es` khi chuyển sang số nhiều.",
      "hint": "Nhìn phần cuối của từng từ số ít: có phải s, ss, sh, ch, x hoặc z không?",
      "explanation": "class, box và watch kết thúc bằng ss, x và ch nên thành classes, boxes, watches; desk, toy và cup chỉ thêm -s.",
      "tokens": ["class", "desk", "box", "toy", "watch", "cup"],
      "answerIndexes": [0, 2, 4],
      "selectionMode": "multiple"
    },
    {
      "id": "n12",
      "kind": "grid",
      "prompt": "Chọn dạng đúng của danh từ để hoàn thành từng cụm.",
      "hint": "Xác định cụm cần số ít hay số nhiều trước, rồi nhớ rằng dấu nháy đơn không tạo số nhiều.",
      "explanation": "Sau `two` và `three`, danh từ ở số nhiều với đuôi `-es`; sau `a`, danh từ ở số ít; dấu nháy đơn không tạo số nhiều.",
      "rows": [
        { "cue": "two ___ (bus)", "options": ["bus", "buses", "bus's"], "answer": "buses", "completed": "two buses" },
        { "cue": "a ___ (brush)", "options": ["brush", "brushes", "brush's"], "answer": "brush", "completed": "a brush" },
        { "cue": "three ___ (watch)", "options": ["watch", "watches", "watch's"], "answer": "watches", "completed": "three watches" },
        { "cue": "two ___ (quiz)", "options": ["quiz", "quizzes", "quiz's"], "answer": "quizzes", "completed": "two quizzes" }
      ]
    },
    ...choiceExercises("n", 13, [
      ["Điều gì xảy ra khi chuyển `quiz` sang số nhiều?", ["Giữ nguyên quiz", "Thêm -s", "Gấp đôi z rồi thêm -es"], "Gấp đôi z rồi thêm -es", "Ghi nhớ cặp quiz → quizzes.", "quiz chuyển thành quizzes bằng cách gấp đôi z rồi thêm -es."],
      ["Vì sao `baby` chuyển thành `babies`?", ["Trước y là chữ phụ âm", "Trước y là chữ nguyên âm", "Từ kết thúc bằng x"], "Trước y là chữ phụ âm", "Nhìn chữ b đứng ngay trước y.", "b là chữ phụ âm nên baby bỏ y rồi thêm -ies."],
      ["Cặp `city → cities` minh họa quy tắc nào?", ["Phụ âm + y đổi thành -ies", "Nguyên âm + y giữ y rồi thêm -s", "Tận cùng ch thêm -es"], "Phụ âm + y đổi thành -ies", "Chữ t đứng ngay trước y.", "city có phụ âm t trước y nên chuyển thành cities."],
      ["Cụm nào diễn tả đúng “hai chiếc hộp”?", ["two boxes", "two box", "a box"], "two boxes", "Số lượng và dạng danh từ phải khớp nhau; với `box`, nhớ nhóm đuôi số nhiều của nó.", "`two boxes`: từ hai trở lên dùng số nhiều, và `box` thêm `-es`; `two box` thiếu dạng số nhiều, còn `a box` chỉ nói một chiếc hộp."],
    ]),
    {
      "id": "n17",
      "kind": "sort",
      "prompt": "Phân loại các từ tận cùng bằng y theo chữ đứng ngay trước y.",
      "hint": "a, e, i, o, u là chữ nguyên âm.",
      "explanation": "baby, city và family có phụ âm trước y; boy, toy và key có nguyên âm trước y.",
      "buckets": ["phụ âm + y", "nguyên âm + y"],
      "items": [
        { "text": "baby", "bucket": "phụ âm + y" },
        { "text": "boy", "bucket": "nguyên âm + y" },
        { "text": "city", "bucket": "phụ âm + y" },
        { "text": "toy", "bucket": "nguyên âm + y" },
        { "text": "family", "bucket": "phụ âm + y" },
        { "text": "key", "bucket": "nguyên âm + y" }
      ]
    },
    {
      "id": "n18",
      "kind": "choice",
      "prompt": "Danh từ nào đổi `y` thành `-ies` khi chuyển sang số nhiều?",
      "hint": "Nhìn chữ đứng ngay trước y trong từng từ: chữ nguyên âm hay chữ phụ âm?",
      "explanation": "`party` có chữ phụ âm `t` trước `y` nên thành `parties`; `day` và `boy` có chữ nguyên âm trước `y` nên chỉ thêm `-s`: `days`, `boys`.",
      "options": ["day", "party", "boy"],
      "answer": "party"
    },
    ...repairExercises("n", 19, [
      ["Chọn đuôi cần thêm vào `bus` để tạo dạng số nhiều.", ["bus", "+", "-s"], 2, ["-s", "-es", "-ies"], "-es", "bus kết thúc bằng s.", "bus thêm -es để tạo buses."],
      ["Chọn cách biến đổi phần cuối của `city` để tạo dạng số nhiều.", ["city", "→", "giữ y rồi thêm -s"], 2, ["thêm -es", "giữ y rồi thêm -s", "bỏ y rồi thêm -ies"], "bỏ y rồi thêm -ies", "Trước y là phụ âm t.", "city bỏ y rồi thêm -ies để tạo cities."],
    ]),
    ...orderExercises("n", 21, [
      ["Sắp xếp thành cụm có nghĩa “ba chiếc hộp nhỏ”.", ["small", "boxes", "three"], ["three", "small", "boxes"], "Từ chỉ số lượng đứng đầu cụm; tính từ đứng ngay trước danh từ.", "`three small boxes`: số lượng đứng đầu, tính từ `small` đứng trước danh từ số nhiều `boxes`."],
      ["Sắp xếp thành cụm có nghĩa “hai em bé vui vẻ”.", ["happy", "two", "babies"], ["two", "happy", "babies"], "Cụm bắt đầu bằng số lượng và kết thúc bằng danh từ số nhiều.", "`two happy babies`: số lượng đứng đầu, tính từ `happy` đứng giữa, danh từ số nhiều `babies` đứng cuối."],
    ]),
    {
      "id": "n23",
      "kind": "choice",
      "prompt": "Cách viết nào là dạng số nhiều thông thường của `book`?",
      "hint": "Dấu nháy đơn không dùng để tạo số nhiều thông thường.",
      "explanation": "books là dạng số nhiều; book's không phải dạng số nhiều thông thường.",
      "options": ["book", "books", "book's"],
      "answer": "books"
    },
    {
      "id": "n24",
      "kind": "sort",
      "prompt": "Phân loại các hình thức theo việc chúng có phải dạng số nhiều thông thường hay không.",
      "hint": "Dạng số nhiều thông thường không dùng dấu nháy đơn.",
      "explanation": "books, cats và teachers là số nhiều; các hình thức có dấu nháy đơn không phải số nhiều thông thường.",
      "buckets": ["Dạng số nhiều", "Không phải dạng số nhiều"],
      "items": [
        { "text": "books", "bucket": "Dạng số nhiều" },
        { "text": "book's", "bucket": "Không phải dạng số nhiều" },
        { "text": "cats", "bucket": "Dạng số nhiều" },
        { "text": "cat's", "bucket": "Không phải dạng số nhiều" },
        { "text": "teachers", "bucket": "Dạng số nhiều" },
        { "text": "teacher's", "bucket": "Không phải dạng số nhiều" }
      ]
    },
    ...tapExercises("n", 25, [
      ["Chọn tất cả dạng số nhiều thuộc nhóm thêm `-es`.", ["buses", "cats", "dishes", "quizzes"], [0, 2, 3], "Tìm các từ gốc kết thúc bằng s, sh hoặc z.", "buses, dishes và quizzes thuộc nhóm thêm -es."],
      ["Chọn tất cả dạng số nhiều được tạo bằng cách đổi phụ âm + `y` thành `-ies`.", ["cities", "toys", "families", "keys"], [0, 2], "Xem dạng số ít city và family.", "cities và families được tạo bằng cách đổi y thành -ies."],
      ["Chọn tất cả dạng số nhiều giữ nguyên `y` rồi thêm `-s`.", ["boys", "babies", "keys", "stories"], [0, 2], "Tìm các từ có nguyên âm đứng trước y ở dạng số ít.", "boy → boys và key → keys đều giữ y rồi thêm -s."],
    ]),
    {
      "id": "n28",
      "kind": "grid",
      "prompt": "Chọn cụm khớp với từng số lượng và danh từ được yêu cầu.",
      "hint": "Từ hai trở lên cần danh từ số nhiều; kiểm tra cả cách viết đuôi số nhiều.",
      "explanation": "Mỗi cụm dùng danh từ số nhiều viết đúng sau số lượng từ hai trở lên.",
      "rows": [
        { "cue": "hai chiếc xe buýt", "options": ["two bus", "two buses", "a buses"], "answer": "two buses", "completed": "two buses" },
        { "cue": "ba thành phố", "options": ["three city", "three cities", "three city's"], "answer": "three cities", "completed": "three cities" },
        { "cue": "bốn chìa khóa", "options": ["four key", "four keys", "four key's"], "answer": "four keys", "completed": "four keys" }
      ]
    },
    {
      "id": "n29",
      "kind": "match",
      "prompt": "Ghép mỗi cụm chưa đúng với lý do nó chưa đúng.",
      "hint": "Với mỗi cụm, xét lần lượt từ đứng trước danh từ, số lượng và âm đầu của `box`.",
      "explanation": "Viết đúng lại, ba cụm trở thành `a box`, `three boxes` và `a box`.",
      "pairs": [
        { "left": "a boxes", "right": "a chỉ đi với một danh từ số ít" },
        { "left": "three box", "right": "từ hai trở lên cần danh từ số nhiều" },
        { "left": "an box", "right": "box bắt đầu bằng âm phụ âm" }
      ]
    },
    ...choiceExercises("n", 30, [
      ["Nhận xét nào đúng về sự hòa hợp giữa số lượng và danh từ?", ["one đi với số ít; từ two trở lên đi với số nhiều", "mọi số lượng đều đi với số ít", "a/an đi trực tiếp trước danh từ số nhiều"], "one đi với số ít; từ two trở lên đi với số nhiều", "So sánh one cat với two cats.", "Một đơn vị dùng số ít; từ hai đơn vị trở lên dùng số nhiều."],
      ["Gặp một danh từ bất quy tắc chưa được dạy, người học nên làm gì?", ["Tự thêm -s trong mọi trường hợp", "Tra dạng số nhiều thay vì đoán từ các quy tắc của bài", "Luôn thêm -ies"], "Tra dạng số nhiều thay vì đoán từ các quy tắc của bài", "Bài này chỉ bao phủ những nhóm có quy tắc đã nêu.", "Không phải mọi danh từ đều theo các quy tắc của bài; cần tra dạng chưa học."],
    ]),
    {
      "id": "n32",
      "kind": "grid",
      "prompt": "Chọn cụm đúng với từng nghĩa để hoàn thành lượt ôn tập tổng hợp.",
      "hint": "Kiểm tra số lượng, dạng số nhiều và quy tắc chính tả.",
      "explanation": "Bốn cụm đều dùng số nhiều sau số lượng từ hai trở lên, với đúng cách viết đuôi `-s`, `-es` hoặc `-ies`.",
      "rows": [
        { "cue": "hai quyển sách", "options": ["two book", "two books", "two book's"], "answer": "two books", "completed": "two books" },
        { "cue": "ba chiếc đĩa", "options": ["three dish", "three dishes", "a dishes"], "answer": "three dishes", "completed": "three dishes" },
        { "cue": "bốn gia đình", "options": ["four family", "four families", "four family's"], "answer": "four families", "completed": "four families" },
        { "cue": "sáu bài kiểm tra ngắn", "options": ["six quiz", "six quizzes", "a quizzes"], "answer": "six quizzes", "completed": "six quizzes" }
      ]
    }
  ],
  "demonstratives": [
    {
      "id": "ad2",
      "kind": "match",
      "prompt": "Ghép mỗi tình huống với từ chỉ định phù hợp.",
      "hint": "Mỗi tình huống có hai thông tin: số lượng và khoảng cách.",
      "explanation": "Số lượng quyết định this/that hay these/those; khoảng cách quyết định nhóm gần hay nhóm xa.",
      "pairs": [
        {
          "left": "một vật gần",
          "right": "this"
        },
        {
          "left": "một vật xa",
          "right": "that"
        },
        {
          "left": "nhiều vật gần",
          "right": "these"
        },
        {
          "left": "nhiều vật xa",
          "right": "those"
        }
      ]
    },
    {
      "id": "ad3",
      "kind": "choice",
      "prompt": "Cụm nào có nghĩa là “những quyển sách này”?",
      "hint": "Có nhiều quyển và ở gần.",
      "explanation": "these đi với danh từ số nhiều books.",
      "options": [
        "this books",
        "these books",
        "these book"
      ],
      "answer": "these books"
    },
    {
      "id": "ad5",
      "kind": "tap",
      "prompt": "Chọn từ chỉ nhiều vật ở gần.",
      "hint": "Nhớ lại bảng hai chiều của bài: tìm ô thuộc hàng “nhiều” và cột “gần”.",
      "explanation": "these chỉ nhiều vật ở gần.",
      "tokens": [
        "this",
        "that",
        "these",
        "those"
      ],
      "answerIndexes": [
        2
      ],
      "selectionMode": "single"
    },
    {
      "id": "ad7",
      "kind": "choice",
      "prompt": "Bạn đang cầm nhiều quyển sách ngay gần mình; từ chỉ định nào phù hợp?",
      "hint": "Nhiều và gần.",
      "explanation": "these dùng cho nhiều vật ở gần.",
      "options": [
        "this",
        "these",
        "those"
      ],
      "answer": "these"
    },
    {
      "id": "dm5",
      "kind": "choice",
      "prompt": "Từ nào hoàn thành cụm có nghĩa “con mèo kia”: `___ cat`?",
      "hint": "Con mèo là một hay nhiều, và chữ “kia” cho biết gần hay xa?",
      "explanation": "that cat nghĩa là con mèo kia.",
      "options": [
        "this",
        "that",
        "those"
      ],
      "answer": "that"
    },
    {
      "id": "dm6",
      "kind": "sort",
      "prompt": "Phân loại các từ chỉ định theo số lượng một hoặc nhiều.",
      "hint": "Nhóm theo số lượng: từ nào đi với `book`, từ nào đi với `books`?",
      "explanation": "Bốn từ đã được chia đúng theo số lượng.",
      "buckets": [
        "Một",
        "Nhiều"
      ],
      "items": [
        {
          "text": "this",
          "bucket": "Một"
        },
        {
          "text": "that",
          "bucket": "Một"
        },
        {
          "text": "these",
          "bucket": "Nhiều"
        },
        {
          "text": "those",
          "bucket": "Nhiều"
        }
      ]
    },
    {
      "id": "dm7",
      "kind": "grid",
      "prompt": "Chọn đúng cả từ chỉ định lẫn dạng danh từ.",
      "hint": "Xét số lượng trước, khoảng cách sau.",
      "explanation": "Mỗi cụm khớp cả từ chỉ định và danh từ.",
      "rows": [
        {
          "cue": "một quyển sách ở gần",
          "options": [
            "this book",
            "these books",
            "that book"
          ],
          "answer": "this book",
          "completed": "this book"
        },
        {
          "cue": "một quyển sách ở xa",
          "options": [
            "that book",
            "those books",
            "this books"
          ],
          "answer": "that book",
          "completed": "that book"
        },
        {
          "cue": "nhiều quyển sách ở xa",
          "options": [
            "those books",
            "that book",
            "these book"
          ],
          "answer": "those books",
          "completed": "those books"
        }
      ]
    },
    {
      "id": "dm8",
      "kind": "choice",
      "prompt": "Bạn đang chỉ nhiều quyển sách màu đỏ ở gần; cụm nào diễn tả đúng?",
      "hint": "Xét hai điều: có một hay nhiều quyển sách, và chúng ở gần hay xa; danh từ cũng phải khớp số lượng.",
      "explanation": "these red books nghĩa là những quyển sách đỏ này.",
      "options": [
        "these red books",
        "this red books",
        "those red book"
      ],
      "answer": "these red books"
    },
    {
      "id": "dm9",
      "kind": "grid",
      "prompt": "Chọn cụm danh từ khớp cả số lượng và khoảng cách.",
      "hint": "This/that đi với số ít; these/those đi với số nhiều.",
      "explanation": "Ba cụm dùng đúng từ chỉ định và dạng danh từ.",
      "rows": [
        {
          "cue": "một quả táo ở gần",
          "options": [
            "this apple",
            "these apples",
            "that apple"
          ],
          "answer": "this apple",
          "completed": "this apple"
        },
        {
          "cue": "nhiều chiếc hộp ở xa",
          "options": [
            "those boxes",
            "that box",
            "these box"
          ],
          "answer": "those boxes",
          "completed": "those boxes"
        },
        {
          "cue": "nhiều em bé ở gần",
          "options": [
            "these babies",
            "this baby",
            "those baby"
          ],
          "answer": "these babies",
          "completed": "these babies"
        }
      ]
    },
    ...choiceExercises("dm", 10, [
      ["Bạn đang chỉ một quả táo ở gần; cụm nào phù hợp?", ["this apple", "that apple", "these apples"], "this apple", "Hỏi lần lượt: có mấy quả táo, và quả táo ở gần hay xa bạn?", "this apple nghĩa là quả táo này."],
      ["Bạn đang chỉ một chiếc hộp ở xa; cụm nào phù hợp?", ["this box", "that box", "those boxes"], "that box", "Hỏi lần lượt: có mấy chiếc hộp, và chiếc hộp ở gần hay xa bạn?", "that box nghĩa là chiếc hộp kia."],
      ["Bạn đang chỉ nhiều con mèo ở gần; cụm nào phù hợp?", ["this cat", "these cats", "those cats"], "these cats", "Đếm số con mèo trước, rồi xét khoảng cách; dạng danh từ cũng phải khớp số lượng.", "these cats nghĩa là những con mèo này."],
      ["Bạn đang chỉ nhiều giáo viên ở xa; cụm nào phù hợp?", ["that teacher", "these teachers", "those teachers"], "those teachers", "Xét số người trước, rồi xét khoảng cách; nhớ kiểm tra cả dạng của danh từ.", "those teachers nghĩa là những giáo viên kia."],
      ["Cụm `this city` cho biết hai thông tin nào?", ["một và gần", "một và xa", "nhiều và gần"], "một và gần", "Đặt `this` vào bảng hai chiều của bài: nó nằm ở hàng nào và cột nào?", "this city nói đến một thành phố được xem là gần người nói."],
      ["Cụm `those toys` cho biết hai thông tin nào?", ["một và xa", "nhiều và gần", "nhiều và xa"], "nhiều và xa", "Tìm vị trí của `those` trong bảng hai chiều: hàng số lượng nào, cột khoảng cách nào?", "those toys nói đến nhiều đồ chơi ở xa người nói."],
    ]),
    {
      "id": "dm16",
      "kind": "grid",
      "prompt": "Khi danh từ đã rõ và được lược đi, hãy chọn từ chỉ định đứng một mình cho từng tình huống.",
      "hint": "Vẫn xét hai điều: một hay nhiều, gần hay xa.",
      "explanation": "this, that, these và those có thể thay cho cả cụm danh từ khi đối tượng đã rõ.",
      "rows": [
        { "cue": "một vật ở gần — “cái này”", "options": ["this", "that", "these", "those"], "answer": "this", "completed": "this — cái này" },
        { "cue": "một vật ở xa — “cái kia”", "options": ["this", "that", "these", "those"], "answer": "that", "completed": "that — cái kia" },
        { "cue": "nhiều vật ở gần — “những cái này”", "options": ["this", "that", "these", "those"], "answer": "these", "completed": "these — những cái này" },
        { "cue": "nhiều vật ở xa — “những cái kia”", "options": ["this", "that", "these", "those"], "answer": "those", "completed": "those — những cái kia" }
      ]
    },
    {
      "id": "dm17",
      "kind": "sort",
      "prompt": "Phân loại các tình huống theo từ chỉ định cần dùng.",
      "hint": "Xác định số lượng trước rồi xét khoảng cách.",
      "explanation": "Bốn tình huống đã được xếp theo đúng ma trận một/nhiều và gần/xa.",
      "buckets": ["this", "that", "these", "those"],
      "items": [
        { "text": "một chiếc cốc ở gần", "bucket": "this" },
        { "text": "một căn nhà ở xa", "bucket": "that" },
        { "text": "nhiều chiếc ghế ở gần", "bucket": "these" },
        { "text": "nhiều chiếc xe ở xa", "bucket": "those" }
      ]
    },
    ...choiceExercises("dm", 18, [
      ["Cách nào diễn tả “quyển sách này” mà không đặt `a/an` cùng từ chỉ định?", ["this book", "this a book", "a this book"], "this book", "Trong cụm đang học, this và a không đứng cùng nhau trước book.", "this book dùng một từ đứng trước danh từ: this."],
      ["Nhận xét nào đúng về vị trí của `a/an` và từ chỉ định trong cụm danh từ cơ bản?", ["Chọn a/an hoặc từ chỉ định tùy ý nghĩa, không dùng cả hai", "Luôn đặt a sau this", "Luôn đặt an trước those"], "Chọn a/an hoặc từ chỉ định tùy ý nghĩa, không dùng cả hai", "So sánh a book với this book.", "a/an và từ chỉ định cùng đứng ở vị trí trước danh từ nên ta chọn một cách theo ý nghĩa."],
      ["Cụm nào khớp cả từ chỉ định và dạng số nhiều?", ["those boxes", "those box", "that boxes"], "those boxes", "those cần danh từ số nhiều.", "those boxes khớp số lượng ở cả hai phần."],
    ]),
    ...repairExercises("dm", 21, [
      ["Một quyển sách ở gần cần từ chỉ định nào?", ["that", "book"], 0, ["this", "that", "these"], "this", "Đếm số quyển sách, rồi xét quyển sách ở gần hay xa người nói.", "this book nghĩa là quyển sách này."],
      ["Sau `those`, hãy chọn dạng đúng của `cat`.", ["those", "cat"], 1, ["cat", "cats", "a cat"], "cats", "those báo hiệu nhiều.", "those cats nghĩa là những con mèo kia."],
      ["Nhiều chiếc hộp ở gần cần từ chỉ định nào?", ["this", "boxes"], 0, ["this", "these", "those"], "these", "Xét số lượng của `boxes` trước, rồi xét khoảng cách.", "these boxes nghĩa là những chiếc hộp này."],
      ["Một quả táo ở xa cần từ chỉ định nào?", ["these", "apple"], 0, ["this", "that", "those"], "that", "Xét số lượng của `apple`, rồi xét quả táo ở gần hay xa.", "that apple nghĩa là quả táo kia."],
    ]),
    ...orderExercises("dm", 25, [
      ["Sắp xếp thành cụm có nghĩa “những quả táo đỏ này”.", ["apples", "these", "red"], ["these", "red", "apples"], "Từ chỉ định đứng trước tính từ và danh từ.", "these red apples là cụm đúng."],
      ["Sắp xếp thành cụm có nghĩa “quyển sách cũ kia”.", ["book", "old", "that"], ["that", "old", "book"], "Từ chỉ định mở đầu cụm; tính từ nằm giữa nó và danh từ.", "that old book là cụm đúng."],
      ["Sắp xếp thành cụm có nghĩa “những chiếc hộp nhỏ kia”.", ["small", "boxes", "those"], ["those", "small", "boxes"], "Đặt từ chỉ định trước, rồi đến từ miêu tả kích thước, cuối cùng là danh từ số nhiều.", "those small boxes là cụm đúng."],
    ]),
    ...tapExercises("dm", 28, [
      ["Trong cụm `those red boxes`, chọn từ chỉ định.", ["those", "red", "boxes"], [0], "Từ chỉ định đứng đầu cụm.", "those là từ chỉ định báo nhiều và xa."],
      ["Chọn tất cả từ chỉ định mang nghĩa gần.", ["this", "that", "these", "those"], [0, 2], "Có một dạng cho số ít và một dạng cho số nhiều.", "this và these đều chỉ gần."],
      ["Chọn tất cả từ chỉ định mang nghĩa nhiều.", ["this", "that", "these", "those"], [2, 3], "Tìm hai dạng đi với danh từ số nhiều.", "these và those đều chỉ nhiều."],
    ])
  ],
};
