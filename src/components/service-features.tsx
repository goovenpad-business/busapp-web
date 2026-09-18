import Image from 'next/image';
import { serviceModes, type ServiceMode } from '@/config/services';
import type { PremiumGlyphName } from './PremiumGlyph';
import { Arrow, Icon } from './icons';
import { ServiceShowcase } from './service-showcase';
import styles from './service-showcase.module.css';

type Visual =
  'route' | 'seats' | 'ticket' | 'stay' | 'places' | 'activities' | 'friends' | 'memories';
type Card = {
  title: string;
  description: string;
  icon: PremiumGlyphName;
  label: string;
  tone: string;
  visual: Visual;
};

const content: Record<ServiceMode, { cards: Card[] }> = {
  travel: {
    cards: [
      {
        title: 'Votre prochain départ est ici.',
        description: 'Trouvez votre trajet et comparez les départs pour voyager à votre rythme.',
        icon: 'bus',
        label: 'VOTRE TRAJET',
        tone: 'travel',
        visual: 'route',
      },
      {
        title: 'La bonne place. La vôtre.',
        description:
          'Fenêtre pour le paysage ou couloir pour bouger ? Choisissez votre siège avant de partir.',
        icon: 'seat',
        label: 'VOTRE CONFORT',
        tone: 'stay',
        visual: 'seats',
      },
      {
        title: 'Un billet. Zéro recherche.',
        description:
          'Retrouvez votre réservation et les détails de votre voyage dans l’espace « Mes billets ».',
        icon: 'ticket',
        label: 'VOTRE BILLET',
        tone: 'activity',
        visual: 'ticket',
      },
    ],
  },
  stay: {
    cards: [
      {
        title: 'Faites comme chez vous. Ailleurs.',
        description:
          'Une escapade en bord de mer ou une parenthèse au calme : trouvez votre prochain pied-à-terre.',
        icon: 'hotel',
        label: 'VOTRE PARENTHÈSE',
        tone: 'stay',
        visual: 'stay',
      },
      {
        title: 'La bonne adresse, au bon endroit.',
        description:
          'Explorez les hébergements de votre destination pour rester près de ce qui vous fait envie.',
        icon: 'location',
        label: 'VOTRE DESTINATION',
        tone: 'travel',
        visual: 'places',
      },
      {
        title: 'Votre séjour, bien rangé.',
        description:
          'Dates, hébergement, voyageurs : les informations de votre réservation vous accompagnent dans l’app.',
        icon: 'luggage',
        label: 'VOTRE RÉSERVATION',
        tone: 'activity',
        visual: 'ticket',
      },
    ],
  },
  activity: {
    cards: [
      {
        title: 'À chaque envie, sa sortie.',
        description:
          'Cinéma, loisirs, grand air ou soirée : découvrez des activités pour changer du quotidien.',
        icon: 'activity',
        label: 'VOTRE INSPIRATION',
        tone: 'activity',
        visual: 'activities',
      },
      {
        title: 'Les bons moments se partagent.',
        description:
          'Retrouvez-vous, essayez quelque chose de nouveau et faites de cette journée un souvenir.',
        icon: 'groups',
        label: 'VOTRE MOMENT',
        tone: 'stay',
        visual: 'friends',
      },
      {
        title: 'Découvrez. Vivez. Recommencez.',
        description:
          'Explorez les expériences partagées dans l’app et trouvez l’inspiration pour votre prochaine sortie.',
        icon: 'compass',
        label: 'VOTRE PROCHAINE IDÉE',
        tone: 'travel',
        visual: 'memories',
      },
    ],
  },
};

function Visual({ kind, mode }: { kind: Visual; mode: ServiceMode }) {
  if (kind === 'route')
    return (
      <div className="route-card">
        <span className="route-card-top">
          <Icon name="bus" size={24} />
          Votre prochain voyage<span className="small-badge">Aller simple</span>
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
            <Icon name="seat" size={20} /> Fenêtre ou couloir ?
          </span>
          <span>À vous de choisir.</span>
        </div>
      </div>
    );
  if (kind === 'stay' || kind === 'friends')
    return (
      <div className="feature-photo">
        <Image
          src={kind === 'stay' ? '/images/stay.webp' : '/images/discover.webp'}
          alt={
            kind === 'stay' ? 'Hôtel avec piscine et palmiers' : 'Une sortie partagée entre amis'
          }
          fill
          sizes="(max-width: 900px) 90vw, 380px"
        />
        <span>
          <Icon name={kind === 'stay' ? 'hotel' : 'heart'} size={22} />
          {kind === 'stay' ? 'Votre parenthèse à vous' : 'Ensemble, c’est encore mieux.'}
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
          Votre place préférée.
        </p>
      </div>
    );
  if (kind === 'ticket')
    return (
      <div className={styles.ticketPreview}>
        <span className={styles.ticketEyebrow}>
          <Icon name={mode === 'stay' ? 'hotel' : 'ticket'} size={27} /> MES BILLETS{' '}
          <span className={styles.ticketCheck}>
            <Arrow name="check" size={15} />
          </span>
        </span>
        <strong>{mode === 'stay' ? 'Votre prochaine pause' : 'Douala → Yaoundé'}</strong>
        <p>{mode === 'stay' ? 'Hébergement · Dates · Voyageurs' : 'Trajet · Départ · Siège'}</p>
        <div className={styles.ticketFooter}>
          Tout est là. Dans votre poche.
          <Arrow name="phone" size={18} />
        </div>
      </div>
    );
  if (kind === 'places')
    return (
      <div className={styles.placesPreview}>
        <Icon name="location" size={48} />
        <span>Votre prochaine adresse ?</span>
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
        <Image
          src="/images/kribi.jpg"
          alt="Une plage bordée de palmiers à Kribi"
          fill
          sizes="(max-width: 900px) 90vw, 380px"
        />
        <div>
          <Icon name="compass" size={30} />
          <span>Et si on sortait des habitudes ?</span>
        </div>
      </div>
    );
  return (
    <div className="activity-tiles">
      {(
        [
          { name: 'cinema', label: 'Un bon film' },
          { name: 'bowling', label: 'Entre amis' },
          { name: 'activity', label: 'Au grand air' },
          { name: 'nightlife', label: 'Après le sunset' },
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
  return (
    <ServiceShowcase
      panels={serviceModes.map((mode) => {
        const current = content[mode.id];
        return (
          <div key={mode.id}>
            <div className={`feature-grid ${styles.cards}`}>
              {current.cards.map((card, index) => (
                <article className={`feature feature-${card.tone} ${styles.card}`} key={card.label}>
                  <div className="feature-top">
                    <span className="feature-icon">
                      <Icon name={card.icon} size={40} />
                    </span>
                    <span className="feature-number">
                      0{index + 1} / {card.label}
                    </span>
                  </div>
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                  <div className={styles.visual}>
                    <Visual kind={card.visual} mode={mode.id} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    />
  );
}
