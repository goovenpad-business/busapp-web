import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { i18n } from 'i18next';
import { site } from '@/config/site';
import { isLanguage, languageFromPath, languagePath, type Language } from './index';
import { pageMetadata } from './metadata';

export const LANGUAGE_STORAGE_KEY = 'mboago.language';

function remember(language: Language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    /* Private browsing can disable storage. */
  }
}

export function changeLanguage(instance: i18n, language: Language, replace = false) {
  remember(language);
  const path = languagePath(language);
  if (location.pathname !== path) {
    history[replace ? 'replaceState' : 'pushState'](
      null,
      '',
      `${path}${location.search}${location.hash}`,
    );
  }
  return instance.changeLanguage(language);
}

/** Restore preferences after hydration, then keep browser history and metadata in sync. */
export function LanguageEffects() {
  const { i18n } = useTranslation();
  const language = isLanguage(i18n.resolvedLanguage) ? i18n.resolvedLanguage : 'fr';
  useEffect(() => {
    if (location.pathname === '/') {
      try {
        const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (isLanguage(saved) && saved !== i18n.resolvedLanguage)
          void changeLanguage(i18n, saved, true);
      } catch {
        /* The default French page still works without storage. */
      }
    }
    const onHistory = () => {
      const next = languageFromPath(location.pathname);
      remember(next);
      void i18n.changeLanguage(next);
    };
    window.addEventListener('popstate', onHistory);
    return () => window.removeEventListener('popstate', onHistory);
  }, [i18n]);

  useEffect(() => {
    document.documentElement.lang = language;
    const metadata = pageMetadata(site, language);
    document.title = metadata.title;
    for (const item of metadata.meta) {
      const attr = item.property ? 'property' : 'name';
      const key = item.property ?? item.name!;
      const element =
        document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`) ??
        document.createElement('meta');
      element.setAttribute(attr, key);
      element.content = item.content;
      if (!element.isConnected) document.head.append(element);
    }
    for (const item of metadata.links) {
      const selector = `link[rel="${item.rel}"]${item.hreflang ? `[hreflang="${item.hreflang}"]` : ''}`;
      const element =
        document.head.querySelector<HTMLLinkElement>(selector) ?? document.createElement('link');
      element.rel = item.rel;
      element.href = item.href;
      if (item.hreflang) element.hreflang = item.hreflang;
      if (!element.isConnected) document.head.append(element);
    }
  }, [language]);
  return null;
}
