import { useTranslation } from 'react-i18next';
import { site } from '@/config/site';
import { Arrow } from './icons';

export function StoreLinks({ inverse = false }: { inverse?: boolean }) {
  const { t } = useTranslation();
  return (
    <div className={`store-links${inverse ? ' store-links-inverse' : ''}`}>
      {[
        { name: 'App Store', platform: 'iOS', url: site.appStore },
        { name: 'Google Play', platform: 'Android', url: site.googlePlay },
      ].map((store) => {
        const content = (
          <>
            <Arrow name="phone" size={27} />
            <span>
              <small>{store.url ? t('store.download') : t('store.soon')}</small>
              <strong>{store.name}</strong>
            </span>
            {store.url && <Arrow name="external" size={16} />}
          </>
        );
        return store.url ? (
          <a
            key={store.name}
            className="store-link"
            href={store.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('store.link', { store: store.name })}
          >
            {content}
          </a>
        ) : (
          <div
            key={store.name}
            className="store-link store-pending"
            aria-label={t('store.pending', { platform: store.platform })}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
