/* Luyện tập B1 — Chương 25: Câu bị động. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";
import { b1DepthPack } from "../../b1-depth-builders.ts";

const b1Chapter25BaseExerciseData: Record<string, Exercise[]> = {
  "b1-passive-principle": b1PracticeSet("b1papr", "nguyên lý câu bị động", [
    ["nói một thứ bị thời tiết làm hỏng, bắt đầu câu bằng chính thứ đó", "The roof was damaged by the storm.", "The roof damaged by the storm.", "The window was broken by the wind.", "Thứ bị hỏng đứng đầu câu làm chủ ngữ, nên động từ cần `be + quá khứ phân từ`; thứ gây hỏng đi sau `by`."],
    ["nói một căn phòng được dọn đều đặn", "The room is cleaned every day.", "The room cleans every day.", "The kitchen is cleaned every evening.", "Một căn phòng là chủ ngữ số ít, nên ở hiện tại dùng `is` + quá khứ phân từ."],
    ["nói nhiều căn phòng được dọn đều đặn", "The rooms are cleaned every day.", "The rooms is cleaned every day.", "The classrooms are cleaned every afternoon.", "Chủ ngữ số nhiều cần `are`; quá khứ phân từ giữ nguyên dù chủ ngữ là số nhiều."],
    ["lược tác nhân vì không biết ai đã lấy trộm đồ", "My bike was stolen.", "My bike was stolen by someone.", "My phone was stolen at the station.", "Khi không biết ai lấy trộm, câu bị động không cần cụm tác nhân với `by`."],
    ["đặt một công trình mới làm chủ ngữ cho câu tập trung vào nó", "The new bridge was opened in May.", "People opened the new bridge in May.", "The new library was completed last year.", "Bị động đưa công trình mới lên làm chủ ngữ để câu tập trung vào nó; người làm không quan trọng."],
    ["nói các bước của một quy trình", "The beans are dried and packed.", "The beans are dried and pack.", "The bottles are washed and filled.", "Khi mô tả quy trình, bị động tập trung vào vật được xử lý qua từng bước; mỗi động từ đều ở dạng quá khứ phân từ."],
    ["đưa người được mời lên làm chủ ngữ", "Lan was invited to the meeting.", "Lan was invite to the meeting.", "All the students were invited to the party.", "Người được mời là đối tượng chịu tác động của `invite`, nên có thể làm chủ ngữ của câu bị động với `be + invited`."],
    ["nói một sự việc bằng động từ không có tân ngữ", "The train arrived late.", "The train was arrived late.", "An accident happened near the bridge.", "Động từ không có tân ngữ như `arrive` hay `happen` không có đối tượng chịu tác động, nên giữ dạng chủ động."],
    ["phủ định một câu bị động", "The office isn't used at weekends.", "The office doesn't be used at weekends.", "The gate wasn't opened this morning.", "Phủ định bị động đặt `not` ngay sau `be`; không cần thêm trợ động từ khác."],
    ["đặt câu hỏi bị động dạng có/không", "Was the email sent yesterday?", "Did the email sent yesterday?", "Were the guests informed?", "Câu hỏi bị động đưa `be` lên trước chủ ngữ và giữ quá khứ phân từ phía sau."],
    ["dùng đúng quá khứ phân từ của `take`", "The photos were taken last summer.", "The photos were took last summer.", "The children were taken to the zoo.", "Quá khứ phân từ của `take` là `taken`; sau `be` không dùng dạng quá khứ đơn."],
    ["nói một trạng thái kéo dài bằng `be` + quá khứ phân từ", "The door was closed all night.", "The door was close all night.", "The shop was locked until morning.", "Ở đây quá khứ phân từ mô tả trạng thái kéo dài chứ không nhấn một hành động; cụm thời gian kéo dài giúp nhận ra điều đó."],
  ]),
  "b1-passive-common-tenses": b1PracticeSet("b1pct", "bị động ở các thì thông dụng", [
    ["nêu một sự thật chung bằng bị động hiện tại đơn", "Rice is grown in this area.", "Rice was grown in this area.", "These cars are made in Japan.", "Sự thật chung dùng bị động hiện tại đơn: `am/is/are + quá khứ phân từ`."],
    ["nói một việc đã xong ở mốc quá khứ, với chủ ngữ số ít", "The bridge was built in 2010.", "The bridge is built in 2010.", "The letter was posted yesterday.", "Mốc quá khứ đã kết thúc cần quá khứ đơn bị động; chủ ngữ số ít đi với `was`."],
    ["nói một việc đang được làm ngay lúc nói", "The old bridge is being repaired.", "The old bridge is repairing.", "A new hospital is being built.", "Quá trình đang diễn ra cần `am/is/are being + quá khứ phân từ`."],
    ["nói một việc đang được làm dở tại một thời điểm trong quá khứ", "The room was being cleaned when we arrived.", "The room was cleaning when we arrived.", "The cars were being checked at noon.", "Quá trình đang diễn ra tại một mốc quá khứ dùng `was/were being + quá khứ phân từ`."],
    ["nói một việc đã được làm xong và kết quả còn đến hiện tại", "The work has been finished.", "The work has being finished.", "The keys have been found.", "Hiện tại hoàn thành bị động dùng `have/has been + quá khứ phân từ`."],
    ["nêu một việc sẽ được làm bằng `will`", "The exam results will be announced tomorrow.", "The exam results will announced tomorrow.", "You will be contacted soon.", "Tương lai bị động với `will` cần đủ `will be + quá khứ phân từ`."],
    ["nói một kế hoạch đã có bằng `be going to`", "The school is going to be rebuilt.", "The school is going to rebuilt.", "The road is going to be widened.", "Sau `be going to`, bị động vẫn cần đủ trợ động từ của nó trước quá khứ phân từ, nên cùng một động từ xuất hiện hai lần."],
    ["nói một việc vẫn chưa được làm xong", "My application hasn't been accepted yet.", "My application hasn't accepted yet.", "The payment hasn't been received yet.", "Phủ định hoàn thành bị động đặt `not` sau `have/has`, rồi vẫn giữ `been + quá khứ phân từ`."],
    ["hỏi về một việc sẽ được làm trong tương lai", "Will the package be delivered tomorrow?", "Will be the package delivered tomorrow?", "When will the winners be chosen?", "Câu hỏi tương lai bị động đưa `will` lên trước chủ ngữ và giữ `be + quá khứ phân từ` sau chủ ngữ."],
    ["hỏi một việc đã được làm xong hay chưa", "Has the problem been solved?", "Has been the problem solved?", "Have the tickets been booked yet?", "Câu hỏi hoàn thành bị động chỉ đưa `have/has` lên trước chủ ngữ; `been + quá khứ phân từ` đứng sau chủ ngữ."],
    ["nói một việc đã xong ở mốc quá khứ, với chủ ngữ số nhiều", "The windows were replaced last week.", "The windows was replaced last week.", "The documents were sent yesterday.", "Chủ ngữ số nhiều ở quá khứ cần `were`; quá khứ phân từ không đổi."],
    ["nói một việc không được tiến hành trong lúc này", "The bridge isn't being painted today.", "The bridge isn't been painted today.", "The machines aren't being used at the moment.", "Phủ định tiếp diễn bị động đặt `not` sau `is/are`, rồi giữ `being + quá khứ phân từ`."],
  ]),
  "b1-passive-modals-infinitive": b1PracticeSet("b1pmi", "bị động với modal và infinitive", [
    ["nói một việc có thể được làm bằng `can`", "The form can be completed online.", "The form can completed online.", "This ticket can be used twice.", "Sau `can` cần `be + quá khứ phân từ` để nói một việc có thể được làm."],
    ["nêu một việc bắt buộc phải được làm bằng `must`", "Seat belts must be worn.", "Seat belts must to be worn.", "All bags must be checked.", "`Must + be + quá khứ phân từ` nêu việc bắt buộc phải được làm; sau `must` không thêm `to`."],
    ["đưa lời khuyên bằng `should` ở câu bị động", "The problem should be reported.", "The problem should is reported.", "The door should be locked at night.", "Sau `should`, `be` giữ dạng cơ bản rồi mới tới quá khứ phân từ."],
    ["nói một việc có thể sẽ xảy ra bằng `may` hoặc `might`", "The flight may be delayed.", "The flight may delayed.", "The match might be cancelled.", "`May/might be + quá khứ phân từ` nói khả năng một việc sẽ xảy ra."],
    ["nêu điều bị cấm bằng `must not`", "This door must not be left open.", "This door must be not left open.", "Phones must not be used in the exam room.", "`Not` đứng ngay sau modal và trước `be`: `must not be + quá khứ phân từ` nêu điều bị cấm."],
    ["hỏi ý kiến bằng câu hỏi bị động với `should`", "Should the report be sent today?", "Should be the report sent today?", "Should the windows be closed at night?", "Khi hỏi, chỉ đưa `should` lên trước chủ ngữ; `be + quá khứ phân từ` vẫn đứng sau chủ ngữ."],
    ["nói một việc cần được làm bằng `need to`", "The work needs to be finished today.", "The work needs to finished today.", "The roof needs to be repaired.", "Sau `need to`, bị động dùng `to be + quá khứ phân từ` vì chủ ngữ là thứ chịu tác động."],
    ["nói một người muốn hoặc hy vọng được người khác chọn hay mời", "I want to be invited.", "I want to invite.", "She hopes to be chosen.", "Chủ ngữ là người nhận hành động nên sau `want/hope` dùng `to be + quá khứ phân từ`."],
    ["nói một công trình được dự kiến xong hoặc khai trương bằng `be expected to`", "The building is expected to be completed in June.", "The building is expected be completed in June.", "The new road is expected to be opened next year.", "Sau cụm cố định `be expected to` (được dự kiến sẽ), bị động dùng `to be + quá khứ phân từ`."],
    ["giữ `be` nguyên dạng sau `will` dù chủ ngữ số nhiều", "The new desks will be delivered on Monday.", "The new desks will are delivered on Monday.", "The exam results will be posted online.", "Sau `will`, `be` luôn giữ dạng cơ bản, kể cả khi chủ ngữ là số nhiều."],
    ["thêm `by` và người thực hiện vào câu bị động sau modal", "The final decision will be made by the director.", "The final decision will be make by the director.", "The new library will be opened by the mayor.", "Câu bị động có modal vẫn có thể thêm `by` + người thực hiện khi người đó là thông tin quan trọng."],
    ["nói một thứ dễ dùng hoặc dễ hiểu bằng tính từ + `to` + động từ", "These instructions are easy to understand.", "These instructions are easy to be understood.", "This machine is simple to operate.", "Sau tính từ như `easy/simple`, mẫu tự nhiên là `to` + động từ nguyên thể, không đổi máy móc sang bị động."],
  ]),
  "b1-passive-by-with": b1PracticeSet("b1pbw", "by cho tác nhân và with cho công cụ", [
    ["nêu người viết một cuốn sách", "The novel was written by George Orwell.", "The novel was written with George Orwell.", "The textbook was written by two teachers.", "Người viết sách là tác nhân thực hiện hành động `write`, nên đi sau `by`."],
    ["nêu dụng cụ cầm tay được dùng mà không nêu người làm", "The bread was cut with a sharp knife.", "The bread was cut by a sharp knife.", "The wall was painted with a brush.", "Dụng cụ được dùng để làm việc đi sau `with`, không phải `by`."],
    ["nêu người phát hiện ra một sự việc", "The fire was discovered by a guard.", "The fire was discovered with a guard.", "The error was found by a technician.", "Người phát hiện là tác nhân thực hiện hành động nên đi sau `by`."],
    ["nêu vật liệu được dùng để buộc hay trang trí", "The parcel was tied with string.", "The parcel was tied by string.", "The room was decorated with flowers.", "Vật liệu hay thứ được đặt lên đối tượng đi với `with`."],
    ["nêu cả người làm lẫn dụng cụ được dùng", "The picture was drawn by Lan with a pencil.", "The picture was drawn with Lan by a pencil.", "The window was broken by a boy with a stone.", "`By` nêu người thực hiện, `with` nêu dụng cụ được dùng; một câu có thể chứa cả hai.", { parallelVariants: ["The window was broken with a stone by a boy."] }],
    ["lược tác nhân vì đó là mọi người nói chung", "English is spoken here.", "English is spoken here by people.", "Rice is eaten all over Asia.", "Tác nhân là mọi người nói chung không thêm thông tin, nên thường được lược."],
    ["giữ tác nhân vì người đó gây bất ngờ", "The song was written by a twelve-year-old.", "The song was written.", "The prize was won by the youngest player.", "Tác nhân bất ngờ mang thông tin đáng chú ý nên được giữ lại trong câu bị động."],
    ["nói phương tiện đi lại bằng `by`, không phải nêu tác nhân", "We travelled by bus.", "We were travelled by bus.", "Lan goes to school by bike.", "`By` + phương tiện nói cách đi lại; câu vẫn ở dạng chủ động nên không thêm `be`."],
    ["nêu hạn chót bằng `by`", "The report must be ready by Friday.", "The report must be ready until Friday.", "Please reply by noon.", "`By` + mốc thời gian nghĩa là không muộn hơn mốc đó; đây không phải cụm tác nhân."],
    ["nói một bề mặt bị phủ kín hoặc một vật được chứa đầy", "The road was covered with snow.", "The road was covered snow.", "The bottle was filled with water.", "Với trạng thái phủ kín hoặc chứa đầy như `covered/filled`, `with` nêu thứ phủ lên hay chứa bên trong."],
    ["nêu lực tự nhiên gây ra thiệt hại", "The village was damaged by the storm.", "The village was damaged with the storm.", "The roof was lifted by the wind.", "Lực tự nhiên gây ra sự việc là tác nhân, nên đi với `by`, không phải `with`."],
    ["nói đồ của mình bị lấy trộm mà không biết ai lấy, không thêm cụm `by` thừa", "My wallet was stolen.", "My wallet was stolen by them.", "Our bikes were stolen last week.", "Khi không biết ai lấy, một cụm tác nhân chung chung chỉ thừa; câu bị động kết thúc ngay sau quá khứ phân từ hoặc thêm thông tin thời gian, nơi chốn."],
  ]),
  "b1-active-vs-passive-choice": b1PracticeSet("b1avp", "lựa chọn chủ động hoặc bị động", [
    ["nói việc Lan đã làm, với Lan đứng làm chủ ngữ", "Lan prepared the report.", "The report was prepared by Lan.", "Lan designed the poster for the event.", "Khi chính người làm là chủ đề đang được nói tới, câu chủ động đặt người đó lên đầu câu."],
    ["giữ món đồ bị mất làm chủ ngữ vì không biết ai lấy", "My bike was stolen last night.", "Someone stole my bike last night.", "Our laptop was stolen from the office.", "Khi không biết ai lấy, bị động đặt món đồ bị mất lên đầu câu và bỏ hẳn tác nhân."],
    ["nêu một thay đổi lịch trình mà không nói ai quyết định", "The meeting has been cancelled.", "The manager has cancelled the meeting.", "The flight has been delayed.", "Người nghe chỉ cần biết thay đổi lịch trình, nên bị động đặt sự kiện lên đầu câu và lược người quyết định."],
    ["giữ công trình đang được nói tới làm chủ ngữ của câu tiếp theo", "The temple was built in the fifteenth century.", "People built the temple in the fifteenth century.", "It was restored in 1998.", "Bị động giữ công trình đang được nói tới ở đầu câu, nên đoạn văn không đột ngột chuyển chủ đề sang người làm."],
    ["nói các bước xử lý một sản phẩm mà không nêu công nhân", "The fruit is washed and cut.", "Workers wash and cut the fruit.", "The bottles are filled and labelled.", "Quy trình tập trung vào sản phẩm và các bước xử lý, nên bị động phù hợp hơn chủ động."],
    ["nêu rõ bên phải chịu trách nhiệm về một sai sót", "The accounts team made a mistake.", "A mistake was made.", "The delivery company lost our parcel.", "Chủ động nêu rõ ai chịu trách nhiệm; bị động không có tác nhân sẽ che mất thông tin này."],
    ["viết thông báo chung có khách đứng làm chủ ngữ", "Visitors are asked to remain seated.", "Staff ask visitors to remain seated.", "Passengers are advised to keep their tickets.", "Bị động thường dùng trong thông báo chung, vì người đọc chỉ cần biết mình được yêu cầu hay khuyên làm gì."],
    ["giữ vật hay sự kiện làm chủ đề nhưng vẫn nêu người làm đáng chú ý", "The portrait was painted by Picasso.", "Picasso painted the portrait.", "The winning goal was scored by Linh.", "Bị động giữ vật hay sự kiện làm chủ đề, còn `by` vẫn nêu tác nhân đáng chú ý."],
    ["viết lời đề nghị trực tiếp gửi người nhận email", "Please complete and sign the form.", "The form should be completed and signed.", "Please send the form by Friday.", "Trong lời đề nghị trực tiếp, câu mệnh lệnh lịch sự cho người nhận biết rõ mình cần làm gì và gọn hơn câu bị động."],
    ["nêu kết quả kiểm tra mà không cần nói ai tìm ra", "Three errors were found in the data.", "The assistants found three errors in the data.", "No damage was found after the inspection.", "Bị động tập trung vào điều được phát hiện, còn người tìm ra không phải trọng tâm."],
    ["giữ một hiện tượng thời tiết làm chủ ngữ vì đoạn văn đang nói về nó", "The storm damaged several houses.", "Several houses were damaged by the storm.", "Strong winds destroyed the fence.", "Khi lực tự nhiên là chủ đề của đoạn văn, chủ động đặt nó làm chủ ngữ."],
    ["nói gọn và trực tiếp với khách hàng rằng chính nhóm mình sẽ làm một việc", "We will check your form tomorrow.", "Your form will be checked by us tomorrow.", "Our staff will answer your questions.", "Khi người làm là chính nhóm người viết, câu chủ động gọn và rõ hơn một câu bị động phải thêm tác nhân ở cuối."],
  ]),
};

const b1Chapter25DepthExerciseData: Partial<Record<string, Exercise[]>> = {
  "b1-passive-common-tenses": b1DepthPack("b1pcx", "bị động ở các thì thông dụng", [
    { cue: "Con đường đang được sửa ngay lúc nói.", options: ["The road is being repaired.", "The road is repaired now."], answer: "The road is being repaired.", completed: "The road is being repaired." },
    { cue: "Công việc đã hoàn tất và kết quả còn liên quan hiện tại.", options: ["The work has been completed.", "The work was being completed."], answer: "The work has been completed.", completed: "The work has been completed." },
    { cue: "Kết quả sẽ được công bố ngày mai.", options: ["The results will be announced tomorrow.", "The results will announced tomorrow."], answer: "The results will be announced tomorrow.", completed: "The results will be announced tomorrow." },
  ], [
    ["Sắp xếp câu bị động quá khứ tiếp diễn khi người nói đến.", "The hall was being decorated when we arrived.", "`Was being + pp` đặt hành động bị động giữa quá trình quá khứ."],
    ["Sắp xếp câu hỏi hiện tại hoàn thành bị động.", "Has your application been accepted yet?", "Đưa `has` lên trước chủ ngữ và giữ `been + pp`."],
    ["Sắp xếp câu bị động với kế hoạch `be going to`.", "The old library is going to be rebuilt.", "Sau `going to` vẫn cần `be + pp`."],
  ]),
  "b1-active-vs-passive-choice": b1DepthPack("b1avx", "góc nhìn chủ động và bị động", [
    { cue: "Email trực tiếp nêu rõ nhóm chúng tôi sẽ trả lời.", options: ["We will answer your questions.", "Your questions will be answered by us."], answer: "We will answer your questions.", completed: "We will answer your questions." },
    { cue: "Biển báo chung không cần nêu người quản lý.", options: ["Visitors are not allowed beyond this point.", "Managers do not allow visitors beyond this point."], answer: "Visitors are not allowed beyond this point.", completed: "Visitors are not allowed beyond this point." },
    { cue: "Báo cáo cần nêu rõ nhà thầu chịu trách nhiệm.", options: ["The contractor missed the deadline.", "The deadline was missed."], answer: "The contractor missed the deadline.", completed: "The contractor missed the deadline." },
  ], [
    ["Sắp xếp câu bị động giữ chiếc cầu làm chủ đề của đoạn mô tả.", "The bridge was designed by a local architect.", "Đối tượng vẫn đứng đầu nhưng tác nhân đáng chú ý được giữ lại."],
  ]),
};

export const b1Chapter25ExerciseData = mergeExerciseRecords(
  b1Chapter25BaseExerciseData,
  b1Chapter25DepthExerciseData,
);
