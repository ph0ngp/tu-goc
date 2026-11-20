import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  bookLessonBySlug,
  bookLessons,
} from "../../book-content.generated";
import { BookLessonPage } from "../../book-lesson-page";
import { lessonHref } from "../../../lib/site.mjs";
import { lessonDescription, pageMetadata } from "../../site-metadata";

type CanonicalLessonRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return bookLessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: CanonicalLessonRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = bookLessonBySlug(slug);
  if (!lesson) return {};
  const title = `${lesson.title} — Từ Gốc`;
  const description = lessonDescription(lesson);
  return {
    title,
    description,
    ...pageMetadata({
      title,
      description,
      href: lessonHref(lesson.slug),
    }),
  };
}

export default async function CanonicalLessonRoute({ params }: CanonicalLessonRouteProps) {
  const { slug } = await params;
  const lesson = bookLessonBySlug(slug);
  if (!lesson) notFound();

  return <BookLessonPage slug={lesson.slug} />;
}
