'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { Icon, Arrow } from './icons';
import type { PremiumGlyphName } from './PremiumGlyph';

const modes: { id: string; label: string; icon: PremiumGlyphName }[] = [
  { id: 'bus', label: 'Voyager', icon: 'bus' },
  { id: 'hotel', label: 'Séjourner', icon: 'hotel' },
  { id: 'activity', label: 'Sortir', icon: 'activity' },
];

export function AppPreview() {
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
    <div className="phone" aria-label="Aperçu interactif de MboaGo">
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
        <p className="app-greeting">Un départ. Mille possibilités.</p>
        <div className="app-tabs" role="tablist" aria-label="Découvrir les services">
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
              <span>{item.label}</span>
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
              <h3>On vous emmène où ?</h3>
              <div className="app-search">
                <div>
                  <span className="route-point" />
                  <span>
                    <small>Départ</small>
                    <strong>Douala</strong>
                  </span>
                  <span className="route-swap">
                    <Arrow name="repeat" size={17} />
                  </span>
                </div>
                <div>
                  <span className="route-point point-end" />
                  <span>
                    <small>Destination</small>
                    <strong>Yaoundé</strong>
                  </span>
                </div>
                <div className="app-date">
                  <Icon name="calendar" size={19} />
                  <span>Votre prochain départ</span>
                </div>
                <a href="#comment-ca-marche" className="app-search-button">
                  Découvrir le parcours <Arrow size={15} />
                </a>
              </div>
              <div className="app-section-label">
                <strong>Un peu d’inspiration</strong>
                <span>
                  Explorer <Arrow size={11} />
                </span>
              </div>
              <div className="app-mini-image">
                <Image src="/images/kribi.jpg" alt="" fill sizes="240px" />
                <div>
                  <small>ENVIE D’AILLEURS ?</small>
                  <strong>Prochain arrêt : Kribi.</strong>
                </div>
              </div>
            </>
          ) : (
            <>
              <h3>{mode === 'hotel' ? 'Posez vos valises.' : 'Faites-en un souvenir.'}</h3>
              <div className="app-experience-image">
                <Image
                  src={mode === 'hotel' ? '/images/stay.webp' : '/images/discover.webp'}
                  alt={
                    mode === 'hotel'
                      ? 'Un séjour au bord de la piscine'
                      : 'Un moment partagé entre amis'
                  }
                  fill
                  sizes="240px"
                />
                <span>{mode === 'hotel' ? 'Votre prochaine pause' : 'Les meilleurs moments'}</span>
              </div>
              <div className="app-experience-copy">
                <Icon name={mode === 'hotel' ? 'hotel' : 'cinema'} size={34} />
                <div>
                  <strong>
                    {mode === 'hotel' ? 'Un séjour à votre image' : 'À chaque envie, une sortie'}
                  </strong>
                  <small>
                    {mode === 'hotel'
                      ? 'En ville ou au bord de l’eau'
                      : 'Cinéma, loisirs, découvertes'}
                  </small>
                </div>
              </div>
              <a href="#telecharger" className="app-search-button">
                Découvrir MboaGo <Arrow size={15} />
              </a>
            </>
          )}
        </div>
      </div>
      <div className="app-bottom-nav" aria-hidden="true">
        {(
          [
            { icon: 'home', text: 'Accueil' },
            { icon: 'compass', text: 'Explorer' },
            { icon: 'ticket', text: 'Mes billets' },
            { icon: 'profile', text: 'Profil' },
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
