import type { Metadata } from "next";

export const SITE_URL = "https://tu-goc.hphongp.chatgpt.site";
export const SITE_NAME = "Từ Gốc";
export const SITE_TITLE = "Từ Gốc — Ngữ pháp tiếng Anh cho mọi người";
export const SITE_SOCIAL_IMAGE = "/og.png";

export function socialMetadata({
  title,
  description,
  path,
  type = "article",
}: {
  title: string;
  description: string;
  path: string;
  type?: "article" | "website";
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      type,
      locale: "vi_VN",
      url: path,
      images: [
        {
          url: SITE_SOCIAL_IMAGE,
          width: 1734,
          height: 907,
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
