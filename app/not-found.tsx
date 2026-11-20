import type { Metadata } from "next";
import { HOME_HREF } from "../lib/site.mjs";
import { BookFooter } from "./_components/book-footer";
import { BookChrome } from "./book-chrome";

export const metadata: Metadata = {
  title: "Không tìm thấy trang — Từ Gốc",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <BookChrome>
      <main className="book-content">
        <article className="lesson-markdown">
          <h1>Không tìm thấy trang</h1>
          <p>
            Địa chỉ này không tồn tại hoặc bài học đã được chuyển sang một địa
            chỉ khác.
          </p>
          <p>
            <a href={HOME_HREF}>Về trang giới thiệu và mở mục lục</a>
          </p>
        </article>
        <BookFooter />
      </main>
    </BookChrome>
  );
}
