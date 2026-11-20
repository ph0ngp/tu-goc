import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HOME_HREF, lessonHref } from "../../lib/site.mjs";
import { bookChapters } from "../book-content.generated";

function sourceHref(href: string | undefined, sourcePath: string) {
  if (!href || /^(?:https?:|mailto:|#|\/)/.test(href) || !href.endsWith(".md")) {
    return href;
  }

  const baseParts = sourcePath.split("/").slice(0, -1);
  for (const part of href.split("/")) {
    if (part === "." || !part) continue;
    if (part === "..") baseParts.pop();
    else baseParts.push(part);
  }

  const resolved = baseParts.join("/");
  const chapter = bookChapters.find((candidate) => candidate.sourcePath === resolved);
  if (chapter?.slug === "introduction" || resolved === "index.md") return HOME_HREF;
  return chapter?.slug ? lessonHref(chapter.slug) : href;
}

export function MarkdownDocument({
  markdown,
  sourcePath,
}: {
  markdown: string;
  sourcePath: string;
}) {
  return (
    <article className="lesson-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...props }) => (
            <a href={sourceHref(href, sourcePath) ?? "#"} {...props}>
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="markdown-table-wrap">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
