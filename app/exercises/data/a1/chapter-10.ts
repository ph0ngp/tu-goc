/* Luyện tập A1 — Chương 10: Tính từ, trạng từ và trật tự câu. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { binaryChoiceDrills, compactPracticeSet } from "../../basic-builders.ts";

const a1Chapter10BaseExerciseData: Record<string, Exercise[]> = {
  "adjectives-position": compactPracticeSet({
    prefix: "a1aj",
    focus: "vị trí và thứ tự cơ bản của tính từ",
    choices: [
      ["Cụm nào có nghĩa “một ngôi nhà nhỏ”?", ["a small house", "the house is small", "a big house"], "a small house", "Tính từ đứng trước danh từ và không thêm `-s`."],
      ["Câu nào có nghĩa “Ngôi nhà nhỏ”?", ["The house is small.", "A small house.", "The house is large."], "The house is small.", "Sau động từ nối `is`, dùng tính từ `small`."],
      ["Câu nào dùng tính từ đúng sau `look`?", ["You look tired.", "You look tiredly.", "You tired look."], "You look tired.", "`Look` là động từ nối trong câu này nên theo sau bằng tính từ."],
      ["Cụm nào diễn đạt tự nhiên nhất ý “một ngôi nhà cổ đẹp”?", ["a beautiful old house", "a beautiful new house", "an old house"], "a beautiful old house", "Ý kiến `beautiful` thường đứng trước tuổi `old`."],
      ["Cụm nào có nghĩa “hai con mèo nhỏ”?", ["two small cats", "one small cat", "two big cats"], "two small cats", "Tính từ `small` không đổi theo số nhiều."],
      ["Câu nào có nghĩa “Món súp có mùi thơm”?", ["The soup smells good.", "The soup tastes good.", "The soup smells bad."], "The soup smells good.", "Sau động từ nối `smells`, dùng tính từ `good`."],
      ["Tính từ chỉ ý kiến nào thường đứng trước `small`?", ["nice", "wooden", "red"], "nice", "Ý kiến thường đứng trước kích thước."],
      ["Cụm nào có thứ tự màu sắc trước chất liệu?", ["a red wooden chair", "a wooden red chair", "a red chair wooden"], "a red wooden chair", "Màu sắc thường đứng trước chất liệu."],
      ["Câu nào nối hai đặc điểm sau `be`?", ["The room is clean and quiet.", "The room is clean quietly.", "The clean and quiet room is."], "The room is clean and quiet.", "Hai tính từ sau `be` có thể nối bằng `and`."],
      ["Từ nào nên dùng trong `The music sounds ...`?", ["beautiful", "beautifully", "beauty"], "beautiful", "`Sounds` là động từ nối; tính từ miêu tả bản nhạc."],
    ],
    orders: [
      ["Sắp xếp cụm “một căn phòng nhỏ xinh xắn”.", ["room", "nice", "a", "small"], ["a", "nice", "small", "room"], "Ý kiến `nice` đứng trước kích thước `small`."],
      ["Sắp xếp câu “Những quả táo đỏ này còn tươi.”", ["fresh", "red", "The", "are", "apples", "."], ["The", "red", "apples", "are", "fresh", "."], "`Red` đứng trước danh từ; `fresh` đứng sau `are`."],
      ["Sắp xếp cụm “một chiếc bàn gỗ cũ”.", ["table", "wooden", "an", "old"], ["an", "old", "wooden", "table"], "Tuổi `old` đứng trước chất liệu `wooden`."],
      ["Sắp xếp câu “Bạn trông vui.”", ["happy", "look", "You", "."], ["You", "look", "happy", "."], "`Look` nối chủ ngữ với tính từ `happy`."],
    ],
    repairs: [
      ["Chọn dạng tính từ đúng trước danh từ.", ["She", "has", "a", "beautifully", "voice", "."], 3, ["beautiful", "beautifully", "beauty"], "beautiful", "Trước danh từ `voice`, dùng tính từ `beautiful`."],
      ["Chọn dạng đúng sau động từ nối.", ["The", "children", "are", "happily", "."], 3, ["happy", "happily", "happiness"], "happy", "Sau `are`, dùng tính từ `happy`."],
      ["Chọn cụm có nghĩa chiếc hộp vừa nhỏ vừa làm bằng gỗ.", ["It", "is", "a", "wooden", "box", "."], 3, ["small wooden", "wooden", "small"], "small wooden", "Kích thước thường đứng trước chất liệu."],
    ],
    taps: [
      ["Trong `The small black dog is friendly`, chọn tất cả tính từ.", ["The", "small", "black", "dog", "is", "friendly", "."], [1, 2, 5], "`Small/black` đứng trước danh từ; `friendly` đứng sau `is`."],
      ["Trong `This soup smells wonderful`, chọn động từ nối và tính từ theo sau.", ["This", "soup", "smells", "wonderful", "."], [2, 3], "`Smells` nối `soup` với đặc điểm `wonderful`."],
      ["Trong `They live in a beautiful old house`, chọn cụm tính từ trước danh từ.", ["They", "live", "in", "a", "beautiful", "old", "house", "."], [4, 5], "`Beautiful` là ý kiến; `old` là tuổi."],
    ],
    matchPrompt: "Ghép mỗi loại tính từ với ví dụ của nó.",
    pairs: [{ left: "ý kiến", right: "beautiful" }, { left: "kích thước", right: "small" }, { left: "màu sắc", right: "red" }, { left: "chất liệu", right: "wooden" }],
    sortPrompt: "Phân loại tính từ theo vị trí trong mỗi ví dụ.",
    buckets: ["Trước danh từ", "Sau động từ nối"],
    items: [{ text: "a quiet room", bucket: "Trước danh từ" }, { text: "two red bags", bucket: "Trước danh từ" }, { text: "her new job", bucket: "Trước danh từ" }, { text: "The room is quiet.", bucket: "Sau động từ nối" }, { text: "The bags look red.", bucket: "Sau động từ nối" }, { text: "Her job sounds interesting.", bucket: "Sau động từ nối" }],
    gridPrompts: ["Chọn vị trí đúng của tính từ.", "Chọn tính từ hay trạng từ sau động từ nối.", "Chọn trật tự hai tính từ tự nhiên."],
    gridRows: [
      { cue: "một chiếc xe mới", options: ["a new car", "an old car", "the car is new"], answer: "a new car", completed: "a new car" },
      { cue: "ngôi nhà lớn", options: ["The house is big.", "The house big.", "The house is bigly."], answer: "The house is big.", completed: "The house is big." },
      { cue: "những chiếc áo xanh", options: ["blue shirts", "a blue shirt", "red shirts"], answer: "blue shirts", completed: "blue shirts" },
      { cue: "She looks ___.", options: ["happy", "happily", "happiness"], answer: "happy", completed: "She looks happy." },
      { cue: "Thức ăn có vị ngon: The food tastes ___.", options: ["good", "bad", "well"], answer: "good", completed: "The food tastes good." },
      { cue: "The idea sounds ___.", options: ["interesting", "interestingly", "interest"], answer: "interesting", completed: "The idea sounds interesting." },
      { cue: "một ngôi nhà cổ đẹp", options: ["a beautiful old house", "a beautiful new house", "an old house"], answer: "a beautiful old house", completed: "a beautiful old house" },
      { cue: "một chiếc túi nhỏ màu đỏ", options: ["a small red bag", "a large red bag", "a small blue bag"], answer: "a small red bag", completed: "a small red bag" },
      { cue: "màu + chất liệu", options: ["a black leather bag", "a leather black bag", "a black bag leather"], answer: "a black leather bag", completed: "a black leather bag" },
    ],
  }),
  "adverbs-manner": compactPracticeSet({
    prefix: "a1am",
    focus: "trạng từ chỉ cách thức và sự khác nhau với tính từ",
    choices: [
      ["Câu nào miêu tả cách cô ấy lái xe?", ["She drives carefully.", "She drives careful.", "She carefully driver."], "She drives carefully.", "Động từ hành động `drives` được miêu tả bằng trạng từ `carefully`."],
      ["Cụm nào miêu tả một người lái xe?", ["a careful driver", "a carefully driver", "a driver carefully"], "a careful driver", "Trước danh từ `driver`, dùng tính từ `careful`."],
      ["Trạng từ của `happy` là gì?", ["happily", "happy", "happiness"], "happily", "Phụ âm + `y` đổi thành `i` trước `-ly`."],
      ["Câu nào đúng với `good/well`?", ["She sings well.", "She sings good.", "She well singer."], "She sings well.", "`Well` thường là trạng từ của `good`."],
      ["Sau `sound` trong `The music sounds ...`, dùng gì?", ["beautiful", "beautifully", "beauty"], "beautiful", "`Sound` là động từ nối, nên dùng tính từ."],
      ["Trạng từ của `fast` là gì?", ["fast", "fastly", "fasterly"], "fast", "`Fast` giữ nguyên khi làm trạng từ."],
      ["Câu nào có nghĩa “Họ làm việc chăm chỉ”?", ["They work hard.", "They work hardly.", "They hard work."], "They work hard.", "`Hard` là trạng từ “chăm chỉ”; `hardly` mang nghĩa khác."],
      ["Vị trí nào tự nhiên hơn với tân ngữ?", ["She reads the story slowly.", "She reads slowly the story.", "She slowly the story reads."], "She reads the story slowly.", "Trạng từ cách thức thường đứng sau tân ngữ."],
      ["Câu nào dùng `late` đúng?", ["He comes home late.", "He comes home lately.", "He late comes home."], "He comes home late.", "`Late` là trạng từ “muộn”; `lately` nghĩa là “gần đây”."],
      ["Câu nào nói người nói không khỏe?", ["I'm not well.", "I'm very well.", "I'm not tired."], "I'm not well.", "`Well` có thể là tính từ mang nghĩa “khỏe”."],
    ],
    orders: [
      ["Sắp xếp câu “Cô ấy nói tiếng Anh rõ ràng.”", ["clearly", "English", "speaks", "She", "."], ["She", "speaks", "English", "clearly", "."], "Trạng từ đứng sau tân ngữ `English`."],
      ["Sắp xếp câu “Em bé ngủ yên lặng.”", ["quietly", "sleeps", "baby", "The", "."], ["The", "baby", "sleeps", "quietly", "."], "Không có tân ngữ nên trạng từ đứng sau động từ."],
      ["Sắp xếp cụm “một bài kiểm tra dễ”.", ["test", "an", "easy"], ["an", "easy", "test"], "Trước danh từ, dùng tính từ `easy`."],
      ["Sắp xếp câu “Cô ấy hoàn thành bài kiểm tra dễ dàng.”", ["test", "finishes", "easily", "the", "She", "."], ["She", "finishes", "the", "test", "easily", "."], "Miêu tả hành động `finishes` bằng `easily`."],
    ],
    repairs: [
      ["Chọn trạng từ phù hợp để miêu tả `writes`.", ["He", "writes", "careful", "."], 2, ["carefully", "careful", "care"], "carefully", "Động từ hành động cần trạng từ cách thức."],
      ["Chọn tính từ phù hợp sau động từ nối `looks`.", ["She", "looks", "happily", "."], 2, ["happy", "happily", "happiness"], "happy", "`Looks` nối chủ ngữ với đặc điểm, nên dùng tính từ."],
      ["Chọn trạng từ có nghĩa “hay/giỏi” để miêu tả cách họ chơi.", ["They", "play", "good", "."], 2, ["well", "badly", "slowly"], "well", "Dùng `well` để miêu tả cách họ chơi."],
    ],
    taps: [
      ["Trong `The careful student writes carefully`, chọn tính từ rồi trạng từ.", ["The", "careful", "student", "writes", "carefully", "."], [1, 4], "`Careful` miêu tả `student`; `carefully` miêu tả `writes`."],
      ["Trong `The food smells good but tastes strange`, chọn hai tính từ sau động từ nối.", ["The", "food", "smells", "good", "but", "tastes", "strange", "."], [3, 6], "`Good` và `strange` miêu tả `food`."],
      ["Trong `He works hard and runs fast`, chọn hai trạng từ không có `-ly`.", ["He", "works", "hard", "and", "runs", "fast", "."], [2, 5], "`Hard` và `fast` giữ nguyên khi làm trạng từ."],
    ],
    matchPrompt: "Ghép mỗi tính từ với trạng từ chỉ cách thức tương ứng.",
    pairs: [{ left: "slow", right: "slowly" }, { left: "careful", right: "carefully" }, { left: "happy", right: "happily" }, { left: "good", right: "well" }],
    sortPrompt: "Phân loại từ in đậm theo công việc tính từ hoặc trạng từ.",
    buckets: ["Tính từ", "Trạng từ"],
    items: [{ text: "a quiet room", bucket: "Tính từ" }, { text: "The room is quiet.", bucket: "Tính từ" }, { text: "a fast car", bucket: "Tính từ" }, { text: "Speak quietly.", bucket: "Trạng từ" }, { text: "Drive carefully.", bucket: "Trạng từ" }, { text: "The car moves fast.", bucket: "Trạng từ" }],
    gridPrompts: ["Chọn tính từ hoặc trạng từ theo từ được miêu tả.", "Chọn dạng đặc biệt đúng.", "Chọn vị trí tự nhiên của trạng từ cách thức."],
    gridRows: [
      { cue: "a ___ speaker", options: ["clear", "clearly", "clearness"], answer: "clear", completed: "a clear speaker" },
      { cue: "She speaks ___.", options: ["clearly", "clear", "clearness"], answer: "clearly", completed: "She speaks clearly." },
      { cue: "The water feels ___.", options: ["cold", "coldly", "coldness"], answer: "cold", completed: "The water feels cold." },
      { cue: "Cô ấy hát hay: She sings ___.", options: ["well", "badly", "quietly"], answer: "well", completed: "She sings well." },
      { cue: "He runs ___.", options: ["fast", "fastly", "fasterly"], answer: "fast", completed: "He runs fast." },
      { cue: "They work ___.", options: ["hard", "hardly", "carefully"], answer: "hard", completed: "They work hard." },
      { cue: "read + the letter + slowly", options: ["Read the letter slowly.", "Read slowly the letter.", "Slowly the letter read."], answer: "Read the letter slowly.", completed: "Read the letter slowly." },
      { cue: "sleep + quietly", options: ["The baby sleeps quietly.", "The baby quietly sleepsly.", "The quietly baby sleeps."], answer: "The baby sleeps quietly.", completed: "The baby sleeps quietly." },
      { cue: "speak + English + well", options: ["They speak English well.", "They speak well English.", "They well speak English."], answer: "They speak English well.", completed: "They speak English well." },
    ],
  }),
  "sentence-order": compactPracticeSet({
    prefix: "a1so",
    focus: "trật tự tân ngữ, cách thức, nơi chốn và thời gian",
    choices: [
      ["Câu nào có trật tự trung tính tự nhiên?", ["She reads books quietly at home every night.", "She reads quietly books every night at home.", "Every night books she quietly reads home."], "She reads books quietly at home every night.", "Khung trung tính là động từ + tân ngữ + cách thức + nơi chốn + thời gian."],
      ["Phần nào thường đứng sát động từ có tân ngữ?", ["tân ngữ", "thời gian", "nơi chốn"], "tân ngữ", "Không thường chen trạng từ cách thức giữa động từ và tân ngữ."],
      ["Câu nào đúng?", ["He speaks English well.", "He speaks well English.", "He English speaks well."], "He speaks English well.", "Tân ngữ `English` đứng trước trạng từ `well`."],
      ["Trật tự nào thường dùng khi có cả nơi và thời gian?", ["nơi chốn rồi thời gian", "thời gian rồi tân ngữ", "cách thức rồi chủ ngữ"], "nơi chốn rồi thời gian", "Trong khung trung tính, nơi chốn thường đứng trước thời gian."],
      ["Câu nào đặt nơi chốn trước thời gian theo trật tự trung tính?", ["I study at home in the evening.", "I study in the evening at home.", "I at home study in the evening."], "I study at home in the evening.", "Trong trật tự trung tính của bài, nơi chốn `at home` đứng trước thời gian `in the evening`."],
      ["Vị trí thông thường của `often` trong câu `I ... read at home` là đâu?", ["trước `read`", "sau `home` bắt buộc", "giữa `read` và tân ngữ"], "trước `read`", "Trạng từ tần suất một từ thường đứng trước động từ thường."],
      ["Câu nào đúng với `be` và `always`?", ["She is always friendly.", "She always is friendly.", "She is friendly alwaysly."], "She is always friendly.", "Trạng từ tần suất thường đứng sau `be`."],
      ["Câu nào không cần tân ngữ?", ["The baby sleeps quietly.", "She reads quietly.", "cả hai câu"], "cả hai câu", "`Sleep` không cần tân ngữ; `read` có thể dùng không tân ngữ khi vật được đọc không cần nêu."],
      ["Câu nào đặt cụm chỉ số lần tự nhiên?", ["We swim twice a week.", "We twice a week swim.", "Twice swim we a week."], "We swim twice a week.", "Cụm chỉ số lần thường đứng cuối."],
      ["Khung nào đúng?", ["S + V + O + manner + place + time", "S + O + time + V + manner", "V + S + place + O + time"], "S + V + O + manner + place + time", "Đây là khung trật tự trung tính được học."],
    ],
    orders: [
      ["Sắp xếp câu “Họ nói tiếng Anh rõ ràng ở nơi làm việc mỗi ngày.”", ["work", "English", "They", "every", "at", "clearly", "speak", "day", "."], ["They", "speak", "English", "clearly", "at", "work", "every", "day", "."], "Tân ngữ → cách thức → nơi chốn → thời gian."],
      ["Sắp xếp câu “Cô ấy chơi đàn piano giỏi ở trường vào thứ Sáu.”", ["Friday", "school", "plays", "on", "the", "well", "She", "piano", "at", "."], ["She", "plays", "the", "piano", "well", "at", "school", "on", "Friday", "."], "Đặt `the piano` trước `well`, rồi nơi và thời gian."],
      ["Sắp xếp câu “Tôi uống cà phê ở nhà vào buổi sáng.”", ["coffee", "morning", "drink", "home", "I", "in", "the", "at", "."], ["I", "drink", "coffee", "at", "home", "in", "the", "morning", "."], "Tân ngữ đứng sau động từ, rồi đến nơi chốn và thời gian."],
      ["Sắp xếp câu “Chúng tôi thường ăn tối ở nhà.”", ["dinner", "often", "home", "eat", "at", "We", "."], ["We", "often", "eat", "dinner", "at", "home", "."], "`Often` đứng trước động từ; tân ngữ đứng sau động từ."],
    ],
    repairs: [
      ["Chọn vị trí đúng cho `slowly`.", ["She", "reads", "slowly the letter", "."], 2, ["the letter slowly", "slowly the letter", "the slowly letter"], "the letter slowly", "Tân ngữ đứng trước trạng từ cách thức."],
      ["Chọn trật tự nơi chốn và thời gian trung tính.", ["They", "work", "every day at home", "."], 2, ["at home every day", "every day at home", "home at every day"], "at home every day", "Nơi chốn thường đứng trước thời gian."],
      ["Chọn vị trí đúng cho `always` với `be`.", ["Lan", "always is", "kind", "."], 1, ["is always", "always is", "is kind always"], "is always", "Trạng từ tần suất thường đứng sau `be`."],
    ],
    taps: [
      ["Trong `She writes emails carefully at work every morning`, chọn tân ngữ, cách thức, nơi chốn và thời gian.", ["She", "writes", "emails", "carefully", "at", "work", "every", "morning", "."], [2, 3, 4, 5, 6, 7], "Các phần sau động từ đi theo đúng trật tự O–cách thức–nơi–thời gian."],
      ["Trong `We often speak English at school`, chọn cụm nơi chốn.", ["We", "often", "speak", "English", "at", "school", "."], [4, 5], "`At school` trả lời câu hỏi “ở đâu”."],
      ["Trong `They are usually at home on Sunday`, chọn trạng từ tần suất.", ["They", "are", "usually", "at", "home", "on", "Sunday", "."], [2], "`Usually` đứng sau `are`."],
    ],
    matchPrompt: "Ghép mỗi thành phần câu với câu hỏi mà nó trả lời.",
    pairs: [{ left: "tân ngữ", right: "ai/cái gì?" }, { left: "cách thức", right: "như thế nào?" }, { left: "nơi chốn", right: "ở đâu?" }, { left: "thời gian", right: "khi nào?" }],
    sortPrompt: "Phân loại cụm theo chức năng trong câu.",
    buckets: ["Tân ngữ", "Cách thức", "Nơi chốn", "Thời gian"],
    items: [{ text: "English", bucket: "Tân ngữ" }, { text: "the letter", bucket: "Tân ngữ" }, { text: "carefully", bucket: "Cách thức" }, { text: "well", bucket: "Cách thức" }, { text: "at home", bucket: "Nơi chốn" }, { text: "every day", bucket: "Thời gian" }],
    gridPrompts: ["Chọn câu có trật tự tân ngữ và cách thức đúng.", "Chọn câu có trật tự nơi chốn và thời gian trung tính.", "Chọn vị trí đúng của trạng từ tần suất."],
    gridRows: [
      { cue: "read / the book / slowly", options: ["Read the book slowly.", "Read slowly the book.", "The slowly book read."], answer: "Read the book slowly.", completed: "Read the book slowly." },
      { cue: "speak / English / well", options: ["Speak English well.", "Speak well English.", "English well speak."], answer: "Speak English well.", completed: "Speak English well." },
      { cue: "write / the answer / clearly", options: ["Write the answer clearly.", "Write clearly the answer.", "Clearly the answer write."], answer: "Write the answer clearly.", completed: "Write the answer clearly." },
      { cue: "work / in Hanoi / every week", options: ["They work in Hanoi every week.", "They work every week in Hanoi.", "They in Hanoi every week work."], answer: "They work in Hanoi every week.", completed: "They work in Hanoi every week." },
      { cue: "play / in the park / on Sunday", options: ["We play in the park on Sunday.", "We play on Sunday in the park.", "We in the park on Sunday play."], answer: "We play in the park on Sunday.", completed: "We play in the park on Sunday." },
      { cue: "study / at home / at night", options: ["I study at home at night.", "I study at night at home.", "I at home study at night."], answer: "I study at home at night.", completed: "I study at home at night." },
      { cue: "often + read", options: ["I often read.", "I read oftenly.", "Often I read always."], answer: "I often read.", completed: "I often read." },
      { cue: "always + be", options: ["She is always kind.", "She always is kind.", "She is kind alwaysly."], answer: "She is always kind.", completed: "She is always kind." },
      { cue: "twice a week", options: ["We swim twice a week.", "We twice a week swim.", "We swim week twice a."], answer: "We swim twice a week.", completed: "We swim twice a week." },
    ],
  }),
  "connectors-basic": [
    {
      "id": "o3",
      "kind": "choice",
      "prompt": "I am tired, ___ I stay home. (Tôi mệt, vì vậy tôi ở nhà.)",
      "hint": "Vế sau là kết quả của việc mệt.",
      "explanation": "so nối nguyên nhân I am tired với kết quả I stay home.",
      "options": [
        "and",
        "because",
        "so"
      ],
      "answer": "so"
    },
    {
      "id": "o5",
      "kind": "tap",
      "prompt": "Chạm vào từ nối chỉ kết quả.",
      "hint": "Kết quả thường được giới thiệu bằng so.",
      "explanation": "so nối nguyên nhân với kết quả.",
      "tokens": [
        "and",
        "but",
        "because",
        "so"
      ],
      "answerIndexes": [
        3
      ],
      "selectionMode": "single"
    },
    {
      "id": "o7",
      "kind": "context",
      "prompt": "Chọn từ nối phù hợp.",
      "hint": "Vế sau là kết quả.",
      "explanation": "so giới thiệu kết quả.",
      "context": "Tôi mệt, vì vậy tôi không làm việc.",
      "options": [
        "and",
        "because",
        "so"
      ],
      "answer": "so"
    },
    {
      "id": "co4",
      "kind": "choice",
      "prompt": "I read ___ write. (Tôi đọc và viết.)",
      "hint": "Hai hành động đều được thêm vào.",
      "explanation": "and có nghĩa là và.",
      "options": [
        "and",
        "but",
        "because"
      ],
      "answer": "and"
    },
    {
      "id": "co5",
      "kind": "choice",
      "prompt": "She is tired ___ she works. (Cô ấy mệt nhưng vẫn làm việc.)",
      "hint": "Hai ý đi theo hướng tương phản.",
      "explanation": "but báo hiệu sự tương phản.",
      "options": [
        "and",
        "but",
        "so"
      ],
      "answer": "but"
    },
    {
      "id": "co6",
      "kind": "choice",
      "prompt": "Tea ___ coffee? (Trà hay cà phê?)",
      "hint": "Người nghe chọn một trong hai.",
      "explanation": "or đưa ra lựa chọn.",
      "options": [
        "or",
        "and",
        "because"
      ],
      "answer": "or"
    },
    {
      "id": "co7",
      "kind": "match",
      "prompt": "Mỗi từ nối có một công việc chính trong bài này.",
      "hint": "Đọc quan hệ tiếng Việt trước.",
      "explanation": "Năm từ nối đã được ghép theo đúng ý nghĩa.",
      "pairs": [
        {
          "left": "thêm ý",
          "right": "and"
        },
        {
          "left": "tương phản",
          "right": "but"
        },
        {
          "left": "lựa chọn",
          "right": "or"
        },
        {
          "left": "nguyên nhân",
          "right": "because"
        },
        {
          "left": "kết quả",
          "right": "so"
        }
      ]
    },
    {
      "id": "co8",
      "kind": "grid",
      "prompt": "Xác định quan hệ giữa hai vế.",
      "hint": "Tìm nguyên nhân, kết quả hoặc sự trái hướng.",
      "explanation": "Mỗi từ nối phản ánh đúng quan hệ của hai vế.",
      "rows": [
        {
          "cue": "Tôi ở nhà ___ tôi mệt. (nêu lý do)",
          "options": [
            "because",
            "so",
            "but"
          ],
          "answer": "because",
          "completed": "I stay home because I am tired."
        },
        {
          "cue": "Tôi mệt ___ tôi ở nhà. (nêu kết quả)",
          "options": [
            "because",
            "so",
            "or"
          ],
          "answer": "so",
          "completed": "I am tired so I stay home."
        },
        {
          "cue": "Tôi mệt ___ tôi vẫn đọc. (tương phản)",
          "options": [
            "and",
            "but",
            "because"
          ],
          "answer": "but",
          "completed": "I am tired but I read."
        }
      ]
    },
    {
      "id": "co9",
      "kind": "choice",
      "prompt": "Câu nào diễn đạt đúng “Vì tôi mệt nên tôi ở nhà” theo mẫu đã học?",
      "hint": "Chọn because hoặc so cho cùng một mối liên hệ, không dùng cả hai.",
      "explanation": "`I stay home because I am tired` đặt kết quả trước và lý do sau `because`.",
      "options": [
        "I stay home because I am tired.",
        "I stay home because so I am tired.",
        "I am tired because I stay home."
      ],
      "answer": "I stay home because I am tired."
    },
    {
      "id": "co10",
      "kind": "grid",
      "prompt": "Xác định quan hệ giữa hai ý trước khi chọn từ.",
      "hint": "and thêm ý; but tương phản; because nêu lý do.",
      "explanation": "Ba câu mới đã dùng đúng quan hệ ý nghĩa.",
      "rows": [
        {
          "cue": "Lan làm việc ___ học.",
          "options": [
            "and",
            "but",
            "because"
          ],
          "answer": "and",
          "completed": "Lan works and studies."
        },
        {
          "cue": "Lan mệt ___ cô ấy vẫn học.",
          "options": [
            "but",
            "so",
            "or"
          ],
          "answer": "but",
          "completed": "Lan is tired but she studies."
        },
        {
          "cue": "Chúng tôi ở nhà ___ chúng tôi mệt.",
          "options": [
            "because",
            "so",
            "or"
          ],
          "answer": "because",
          "completed": "We stay home because we are tired."
        }
      ]
    }
  ],
};

const a1Chapter10TopUps: Partial<Record<string, Exercise[]>> = {
  "connectors-basic": [
    ...binaryChoiceDrills("a1cox", 1, "and, but, or, because và so", [
      ["thêm hai hoạt động", "She reads and writes.", "She reads but writes.", "`And` thêm thông tin cùng hướng."],
      ["nối hai tính từ tương phản", "small but useful", "small and useful", "`But` nhấn mạnh sự tương phản."],
      ["đưa ra lựa chọn đồ uống", "Tea or coffee?", "Tea because coffee?", "`Or` đưa ra lựa chọn."],
      ["đưa ra lý do ở nhà", "I stay home because I'm tired.", "I stay home so I'm tired.", "Sau `because` là lý do."],
      ["đưa ra kết quả của việc mệt", "I'm tired so I stay home.", "I'm tired because I stay home.", "Sau `so` là kết quả."],
      ["nêu lý do không đi ra ngoài", "We don't go out because it's raining.", "We don't go out so because it's raining.", "`Because` đứng trước phần nêu lý do trời đang mưa."],
      ["nối hai ý tương phản", "I like coffee but don't drink it at night.", "I like coffee because don't drink it at night.", "`But` nối hai ý tương phản có cùng chủ ngữ `I`."],
      ["nối hai màu cùng được nhắc đến", "black and white", "black because white", "`And` thêm màu thứ hai."],
      ["hỏi nguyên nhân bằng `why`", "Why are you late? — Because the bus is late.", "Why are you late? — So the bus is late.", "Câu hỏi `why` được trả lời bằng lý do với `because`."],
      ["kết quả của trời mưa", "It's raining so we can't go out.", "It's raining because we can't go out.", "Trời mưa là nguyên nhân; không ra ngoài là kết quả."],
      ["hai lựa chọn hành động", "We can walk or take the bus.", "We can walk so take the bus.", "`Or` nối hai phương án."],
      ["hai đối tượng cùng được thích", "I like apples and oranges.", "I like apples because oranges.", "`And` thêm đối tượng thứ hai."],
    ]),
    {
      id: "a1cox13", kind: "order", prompt: "Sắp xếp câu “Tôi khát nên tôi uống nước.”",
      tokens: ["water", "I’m", "drink", "so", "I", "thirsty", "."],
      answer: ["I’m", "thirsty", "so", "I", "drink", "water", "."],
      hint: "Đặt nguyên nhân trước `so` và kết quả sau nó.", explanation: "`So` giới thiệu kết quả uống nước.",
    },
    {
      id: "a1cox14", kind: "repair", prompt: "Chọn từ nối thể hiện lý do.",
      tokens: ["She", "studies", "English", "so", "she", "needs", "it", "for", "work", "."], targetIndex: 3,
      replacements: ["because", "so", "or"], answer: "because",
      hint: "Phần sau giải thích tại sao cô ấy học.", explanation: "`Because she needs it for work` là lý do.",
    },
    {
      id: "a1cox15", kind: "sort", prompt: "Phân loại từ nối theo quan hệ chính.",
      buckets: ["Thêm", "Tương phản", "Lựa chọn", "Lý do", "Kết quả"],
      items: [{ text: "and", bucket: "Thêm" }, { text: "but", bucket: "Tương phản" }, { text: "or", bucket: "Lựa chọn" }, { text: "because", bucket: "Lý do" }, { text: "so", bucket: "Kết quả" }],
      hint: "Mỗi từ nối báo một quan hệ khác nhau.", explanation: "And–thêm, but–tương phản, or–lựa chọn, because–lý do, so–kết quả.",
    },
  ],
};

const a1Chapter10DepthExtensions: Partial<Record<string, Exercise[]>> = {
  "connectors-basic": [
    {
      id: "a1depth-con-1", kind: "grid", prompt: "Chọn từ nối theo quan hệ thật sự giữa hai ý trong mỗi câu.",
      hint: "Xác định ý sau đang bổ sung, tương phản, đưa lựa chọn, nêu lý do hay nêu kết quả.",
      explanation: "`And`, `but`, `because` được chọn theo quan hệ ý nghĩa giữa hai vế.",
      rows: [
        { cue: "The café is small ___ friendly.", options: ["and", "because", "so"], answer: "and", completed: "The café is small and friendly." },
        { cue: "The bag is old ___ still useful.", options: ["but", "or", "because"], answer: "but", completed: "The bag is old but still useful." },
        { cue: "We take an umbrella ___ it is raining.", options: ["because", "so", "or"], answer: "because", completed: "We take an umbrella because it is raining." },
      ],
    },
    {
      id: "a1depth-con-2", kind: "match", prompt: "Ghép mỗi cặp ý với quan hệ mà từ nối cần thể hiện.",
      hint: "Đọc hai ý như một thông điệp hoàn chỉnh rồi xác định quan hệ giữa chúng.",
      explanation: "Mỗi cặp ý có một quan hệ chính: bổ sung, tương phản, lựa chọn hoặc nguyên nhân–kết quả.",
      pairs: [
        { left: "Lan reads. Lan writes.", right: "bổ sung — and" },
        { left: "The road is long. We keep walking.", right: "tương phản — but" },
        { left: "We can cook. We can eat outside.", right: "lựa chọn — or" },
        { left: "The shop is closed. We go home.", right: "nguyên nhân–kết quả — so" },
      ],
    },
  ],
};

export const a1Chapter10ExerciseData = mergeExerciseRecords(
  a1Chapter10BaseExerciseData,
  a1Chapter10TopUps,
  a1Chapter10DepthExtensions,
);
