import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', ...(site.url ? { allow: '/' } : { disallow: '/' }) },
    ...(site.url ? { sitemap: `${site.url.replace(/\/$/, '')}/sitemap.xml` } : {}),
  };
}
