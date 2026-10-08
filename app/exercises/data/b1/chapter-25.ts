/* Luyện tập B1 — Chương 25: Câu bị động. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";
import { b1DepthPack } from "../../b1-depth-builders.ts";

const b1Chapter25BaseExerciseData: Record<string, Exercise[]> = {
  "b1-passive-principle": b1PracticeSet("b1papr", "nguyên lý câu bị động", [
    ["đưa mái nhà lên làm chủ ngữ", "The roof was damaged by the storm.", "The roof damaged by the storm.", "The window was broken by a ball.", "Bị động cần `be + past participle`."],
    ["bị động hiện tại số ít", "The room is cleaned every day.", "The room cleans every day by someone.", "The office is locked at six.", "`Be` mang thì và hòa hợp với chủ ngữ."],
    ["bị động hiện tại số nhiều", "The rooms are cleaned every day.", "The rooms is cleaned every day.", "These forms are checked weekly.", "Chủ ngữ số nhiều cần `are`."],
    ["lược tác nhân không biết", "My bike was stolen.", "My bike was stole.", "The door was left open.", "Khi không biết tác nhân, không cần thêm cụm `by`; động từ vẫn phải ở dạng quá khứ phân từ `stolen`."],
    ["tập trung vào kết quả mở cầu", "The new bridge was opened in May.", "People was opened the new bridge in May.", "The new library was completed last year.", "Bị động đặt công trình/kết quả làm chủ đề."],
    ["mô tả quy trình", "The beans are dried and packed.", "The beans dry and pack themselves.", "The bottles are washed and filled.", "Quy trình thường lược người thực hiện."],
    ["động từ có tân ngữ chuyển bị động", "Lan was invited to the meeting.", "The meeting was arrived by Lan.", "The documents were sent yesterday.", "`Invite/send` có đối tượng chịu tác động."],
    ["động từ không có tân ngữ", "The train arrived late.", "Late was arrived by the train.", "An accident happened near the bridge.", "`Arrive/happen` không tạo bị động thông thường."],
    ["phủ định bị động", "The office isn't used at weekends.", "The office doesn't be used at weekends.", "The gate was not opened.", "Đặt `not` sau `be`, không thêm `do`."],
    ["câu hỏi bị động", "Was the email sent yesterday?", "Did the email was sent yesterday?", "Were the guests informed?", "Đưa `be` lên trước chủ ngữ."],
    ["giữ quá khứ phân từ bất quy tắc", "The key was taken.", "The key was took.", "The letter was written in French.", "Sau `be` dùng quá khứ phân từ `taken/written`."],
    ["phân biệt trạng thái cửa đóng", "The door was closed all night.", "The door was close all night.", "The shop remained locked until morning.", "Quá khứ phân từ có thể mô tả trạng thái trong ngữ cảnh."],
  ]),
  "b1-passive-common-tenses": b1PracticeSet("b1pct", "bị động ở các thì thông dụng", [
    ["hiện tại đơn bị động", "Rice is grown here.", "Rice grows here by farmers.", "These cars are made in Japan.", "Dùng `am/is/are + past participle`."],
    ["quá khứ đơn bị động", "The bridge was built in 2010.", "The bridge is built in 2010.", "The letters were sent yesterday.", "Mốc quá khứ cần `was/were + pp`."],
    ["hiện tại tiếp diễn bị động", "The road is being repaired.", "The road is repaired right now being.", "A new school is being built.", "Tiếp diễn bị động có `be + being + pp`."],
    ["quá khứ tiếp diễn bị động", "The room was being cleaned when we arrived.", "The room was cleaned being when we arrived.", "The cars were being checked at noon.", "Quá trình tại mốc quá khứ dùng `was/were being`."],
    ["hiện tại hoàn thành bị động", "The work has been finished.", "The work has being finished.", "The keys have been found.", "Hoàn thành bị động dùng `have/has been + pp`."],
    ["tương lai bị động với `will`", "The results will be announced tomorrow.", "The results will announced tomorrow.", "You will be contacted soon.", "Sau `will` cần `be + pp`."],
    ["bị động với `going to`", "The school is going to be rebuilt.", "The school is going to rebuilt.", "The road is going to be widened.", "Hai phần `is going to` và `be + pp` đều cần."],
    ["phủ định hoàn thành bị động", "My application hasn't been accepted yet.", "My application doesn't have accepted yet.", "The payment has not been received.", "Đặt `not` sau trợ động từ đầu tiên."],
    ["câu hỏi tương lai bị động", "Will the package be delivered tomorrow?", "Will be the package delivered tomorrow?", "When will the results be published?", "Đưa `will` trước chủ ngữ và giữ `be + pp`."],
    ["phân biệt `being` và `been`", "The road is being repaired now.", "The road has being repaired already.", "The road has been repaired.", "`Being` thuộc tiếp diễn; `been` thuộc hoàn thành."],
    ["hòa hợp quá khứ số nhiều", "The documents were sent yesterday.", "The documents was sent yesterday.", "The windows were replaced last week.", "Chủ ngữ số nhiều quá khứ cần `were`."],
    ["giữ thì khi chuyển từ chủ động", "The road is being repaired today.", "The road is repaired today by they are repairing.", "The computers were being tested at noon.", "Câu chủ động tiếp diễn chuyển thành `be being + pp`."],
  ]),
  "b1-passive-modals-infinitive": b1PracticeSet("b1pmi", "bị động với modal và infinitive", [
    ["khả năng hoàn thành trực tuyến", "The form can be completed online.", "The form can completed online.", "This ticket can be used twice.", "Sau modal cần `be + past participle`."],
    ["nghĩa vụ thắt dây", "Seat belts must be worn.", "Seat belts must worn.", "All bags must be checked.", "`Must + be + pp` tạo bị động modal."],
    ["lời khuyên báo cáo vấn đề", "The problem should be reported.", "The problem should reported.", "The door should be locked.", "Sau `should` giữ dạng cơ bản `be`."],
    ["khả năng chuyến bay bị hoãn", "The flight may be delayed.", "The flight may delayed.", "The match might be cancelled.", "`May/might be + pp` nói khả năng bị động."],
    ["phủ định modal bị động", "This door must not be left open.", "This door must be not leave open.", "The data cannot be shared.", "`Not` đứng sau modal trước `be`."],
    ["câu hỏi với `should`", "Should the report be sent today?", "Should be the report sent today?", "Can the form be signed online?", "Modal được đảo lên trước chủ ngữ."],
    ["công việc cần được hoàn thành", "The work needs to be finished today.", "The work needs to finished today.", "The roof needs to be repaired.", "Bị động sau `to` dùng `to be + pp`."],
    ["mong được mời", "I want to be invited.", "I want to invited.", "She hopes to be chosen.", "Người nói nhận hành động nên dùng `to be + pp`."],
    ["dự kiến tòa nhà hoàn thành", "The building is expected to be completed in June.", "The building is expected to completed in June.", "The road is likely to be closed.", "Infinitive bị động giữ `be` trước quá khứ phân từ."],
    ["không chia `be` sau modal", "The rooms must be cleaned.", "The rooms must are cleaned.", "The room may be used later.", "Sau modal luôn là dạng cơ bản `be`."],
    ["nêu tác nhân cần ký", "The form must be signed by a parent.", "The form must sign by a parent.", "The decision will be made by the director.", "Câu bị động modal vẫn có thể thêm `by + tác nhân`."],
    ["mẫu tính từ `easy to understand`", "These instructions are easy to understand.", "These instructions are easy for understanding.", "This machine is simple to operate.", "Sau `easy`, mẫu tự nhiên là `to + động từ nguyên thể`: `easy to understand`."],
  ]),
  "b1-passive-by-with": b1PracticeSet("b1pbw", "by cho tác nhân và with cho công cụ", [
    ["nêu tác giả cuốn tiểu thuyết", "The novel was written by George Orwell.", "The novel was written with George Orwell.", "The song was composed by a student.", "Người thực hiện hành động đi sau `by`."],
    ["nêu công cụ cắt bánh", "The bread was cut with a sharp knife.", "The bread was cut by the baker.", "The wall was painted with a brush.", "Công cụ được dùng đi sau `with`."],
    ["nêu tác nhân phát hiện đám cháy", "The fire was discovered by a guard.", "The fire was discovered with a guard.", "The error was found by a technician.", "Người phát hiện là tác nhân."],
    ["nêu vật liệu buộc bưu kiện", "The parcel was tied with string.", "The parcel was tied by Mai.", "The room was decorated with flowers.", "Vật liệu/thứ được dùng đi với `with`."],
    ["nêu cả tác nhân và công cụ", "The picture was drawn by Lan with a pencil.", "The picture was drawn with Lan by a pencil.", "The lock was opened by Minh with a small key.", "`By` nêu người làm; `with` nêu công cụ."],
    ["lược tác nhân chung chung", "English is spoken here.", "English is spoken here by people.", "The street is cleaned every morning.", "Tác nhân chung không thêm thông tin nên thường bỏ."],
    ["giữ tác nhân bất ngờ", "The song was written by a twelve-year-old.", "The song was written with a twelve-year-old.", "The prize was won by the youngest player.", "Tác nhân bất ngờ có giá trị thông tin."],
    ["phân biệt `by bus` không phải tác nhân", "We travelled by bus.", "We were travelled by bus.", "The parcel arrived by courier.", "`By` còn có nghĩa phương tiện, không tự tạo câu bị động."],
    ["phân biệt `by Friday` chỉ hạn", "The report must be ready by Friday.", "The report was performed by Friday.", "Please reply by noon.", "`By + thời điểm` nói hạn cuối."],
    ["mô tả tuyết phủ kín mặt đường", "The road was covered with snow.", "The road covered with snow.", "The bottle was filled with water.", "Với `covered`, `with` thường nêu thứ phủ kín bề mặt; câu bị động vẫn cần `be`."],
    ["tác nhân là lực tự nhiên", "The village was damaged by the storm.", "The village was damaged with the storm.", "The roof was lifted by the wind.", "Lực tự nhiên gây ra hành động là tác nhân nên đi với `by`, không phải `with`."],
    ["hoàn chỉnh câu bị động khi không biết tác nhân", "The meeting was cancelled.", "The meeting was cancelled by.", "My wallet was stolen.", "Không được để `by` đứng một mình; khi không biết tác nhân, câu bị động kết thúc sau quá khứ phân từ vẫn hoàn chỉnh."],
  ]),
  "b1-active-vs-passive-choice": b1PracticeSet("b1avp", "lựa chọn chủ động hoặc bị động", [
    ["nhấn người chuẩn bị báo cáo", "Lan prepared the report.", "The report was prepared by Lan.", "Our team will contact you tomorrow.", "Chủ động rõ khi tác nhân là thông tin quan trọng."],
    ["không biết ai lấy xe", "My bike was stolen last night.", "Someone stole my bike last night.", "The window was broken during the night.", "Bị động phù hợp khi tác nhân không biết."],
    ["thông báo cuộc họp bị hủy mà không nêu người hủy", "The meeting has been cancelled.", "Someone has cancelled the meeting.", "The flight has been delayed.", "Người nghe quan tâm kết quả hơn người ra quyết định."],
    ["giữ ngôi đền làm chủ đề đoạn văn", "The temple was built in the fifteenth century.", "People built the temple in the fifteenth century.", "It was restored in 1998.", "Bị động giữ đối tượng cũ ở đầu câu."],
    ["mô tả quy trình mà không nêu công nhân", "The fruit is washed, cut and packed.", "Workers wash, cut and pack the fruit.", "The bottles are filled and labelled.", "Quy trình tập trung vào vật và các bước xử lý."],
    ["nêu rõ nhóm chịu trách nhiệm", "The accounts team made a mistake.", "A mistake was made.", "The contractor missed the deadline.", "Chủ động tránh che mất tác nhân quan trọng."],
    ["viết thông báo chung mà không cần nêu nhân viên", "Visitors are asked to remain seated.", "Staff ask visitors to remain seated.", "Passengers are advised to keep tickets.", "Bị động thường dùng trong thông báo chung."],
    ["giữ bức chân dung làm chủ đề nhưng vẫn nêu họa sĩ", "The portrait was painted by Picasso.", "Picasso painted the portrait.", "The winning goal was scored by Linh.", "Bị động giữ vật/sự kiện làm chủ đề nhưng vẫn nêu tác nhân đáng chú ý."],
    ["viết email trực tiếp yêu cầu người nhận điền đơn", "Please complete and sign the form.", "The form should be completed and signed.", "Please send the form by Friday.", "Trong lời nhờ trực tiếp, câu mệnh lệnh lịch sự thường rõ người thực hiện và gọn hơn câu bị động."],
    ["báo cáo lỗi được tìm thấy mà không cần nêu người tìm", "Three errors were found in the data.", "People found three errors in the data.", "No damage was found after the inspection.", "Bị động tập trung vào phát hiện/kết quả."],
    ["giữ cơn bão làm chủ thể của đoạn văn", "The storm damaged several houses.", "Several houses were damaged by the storm.", "Strong winds destroyed the fence.", "Chủ động phù hợp khi lực gây ra sự việc là chủ đề."],
    ["tránh bị động dài không cần thiết", "We will check your form tomorrow.", "Your form will be checked by us tomorrow.", "Our staff will answer your questions.", "Chủ động thường gọn khi tác nhân đã rõ và có ích."],
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
