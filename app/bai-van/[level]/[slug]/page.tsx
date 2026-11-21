import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bookReadingBySlug, bookReadings } from "../../../book-readings.generated";
import { BookReadingPage } from "../../../book-readings-page";
import { readingHref } from "../../../../lib/site.mjs";
import { pageMetadata } from "../../../site-metadata";

type ReadingRouteProps = {
  params: Promise<{ level: string; slug: string }>;
};

export async function generateStaticParams() {
  return bookReadings.map((reading) => ({ level: reading.level.toLowerCase(), slug: reading.slug }));
}

async function readingFor(params: ReadingRouteProps["params"]) {
  const { level, slug } = await params;
  const reading = bookReadingBySlug(slug);
  return reading && reading.level.toLowerCase() === level ? reading : undefined;
}

export async function generateMetadata({ params }: ReadingRouteProps): Promise<Metadata> {
  const reading = await readingFor(params);
  if (!reading) return {};
  const title = `${reading.title} — Từ Gốc`;
  const description = `Bài văn luyện tập trình độ ${reading.level}. ${reading.summary}`;
  return {
    title,
    description,
    ...pageMetadata({ title, description, href: readingHref(reading.level, reading.slug) }),
  };
}

export default async function ReadingRoute({ params }: ReadingRouteProps) {
  const reading = await readingFor(params);
  if (!reading) notFound();
  return <BookReadingPage slug={reading.slug} />;
}
