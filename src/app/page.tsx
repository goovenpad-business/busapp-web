import Image from 'next/image';
import { ServiceFeatures } from '@/components/service-features';
import { Navigation } from '@/components/navigation';
import { AppPreview } from '@/components/app-preview';
import { Arrow, Brand, Icon } from '@/components/icons';
import { StoreLinks } from '@/components/store-links';
import { Reveal } from '@/components/reveal';
import { destinations, faqs, navigation, site } from '@/config/site';

export default function Home() {
  const available = Boolean(site.appStore || site.googlePlay);
  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <Navigation />
      <main id="contenu">
        <section className="hero container" id="accueil" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <span className="cameroon-dot" /> VOTRE PROCHAINE ENVIE COMMENCE ICI
            </span>
            <h1 id="hero-title">
              Voyagez.
              <br />
              Séjournez.
              <br />
              <span className="highlight">
                Profitez
                <svg aria-hidden="true" viewBox="0 0 335 15">
                  <path d="M4 10Q160 -1 331 8" />
                </svg>
              </span>
              .
            </h1>
            <p className="hero-description">
              Un trajet, une belle adresse, une sortie qui fait du bien.{' '}
              <strong>Tout votre Cameroun, dans une seule app.</strong>
            </p>
            <div className="hero-actions">
              <a className="button button-dark button-large" href="#telecharger">
                {available ? 'Télécharger MboaGo' : 'Découvrir MboaGo'}
                <Arrow name="external" size={20} />
              </a>
              <a className="text-link" href="#decouvrir">
                Et si on partait ? <Arrow size={19} />
              </a>
            </div>
            <div className="hero-note">
              <span className="platform-icons">
                <Arrow name="phone" size={17} />
              </span>
              {available ? 'Retrouvez MboaGo sur votre mobile' : 'Bientôt sur iOS et Android'}
              <span className="note-divider" />
              Pensé pour le Cameroun
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit" aria-hidden="true" />
            <div className="journey-photo">
              <Image
                src="/images/journey.webp"
                alt="Illustration de l’application : un bus sur une route bordée de montagnes et de palmiers"
                fill
                priority
                sizes="(max-width: 600px) 65vw, 370px"
              />
              <div className="journey-photo-label">
                <span>LE BONHEUR EST EN CHEMIN</span>
                <strong>On prend la route ?</strong>
              </div>
            </div>
            <div className="floating-label destination-label">
              <Icon name="location" size={28} />
              <span>
                Direction <strong>les bons moments.</strong>
              </span>
            </div>
            <div className="phone-position">
              <AppPreview />
            </div>
            <div className="floating-label ticket-label">
              <span className="ticket-label-icon">
                <Icon name="ticket" size={29} />
              </span>
              <div>
                <strong>Tout est là.</strong>
                <span>Vos billets, dans votre poche.</span>
              </div>
              <span className="check-dot">
                <Arrow name="check" size={13} />
              </span>
            </div>
            <span className="preview-caption">
              Un petit aperçu. Essayez les onglets <Arrow name="up" size={16} />
            </span>
          </div>
        </section>

        <ServiceFeatures />

        <section className="how-section" id="comment-ca-marche" aria-labelledby="how-title">
          <div className="container how-layout">
            <Reveal className="how-copy">
              <span className="eyebrow">MOINS DE CLICS. PLUS DE DÉCLICS.</span>
              <h2 id="how-title">
                Votre prochaine
                <br />
                escapade tient
                <br />
                dans votre poche<span className="yellow-text">.</span>
              </h2>
              <p>
                Les choses simples font les meilleurs voyages.
                <br />
                On a pensé MboaGo comme ça.
              </p>
              <a className="button button-yellow" href="#telecharger">
                Emportez MboaGo <Arrow name="external" size={19} />
              </a>
            </Reveal>
            <Reveal className="steps">
              {[
                {
                  number: '01',
                  icon: 'search',
                  title: 'Une envie, une destination.',
                  description:
                    'Choisissez où aller, où dormir ou quoi faire. Vos prochaines idées sont réunies au même endroit.',
                },
                {
                  number: '02',
                  icon: 'preferences',
                  title: 'Composez votre moment.',
                  description:
                    'Un horaire qui vous arrange, votre siège préféré, le séjour idéal. C’est vous qui choisissez.',
                },
                {
                  number: '03',
                  icon: 'ticket',
                  title: 'Retrouvez tout. Profitez vraiment.',
                  description:
                    'Votre trajet, votre hôtel, vos activités : l’espace « Mes billets » rassemble vos réservations.',
                },
              ].map((step) => (
                <div className="step" key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <div>
                    <span className="step-icon">
                      <Icon name={step.icon as 'search' | 'preferences' | 'ticket'} size={30} />
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section
          className="section container"
          id="destinations"
          aria-labelledby="destinations-title"
        >
          <Reveal>
            <div className="section-heading">
              <div>
                <span className="eyebrow">PAS BESOIN DE PARTIR LOIN</span>
                <h2 id="destinations-title">
                  L’ailleurs est
                  <br />
                  juste à côté.
                </h2>
              </div>
              <p>
                Une côte à explorer. Une ville à redécouvrir.
                <br />
                Et si votre prochaine histoire commençait ici ?
              </p>
            </div>
          </Reveal>
          <div className="destination-grid">
            {destinations.map((place, index) => (
              <Reveal className={`destination-card destination-${index}`} key={place.name}>
                <a href="#telecharger" aria-label={`Découvrir ${place.name} avec MboaGo`}>
                  <div className="destination-image">
                    <Image
                      src={place.image}
                      alt={`Vue de ${place.name}, au Cameroun`}
                      fill
                      sizes="(max-width: 600px) 78vw, (max-width: 900px) 45vw, 280px"
                    />
                    <span className="destination-tag">{place.tag}</span>
                    <div className="destination-title">
                      <span>{place.category}</span>
                      <h3>{place.name}</h3>
                    </div>
                    <span className="destination-arrow">
                      <Arrow name="external" size={22} />
                    </span>
                  </div>
                  <p>{place.description}</p>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="destination-footer">
            <Icon name="compass" size={23} />
            <p>Le Cameroun se vit autant qu’il se visite.</p>
            <span>À vous de l’explorer.</span>
          </div>
        </section>

        <section className="pocket-section container" aria-labelledby="pocket-title">
          <Reveal className="pocket-layout">
            <div className="pocket-art" aria-hidden="true">
              <span className="pocket-orbit" />
              <div className="wallet-ticket ticket-back">
                <Icon name="hotel" size={35} />
                <strong>Votre séjour</strong>
                <span>Un peu de repos, beaucoup de bonheur.</span>
              </div>
              <div className="wallet-ticket ticket-front">
                <div className="wallet-ticket-header">
                  <Icon name="ticket" size={35} />
                  <span>MES BILLETS</span>
                  <span className="wallet-check">
                    <Arrow name="check" size={18} />
                  </span>
                </div>
                <div className="wallet-route">
                  Douala <Arrow size={24} /> Yaoundé
                </div>
                <p>Le début d’une belle escapade.</p>
                <div className="ticket-perforation" />
                <div className="wallet-ticket-bottom">
                  <span>MboaGo.</span>
                  <span>
                    Et c’est parti <Arrow size={17} />
                  </span>
                </div>
              </div>
              <div className="wallet-icon">
                <Icon name="wallet" size={54} />
              </div>
            </div>
            <div className="pocket-copy">
              <span className="eyebrow">L’ESSENTIEL, TOUJOURS AVEC VOUS</span>
              <h2 id="pocket-title">
                Les souvenirs dans la tête.
                <br />
                Les billets dans l’app.
              </h2>
              <p>
                Fini de chercher partout. Vos trajets, vos séjours et vos activités se retrouvent
                dans un espace unique, clair et facile à consulter.
              </p>
              <ul>
                <li>
                  <span>
                    <Arrow name="check" size={14} />
                  </span>
                  Un espace pour toutes vos réservations
                </li>
                <li>
                  <span>
                    <Arrow name="check" size={14} />
                  </span>
                  Vos voyages à venir, en un coup d’œil
                </li>
                <li>
                  <span>
                    <Arrow name="check" size={14} />
                  </span>
                  Plus de place pour l’imprévu et les bons moments
                </li>
              </ul>
            </div>
          </Reveal>
        </section>

        <section
          className="section container faq-layout"
          id="questions"
          aria-labelledby="faq-title"
        >
          <Reveal>
            <span className="eyebrow">AVANT DE PRENDRE LA ROUTE</span>
            <h2 id="faq-title">
              On vous dit
              <br />
              tout.
            </h2>
            <p className="faq-intro">
              Les réponses aux questions
              <br />
              que vous avez peut-être déjà.
            </p>
            <Icon name="help" size={66} />
          </Reveal>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} name="faq" className="faq-item">
                <summary>
                  <span className="faq-index">0{index + 1}</span>
                  {faq.question}
                  <span className="faq-plus">
                    <Arrow name="plus" size={19} />
                  </span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="download-section container"
          id="telecharger"
          aria-labelledby="download-title"
        >
          <Reveal className="download-card">
            <div className="download-orbit" aria-hidden="true" />
            <span className="download-badge">
              <span /> {available ? 'VOTRE VOYAGE COMMENCE ICI' : 'LE DÉPART APPROCHE'}
            </span>
            <h2 id="download-title">
              La prochaine belle histoire&nbsp;?
              <br />
              <span>La vôtre.</span>
            </h2>
            <p>Un départ. Mille possibilités. Emportez MboaGo.</p>
            <StoreLinks />
            <p className="download-note">
              {available
                ? 'Choisissez votre store pour télécharger l’application.'
                : 'Bientôt disponible sur iOS et Android. On prépare le voyage.'}
            </p>
            <div className="download-float float-bus" aria-hidden="true">
              <Icon name="bus" size={64} />
            </div>
            <div className="download-float float-hotel" aria-hidden="true">
              <Icon name="hotel" size={58} />
            </div>
            <div className="download-float float-activity" aria-hidden="true">
              <Icon name="activity" size={64} />
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>Le Cameroun, à portée de main.</p>
          </div>
          <nav aria-label="Navigation de pied de page">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#accueil" className="back-to-top" aria-label="Revenir en haut de page">
            <Arrow name="up" size={22} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MboaGo. Tous droits réservés.</span>
          <span>Imaginé pour les départs. Et tout ce qui suit.</span>
          <span className="made-for">
            Pensé pour le Cameroun <span className="cameroon-flag" aria-hidden="true" />
          </span>
        </div>
        <p className="prototype-note">
          Application en préparation. Visuels et parcours présentés à titre illustratif.
        </p>
      </footer>
    </>
  );
}
