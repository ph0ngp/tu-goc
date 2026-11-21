"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BookTableOfContents } from "./book-toc";
import type { BookSearchEntry } from "./book-search-index.generated";
import { searchTerms } from "../lib/search-normalization.mjs";
import { fileHref, HOME_HREF } from "../lib/site.mjs";

type BookTheme = "light" | "rust" | "coal" | "navy" | "ayu";

const themes: Array<{ id: BookTheme; label: string }> = [
  { id: "light", label: "Sáng" },
  { id: "rust", label: "Rust" },
  { id: "coal", label: "Than" },
  { id: "navy", label: "Navy" },
  { id: "ayu", label: "Ayu" },
];

function initialBookTheme(): BookTheme {
  if (typeof window === "undefined") return "light";
  try {
    const savedTheme = window.localStorage.getItem("tu-goc-theme") as BookTheme | null;
    if (themes.some((candidate) => candidate.id === savedTheme)) return savedTheme as BookTheme;
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "navy" : "light";
}

export function BookChrome({
  activeLessonSlug,
  activeHref,
  children,
}: {
  activeLessonSlug?: string;
  /** Liên kết đang mở trong mục lục khi trang không phải một bài học. */
  activeHref?: string;
  children: ReactNode;
}) {
  const [sidebarState, setSidebarState] = useState<"auto" | "open" | "closed">("auto");
  const [theme, setTheme] = useState<BookTheme>(initialBookTheme);
  const [themeOpen, setThemeOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState<BookSearchEntry[] | null>(null);
  const [searchError, setSearchError] = useState(false);
  const [compactViewport, setCompactViewport] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const updateViewport = () => setCompactViewport(media.matches);
    updateViewport();
    media.addEventListener("change", updateViewport);
    return () => media.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.bookTheme = theme;
    try {
      window.localStorage.setItem("tu-goc-theme", theme);
    } catch {
      // The selected theme still applies for the current page when storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.matches("input, textarea, select, [contenteditable='true']");
      if (!typing && (event.key === "/" || event.key.toLowerCase() === "s")) {
        event.preventDefault();
        setSearchError(false);
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setThemeOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
    if (searchIndex) return;
    let cancelled = false;
    import("./book-search-index.generated")
      .then((module) => module.loadBookSearchIndex())
      .then((entries) => {
        if (!cancelled) setSearchIndex(entries);
      })
      .catch(() => {
        if (!cancelled) setSearchError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [searchIndex, searchOpen]);

  const searchResults = useMemo(() => {
    const terms = searchTerms(deferredQuery);
    if (!terms.length) return [];
    return (searchIndex ?? [])
      .flatMap((entry) => {
        if (!terms.every((term) => entry.text.includes(term))) return [];
        const score = terms.reduce(
          (total, term) => total + (entry.normalizedTitle.startsWith(term) ? 8 : entry.normalizedTitle.includes(term) ? 4 : 1),
          0,
        );
        return [{ entry, score }];
      })
      .sort((left, right) => right.score - left.score)
      .slice(0, 20);
  }, [deferredQuery, searchIndex]);

  const chooseTheme = (nextTheme: BookTheme) => {
    setTheme(nextTheme);
    setThemeOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarState((current) => {
      if (current === "auto") {
        return compactViewport ? "open" : "closed";
      }
      return current === "open" ? "closed" : "open";
    });
  };

  const closeMobileSidebar = () => {
    if (compactViewport) {
      setSidebarState("closed");
    }
  };

  const sidebarHidden = sidebarState === "closed" ||
    (sidebarState === "auto" && compactViewport);

  return (
    <div className={`book-frame sidebar-${sidebarState}`}>
      <header className="book-toolbar">
        <button
          className="toolbar-icon sidebar-toggle"
          type="button"
          onClick={toggleSidebar}
          aria-label="Đóng hoặc mở mục lục"
          aria-controls="book-sidebar"
          aria-expanded={!sidebarHidden}
        >
          <span aria-hidden="true">☰</span>
        </button>

        <a className="book-brand" href={HOME_HREF} aria-label="Về trang giới thiệu">
          <img
            src={fileHref("tu-goc-logo-v3.png")}
            alt=""
            width={34}
            height={34}
            draggable={false}
            loading="eager"
            decoding="async"
          />
          <strong>Từ Gốc</strong>
        </a>

        <div className="toolbar-actions">
          <div className="toolbar-popover-anchor">
            <button
              className="toolbar-icon"
              type="button"
              onClick={() => {
                setThemeOpen((open) => !open);
                setSearchOpen(false);
              }}
              aria-label="Chọn giao diện màu"
              aria-expanded={themeOpen}
            >
              <span aria-hidden="true">◐</span>
            </button>
            {themeOpen && (
              <div className="theme-menu" role="menu" aria-label="Giao diện màu">
                {themes.map((candidate) => (
                  <button
                    className={candidate.id === theme ? "active" : undefined}
                    key={candidate.id}
                    type="button"
                    onClick={() => chooseTheme(candidate.id)}
                    role="menuitemradio"
                    aria-checked={candidate.id === theme}
                  >
                    <span className={`theme-swatch theme-${candidate.id}`} aria-hidden="true" />
                    {candidate.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="toolbar-icon"
            type="button"
            onClick={() => {
              setSearchError(false);
              setSearchOpen((open) => !open);
              setThemeOpen(false);
            }}
            aria-label="Tìm kiếm trong sách"
            aria-expanded={searchOpen}
          >
            <span aria-hidden="true">⌕</span>
          </button>
        </div>
      </header>

      {searchOpen && (
        <section className="book-search" aria-label="Tìm kiếm trong sách">
          <div className="book-search-inner">
            <label htmlFor="book-search-input">Tìm kiếm trong sách</label>
            <div className="book-search-field">
              <input
                id="book-search-input"
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nhập khái niệm, cấu trúc hoặc ví dụ…"
                autoComplete="off"
              />
              <kbd>Esc</kbd>
            </div>
            <div className="book-search-results" aria-live="polite">
              {query && searchResults.length === 0 && (
                <p>{searchError ? "Không thể tải chỉ mục. Hãy đóng tìm kiếm rồi thử lại." : searchIndex ? "Không tìm thấy bài học phù hợp." : "Đang chuẩn bị chỉ mục…"}</p>
              )}
              {searchResults.map((result) => (
                <a
                  key={result.entry.id}
                  href={result.entry.href}
                >
                  <strong>{result.entry.title}</strong>
                  <small>
                    {result.entry.context} · {result.entry.level}
                  </small>
                  {result.entry.excerpt && <span>{result.entry.excerpt}…</span>}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="book-body">
        <aside
          id="book-sidebar"
          className="book-sidebar"
          aria-hidden={sidebarHidden || undefined}
          inert={sidebarHidden || undefined}
        >
          <BookTableOfContents
            activeLessonSlug={activeLessonSlug}
            activeHref={activeHref}
            onNavigate={closeMobileSidebar}
          />
        </aside>
        <div className="book-reading-pane">{children}</div>
      </div>

      <button
        className="sidebar-scrim"
        type="button"
        aria-label="Đóng mục lục"
        onClick={() => setSidebarState("closed")}
      />
    </div>
  );
}
