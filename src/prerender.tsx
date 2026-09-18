import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { LanguageEffects } from './i18n/language';
import { I18nextProvider } from 'react-i18next';
import { createI18n, type Language } from './i18n';
import { renderHead } from './i18n/metadata';
import { site } from './config/site';

export async function render(language: Language) {
  const i18n = await createI18n(language);
  const body = renderToString(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <LanguageEffects />
        <App />
      </I18nextProvider>
    </StrictMode>,
  );
  return {
    body,
    head: renderHead(site, language),
    notFound: i18n.t('notFound', { returnObjects: true }),
  };
}
