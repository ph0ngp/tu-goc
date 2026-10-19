/* Luyện tập B1 — Chương 28: Suy đoán và mức độ chắc chắn. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";
import { b1DepthPack } from "../../b1-depth-builders.ts";

const b1Chapter28BaseExerciseData: Record<string, Exercise[]> = {
  "b1-present-deduction-modals": b1PracticeSet("b1pdm", "modal suy đoán hiện tại", [
    ["suy đoán chắc chắn ai đang ở đâu nhờ dấu hiệu đang thấy", "The lights are on, so someone must be home.", "The lights are on, so someone may be home.", "Her coat is here, so she must be in the building.", "`Must` thể hiện kết luận dương rất mạnh dựa trên bằng chứng."],
    ["suy đoán chắc chắn rằng người hoặc vật đang thấy không phải là đối tượng được nhắc tới", "That can't be Minh; he's abroad.", "That mustn't be Minh; he's abroad.", "That can't be our bus; ours is blue.", "Khi kết luận chắc chắn một điều không đúng, dùng `can't`; dạng rút gọn `mustn't` thường mang nghĩa “không được phép” nên không dùng cho suy luận."],
    ["nêu một khả năng về vị trí của ai hoặc vật gì khi chưa có bằng chứng mạnh", "Lan may be at the library.", "Lan must be at the library.", "The key might be in my bag.", "`May/might` chỉ để ngỏ một khả năng, không phải kết luận chắc chắn."],
    ["suy đoán một âm thanh hoặc một người chưa rõ có thể là gì hoặc là ai", "That noise could be the wind.", "That noise can be the wind.", "The caller could be Nam.", "Để nêu một khả năng cụ thể ở hiện tại, dùng `could`; `can` không dùng cho nghĩa này."],
    ["nêu một khả năng phủ định yếu, chưa loại trừ hẳn", "Lan may not be at home.", "Lan can't be at home.", "They might not know yet.", "`May not/might not` nghĩa là “có thể không”, yếu hơn một kết luận phủ định chắc chắn."],
    ["suy đoán rằng ai đó đang làm một việc ngay lúc này", "They must be having lunch.", "They must having lunch.", "The children might be playing in the garden.", "Để suy đoán hoạt động đang diễn ra, dùng `modal + be + V-ing`."],
    ["suy đoán chắc chắn rằng ai đó không thể đang làm một việc", "He can't be sleeping; I can hear him talking.", "He mustn't be sleeping; I can hear him talking.", "They can't be waiting inside because the building is locked.", "`Can't be + V-ing` loại trừ chắc chắn một hoạt động đang diễn ra."],
    ["nói một nghĩa vụ bằng `must`", "You must leave now.", "You must be leaving now.", "Employees must wear badges.", "Ở đây `must + V` nói điều bắt buộc phải làm, không phải một suy luận."],
    ["suy đoán trạng thái của người nghe từ những gì quan sát được", "You must be in a hurry.", "You must hurry.", "You must be hungry after the long walk.", "`Must be` + một trạng thái thể hiện suy luận về người nghe, không phải lời yêu cầu."],
    ["nói năng lực làm được một việc, không phải suy đoán", "Lan can swim.", "Lan must swim.", "Minh can repair bikes.", "`Can + V` ở đây nói năng lực thực tế của chủ ngữ."],
    ["suy đoán rằng ai đó có thể biết một điều", "Lan might know the answer.", "Lan might knows the answer.", "Mai may know his phone number.", "Sau modal, động từ giữ dạng cơ bản: `might know`, `may know`, không thêm `-s`."],
    ["suy đoán chắc chắn rằng ai đó không thể biết một điều", "They can't know our new address.", "They mustn't know our new address.", "He can't know about the party; nobody told him.", "`Can't know` nêu kết luận chắc chắn rằng ai đó không thể biết điều đang nói tới."],
  ]),
  "b1-certainty-scale": b1PracticeSet("b1csc", "likely, unlikely, probably và bound to", [
    ["dự đoán một người hoặc vật có khả năng sẽ làm gì bằng `be likely to`", "Lan is likely to arrive early.", "Lan likely to arrive early.", "The team is likely to win.", "`Likely` là tính từ nên cần `be`; `chủ ngữ + be likely to + V` nói điều có khả năng xảy ra."],
    ["nêu đánh giá rằng một sự việc khó xảy ra, với `It` làm chủ ngữ", "It is unlikely that the shop will open today.", "Is unlikely that the shop will open today.", "It is unlikely that he will agree.", "Khi đánh giá cả một mệnh đề, dùng `It is unlikely that + mệnh đề`; không bỏ chủ ngữ `It`."],
    ["nêu đánh giá rằng một sự việc có khả năng xảy ra, với `It` làm chủ ngữ", "It is likely that Lan will arrive early.", "It likely that Lan will arrive early.", "It is likely that prices will rise.", "Cấu trúc đánh giá cả mệnh đề cần `It is likely that + mệnh đề`."],
    ["đặt `probably` trước động từ chính trong câu khẳng định", "Lan probably knows the answer.", "Lan knows probably the answer.", "They probably need more time.", "Trong câu khẳng định không có trợ động từ, `probably` thường đứng trước động từ chính."],
    ["đặt `probably` sau `be`", "Lan is probably at home.", "Lan probably at home.", "The keys are probably upstairs.", "Với `be`, `probably` thường đứng ngay sau `be`, và câu vẫn cần `be`."],
    ["đặt `probably` sau modal hoặc trợ động từ đầu tiên", "Lan will probably come.", "Lan will probable come.", "They have probably left.", "`Probably` là trạng từ và thường đứng sau modal hoặc trợ động từ đầu tiên."],
    ["dự đoán gần như chắc chắn dựa vào tình hình đang thấy", "With all this traffic, we're bound to be late.", "With all this traffic, we're bound being late.", "With these dark clouds, it's bound to rain.", "`Be bound to + V` thể hiện kỳ vọng rất mạnh dựa trên hoàn cảnh."],
    ["nói một việc khó xảy ra nhưng vẫn còn một khả năng nhỏ, với chủ ngữ là người hoặc vật", "The train is unlikely to be late.", "The train can't be late.", "The plan is unlikely to fail.", "`Be unlikely to + V` nói một việc khó xảy ra nhưng chưa bị loại trừ hoàn toàn."],
    ["dự đoán một việc có lẽ sẽ không xảy ra, với `probably` ở vị trí tự nhiên", "Lan probably won't come.", "Lan won't probably come.", "The shop probably won't open today.", "Khi dự đoán phủ định với `won't`, `probably` thường đứng trước `won't`."],
    ["hỏi một việc có khả năng xảy ra hay không bằng `likely`", "Are prices likely to rise?", "Do prices likely to rise?", "Is it likely to rain tomorrow?", "Trong câu hỏi, đưa `be` lên trước chủ ngữ: `be + chủ ngữ + likely to + V`."],
    ["nói một kết quả gần như chắc chắn nếu điều kiện được đáp ứng", "If you practise every day, you're bound to improve.", "If you practise every day, you're bound improve.", "If you leave the milk out, it's bound to go bad.", "Sau một điều kiện, `be bound to + V` cho thấy kết quả gần như chắc chắn xảy ra."],
    ["nói rằng có lẽ một điều hiện không đúng, với `probably` ở vị trí tự nhiên", "He probably doesn't agree.", "He doesn't probably agree.", "They probably don't know the address.", "Trong câu phủ định với `don't/doesn't`, `probably` thường đứng trước trợ động từ phủ định."],
  ]),
  "b1-should-expectation": b1PracticeSet("b1she", "should chỉ điều được kỳ vọng", [
    ["nói một thứ dự kiến sẽ đến vào lúc nào", "The bus should arrive in ten minutes.", "The bus should arrives in ten minutes.", "The parcel should arrive today.", "`Should arrive` nêu lúc một thứ dự kiến sẽ đến; sau `should`, động từ giữ dạng cơ bản."],
    ["nói ai đó có lẽ biết điều gì nhờ vai trò hoặc hiểu biết của họ", "Mai should know the answer; she's the teacher.", "Mai should knows the answer; she's the teacher.", "The receptionist should know the address.", "`Should know` cho thấy người nói kỳ vọng ai đó biết nhờ vai trò hoặc kiến thức của họ."],
    ["nói một việc dự kiến mất bao lâu", "The repair should take two days.", "The repair should taking two days.", "The journey should take an hour.", "`Should take` nêu khoảng thời gian dự kiến một việc cần nếu mọi việc diễn ra bình thường."],
    ["nói theo dự kiến ai đang làm gì lúc này", "They should be waiting for us.", "They should waiting for us.", "Mai should be travelling now.", "Quá trình được kỳ vọng đang diễn ra dùng `should be + V-ing`."],
    ["dự đoán phủ định một điều theo dự kiến", "There shouldn't be much traffic on Sunday.", "There doesn't should be much traffic on Sunday.", "The exam shouldn't be too difficult.", "Dạng phủ định là `should not/shouldn't + V`, không dùng `do/does`."],
    ["hỏi theo dự kiến khi nào một việc xảy ra", "When should we hear the results?", "When we should hear the results?", "When should the train arrive?", "Trong câu hỏi, đưa `should` lên trước chủ ngữ."],
    ["đưa lời khuyên trực tiếp cho người nghe", "You should leave now.", "The bus should leave now.", "You should speak to the teacher.", "Khi chủ ngữ là người nghe và hành động do họ lựa chọn, `should` thường là lời khuyên."],
    ["nói giờ một chuyến đi hoặc cuộc họp dự kiến bắt đầu hoặc kết thúc", "The train should leave at six.", "The train should to leave at six.", "The meeting should finish by noon.", "Với lịch trình của chuyến đi hoặc cuộc họp, `should + V` nói giờ dự kiến bắt đầu hoặc kết thúc."],
    ["suy đoán chắc chắn từ dấu hiệu đang thấy hoặc nghe", "The train must be near; I can hear it.", "The train should be near; I can hear it.", "She must be home because the lights are on.", "`Must` phù hợp với kết luận mạnh dựa trên dấu hiệu trực tiếp."],
    ["nêu một khả năng khi chỉ có ít căn cứ", "The train might be late.", "The train should be late.", "Lan may know the answer.", "`Might/may` để ngỏ một khả năng với mức tin thấp hơn một kỳ vọng."],
    ["nói kết quả dự kiến kèm một điều kiện bình thường", "If traffic is light, we should arrive by nine.", "If traffic is light, we should arrived by nine.", "The plan should work if everyone cooperates.", "`Should` thường ngầm hiểu “nếu mọi việc diễn ra bình thường”, nên hợp với một điều kiện như vậy."],
    ["nói theo dự kiến thì lúc này ai hoặc cái gì đã phải có mặt", "The bus should be here by now.", "The bus should is here by now.", "Lan should be home by now.", "`Should be ... by now` nêu kỳ vọng ở hiện tại và có thể hàm ý người nói ngạc nhiên vì chưa thấy."],
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
