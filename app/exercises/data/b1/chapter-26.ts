/* Luyện tập B1 — Chương 26: Câu tường thuật. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";
import { b1DepthPack } from "../../b1-depth-builders.ts";

const b1Chapter26BaseExerciseData: Record<string, Exercise[]> = {
  "b1-reported-statements-backshift": b1PracticeSet("b1rsb", "câu kể tường thuật và lùi thì", [
    ["lùi `I am tired` sau động từ tường thuật ở quá khứ", "Lan said that she was tired.", "Lan said that she were tired.", "Minh said that he was busy.", "Hiện tại đơn với `be` thường lùi về quá khứ đơn và phải hòa hợp với chủ ngữ."],
    ["lùi hiện tại đơn sau động từ tường thuật ở quá khứ", "Mai said that she lived in Hue.", "Mai said that she live in Hue.", "Nam said that he worked from home.", "Động từ hiện tại đơn thường lùi về quá khứ đơn."],
    ["lùi hiện tại tiếp diễn sau động từ tường thuật ở quá khứ", "They said that they were waiting.", "They said that they was waiting.", "Lan said that she was studying.", "Hiện tại tiếp diễn thường lùi về quá khứ tiếp diễn."],
    ["lùi hiện tại hoàn thành sau động từ tường thuật ở quá khứ", "Nam said that he had lost his key.", "Nam said that he had lose his key.", "Mai said that she had finished.", "Hiện tại hoàn thành thường lùi về quá khứ hoàn thành: `had + past participle`."],
    ["lùi quá khứ đơn để làm rõ việc nhìn thấy xảy ra trước lời nói", "Lan said that she had seen Minh.", "Lan said that she had saw Minh.", "He said that he had left early.", "Khi lùi quá khứ đơn, dùng `had + past participle`; quá khứ phân từ của `see` là `seen`."],
    ["tường thuật `will`", "Lan said that she would call.", "Lan said that she will called.", "They said that they would return.", "`Will` thường lùi thành `would`."],
    ["tường thuật `can`", "He said that he could swim.", "He said that he can swam.", "Mai said that she could help.", "`Can` thường lùi thành `could`."],
    ["tường thuật `may`", "They said that it might rain.", "They said that it may rained.", "The guide said that the road might close.", "`May` thường lùi thành `might`."],
    ["giữ quá khứ hoàn thành", "She said that she had already eaten.", "She said that she had had already ate.", "He said that he had never flown.", "Quá khứ hoàn thành thường không lùi thêm."],
    ["phủ định được lùi", "He said that he didn't understand.", "He said that he doesn't understood.", "They said that they couldn't stay.", "Giữ phủ định và lùi trợ động từ phù hợp."],
    ["giữ hiện tại đơn cho sự thật chung vẫn đúng", "The teacher said that water boils at 100°C.", "The teacher said that water boiled at 100°C.", "The guide said that the Earth moves around the Sun.", "Khi muốn trình bày nội dung là sự thật chung vẫn đúng, có thể giữ hiện tại đơn."],
    ["dùng `tell` kèm người nghe", "Lan told me that she was tired.", "Lan told that she was tired.", "Mai told us that the train was late.", "`Tell` trong mẫu này cần người nhận."],
  ]),
  "b1-reported-reference-shifts": b1PracticeSet("b1rrs", "đổi đại từ, thời gian và nơi chốn", [
    ["Lan kể về chính mình", "Lan said that she would send the notes.", "Lan said that I would send the notes.", "Mai said that she had finished her work.", "Đại từ phải chỉ đúng người nói ban đầu."],
    ["Minh kể lời Lan nói với mình", "Lan said that she would send me her notes.", "Lan said that I would send her my notes.", "Mai told Nam that she would help him.", "Đổi người nói, người nghe và sở hữu theo vai trò."],
    ["đổi `yesterday` khi kể vào một ngày sau đó", "Nam said that he had seen Lan the day before.", "Nam said that he had seen Lan yesterday.", "Mai said she had called the previous day.", "Mốc quá khứ được tính từ thời điểm lời nói gốc."],
    ["đổi `tomorrow` khi kể sau ngày nói", "They said that they would meet the next day.", "They said that they would meet tomorrow.", "Lan said she would return the following day.", "`The next/following day` giữ quan hệ với mốc nói."],
    ["đổi `here` khi kể ở nơi khác", "They said that they would meet there.", "They said that they would meet here.", "Mai said she had left her bag there.", "Nơi kể khác khiến `here` thường đổi thành `there`."],
    ["đổi `this` khi vật không còn ở điểm chỉ", "Mai said that she liked that room.", "Mai said that she liked this room.", "Nam said that those files were important.", "Từ chỉ định đổi theo khoảng cách và điểm nhìn."],
    ["giữ `today` khi vẫn tường thuật trong cùng ngày", "Lan said she'll finish today.", "Lan said she'd finish that day.", "Minh said he is working here today.", "Không cần đổi nếu mốc hiện tại vẫn trùng lời nói gốc."],
    ["giữ `this room` khi vẫn đứng tại đó", "Mai said that she liked this room.", "Mai said that she liked that room.", "Lan said this chair was comfortable.", "Từ chỉ nơi/vật có thể giữ khi điểm nhìn không đổi."],
    ["đổi đại từ phản thân theo nhóm trẻ", "The children said they had repaired their bikes themselves.", "The children said we had repaired our bikes ourselves.", "Lan said she had made the cake herself.", "Đại từ phản thân phải theo chủ thể mới."],
    ["nói rõ chiếc túi thuộc về Lan chứ không phải Mai", "Lan told Mai that Lan's bag was missing.", "Lan told Mai that her bag was missing.", "Minh told Nam that Minh's phone was broken.", "Lặp tên khi `her/his` có thể chỉ hai người."],
    ["chọn `come` vì người kể đang ở văn phòng đích", "Lan said she would come to my office.", "Lan said she would go to my office.", "Mai said she would come to our house.", "`Come` hướng tới vị trí tham chiếu của người nói/nghe."],
    ["chọn `go` vì cả người kể lẫn Lan đều không ở văn phòng đích", "Lan said she would go to my office.", "Lan said she would come to my office.", "They said they would go back to the hotel.", "`Go` phù hợp khi chuyển động rời điểm nhìn hiện tại."],
  ]),
  "b1-reported-questions": b1PracticeSet("b1req", "câu hỏi tường thuật", [
    ["tường thuật câu hỏi nơi Minh sống", "Lan asked where Minh lived.", "Lan asked where did Minh live.", "Mai asked where the station was.", "Phần nội dung dùng trật tự câu kể."],
    ["tường thuật câu hỏi vì sao người nghe muộn", "The teacher asked me why I was late.", "The teacher asked me why was I late.", "Lan asked us why we had left.", "Chủ ngữ đứng trước `be` trong câu hỏi tường thuật."],
    ["tường thuật câu hỏi thời gian tương lai", "She asked when the train would arrive.", "She asked when would the train arrive.", "He asked when the shop would open.", "`Would` đứng sau chủ ngữ."],
    ["tường thuật câu hỏi quá khứ", "He asked what Lan had bought.", "He asked what did Lan buy.", "Mai asked where Nam had gone.", "Bỏ `did` và dùng quá khứ hoàn thành khi lùi thì."],
    ["tường thuật câu hỏi yes/no", "She asked if I was ready.", "She asked was I ready.", "They asked whether the room was free.", "Thêm `if/whether` và giữ trật tự câu kể."],
    ["tường thuật câu hỏi khả năng", "I wondered if Minh could drive.", "I wondered could Minh drive.", "Lan asked whether I could help.", "Modal đứng sau chủ ngữ trong mệnh đề."],
    ["tường thuật câu hỏi chủ ngữ", "Lan asked who had called me.", "Lan asked who did call me.", "They asked what had caused the delay.", "`Who/what` làm chủ ngữ không cần `did`."],
    ["đổi đại từ trong câu hỏi", "Mai asked me if I would meet her.", "Mai asked me if you would meet me.", "Lan asked Nam whether he could help her.", "Đại từ phải theo người hỏi và người được hỏi."],
    ["kể ở một nơi khác vào ngày hôm sau câu hỏi `Will you meet me here tomorrow?`", "Mai asked if I would meet her there the next day.", "Mai asked if I would meet her here tomorrow.", "Nam asked whether we had been there the day before.", "Khi nơi và ngày kể đã đổi, `here` đổi thành `there`, còn `tomorrow` đổi thành `the next day`."],
    ["dấu chấm cho câu kể tường thuật", "Lan asked where Minh lived.", "Lan asked where Minh lived?", "Mai wondered whether the bus was late.", "Câu chính là câu kể nên kết thúc bằng dấu chấm."],
    ["dấu hỏi khi câu chính là câu hỏi", "Did Lan ask where Minh lived?", "Did Lan ask where did Minh live?", "Do you remember whether Mai called?", "Dấu hỏi thuộc câu chính; mệnh đề trong vẫn không đảo."],
    ["nêu người được hỏi sau `ask`", "Lan asked me where I lived.", "Lan asked to me where I lived.", "The officer asked us why we were there.", "`Ask` nhận người trực tiếp, không có `to`."],
  ]),
  "b1-reported-commands-requests-advice": b1PracticeSet("b1rca", "mệnh lệnh, yêu cầu và lời khuyên tường thuật", [
    ["thuật lại chỉ dẫn đóng cửa", "The teacher told us to close the door.", "The teacher told us close the door.", "My manager told me to check the figures.", "`Tell + người + to + V` thuật lại chỉ dẫn."],
    ["thuật lại mệnh lệnh mạnh", "The officer ordered everyone to leave.", "The officer ordered everyone leave.", "The guard ordered us to stop.", "`Order + người + to + V` nói mệnh lệnh."],
    ["thuật lại yêu cầu đợi", "Lan asked me to wait there.", "Lan asked me that I wait there.", "Minh asked us to send the file.", "`Ask + người + to + V` thuật lại yêu cầu."],
    ["thuật lại yêu cầu phủ định", "She asked us not to be late.", "She asked us to not being late.", "Lan asked me not to call after ten.", "Đặt `not` trước `to`."],
    ["thuật lại cảnh báo", "He warned me not to touch the wire.", "He warned me to not touching the wire.", "The guide warned us not to leave the path.", "`Warn + người + not to + V` nói cảnh báo."],
    ["thuật lại lời khuyên bác sĩ", "The doctor advised me to rest.", "The doctor advised that me to rest.", "She advised us to book early.", "`Advise + người + to + V` thuật lại lời khuyên."],
    ["thuật lại lời nhắc", "Dad reminded me to lock the door.", "Dad remembered me to lock the door.", "Mai reminded us to bring identification.", "`Remind someone to do` là nhắc ai làm."],
    ["thuật lại lời mời", "They invited us to stay for dinner.", "They invited that we stay for dinner.", "Lan invited me to join the club.", "`Invite + người + to + V` thuật lại lời mời."],
    ["chọn `ask` cho lời nhờ lịch sự", "He asked me to send the file.", "He ordered me to send the file.", "Mai asked us to speak quietly.", "Mục đích giao tiếp quyết định động từ tường thuật."],
    ["chọn `tell` cho chỉ dẫn", "My manager told me to check the figures.", "My manager asked what the figures to check.", "The teacher told the class to open their books.", "`Tell` phù hợp với chỉ dẫn trực tiếp."],
    ["phân biệt hỏi thông tin", "She asked me where I lived.", "She asked me to where I lived.", "They asked us whether we were ready.", "Sau `ask` + từ hỏi là nội dung câu hỏi."],
    ["phân biệt yêu cầu hành động", "She asked me to wait.", "She asked me if wait.", "The receptionist asked us to sit down.", "Sau `ask + người + to` là hành động được yêu cầu."],
  ]),
  "b1-say-tell-ask-no-backshift": b1PracticeSet("b1sta", "say, tell, ask và lựa chọn lùi thì", [
    ["nêu lời nói không nêu người nghe", "Lan said that she was tired.", "Lan told that she was tired.", "Mai said she needed help.", "`Say` đi trực tiếp với mệnh đề."],
    ["nêu người nghe", "Lan told me that she was tired.", "Lan said me that she was tired.", "Nam told us that the office was closed.", "`Tell` cần người nhận trực tiếp."],
    ["dùng `say` với người nghe", "Lan said to me that she was tired.", "Lan said me that she was tired.", "Mai said hello to us.", "Sau `say`, người nghe cần `to`."],
    ["dùng đúng động từ tường thuật cho câu hỏi thông tin", "She asked where I lived.", "She said me where I lived.", "They asked if we were ready.", "`Ask` giới thiệu câu hỏi; `say` không nhận trực tiếp người nghe theo mẫu `say someone`."],
    ["yêu cầu hành động", "She asked me to wait.", "She told to me wait.", "The officer asked us to show our tickets.", "`Ask + người + to + V` nói yêu cầu."],
    ["giữ hiện tại cho sự thật chung vẫn đúng", "The teacher said that water boils at 100°C.", "The teacher said that water boiled at 100°C.", "The guide said the Earth moves around the Sun.", "Khi nhấn mạnh nội dung vẫn là sự thật chung, có thể giữ hiện tại đơn."],
    ["giữ hiện tại để nhấn thông tin vẫn đúng", "Lan said that she lives in Hue.", "Lan said that she lived in Hue.", "Minh said he works for a bank.", "Giữ hiện tại nhấn thông tin vẫn đúng."],
    ["dùng dạng lùi trung tính mà không khẳng định hiện tại đã đổi", "Lan said that she lived in Hue.", "Lan said that she lives in Hue.", "Nam said that he was busy.", "Dạng lùi là điểm nhìn quá khứ, không tự nói hiện tại đã đổi."],
    ["thuật lại ngay thông tin vẫn đang đúng", "Lan said she's on her way.", "Lan said she had been on her way.", "Mai said she is waiting outside.", "Khi thuật lại ngay và thông tin vẫn còn hiện hành, người nói có thể giữ thì hiện tại."],
    ["làm rõ việc mất chìa khóa xảy ra trước lúc Nam nói", "Nam said that he had lost his key.", "Nam said that he lost his key.", "Mai said that she had already finished.", "Quá khứ hoàn thành làm thứ tự trước lúc nói rõ."],
    ["giữ modal `should`", "She said that I should rest.", "She said that I shoulded rest.", "He said that we might need help.", "`Should/might` thường không đổi."],
    ["cụm cố định với `tell`", "Please tell me the truth.", "Please say me the truth.", "Grandfather told us a story.", "`Tell the truth/a story` là các mẫu cố định."],
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
