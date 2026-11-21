import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readingLevels } from "../../book-readings.generated";
import {
  BookReadingLevelPage,
  READINGS_TITLE,
  readingGrammarScope,
  readingLevelFromParam,
  readingsAtLevel,
} from "../../book-readings-page";
import { readingLevelHref } from "../../../lib/site.mjs";
import { pageMetadata } from "../../site-metadata";

type ReadingLevelRouteProps = {
  params: Promise<{ level: string }>;
};

export async function generateStaticParams() {
  return readingLevels.map((level) => ({ level: level.toLowerCase() }));
}

export async function generateMetadata({ params }: ReadingLevelRouteProps): Promise<Metadata> {
  const level = readingLevelFromParam((await params).level);
  if (!level) return {};
  const title = `${READINGS_TITLE} ${level} — Từ Gốc`;
  const description = `Bài văn tiếng Anh trình độ ${level} để luyện đọc, ${readingGrammarScope(level)}.`;
  return {
    title,
    description,
    // Trình độ chưa có bài vẫn có trang để mục lục đầy đủ, nhưng không được lập chỉ mục.
    ...(readingsAtLevel(level).length === 0 ? { robots: { index: false, follow: true } } : {}),
    ...pageMetadata({ title, description, href: readingLevelHref(level), type: "website" }),
  };
}

export default async function ReadingLevelRoute({ params }: ReadingLevelRouteProps) {
  const level = readingLevelFromParam((await params).level);
  if (!level) notFound();
  return <BookReadingLevelPage level={level} />;
}
