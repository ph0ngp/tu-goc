# Quy tắc biên soạn nội dung Từ Gốc

Tệp này là nguồn quy tắc duy nhất dành cho người viết nội dung và các AI agent
làm việc trong repository. Trước khi sửa bài học hoặc bài tập, phải đọc toàn bộ
tệp này.

Nếu một yêu cầu mới của chủ dự án mâu thuẫn với nội dung bên dưới, yêu cầu mới
nhất được ưu tiên và phải cập nhật lại tệp này trong cùng lượt làm việc.

## Nơi ghi yêu cầu mới

Chủ dự án có thể viết thêm yêu cầu ngay dưới dòng này. Nên ghi thành từng gạch
đầu dòng, nói rõ yêu cầu áp dụng cho lý thuyết, luyện tập hay toàn website.

<!-- Ghi các yêu cầu mới ở đây. -->

- Giữ nguyên độ sâu sư phạm hiện tại của Pre-A1. Với A1, A2 và B1, tuyệt đối không
  được để nội dung càng về sau càng ngắn, vắn tắt hoặc chuyển thành bản liệt kê
  quy tắc. Cấp độ cao hơn có thể bớt nhắc lại kiến thức cũ, nhưng kiến thức mới
  phức tạp hơn vẫn phải được giảng đầy đủ và dễ tiếp thu.
- Mỗi bài A1–B1 phải được triển khai theo phạm vi thực tế của chính bài đó, có
  đủ lời giải thích, ví dụ, lý do, đối chiếu, trường hợp dễ nhầm và giới hạn của
  quy tắc khi những phần này cần thiết. Không kéo dài máy móc, nhưng một bài
  ngắn chỉ được chấp nhận khi chủ đề thật sự hẹp và đã được giải thích trọn vẹn.
- Số lượng và dạng luyện tập A1–B1 phải thay đổi theo số mục tiêu, độ khó và số
  lỗi người học có thể mắc. Không ép mọi bài về cùng một con số hoặc cùng một
  khuôn hoạt động; các bài nhiều nhánh kiến thức cần nhiều lần luyện tập hơn.
- Khi mở rộng nội dung A2, ưu tiên những bài có nhiều cấu trúc gần nghĩa hoặc
  nhiều bước lựa chọn. Bổ sung có mục đích bằng lời lý giải, cặp ví dụ chỉ thay
  một yếu tố, quy trình tự chọn và lỗi dễ nhầm; không kéo dài đồng loạt hoặc
  lặp lại kiến thức cũ chỉ để tăng số từ.
- Các bài B2 phải giữ độ sâu sư phạm ít nhất ngang B1. Vì kiến thức B2 thường
  có nhiều góc nhìn thời gian, sắc thái nghĩa và biến thể văn phong, mỗi bài
  phải chỉ rõ điều kiện sử dụng, quy trình lựa chọn, cặp đối chiếu được kiểm
  soát và giới hạn của quy tắc; không được biến B2 thành danh sách công thức.
- Các bài C1 phải giữ độ sâu sư phạm ít nhất ngang B2 và làm rõ quan hệ giữa
  hình thức, nghĩa, diễn ngôn và văn phong. Mỗi bài phải phân biệt cấu trúc có
  vẻ gần nhau, nêu điều kiện cấp phép của cấu trúc, chỉ ra lựa chọn trung tính
  và lựa chọn có đánh dấu, đồng thời cảnh báo các trường hợp đúng ngữ pháp
  nhưng không phù hợp ngữ cảnh; không được trình bày C1 như một bộ mẹo biến đổi.

## 1. Người học và mục tiêu sư phạm

- Luôn coi người học bắt đầu từ con số 0, chỉ biết tiếng Việt và chưa biết bất
  kỳ thuật ngữ, cấu trúc hay quy ước nào của tiếng Anh.
- Viết bằng tiếng Việt tự nhiên, gần gũi, rõ nghĩa và đủ dễ hiểu cho cả trẻ em.
- Giảng chậm rãi theo đúng thứ tự nhận thức: điều đã biết → khái niệm mới → ví
  dụ → đối chiếu → giới hạn của quy tắc → ghi nhớ.
- Kiến thức phải chính xác. Không được hy sinh độ đúng để tạo ra một quy tắc dễ
  nhớ nhưng sai hoặc gây hiểu lầm.
