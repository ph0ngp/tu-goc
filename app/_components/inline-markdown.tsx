import ReactMarkdown from "react-markdown";

export function InlineMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown components={{ p: ({ children: content }) => <>{content}</> }}>
      {children}
    </ReactMarkdown>
  );
}

/** Chữ thuần của một đoạn Markdown nội dòng, dùng cho nhãn mà công nghệ hỗ trợ đọc lên. */
export function inlineMarkdownText(markdown: string): string {
  return markdown.replaceAll("`", "");
}

/** Chữ thuần cho nơi không chứa được thẻ như <option>: hình thức tiếng Anh nằm trong ngoặc kép. */
export function inlineMarkdownQuotedText(markdown: string): string {
  return markdown.replace(/`([^`]+)`/g, "“$1”").replaceAll("`", "");
}
