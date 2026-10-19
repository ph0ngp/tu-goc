/* Luyện tập PRE-A1 — Chương 3: Động từ be. */
import type { Exercise } from "../../../exercise-types.ts";
import { choiceExercises, orderExercises, repairExercises, tapExercises } from "../../basic-builders.ts";

export const preA1Chapter03ExerciseData: Record<string, Exercise[]> = {
  "be-forms": [
    {
      "id": "b1",
      "kind": "match",
      "prompt": "Ghép mỗi nhóm chủ ngữ với dạng hiện tại của `be`.",
      "hint": "I là trường hợp duy nhất đi với am.",
      "explanation": "Ba nhóm chủ ngữ đã được ghép với đúng dạng be.",
      "pairs": [
        { "left": "I", "right": "am" },
        { "left": "he · she · it", "right": "is" },
        { "left": "you · we · they", "right": "are" }
      ]
    },
    {
      "id": "b2",
      "kind": "sort",
      "prompt": "Phân loại các chủ ngữ theo dạng `be` cần dùng.",
      "hint": "Xét I riêng; sau đó phân biệt nhóm số ít và nhóm dùng are.",
      "explanation": "Mỗi chủ ngữ đã được đặt vào đúng nhóm am, is hoặc are.",
      "buckets": ["am", "is", "are"],
      "items": [
        { "text": "I", "bucket": "am" },
        { "text": "he", "bucket": "is" },
        { "text": "she", "bucket": "is" },
        { "text": "it", "bucket": "is" },
        { "text": "you", "bucket": "are" },
        { "text": "we", "bucket": "are" },
        { "text": "they", "bucket": "are" }
      ]
    },
    {
      "id": "b3",
      "kind": "grid",
      "prompt": "Chọn `am`, `is` hoặc `are` cho từng đại từ chủ ngữ.",
      "hint": "Dùng bảng I–am; he/she/it–is; you/we/they–are.",
      "explanation": "Bảy đại từ đã đi với đúng dạng của be.",
      "rows": [
        { "cue": "I ___ ready.", "options": ["am", "is", "are"], "answer": "am", "completed": "I am ready." },
        { "cue": "He ___ here.", "options": ["am", "is", "are"], "answer": "is", "completed": "He is here." },
        { "cue": "She ___ happy.", "options": ["am", "is", "are"], "answer": "is", "completed": "She is happy." },
        { "cue": "It ___ small.", "options": ["am", "is", "are"], "answer": "is", "completed": "It is small." },
        { "cue": "You ___ ready.", "options": ["am", "is", "are"], "answer": "are", "completed": "You are ready." },
        { "cue": "We ___ here.", "options": ["am", "is", "are"], "answer": "are", "completed": "We are here." },
        { "cue": "They ___ students.", "options": ["am", "is", "are"], "answer": "are", "completed": "They are students." }
      ]
    },
    ...choiceExercises("b", 4, [
      ["Dạng nào hoàn thành `I ___ ready`?", ["am", "is", "are"], "am", "I là chủ ngữ duy nhất dùng am.", "I am ready nghĩa là tôi sẵn sàng."],
      ["Dạng nào hoàn thành `You ___ here`?", ["am", "is", "are"], "are", "You luôn dùng are dù chỉ một hay nhiều người.", "You are here là câu đúng."],
      ["Dạng nào hoàn thành `She ___ a student`?", ["am", "is", "are"], "is", "She thuộc nhóm he/she/it.", "She is a student nghĩa là cô ấy là học sinh."],
    ]),
    ...tapExercises("b", 7, [
      ["Trong câu `The bag is heavy`, chọn dạng của `be`.", ["The bag", "is", "heavy"], [1], "Dạng be đứng ngay sau chủ ngữ.", "is là dạng của be đi với chủ ngữ số ít the bag."],
      ["Chọn tất cả chủ ngữ đi với `is`.", ["I", "he", "the cat", "the books"], [1, 2], "Tìm he/she/it hoặc chủ ngữ số ít.", "he và the cat đều dùng is."],
    ]),
    ...repairExercises("b", 9, [
      ["Trong câu đang cho, hãy thay dạng `be` để câu nói đúng về `she`.", ["She", "are", "ready", "."], 1, ["am", "is", "are"], "is", "She đi với is.", "She is ready là câu đúng."],
      ["Trong câu đang cho, hãy thay dạng `be` để khớp với `those boxes`.", ["Those boxes", "is", "new", "."], 1, ["am", "is", "are"], "are", "Those boxes là chủ ngữ số nhiều.", "Those boxes are new là câu đúng."],
    ]),
    ...orderExercises("b", 11, [
      ["Sắp xếp thành câu “Tôi ở đây”.", ["here", "am", "I", "."], ["I", "am", "here", "."], "Trong câu khẳng định, chủ ngữ đứng trước be.", "I am here nghĩa là tôi ở đây."],
      ["Sắp xếp thành câu “Lan và Nam đã sẵn sàng”.", ["ready", "Lan and Nam", "are", "."], ["Lan and Nam", "are", "ready", "."], "Hai tên nối bằng and tạo chủ ngữ số nhiều.", "Lan and Nam are ready là câu đúng."],
    ]),
    {
      "id": "b13",
      "kind": "match",
      "prompt": "Ghép mỗi chủ ngữ với đại từ có thể thay cho nó.",
      "hint": "Xét một hay nhiều và người hay vật.",
      "explanation": "Đại từ thay thế giúp chọn đúng is hoặc are.",
      "pairs": [
        { "left": "Lan", "right": "she" },
        { "left": "Nam", "right": "he" },
        { "left": "the book", "right": "it" },
        { "left": "the cats", "right": "they" }
      ]
    },
    {
      "id": "b14",
      "kind": "grid",
      "prompt": "Chọn dạng `be` theo tên riêng hoặc cụm danh từ làm chủ ngữ.",
      "hint": "Chủ ngữ số ít dùng is; chủ ngữ số nhiều dùng are.",
      "explanation": "Bốn chủ ngữ đã được xác định đúng số lượng.",
      "rows": [
        { "cue": "Mai ___ here.", "options": ["am", "is", "are"], "answer": "is", "completed": "Mai is here." },
        { "cue": "The dog ___ small.", "options": ["am", "is", "are"], "answer": "is", "completed": "The dog is small." },
        { "cue": "The students ___ ready.", "options": ["am", "is", "are"], "answer": "are", "completed": "The students are ready." },
        { "cue": "Mai and Hoa ___ here.", "options": ["am", "is", "are"], "answer": "are", "completed": "Mai and Hoa are here." }
      ]
    },
    ...choiceExercises("b", 15, [
      ["Dạng nào hoàn thành `This ___ new`?", ["am", "is", "are"], "is", "This chỉ một vật.", "This is new nghĩa là cái này mới."],
      ["Dạng nào hoàn thành `Those ___ small`?", ["am", "is", "are"], "are", "Those chỉ nhiều vật.", "Those are small nghĩa là những cái kia nhỏ."],
    ]),
    {
      "id": "b17",
      "kind": "sort",
      "prompt": "Phân loại các chủ ngữ số ít và số nhiều theo dạng `be`.",
      "hint": "I không xuất hiện trong hoạt động này; chỉ cần chọn is hoặc are.",
      "explanation": "Các chủ ngữ số ít dùng is; các chủ ngữ số nhiều dùng are.",
      "buckets": ["dùng is", "dùng are"],
      "items": [
        { "text": "that book", "bucket": "dùng is" },
        { "text": "these books", "bucket": "dùng are" },
        { "text": "Hoa", "bucket": "dùng is" },
        { "text": "Hoa and Minh", "bucket": "dùng are" },
        { "text": "the red bag", "bucket": "dùng is" },
        { "text": "the red bags", "bucket": "dùng are" }
      ]
    },
    {
      "id": "b18",
      "kind": "match",
      "prompt": "Ghép mỗi dạng đầy đủ với dạng rút gọn tương ứng.",
      "hint": "Dấu nháy thay cho những chữ bị lược.",
      "explanation": "Bảy dạng rút gọn giữ nguyên chủ ngữ và nghĩa của be.",
      "pairs": [
        { "left": "I am", "right": "I'm" },
        { "left": "you are", "right": "you're" },
        { "left": "he is", "right": "he's" },
        { "left": "she is", "right": "she's" },
        { "left": "it is", "right": "it's" },
        { "left": "we are", "right": "we're" },
        { "left": "they are", "right": "they're" }
      ]
    },
    {
      "id": "b19",
      "kind": "grid",
      "prompt": "Chọn dạng rút gọn có cùng nghĩa với từng cụm đầy đủ.",
      "hint": "Giữ nguyên chủ ngữ và xác định am, is hoặc are.",
      "explanation": "Bốn cụm đã được rút gọn đúng.",
      "rows": [
        { "cue": "I am", "options": ["I'm", "it's", "we're"], "answer": "I'm", "completed": "I am = I'm" },
        { "cue": "she is", "options": ["she's", "we're", "I'm"], "answer": "she's", "completed": "she is = she's" },
        { "cue": "we are", "options": ["it's", "we're", "you're"], "answer": "we're", "completed": "we are = we're" },
        { "cue": "they are", "options": ["they're", "he's", "I'm"], "answer": "they're", "completed": "they are = they're" }
      ]
    },
    {
      "id": "b20",
      "kind": "tap",
      "prompt": "Chọn tất cả dạng được rút gọn từ cụm có `are`.",
      "hint": "Tìm dạng rút gọn của you are, we are và they are.",
      "explanation": "you're, we're và they're lần lượt được rút gọn từ you are, we are và they are.",
      "tokens": ["I'm", "you're", "she's", "we're", "they're"],
      "answerIndexes": [1, 3, 4],
      "selectionMode": "multiple"
    },
    {
      "id": "b21",
      "kind": "choice",
      "prompt": "Dạng rút gọn nào thay được `It is` trong `It is small`?",
      "hint": "it is rút gọn thành it's.",
      "explanation": "It's small có cùng nghĩa với It is small.",
      "options": ["I'm", "it's", "they're"],
      "answer": "it's"
    },
    ...repairExercises("b", 22, [
      ["Trong câu đang cho, hãy thay `is` để dạng `be` khớp với `we`.", ["We", "is", "at home", "."], 1, ["am", "is", "are"], "are", "We đi với are.", "We are at home là câu đúng."],
    ]),
    ...orderExercises("b", 23, [
      ["Sắp xếp thành câu “Chiếc hộp màu đỏ ấy còn mới”.", ["is", "The red box", "new", "."], ["The red box", "is", "new", "."], "The red box là một chủ ngữ số ít.", "The red box is new nghĩa là chiếc hộp màu đỏ ấy còn mới."],
    ]),
    {
      "id": "b24",
      "kind": "grid",
      "prompt": "Hoàn thành các câu khẳng định bằng dạng `be` phù hợp.",
      "hint": "Xác định toàn bộ chủ ngữ trước khi chọn.",
      "explanation": "Mỗi câu dùng đúng dạng be theo chủ ngữ.",
      "rows": [
        { "cue": "The room ___ clean.", "options": ["am", "is", "are"], "answer": "is", "completed": "The room is clean." },
        { "cue": "The chairs ___ here.", "options": ["am", "is", "are"], "answer": "are", "completed": "The chairs are here." },
        { "cue": "I ___ a student.", "options": ["am", "is", "are"], "answer": "am", "completed": "I am a student." },
        { "cue": "This book ___ old.", "options": ["am", "is", "are"], "answer": "is", "completed": "This book is old." }
      ]
    },
    {
      "id": "b25",
      "kind": "choice",
      "prompt": "Khi chưa biết dùng `is` hay `are` với một cụm danh từ, bước nào hữu ích nhất?",
      "hint": "Bài học đề nghị thay chủ ngữ bằng một đại từ.",
      "explanation": "Thay bằng it hoặc they giúp nhìn rõ chủ ngữ số ít hay số nhiều.",
      "options": ["Thay thử bằng it hoặc they", "Luôn chọn is", "Nhìn từ cuối câu"],
      "answer": "Thay thử bằng it hoặc they"
    },
    {
      "id": "b26",
      "kind": "match",
      "prompt": "Ghép mỗi chủ ngữ với mô tả đúng về số lượng và dạng `be`.",
      "hint": "Xác định chủ ngữ chỉ người nói, một đối tượng, hai người hay nhiều vật.",
      "explanation": "Mỗi chủ ngữ đã được ghép với một mô tả duy nhất về số lượng và dạng be.",
      "pairs": [
        { "left": "I", "right": "người nói — dùng am" },
        { "left": "The dog", "right": "một con vật — dùng is" },
        { "left": "Mai and An", "right": "hai người — dùng are" },
        { "left": "These bags", "right": "nhiều vật — dùng are" }
      ]
    },
    {
      "id": "b27",
      "kind": "tap",
      "prompt": "Trong câu `Lan and Nam are here`, chọn toàn bộ chủ ngữ.",
      "hint": "Câu đang nói về cả hai người.",
      "explanation": "Lan and Nam là chủ ngữ số nhiều nên dùng are.",
      "tokens": ["Lan", "and", "Nam", "are", "here"],
      "answerIndexes": [0, 1, 2],
      "selectionMode": "multiple"
    },
    {
      "id": "b28",
      "kind": "choice",
      "prompt": "Câu nào dùng đúng dạng `be` với cả ba chủ ngữ?",
      "hint": "Kiểm tra lần lượt I, the boy và the boys.",
      "explanation": "I am, the boy is và the boys are là ba cặp đúng.",
      "options": [
        "I am ready; the boy is here; the boys are happy.",
        "I is ready; the boy are here; the boys am happy.",
        "I are ready; the boy am here; the boys is happy."
      ],
      "answer": "I am ready; the boy is here; the boys are happy."
    },
    {
      "id": "b29",
      "kind": "grid",
      "prompt": "Chọn câu hoàn chỉnh dùng đúng dạng `be` cho từng nghĩa.",
      "hint": "Xét đại từ, số lượng và trật tự câu khẳng định.",
      "explanation": "Bốn câu kết hợp đúng chủ ngữ, be và phần thông tin phía sau.",
      "rows": [
        { "cue": "Tôi là Minh.", "options": ["I am Minh.", "I is Minh.", "I are Minh."], "answer": "I am Minh.", "completed": "I am Minh." },
        { "cue": "Cô ấy ở đây.", "options": ["She am here.", "She is here.", "She are here."], "answer": "She is here.", "completed": "She is here." },
        { "cue": "Những cái này mới.", "options": ["These is new.", "These are new.", "This are new."], "answer": "These are new.", "completed": "These are new." },
        { "cue": "Hoa và Mai sẵn sàng.", "options": ["Hoa and Mai is ready.", "Hoa and Mai are ready.", "Hoa and Mai am ready."], "answer": "Hoa and Mai are ready.", "completed": "Hoa and Mai are ready." }
      ]
    },
    {
      "id": "b30",
      "kind": "sort",
      "prompt": "Phân loại các cụm thành dạng đầy đủ hoặc dạng rút gọn.",
      "hint": "Dạng rút gọn có dấu nháy đơn.",
      "explanation": "Các cụm đã được phân loại theo hình thức viết, không theo nghĩa.",
      "buckets": ["Dạng đầy đủ", "Dạng rút gọn"],
      "items": [
        { "text": "I am", "bucket": "Dạng đầy đủ" },
        { "text": "I'm", "bucket": "Dạng rút gọn" },
        { "text": "she is", "bucket": "Dạng đầy đủ" },
        { "text": "she's", "bucket": "Dạng rút gọn" },
        { "text": "they are", "bucket": "Dạng đầy đủ" },
        { "text": "they're", "bucket": "Dạng rút gọn" }
      ]
    }
  ],
  "be-meanings": [
    {
      "id": "bm1",
      "kind": "sort",
      "prompt": "Phân loại các câu theo thông tin đứng sau `be`.",
      "hint": "Xác định phần sau be là tên gọi, đặc điểm hay nơi chốn.",
      "explanation": "Cùng một động từ be có thể nối chủ ngữ với ba loại thông tin.",
      "buckets": ["Tên gọi hoặc loại", "Đặc điểm", "Nơi chốn"],
      "items": [
        { "text": "I am Lan.", "bucket": "Tên gọi hoặc loại" },
        { "text": "She is a doctor.", "bucket": "Tên gọi hoặc loại" },
        { "text": "The room is clean.", "bucket": "Đặc điểm" },
        { "text": "We are tired.", "bucket": "Đặc điểm" },
        { "text": "Lan is at home.", "bucket": "Nơi chốn" },
        { "text": "The keys are on the table.", "bucket": "Nơi chốn" }
      ]
    },
    {
      "id": "bm2",
      "kind": "match",
      "prompt": "Ghép mỗi câu với cách hiểu tự nhiên bằng tiếng Việt.",
      "hint": "Đừng dịch riêng be; hãy đọc cả câu.",
      "explanation": "Bốn câu đã được hiểu theo loại thông tin đứng sau be.",
      "pairs": [
        { "left": "Minh is a student.", "right": "Minh là học sinh." },
        { "left": "The bag is heavy.", "right": "Chiếc túi nặng." },
        { "left": "The boys are outside.", "right": "Những cậu bé ở bên ngoài." },
        { "left": "She is from Vietnam.", "right": "Cô ấy đến từ Việt Nam." }
      ]
    },
    {
      "id": "bm3",
      "kind": "grid",
      "prompt": "Chọn loại thông tin mà phần sau `be` cung cấp trong từng câu.",
      "hint": "Hỏi: là ai/cái gì, như thế nào hay ở đâu?",
      "explanation": "Mỗi phần sau be đã được xác định đúng chức năng.",
      "rows": [
        { "cue": "Hoa is an artist.", "options": ["Tên gọi hoặc loại", "Đặc điểm", "Nơi chốn"], "answer": "Tên gọi hoặc loại", "completed": "an artist — nghề nghiệp" },
        { "cue": "The soup is hot.", "options": ["Tên gọi hoặc loại", "Đặc điểm", "Nơi chốn"], "answer": "Đặc điểm", "completed": "hot — đặc điểm" },
        { "cue": "The dog is in the garden.", "options": ["Tên gọi hoặc loại", "Đặc điểm", "Nơi chốn"], "answer": "Nơi chốn", "completed": "in the garden — nơi chốn" }
      ]
    },
    ...choiceExercises("bm", 4, [
      ["Câu nào cho biết Anna làm nghề bác sĩ?", ["Anna is a doctor.", "Anna is happy.", "Anna is at home."], "Anna is a doctor.", "Tìm câu có cụm nghề nghiệp a doctor.", "Anna is a doctor nghĩa là Anna là bác sĩ."],
      ["Cụm nào có thể đứng sau `She is` để nói “Cô ấy là một nghệ sĩ”?", ["a teacher", "an artist", "two artists"], "an artist", "Artist là nghề nghiệp số ít bắt đầu bằng âm nguyên âm.", "She is an artist là câu đúng."],
    ]),
    ...orderExercises("bm", 6, [
      ["Sắp xếp thành câu “Họ là học sinh”.", ["students", "They", "are", "."], ["They", "are", "students", "."], "Danh từ nghề nghiệp số nhiều không dùng a/an.", "They are students nghĩa là họ là học sinh."],
    ]),
    ...tapExercises("bm", 7, [
      ["Trong câu `He is a pilot`, chọn cụm cho biết nghề nghiệp.", ["He", "is", "a pilot"], [2], "Tìm phần đứng sau be cho biết anh ấy là gì.", "a pilot là cụm nghề nghiệp."],
    ]),
    ...choiceExercises("bm", 8, [
      ["Câu nào miêu tả chiếc áo là sạch?", ["The shirt is clean.", "The shirt is on the chair.", "The shirt is a uniform."], "The shirt is clean.", "Clean là tính từ chỉ đặc điểm.", "The shirt is clean nghĩa là chiếc áo sạch."],
    ]),
    ...orderExercises("bm", 9, [
      ["Sắp xếp thành câu “Những bông hoa đẹp”.", ["beautiful", "The flowers", "are", "."], ["The flowers", "are", "beautiful", "."], "Tính từ beautiful đứng sau are.", "The flowers are beautiful nghĩa là những bông hoa đẹp."],
    ]),
    ...tapExercises("bm", 10, [
      ["Trong câu `The water is cold`, chọn tính từ miêu tả.", ["The water", "is", "cold"], [2], "Tìm từ trả lời nước như thế nào.", "cold là tính từ nghĩa là lạnh."],
    ]),
    {
      "id": "bm11",
      "kind": "grid",
      "prompt": "Chọn câu tiếng Anh diễn đạt đúng số lượng và đặc điểm trong từng câu tiếng Việt.",
      "hint": "Tính từ không đổi; chỉ is/are thay đổi theo chủ ngữ.",
      "explanation": "Mỗi câu dùng đúng be và giữ nguyên tính từ.",
      "rows": [
        { "cue": "Con mèo này nhỏ.", "options": ["The cat is small.", "The cats are small.", "The cat is a student."], "answer": "The cat is small.", "completed": "The cat is small." },
        { "cue": "Những con mèo này nhỏ.", "options": ["The cat is small.", "The cats are small.", "The cats are at home."], "answer": "The cats are small.", "completed": "The cats are small." },
        { "cue": "Những chiếc hộp này nặng.", "options": ["The boxes are heavy.", "The box is heavy.", "The boxes are here."], "answer": "The boxes are heavy.", "completed": "The boxes are heavy." }
      ]
    },
    ...choiceExercises("bm", 12, [
      ["Câu nào cho biết những chiếc chìa khóa ở trên bàn?", ["The keys are new.", "The keys are on the table.", "The keys are objects."], "The keys are on the table.", "On the table là cụm chỉ nơi chốn.", "The keys are on the table nghĩa là những chiếc chìa khóa ở trên bàn."],
    ]),
    ...orderExercises("bm", 13, [
      ["Sắp xếp thành câu “Chúng tôi ở Hà Nội”.", ["in Hanoi", "We", "are", "."], ["We", "are", "in Hanoi", "."], "Cụm nơi chốn đứng sau are.", "We are in Hanoi nghĩa là chúng tôi ở Hà Nội."],
    ]),
    ...tapExercises("bm", 14, [
      ["Trong câu `The boys are outside`, chọn phần chỉ nơi chốn.", ["The boys", "are", "outside"], [2], "Tìm phần trả lời ở đâu.", "outside nghĩa là ở bên ngoài."],
    ]),
    {
      "id": "bm15",
      "kind": "grid",
      "prompt": "Chọn cụm nơi chốn phù hợp để hoàn thành từng câu.",
      "hint": "Đọc chủ ngữ và vị trí được yêu cầu.",
      "explanation": "Mỗi câu nối chủ ngữ với đúng nơi chốn.",
      "rows": [
        { "cue": "Lan is ___ — Lan ở nhà.", "options": ["at home", "happy", "a student"], "answer": "at home", "completed": "Lan is at home." },
        { "cue": "The cups are ___ — Những chiếc cốc ở trên bàn.", "options": ["clean", "on the table", "objects"], "answer": "on the table", "completed": "The cups are on the table." },
        { "cue": "I am ___ — Tôi ở đây.", "options": ["ready", "here", "Phong"], "answer": "here", "completed": "I am here." }
      ]
    },
    {
      "id": "bm16",
      "kind": "sort",
      "prompt": "Phân loại thêm các câu theo tên gọi, đặc điểm hoặc nơi chốn.",
      "hint": "Nhìn phần ngay sau be.",
      "explanation": "Sáu câu đã được phân loại theo thông tin chính.",
      "buckets": ["Tên gọi hoặc loại", "Đặc điểm", "Nơi chốn"],
      "items": [
        { "text": "It is a key.", "bucket": "Tên gọi hoặc loại" },
        { "text": "They are nurses.", "bucket": "Tên gọi hoặc loại" },
        { "text": "The coffee is hot.", "bucket": "Đặc điểm" },
        { "text": "The rooms are quiet.", "bucket": "Đặc điểm" },
        { "text": "The bus is here.", "bucket": "Nơi chốn" },
        { "text": "Mai and An are at school.", "bucket": "Nơi chốn" }
      ]
    },
    ...repairExercises("bm", 17, [
      ["Trong câu đang cho, hãy thay cụm nghề nghiệp để nói “Mia là một giáo viên”.", ["Mia", "is", "an artist", "."], 2, ["a teacher", "an artist", "at school"], "a teacher", "Một nghề nghiệp đếm được số ít cần a/an.", "Mia is a teacher là câu đúng."],
      ["Trong câu đang cho, hãy thay phần sau `are` để miêu tả những con mèo là nhỏ.", ["The cats", "are", "at home", "."], 2, ["small", "hungry", "outside"], "small", "Câu cần tính từ small, nghĩa là nhỏ.", "The cats are small là câu đúng."],
      ["Trong câu đang cho, hãy thay phần cuối để nói “Chúng tôi ở Hà Nội”.", ["We", "are", "ready", "."], 2, ["in Hanoi", "from Hanoi", "tired"], "in Hanoi", "Câu cần một cụm chỉ vị trí.", "We are in Hanoi nghĩa là chúng tôi ở Hà Nội."],
    ]),
    ...choiceExercises("bm", 20, [
      ["Câu nào nói đầy đủ “Tôi mười tuổi”?", ["I am ten years old.", "I am from Hanoi.", "It is ten o'clock."], "I am ten years old.", "Years old cho biết tuổi.", "I am ten years old nghĩa là tôi mười tuổi."],
    ]),
    ...orderExercises("bm", 21, [
      ["Sắp xếp thành câu “Lan mười một tuổi”.", ["eleven years old", "Lan", "is", "."], ["Lan", "is", "eleven years old", "."], "Tuổi đứng sau dạng be.", "Lan is eleven years old nghĩa là Lan mười một tuổi."],
    ]),
    ...choiceExercises("bm", 22, [
      ["Câu nào cho biết cô ấy đến từ Việt Nam?", ["She is in Vietnam.", "She is from Vietnam.", "She is happy."], "She is from Vietnam.", "From giới thiệu nguồn gốc.", "She is from Vietnam nghĩa là cô ấy đến từ Việt Nam."],
    ]),
    ...orderExercises("bm", 23, [
      ["Sắp xếp thành câu “Họ đến từ Huế”.", ["from Hue", "They", "are", "."], ["They", "are", "from Hue", "."], "From + nơi xuất thân đứng sau be.", "They are from Hue nghĩa là họ đến từ Huế."],
    ]),
    ...choiceExercises("bm", 24, [
      ["Câu nào nói “Hôm nay là thứ Hai”?", ["It is Monday.", "It is Tuesday.", "It is three o'clock."], "It is Monday.", "Tiếng Anh thường dùng It is khi nói ngày.", "It is Monday nghĩa là hôm nay là thứ Hai."],
      ["Câu nào nói “Bây giờ là ba giờ”?", ["It is three o'clock.", "I am three years old.", "It is four o'clock."], "It is three o'clock.", "O'clock cho biết giờ đúng; câu cần nói ba giờ chứ không nói tuổi hoặc bốn giờ.", "It is three o'clock nghĩa là bây giờ là ba giờ."],
    ]),
    {
      "id": "bm26",
      "kind": "sort",
      "prompt": "Phân loại các câu theo tuổi, nguồn gốc, ngày hoặc giờ.",
      "hint": "Tìm years old, from, tên ngày hoặc o'clock.",
      "explanation": "Bốn cách dùng mở rộng của be đã được phân biệt.",
      "buckets": ["Tuổi", "Nguồn gốc", "Ngày", "Giờ"],
      "items": [
        { "text": "He is nine years old.", "bucket": "Tuổi" },
        { "text": "We are from Da Nang.", "bucket": "Nguồn gốc" },
        { "text": "It is Friday.", "bucket": "Ngày" },
        { "text": "It is seven o'clock.", "bucket": "Giờ" }
      ]
    },
    {
      "id": "bm27",
      "kind": "match",
      "prompt": "Ghép mỗi phần sau `be` với loại thông tin nó cung cấp.",
      "hint": "Mỗi cụm chỉ một loại thông tin chính trong bài.",
      "explanation": "Nghề nghiệp, tính từ, vị trí, tuổi và nguồn gốc đã được phân biệt.",
      "pairs": [
        { "left": "a baker", "right": "nghề nghiệp" },
        { "left": "hungry", "right": "đặc điểm hoặc trạng thái" },
        { "left": "in the kitchen", "right": "nơi chốn" },
        { "left": "twelve years old", "right": "tuổi" },
        { "left": "from Japan", "right": "nguồn gốc" }
      ]
    },
    {
      "id": "bm28",
      "kind": "grid",
      "prompt": "Chọn câu diễn đạt đúng từng thông tin bằng `be`.",
      "hint": "Kiểm tra dạng be và loại phần đứng sau.",
      "explanation": "Mỗi câu dùng be đúng với ý nghĩa cần diễn đạt.",
      "rows": [
        { "cue": "Nam là một đầu bếp.", "options": ["Nam is a cook.", "Nam is hungry.", "Nam is in the kitchen."], "answer": "Nam is a cook.", "completed": "Nam is a cook." },
        { "cue": "Chiếc bánh nóng.", "options": ["The cake is hot.", "The cake is on the table.", "It is a cake."], "answer": "The cake is hot.", "completed": "The cake is hot." },
        { "cue": "Những chiếc đĩa ở trong bếp.", "options": ["The dishes are clean.", "The dishes are in the kitchen.", "The dishes are white."], "answer": "The dishes are in the kitchen.", "completed": "The dishes are in the kitchen." }
      ]
    },
    {
      "id": "bm29",
      "kind": "choice",
      "prompt": "Cách nào giúp dịch `be` tự nhiên nhất sang tiếng Việt?",
      "hint": "Cùng một is có thể xuất hiện trước nghề nghiệp, tính từ hoặc nơi chốn.",
      "explanation": "Cần đọc cả câu và xác định loại thông tin thay vì dịch riêng be.",
      "options": ["Đọc cả câu và xem thông tin phía sau", "Luôn dịch be là “là”", "Luôn bỏ phần sau be"],
      "answer": "Đọc cả câu và xem thông tin phía sau"
    },
    {
      "id": "bm30",
      "kind": "grid",
      "prompt": "Hoàn thành lượt tổng hợp bằng cách chọn câu khớp nhất với từng nghĩa.",
      "hint": "Phân biệt nghề nghiệp, đặc điểm, nơi chốn, tuổi và nguồn gốc.",
      "explanation": "Năm câu bao phủ các cách dùng chính của be trong bài.",
      "rows": [
        { "cue": "Tôi là học sinh.", "options": ["I am a student.", "I am happy.", "I am at school."], "answer": "I am a student.", "completed": "I am a student." },
        { "cue": "Cô ấy mệt.", "options": ["She is a nurse.", "She is tired.", "She is here."], "answer": "She is tired.", "completed": "She is tired." },
        { "cue": "Họ ở bên ngoài.", "options": ["They are outside.", "They are students.", "They are young."], "answer": "They are outside.", "completed": "They are outside." },
        { "cue": "Anh ấy tám tuổi.", "options": ["He is eight years old.", "He is from Hue.", "It is eight o'clock."], "answer": "He is eight years old.", "completed": "He is eight years old." },
        { "cue": "Chúng tôi đến từ Việt Nam.", "options": ["We are in Vietnam.", "We are from Vietnam.", "We are students."], "answer": "We are from Vietnam.", "completed": "We are from Vietnam." }
      ]
    }
  ],
  "be-negative": [
    {
      "id": "bn1",
      "kind": "choice",
      "prompt": "Câu nào có nghĩa “Cô ấy không muộn”?",
      "hint": "not đứng ngay sau is.",
      "explanation": "She is not late đặt not đúng ngay sau is.",
      "options": ["She is late.", "She is not late.", "They are not late."],
      "answer": "She is not late."
    },
    {
      "id": "bn2",
      "kind": "order",
      "prompt": "Sắp xếp thành câu “Họ không ở nhà”.",
      "hint": "Đặt not sau are.",
      "explanation": "They + are + not + at home.",
      "tokens": ["at home", "not", "They", "are", "."],
      "answer": ["They", "are", "not", "at home", "."]
    },
    {
      "id": "bn3",
      "kind": "match",
      "prompt": "Ghép mỗi dạng phủ định đầy đủ với dạng rút gọn tương ứng.",
      "hint": "Nhìn dạng be trong mỗi cụm.",
      "explanation": "Các dạng ngắn chỉ thay cách nói và viết, không đổi nghĩa.",
      "pairs": [
        { "left": "is not", "right": "isn't" },
        { "left": "are not", "right": "aren't" },
        { "left": "I am not", "right": "I'm not" }
      ]
    },
    {
      "id": "bn4",
      "kind": "tap",
      "prompt": "Trong câu `She is not late`, chọn từ tạo nghĩa phủ định.",
      "hint": "Từ nào mang nghĩa “không”?",
      "explanation": "not tạo câu phủ định.",
      "tokens": ["She", "is", "not", "late"],
      "answerIndexes": [2],
      "selectionMode": "single"
    },
    {
      "id": "bn5",
      "kind": "sort",
      "prompt": "Phân loại các câu thành khẳng định hoặc phủ định.",
      "hint": "Câu phủ định có not hoặc một dạng rút gọn chứa not.",
      "explanation": "Ba câu khẳng định và ba câu phủ định đã được tách đúng.",
      "buckets": ["Khẳng định", "Phủ định"],
      "items": [
        { "text": "I am ready.", "bucket": "Khẳng định" },
        { "text": "I am not ready.", "bucket": "Phủ định" },
        { "text": "The room is clean.", "bucket": "Khẳng định" },
        { "text": "The room isn't clean.", "bucket": "Phủ định" },
        { "text": "They are here.", "bucket": "Khẳng định" },
        { "text": "They aren't here.", "bucket": "Phủ định" }
      ]
    },
    {
      "id": "bn6",
      "kind": "grid",
      "prompt": "Chọn cụm phủ định phù hợp với từng chủ ngữ.",
      "hint": "I–am not; chủ ngữ số ít–is not; chủ ngữ số nhiều–are not.",
      "explanation": "Mỗi chủ ngữ đã đi với đúng dạng be rồi thêm not.",
      "rows": [
        { "cue": "I", "options": ["am not", "is not", "are not"], "answer": "am not", "completed": "I am not" },
        { "cue": "she", "options": ["am not", "is not", "are not"], "answer": "is not", "completed": "she is not" },
        { "cue": "the books", "options": ["am not", "is not", "are not"], "answer": "are not", "completed": "the books are not" },
        { "cue": "these", "options": ["am not", "is not", "are not"], "answer": "are not", "completed": "these are not" }
      ]
    },
    ...repairExercises("bn", 7, [
      ["Trong câu đang cho, hãy thay cụm ở giữa để đặt `not` đúng sau `is`.", ["The bag", "not is", "heavy", "."], 1, ["is", "is not", "not is"], "is not", "not đứng ngay sau is.", "The bag is not heavy là câu đúng."],
    ]),
    ...choiceExercises("bn", 8, [
      ["Dạng rút gọn nào thay cho `is not`?", ["isn't", "aren't", "I'm not"], "isn't", "Dạng cần chọn bắt đầu từ is.", "isn't là dạng rút gọn của is not."],
      ["Dạng rút gọn nào thay cho `are not`?", ["isn't", "aren't", "I'm not"], "aren't", "Dạng cần chọn bắt đầu từ are.", "aren't là dạng rút gọn của are not."],
      ["Câu nào là dạng rút gọn của `I am not ready`?", ["I'm not ready.", "He isn't ready.", "We aren't ready."], "I'm not ready.", "I am rút thành I'm rồi giữ not riêng.", "I'm not ready có cùng nghĩa với I am not ready."],
    ]),
    {
      "id": "bn11",
      "kind": "match",
      "prompt": "Ghép hai cách phủ định có cùng nghĩa.",
      "hint": "Một cách rút gọn be + not; cách kia rút gọn chủ ngữ + be.",
      "explanation": "Ba cặp chỉ khác hình thức rút gọn.",
      "pairs": [
        { "left": "She isn't busy.", "right": "She's not busy." },
        { "left": "He isn't tired.", "right": "He's not tired." },
        { "left": "They aren't here.", "right": "They're not here." }
      ]
    },
    {
      "id": "bn12",
      "kind": "grid",
      "prompt": "Chọn câu rút gọn giữ nguyên nghĩa của từng câu đầy đủ.",
      "hint": "is not → isn't; are not → aren't; I am not → I'm not.",
      "explanation": "Bốn câu đã được rút gọn mà không đổi nghĩa.",
      "rows": [
        { "cue": "I am not hungry.", "options": ["I'm not hungry.", "She isn't hungry.", "We aren't hungry."], "answer": "I'm not hungry.", "completed": "I'm not hungry." },
        { "cue": "He is not at home.", "options": ["He isn't at home.", "They aren't at home.", "He's at home."], "answer": "He isn't at home.", "completed": "He isn't at home." },
        { "cue": "We are not late.", "options": ["We're late.", "We aren't late.", "She isn't late."], "answer": "We aren't late.", "completed": "We aren't late." },
        { "cue": "The boxes are not heavy.", "options": ["The box isn't heavy.", "The boxes aren't heavy.", "The boxes are heavy."], "answer": "The boxes aren't heavy.", "completed": "The boxes aren't heavy." }
      ]
    },
    ...orderExercises("bn", 13, [
      ["Sắp xếp thành câu “Tôi chưa sẵn sàng” bằng dạng rút gọn.", ["ready", "I'm", "not", "."], ["I'm", "not", "ready", "."], "I'm = I am; not đứng sau am.", "I'm not ready nghĩa là tôi chưa sẵn sàng."],
    ]),
    {
      "id": "bn14",
      "kind": "tap",
      "prompt": "Chọn tất cả các câu phủ định.",
      "hint": "Tìm not, isn't hoặc aren't.",
      "explanation": "Ba câu được chọn đều phủ định một thông tin với be.",
      "tokens": ["The room is clean.", "I am not tired.", "She isn't here.", "They are students.", "We aren't late."],
      "answerIndexes": [1, 2, 4],
      "selectionMode": "multiple"
    },
    ...choiceExercises("bn", 15, [
      ["Câu nào nói “Anh ấy không phải là giáo viên”?", ["He is a teacher.", "He is not a teacher.", "They are not teachers."], "He is not a teacher.", "Cần he + is not + a teacher.", "He is not a teacher phủ định nghề nghiệp."],
      ["Câu nào nói “Chiếc áo không khô”?", ["The shirt is dry.", "The shirt isn't dry.", "The shirts aren't dry."], "The shirt isn't dry.", "The shirt là số ít nên dùng isn't.", "The shirt isn't dry phủ định đặc điểm dry."],
      ["Câu nào nói “Chúng tôi không ở trường”?", ["We are at school.", "We aren't at school.", "She isn't at school."], "We aren't at school.", "We là số nhiều và dùng aren't.", "We aren't at school phủ định nơi chốn."],
      ["Câu nào nói “Cô ấy không đến từ Huế”?", ["She is from Hue.", "She isn't from Hue.", "They aren't from Hue."], "She isn't from Hue.", "She đi với isn't.", "She isn't from Hue phủ định nguồn gốc."],
    ]),
    ...repairExercises("bn", 19, [
      ["Trong câu đang cho, hãy thay cụm phủ định để khớp với chủ ngữ số nhiều `these boxes`.", ["These boxes", "isn't", "heavy", "."], 1, ["am not", "isn't", "aren't"], "aren't", "These boxes là số nhiều.", "These boxes aren't heavy là câu đúng."],
    ]),
    ...orderExercises("bn", 20, [
      ["Sắp xếp thành câu “Những chiếc cốc này không sạch”.", ["clean", "These cups", "not", "are", "."], ["These cups", "are", "not", "clean", "."], "These cups dùng are; not đứng ngay sau are.", "These cups are not clean là câu đúng."],
    ]),
    {
      "id": "bn21",
      "kind": "grid",
      "prompt": "Chọn câu phủ định đúng cho từng loại thông tin.",
      "hint": "Giữ đúng be rồi đặt not ngay sau.",
      "explanation": "Nghề nghiệp, đặc điểm và nơi chốn đều dùng cùng vị trí của not.",
      "rows": [
        { "cue": "Mai không phải là bác sĩ.", "options": ["Mai is a doctor.", "Mai is not a doctor.", "Mai and An are not doctors."], "answer": "Mai is not a doctor.", "completed": "Mai is not a doctor." },
        { "cue": "Những chiếc túi không nặng.", "options": ["The bags aren't heavy.", "The bag isn't heavy.", "The bags are heavy."], "answer": "The bags aren't heavy.", "completed": "The bags aren't heavy." },
        { "cue": "Quyển sách không ở đây.", "options": ["The book is here.", "The books aren't here.", "The book isn't here."], "answer": "The book isn't here.", "completed": "The book isn't here." }
      ]
    },
    {
      "id": "bn22",
      "kind": "sort",
      "prompt": "Phân loại các chủ ngữ theo cụm phủ định cần dùng.",
      "hint": "I dùng am not; số ít dùng isn't; số nhiều và you dùng aren't.",
      "explanation": "Mỗi chủ ngữ đã được xếp theo đúng dạng phủ định.",
      "buckets": ["am not", "isn't", "aren't"],
      "items": [
        { "text": "I", "bucket": "am not" },
        { "text": "he", "bucket": "isn't" },
        { "text": "the cat", "bucket": "isn't" },
        { "text": "you", "bucket": "aren't" },
        { "text": "we", "bucket": "aren't" },
        { "text": "those books", "bucket": "aren't" }
      ]
    },
    {
      "id": "bn23",
      "kind": "choice",
      "prompt": "Cặp câu nào có cùng nghĩa phủ định?",
      "hint": "So sánh dạng đầy đủ với dạng rút gọn.",
      "explanation": "The bus is not here và The bus isn't here có cùng nghĩa.",
      "options": [
        "The bus is not here. = The bus isn't here.",
        "The bus is here. = The bus isn't here.",
        "The buses aren't here. = The bus isn't here."
      ],
      "answer": "The bus is not here. = The bus isn't here."
    },
    {
      "id": "bn24",
      "kind": "tap",
      "prompt": "Chọn tất cả dạng rút gọn mang nghĩa phủ định.",
      "hint": "Tìm các dạng chứa not được rút gọn.",
      "explanation": "isn't, aren't và I'm not đều là hình thức phủ định.",
      "tokens": ["isn't", "she's", "aren't", "they're", "I'm not"],
      "answerIndexes": [0, 2, 4],
      "selectionMode": "multiple"
    },
    {
      "id": "bn25",
      "kind": "choice",
      "prompt": "Câu nào phủ định đúng với chủ ngữ `I`?",
      "hint": "I đi với am not; dạng rút gọn là I'm not.",
      "explanation": "I'm not busy là câu phủ định đúng với I.",
      "options": ["I'm not busy.", "He isn't busy.", "We aren't busy."],
      "answer": "I'm not busy."
    },
    {
      "id": "bn26",
      "kind": "grid",
      "prompt": "Chuyển từng câu khẳng định sang câu phủ định có cùng chủ ngữ và thông tin.",
      "hint": "Chọn câu chỉ thêm not hoặc dùng dạng rút gọn tương ứng.",
      "explanation": "Bốn câu đã được phủ định mà không đổi chủ ngữ hay nội dung chính.",
      "rows": [
        { "cue": "I am hungry.", "options": ["I'm not hungry.", "I'm not tired.", "We aren't hungry."], "answer": "I'm not hungry.", "completed": "I'm not hungry." },
        { "cue": "The door is open.", "options": ["The door isn't open.", "The door isn't new.", "The doors aren't open."], "answer": "The door isn't open.", "completed": "The door isn't open." },
        { "cue": "They are at home.", "options": ["They aren't at school.", "We aren't at home.", "They aren't at home."], "answer": "They aren't at home.", "completed": "They aren't at home." },
        { "cue": "These are clean.", "options": ["These aren't clean.", "This isn't clean.", "These aren't small."], "answer": "These aren't clean.", "completed": "These aren't clean." }
      ]
    },
    {
      "id": "bn27",
      "kind": "match",
      "prompt": "Ghép mỗi câu phủ định với nghĩa tiếng Việt tương ứng.",
      "hint": "Đọc cả chủ ngữ và phần bị phủ định.",
      "explanation": "Bốn câu đã được ghép đúng nghĩa.",
      "pairs": [
        { "left": "I'm not cold.", "right": "Tôi không lạnh." },
        { "left": "The room isn't quiet.", "right": "Căn phòng không yên tĩnh." },
        { "left": "They aren't outside.", "right": "Họ không ở bên ngoài." },
        { "left": "It isn't Monday.", "right": "Hôm nay không phải thứ Hai." }
      ]
    },
    {
      "id": "bn28",
      "kind": "choice",
      "prompt": "Trình tự nào tạo câu phủ định với `be` đúng nhất?",
      "hint": "Chọn be theo chủ ngữ trước rồi mới thêm not.",
      "explanation": "Quy trình đúng là xác định chủ ngữ, chọn be và đặt not ngay sau be.",
      "options": ["Chủ ngữ → chọn be → thêm not", "Thêm not → bỏ be", "Luôn dùng is not"],
      "answer": "Chủ ngữ → chọn be → thêm not"
    },
    ...orderExercises("bn", 29, [
      ["Sắp xếp thành câu “Cô ấy không đến từ Nhật Bản”.", ["from Japan", "not", "She", "is", "."], ["She", "is", "not", "from Japan", "."], "not đứng sau is và trước cụm nguồn gốc.", "She is not from Japan là câu đúng."],
    ]),
    {
      "id": "bn30",
      "kind": "grid",
      "prompt": "Chọn câu phủ định chính xác để hoàn thành lượt tổng hợp.",
      "hint": "Kiểm tra chủ ngữ, dạng be, vị trí not và ý nghĩa.",
      "explanation": "Năm câu sử dụng đúng dạng đầy đủ hoặc rút gọn của phủ định với be.",
      "rows": [
        { "cue": "Tôi không phải là Nam.", "options": ["I'm not Nam.", "He's not Nam.", "I'm Nam."], "answer": "I'm not Nam.", "completed": "I'm not Nam." },
        { "cue": "Chiếc xe không mới.", "options": ["The car isn't new.", "The cars aren't new.", "The car is new."], "answer": "The car isn't new.", "completed": "The car isn't new." },
        { "cue": "Các học sinh không ở đây.", "options": ["The student isn't here.", "The students aren't here.", "The students are here."], "answer": "The students aren't here.", "completed": "The students aren't here." },
        { "cue": "Cô ấy không mười tuổi.", "options": ["She isn't ten years old.", "She is ten years old.", "They aren't ten years old."], "answer": "She isn't ten years old.", "completed": "She isn't ten years old." },
        { "cue": "Họ không đến từ Huế.", "options": ["They aren't from Hue.", "They are from Hue.", "He isn't from Hue."], "answer": "They aren't from Hue.", "completed": "They aren't from Hue." }
      ]
    }
  ],
  "be-questions": [
    {
      "id": "bq1",
      "kind": "order",
      "prompt": "Sắp xếp thành câu hỏi “Bạn đã sẵn sàng chưa?”.",
      "hint": "Đưa Are lên trước you.",
      "explanation": "Are you ready? có be đứng trước chủ ngữ.",
      "tokens": ["ready", "you", "Are", "?"],
      "answer": ["Are", "you", "ready", "?"]
    },
    {
      "id": "bq2",
      "kind": "grid",
      "prompt": "Đổi từng câu khẳng định thành câu hỏi.",
      "hint": "Đưa chính dạng của be lên trước chủ ngữ.",
      "explanation": "Am, is hoặc are đã được đưa lên trước chủ ngữ trong cả bốn câu.",
      "rows": [
        { "cue": "You are tired.", "options": ["Are you tired?", "Are you ready?", "Is she tired?"], "answer": "Are you tired?", "completed": "Are you tired?" },
        { "cue": "Lan is here.", "options": ["Is Lan tired?", "Is Mai here?", "Is Lan here?"], "answer": "Is Lan here?", "completed": "Is Lan here?" },
        { "cue": "They are ready.", "options": ["Are they ready?", "Are they here?", "Are we ready?"], "answer": "Are they ready?", "completed": "Are they ready?" },
        { "cue": "I am late.", "options": ["Is he late?", "Am I late?", "Am I early?"], "answer": "Am I late?", "completed": "Am I late?" }
      ]
    },
    ...choiceExercises("bq", 3, [
      ["Câu hỏi nào có nghĩa “Quyển sách có mới không?”", ["Is the book new?", "Are the books new?", "Is the book here?"], "Is the book new?", "The book là chủ ngữ số ít nên câu hỏi bắt đầu bằng Is.", "Is the book new? hỏi về đặc điểm new của một quyển sách."],
      ["Câu hỏi nào có nghĩa “Những quyển sách có mới không?”", ["Is the book new?", "Are the books new?", "Are the books here?"], "Are the books new?", "The books là chủ ngữ số nhiều nên câu hỏi bắt đầu bằng Are.", "Are the books new? hỏi về đặc điểm new của nhiều quyển sách."],
      ["Câu hỏi nào có nghĩa “Những chiếc hộp này có nặng không?”", ["Is this box heavy?", "Are these boxes heavy?", "Are these boxes new?"], "Are these boxes heavy?", "Câu cần giữ cả số nhiều these boxes và đặc điểm heavy.", "Are these boxes heavy? có đúng chủ ngữ số nhiều và đúng nghĩa cần hỏi."],
    ]),
    ...tapExercises("bq", 6, [
      ["Trong câu `Is the room quiet?`, chọn dạng của `be`.", ["Is", "the room", "quiet", "?"], [0], "Dạng be đã được đưa lên trước chủ ngữ.", "Is là dạng be đi với the room."],
      ["Trong câu `Are Mai and An at school?`, chọn toàn bộ chủ ngữ.", ["Are", "Mai", "and", "An", "at school", "?"], [1, 2, 3], "Câu hỏi đang nói về cả Mai và An.", "Mai and An là chủ ngữ số nhiều."],
    ]),
    ...repairExercises("bq", 8, [
      ["Chọn cụm mở đầu để biến câu đang cho thành câu hỏi.", ["The bus is", "here", "?"], 0, ["The bus is", "Is the bus", "Are the buses"], "Is the bus", "Đưa is lên trước chủ ngữ the bus.", "Is the bus here? là câu hỏi đúng."],
    ]),
    {
      "id": "bq9",
      "kind": "sort",
      "prompt": "Phân loại các câu thành câu khẳng định hoặc câu hỏi.",
      "hint": "Câu hỏi có be đứng trước chủ ngữ và kết thúc bằng dấu hỏi.",
      "explanation": "Ba câu hỏi có be đứng đầu; ba câu khẳng định có chủ ngữ đứng đầu.",
      "buckets": ["Câu khẳng định", "Câu hỏi"],
      "items": [
        { "text": "She is busy.", "bucket": "Câu khẳng định" },
        { "text": "Is she busy?", "bucket": "Câu hỏi" },
        { "text": "The cups are clean.", "bucket": "Câu khẳng định" },
        { "text": "Are the cups clean?", "bucket": "Câu hỏi" },
        { "text": "I am early.", "bucket": "Câu khẳng định" },
        { "text": "Am I early?", "bucket": "Câu hỏi" }
      ]
    },
    {
      "id": "bq10",
      "kind": "match",
      "prompt": "Ghép mỗi câu hỏi với câu trả lời khẳng định phù hợp.",
      "hint": "Giữ đúng chủ ngữ và dạng be trong câu trả lời ngắn.",
      "explanation": "Mỗi câu trả lời lặp lại đúng chủ ngữ và dạng be cần thiết.",
      "pairs": [
        { "left": "Is Hoa here?", "right": "Yes, she is." },
        { "left": "Are the dogs hungry?", "right": "Yes, they are." },
        { "left": "Is the door open?", "right": "Yes, it is." }
      ]
    },
    {
      "id": "bq11",
      "kind": "match",
      "prompt": "Ghép mỗi câu hỏi với câu trả lời phủ định phù hợp.",
      "hint": "Danh từ số ít có thể thay bằng it; danh từ số nhiều có thể thay bằng they.",
      "explanation": "Ba câu trả lời dùng đúng đại từ và dạng phủ định của be.",
      "pairs": [
        { "left": "Is the soup hot?", "right": "No, it isn't." },
        { "left": "Are Lan and Mai late?", "right": "No, they aren't." },
        { "left": "Is Nam at home?", "right": "No, he isn't." }
      ]
    },
    ...choiceExercises("bq", 12, [
      ["Câu trả lời ngắn nào phù hợp với `Is Lan ready?`?", ["Yes, she is.", "Yes, they are.", "Yes, I am."], "Yes, she is.", "Lan có thể được thay bằng she.", "Câu hỏi dùng is nên câu trả lời là Yes, she is."],
      ["Câu trả lời ngắn nào phù hợp với `Is the key on the table?`?", ["No, it isn't.", "No, they aren't.", "No, she isn't."], "No, it isn't.", "The key là một vật nên có thể thay bằng it.", "No, it isn't là câu trả lời phủ định phù hợp."],
      ["Câu trả lời ngắn nào phù hợp với `Are the students outside?`?", ["Yes, he is.", "Yes, they are.", "Yes, it is."], "Yes, they are.", "The students là chủ ngữ số nhiều nên thay bằng they.", "Yes, they are là câu trả lời khẳng định phù hợp."],
    ]),
    {
      "id": "bq15",
      "kind": "grid",
      "prompt": "Chọn câu trả lời khẳng định phù hợp với từng câu hỏi.",
      "hint": "Lặp lại đúng đại từ và am, is hoặc are.",
      "explanation": "Bốn câu trả lời dùng đúng đại từ và dạng be.",
      "rows": [
        { "cue": "Is Mai a student?", "options": ["Yes, she is.", "Yes, they are.", "Yes, I am."], "answer": "Yes, she is.", "completed": "Yes, she is." },
        { "cue": "Are the rooms clean?", "options": ["Yes, it is.", "Yes, they are.", "Yes, we are."], "answer": "Yes, they are.", "completed": "Yes, they are." },
        { "cue": "Is this a bag?", "options": ["Yes, it is.", "Yes, they are.", "Yes, I am."], "answer": "Yes, it is.", "completed": "Yes, it is." },
        { "cue": "Am I early?", "options": ["Yes, I am.", "Yes, you are.", "Yes, she is."], "answer": "Yes, you are.", "completed": "Yes, you are." }
      ]
    },
    {
      "id": "bq16",
      "kind": "grid",
      "prompt": "Chọn câu trả lời phủ định phù hợp với từng câu hỏi.",
      "hint": "Dùng isn't với số ít và aren't với số nhiều.",
      "explanation": "Các câu trả lời phủ định giữ đúng chủ ngữ và dạng be.",
      "rows": [
        { "cue": "Is the coffee cold?", "options": ["No, it isn't.", "No, they aren't.", "No, she isn't."], "answer": "No, it isn't.", "completed": "No, it isn't." },
        { "cue": "Are the students here?", "options": ["No, he isn't.", "No, they aren't.", "No, it isn't."], "answer": "No, they aren't.", "completed": "No, they aren't." },
        { "cue": "Is Nam from Hue?", "options": ["No, he isn't.", "No, they aren't.", "No, I am not."], "answer": "No, he isn't.", "completed": "No, he isn't." }
      ]
    },
    ...choiceExercises("bq", 17, [
      ["Nếu một người được hỏi `Are you tired?`, câu trả lời khẳng định nào phù hợp?", ["Yes, I am.", "Yes, you are.", "Yes, we are."], "Yes, I am.", "Người trả lời tự gọi mình là I.", "Khi you chỉ một người nghe, người đó trả lời bằng I am."],
      ["Nếu một nhóm được hỏi `Are you ready?`, câu trả lời khẳng định nào phù hợp?", ["Yes, I am.", "Yes, we are.", "Yes, you are."], "Yes, we are.", "Cả nhóm tự gọi mình là we.", "Khi you chỉ nhiều người nghe, nhóm đó trả lời bằng we are."],
      ["Người đối diện nên trả lời thế nào nếu người hỏi `Am I late?` và đúng là người ấy đang muộn?", ["Yes, I am.", "Yes, you are.", "Yes, he is."], "Yes, you are.", "I trong lời người hỏi trở thành you trong lời người trả lời.", "Yes, you are là câu trả lời phù hợp."],
    ]),
    ...orderExercises("bq", 20, [
      ["Sắp xếp thành câu hỏi “Những chiếc ghế có ở đây không?”.", ["here", "the chairs", "Are", "?"], ["Are", "the chairs", "here", "?"], "The chairs là số nhiều nên dùng Are.", "Are the chairs here? là câu hỏi đúng."],
    ]),
    ...tapExercises("bq", 21, [
      ["Trong câu trả lời `No, they aren't`, chọn đại từ thay cho `the boxes`.", ["No", ",", "they", "aren't"], [2], "The boxes là số nhiều.", "they thay cho the boxes."],
    ]),
    ...repairExercises("bq", 22, [
      ["Chọn phần cuối đúng cho câu trả lời ngắn khẳng định.", ["Yes", ",", "she's", "."], 2, ["she's", "she is", "they are"], "she is", "Câu trả lời ngắn khẳng định kết thúc bằng dạng đầy đủ của be.", "Yes, she is là câu trả lời chuẩn."],
    ]),
    {
      "id": "bq23",
      "kind": "sort",
      "prompt": "Phân loại các cách trả lời theo việc chúng có thể đứng độc lập làm câu trả lời ngắn khẳng định hay không.",
      "hint": "Ở cuối câu trả lời khẳng định, không rút gọn chủ ngữ với be.",
      "explanation": "Yes, he is; Yes, they are; Yes, I am là các câu trả lời ngắn chuẩn.",
      "buckets": ["Dùng được", "Không dùng theo mẫu này"],
      "items": [
        { "text": "Yes, he is.", "bucket": "Dùng được" },
        { "text": "Yes, he's.", "bucket": "Không dùng theo mẫu này" },
        { "text": "Yes, they are.", "bucket": "Dùng được" },
        { "text": "Yes, they're.", "bucket": "Không dùng theo mẫu này" },
        { "text": "Yes, I am.", "bucket": "Dùng được" },
        { "text": "Yes, I'm.", "bucket": "Không dùng theo mẫu này" }
      ]
    },
    {
      "id": "bq24",
      "kind": "match",
      "prompt": "Ghép mỗi câu hỏi với nghĩa tiếng Việt tương ứng.",
      "hint": "Đọc chủ ngữ và thông tin được hỏi.",
      "explanation": "Bốn câu hỏi đã được ghép đúng nghĩa.",
      "pairs": [
        { "left": "Is the window open?", "right": "Cửa sổ có mở không?" },
        { "left": "Are they at home?", "right": "Họ có ở nhà không?" },
        { "left": "Is she a nurse?", "right": "Cô ấy có phải là y tá không?" },
        { "left": "Am I wrong?", "right": "Tôi có sai không?" }
      ]
    },
    {
      "id": "bq25",
      "kind": "grid",
      "prompt": "Chọn câu hỏi phù hợp với từng thông tin cần xác nhận.",
      "hint": "Đặt be trước chủ ngữ và giữ nguyên phần thông tin phía sau.",
      "explanation": "Nghề nghiệp, đặc điểm và nơi chốn đều dùng cùng trật tự be + chủ ngữ.",
      "rows": [
        { "cue": "Xác nhận Minh là bác sĩ", "options": ["Is Minh a doctor?", "Is Minh happy?", "Is Minh at home?"], "answer": "Is Minh a doctor?", "completed": "Is Minh a doctor?" },
        { "cue": "Xác nhận chiếc túi nặng", "options": ["Is the bag heavy?", "Is the bag here?", "Is the bag a box?"], "answer": "Is the bag heavy?", "completed": "Is the bag heavy?" },
        { "cue": "Xác nhận những chiếc chìa khóa ở trên bàn", "options": ["Are the keys new?", "Are the keys on the table?", "Is the key on the table?"], "answer": "Are the keys on the table?", "completed": "Are the keys on the table?" }
      ]
    },
    ...orderExercises("bq", 26, [
      ["Sắp xếp thành câu trả lời “Không, họ không ở đó”.", ["they", "No", "aren't", ",", "."], ["No", ",", "they", "aren't", "."], "Câu trả lời phủ định bắt đầu bằng No rồi đến chủ ngữ và be phủ định.", "No, they aren't là câu trả lời phủ định ngắn."],
    ]),
    ...choiceExercises("bq", 27, [
      ["Công thức nào đúng cho câu hỏi xác nhận với `be`?", ["be + chủ ngữ + phần còn lại + ?", "chủ ngữ + be + phần còn lại + ?", "chủ ngữ + not + phần còn lại + ?"], "be + chủ ngữ + phần còn lại + ?", "So sánh She is ready và Is she ready?", "Câu hỏi đưa be lên trước chủ ngữ."],
    ]),
    {
      "id": "bq28",
      "kind": "grid",
      "prompt": "Hoàn thành từng cặp câu hỏi và câu trả lời ngắn.",
      "hint": "Chọn be theo chủ ngữ rồi lặp lại đúng dạng ấy trong câu trả lời.",
      "explanation": "Bốn cặp đã hòa hợp đúng về chủ ngữ, số lượng và dạng be.",
      "rows": [
        { "cue": "___ the cat hungry? — Yes, it is.", "options": ["Am", "Is", "Are"], "answer": "Is", "completed": "Is the cat hungry? — Yes, it is." },
        { "cue": "___ the buses late? — No, they aren't.", "options": ["Am", "Is", "Are"], "answer": "Are", "completed": "Are the buses late? — No, they aren't." },
        { "cue": "___ I in the right room? — Yes, you are.", "options": ["Am", "Is", "Are"], "answer": "Am", "completed": "Am I in the right room? — Yes, you are." },
        { "cue": "___ this a key? — No, it isn't.", "options": ["Am", "Is", "Are"], "answer": "Is", "completed": "Is this a key? — No, it isn't." }
      ]
    },
    ...tapExercises("bq", 29, [
      ["Chọn tất cả các câu hỏi được tạo đúng với `be`.", ["Is the milk cold?", "The milk is cold.", "Are the windows open?", "They are ready.", "Am I early?"], [0, 2, 4], "Câu hỏi có am, is hoặc are đứng trước chủ ngữ.", "Ba câu được chọn đều có đúng trật tự của câu hỏi với be."],
    ]),
    ...choiceExercises("bq", 30, [
      ["Cặp nào gồm một câu khẳng định và câu hỏi tương ứng?", ["The room is quiet. → Is the room quiet?", "The room is quiet. → Are the rooms quiet?", "The room is quiet. → Is the room clean?"], "The room is quiet. → Is the room quiet?", "Câu hỏi tương ứng phải giữ nguyên chủ ngữ và thông tin quiet.", "Chỉ vị trí của is thay đổi; nội dung câu được giữ nguyên."],
    ])
  ],
  "be-wh-questions": [
    {
      "id": "bw1",
      "kind": "match",
      "prompt": "Ghép mỗi từ hỏi với loại thông tin nó yêu cầu.",
      "hint": "Phân biệt người, vật, nơi chốn và tuổi.",
      "explanation": "Who hỏi người; what hỏi vật hoặc loại; where hỏi nơi chốn; how old hỏi tuổi.",
      "pairs": [
        { "left": "who", "right": "người hoặc danh tính" },
        { "left": "what", "right": "vật hoặc loại của một thứ" },
        { "left": "where", "right": "nơi chốn" },
        { "left": "how old", "right": "tuổi" }
      ]
    },
    {
      "id": "bw2",
      "kind": "sort",
      "prompt": "Phân loại các câu hỏi theo thông tin cần trả lời.",
      "hint": "Nhìn từ hỏi đứng đầu câu.",
      "explanation": "Mỗi câu hỏi hướng tới đúng một loại thông tin chính.",
      "buckets": ["Người", "Vật", "Nơi chốn", "Tuổi"],
      "items": [
        { "text": "Who is she?", "bucket": "Người" },
        { "text": "What is this?", "bucket": "Vật" },
        { "text": "Where are the keys?", "bucket": "Nơi chốn" },
        { "text": "How old is Nam?", "bucket": "Tuổi" },
        { "text": "Who are they?", "bucket": "Người" },
        { "text": "What are those?", "bucket": "Vật" }
      ]
    },
    {
      "id": "bw3",
      "kind": "grid",
      "prompt": "Chọn từ hỏi phù hợp với phần thông tin còn thiếu.",
      "hint": "Xác định câu cần biết người, vật, nơi chốn hay tuổi.",
      "explanation": "Bốn từ hỏi đã được chọn theo đúng thông tin cần tìm.",
      "rows": [
        { "cue": "___ is she? — She is Mai.", "options": ["Who", "What", "Where", "How old"], "answer": "Who", "completed": "Who is she? — She is Mai." },
        { "cue": "___ is this? — It is a map.", "options": ["Who", "What", "Where", "How old"], "answer": "What", "completed": "What is this? — It is a map." },
        { "cue": "___ are the boys? — They are outside.", "options": ["Who", "What", "Where", "How old"], "answer": "Where", "completed": "Where are the boys? — They are outside." },
        { "cue": "___ is Hoa? — She is nine.", "options": ["Who", "What", "Where", "How old"], "answer": "How old", "completed": "How old is Hoa? — She is nine." }
      ]
    },
    ...choiceExercises("bw", 4, [
      ["Từ nào hoàn thành câu hỏi `___ is that man?` để hỏi người đàn ông kia là ai?", ["Who", "What", "Where", "How old"], "Who", "Câu hỏi cần biết danh tính một người.", "Who is that man? hỏi người đàn ông kia là ai."],
      ["Từ nào hoàn thành câu hỏi `___ are these?` để hỏi những vật này là gì?", ["Who", "What", "Where", "How old"], "What", "Câu hỏi cần biết tên hoặc loại của vật.", "What are these? hỏi những vật này là gì."],
      ["Từ nào hoàn thành câu hỏi `___ is the bus?` để hỏi chiếc xe buýt ở đâu?", ["Who", "What", "Where", "How old"], "Where", "Câu hỏi cần một nơi chốn.", "Where is the bus? hỏi vị trí của chiếc xe buýt."],
      ["Cụm nào hoàn thành câu hỏi `___ are the boys?` để hỏi tuổi?", ["Who", "What", "Where", "How old"], "How old", "Câu hỏi cần biết số tuổi.", "How old are the boys? hỏi tuổi của những cậu bé."],
    ]),
    ...orderExercises("bw", 8, [
      ["Sắp xếp thành câu hỏi “Cô ấy là ai?”.", ["she", "Who", "is", "?"], ["Who", "is", "she", "?"], "Từ hỏi đứng trước is và chủ ngữ she.", "Who is she? là câu hỏi đúng."],
      ["Sắp xếp thành câu hỏi “Đây là cái gì?”.", ["this", "What", "is", "?"], ["What", "is", "this", "?"], "What đứng trước is this.", "What is this? là câu hỏi đúng."],
      ["Sắp xếp thành câu hỏi “Những quyển sách ở đâu?”.", ["the books", "Where", "are", "?"], ["Where", "are", "the books", "?"], "The books là số nhiều nên dùng are.", "Where are the books? là câu hỏi đúng."],
      ["Sắp xếp thành câu hỏi “Lan bao nhiêu tuổi?”.", ["Lan", "How old", "is", "?"], ["How old", "is", "Lan", "?"], "How old đứng trước is và chủ ngữ Lan.", "How old is Lan? là câu hỏi đúng."],
    ]),
    {
      "id": "bw12",
      "kind": "grid",
      "prompt": "Chọn câu hỏi đúng để hỏi tên của từng vật hoặc nhóm vật.",
      "hint": "This và that dùng is; these và those dùng are.",
      "explanation": "What đã kết hợp đúng với be và từ chỉ định trong cả bốn câu.",
      "rows": [
        { "cue": "một vật ở gần", "options": ["What is this?", "What is that?", "What are these?"], "answer": "What is this?", "completed": "What is this?" },
        { "cue": "một vật ở xa", "options": ["What is this?", "What is that?", "What are those?"], "answer": "What is that?", "completed": "What is that?" },
        { "cue": "nhiều vật ở gần", "options": ["What are these?", "What are those?", "What is this?"], "answer": "What are these?", "completed": "What are these?" },
        { "cue": "nhiều vật ở xa", "options": ["What is that?", "What are these?", "What are those?"], "answer": "What are those?", "completed": "What are those?" }
      ]
    },
    {
      "id": "bw13",
      "kind": "grid",
      "prompt": "Chọn câu hỏi phù hợp với từng câu trả lời về nơi chốn.",
      "hint": "Dùng where và chọn is hoặc are theo chủ ngữ.",
      "explanation": "Ba câu hỏi đều yêu cầu đúng thông tin về nơi chốn.",
      "rows": [
        { "cue": "Lan is at home.", "options": ["Where is Lan?", "Who is Mai?", "How old is Nam?"], "answer": "Where is Lan?", "completed": "Where is Lan? — Lan is at home." },
        { "cue": "The shoes are under the bed.", "options": ["Where are the keys?", "Where are the shoes?", "How old is Nam?"], "answer": "Where are the shoes?", "completed": "Where are the shoes? — They are under the bed." },
        { "cue": "I am in the kitchen.", "options": ["Where are you?", "Who is she?", "How old are they?"], "answer": "Where are you?", "completed": "Where are you? — I am in the kitchen." }
      ]
    },
    {
      "id": "bw14",
      "kind": "grid",
      "prompt": "Chọn câu hỏi phù hợp với từng câu trả lời về tuổi.",
      "hint": "Dùng how old và chọn be theo chủ ngữ.",
      "explanation": "Ba câu hỏi yêu cầu đúng số tuổi của người được nói tới.",
      "rows": [
        { "cue": "I am ten years old.", "options": ["How old are you?", "Where are you?", "Who are you?"], "answer": "How old are you?", "completed": "How old are you? — I am ten years old." },
        { "cue": "Nam is twelve.", "options": ["Who is Nam?", "How old is Nam?", "Where is Nam?"], "answer": "How old is Nam?", "completed": "How old is Nam? — He is twelve." },
        { "cue": "They are eight years old.", "options": ["Who are they?", "Where are they?", "How old are they?"], "answer": "How old are they?", "completed": "How old are they? — They are eight years old." }
      ]
    },
    {
      "id": "bw15",
      "kind": "match",
      "prompt": "Ghép mỗi câu hỏi với câu trả lời chứa đúng loại thông tin.",
      "hint": "Who cần người; what cần vật; where cần nơi; how old cần tuổi.",
      "explanation": "Bốn câu trả lời cung cấp đúng loại thông tin mà câu hỏi yêu cầu.",
      "pairs": [
        { "left": "Who is he?", "right": "He is Mr Binh." },
        { "left": "What is this?", "right": "It is a toy." },
        { "left": "Where is the cat?", "right": "It is under the chair." },
        { "left": "How old is Mai?", "right": "She is eleven." }
      ]
    },
    {
      "id": "bw16",
      "kind": "sort",
      "prompt": "Phân loại các câu trả lời theo loại thông tin chúng cung cấp.",
      "hint": "Xem câu trả lời nêu danh tính, vật, nơi chốn hay tuổi.",
      "explanation": "Mỗi câu trả lời đã được xếp theo nội dung chính.",
      "buckets": ["Danh tính", "Vật", "Nơi chốn", "Tuổi"],
      "items": [
        { "text": "She is Ms Hoa.", "bucket": "Danh tính" },
        { "text": "They are pencils.", "bucket": "Vật" },
        { "text": "The bag is by the door.", "bucket": "Nơi chốn" },
        { "text": "He is seven years old.", "bucket": "Tuổi" }
      ]
    },
    ...tapExercises("bw", 17, [
      ["Trong câu `Where are the students?`, chọn từ hỏi.", ["Where", "are", "the students", "?"], [0], "Từ hỏi đứng đầu câu.", "Where yêu cầu thông tin về nơi chốn."],
      ["Trong câu `How old is Nam?`, chọn dạng của `be`.", ["How old", "is", "Nam", "?"], [1], "Dạng be đứng sau cụm từ hỏi.", "is đi với chủ ngữ số ít Nam."],
      ["Trong câu `What are those?`, chọn chủ ngữ.", ["What", "are", "those", "?"], [2], "Câu hỏi đang hỏi về những vật kia.", "those là chủ ngữ của câu hỏi."],
    ]),
    ...choiceExercises("bw", 20, [
      ["Câu nào hỏi “Bạn đến từ đâu?”", ["Where are you?", "Where are you from?", "Who are you?"], "Where are you from?", "Cụm from hỏi về nơi xuất thân.", "Where are you from? hỏi nguồn gốc của người nghe."],
    ]),
    ...orderExercises("bw", 21, [
      ["Sắp xếp thành câu hỏi “Họ đến từ đâu?”.", ["from", "they", "Where", "are", "?"], ["Where", "are", "they", "from", "?"], "Where đứng đầu; from ở cuối cụm hỏi nguồn gốc.", "Where are they from? là câu hỏi đúng."],
    ]),
    ...choiceExercises("bw", 22, [
      ["Câu trả lời nào phù hợp nhất với `Who are they?`?", ["They are Lan and Minh.", "They are at school.", "They are nine years old."], "They are Lan and Minh.", "Who yêu cầu danh tính.", "Tên Lan and Minh trả lời câu hỏi họ là ai."],
      ["Câu trả lời nào phù hợp nhất với `What are these?`?", ["They are on the table.", "They are keys.", "They are new."], "They are keys.", "What yêu cầu tên hoặc loại của vật.", "They are keys cho biết những vật này là chìa khóa."],
      ["Câu trả lời nào phù hợp nhất với `Where is the teacher?`?", ["She is Ms An.", "She is in the classroom.", "She is thirty."], "She is in the classroom.", "Where yêu cầu nơi chốn.", "In the classroom cho biết giáo viên ở đâu."],
      ["Câu trả lời nào phù hợp nhất với `How old is the boy?`?", ["He is six years old.", "He is at home.", "He is Nam."], "He is six years old.", "How old yêu cầu tuổi.", "Six years old cho biết tuổi của cậu bé."],
    ]),
    ...repairExercises("bw", 26, [
      ["Chọn từ hỏi đúng để câu hỏi yêu cầu nơi ở của Mai.", ["Who", "is", "Mai", "?"], 0, ["Who", "What", "Where", "How old"], "Where", "Câu hỏi cần một nơi chốn.", "Where is Mai? hỏi Mai ở đâu."],
      ["Chọn dạng của `be` đúng với chủ ngữ `these`.", ["What", "is", "these", "?"], 1, ["am", "is", "are"], "are", "These chỉ nhiều vật.", "What are these? là câu hỏi đúng."],
    ]),
    {
      "id": "bw28",
      "kind": "grid",
      "prompt": "Hoàn thành mỗi câu hỏi bằng từ hỏi và dạng `be` phù hợp.",
      "hint": "Xác định loại thông tin trước, sau đó chọn is hoặc are theo chủ ngữ.",
      "explanation": "Bốn câu hỏi kết hợp đúng từ hỏi, be và chủ ngữ.",
      "rows": [
        { "cue": "___ ___ she? — She is Lan.", "options": ["Who is", "What are", "Where are"], "answer": "Who is", "completed": "Who is she? — She is Lan." },
        { "cue": "___ ___ those? — They are boxes.", "options": ["Who is", "What are", "How old is"], "answer": "What are", "completed": "What are those? — They are boxes." },
        { "cue": "___ ___ the milk? — It is in the fridge.", "options": ["Where is", "Who are", "What are"], "answer": "Where is", "completed": "Where is the milk? — It is in the fridge." },
        { "cue": "___ ___ the girls? — They are ten.", "options": ["How old are", "Where is", "Who is"], "answer": "How old are", "completed": "How old are the girls? — They are ten." }
      ]
    },
    {
      "id": "bw29",
      "kind": "sort",
      "prompt": "Phân loại câu hỏi theo việc chúng cần câu trả lời có/không hay cần một thông tin cụ thể.",
      "hint": "Câu bắt đầu bằng be hỏi xác nhận; câu bắt đầu bằng từ hỏi yêu cầu thông tin.",
      "explanation": "Câu hỏi có who, what, where hoặc how old cần nội dung cụ thể thay vì chỉ Yes hoặc No.",
      "buckets": ["Cần Yes hoặc No", "Cần thông tin cụ thể"],
      "items": [
        { "text": "Is Lan here?", "bucket": "Cần Yes hoặc No" },
        { "text": "Are the books new?", "bucket": "Cần Yes hoặc No" },
        { "text": "Who is Lan?", "bucket": "Cần thông tin cụ thể" },
        { "text": "What are these?", "bucket": "Cần thông tin cụ thể" },
        { "text": "Where are the books?", "bucket": "Cần thông tin cụ thể" },
        { "text": "How old is Lan?", "bucket": "Cần thông tin cụ thể" }
      ]
    },
    {
      "id": "bw30",
      "kind": "grid",
      "prompt": "Chọn câu hỏi khớp nhất với từng câu trả lời trong lượt tổng hợp.",
      "hint": "Dựa vào loại thông tin trong câu trả lời và số lượng của chủ ngữ.",
      "explanation": "Mỗi câu hỏi yêu cầu đúng danh tính, vật, nơi chốn hoặc tuổi được nêu trong câu trả lời.",
      "rows": [
        { "cue": "He is Mr Son.", "options": ["Who is he?", "Where is he?", "How old is he?"], "answer": "Who is he?", "completed": "Who is he? — He is Mr Son." },
        { "cue": "They are oranges.", "options": ["What are they?", "Where are they?", "Who are they?"], "answer": "What are they?", "completed": "What are they? — They are oranges." },
        { "cue": "The boys are in the garden.", "options": ["How old are the boys?", "Where are the boys?", "Who are the boys?"], "answer": "Where are the boys?", "completed": "Where are the boys? — They are in the garden." },
        { "cue": "She is thirteen years old.", "options": ["Who is she?", "How old is she?", "Where is she?"], "answer": "How old is she?", "completed": "How old is she? — She is thirteen years old." }
      ]
    }
  ],
};
