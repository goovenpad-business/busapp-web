import fr from './locales/fr.json' with { type: 'json' };
import en from './locales/en.json' with { type: 'json' };
import type { Language } from './index.ts';
import type { createSite } from '../config/site-settings.ts';

export const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!,
  );

export function pageMetadata(site: ReturnType<typeof createSite>, language: Language) {
  const copy = (language === 'en' ? en : fr).meta;
  const root = site.url?.replace(/\/$/, '');
  const url = root ? `${root}/${language === 'en' ? 'en/' : ''}` : undefined;
  const image = root ? `${root}/opengraph-image.png` : '/opengraph-image.png';
  const meta: { name?: string; property?: string; content: string }[] = [
    { name: 'description', content: copy.description },
    { name: 'robots', content: root ? 'index,follow' : 'noindex,nofollow' },
    { property: 'og:title', content: copy.title },
    { property: 'og:description', content: copy.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: language === 'en' ? 'en_CM' : 'fr_CM' },
    { property: 'og:locale:alternate', content: language === 'en' ? 'fr_CM' : 'en_CM' },
    { property: 'og:site_name', content: 'MboaGo' },
    { property: 'og:image', content: image },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: copy.imageAlt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: copy.title },
    { name: 'twitter:description', content: copy.description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: copy.imageAlt },
    ...(url ? [{ property: 'og:url', content: url }] : []),
  ];
  const links: { rel: string; href: string; hreflang?: string }[] =
    root && url
      ? [
          { rel: 'canonical', href: url },
          { rel: 'alternate', hreflang: 'fr', href: `${root}/` },
          { rel: 'alternate', hreflang: 'en', href: `${root}/en/` },
          { rel: 'alternate', hreflang: 'x-default', href: `${root}/` },
        ]
      : [];
  return { title: copy.title, meta, links };
}

export function renderHead(site: ReturnType<typeof createSite>, language: Language) {
  const { title, meta, links } = pageMetadata(site, language);
  const attributes = (values: Record<string, string>) =>
    Object.entries(values)
      .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
      .join(' ');
  return [
    `<title>${escapeHtml(title)}</title>`,
    ...meta.map((item) => `<meta ${attributes(item)} />`),
    ...links.map((item) => `<link ${attributes(item)} />`),
  ].join('\n    ');
}
