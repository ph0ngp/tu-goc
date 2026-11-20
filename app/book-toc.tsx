import { HOME_HREF, lessonHref } from "../lib/site.mjs";
import { bookSummary } from "./book-summary.generated";

function sidebarChapterTitle(title: string) {
  return title.replace(/^Chương\s+(\d+)\.\s*/, "$1. ");
}

export function BookTableOfContents({
  activeLessonSlug,
  onNavigate,
}: {
  activeLessonSlug?: string;
  onNavigate?: () => void;
}) {
  const activeHref = activeLessonSlug ? lessonHref(activeLessonSlug) : HOME_HREF;

  return (
    <nav className="book-toc" aria-label="Mục lục toàn bộ sách">
      <a
        className={activeHref === HOME_HREF ? "toc-introduction active" : "toc-introduction"}
        href={bookSummary.introduction.href}
        onClick={onNavigate}
      >
        {bookSummary.introduction.title}
      </a>

      {bookSummary.sections.map((section) => (
        <section className="toc-section" key={section.title}>
          <p className="toc-section-label">{section.title}</p>
          {section.modules.map((moduleEntry) => {
            const currentModule = moduleEntry.lessons.some(
              (lesson) => lesson.href === activeHref,
            );
            return (
              <details className="toc-module" key={`${section.title}-${moduleEntry.title}`} open={currentModule || undefined}>
                <summary>{sidebarChapterTitle(moduleEntry.title)}</summary>
                <ol>
                  {moduleEntry.lessons.map((lesson) => (
                    <li
                      className={[
                        lesson.href === activeHref ? "active" : "",
                        lesson.status === "planned" ? "planned" : "",
                      ].filter(Boolean).join(" ") || undefined}
                      key={lesson.sourcePath}
                    >
                      <a href={lesson.href} onClick={onNavigate}>
                        {lesson.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            );
          })}
        </section>
      ))}
    </nav>
  );
}
