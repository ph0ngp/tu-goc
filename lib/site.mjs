// Từ Gốc được xuất bản tĩnh trên GitHub Pages, trong thư mục con mang tên kho
// mã. Mọi đường dẫn và URL tuyệt đối của website đều được tạo từ tệp này, nên
// khi đổi tên miền hoặc thư mục chỉ cần sửa hai hằng số đầu tiên.
//
// Mỗi trang được xuất thành `<đường-dẫn>/index.html`. Liên kết luôn kết thúc
// bằng "/" để GitHub Pages trả thẳng tệp đó, không phải chuyển hướng thêm.

export const SITE_ORIGIN = "https://ph0ngp.github.io";
export const BASE_PATH = "/tu-goc";
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

export const HOME_HREF = `${BASE_PATH}/`;

/** @param {string} slug */
export function lessonHref(slug) {
  return `${BASE_PATH}/ngu-phap/${slug}/`;
}

/** @param {string} slug */
export function practiceHref(slug) {
  return `${BASE_PATH}/ngu-phap/${slug}/luyen-tap/`;
}

/** Trang mục lục của phần Bài văn luyện tập. */
export const READINGS_HREF = `${BASE_PATH}/bai-van/`;

/** Trang liệt kê bài văn của một trình độ. @param {string} level Ví dụ `"A1"`. */
export function readingLevelHref(level) {
  return `${READINGS_HREF}${level.toLowerCase()}/`;
}

/** @param {string} level @param {string} slug */
export function readingHref(level, slug) {
  return `${readingLevelHref(level)}${slug}/`;
}

/** Tệp tĩnh trong `public/`, ví dụ `"og.png"`. @param {string} fileName */
export function fileHref(fileName) {
  return `${BASE_PATH}/${fileName}`;
}

/** Biến một href có BASE_PATH thành URL tuyệt đối. @param {string} href */
export function absoluteUrl(href) {
  return `${SITE_ORIGIN}${href}`;
}
