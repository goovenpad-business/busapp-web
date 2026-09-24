import { Trans, useTranslation } from 'react-i18next';
import { SharedMoments } from '@/components/shared-moments';
import { ServiceFeatures } from '@/components/service-features';
import { Navigation } from '@/components/navigation';
import { AppPreview } from '@/components/app-preview';
import { Arrow, Brand, Icon } from '@/components/icons';
import { StoreLinks } from '@/components/store-links';
import { Reveal } from '@/components/reveal';
import { destinations, faqs, navigation, site } from '@/config/site';

export default function Home() {
  const { t } = useTranslation();
  const available = Boolean(site.appStore || site.googlePlay);
  return (
    <>
      <a href="#contenu" className="skip-link">
        {t('common.skip')}
      </a>
      <Navigation />
      <main id="contenu">
        <section className="hero container" id="accueil" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <span className="cameroon-dot" /> {t('hero.eyebrow')}
            </span>
            <h1 id="hero-title">
              {t('hero.travel')}
              <br />
              {t('hero.stay')}
              <br />
              <span className="highlight">
                {t('hero.enjoy')}
                <svg aria-hidden="true" viewBox="0 0 335 15">
                  <path d="M4 10Q160 -1 331 8" />
                </svg>
              </span>
              .
            </h1>
            <p className="hero-description">
              {t('hero.description')} <strong>{t('hero.promise')}</strong>
            </p>
            <div className="hero-actions">
              <a className="button button-dark button-large" href="#telecharger">
                {available ? t('common.download') : t('common.discover')}
                <Arrow name="external" size={20} />
              </a>
              <a className="text-link" href="#decouvrir">
                {t('hero.letsGo')} <Arrow size={19} />
              </a>
            </div>
            <div className="hero-note">
              <span className="platform-icons">
                <Arrow name="phone" size={17} />
              </span>
              <span>{available ? t('hero.mobile') : t('hero.soon')}</span>
              <span className="note-divider" />
              <span>{t('common.madeFor')}</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit" aria-hidden="true" />
            <div className="journey-photo">
              <img
                decoding="async"
                src="/images/journey.webp"
                alt={t('hero.imageAlt')}
                className="cover-image"
                fetchPriority="high"
                loading="eager"
                sizes="(max-width: 600px) 65vw, 370px"
              />
              <div className="journey-photo-label">
                <span>{t('hero.happiness')}</span>
                <strong>{t('hero.road')}</strong>
              </div>
            </div>
            <div className="floating-label destination-label">
              <Icon name="location" size={28} />
              <span>
                <Trans i18nKey="hero.direction" components={{ strong: <strong /> }} />
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
                <strong>{t('hero.allHere')}</strong>
                <span>{t('hero.pocket')}</span>
              </div>
              <span className="check-dot">
                <Arrow name="check" size={13} />
              </span>
            </div>
          </div>
        </section>

        <ServiceFeatures />

        <section className="how-section" id="comment-ca-marche" aria-labelledby="how-title">
          <div className="container how-layout">
            <Reveal className="how-copy">
              <span className="eyebrow">{t('how.eyebrow')}</span>
              <h2 id="how-title">
                {t('how.trip')}
                <br />
                {t('how.hotel')}
                <br />
                {t('how.activities')}
                <span className="yellow-text">.</span>
              </h2>
              <p>
                {t('how.description')}
                <br />
                {t('how.enjoy')}
              </p>
              <a className="button button-yellow" href="#telecharger">
                {t('how.cta')} <Arrow name="external" size={19} />
              </a>
            </Reveal>
            <Reveal className="steps">
              {[
                {
                  number: '01',
                  icon: 'bus',
                  title: t('how.busTitle'),
                  description: t('how.busDescription'),
                },
                {
                  number: '02',
                  icon: 'hotel',
                  title: t('how.hotelTitle'),
                  description: t('how.hotelDescription'),
                },
                {
                  number: '03',
                  icon: 'activity',
                  title: t('how.activityTitle'),
                  description: t('how.activityDescription'),
                },
              ].map((step) => (
                <div className="step" key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <div>
                    <span className="step-icon">
                      <Icon name={step.icon as 'bus' | 'hotel' | 'activity'} size={30} />
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
                <span className="eyebrow">{t('destinations.eyebrow')}</span>
                <h2 id="destinations-title">
                  {t('destinations.titleStart')}
                  <br />
                  {t('destinations.titleEnd')}
                </h2>
              </div>
              <p>
                {t('destinations.description')}
                <br />
                {t('destinations.invitation')}
              </p>
            </div>
          </Reveal>
          <div className="destination-grid">
            {destinations.map((place, index) => (
              <Reveal className={`destination-card destination-${index}`} key={place.name}>
                <a href="#telecharger" aria-label={t('destinations.link', { place: place.name })}>
                  <div className="destination-image">
                    <img
                      decoding="async"
                      loading="lazy"
                      src={place.image}
                      alt={t('destinations.imageAlt', { place: place.name })}
                      className="cover-image"
                      sizes="(max-width: 600px) 78vw, (max-width: 900px) 45vw, 280px"
                    />
                    <span className="destination-tag">{t(place.tag)}</span>
                    <div className="destination-title">
                      <span>{t(place.category)}</span>
                      <h3>{place.name}</h3>
                    </div>
                    <span className="destination-arrow">
                      <Arrow name="external" size={22} />
                    </span>
                  </div>
                  <p>{t(place.description)}</p>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="destination-footer">
            <Icon name="compass" size={23} />
            <p>{t('destinations.footer')}</p>
            <span>{t('destinations.explore')}</span>
          </div>
        </section>

        <SharedMoments />

        <section
          className="section container faq-layout"
          id="questions"
          aria-labelledby="faq-title"
        >
          <Reveal>
            <span className="eyebrow">{t('faq.eyebrow')}</span>
            <h2 id="faq-title">
              {t('faq.titleStart')}
              <br />
              {t('faq.titleEnd')}
            </h2>
            <p className="faq-intro">
              {t('faq.introStart')}
              <br />
              {t('faq.introEnd')}
            </p>
            <Icon name="help" size={66} />
          </Reveal>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} name="faq" className="faq-item">
                <summary>
                  <span className="faq-index">0{index + 1}</span>
                  {t(faq.question)}
                  <span className="faq-plus">
                    <Arrow name="plus" size={19} />
                  </span>
                </summary>
                <p>{t(faq.answer)}</p>
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
              <span /> {available ? t('download.ready') : t('download.soon')}
            </span>
            <h2 id="download-title">
              {t('download.titleStart')}
              <br />
              <span>{t('download.titleEnd')}</span>
            </h2>
            <p>{t('download.description')}</p>
            <StoreLinks />
            <p className="download-note">
              {available ? t('download.availableNote') : t('download.pendingNote')}
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
        <section className="professionals-section container" aria-labelledby="professionals-title">
          <Reveal className="professionals-card">
            <div className="professionals-emblem" aria-hidden="true">
              <Icon name="briefcase" size={42} />
            </div>
            <div className="professionals-copy">
              <span className="eyebrow">{t('professionals.eyebrow')}</span>
              <h2 id="professionals-title">{t('professionals.title')}</h2>
              <p>{t('professionals.description')}</p>
            </div>
            <a href={site.management} className="button button-dark">
              {t('professionals.cta')} <Arrow name="external" size={19} />
            </a>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>{t('footer.tagline')}</p>
          </div>
          <nav aria-label={t('navigation.footer')}>
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {t(item.label)}
              </a>
            ))}
            <a href={site.management}>{t('navigation.professionals')}</a>
          </nav>
          <a href="#accueil" className="back-to-top" aria-label={t('navigation.top')}>
            <Arrow name="up" size={22} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {t('footer.rights')}
          </span>
          <span>{t('footer.story')}</span>
          <span className="made-for">
            {t('common.madeFor')} <span className="cameroon-flag" aria-hidden="true" />
          </span>
        </div>
        <p className="prototype-note">{t('footer.prototype')}</p>
      </footer>
    </>
  );
}
