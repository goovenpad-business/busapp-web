import { useTranslation } from 'react-i18next';
import { serviceModes, type ServiceMode } from '@/config/services';
import { Arrow, Icon } from './icons';
import { ServiceShowcase } from './service-showcase';
import styles from './service-showcase.module.css';
import { InteractiveCard } from './interactive-card';
import type { ParseKeys } from 'i18next';
import type { CSSProperties } from 'react';

type Visual =
  'route' | 'seats' | 'ticket' | 'stay' | 'places' | 'activities' | 'friends' | 'memories';
type Card = { label: ParseKeys; visual: Visual };

const content: Record<ServiceMode, Card[]> = {
  travel: [
    { label: 'cards.labels.route', visual: 'route' },
    { label: 'cards.labels.seat', visual: 'seats' },
    { label: 'cards.labels.ticket', visual: 'ticket' },
  ],
  stay: [
    { label: 'cards.labels.stay', visual: 'stay' },
    { label: 'cards.labels.destination', visual: 'places' },
    { label: 'cards.labels.booking', visual: 'ticket' },
  ],
  activity: [
    { label: 'cards.labels.activities', visual: 'activities' },
    { label: 'cards.labels.friends', visual: 'friends' },
    { label: 'cards.labels.discovery', visual: 'memories' },
  ],
};

function Visual({ kind, mode }: { kind: Visual; mode: ServiceMode }) {
  const { t } = useTranslation();
  if (kind === 'route')
    return (
      <div className="route-card">
        <span className="route-card-top">
          <Icon name="bus" size={24} />
          {t('cards.nextTrip')}
          <span className="small-badge">{t('cards.oneWay')}</span>
        </span>
        <div className="route-cities">
          <strong>Douala</strong>
          <span className="route-line">
            <i />
            <Arrow size={18} />
            <i />
          </span>
          <strong>Yaoundé</strong>
        </div>
        <div className="route-card-bottom">
          <span>
            <Icon name="seat" size={20} /> {t('cards.window')}
          </span>
          <span>{t('cards.choice')}</span>
        </div>
      </div>
    );
  if (kind === 'stay' || kind === 'friends')
    return (
      <div className="feature-photo">
        <img
          decoding="async"
          loading="lazy"
          src={kind === 'stay' ? '/images/stay.webp' : '/images/discover.webp'}
          alt={kind === 'stay' ? t('cards.hotelAlt') : t('cards.friendsAlt')}
          className="cover-image"
          sizes="(max-width: 600px) 85vw, 350px"
        />
        <span>
          <Icon name={kind === 'stay' ? 'hotel' : 'heart'} size={22} />
          {kind === 'stay' ? t('cards.hotelCaption') : t('cards.friendsCaption')}
        </span>
      </div>
    );
  if (kind === 'seats')
    return (
      <div className={styles.seatPreview}>
        <div className={styles.seats} aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} className={index === 2 ? styles.chosenSeat : ''}>
              <Icon name="seat" size={30} />
              {index === 2 && (
                <span className={styles.seatCheck}>
                  <Arrow name="check" size={10} />
                </span>
              )}
            </span>
          ))}
        </div>
        <p>
          <span className={styles.legendDot} />
          {t('cards.favoriteSeat')}
        </p>
      </div>
    );
  if (kind === 'ticket')
    return (
      <div className={styles.ticketPreview}>
        <span className={styles.ticketEyebrow}>
          <Icon name={mode === 'stay' ? 'hotel' : 'ticket'} size={27} />{' '}
          {mode === 'stay' ? t('cards.hotelEyebrow') : t('cards.ticketEyebrow')}{' '}
          <span className={styles.ticketCheck}>
            <Arrow name="check" size={15} />
          </span>
        </span>
        <strong>{mode === 'stay' ? t('cards.doubleRoom') : 'Douala → Yaoundé'}</strong>
        <p>{mode === 'stay' ? t('cards.hotelDetails') : t('cards.tripDetails')}</p>
        <div className={styles.ticketFooter}>
          {mode === 'stay' ? t('cards.hotelFooter') : t('cards.ticketFooter')}
          <Arrow name="phone" size={18} />
        </div>
      </div>
    );
  if (kind === 'places')
    return (
      <div className={styles.placesPreview}>
        <Icon name="location" size={48} />
        <span>{t('cards.address')}</span>
        <div>
          {['Kribi', 'Douala', 'Yaoundé'].map((city) => (
            <span key={city}>{city}</span>
          ))}
        </div>
      </div>
    );
  if (kind === 'memories')
    return (
      <div className={styles.memoryPreview}>
        <img
          decoding="async"
          loading="lazy"
          src="/images/kribi.jpg"
          alt={t('cards.beachAlt')}
          className="cover-image"
          sizes="(max-width: 600px) 85vw, 350px"
        />
        <div>
          <Icon name="compass" size={30} />
          <span>{t('cards.outdoors')}</span>
        </div>
      </div>
    );
  return (
    <div className="activity-tiles">
      {(
        [
          { name: 'cinema', label: t('cards.cinema') },
          { name: 'bowling', label: t('cards.friends') },
          { name: 'activity', label: t('cards.freshAir') },
          { name: 'nightlife', label: t('cards.nightlife') },
        ] as const
      ).map((item) => (
        <div key={item.name}>
          <Icon name={item.name} size={46} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ServiceFeatures() {
  const { t } = useTranslation();
  return (
    <ServiceShowcase
      panels={serviceModes.map((mode) => (
        <div className={styles.cards} key={mode.id}>
          {content[mode.id].map((card, index) => (
            <article
              className={styles.card}
              aria-label={t(card.label)}
              key={card.label}
              style={{ '--card-order': index } as CSSProperties}
            >
              <div className={styles.cardEntrance}>
                <InteractiveCard
                  className={styles.visual}
                  label={t('cards.preview', { label: t(card.label) })}
                >
                  <Visual kind={card.visual} mode={mode.id} />
                </InteractiveCard>
              </div>
            </article>
          ))}
        </div>
      ))}
    />
  );
}
