/* Luyện tập A1 — Chương 6: Hiện tại đơn. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { binaryChoiceDrills, compactPracticeSet } from "../../basic-builders.ts";

const a1Chapter06BaseExerciseData: Record<string, Exercise[]> = {
  "action-vs-be": [
    {
      "id": "av1",
      "kind": "sort",
      "prompt": "Xếp mỗi câu vào nhóm dùng `be` hoặc nhóm dùng động từ thường.",
      "hint": "Hỏi phần sau chủ ngữ là một đặc điểm, một nơi chốn hay một việc chủ ngữ làm.",
      "explanation": "Đặc điểm và nơi chốn cần `be`; việc chủ ngữ làm được diễn tả bằng động từ thường.",
      "buckets": [
        "Câu với be",
        "Câu với động từ thường"
      ],
      "items": [
        {
          "text": "They are happy.",
          "bucket": "Câu với be"
        },
        {
          "text": "They read.",
          "bucket": "Câu với động từ thường"
        },
        {
          "text": "We are at home.",
          "bucket": "Câu với be"
        },
        {
          "text": "We play.",
          "bucket": "Câu với động từ thường"
        }
      ]
    },
    {
      "id": "av2",
      "kind": "choice",
      "prompt": "Câu nào nghĩa là “Chúng tôi nấu ăn ở nhà”?",
      "hint": "Câu tiếng Việt có việc “nấu ăn”; việc ấy cần một động từ thường làm động từ chính.",
      "explanation": "`Cook` tự làm động từ chính nên không chèn `are`; `We are at home.` chỉ nói chúng tôi ở nhà và làm mất ý nấu ăn.",
      "options": [
        "We cook at home.",
        "We are cook at home.",
        "We are at home."
      ],
      "answer": "We cook at home."
    },
    {
      "id": "av3",
      "kind": "match",
      "prompt": "Ghép mỗi loại động từ chính với câu dùng loại đó.",
      "hint": "`Ready` là một đặc điểm; `play` là việc chủ ngữ làm.",
      "explanation": "Mỗi kiểu câu có đúng một động từ chính.",
      "pairs": [
        {
          "left": "be",
          "right": "We are ready."
        },
        {
          "left": "động từ thường",
          "right": "They play."
        }
      ]
    },
    {
      "id": "av4",
      "kind": "tap",
      "prompt": "Chạm vào động từ thường.",
      "hint": "Tìm từ nói chủ ngữ làm gì.",
      "explanation": "`Read` là động từ thường và tự làm động từ chính.",
      "tokens": [
        "They",
        "read",
        "."
      ],
      "answerIndexes": [
        1
      ],
      "selectionMode": "single"
    },
    {
      "id": "av5",
      "kind": "tap",
      "prompt": "Chạm vào câu dùng be để nối chủ ngữ với một đặc điểm.",
      "hint": "Tired là một đặc điểm, không phải một hành động.",
      "explanation": "The children are tired. dùng are để nối chủ ngữ với đặc điểm tired.",
      "tokens": [
        "The children play.",
        "The children are tired."
      ],
      "answerIndexes": [
        1
      ],
      "selectionMode": "single"
    },
    {
      "id": "av6",
      "kind": "choice",
      "prompt": "Câu nào dùng động từ thường làm động từ chính, không có `be`?",
      "hint": "Tìm câu nói chủ ngữ làm gì, không nói chủ ngữ thế nào hay ở đâu.",
      "explanation": "`Birds fly.` dùng `fly` làm động từ chính; hai câu còn lại dùng `are` để nói đặc điểm và nơi chốn.",
      "options": [
        "Birds fly.",
        "Birds are small.",
        "Birds are outside."
      ],
      "answer": "Birds fly."
    },
    {
      "id": "av7",
      "kind": "context",
      "prompt": "Chọn kiểu câu phù hợp.",
      "hint": "`Happy` là một đặc điểm, nên câu cần một dạng của `be`.",
      "explanation": "`Lan and Nam are happy.` dùng `are` để nối chủ ngữ hai người với đặc điểm `happy`.",
      "context": "Bạn muốn nói “Lan và Nam vui”, tức là nói một đặc điểm của hai người.",
      "options": [
        "Lan and Nam happy.",
        "Lan and Nam are happy.",
        "Lan and Nam play."
      ],
      "answer": "Lan and Nam are happy."
    },
    {
      "id": "av8",
      "kind": "choice",
      "prompt": "Câu nào dùng động từ thường?",
      "hint": "Câu nào không nói chủ ngữ thế nào hay ở đâu?",
      "explanation": "`We play.` dùng động từ thường `play`, nên không cần `be`.",
      "options": [
        "We are ready.",
        "We play.",
        "We are at home."
      ],
      "answer": "We play."
    },
    {
      "id": "av9",
      "kind": "grid",
      "prompt": "Chọn câu tiếng Anh đúng cho mỗi câu tiếng Việt.",
      "hint": "Với mỗi câu, hỏi phần sau chủ ngữ là đặc điểm, nơi chốn hay một việc chủ ngữ làm.",
      "explanation": "`Be` nối chủ ngữ với đặc điểm và nơi chốn; động từ thường tự làm động từ chính.",
      "rows": [
        {
          "cue": "Căn phòng yên tĩnh.",
          "options": [
            "The room quiet.",
            "The room is quiet.",
            "The room are quiet."
          ],
          "answer": "The room is quiet.",
          "completed": "The room is quiet."
        },
        {
          "cue": "Họ làm việc ở bệnh viện.",
          "options": [
            "They work at a hospital.",
            "They are work at a hospital.",
            "They are at a hospital."
          ],
          "answer": "They work at a hospital.",
          "completed": "They work at a hospital."
        },
        {
          "cue": "Nam ở trường.",
          "options": [
            "Nam at school.",
            "Nam is at school.",
            "Nam am at school."
          ],
          "answer": "Nam is at school.",
          "completed": "Nam is at school."
        }
      ]
    }
  ],
  "present-simple-base": [
    {
      "id": "psb1",
      "kind": "choice",
      "prompt": "We ___ every day.",
      "hint": "We thuộc nhóm giữ dạng cơ bản.",
      "explanation": "Sau We, dùng study.",
      "options": [
        "study",
        "studies",
        "are study"
      ],
      "answer": "study"
    },
    {
      "id": "psb2",
      "kind": "order",
      "prompt": "Tôi làm việc mỗi ngày.",
      "hint": "Chủ ngữ đứng đầu; thời gian thường ở cuối.",
      "explanation": "I + work + every day.",
      "tokens": [
        "every day",
        "work",
        "I",
        "."
      ],
      "answer": [
        "I",
        "work",
        "every day",
        "."
      ]
    },
    {
      "id": "psb3",
      "kind": "sort",
      "prompt": "Đặt những cụm đúng và sai vào hai nhóm.",
      "hint": "I/you/we/they không thêm -s.",
      "explanation": "Bốn chủ ngữ này đi với dạng động từ cơ bản.",
      "buckets": [
        "Đúng",
        "Chưa đúng"
      ],
      "items": [
        {
          "text": "They play",
          "bucket": "Đúng"
        },
        {
          "text": "We studies",
          "bucket": "Chưa đúng"
        },
        {
          "text": "I read",
          "bucket": "Đúng"
        },
        {
          "text": "You works",
          "bucket": "Chưa đúng"
        }
      ]
    },
    {
      "id": "psb4",
      "kind": "tap",
      "prompt": "Chạm vào động từ ở dạng cơ bản.",
      "hint": "Sau We, động từ chưa thêm đuôi.",
      "explanation": "study là dạng cơ bản.",
      "tokens": [
        "We",
        "study",
        "every day",
        "."
      ],
      "answerIndexes": [
        1
      ],
      "selectionMode": "single"
    },
    {
      "id": "psb5",
      "kind": "context",
      "prompt": "Chọn câu diễn tả thói quen.",
      "hint": "Tìm câu cho biết việc lặp lại.",
      "explanation": "every evening nghĩa là mỗi buổi tối và diễn tả thói quen.",
      "context": "Bạn muốn nói rằng tối nào mình cũng đọc sách.",
      "options": [
        "I read every evening.",
        "I read one book.",
        "I am at home."
      ],
      "answer": "I read every evening."
    },
    {
      "id": "psb6",
      "kind": "repair",
      "prompt": "Sửa động từ sau We.",
      "hint": "We giữ động từ ở dạng cơ bản.",
      "explanation": "We study every day. là câu đúng.",
      "tokens": [
        "We",
        "studies",
        "every day",
        "."
      ],
      "targetIndex": 1,
      "replacements": [
        "study",
        "studies",
        "are study"
      ],
      "answer": "study"
    },
    {
      "id": "psb7",
      "kind": "context",
      "prompt": "Chọn câu nói về thói quen.",
      "hint": "Sau I dùng dạng cơ bản read.",
      "explanation": "I read every day. diễn tả thói quen.",
      "context": "Bạn đọc sách mỗi ngày.",
      "options": [
        "I read every day.",
        "I reads every day.",
        "I am read every day."
      ],
      "answer": "I read every day."
    },
    {
      "id": "psb8",
      "kind": "choice",
      "prompt": "___ work here.",
      "hint": "`Work` đã là động từ thường làm động từ chính.",
      "explanation": "They work here. không cần are.",
      "options": [
        "They",
        "They are",
        "They is"
      ],
      "answer": "They"
    },
    {
      "id": "psb9",
      "kind": "grid",
      "prompt": "Chọn dạng động từ đúng cho mỗi câu.",
      "hint": "Chọn động từ cơ bản, không thêm -s và không chèn be.",
      "explanation": "I, we và they đã đi với đúng dạng động từ.",
      "rows": [
        {
          "cue": "I ___ every day.",
          "options": [
            "work",
            "works",
            "am work"
          ],
          "answer": "work",
          "completed": "I work every day."
        },
        {
          "cue": "We ___ English.",
          "options": [
            "study",
            "studies",
            "are study"
          ],
          "answer": "study",
          "completed": "We study English."
        },
        {
          "cue": "They ___ here.",
          "options": [
            "play",
            "plays",
            "are play"
          ],
          "answer": "play",
          "completed": "They play here."
        }
      ]
    },
    {
      "id": "psb10",
      "kind": "choice",
      "prompt": "Câu nào nói một điều được coi là đúng nói chung?",
      "hint": "Câu nói về mèo nói chung, không phải một lần cụ thể.",
      "explanation": "Cats need water. diễn tả sự thật chung.",
      "options": [
        "Cats need water.",
        "We read every evening.",
        "I am at home."
      ],
      "answer": "Cats need water."
    },
    {
      "id": "psb11",
      "kind": "choice",
      "prompt": "Câu nào nói nơi ở như một tình trạng lâu dài?",
      "hint": "live in Hanoi cho biết nơi ở ổn định.",
      "explanation": "Hiện tại đơn có thể diễn tả tình trạng tương đối ổn định.",
      "options": [
        "I live in Hanoi.",
        "I read every day.",
        "I am happy."
      ],
      "answer": "I live in Hanoi."
    },
    {
      "id": "psb12",
      "kind": "order",
      "prompt": "Chúng tôi đọc sách ở nhà mỗi ngày.",
      "hint": "Chủ ngữ + động từ + tân ngữ + nơi chốn + thời gian.",
      "explanation": "Cụm thời gian every day đứng tự nhiên ở cuối câu.",
      "tokens": [
        "at home",
        "every day",
        "We",
        "books",
        "read",
        "."
      ],
      "answer": [
        "We",
        "read",
        "books",
        "at home",
        "every day",
        "."
      ]
    }
  ],
  "third-person": [
    {
      "id": "t1",
      "kind": "match",
      "prompt": "Ghép mỗi động từ với dạng dùng sau `he`, `she` hoặc `it`.",
      "hint": "Xem chữ cuối của từng động từ.",
      "explanation": "Mỗi động từ đã được đổi sang dạng ngôi thứ ba số ít.",
      "pairs": [
        {
          "left": "read",
          "right": "reads"
        },
        {
          "left": "watch",
          "right": "watches"
        },
        {
          "left": "study",
          "right": "studies"
        },
        {
          "left": "play",
          "right": "plays"
        }
      ]
    },
    {
      "id": "t2",
      "kind": "choice",
      "prompt": "Lan ___ English every day.",
      "hint": "Lan có thể thay bằng she; study kết thúc bằng phụ âm + y.",
      "explanation": "study đổi y thành ies sau Lan.",
      "options": [
        "study",
        "studies",
        "has study"
      ],
      "answer": "studies"
    },
    {
      "id": "t3",
      "kind": "sort",
      "prompt": "Đặt cụm động từ vào nhóm phù hợp.",
      "hint": "Nhóm he/she/it dùng dạng đã đổi.",
      "explanation": "Chủ ngữ quyết định hình thức của động từ.",
      "buckets": [
        "I/you/we/they",
        "he/she/it"
      ],
      "items": [
        {
          "text": "read",
          "bucket": "I/you/we/they"
        },
        {
          "text": "reads",
          "bucket": "he/she/it"
        },
        {
          "text": "have",
          "bucket": "I/you/we/they"
        },
        {
          "text": "has",
          "bucket": "he/she/it"
        }
      ]
    },
    {
      "id": "t4",
      "kind": "tap",
      "prompt": "Chạm vào động từ đã đổi theo she.",
      "hint": "Sau she, study đổi y thành ies.",
      "explanation": "studies là dạng ngôi thứ ba số ít.",
      "tokens": [
        "She",
        "studies",
        "English",
        "."
      ],
      "answerIndexes": [
        1
      ],
      "selectionMode": "single"
    },
    {
      "id": "t5",
      "kind": "tap",
      "prompt": "Chạm vào tất cả dạng dùng với he/she/it.",
      "hint": "Nhóm này dùng verb-s và has.",
      "explanation": "reads và has đi với he/she/it.",
      "tokens": [
        "reads",
        "read",
        "has",
        "have"
      ],
      "answerIndexes": [
        0,
        2
      ],
      "selectionMode": "multiple"
    },
    {
      "id": "t6",
      "kind": "repair",
      "prompt": "Sửa động từ sau He.",
      "hint": "Phụ âm + y đổi thành -ies.",
      "explanation": "He studies English. là câu đúng.",
      "tokens": [
        "He",
        "study",
        "English",
        "."
      ],
      "targetIndex": 1,
      "replacements": [
        "study",
        "studies",
        "has study"
      ],
      "answer": "studies"
    },
    {
      "id": "t7",
      "kind": "context",
      "prompt": "Chọn dạng đúng.",
      "hint": "Lan có thể thay bằng she.",
      "explanation": "She/Lan đi với has.",
      "context": "Lan có một quyển sách.",
      "options": [
        "Lan have a book.",
        "Lan has a book.",
        "Lan has books."
      ],
      "answer": "Lan has a book."
    },
    {
      "id": "t8",
      "kind": "choice",
      "prompt": "Câu nào có nghĩa là “Con mèo ngủ trong hộp”?",
      "hint": "The cat là một con vật, có thể thay bằng it.",
      "explanation": "The cat sleeps in the box. dùng đúng động từ với chủ ngữ số ít.",
      "options": [
        "The cat sleep in the box.",
        "The cat sleeps in the box.",
        "The cats sleep in the box."
      ],
      "answer": "The cat sleeps in the box."
    },
    {
      "id": "t9",
      "kind": "grid",
      "prompt": "Chọn câu tiếng Anh đúng cho mỗi câu tiếng Việt.",
      "hint": "Tìm chủ ngữ số ít trong câu tiếng Việt, rồi nhìn chữ cuối của động từ để chọn cách thêm đuôi.",
      "explanation": "Ba kiểu đuôi ngôi thứ ba số ít đã được áp dụng đúng.",
      "rows": [
        {
          "cue": "Cô ấy làm việc mỗi ngày.",
          "options": [
            "She work every day.",
            "She works every day.",
            "They work every day."
          ],
          "answer": "She works every day.",
          "completed": "She works every day."
        },
        {
          "cue": "Anh ấy xem TV.",
          "options": [
            "He watch TV.",
            "He watches TV.",
            "They watch TV."
          ],
          "answer": "He watches TV.",
          "completed": "He watches TV."
        },
        {
          "cue": "Lan học tiếng Anh.",
          "options": [
            "Lan study English.",
            "Lan studies English.",
            "They study English."
          ],
          "answer": "Lan studies English.",
          "completed": "Lan studies English."
        }
      ]
    },
    {
      "id": "t10",
      "kind": "match",
      "prompt": "Ghép mỗi động từ với dạng ngôi thứ ba số ít của nó.",
      "hint": "Hai động từ tận cùng bằng `-o`; động từ còn lại có dạng riêng cần nhớ.",
      "explanation": "`Do` và `go` theo quy tắc tận cùng bằng `-o` thì thêm `-es`; `have` có dạng riêng `has`.",
      "pairs": [
        {
          "left": "do",
          "right": "does"
        },
        {
          "left": "go",
          "right": "goes"
        },
        {
          "left": "have",
          "right": "has"
        }
      ]
    },
    {
      "id": "t11",
      "kind": "choice",
      "prompt": "She ___ to school every day.",
      "hint": "Động từ tận cùng bằng -o thường thêm -es với she.",
      "explanation": "She goes to school every day. là câu đúng.",
      "options": [
        "go",
        "goes"
      ],
      "answer": "goes"
    },
    {
      "id": "t12",
      "kind": "sort",
      "prompt": "Phân loại động từ theo cách đổi dạng khi đi với he, she hoặc it.",
      "hint": "Nhìn chữ cuối của động từ gốc trước khi chọn.",
      "explanation": "Ba động từ đã được phân loại theo đúng quy tắc viết.",
      "buckets": [
        "Thêm -s",
        "Thêm -es",
        "Đổi y thành -ies"
      ],
      "items": [
        {
          "text": "read → reads",
          "bucket": "Thêm -s"
        },
        {
          "text": "watch → watches",
          "bucket": "Thêm -es"
        },
        {
          "text": "study → studies",
          "bucket": "Đổi y thành -ies"
        }
      ]
    },
    {
      "id": "t13",
      "kind": "grid",
      "prompt": "Với mỗi câu tiếng Việt, chọn câu tiếng Anh có động từ viết đúng.",
      "hint": "Nhìn chữ cuối của `wash`, `fix` và `carry` trước khi chọn đuôi.",
      "explanation": "Ba động từ mới đã được đổi dạng theo đúng quy tắc.",
      "rows": [
        {
          "cue": "Cô ấy rửa tay.",
          "options": [
            "She washes her hands.",
            "She wash her hands.",
            "She works with her hands."
          ],
          "answer": "She washes her hands.",
          "completed": "She washes her hands."
        },
        {
          "cue": "Anh ấy sửa chiếc ghế.",
          "options": [
            "He fixes the chair.",
            "He fix the chair.",
            "They fix the chair."
          ],
          "answer": "He fixes the chair.",
          "completed": "He fixes the chair."
        },
        {
          "cue": "Lan mang một chiếc túi.",
          "options": [
            "Lan carries a bag.",
            "Lan carry a bag.",
            "Lan has a bag."
          ],
          "answer": "Lan carries a bag.",
          "completed": "Lan carries a bag."
        }
      ]
    },
    {
      "id": "t14",
      "kind": "sort",
      "prompt": "Nhìn dạng gốc và dạng ngôi thứ ba rồi chọn đúng quy tắc.",
      "hint": "Nhìn chữ cuối của động từ gốc: nguyên âm + y chỉ thêm -s; -sh thêm -es; phụ âm + y đổi thành -ies.",
      "explanation": "Ba động từ đã được phân loại theo đúng quy tắc viết.",
      "buckets": [
        "Chỉ thêm -s",
        "Thêm -es",
        "Đổi y thành -ies"
      ],
      "items": [
        {
          "text": "play → plays",
          "bucket": "Chỉ thêm -s"
        },
        {
          "text": "wash → washes",
          "bucket": "Thêm -es"
        },
        {
          "text": "carry → carries",
          "bucket": "Đổi y thành -ies"
        }
      ]
    }
  ],
  "present-simple-negative": [
    {
      "id": "neg1",
      "kind": "choice",
      "prompt": "Cô ấy không thích cà phê.",
      "hint": "Sau doesn’t, động từ trở về dạng like.",
      "explanation": "doesn’t đã mang dấu hiệu ngôi thứ ba.",
      "options": [
        "She doesn’t likes coffee.",
        "She doesn’t like coffee.",
        "She not like coffee."
      ],
      "answer": "She doesn’t like coffee."
    },
    {
      "id": "neg2",
      "kind": "order",
      "prompt": "Họ không làm việc ở đây.",
      "hint": "Chủ ngữ đứng đầu, rồi đến phần phủ định và động từ chính.",
      "explanation": "Trật tự là chủ ngữ + don’t + động từ cơ bản.",
      "tokens": [
        "here",
        "work",
        "don’t",
        "They",
        "."
      ],
      "answer": [
        "They",
        "don’t",
        "work",
        "here",
        "."
      ]
    },
    {
      "id": "neg3",
      "kind": "match",
      "prompt": "Ghép mỗi nhóm chủ ngữ với dạng phủ định đi cùng.",
      "hint": "Lan có thể thay bằng she.",
      "explanation": "I/you/we/they dùng don’t; he/she/it và một tên riêng số ít dùng doesn’t.",
      "pairs": [
        {
          "left": "I · you · we · they",
          "right": "don’t + động từ cơ bản"
        },
        {
          "left": "he · she · it · Lan",
          "right": "doesn’t + động từ cơ bản"
        }
      ]
    },
    {
      "id": "neg4",
      "kind": "tap",
      "prompt": "Chạm vào trợ động từ phủ định.",
      "hint": "Từ nào mang cả does và not?",
      "explanation": "doesn’t là trợ động từ phủ định.",
      "tokens": [
        "My",
        "sister",
        "doesn’t",
        "work",
        "on",
        "Sundays",
        "."
      ],
      "answerIndexes": [
        2
      ],
      "selectionMode": "single"
    },
    {
      "id": "neg5",
      "kind": "tap",
      "prompt": "Chạm vào động từ chính ở dạng cơ bản.",
      "hint": "Động từ chính đứng ngay sau trợ động từ phủ định.",
      "explanation": "`Read` là động từ chính, ở dạng cơ bản sau `doesn’t`.",
      "tokens": [
        "He",
        "doesn’t",
        "read",
        "books",
        "."
      ],
      "answerIndexes": [
        2
      ],
      "selectionMode": "single"
    },
    {
      "id": "neg6",
      "kind": "repair",
      "prompt": "Sửa phần phủ định sau `My brother`.",
      "hint": "`My brother` chỉ một người; dấu hiệu ngôi thứ ba chỉ cần xuất hiện một lần.",
      "explanation": "`My brother doesn’t drink coffee.` là câu đúng: `doesn’t` hợp với một người và đã mang dấu hiệu ngôi thứ ba, nên `drink` giữ dạng cơ bản.",
      "tokens": [
        "My",
        "brother",
        "doesn’t drinks",
        "coffee",
        "."
      ],
      "targetIndex": 2,
      "replacements": [
        "doesn’t drink",
        "doesn’t drinks",
        "don’t drink"
      ],
      "answer": "doesn’t drink"
    },
    {
      "id": "neg7",
      "kind": "context",
      "prompt": "Chọn câu phủ định.",
      "hint": "Xác định `they` thuộc nhóm chủ ngữ nào trước khi chọn dạng phủ định.",
      "explanation": "`They` đi với `don’t`, rồi đến động từ cơ bản `watch`.",
      "context": "Họ không xem TV.",
      "options": [
        "They doesn’t watch TV.",
        "They don’t watch TV.",
        "They not watch TV."
      ],
      "answer": "They don’t watch TV."
    },
    {
      "id": "neg8",
      "kind": "choice",
      "prompt": "Chủ ngữ nào đi với doesn’t?",
      "hint": "Lan có thể thay bằng she.",
      "explanation": "he và Lan đều thuộc ngôi thứ ba số ít.",
      "options": [
        "I · we",
        "he · Lan",
        "you · they"
      ],
      "answer": "he · Lan"
    },
    {
      "id": "neg9",
      "kind": "grid",
      "prompt": "Chọn dạng phủ định đúng cho mỗi câu.",
      "hint": "I/they dùng don’t; she dùng doesn’t; động từ sau đó không có -s.",
      "explanation": "Trợ động từ và động từ chính đã chia đúng ở cả ba dòng.",
      "rows": [
        {
          "cue": "I ___ coffee.",
          "options": [
            "don’t like",
            "doesn’t like",
            "don’t likes"
          ],
          "answer": "don’t like",
          "completed": "I don’t like coffee."
        },
        {
          "cue": "She ___ fish.",
          "options": [
            "don’t eat",
            "doesn’t eat",
            "doesn’t eats"
          ],
          "answer": "doesn’t eat",
          "completed": "She doesn’t eat fish."
        },
        {
          "cue": "They ___ tea.",
          "options": [
            "doesn’t want",
            "don’t wants",
            "don’t want"
          ],
          "answer": "don’t want",
          "completed": "They don’t want tea."
        }
      ]
    },
    {
      "id": "neg10",
      "kind": "choice",
      "prompt": "Cô ấy không mệt.",
      "hint": "tired là đặc điểm đứng sau be.",
      "explanation": "Phủ định với be dùng is not/isn’t.",
      "options": [
        "She isn’t tired.",
        "She doesn’t tired.",
        "She doesn’t be tired."
      ],
      "answer": "She isn’t tired."
    },
    {
      "id": "neg11",
      "kind": "choice",
      "prompt": "Cô ấy không lái xe.",
      "hint": "`Drive` là động từ thường, nên phủ định cần trợ động từ; động từ sau đó giữ dạng cơ bản.",
      "explanation": "Với động từ thường `drive`, phủ định hiện tại đơn dùng `doesn’t + drive`, không dùng `isn’t`.",
      "options": [
        "She doesn’t drive.",
        "She isn’t drive.",
        "She doesn’t drives."
      ],
      "answer": "She doesn’t drive."
    },
    {
      "id": "neg12",
      "kind": "grid",
      "prompt": "Chọn câu phủ định đúng cho mỗi câu tiếng Việt.",
      "hint": "`Be` nhận `not` trực tiếp; động từ thường cần `don’t/doesn’t`.",
      "explanation": "Câu có `be` thêm `not` sau `be`; câu có động từ thường dùng `don’t/doesn’t` và động từ cơ bản.",
      "rows": [
        {
          "cue": "Họ không ở nhà.",
          "options": [
            "They aren’t at home.",
            "They don’t at home.",
            "They not are at home."
          ],
          "answer": "They aren’t at home.",
          "completed": "They aren’t at home."
        },
        {
          "cue": "Họ không đọc.",
          "options": [
            "They don’t read.",
            "They aren’t read.",
            "They don’t reads."
          ],
          "answer": "They don’t read.",
          "completed": "They don’t read."
        },
        {
          "cue": "Lan không thích trà.",
          "options": [
            "Lan doesn’t like tea.",
            "Lan isn’t like tea.",
            "Lan doesn’t likes tea."
          ],
          "answer": "Lan doesn’t like tea.",
          "completed": "Lan doesn’t like tea."
        }
      ]
    },
    {
      "id": "neg13",
      "kind": "match",
      "prompt": "Nhận ra hai cách viết có cùng nghĩa.",
      "hint": "Dấu nháy cho biết một số chữ đã được lược.",
      "explanation": "Bốn cặp giữ nguyên nghĩa phủ định.",
      "pairs": [
        {
          "left": "do not",
          "right": "don’t"
        },
        {
          "left": "does not",
          "right": "doesn’t"
        },
        {
          "left": "is not",
          "right": "isn’t"
        },
        {
          "left": "are not",
          "right": "aren’t"
        }
      ]
    },
    {
      "id": "neg14",
      "kind": "choice",
      "prompt": "Câu phủ định của “She has a cat.” là câu nào?",
      "hint": "Sau doesn’t, động từ chính trở về dạng cơ bản have.",
      "explanation": "She doesn’t have a cat. là câu phủ định đúng.",
      "options": [
        "She doesn’t have a cat.",
        "She doesn’t has a cat.",
        "She isn’t have a cat."
      ],
      "answer": "She doesn’t have a cat."
    }
  ],
  "present-simple-questions": [
    {
      "id": "q1",
      "kind": "order",
      "prompt": "Lan có thích trà không?",
      "hint": "Lan dùng Does; sau đó là Lan + like.",
      "explanation": "Does lên đầu và like giữ dạng cơ bản.",
      "tokens": [
        "tea",
        "Lan",
        "like",
        "Does",
        "?"
      ],
      "answer": [
        "Does",
        "Lan",
        "like",
        "tea",
        "?"
      ]
    },
    {
      "id": "q2",
      "kind": "choice",
      "prompt": "___ they live here?",
      "hint": "They thuộc nhóm I/you/we/they.",
      "explanation": "Câu hỏi với `they` dùng `do`, sau đó là động từ cơ bản `live`.",
      "options": [
        "do",
        "does",
        "are"
      ],
      "answer": "do"
    },
    {
      "id": "q3",
      "kind": "match",
      "prompt": "Chọn câu trả lời phù hợp về nghĩa.",
      "hint": "Mỗi câu hỏi dùng câu trả lời ngắn có cùng trợ động từ.",
      "explanation": "Câu hỏi với `do` trả lời bằng `do`; câu hỏi với `does` trả lời bằng `does`.",
      "pairs": [
        {
          "left": "Do you like tea?",
          "right": "Yes, I do."
        },
        {
          "left": "Does Lan live in Hue?",
          "right": "Yes, she does."
        },
        {
          "left": "Does he work here?",
          "right": "No, he doesn’t."
        }
      ]
    },
    {
      "id": "q4",
      "kind": "tap",
      "prompt": "Chạm vào trợ động từ ở đầu câu hỏi.",
      "hint": "Từ đứng đầu câu hỏi này không mang nghĩa riêng; nó chỉ giúp tạo câu hỏi.",
      "explanation": "`Does` là trợ động từ đứng đầu câu hỏi hiện tại đơn.",
      "tokens": [
        "Does",
        "your",
        "brother",
        "play",
        "chess",
        "?"
      ],
      "answerIndexes": [
        0
      ],
      "selectionMode": "single"
    },
    {
      "id": "q5",
      "kind": "choice",
      "prompt": "Does he ___ tea?",
      "hint": "Does đã mang dấu hiệu ngôi thứ ba.",
      "explanation": "Sau Does, động từ chính trở về dạng cơ bản like.",
      "options": [
        "like",
        "likes",
        "is like"
      ],
      "answer": "like"
    },
    {
      "id": "q6",
      "kind": "repair",
      "prompt": "Sửa động từ chính sau `does`.",
      "hint": "Does đã mang dấu ngôi thứ ba.",
      "explanation": "`Does the shop open at nine?` là câu đúng: `does` đã mang dấu hiệu ngôi thứ ba, nên `open` giữ dạng cơ bản.",
      "tokens": [
        "Does",
        "the",
        "shop",
        "opens",
        "at",
        "nine",
        "?"
      ],
      "targetIndex": 3,
      "replacements": [
        "open",
        "opens",
        "is open"
      ],
      "answer": "open"
    },
    {
      "id": "q7",
      "kind": "context",
      "prompt": "Chọn câu hỏi đúng với tình huống.",
      "hint": "`They` dùng `do`; sau `do` là động từ cơ bản.",
      "explanation": "`Do they live here?` là câu hỏi có/không ở hiện tại đơn.",
      "context": "Bạn muốn hỏi họ có sống ở đây không.",
      "options": [
        "Do they live here?",
        "Does they live here?",
        "Do they lives here?"
      ],
      "answer": "Do they live here?"
    },
    {
      "id": "q8",
      "kind": "choice",
      "prompt": "Anh ấy có làm việc ở đây không?",
      "hint": "He dùng Does; work giữ dạng cơ bản.",
      "explanation": "Does he work here? là câu đúng.",
      "options": [
        "Do he work here?",
        "Does he work here?",
        "Does he works here?"
      ],
      "answer": "Does he work here?"
    },
    {
      "id": "q9",
      "kind": "grid",
      "prompt": "Chọn Do/Does rồi giữ động từ chính ở dạng cơ bản.",
      "hint": "Xác định mỗi chủ ngữ thuộc nhóm `I/you/we/they` hay nhóm `he/she/it`.",
      "explanation": "Do/Does đã đứng trước chủ ngữ và động từ vẫn ở dạng cơ bản.",
      "rows": [
        {
          "cue": "___ you like tea?",
          "options": [
            "Do",
            "Does",
            "Are"
          ],
          "answer": "Do",
          "completed": "Do you like tea?"
        },
        {
          "cue": "___ Lan work here?",
          "options": [
            "Do",
            "Does",
            "Is"
          ],
          "answer": "Does",
          "completed": "Does Lan work here?"
        },
        {
          "cue": "___ they live here?",
          "options": [
            "Do",
            "Does",
            "Are"
          ],
          "answer": "Do",
          "completed": "Do they live here?"
        }
      ]
    },
    {
      "id": "q10",
      "kind": "grid",
      "prompt": "Chọn câu hỏi có/không đúng cho từng chủ ngữ.",
      "hint": "Chọn `do/does`, rồi giữ động từ chính ở dạng cơ bản.",
      "explanation": "Ba câu đều theo mẫu `Do/Does + chủ ngữ + động từ cơ bản?`.",
      "rows": [
        {
          "cue": "Mai có đọc sách không?",
          "options": [
            "Does Mai read books?",
            "Do Mai reads books?",
            "Does Mai reads books?"
          ],
          "answer": "Does Mai read books?",
          "completed": "Does Mai read books?"
        },
        {
          "cue": "Họ có làm việc hôm nay không?",
          "options": [
            "Do they work today?",
            "Does they work today?",
            "Do they works today?"
          ],
          "answer": "Do they work today?",
          "completed": "Do they work today?"
        },
        {
          "cue": "Anh ấy có chạy mỗi sáng không?",
          "options": [
            "Does he run every morning?",
            "Do he runs every morning?",
            "Does he runs every morning?"
          ],
          "answer": "Does he run every morning?",
          "completed": "Does he run every morning?"
        }
      ]
    },
    {
      "id": "q11",
      "kind": "grid",
      "prompt": "Chọn câu trả lời ngắn đúng cho từng câu hỏi, với đại từ thay cho chủ ngữ.",
      "hint": "Chọn đại từ trước, rồi chọn do/does tương ứng.",
      "explanation": "Ba câu trả lời ngắn đã dùng đúng đại từ và trợ động từ.",
      "rows": [
        {
          "cue": "Does Mai read? — Có.",
          "options": [
            "Yes, she does.",
            "Yes, Mai reads.",
            "Yes, she do."
          ],
          "answer": "Yes, she does.",
          "completed": "Yes, she does."
        },
        {
          "cue": "Do the cats sleep? — Có.",
          "options": [
            "Yes, they do.",
            "Yes, the cats does.",
            "Yes, they are."
          ],
          "answer": "Yes, they do.",
          "completed": "Yes, they do."
        },
        {
          "cue": "Do I work here? — Không.",
          "options": [
            "No, you don’t.",
            "No, I doesn’t.",
            "No, you aren’t."
          ],
          "answer": "No, you don’t.",
          "completed": "No, you don’t."
        }
      ]
    }
  ],
  "present-simple-wh": compactPracticeSet({
    prefix: "a1pw",
    focus: "câu hỏi Wh- với hiện tại đơn",
    choices: [
      ["Từ hỏi nào dùng cho nơi chốn?", ["where", "when", "why"], "where", "`Where` hỏi “ở đâu”, tức là hỏi nơi một người hay vật ở, hoặc nơi một việc xảy ra."],
      ["Câu nào hỏi “Lan làm việc ở đâu?”", ["Where does Lan work?", "Where do Lan works?", "Where is Lan work?"], "Where does Lan work?", "Lan là số ít nên dùng `does`; sau đó là `work`."],
      ["Câu nào hỏi thời gian?", ["When do they study?", "Where do they study?", "Why do they study?"], "When do they study?", "`When` hỏi “khi nào”."],
      ["Câu nào hỏi lý do?", ["Why does he walk?", "How does he walk?", "Who does he walk?"], "Why does he walk?", "`Why` hỏi “tại sao”."],
      ["Câu nào hỏi cách đi làm?", ["How do you go to work?", "What do you go to work?", "When are you go to work?"], "How do you go to work?", "`How` hỏi cách thức; động từ thường dùng `do`."],
      ["Câu nào hỏi “Cô ấy ăn gì vào bữa sáng?”", ["What does she have for breakfast?", "What does she has for breakfast?", "What do she have for breakfast?"], "What does she have for breakfast?", "Chủ ngữ `she` chỉ một người, nên trợ động từ phải hợp với ngôi thứ ba số ít; sau trợ động từ ấy, động từ chính trở về dạng cơ bản."],
      ["Câu nào hỏi “Bạn thăm ai?”", ["Who do you visit?", "Who visits you?", "Whose do you visit?"], "Who do you visit?", "`You` là chủ ngữ; `who` hỏi tân ngữ nên dùng `do`."],
      ["Câu nào hỏi “Ai sống ở đây?”", ["Who lives here?", "Who live here?", "Who do lives here?"], "Who lives here?", "`Who` là chủ ngữ nên không dùng `do/does` trong mẫu cơ bản."],
      ["Từ hỏi nào dùng để hỏi về người?", ["who", "where", "when"], "who", "`Who` dùng để hỏi “ai”, tức là hỏi về một hay nhiều người."],
      ["Câu trả lời nào phù hợp với `Why does she study English?`?", ["Because she needs it.", "At school.", "Every day."], "Because she needs it.", "Câu hỏi `why` cần một lý do."],
    ],
    orders: [
      ["Sắp xếp câu “Bạn thức dậy lúc mấy giờ?”", ["you", "get", "What", "do", "up", "time", "?"], ["What", "time", "do", "you", "get", "up", "?"], "Cụm `what time` đứng trước `do`."],
      ["Sắp xếp câu hỏi “Tại sao cô ấy học tiếng Anh?”", ["English", "does", "Why", "she", "study", "?"], ["Why", "does", "she", "study", "English", "?"], "`Why` đứng đầu; sau `does` là động từ cơ bản `study`."],
      ["Sắp xếp câu hỏi “Họ đi lại bằng cách nào?”", ["travel", "do", "they", "How", "?"], ["How", "do", "they", "travel", "?"], "`How` hỏi cách thức; `they` dùng `do`."],
      ["Sắp xếp câu “Ai giúp bạn mỗi ngày?”", ["every", "Who", "you", "helps", "day", "?"], ["Who", "helps", "you", "every", "day", "?"], "`Who` là chủ ngữ nên dùng `helps` và không có `does`."],
    ],
    repairs: [
      ["Chọn trợ động từ phù hợp với `your brother`.", ["Where", "do", "your", "brother", "live", "?"], 1, ["do", "does", "is"], "does", "`Your brother` là chủ ngữ số ít."],
      ["Chọn dạng động từ đúng sau `does`.", ["What", "does", "Lan", "reads", "?"], 3, ["read", "reads", "is read"], "read", "Sau `does`, dùng động từ cơ bản; không thêm `-s` và không chèn `is`."],
      ["Chọn từ hỏi phù hợp với câu trả lời `By bus`.", ["Where", "do", "you", "go", "to", "school", "?"], 0, ["Where", "How", "When"], "How", "`By bus` trả lời câu hỏi về cách thức."],
    ],
    taps: [
      ["Chọn toàn bộ chủ ngữ trong câu `Where does your sister work?`", ["Where", "does", "your", "sister", "work", "?"], [2, 3], "`Your sister` là chủ ngữ số ít."],
      ["Chọn từ hỏi đồng thời làm chủ ngữ trong câu `Who calls you every evening?`", ["Who", "calls", "you", "every", "evening", "?"], [0], "`Who` chính là người thực hiện hành động `calls`."],
      ["Chọn từ hỏi trong câu `What do they have?`", ["What", "do", "they", "have", "?"], [0], "`What` hỏi về sự vật hoặc thông tin."],
    ],
    matchPrompt: "Ghép mỗi từ hỏi với loại thông tin cần trả lời.",
    pairs: [{ left: "where", right: "nơi chốn" }, { left: "when", right: "thời gian" }, { left: "why", right: "lý do" }, { left: "how", right: "cách thức" }],
    sortPrompt: "Phân loại câu theo việc `who` hỏi chủ ngữ hay tân ngữ.",
    buckets: ["Who là chủ ngữ", "Who là tân ngữ"],
    items: [{ text: "Who works here?", bucket: "Who là chủ ngữ" }, { text: "Who knows the answer?", bucket: "Who là chủ ngữ" }, { text: "Who helps Lan?", bucket: "Who là chủ ngữ" }, { text: "Who do you know?", bucket: "Who là tân ngữ" }, { text: "Who does Lan help?", bucket: "Who là tân ngữ" }, { text: "Who do they visit?", bucket: "Who là tân ngữ" }],
    gridPrompts: ["Chọn từ hỏi phù hợp với từng câu trả lời.", "Chọn `do` hoặc `does` theo chủ ngữ.", "Chọn câu hỏi đúng cho mỗi câu tiếng Việt."],
    gridRows: [
      { cue: "___ do you live? — In Hue.", options: ["Where", "When", "Why"], answer: "Where", completed: "Where do you live? — In Hue." },
      { cue: "___ do you start work? — At seven.", options: ["What time", "Where", "Who"], answer: "What time", completed: "What time do you start work? — At seven." },
      { cue: "___ do you rest? — Because I'm tired.", options: ["Why", "How", "When"], answer: "Why", completed: "Why do you rest? — Because I'm tired." },
      { cue: "Where ___ they work?", options: ["do", "does", "are"], answer: "do", completed: "Where do they work?" },
      { cue: "What ___ she need?", options: ["does", "do", "is"], answer: "does", completed: "What does she need?" },
      { cue: "When ___ your parents travel?", options: ["do", "does", "are"], answer: "do", completed: "When do your parents travel?" },
      { cue: "Anh ấy sống ở đâu?", options: ["Where does he live?", "Where does he lives?", "Where he lives?"], answer: "Where does he live?", completed: "Where does he live?" },
      { cue: "Họ muốn gì?", options: ["What do they want?", "What do they wants?", "What they want?"], answer: "What do they want?", completed: "What do they want?" },
      { cue: "Ai dạy tiếng Anh ở đây?", options: ["Who teaches English here?", "Who teach English here?", "Who do teach English here?"], answer: "Who teaches English here?", completed: "Who teaches English here?" },
    ],
  }),
  "have-have-got": compactPracticeSet({
    prefix: "a1hg",
    focus: "have/has và have got/has got",
    choices: [
      ["Câu nào đúng với chủ ngữ `she`?", ["She has a bike.", "She have a bike.", "They have a bike."], "She has a bike.", "`She` dùng `has` trong câu khẳng định hiện tại đơn."],
      ["Câu phủ định hiện tại đơn nào đúng?", ["She doesn't have a bike.", "She doesn't has a bike.", "She hasn't have a bike."], "She doesn't have a bike.", "Sau `doesn't`, động từ chính trở về dạng cơ bản, kể cả khi chủ ngữ là `she`."],
      ["Câu hỏi hiện tại đơn nào đúng?", ["Does Nam have a sister?", "Does Nam has a sister?", "Do Nam have a sister?"], "Does Nam have a sister?", "Chủ ngữ `Nam` chỉ một người, nên trợ động từ phải hợp với ngôi thứ ba số ít; sau trợ động từ ấy, động từ chính trở về dạng cơ bản."],
      ["Dạng nào tương đương với `I have a car` khi nói sở hữu?", ["I've got a car.", "I'm got a car.", "I got have a car."], "I've got a car.", "`I've` là `I have` trong `have got`."],
      ["Câu hỏi với `have got` nào đúng?", ["Has she got a passport?", "Does she has got a passport?", "Has she get a passport?"], "Has she got a passport?", "Đưa `has` lên trước chủ ngữ; giữ `got`."],
      ["Phủ định với `have got` nào đúng?", ["They haven't got any money.", "They don't have got any money.", "They hasn't got any money."], "They haven't got any money.", "Đặt `not` trong `haven't`; không dùng thêm `do`."],
      ["`She's got blue eyes` mở rộng thành gì?", ["She has got blue eyes.", "She is got blue eyes.", "She does got blue eyes."], "She has got blue eyes.", "`'s` đứng trước `got` là dạng viết tắt của trợ động từ trong hệ thống `have got`, không phải của `be`."],
      ["Cách nào hỏi về hoạt động ăn sáng?", ["Do you have breakfast at seven?", "Have you got breakfast at seven?", "Are you have breakfast at seven?"], "Do you have breakfast at seven?", "`Have breakfast` là hoạt động, thường dùng hệ thống `do`."],
      ["Câu trả lời ngắn nào hợp với `Have you got a pen?`?", ["Yes, I have.", "Yes, I got.", "Yes, I am."], "Yes, I have.", "Câu trả lời ngắn dùng lại đúng trợ động từ đứng đầu câu hỏi và không lặp lại `got`."],
      ["Câu trả lời ngắn nào hợp với `Does she have a car?`?", ["No, she doesn't.", "No, she hasn't.", "No, she don't."], "No, she doesn't.", "Câu hỏi dùng `does` thì trả lời ngắn bằng `doesn't`."],
    ],
    orders: [
      ["Sắp xếp câu “Ngôi nhà có ba phòng.”", ["rooms", "house", "three", "The", "has", "."], ["The", "house", "has", "three", "rooms", "."], "Chủ ngữ số ít `the house` dùng `has`."],
      ["Sắp xếp câu hỏi “Họ có con không?” bằng `have got`.", ["children", "they", "Have", "got", "?"], ["Have", "they", "got", "children", "?"], "Đưa `have` lên trước `they`."],
      ["Sắp xếp câu “Anh ấy không có ô tô.” bằng `have got`.", ["car", "He", "a", "hasn’t", "got", "."], ["He", "hasn’t", "got", "a", "car", "."], "`He` dùng `hasn't got`."],
      ["Sắp xếp câu hỏi “Bạn có ăn trưa ở nhà không?”", ["you", "home", "Do", "at", "have", "lunch", "?"], ["Do", "you", "have", "lunch", "at", "home", "?"], "Hoạt động `have lunch` dùng `do`."],
    ],
    repairs: [
      ["Chọn dạng phủ định đúng cho câu “Mai không có điện thoại”.", ["Mai", "doesn’t has", "a", "phone", "."], 1, ["doesn’t have", "doesn’t has", "hasn’t have"], "doesn’t have", "Sau `doesn't`, động từ trở về dạng cơ bản; còn `hasn't` chỉ đi với `got`, không đi với một động từ khác."],
      ["Chọn trợ động từ đúng cho hệ thống `have got`.", ["Does", "Lan", "got", "a", "bike", "?"], 0, ["Does", "Has", "Is"], "Has", "Câu hỏi với `have got` đưa dạng của `have` hợp với chủ ngữ lên trước chủ ngữ; `Lan` chỉ một người."],
      ["Chọn phần đúng để câu có nghĩa “Chúng tôi có hai vé”.", ["We’re", "got", "two", "tickets", "."], 0, ["We’re", "We’ve", "We has"], "We’ve", "`We've` là `we have`."],
    ],
    taps: [
      ["Trong `She has a car but she doesn't have a bike`, chọn tất cả dạng của động từ `have`.", ["She", "has", "a", "car", "but", "she", "doesn’t", "have", "a", "bike", "."], [1, 7], "Động từ chỉ sở hữu xuất hiện hai lần: một lần đã chia theo chủ ngữ số ít trong vế khẳng định, một lần ở dạng cơ bản sau trợ động từ phủ định."],
      ["Chọn phần được đưa lên đầu để hỏi trong câu `Has he got a sister?`", ["Has", "he", "got", "a", "sister", "?"], [0], "Trong hệ thống `have got`, đưa `has` lên đầu."],
      ["Trong `I've got a headache`, chọn dạng viết tắt của `have`.", ["I’ve", "got", "a", "headache", "."], [0], "`I've` là `I have`."],
    ],
    matchPrompt: "Ghép mỗi câu hỏi với câu trả lời ngắn cùng hệ thống.",
    pairs: [{ left: "Do you have a bike?", right: "Yes, I do." }, { left: "Does she have a bike?", right: "No, she doesn't." }, { left: "Have you got a bike?", right: "Yes, I have." }, { left: "Has she got a bike?", right: "No, she hasn't." }],
    sortPrompt: "Phân loại câu theo hệ thống `do/does + have` hoặc `have/has got`.",
    buckets: ["do/does + have", "have/has got"],
    items: [{ text: "Does he have a car?", bucket: "do/does + have" }, { text: "They don't have time.", bucket: "do/does + have" }, { text: "Do you have lunch here?", bucket: "do/does + have" }, { text: "Has he got a car?", bucket: "have/has got" }, { text: "They haven't got time.", bucket: "have/has got" }, { text: "I've got two brothers.", bucket: "have/has got" }],
    gridPrompts: ["Chọn `have` hoặc `has` trong câu khẳng định.", "Chọn dạng phủ định đúng theo từng hệ thống.", "Chọn câu hỏi đúng cho từng ý."],
    gridRows: [
      { cue: "I ___ a question.", options: ["have", "has", "am have"], answer: "have", completed: "I have a question." },
      { cue: "My friend ___ a new job.", options: ["has", "have", "is have"], answer: "has", completed: "My friend has a new job." },
      { cue: "The rooms ___ large windows.", options: ["have", "has", "are have"], answer: "have", completed: "The rooms have large windows." },
      { cue: "She ___ a car. (hệ thống `do/does + have`)", options: ["doesn't have", "doesn't has", "hasn't have"], answer: "doesn't have", completed: "She doesn't have a car." },
      { cue: "She ___ a car. (hệ thống `have got`)", options: ["hasn't got", "doesn't have got", "haven't got"], answer: "hasn't got", completed: "She hasn't got a car." },
      { cue: "We ___ any money. (hệ thống `have got`)", options: ["haven't got", "hasn't got", "don't have got"], answer: "haven't got", completed: "We haven't got any money." },
      { cue: "Bạn có hộ chiếu không? (hệ thống `do/does + have`)", options: ["Do you have a passport?", "Does you have a passport?", "Do you has a passport?"], answer: "Do you have a passport?", completed: "Do you have a passport?" },
      { cue: "Bạn có hộ chiếu không? (hệ thống `have got`)", options: ["Have you got a passport?", "Do you have got a passport?", "Have you get a passport?"], answer: "Have you got a passport?", completed: "Have you got a passport?" },
      { cue: "Cô ấy có hai con không?", options: ["Does she have two children?", "Does she has two children?", "Do she have two children?"], answer: "Does she have two children?", completed: "Does she have two children?" },
    ],
  }),
  "frequency": [
    {
      "id": "f1",
      "kind": "match",
      "prompt": "Ghép mỗi trạng từ với mức độ của nó.",
      "hint": "always cao nhất; never thấp nhất.",
      "explanation": "Mỗi từ biểu thị một mức độ thường xuyên khác nhau.",
      "pairs": [
        {
          "left": "always",
          "right": "mức cao nhất · luôn luôn"
        },
        {
          "left": "often",
          "right": "khá nhiều lần · hay"
        },
        {
          "left": "sometimes",
          "right": "một số lần · đôi khi"
        },
        {
          "left": "never",
          "right": "0% · không bao giờ"
        }
      ]
    },
    {
      "id": "f2",
      "kind": "order",
      "prompt": "Tôi hay đọc sách.",
      "hint": "Với động từ thường, trạng từ tần suất đứng giữa chủ ngữ và động từ.",
      "explanation": "`I often read books.`: `often` đứng sau chủ ngữ `I` và trước động từ `read`.",
      "tokens": [
        "books",
        "read",
        "often",
        "I",
        "."
      ],
      "answer": [
        "I",
        "often",
        "read",
        "books",
        "."
      ]
    },
    {
      "id": "f3",
      "kind": "choice",
      "prompt": "Cách nói thông dụng nhất cho “Cô ấy thường bận” là gì?",
      "hint": "Trong cách nói thông dụng nhất, trạng từ đứng sau is.",
      "explanation": "is + often là thứ tự thông dụng nhất.",
      "options": [
        "She often is busy.",
        "She is often busy.",
        "She is busy often."
      ],
      "answer": "She is often busy."
    },
    {
      "id": "f4",
      "kind": "tap",
      "prompt": "Chạm vào trạng từ tần suất.",
      "hint": "Từ nào cho biết việc xảy ra thường xuyên đến đâu?",
      "explanation": "`Usually` là trạng từ tần suất: nó cho biết việc đi bộ đi làm xảy ra hầu hết các lần.",
      "tokens": [
        "My",
        "father",
        "usually",
        "walks",
        "to",
        "work",
        "."
      ],
      "answerIndexes": [
        2
      ],
      "selectionMode": "single"
    },
    {
      "id": "f5",
      "kind": "tap",
      "prompt": "Chạm vào từ biểu thị 0%.",
      "hint": "0% nghĩa là không bao giờ.",
      "explanation": "never = không bao giờ.",
      "tokens": [
        "always",
        "often",
        "sometimes",
        "never"
      ],
      "answerIndexes": [
        3
      ],
      "selectionMode": "single"
    },
    {
      "id": "f6",
      "kind": "repair",
      "prompt": "Sửa phần sau `My sister` để câu nói “Chị gái tôi hay nấu ăn”.",
      "hint": "`Cook` là động từ thường, và chủ ngữ `my sister` chỉ một người.",
      "explanation": "`My sister often cooks.` không chèn `is`, đặt `often` trước động từ và dùng `cooks` cho chủ ngữ số ít.",
      "tokens": [
        "My",
        "sister",
        "is often cook",
        "."
      ],
      "targetIndex": 2,
      "replacements": [
        "is often cook",
        "often cooks",
        "often cook"
      ],
      "answer": "often cooks"
    },
    {
      "id": "f7",
      "kind": "context",
      "prompt": "Chọn trạng từ phù hợp.",
      "hint": "Tìm từ ở đáy chiếc thang tần suất.",
      "explanation": "never biểu thị 0%.",
      "context": "Một việc hoàn toàn không xảy ra: 0%.",
      "options": [
        "always",
        "sometimes",
        "never"
      ],
      "answer": "never"
    },
    {
      "id": "f8",
      "kind": "choice",
      "prompt": "Cách nói thông dụng nhất cho “Họ luôn ở nhà” là gì?",
      "hint": "Trong cách nói thông dụng nhất, trạng từ đứng sau are.",
      "explanation": "are + always là thứ tự thông dụng nhất.",
      "options": [
        "They always are at home.",
        "They are always at home.",
        "They are at always home."
      ],
      "answer": "They are always at home."
    },
    {
      "id": "f9",
      "kind": "grid",
      "prompt": "Chọn câu có trạng từ tần suất ở vị trí thông dụng nhất.",
      "hint": "Xác định động từ chính của mỗi câu là `be` hay động từ thường, rồi đặt trạng từ theo động từ ấy.",
      "explanation": "Trạng từ tần suất đã nằm ở vị trí thông dụng trong mỗi kiểu câu.",
      "rows": [
        {
          "cue": "Họ hay chơi bóng đá.",
          "options": [
            "They often play football.",
            "They play often football.",
            "They are often play football."
          ],
          "answer": "They often play football.",
          "completed": "They often play football."
        },
        {
          "cue": "Cô ấy luôn tốt bụng.",
          "options": [
            "She always is kind.",
            "She is always kind.",
            "She is kind always."
          ],
          "answer": "She is always kind.",
          "completed": "She is always kind."
        },
        {
          "cue": "Họ không bao giờ chơi.",
          "options": [
            "They never play.",
            "They play never.",
            "Never they play."
          ],
          "answer": "They never play.",
          "completed": "They never play."
        }
      ]
    },
    {
      "id": "f10",
      "kind": "match",
      "prompt": "Ghép mỗi trạng từ với nghĩa gần đúng của nó.",
      "hint": "Đặt mỗi trạng từ vào đúng mức trên thang từ always đến never.",
      "explanation": "Các trạng từ đã được ghép với mức độ thường xuyên.",
      "pairs": [
        {
          "left": "usually",
          "right": "hầu hết các lần · thường lệ"
        },
        {
          "left": "sometimes",
          "right": "đôi khi"
        },
        {
          "left": "rarely",
          "right": "hiếm khi"
        },
        {
          "left": "never",
          "right": "không bao giờ"
        }
      ]
    },
    {
      "id": "f11",
      "kind": "choice",
      "prompt": "Cụm nào có nghĩa “hai lần một tuần”?",
      "hint": "once là một lần; twice là hai lần.",
      "explanation": "twice a week nói tần suất hai lần mỗi tuần.",
      "options": [
        "twice a week",
        "once a week",
        "every week"
      ],
      "answer": "twice a week"
    },
    {
      "id": "f12",
      "kind": "grid",
      "prompt": "Chọn câu đúng và tự nhiên cho mỗi câu tiếng Việt.",
      "hint": "Trạng từ một từ đứng trước động từ thường hoặc sau `be`; cụm chỉ số lần thường đứng cuối câu.",
      "explanation": "Ba kiểu tần suất đã được đặt tự nhiên.",
      "rows": [
        {
          "cue": "Cô ấy thường uống trà.",
          "options": [
            "She usually drinks tea.",
            "She drinks usually tea.",
            "She is usually drink tea."
          ],
          "answer": "She usually drinks tea.",
          "completed": "She usually drinks tea."
        },
        {
          "cue": "Họ hiếm khi ở nhà.",
          "options": [
            "They are rarely at home.",
            "They rarely are at home.",
            "They are at rarely home."
          ],
          "answer": "They are rarely at home.",
          "completed": "They are rarely at home."
        },
        {
          "cue": "Tôi đọc hai lần một tuần.",
          "options": [
            "I read twice a week.",
            "I twice a week read.",
            "Twice I read a week."
          ],
          "answer": "I read twice a week.",
          "completed": "I read twice a week."
        }
      ]
    },
    {
      "id": "f13",
      "kind": "choice",
      "prompt": "Câu nào có nghĩa “Tôi không bao giờ đi”?",
      "hint": "Never đã mang nghĩa “không bao giờ”.",
      "explanation": "I never go. dùng một dấu hiệu phủ định và giữ go theo chủ ngữ I.",
      "options": [
        "I never go.",
        "I don’t never go.",
        "I never goes."
      ],
      "answer": "I never go."
    },
    {
      "id": "f14",
      "kind": "grid",
      "prompt": "Chọn câu hỏi đúng cho mỗi câu tiếng Việt.",
      "hint": "Do/Does + chủ ngữ + trạng từ + động từ cơ bản.",
      "explanation": "Ba trạng từ đã đứng tự nhiên trong câu hỏi.",
      "rows": [
        {
          "cue": "Bạn có hay đọc sách không?",
          "options": [
            "Do you often read books?",
            "Do often you read books?",
            "Do you read often books?"
          ],
          "answer": "Do you often read books?",
          "completed": "Do you often read books?"
        },
        {
          "cue": "Lan có thường làm việc ở đây không?",
          "options": [
            "Does Lan usually work here?",
            "Does usually Lan works here?",
            "Usually does Lan work here?"
          ],
          "answer": "Does Lan usually work here?",
          "completed": "Does Lan usually work here?"
        },
        {
          "cue": "Thỉnh thoảng họ có chơi ở đây không?",
          "options": [
            "Do they sometimes play here?",
            "Do they sometimes plays here?",
            "Sometimes they play here."
          ],
          "answer": "Do they sometimes play here?",
          "completed": "Do they sometimes play here?"
        }
      ]
    },
    {
      "id": "f15",
      "kind": "grid",
      "prompt": "Chọn cụm tiếng Anh đúng cho mỗi cụm tiếng Việt.",
      "hint": "Đếm số lần trong cụm tiếng Việt; cụm chỉ số lần cần đủ từ chỉ số lần, mạo từ và đơn vị thời gian, còn sau `every` là danh từ số ít.",
      "explanation": "Cụm chỉ số lần gồm từ chỉ số lần, `a` và đơn vị thời gian; danh từ ngay sau `every` ở dạng số ít.",
      "rows": [
        {
          "cue": "một lần một tuần",
          "options": [
            "once a week",
            "twice a week",
            "once week"
          ],
          "answer": "once a week",
          "completed": "once a week"
        },
        {
          "cue": "hai lần một tháng",
          "options": [
            "twice a month",
            "once a month",
            "twice month"
          ],
          "answer": "twice a month",
          "completed": "twice a month"
        },
        {
          "cue": "mỗi ngày",
          "options": [
            "every day",
            "every days",
            "once a day"
          ],
          "answer": "every day",
          "completed": "every day"
        }
      ]
    }
  ],
  "objects-and-links": [
    {
      "id": "o1",
      "kind": "match",
      "prompt": "Ghép mỗi đại từ chủ ngữ với dạng tân ngữ của nó.",
      "hint": "he và him cùng chỉ một người nam.",
      "explanation": "Dạng đại từ thay đổi theo công việc trong câu.",
      "pairs": [
        {
          "left": "I",
          "right": "me"
        },
        {
          "left": "he",
          "right": "him"
        },
        {
          "left": "she",
          "right": "her"
        },
        {
          "left": "they",
          "right": "them"
        }
      ]
    },
    {
      "id": "o2",
      "kind": "order",
      "prompt": "Tôi thích cô ấy.",
      "hint": "Chủ ngữ đứng trước; tân ngữ đứng sau động từ.",
      "explanation": "I là chủ ngữ; her là tân ngữ.",
      "tokens": [
        "her",
        "like",
        "I",
        "."
      ],
      "answer": [
        "I",
        "like",
        "her",
        "."
      ]
    },
    {
      "id": "o4",
      "kind": "tap",
      "prompt": "Chạm vào tân ngữ.",
      "hint": "Sau like, từ nào trả lời câu hỏi “thích ai?”",
      "explanation": "her là tân ngữ.",
      "tokens": [
        "I",
        "like",
        "her",
        "."
      ],
      "answerIndexes": [
        2
      ],
      "selectionMode": "single"
    },
    {
      "id": "o8",
      "kind": "choice",
      "prompt": "Mai visits ___. (Mai thăm chúng tôi.)",
      "hint": "Sau động từ, người nhận hành động cần dạng tân ngữ.",
      "explanation": "`Mai visits us.` là câu đúng: sau động từ `visits`, dùng dạng tân ngữ của `we`.",
      "options": [
        "we",
        "us",
        "our"
      ],
      "answer": "us"
    },
    {
      "id": "op5",
      "kind": "choice",
      "prompt": "Lan helps ___. (Lan giúp anh ấy.)",
      "hint": "Sau helps cần dạng tân ngữ của he.",
      "explanation": "him là đại từ tân ngữ chỉ anh ấy.",
      "options": [
        "he",
        "him",
        "his"
      ],
      "answer": "him"
    },
    {
      "id": "op6",
      "kind": "choice",
      "prompt": "I help ___. (Tôi giúp bạn.)",
      "hint": "you giữ nguyên khi làm tân ngữ; your phải đứng trước danh từ.",
      "explanation": "I help you. là câu đúng.",
      "options": [
        "you",
        "your",
        "they"
      ],
      "answer": "you"
    },
    {
      "id": "op7",
      "kind": "choice",
      "prompt": "I see ___. (Tôi nhìn thấy cô ấy.)",
      "hint": "Sau see cần đại từ tân ngữ.",
      "explanation": "her ở đây có nghĩa “cô ấy” và làm tân ngữ.",
      "options": [
        "she",
        "her",
        "their"
      ],
      "answer": "her"
    },
    {
      "id": "op8",
      "kind": "grid",
      "prompt": "Chọn dạng đứng sau động từ.",
      "hint": "Mỗi đại từ đứng sau động từ, nên cần dạng tân ngữ của nó.",
      "explanation": "Mỗi đại từ đã đổi đúng theo vai tân ngữ.",
      "rows": [
        {
          "cue": "I → Lan sees ___.",
          "options": [
            "I",
            "me",
            "my"
          ],
          "answer": "me",
          "completed": "Lan sees me."
        },
        {
          "cue": "we → They help ___.",
          "options": [
            "we",
            "us",
            "our"
          ],
          "answer": "us",
          "completed": "They help us."
        },
        {
          "cue": "they → We like ___.",
          "options": [
            "they",
            "them",
            "their"
          ],
          "answer": "them",
          "completed": "We like them."
        }
      ]
    },
    {
      "id": "op9",
      "kind": "grid",
      "prompt": "Chọn đại từ đứng sau động từ.",
      "hint": "you và it giữ nguyên hình thức khi làm tân ngữ.",
      "explanation": "Các đại từ không đổi đã đứng đúng sau động từ.",
      "rows": [
        {
          "cue": "Tôi thích quyển sách đó.",
          "options": [
            "I like it.",
            "I like its.",
            "I like he."
          ],
          "answer": "I like it.",
          "completed": "I like it."
        },
        {
          "cue": "Cô ấy giúp bạn.",
          "options": [
            "She helps you.",
            "She helps your.",
            "She helps we."
          ],
          "answer": "She helps you.",
          "completed": "She helps you."
        },
        {
          "cue": "Quyển sách nhỏ. Tôi thích nó.",
          "options": [
            "The book is small. I like it.",
            "The book is small. I like its.",
            "The book is small. I like he."
          ],
          "answer": "The book is small. I like it.",
          "completed": "The book is small. I like it."
        }
      ]
    },
    {
      "id": "op10",
      "kind": "sort",
      "prompt": "Xếp mỗi `her` vào nhóm tân ngữ hoặc nhóm từ chỉ sở hữu.",
      "hint": "Nhìn xem sau her có một danh từ hay không.",
      "explanation": "Her sau động từ là tân ngữ; her trước danh từ chỉ mối quan hệ sở hữu.",
      "buckets": [
        "Tân ngữ",
        "Từ chỉ sở hữu"
      ],
      "items": [
        {
          "text": "her trong I see her",
          "bucket": "Tân ngữ"
        },
        {
          "text": "her trong her book",
          "bucket": "Từ chỉ sở hữu"
        },
        {
          "text": "her trong They help her",
          "bucket": "Tân ngữ"
        },
        {
          "text": "her trong her cat",
          "bucket": "Từ chỉ sở hữu"
        }
      ]
    }
  ],
};

const a1Chapter06TopUps: Partial<Record<string, Exercise[]>> = {
  "action-vs-be": [
    ...binaryChoiceDrills("a1avx", 1, "be và động từ thường", [
      ["câu nói Lan vui", "Lan is happy.", "Lan happy.", "Tính từ `happy` cần động từ nối `is`."],
      ["câu nói tôi làm việc", "I work.", "I am work.", "`Work` tự làm động từ chính; không chèn `am`."],
      ["câu nói họ ở nhà", "They are at home.", "They at home.", "Sau chủ ngữ là một nơi chốn, nên câu cần `be`; với `they`, dùng `are`."],
      ["câu nói họ sống ở đây", "They live here.", "They are live here.", "`Live` là động từ chính."],
      ["câu nói Nam là bác sĩ", "Nam is a doctor.", "Nam a doctor.", "Tên gọi hoặc nghề nghiệp sau chủ ngữ cần `be`; với một người, dùng `is`."],
      ["câu nói họ thích âm nhạc", "They like music.", "They are like music.", "`Like` là động từ thường mang nghĩa thích."],
      ["câu nói tôi cần một chiếc bút", "I need a pen.", "I am need a pen.", "`Need` là động từ thường chỉ trạng thái và tự làm động từ chính, nên không chèn `am`."],
      ["câu nói căn phòng sạch sẽ", "The room is clean.", "The room clean.", "Tính từ `clean` nói đặc điểm của căn phòng, nên cần `is` nối nó với chủ ngữ."],
      ["câu nói bọn trẻ chơi trong công viên", "The children play in the park.", "The children are play in the park.", "`Play` là động từ thường nói việc bọn trẻ làm; không chèn `are` trước nó."],
      ["câu nói bạn đến muộn", "You are late.", "You late.", "`Late` là tính từ nói tình trạng của chủ ngữ, nên cần `be`; với `you`, dùng `are`."],
      ["câu nói con mèo ở trong vườn", "The cat is in the garden.", "The cat in the garden.", "Cụm nơi chốn `in the garden` cần `be` nối với chủ ngữ; với một con vật, dùng `is`."],
      ["câu nói chúng tôi đọc sách trong vườn", "We read books in the garden.", "We are read books in the garden.", "`Read` tự làm động từ chính trong câu này; không chèn `are`."],
      ["câu nói cửa hàng đang mở cửa", "The shop is open.", "The shop open.", "`Open` ở đây là tính từ nói trạng thái của cửa hàng, nên cần `is`."],
      ["câu nói sáng nào chúng tôi cũng mở cửa hàng", "We open the shop every morning.", "We are open the shop every morning.", "`Open` ở đây là hành động mở; không chèn `are` trước động từ."],
      ["câu nói họ là công nhân", "They are workers.", "They workers.", "Câu giới thiệu cần dạng phù hợp của `be`."],
      ["câu nói họ học tiếng Anh", "They study English.", "They are study English.", "`Study` tự làm động từ chính trong câu này."],
    ]),
  ],
  "present-simple-base": [
    ...binaryChoiceDrills("a1pbx", 1, "hiện tại đơn với I/you/we/they", [
      ["thói quen đọc của tôi", "I read every day.", "I am read every day.", "Với `I`, dùng động từ cơ bản `read`."],
      ["thói quen chơi của chúng tôi", "We play on Sundays.", "We plays on Sundays.", "Với `we`, động từ không có `-s`."],
      ["nơi ở ổn định của họ", "They live in Hue.", "They lives in Hue.", "Với `they`, dùng `live`."],
      ["sở thích của bạn", "You like music.", "You likes music.", "Với `you`, dùng dạng cơ bản."],
      ["sự thật về cây cối", "Plants need water.", "Plants needs water.", "Chủ ngữ số nhiều dùng `need`."],
      ["sự thật về mèo", "Cats sleep a lot.", "Cats sleeps a lot.", "Chủ ngữ số nhiều dùng `sleep`."],
      ["câu có tân ngữ", "We read books.", "We read are books.", "`Read` là động từ; `books` là tân ngữ."],
      ["câu không cần tân ngữ", "They sleep.", "They sleep it.", "`Sleep` có thể tạo câu hoàn chỉnh không có tân ngữ."],
      ["câu có nơi và thời gian", "We work at home every morning.", "We at home work every morning.", "Trật tự cơ bản đặt động từ trước nơi và thời gian."],
      ["thói quen làm việc mỗi ngày", "I work here every day.", "I works here every day.", "Với `I`, dùng động từ dạng cơ bản `work`."],
      ["điều thường đúng về cây cối", "Plants grow in sunlight.", "Plants grows in sunlight.", "Chủ ngữ số nhiều `plants` đi với dạng cơ bản `grow`."],
      ["tình trạng biết câu trả lời", "We know the answer.", "We are know the answer.", "`Know` là động từ trạng thái ở hiện tại đơn."],
      ["câu nói chúng ta cần thời gian", "We need time.", "We are need time.", "`Need` tự làm động từ chính."],
    ]),
  ],
  "third-person": [
    ...binaryChoiceDrills("a1tpx", 1, "động từ ngôi thứ ba số ít", [
      ["câu “Cô ấy ngủ”", "She sleeps.", "She sleep.", "Chủ ngữ `she` làm động từ thêm `-s`."],
      ["câu “Bố tôi làm việc”", "My father works.", "My father work.", "Một người số ít dùng `works`."],
      ["câu “Anh ấy xem TV”", "He watches TV.", "He watch TV.", "Động từ kết thúc bằng `ch` thêm `-es`."],
      ["câu “Lan rửa xe ô tô”", "Lan washes the car.", "Lan wash the car.", "Đuôi `sh` thêm `-es`."],
      ["câu “Xe buýt đi vào trung tâm thành phố”", "The bus goes downtown.", "The bus go downtown.", "`Go` đổi thành `goes`."],
      ["câu “Chị gái tôi học vào buổi tối”", "My sister studies in the evening.", "My sister study in the evening.", "Phụ âm + `y` đổi thành `-ies`."],
      ["câu “Anh ấy chơi bóng đá”", "He plays football.", "He play football.", "Nguyên âm + `y` chỉ thêm `-s`."],
      ["câu “Mai thích âm nhạc”", "Mai enjoys music.", "Mai enjoy music.", "Trước `y` là nguyên âm, nên thêm `-s`."],
      ["câu “Nó có bìa màu đỏ”", "It has a red cover.", "It have a red cover.", "`Have` có dạng riêng `has`."],
      ["câu “Lan và Nam làm việc ở đây”", "Lan and Nam work here.", "Lan and Nam works here.", "Hai người nối bằng `and` tạo chủ ngữ số nhiều."],
      ["câu “Cô ấy thử lại”", "She tries again.", "She try again.", "Động từ tận cùng bằng phụ âm + `y` đổi `y` thành `i` rồi thêm `-es`."],
    ]),
  ],
  "present-simple-negative": [
    ...binaryChoiceDrills("a1pnx", 1, "phủ định hiện tại đơn", [
      ["câu “Tôi không thích cà phê”", "I don't like coffee.", "I doesn't like coffee.", "`I` dùng `don't`."],
      ["câu “Họ không sống ở đây”", "They don't live here.", "They doesn't live here.", "`They` dùng `don't`."],
      ["câu “Cô ấy không làm việc ở đây”", "She doesn't work here.", "She don't work here.", "`She` dùng `doesn't`."],
      ["câu “Con mèo không ngủ ở đây”", "The cat doesn't sleep here.", "The cat don't sleep here.", "Chủ ngữ số ít dùng `doesn't`."],
      ["câu “Bọn trẻ không ăn thịt”", "The children don't eat meat.", "The children doesn't eat meat.", "`Children` là số nhiều nên dùng `don't`."],
      ["câu “Lan không học tiếng Pháp”", "Lan doesn't study French.", "Lan doesn't studies French.", "Sau `doesn't`, dùng dạng cơ bản `study`."],
      ["câu “Anh ấy không có ô tô”", "He doesn't have a car.", "He doesn't has a car.", "`Has` trở về `have` sau `doesn't`."],
      ["câu “Cô ấy không đi bằng xe buýt”", "She doesn't go by bus.", "She doesn't goes by bus.", "`Goes` trở về `go`."],
      ["câu “Họ không mệt”", "They aren't tired.", "They don't tired.", "`Be` nhận `not` trực tiếp."],
      ["câu “Họ không làm việc ở nhà”", "They don't work at home.", "They aren't work at home.", "Động từ thường dùng `don't`."],
      ["dạng đầy đủ của câu “Họ không làm việc ở đây”", "They do not work here.", "They does not work here.", "`They` dùng `do not`; `does not` đi với `he`, `she`, `it` hoặc một người/vật."],
    ]),
  ],
  "present-simple-questions": [
    ...binaryChoiceDrills("a1pqx", 1, "câu hỏi hiện tại đơn", [
      ["hỏi `you` có đọc mỗi ngày không", "Do you read every day?", "Does you read every day?", "`You` dùng `do`."],
      ["hỏi `they` có làm việc ở đây không", "Do they work here?", "Does they work here?", "`They` dùng `do`."],
      ["hỏi `he` có sống ở Huế không", "Does he live in Hue?", "Do he lives in Hue?", "`He` dùng `does`; `live` ở dạng cơ bản."],
      ["câu hỏi “Mai có thích cà phê không?”", "Does Mai like coffee?", "Does Mai likes coffee?", "Sau `does`, dùng `like`."],
      ["hỏi con mèo có ngủ ở đây không", "Does the cat sleep here?", "Do the cat sleeps here?", "Chủ ngữ số ít dùng `does`."],
      ["hỏi nhiều con mèo có ngủ ở đây không", "Do the cats sleep here?", "Does the cats sleeps here?", "Chủ ngữ số nhiều dùng `do`."],
      ["hỏi cô ấy có xe không", "Does she have a car?", "Does she has a car?", "Sau `does`, `has` trở về `have`."],
      ["câu trả lời khẳng định cho `Do you cook?`", "Yes, I do.", "Yes, I does.", "Câu trả lời ngắn lặp lại đúng trợ động từ của câu hỏi; với chủ ngữ `I`, trợ động từ ấy không thêm `-es`."],
      ["lời đáp phủ định ngắn khi được hỏi `Does he drive?`", "No, he doesn't.", "No, he don't.", "Chủ ngữ `he` dùng `doesn't`."],
      ["câu trả lời khẳng định cho câu hỏi “Do the children walk to school?”", "Yes, they do.", "Yes, they does.", "Thay chủ ngữ số nhiều bằng `they` và lặp lại đúng trợ động từ của câu hỏi."],
      ["câu hỏi với `be`", "Is Lan at home?", "Does Lan be at home?", "`Be` tự đảo, không dùng `does`."],
      ["câu hỏi thói quen đi làm", "Do you go to work by bus?", "Are you go to work by bus?", "Động từ thường hiện tại đơn dùng `do`."],
      ["câu hỏi về lịch cửa hàng", "Does the shop close at six?", "Does the shop closes at six?", "Sau `does`, dùng `close`."],
      ["dấu câu cuối câu hỏi", "Do they know you?", "Do they know you.", "Câu hỏi trực tiếp kết thúc bằng dấu hỏi."],
    ]),
  ],
  // Hai hệ thống nói sở hữu dễ bị trộn; bổ sung phần `have` chỉ hoạt động và câu khẳng định với `have got`.
  "have-have-got": [
    {
      id: "a1hgx1", kind: "choice", prompt: "Câu nào nói về thói quen tắm buổi sáng?",
      options: ["I have a shower every morning.", "I've got a shower every morning.", "I has a shower every morning."],
      answer: "I have a shower every morning.",
      hint: "Ở đây `have` không nói sở hữu mà nói một hoạt động lặp lại.",
      explanation: "Khi `have` diễn tả hoạt động như tắm hay ăn sáng, ta dùng `have` theo hệ thống `do/does + have`, không dùng `have got`; với `I`, dùng `have`.",
    },
    {
      id: "a1hgx2", kind: "order", prompt: "Sắp xếp câu “Cô ấy có hai anh trai.” bằng `have got`.",
      tokens: ["two", "She’s", "brothers", "got", "."],
      answer: ["She’s", "got", "two", "brothers", "."],
      hint: "`She's` ở đây là dạng viết tắt của chủ ngữ cùng `has`; `got` đi ngay sau nó.",
      explanation: "Trong `She’s got two brothers.`, `’s` là `has`, rồi đến `got` và phần được sở hữu.",
    },
  ],
  frequency: [
    ...binaryChoiceDrills("a1fqx", 1, "trạng từ tần suất", [
      ["câu “Cô ấy hay xem phim vào ban đêm”", "She often watches films at night.", "She watches often films at night.", "Trạng từ tần suất đứng trước động từ thường; nó không chen giữa động từ và tân ngữ."],
      ["câu “Họ luôn đúng giờ” nói theo cách thông dụng nhất", "They are always on time.", "They always are on time.", "Trong cách nói thông dụng nhất, trạng từ tần suất đứng sau `be`."],
      ["câu “Họ không bao giờ ăn thịt”", "They never eat meat.", "They don't never eat meat.", "`Never` đã mang nghĩa phủ định."],
      ["`sometimes` ở đầu câu", "Sometimes we walk to school.", "Sometimes do we walk to school.", "`Sometimes` có thể đứng đầu câu kể."],
      ["câu “Tôi gọi cho cô ấy mỗi ngày”", "I call her every day.", "I every day call her.", "Cụm tần suất thường đứng cuối."],
      ["câu “Chúng tôi bơi hai lần một tuần”", "We swim twice a week.", "We twice a week swim.", "Cụm chỉ số lần thường đứng cuối."],
      ["câu hỏi “Bạn có hay nấu ăn không?”", "Do you often cook?", "Often do you cook?", "Trong câu hỏi hiện tại đơn, `often` đứng trước động từ chính."],
      ["câu “Tôi thường không uống trà”", "I don't usually drink tea.", "I don't drink usually tea.", "`Usually` thường đứng sau `don't` và trước động từ chính."],
      ["câu hỏi “Cô ấy đi du lịch bao lâu một lần?”", "How often does she travel?", "How often she travels?", "Dùng `how often + does + chủ ngữ + động từ cơ bản`."],
      ["câu trả lời cho câu hỏi “How often do you visit your grandparents?”", "Three times a month.", "At the station.", "Câu hỏi tần suất cần một mức độ hoặc số lần."],
    ]),
  ],
  "objects-and-links": [
    ...binaryChoiceDrills("a1opx", 1, "đại từ tân ngữ", [
      ["“Lan giúp tôi”", "Lan helps me.", "Lan helps I.", "Sau động từ dùng đại từ tân ngữ `me`."],
      ["“Tôi biết anh ấy”", "I know him.", "I know he.", "`Him` là dạng tân ngữ của `he`."],
      ["“Chúng tôi thấy cô ấy”", "We see her.", "We see she.", "`Her` làm tân ngữ sau `see`."],
      ["“Cô ấy gọi cho chúng tôi”", "She calls us.", "She calls we.", "`Us` là dạng tân ngữ của `we`."],
      ["“Tôi thích họ”", "I like them.", "I like they.", "`Them` là dạng tân ngữ của `they`."],
      ["“Tôi cần nó”", "I need it.", "I need its.", "`It` giữ nguyên khi làm tân ngữ."],
      ["“Tôi giúp bạn”", "I help you.", "I help your.", "`You` giữ nguyên khi làm tân ngữ."],
      ["“Nam sống cùng chúng tôi”", "Nam lives with us.", "Nam lives with we.", "Sau giới từ `with`, dùng đại từ tân ngữ."],
      ["sau giới từ `for`", "This is for her.", "This is for she.", "`Her` đứng sau giới từ `for`."],
      ["sau giới từ `from`", "I get messages from them.", "I get messages from they.", "Dùng `them` sau `from`."],
      ["“Chúng tôi giúp cô ấy”", "We help her.", "We help hers.", "Sau động từ, `her` chỉ chính người được giúp; `hers` nói thứ thuộc về cô ấy."],
      ["phân biệt `her` chỉ sở hữu", "her book", "hers book", "Trước danh từ dùng `her`."],
      ["“Lan và tôi làm việc ở đây” trong văn phong chuẩn", "Lan and I work here.", "Lan and me work here.", "Ở vị trí chủ ngữ chuẩn, dùng `I`."],
      ["“Giáo viên giúp Lan và tôi” trong văn phong chuẩn", "The teacher helps Lan and me.", "The teacher helps Lan and I.", "Sau động từ, dùng `me`."],
      ["thay `the boys` sau động từ", "I know them.", "I know they.", "Cụm số nhiều được thay bằng tân ngữ `them`."],
    ]),
  ],
};

const a1Chapter06DepthExtensions: Partial<Record<string, Exercise[]>> = {
  "action-vs-be": [{
    id: "a1depth-av-1", kind: "sort", prompt: "Phân loại câu theo động từ chính: `be` hay động từ thường.",
    hint: "Nếu câu nối chủ ngữ với tên gọi, đặc điểm hoặc nơi chốn, hãy tìm `be`; nếu từ khác đã mang nghĩa chính, không chèn `be`.",
    explanation: "`Be` nối chủ ngữ với tên gọi, đặc điểm hoặc nơi chốn; `cook`, `need` và `live` là động từ thường, tự làm động từ chính.",
    buckets: ["Dùng be", "Dùng động từ thường"],
    items: [
      { text: "My aunt is a nurse.", bucket: "Dùng be" },
      { text: "The soup is hot.", bucket: "Dùng be" },
      { text: "They are in the kitchen.", bucket: "Dùng be" },
      { text: "My parents cook dinner.", bucket: "Dùng động từ thường" },
      { text: "We need water.", bucket: "Dùng động từ thường" },
      { text: "They live near here.", bucket: "Dùng động từ thường" },
    ],
  }],
  "present-simple-base": [
    {
      id: "a1depth-psb-1", kind: "grid", prompt: "Chọn câu hiện tại đơn phù hợp với thói quen, sự thật và tình trạng ổn định.",
      hint: "Xác định cách nhìn về sự việc trước; với `I/you/we/they` hoặc chủ ngữ số nhiều, dùng động từ dạng cơ bản.",
      explanation: "Ba câu dùng hiện tại đơn vì lần lượt nói thói quen, sự thật chung và tình trạng tương đối ổn định.",
      rows: [
        { cue: "thói quen của chúng tôi vào thứ Bảy", options: ["We visit our grandparents on Saturdays.", "We are visit our grandparents on Saturdays.", "We visits our grandparents on Saturdays."], answer: "We visit our grandparents on Saturdays.", completed: "We visit our grandparents on Saturdays." },
        { cue: "sự thật chung về chim", options: ["Birds have wings.", "Birds has wings.", "Birds are have wings."], answer: "Birds have wings.", completed: "Birds have wings." },
        { cue: "nơi làm việc ổn định của tôi", options: ["I work in a library.", "I works in a library.", "I am work in a library."], answer: "I work in a library.", completed: "I work in a library." },
      ],
    },
    {
      id: "a1depth-psb-2", kind: "order", prompt: "Sắp xếp câu nói thói quen “Chúng tôi ăn sáng ở nhà mỗi ngày”.",
      hint: "Đặt chủ ngữ và động từ trước, rồi đến tân ngữ, nơi chốn và thời gian.",
      explanation: "Câu hoàn chỉnh là `We eat breakfast at home every day.`",
      tokens: ["every", "breakfast", "We", "home", "eat", "at", "day", "."],
      answer: ["We", "eat", "breakfast", "at", "home", "every", "day", "."],
    },
  ],
  "present-simple-negative": [{
    id: "a1depth-neg-1", kind: "grid", prompt: "Chọn cách phủ định theo đúng loại động từ và chủ ngữ.",
    hint: "Câu có `be` đặt `not` trực tiếp sau `be`; động từ thường dùng `don't/doesn't` rồi trở về dạng cơ bản.",
    explanation: "Mỗi câu giữ đúng hệ thống phủ định của `be` hoặc động từ thường.",
    rows: [
      { cue: "The room ___ cold.", options: ["isn't", "doesn't", "don't"], answer: "isn't", completed: "The room isn't cold." },
      { cue: "My brother ___ meat.", options: ["doesn't eat", "doesn't eats", "isn't eat"], answer: "doesn't eat", completed: "My brother doesn't eat meat." },
      { cue: "We ___ on Sundays.", options: ["don't work", "doesn't work", "aren't work"], answer: "don't work", completed: "We don't work on Sundays." },
    ],
  }],
  "present-simple-questions": [
    {
      id: "a1depth-pq-1", kind: "grid", prompt: "Chọn câu hỏi có/không đúng cho từng chủ ngữ và giữ động từ chính ở dạng cơ bản.",
      hint: "Dùng `does` với một người hoặc vật; dùng `do` với `I/you/we/they` và chủ ngữ số nhiều.",
      explanation: "`Do/does` đứng trước chủ ngữ và động từ chính không mang `-s`.",
      rows: [
        { cue: "your parents / live nearby", options: ["Do your parents live nearby?", "Does your parents live nearby?", "Do your parents lives nearby?"], answer: "Do your parents live nearby?", completed: "Do your parents live nearby?" },
        { cue: "this bus / stop here", options: ["Does this bus stop here?", "Do this bus stop here?", "Does this bus stops here?"], answer: "Does this bus stop here?", completed: "Does this bus stop here?" },
        { cue: "you / need a ticket", options: ["Do you need a ticket?", "Does you need a ticket?", "Are you need a ticket?"], answer: "Do you need a ticket?", completed: "Do you need a ticket?" },
      ],
    },
    {
      id: "a1depth-pq-2", kind: "match", prompt: "Ghép mỗi câu hỏi hiện tại đơn với câu trả lời ngắn phù hợp.",
      hint: "Giữ cùng `do` hoặc `does` và thay tên bằng đại từ thích hợp.",
      explanation: "Câu trả lời ngắn dùng cùng trợ động từ với câu hỏi.",
      pairs: [
        { left: "Does your sister drive?", right: "Yes, she does." },
        { left: "Do the shops open early?", right: "No, they don't." },
        { left: "Do you know Minh?", right: "Yes, I do." },
      ],
    },
  ],
  "objects-and-links": [{
    id: "a1depth-obj-1", kind: "grid", prompt: "Chọn đại từ đúng theo vị trí chủ ngữ hoặc tân ngữ trong từng câu.",
    hint: "Hỏi ai thực hiện hành động và ai hoặc vật nào nhận tác động của hành động.",
    explanation: "Đại từ chủ ngữ đứng trước động từ; đại từ tân ngữ đứng sau động từ hoặc giới từ.",
    rows: [
      { cue: "___ calls me every evening.", options: ["She", "Her", "Hers"], answer: "She", completed: "She calls me every evening." },
      { cue: "I often call ___.", options: ["her", "she", "hers"], answer: "her", completed: "I often call her." },
      { cue: "This message is for ___.", options: ["them", "they", "their"], answer: "them", completed: "This message is for them." },
    ],
  }],
};

export const a1Chapter06ExerciseData = mergeExerciseRecords(
  a1Chapter06BaseExerciseData,
  a1Chapter06TopUps,
  a1Chapter06DepthExtensions,
);
