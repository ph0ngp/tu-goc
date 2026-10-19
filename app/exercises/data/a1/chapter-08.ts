/* Luyện tập A1 — Chương 8: Khả năng và tương tác cơ bản. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { binaryChoiceDrills, compactPracticeSet } from "../../basic-builders.ts";

const a1Chapter08BaseExerciseData: Record<string, Exercise[]> = {
  "ability-can": [
    {
      "id": "ca1",
      "kind": "choice",
      "prompt": "He can ___.",
      "hint": "Sau can dùng động từ cơ bản.",
      "explanation": "He can swim. đúng dù chủ ngữ là he.",
      "options": [
        "swim",
        "swims",
        "swimming"
      ],
      "answer": "swim"
    },
    {
      "id": "ca2",
      "kind": "choice",
      "prompt": "Cô ấy không biết lái xe.",
      "hint": "can’t tự tạo phủ định; drive giữ dạng cơ bản.",
      "explanation": "She can’t drive. là câu đúng.",
      "options": [
        "She can’t drive.",
        "She doesn’t can drive.",
        "She can’t drives."
      ],
      "answer": "She can’t drive."
    },
    {
      "id": "ca3",
      "kind": "order",
      "prompt": "Bạn có biết bơi không?",
      "hint": "Đưa Can lên đầu.",
      "explanation": "Can you swim? có đúng trật tự.",
      "tokens": [
        "swim",
        "you",
        "Can",
        "?"
      ],
      "answer": [
        "Can",
        "you",
        "swim",
        "?"
      ]
    },
    {
      "id": "ca4",
      "kind": "choice",
      "prompt": "Can Lan read? — Yes, ___.",
      "hint": "Đổi Lan thành she và dùng lại can.",
      "explanation": "Yes, she can. là câu trả lời ngắn đúng.",
      "options": [
        "she can",
        "she reads",
        "Lan does"
      ],
      "answer": "she can"
    },
    {
      "id": "ca5",
      "kind": "tap",
      "prompt": "Chạm vào động từ chính giữ dạng cơ bản.",
      "hint": "Từ đứng sau can là động từ chính.",
      "explanation": "help giữ dạng cơ bản sau can.",
      "tokens": [
        "They",
        "can",
        "help",
        "us",
        "."
      ],
      "answerIndexes": [
        2
      ],
      "selectionMode": "single"
    },
    {
      "id": "ca6",
      "kind": "choice",
      "prompt": "___ can you do? (Bạn có thể làm gì?)",
      "hint": "Câu hỏi hỏi về việc có thể làm.",
      "explanation": "What can you do? nghĩa là Bạn có thể làm gì?",
      "options": [
        "What",
        "Where",
        "When"
      ],
      "answer": "What"
    },
    {
      "id": "ca7",
      "kind": "sort",
      "prompt": "Dựa vào can và can’t.",
      "hint": "can là có thể; can’t là không thể.",
      "explanation": "Bốn câu đã được phân loại theo nghĩa.",
      "buckets": [
        "Có khả năng",
        "Không có khả năng"
      ],
      "items": [
        {
          "text": "I can swim.",
          "bucket": "Có khả năng"
        },
        {
          "text": "She can read.",
          "bucket": "Có khả năng"
        },
        {
          "text": "He can’t drive.",
          "bucket": "Không có khả năng"
        },
        {
          "text": "They can’t help.",
          "bucket": "Không có khả năng"
        }
      ]
    },
    {
      "id": "ca8",
      "kind": "grid",
      "prompt": "Kiểm tra khẳng định, phủ định và câu hỏi.",
      "hint": "Sau can/can’t luôn dùng động từ cơ bản.",
      "explanation": "Ba dạng câu đều giữ đúng cấu trúc can.",
      "rows": [
        {
          "cue": "Anh ấy biết bơi.",
          "options": [
            "He can swim.",
            "He can swims.",
            "He swims can."
          ],
          "answer": "He can swim.",
          "completed": "He can swim."
        },
        {
          "cue": "Họ không thể giúp.",
          "options": [
            "They can’t help.",
            "They don’t can help.",
            "They can’t helping."
          ],
          "answer": "They can’t help.",
          "completed": "They can’t help."
        },
        {
          "cue": "Cô ấy biết đọc không?",
          "options": [
            "Can she read?",
            "Does she can read?",
            "Can she reads?"
          ],
          "answer": "Can she read?",
          "completed": "Can she read?"
        }
      ]
    },
    {
      "id": "ca9",
      "kind": "grid",
      "prompt": "Kết hợp `can` với những cấu trúc đã học.",
      "hint": "Sau `can` luôn dùng động từ cơ bản; câu không có `can` giữ quy tắc hiện tại đơn.",
      "explanation": "Ba tình huống ôn lại hiện tại đơn và thêm cấu trúc chỉ khả năng với `can`.",
      "rows": [
        {
          "cue": "Lan thường đọc.",
          "options": [
            "Lan often reads.",
            "Lan often read.",
            "Lan is often read."
          ],
          "answer": "Lan often reads.",
          "completed": "Lan often reads."
        },
        {
          "cue": "Hỏi Lan có thích sách không.",
          "options": [
            "Does Lan like books?",
            "Does Lan likes books?",
            "Is Lan like books?"
          ],
          "answer": "Does Lan like books?",
          "completed": "Does Lan like books?"
        },
        {
          "cue": "Họ có thể đọc quyển sách này.",
          "options": [
            "They can read this book.",
            "They can reads this book.",
            "They can to read this book."
          ],
          "answer": "They can read this book.",
          "completed": "They can read this book."
        }
      ]
    },
    {
      "id": "ca10",
      "kind": "choice",
      "prompt": "Câu nào có cùng nghĩa với câu `She can’t drive`?",
      "hint": "can’t là dạng rút gọn của cannot.",
      "explanation": "She cannot drive. và She can’t drive. có cùng nghĩa.",
      "options": [
        "She cannot drive.",
        "She does not can drive.",
        "She cannot drives."
      ],
      "answer": "She cannot drive."
    },
    {
      "id": "ca11",
      "kind": "grid",
      "prompt": "Can không đổi theo chủ ngữ và không đi với to trong mẫu này.",
      "hint": "Sau can luôn dùng động từ cơ bản.",
      "explanation": "Ba chủ ngữ khác nhau đều dùng cùng một dạng can + động từ.",
      "rows": [
        {
          "cue": "Anh ấy biết bơi.",
          "options": [
            "He can swim.",
            "He can read.",
            "He swims every day."
          ],
          "answer": "He can swim.",
          "completed": "He can swim."
        },
        {
          "cue": "Cô ấy biết đọc.",
          "options": [
            "She can read.",
            "She cans read.",
            "She can reading."
          ],
          "answer": "She can read.",
          "completed": "She can read."
        },
        {
          "cue": "Họ có thể giúp.",
          "options": [
            "They can help.",
            "They can to help.",
            "They cans help."
          ],
          "answer": "They can help.",
          "completed": "They can help."
        }
      ]
    },
    {
      "id": "ca12",
      "kind": "grid",
      "prompt": "Phân biệt động từ cơ bản và dạng he/she/it.",
      "hint": "I dùng dạng cơ bản; Lan và the cat dùng dạng ngôi thứ ba số ít.",
      "explanation": "Ba câu đã dùng đúng dạng động từ trong câu khẳng định.",
      "rows": [
        {
          "cue": "Tôi làm việc mỗi ngày.",
          "options": [
            "I work every day.",
            "I works every day.",
            "I am work every day."
          ],
          "answer": "I work every day.",
          "completed": "I work every day."
        },
        {
          "cue": "Lan học tiếng Anh.",
          "options": [
            "Lan studies English.",
            "Lan study English.",
            "Lan is study English."
          ],
          "answer": "Lan studies English.",
          "completed": "Lan studies English."
        },
        {
          "cue": "Con mèo có một chiếc giường.",
          "options": [
            "The cat has a bed.",
            "The cat have a bed.",
            "The cat is a bed."
          ],
          "answer": "The cat has a bed.",
          "completed": "The cat has a bed."
        }
      ]
    },
    {
      "id": "ca13",
      "kind": "grid",
      "prompt": "Chọn đúng do/does và vị trí trạng từ.",
      "hint": "Phủ định và câu hỏi dùng trợ động từ; trạng từ đứng trước động từ hành động.",
      "explanation": "Ba hệ thống quan trọng đã được kết hợp đúng.",
      "rows": [
        {
          "cue": "Cô ấy không thích trà.",
          "options": [
            "She doesn’t like tea.",
            "She doesn’t likes tea.",
            "She isn’t like tea."
          ],
          "answer": "She doesn’t like tea.",
          "completed": "She doesn’t like tea."
        },
        {
          "cue": "Họ có làm việc ở đây không?",
          "options": [
            "Do they work here?",
            "Does they work here?",
            "Are they work here?"
          ],
          "answer": "Do they work here?",
          "completed": "Do they work here?"
        },
        {
          "cue": "Lan thường đọc.",
          "options": [
            "Lan often reads.",
            "Lan reads often always.",
            "Lan is often read."
          ],
          "answer": "Lan often reads.",
          "completed": "Lan often reads."
        }
      ]
    },
    {
      "id": "ca14",
      "kind": "grid",
      "prompt": "Kết hợp đại từ tân ngữ với `can`.",
      "hint": "Đại từ sau động từ dùng dạng tân ngữ; sau `can` là động từ cơ bản.",
      "explanation": "Ba tình huống kết hợp đúng `can` với `me/us/it` và động từ cơ bản.",
      "rows": [
        {
          "cue": "Tôi giúp cô ấy.",
          "options": [
            "I help her.",
            "I help she.",
            "Me help her."
          ],
          "answer": "I help her.",
          "completed": "I help her."
        },
        {
          "cue": "Cô ấy có thể giúp chúng tôi.",
          "options": [
            "She can help us.",
            "She can helps us.",
            "She can help we."
          ],
          "answer": "She can help us.",
          "completed": "She can help us."
        },
        {
          "cue": "Họ có thể đọc nó không?",
          "options": [
            "Can they read it?",
            "Do they can read it?",
            "Can them reads it?"
          ],
          "answer": "Can they read it?",
          "completed": "Can they read it?"
        }
      ]
    }
  ],
  "can-requests": compactPracticeSet({
    prefix: "a1cr",
    focus: "can để xin phép, yêu cầu và đề nghị",
    choices: [
      ["Câu nào dùng để xin phép mở cửa sổ?", ["Can I open the window?", "Can you open the window?", "I can open the window."], "Can I open the window?", "`Can I ...?` hỏi người nói có được phép làm hay không."],
      ["Câu nào là lời nhờ người nghe đóng cửa?", ["Can you close the door?", "Can I close the door?", "You can close the door."], "Can you close the door?", "`Can you ...?` thường dùng để yêu cầu người nghe làm việc."],
      ["Câu nào là lời đề nghị giúp mang túi?", ["Can I carry your bag?", "Can you carry my bag?", "I can't carry your bag."], "Can I carry your bag?", "Người nói đề nghị tự mình giúp người nghe."],
      ["Cách nào lịch sự hơn cho cùng lời yêu cầu?", ["Can you wait, please?", "You wait.", "Wait now!"], "Can you wait, please?", "Câu hỏi với `can` và `please` làm yêu cầu mềm hơn."],
      ["Câu trả lời nào tự nhiên khi đồng ý giúp?", ["Sure.", "Yes, I do.", "Yes, I am."], "Sure.", "Lời yêu cầu với `can` thường được đáp bằng `Sure/Of course`."],
      ["Câu trả lời nào lịch sự khi từ chối lời mời lấy nước?", ["No, thank you.", "No, I don't.", "No water."], "No, thank you.", "`No, thank you` là lời từ chối lịch sự."],
      ["Câu nào có thể là câu hỏi khả năng chứ không phải yêu cầu?", ["Can you swim?", "Can you pass me the salt?", "Can you open the door for me?"], "Can you swim?", "`Swim` thường được hỏi như một kỹ năng; ngữ cảnh vẫn quyết định."],
      ["Câu nào đề nghị lấy ghế cho người nghe?", ["Can I get you a chair?", "Can you get me a chair?", "Can I have your chair?"], "Can I get you a chair?", "`Can I get you ...?` là mẫu đề nghị mang/lấy vật."],
      ["Sau `can`, dạng nào đúng?", ["help", "to help", "helps"], "help", "Sau `can` luôn là động từ cơ bản không có `to`."],
      ["Câu nào xin phép cho cả nhóm ngồi đây?", ["Can we sit here?", "Can us sit here?", "Do we can sit here?"], "Can we sit here?", "Dùng `Can we + động từ cơ bản?`."],
    ],
    orders: [
      ["Sắp xếp lời xin phép “Tôi dùng điện thoại của bạn được không?”", ["phone", "use", "Can", "your", "I", "?"], ["Can", "I", "use", "your", "phone", "?"], "`Can I` đứng đầu, sau đó là động từ cơ bản."],
      ["Sắp xếp lời yêu cầu “Bạn nhắc lại điều đó được không?”", ["that", "Can", "repeat", "you", "?"], ["Can", "you", "repeat", "that", "?"], "Dùng `Can you + động từ cơ bản`; `that` là điều cần được nhắc lại."],
      ["Sắp xếp lời đề nghị “Tôi giúp bạn được không?”", ["help", "Can", "you", "I", "?"], ["Can", "I", "help", "you", "?"], "Người nói đề nghị tự giúp nên dùng `Can I`."],
      ["Sắp xếp lời xin phép “Chúng tôi vào được không?”", ["come", "we", "Can", "in", "?"], ["Can", "we", "come", "in", "?"], "Dùng động từ cụm `come in` sau `Can we`."],
    ],
    repairs: [
      ["Chọn đại từ phù hợp cho lời xin phép của người nói.", ["Can", "you", "borrow", "this", "book", "?"], 1, ["I", "you", "me"], "I", "`Can I borrow...?` là lời xin phép."],
      ["Chọn đại từ phù hợp khi nhờ người nghe.", ["Can", "I", "help", "me", "?"], 1, ["I", "you", "we"], "you", "`Can you help me?` nhờ người nghe giúp."],
      ["Chọn cụm động từ đúng sau `can`.", ["Can", "she", "to carry", "the", "box", "?"], 2, ["carry", "to carry", "carries"], "carry", "Sau `can`, dùng trực tiếp động từ cơ bản `carry`."],
    ],
    taps: [
      ["Trong `Can I get you some tea?`, chọn người được đề nghị nhận trà.", ["Can", "I", "get", "you", "some", "tea", "?"], [3], "`You` là người nhận lời đề nghị."],
      ["Trong `Can you please open the window?`, chọn từ làm yêu cầu lịch sự hơn.", ["Can", "you", "please", "open", "the", "window", "?"], [2], "`Please` làm lời yêu cầu mềm hơn."],
      ["Trong `Can we help you?`, chọn nhóm sẽ thực hiện hành động giúp.", ["Can", "we", "help", "you", "?"], [1], "`We` là chủ ngữ và là nhóm đề nghị giúp."],
    ],
    matchPrompt: "Ghép mỗi câu với mục đích giao tiếp chính.",
    pairs: [{ left: "Can I use your pen?", right: "xin phép" }, { left: "Can you help me?", right: "yêu cầu" }, { left: "Can I carry that?", right: "đề nghị giúp" }, { left: "Can you swim?", right: "hỏi khả năng" }],
    sortPrompt: "Phân loại câu theo người được mong đợi thực hiện hành động.",
    buckets: ["Người nói/cả nhóm người nói", "Người nghe"],
    items: [{ text: "Can I open it?", bucket: "Người nói/cả nhóm người nói" }, { text: "Can we sit here?", bucket: "Người nói/cả nhóm người nói" }, { text: "Can I help you?", bucket: "Người nói/cả nhóm người nói" }, { text: "Can you wait?", bucket: "Người nghe" }, { text: "Can you call me?", bucket: "Người nghe" }, { text: "Can you close the door?", bucket: "Người nghe" }],
    gridPrompts: ["Chọn `I`, `we` hoặc `you` theo mục đích giao tiếp.", "Chọn câu đáp tự nhiên cho từng lời nói.", "Chọn câu phù hợp nhất với từng tình huống."],
    gridRows: [
      { cue: "Xin phép cho bản thân: ___ leave early?", options: ["Can I", "Can you", "I can"], answer: "Can I", completed: "Can I leave early?" },
      { cue: "Xin phép cho cả nhóm: ___ come in?", options: ["Can we", "Can us", "Do we can"], answer: "Can we", completed: "Can we come in?" },
      { cue: "Nhờ người nghe: ___ help me?", options: ["Can you", "Can I", "You can"], answer: "Can you", completed: "Can you help me?" },
      { cue: "Can I sit here?", options: ["Yes, of course.", "Yes, I do.", "Yes, I am."], answer: "Yes, of course.", completed: "Can I sit here? — Yes, of course." },
      { cue: "Can you help me?", options: ["Sure.", "Yes, I am.", "No, I don't help."], answer: "Sure.", completed: "Can you help me? — Sure." },
      { cue: "Can I get you some coffee?", options: ["No, thank you.", "No, I can't coffee.", "No, I don't."], answer: "No, thank you.", completed: "Can I get you some coffee? — No, thank you." },
      { cue: "Bạn muốn dùng bút của người khác.", options: ["Can I use your pen?", "Can you use my pen?", "Can I give you a pen?"], answer: "Can I use your pen?", completed: "Can I use your pen?" },
      { cue: "Bạn muốn người khác mở cửa.", options: ["Can you open the door?", "Can I open the door?", "You open can the door?"], answer: "Can you open the door?", completed: "Can you open the door?" },
      { cue: "Bạn muốn xách túi giúp người khác.", options: ["Can I carry your bag?", "Can you carry my bag?", "Can I have your bag?"], answer: "Can I carry your bag?", completed: "Can I carry your bag?" },
    ],
  }),
  "question-helpers": compactPracticeSet({
    prefix: "a1qh",
    focus: "việc chọn be, do/does hoặc can trong câu hỏi",
    choices: [
      ["Câu nào hỏi về nơi ở bằng `be`?", ["Is Lan at home?", "Does Lan at home?", "Can Lan at home?"], "Is Lan at home?", "Câu nói nơi chốn với `be` nên đảo `is`."],
      ["Câu nào hỏi về thói quen làm việc?", ["Does Lan work here?", "Is Lan work here?", "Can Lan works here?"], "Does Lan work here?", "Động từ thường `work` ở hiện tại đơn dùng `does`."],
      ["Câu nào hỏi khả năng?", ["Can Lan swim?", "Does Lan can swim?", "Is Lan swim?"], "Can Lan swim?", "`Can` tự đứng trước chủ ngữ; sau nó là động từ cơ bản."],
      ["Câu trả lời nào hợp với `Are they ready?`?", ["Yes, they are.", "Yes, they do.", "Yes, they can."], "Yes, they are.", "Câu hỏi dùng `are` nên câu trả lời ngắn giữ `are`."],
      ["Câu trả lời nào hợp với `Do they live here?`?", ["No, they don't.", "No, they aren't.", "No, they can't."], "No, they don't.", "Câu hỏi dùng `do` nên trả lời bằng `don't`."],
      ["Câu trả lời nào hợp với `Can she drive?`?", ["Yes, she can.", "Yes, she does.", "Yes, she is."], "Yes, she can.", "Câu hỏi dùng `can` nên trả lời bằng `can`."],
      ["Câu nào hỏi đúng về giờ mở cửa thường lệ?", ["Does the shop open at nine?", "Is the shop opens at nine?", "Can the shop opens at nine?"], "Does the shop open at nine?", "`Open` là động từ hành động theo lịch nên dùng `does`."],
      ["Câu nào hỏi trạng thái cửa hàng hiện tại?", ["Is the shop open?", "Does the shop open?", "Can the shop open?"], "Is the shop open?", "`Open` là tính từ sau `be` trong câu này."],
      ["Sau `does`, dạng động từ nào đúng?", ["have", "has", "having"], "have", "Sau `does`, động từ chính ở dạng cơ bản."],
      ["Sau `can`, dạng động từ nào đúng?", ["help", "helps", "to help"], "help", "Sau `can`, dùng động từ cơ bản không có `to`."],
    ],
    orders: [
      ["Sắp xếp câu hỏi “Cô ấy có mệt không?”", ["tired", "she", "Is", "?"], ["Is", "she", "tired", "?"], "Câu dùng `be` nên đảo `is`."],
      ["Sắp xếp câu hỏi “Cô ấy có làm việc ở đây không?”", ["here", "she", "work", "Does", "?"], ["Does", "she", "work", "here", "?"], "Động từ thường dùng `does`; `work` ở dạng cơ bản."],
      ["Sắp xếp câu hỏi “Cô ấy có thể làm việc ở đây không?”", ["work", "she", "here", "Can", "?"], ["Can", "she", "work", "here", "?"], "Đưa `can` lên trước chủ ngữ."],
      ["Sắp xếp câu “Bạn sống ở đâu?”", ["you", "live", "Where", "do", "?"], ["Where", "do", "you", "live", "?"], "Từ hỏi đứng trước hệ thống `do`."],
    ],
    repairs: [
      ["Chọn từ mở đầu phù hợp cho câu hỏi về đặc điểm.", ["Does", "the", "room", "quiet", "?"], 0, ["Is", "Does", "Can"], "Is", "`Quiet` là tính từ nên cần `be`: `Is the room quiet?`."],
      ["Chọn trợ động từ phù hợp cho động từ `like`.", ["Is", "Nam", "like", "coffee", "?"], 0, ["Does", "Is", "Can"], "Does", "Câu hiện tại đơn với động từ thường `like` dùng `does`."],
      ["Chọn từ phù hợp cho câu hỏi xin phép.", ["Do", "I", "use", "your", "phone", "?"], 0, ["Can", "Do", "Am"], "Can", "`Can I use...?` là lời xin phép."],
    ],
    taps: [
      ["Trong `Where does your sister work?`, chọn trợ động từ tạo câu hỏi.", ["Where", "does", "your", "sister", "work", "?"], [1], "`Does` tạo câu hỏi hiện tại đơn với chủ ngữ số ít."],
      ["Trong `Why are the children tired?`, chọn dạng của `be` được đảo.", ["Why", "are", "the", "children", "tired", "?"], [1], "`Are` đứng trước chủ ngữ số nhiều."],
      ["Trong `What can we do?`, chọn động từ khuyết thiếu.", ["What", "can", "we", "do", "?"], [1], "`Can` đứng trước chủ ngữ và động từ cơ bản `do`."],
    ],
    matchPrompt: "Ghép mỗi câu hỏi với hệ thống ngữ pháp của nó.",
    pairs: [{ left: "Is she happy?", right: "be — đặc điểm" }, { left: "Does she work?", right: "do/does — động từ thường" }, { left: "Can she swim?", right: "can — khả năng" }, { left: "Where are they?", right: "be — nơi chốn" }],
    sortPrompt: "Phân loại câu hỏi theo từ được đưa lên trước chủ ngữ.",
    buckets: ["be", "do/does", "can"],
    items: [{ text: "Are you ready?", bucket: "be" }, { text: "Where is Lan?", bucket: "be" }, { text: "Do you read?", bucket: "do/does" }, { text: "What does she want?", bucket: "do/does" }, { text: "Can you help?", bucket: "can" }, { text: "Where can we sit?", bucket: "can" }],
    gridPrompts: ["Chọn từ mở đầu đúng cho từng câu hỏi.", "Chọn câu trả lời ngắn cùng hệ thống.", "Chọn dạng động từ đúng sau `does` hoặc `can`."],
    gridRows: [
      { cue: "___ he at home?", options: ["Is", "Does", "Can"], answer: "Is", completed: "Is he at home?" },
      { cue: "___ he live here?", options: ["Does", "Is", "Can"], answer: "Does", completed: "Does he live here?" },
      { cue: "___ he speak English? (khả năng)", options: ["Can", "Does", "Is"], answer: "Can", completed: "Can he speak English?" },
      { cue: "Is she ready?", options: ["Yes, she is.", "Yes, she does.", "Yes, she can."], answer: "Yes, she is.", completed: "Is she ready? — Yes, she is." },
      { cue: "Does she work?", options: ["No, she doesn't.", "No, she isn't.", "No, she can't."], answer: "No, she doesn't.", completed: "Does she work? — No, she doesn't." },
      { cue: "Can she drive?", options: ["No, she can't.", "No, she doesn't.", "No, she isn't."], answer: "No, she can't.", completed: "Can she drive? — No, she can't." },
      { cue: "Does he ___ a car?", options: ["have", "has", "having"], answer: "have", completed: "Does he have a car?" },
      { cue: "Can she ___ us?", options: ["help", "helps", "to help"], answer: "help", completed: "Can she help us?" },
      { cue: "Does the shop ___ at eight?", options: ["open", "opens", "opening"], answer: "open", completed: "Does the shop open at eight?" },
    ],
  }),
  "instructions-and-can": [
    {
      "id": "ic2",
      "kind": "order",
      "prompt": "Sắp xếp mệnh lệnh “Đứng lên.”",
      "hint": "Mệnh lệnh bắt đầu bằng động từ cơ bản.",
      "explanation": "`Stand up` là một mệnh lệnh khẳng định.",
      "tokens": [
        "up",
        "Stand"
      ],
      "answer": [
        "Stand",
        "up"
      ]
    },
    {
      "id": "ic5",
      "kind": "tap",
      "prompt": "Chạm vào động từ mở đầu mệnh lệnh.",
      "hint": "Mệnh lệnh khẳng định bắt đầu bằng động từ cơ bản.",
      "explanation": "`Open` là động từ mở đầu lời yêu cầu.",
      "tokens": [
        "Open",
        "the",
        "door"
      ],
      "answerIndexes": [
        0
      ],
      "selectionMode": "single"
    },
    {
      "id": "ic7",
      "kind": "context",
      "prompt": "Chọn lời yêu cầu lịch sự phù hợp.",
      "hint": "Có thể thêm `please` vào mệnh lệnh.",
      "explanation": "`Please open the window` là lời yêu cầu lịch sự.",
      "context": "Bạn muốn người nghe mở cửa sổ giúp mình.",
      "options": [
        "Please open the window.",
        "Please opens the window.",
        "Opening the window please."
      ],
      "answer": "Please open the window."
    },
    {
      "id": "ic8",
      "kind": "choice",
      "prompt": "Câu nào yêu cầu người nghe mở sách?",
      "hint": "Câu mệnh lệnh bắt đầu bằng động từ.",
      "explanation": "Open the book. là một yêu cầu trực tiếp.",
      "options": [
        "Open the book.",
        "Don’t open the book.",
        "She can open the book."
      ],
      "answer": "Open the book."
    },
    {
      "id": "im5",
      "kind": "choice",
      "prompt": "Đừng chạy.",
      "hint": "Dùng Don’t + động từ cơ bản.",
      "explanation": "Don’t run. là lời yêu cầu không chạy.",
      "options": [
        "Don’t run.",
        "Not run.",
        "Doesn’t run."
      ],
      "answer": "Don’t run."
    },
    {
      "id": "im6",
      "kind": "order",
      "prompt": "Vui lòng mở sách.",
      "hint": "Please đứng đầu; open giữ dạng cơ bản.",
      "explanation": "Please open the book. là lời yêu cầu lịch sự.",
      "tokens": [
        "the book",
        "Please",
        "open"
      ],
      "answer": [
        "Please",
        "open",
        "the book"
      ]
    },
    {
      "id": "im7",
      "kind": "choice",
      "prompt": "Đừng đến muộn.",
      "hint": "Mệnh lệnh phủ định dùng `don't + động từ cơ bản`.",
      "explanation": "`Don't be late` là mệnh lệnh phủ định với `be`.",
      "options": [
        "Don't be late.",
        "Doesn't be late.",
        "Don't late."
      ],
      "answer": "Don't be late."
    },
    {
      "id": "im8",
      "kind": "grid",
      "prompt": "Chọn mệnh lệnh khẳng định, phủ định hoặc lịch sự phù hợp.",
      "hint": "Nhìn ý khẳng định/phủ định và xem câu có cần `please` hay không.",
      "explanation": "Ba mệnh lệnh dùng đúng động từ cơ bản và hình thức phủ định/lịch sự.",
      "rows": [
        {
          "cue": "Yêu cầu mở cửa",
          "options": [
            "Open the door.",
            "Opens the door.",
            "Don’t open the door."
          ],
          "answer": "Open the door.",
          "completed": "Open the door."
        },
        {
          "cue": "Yêu cầu không mở cửa",
          "options": [
            "Don’t open the door.",
            "Open not the door.",
            "Please don't opening the door."
          ],
          "answer": "Don’t open the door.",
          "completed": "Don’t open the door."
        },
        {
          "cue": "Lịch sự yêu cầu đọc đoạn này",
          "options": [
            "Please read this passage.",
            "Please reads this passage.",
            "Please reading this passage."
          ],
          "answer": "Please read this passage.",
          "completed": "Please read this passage."
        }
      ]
    }
  ],
  "lets-suggestions": compactPracticeSet({
    prefix: "a1ls",
    focus: "Let's để đề nghị cùng làm",
    choices: [
      ["Câu nào rủ người nói và người nghe cùng về nhà?", ["Let's go home.", "Go home.", "Can you go home?"], "Let's go home.", "`Let's` bao gồm cả người nói và người nghe."],
      ["Sau `let's`, dạng nào đúng?", ["play", "to play", "plays"], "play", "Sau `let's`, dùng động từ cơ bản."],
      ["Cách nào đề nghị cả nhóm không chờ?", ["Let's not wait.", "Let's not to wait.", "Let's no wait."], "Let's not wait.", "Đặt `not` ngay sau `let's`."],
      ["Lời đáp nào đồng ý với một lời rủ?", ["Good idea.", "Yes, I do.", "Yes, I am."], "Good idea.", "`Good idea` là lời đáp tự nhiên cho một đề nghị."],
      ["Lời đáp nào từ chối trực tiếp lời rủ?", ["No, let's not.", "No, we don't.", "No, we aren't."], "No, let's not.", "Giữ lại mẫu `let's not`."],
      ["Câu nào chỉ yêu cầu người nghe mở cửa?", ["Open the door.", "Let's open the door.", "Let's not open the door."], "Open the door.", "Mệnh lệnh hướng tới người nghe; `let's` bao gồm người nói."],
      ["Câu nào là lời rủ cùng ăn trưa?", ["Let's have lunch.", "Let's to have lunch.", "Have lunch you."], "Let's have lunch.", "Dùng `let's + have` ở dạng cơ bản."],
      ["Dạng nào có dấu nháy và nghĩa “chúng ta hãy”?", ["let's", "lets", "lets'"], "let's", "`Let's` là dạng viết tắt của `let us`."],
      ["`She lets me go` dùng `lets` theo nghĩa gì?", ["cho phép", "chúng ta hãy", "không làm"], "cho phép", "`Lets` không dấu nháy là dạng động từ của `let`."],
      ["Câu nào rủ cả nhóm bắt đầu ngay?", ["Let's start now.", "Start now.", "Can you start now?"], "Let's start now.", "`Let's` cho biết người nói cũng tham gia việc bắt đầu."],
    ],
    orders: [
      ["Sắp xếp lời rủ “Chúng ta xem một bộ phim nhé.”", ["film", "watch", "Let’s", "a", "."], ["Let’s", "watch", "a", "film", "."], "Sau `let's` là động từ cơ bản `watch`."],
      ["Sắp xếp lời đề nghị “Chúng ta đừng đến muộn.”", ["late", "Let’s", "be", "not", "."], ["Let’s", "not", "be", "late", "."], "`Not` đứng sau `let's`; `be` ở dạng cơ bản."],
      ["Sắp xếp lời rủ “Chúng ta hỏi giáo viên nhé.”", ["teacher", "ask", "the", "Let’s", "."], ["Let’s", "ask", "the", "teacher", "."], "Dùng `let's + ask`."],
      ["Sắp xếp lời rủ “Chúng ta bắt đầu ngay nhé.”", ["now", "Let’s", "start", "."], ["Let’s", "start", "now", "."], "Dùng `let's + động từ cơ bản`; `now` đứng cuối câu."],
    ],
    repairs: [
      ["Chọn cụm động từ đúng sau `let's`.", ["Let’s", "to go", "now", "."], 1, ["go", "to go", "going"], "go", "Sau `let's`, dùng trực tiếp động từ cơ bản `go`."],
      ["Chọn từ phủ định đúng sau `let's`.", ["Let’s", "no", "tell", "Lan", "."], 1, ["not", "no", "doesn't"], "not", "Mẫu chuẩn là `Let's not tell Lan`."],
      ["Chọn dạng có dấu nháy cho lời rủ.", ["Lets", "have", "a", "break", "."], 0, ["Let's", "Lets", "Lets'"], "Let's", "Lời rủ dùng dạng viết tắt `let's`."],
    ],
    taps: [
      ["Trong `Let's take the bus`, chọn phần cho biết người nói rủ cả nhóm cùng làm.", ["Let’s", "take", "the", "bus", "."], [0], "`Let's` mang ý “người nói và người nghe cùng...”."],
      ["Trong `Let's not talk here`, chọn phần tạo lời đề nghị phủ định.", ["Let’s", "not", "talk", "here", "."], [0, 1], "`Let's not` đề nghị cả nhóm không làm."],
      ["Trong hai câu `Open your book. Let's read together`, chọn lời rủ cùng làm.", ["Open", "your", "book", ".", "Let’s", "read", "together", "."], [4, 5, 6], "`Open your book` chỉ hướng tới người nghe; `Let's read together` bao gồm cả người nói."],
    ],
    matchPrompt: "Ghép mỗi câu với đúng mục đích giao tiếp.",
    pairs: [{ left: "Let's have lunch.", right: "rủ cùng ăn trưa" }, { left: "Let's not wait.", right: "đề nghị cả nhóm không chờ" }, { left: "Open the door.", right: "yêu cầu người nghe mở cửa" }, { left: "Can you help me?", right: "nhờ người nghe giúp" }],
    sortPrompt: "Phân loại câu theo mệnh lệnh cho người nghe hoặc lời rủ cùng làm.",
    buckets: ["Mệnh lệnh", "Lời rủ với Let's"],
    items: [{ text: "Sit down.", bucket: "Mệnh lệnh" }, { text: "Don't run.", bucket: "Mệnh lệnh" }, { text: "Please wait.", bucket: "Mệnh lệnh" }, { text: "Let's sit here.", bucket: "Lời rủ với Let's" }, { text: "Let's not run.", bucket: "Lời rủ với Let's" }, { text: "Let's wait for Lan.", bucket: "Lời rủ với Let's" }],
    gridPrompts: ["Chọn cấu trúc phù hợp theo người thực hiện hành động.", "Chọn dạng khẳng định hoặc phủ định của lời rủ.", "Chọn câu đáp tự nhiên cho từng đề nghị."],
    gridRows: [
      { cue: "chỉ người nghe", options: ["Close the door.", "Let's close the door.", "Let's not close the door."], answer: "Close the door.", completed: "Close the door." },
      { cue: "người nói và người nghe", options: ["Let's close the door.", "Close the door.", "You close the door."], answer: "Let's close the door.", completed: "Let's close the door." },
      { cue: "cả nhóm không làm", options: ["Let's not close the door.", "Let's not to close the door.", "Not close the door."], answer: "Let's not close the door.", completed: "Let's not close the door." },
      { cue: "cùng đi", options: ["Let's go.", "Let's not go.", "Let's to go."], answer: "Let's go.", completed: "Let's go." },
      { cue: "cùng không đi", options: ["Let's not go.", "Let's no go.", "Let's not to go."], answer: "Let's not go.", completed: "Let's not go." },
      { cue: "cùng vui vẻ", options: ["Let's have fun.", "Let's to have fun.", "Let's has fun."], answer: "Let's have fun.", completed: "Let's have fun." },
      { cue: "Let's eat outside.", options: ["Good idea.", "Yes, I do.", "Yes, it is."], answer: "Good idea.", completed: "Let's eat outside. — Good idea." },
      { cue: "Let's not be late.", options: ["Okay.", "No, we don't.", "Yes, we are."], answer: "Okay.", completed: "Let's not be late. — Okay." },
      { cue: "Let's watch TV.", options: ["Maybe later.", "No, I can't TV.", "Yes, I watch."], answer: "Maybe later.", completed: "Let's watch TV. — Maybe later." },
    ],
  }),
  "would-like": compactPracticeSet({
    prefix: "a1wl",
    focus: "would like + danh từ hoặc to-infinitive",
    choices: [
      ["Câu nào nói muốn một ít trà?", ["I'd like some tea.", "I like to some tea.", "I would some tea."], "I'd like some tea.", "Dùng `would like + danh từ`."],
      ["Câu nào nói muốn đi về nhà?", ["I'd like to go home.", "I'd like go home.", "I would like going home."], "I'd like to go home.", "Muốn làm việc gì: `would like + to + động từ`."],
      ["Câu hỏi lời mời nào đúng?", ["Would you like some coffee?", "Do you would like coffee?", "Would you likes coffee?"], "Would you like some coffee?", "Đưa `would` lên trước chủ ngữ; `like` giữ nguyên."],
      ["Câu nào mời người nghe đi cùng?", ["Would you like to come with us?", "Would you like come with us?", "Do you like to come now?"], "Would you like to come with us?", "Lời mời hành động dùng `to come`."],
      ["`She'd like a window seat` mở rộng `'d` thành gì?", ["would", "did", "had"], "would", "Trong cấu trúc này, `'d` là `would`."],
      ["Lời đáp nào tự nhiên khi nhận một lời mời làm gì?", ["Yes, I'd love to.", "Yes, I do like.", "Yes, I would coffee."], "Yes, I'd love to.", "`I'd love to` là lời nhận lời nhiệt tình."],
      ["Lời đáp nào lịch sự khi không muốn đồ uống?", ["No, thank you.", "No, I don't like.", "No, I wouldn't tea."], "No, thank you.", "`No, thank you` từ chối lời mời lịch sự."],
      ["Câu nào nói sở thích nói chung?", ["I like coffee.", "I'd like some coffee.", "I would coffee."], "I like coffee.", "Hiện tại đơn `like` nói sở thích; `would like` nói mong muốn cụ thể."],
      ["Câu nào nói mong muốn ở thời điểm này?", ["I'd like some coffee.", "I like coffee every day.", "Coffee likes me."], "I'd like some coffee.", "`Would like` thường nói điều muốn trong tình huống hiện tại."],
      ["Dạng phủ định nào đúng?", ["I wouldn't like to live there.", "I don't would like to live there.", "I wouldn't like live there."], "I wouldn't like to live there.", "Phủ định `wouldn't like`; hành động vẫn cần `to`."],
    ],
    orders: [
      ["Sắp xếp câu “Chúng tôi muốn hai vé.”", ["tickets", "like", "We’d", "two", "."], ["We’d", "like", "two", "tickets", "."], "`We'd` là `we would`; theo sau là `like + danh từ`."],
      ["Sắp xếp câu “Cô ấy muốn học tiếng Anh.”", ["English", "like", "She’d", "study", "to", "."], ["She’d", "like", "to", "study", "English", "."], "Hành động cần `to study`."],
      ["Sắp xếp câu hỏi “Bạn có muốn ngồi đây không?”", ["sit", "Would", "here", "to", "like", "you", "?"], ["Would", "you", "like", "to", "sit", "here", "?"], "Đưa `would` lên đầu và giữ `to sit`."],
      ["Sắp xếp câu “Tôi muốn một cốc nước.”", ["water", "like", "glass", "I’d", "a", "of", "."], ["I’d", "like", "a", "glass", "of", "water", "."], "Danh từ lượng đứng sau `would like`."],
    ],
    repairs: [
      ["Chọn từ cần có trước động từ `leave`.", ["They’d", "like", "leave", "now", "."], 2, ["to leave", "leave", "leaving"], "to leave", "Sau `would like`, hành động dùng `to-infinitive`."],
      ["Chọn dạng động từ đúng sau `would`.", ["Would", "she", "likes", "some", "tea", "?"], 2, ["like", "likes", "to liking"], "like", "`Would` đi với dạng cơ bản `like`."],
      ["Chọn dạng phủ định của `would`.", ["I", "don’t would", "like", "to", "work", "at", "night", "."], 1, ["wouldn't", "don't would", "doesn't would"], "wouldn't", "Dùng trực tiếp `wouldn't like`; không thêm `don't` trước `would`."],
    ],
    taps: [
      ["Trong `I'd like a sandwich and I'd like to sit down`, chọn hai dạng viết tắt của `would`.", ["I’d", "like", "a", "sandwich", "and", "I’d", "like", "to", "sit", "down", "."], [0, 5], "Cả hai `I'd` đều là `I would`."],
      ["Trong `Would you like to join us?`, chọn toàn bộ cụm động từ nói điều người nghe muốn làm.", ["Would", "you", "like", "to", "join", "us", "?"], [2, 3, 4], "`Like to join` mang nghĩa muốn tham gia."],
      ["Trong `I like tea, but I'd like coffee now`, chọn phần nói mong muốn cụ thể.", ["I", "like", "tea", ",", "but", "I’d", "like", "coffee", "now", "."], [5, 6, 7, 8], "`I'd like coffee now` nói mong muốn ở hiện tại."],
    ],
    matchPrompt: "Ghép mỗi cấu trúc với ý nghĩa phù hợp.",
    pairs: [{ left: "would like + noun", right: "muốn một thứ" }, { left: "would like + to + verb", right: "muốn làm một việc" }, { left: "like + noun", right: "thích nói chung" }, { left: "Would you like ...?", right: "lời mời/câu hỏi lịch sự" }],
    sortPrompt: "Phân loại phần sau `would like` thành danh từ hoặc hành động.",
    buckets: ["Danh từ", "to + động từ"],
    items: [{ text: "some soup", bucket: "Danh từ" }, { text: "a ticket", bucket: "Danh từ" }, { text: "two chairs", bucket: "Danh từ" }, { text: "to go", bucket: "to + động từ" }, { text: "to study", bucket: "to + động từ" }, { text: "to help", bucket: "to + động từ" }],
    gridPrompts: ["Chọn phần theo sau `would like` cho từng ý.", "Chọn câu hỏi lịch sự đúng.", "Chọn câu đáp tự nhiên cho từng lời mời."],
    gridRows: [
      { cue: "muốn một chiếc bánh", options: ["a cake", "to cake", "cake to"], answer: "a cake", completed: "I'd like a cake." },
      { cue: "muốn ăn một chiếc bánh", options: ["to eat a cake", "eat a cake", "eating a cake"], answer: "to eat a cake", completed: "I'd like to eat a cake." },
      { cue: "muốn nghỉ", options: ["to rest", "rest", "resting"], answer: "to rest", completed: "I'd like to rest." },
      { cue: "mời dùng trà", options: ["Would you like some tea?", "Do you would like tea?", "Would you likes tea?"], answer: "Would you like some tea?", completed: "Would you like some tea?" },
      { cue: "mời đi cùng", options: ["Would you like to come?", "Would you like come?", "Do you like coming now?"], answer: "Would you like to come?", completed: "Would you like to come?" },
      { cue: "hỏi cô ấy muốn gì", options: ["What would she like?", "What does she would like?", "What would she likes?"], answer: "What would she like?", completed: "What would she like?" },
      { cue: "Would you like some cake?", options: ["Yes, please.", "Yes, I do.", "Yes, I am."], answer: "Yes, please.", completed: "Would you like some cake? — Yes, please." },
      { cue: "Would you like to come?", options: ["Yes, I'd love to.", "Yes, I love.", "Yes, I come."], answer: "Yes, I'd love to.", completed: "Would you like to come? — Yes, I'd love to." },
      { cue: "Would you like more coffee?", options: ["No, thank you.", "No, I don't coffee.", "No, I am not."], answer: "No, thank you.", completed: "Would you like more coffee? — No, thank you." },
    ],
  }),
};

const a1Chapter08TopUps: Partial<Record<string, Exercise[]>> = {
  "ability-can": [
    ...binaryChoiceDrills("a1cax", 1, "can/can't chỉ khả năng", [
      ["khả năng bơi của tôi", "I can swim.", "I can to swim.", "Sau `can`, dùng động từ cơ bản không có `to`."],
      ["khả năng đọc của cô ấy", "She can read.", "She can reads.", "Sau `can`, không thêm `-s`."],
      ["không biết lái xe", "He can't drive.", "He doesn't can drive.", "Phủ định của `can` là `can't/cannot`."],
      ["dạng đầy đủ của `can't`", "cannot", "can", "Dạng đầy đủ thông dụng là một từ `cannot`."],
      ["hỏi khả năng nói tiếng Anh", "Can you speak English?", "Do you can speak English?", "Đưa `can` lên trước chủ ngữ; không dùng `do`."],
      ["trả lời khẳng định về khả năng", "Yes, I can.", "Yes, I do can.", "Câu trả lời ngắn giữ `can`."],
      ["trả lời phủ định về Lan", "No, she can't.", "No, she doesn't can.", "Thay Lan bằng `she` và dùng `can't`."],
      ["hỏi việc có thể làm", "What can you do?", "What do you can do?", "Từ hỏi đứng trước `can`."],
      ["hỏi người có thể giúp", "Who can help me?", "Who does can help me?", "`Who` là chủ ngữ và đứng trước `can`."],
    ]),
    {
      id: "a1cax10", kind: "match", prompt: "Ghép mỗi khả năng với câu diễn đạt đúng.",
      pairs: [{ left: "tôi biết bơi", right: "I can swim." }, { left: "cô ấy không biết lái xe", right: "She can't drive." }, { left: "họ có thể giúp", right: "They can help." }, { left: "con chim có thể bay", right: "The bird can fly." }],
      hint: "Mọi chủ ngữ đều dùng cùng dạng `can`.", explanation: "Sau `can/can't` luôn là động từ cơ bản.",
    },
    {
      id: "a1cax11", kind: "repair", prompt: "Chọn dạng động từ đúng sau `can`.",
      tokens: ["My", "brother", "can", "cooks", "well", "."], targetIndex: 3,
      replacements: ["cook", "cooks", "to cook"], answer: "cook",
      hint: "`Can` đã đứng trước động từ chính.", explanation: "Câu đúng là `My brother can cook well.`",
    },
  ],
  "instructions-and-can": [
    ...binaryChoiceDrills("a1imx", 1, "câu mệnh lệnh", [
      ["lời hướng dẫn mở sách", "Open your book.", "You opens your book.", "Mệnh lệnh bắt đầu bằng động từ cơ bản."],
      ["lời hướng dẫn ngồi xuống", "Sit down.", "To sit down.", "Không đặt `to` trước động từ mệnh lệnh."],
      ["lời yêu cầu lịch sự chờ", "Please wait.", "Please waits.", "Sau `please`, động từ vẫn ở dạng cơ bản."],
      ["lời yêu cầu lịch sự ở cuối", "Come in, please.", "Come please in.", "`Please` có thể đứng cuối sau dấu phẩy."],
      ["mệnh lệnh phủ định chạy", "Don't run.", "Doesn't run.", "Mệnh lệnh phủ định dùng `don't`."],
      ["mệnh lệnh phủ định với `be`", "Don't be late.", "Don't are late.", "Sau `don't`, dùng dạng cơ bản `be`."],
      ["cảnh báo cẩn thận", "Be careful!", "Are careful!", "Mệnh lệnh dùng `be` ở dạng cơ bản."],
      ["chỉ dẫn rẽ trái", "Turn left.", "Turns left.", "Động từ đầu câu không thêm `-s`."],
      ["hướng dẫn thêm nước", "Add water.", "Adding water.", "Mỗi bước hướng dẫn bắt đầu bằng động từ cơ bản."],
      ["cấm chạm vào vật", "Don't touch it.", "Not touch it.", "Dùng `don't + động từ cơ bản`."],
      ["một mệnh lệnh, không phải câu kể về thói quen", "Close the door.", "You close the door every day.", "Mệnh lệnh bắt đầu ngay bằng động từ cơ bản vì chủ ngữ `you` được hiểu ngầm; câu kể về thói quen thì nêu rõ chủ ngữ."],
      ["dấu câu cho cảnh báo mạnh", "Look out!", "Look out?", "Dấu chấm than phù hợp với cảnh báo mạnh."],
      ["mệnh lệnh nhiều bước đầu tiên", "Wash the rice.", "Washes the rice.", "Động từ hướng dẫn ở dạng cơ bản."],
      ["mệnh lệnh nhiều bước phủ định", "Don't open the lid.", "Doesn't open the lid.", "Câu mệnh lệnh phủ định không dùng `doesn't`."],
    ]),
    {
      id: "a1imx15", kind: "match", prompt: "Ghép mỗi mệnh lệnh với mục đích chính.",
      pairs: [{ left: "Turn right.", right: "chỉ đường" }, { left: "Add sugar.", right: "công thức" }, { left: "Please sit down.", right: "yêu cầu lịch sự" }, { left: "Don't move!", right: "cảnh báo/cấm" }],
      hint: "Nhìn hành động và tình huống thường dùng.", explanation: "Mệnh lệnh có thể hướng dẫn, yêu cầu hoặc cảnh báo.",
    },
    {
      id: "a1imx16", kind: "sort", prompt: "Phân loại mệnh lệnh khẳng định và phủ định.",
      buckets: ["Khẳng định", "Phủ định"],
      items: [{ text: "Wait here.", bucket: "Khẳng định" }, { text: "Be quiet.", bucket: "Khẳng định" }, { text: "Open the box.", bucket: "Khẳng định" }, { text: "Don't wait.", bucket: "Phủ định" }, { text: "Don't be noisy.", bucket: "Phủ định" }, { text: "Don't open it.", bucket: "Phủ định" }],
      hint: "Câu phủ định bắt đầu bằng `don't`.", explanation: "Khẳng định bắt đầu bằng động từ; phủ định bắt đầu bằng `don't`.",
    },
    {
      id: "a1imx17", kind: "repair", prompt: "Chọn dạng động từ đúng trong mệnh lệnh.",
      tokens: ["Please", "opens", "the", "window", "."], targetIndex: 1,
      replacements: ["open", "opens", "opening"], answer: "open",
      hint: "Sau `please`, dùng động từ cơ bản.", explanation: "Câu đúng là `Please open the window.`",
    },
  ],
};

const a1Chapter08DepthExtensions: Partial<Record<string, Exercise[]>> = {
  "instructions-and-can": [{
    id: "a1depth-imp-1", kind: "grid", prompt: "Chọn mệnh lệnh phù hợp với lời hướng dẫn, yêu cầu lịch sự và lời cấm.",
    hint: "Mệnh lệnh dùng động từ cơ bản; thêm `please` để mềm hơn và `don't` để phủ định.",
    explanation: "Ba câu lần lượt là hướng dẫn, yêu cầu lịch sự và mệnh lệnh phủ định.",
    rows: [
      { cue: "hướng dẫn bật đèn", options: ["Turn on the light.", "Turns on the light.", "To turn on the light."], answer: "Turn on the light.", completed: "Turn on the light." },
      { cue: "lịch sự yêu cầu nói chậm", options: ["Please speak slowly.", "Please speaks slowly.", "Speaking slowly."], answer: "Please speak slowly.", completed: "Please speak slowly." },
      { cue: "cấm dùng chiếc ghế này", options: ["Don't use this chair.", "Doesn't use this chair.", "Not use this chair."], answer: "Don't use this chair.", completed: "Don't use this chair." },
    ],
  }],
};

export const a1Chapter08ExerciseData = mergeExerciseRecords(
  a1Chapter08BaseExerciseData,
  a1Chapter08TopUps,
  a1Chapter08DepthExtensions,
);
