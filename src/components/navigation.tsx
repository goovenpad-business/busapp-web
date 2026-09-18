'use client';

import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/config/site';
import { Arrow, Brand } from './icons';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav aria-label="Navigation principale" className="desktop-nav">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button-dark header-cta" href="#telecharger">
          L’application <Arrow name="external" size={17} />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <Arrow name={open ? 'close' : 'menu'} size={25} />
        </button>
      </div>
      <nav id="mobile-menu" aria-label="Navigation mobile" className="mobile-nav" hidden={!open}>
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
            <Arrow size={18} />
          </a>
        ))}
        <a href="#telecharger" onClick={() => setOpen(false)}>
          Obtenir MboaGo <Arrow name="external" size={18} />
        </a>
      </nav>
    </header>
  );
}
