/* Luyện tập A1 — Chương 10: Tính từ, trạng từ và trật tự câu. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { binaryChoiceDrills, compactPracticeSet } from "../../basic-builders.ts";

const a1Chapter10BaseExerciseData: Record<string, Exercise[]> = {
  "adjectives-position": compactPracticeSet({
    prefix: "a1aj",
    focus: "vị trí và thứ tự cơ bản của tính từ",
    choices: [
      ["Cụm nào có nghĩa “một ngôi nhà nhỏ”?", ["a small house", "the house is small", "a house small"], "a small house", "Muốn gọi tên vật, đặt tính từ ngay trước danh từ; không cần động từ nối."],
      ["Câu nào nói rằng ngôi nhà nhỏ?", ["The house is small.", "A small house.", "The house small."], "The house is small.", "Muốn nói chủ ngữ có đặc điểm gì, cần động từ nối `is` đứng giữa chủ ngữ và tính từ."],
      ["Câu nào dùng tính từ đúng sau `look`?", ["You look tired.", "You look tiredly.", "You tired look."], "You look tired.", "`Look` là động từ nối trong câu này nên theo sau bằng tính từ."],
      ["Cụm nào diễn đạt tự nhiên nhất ý “một ngôi nhà cổ đẹp”?", ["a beautiful old house", "an old beautiful house", "a beautiful house old"], "a beautiful old house", "Tính từ chỉ ý kiến thường đứng trước tính từ chỉ tuổi, và cả hai đứng trước danh từ."],
      ["Cụm nào có nghĩa “hai con mèo nhỏ”?", ["two small cats", "two cats small", "two small cat"], "two small cats", "Tính từ đứng trước danh từ và giữ nguyên; chỉ danh từ mới thêm `-s` để chỉ số nhiều."],
      ["Câu nào có nghĩa “Món súp có mùi thơm”?", ["The soup smells good.", "The soup good smells.", "The soup is smells good."], "The soup smells good.", "`Smells` đã là động từ nối của câu, nên không thêm `is`; tính từ đứng sau động từ nối."],
      ["Tính từ chỉ ý kiến nào thường đứng trước `small`?", ["nice", "wooden", "red"], "nice", "Ý kiến thường đứng trước kích thước."],
      ["Cụm nào có thứ tự màu sắc trước chất liệu?", ["a red wooden chair", "a wooden red chair", "a red chair wooden"], "a red wooden chair", "Màu sắc thường đứng trước chất liệu."],
      ["Câu nào nối hai đặc điểm sau `be`?", ["The room is clean and quiet.", "The room is clean quietly.", "The clean and quiet room is."], "The room is clean and quiet.", "Hai tính từ sau `be` có thể nối bằng `and`."],
      ["Từ nào nên dùng trong `The music sounds ...`?", ["beautiful", "beautifully", "beauty"], "beautiful", "`Sounds` là động từ nối; tính từ miêu tả bản nhạc."],
    ],
    orders: [
      ["Sắp xếp cụm “một căn phòng nhỏ xinh xắn”.", ["room", "nice", "a", "small"], ["a", "nice", "small", "room"], "Ý kiến `nice` đứng trước kích thước `small`."],
      ["Sắp xếp câu “Những quả táo đỏ này còn tươi.”", ["fresh", "red", "These", "are", "apples", "."], ["These", "red", "apples", "are", "fresh", "."], "`Red` đứng trước danh từ; `fresh` đứng sau `are`."],
      ["Sắp xếp cụm “một chiếc bàn gỗ cũ”.", ["table", "wooden", "an", "old"], ["an", "old", "wooden", "table"], "Tuổi `old` đứng trước chất liệu `wooden`."],
      ["Sắp xếp câu “Bạn trông vui.”", ["happy", "look", "You", "."], ["You", "look", "happy", "."], "`Look` nối chủ ngữ với tính từ `happy`."],
    ],
    repairs: [
      ["Chọn dạng tính từ đúng trước danh từ.", ["She", "has", "a", "beautifully", "voice", "."], 3, ["beautiful", "beautifully", "beauty"], "beautiful", "Trước danh từ `voice`, dùng tính từ `beautiful`."],
      ["Chọn dạng đúng sau động từ nối.", ["The", "children", "are", "happily", "."], 3, ["happy", "happily", "happiness"], "happy", "Sau `are`, dùng tính từ `happy`."],
      ["Sửa cụm “một chiếc hộp gỗ nhỏ” cho đúng trật tự.", ["It", "is", "a", "wooden small box", "."], 3, ["small wooden box", "wooden small box", "small box wooden"], "small wooden box", "Kích thước đứng trước chất liệu, và cả hai tính từ đứng trước danh từ."],
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
      { cue: "một chiếc xe mới", options: ["a new car", "a car new", "the car is new"], answer: "a new car", completed: "a new car" },
      { cue: "Nói rằng ngôi nhà lớn", options: ["The house is big.", "The house big.", "The house is a big."], answer: "The house is big.", completed: "The house is big." },
      { cue: "những chiếc áo xanh", options: ["blue shirts", "a blue shirt", "shirts blue"], answer: "blue shirts", completed: "blue shirts" },
      { cue: "She looks ___.", options: ["happy", "happily", "happiness"], answer: "happy", completed: "She looks happy." },
      { cue: "Thức ăn có vị ngon: The food tastes ___.", options: ["good", "bad", "well"], answer: "good", completed: "The food tastes good." },
      { cue: "The idea sounds ___.", options: ["interesting", "interestingly", "interest"], answer: "interesting", completed: "The idea sounds interesting." },
      { cue: "một chiếc váy mới xinh", options: ["a nice new dress", "a new nice dress", "a nice dress new"], answer: "a nice new dress", completed: "a nice new dress" },
      { cue: "một chiếc túi nhỏ màu đỏ", options: ["a small red bag", "a red small bag", "a small bag red"], answer: "a small red bag", completed: "a small red bag" },
      { cue: "một chiếc hộp nhựa màu xanh", options: ["a blue plastic box", "a plastic blue box", "a blue box plastic"], answer: "a blue plastic box", completed: "a blue plastic box" },
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
      ["Từ nào nên dùng sau `smells` trong câu `The bread smells ___`?", ["fresh", "freshly", "freshness"], "fresh", "`Smell` ở đây là động từ nối miêu tả ổ bánh mì, nên dùng tính từ."],
      ["Câu nào có nghĩa “Cô ấy nói nhanh”?", ["She speaks fast.", "She speaks fastly.", "She fast speaks."], "She speaks fast.", "`Fast` giữ nguyên khi làm trạng từ và đứng sau động từ `speaks`."],
      ["Câu nào có nghĩa “Họ làm việc chăm chỉ”?", ["They work hard.", "They work hardly.", "They hard work."], "They work hard.", "`Hard` là trạng từ “chăm chỉ”; `hardly` mang nghĩa khác."],
      ["Vị trí nào tự nhiên hơn với tân ngữ?", ["She reads the story slowly.", "She reads slowly the story.", "She slowly the story reads."], "She reads the story slowly.", "Trạng từ cách thức thường đứng sau tân ngữ."],
      ["Câu nào dùng `late` đúng?", ["He comes home late.", "He comes home lately.", "He late comes home."], "He comes home late.", "`Late` là trạng từ “muộn”; `lately` nghĩa là “gần đây”."],
      ["Câu nào nói người nói không khỏe?", ["I'm not well.", "I'm very well.", "I'm not tired."], "I'm not well.", "`Well` có thể là tính từ mang nghĩa “khỏe”."],
    ],
    orders: [
      ["Sắp xếp câu “Cô ấy nói tiếng Anh rõ ràng.”", ["clearly", "English", "speaks", "She", "."], ["She", "speaks", "English", "clearly", "."], "Trạng từ đứng sau tân ngữ `English`."],
      ["Sắp xếp câu “Em bé ngủ yên lặng.”", ["quietly", "sleeps", "baby", "The", "."], ["The", "baby", "sleeps", "quietly", "."], "Không có tân ngữ nên trạng từ đứng sau động từ.", [["The", "baby", "quietly", "sleeps", "."]]],
      ["Sắp xếp cụm “một bài kiểm tra dễ”.", ["test", "an", "easy"], ["an", "easy", "test"], "Trước danh từ, dùng tính từ `easy`."],
      ["Sắp xếp câu “Cô ấy hoàn thành bài kiểm tra dễ dàng.”", ["test", "finishes", "easily", "the", "She", "."], ["She", "finishes", "the", "test", "easily", "."], "Miêu tả hành động `finishes` bằng `easily`.", [["She", "easily", "finishes", "the", "test", "."]]],
    ],
    repairs: [
      ["Chọn trạng từ phù hợp để miêu tả `writes`.", ["He", "writes", "careful", "."], 2, ["carefully", "careful", "care"], "carefully", "Động từ hành động cần trạng từ cách thức."],
      ["Chọn tính từ phù hợp sau động từ nối `looks`.", ["She", "looks", "happily", "."], 2, ["happy", "happily", "happiness"], "happy", "`Looks` nối chủ ngữ với đặc điểm, nên dùng tính từ."],
      ["Chọn trạng từ có nghĩa “hay/giỏi” để miêu tả cách họ chơi.", ["They", "play", "good", "."], 2, ["well", "good", "badly"], "well", "Miêu tả cách một hành động diễn ra cần trạng từ; trạng từ tương ứng với `good` không thêm `-ly`."],
    ],
    taps: [
      ["Trong `The careful student writes carefully`, chọn tính từ rồi trạng từ.", ["The", "careful", "student", "writes", "carefully", "."], [1, 4], "`Careful` miêu tả `student`; `carefully` miêu tả `writes`."],
      ["Trong `The food smells good but tastes strange`, chọn hai tính từ sau động từ nối.", ["The", "food", "smells", "good", "but", "tastes", "strange", "."], [3, 6], "`Good` và `strange` miêu tả `food`."],
      ["Trong `He works hard and runs fast`, chọn hai trạng từ không có `-ly`.", ["He", "works", "hard", "and", "runs", "fast", "."], [2, 5], "`Hard` và `fast` giữ nguyên khi làm trạng từ."],
    ],
    matchPrompt: "Ghép mỗi tính từ với trạng từ chỉ cách thức tương ứng.",
    pairs: [{ left: "slow", right: "slowly" }, { left: "careful", right: "carefully" }, { left: "happy", right: "happily" }, { left: "good", right: "well" }],
    sortPrompt: "Phân loại từng mục theo công việc của từ chỉ tính chất trong đó: tính từ hay trạng từ.",
    buckets: ["Tính từ", "Trạng từ"],
    items: [{ text: "a quiet room", bucket: "Tính từ" }, { text: "The room is quiet.", bucket: "Tính từ" }, { text: "a fast car", bucket: "Tính từ" }, { text: "Speak quietly.", bucket: "Trạng từ" }, { text: "Drive carefully.", bucket: "Trạng từ" }, { text: "The car moves fast.", bucket: "Trạng từ" }],
    gridPrompts: ["Chọn tính từ hoặc trạng từ theo từ được miêu tả.", "Chọn trạng từ đúng; một số trạng từ không thêm `-ly`.", "Chọn vị trí tự nhiên của trạng từ cách thức."],
    gridRows: [
      { cue: "a ___ speaker", options: ["clear", "clearly", "clearness"], answer: "clear", completed: "a clear speaker" },
      { cue: "She speaks ___.", options: ["clearly", "clear", "clearness"], answer: "clearly", completed: "She speaks clearly." },
      { cue: "The water feels ___.", options: ["cold", "coldly", "coldness"], answer: "cold", completed: "The water feels cold." },
      { cue: "Cô ấy hát hay: She sings ___.", options: ["well", "good", "badly"], answer: "well", completed: "She sings well." },
      { cue: "Tàu chạy nhanh: The train goes ___.", options: ["fast", "fastly", "slowly"], answer: "fast", completed: "The train goes fast." },
      { cue: "Họ làm việc chăm chỉ: They work ___.", options: ["hard", "hardly", "hardness"], answer: "hard", completed: "They work hard." },
      { cue: "read + the letter + slowly", options: ["Read the letter slowly.", "Read slowly the letter.", "Slowly the letter read."], answer: "Read the letter slowly.", completed: "Read the letter slowly." },
      { cue: "sleep + quietly", options: ["The baby sleeps quietly.", "The baby sleeps quiet.", "The quietly baby sleeps."], answer: "The baby sleeps quietly.", completed: "The baby sleeps quietly." },
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
      ["Muốn thêm `often` vào câu `I read books at home`, đặt nó ở đâu là tự nhiên nhất?", ["trước `read`", "giữa `read` và `books`", "giữa `at` và `home`"], "trước `read`", "Trạng từ tần suất một từ thường đứng trước động từ thường; nó không chen vào giữa động từ và tân ngữ, cũng không tách một cụm nơi chốn."],
      ["Câu nào đúng với `be` và `always`?", ["She is always friendly.", "She always is friendly.", "She is friendly always."], "She is always friendly.", "Trạng từ tần suất thường đứng sau `be`."],
      ["Câu nào không có tân ngữ?", ["The baby sleeps quietly.", "She reads a book quietly.", "He speaks English well."], "The baby sleeps quietly.", "`Sleep` không cần tân ngữ: sau `sleeps` chỉ có trạng từ `quietly`. Hai câu kia có tân ngữ `a book` và `English` đứng ngay sau động từ."],
      ["Câu nào đặt cụm chỉ số lần tự nhiên?", ["We swim twice a week.", "We twice a week swim.", "Twice swim we a week."], "We swim twice a week.", "Cụm chỉ số lần thường đứng cuối."],
      ["Khung nào đúng?", ["S + V + O + manner + place + time", "S + O + time + V + manner", "V + S + place + O + time"], "S + V + O + manner + place + time", "Đây là khung trật tự trung tính được học."],
    ],
    orders: [
      ["Sắp xếp câu “Họ nói tiếng Anh rõ ràng ở nơi làm việc mỗi ngày.”", ["work", "English", "They", "every", "at", "clearly", "speak", "day", "."], ["They", "speak", "English", "clearly", "at", "work", "every", "day", "."], "Tân ngữ → cách thức → nơi chốn → thời gian."],
      ["Sắp xếp câu “Ngày nào bọn trẻ cũng ăn bữa trưa nhanh ở trường.”", ["school", "lunch", "eat", "every", "fast", "The", "their", "at", "children", "day", "."], ["The", "children", "eat", "their", "lunch", "fast", "at", "school", "every", "day", "."], "Tân ngữ `their lunch` đứng ngay sau động từ, rồi đến cách thức `fast`, nơi chốn và thời gian."],
      ["Sắp xếp câu “Tôi uống cà phê ở nhà vào buổi sáng.”", ["coffee", "morning", "drink", "home", "I", "in", "the", "at", "."], ["I", "drink", "coffee", "at", "home", "in", "the", "morning", "."], "Tân ngữ đứng sau động từ, rồi đến nơi chốn và thời gian."],
      ["Sắp xếp câu “Chúng tôi thường ăn tối ở nhà.”", ["dinner", "often", "home", "eat", "at", "We", "."], ["We", "often", "eat", "dinner", "at", "home", "."], "`Often` đứng trước động từ; tân ngữ đứng sau động từ."],
    ],
    repairs: [
      ["Chọn vị trí đúng cho `slowly`.", ["She", "reads", "slowly the letter", "."], 2, ["the letter slowly", "slowly the letter", "the slowly letter"], "the letter slowly", "Tân ngữ đứng trước trạng từ cách thức."],
      ["Chọn trật tự nơi chốn và thời gian trung tính.", ["They", "work", "every day at home", "."], 2, ["at home every day", "every day at home", "home at every day"], "at home every day", "Nơi chốn thường đứng trước thời gian."],
      ["Chọn vị trí đúng cho `always` với `be`.", ["Lan", "always is", "kind", "."], 1, ["is always", "always is", "always"], "is always", "Trạng từ tần suất thường đứng sau `be`, và câu vẫn cần `be` trước tính từ."],
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
    gridPrompts: ["Chọn câu có trật tự tân ngữ và cách thức đúng.", "Chọn câu có trật tự nơi chốn và thời gian trung tính.", "Chọn vị trí đúng của từ hoặc cụm chỉ tần suất."],
    gridRows: [
      { cue: "read / the book / slowly", options: ["Read the book slowly.", "Read slowly the book.", "The slowly book read."], answer: "Read the book slowly.", completed: "Read the book slowly." },
      { cue: "speak / English / well", options: ["Speak English well.", "Speak well English.", "English well speak."], answer: "Speak English well.", completed: "Speak English well." },
      { cue: "write / the answer / clearly", options: ["Write the answer clearly.", "Write clearly the answer.", "Clearly the answer write."], answer: "Write the answer clearly.", completed: "Write the answer clearly." },
      { cue: "work / in Hanoi / every week", options: ["They work in Hanoi every week.", "They work every week in Hanoi.", "They in Hanoi every week work."], answer: "They work in Hanoi every week.", completed: "They work in Hanoi every week." },
      { cue: "play / in the park / on Sunday", options: ["We play in the park on Sunday.", "We play on Sunday in the park.", "We in the park on Sunday play."], answer: "We play in the park on Sunday.", completed: "We play in the park on Sunday." },
      { cue: "study / at home / at night", options: ["I study at home at night.", "I study at night at home.", "I at home study at night."], answer: "I study at home at night.", completed: "I study at home at night." },
      { cue: "often + read books", options: ["I often read books.", "I read often books.", "Often I books read."], answer: "I often read books.", completed: "I often read books." },
      { cue: "never + be late", options: ["He is never late.", "He never is late.", "He is late never."], answer: "He is never late.", completed: "He is never late." },
      { cue: "once a month", options: ["We visit our grandparents once a month.", "We once a month visit our grandparents.", "We visit once a month our grandparents."], answer: "We visit our grandparents once a month.", completed: "We visit our grandparents once a month." },
    ],
  }),
  "connectors-basic": [
    {
      "id": "o3",
      "kind": "choice",
      "prompt": "The water is cold, ___ I'm not swimming. (Nước lạnh, vì vậy tôi không bơi.)",
      "hint": "Vế sau là kết quả của việc nước lạnh.",
      "explanation": "`So` nối nguyên nhân `The water is cold` với kết quả `I'm not swimming`.",
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
      "hint": "Tìm từ nối mà phần đứng sau nó là điều xảy ra do ý đứng trước.",
      "explanation": "`So` nối nguyên nhân với kết quả: phần đứng sau `so` là kết quả.",
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
      "prompt": "Chọn từ nối cho chỗ trống, biết rằng việc ăn bánh mì là kết quả của việc đói.",
      "hint": "Xác định vế nào là nguyên nhân, vế nào là kết quả, và vế nào đứng ngay sau chỗ trống.",
      "explanation": "Kết quả `I'm eating some bread` đứng sau chỗ trống, nên dùng `so`; `because` phải đứng trước nguyên nhân.",
      "context": "I'm hungry, ___ I'm eating some bread.",
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
      "prompt": "It's raining, ___ we're playing outside. (Trời đang mưa nhưng chúng tôi vẫn chơi ngoài trời.)",
      "hint": "Hai ý đi theo hướng tương phản.",
      "explanation": "`But` báo hiệu sự tương phản: trời mưa nhưng vẫn chơi ngoài trời, trái với điều ta mong đợi.",
      "options": [
        "or",
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
      "prompt": "Ghép mỗi quan hệ với từ nối diễn tả nó.",
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
      "prompt": "Chọn từ nối hợp với quan hệ giữa hai vế trong mỗi câu.",
      "hint": "Ở mỗi câu, hỏi vế đứng sau chỗ trống là lý do, kết quả hay một ý trái hướng.",
      "explanation": "Hai câu về việc ở nhà nói cùng một tình huống: `because` đứng trước lý do, `so` đứng trước kết quả. Câu về việc vẫn làm việc dùng `but` vì điều đó trái với điều ta mong đợi khi mệt.",
      "rows": [
        {
          "cue": "I'm staying at home ___ I'm tired.",
          "options": [
            "because",
            "so",
            "but"
          ],
          "answer": "because",
          "completed": "I'm staying at home because I'm tired."
        },
        {
          "cue": "I'm tired, ___ I'm staying at home.",
          "options": [
            "because",
            "so",
            "or"
          ],
          "answer": "so",
          "completed": "I'm tired, so I'm staying at home."
        },
        {
          "cue": "I'm tired, ___ I'm still working.",
          "options": [
            "so",
            "but",
            "because"
          ],
          "answer": "but",
          "completed": "I'm tired, but I'm still working."
        }
      ]
    },
    {
      "id": "co9",
      "kind": "choice",
      "prompt": "Câu nào diễn đạt đúng “Vì tôi mệt nên tôi ở nhà” theo mẫu đã học?",
      "hint": "Chọn because hoặc so cho cùng một mối liên hệ, không dùng cả hai.",
      "explanation": "`I'm staying at home because I'm tired` đặt kết quả trước và lý do sau `because`.",
      "options": [
        "I'm staying at home because I'm tired.",
        "I'm staying at home because so I'm tired.",
        "I'm tired because I'm staying at home."
      ],
      "answer": "I'm staying at home because I'm tired."
    },
    {
      "id": "co10",
      "kind": "grid",
      "prompt": "Xác định quan hệ giữa hai ý trước khi chọn từ.",
      "hint": "Ở mỗi hàng, hỏi ý sau đang thêm thông tin, trái hướng hay giải thích lý do cho ý trước.",
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
          "cue": "Nam thích bóng đá ___ anh ấy chơi không giỏi.",
          "options": [
            "but",
            "so",
            "or"
          ],
          "answer": "but",
          "completed": "Nam likes football, but he doesn't play well."
        },
        {
          "cue": "Nam đi ngủ sớm ___ anh ấy dậy lúc năm giờ.",
          "options": [
            "because",
            "so",
            "or"
          ],
          "answer": "because",
          "completed": "Nam goes to bed early because he gets up at five."
        }
      ]
    }
  ],
};

const a1Chapter10TopUps: Partial<Record<string, Exercise[]>> = {
  "adjectives-position": [
    {
      id: "a1ajx1", kind: "choice", prompt: "Câu nào có nghĩa “Chiếc chăn này sờ vào thấy mềm”?",
      options: ["This blanket feels soft.", "This blanket feels softly.", "This blanket soft feels."], answer: "This blanket feels soft.",
      hint: "`Feel` ở đây nối chiếc chăn với một đặc điểm của nó, giống như `be`.",
      explanation: "`Feel` ở đây là động từ nối miêu tả chiếc chăn, nên theo sau là tính từ `soft`; tính từ đứng sau động từ nối chứ không đứng trước nó.",
    },
    {
      id: "a1ajx2", kind: "choice", prompt: "Cụm nào có trật tự tự nhiên cho ý “một chiếc xe đạp cũ của Ý”?",
      options: ["an old Italian bike", "an Italian old bike", "an old bike Italian"], answer: "an old Italian bike",
      hint: "Nhớ lại bảng trật tự: tuổi và nguồn gốc, loại nào đứng gần danh từ hơn?",
      explanation: "Tính từ chỉ tuổi `old` thường đứng trước tính từ chỉ nguồn gốc `Italian`, và cả hai đứng trước danh từ `bike`.",
    },
  ],
  "adverbs-manner": [
    {
      id: "a1amx1", kind: "choice", prompt: "Câu nào có nghĩa “Cô ấy làm bài tập một cách dễ dàng”?",
      options: ["She does the exercise easily.", "She does the exercise easy.", "She does easily the exercise."], answer: "She does the exercise easily.",
      hint: "Từ cần tìm miêu tả cách cô ấy làm bài, và câu có tân ngữ `the exercise`.",
      explanation: "Miêu tả cách làm cần trạng từ: `easy` đổi `y` thành `i` rồi thêm `-ly` thành `easily`, và trạng từ đứng sau tân ngữ `the exercise`.",
    },
  ],
  "sentence-order": [
    {
      id: "a1sox1", kind: "order", prompt: "Sắp xếp câu “Em bé ngủ ngon trong căn phòng này mỗi buổi chiều.”",
      tokens: ["afternoon", "well", "room", "baby", "in", "every", "sleeps", "this", "The", "."],
      answer: ["The", "baby", "sleeps", "well", "in", "this", "room", "every", "afternoon", "."],
      hint: "Động từ `sleeps` không cần tân ngữ; sau nó lần lượt là cách thức, nơi chốn rồi thời gian.",
      explanation: "`Sleep` không cần tân ngữ, nên cách thức `well` đứng ngay sau động từ, rồi đến nơi chốn `in this room` và thời gian `every afternoon`.",
    },
  ],
  "connectors-basic": [
    ...binaryChoiceDrills("a1cox", 1, "and, but, or, because và so", [
      ["ý “Cô ấy đọc và viết”", "She reads and writes.", "She reads but writes.", "`And` thêm thông tin cùng hướng."],
      ["ý “nhỏ nhưng hữu ích”", "small but useful", "small and useful", "`But` nhấn mạnh sự tương phản."],
      ["lời hỏi người nghe muốn trà hay cà phê", "Tea or coffee?", "Tea because coffee?", "`Or` đưa ra lựa chọn."],
      ["ý “Tôi đang uống cà phê vì tôi buồn ngủ”", "I'm drinking coffee because I'm sleepy.", "I'm drinking coffee so I'm sleepy.", "Buồn ngủ là lý do của việc uống cà phê; lý do đứng sau `because`."],
      ["ý “Tôi mệt nên tôi không làm việc được”", "I'm tired, so I can't work.", "I'm tired because I can't work.", "Không làm việc được là kết quả của việc mệt, nên phần này phải đứng sau từ nối chỉ kết quả."],
      ["ý “Chúng tôi không ra ngoài vì trời đang mưa”", "We aren't going out because it's raining.", "We aren't going out so it's raining.", "Trời mưa là lý do, nên phần nêu lý do đứng sau `because`."],
      ["ý “Tôi thích cà phê nhưng không uống vào ban đêm”", "I like coffee but don't drink it at night.", "I like coffee because don't drink it at night.", "`But` nối hai ý tương phản có cùng chủ ngữ `I`."],
      ["ý “đen và trắng”", "black and white", "black because white", "`And` thêm màu thứ hai."],
      ["câu hỏi và lời đáp về lý do đến muộn", "Why are you late? — Because the bus is late.", "Why are you late? — So the bus is late.", "Câu hỏi `why` được trả lời bằng lý do với `because`."],
      ["ý “Cửa hàng đóng cửa nên chúng tôi không mua được bánh mì”", "The shop is closed, so we can't buy bread.", "The shop is closed because we can't buy bread.", "Cửa hàng đóng cửa là nguyên nhân; không mua được bánh mì là kết quả."],
      ["ý “Chúng ta có thể đi bộ hoặc đi xe buýt”", "We can walk or take the bus.", "We can walk so take the bus.", "`Or` nối hai phương án."],
      ["ý “Tôi thích táo và cam”", "I like apples and oranges.", "I like apples because oranges.", "`And` thêm đối tượng thứ hai."],
    ]),
    {
      id: "a1cox13", kind: "order", prompt: "Sắp xếp câu “Tôi khát nên tôi muốn uống chút nước.”",
      tokens: ["water", "I’m", "want", "so", "I", "some", ",", "thirsty", "."],
      answer: ["I’m", "thirsty", ",", "so", "I", "want", "some", "water", "."],
      hint: "Đặt nguyên nhân trước `so` và kết quả sau nó.", explanation: "`So` giới thiệu kết quả: vì khát nên muốn uống nước. Dấu phẩy đứng trước `so` để ngăn hai mệnh đề.",
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
        { cue: "We're taking an umbrella ___ it's raining.", options: ["because", "so", "or"], answer: "because", completed: "We're taking an umbrella because it's raining." },
      ],
    },
    {
      id: "a1depth-con-2", kind: "match", prompt: "Ghép mỗi cặp ý với quan hệ mà từ nối cần thể hiện.",
      hint: "Đọc hai ý như một thông điệp hoàn chỉnh rồi xác định quan hệ giữa chúng.",
      explanation: "Mỗi cặp ý có một quan hệ chính: bổ sung, tương phản, lựa chọn hoặc nguyên nhân–kết quả.",
      pairs: [
        { left: "Lan reads. Lan writes.", right: "bổ sung — and" },
        { left: "The road is long. We aren't tired.", right: "tương phản — but" },
        { left: "We can take a taxi. We can walk.", right: "lựa chọn — or" },
        { left: "The bus is late. We're walking to school.", right: "nguyên nhân–kết quả — so" },
      ],
    },
  ],
};

export const a1Chapter10ExerciseData = mergeExerciseRecords(
  a1Chapter10BaseExerciseData,
  a1Chapter10TopUps,
  a1Chapter10DepthExtensions,
);
