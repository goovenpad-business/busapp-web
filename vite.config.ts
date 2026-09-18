import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { createSite } from './src/config/site-settings.ts';

import { renderHead, escapeHtml } from './src/i18n/metadata.ts';

function metadata(site: ReturnType<typeof createSite>): Plugin {
  const root = site.url?.replace(/\/$/, '');
  return {
    name: 'mboago-static-metadata',
    transformIndexHtml: (html, context) => {
      const language = /^\/en(?:\/|$)/.test(context.path) ? 'en' : 'fr';
      return html
        .replace('<html lang="fr">', `<html lang="${language}">`)
        .replace(
          '<!--site-head-->',
          `<!--localized-head:start-->${renderHead(site, language)}<!--localized-head:end-->`,
        );
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\n${root ? `Allow: /\nSitemap: ${root}/sitemap.xml` : 'Disallow: /'}\n`,
      });
      const alternates = root
        ? ['fr', 'en']
            .map(
              (language) =>
                `<xhtml:link rel="alternate" hreflang="${language}" href="${escapeHtml(`${root}/${language === 'en' ? 'en/' : ''}`)}" />`,
            )
            .join('')
        : '';
      const urls = root
        ? ['', 'en/']
            .map(
              (path) =>
                `<url><loc>${escapeHtml(`${root}/${path}`)}</loc>${alternates}<changefreq>monthly</changefreq><priority>1</priority></url>`,
            )
            .join('')
        : '';
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_']);
  // Existing .env.local files remain compatible; only these three public values are exposed.
  const publicEnv = Object.fromEntries(
    ['SITE_URL', 'APP_STORE_URL', 'GOOGLE_PLAY_URL'].map((key) => [
      `VITE_${key}`,
      env[`VITE_${key}`] ?? env[`NEXT_PUBLIC_${key}`] ?? '',
    ]),
  );
  return {
    plugins: [react(), metadata(createSite(publicEnv))],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    define: Object.fromEntries(
      Object.entries(publicEnv).map(([key, value]) => [
        `import.meta.env.${key}`,
        JSON.stringify(value),
      ]),
    ),
    server: { port: 3000, strictPort: true },
    preview: { port: 3000, strictPort: true },
  };
});
