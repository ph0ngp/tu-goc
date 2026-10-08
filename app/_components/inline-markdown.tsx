import ReactMarkdown from "react-markdown";

export function InlineMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown components={{ p: ({ children: content }) => <>{content}</> }}>
      {children}
    </ReactMarkdown>
  );
}
