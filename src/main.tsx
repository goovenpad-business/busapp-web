import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/fonts.css';
import './styles/globals.css';
import { I18nextProvider } from 'react-i18next';
import { createI18n, isLanguage, languageFromPath } from './i18n';
import { LanguageEffects } from './i18n/language';

const root = document.getElementById('root')!;
async function start() {
  const language =
    root.hasChildNodes() && isLanguage(document.documentElement.lang)
      ? document.documentElement.lang
      : languageFromPath(location.pathname);
  const i18n = await createI18n(language);
  const app = (
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <LanguageEffects />
        <App />
      </I18nextProvider>
    </StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
void start();
