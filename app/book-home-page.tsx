import { BookFooter } from "./_components/book-footer";
import { MarkdownDocument } from "./_components/markdown-document";
import { StructuredData } from "./_components/structured-data";
import { BookChrome } from "./book-chrome";
import { bookIntroduction } from "./book-content.generated";
import { SITE_NAME, SITE_URL } from "./site-metadata";

export function BookHomePage() {
  return (
    <BookChrome>
      <main className="book-content">
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "Book",
            name: SITE_NAME,
            description: "Sách ngữ pháp tiếng Anh bằng tiếng Việt, từ nền tảng đến C1.",
            inLanguage: "vi",
            url: SITE_URL,
            author: { "@type": "Person", name: "Phan Hải Phong" },
          }}
        />
        <MarkdownDocument
          markdown={bookIntroduction?.markdown ?? "# Từ Gốc"}
          sourcePath={bookIntroduction?.sourcePath ?? "index.md"}
        />
        <BookFooter />
      </main>
    </BookChrome>
  );
}
