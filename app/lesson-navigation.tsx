export function LessonNavigation({
  slug,
  active,
}: {
  slug: string;
  active: "lesson" | "practice";
}) {
  return (
    <nav className="lesson-tabs" aria-label="Nội dung bài">
      <a
        className={active === "lesson" ? "active" : undefined}
        href={`/ngu-phap/${slug}`}
        aria-current={active === "lesson" ? "page" : undefined}
      >
        Bài học
      </a>
      <a
        className={active === "practice" ? "active" : undefined}
        href={`/ngu-phap/${slug}/luyen-tap`}
        aria-current={active === "practice" ? "page" : undefined}
      >
        Luyện tập
      </a>
    </nav>
  );
}
