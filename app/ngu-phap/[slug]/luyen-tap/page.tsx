import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  bookLessonBySlug,
  bookLessons,
} from "../../../book-content.generated";
import { BookPracticePage } from "../../../book-practice-page";
import { practiceHref } from "../../../../lib/site.mjs";
import { lessonDescription, pageMetadata } from "../../../site-metadata";

type PracticeRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return bookLessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: PracticeRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = bookLessonBySlug(slug);
  if (!lesson) return {};
  const title = `Luyện tập: ${lesson.title} — Từ Gốc`;
  const description = `${lessonDescription(lesson)} Trang này tập trung vào hoạt động luyện tập.`;
  return {
    title,
    description,
    ...pageMetadata({
      title,
      description,
      href: practiceHref(lesson.slug),
    }),
  };
}

export default async function PracticeRoute({ params }: PracticeRouteProps) {
  const { slug } = await params;
  const lesson = bookLessonBySlug(slug);
  if (!lesson) notFound();

  return <BookPracticePage slug={lesson.slug} />;
}
