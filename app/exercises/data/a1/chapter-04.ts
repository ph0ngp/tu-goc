/* Luyện tập A1 — Chương 4: Đại từ và sở hữu. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { binaryChoiceDrills, compactPracticeSet, orderExercises } from "../../basic-builders.ts";

const a1Chapter04BaseExerciseData: Record<string, Exercise[]> = {
  "possessives": [
    {
      "id": "po1",
      "kind": "match",
      "prompt": "Tìm dạng đứng trước danh từ.",
      "hint": "I và my cùng chỉ người nói.",
      "explanation": "Đại từ chủ ngữ và từ sở hữu có hình thức khác nhau.",
      "pairs": [
        {
          "left": "I",
          "right": "my"
        },
        {
          "left": "he",
          "right": "his"
        },
        {
          "left": "she",
          "right": "her"
        },
        {
          "left": "they",
          "right": "their"
        }
      ]
    },
    {
      "id": "po2",
      "kind": "choice",
      "prompt": "Quyển sách thuộc về Lan: ___ book.",
      "hint": "Chỗ trống đứng ngay trước book.",
      "explanation": "her là từ sở hữu của she.",
      "options": [
        "she",
        "her",
        "Lan"
      ],
      "answer": "her"
    },
    {
      "id": "po4",
      "kind": "tap",
      "prompt": "Chạm vào từ sở hữu.",
      "hint": "Từ nào cho biết quyển sách thuộc về ai?",
      "explanation": "her đứng trước book để chỉ sở hữu.",
      "tokens": [
        "This",
        "is",
        "her",
        "book",
        "."
      ],
      "answerIndexes": [
        2
      ],
      "selectionMode": "single"
    },
    {
      "id": "po8",
      "kind": "choice",
      "prompt": "“Ngôi nhà của chúng tôi” = ___ house.",
      "hint": "Dạng sở hữu của we là our.",
      "explanation": "our house là cụm đúng.",
      "options": [
        "we",
        "our",
        "their"
      ],
      "answer": "our"
    },
    {
      "id": "pd5",
      "kind": "match",
      "prompt": "Tìm từ sở hữu đứng trước danh từ.",
      "hint": "Chọn theo người hoặc vật sở hữu.",
      "explanation": "you→your, it→its, we→our.",
      "pairs": [
        {
          "left": "you",
          "right": "your"
        },
        {
          "left": "it",
          "right": "its"
        },
        {
          "left": "we",
          "right": "our"
        }
      ]
    },
    {
      "id": "pd6",
      "kind": "choice",
      "prompt": "Lan và Nam có những quyển sách: ___ books.",
      "hint": "Lan và Nam có thể thay bằng they.",
      "explanation": "Dạng sở hữu của they là their.",
      "options": [
        "our",
        "their",
        "her"
      ],
      "answer": "their"
    },
    {
      "id": "pd7",
      "kind": "choice",
      "prompt": "The cat is in ___ bed. (Con mèo ở trong ổ của nó.)",
      "hint": "Chỗ trống đứng trước danh từ `bed` và cần nghĩa “của nó”.",
      "explanation": "`Its bed` là ổ của nó; `it's` là dạng viết tắt của `it is`.",
      "options": [
        "its",
        "it’s",
        "it"
      ],
      "answer": "its"
    },
    {
      "id": "pd8",
      "kind": "grid",
      "prompt": "Nhìn người sở hữu rồi đặt từ ngay trước danh từ.",
      "hint": "Đổi đại từ chủ ngữ sang dạng sở hữu.",
      "explanation": "my, his và their đều đứng đúng trước danh từ.",
      "rows": [
        {
          "cue": "I → ___ book",
          "options": [
            "my",
            "me",
            "I"
          ],
          "answer": "my",
          "completed": "my book"
        },
        {
          "cue": "he → ___ bag",
          "options": [
            "his",
            "him",
            "he"
          ],
          "answer": "his",
          "completed": "his bag"
        },
        {
          "cue": "they → ___ house",
          "options": [
            "their",
            "them",
            "they"
          ],
          "answer": "their",
          "completed": "their house"
        }
      ]
    },
    {
      "id": "pd9",
      "kind": "choice",
      "prompt": "___ red. (Nó màu đỏ.)",
      "hint": "Câu cần dạng rút gọn của it is.",
      "explanation": "It’s red. có nghĩa là “Nó màu đỏ”; its phải đứng trước một danh từ.",
      "options": [
        "It’s",
        "Its",
        "It"
      ],
      "answer": "It’s"
    },
    {
      "id": "pd10",
      "kind": "order",
      "prompt": "Quyển sách mới của cô ấy",
      "hint": "Từ sở hữu đứng trước tính từ và danh từ.",
      "explanation": "her new book có đúng thứ tự: của ai + đặc điểm + vật.",
      "tokens": [
        "book",
        "her",
        "new"
      ],
      "answer": [
        "her",
        "new",
        "book"
      ]
    },
    {
      "id": "pd11",
      "kind": "choice",
      "prompt": "Cụm nào có nghĩa “quyển sách màu đỏ của tôi”?",
      "hint": "my đã đứng ở vị trí trước danh từ nên không thêm a.",
      "explanation": "my red book là cụm đúng.",
      "options": [
        "my red book",
        "my a red book",
        "a my red book"
      ],
      "answer": "my red book"
    }
  ],
  "possessive-s": [
    {
      "id": "po3",
      "kind": "order",
      "prompt": "Đây là túi của Nam.",
      "hint": "Nam’s đứng ngay trước bag.",
      "explanation": "Sở hữu cách tạo cụm Nam’s bag.",
      "tokens": [
        "bag",
        "This",
        "Nam’s",
        "is"
      ],
      "answer": [
        "This",
        "is",
        "Nam’s",
        "bag"
      ]
    },
    {
      "id": "po5",
      "kind": "tap",
      "prompt": "Chạm vào cụm chỉ chiếc túi của Nam.",
      "hint": "Tìm tên + ’s + vật.",
      "explanation": "Nam’s bag nghĩa là túi của Nam.",
      "tokens": [
        "Nam",
        "Nam’s bag",
        "his"
      ],
      "answerIndexes": [
        1
      ],
      "selectionMode": "single"
    },
    {
      "id": "po7",
      "kind": "context",
      "prompt": "Chọn cụm sở hữu.",
      "hint": "Thêm ’s sau tên người.",
      "explanation": "Lan’s bag diễn tả chiếc túi của Lan.",
      "context": "Chiếc túi thuộc về Lan.",
      "options": [
        "Lan bag",
        "Lan’s bag",
        "her’s bag"
      ],
      "answer": "Lan’s bag"
    },
    {
      "id": "psx4",
      "kind": "choice",
      "prompt": "Quyển sách của giáo viên",
      "hint": "Đặt người sở hữu trước, thêm ’s, rồi đến vật.",
      "explanation": "the teacher’s book theo đúng trật tự.",
      "options": [
        "the teacher’s book",
        "the teacher book’s",
        "the teachers book"
      ],
      "answer": "the teacher’s book"
    },
    {
      "id": "psx5",
      "kind": "sort",
      "prompt": "Trong mỗi cụm, xác định phần đứng trước và sau ’s.",
      "hint": "Phần trước ’s là mốc sở hữu/quan hệ.",
      "explanation": "Vị trí hai phía của ’s đã được nhận ra.",
      "buckets": [
        "Người sở hữu",
        "Vật hoặc quan hệ"
      ],
      "items": [
        {
          "text": "Lan trong Lan’s bag",
          "bucket": "Người sở hữu"
        },
        {
          "text": "bag trong Lan’s bag",
          "bucket": "Vật hoặc quan hệ"
        },
        {
          "text": "the cat trong the cat’s name",
          "bucket": "Người sở hữu"
        },
        {
          "text": "name trong the cat’s name",
          "bucket": "Vật hoặc quan hệ"
        }
      ]
    },
    {
      "id": "psx6",
      "kind": "choice",
      "prompt": "Nam’s bag = ___ bag",
      "hint": "Nam có thể thay bằng he.",
      "explanation": "Nam’s bag và his bag cùng nói túi của Nam.",
      "options": [
        "his",
        "her",
        "their"
      ],
      "answer": "his"
    },
    {
      "id": "psx7",
      "kind": "choice",
      "prompt": "Cụm nào có nghĩa “tên của con mèo”?",
      "hint": "Dùng một danh từ số ít + ’s.",
      "explanation": "the cat’s name diễn tả quan hệ giữa con mèo và tên của nó.",
      "options": [
        "the cat’s name",
        "the cats name",
        "the cat is name"
      ],
      "answer": "the cat’s name"
    },
    {
      "id": "psx8",
      "kind": "grid",
      "prompt": "Áp dụng mẫu người sở hữu + ’s + vật/quan hệ.",
      "hint": "Người sở hữu luôn đứng trước trong mẫu này.",
      "explanation": "Ba cụm đều đặt ’s đúng vị trí.",
      "rows": [
        {
          "cue": "túi của Lan",
          "options": [
            "Lan’s bag",
            "Lan bag",
            "bag’s Lan"
          ],
          "answer": "Lan’s bag",
          "completed": "Lan’s bag"
        },
        {
          "cue": "sách của Nam",
          "options": [
            "Nam’s book",
            "Nam book’s",
            "book Nam"
          ],
          "answer": "Nam’s book",
          "completed": "Nam’s book"
        },
        {
          "cue": "tên của cô bé",
          "options": [
            "the girl’s name",
            "the girl name’s",
            "the girls name"
          ],
          "answer": "the girl’s name",
          "completed": "the girl’s name"
        }
      ]
    }
  ],
  "possessive-pronouns": compactPracticeSet({
    prefix: "a1pp",
    focus: "sự khác nhau giữa từ chỉ sở hữu và đại từ sở hữu",
    choices: [
      ["Cách nào hoàn chỉnh câu `This pen is ...`?", ["my", "mine", "I"], "mine", "Sau `is`, cần đại từ sở hữu đứng độc lập: `mine`."],
      ["Cách nào có nghĩa “Đó là túi của cô ấy”?", ["That is her bag.", "That bag is her.", "That is hers bag."], "That is her bag.", "`Her` đứng trước danh từ `bag`."],
      ["Cách nào tránh lặp `your book` trong `My book is new. ... is old.`?", ["Your", "Yours", "You"], "Yours", "`Yours` thay cho cả cụm `your book`."],
      ["Dạng sở hữu đứng độc lập tương ứng với `our` là gì?", ["ours", "us", "our"], "ours", "Dạng đúng là `ours`, không có dấu nháy đơn."],
      ["Câu nào dùng đúng đại từ sở hữu mang nghĩa “của họ”?", ["The keys are theirs.", "The keys are ours.", "The keys are his."], "The keys are theirs.", "`Theirs` đứng độc lập và không có dấu nháy đơn."],
      ["Trong `This coat is his`, `his` làm công việc gì?", ["đại từ sở hữu", "từ chỉ sở hữu trước danh từ", "đại từ chủ ngữ"], "đại từ sở hữu", "`His` đứng độc lập sau `is` và thay cho `his coat`."],
      ["Cách nào có nghĩa “Những chiếc ghế này là của chúng tôi”?", ["These chairs are ours.", "These chairs are our.", "These are ours chairs."], "These chairs are ours.", "`Ours` đứng độc lập sau `are`."],
      ["Từ nào không đặt danh từ ngay sau nó?", ["mine", "my", "their"], "mine", "`Mine` đã thay cho cả cụm danh từ."],
      ["Câu hỏi nào đúng khi muốn biết chiếc ô có phải của bạn không?", ["Is this umbrella yours?", "Is this your?", "Does this umbrella yours?"], "Is this umbrella yours?", "Dùng `be + đại từ sở hữu` để hỏi quyền sở hữu."],
      ["Đại từ sở hữu đứng độc lập tương ứng với `your` là từ nào?", ["yours", "mine", "hers"], "yours", "Đại từ sở hữu là `yours`, không có dấu nháy đơn."],
    ],
    orders: [
      ["Sắp xếp câu “Chiếc xe đạp màu đỏ là của cô ấy.”", ["hers", "is", "The", "red", "bike", "."], ["The", "red", "bike", "is", "hers", "."], "Đại từ `hers` đứng sau `is`."],
      ["Sắp xếp câu hỏi “Những quyển sách này có phải của họ không?”", ["theirs", "these", "Are", "books", "?"], ["Are", "these", "books", "theirs", "?"], "Đưa `are` lên trước chủ ngữ rồi đặt `theirs` ở cuối."],
      ["Sắp xếp hai câu “Túi của tôi màu đen. Túi của bạn màu xanh.”", ["is", "blue", "My", "bag", ".", "Yours", "is", "black", "."], ["My", "bag", "is", "black", ".", "Yours", "is", "blue", "."], "`Yours` thay cho `your bag` ở câu thứ hai."],
      ["Sắp xếp câu “Những chỗ ngồi kia là của chúng tôi.”", ["Those", "ours", "seats", "are", "."], ["Those", "seats", "are", "ours", "."], "`Ours` đứng độc lập sau `are`."],
    ],
    repairs: [
      ["Chọn dạng đúng cho vị trí sau `is`.", ["This", "phone", "is", "my", "."], 3, ["my", "mine", "me"], "mine", "Sau `is`, dùng `mine` để nói “của tôi”."],
      ["Chọn dạng đúng đứng trước `house`.", ["The", "house", "is", "theirs", "and", "theirs", "house", "is", "large", "."], 5, ["their", "theirs", "them"], "their", "Trước danh từ `house`, dùng `their`; ở phần đầu, `theirs` đứng độc lập."],
      ["Chọn dạng đúng để thay cho `her pencils`.", ["My", "pencils", "are", "here", "and", "her", "are", "there", "."], 5, ["her", "hers", "she"], "hers", "`Hers` thay cho cả cụm `her pencils`."],
    ],
    taps: [
      ["Trong `Our room is small, but theirs is large`, chọn đại từ sở hữu.", ["Our", "room", "is", "small", ",", "but", "theirs", "is", "large", "."], [6], "`Theirs` đứng độc lập và thay cho `their room`."],
      ["Trong `His coat is new and hers is old`, chọn tất cả từ chỉ sở hữu.", ["His", "coat", "is", "new", "and", "hers", "is", "old", "."], [0, 5], "`His` đứng trước danh từ; `hers` đứng độc lập."],
      ["Trong `Are these keys yours?`, chọn từ thay cho cả cụm `your keys`.", ["Are", "these", "keys", "yours", "?"], [3], "`Yours` là đại từ sở hữu."],
    ],
    matchPrompt: "Ghép từ đứng trước danh từ với đại từ sở hữu tương ứng.",
    pairs: [{ left: "my", right: "mine" }, { left: "your", right: "yours" }, { left: "her", right: "hers" }, { left: "their", right: "theirs" }],
    sortPrompt: "Phân loại mỗi cụm theo việc từ sở hữu đứng trước danh từ hay đứng độc lập.",
    buckets: ["Trước danh từ", "Đứng độc lập"],
    items: [{ text: "our garden", bucket: "Trước danh từ" }, { text: "The garden is ours.", bucket: "Đứng độc lập" }, { text: "his coat", bucket: "Trước danh từ" }, { text: "The coat is his.", bucket: "Đứng độc lập" }, { text: "their seats", bucket: "Trước danh từ" }, { text: "The seats are theirs.", bucket: "Đứng độc lập" }],
    gridPrompts: ["Chọn dạng sở hữu đúng cho từng vị trí.", "Chọn cách tránh lặp danh từ trong từng câu.", "Chọn câu hoàn chỉnh đúng cho từng nghĩa."],
    gridRows: [
      { cue: "This is ___ book.", options: ["my", "mine", "me"], answer: "my", completed: "This is my book." },
      { cue: "This book is ___.", options: ["my", "mine", "I"], answer: "mine", completed: "This book is mine." },
      { cue: "Those bags are ___.", options: ["their", "theirs", "them"], answer: "theirs", completed: "Those bags are theirs." },
      { cue: "Her cup is red. ___ is blue.", options: ["My", "Mine", "Me"], answer: "Mine", completed: "Her cup is red. Mine is blue." },
      { cue: "Our chairs are here. ___ are there.", options: ["Their", "Theirs", "Them"], answer: "Theirs", completed: "Our chairs are here. Theirs are there." },
      { cue: "His room is small. ___ is large.", options: ["Her", "Hers", "She"], answer: "Hers", completed: "His room is small. Hers is large." },
      { cue: "của tôi", options: ["mine", "my + danh từ", "cả hai tùy vị trí"], answer: "cả hai tùy vị trí", completed: "my book / The book is mine" },
      { cue: "của anh ấy — đứng độc lập", options: ["he", "his", "him"], answer: "his", completed: "The book is his." },
      { cue: "của chúng tôi — đứng độc lập", options: ["our", "ours", "us"], answer: "ours", completed: "The room is ours." },
    ],
  }),
  "whose-questions": compactPracticeSet({
    prefix: "a1wh",
    focus: "câu hỏi với whose",
    choices: [
      ["Từ nào hỏi “của ai”?", ["whose", "who's", "who"], "whose", "`Whose` không có dấu nháy đơn và hỏi quyền sở hữu hoặc quan hệ."],
      ["Câu nào hỏi “Đây là bút của ai?”", ["Whose pen is this?", "Who's pen is this?", "Whose is pen this?"], "Whose pen is this?", "`Whose` đứng trước danh từ `pen`; `is` đứng trước `this`."],
      ["Câu nào đúng khi vật đã rõ và không cần lặp danh từ?", ["Whose is this?", "Whose this is?", "Who is this?"], "Whose is this?", "`Whose` có thể đứng một mình; `Who is this?` hỏi người này là ai."],
      ["Câu trả lời nào phù hợp với `Whose bag is this?`?", ["It's Lan's.", "It's Lan.", "It's whose."], "It's Lan's.", "`Lan's` đứng độc lập vì danh từ `bag` đã rõ."],
      ["Dạng nào mở rộng được thành `who is`?", ["who's", "whose", "who"], "who's", "Dấu nháy trong `who's` thay cho chữ bị lược trong `who is`."],
      ["Câu nào hỏi về nhiều quyển sách?", ["Whose books are those?", "Whose books is that?", "Whose book are those?"], "Whose books are those?", "`Books` và `those` là số nhiều nên dùng `are`."],
      ["Câu nào trả lời bằng đại từ sở hữu đúng?", ["They're ours.", "They're our.", "They're us."], "They're ours.", "`Ours` đứng độc lập sau `are`."],
      ["`Who's at the door?` có nghĩa gì?", ["Ai đang ở cửa?", "Cửa của ai?", "Đây là cửa của ai?"], "Ai đang ở cửa?", "`Who's` mở rộng thành `Who is`."],
      ["Câu nào hỏi “Điện thoại của ai ở trên bàn?”", ["Whose phone is on the table?", "Who's phone is on the table?", "Whose is phone on the table?"], "Whose phone is on the table?", "`Whose phone` là chủ ngữ; `whose` không có dấu nháy đơn."],
      ["Cách viết nào đúng khi hỏi những chiếc giày này của ai?", ["Whose shoes are these?", "Who's shoes are these?", "Whose shoe is these?"], "Whose shoes are these?", "Dùng `whose + shoes` và `are these`."],
    ],
    orders: [
      ["Sắp xếp câu “Chiếc áo khoác này là của ai?”", ["coat", "Whose", "this", "is", "?"], ["Whose", "coat", "is", "this", "?"], "Đặt `whose` trước danh từ rồi đảo `is` trước `this`."],
      ["Sắp xếp câu “Những chiếc chìa khóa kia là của ai?”", ["are", "Whose", "those", "keys", "?"], ["Whose", "keys", "are", "those", "?"], "Danh từ số nhiều dùng `are`."],
      ["Sắp xếp câu trả lời “Chúng là của cô ấy.”", ["hers", "They", "are", "."], ["They", "are", "hers", "."], "`Hers` đứng độc lập sau `are`."],
      ["Sắp xếp câu “Ai đang ở trong bếp?”", ["the", "Who’s", "kitchen", "in", "?"], ["Who’s", "in", "the", "kitchen", "?"], "`Who's` là `who is`; không phải `whose`."],
    ],
    repairs: [
      ["Chọn từ hỏi đúng cho ý “của ai”.", ["Who’s", "bike", "is", "this", "?"], 0, ["Who’s", "Whose", "Who"], "Whose", "`Whose` hỏi quyền sở hữu và không có dấu nháy."],
      ["Chọn dạng của `be` phù hợp với `books`.", ["Whose", "books", "is", "these", "?"], 2, ["am", "is", "are"], "are", "`Books` và `these` là số nhiều."],
      ["Chọn từ đúng để hỏi người đang ở đây.", ["Whose", "here", "?"], 0, ["Whose", "Who’s", "Whom"], "Who’s", "`Who's here?` mở rộng thành `Who is here?`."],
    ],
    taps: [
      ["Trong `Whose blue bag is on the chair?`, chọn cụm hỏi về người có liên hệ.", ["Whose", "blue", "bag", "is", "on", "the", "chair", "?"], [0, 1, 2], "Cụm `Whose blue bag` là chủ ngữ được hỏi."],
      ["Trong `Who's at home and whose car is outside?`, chọn từ mang nghĩa “của ai”.", ["Who's", "at", "home", "and", "whose", "car", "is", "outside", "?"], [4], "`Whose` không có dấu nháy và đứng trước `car`."],
      ["Trong `Whose are these?`, chọn từ cho biết đồ vật là số nhiều.", ["Whose", "are", "these", "?"], [1, 2], "`Are these` cho biết đang hỏi nhiều vật."],
    ],
    matchPrompt: "Ghép mỗi câu hỏi với câu trả lời phù hợp.",
    pairs: [{ left: "Whose pen is this?", right: "It's mine." }, { left: "Whose shoes are these?", right: "They're Lan's." }, { left: "Who's at the door?", right: "Nam is." }, { left: "Whose is that?", right: "It's hers." }],
    sortPrompt: "Phân loại câu theo `whose` hỏi sở hữu hay `who's` là `who is`.",
    buckets: ["Hỏi của ai", "Hỏi ai là/ở"],
    items: [{ text: "Whose book is this?", bucket: "Hỏi của ai" }, { text: "Who's your teacher?", bucket: "Hỏi ai là/ở" }, { text: "Whose are those?", bucket: "Hỏi của ai" }, { text: "Who's in the car?", bucket: "Hỏi ai là/ở" }, { text: "Whose coat is red?", bucket: "Hỏi của ai" }, { text: "Who's ready?", bucket: "Hỏi ai là/ở" }],
    gridPrompts: ["Chọn `whose` hoặc `who's` cho từng câu.", "Chọn dạng của `be` phù hợp trong từng câu hỏi.", "Chọn câu trả lời đúng cho từng câu hỏi `whose`."],
    gridRows: [
      { cue: "___ bag is this?", options: ["Whose", "Who's", "Who"], answer: "Whose", completed: "Whose bag is this?" },
      { cue: "___ in the garden?", options: ["Whose", "Who's", "Whom"], answer: "Who's", completed: "Who's in the garden?" },
      { cue: "___ books are on the desk?", options: ["Whose", "Who's", "Who is"], answer: "Whose", completed: "Whose books are on the desk?" },
      { cue: "Whose hat ___ this?", options: ["am", "is", "are"], answer: "is", completed: "Whose hat is this?" },
      { cue: "Whose gloves ___ these?", options: ["is", "are", "does"], answer: "are", completed: "Whose gloves are these?" },
      { cue: "Whose ___ those?", options: ["is", "are", "do"], answer: "are", completed: "Whose are those?" },
      { cue: "Whose phone is this?", options: ["It's mine.", "They're mine.", "It's my."], answer: "It's mine.", completed: "Whose phone is this? — It's mine." },
      { cue: "Whose bags are those?", options: ["They're theirs.", "It's theirs.", "They're their."], answer: "They're theirs.", completed: "Whose bags are those? — They're theirs." },
      { cue: "Whose is this?", options: ["It's Nam's.", "They're Nam's.", "It's Nam."], answer: "It's Nam's.", completed: "Whose is this? — It's Nam's." },
    ],
  }),
  "irregular-plurals": compactPracticeSet({
    prefix: "a1ip",
    focus: "danh từ số nhiều bất quy tắc thông dụng",
    choices: [
      ["Dạng số nhiều thông dụng của `child` là gì?", ["children", "child", "child's"], "children", "`Child` đổi thành `children`; không thêm `-s` nữa."],
      ["Trong giao tiếp thông thường, cụm nào có nghĩa “ba người”?", ["three people", "one person", "a group"], "three people", "Trong giao tiếp thông thường, số nhiều của `person` là `people`."],
      ["Dạng số nhiều của `woman` là gì?", ["women", "woman", "woman's"], "women", "`Woman` đổi nguyên âm thành `women`."],
      ["Cách nào viết đúng “hai bàn chân”?", ["two feet", "one foot", "a foot"], "two feet", "`Foot` có số nhiều là `feet`."],
      ["Danh từ nào giữ nguyên ở số nhiều thông thường?", ["sheep", "child", "mouse"], "sheep", "`One sheep` và `two sheep` có cùng hình thức danh từ."],
      ["Câu nào đúng?", ["These children are happy.", "This child is happy.", "That child is happy."], "These children are happy.", "`Children` là số nhiều nên đi với `these` và `are`."],
      ["Sở hữu cách nào có nghĩa “đồ chơi của trẻ em”?", ["children's toys", "a child's toy", "the children"], "children's toys", "`Children` không kết thúc bằng `s`, nên thêm `'s`."],
      ["Dạng số nhiều của `tooth` là gì?", ["teeth", "tooth", "tooth's"], "teeth", "`Tooth` đổi thành `teeth`."],
      ["Trong cách nói thông thường về ba con cá, cụm nào phù hợp?", ["three fish", "a fish", "one fish"], "three fish", "Ở mức A1, `fish` thường giữ nguyên ở số nhiều."],
      ["Câu nào dùng `be` đúng với `men`?", ["The men are here.", "The men is here.", "The mans are here."], "The men are here.", "`Men` là danh từ số nhiều nên dùng `are`."],
    ],
    orders: [
      ["Sắp xếp câu “Những người phụ nữ ở đây.”", ["women", "here", "The", "are", "."], ["The", "women", "are", "here", "."], "`Women` là số nhiều nên dùng `are`."],
      ["Sắp xếp câu “Hai con chuột ở dưới bàn.”", ["mice", "under", "Two", "are", "the", "table", "."], ["Two", "mice", "are", "under", "the", "table", "."], "Số nhiều của `mouse` là `mice`."],
      ["Sắp xếp cụm “phòng của những người đàn ông”.", ["room", "the", "men’s"], ["the", "men’s", "room"], "`Men` không có `s` cuối nên sở hữu cách là `men's`."],
      ["Sắp xếp câu “Những con cừu này nhỏ.”", ["small", "These", "sheep", "are", "."], ["These", "sheep", "are", "small", "."], "`Sheep` giữ nguyên nhưng `these/are` cho biết số nhiều."],
    ],
    repairs: [
      ["Chọn dạng số nhiều đúng sau `two`.", ["Two", "child", "are", "outside", "."], 1, ["child", "children", "child's"], "children", "Sau `two`, dùng số nhiều `children`."],
      ["Chọn dạng của `be` phù hợp với `people`.", ["The", "people", "is", "ready", "."], 2, ["am", "is", "are"], "are", "`People` là danh từ số nhiều."],
      ["Chọn sở hữu cách đúng của `women`.", ["The", "women", "bags", "are", "here", "."], 1, ["women's", "women", "woman's"], "women's", "`Women` không kết thúc bằng `s`, nên thêm `'s`."],
    ],
    taps: [
      ["Trong `One man and two women are here`, chọn tất cả danh từ chỉ người.", ["One", "man", "and", "two", "women", "are", "here", "."], [1, 4], "`Man` là số ít; `women` là số nhiều."],
      ["Trong `The children's feet are cold`, chọn tất cả dạng số nhiều bất quy tắc.", ["The", "children's", "feet", "are", "cold", "."], [1, 2], "`Children` và `feet` đều là số nhiều bất quy tắc."],
      ["Trong `These fish are small`, chọn các từ cho biết chủ ngữ là số nhiều.", ["These", "fish", "are", "small", "."], [0, 2], "`Fish` không đổi; `these` và `are` cho biết số nhiều."],
    ],
    matchPrompt: "Ghép mỗi danh từ số ít với dạng số nhiều của nó.",
    pairs: [{ left: "man", right: "men" }, { left: "woman", right: "women" }, { left: "tooth", right: "teeth" }, { left: "mouse", right: "mice" }],
    sortPrompt: "Phân loại danh từ số nhiều theo cách biến đổi.",
    buckets: ["Đổi hình thức", "Giữ nguyên"],
    items: [{ text: "children", bucket: "Đổi hình thức" }, { text: "people", bucket: "Đổi hình thức" }, { text: "feet", bucket: "Đổi hình thức" }, { text: "mice", bucket: "Đổi hình thức" }, { text: "sheep", bucket: "Giữ nguyên" }, { text: "fish", bucket: "Giữ nguyên" }],
    gridPrompts: ["Chọn dạng số nhiều đúng cho từng danh từ.", "Chọn từ chỉ định và `be` khớp với từng danh từ.", "Chọn sở hữu cách đúng của từng nhóm."],
    gridRows: [
      { cue: "`person` trong giao tiếp thông thường", options: ["people", "person", "person's"], answer: "people", completed: "one person → two people" },
      { cue: "foot", options: ["feet", "foot", "foot's"], answer: "feet", completed: "one foot → two feet" },
      { cue: "mouse", options: ["mice", "mouse", "mouse's"], answer: "mice", completed: "one mouse → two mice" },
      { cue: "___ child is happy.", options: ["This", "These", "Those"], answer: "This", completed: "This child is happy." },
      { cue: "___ children are happy.", options: ["This", "These", "That"], answer: "These", completed: "These children are happy." },
      { cue: "The sheep ___ in the field.", options: ["is — một con", "are — nhiều con", "cả hai tùy ngữ cảnh"], answer: "cả hai tùy ngữ cảnh", completed: "The sheep is/are in the field, tùy số lượng." },
      { cue: "toys of the children", options: ["children's toys", "a child's toy", "the children"], answer: "children's toys", completed: "the children's toys" },
      { cue: "room for the men", options: ["men's room", "a man's room", "the men"], answer: "men's room", completed: "the men's room" },
      { cue: "bags of the women", options: ["women's bags", "a woman's bag", "the women"], answer: "women's bags", completed: "the women's bags" },
    ],
  }),
  "apostrophes": compactPracticeSet({
    prefix: "a1ap",
    focus: "dấu nháy đơn trong sở hữu và dạng viết tắt",
    choices: [
      ["Cách nào có nghĩa “sách của các học sinh”?", ["the students' books", "the student's books", "the students"], "the students' books", "`Students` đã là số nhiều có `s`, nên thêm dấu nháy sau `s`."],
      ["Dạng viết tắt nào mở rộng thành `it is`?", ["it's", "its", "he's"], "it's", "Dấu nháy trong `it's` thay cho chữ bị lược trong `it is`."],
      ["Cách nào có nghĩa “đuôi của nó”?", ["its tail", "their tail", "his tail"], "its tail", "Từ chỉ sở hữu `its` không có dấu nháy."],
      ["Dạng số nhiều đúng của `apple` là gì?", ["apples", "apple's", "apples'"], "apples", "Số nhiều thông thường không dùng dấu nháy đơn."],
      ["`She's at home` mở rộng thành gì?", ["She is at home", "She has at home", "She owns at home"], "She is at home", "Trong câu này, `'s` là `is`."],
      ["Cách nào có nghĩa “phòng của trẻ em”?", ["the children's room", "a child's room", "the children"], "the children's room", "`Children` không có `s` cuối nên thêm `'s`."],
      ["Dạng nào là viết tắt của `are not`?", ["aren't", "isn't", "she's"], "aren't", "Dạng viết tắt chuẩn của `are not` là `aren't`."],
      ["Câu nào có nghĩa “Cô ấy không ở đây”?", ["She isn't here.", "She is here.", "They aren't here."], "She isn't here.", "Dạng viết tắt chuẩn là `isn't`."],
      ["Từ nào hỏi “của ai”?", ["whose", "who's", "who"], "whose", "`Whose` không có dấu nháy; `who's` là `who is`."],
      ["Cách nào có nghĩa “xe đạp của cô bé”?", ["the girl's bike", "the boy's bike", "the girl's bag"], "the girl's bike", "Một cô bé dùng danh từ số ít + `'s`."],
    ],
    orders: [
      ["Sắp xếp cụm “tên của con chó”.", ["name", "dog’s", "the"], ["the", "dog’s", "name"], "Danh từ số ít `dog` nhận `'s`."],
      ["Sắp xếp câu “Nó đang ở trong hộp của nó.”", ["box", "It’s", "its", "in", "."], ["It’s", "in", "its", "box", "."], "`It's` là `it is`; `its` chỉ sở hữu."],
      ["Sắp xếp cụm “túi của những người phụ nữ”.", ["women’s", "the", "bags"], ["the", "women’s", "bags"], "`Women` là số nhiều không có `s` cuối nên thêm `'s`."],
      ["Sắp xếp câu “Chúng tôi không ở nhà.”", ["aren’t", "home", "We", "at", "."], ["We", "aren’t", "at", "home", "."], "`Aren't` là dạng viết tắt của `are not`."],
    ],
    repairs: [
      ["Chọn dạng đúng cho nghĩa “của nó”.", ["It’s", "name", "is", "Milo", "."], 0, ["It’s", "Its", "Their"], "Its", "Trước danh từ `name`, dùng từ chỉ sở hữu `its`."],
      ["Chọn dấu nháy đúng cho sở hữu số nhiều.", ["The", "teachers", "room", "is", "upstairs", "."], 1, ["teacher's", "teachers'", "teachers"], "teachers'", "Nhiều giáo viên: `teachers` đã có `s`, chỉ thêm dấu nháy."],
      ["Chọn dạng số nhiều thông thường đúng.", ["Two", "book’s", "are", "on", "the", "desk", "."], 1, ["books", "book's", "books'"], "books", "Chỉ muốn nói hai quyển sách nên không dùng dấu nháy."],
    ],
    taps: [
      ["Trong `Lan's here with her sister`, chọn dấu nháy thuộc dạng viết tắt.", ["Lan's", "here", "with", "her", "sister", "."], [0], "`Lan's here` mở rộng thành `Lan is here`; không phải sở hữu."],
      ["Trong `Lan's sister's bag is red`, chọn tất cả từ có dấu nháy chỉ quan hệ sở hữu.", ["Lan's", "sister's", "bag", "is", "red", "."], [0, 1], "Cả `Lan's sister` và `sister's bag` đều diễn tả quan hệ."],
      ["Trong `Who's with the children's teacher?`, chọn từ có dấu nháy là dạng viết tắt.", ["Who's", "with", "the", "children's", "teacher", "?"], [0], "`Who's` là `who is`; `children's` là sở hữu."],
    ],
    matchPrompt: "Ghép mỗi dạng viết tắt với dạng đầy đủ của nó.",
    pairs: [{ left: "I'm", right: "I am" }, { left: "you're", right: "you are" }, { left: "she's", right: "she is" }, { left: "aren't", right: "are not" }],
    sortPrompt: "Phân loại dấu nháy theo công việc trong từng ví dụ.",
    buckets: ["Sở hữu/quan hệ", "Dạng viết tắt"],
    items: [{ text: "Nam's bag", bucket: "Sở hữu/quan hệ" }, { text: "Nam's here", bucket: "Dạng viết tắt" }, { text: "the girls' room", bucket: "Sở hữu/quan hệ" }, { text: "isn't ready", bucket: "Dạng viết tắt" }, { text: "the cat's tail", bucket: "Sở hữu/quan hệ" }, { text: "they're late", bucket: "Dạng viết tắt" }],
    gridPrompts: ["Chọn dạng có hoặc không có dấu nháy theo nghĩa.", "Chọn sở hữu cách đúng cho từng người hoặc nhóm.", "Chọn số nhiều hoặc sở hữu cách phù hợp với từng cụm."],
    gridRows: [
      { cue: "___ raining. (Trời đang mưa.)", options: ["It's", "Its", "They're"], answer: "It's", completed: "It's raining." },
      { cue: "___ color is blue. (Màu của nó là xanh.)", options: ["It's", "Its", "Their"], answer: "Its", completed: "Its color is blue." },
      { cue: "___ at the door? (Ai ở cửa?)", options: ["Who's", "Whose", "Who"], answer: "Who's", completed: "Who's at the door?" },
      { cue: "one boy", options: ["the boy's bike", "the boys' bike", "the boys bike"], answer: "the boy's bike", completed: "the boy's bike" },
      { cue: "two boys", options: ["the boys' bikes", "the boy's bike", "the boys"], answer: "the boys' bikes", completed: "the boys' bikes" },
      { cue: "several children", options: ["the children's toys", "a child's toy", "the children"], answer: "the children's toys", completed: "the children's toys" },
      { cue: "hai quả táo", options: ["two apples", "one apple", "the apples"], answer: "two apples", completed: "two apples" },
      { cue: "vỏ của quả táo", options: ["the apple's skin", "an apple", "the apples' skins"], answer: "the apple's skin", completed: "the apple's skin" },
      { cue: "vỏ của nhiều quả táo", options: ["the apples' skins", "the apple's skin", "the apples"], answer: "the apples' skins", completed: "the apples' skins" },
    ],
  }),
};

const a1Chapter04TopUps: Partial<Record<string, Exercise[]>> = {
  possessives: [
    ...binaryChoiceDrills("a1pd", 1, "từ chỉ sở hữu", [
      ["cụm “tên của tôi”", "my name", "mine name", "`My` đứng trước danh từ `name`."],
      ["cụm “bố của cô ấy”", "her father", "his father", "Người có quan hệ là cô ấy nên dùng `her`."],
      ["cụm “chị/em gái của anh ấy”", "his sister", "her sister", "Chọn từ theo người có quan hệ là nam giới: `his`."],
      ["cụm “trường của chúng tôi”", "our school", "ours school", "`Our` đứng trước danh từ; `ours` đứng độc lập."],
      ["cụm “những chiếc xe của họ”", "their cars", "theirs cars", "`Their` đứng trước danh từ số nhiều `cars`."],
      ["cụm “đuôi của nó”", "its tail", "it's tail", "`Its` chỉ sở hữu và không có dấu nháy đơn."],
      ["câu “Nó màu trắng”", "It's white.", "Its white.", "`It's` mở rộng thành `It is`."],
      ["cụm có tính từ “chiếc túi mới của cô ấy”", "her new bag", "new her bag", "Từ chỉ sở hữu đứng trước tính từ và danh từ."],
      ["cụm có số lượng “hai con mèo của chúng tôi”", "our two cats", "two ours cats", "`Our` đứng đầu cụm danh từ."],
      ["một người nghe trong `... book`", "your book", "you book", "`Your` là từ chỉ sở hữu của `you`."],
      ["nhiều người nghe trong `... books`", "your books", "yours books", "`Your` không đổi khi người nghe hoặc vật được nói tới là số nhiều."],
      ["câu nói con chó ở trong ổ của nó", "The dog is in its bed.", "The dog is in it's bed.", "Trước danh từ `bed`, dùng `its`."],
    ]),
    {
      id: "a1pd13", kind: "repair", prompt: "Chọn từ chỉ sở hữu đúng trước `parents`.",
      tokens: ["We", "live", "with", "us", "parents", "."], targetIndex: 3,
      replacements: ["our", "ours", "us"], answer: "our",
      hint: "Trước danh từ cần từ chỉ sở hữu.", explanation: "`Our parents` nghĩa là bố mẹ của chúng tôi/chúng ta.",
    },
    {
      id: "a1pd14", kind: "sort", prompt: "Phân loại cụm theo người hoặc nhóm có liên hệ.",
      buckets: ["he", "she", "we", "they"],
      items: [{ text: "his coat", bucket: "he" }, { text: "her bike", bucket: "she" }, { text: "our room", bucket: "we" }, { text: "their teacher", bucket: "they" }],
      hint: "Nhìn từ chỉ sở hữu đứng đầu mỗi cụm.", explanation: "His–he, her–she, our–we, their–they.",
    },
  ],
  "possessive-s": [
    ...binaryChoiceDrills("a1psx", 1, "sở hữu cách", [
      ["“chiếc mũ của Nam”", "Nam's hat", "Nam hat's", "Người có liên hệ đứng trước, rồi `'s`, rồi vật."],
      ["“tên của Lan”", "Lan's name", "Lans name", "Tên riêng số ít nhận `'s`."],
      ["“đuôi của con mèo”", "the cat's tail", "the cats tail", "Một con mèo dùng `cat's`."],
      ["“phòng của giáo viên” khi có một giáo viên", "the teacher's room", "the teachers' room", "Danh từ số ít dùng `'s`."],
      ["“phòng của các giáo viên”", "the teachers' room", "the teacher's room", "Danh từ số nhiều đã có `s` chỉ thêm dấu nháy."],
      ["“đồ chơi của các cô bé”", "the girls' toys", "the girl's toys", "`Girls` là số nhiều đã có `-s`, nên chỉ thêm dấu nháy đơn ở cuối."],
      ["“phòng của các học sinh”", "the students' room", "the student's room", "`Students` là số nhiều đã có `-s`, nên chỉ thêm dấu nháy đơn ở cuối."],
      ["ngôi nhà chung của Lan và Nam", "Lan and Nam's house", "Lan's and Nam's house", "Một thứ chung: chỉ tên cuối nhận `'s`."],
      ["hai chiếc túi riêng của Lan và Nam", "Lan's and Nam's bags", "Lan and Nam's bags", "Mỗi người có vật riêng nên cả hai tên nhận `'s`."],
      ["ý “xe đạp của Nam” bằng một từ chỉ sở hữu", "his bike", "him bike", "Trước danh từ dùng `his`."],
      ["ý “sách của Lan” bằng một từ chỉ sở hữu", "her book", "hers book", "Trước danh từ dùng `her`, không dùng `hers`."],
      ["“bài học hôm nay”", "today's lesson", "todays lesson", "Sở hữu cách có thể nói sự liên hệ với thời gian."],
      ["“bìa của quyển sách”", "the book's cover", "the books cover", "Một quyển sách nhận `'s`."],
      ["số nhiều của `book`", "books", "book's", "Dấu nháy không dùng để tạo số nhiều."],
      ["mối quan hệ trong `Lan's teacher`", "giáo viên của Lan", "giáo viên thuộc sở hữu như một đồ vật", "Sở hữu cách còn nói quan hệ, không chỉ quyền sở hữu."],
    ]),
    ...orderExercises("a1psx", 16, [
      ["Sắp xếp cụm “sách của những học sinh”.", ["books", "students'", "the"], ["the", "students'", "books"], "Số nhiều có `s` chỉ thêm dấu nháy.", "Cụm đúng là `the students' books`."],
      ["Sắp xếp câu “Xe đạp của chị/em gái tôi mới.”", ["bike", "sister’s", "new", "My", "is", "."], ["My", "sister’s", "bike", "is", "new", "."], "Đọc từ người có liên hệ sang vật.", "`My sister's bike` là chủ ngữ của câu."],
    ]),
  ],
};

const a1Chapter04DepthExtensions: Partial<Record<string, Exercise[]>> = {
  possessives: [{
    id: "a1depth-pos-1", kind: "grid", prompt: "Chọn từ chỉ sở hữu theo đúng người hoặc vật có liên hệ trong từng tình huống.",
    hint: "Xác định người hoặc vật có liên hệ trước, rồi chọn dạng đứng trước danh từ.",
    explanation: "Mỗi từ chỉ sở hữu được chọn theo người hoặc vật có liên hệ, không theo danh từ phía sau.",
    rows: [
      { cue: "Lan has a bike. It is ___ bike.", options: ["her", "his", "their"], answer: "her", completed: "It is her bike." },
      { cue: "I have a new teacher. ___ teacher is kind.", options: ["My", "Our", "Their"], answer: "My", completed: "My teacher is kind." },
      { cue: "The dog is in ___ bed.", options: ["its", "it's", "their"], answer: "its", completed: "The dog is in its bed." },
    ],
  }],
  "possessive-s": [{
    id: "a1depth-ps-1", kind: "grid", prompt: "Chọn sở hữu cách phù hợp với một người hoặc một nhóm có danh từ số nhiều tận cùng bằng `s`.",
    hint: "Kiểm tra danh từ chỉ người có kết thúc bằng `s` hay không trước khi đặt dấu nháy.",
    explanation: "Số ít dùng `'s`, còn danh từ số nhiều đã có `s` chỉ thêm dấu nháy ở cuối.",
    rows: [
      { cue: "the room of one teacher", options: ["the teacher's room", "the teachers' room", "the teacher"], answer: "the teacher's room", completed: "the teacher's room" },
      { cue: "the room of several teachers", options: ["the teachers' room", "the teacher's room", "the teachers"], answer: "the teachers' room", completed: "the teachers' room" },
      { cue: "the toys of the girls", options: ["the girls' toys", "the girl's toy", "the girls"], answer: "the girls' toys", completed: "the girls' toys" },
    ],
  }],
};

export const a1Chapter04ExerciseData = mergeExerciseRecords(
  a1Chapter04BaseExerciseData,
  a1Chapter04TopUps,
  a1Chapter04DepthExtensions,
);
