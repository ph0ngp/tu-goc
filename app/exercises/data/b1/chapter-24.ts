/* Luyện tập B1 — Chương 24: Điều kiện và mong ước. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";
import { b1DepthPack } from "../../b1-depth-builders.ts";

const b1Chapter24BaseExerciseData: Record<string, Exercise[]> = {
  "b1-second-conditional": b1PracticeSet("b1scd", "câu điều kiện loại 2", [
    ["giả định hiện tại không có đủ thời gian", "If I had more time, I would learn Japanese.", "If I would have more time, I learned Japanese.", "If Lan lived nearer, she would visit often.", "Loại 2 dùng `if + past`, rồi `would + V`."],
    ["đưa mệnh đề kết quả lên trước", "Lan would travel more if she had enough money.", "Lan travelled more if she would have enough money.", "We would buy the house if it were cheaper.", "Trật tự đổi được nhưng hình thức hai mệnh đề giữ nguyên."],
    ["dùng `were` trong lời khuyên", "If I were you, I would apologize.", "If I would be you, I apologized.", "If I were in your position, I would wait.", "`If I were you` là mẫu giả định thông dụng."],
    ["nói khả năng làm được trong giả định", "If we had a car, we could visit more often.", "If we had a car, we can visited more often.", "If I knew her number, I could call her.", "`Could + V` diễn tả khả năng trong kết quả giả định."],
    ["nói kết quả chỉ có thể xảy ra", "If Lan asked, he might agree.", "If Lan would ask, he might agreed.", "If the weather improved, we might go out.", "`Might + V` giữ kết quả ở mức khả năng."],
    ["hỏi người nghe trong tình huống tưởng tượng", "What would you do if you lost your phone?", "What did you do if you would lose your phone?", "Where would you live if you could choose?", "Câu hỏi vẫn dùng `would + subject + V`."],
    ["giả định tương lai khó xảy ra", "If it snowed tomorrow, the roads would close.", "If it will snow tomorrow, the roads would close.", "If the river froze in July, people would be amazed.", "Quá khứ tạo khoảng cách với khả năng tương lai."],
    ["không đặt `would` trong mệnh đề `if` cơ bản", "If I knew, I would tell you.", "If I would know, I would tell you.", "If Mai had a map, she would find the place.", "Mệnh đề `if` loại 2 dùng quá khứ đơn."],
    ["dùng `were` với chủ ngữ số ít trong giả định", "If she were here, she would help.", "If she would be here, she helped.", "If the room were larger, we could meet here.", "`Were` là lựa chọn chuẩn trong giả định phản thực."],
    ["phân biệt loại 1 cho kế hoạch thực tế", "If it rains tomorrow, we'll stay home.", "If it rained tomorrow, we'd stay home.", "If Lan calls tonight, I will answer.", "Loại 1 dùng hiện tại sau `if` khi khả năng được xem là thực tế."],
    ["phân biệt loại 2 đặt xa thực tế", "If it rained tomorrow, we'd stay home.", "If it rains tomorrow, we'd stayed home.", "If I won the prize, I would share it.", "Loại 2 dùng quá khứ và `would` để tạo khoảng cách."],
    ["phủ định kết quả giả định", "If we moved, I wouldn't miss the noise.", "If we would move, I didn't miss the noise.", "If he studied more, he would not feel lost.", "Phủ định đặt ở `would not + V`."],
  ]),
  "b1-zero-first-second-conditionals": b1PracticeSet("b1zfs", "điều kiện loại 0, 1 và 2", [
    ["quy luật băng tan", "If you heat ice, it melts.", "If you will heat ice, it would melt.", "If water reaches 100°C, it boils.", "Loại 0 dùng hiện tại ở cả hai vế."],
    ["thói quen mất ngủ vì cà phê", "If I drink coffee late, I can't sleep.", "If I drank coffee late, I won't sleep every time.", "If Nam skips breakfast, he feels hungry.", "Kết quả lặp lại dùng loại 0."],
    ["khả năng mưa ngày mai", "If it rains tomorrow, we'll cancel the picnic.", "If it will rain tomorrow, we cancel every picnic.", "If the road is clear, we will leave early.", "Loại 1 dùng hiện tại sau `if` và tương lai ở kết quả."],
    ["điều kiện tương lai dẫn tới khả năng", "If you finish early, you can go home.", "If you will finish early, you can went home.", "If Mai calls, you may tell her.", "Kết quả loại 1 có thể dùng modal."],
    ["điều kiện tương lai dẫn tới mệnh lệnh", "If Lan calls, tell her I'm busy.", "If Lan will call, told her I'm busy.", "If you see smoke, press this button.", "Mệnh đề kết quả loại 1 có thể là mệnh lệnh."],
    ["hiện tại trái thực tế về khu vườn", "If I had a garden, I would grow vegetables.", "If I have a garden, I would grew vegetables.", "If we lived by the sea, we would swim daily.", "Loại 2 dùng quá khứ để nói hiện tại giả định."],
    ["tình huống rất khó xảy ra", "If the sun disappeared, life would be impossible.", "If the sun disappears, life would been impossible.", "If gravity stopped, everything would float.", "Loại 2 phù hợp với giả định xa thực tế."],
    ["cùng hành động làm việc ở nhà như thói quen", "If I work from home, I save time.", "If I worked from home, I save time every usual day.", "If she cycles to work, she gets exercise.", "Loại 0 nói kết quả thường lặp lại."],
    ["làm việc ở nhà vào ngày mai", "If I work from home tomorrow, I'll save time.", "If I will work from home tomorrow, I'll save time.", "If she takes the early train, she will arrive by nine.", "Khả năng tương lai thực tế cần loại 1."],
    ["tưởng tượng được làm việc ở nhà", "If I worked from home, I'd save time.", "If I would work from home, I'd saved time.", "If he spoke French, he could apply.", "Loại 2 trình bày hoàn cảnh khác hiện tại."],
    ["dùng `when` cho kết quả chắc chắn lặp lại", "When I drink coffee late, I can't sleep.", "When I will drink coffee late, I can't sleep.", "When this button is pressed, the light turns on.", "Trong loại 0, `when` có thể thay `if` khi kết quả đều đặn."],
    ["chọn loại theo góc nhìn khả năng", "If I win, I'll celebrate.", "If I won, I would celebrate.", "If Mai gets the job, she will move.", "Loại 1 cho thấy người nói xem khả năng là thực tế."],
  ]),
  "b1-unless-provided-as-long-as": b1PracticeSet("b1upa", "unless, provided và as long as", [
    ["nói nếu không nhanh sẽ lỡ xe", "Unless you hurry, you'll miss the bus.", "Unless you don't hurry, you'll miss the bus.", "Unless we leave now, we'll be late.", "`Unless` đã chứa nghĩa phủ định."],
    ["đổi `unless` thành `if...not`", "If you don't hurry, you'll miss the bus.", "If you hurry, you'll miss the bus.", "If the weather does not improve, we will stay.", "`Unless` tương đương `if + phủ định` trong ngữ cảnh ngoại lệ."],
    ["nói sẽ đi trừ khi trời mưa", "I'll walk unless it rains.", "I'll walk unless it will rain.", "We will eat outside unless it gets cold.", "Điều kiện tương lai sau `unless` dùng hiện tại đơn."],
    ["cho mượn xe với điều kiện lái cẩn thận", "You can borrow the car provided that you drive carefully.", "You can borrow the car provided that you will drove carefully.", "You may enter provided you show your pass.", "`Provided (that)` mở điều kiện phải được đáp ứng."],
    ["dùng `providing` không có `that`", "We'll finish today, providing everyone helps.", "We'll finish today, providing everyone will helps.", "You can stay, providing you follow the rules.", "Có thể lược `that` và dùng hiện tại đơn."],
    ["cho phép ở lại miễn giữ phòng gọn", "You can stay as long as you keep the room tidy.", "You can stay as long as you will kept the room tidy.", "I'll help as long as you tell me the truth.", "`As long as` nêu điều kiện được duy trì."],
    ["phân biệt `as long as` chỉ thời gian", "You can stay as long as you like.", "You can stay provided how long you like.", "Wait here as long as necessary.", "Trong ngữ cảnh này cụm nói độ dài thời gian."],
    ["không dùng `unless` cho `if` nghĩa liệu", "I don't know if Lan is coming.", "I don't know unless Lan is coming.", "We asked whether the shop was open.", "`Unless` chỉ điều kiện, không mở mệnh đề “liệu”."],
    ["điều kiện bắt buộc để được tham gia", "You may join provided that you register first.", "You may join provided that you will registered first.", "We will agree as long as costs remain low.", "Hiện tại đơn diễn tả điều kiện tương lai."],
    ["không dùng phủ định kép không chủ ý", "Unless Mai calls, we will leave.", "Unless Mai doesn't call, we will leave.", "Unless the alarm stops, stay outside.", "Thêm `not` sau `unless` sẽ đổi hoặc làm rối nghĩa."],
    ["nêu ngoại lệ duy nhất", "The event will continue unless the weather becomes dangerous.", "The event will continue unless the weather will become dangerous.", "I will come unless something unexpected happens.", "`Unless` giới thiệu ngoại lệ ngăn kết quả."],
    ["nhấn điều kiện chính thức", "Access is allowed provided that users show identification.", "Access is allowed provided users will showed identification.", "The offer stands provided payment arrives today.", "`Provided` phù hợp với điều kiện rõ trong quy định."],
  ]),
  "b1-in-case-vs-if": b1PracticeSet("b1ici", "in case và if", [
    ["mang ô trước để phòng mưa", "I'll take an umbrella in case it rains.", "I'll take an umbrella if it rains.", "Take a jacket in case it gets cold.", "`In case` giải thích biện pháp chuẩn bị làm trước."],
    ["chỉ lấy ô khi mưa xảy ra", "I'll take an umbrella if it rains.", "I'll take an umbrella in case it rains.", "We will move inside if it gets cold.", "`If` làm hành động phụ thuộc điều kiện."],
    ["mang nước phòng khi khát", "Take some water in case you get thirsty.", "Take some water in case you will get thirsty.", "Pack a snack in case you feel hungry.", "Sau `in case` tương lai dùng hiện tại đơn."],
    ["gọi khi thật sự cần giúp", "Call me if you need help.", "Call me in case you need help.", "Press this button if the printer stops.", "Hành động gọi chỉ xảy ra khi điều kiện thành sự thật."],
    ["đưa số trước để người kia có sẵn", "I'll give you my number in case you need help.", "I'll give you my number if you need help later but not now.", "Save this address in case you need it later.", "Hành động chính là sự chuẩn bị trước khả năng."],
    ["chuẩn bị trong quá khứ", "I took a jacket in case it got cold.", "I took a jacket in case it will get cold.", "She saved a copy in case the computer crashed.", "Điểm nhìn quá khứ dùng `got/crashed`."],
    ["hướng dẫn trong trường hợp cháy", "In case of fire, use the stairs.", "In case of it burns, use the stairs.", "In case of emergency, call this number.", "`In case of` đi với danh từ."],
    ["không ghép hai từ nối", "Take cash in case the machine is broken.", "Take cash in case if the machine is broken.", "Use cash if the machine is broken.", "Chọn `in case` hoặc `if`, không dùng `in case if`."],
    ["phân biệt chuẩn bị với phản ứng", "Leave early in case there is traffic.", "Leave early if there is traffic after you are already late.", "Bring a torch in case it gets dark.", "Đi sớm là biện pháp phòng ngừa trước khả năng tắc đường."],
    ["hành động sau khi điều kiện xảy ra", "If the alarm rings, leave the building.", "In case the alarm rings, leave the building.", "If the screen freezes, restart the app.", "`If` đưa ra phản ứng khi điều kiện xảy ra."],
    ["dùng `in case` với mệnh đề", "Take notes in case you forget the details.", "Take notes in case of you forget the details.", "Keep the receipt in case you need a refund.", "`In case` trực tiếp đi với chủ ngữ và động từ."],
    ["dùng `in case of` với danh từ", "In case of delay, contact the office.", "In case delay, contact the office.", "In case of power failure, use the backup system.", "Sau `of` là một cụm danh từ."],
  ]),
  "b1-wish-if-only-present": b1PracticeSet("b1wio", "wish/if only cho hiện tại không như ý", [
    ["ước hiện tại có thêm thời gian", "I wish I had more time.", "I wish I have more time now.", "Lan wishes she lived nearer work.", "`Wish + past` tạo khoảng cách với thực tế hiện tại."],
    ["ước biết câu trả lời", "Lan wishes she knew the answer.", "Lan wishes she knows the answer.", "I wish I understood this rule.", "Trạng thái hiện tại trái mong muốn dùng quá khứ đơn."],
    ["ước căn phòng rộng hơn", "We wish the room were bigger.", "We wish the room will be bigger now.", "I wish this chair were more comfortable.", "`Were` dùng được cho chủ ngữ số ít trong giả định."],
    ["mong ước mạnh bằng `if only`", "If only I had more time!", "If only I have more time now!", "If only the weather were warmer!", "`If only + past` thể hiện mong ước mạnh về hiện tại."],
    ["ước có khả năng bơi", "I wish I could swim.", "I wish I can swim.", "We wish we could stay longer.", "`Could` nói khả năng hiện tại chưa có."],
    ["mong hàng xóm chịu thay đổi hành vi", "I wish the neighbours would turn the music down.", "I wish the neighbours will turn the music down.", "She wishes her brother would listen.", "`Would` sau `wish` thể hiện mong người khác chịu thay đổi; không dùng `will` trong mẫu này."],
    ["mong thời tiết thay đổi", "I wish it would stop raining.", "I wish it stops raining now.", "If only the wind would die down.", "`Would` phù hợp với sự thay đổi mong muốn."],
    ["nói hy vọng tương lai thực tế", "I hope Lan comes tomorrow.", "I wish Lan comes tomorrow.", "We hope the weather improves.", "`Hope` dùng cho khả năng tương lai được xem là thực tế."],
    ["nói Lan hiện không ở đây", "I wish Lan were here now.", "I hope Lan were here now.", "If only Minh were with us.", "`Wish + were` nói tình trạng hiện tại trái thực tế."],
    ["không dùng `would` cho kiến thức của chính mình", "I wish I knew the answer.", "I wish I would know the answer.", "I wish I could remember his name.", "Trạng thái riêng dùng quá khứ hoặc `could`, không thường dùng `would`."],
    ["phân biệt phạm vi B1 với tiếc nuối quá khứ", "I wish I had more time now.", "I wish I have more time now.", "I wish I lived closer to my parents.", "Sau `wish`, bài này dùng quá khứ đơn để nói về một thực tế hiện tại mà người nói muốn thay đổi."],
    ["dùng `was` như biến thể giao tiếp nhưng ưu tiên `were`", "I wish I were taller.", "I wish I am taller.", "She wishes she were at home.", "`Were` là lựa chọn chuẩn cẩn thận trong giả định."],
  ]),
};

const b1Chapter24DepthExerciseData: Partial<Record<string, Exercise[]>> = {
  "b1-zero-first-second-conditionals": b1DepthPack("b1zfx", "ba loại câu điều kiện", [
    { cue: "Quy luật chung khi nước đạt 100°C.", options: ["If water reaches 100°C, it boils.", "If water reached 100°C, it would boil."], answer: "If water reaches 100°C, it boils.", completed: "If water reaches 100°C, it boils." },
    { cue: "Kế hoạch thực tế nếu Mai gọi tối nay.", options: ["If Mai calls tonight, I'll answer.", "If Mai called tonight, I'd answer."], answer: "If Mai calls tonight, I'll answer.", completed: "If Mai calls tonight, I'll answer." },
    { cue: "Giả định hiện tại vì người nói không có ô tô.", options: ["If I had a car, I would drive to work.", "If I have a car, I will drive to work."], answer: "If I had a car, I would drive to work.", completed: "If I had a car, I would drive to work." },
  ], [
    ["Sắp xếp câu loại 0 nói kết quả lặp lại mỗi khi thức khuya.", "If I stay up late, I feel tired the next day.", "Hai vế hiện tại đơn nói quan hệ thường lặp."],
    ["Sắp xếp câu loại 1 nêu khả năng cuối tuần này.", "If the weather is good, we will go hiking.", "Hiện tại sau `if` kết hợp `will` ở kết quả."],
    ["Sắp xếp câu loại 2 tưởng tượng mình biết câu trả lời.", "If I knew the answer, I would tell you.", "Quá khứ đơn tạo khoảng cách với thực tế hiện tại."],
  ]),
};

export const b1Chapter24ExerciseData = mergeExerciseRecords(
  b1Chapter24BaseExerciseData,
  b1Chapter24DepthExerciseData,
);
