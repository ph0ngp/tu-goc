/* Luyện tập B1 — Chương 28: Suy đoán và mức độ chắc chắn. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";
import { b1DepthPack } from "../../b1-depth-builders.ts";

const b1Chapter28BaseExerciseData: Record<string, Exercise[]> = {
  "b1-present-deduction-modals": b1PracticeSet("b1pdm", "modal suy đoán hiện tại", [
    ["kết luận mạnh vì đèn đang sáng", "Someone must be home.", "Someone may be home.", "You must be tired after that journey.", "`Must` nêu kết luận dương mạnh từ dấu hiệu."],
    ["loại trừ Minh vì anh ấy ở nước ngoài", "That can't be Minh.", "That mustn't be Minh.", "This answer can't be right.", "Suy đoán phủ định mạnh dùng `can't`, không dùng `mustn't`."],
    ["để ngỏ Lan ở thư viện khi chưa có bằng chứng mạnh", "Lan may be at the library.", "Lan must be at the library.", "The key might be in my bag.", "`May/might/could` nói khả năng chưa chắc."],
    ["nêu một khả năng trong nhiều khả năng", "That noise could be the wind.", "That noise can be the wind.", "The caller could be Nam.", "`Could` dùng cho khả năng suy đoán."],
    ["nói có thể Lan không ở nhà nhưng chưa loại trừ chắc chắn", "Lan may not be at home.", "Lan can't be at home.", "They might not know yet.", "`May not/might not` là khả năng phủ định yếu."],
    ["suy đoán hoạt động đang diễn ra", "They must be having lunch.", "They must having lunch.", "Lan may be working from home.", "Dùng `modal + be + V-ing`."],
    ["loại trừ việc đang ngủ từ bằng chứng đang nghe thấy", "He can't be sleeping; I hear him talking.", "He mustn't be sleeping; I hear him talking.", "They can't be waiting inside because the building is locked.", "`Can't be V-ing` loại trừ quá trình hiện tại."],
    ["nói nghĩa vụ phải rời đi ngay", "You must leave now.", "You must be leaving now.", "Employees must wear badges.", "`Must + V` có thể nói nghĩa vụ theo ngữ cảnh."],
    ["suy luận người nghe đang vội từ những gì quan sát được", "You must be in a hurry.", "You must hurry.", "This must belong to Mai.", "`Must be/belong` cùng bằng chứng nêu suy luận."],
    ["nói năng lực bơi thực tế của Lan", "Lan can swim.", "Lan could be at the pool.", "Minh can repair bikes.", "`Can + V` có thể nói năng lực thực tế."],
    ["không chia động từ sau modal", "Lan might know the answer.", "Lan might knows the answer.", "They must need more time.", "Sau modal dùng động từ dạng cơ bản."],
    ["nói khả năng yếu rằng cô ấy không phải quản lý khi chưa có bằng chứng mạnh", "She might not be the manager.", "She can't be the manager.", "The plan may not work.", "`Might not` để ngỏ; `can't` cần kết luận loại trừ mạnh."],
  ]),
  "b1-certainty-scale": b1PracticeSet("b1csc", "likely, unlikely, probably và bound to", [
    ["dự đoán Lan có khả năng đến sớm", "Lan is likely to arrive early.", "Lan likely to arrive early.", "The team is likely to win.", "`Likely` là tính từ nên cần `be`."],
    ["dự đoán đường khó mở lại", "The road is unlikely to reopen today.", "The road unlikely reopens today.", "Prices are unlikely to fall soon.", "Mẫu là `be unlikely to + V`."],
    ["đánh giá cả mệnh đề với `it`", "It is likely that Lan will arrive early.", "It likely that Lan arrives early.", "It is unlikely that the shop will open today.", "Cấu trúc cần `It is + adjective + that`."],
    ["đặt `probably` trước động từ chính", "Lan probably knows the answer.", "Lan knows probably the answer.", "They probably need more time.", "Trạng từ thường đứng trước động từ chính."],
    ["đặt `probably` ở vị trí trung tính sau `be`", "Lan is probably at home.", "Lan probably is at home.", "The keys are probably upstairs.", "Với `be`, trạng từ thường đứng sau `be`."],
    ["đặt `probably` sau modal", "Lan will probably come.", "Lan probably will comes.", "They may probably need help.", "Sau modal/trợ động từ đầu tiên là vị trí tự nhiên."],
    ["gần chắc muộn vì giao thông", "We're bound to be late.", "We're bound being late.", "Mistakes are bound to happen.", "`Be bound to + V` nói kỳ vọng rất mạnh."],
    ["nói tàu khó có khả năng trễ nhưng không loại trừ tuyệt đối", "The train is unlikely to be late.", "The train can't be late.", "The plan is unlikely to fail.", "`Unlikely` vẫn để lại một khả năng nhỏ."],
    ["phủ định xác suất tự nhiên", "Lan probably won't come.", "Lan won't probably comes.", "The shop probably won't open today.", "`Probably` thường đứng trước modal phủ định."],
    ["chọn chủ ngữ người/vật với `likely`", "The team is likely to win.", "The team likely wins to.", "This medicine is likely to help.", "Chủ ngữ trực tiếp dùng `be likely to`."],
    ["nhấn điều gần khó tránh", "If you practise, you're bound to improve.", "If you practise, you're maybe bound improve.", "With no fuel, the engine is bound to stop.", "`Bound to` cần hoàn cảnh hỗ trợ kỳ vọng mạnh."],
    ["không gắn một tỉ lệ phần trăm cố định cho modal", "May and might express flexible possibility.", "Might expresses the same fixed probability in every context.", "Likely suggests probability without an exact percentage.", "Mức độ do `may/might` thể hiện phụ thuộc ngữ cảnh, không tương ứng với một tỉ lệ cố định."],
  ]),
  "b1-should-expectation": b1PracticeSet("b1she", "should chỉ điều được kỳ vọng", [
    ["xe buýt dự kiến đến sau mười phút", "The bus should arrive in ten minutes.", "The bus should arrives in ten minutes.", "The parcel should arrive today.", "Sau `should` dùng động từ dạng cơ bản."],
    ["Lan dự kiến đã ở nhà giờ này", "Lan should be at home by now.", "Lan should is at home by now.", "The manager should be in her office.", "`Should be` nói trạng thái được kỳ vọng."],
    ["thời gian sửa chữa dự kiến", "The repair should take two days.", "The repair should taking two days.", "The journey should take an hour.", "`Should + V` nêu tiến trình bình thường."],
    ["hoạt động dự kiến đang diễn ra", "They should be waiting for us.", "They should waiting for us.", "Mai should be travelling now.", "Quá trình dự kiến dùng `should be + V-ing`."],
    ["dự đoán ít giao thông", "There shouldn't be much traffic on Sunday.", "There doesn't should be much traffic.", "The task shouldn't take long.", "Phủ định là `should not + V`."],
    ["hỏi thời gian dự kiến", "When should we hear the results?", "When we should hear the results?", "When should the train arrive?", "Đưa `should` trước chủ ngữ."],
    ["đưa lời khuyên trực tiếp cho người nghe", "You should leave now.", "The train should leave at six.", "You should speak to the teacher.", "Chủ ngữ người nghe và hành động lựa chọn thường tạo nghĩa lời khuyên."],
    ["phân biệt lịch dự kiến", "The train should leave at six.", "The train should to leave at six.", "The meeting should finish by noon.", "Sự kiện/lịch trình tạo nghĩa kỳ vọng."],
    ["kết luận mạnh từ âm thanh đoàn tàu đang đến", "The train must be near; I can hear it.", "The train should be near; I can hear it.", "She must be home because the lights are on.", "`Must` phù hợp với kết luận mạnh từ dấu hiệu."],
    ["nêu một khả năng tàu trễ khi chỉ có ít căn cứ", "The train might be late.", "The train should be late.", "Lan may know the answer.", "`Might/may` để ngỏ khả năng hơn `should`."],
    ["hàm ý mọi việc diễn ra bình thường", "If traffic is light, we should arrive by nine.", "If traffic is light, we should arrived by nine.", "The plan should work if everyone cooperates.", "`Should` thường ngầm có điều kiện bình thường."],
    ["giới hạn ở kỳ vọng hiện tại", "The bus should be here by now.", "The bus should is here by now.", "Mai should know the result now.", "Sau `should`, động từ giữ dạng nguyên thể: `should be`, không phải `should is`."],
  ]),
};

const b1Chapter28DepthExerciseData: Partial<Record<string, Exercise[]>> = {
  "b1-present-deduction-modals": b1DepthPack("b1pdx", "mức độ suy đoán hiện tại", [
    { cue: "Đèn sáng và có tiếng nhạc nên kết luận dương rất mạnh.", options: ["They must be home.", "They might be home."], answer: "They must be home.", completed: "They must be home." },
    { cue: "Minh đang ở nước ngoài nên loại trừ người trước cửa là Minh.", options: ["That can't be Minh.", "That may not be Minh."], answer: "That can't be Minh.", completed: "That can't be Minh." },
    { cue: "Không có đủ bằng chứng, chỉ nêu một khả năng.", options: ["The keys could be in the car.", "The keys must be in the car."], answer: "The keys could be in the car.", completed: "The keys could be in the car." },
  ], [
    ["Sắp xếp câu suy đoán một hoạt động đang diễn ra.", "Lan may be working in the library.", "Dùng `modal + be + V-ing` cho quá trình hiện tại."],
  ]),
};

export const b1Chapter28ExerciseData = mergeExerciseRecords(
  b1Chapter28BaseExerciseData,
  b1Chapter28DepthExerciseData,
);
