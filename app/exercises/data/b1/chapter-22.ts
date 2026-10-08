/* Luyện tập B1 — Chương 22: Mệnh đề quan hệ và dấu câu. */
import type { Exercise } from "../../../exercise-types.ts";
import { mergeExerciseRecords } from "../../merge-records.ts";
import { b1PracticeSet } from "../../advanced-builders.ts";
import { b1DepthPack } from "../../b1-depth-builders.ts";

const b1Chapter22BaseExerciseData: Record<string, Exercise[]> = {
  "b1-defining-nondefining-relatives": b1PracticeSet("b1dnr", "mệnh đề quan hệ xác định và không xác định", [
    ["xác định người phụ nữ sống bên cạnh", "The woman who lives next door is a doctor.", "The woman, that lives next door, is a doctor.", "The student who won the prize is absent.", "Thông tin xác định không có dấu phẩy và dùng `who/that` cho người."],
    ["thêm thông tin phụ về cô Hoa", "Ms Hoa, who lives next door, is a doctor.", "Ms Hoa that lives next door is a doctor.", "Mai, who works with me, is on leave.", "Tên riêng đã rõ nên mệnh đề phụ dùng dấu phẩy và `who`."],
    ["bổ nghĩa xác định cho một quyển sách", "The book that you lent me is excellent.", "The book, that you lent me, is excellent.", "The film which we watched was funny.", "Mệnh đề chọn ra vật cụ thể và không cần dấu phẩy."],
    ["thêm thông tin phụ về chiếc máy này", "This laptop, which I bought last year, is broken.", "This laptop, that I bought last year, is broken.", "My bike, which is very light, was expensive.", "Mệnh đề không xác định dùng `which`, không dùng `that`."],
    ["lược đại từ quan hệ làm tân ngữ trong mệnh đề xác định", "The film we watched was funny.", "The film watched was funny.", "The person I called did not answer.", "Có chủ ngữ `we`, nên đại từ tân ngữ có thể lược."],
    ["giữ đại từ quan hệ làm chủ ngữ", "The person who called me was polite.", "The person called me was polite.", "The bus that goes downtown is full.", "Đại từ thực hiện hành động nên không được lược."],
    ["không lược đại từ trong mệnh đề phụ", "My car, which I bought last year, is reliable.", "My car, I bought last year, is reliable.", "Lan, who I met at work, is a designer.", "Mệnh đề không xác định phải giữ đại từ quan hệ."],
    ["dùng `that` trong mệnh đề xác định cho vật", "The key that opens this door is missing.", "The key, that opens this door, is missing.", "The chair that broke has been replaced.", "`That` dùng được khi thông tin xác định và không có dấu phẩy."],
    ["dùng `who` trong mệnh đề phụ cho người", "Mr Long, who helped us, was kind.", "Mr Long, that helped us, was kind.", "My aunt, who lives in Hue, is visiting.", "Không dùng `that` trong mệnh đề không xác định."],
    ["giới hạn một nhóm học sinh", "Students who arrive late must report to the office.", "Students, who arrive late, must report to the office.", "Drivers who park here will be fined.", "Không dấu phẩy cho thấy chỉ nhóm thỏa điều kiện được nói đến."],
    ["thêm thông tin về Paris đã rõ", "Paris, which is the capital of France, attracts visitors.", "Paris that is the capital of France attracts visitors.", "Hanoi, which has many lakes, is the capital of Vietnam.", "Địa danh đã rõ nhận mệnh đề phụ giữa hai dấu phẩy."],
    ["phân biệt một người trong nhiều người cùng vai trò", "My brother who lives in Hue is a teacher.", "My brother, who lives in Hue is a teacher.", "The manager who interviewed me was friendly.", "Mệnh đề xác định cần để biết người nào và không bị ngắt bằng dấu phẩy."],
  ]),
  "b1-relative-clause-commas": b1PracticeSet("b1rcc", "dấu phẩy và ý nghĩa mệnh đề quan hệ", [
    ["tách thông tin phụ chen giữa câu", "Mr Long, who teaches maths, is absent.", "Mr Long, who teaches maths is absent.", "Mai, who called earlier, will come at six.", "Mệnh đề phụ chen giữa cần hai dấu phẩy."],
    ["mệnh đề phụ nằm cuối câu", "We stayed at the Grand Hotel, which overlooks the river.", "We stayed at the Grand Hotel which overlooks the river.", "I called Lan, who gave me the details.", "Mệnh đề phụ cuối câu cần dấu phẩy ở điểm bắt đầu."],
    ["giới hạn nhóm nhân viên làm ở nhà", "The employees who work at home joined online.", "The employees, who work at home, joined online.", "The guests who arrived early got seats.", "Không dấu phẩy giới hạn một nhóm trong tập lớn hơn."],
    ["nói toàn bộ nhóm nhân viên đều làm ở nhà", "The employees, who work at home, joined online.", "The employees who work at home joined online.", "Our guides, who know the area, led the way.", "Dấu phẩy cho biết thông tin chỉ phụ thêm về nhóm đã rõ."],
    ["không dùng `that` giữa hai dấu phẩy", "Lan, who called earlier, left a message.", "Lan, that called earlier, left a message.", "The museum, which opened in 1990, is closed.", "Mệnh đề không xác định dùng `who/which`."],
    ["không lược đại từ trong phần phụ", "My bike, which I bought online, is light.", "My bike, I bought online, is light.", "Nam, who we met yesterday, is a pilot.", "Đại từ quan hệ phải được giữ trong mệnh đề phụ."],
    ["dùng tên riêng với thông tin phụ", "Hanoi, which is the capital of Vietnam, has many lakes.", "Hanoi which is the capital of Vietnam has many lakes.", "Ms Mai, who runs the shop, knows us.", "Tên riêng thường đã xác định nên thông tin thêm có dấu phẩy."],
    ["dùng mệnh đề xác định để phân biệt người cùng tên", "The Lan who works in accounting called me.", "The Lan, who works in accounting, called me.", "The Minh who lives upstairs is a chef.", "Mệnh đề không dấu phẩy chọn đúng người trong nhiều người cùng tên."],
    ["giữ câu chính hoàn chỉnh khi bỏ phần phụ", "This camera, which belongs to Mai, is expensive.", "This camera which belongs to Mai, is expensive.", "Our car, which is ten years old, still runs well.", "Hai dấu phẩy bao trọn phần có thể bỏ mà câu chính vẫn rõ."],
    ["không đặt dấu phẩy chỉ vì muốn ngắt hơi", "The bus that goes to the airport leaves at six.", "The bus, that goes to the airport, leaves at six.", "The key that fits this lock is missing.", "Thông tin xác định không có dấu phẩy dù khi đọc có thể ngắt."],
    ["thêm thông tin phụ về vật có `this`", "This phone, which I bought yesterday, is faulty.", "This phone that I bought yesterday is faulty.", "That building, which used to be a school, is empty.", "Từ chỉ định đã xác định vật nên mệnh đề phụ dùng dấu phẩy."],
    ["đặt đủ dấu phẩy quanh đồng vị kiểu quan hệ", "My manager, who joined last month, is from Hue.", "My manager, who joined last month is from Hue.", "Her son, who studies medicine, lives abroad.", "Phần chen giữa phải đóng lại trước vị ngữ chính."],
  ]),
  "b1-relative-whose-where-when": b1PracticeSet("b1rww", "whose, where và when trong mệnh đề quan hệ", [
    ["nói người phụ nữ có con trai là phi công", "a woman whose son is a pilot", "a woman whose her son is a pilot", "I met a student whose sister works here.", "`Whose` đứng trực tiếp trước danh từ sở hữu, không thêm `her`."],
    ["nói công ty có sản phẩm bán toàn cầu", "a company whose products are sold worldwide", "a company who products are sold worldwide", "We visited a house whose roof was damaged.", "`Whose` dùng được cho tổ chức và vật khi quan hệ sở hữu rõ."],
    ["nói quán cà phê nơi hai người gặp nhau", "the café where we first met", "the café where we first met in", "This is the park where the festival takes place.", "`Where` đã chứa ý nơi chốn nên không lặp `in`."],
    ["nói thành phố là tân ngữ trực tiếp của `visited`", "the city that I visited", "the city where I visited", "The village which we toured was quiet.", "Tân ngữ trực tiếp cần `which/that`, không dùng `where`."],
    ["nói ngôi nhà mình sống", "the house where I live", "the house where I live in", "They found the room where we had stayed.", "`Where` tương đương ý `in/at which`."],
    ["nói ngày hai người gặp nhau", "the day when we met", "the day when we met on", "I remember the year when I started school.", "`When` nối danh từ thời gian với sự việc xảy ra vào mốc đó."],
    ["lược `when` trong mệnh đề xác định", "the day we met", "the day did we meet", "That was the year I moved to Hue.", "Sau danh từ thời gian, `when` thường có thể lược khi trật tự vẫn là câu kể."],
    ["dùng `whose` không thêm đại từ sở hữu", "The student whose phone rang apologized.", "The student whose his phone rang apologized.", "The family whose car was stolen called the police.", "Danh từ sau `whose` đã mang quan hệ sở hữu."],
    ["thêm thông tin phụ về Hội An", "We returned to Hoi An, where we had spent our honeymoon.", "We returned to Hoi An where we had spent our honeymoon.", "They visited Kyoto, where their son lives.", "Địa danh đã rõ nhận mệnh đề phụ sau dấu phẩy."],
    ["thêm bối cảnh phụ cho năm 2020", "In 2020, when travel was difficult, we stayed home.", "In 2020 when travel was difficult we stayed home.", "Last winter, when the roads were icy, school closed.", "Mệnh đề `when` chen giữa được ngăn bằng dấu phẩy."],
    ["thay `where` bằng cụm giới từ cuối", "the house which I live in", "the house which I live", "the desk that she works at", "Khi dùng `which/that`, giới từ cần thiết vẫn phải có."],
    ["chọn theo vai trò chứ không theo danh từ nơi chốn", "the hotel that we booked", "the hotel where we booked", "the beach where we had lunch", "`Booked` nhận `hotel` làm tân ngữ trực tiếp nên dùng `that`."],
  ]),
  "b1-relative-preposition-stranding": b1PracticeSet("b1rps", "giới từ ở cuối mệnh đề quan hệ", [
    ["nói người mình đã trò chuyện cùng", "the person I spoke to", "the person I spoke", "The colleague I work with is friendly.", "Cụm `speak to` phải giữ giới từ ở cuối."],
    ["nói chiếc ghế người nghe đang ngồi", "the chair you're sitting on", "the chair you're sitting", "The bed the cat is sleeping on is new.", "`Sit on` cần giới từ dù tân ngữ đã đưa lên trước."],
    ["nói chủ đề họ đang bàn", "the topic they were talking about", "the topic they were talking", "That is the issue we argued about.", "Giữ giới từ của cụm `talk about`."],
    ["lược đại từ tân ngữ trong mệnh đề xác định", "the job we applied for", "the job we applied", "This is the key I was looking for.", "Có chủ ngữ riêng nên đại từ tân ngữ có thể lược, giới từ không lược."],
    ["giữ đại từ làm chủ ngữ", "the person who spoke to me", "the person spoke to me", "The nurse who looked after me was kind.", "Đại từ thực hiện hành động nên phải có mặt."],
    ["dùng đại từ trong mệnh đề không xác định", "My manager, who I spoke to, agreed.", "My manager, I spoke to, agreed.", "This topic, which we talked about, is important.", "Mệnh đề phụ không cho phép lược đại từ."],
    ["dùng dạng trang trọng cho người", "the person to whom I spoke", "the person to that I spoke", "The client for whom we prepared the report arrived.", "Giới từ đứng trước dùng `whom`, không dùng `that`."],
    ["dùng dạng trang trọng cho vật", "the chair on which you are sitting", "the chair on that you are sitting", "The system on which we depend is old.", "Giới từ đứng trước vật dùng `which`."],
    ["giữ giới từ của `listen to`", "the music we listened to", "the music we listened", "The podcast that I listened to was useful.", "Động từ `listen` cần `to` trước tân ngữ."],
    ["giữ giới từ của `be interested in`", "the subject he is interested in", "the subject he is interested", "This is a field that Mai is interested in.", "Tính từ `interested` đi với `in`."],
    ["không lược `which` khi giới từ đứng trước", "the room in which we met", "the room in we met", "The year during which they worked abroad was difficult.", "Dạng trang trọng `preposition + which` phải giữ đại từ."],
    ["dựng mệnh đề từ `depend on the data`", "the data we depend on", "the data we depend", "We changed the system that everyone relied on.", "Giới từ cố định vẫn đứng cuối sau khi đưa tân ngữ lên trước."],
  ]),
  "b1-punctuation-direct-relative-apposition": b1PracticeSet("b1pun", "dấu câu trong lời nói trực tiếp, quan hệ và đồng vị", [
    ["mệnh đề dẫn đứng trước lời nói", "Mai said, “The bus is late.”", "Mai said “The bus is late”.", "Nam replied, “I understand.”", "Động từ dẫn đứng trước thường có dấu phẩy trước lời trích."],
    ["mệnh đề dẫn đứng sau câu kể", "“The bus is late,” Mai said.", "“The bus is late.”, Mai said.", "“I need help,” Nam replied.", "Dấu phẩy thay dấu chấm trước mệnh đề dẫn."],
    ["mệnh đề dẫn sau câu hỏi", "“Is the bus late?” Mai asked.", "“Is the bus late?,” Mai asked.", "“Where are you going?” Lan asked.", "Giữ dấu hỏi và không thêm dấu phẩy."],
    ["mệnh đề dẫn sau câu cảm thán", "“Watch out!” Nam shouted.", "“Watch out!,” Nam shouted.", "“Stop!” the guard shouted.", "Giữ dấu cảm thán và không thêm dấu phẩy."],
    ["mệnh đề dẫn chen giữa một câu", "“The bus,” Mai said, “is late.”", "“The bus” Mai said “is late.”", "“This plan,” he explained, “will save time.”", "Hai dấu phẩy tách mệnh đề dẫn chen giữa."],
    ["mệnh đề quan hệ phụ chen giữa", "Lan, who works in accounting, will call.", "Lan, who works in accounting will call.", "Our office, which opened in 2018, has moved.", "Thông tin phụ cần đủ hai dấu phẩy."],
    ["mệnh đề quan hệ xác định", "The employee who works in accounting will call.", "The employee, who works in accounting, will call.", "The key that fits this lock is missing.", "Không dấu phẩy khi mệnh đề xác định đối tượng."],
    ["đồng vị phụ thêm sau tên riêng", "Mai, my oldest friend, lives in Hue.", "Mai my oldest friend lives in Hue.", "Hanoi, the capital of Vietnam, has many lakes.", "Cụm đồng vị phụ thêm được ngăn bằng hai dấu phẩy."],
    ["tên cần để xác định người bạn", "my friend Mai", "my friend, Mai,", "The novelist George Orwell wrote the book.", "Tên cần để xác định thường không có dấu phẩy."],
    ["đồng vị ở cuối câu", "We visited Hue, the former imperial capital.", "We visited Hue the former imperial capital,.", "She spoke to Nam, the team leader.", "Đồng vị phụ thêm cuối câu bắt đầu sau dấu phẩy."],
    ["giữ kiểu ngoặc kép nhất quán", "“Yes,” she said. “I agree.”", "“Yes,’ she said. “I agree.'", "“No,” he replied. “Not today.”", "Một văn bản nên dùng nhất quán cùng kiểu dấu ngoặc."],
    ["không thêm dấu phẩy thừa vào cụm xác định", "the planet Mars", "the planet, Mars,", "The writer Nguyen Nhat Anh is well known.", "Tên gọi cần thiết đi liền danh từ không có dấu phẩy."],
  ]),
};

