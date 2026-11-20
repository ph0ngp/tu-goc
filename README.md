# Từ Gốc

Trang web: <https://ph0ngp.github.io/tu-goc/>

Từ Gốc là một cuốn sách ngữ pháp tiếng Anh trực tuyến bằng tiếng Việt. Giao diện
được xây dựng theo hướng tài liệu tối giản: mục lục cố định, bài học Markdown,
tìm kiếm toàn văn, lựa chọn giao diện màu và một trang luyện tập riêng cho từng
bài học.

Toàn bộ bài học và luyện tập được prerender thành HTML tĩnh và xuất bản trên
GitHub Pages. Điều hướng trong sách mở trực tiếp HTML tĩnh thay vì chờ client
router và RSC; trình duyệt Chrome và Edge còn dựng sẵn trang kế tiếp khi người
đọc rê chuột vào liên kết. JavaScript chỉ được dùng cho những tương tác cần
thiết.

## Nguồn dữ liệu

- `book/src/**/*.md`: nguồn duy nhất của toàn bộ lý thuyết.
- `book/src/SUMMARY.md`: thứ tự chương và bài trong cuốn sách.
- `app/exercises/data/<cấp-độ>/chapter-XX.ts`: câu hỏi, đáp án, gợi ý và giải
  thích của đúng một chương. Số file khớp trực tiếp với số chương trong mục lục,
  nên người biên tập có thể tìm nội dung từ tên chương mà không mở file tổng lớn.
  Mỗi file chương chỉ xuất một map hoàn chỉnh; các phần biên soạn bổ sung được
  hợp nhất tại đây thay vì truyền nhiều lớp dữ liệu qua toàn ứng dụng.
- `app/exercises/data/<cấp-độ>/index.ts`: cổng tập hợp mỏng của từng cấp độ.
- `app/exercise-data.ts`: cổng đăng ký mỏng, ghép các bộ bài tập thành một nguồn
  dữ liệu thống nhất để kiểm thử toàn bộ nội dung.
- `app/exercise-loader.ts` và `app/exercise-loaders.generated.ts`: đường chạy
  của website chỉ nạp dữ liệu đúng chương đang mở, tránh đọc toàn bộ hơn 6.000
  hoạt động khi người học mở một trang luyện tập.
- `app/exercises/*-builders.ts`: các hàm dựng hoạt động dùng lại; không chứa lý
  thuyết hoặc một bản sao khác của dữ liệu bài học.
- `app/exercises/merge-records.ts`: hàm hợp nhất các phần biên soạn riêng bên
  trong một file chương thành map chính thức của chương đó.
- `app/exercise-types.ts`: cấu trúc các dạng bài tập.
- `lib/site.mjs`: địa chỉ website và các hàm tạo liên kết. Mọi đường dẫn nội bộ
  đều đi qua đây vì website nằm trong thư mục con `/tu-goc/` của GitHub Pages.

Các tệp `app/book-*.generated.ts` và `app/exercise-loaders.generated.ts` được
tạo tự động từ thư mục `book/src`; không sửa trực tiếp các tệp này.

Mọi quy tắc biên soạn lý thuyết và luyện tập được ghi tập trung trong
[`AGENTS.md`](AGENTS.md).

Website không có tài khoản, cơ sở dữ liệu, theo dõi tiến độ, phần thưởng, âm
thanh hay phát âm tự động.

## Chạy ở máy cá nhân

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 3002
```

## Kiểm tra

```bash
npm run check
```

Lệnh kiểm tra sẽ chạy lint và typecheck, đồng bộ nội dung Markdown, tạo bản dựng
tĩnh trong `dist/client`, rồi xác minh cấu trúc cuốn sách, liên kết nội bộ, dữ
liệu luyện tập cùng HTML đã xuất.

## Xuất bản

Mỗi lần nhánh `main` được đẩy lên GitHub, workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) chạy
`npm run check` rồi xuất bản `dist/client` lên GitHub Pages. Nếu kiểm tra thất
bại, website giữ nguyên bản đang chạy.