- Phân biệt rõ điều người học chỉ cần **nhận biết** với điều họ đã đủ kiến thức
  để **tự tạo ra**. Không yêu cầu sản sinh một cấu trúc chưa được dạy.
- Mỗi bài chỉ dạy phạm vi đã được đặt cho bài đó trong lộ trình. Không đưa kiến
  thức của bài sau vào bài hiện tại, trừ một câu báo trước thật sự cần thiết.
- Mặc định bài sau dựa trên toàn bộ các bài trước. Không khóa bài, không cảnh
  báo nhảy cóc và không hiển thị mục “kiến thức tiên quyết” cho người học.
- Không lặp lại nội dung đã được dạy đầy đủ ở bài trước. Khi cần, nhắc ngắn gọn
  hoặc đặt liên kết Markdown tự nhiên tới bài liên quan.

## 2. Nguồn dữ liệu và kiến trúc nội dung

- Toàn bộ lý thuyết chỉ được viết trong `book/src/**/*.md`.
- `book/src/SUMMARY.md` là nguồn quyết định thứ tự chương và bài học.
- Không viết hoặc sao chép lý thuyết vào TypeScript, JSON, JSX hay dữ liệu bài
  tập.
- `app/exercises/data/<cấp-độ>/chapter-XX.ts` chứa câu hỏi, đáp án, gợi ý và
  giải thích của đúng một chương tương ứng trong `SUMMARY.md`. Khi thêm hoặc sửa
  bài tập, phải đặt dữ liệu trong file chương của bài; không tạo lại file dữ
  liệu lớn cho cả cấp độ.
- Mỗi file chương chỉ xuất ra **một map dữ liệu luyện tập chính thức**. Nếu quá
  trình biên soạn cần các lớp nội bộ như phần nền, phần bổ sung hoặc phần đào
  sâu, phải hợp nhất chúng ngay trong file chương; không xuất các lớp ấy sang
  `index.ts` và không ghép lại một bài ở `app/exercise-data.ts`.
- Mỗi `app/exercises/data/<cấp-độ>/index.ts` và `app/exercise-data.ts` chỉ là
  cổng đăng ký mỏng ghép các module chương; không đặt bộ câu hỏi trực tiếp trong
  các file index này.
- `app/exercises/*-builders.ts` chỉ chứa hàm dựng hoạt động dùng lại;
  `app/exercise-types.ts` chỉ chứa kiểu dữ liệu. Không đặt lý thuyết hoặc bản
  sao dữ liệu bài học trong các tệp này.
- Các tệp `app/book-*.generated.ts` và `app/exercise-loaders.generated.ts` được
  sinh tự động. Không sửa trực tiếp.
- `app/exercises/merge-records.ts` là hàm hợp nhất kỹ thuật dùng trong phạm vi
  file chương; không chứa câu hỏi hoặc nội dung học tập.
- Trang luyện tập phải nạp động đúng file dữ liệu của chương đang mở qua
  `app/exercise-loaders.generated.ts`; không được nhập dữ liệu của mọi cấp độ
  vào đường chạy phục vụ một trang.
- Không tạo hai nguồn cho cùng một tiêu đề, trạng thái, thứ tự hay nội dung khi
  có thể sinh hoặc tham chiếu từ nguồn chính.
- Xóa mã, dữ liệu, CSS, tài nguyên và dependency đã không còn được sử dụng.

## 3. Cấu trúc một bài lý thuyết

- Mỗi bài có đúng một tiêu đề cấp 1 (`#`) và tiêu đề đó phải khớp với nội dung
  thực sự của bài.
- Mở bài đi thẳng vào vấn đề người học cần hiểu. Không dùng lời quảng cáo tính
  năng, lời giới thiệu chung chung hoặc câu dẫn lặp lại như “Trước hết, hãy hiểu
  quy tắc và cách dùng”.
- Chia bài bằng các tiêu đề cấp 2 (`##`) theo những câu hỏi hoặc bước hiểu tự
  nhiên. Không dùng các nhãn trang trí như “Bức tranh chung”, “Tầng 1” hay các
  kicker nhỏ không mang thông tin.
- Kết thúc bằng `## Ghi nhớ`, tóm tắt đúng những điều đã dạy; không thêm kiến
  thức mới ở phần này.
