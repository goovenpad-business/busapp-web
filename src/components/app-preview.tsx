import { useTranslation } from 'react-i18next';
import { useRef, useState, type KeyboardEvent } from 'react';
import { Icon, Arrow } from './icons';
import type { ParseKeys } from 'i18next';
import type { PremiumGlyphName } from './PremiumGlyph';

const modes: { id: string; label: ParseKeys; icon: PremiumGlyphName }[] = [
  { id: 'bus', label: 'preview.travel', icon: 'bus' },
  { id: 'hotel', label: 'preview.stay', icon: 'hotel' },
  { id: 'activity', label: 'preview.activity', icon: 'activity' },
];

export function AppPreview() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('bus');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % modes.length;
    else if (event.key === 'ArrowLeft') next = (index + modes.length - 1) % modes.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = modes.length - 1;
    else return;
    event.preventDefault();
    setMode(modes[next].id);
    tabs.current[next]?.focus();
  }
  return (
    <div className="phone" aria-label={t('preview.label')}>
      <div className="phone-camera" aria-hidden="true" />
      <div className="phone-status" aria-hidden="true">
        <span>9:41</span>
        <span className="status-dots">
          ▮▮▮ <span className="battery" />
        </span>
      </div>
      <div className="phone-content">
        <div className="app-heading">
          <span>
            MboaGo<span>.</span>
          </span>
          <span className="app-avatar">M</span>
        </div>
        <p className="app-greeting">{t('preview.greeting')}</p>
        <div className="app-tabs" role="tablist" aria-label={t('preview.tabs')}>
          {modes.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              type="button"
              id={`tab-${item.id}`}
              role="tab"
              aria-selected={mode === item.id}
              aria-controls={`panel-${item.id}`}
              tabIndex={mode === item.id ? 0 : -1}
              onKeyDown={(event) => navigate(event, index)}
              onClick={() => setMode(item.id)}
            >
              <Icon name={item.icon} size={30} />
              <span>{t(item.label)}</span>
            </button>
          ))}
        </div>
        <div
          className="app-panel"
          key={mode}
          role="tabpanel"
          id={`panel-${mode}`}
          aria-labelledby={`tab-${mode}`}
          tabIndex={0}
        >
          {mode === 'bus' ? (
            <>
              <h3>{t('preview.where')}</h3>
              <div className="app-search">
                <div>
                  <span className="route-point" />
                  <span>
                    <small>{t('preview.departure')}</small>
                    <strong>Douala</strong>
                  </span>
                  <span className="route-swap">
                    <Arrow name="repeat" size={17} />
                  </span>
                </div>
                <div>
                  <span className="route-point point-end" />
                  <span>
                    <small>{t('preview.destination')}</small>
                    <strong>Yaoundé</strong>
                  </span>
                </div>
                <div className="app-date">
                  <Icon name="calendar" size={19} />
                  <span>{t('preview.nextDeparture')}</span>
                </div>
                <a href="#comment-ca-marche" className="app-search-button">
                  {t('preview.journey')} <Arrow size={15} />
                </a>
              </div>
              <div className="app-section-label">
                <strong>{t('preview.inspiration')}</strong>
                <span>
                  {t('common.explore')} <Arrow size={11} />
                </span>
              </div>
              <div className="app-mini-image">
                <img
                  decoding="async"
                  loading="lazy"
                  src="/images/kribi.jpg"
                  alt=""
                  className="cover-image"
                  sizes="240px"
                />
                <div>
                  <small>{t('preview.escape')}</small>
                  <strong>{t('preview.kribi')}</strong>
                </div>
              </div>
            </>
          ) : (
            <>
              <h3>{mode === 'hotel' ? t('preview.hotelTitle') : t('preview.activityTitle')}</h3>
              <div className="app-experience-image">
                <img
                  decoding="async"
                  loading="lazy"
                  src={mode === 'hotel' ? '/images/stay.webp' : '/images/discover.webp'}
                  alt={mode === 'hotel' ? t('preview.hotelAlt') : t('preview.activityAlt')}
                  className="cover-image"
                  sizes="240px"
                />
                <span>{mode === 'hotel' ? t('preview.nextBreak') : t('preview.bestMoments')}</span>
              </div>
              <div className="app-experience-copy">
                <Icon name={mode === 'hotel' ? 'hotel' : 'cinema'} size={34} />
                <div>
                  <strong>
                    {mode === 'hotel' ? t('preview.yourStay') : t('preview.yourActivity')}
                  </strong>
                  <small>
                    {mode === 'hotel' ? t('preview.hotelDetail') : t('preview.activityDetail')}
                  </small>
                </div>
              </div>
              <a href="#telecharger" className="app-search-button">
                {t('common.discover')} <Arrow size={15} />
              </a>
            </>
          )}
        </div>
      </div>
      <div className="app-bottom-nav" aria-hidden="true">
        {(
          [
            { icon: 'home', text: t('common.home') },
            { icon: 'compass', text: t('common.explore') },
            { icon: 'ticket', text: t('common.tickets') },
            { icon: 'profile', text: t('common.profile') },
          ] as const
        ).map((item) => (
          <span key={item.text}>
            <Icon name={item.icon} size={23} />
            <small>{item.text}</small>
          </span>
        ))}
      </div>
      <div className="phone-home" aria-hidden="true" />
    </div>
  );
}
