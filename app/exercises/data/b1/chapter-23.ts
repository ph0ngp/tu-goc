/* Luyện tập B1 — Chương 23: Mục đích, nguyên nhân, kết quả và nhượng bộ. */
import type { Exercise } from "../../../exercise-types.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";

export const b1Chapter23ExerciseData: Record<string, Exercise[]> = {
  "b1-purpose-clauses": b1PracticeSet("b1pur", "mệnh đề và cụm chỉ mục đích", [
    ["cùng chủ ngữ đi cửa hàng để mua sữa", "I went to the shop to buy milk.", "I went to the shop for to buy milk.", "Lan saved money to take a course.", "Cùng chủ ngữ thường dùng `to + V` và không thêm `for`."],
    ["nhấn rõ mục đích tránh giao thông", "We left early in order to avoid traffic.", "We left early in order avoiding traffic.", "She checked twice in order to prevent errors.", "`In order to` đi với động từ dạng cơ bản."],
    ["dùng cách trang trọng với `so as to`", "She spoke quietly so as to avoid waking the baby.", "She spoke quietly so as avoiding the baby.", "He moved aside so as to let us pass.", "`So as to + V` nói mục đích cùng chủ ngữ."],
    ["nói mục đích phủ định", "I wrote it down in order not to forget.", "I wrote it down in order to not forgetting.", "They whispered so as not to disturb anyone.", "Đặt `not` trước `to` rồi dùng động từ dạng cơ bản."],
    ["mục đích có chủ ngữ khác", "I'll speak slowly so that everyone can understand.", "I'll speak slowly to everyone can understand.", "We left a key so that Mai could enter.", "Chủ ngữ mục đích riêng cần `so that + mệnh đề`."],
    ["mục đích quá khứ với `could`", "I repeated the address so that Lan could write it down.", "I repeated the address so that Lan can wrote it down.", "We took a taxi so that we would not be late.", "Mệnh đề chính quá khứ thường phối hợp với `could/would`."],
    ["mục đích trang trọng với mệnh đề", "The file is protected in order that only staff can open it.", "The file is protected in order that open only staff.", "The rules were changed in order that everyone could participate.", "`In order that` cần một mệnh đề đầy đủ."],
    ["không dùng `for to`", "She called to ask a question.", "She called for to ask a question.", "We met to discuss the plan.", "Mục đích cùng chủ ngữ dùng trực tiếp `to + V`."],
    ["phân biệt kết quả có `so...that`", "It was so hot that I opened the window.", "It was so that I opened the window to hot.", "The box was so heavy that we needed help.", "Tính từ nằm giữa `so` và `that` trong cấu trúc kết quả."],
    ["phân biệt mục đích có `so that`", "I opened the window so that fresh air could come in.", "I opened the window so fresh that air could come in.", "She wrote clearly so that we could read the note.", "`So that` mở mệnh đề nêu kết quả mong muốn."],
    ["mục đích phủ định với hai chủ ngữ", "We hid the gift so that Lan would not see it.", "We hid the gift not to Lan see it.", "He closed the door so that the dog could not escape.", "Có chủ ngữ `Lan` nên cần mệnh đề `so that`."],
    ["chọn cách ngắn gọn tự nhiên trong văn nói", "I called to check the time.", "I called in order that check the time.", "They stopped to buy some water.", "Khi cùng chủ ngữ, `to + V` thường là lựa chọn gọn nhất."],
  ]),
  "b1-cause-result-clauses": b1PracticeSet("b1car", "mệnh đề nguyên nhân và kết quả", [
    ["nhấn nguyên nhân mới bằng `because`", "I stayed home because I was ill.", "I stayed home because of I was ill.", "We left because the shop was closing.", "`Because` đi với mệnh đề và thường nhấn lý do."],
    ["đưa lý do làm nền bằng `since`", "Since everyone is here, we can begin.", "Since of everyone is here, we can begin.", "Since the road is clear, we can drive on.", "`Since + mệnh đề` có thể nêu nguyên nhân làm nền."],
    ["dùng `as` cho nguyên nhân đã rõ", "As it was late, we took a taxi.", "As of it was late, we took a taxi.", "As the lift was broken, we used the stairs.", "`As` mở mệnh đề nguyên nhân và có dấu phẩy khi đứng đầu."],
    ["mức độ của tính từ dẫn tới kết quả", "The box was so heavy that I couldn't lift it.", "The box was such heavy that I couldn't lift it.", "The water was so cold that nobody swam.", "`So + adjective + that` nói mức độ và kết quả."],
    ["mức độ của trạng từ dẫn tới kết quả", "Lan spoke so quietly that nobody heard her.", "Lan spoke such quietly that nobody heard her.", "The car moved so slowly that we walked beside it.", "Trạng từ đi sau `so`, không sau `such`."],
    ["cụm danh từ số ít với `such`", "It was such a difficult test that many students failed.", "It was so a difficult test that many students failed.", "It was such an old bridge that we crossed carefully.", "Danh từ đếm được số ít cần `such a/an + adjective + noun`."],
    ["cụm danh từ số nhiều với `such`", "They are such friendly people that everyone likes them.", "They are so friendly people that everyone likes them.", "They asked such difficult questions that we needed more time.", "Cụm danh từ số nhiều dùng `such` không có `a/an`."],
    ["danh từ không đếm được với `such`", "We had such bad weather that the match was cancelled.", "We had so bad weather that the match was cancelled.", "She gave us such useful advice that we acted immediately.", "Cụm danh từ không đếm được dùng `such + adjective + noun`."],
    ["số lượng nhiều với `so many`", "She has so many books that she needs another shelf.", "She has such many books that she needs another shelf.", "There were so many cars that traffic stopped.", "`Many + danh từ số nhiều` đi sau `so`."],
    ["số lượng không đếm được với `so much`", "There was so much traffic that we were late.", "There was such much traffic that we were late.", "He had so much work that he skipped lunch.", "`Much + danh từ không đếm được` đi sau `so`."],
    ["phân biệt `since` thời gian", "I've known Mai since we were children.", "I've known Mai because we were children.", "They have lived here since the road opened.", "`Since` trong câu hoàn thành này chỉ mốc bắt đầu, không phải nguyên nhân."],
    ["phân biệt `so that` mục đích", "We left early so that we could catch the bus.", "We left so early that to catch the bus.", "She saved the file so that nobody would lose the work.", "Không có tính từ giữa `so` và `that`, nên đây là mệnh đề mục đích."],
  ]),
  "b1-concession-clauses": b1PracticeSet("b1con", "mệnh đề và cụm nhượng bộ", [
    ["dùng `although` trước mệnh đề", "Although it was raining, we went out.", "Although the rain, we went out.", "Although Lan was tired, she finished the report.", "`Although` đi với chủ ngữ và động từ."],
    ["nhấn tương phản mạnh bằng `even though`", "Even though he had a map, he got lost.", "Even though having a map, he got lost.", "Even though she felt ill, she went to work.", "`Even though` mở một mệnh đề đầy đủ."],
    ["dùng `despite` trước danh từ", "Despite the rain, we went out.", "Despite of the rain, we went out.", "Despite the delay, everyone stayed calm.", "`Despite` không có `of` và đi với danh từ."],
    ["dùng `in spite of` trước danh từ", "In spite of his age, he runs daily.", "In spite his age, he runs daily.", "In spite of the noise, the baby slept.", "Cụm cố định là `in spite of`."],
    ["dùng `despite` trước V-ing", "Despite feeling tired, Lan continued.", "Despite she felt tired, Lan continued.", "Despite working late, they missed the deadline.", "Sau `despite` có thể dùng `V-ing` khi chủ thể được hiểu rõ."],
    ["giữ mệnh đề sau `despite`", "Despite the fact that it was raining, we went out.", "Despite it was raining, we went out.", "In spite of the fact that he apologized, she was upset.", "Muốn giữ mệnh đề cần thêm `the fact that`."],
    ["không dùng đồng thời `although` và `but`", "Although it was late, we continued.", "Although it was late, but we continued.", "It was expensive, but we bought it.", "Một quan hệ tương phản chỉ cần `although` hoặc `but`."],
    ["phân biệt sự thật với điều kiện", "Even though it rained, we went out.", "Even if it rained, we would go out.", "Even though he knew the risk, he agreed.", "`Even though` nói sự thật đã xảy ra."],
    ["nói vẫn đi ngay cả nếu có mưa", "I'll go even if it rains.", "I'll go even though it rained yesterday.", "We'll continue even if the plan changes.", "`Even if` nêu điều kiện có thể xảy ra."],
    ["rút mệnh đề cùng chủ ngữ thành V-ing", "Despite being tired, Lan continued.", "Despite she was tired, Lan continued.", "Despite being nervous, Mai spoke clearly.", "Sau `despite` không đặt cả một mệnh đề; khi người mang trạng thái cũng là chủ ngữ mệnh đề chính, dùng `despite + V-ing`."],
    ["đặt mệnh đề `although` cuối câu", "Lan passed although she was nervous.", "Lan passed despite she was nervous.", "We enjoyed the trip although the weather was poor.", "`Although` vẫn cần một mệnh đề khi đứng cuối."],
    ["dùng cụm sở hữu sau `in spite of`", "In spite of his limited experience, he succeeded.", "In spite of he had limited experience, he succeeded.", "Despite her fear, she entered the room.", "Sau giới từ dùng cụm danh từ, không dùng trực tiếp mệnh đề."],
  ]),
};