const b1Chapter22DepthExerciseData: Partial<Record<string, Exercise[]>> = {
  "b1-defining-nondefining-relatives": b1DepthPack("b1dnx", "loại mệnh đề quan hệ và dấu phẩy", [
    { cue: "Chỉ những khách đã đặt trước mới được vào.", options: ["Guests who booked in advance may enter.", "Guests, who booked in advance, may enter."], answer: "Guests who booked in advance may enter.", completed: "Guests who booked in advance may enter." },
    { cue: "Thêm thông tin phụ về cô Lan đã được xác định.", options: ["Ms Lan, who teaches us, is away.", "Ms Lan that teaches us is away."], answer: "Ms Lan, who teaches us, is away.", completed: "Ms Lan, who teaches us, is away." },
    { cue: "Lược đại từ quan hệ làm tân ngữ trong mệnh đề xác định.", options: ["The coat I bought is too large.", "The coat bought is too large."], answer: "The coat I bought is too large.", completed: "The coat I bought is too large." },
  ], [
    ["Sắp xếp câu thêm thông tin phụ về hồ Hoàn Kiếm.", "Hoan Kiem Lake, which is in central Hanoi, attracts many visitors.", "Địa danh đã rõ nhận mệnh đề phụ giữa hai dấu phẩy."],
  ]),
};

export const b1Chapter22ExerciseData = mergeExerciseRecords(
  b1Chapter22BaseExerciseData,
  b1Chapter22DepthExerciseData,
);
