import type { Metadata } from "next";
import "./book-theme.css";
import { absoluteUrl, BASE_PATH, fileHref, HOME_HREF, SITE_URL } from "../lib/site.mjs";
import { pageMetadata, SITE_TITLE } from "./site-metadata";

const favicon = absoluteUrl(fileHref("favicon-v3.png"));

// Chrome và Edge tải trước rồi dựng sẵn trang trong sách khi người đọc rê chuột
// hoặc chạm vào liên kết, nên trang mới hiện gần như tức thì. Điều hướng vẫn là
// mở tài liệu HTML tĩnh; trình duyệt không hỗ trợ sẽ bỏ qua khối này.
const speculationRules = JSON.stringify({
  prerender: [{ where: { href_matches: `${BASE_PATH}/*` }, eagerness: "moderate" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description:
    "Lộ trình ngữ pháp tiếng Anh bắt đầu từ cấu trúc câu cơ bản và đi dần đến các chủ đề nâng cao.",
  icons: {
    icon: favicon,
    shortcut: favicon,
  },
  ...pageMetadata({
    title: SITE_TITLE,
    description:
      "Cuốn sách ngữ pháp tiếng Anh từ nền tảng đến C1, được sắp xếp theo trình tự rõ ràng.",
    href: HOME_HREF,
    type: "website",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        {children}
        <script type="speculationrules" dangerouslySetInnerHTML={{ __html: speculationRules }} />
      </body>
    </html>
  );
}
