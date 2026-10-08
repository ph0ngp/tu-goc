/** Điểm vào Cloudflare Worker của Từ Gốc. */
import handler from "vinext/server/app-router-entry";
import { legacyRedirects } from "./legacy-redirects.generated";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "img-src 'self' data:",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
].join("; ");

export function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", contentSecurityPolicy);
  headers.set("Permissions-Policy", "camera=(), geolocation=(), microphone=()");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    const legacyMatch = url.pathname.match(/^\/bai-hoc\/([^/]+)\/?$/);
    if (legacyMatch) {
      const legacyId = decodeURIComponent(legacyMatch[1]);
      const canonicalSlug = legacyRedirects[legacyId];
      if (canonicalSlug) {
        return withSecurityHeaders(
          Response.redirect(new URL(`/ngu-phap/${canonicalSlug}`, url), 308),
        );
      }
    }

    return withSecurityHeaders(await handler.fetch(request, env, ctx));
  },
};

export default worker;
