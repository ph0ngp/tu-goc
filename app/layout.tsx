import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./book-theme.css";
import { SITE_TITLE, SITE_URL, socialMetadata } from "./site-metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description:
    "Lộ trình ngữ pháp tiếng Anh bắt đầu từ cấu trúc câu cơ bản và đi dần đến các chủ đề nâng cao.",
  icons: {
    icon: "/favicon-v3.png",
    shortcut: "/favicon-v3.png",
  },
  alternates: {
    canonical: "/",
  },
  ...socialMetadata({
    title: SITE_TITLE,
    description:
      "Cuốn sách ngữ pháp tiếng Anh từ nền tảng đến C1, được sắp xếp theo trình tự rõ ràng.",
    path: "/",
    type: "website",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
