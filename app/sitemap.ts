import type { MetadataRoute } from "next";
import { bookLessons } from "./book-content.generated";
import { SITE_URL } from "./site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...bookLessons.flatMap((lesson) => [
      {
        url: `${SITE_URL}/ngu-phap/${lesson.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/ngu-phap/${lesson.slug}/luyen-tap`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
    ]),
  ];
}