- Phần lý thuyết không chứa câu hỏi tương tác hoặc “bài tập nhẹ”. Mọi hoạt động
  đòi hỏi người học suy nghĩ và trả lời phải nằm trên trang Luyện tập riêng.
- Độ dài do nội dung quyết định. Không cố viết ngắn, nhưng cũng không lặp lại
  cùng một ý dưới nhiều hình thức chỉ để bài trông đầy đủ.
- Không được lấy việc người học đã lên A1 hoặc A2 làm lý do để lược bỏ phần giải
  thích cho kiến thức mới. Khi một chủ đề có nhiều dạng, nhiều nghĩa hoặc nhiều
  lựa chọn dễ nhầm, bài phải chậm lại: giải thích từng dạng, đặt chúng cạnh nhau
  và chỉ ra cách lựa chọn trong ngữ cảnh.
- Trước khi coi một bài là đủ, phải kiểm tra nội dung chứ không chỉ số từ: người
  học đã biết cấu trúc được tạo ra thế nào, dùng khi nào, không dùng khi nào,
  vì sao các dạng gần nhau khác nhau và cách tự chọn dạng hay chưa.

## 4. Tiếng Việt, tiếng Anh và thuật ngữ

- Trong lý thuyết, mọi từ, cụm từ, câu hoặc công thức tiếng Anh mới đều phải có
  nghĩa hoặc lời giải thích tiếng Việt ở gần đó.
- Khi đưa một câu ví dụ tiếng Anh, phải cho biết câu ấy nghĩa là gì trong tình
  huống đang xét. Không để người mới tự đoán nghĩa.
- Thuật ngữ ngữ pháp lần đầu xuất hiện phải có tên tiếng Việt và tên tiếng Anh,
  chẳng hạn “chủ ngữ (*subject*)”. Sau đó ưu tiên tên tiếng Việt.
- Dùng thuật ngữ nhất quán. Không đổi tên cùng một khái niệm giữa mục lục, tiêu
  đề bài và nội dung.
- Tránh tiếng Việt dịch từng chữ từ tiếng Anh, câu cụt, câu quá hành chính hoặc
  cách nói mà người Việt tự nhiên không dùng.
- Không dùng những dòng giải mã vô nghĩa như “i = tôi · v = động từ”. Chỉ giải
  thích chữ viết tắt khi nó thật sự xuất hiện trong một cấu trúc cần học.
- Không tạo màu hoặc nền riêng cho tiếng Anh. Dùng Markdown thuần túy.
- Dùng inline code như `` `book` ``, `` `I read.` `` hoặc `` `S + V + O` `` khi
  cần chỉ chính xác một hình thức ngôn ngữ. Không bọc mọi từ tiếng Anh một cách
  máy móc nếu dấu ngoặc kép hoặc văn xuôi đã đủ rõ.

## 5. Cách dùng Markdown

- Dùng đoạn văn để giải thích một ý liên tục.
- Dùng danh sách khi các mục cùng cấp và có thể đọc độc lập.
- Dùng danh sách đánh số cho quy trình có thứ tự.
- Dùng bảng khi cần đối chiếu nhiều hàng theo cùng tiêu chí, ví dụ đại từ và từ
  sở hữu, số ít và số nhiều, hoặc hai thì khác nhau.
- Không biến vài cặp từ–nghĩa rời rạc thành những thẻ hoặc khối trích dẫn lớn.
- Dùng khối mã `text` cho sơ đồ cấu trúc, trật tự thành phần hoặc nhiều dòng cần
  căn thẳng hàng.
- Chỉ dùng blockquote cho lưu ý, ngoại lệ hoặc cảnh báo có giá trị. Không tạo
  quote trang trí hoặc lặp lại nội dung vừa nói.
- Dùng chữ đậm để nhấn ý nghĩa; dùng chữ nghiêng cho tên thuật ngữ tiếng Anh khi
  phù hợp. Không lạm dụng cả hai.
- Dùng đường phân cách khi nó thực sự chia hai phần lớn của bài, không đặt sau
  mọi mục.
- Liên kết nội bộ phải là đường dẫn Markdown tương đối và phải trỏ tới một bài
  có thật.
- Format phải phục vụ nội dung; không cố dùng mọi cú pháp Markdown trong mọi bài.

## 6. Ví dụ lý thuyết

