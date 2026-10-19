/* Luyện tập B1 — Chương 26: Câu tường thuật. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";
import { b1DepthPack } from "../../b1-depth-builders.ts";

const b1Chapter26BaseExerciseData: Record<string, Exercise[]> = {
  "b1-reported-statements-backshift": b1PracticeSet("b1rsb", "câu kể tường thuật và lùi thì", [
    ["tường thuật lời có `am/is` + tính từ bằng `was` sau `said`", "Lan said that she was tired.", "Lan said that she tired.", "Minh said that he was busy.", "Hiện tại đơn của `be` lùi thành `was` và vẫn hòa hợp với chủ ngữ mới."],
    ["tường thuật lời có động từ thường ở hiện tại đơn khẳng định sau `said`", "Mai said that she lived in Hue.", "Mai said that she live in Hue.", "Nam said that he worked from home.", "Động từ thường ở hiện tại đơn lùi thành quá khứ đơn khi kể lại sau `said`."],
    ["tường thuật lời ở hiện tại tiếp diễn sau `said`", "They said that they were waiting.", "They said that they was waiting.", "Lan said that she was studying.", "Hiện tại tiếp diễn lùi thành quá khứ tiếp diễn: `was/were + V-ing`, với `be` hòa hợp theo chủ ngữ."],
    ["tường thuật `have lost` bằng `had lost` sau `said`", "Nam said that he had lost his key.", "Nam said that he had lose his key.", "Mai said that she had lost her phone.", "Hiện tại hoàn thành `have lost` lùi thành quá khứ hoàn thành `had lost`."],
    ["tường thuật `saw` bằng `had seen` sau `said`", "Lan said that she had seen Minh.", "Lan said that she had saw Minh.", "He said that he had seen a snake in the garden.", "Quá khứ đơn `saw` lùi thành quá khứ hoàn thành `had seen`; quá khứ phân từ của `see` là `seen`."],
    ["tường thuật `will` bằng `would` sau `said`", "Lan said that she would call.", "Lan said that she would called.", "They said that they would return.", "`Will` lùi thành `would`, và sau `would` vẫn là động từ nguyên thể."],
    ["tường thuật `can` bằng `could` sau `said`", "He said that he could swim.", "He said that he could swam.", "Mai said that she could help.", "`Can` lùi thành `could`, theo sau là động từ nguyên thể."],
    ["tường thuật `may` bằng `might` sau `said`", "They said that it might rain.", "They said that it might rained.", "The guide said that the road might close.", "`May` lùi thành `might`, theo sau là động từ nguyên thể."],
    ["giữ nguyên `had already eaten` vì quá khứ hoàn thành không lùi thêm", "She said that she had already eaten.", "She said that she had already ate.", "Nam said that he had already eaten lunch.", "Lời gốc đã ở quá khứ hoàn thành (`had already eaten`), nên khi tường thuật giữ nguyên, không lùi thêm."],
    ["tường thuật một câu phủ định sau `said`", "He said that he didn't understand.", "He said that he didn't understood.", "They said that they couldn't stay.", "Giữ phủ định và lùi trợ động từ: `don't` thành `didn't`, `can't` thành `couldn't`."],
    ["giữ hiện tại đơn khi tường thuật một sự thật chung vẫn đúng", "The teacher said that water boils at 100°C.", "The teacher said that water boiled at 100°C.", "The guide said that the Earth moves around the Sun.", "Khi muốn trình bày nội dung như một sự thật chung vẫn đúng, có thể giữ hiện tại đơn sau `said`."],
    ["dùng `told` và nêu người nghe", "Lan told me that she was tired.", "Lan told that she was tired.", "Mai told us that the train was late.", "`Tell` trong mẫu này cần người nghe ngay sau nó, như `told me` hay `told us`."],
  ]),
  "b1-reported-reference-shifts": b1PracticeSet("b1rrs", "đổi đại từ, thời gian và nơi chốn", [
    ["đổi `now` khi kể lại vào một lúc khác", "Lan said that she was busy at that time.", "Lan said that she was busy now.", "Nam said that he was living in Hanoi at that time.", "Khi kể lại vào lúc khác, `now` của người nói gốc không còn là “bây giờ” của người kể, nên thường đổi thành `at that time` hoặc `then`."],
    ["đổi `you` trong lời gốc thành đúng người đã nghe", "Lan said that she would send me her notes.", "Lan said that she would send you her notes.", "Mai told Nam that she would help him.", "`You` trong lời gốc phải đổi thành đúng người đã nghe: `me` nếu đó là người kể, `him/her` nếu là người khác."],
    ["đổi `yesterday` khi kể lại vào một ngày sau đó", "Nam said that he had seen Lan the day before.", "Nam said that he had seen Lan yesterday.", "Mai said she had called the previous day.", "Mốc `yesterday` được tính lại từ ngày của lời nói gốc, nên thường đổi thành `the day before` hoặc `the previous day`."],
    ["đổi `tomorrow` khi kể lại sau ngày nói", "They said that they would meet the next day.", "They said that they would meet tomorrow.", "Lan said she would visit her aunt the following day.", "`The next day/the following day` giữ đúng quan hệ với ngày của lời nói gốc."],
    ["đổi `here` khi kể lại ở một nơi khác", "They said that they would meet there.", "They said that they would meet here.", "Mai said she had left her bag there.", "Khi người kể ở nơi khác, `here` của lời gốc thường đổi thành `there`."],
    ["đổi `this/these` khi người kể không còn ở gần vật được nói tới", "Mai said that she liked that room.", "Mai said that she liked this room.", "Nam said that those files were important.", "Từ chỉ định đổi theo vị trí người kể: vật không còn ở gần thì `this/these` thành `that/those`."],
    ["giữ `today` khi kể lại ngay trong cùng ngày", "Lan said she'll finish today.", "Lan said she'd finish that day.", "Minh said he is working here today.", "Khi vẫn trong cùng ngày, `today` của lời gốc vẫn đúng với người kể nên không cần đổi."],
    ["giữ `this` khi người kể vẫn đứng cạnh vật được nói tới", "Mai said that she liked this room.", "Mai said that she liked that room.", "Lan said this chair was comfortable.", "Khi người kể vẫn ở cạnh vật được nói tới, `this` vẫn đúng nên có thể giữ."],
    ["đổi đại từ phản thân theo người đã làm việc đó", "The children said they had repaired their bikes themselves.", "The children said they had repaired their bikes ourselves.", "Lan said she had made the cake herself.", "Đại từ phản thân phải đổi theo chủ thể mới, như `themselves` cho nhóm trẻ hay `herself` cho Lan."],
    ["nêu lại tên người sở hữu để tránh hiểu nhầm `her/his` chỉ ai", "Lan told Mai that Lan's bag was missing.", "Lan told Mai that her bag was missing.", "Nam told Minh that Nam's bike was broken.", "Khi `her/his` có thể chỉ cả hai người, nêu lại tên người sở hữu giúp câu rõ nghĩa."],
    ["dùng `come` vì người kể đang ở đúng nơi người kia sẽ tới", "Lan said she would come to the hotel.", "Lan said she would go to the hotel.", "Mai said she would come to the library.", "`Come` hướng tới vị trí của người kể, nên hợp khi người kể đang ở nơi được nói tới."],
    ["dùng `go` vì người kể không ở nơi người kia sẽ tới", "Lan said she would go to the hotel.", "Lan said she would come to the hotel.", "They said they would go back to the station.", "`Go` diễn tả chuyển động rời xa vị trí của người kể, nên hợp khi người kể không ở nơi được nói tới."],
  ]),
  "b1-reported-questions": b1PracticeSet("b1req", "câu hỏi tường thuật", [
    ["tường thuật bằng `asked` một câu hỏi Wh- có `do/does`, bỏ trợ động từ này và lùi thì", "Lan asked where Minh lived.", "Lan asked where did Minh live.", "Nam asked what time the shop opened.", "Câu hỏi tường thuật bỏ `do/does`, đặt chủ ngữ trước động từ và lùi hiện tại đơn về quá khứ đơn."],
    ["tường thuật câu hỏi Wh- có `be`, đặt chủ ngữ trước `was/were`", "The teacher asked why Nam was late.", "The teacher asked why was Nam late.", "Lan asked why the shop was closed.", "Trong câu hỏi tường thuật, chủ ngữ đứng trước `was/were`, không đảo như câu hỏi trực tiếp."],
    ["tường thuật câu hỏi Wh- có `will`, chuyển thành `would` sau chủ ngữ", "She asked when the train would arrive.", "She asked when would the train arrive.", "Mai asked how long the trip would take.", "`Will` lùi thành `would` và đứng sau chủ ngữ trong câu hỏi tường thuật."],
    ["tường thuật câu hỏi Wh- ở quá khứ đơn bằng quá khứ hoàn thành", "He asked what Lan had bought.", "He asked what did Lan buy.", "Mai asked where Nam had gone.", "Bỏ `did`, đặt chủ ngữ lên trước và lùi quá khứ đơn thành quá khứ hoàn thành."],
    ["tường thuật câu hỏi yes/no có `be` bằng `if` hoặc `whether`", "She asked if the room was ready.", "She asked was the room ready.", "They asked whether the museum was open.", "Câu hỏi yes/no được tường thuật bằng `if/whether`, rồi giữ trật tự câu kể."],
    ["tường thuật câu hỏi yes/no có `can`, chuyển thành `could`", "I wondered if Minh could drive.", "I wondered could Minh drive.", "Lan asked whether Nam could swim.", "`Can` lùi thành `could` và đứng sau chủ ngữ trong mệnh đề `if/whether`."],
    ["tường thuật câu hỏi mà `who` hoặc `what` làm chủ ngữ", "The officer asked who owned the car.", "The officer asked who did own the car.", "They asked what made the noise.", "Khi `who/what` làm chủ ngữ, nó đứng ngay trước động từ đã lùi thì; không thêm `did`."],
    ["đổi `you` và `me` của câu hỏi gốc theo đúng người hỏi và người được hỏi", "Mai asked if I would meet her.", "Mai asked if you would meet me.", "Nam asked if we would visit him.", "Đại từ phải chỉ đúng người: khi người kể chính là người được hỏi, `you` thành `I/we`, còn `me` chỉ người hỏi thành `her/him`."],
    ["đổi `here` và `tomorrow` khi kể lại ở nơi khác vài ngày sau đó", "Nam asked if the bus would leave from there the next day.", "Nam asked if the bus would leave from here tomorrow.", "Lan asked whether the meeting would be held there the following day.", "Khi nơi và ngày kể đã khác, `here` đổi thành `there`, còn `tomorrow` đổi thành `the next day` hoặc `the following day`."],
    ["dùng `wanted to know` để tường thuật một câu hỏi", "Nam wanted to know what time the film started.", "Nam wanted to know what time did the film start.", "They wanted to know how much the tickets cost.", "`Wanted to know` cũng giới thiệu câu hỏi tường thuật; mệnh đề theo sau vẫn dùng trật tự câu kể."],
    ["đặt dấu hỏi vì chính câu chính là một câu hỏi", "Did Lan ask whether Mai had called?", "Did Lan ask whether had Mai called?", "Do you know if the bus has left?", "Dấu hỏi thuộc câu chính; mệnh đề `if/whether` bên trong vẫn theo trật tự câu kể."],
    ["nêu người được hỏi ngay sau `ask` mà không thêm `to`", "Lan asked Nam if Mai liked the film.", "Lan asked to Nam if Mai liked the film.", "The teacher asked Lan if Minh knew the answer.", "`Ask` nhận người được hỏi trực tiếp ngay sau nó, không cần `to`."],
  ]),
  "b1-reported-commands-requests-advice": b1PracticeSet("b1rca", "mệnh lệnh, yêu cầu và lời khuyên tường thuật", [
    ["thuật lại lời bảo ai đó làm một việc bằng `tell`", "The teacher told us to close the door.", "The teacher told us close the door.", "The coach told the players to warm up.", "`Tell + người + to + V` thuật lại lời bảo ai đó làm một việc."],
    ["thuật lại một mệnh lệnh mạnh, chính thức bằng `order`", "The officer ordered everyone to leave.", "The officer ordered everyone leaving.", "The guard ordered us to stop.", "`Order + người + to + V` cho thấy mệnh lệnh mạnh và chính thức hơn `tell`."],
    ["thuật lại lời nhờ ai đó làm một việc bằng `ask`", "Lan asked me to wait there.", "Lan asked me that I wait there.", "Minh asked us to send the file.", "`Ask + người + to + V` thuật lại lời nhờ ai đó làm một việc."],
    ["thuật lại lời nhờ ai đó đừng làm một việc bằng `ask`", "She asked us not to be late.", "She asked us not be late.", "Lan asked me not to call after ten.", "Lời nhờ đừng làm gì dùng `ask + người + not to + V`, với `not` đứng trước `to`."],
    ["thuật lại một lời cảnh báo nguy hiểm bằng `warn`", "He warned me not to touch the wire.", "He warned me don't touch the wire.", "The guide warned us not to leave the path.", "`Warn + người + not to + V` thuật lại lời báo trước một nguy hiểm."],
    ["thuật lại lời khuyên nên làm một việc bằng `advise`", "The doctor advised me to rest.", "The doctor advised me resting.", "She advised us to book early.", "`Advise + người + to + V` thuật lại lời khuyên nên làm một việc."],
    ["thuật lại lời nhắc ai đó nhớ làm một việc", "Dad reminded me to lock the door.", "Dad remembered me to lock the door.", "Mai reminded us to bring our ID cards.", "`Remind + người + to + V` thuật lại lời nhắc ai nhớ làm một việc."],
    ["thuật lại một lời mời", "They invited us to stay for dinner.", "They invited us that we stay for dinner.", "Lan invited me to join the club.", "`Invite + người + to + V` thuật lại một lời mời."],
    ["thuật lại lời khuyến khích ai đó thử làm một việc", "Our teacher encouraged us to enter the competition.", "Our teacher encouraged us enter the competition.", "My parents encouraged me to learn the piano.", "`Encourage + người + to + V` thuật lại lời khuyến khích ai đó làm một việc."],
    ["thuật lại lời bảo ai đó đừng làm một việc bằng `tell`", "Lan told us not to open the window.", "Lan told us to don't open the window.", "Mum told me not to stay out late.", "Lời bảo đừng làm gì dùng `tell + người + not to + V`, với `not` đứng trước `to`."],
    ["thuật lại một câu hỏi xin thông tin bằng `ask`", "She asked me where I lived.", "She asked me to where I lived.", "They asked us whether we were ready.", "Sau `ask` + người, từ hỏi hoặc `if/whether` mở nội dung câu hỏi, không dùng `to`."],
    ["thuật lại lời khuyên đừng làm một việc bằng `advise`", "My dentist advised me not to eat so many sweets.", "My dentist advised me not eat so many sweets.", "The coach advised us not to train too hard.", "Lời khuyên đừng làm gì dùng `advise + người + not to + V`."],
  ]),
  "b1-say-tell-ask-no-backshift": b1PracticeSet("b1sta", "say, tell, ask và lựa chọn lùi thì", [
    ["dùng `say` trực tiếp với một lời ngắn, không kèm mệnh đề `that`", "Nam said goodbye and left.", "Nam told goodbye and left.", "She didn't say a word all evening.", "`Say` có thể đi thẳng với lời được nói ra như một lời chào hay một từ; người nghe không đứng ngay sau `say`."],
    ["dùng `told` và nêu người nghe trước mệnh đề `that`", "Mai told me that she needed help.", "Mai said me that she needed help.", "Nam told us that the office was closed.", "`Tell` cần người nghe đứng ngay sau nó, rồi mới tới mệnh đề `that`."],
    ["dùng `say` và nêu người nghe bằng `to`", "Minh said to the teacher that he felt ill.", "Minh said the teacher that he felt ill.", "Nam said to his boss that he needed a day off.", "Muốn nêu người nghe sau `say`, cần đặt `to` trước người đó."],
    ["dùng `asked` để thuật lại một câu hỏi xin thông tin", "She asked where I lived.", "She said where I lived.", "They asked if we were ready.", "`Ask` giới thiệu câu hỏi tường thuật, với từ hỏi hoặc `if/whether` theo sau."],
    ["dùng `asked` để thuật lại một lời nhờ làm việc gì", "She asked me to wait.", "She said me to wait.", "The officer asked us to show our tickets.", "`Ask + người + to + V` thuật lại một lời nhờ hoặc yêu cầu."],
    ["giữ hiện tại đơn cho một sự thật chung", "Our teacher said that the sun rises in the east.", "Our teacher said that the sun rose in the east.", "The doctor said that sleep is important for children.", "Khi nhấn mạnh nội dung vẫn là sự thật chung, có thể giữ hiện tại đơn sau `said`."],
    ["giữ hiện tại để nhấn rằng thông tin về nơi ở hay công việc vẫn còn đúng", "Lan said that she lives in Hue.", "Lan said that she lived in Hue.", "Minh said he works for a bank.", "Giữ hiện tại cho thấy người kể xác nhận thông tin ấy hiện vẫn đúng."],
    ["dùng dạng lùi thì trung tính khi kể về nơi ở hay công việc", "Lan said that she lived in Hue.", "Lan said that she lives in Hue.", "Nam said that he worked in a hotel.", "Dạng lùi thì chỉ là điểm nhìn quá khứ trung tính, không tự nói rằng thông tin nay đã thay đổi."],
    ["giữ thì hiện tại khi thuật lại ngay một tin vừa nghe", "Lan said she's on her way.", "Lan said she was on her way.", "Mai said she is waiting outside.", "Khi thuật lại ngay và thông tin vẫn còn hiện hành, người kể có thể giữ thì hiện tại."],
    ["dùng quá khứ hoàn thành để làm rõ việc xảy ra trước lúc người đó nói", "Nam said that he had lost his key before the meeting.", "Nam said that he lost his key before the meeting.", "Mai said that she had already finished the report.", "Quá khứ hoàn thành cho thấy rõ việc ấy xảy ra trước lúc người đó nói."],
    ["giữ nguyên `should` hoặc `might` khi tường thuật", "She said that I should rest.", "She said that I should to rest.", "He said that we might need help.", "`Should` và `might` thường giữ nguyên khi tường thuật, theo sau là động từ nguyên thể."],
    ["dùng `tell` trong cụm cố định như nói thật hay kể chuyện", "Lan always tells the truth.", "Lan always says the truth.", "Grandfather told us a story.", "`Tell the truth` và `tell a story` là cụm cố định đi với `tell`."],
  ]),
};

const b1Chapter26DepthExerciseData: Partial<Record<string, Exercise[]>> = {
  "b1-reported-reference-shifts": b1DepthPack("b1rrx", "điểm nhìn trong câu tường thuật", [
    { cue: "Kể vào hôm sau lời Nam nói `I saw Lan yesterday`.", options: ["Nam said he had seen Lan the day before.", "Nam said he had seen Lan yesterday."], answer: "Nam said he had seen Lan the day before.", completed: "Nam said he had seen Lan the day before." },
    { cue: "Người kể vẫn ở chính căn phòng được chỉ.", options: ["Mai said she liked this room.", "Mai said she liked that room."], answer: "Mai said she liked this room.", completed: "Mai said she liked this room." },
    { cue: "Nói rõ điện thoại là của Minh chứ không phải Nam.", options: ["Minh told Nam that Minh's phone was broken.", "Minh told Nam that his phone was broken."], answer: "Minh told Nam that Minh's phone was broken.", completed: "Minh told Nam that Minh's phone was broken." },
  ], [
    ["Sắp xếp câu đổi `tomorrow` thành mốc nhìn từ ngày kể sau đó.", "Lan said she would return the following day.", "Mốc thời gian đổi theo thời điểm tường thuật."],
  ]),
};

export const b1Chapter26ExerciseData = mergeExerciseRecords(
  b1Chapter26BaseExerciseData,
  b1Chapter26DepthExerciseData,
);
