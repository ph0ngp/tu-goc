import type { Metadata } from "next";
import { absoluteUrl, fileHref, SITE_URL } from "../lib/site.mjs";

export { SITE_URL };
export const SITE_NAME = "Từ Gốc";
export const SITE_TITLE = "Từ Gốc — Ngữ pháp tiếng Anh cho mọi người";
export const SITE_SOCIAL_IMAGE = absoluteUrl(fileHref("og.png"));

/**
 * Metadata chia sẻ và URL chuẩn của một trang. `href` là liên kết đã có
 * BASE_PATH, ví dụ kết quả của `lessonHref(slug)`; mọi URL ra ngoài đều tuyệt
 * đối để không phụ thuộc cách ghép với `metadataBase`.
 */
export function pageMetadata({
  title,
  description,
  href,
  type = "article",
}: {
  title: string;
  description: string;
  href: string;
  type?: "article" | "website";
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const url = absoluteUrl(href);
  return {
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type,
      locale: "vi_VN",
      url,
      images: [
        {
          url: SITE_SOCIAL_IMAGE,
          width: 1200,
          height: 627,
          alt: SITE_TITLE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE_SOCIAL_IMAGE],
    },
  };
}

export function lessonDescription(lesson: {
  title: string;
  moduleTitle: string;
  level: string;
}): string {
  return `${lesson.title}: bài học thuộc ${lesson.moduleTitle}, trình độ ${lesson.level}, có lý thuyết bằng tiếng Việt và phần luyện tập riêng.`;
}
