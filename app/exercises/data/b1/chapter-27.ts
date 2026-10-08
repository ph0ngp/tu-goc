/* Luyện tập B1 — Chương 27: Mẫu động từ và cụm động từ. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";
import { b1DepthPack } from "../../b1-depth-builders.ts";

const b1Chapter27BaseExerciseData: Record<string, Exercise[]> = {
  "b1-verb-object-infinitive-let-make-help": b1PracticeSet("b1voi", "verb + object + infinitive", [
    ["nhờ người nghe đợi", "She asked me to wait.", "She asked me wait.", "The teacher told us to sit down.", "`Ask + object` cần `to-infinitive`."],
    ["mong họ sớm đến", "We expect them to arrive soon.", "We expect them arrive soon.", "I want Lan to join us.", "`Expect/want + object + to + V`."],
    ["cho phép vào", "They allowed us to enter.", "They allowed us enter.", "The guard permitted visitors to take photos.", "`Allow + object + to + V`."],
    ["nhắc gọi điện", "He reminded me to call.", "He reminded me call.", "Mai warned us not to be late.", "`Remind + object + to + V`."],
    ["cho phép bằng `let`", "My parents let me stay up late.", "My parents let me to stay up late.", "Let him explain the problem.", "Sau `let + object` không có `to`."],
    ["khiến mọi người cười", "The joke made everyone laugh.", "The joke made everyone to laugh.", "The noise made the baby wake up.", "Câu chủ động dùng `make + object + V`."],
    ["bị bắt viết lại", "We were made to rewrite the essay.", "We were made rewrite the essay.", "He was made to apologize.", "Bị động của `make` khôi phục `to`."],
    ["dùng `help` không có `to`", "Can you help me carry this box?", "Can you help me carrying this box?", "This tool helps us save time.", "`Help + object + V` là mẫu đúng."],
    ["dùng `help` có `to`", "Can you help me to carry this box?", "Can you help me for carry this box?", "The guide helped us to find the path.", "Sau `help`, dạng có `to` cũng đúng."],
    ["phủ định hành động thứ hai", "The doctor advised me not to drive.", "The doctor advised me to not driving.", "She told the children not to touch the oven.", "Đặt `not` trước `to`."],
    ["so sánh `let` và `allow`", "They allowed us to leave early.", "They allowed us leave early.", "They let us leave early.", "`Allow` có `to`; `let` không có."],
    ["dùng `suggest` đúng mẫu", "She suggested going by train.", "She suggested us to go by train.", "They suggested that we leave early.", "`Suggest` không dùng mẫu `object + to` thông thường."],
  ]),
  "b1-verbs-ing-or-to-similar": b1PracticeSet("b1vit", "động từ dùng V-ing hoặc to-infinitive gần nghĩa", [
    ["bắt đầu mưa với V-ing", "It started raining.", "It started rain.", "Lan began working at eight.", "`Start/begin` dùng được với `V-ing`."],
    ["bắt đầu mưa với to-infinitive", "It started to rain.", "It started for rain.", "Lan began to work at eight.", "`Start/begin` cũng dùng được với `to + V`."],
    ["tiếp tục nói với V-ing", "He continued talking.", "He continued talk.", "They continued working after lunch.", "`Continue + V-ing` giữ cùng hoạt động."],
    ["tiếp tục nói với to-infinitive", "He continued to talk.", "He continued to talking.", "She continued to study abroad.", "`Continue + to + V` cũng đúng trong nhiều ngữ cảnh."],
    ["nói sở thích hoạt động chung", "I like reading.", "I like read.", "She loves cooking.", "`V-ing` thường trình bày hoạt động như sở thích chung."],
    ["nói thói quen lựa chọn", "I like to check my email before work.", "I like check my email before work.", "He likes to walk after dinner.", "`Like + to + V` có thể nhấn thói quen/lựa chọn."],
    ["mong muốn cụ thể với `would like`", "I'd like to leave now.", "I'd like leaving now.", "We'd love to visit Japan.", "`Would like/love` dùng `to-infinitive`."],
    ["ưa đi bộ hơn lái xe bằng V-ing", "I prefer walking to driving.", "I prefer walking than driving.", "Mai prefers reading to watching TV.", "Mẫu là `prefer V-ing to V-ing`."],
    ["ưa làm A hơn B bằng infinitive", "I prefer to walk rather than drive.", "I prefer to walk to driving.", "She prefers to cook rather than order food.", "Giữ hai động từ song song trong mẫu `rather than`."],
    ["tránh hai đuôi -ing sát nhau", "It was beginning to rain.", "It was beginning raining.", "The engine was starting to make a noise.", "Sau dạng tiếp diễn của `begin`, `to + V` thường tự nhiên hơn."],
    ["động từ chỉ nhận V-ing", "I enjoy reading.", "I enjoy to read.", "They avoid driving at night.", "`Enjoy` không theo quy tắc linh hoạt này."],
    ["động từ chỉ nhận to-infinitive", "We decided to leave.", "We decided leaving.", "Lan plans to study abroad.", "`Decide` dùng `to + V`."],
  ]),
  "b1-stop-remember-forget-patterns": b1PracticeSet("b1srf", "stop, remember, forget với V-ing/to", [
    ["ngừng hẳn thói quen hút thuốc", "He stopped smoking.", "He stopped to smoke.", "Please stop talking.", "`Stop doing` chấm dứt chính hoạt động đó."],
    ["dừng việc đang làm để nghỉ", "We stopped to rest.", "We stopped resting.", "Lan stopped to answer the phone.", "`Stop to do` dừng việc khác để thực hiện mục đích."],
    ["nhớ khóa cửa trước khi rời đi", "Remember to lock the door.", "Remember locking the door.", "I remembered to send the email.", "`Remember to do` nói việc cần thực hiện."],
    ["nhớ lại lần đầu đã gặp Lan", "I remember meeting Lan for the first time.", "I remember to meet Lan for the first time.", "Do you remember turning off the oven?", "`Remember doing` nói ký ức về việc đã xảy ra."],
    ["quên làm nhiệm vụ mua sữa", "I forgot to buy milk.", "I forgot buying milk.", "Don't forget to call me.", "`Forget to do` thường cho biết nhiệm vụ không được làm."],
    ["vẫn nhớ rõ chuyến thăm đã xảy ra", "I'll never forget visiting Ha Long Bay.", "I'll never forget to visit Ha Long Bay.", "She will never forget meeting her hero.", "`Forget doing` liên quan ký ức về sự kiện có thật."],
    ["nói anh ấy đã bỏ hẳn cà phê", "He stopped drinking coffee.", "He stopped to drink coffee.", "She stopped eating sugar.", "Dạng `-ing` là hoạt động bị chấm dứt."],
    ["nói anh ấy dừng hành trình để uống cà phê", "He stopped to drink coffee.", "He stopped drinking coffee.", "We stopped to take a photo.", "`To + V` là mục đích mới sau khi dừng."],
    ["xác nhận mình đã không quên nhiệm vụ gửi thư", "I remembered to post the letter.", "I remembered posting the letter.", "She remembered to pay the bill.", "`Remember to do` cho biết người nói không quên nhiệm vụ."],
    ["gợi lại ký ức về việc đã gửi thư", "I remember posting the letter.", "I remember to post the letter.", "He remembers seeing that film.", "`Remember doing` nhìn lại sự kiện đã xảy ra."],
    ["nói cuộc gặp đã xảy ra nhưng anh ấy không còn nhớ", "He forgot having met me before.", "He forgot to meet me before.", "She forgot seeing the place as a child.", "`Forget doing/having done` nói không còn nhớ sự kiện."],
    ["đặt `not` với nhiệm vụ", "Remember not to open the window.", "Remember to not opening the window.", "Don't forget not to share the code.", "Đặt `not` trước `to + V`."],
  ]),
  "b1-try-regret-go-on-mean-patterns": b1PracticeSet("b1trg", "try, regret, go on, mean với V-ing/to", [
    ["cố mở cửa sổ bị kẹt dù rất khó", "I tried to open the window.", "I tried opening the window.", "Lan tried to finish before six.", "`Try to do` nhấn nỗ lực đạt mục tiêu."],
    ["thử khởi động lại như một giải pháp", "Try restarting the computer.", "Try to restart the computer.", "Try adding a little salt.", "`Try doing` thử một phương pháp xem có hiệu quả."],
    ["hối tiếc về lời đã nói", "I regret saying those words.", "I regret to say those words.", "She regrets leaving school early.", "`Regret doing` nhìn lại việc đã xảy ra."],
    ["mở đầu một thông báo đáng tiếc", "We regret to inform you that the event is cancelled.", "We regret informing you that the event is cancelled.", "I regret to say that we cannot help.", "`Regret to inform/say` là mẫu thông báo đáng tiếc."],
    ["tiếp tục cùng hoạt động nói", "She went on talking.", "She went on to talk.", "We went on working despite the noise.", "`Go on doing` tiếp tục cùng việc."],
    ["chuyển từ giải thích vấn đề sang đề xuất giải pháp", "He explained the problem and went on to suggest a solution.", "He explained the problem and went on suggesting a solution.", "She described the data and went on to present a plan.", "`Go on to do` chuyển sang hoạt động tiếp theo; `go on doing` nói tiếp tục cùng loại hoạt động."],
    ["công việc kéo theo việc phải làm cuối tuần", "This job means working at weekends.", "This job means to work at weekends.", "Taking the train means leaving at six.", "`Mean doing` nói hệ quả/kéo theo."],
    ["nói ý định gọi nhưng đã quên", "I meant to call you, but I forgot.", "I meant calling you, but I forgot.", "She meant to send the file yesterday.", "`Mean to do` nói ý định."],
    ["nói không có ý làm người khác tổn thương", "She didn't mean to hurt you.", "She didn't mean hurting you.", "I didn't mean to interrupt.", "Phủ định `mean to` nói không có chủ ý."],
    ["thử ăn ít đường như một phương pháp xem có hiệu quả không", "Try eating less sugar.", "Try to eat less sugar.", "Try using a different cable.", "Dạng `-ing` giới thiệu cách thử."],
    ["nỗ lực nâng chiếc hộp nhưng không thành", "He tried to lift the box but couldn't.", "He tried lifting the box but couldn't.", "We tried to reach the station before dark.", "Kết quả thất bại cho thấy nỗ lực `try to`."],
    ["chuyển từ việc học y sang giai đoạn trở thành bác sĩ phẫu thuật", "Lan studied medicine and went on to become a surgeon.", "Lan studied medicine and went on becoming a surgeon.", "He worked as an assistant and went on to manage the team.", "Dạng `to` mở giai đoạn mới."],
  ]),
  "b1-double-objects-to-for": b1PracticeSet("b1dot", "động từ hai tân ngữ và to/for", [
    ["đưa chìa khóa cho tôi", "Lan gave me the key.", "Lan gave for me the key.", "The teacher showed us the answer.", "Mẫu hai tân ngữ đặt người trước vật."],
    ["đưa vật trước người nhận", "Lan gave the key to me.", "Lan gave the key for me.", "She sent a photo to Nam.", "Chuyển giao vật/thông tin thường dùng `to`."],
    ["mua vé vì lợi ích của Lan", "I bought a ticket for Lan.", "I bought a ticket to Lan.", "Dad cooked dinner for us.", "Hành động làm/mua cho ai thường dùng `for`."],
    ["dùng hai tân ngữ với `buy`", "I bought Lan a ticket.", "I bought to Lan a ticket.", "Can you book me a room?", "Người hưởng lợi có thể đứng ngay sau động từ."],
    ["đại từ vật đứng trước `to`", "Give it to me.", "Give me it.", "Please send them to Lan.", "Khi vật là đại từ, mẫu có giới từ tự nhiên hơn."],
    ["giữ `to` với `explain`", "Please explain the rule to me.", "Please explain me the rule.", "She described the place to us.", "`Explain/describe` không dùng mẫu hai tân ngữ thông thường."],
    ["giữ `to` với `suggest`", "He suggested a solution to the team.", "He suggested the team a solution.", "Mai mentioned the problem to her manager.", "`Suggest` đặt nội dung trước rồi `to + người`."],
    ["chuyển giao ảnh", "She sent me a photo.", "She sent for me a photo.", "He lent Lan his bike.", "`Send/lend` cho phép người nhận trước vật."],
    ["chuẩn bị bữa tối", "Dad cooked us dinner.", "Dad cooked to us dinner.", "Mai made her friend a cake.", "`Cook/make` có thể dùng hai tân ngữ cho người hưởng lợi."],
    ["gửi bưu kiện tới Mai với tư cách người nhận", "I sent a parcel to Mai.", "I sent a parcel for Mai.", "We delivered the documents to the office.", "Chuyển vật tới đích dùng `to`."],
    ["phân biệt làm vì lợi ích", "I packed a parcel for Mai.", "I packed a parcel to Mai.", "Lan chose a gift for her father.", "Người hưởng lợi đi với `for`."],
    ["hỏi người nhận email với giới từ cuối", "Who did you send the email to?", "Who did you send the email for?", "Who did you buy the gift for?", "`To` hỏi người nhận; `for` hỏi người hưởng lợi."],
  ]),
  "b1-fixed-verb-prepositions": b1PracticeSet("b1fvp", "động từ với giới từ cố định", [
    ["nghe hướng dẫn", "Listen to the instructions.", "Listen the instructions.", "We listened to the news.", "`Listen` cần `to` trước tân ngữ."],
    ["chờ xe buýt", "We're waiting for the bus.", "We're waiting the bus.", "Lan waited for a reply.", "`Wait` cần `for`."],
    ["phụ thuộc thời tiết", "It depends on the weather.", "It depends of the weather.", "Success depends on preparation.", "`Depend` đi với `on`."],
    ["thuộc về Lan", "This bag belongs to Lan.", "This bag belongs with Lan.", "The land belongs to the village.", "`Belong` đi với `to`."],
    ["xử lý vấn đề", "We need to deal with this problem.", "We need to deal this problem.", "She dealt with the complaint calmly.", "`Deal with` là cụm cố định."],
    ["xin lỗi vì chậm", "He apologized for the delay.", "He apologized about the delay.", "She apologized for being late.", "`Apologize for` nêu việc bị xin lỗi."],
    ["nộp đơn xin việc", "She applied for the job.", "She applied to the job.", "Minh applied for a scholarship.", "`Apply for` nêu vị trí/thứ được xin."],
    ["nộp đơn tới công ty với tư cách tổ chức nhận đơn", "She applied to the company.", "She applied for the company.", "He applied to three universities.", "`Apply to` nêu tổ chức nhận đơn."],
    ["thành công giải quyết", "They succeeded in solving the problem.", "They succeeded to solve the problem.", "Mai succeeded in finding a buyer.", "Sau giới từ `in` dùng `V-ing`."],
    ["nhất quyết trả tiền", "He insisted on paying.", "He insisted to pay.", "They insisted on checking every item.", "`Insist on` theo sau bởi danh từ/V-ing."],
    ["mong gặp người nghe", "I look forward to meeting you.", "I look forward to meet you.", "We look forward to hearing from you.", "`To` ở đây là giới từ nên sau nó dùng `V-ing`."],
    ["giữ giới từ trong câu hỏi", "What are you waiting for?", "What are you waiting?", "Who does this bag belong to?", "Giới từ cần thiết vẫn ở cuối câu hỏi."],
  ]),
  "b1-phrasal-verbs-separability": b1PracticeSet("b1pvs", "phrasal verbs tách được và không tách được", [
    ["tắt đèn với danh từ sau cụm", "Turn off the light.", "Turn the light after off.", "Please pick up the parcel.", "Danh từ có thể đứng sau cụm tách được."],
    ["tắt đèn với danh từ ở giữa", "Turn the light off.", "Turn off it.", "Put your coat on.", "Danh từ có thể đứng giữa động từ và tiểu từ."],
    ["tắt nó bằng đại từ", "Turn it off.", "Turn off it.", "Pick them up at six.", "Đại từ bắt buộc đứng giữa cụm tách được."],
    ["cất nó đi", "Put it away.", "Put away it.", "Throw it away.", "Đại từ đứng trước tiểu từ."],
    ["chăm sóc anh ấy", "She looks after him.", "She looks him after.", "They looked after the children.", "Cụm không tách được giữ các phần cạnh nhau."],
    ["tình cờ gặp cô ấy", "I ran into her yesterday.", "I ran her into yesterday.", "We came across an old letter.", "Tân ngữ đứng sau toàn bộ cụm không tách được."],
    ["chịu đựng tiếng ồn", "How do you put up with the noise?", "How do you put the noise up with?", "I cannot put up with it.", "Phrasal verb ba phần không tách."],
    ["hết sữa", "We have run out of milk.", "We have run milk out of.", "The printer ran out of paper.", "`Run out of` giữ ba phần liền nhau."],
    ["mong chờ kỳ nghỉ", "I'm looking forward to the holiday.", "I'm looking the holiday forward to.", "We look forward to meeting you.", "`Look forward to` không tách."],
    ["cởi áo khoác", "Take your coat off.", "Take off it.", "Please take it off.", "`Take off` nghĩa cởi là cụm tách được."],
    ["máy bay cất cánh mà không có tân ngữ", "The plane took off.", "The plane took off it.", "Our flight took off on time.", "Nghĩa cất cánh không có tân ngữ."],
    ["tra từ đó bằng đại từ", "Look it up in a dictionary.", "Look up it in a dictionary.", "I looked the address up online.", "`Look up` tách được; đại từ đứng giữa."],
  ]),
};

const b1Chapter27DepthExerciseData: Partial<Record<string, Exercise[]>> = {
  "b1-stop-remember-forget-patterns": b1DepthPack("b1srx", "nghĩa của -ing và to-infinitive", [
    { cue: "Lan dừng việc đang làm để nghe điện thoại.", options: ["Lan stopped to answer the phone.", "Lan stopped answering the phone."], answer: "Lan stopped to answer the phone.", completed: "Lan stopped to answer the phone." },
    { cue: "Người nói có ký ức về việc đã tắt bếp.", options: ["I remember turning off the cooker.", "I remember to turn off the cooker."], answer: "I remember turning off the cooker.", completed: "I remember turning off the cooker." },
    { cue: "Nam quên nhiệm vụ gửi tệp nên tệp chưa được gửi.", options: ["Nam forgot to send the file.", "Nam forgot sending the file."], answer: "Nam forgot to send the file.", completed: "Nam forgot to send the file." },
  ], [
    ["Sắp xếp câu nói người lái xe dừng lại để xem bản đồ.", "The driver stopped to look at the map.", "`To look` là mục đích mới sau khi dừng xe."],
    ["Sắp xếp câu nhắc người nghe nhớ mang theo hộ chiếu.", "Remember to bring your passport.", "`Remember to do` hướng tới nhiệm vụ cần thực hiện."],
    ["Sắp xếp câu nói người kể không bao giờ quên lần gặp đầu tiên.", "I will never forget meeting her for the first time.", "`Forget doing` nhìn lại một sự kiện đã xảy ra."],
  ]),
  "b1-try-regret-go-on-mean-patterns": b1DepthPack("b1trx", "các động từ đổi nghĩa theo dạng sau", [
    { cue: "Đề xuất thử đổi mật khẩu như một giải pháp.", options: ["Try changing the password.", "Try to change the password."], answer: "Try changing the password.", completed: "Try changing the password." },
    { cue: "Người nói cố liên lạc nhưng không thành.", options: ["I tried to contact Lan, but she did not answer.", "I tried contacting Lan, but I could not make the call."], answer: "I tried to contact Lan, but she did not answer.", completed: "I tried to contact Lan, but she did not answer." },
    { cue: "Người viết mở đầu một thông báo đáng tiếc.", options: ["We regret to announce that the office will close.", "We regret announcing that the office will close."], answer: "We regret to announce that the office will close.", completed: "We regret to announce that the office will close." },
  ], [
    ["Sắp xếp câu nói khóa học kéo theo việc học vào cuối tuần.", "The course means studying at weekends.", "`Mean doing` nói hệ quả đi kèm."],
    ["Sắp xếp câu chuyển từ giải thích dữ liệu sang đề xuất kế hoạch.", "She explained the data and went on to suggest a plan.", "`Go on to do` mở bước hoạt động mới."],
    ["Sắp xếp câu hối tiếc về một quyết định đã đưa ra.", "He regrets leaving the company so early.", "`Regret doing` nhìn lại việc đã xảy ra."],
  ]),
  "b1-phrasal-verbs-separability": b1DepthPack("b1pvx2", "vị trí tân ngữ trong phrasal verbs", [
    { cue: "Dùng đại từ `it` với cụm tách được `turn off`.", options: ["Turn it off.", "Turn off it."], answer: "Turn it off.", completed: "Turn it off." },
    { cue: "Dùng đại từ `him` với cụm không tách được `look after`.", options: ["Look after him.", "Look him after."], answer: "Look after him.", completed: "Look after him." },
    { cue: "Dùng cụm ba phần `run out of` với danh từ.", options: ["We ran out of paper.", "We ran paper out of."], answer: "We ran out of paper.", completed: "We ran out of paper." },
  ], [
    ["Sắp xếp câu dùng đại từ với `pick up`.", "Please pick them up after school.", "Đại từ đứng giữa động từ và tiểu từ của cụm tách được."],
  ]),
};

export const b1Chapter27ExerciseData = mergeExerciseRecords(
  b1Chapter27BaseExerciseData,
  b1Chapter27DepthExerciseData,
);