- Ví dụ phải có mục đích rõ ràng: minh họa chính xác quy tắc vừa giải thích.
- Ưu tiên từ vựng quen thuộc, tình huống dễ hình dung và câu ngắn ở các chương
  đầu.
- Không dùng ví dụ vô nghĩa, ghép từ tùy tiện hoặc ví dụ mà mọi cách ghép đều có
  thể đúng.
- Không đưa dạng sai vào phần lý thuyết nếu người học chưa có đủ kiến thức để
  hiểu vì sao nó sai.
- Khi so sánh, chỉ thay đổi yếu tố đang được dạy; giữ các yếu tố khác càng giống
  nhau càng tốt.
- Không khẳng định một biến thể tiếng Anh đúng là sai. Nếu có khác biệt theo
  ngữ cảnh, văn phong, Anh–Anh hoặc Anh–Mỹ, phải nói rõ giới hạn.
- Ví dụ phải khớp số lượng, ngôi, thì, mạo từ, dấu câu và nghĩa tiếng Việt.

## 7. Nguyên tắc chung cho phần luyện tập

- Luyện tập của mỗi bài có URL riêng, theo mẫu
  `/ngu-phap/<slug-bài-học>/luyen-tap`. Liên kết “Bài học” và “Luyện tập” có thể
  được trình bày như hai tab, nhưng phải là hai trang độc lập thay vì hai khối
  nội dung chung một URL.
- Toàn bộ câu hỏi của một bài được trình bày trên cùng một trang luyện tập.
  Không dùng luồng “mỗi màn hình một câu” và không có nút “Tiếp theo” giữa các
  câu.
- Mỗi bài đã xuất bản thông thường phải có **từ 25 đến 40 hoạt động luyện tập**.
  Có thể vượt 40 khi nội dung thật sự cần, nhưng không được thêm câu lặp máy
  móc chỉ để đủ số lượng. Số bài phải đủ để kiểm tra từng ý trong lý thuyết
  nhiều lần, bằng ngữ cảnh và thao tác khác nhau, nhằm giúp người học nắm chắc
  kiến thức chứ không chỉ nhận ra một đáp án quen mắt.
- Không được để hàng loạt bài cùng có đúng số hoạt động tối thiểu chỉ vì dùng
  chung một bộ khung. Chủ đề hẹp có thể dừng ở gần mức tối thiểu; chủ đề phức
  tạp như thì, mạo từ, so sánh, mệnh đề hoặc nhiều hình thức dễ nhầm thường cần
  thêm hoạt động đối chiếu và tổng hợp. Cơ cấu dạng bài cũng phải thay đổi theo
  thứ người học cần làm, không lặp nguyên một công thức cho mọi bài.
- Trong cùng một bài, không dùng đi dùng lại một câu mẫu để đặt nhiều câu hỏi
  gần giống nhau. Mỗi mục tiêu nên được kiểm tra bằng nhiều câu, từ vựng và
  tình huống khác nhau; chỉ giữ lại cùng một ví dụ khi người học thật sự cần
  đối chiếu trực tiếp hai đặc điểm của chính ví dụ ấy.
- Đây là website dạy **ngữ pháp**, không phải khóa học từ vựng. Bài tập được
  phép dùng những từ chưa xuất hiện trong phần lý thuyết và không bắt buộc phải
  dịch chúng sang tiếng Việt. Người học tự tra cứu khi không biết nghĩa.
- Từ vựng dùng trong bài tập phải phù hợp với cấp độ hiện tại (Pre-A1, A1,
  A2...) và đủ phổ biến để ngữ pháp vẫn là trọng tâm. Tránh từ hiếm, nghĩa
  chuyên ngành hoặc cách dùng đa nghĩa dễ khiến người học sai vì từ vựng thay
  vì kiến thức ngữ pháp.
- Chỉ kiểm tra kiến thức đã được dạy trong bài hiện tại hoặc các bài trước.
- Tiến trình nên đi từ nhận biết → phân biệt → áp dụng có kiểm soát → kết hợp
  nhiều ý. Cuối chương có thể có bài tổng hợp kiến thức của cả chương.
- Phối hợp các dạng bài phù hợp: chọn đáp án, ghép cặp, phân loại, sắp xếp, chọn
  mảnh, chọn đáp án cho một vị trí, chọn theo tình huống, bảng nhiều hàng, dropdown, nhập câu
  ngắn hoặc dòng thời gian.
