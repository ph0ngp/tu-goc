import { BookFooter } from "./_components/book-footer";
import { LessonNeighbors } from "./_components/lesson-neighbors";
import { StructuredData } from "./_components/structured-data";
import { BookChrome } from "./book-chrome";
import { bookLessonBySlug, bookLessons } from "./book-content.generated";
import { LessonNavigation } from "./lesson-navigation";
import { PracticeDocument } from "./practice-document";
import { SITE_URL } from "./site-metadata";

export async function BookPracticePage({ slug }: { slug: string }) {
  const lesson = bookLessonBySlug(slug);
  if (!lesson) return null;

  const { loadExercisesForLegacyId } = await import("./exercise-loader");
  const exercises = await loadExercisesForLegacyId(lesson.legacyLessonId);
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
            name: `Luyện tập: ${lesson.title}`,
            description: `Luyện tập toàn bộ nội dung bài ${lesson.title}.`,
            inLanguage: "vi",
            educationalLevel: lesson.level,
            learningResourceType: "practice",
            url: `${SITE_URL}/ngu-phap/${lesson.slug}/luyen-tap`,
            isPartOf: {
              "@type": "LearningResource",
              name: lesson.title,
              url: `${SITE_URL}/ngu-phap/${lesson.slug}`,
            },
          }}
        />
        <LessonNavigation slug={lesson.slug} active="practice" />
        <PracticeDocument
          lessonTitle={lesson.title}
          exercises={exercises}
        />
        <LessonNeighbors previous={previous} next={next} />
        <BookFooter />
      </main>
    </BookChrome>
  );
}
