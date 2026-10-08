import type { BookLesson } from "../book-content.generated";

export function LessonNeighbors({
  previous,
  next,
}: {
  previous?: BookLesson;
  next?: BookLesson;
}) {
  return (
    <nav className="lesson-neighbors" aria-label="Bài học lân cận">
      {previous ? (
        <a href={`/ngu-phap/${previous.slug}`}>
          <small>Bài trước</small>
          <strong>← {previous.title}</strong>
        </a>
      ) : <span />}
      {next && (
        <a href={`/ngu-phap/${next.slug}`}>
          <small>Bài tiếp theo</small>
          <strong>{next.title} →</strong>
        </a>
      )}
    </nav>
  );
}