- Không bắt người học nhập tự do quá sớm. Chỉ dùng nhập câu khi tất cả từ vựng,
  cấu trúc và biến đổi cần thiết đã được dạy rõ ràng.
- Phần luyện tập không bắt buộc dịch mọi tiếng Anh sang tiếng Việt. Có thể dùng
  tiếng Việt khi cần làm rõ tình huống hoặc tránh kiểm tra nhầm từ vựng.
- Không có điểm thưởng, streak, mastery, tài khoản, tracking, âm thanh hay phát
  âm tự động.

## 8. Chất lượng từng câu hỏi

- Mỗi câu hỏi phải kiểm tra một mục tiêu có ý nghĩa, không chỉ tạo thao tác.
- Mỗi hoạt động chỉ hiển thị **một mệnh lệnh hoặc câu hỏi hoàn chỉnh**. Không
  xếp thành nhiều dòng theo kiểu “nhãn thao tác → câu hỏi → tình huống”, chẳng
  hạn “Chọn đáp án đúng” rồi lại “Chọn câu hoàn chỉnh” rồi mới đưa tình huống.
- Nếu cần bối cảnh, hãy viết bối cảnh và yêu cầu thành một câu hoặc một đoạn
  hỏi liền mạch, tự nhiên. Không đặt bối cảnh trong một khối riêng bên dưới câu
  hỏi và không dùng các nhãn chung chung như “Chọn theo tình huống”.
- Câu hỏi phải tự nói rõ thao tác cần làm. Tránh tiêu đề thừa như “Chọn một đáp
  án”, “Chọn cụm từ” hoặc “Bắt đầu tương tác” khi chính câu hỏi và giao diện đã
  cho người học biết phải làm gì.
- Nếu giao diện cho chọn một đáp án, chỉ được chọn một. Nếu có nhiều đáp án,
  yêu cầu phải nói rõ và dữ liệu phải dùng chế độ chọn nhiều.
- Các nhóm trong bài phân loại phải loại trừ nhau theo tiêu chí được nêu. Không
  trộn hai tiêu chí khiến một đáp án có thể thuộc nhiều nhóm.
- Ghép cặp phải có quan hệ duy nhất và có giá trị học tập. Không dùng bài ghép
  mà bất kỳ cặp nào cũng tạo thành câu đúng.
- Đáp án đúng phải thật sự nằm trong các lựa chọn. Mọi câu hỏi phải có cách
  kiểm tra xác định được.
- Phương án nhiễu phải hợp lý nhưng sai vì đúng kiến thức đang kiểm tra. Không
  bịa dạng từ như `bookes` chỉ để tạo đáp án sai.
- Không dùng một câu tiếng Anh sai làm nhiễu nếu lỗi ấy thuộc kiến thức người
  học chưa được học.
- Câu hướng dẫn phải mô tả đúng thao tác và đúng loại lựa chọn đang hiển thị.
- Chỉ dùng các động từ “sửa” hoặc “thay” khi giao diện thật sự hiển thị sẵn một
  phần sai để người học chỉnh lại. Nếu giao diện bắt đầu bằng ô trống hoặc danh
  sách chưa chọn, câu hỏi phải dùng “chọn”, “xác định” hoặc một cách hỏi tương
  ứng với thao tác thực tế.
- Một câu không được vô tình có hai đáp án đúng. Nếu ngôn ngữ cho phép nhiều
  biến thể, chấp nhận tất cả biến thể phù hợp hoặc viết lại câu hỏi.
- Gợi ý chỉ xuất hiện khi người học chủ động mở mục “Cần một gợi ý”. Không tự
  mở gợi ý sau một số lần làm sai và ô báo sai không lặp lại nội dung gợi ý.
- Gợi ý phải dựa vào đúng quy tắc hoặc dấu hiệu của câu hiện tại. Không dùng
  một nhóm câu gợi ý chung rồi lặp lại trên hàng chục bài, không thêm câu
  “trọng tâm là...” cho có và không chép nguyên đáp án vào gợi ý.
- Phản hồi đúng phải giải thích ngắn gọn vì sao đáp án đúng, không chỉ nói
  “Đúng”. Phản hồi sai không được tiết lộ đáp án ngay lập tức.
