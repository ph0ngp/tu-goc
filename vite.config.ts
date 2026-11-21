import vinext from "vinext";
import { defineConfig, type Plugin } from "vite";
import { BASE_PATH } from "./lib/site.mjs";

// Khi chạy `vinext dev`, bộ xử lý RSC đọc lại `originalUrl` (vẫn còn BASE_PATH)
// nên không thấy trang. Plugin này bỏ tiền tố khỏi `originalUrl` của các trang;
// `url` giữ nguyên để module và tệp tĩnh của Vite vẫn đi qua `base`.
function devPagesUnderBasePath(): Plugin {
  const pagePrefix = new RegExp(`^${BASE_PATH}(?=/(?:$|\\?|ngu-phap/|bai-van/))`);
  return {
    name: "tu-goc:dev-pages-under-base-path",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        const original = (request as { originalUrl?: string }).originalUrl ?? request.url;
        if (original && pagePrefix.test(original)) {
          (request as { originalUrl?: string }).originalUrl = original.replace(pagePrefix, "");
        }
        next();
      });
    },
  };
}

// GitHub Pages phục vụ website trong thư mục con `BASE_PATH`. Không dùng
// `basePath` của Next vì bước prerender của vinext gọi route không kèm tiền tố
// đó; thay vào đó chỉ đặt `base` cho tệp tĩnh, còn liên kết trang đi qua
// lib/site.mjs.
export default defineConfig({
  base: `${BASE_PATH}/`,
  plugins: [devPagesUnderBasePath(), vinext()],
});
