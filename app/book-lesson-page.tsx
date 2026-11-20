import { BookFooter } from "./_components/book-footer";
import { LessonNeighbors } from "./_components/lesson-neighbors";
import { MarkdownDocument } from "./_components/markdown-document";
import { StructuredData } from "./_components/structured-data";
import { BookChrome } from "./book-chrome";
import { bookChapterBySlug, bookLessonBySlug, bookLessons } from "./book-content.generated";
import { LessonNavigation } from "./lesson-navigation";
import { absoluteUrl, HOME_HREF, lessonHref, practiceHref } from "../lib/site.mjs";
import { lessonDescription, SITE_NAME } from "./site-metadata";

export function BookLessonPage({ slug }: { slug: string }) {
  const lesson = bookLessonBySlug(slug);
  const chapter = bookChapterBySlug(slug);
  if (!lesson || !chapter) return null;

  const lessonIndex = bookLessons.findIndex((candidate) => candidate.slug === slug);
  const previous = bookLessons[lessonIndex - 1];
  const next = bookLessons[lessonIndex + 1];

  return (
    <BookChrome activeLessonSlug={lesson.slug}>
      <main className="book-content">
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: lesson.title,
            description: lessonDescription(lesson),
            inLanguage: "vi",
            educationalLevel: lesson.level,
            learningResourceType: "lesson",
            url: absoluteUrl(lessonHref(lesson.slug)),
            isPartOf: { "@type": "Book", name: SITE_NAME, url: absoluteUrl(HOME_HREF) },
          }}
        />
        <LessonNavigation slug={lesson.slug} active="lesson" />
        <MarkdownDocument markdown={chapter.markdown} sourcePath={chapter.sourcePath} />
        <div className="lesson-practice-cta">
          <a href={practiceHref(lesson.slug)}>
            Luyện tập <span aria-hidden="true">→</span>
          </a>
        </div>
        <LessonNeighbors previous={previous} next={next} />
        <BookFooter />
      </main>
    </BookChrome>
  );
}
