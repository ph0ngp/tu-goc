/* Luyện tập A1 — Chương 9: Hiện tại tiếp diễn. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { binaryChoiceDrills } from "../../basic-builders.ts";

const a1Chapter09BaseExerciseData: Record<string, Exercise[]> = {
  "continuous-form": [
    {
      "id": "cf1",
      "kind": "order",
      "prompt": "Cô ấy đang đọc bây giờ.",
      "hint": "Cần cả is và reading.",
      "explanation": "She + is + reading + now.",
      "tokens": [
        "now",
        "reading",
        "is",
        "She"
      ],
      "answer": [
        "She",
        "is",
        "reading",
        "now"
      ]
    },
    {
      "id": "cf2",
      "kind": "match",
      "prompt": "Quan sát ba quy tắc.",
      "hint": "make bỏ e; run gấp đôi n.",
      "explanation": "Ba động từ đại diện cho ba cách tạo V-ing.",
      "pairs": [
        {
          "left": "play",
          "right": "playing"
        },
        {
          "left": "make",
          "right": "making"
        },
        {
          "left": "run",
          "right": "running"
        }
      ]
    },
    {
      "id": "cf3",
      "kind": "choice",
      "prompt": "Họ đang chơi.",
      "hint": "Cần are + V-ing.",
      "explanation": "Hiện tại tiếp diễn luôn có be và V-ing.",
      "options": [
        "They playing.",
        "They are play.",
        "They are playing."
      ],
      "answer": "They are playing."
    },
    {
      "id": "cf4",
      "kind": "tap",
      "prompt": "Chạm vào cả hai mảnh tạo thì tiếp diễn.",
      "hint": "Cần be và V-ing.",
      "explanation": "is + reading tạo thì hiện tại tiếp diễn.",
      "tokens": [
        "She",
        "is",
        "reading",
        "now",
        "."
      ],
      "answerIndexes": [
        1,
        2
      ],
      "selectionMode": "multiple"
    },
    {
      "id": "cf5",
      "kind": "tap",
      "prompt": "Chạm vào dạng V-ing đúng của run.",
      "hint": "Từ ngắn này gấp đôi n.",
      "explanation": "run → running.",
      "tokens": [
        "running",
        "playing",
        "reading"
      ],
      "answerIndexes": [
        0
      ],
      "selectionMode": "single"
    },
    {
      "id": "cf6",
      "kind": "repair",
      "prompt": "Thêm mảnh be còn thiếu.",
      "hint": "They đi với are; hành động dùng playing.",
      "explanation": "They are playing. có đủ be + V-ing.",
      "tokens": [
        "They",
        "playing",
        "."
      ],
      "targetIndex": 1,
      "replacements": [
        "play",
        "are playing",
        "is playing"
      ],
      "answer": "are playing"
    },
    {
      "id": "cf7",
      "kind": "context",
      "prompt": "Chọn câu cho việc đang xảy ra.",
      "hint": "Việc đang diễn ra dùng be + V-ing.",
      "explanation": "They are playing. là câu tiếp diễn hoàn chỉnh.",
      "context": "Bạn nhìn thấy họ đang chơi ngay bây giờ.",
      "options": [
        "They play.",
        "They are playing.",
        "They playing."
      ],
      "answer": "They are playing."
    },
    {
      "id": "cf8",
      "kind": "choice",
      "prompt": "make → ?",
      "hint": "Bỏ e câm trước khi thêm -ing.",
      "explanation": "make → making.",
      "options": [
        "making",
        "playing",
        "running"
      ],
      "answer": "making"
    },
    {
      "id": "cf9",
      "kind": "grid",
      "prompt": "Chọn đủ cả dạng be và V-ing.",
      "hint": "Chọn be theo chủ ngữ rồi tạo đúng dạng -ing.",
      "explanation": "Mỗi câu đều có đủ be + V-ing.",
      "rows": [
        {
          "cue": "Cô ấy đang đọc bây giờ.",
          "options": [
            "She reads every day.",
            "She is reading now.",
            "They are reading now."
          ],
          "answer": "She is reading now.",
          "completed": "She is reading now."
        },
        {
          "cue": "Họ đang chơi bây giờ.",
          "options": [
            "They play every day.",
            "They are playing now.",
            "She is playing now."
          ],
          "answer": "They are playing now.",
          "completed": "They are playing now."
        },
        {
          "cue": "Tôi đang chạy bây giờ.",
          "options": [
            "I run every day.",
            "I am running now.",
            "I am reading now."
          ],
          "answer": "I am running now.",
          "completed": "I am running now."
        }
      ]
    },
    {
      "id": "cf10",
      "kind": "grid",
      "prompt": "Áp dụng quy tắc bỏ e hoặc gấp đôi phụ âm.",
      "hint": "Bỏ e câm; với sit, gấp đôi t.",
      "explanation": "Ba động từ mới đã được đổi sang dạng -ing đúng.",
      "rows": [
        {
          "cue": "write →",
          "options": [
            "writing",
            "write",
            "writes"
          ],
          "answer": "writing",
          "completed": "writing"
        },
        {
          "cue": "sit →",
          "options": [
            "sitting",
            "sit",
            "sits"
          ],
          "answer": "sitting",
          "completed": "sitting"
        },
        {
          "cue": "dance →",
          "options": [
            "dancing",
            "dance",
            "dances"
          ],
          "answer": "dancing",
          "completed": "dancing"
        }
      ]
    },
    {
      "id": "cf11",
      "kind": "grid",
      "prompt": "Giữ đủ be và động từ thêm -ing.",
      "hint": "Chọn be theo chủ ngữ rồi kiểm tra dạng -ing.",
      "explanation": "Ba chủ ngữ khác nhau đều có đủ hai phần của hiện tại tiếp diễn.",
      "rows": [
        {
          "cue": "Nam đang viết.",
          "options": [
            "Nam is writing.",
            "Nam are writing.",
            "Nam writing."
          ],
          "answer": "Nam is writing.",
          "completed": "Nam is writing."
        },
        {
          "cue": "Những con mèo đang chạy.",
          "options": [
            "The cats are running.",
            "The cats is running.",
            "The cats running."
          ],
          "answer": "The cats are running.",
          "completed": "The cats are running."
        },
        {
          "cue": "Bạn đang ngồi.",
          "options": [
            "You are sitting.",
            "You is sitting.",
            "You are sit."
          ],
          "answer": "You are sitting.",
          "completed": "You are sitting."
        }
      ]
    }
  ],
  "continuous-questions": [
    {
      "id": "cq1",
      "kind": "choice",
      "prompt": "Lúc này cô ấy không ngủ.",
      "hint": "Câu nói việc đang diễn ra nên cần be + not + V-ing.",
      "explanation": "She isn’t sleeping. là câu phủ định hiện tại tiếp diễn.",
      "options": [
        "She doesn’t sleeping.",
        "She isn’t sleeping.",
        "She not is sleeping."
      ],
      "answer": "She isn’t sleeping."
    },
    {
      "id": "cq2",
      "kind": "order",
      "prompt": "Họ có đang học không?",
      "hint": "Đưa Are lên trước they.",
      "explanation": "Are + they + studying?",
      "tokens": [
        "studying",
        "they",
        "Are",
        "?"
      ],
      "answer": [
        "Are",
        "they",
        "studying",
        "?"
      ]
    },
    {
      "id": "cq3",
      "kind": "match",
      "prompt": "Dùng lại đúng dạng be.",
      "hint": "Hãy đổi chủ ngữ theo người trả lời rồi chọn dạng be phù hợp.",
      "explanation": "Câu trả lời ngắn dùng be; với Am I...?, người đối thoại trả lời you are.",
      "pairs": [
        {
          "left": "Is she sleeping?",
          "right": "No, she isn’t."
        },
        {
          "left": "Are they studying?",
          "right": "Yes, they are."
        },
        {
          "left": "Am I talking loudly?",
          "right": "Yes, you are."
        }
      ]
    },
    {
      "id": "cq4",
      "kind": "tap",
      "prompt": "Chạm vào be ở đầu câu hỏi.",
      "hint": "Câu hỏi tiếp diễn đưa be lên đầu.",
      "explanation": "Are đứng trước they.",
      "tokens": [
        "Are",
        "they",
        "studying",
        "?"
      ],
      "answerIndexes": [
        0
      ],
      "selectionMode": "single"
    },
    {
      "id": "cq5",
      "kind": "tap",
      "prompt": "Chạm vào V-ing.",
      "hint": "Tìm động từ có đuôi -ing.",
      "explanation": "sleeping là V-ing.",
      "tokens": [
        "Is",
        "she",
        "sleeping",
        "?"
      ],
      "answerIndexes": [
        2
      ],
      "selectionMode": "single"
    },
    {
      "id": "cq6",
      "kind": "repair",
      "prompt": "Sửa đầu câu hỏi tiếp diễn.",
      "hint": "Câu hỏi tiếp diễn dùng be, không dùng does.",
      "explanation": "Is she sleeping? là câu đúng.",
      "tokens": [
        "Does she",
        "sleeping",
        "?"
      ],
      "targetIndex": 0,
      "replacements": [
        "Does she",
        "Is she",
        "She is"
      ],
      "answer": "Is she"
    },
    {
      "id": "cq7",
      "kind": "context",
      "prompt": "Chọn câu trả lời ngắn.",
      "hint": "Câu hỏi dùng are.",
      "explanation": "Câu trả lời ngắn lặp lại are.",
      "context": "Are they studying?",
      "options": [
        "Yes, they do.",
        "Yes, they are.",
        "Yes, they study."
      ],
      "answer": "Yes, they are."
    },
    {
      "id": "cq8",
      "kind": "choice",
      "prompt": "Lúc này anh ấy không nghe.",
      "hint": "Lúc này cho biết câu đang nói về tình huống hiện tại.",
      "explanation": "He isn’t listening. giữ listening và đặt not sau is.",
      "options": [
        "He doesn’t listening.",
        "He isn’t listening.",
        "He not listening."
      ],
      "answer": "He isn’t listening."
    },
    {
      "id": "cq9",
      "kind": "grid",
      "prompt": "Giữ V-ing, chỉ thay đổi vị trí hoặc thêm not quanh be.",
      "hint": "Phủ định dùng be + not; câu hỏi đưa be lên đầu.",
      "explanation": "V-ing được giữ nguyên trong cả phủ định và câu hỏi.",
      "rows": [
        {
          "cue": "She is sleeping. → phủ định",
          "options": [
            "She doesn’t sleeping.",
            "She isn’t sleeping.",
            "She not sleeping."
          ],
          "answer": "She isn’t sleeping.",
          "completed": "She isn’t sleeping."
        },
        {
          "cue": "They are studying. → câu hỏi",
          "options": [
            "Do they studying?",
            "Are they studying?",
            "Are studying they?"
          ],
          "answer": "Are they studying?",
          "completed": "Are they studying?"
        },
        {
          "cue": "He is listening. → câu hỏi",
          "options": [
            "Is he listening?",
            "Does he listening?",
            "Is listening he?"
          ],
          "answer": "Is he listening?",
          "completed": "Is he listening?"
        }
      ]
    },
    {
      "id": "cq10",
      "kind": "order",
      "prompt": "Cô ấy đang đọc gì?",
      "hint": "Từ hỏi + be + chủ ngữ + V-ing.",
      "explanation": "What is she reading? có đúng trật tự.",
      "tokens": [
        "reading",
        "she",
        "What",
        "is",
        "?"
      ],
      "answer": [
        "What",
        "is",
        "she",
        "reading",
        "?"
      ]
    },
    {
      "id": "cq11",
      "kind": "choice",
      "prompt": "___ are they going? — To school. (Họ đang đi đâu?)",
      "hint": "Câu trả lời là một nơi chốn.",
      "explanation": "Where hỏi địa điểm.",
      "options": [
        "Where",
        "What",
        "Who"
      ],
      "answer": "Where"
    },
    {
      "id": "cq12",
      "kind": "grid",
      "prompt": "Giữ V-ing và đặt từ hỏi trước be.",
      "hint": "Từ hỏi + be + chủ ngữ + V-ing.",
      "explanation": "Ba câu hỏi Wh đều đúng cấu trúc tiếp diễn.",
      "rows": [
        {
          "cue": "Bạn đang làm gì?",
          "options": [
            "What are you doing?",
            "What you are doing?",
            "Do you doing what?"
          ],
          "answer": "What are you doing?",
          "completed": "What are you doing?"
        },
        {
          "cue": "Cô ấy đang đi đâu?",
          "options": [
            "Where is she going?",
            "Where she is going?",
            "Does she going where?"
          ],
          "answer": "Where is she going?",
          "completed": "Where is she going?"
        },
        {
          "cue": "Tại sao họ đang chạy?",
          "options": [
            "Why are they running?",
            "Why they are running?",
            "Do they running why?"
          ],
          "answer": "Why are they running?",
          "completed": "Why are they running?"
        }
      ]
    },
    {
      "id": "cq13",
      "kind": "grid",
      "prompt": "Đặt not sau đúng dạng be; có thể dùng dạng đầy đủ hoặc rút gọn.",
      "hint": "I dùng am not/I’m not; they dùng are not.",
      "explanation": "Các câu phủ định giữ nguyên động từ thêm -ing.",
      "rows": [
        {
          "cue": "Lúc này tôi không đọc.",
          "options": [
            "I am not reading now.",
            "I do not reading now.",
            "I am not read now."
          ],
          "answer": "I am not reading now.",
          "completed": "I am not reading now."
        },
        {
          "cue": "Lúc này tôi không ngủ.",
          "options": [
            "I’m not sleeping now.",
            "I don’t sleeping now.",
            "I’m not sleep now."
          ],
          "answer": "I’m not sleeping now.",
          "completed": "I’m not sleeping now."
        },
        {
          "cue": "Lúc này họ không chơi.",
          "options": [
            "They are not playing now.",
            "They do not playing now.",
            "They are not play now."
          ],
          "answer": "They are not playing now.",
          "completed": "They are not playing now."
        }
      ]
    },
    {
      "id": "cq14",
      "kind": "choice",
      "prompt": "Câu nào có nghĩa “Ai đang nói?”",
      "hint": "Khi who chính là chủ ngữ, dùng Who + is + V-ing.",
      "explanation": "Who is talking? hỏi trực tiếp người đang thực hiện hành động.",
      "options": [
        "Who is talking?",
        "Who are they talking?",
        "Does who talking?"
      ],
      "answer": "Who is talking?"
    }
  ],
  "continuous-uses": [
    {
      "id": "cu1",
      "kind": "sort",
      "prompt": "Mỗi câu dùng hiện tại tiếp diễn vì lý do nào?",
      "hint": "now, this week và changing là những dấu hiệu về ngữ cảnh.",
      "explanation": "Hiện tại tiếp diễn có ba cách dùng, không chỉ một việc đang xảy ra đúng lúc nói.",
      "buckets": [
        "Ngay lúc này",
        "Tạm thời",
        "Đang thay đổi"
      ],
      "items": [
        {
          "text": "Lan is reading now.",
          "bucket": "Ngay lúc này"
        },
        {
          "text": "I am working at home this week.",
          "bucket": "Tạm thời"
        },
        {
          "text": "The weather is changing.",
          "bucket": "Đang thay đổi"
        }
      ]
    },
    {
      "id": "cu2",
      "kind": "choice",
      "prompt": "Bạn nhìn thấy Nam đang mở cửa sổ ngay trước mặt; câu nào diễn tả đúng việc ấy?",
      "hint": "Hành động đang xảy ra trước mắt cần be + V-ing.",
      "explanation": "Nam is opening the window now. diễn tả hành động đang xảy ra đúng lúc nói.",
      "options": [
        "Nam opens the window every morning.",
        "Nam is opening the window now.",
        "Nam is near the window."
      ],
      "answer": "Nam is opening the window now."
    },
    {
      "id": "cu3",
      "kind": "match",
      "prompt": "Dấu hiệu không quyết định một mình, nhưng giúp hiểu ngữ cảnh.",
      "hint": "this month là một khoảng thời gian chưa dài.",
      "explanation": "Ngữ cảnh giúp ta chọn cách nhìn phù hợp.",
      "pairs": [
        {
          "left": "right now",
          "right": "ngay lúc này"
        },
        {
          "left": "this month",
          "right": "tạm thời quanh hiện tại"
        },
        {
          "left": "is changing",
          "right": "một sự thay đổi"
        }
      ]
    },
    {
      "id": "cu4",
      "kind": "context",
      "prompt": "Chọn câu nói về một tình huống tạm thời.",
      "hint": "Sự thay đổi chỉ kéo dài trong tuần này.",
      "explanation": "Toàn bộ ngữ cảnh, không chỉ cụm this week, cho thấy tình huống tạm thời.",
      "context": "Bình thường Mai làm ở văn phòng; riêng tuần này Mai làm ở nhà.",
      "options": [
        "Mai works at the office.",
        "Mai is working at home this week.",
        "Mai works at home every week."
      ],
      "answer": "Mai is working at home this week."
    },
    {
      "id": "cu5",
      "kind": "tap",
      "prompt": "Chạm vào câu diễn tả một quá trình đang thay đổi.",
      "hint": "Tìm câu cho thấy mức giá đang chuyển từ mức này sang mức khác.",
      "explanation": "Prices are rising. diễn tả giá cả đang tăng lên theo thời gian.",
      "tokens": [
        "The children are playing outside.",
        "Mai is staying with her aunt this month.",
        "Prices are rising."
      ],
      "answerIndexes": [
        2
      ],
      "selectionMode": "single"
    },
    {
      "id": "cu6",
      "kind": "choice",
      "prompt": "Bình thường chúng tôi làm ở văn phòng lớn; tháng này chúng tôi tạm thời dùng một văn phòng nhỏ.",
      "hint": "Cụm this month giới hạn tình huống trong một khoảng thời gian quanh hiện tại.",
      "explanation": "Hiện tại tiếp diễn thể hiện tình huống chỉ kéo dài quanh hiện tại.",
      "options": [
        "We use a small office every year.",
        "We are using a small office this month.",
        "We are small office this month."
      ],
      "answer": "We are using a small office this month."
    },
    {
      "id": "cu7",
      "kind": "context",
      "prompt": "Chọn câu diễn tả một thị trấn đang lớn dần lên.",
      "hint": "Một quá trình thay đổi đang diễn ra dùng be + V-ing.",
      "explanation": "The town is growing. diễn tả quá trình thị trấn đang phát triển.",
      "context": "Mỗi năm thị trấn có thêm nhiều nhà và nhiều người.",
      "options": [
        "The town grows every Tuesday.",
        "The town is growing.",
        "The town growing."
      ],
      "answer": "The town is growing."
    },
    {
      "id": "cu8",
      "kind": "choice",
      "prompt": "“I am working at home this month.” diễn tả gì?",
      "hint": "this month giới hạn tình huống trong một khoảng hiện tại.",
      "explanation": "Câu nhìn việc làm ở nhà như tình huống tạm thời.",
      "options": [
        "Thói quen vĩnh viễn",
        "Tình huống tạm thời",
        "Sự thật khoa học"
      ],
      "answer": "Tình huống tạm thời"
    },
    {
      "id": "cu9",
      "kind": "grid",
      "prompt": "Phân biệt ngay lúc này, tạm thời và đang thay đổi.",
      "hint": "Hãy nhìn ý nghĩa của toàn bộ tình huống.",
      "explanation": "Ba cách dùng tiếp diễn đã được phân biệt theo ngữ cảnh.",
      "rows": [
        {
          "cue": "Nam đang nói chuyện điện thoại trước mắt.",
          "options": [
            "Nam talks on the phone every day.",
            "Nam is talking on the phone now.",
            "Nam talking on the phone now."
          ],
          "answer": "Nam is talking on the phone now.",
          "completed": "Nam is talking on the phone now."
        },
        {
          "cue": "Mai tạm thời ở nhà dì trong tháng này.",
          "options": [
            "Mai stays with her aunt every summer.",
            "Mai is staying with her aunt this month.",
            "Mai staying with her aunt this month."
          ],
          "answer": "Mai is staying with her aunt this month.",
          "completed": "Mai is staying with her aunt this month."
        },
        {
          "cue": "Những ngày đang ấm dần lên.",
          "options": [
            "The days get warm every year.",
            "The days are getting warmer.",
            "The days getting warmer."
          ],
          "answer": "The days are getting warmer.",
          "completed": "The days are getting warmer."
        }
      ]
    },
    {
      "id": "cu10",
      "kind": "context",
      "prompt": "Chọn câu cho việc đang tiếp diễn quanh hiện tại.",
      "hint": "Việc đọc còn tiếp tục trong giai đoạn hiện tại dù không xảy ra đúng giây nói.",
      "explanation": "Hiện tại tiếp diễn có thể bao quát một quá trình quanh hiện tại.",
      "context": "Mai đang đọc một cuốn sách dài trong tuần này. Lúc nói câu này, Mai đang ăn tối; cuốn sách vẫn là dự án đọc chưa kết thúc.",
      "options": [
        "Mai reads the book every year.",
        "Mai is reading a long book this week.",
        "Mai is eating the book."
      ],
      "answer": "Mai is reading a long book this week."
    },
    {
      "id": "cu11",
      "kind": "choice",
      "prompt": "Câu nào nói một công việc ổn định dù có từ now?",
      "hint": "now ở đây nghĩa là giai đoạn hiện tại, còn công việc được xem là ổn định.",
      "explanation": "Từ thời gian chỉ là gợi ý; ý nghĩa của cả câu mới quyết định.",
      "options": [
        "I work at a bank now.",
        "I am working at home this week.",
        "The weather is changing."
      ],
      "answer": "I work at a bank now."
    },
    {
      "id": "cu12",
      "kind": "grid",
      "prompt": "Chọn câu cho biết một điều đang thay đổi dần.",
      "hint": "Tìm quá trình đang chuyển từ trạng thái này sang trạng thái khác.",
      "explanation": "Ba động từ khác nhau đều diễn tả sự thay đổi đang diễn ra.",
      "rows": [
        {
          "cue": "Thời tiết đang ấm dần lên.",
          "options": [
            "The weather is getting warmer.",
            "The weather gets warm every day.",
            "The weather getting warmer."
          ],
          "answer": "The weather is getting warmer.",
          "completed": "The weather is getting warmer."
        },
        {
          "cue": "Tiếng Anh của bạn đang tiến bộ.",
          "options": [
            "Your English is improving.",
            "Your English improves every Monday.",
            "Your English improving."
          ],
          "answer": "Your English is improving.",
          "completed": "Your English is improving."
        },
        {
          "cue": "Đứa trẻ đang lớn lên.",
          "options": [
            "The child is growing.",
            "The child grows every day now.",
            "The child growing."
          ],
          "answer": "The child is growing.",
          "completed": "The child is growing."
        }
      ]
    },
    {
      "id": "cu13",
      "kind": "match",
      "prompt": "Dấu hiệu giúp hiểu ngữ cảnh nhưng không tự quyết định thì.",
      "hint": "Đọc nghĩa của cả cụm thời gian.",
      "explanation": "Ba dấu hiệu đã được gắn với ngữ cảnh phù hợp.",
      "pairs": [
        {
          "left": "Look!",
          "right": "điều đang xảy ra trước mắt"
        },
        {
          "left": "at the moment",
          "right": "ngay lúc này"
        },
        {
          "left": "this month",
          "right": "giai đoạn quanh hiện tại"
        }
      ]
    }
  ],
  "simple-vs-continuous": [
    {
      "id": "sc1",
      "kind": "sort",
      "prompt": "Phân loại thói quen và khoảnh khắc đang diễn ra.",
      "hint": "every day/Mondays gợi sự lặp lại; now/this week gợi tình huống đang diễn ra.",
      "explanation": "Bạn đã chọn thì theo cách nhìn, không chỉ theo hình thức.",
      "buckets": [
        "Thói quen / sự thật",
        "Đang diễn ra / tạm thời"
      ],
      "items": [
        {
          "text": "Lan reads every day.",
          "bucket": "Thói quen / sự thật"
        },
        {
          "text": "Lan is reading now.",
          "bucket": "Đang diễn ra / tạm thời"
        },
        {
          "text": "They work on Mondays.",
          "bucket": "Thói quen / sự thật"
        },
        {
          "text": "They are working at home this week.",
          "bucket": "Đang diễn ra / tạm thời"
        }
      ]
    },
    {
      "id": "sc2",
      "kind": "choice",
      "prompt": "Bình thường Nam đi xe buýt, nhưng ngay lúc này Nam đang đi bộ.",
      "hint": "Ta đang nhìn hành động ngay lúc này.",
      "explanation": "is walking là hiện tại tiếp diễn.",
      "options": [
        "Nam walks every day.",
        "Nam is walking now.",
        "Nam walking now."
      ],
      "answer": "Nam is walking now."
    },
    {
      "id": "sc3",
      "kind": "match",
      "prompt": "Mỗi câu diễn tả thời gian theo một cách khác nhau.",
      "hint": "Nhìn dạng động từ và cụm thời gian.",
      "explanation": "Hiện tại đơn và tiếp diễn không thay nhau tùy ý.",
      "pairs": [
        {
          "left": "việc lặp lại mỗi ngày",
          "right": "I read every day."
        },
        {
          "left": "việc đang xảy ra",
          "right": "I am reading now."
        },
        {
          "left": "tình huống tạm thời",
          "right": "I am studying at home this week."
        }
      ]
    },
    {
      "id": "sc4",
      "kind": "tap",
      "prompt": "Chạm vào cụm động từ diễn tả khoảnh khắc hiện tại.",
      "hint": "Việc đang mở ra dùng be + V-ing.",
      "explanation": "is reading diễn tả hành động đang xảy ra.",
      "tokens": [
        "reads",
        "is reading"
      ],
      "answerIndexes": [
        1
      ],
      "selectionMode": "single"
    },
    {
      "id": "sc5",
      "kind": "tap",
      "prompt": "Chạm vào câu nói về một lịch làm việc lặp lại.",
      "hint": "On Mondays cho thấy sự việc lặp lại vào mỗi thứ Hai.",
      "explanation": "They work on Mondays. dùng hiện tại đơn cho lịch lặp lại.",
      "tokens": [
        "They work on Mondays.",
        "They are working at home today."
      ],
      "answerIndexes": [
        0
      ],
      "selectionMode": "single"
    },
    {
      "id": "sc6",
      "kind": "choice",
      "prompt": "Lan đọc mỗi ngày, nhưng ngay lúc này Lan đang nói chuyện.",
      "hint": "Câu hỏi nhắm tới hành động đang xảy ra ngay lúc này.",
      "explanation": "Lan is talking now. dùng hiện tại tiếp diễn cho tình huống hiện tại.",
      "options": [
        "Lan reads every day.",
        "Lan is talking now.",
        "Lan talks every day."
      ],
      "answer": "Lan is talking now."
    },
    {
      "id": "sc7",
      "kind": "context",
      "prompt": "Chọn câu đúng với ngữ cảnh.",
      "hint": "Đây là một thói quen lặp lại.",
      "explanation": "Hiện tại đơn phù hợp với khuôn lặp.",
      "context": "Đây là lịch đi lại ổn định của Nam: Nam đi xe buýt vào mọi ngày làm việc.",
      "options": [
        "Nam takes the bus every day.",
        "Nam is taking the bus every day.",
        "Nam taking the bus."
      ],
      "answer": "Nam takes the bus every day."
    },
    {
      "id": "sc8",
      "kind": "choice",
      "prompt": "Ngay lúc này tôi đang đọc.",
      "hint": "Cần am + reading.",
      "explanation": "I am reading now. là hiện tại tiếp diễn.",
      "options": [
        "I read now.",
        "I am reading now.",
        "I reading now."
      ],
      "answer": "I am reading now."
    },
    {
      "id": "sc9",
      "kind": "grid",
      "prompt": "Thói quen dùng hiện tại đơn; việc đang diễn ra dùng tiếp diễn.",
      "hint": "Không chọn bằng một từ riêng lẻ; hãy xác định cách người nói nhìn hành động.",
      "explanation": "Hiện tại đơn và tiếp diễn đã được chọn đúng theo ý nghĩa.",
      "rows": [
        {
          "cue": "Nam đi bộ đến trường mỗi ngày như một thói quen.",
          "options": [
            "Nam walks to school every day.",
            "Nam is walking to school every day.",
            "Nam walking to school every day."
          ],
          "answer": "Nam walks to school every day.",
          "completed": "Nam walks to school every day."
        },
        {
          "cue": "Nam đang đi bộ đến trường ngay lúc này.",
          "options": [
            "Nam walks to school now.",
            "Nam is walking to school now.",
            "Nam walking to school now."
          ],
          "answer": "Nam is walking to school now.",
          "completed": "Nam is walking to school now."
        },
        {
          "cue": "Tháng này Mai tạm thời học ở thư viện.",
          "options": [
            "Mai studies at the library every month.",
            "Mai is studying at the library this month.",
            "Mai studying at the library this month."
          ],
          "answer": "Mai is studying at the library this month.",
          "completed": "Mai is studying at the library this month."
        }
      ]
    },
    {
      "id": "sc10",
      "kind": "choice",
      "prompt": "Bình thường Lan làm việc, nhưng hôm nay Lan không làm việc.",
      "hint": "Vế đầu là tình trạng thường lệ; vế sau là tình huống hôm nay.",
      "explanation": "Mỗi vế dùng cách phủ định phù hợp với điều muốn nói.",
      "options": [
        "Lan doesn’t work, but she is working today.",
        "Lan works, but she isn’t working today.",
        "Lan is work, but she doesn’t working today."
      ],
      "answer": "Lan works, but she isn’t working today."
    },
    {
      "id": "sc11",
      "kind": "choice",
      "prompt": "Bạn hỏi về thói quen đọc mỗi ngày.",
      "hint": "Thói quen hiện tại đơn dùng Do.",
      "explanation": "Do you read every day? hỏi về việc lặp lại.",
      "options": [
        "Do you read every day?",
        "Are you reading every day right now?",
        "Are you read every day?"
      ],
      "answer": "Do you read every day?"
    },
    {
      "id": "sc12",
      "kind": "choice",
      "prompt": "Câu nào nói “Tuần này tôi đang làm việc mỗi ngày” như một giai đoạn tạm thời?",
      "hint": "Cả cụm this week cho biết lịch này chỉ tạm thời.",
      "explanation": "every day có thể xuất hiện trong tiếp diễn khi toàn bộ giai đoạn là tạm thời.",
      "options": [
        "I working every day this week.",
        "I am working every day this week.",
        "I am work every day this week."
      ],
      "answer": "I am working every day this week."
    },
    {
      "id": "sc13",
      "kind": "grid",
      "prompt": "Kiểm tra câu kể, phủ định và câu hỏi.",
      "hint": "Xác định điều câu muốn nói rồi chọn đúng cấu trúc.",
      "explanation": "Ba dạng câu cho thấy hai thì là hai hệ thống hoàn chỉnh.",
      "rows": [
        {
          "cue": "Thói quen: cô ấy đọc mỗi tối",
          "options": [
            "She reads every evening.",
            "She is reading every evening now.",
            "She read every evening."
          ],
          "answer": "She reads every evening.",
          "completed": "She reads every evening."
        },
        {
          "cue": "Lúc này: cô ấy không đọc",
          "options": [
            "She isn’t reading now.",
            "She doesn’t read now.",
            "She not reading now."
          ],
          "answer": "She isn’t reading now.",
          "completed": "She isn’t reading now."
        },
        {
          "cue": "Hỏi việc đang xảy ra",
          "options": [
            "Is she reading now?",
            "Does she reading now?",
            "Is she read now?"
          ],
          "answer": "Is she reading now?",
          "completed": "Is she reading now?"
        }
      ]
    }
  ],
  "states-and-plans": [
    {
      "id": "sp1",
      "kind": "sort",
      "prompt": "Động từ nào thường là trạng thái, động từ nào là hành động?",
      "hint": "Suy nghĩ và nhu cầu thường là trạng thái.",
      "explanation": "Động từ trạng thái thường dùng ở hiện tại đơn.",
      "buckets": [
        "Trạng thái",
        "Hành động"
      ],
      "items": [
        {
          "text": "`know` · biết",
          "bucket": "Trạng thái"
        },
        {
          "text": "`want` · muốn",
          "bucket": "Trạng thái"
        },
        {
          "text": "`run` · chạy",
          "bucket": "Hành động"
        },
        {
          "text": "`read` · đọc",
          "bucket": "Hành động"
        }
      ]
    },
    {
      "id": "sp2",
      "kind": "choice",
      "prompt": "Tôi biết câu trả lời.",
      "hint": "know là động từ trạng thái.",
      "explanation": "Ta thường không dùng know ở dạng tiếp diễn.",
      "options": [
        "I am knowing the answer.",
        "I know the answer.",
        "I knowing the answer."
      ],
      "answer": "I know the answer."
    },
    {
      "id": "sp4",
      "kind": "tap",
      "prompt": "Chạm vào động từ trạng thái.",
      "hint": "Từ nào diễn tả điều trong suy nghĩ?",
      "explanation": "know là động từ trạng thái.",
      "tokens": [
        "run",
        "know",
        "read",
        "play"
      ],
      "answerIndexes": [
        1
      ],
      "selectionMode": "single"
    },
    {
      "id": "sp6",
      "kind": "repair",
      "prompt": "Sửa động từ trạng thái.",
      "hint": "know thường không dùng ở dạng tiếp diễn.",
      "explanation": "I know the answer. là câu tự nhiên.",
      "tokens": [
        "I",
        "am knowing",
        "the answer",
        "."
      ],
      "targetIndex": 1,
      "replacements": [
        "am knowing",
        "know",
        "knowing"
      ],
      "answer": "know"
    },
    {
      "id": "sp8",
      "kind": "choice",
      "prompt": "Cô ấy muốn trà.",
      "hint": "want là động từ trạng thái; she dùng wants.",
      "explanation": "She wants tea. là câu tự nhiên.",
      "options": [
        "She is wanting tea.",
        "She wants tea.",
        "She wanting tea."
      ],
      "answer": "She wants tea."
    },
    {
      "id": "sv6",
      "kind": "match",
      "prompt": "Nhận ra các nhóm ý nghĩa.",
      "hint": "Đọc nghĩa tiếng Việt.",
      "explanation": "Bốn động từ đều diễn tả trạng thái trong nghĩa đang học.",
      "pairs": [
        {
          "left": "know",
          "right": "biết — suy nghĩ"
        },
        {
          "left": "like",
          "right": "thích — cảm xúc"
        },
        {
          "left": "need",
          "right": "cần — nhu cầu"
        },
        {
          "left": "own",
          "right": "sở hữu — quan hệ"
        }
      ]
    },
    {
      "id": "sv7",
      "kind": "choice",
      "prompt": "Bây giờ tôi hiểu rồi.",
      "hint": "understand là trạng thái trong câu này.",
      "explanation": "Now không bắt buộc hiện tại tiếp diễn.",
      "options": [
        "I understand now.",
        "I am understanding now.",
        "I understanding now."
      ],
      "answer": "I understand now."
    },
    {
      "id": "sv8",
      "kind": "context",
      "prompt": "Chọn theo nghĩa của think.",
      "hint": "Ở đây think là hoạt động suy nghĩ đang diễn ra.",
      "explanation": "Cùng động từ think nhưng nghĩa hành động cho phép dạng tiếp diễn.",
      "context": "Ngay lúc này tôi đang cân nhắc câu trả lời, không chỉ nêu ý kiến.",
      "options": [
        "I think about the answer every day.",
        "I am thinking about the answer now.",
        "I am think about the answer."
      ],
      "answer": "I am thinking about the answer now."
    },
    {
      "id": "sv9",
      "kind": "grid",
      "prompt": "Trạng thái dùng dạng đơn; hành động đang diễn ra có thể dùng tiếp diễn.",
      "hint": "Xác định động từ đang nêu trạng thái hay một hoạt động.",
      "explanation": "Mỗi câu được chọn theo nghĩa thực tế của động từ.",
      "rows": [
        {
          "cue": "Tôi biết câu trả lời.",
          "options": [
            "I know the answer.",
            "I am knowing the answer.",
            "I knowing the answer."
          ],
          "answer": "I know the answer.",
          "completed": "I know the answer."
        },
        {
          "cue": "Cô ấy cần giúp đỡ.",
          "options": [
            "She needs help.",
            "She is needing help.",
            "She need help."
          ],
          "answer": "She needs help.",
          "completed": "She needs help."
        },
        {
          "cue": "Tôi đang suy nghĩ về câu trả lời.",
          "options": [
            "I am thinking about the answer.",
            "I think the answer now.",
            "I am think about the answer."
          ],
          "answer": "I am thinking about the answer.",
          "completed": "I am thinking about the answer."
        }
      ]
    },
    {
      "id": "sv10",
      "kind": "grid",
      "prompt": "Chọn hiện tại đơn khi câu nói về sở hữu, mối liên hệ hoặc điều nhìn thấy.",
      "hint": "Xác định xem động từ đang nói một trạng thái hay hoạt động.",
      "explanation": "Have, belong to và see đều dùng hiện tại đơn trong các nghĩa của ba câu này.",
      "rows": [
        {
          "cue": "Họ có một ngôi nhà.",
          "options": [
            "They have a house.",
            "They are having a house.",
            "They has a house."
          ],
          "answer": "They have a house.",
          "completed": "They have a house."
        },
        {
          "cue": "Quyển sách này thuộc về Lan.",
          "options": [
            "This book belongs to Lan.",
            "This book is belonging to Lan.",
            "This book belong to Lan."
          ],
          "answer": "This book belongs to Lan.",
          "completed": "This book belongs to Lan."
        },
        {
          "cue": "Tôi nhìn thấy một con mèo.",
          "options": [
            "I see a cat.",
            "I am seeing a cat.",
            "I seeing a cat."
          ],
          "answer": "I see a cat.",
          "completed": "I see a cat."
        }
      ]
    },
    {
      "id": "sv11",
      "kind": "grid",
      "prompt": "Dùng hiện tại đơn cho niềm tin, cảm xúc và giác quan.",
      "hint": "Trong ba câu này, động từ nói một trạng thái đang tồn tại.",
      "explanation": "Believe, love và hear đã được dùng ở hiện tại đơn theo đúng nghĩa.",
      "rows": [
        {
          "cue": "Tôi tin bạn.",
          "options": [
            "I believe you.",
            "I am believing you.",
            "I believing you."
          ],
          "answer": "I believe you.",
          "completed": "I believe you."
        },
        {
          "cue": "Cô ấy yêu âm nhạc.",
          "options": [
            "She loves music.",
            "She is loving music.",
            "She love music."
          ],
          "answer": "She loves music.",
          "completed": "She loves music."
        },
        {
          "cue": "Tôi nghe thấy một âm thanh.",
          "options": [
            "I hear a sound.",
            "I am hearing a sound.",
            "I hearing a sound."
          ],
          "answer": "I hear a sound.",
          "completed": "I hear a sound."
        }
      ]
    }
  ],
};

const a1Chapter09TopUps: Partial<Record<string, Exercise[]>> = {
  "continuous-form": [
    ...binaryChoiceDrills("a1cfx", 1, "be + V-ing", [
      ["`I` đang đọc", "I am reading.", "I is reading.", "`I` đi với `am`."],
      ["em bé đang ngủ", "The baby is sleeping.", "The baby are sleeping.", "Chủ ngữ số ít dùng `is`."],
      ["chúng tôi đang chờ", "We are waiting.", "We is waiting.", "`We` đi với `are`."],
      ["dạng `-ing` của `work`", "working", "work", "Phần lớn động từ chỉ thêm `-ing`."],
      ["dạng `-ing` của `make`", "making", "makes", "Bỏ `e` câm rồi thêm `-ing`."],
      ["dạng `-ing` của `write`", "writing", "writes", "Bỏ `e` câm."],
      ["dạng `-ing` của `run`", "running", "runs", "Động từ ngắn gấp đôi phụ âm cuối."],
      ["dạng `-ing` của `swim`", "swimming", "swims", "Gấp đôi `m` trước `-ing`."],
      ["dạng `-ing` của `play`", "playing", "plays", "Không gấp đôi `y`; chỉ thêm `-ing`."],
      ["dạng `-ing` của `fix`", "fixing", "fixes", "Không gấp đôi `x`."],
      ["dạng `-ing` của `lie`", "lying", "lies", "Đổi `ie` thành `y` rồi thêm `-ing`."],
      ["dạng `-ing` của `see`", "seeing", "sees", "`See` giữ hai chữ `e` rồi thêm `-ing`."],
      ["dạng viết tắt của `she is cooking`", "She's cooking.", "She cooking.", "`She's` chứa `is`; cấu trúc vẫn đủ `be + V-ing`."],
      ["cấu trúc đủ hai phần", "They are studying.", "They studying.", "Hiện tại tiếp diễn cần cả `are` và `studying`."],
    ]),
  ],
  "continuous-questions": [
    ...binaryChoiceDrills("a1cqx", 1, "phủ định và câu hỏi hiện tại tiếp diễn", [
      ["phủ định `I am working`", "I'm not working.", "I don't working.", "Đặt `not` sau `am`; dạng tự nhiên là `I'm not`."],
      ["phủ định `she is sleeping`", "She isn't sleeping.", "She doesn't sleeping.", "`Is` nhận `not` trực tiếp."],
      ["phủ định `they are waiting`", "They aren't waiting.", "They don't waiting.", "`Are` nhận `not` trực tiếp."],
      ["câu hỏi về người nghe đang đọc", "Are you reading?", "Do you reading?", "Đưa `are` lên trước chủ ngữ."],
      ["câu hỏi về Lan đang học", "Is Lan studying?", "Does Lan studying?", "Đưa `is` lên trước Lan."],
      ["câu trả lời khẳng định cho `Are you waiting?`", "Yes, I am.", "Yes, I'm.", "Không rút gọn câu trả lời khẳng định thành `I'm`."],
      ["câu trả lời phủ định cho `Is he working?`", "No, he isn't.", "No, he doesn't.", "Câu hỏi dùng `is` nên trả lời bằng `isn't`."],
      ["hỏi người nghe đang đọc gì", "What are you reading?", "What do you reading?", "Từ hỏi đứng trước `are`."],
      ["hỏi tại sao cô ấy đang rời đi", "Why is she leaving?", "Why does she leaving?", "Dùng `why + is + she + leaving`."],
      ["hỏi ai đang gọi", "Who is calling?", "Who does calling?", "`Who` là chủ ngữ; dùng `is + V-ing`."],
      ["dạng phủ định rút gọn tự nhiên của `I am late`", "I'm not late.", "I'm late.", "Tiếng Anh chuẩn thông dụng dùng `I'm not` cho dạng phủ định rút gọn."],
    ]),
  ],
  "continuous-uses": [
    ...binaryChoiceDrills("a1ucx", 1, "ba cách dùng hiện tại tiếp diễn", [
      ["hành động đúng lúc nói", "Look! The dog is running.", "Look! The dog runs every day.", "Lời gọi chú ý và hành động đang thấy phù hợp tiếp diễn."],
      ["việc đang xảy ra ngay bây giờ", "I'm talking to you now.", "I talk to you every day now.", "`Now` cùng tình huống đang diễn ra dùng tiếp diễn."],
      ["quá trình đọc trong tuần này", "I'm reading a long book this week.", "I read a long book every week.", "Dự án chưa kết thúc trong giai đoạn hiện tại dùng tiếp diễn."],
      ["nơi ở tạm thời trong tháng", "Lan is staying with her aunt this month.", "Lan stays with her aunt every month.", "`This month` được nhìn như tình huống tạm thời."],
      ["một tình huống làm việc tạm thời", "We are working at home for a few days.", "We work at home every Friday.", "Tình huống vài ngày là tạm thời; `every Friday` lại diễn tả thói quen."],
      ["thời tiết đang ấm dần", "The weather is getting warmer.", "The weather gets warmer every spring.", "Sự thay đổi đang tiến triển dùng tiếp diễn; câu còn lại nói điều lặp lại."],
      ["tiếng Anh đang tiến bộ", "Your English is improving.", "Your English improves every year.", "Một quá trình đang diễn ra dùng tiếp diễn; câu còn lại nói xu hướng lặp theo năm."],
      ["thị trấn đang phát triển", "The town is growing.", "The town grows every year.", "`Is growing` nhìn sự phát triển như quá trình đang diễn ra."],
      ["giá cả đang tăng", "Prices are going up.", "Prices goes up now.", "Chủ ngữ số nhiều dùng `are going`."],
      ["nơi ở ổn định", "I live in Hanoi.", "I am live in Hanoi.", "Nếu trình bày như nơi ở ổn định, dùng hiện tại đơn; không chèn `am` trước `live`."],
      ["giờ mở cửa theo lịch", "The museum opens at ten.", "The museum is opening at ten every day.", "Lịch thường lệ dùng hiện tại đơn."],
      ["hành động cửa hàng đang mở lúc này", "The shop is opening now.", "The shop opens at nine every day.", "Hành động đang xảy ra dùng tiếp diễn; câu còn lại nói lịch thường lệ."],
    ]),
  ],
  "simple-vs-continuous": [
    ...binaryChoiceDrills("a1scx", 1, "hiện tại đơn và hiện tại tiếp diễn", [
      ["Lan đọc mỗi tối", "Lan reads every evening.", "Lan is reading now.", "`Every evening` diễn tả thói quen; câu còn lại nói việc đang diễn ra."],
      ["Lan đang đọc ngay lúc này", "Lan is reading now.", "Lan reads every evening.", "`Now` chỉ hành động đang xảy ra; câu còn lại nói thói quen."],
      ["nơi ở ổn định với bố mẹ", "I live with my parents.", "I am live with my parents.", "Tình trạng ổn định dùng hiện tại đơn; không dùng `am + live`."],
      ["nơi ở tạm thời trong tháng", "I'm living with my aunt this month.", "I live with my aunt every summer.", "`This month` cho thấy tình huống tạm thời; câu còn lại nói việc lặp lại."],
      ["lịch tàu hằng ngày", "The train leaves at six every day.", "The train is leaving now.", "Lịch thường lệ dùng hiện tại đơn; câu còn lại nói việc đang xảy ra."],
      ["tàu đang rời ga", "The train is leaving now.", "The train leaves at six every day.", "`Now` chỉ quá trình hiện tại; câu còn lại nói lịch thường lệ."],
      ["thói quen làm việc ở nhà", "I usually work at home.", "I am work at home.", "`Usually` cùng thói quen dùng hiện tại đơn; không dùng `am + work`."],
      ["một tình huống làm việc tạm thời trong tuần này", "I'm working at home this week.", "I work at home every week.", "`This week` diễn tả tình huống tạm thời; câu còn lại nói việc lặp lại."],
      ["phủ định thói quen", "She doesn't work here.", "She isn't work here.", "Hiện tại đơn với động từ thường dùng `doesn't`."],
      ["phủ định việc đang xảy ra", "She isn't working now.", "She doesn't working now.", "Hiện tại tiếp diễn phủ định bằng `isn't + V-ing`."],
      ["câu hỏi về thói quen", "Does she work here?", "Is she work here?", "Hiện tại đơn dùng `does`."],
      ["câu hỏi về việc đang diễn ra", "Is she working now?", "Does she working now?", "Hiện tại tiếp diễn đảo `is`."],
    ]),
  ],
  "states-and-plans": [
    ...binaryChoiceDrills("a1svx", 1, "động từ trạng thái", [
      ["trạng thái hiểu câu hỏi", "I understand the question.", "I'm understanding the question.", "`Understand` thường dùng hiện tại đơn khi nói trạng thái hiểu."],
      ["trạng thái hiểu ngay bây giờ", "I understand now.", "I'm understanding now.", "`Understand` là trạng thái dù có `now`."],
      ["sở thích trà", "She likes tea.", "She's liking tea.", "`Like` mang nghĩa sở thích thường dùng hiện tại đơn."],
      ["mong muốn nước", "He wants water.", "He's wanting water.", "`Want` mang nghĩa trạng thái."],
      ["nhu cầu giúp đỡ", "We need help.", "We're needing help.", "`Need` thường dùng hiện tại đơn."],
      ["sở hữu một ngôi nhà", "They have a house.", "They're having a house.", "`Have` mang nghĩa sở hữu là trạng thái."],
      ["đồ vật thuộc về Lan", "The bag belongs to Lan.", "The bag is belonging to Lan.", "`Belong` thường không dùng tiếp diễn."],
      ["cảm nhận âm thanh", "I hear music.", "I'm hearing music right now.", "`Hear` chỉ cảm nhận tự nhiên thường dùng hiện tại đơn."],
      ["ý kiến", "I think you're right.", "I'm thinking you're right.", "`Think` mang nghĩa “cho rằng” thường dùng hiện tại đơn."],
      ["quá trình suy nghĩ", "I'm thinking about the problem.", "I think about the problem every day.", "`Think about` như hoạt động đang diễn ra có thể dùng tiếp diễn; câu còn lại nói thói quen."],
      ["hoạt động ăn trưa", "I'm having lunch.", "I have lunch at noon every day.", "`Have` mang nghĩa hoạt động ăn dùng được ở tiếp diễn; câu còn lại nói thói quen."],
      ["trạng thái món súp có vị ngon", "The soup tastes good.", "The soup is taste good.", "`Taste` là động từ nối chỉ đặc tính; không dùng `is + taste` ở đây."],
      ["hành động đầu bếp nếm súp", "The cook is tasting the soup.", "The cook tastes the soup every day.", "Khi `taste` là hành động đang diễn ra, tiếp diễn phù hợp."],
      ["hành động bác sĩ đang khám một bệnh nhân", "The doctor is seeing a patient now.", "The doctor sees patients every day.", "Câu có `now` nói một hoạt động đang diễn ra; câu còn lại nói công việc thường lệ."],
    ]),
  ],
};

const a1Chapter09DepthExtensions: Partial<Record<string, Exercise[]>> = {
  "continuous-form": [{
    id: "a1depth-cf-1", kind: "grid", prompt: "Chọn dạng `-ing` đúng của ba động từ có cách biến đổi khác nhau.",
    hint: "Kiểm tra lần lượt quy tắc đổi `ie`, gấp đôi phụ âm cuối và bỏ `e` câm.",
    explanation: "`Die` đổi thành `dying`, `sit` thành `sitting`, còn `come` thành `coming`.",
    rows: [
      { cue: "die", options: ["dying", "dies", "die"], answer: "dying", completed: "die → dying" },
      { cue: "sit", options: ["sitting", "sits", "sit"], answer: "sitting", completed: "sit → sitting" },
      { cue: "come", options: ["coming", "comes", "come"], answer: "coming", completed: "come → coming" },
    ],
  }],
  "continuous-questions": [{
    id: "a1depth-cq-1", kind: "grid", prompt: "Chọn cách đổi câu tiếp diễn sang phủ định, câu hỏi có/không hoặc câu hỏi có từ hỏi.",
    hint: "Giữ nguyên động từ `-ing`; chỉ đặt `not` sau `be` hoặc đưa `be` lên trước chủ ngữ.",
    explanation: "Ba câu đều giữ `V-ing` và thay đổi đúng vị trí của `be`.",
    rows: [
      { cue: "Phủ định: He is washing the car.", options: ["He isn't washing the car.", "He doesn't washing the car.", "He isn't wash the car."], answer: "He isn't washing the car.", completed: "He isn't washing the car." },
      { cue: "Câu hỏi: They are having lunch.", options: ["Are they having lunch?", "Do they having lunch?", "Are they have lunch?"], answer: "Are they having lunch?", completed: "Are they having lunch?" },
      { cue: "Hỏi nơi đến: She is going to the market.", options: ["Where is she going?", "Where does she going?", "Where she is going?"], answer: "Where is she going?", completed: "Where is she going?" },
    ],
  }],
  "continuous-uses": [
    {
      id: "a1depth-cu-1", kind: "sort", prompt: "Phân loại các câu mới theo ba cách dùng của hiện tại tiếp diễn.",
      hint: "Tìm xem hành động đang xảy ra trước mắt, kéo dài tạm thời quanh hiện tại hay biểu thị sự thay đổi.",
      explanation: "Mỗi nhóm thể hiện một cách nhìn thời gian khác nhau của hiện tại tiếp diễn.",
      buckets: ["Ngay lúc nói", "Tạm thời quanh hiện tại", "Đang thay đổi"],
      items: [
        { text: "Listen! Someone is singing.", bucket: "Ngay lúc nói" },
        { text: "The children are eating now.", bucket: "Ngay lúc nói" },
        { text: "I'm using my brother's laptop this week.", bucket: "Tạm thời quanh hiện tại" },
        { text: "Hoa is working in Da Nang this month.", bucket: "Tạm thời quanh hiện tại" },
        { text: "The days are getting longer.", bucket: "Đang thay đổi" },
        { text: "The river is becoming cleaner.", bucket: "Đang thay đổi" },
      ],
    },
    {
      id: "a1depth-cu-2", kind: "grid", prompt: "Chọn câu tiếp diễn phù hợp với từng ngữ cảnh và tránh chọn chỉ bằng một từ thời gian.",
      hint: "Đọc toàn bộ tình huống để xác định cách người nói nhìn sự việc.",
      explanation: "Ý nghĩa của tình huống, không phải một từ thời gian riêng lẻ, quyết định cách dùng.",
      rows: [
        { cue: "Ngay trước mắt, nước đang sôi.", options: ["The water is boiling.", "Water boils at 100°C.", "The water boil now."], answer: "The water is boiling.", completed: "The water is boiling." },
        { cue: "Tuần này lớp học tạm ở phòng khác.", options: ["We are studying in another room this week.", "We study there every week.", "We are study there this week."], answer: "We are studying in another room this week.", completed: "We are studying in another room this week." },
        { cue: "Khu phố đang trở nên đông hơn.", options: ["The neighbourhood is getting busier.", "The neighbourhood gets busy every morning.", "The neighbourhood getting busier."], answer: "The neighbourhood is getting busier.", completed: "The neighbourhood is getting busier." },
      ],
    },
  ],
  "simple-vs-continuous": [
    {
      id: "a1depth-sc-1", kind: "grid", prompt: "Chọn thì theo cách nhìn ổn định, tạm thời hoặc đang xảy ra trong từng tình huống.",
      hint: "Hỏi đây là điều thường đúng hay một quá trình có giới hạn quanh hiện tại.",
      explanation: "Hiện tại đơn nói điều thường lệ hoặc ổn định; tiếp diễn nói quá trình tạm thời hay đang xảy ra.",
      rows: [
        { cue: "Mai thường bán sách.", options: ["Mai sells books.", "Mai is selling books now.", "Mai selling books."], answer: "Mai sells books.", completed: "Mai sells books." },
        { cue: "Hôm nay Mai đang giúp ở quầy cà phê.", options: ["Mai is helping at the café today.", "Mai helps there every day.", "Mai is help there today."], answer: "Mai is helping at the café today.", completed: "Mai is helping at the café today." },
        { cue: "Ngay lúc này khách đang chờ.", options: ["The customers are waiting now.", "The customers wait every morning.", "The customers waiting now."], answer: "The customers are waiting now.", completed: "The customers are waiting now." },
      ],
    },
    {
      id: "a1depth-sc-2", kind: "sort", prompt: "Phân loại câu theo hiện tại đơn hoặc hiện tại tiếp diễn dựa trên ý nghĩa của cả câu.",
      hint: "Đừng quyết định chỉ bằng một trạng từ; hãy xác định sự việc là thường lệ hay đang diễn ra.",
      explanation: "Các câu được phân loại theo cách nhìn về sự việc, không theo một từ khóa duy nhất.",
      buckets: ["Hiện tại đơn", "Hiện tại tiếp diễn"],
      items: [
        { text: "My uncle drives a bus.", bucket: "Hiện tại đơn" },
        { text: "The library closes at six.", bucket: "Hiện tại đơn" },
        { text: "We need more chairs now.", bucket: "Hiện tại đơn" },
        { text: "My uncle is driving now.", bucket: "Hiện tại tiếp diễn" },
        { text: "The students are using the library this week.", bucket: "Hiện tại tiếp diễn" },
        { text: "The sky is getting darker.", bucket: "Hiện tại tiếp diễn" },
      ],
    },
    {
      id: "a1depth-sc-3", kind: "repair", prompt: "Chọn cụm động từ phù hợp với tình huống tạm thời trong tháng này.",
      hint: "Tình huống có giới hạn quanh hiện tại cần đủ `be + V-ing`.",
      explanation: "`Is working` trình bày công việc trong tháng này như một tình huống tạm thời.",
      tokens: ["Lan", "works", "in", "Hue", "this", "month", "."], targetIndex: 1,
      replacements: ["is working", "works", "work"], answer: "is working",
    },
  ],
  "states-and-plans": [
    {
      id: "a1depth-sv-1", kind: "sort", prompt: "Phân loại cách dùng của cùng một động từ theo nghĩa trạng thái hoặc hoạt động.",
      hint: "Đọc cả cụm động từ: trạng thái tồn tại khác với một hoạt động đang có quá trình.",
      explanation: "`Think`, `have` và `taste` có thể dùng ở hai thì khi nghĩa của chúng thay đổi.",
      buckets: ["Nghĩa trạng thái", "Nghĩa hoạt động"],
      items: [
        { text: "I think this answer is right.", bucket: "Nghĩa trạng thái" },
        { text: "We have two bicycles.", bucket: "Nghĩa trạng thái" },
        { text: "The sauce tastes sweet.", bucket: "Nghĩa trạng thái" },
        { text: "I'm thinking about your question.", bucket: "Nghĩa hoạt động" },
        { text: "We're having dinner.", bucket: "Nghĩa hoạt động" },
        { text: "The chef is tasting the sauce.", bucket: "Nghĩa hoạt động" },
      ],
    },
    {
      id: "a1depth-sv-2", kind: "grid", prompt: "Chọn thì theo nghĩa cụ thể của động từ trong từng câu.",
      hint: "Xác định động từ đang nói trạng thái hay một hoạt động đang diễn ra.",
      explanation: "Nghĩa trong ngữ cảnh quyết định thì, không phải bản thân hình thức từ đứng riêng.",
      rows: [
        { cue: "Tôi nhớ tên cô ấy.", options: ["I remember her name.", "I'm remembering her name.", "I remembering her name."], answer: "I remember her name.", completed: "I remember her name." },
        { cue: "Anh ấy đang cân nhắc lời đề nghị.", options: ["He's thinking about the offer.", "He thinks the offer every minute.", "He is think about the offer."], answer: "He's thinking about the offer.", completed: "He's thinking about the offer." },
        { cue: "Chiếc áo này thuộc về tôi.", options: ["This coat belongs to me.", "This coat is belonging to me.", "This coat belong to me."], answer: "This coat belongs to me.", completed: "This coat belongs to me." },
      ],
    },
  ],
};

export const a1Chapter09ExerciseData = mergeExerciseRecords(
  a1Chapter09BaseExerciseData,
  a1Chapter09TopUps,
  a1Chapter09DepthExtensions,
);
