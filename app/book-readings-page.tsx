import { BookFooter } from "./_components/book-footer";
import { MarkdownDocument } from "./_components/markdown-document";
import { StructuredData } from "./_components/structured-data";
import { BookChrome } from "./book-chrome";
import { bookReadingBySlug, bookReadings, readingLevels, type BookReading } from "./book-readings.generated";
import { absoluteUrl, HOME_HREF, READINGS_HREF, readingHref, readingLevelHref } from "../lib/site.mjs";
import { SITE_NAME } from "./site-metadata";

export const READINGS_TITLE = "Bài văn luyện tập";
export const READINGS_DESCRIPTION =
  "Bài văn tiếng Anh ngắn để luyện đọc, xếp theo trình độ; mỗi bài chỉ dùng ngữ pháp đã học đến hết trình độ của bài.";

/** Phạm vi ngữ pháp của một bài văn: từ đầu sách đến hết trình độ của bài. */
export function readingGrammarScope(level: string) {
  const first = readingLevels[0];
  return level === first
    ? `chỉ dùng ngữ pháp ${level}`
    : `chỉ dùng ngữ pháp từ ${first} đến ${level}`;
}

export function readingsAtLevel(level: string) {
  return bookReadings.filter((reading) => reading.level === level);
}

/** Tên trình độ trong sách ứng với phần đường dẫn, ví dụ `"a1"` → `"A1"`. */
export function readingLevelFromParam(param: string) {
  return readingLevels.find((level) => level.toLowerCase() === param);
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function ReadingList({ readings }: { readings: BookReading[] }) {
  return (
    <ul className="reading-list">
      {readings.map((reading) => (
        <li key={reading.slug}>
          <a href={readingHref(reading.level, reading.slug)}>{reading.title}</a>
          <p>{reading.summary}</p>
        </li>
      ))}
    </ul>
  );
}

export function BookReadingsIndexPage() {
  return (
    <BookChrome activeHref={READINGS_HREF}>
      <main className="book-content">
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: READINGS_TITLE,
            description: READINGS_DESCRIPTION,
            inLanguage: "vi",
            url: absoluteUrl(READINGS_HREF),
            isPartOf: { "@type": "Book", name: SITE_NAME, url: absoluteUrl(HOME_HREF) },
          }}
        />
        <article className="lesson-markdown">
          <h1>{READINGS_TITLE}</h1>
          <p>
            Đây là những bài văn tiếng Anh ngắn để luyện đọc, xếp theo trình
            độ. Mỗi bài chỉ dùng ngữ pháp từ đầu sách đến hết trình độ của bài,
            nên bạn có thể đọc một bài ngay khi đã học xong trình độ ấy.
          </p>
          <p>
            Bài văn không kèm bản dịch. Hãy đọc chậm, đoán nghĩa từ ngữ cảnh và
            tra những từ chưa biết.
          </p>
          <ul className="reading-list">
            {readingLevels.map((level) => {
              const count = readingsAtLevel(level).length;
              return (
                <li key={level}>
                  <a href={readingLevelHref(level)}>{level}</a>
                  <p>
                    {count ? `${count} bài văn` : "Chưa có bài văn"} ·{" "}
                    {readingGrammarScope(level)}
                  </p>
                </li>
              );
            })}
          </ul>
        </article>
        <BookFooter />
      </main>
    </BookChrome>
  );
}