- Phản hồi của bài ghép, phân loại và bảng nhiều hàng phải nêu các cặp, nhóm
  hoặc câu hoàn chỉnh cụ thể sau khi người học trả lời; không dùng phản hồi
  rỗng kiểu “mỗi hàng có một lựa chọn phù hợp”.
- Không trộn một câu tiếng Anh với lời bình tiếng Việt trong cùng một phương
  án. Bối cảnh và nhận xét thuộc câu hỏi hoặc phần giải thích; phương án chỉ
  chứa chính nội dung mà người học đang cân nhắc.
- Mỗi hoạt động phải có `objectiveId` nội bộ, ghép mã bài với loại năng lực
  được kiểm tra. Trường này không hiển thị cho người học nhưng phải được test
  để bảo đảm một bài có nhiều lớp luyện tập thay vì chỉ lặp một thao tác.

## 9. Trình bày, khả năng truy cập và khả năng đọc bằng máy

- Nội dung cốt lõi phải có trong HTML phía máy chủ; không phụ thuộc JavaScript
  mới đọc được lý thuyết.
- Mọi trang bài học và luyện tập phải được prerender thành HTML. Các liên kết
  điều hướng trong sách dùng thẻ `<a>` thông thường để mở trực tiếp tài liệu
  tĩnh; không dùng `next/link` hoặc client router khiến việc đổi bài phải chờ
  một vòng RSC.
- JavaScript phía client chỉ dành cho tương tác thật sự cần thiết như đóng mở
  mục lục, chọn theme, tìm kiếm và làm bài tập. Không thêm trạng thái, hiệu ứng
  tải hoặc listener toàn trang chỉ để mô phỏng điều hướng.
- Giữ cấu trúc tiêu đề tuần tự và chỉ có một `h1` chính cho mỗi tài liệu.
- Bảng phải có tiêu đề cột rõ ràng và cuộn ngang được trên màn hình nhỏ.
- Nút, input, radio, select và vùng phản hồi phải có nhãn có thể đọc bằng công
  nghệ hỗ trợ.
- Không dùng màu sắc làm tín hiệu duy nhất cho đúng, sai, đang chọn hoặc chưa có
  nội dung.
- Văn bản phải là text thật, không nhúng nội dung học tập quan trọng vào hình.
- Không xuất bản hoặc cho lập chỉ mục các trang chỉ có câu “đang biên soạn”.
- Không tạo nội dung ẩn, bản sao SEO hoặc bản riêng cho LLM khác với nội dung
  người học thực sự đọc.

## 10. Checklist trước khi hoàn thành một bài

### Lý thuyết

- [ ] Tiêu đề và phạm vi khớp đúng vị trí trong `SUMMARY.md`.
- [ ] Người chưa biết tiếng Anh vẫn hiểu được từng bước.
- [ ] Mọi tiếng Anh mới đều có nghĩa hoặc giải thích tiếng Việt ở gần.
- [ ] Ví dụ tự nhiên, đúng ngữ pháp, đúng nghĩa và không vượt bài.
- [ ] Markdown được chọn theo chức năng, không trang trí thừa.
- [ ] Không lặp bài trước và không dạy trước bài sau.
- [ ] Có phần `Ghi nhớ` không chứa kiến thức mới.

### Luyện tập

- [ ] Mọi phần kiến thức trong bài đều được kiểm tra.
- [ ] Không có câu hỏi ngoài phạm vi đã học.
- [ ] Không có bài ghép, phân loại hoặc lựa chọn mơ hồ.
- [ ] Mọi đáp án và phương án nhiễu đều đã được rà soát thủ công.
- [ ] Mỗi hoạt động chỉ có một câu hỏi hoặc mệnh lệnh liền mạch, tự nhiên và
      khớp với giao diện.
- [ ] Có sự đa dạng và tăng dần độ khó, không lặp cơ học.
- [ ] Bài tập hoạt động được bằng bàn phím và trên màn hình điện thoại.

### Toàn hệ thống

- [ ] Không có nội dung lý thuyết trùng ngoài Markdown.
- [ ] Không sửa tệp generated trực tiếp.
- [ ] Liên kết Markdown đều trỏ tới tệp có thật.
- [ ] Chạy `npm run check` thành công.
