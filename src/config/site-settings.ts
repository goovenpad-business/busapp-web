import fr from '../i18n/locales/fr.json' with { type: 'json' };
function httpsUrl(value: string | undefined, hosts?: string[]) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (!hosts || hosts.includes(url.hostname))
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export function createSite(env: Record<string, string | undefined>) {
  return {
    name: 'MboaGo',
    management: httpsUrl(env.VITE_MANAGEMENT_URL) ?? 'https://mboago-management.goovenpad.com/',
    title: fr.meta.title,
    description: fr.meta.description,
    url: httpsUrl(env.VITE_SITE_URL),
    appStore: httpsUrl(env.VITE_APP_STORE_URL, ['apps.apple.com']),
    googlePlay: httpsUrl(env.VITE_GOOGLE_PLAY_URL, ['play.google.com']),
  };
}