export function BookReadingLevelPage({ level }: { level: string }) {
  const readings = readingsAtLevel(level);
  const levelIndex = readingLevels.indexOf(level);
  const previous = readingLevels[levelIndex - 1];
  const next = readingLevels[levelIndex + 1];
  const levelsWithReadings = readingLevels.filter((candidate) => readingsAtLevel(candidate).length > 0);

  return (
    <BookChrome activeHref={readingLevelHref(level)}>
      <main className="book-content">
        {readings.length > 0 && (
          <StructuredData
            data={{
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: `${READINGS_TITLE} ${level}`,
              description: `Bài văn tiếng Anh trình độ ${level}, ${readingGrammarScope(level)}.`,
              inLanguage: "vi",
              educationalLevel: level,
              url: absoluteUrl(readingLevelHref(level)),
              isPartOf: { "@type": "Book", name: SITE_NAME, url: absoluteUrl(HOME_HREF) },
            }}
          />
        )}
        <nav className="reading-context" aria-label="Vị trí trong mục bài văn">
          <a href={READINGS_HREF}>← {READINGS_TITLE}</a>
          <span>{capitalize(readingGrammarScope(level))}</span>
        </nav>
        <article className="lesson-markdown">
          <h1>{READINGS_TITLE} {level}</h1>
          {readings.length > 0 ? (
            <>
              <p>
                Các bài văn dưới đây {readingGrammarScope(level)}, nên bạn có
                thể đọc ngay sau khi học xong trình độ {level}.
              </p>
              <ReadingList readings={readings} />
            </>
          ) : (
            <>
              <p>Chưa có bài văn ở trình độ {level}.</p>
              {levelsWithReadings.length > 0 && (
                <p>
                  Hiện đã có bài văn ở trình độ{" "}
                  {levelsWithReadings.map((candidate, index) => (
                    <span key={candidate}>
                      {index > 0 && ", "}
                      <a href={readingLevelHref(candidate)}>{candidate}</a>
                    </span>
                  ))}
                  .
                </p>
              )}
            </>
          )}
        </article>
        <nav className="lesson-neighbors" aria-label="Trình độ lân cận">
          {previous ? (
            <a href={readingLevelHref(previous)}>
              <small>Trình độ trước</small>
              <strong>← {READINGS_TITLE} {previous}</strong>
            </a>
          ) : <span />}
          {next && (
            <a href={readingLevelHref(next)}>
              <small>Trình độ tiếp theo</small>
              <strong>{READINGS_TITLE} {next} →</strong>
            </a>
          )}
        </nav>
        <BookFooter />
      </main>
    </BookChrome>
  );
}

function ReadingNeighbors({ previous, next }: { previous?: BookReading; next?: BookReading }) {
  if (!previous && !next) return null;
  return (
    <nav className="lesson-neighbors" aria-label="Bài văn lân cận">
      {previous ? (
        <a href={readingHref(previous.level, previous.slug)}>
          <small>Bài văn trước · {previous.level}</small>
          <strong>← {previous.title}</strong>
        </a>
      ) : <span />}
      {next && (
        <a href={readingHref(next.level, next.slug)}>
          <small>Bài văn tiếp theo · {next.level}</small>
          <strong>{next.title} →</strong>
        </a>
      )}
    </nav>
  );
}

export function BookReadingPage({ slug }: { slug: string }) {
  const reading = bookReadingBySlug(slug);
  if (!reading) return null;

  const readingIndex = bookReadings.indexOf(reading);

  return (
    <BookChrome activeHref={readingLevelHref(reading.level)}>
      <main className="book-content">
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: reading.title,
            description: reading.summary,
            inLanguage: "en",
            educationalLevel: reading.level,
            learningResourceType: "reading",
            url: absoluteUrl(readingHref(reading.level, reading.slug)),
            isPartOf: { "@type": "Book", name: SITE_NAME, url: absoluteUrl(HOME_HREF) },
          }}
        />
        <nav className="reading-context" aria-label="Vị trí bài văn">
          <span>
            <a href={READINGS_HREF}>{READINGS_TITLE}</a> ›{" "}
            <a href={readingLevelHref(reading.level)}>{reading.level}</a>
          </span>
          <span>{capitalize(readingGrammarScope(reading.level))}</span>
        </nav>
        <MarkdownDocument markdown={reading.markdown} sourcePath={reading.sourcePath} lang="en" />
        <ReadingNeighbors previous={bookReadings[readingIndex - 1]} next={bookReadings[readingIndex + 1]} />
        <BookFooter />
      </main>
    </BookChrome>
  );
}
