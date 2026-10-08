import { BookFooter } from "./_components/book-footer";
import { LessonNeighbors } from "./_components/lesson-neighbors";
import { MarkdownDocument } from "./_components/markdown-document";
import { StructuredData } from "./_components/structured-data";
import { BookChrome } from "./book-chrome";
import { bookChapterBySlug, bookLessonBySlug, bookLessons } from "./book-content.generated";
import { LessonNavigation } from "./lesson-navigation";
import { lessonDescription, SITE_NAME, SITE_URL } from "./site-metadata";

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
            url: `${SITE_URL}/ngu-phap/${lesson.slug}`,
            isPartOf: { "@type": "Book", name: SITE_NAME, url: SITE_URL },
          }}
        />
        <LessonNavigation slug={lesson.slug} active="lesson" />
        <MarkdownDocument markdown={chapter.markdown} sourcePath={chapter.sourcePath} />
        <div className="lesson-practice-cta">
          <a href={`/ngu-phap/${lesson.slug}/luyen-tap`}>
            Luyện tập <span aria-hidden="true">→</span>
          </a>
        </div>
        <LessonNeighbors previous={previous} next={next} />
        <BookFooter />
      </main>
    </BookChrome>
  );
}
