import { Trans, useTranslation } from 'react-i18next';
import { Arrow, Icon } from './icons';
import { InteractiveCard } from './interactive-card';
import { Reveal } from './reveal';
import styles from './shared-moments.module.css';

export function SharedMoments() {
  const { t } = useTranslation();
  return (
    <section
      className={`section container ${styles.section}`}
      id="ensemble"
      aria-labelledby="moments-title"
    >
      <Reveal className={styles.heading}>
        <span className="eyebrow">{t('moments.eyebrow')}</span>
        <h2 id="moments-title">
          {t('moments.titleStart')}
          <br />
          {t('moments.titleEnd')}
          <span className={styles.dot}>.</span>
        </h2>
        <p>{t('moments.description')}</p>
      </Reveal>
      <div className={styles.grid}>
        <Reveal className={styles.story}>
          <article>
            <InteractiveCard label={t('moments.explore.preview')} className={styles.art}>
              <div className={styles.explore}>
                <img
                  className="cover-image"
                  src="/images/kribi.jpg"
                  alt={t('moments.explore.alt')}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.feedTag}>
                  <Icon name="compass" size={23} /> {t('common.explore')}
                </span>
                <div className={styles.feedActions} aria-hidden="true">
                  <Icon name="heart" size={29} />
                  <Arrow name="bookmark" size={23} />
                </div>
                <div className={styles.feedCaption}>
                  <span>{t('moments.explore.tag')}</span>
                  <strong>{t('moments.explore.destination')}</strong>
                  <span>{t('moments.explore.caption')}</span>
                </div>
              </div>
            </InteractiveCard>
            <div className={styles.copy}>
              <h3>{t('moments.explore.title')}</h3>
              <p>
                <Trans i18nKey="moments.explore.description" components={{ strong: <strong /> }} />
              </p>
            </div>
          </article>
        </Reveal>
        <Reveal className={styles.story}>
          <article>
            <InteractiveCard label={t('moments.memories.preview')} className={styles.art}>
              <div className={styles.memories}>
                <figure className={styles.photoBack}>
                  <img
                    src="/images/buea.jpg"
                    alt={t('moments.memories.mountainAlt')}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{t('moments.memories.mountainCaption')}</figcaption>
                </figure>
                <figure className={styles.photoFront}>
                  <img
                    src="/images/stay.webp"
                    alt={t('moments.memories.stayAlt')}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{t('moments.memories.stayCaption')}</figcaption>
                </figure>
                <span className={styles.camera} aria-hidden="true">
                  <Icon name="camera" size={43} />
                </span>
                <span className={styles.memoryTag}>
                  <Icon name="video" size={19} /> {t('moments.memories.tag')}
                </span>
              </div>
            </InteractiveCard>
            <div className={styles.copy}>
              <h3>{t('moments.memories.title')}</h3>
              <p>
                <Trans i18nKey="moments.memories.description" components={{ strong: <strong /> }} />
              </p>
            </div>
          </article>
        </Reveal>
        <Reveal className={styles.story}>
          <article>
            <InteractiveCard label={t('moments.groups.preview')} className={styles.art}>
              <div className={styles.groups}>
                <span className={styles.groupHeading}>
                  <Icon name="groups" size={29} /> {t('moments.groups.invitation')}
                </span>
                <div className={styles.groupRow}>
                  <Icon name="luggage" size={37} />
                  <div>
                    <strong>{t('moments.groups.trip')}</strong>
                    <span>{t('moments.groups.tripDescription')}</span>
                  </div>
                  <span className={styles.avatars} aria-hidden="true">
                    <i>A</i>
                    <i>M</i>
                    <i>J</i>
                  </span>
                </div>
                <div className={styles.groupRow}>
                  <Icon name="bowling" size={37} />
                  <div>
                    <strong>{t('moments.groups.bowling')}</strong>
                    <span>{t('moments.groups.bowlingDescription')}</span>
                  </div>
                  <span className={styles.groupHeart} aria-hidden="true">
                    <Icon name="heart" size={24} />
                  </span>
                </div>
                <div className={styles.groupTags}>
                  <span>{t('moments.groups.travelTag')}</span>
                  <span>{t('moments.groups.activityTag')}</span>
                </div>
              </div>
            </InteractiveCard>
            <div className={styles.copy}>
              <h3>{t('moments.groups.title')}</h3>
              <p>
                <Trans i18nKey="moments.groups.description" components={{ strong: <strong /> }} />
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
