import { site } from '@/config/site';
import { Arrow } from './icons';

export function StoreLinks({ inverse = false }: { inverse?: boolean }) {
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
              <small>{store.url ? 'Télécharger sur' : 'Bientôt sur'}</small>
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
            aria-label={`Télécharger MboaGo sur ${store.name} (nouvel onglet)`}
          >
            {content}
          </a>
        ) : (
          <div
            key={store.name}
            className="store-link store-pending"
            aria-label={`MboaGo pour ${store.platform}, bientôt disponible`}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
