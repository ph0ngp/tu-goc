/* Luyện tập B1 — Chương 27: Mẫu động từ và cụm động từ. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";
import { b1DepthPack } from "../../b1-depth-builders.ts";

const b1Chapter27BaseExerciseData: Record<string, Exercise[]> = {
  "b1-verb-object-infinitive-let-make-help": b1PracticeSet("b1voi", "verb + object + infinitive", [
    ["nói ai đó được yêu cầu làm gì bằng `ask` hoặc `tell`", "She asked me to wait.", "She asked me wait.", "The teacher told us to sit down.", "Sau `ask/tell + tân ngữ`, hành động được yêu cầu dùng `to + V`."],
    ["nói mong muốn người khác làm gì bằng `want` hoặc `expect`", "We expect them to arrive soon.", "We expect them arrive soon.", "Mum wants me to clean my room.", "Sau `want/expect + tân ngữ`, hành động được mong đợi dùng `to + V`."],
    ["nói ai được động viên hoặc được mời làm gì", "Our teacher encouraged us to read more.", "Our teacher encouraged us read more.", "They invited us to stay for dinner.", "`Encourage` và `invite` cũng dùng mẫu `tân ngữ + to + V`."],
    ["nói ai được nhắc làm một việc bằng `remind`", "He reminded me to call.", "He reminded me call.", "Mum reminded us to take our keys.", "Sau `remind + tân ngữ`, việc cần nhớ làm dùng `to + V`."],
    ["nói lời đề nghị cho ai đó làm gì bằng `let`", "Let him explain the problem.", "Let him to explain the problem.", "Let the children play outside.", "Sau `let + tân ngữ`, động từ thứ hai ở dạng cơ bản và đứng ngay sau tân ngữ, không có từ nào chen giữa."],
    ["nói điều gì khiến ai làm gì bằng `make` trong câu chủ động", "The joke made everyone laugh.", "The joke made everyone to laugh.", "The sad film made my sister cry.", "Trong câu chủ động, sau `make + tân ngữ`, động từ thứ hai ở dạng cơ bản và đứng ngay sau tân ngữ, không có từ nào chen giữa."],
    ["nói ai bị bắt làm gì bằng `make` trong câu bị động", "We were made to rewrite the essay.", "We were made rewrite the essay.", "He was made to apologize.", "Trong câu bị động, `be made` cần `to + V`."],
    ["dùng `help` với động từ không có `to`", "Can you help me carry this box?", "Can you help me carrying this box?", "My brother helped me paint the fence.", "`Help + tân ngữ + V` không có `to` là mẫu rất phổ biến."],
    ["dùng `help` với `to + V`", "Can you help me to carry this box?", "Can you help me for carry this box?", "My friends helped me to move house.", "Sau `help + tân ngữ`, dạng có `to` cũng đúng."],
    ["nói ai được khuyên hoặc cảnh báo đừng làm gì", "The doctor advised me not to drive.", "The doctor advised me don't drive.", "The guide warned us not to swim in the river.", "Để phủ định hành động thứ hai, đặt `not` ngay trước `to`."],
    ["nói họ cho phép chúng tôi về sớm", "They allowed us to leave early.", "They allowed us leave early.", "They let us leave early.", "`Allow` cần `to + V`; `let` cùng nghĩa nhưng đi với động từ không có `to`."],
    ["nêu một đề nghị bằng `suggest` theo đúng mẫu", "She suggested going by train.", "She suggested us to go by train.", "They suggested that we leave early.", "`Suggest` không dùng mẫu `tân ngữ + to`; dùng `suggest + V-ing` hoặc `suggest that + mệnh đề`."],
  ]),
  "b1-verbs-ing-or-to-similar": b1PracticeSet("b1vit", "động từ dùng V-ing hoặc to-infinitive gần nghĩa", [
    ["dùng `V-ing` sau `started` hoặc `began`", "It started raining.", "It started rain.", "Lan began working at eight.", "`Start/begin` dùng được với `V-ing` mà nghĩa gần như không đổi."],
    ["dùng `to + V` sau `started` hoặc `began`", "It started to rain.", "It started to raining.", "Lan began to work at eight.", "`Start/begin` cũng dùng được với `to + V`; nghĩa gần như không đổi."],
    ["dùng `V-ing` sau `continue`", "He continued talking.", "He continued talk.", "They continued working after lunch.", "`Continue + V-ing` nói tiếp tục cùng một hoạt động."],
    ["dùng `to + V` sau `continue`", "He continued to talk.", "He continued to talking.", "She continued to study abroad.", "`Continue + to + V` cũng đúng, nghĩa gần như không đổi."],
    ["nói sở thích chung bằng `like` hoặc `love` với `V-ing`", "I like reading.", "I like read.", "She loves cooking.", "`Like/love + V-ing` thường nói cảm nhận chung về một hoạt động."],
    ["nói thói quen của ai bằng `like + to + V`", "I like to check my email before work.", "I like check my email before work.", "He likes to walk after dinner.", "`Like + to + V` có thể nhấn một thói quen hoặc lựa chọn."],
    ["nói mong muốn trong một tình huống cụ thể bằng `would like` hoặc `would love`", "I'd like to leave now.", "I'd like leaving now.", "We'd love to visit Japan.", "`Would like/love` nói mong muốn cụ thể và đi với `to + V`."],
    ["nói thích hoạt động này hơn hoạt động kia bằng `prefer` với hai dạng `V-ing`", "I prefer walking to driving.", "I prefer walking than driving.", "Mai prefers reading to watching TV.", "Với hai dạng `V-ing`, mẫu so sánh là `prefer A to B`."],
    ["nói thích hoạt động này hơn hoạt động kia bằng `prefer` với `to + V`", "I prefer to walk rather than drive.", "I prefer to walk to driving.", "She prefers to cook rather than order food.", "Với `prefer to + V`, vế còn lại dùng `rather than` và động từ dạng cơ bản để hai vế song song."],
    ["tránh hai đuôi `-ing` liền nhau sau dạng tiếp diễn của `begin` hoặc `start`", "It was beginning to rain.", "It was beginning raining.", "The engine was starting to make a noise.", "Sau `was beginning/was starting`, dùng `to + V` để tránh hai đuôi `-ing` liền nhau."],
    ["nói một việc ai đó thích hoặc tránh bằng động từ chỉ nhận `V-ing`", "I enjoy reading.", "I enjoy to read.", "They avoid driving at night.", "`Enjoy` và `avoid` chỉ nhận `V-ing`, không theo quy tắc linh hoạt của bài này."],
    ["nói một quyết định hoặc kế hoạch bằng động từ chỉ nhận `to + V`", "We decided to leave.", "We decided leaving.", "Lan plans to study abroad.", "`Decide` và `plan` chỉ nhận `to + V` trong nghĩa này."],
  ]),
  "b1-stop-remember-forget-patterns": b1PracticeSet("b1srf", "stop, remember, forget với V-ing/to", [
    ["nói lời yêu cầu ai ngừng việc họ đang làm", "Please stop talking.", "Please stop to talk.", "Please stop using your phone in class.", "`Stop + V-ing` yêu cầu chấm dứt chính hoạt động đang diễn ra."],
    ["nói ai dừng việc đang làm để nghỉ ngơi", "We stopped to rest.", "We stopped resting.", "The hikers stopped to rest under a tree.", "`Stop + to + V` nói mục đích: dừng việc khác để làm việc này."],
    ["nói lời nhắc người nghe nhớ làm một việc bằng `remember`", "Remember to lock the door.", "Remember locking the door.", "Remember to take your umbrella.", "`Remember + to + V` hướng tới một nhiệm vụ cần làm sau lúc nhớ."],
    ["hỏi người nghe có nhớ một việc mình đã làm không", "Do you remember turning off the oven?", "Do you remember to turn off the oven?", "Do you remember meeting Lan at the party?", "`Remember + V-ing` hỏi về ký ức của một việc đã xảy ra."],
    ["nói một nhiệm vụ bị quên nên đã không được làm", "I forgot to buy milk.", "I forgot buying milk.", "She forgot to lock the car.", "`Forget + to + V` thường cho biết nhiệm vụ đã không được thực hiện."],
    ["nói ai sẽ không bao giờ quên một trải nghiệm đã có", "I'll never forget visiting Ha Long Bay.", "I'll never forget to visit Ha Long Bay.", "We'll never forget seeing snow for the first time.", "`Never forget + V-ing` nói về ký ức của một việc đã thật sự xảy ra."],
    ["nói ai đã bỏ hẳn một thói quen", "He stopped drinking coffee.", "He stopped to drink coffee.", "My father stopped smoking last year.", "`Stop + V-ing` cho biết chính hoạt động đó chấm dứt."],
    ["nói ai dừng lại để ăn hoặc uống gì đó", "He stopped to drink coffee.", "He stopped drinking coffee.", "We stopped to have lunch in a small village.", "`Stop + to + V` cho biết việc làm sau khi dừng lại là mục đích mới."],
    ["xác nhận ai đã nhớ làm một nhiệm vụ nên việc đó đã được làm", "I remembered to post the letter.", "I remembered posting the letter.", "She remembered to pay the bill.", "`Remembered + to + V` cho biết nhiệm vụ không bị quên và đã được thực hiện."],
    ["nói ai còn nhớ một việc đã xảy ra bằng `remember`", "I remember posting the letter.", "I remember to post the letter.", "I remember meeting Lan for the first time.", "`Remember + V-ing` nhìn lại một việc đã xảy ra trước lúc nhớ."],
    ["nói lời nhắc người nghe bằng `forget` về một việc cần làm", "Don't forget to call me.", "Don't forget calling me.", "Don't forget to water the plants.", "Trong lời nhắc với `forget`, việc cần làm dùng `to + V`."],
    ["phủ định việc cần nhớ sau `remember`", "Remember not to open the window.", "Remember don't open the window.", "Remember not to tell Mai about the party.", "Khi nhắc một việc không được làm, `remember` vẫn đi với to-infinitive, chỉ thêm từ phủ định vào ngay đầu phần động từ; không dùng trợ động từ phủ định của câu mệnh lệnh."],
  ]),
  "b1-try-regret-go-on-mean-patterns": b1PracticeSet("b1trg", "try, regret, go on, mean với V-ing/to", [
    ["nói ai đang nỗ lực đạt một mục tiêu khó", "Lan is trying to finish before six.", "Lan is trying finish before six.", "We are trying to save enough money for a car.", "`Try + to + V` nhấn nỗ lực để đạt một mục tiêu khó."],
    ["gợi ý thử một cách xử lý sự cố máy móc xem có hiệu quả không", "Try restarting the computer.", "Try restart the computer.", "Try using a different cable.", "`Try + V-ing` giới thiệu một cách làm để thử xem vấn đề có được giải quyết không."],
    ["nói ai hối tiếc về một việc mình đã làm", "I regret saying those words.", "I regret to say those words.", "She regrets leaving school early.", "`Regret + V-ing` nhìn lại một việc đã xảy ra và cảm thấy hối tiếc."],
    ["nêu một thông báo đáng tiếc theo lối trang trọng", "We regret to inform you that the event is cancelled.", "We regret informing you that the event is cancelled.", "I regret to say that we cannot help.", "`Regret to inform/say` mở đầu một tin không vui mà người nói tiếc khi phải báo."],
    ["nói ai tiếp tục cùng một hoạt động", "She went on talking.", "She went on to talk.", "We went on working despite the noise.", "`Go on + V-ing` nói tiếp tục cùng một hoạt động."],
    ["nói ai chuyển sang việc tiếp theo trong cùng một bài nói hoặc buổi thuyết trình", "He explained the problem and went on to suggest a solution.", "He explained the problem and went on suggesting a solution.", "The speaker thanked everyone and went on to show some photos.", "`Go on + to + V` giới thiệu hoạt động kế tiếp sau khi xong hoạt động trước."],
    ["nói một lựa chọn kéo theo hệ quả gì", "This job means working at weekends.", "This job means to work at weekends.", "Taking the train means leaving at six.", "`Mean + V-ing` nói điều mà một việc hoặc một lựa chọn kéo theo."],
    ["nói ai đã có ý định làm một việc", "I meant to call you, but I forgot.", "I meant calling you, but I forgot.", "She meant to send the file yesterday.", "`Mean + to + V` nói ý định làm một việc."],
    ["nói ai đã làm một việc mà không cố ý", "She didn't mean to hurt you.", "She didn't mean hurting you.", "I didn't mean to interrupt.", "`Didn't mean + to + V` nói hành động đã xảy ra nhưng không có chủ ý."],
    ["gợi ý thử một cách nấu xem món ăn có ngon hơn không", "Try adding a little salt.", "Try to add a little salt.", "Try cooking the rice with less water.", "Khi gợi ý một cách làm để thử kết quả, dùng `try + V-ing`."],
    ["nói ai đã cố gắng làm một việc nhưng không làm được", "He tried to lift the box but couldn't.", "He tried lifting the box but couldn't.", "She tried to open the jar but couldn't.", "Khi chính hành động cố làm không thành, dùng `try + to + V`."],
    ["nói ai sau này tiến tới một giai đoạn mới trong sự nghiệp", "Lan studied medicine and went on to become a surgeon.", "Lan studied medicine and went on becoming a surgeon.", "He started as an assistant and went on to manage the team.", "`Go on + to + V` có thể nói bước tiến mới trong cuộc đời hoặc sự nghiệp."],
  ]),
  "b1-double-objects-to-for": b1PracticeSet("b1dot", "động từ hai tân ngữ và to/for", [
    ["đặt người nhận ngay sau `give` hoặc `show`", "Lan gave me the key.", "Lan gave to me the key.", "The teacher showed us the answer.", "Với `give/show`, mẫu hai tân ngữ đặt người nhận ngay sau động từ và không cần giới từ."],
    ["nêu người nhận sau vật với `give` hoặc `show`", "Lan gave the key to me.", "Lan gave the key for me.", "Please show the map to the visitors.", "Khi vật đứng trước, `give/show` cần `to` trước người nhận vì vật được chuyển tới người đó."],
    ["nêu người hưởng lợi sau vật với `buy` hoặc `cook`", "I bought a ticket for Lan.", "I bought a ticket to Lan.", "Dad cooked dinner for us.", "Với `buy/cook`, việc được làm vì lợi ích của ai thì dùng `for` trước người đó."],
    ["đặt người hưởng lợi ngay sau `buy` hoặc `book`", "I bought Lan a ticket.", "I bought for Lan a ticket.", "Can you book me a room?", "Với `buy/book`, người hưởng lợi có thể đứng ngay sau động từ mà không cần `for`."],
    ["dùng đại từ thay cho vật được đưa hoặc gửi", "Pass it to me, please.", "Pass to me it, please.", "Please send them to Lan.", "Khi vật là đại từ như `it/them`, đặt nó ngay sau động từ rồi mới đến `to + người nhận`."],
    ["dùng `explain` hoặc `describe` với người nghe đứng sau `to`", "Please explain the rule to me.", "Please explain me the rule.", "She described the place to us.", "`Explain/describe` không dùng mẫu hai tân ngữ: nội dung đứng trước, rồi đến `to + người nghe`."],
    ["dùng `suggest` hoặc `mention` với người nghe đứng sau `to`", "He suggested a solution to the team.", "He suggested the team a solution.", "Mai mentioned the problem to her manager.", "`Suggest/mention` cũng đặt nội dung trước rồi mới đến `to + người nghe`."],
    ["đặt người nhận ngay sau `send` hoặc `lend`", "She sent me a photo.", "She sent a photo me.", "He lent Lan his bike.", "`Send/lend` cho phép người nhận đứng ngay sau động từ, trước vật được chuyển."],
    ["đặt người hưởng lợi ngay sau `cook` hoặc `make`", "Dad cooked us dinner.", "Dad cooked dinner us.", "Mai made her friend a cake.", "Với `cook/make`, người hưởng lợi có thể đứng ngay trước thứ được làm ra mà không cần `for`."],
    ["nói ai được trao hoặc được cho xem thứ gì bằng câu bị động", "Lan was given a prize.", "Lan was given to a prize.", "We were shown the new office.", "Với động từ hai tân ngữ, câu bị động có thể đặt người nhận lên làm chủ ngữ: `người + be + given/shown + vật`."],
    ["nêu người hưởng lợi sau vật với `pack` hoặc `choose`", "I packed a parcel for Mai.", "I packed a parcel to Mai.", "Lan chose a gift for her father.", "Với `pack/choose`, việc được làm vì lợi ích của ai nên dùng `for`."],
    ["hỏi ai là người nhận, với giới từ ở cuối câu", "Who did you send the email to?", "Who did you send the email for?", "Who did you give the old books to?", "Khi hỏi người nhận, `to` vẫn đứng ở cuối câu hỏi."],
  ]),
  "b1-fixed-verb-prepositions": b1PracticeSet("b1fvp", "động từ với giới từ cố định", [
    ["nói ai chấp thuận một yêu cầu hay kế hoạch bằng `agree`", "The manager agreed to our request.", "The manager agreed with our request.", "My parents agreed to the trip.", "Chấp thuận một đề nghị hay yêu cầu dùng `agree to`; `agree with` dành cho việc đồng ý với một người hoặc một ý kiến."],
    ["nói ai chờ một người hoặc một thứ bằng `wait`", "We're waiting for the bus.", "We're waiting the bus.", "Lan waited for a reply.", "`Wait` cần một giới từ trước người hoặc thứ được chờ."],
    ["nói một việc phụ thuộc vào điều gì bằng `depend`", "It depends on the weather.", "It depends of the weather.", "Success depends on preparation.", "`Depend` đi với `on`."],
    ["nói nơi mình gửi đơn tới bằng `apply`", "She applied to three companies.", "She applied for three companies.", "Minh applied to a bank in Hanoi.", "Nơi nhận đơn như công ty hay trường học đi với `apply to`; `apply for` đi với thứ mình muốn xin, như công việc hay học bổng."],
    ["nói về việc xử lý một vấn đề bằng `deal`", "We need to deal with this problem.", "We need to deal this problem.", "The manager dealt with the complaint.", "`Deal` mang nghĩa xử lý chỉ khi có giới từ đi kèm trước vấn đề; không bỏ giới từ ấy."],
    ["nêu lý do xin lỗi sau `apologize`", "He apologized for the delay.", "He apologized because the delay.", "She apologized for being late.", "`Apologize for` nêu việc mình xin lỗi; sau `for` là danh từ hoặc `V-ing`."],
    ["nêu công việc hoặc học bổng muốn xin sau `apply`", "She applied for the job.", "She applied the job.", "Minh applied for a scholarship.", "`Apply for` nêu công việc hoặc thứ mình xin."],
    ["nói ai đồng ý với một người hoặc một ý kiến bằng `agree`", "I agree with you.", "I agree you.", "Many people agree with this opinion.", "Khi đồng ý với một người hoặc một ý kiến, dùng `agree with`."],
    ["nói ai đã thành công làm được một việc bằng `succeed`", "They succeeded in solving the problem.", "They succeeded to solve the problem.", "Mai succeeded in finding a buyer.", "`Succeed` đi với `in`, và sau giới từ dùng `V-ing`."],
    ["nói ai nhất quyết làm một việc bằng `insist`", "He insisted on paying.", "He insisted to pay.", "They insisted on checking every item.", "`Insist on` đi với danh từ hoặc `V-ing`, không đi với `to + V`."],
    ["nói ai mong chờ một việc sắp tới bằng `look forward to`", "I look forward to meeting you.", "I look forward to meet you.", "We look forward to hearing from you.", "Trong `look forward to`, `to` là giới từ nên sau nó dùng `V-ing`."],
    ["hỏi mà vẫn giữ giới từ của động từ ở cuối câu", "Who are you talking to?", "Who are you talking?", "What are you thinking about?", "Khi `who/what` thay cho tân ngữ của giới từ, giới từ vẫn đứng ở cuối câu hỏi."],
  ]),
  "b1-phrasal-verbs-separability": b1PracticeSet("b1pvs", "phrasal verbs tách được và không tách được", [
    ["dùng `turn off` với tân ngữ ở vị trí đúng", "Turn off the light.", "Turn off it.", "Please turn it off before you leave.", "Với `turn off`, danh từ có thể đứng sau cả cụm, nhưng đại từ phải đứng giữa `turn` và `off`."],
    ["dùng `pick up` với đại từ chỉ người làm tân ngữ", "Can you pick us up at six?", "Can you pick up us at six?", "I'll pick her up from school.", "Với cụm tách được `pick up`, đại từ như `us/her` phải đứng giữa động từ và tiểu từ."],
    ["dùng đúng vị trí đại từ với `throw away`", "Don't throw them away.", "Don't throw away them.", "I threw it away yesterday.", "`Throw away` tách được; đại từ phải đứng giữa `throw` và `away`."],
    ["nói cất đồ đi bằng `put away` với đại từ", "Put it away.", "Put away it.", "Please put them away in the drawer.", "`Put away` tách được; đại từ phải đứng trước `away`."],
    ["dùng `look after` với đại từ làm tân ngữ", "She looks after him.", "She looks him after.", "Who will look after them?", "`Look after` không tách được; đại từ đứng sau cả cụm."],
    ["nói tình cờ gặp ai bằng `run into`", "I ran into her yesterday.", "I ran her into yesterday.", "We ran into an old friend at the market.", "`Run into` không tách được; tân ngữ đứng sau cả cụm."],
    ["nói chịu đựng điều gì bằng `put up with`", "How do you put up with the noise?", "How do you put the noise up with?", "I can't put up with it any longer.", "`Put up with` là cụm ba phần không tách; tân ngữ đứng sau cả cụm."],
    ["nói đã hoặc sắp hết một thứ bằng `run out of`", "We have run out of milk.", "We have run milk out of.", "The car is running out of petrol.", "`Run out of` giữ ba phần liền nhau; thứ bị hết đứng sau cả cụm."],
    ["nói mong chờ điều gì bằng `look forward to`", "I'm looking forward to the holiday.", "I'm looking the holiday forward to.", "We're looking forward to it.", "`Look forward to` không tách; tân ngữ đứng sau `to`."],
    ["dùng `take off` với nghĩa cởi đồ và một đại từ làm tân ngữ", "Take it off.", "Take off it.", "Please take them off at the door.", "Với nghĩa cởi, `take off` tách được: đại từ bắt buộc đứng giữa `take` và `off`. Với danh từ, cả `Take your coat off` và `Take off your coat` đều đúng."],
    ["dùng `take off` với nghĩa cất cánh", "The plane took off.", "The plane was taken off.", "Our flight took off on time.", "Với nghĩa cất cánh, `take off` không có tân ngữ, nên không có dạng bị động: máy bay tự cất cánh."],
    ["nói tra cứu bằng `look up` với đại từ làm tân ngữ", "Look it up in a dictionary.", "Look up it in a dictionary.", "I looked it up online.", "`Look up` nghĩa tra cứu là cụm tách được; đại từ đứng giữa `look` và `up`."],
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
    { cue: "Người nói cố mở cửa sổ nhưng không mở được.", options: ["I tried to open the window, but I couldn't.", "I tried opening the window, but I couldn't."], answer: "I tried to open the window, but I couldn't.", completed: "I tried to open the window, but I couldn't." },
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
