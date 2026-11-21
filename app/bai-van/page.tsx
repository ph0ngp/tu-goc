import type { Metadata } from "next";
import { BookReadingsIndexPage, READINGS_DESCRIPTION, READINGS_TITLE } from "../book-readings-page";
import { READINGS_HREF } from "../../lib/site.mjs";
import { pageMetadata } from "../site-metadata";

const title = `${READINGS_TITLE} — Từ Gốc`;

export const metadata: Metadata = {
  title,
  description: READINGS_DESCRIPTION,
  ...pageMetadata({ title, description: READINGS_DESCRIPTION, href: READINGS_HREF, type: "website" }),
};

export default function ReadingsRoute() {
  return <BookReadingsIndexPage />;
}
