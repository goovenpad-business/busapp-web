import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { navigation, site } from '@/config/site';
import { LanguageSelector } from './language-selector';
import { Arrow, Brand } from './icons';

export function Navigation() {
  const { t } = useTranslation();
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
        <nav aria-label={t('navigation.main')} className="desktop-nav">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {t(item.label)}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-pro-link" href={site.management}>
            {t('navigation.professionals')} <Arrow name="external" size={14} />
          </a>
          <LanguageSelector />
          <a className="button button-dark header-cta" href="#telecharger">
            {t('navigation.app')} <Arrow name="external" size={17} />
          </a>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? t('navigation.close') : t('navigation.open')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <Arrow name={open ? 'close' : 'menu'} size={25} />
          </button>
        </div>
      </div>
      <nav
        id="mobile-menu"
        aria-label={t('navigation.mobile')}
        className="mobile-nav"
        hidden={!open}
      >
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {t(item.label)}
            <Arrow size={18} />
          </a>
        ))}
        <a href={site.management} onClick={() => setOpen(false)}>
          {t('navigation.professionals')} <Arrow name="external" size={18} />
        </a>
        <a href="#telecharger" onClick={() => setOpen(false)}>
          {t('navigation.get')} <Arrow name="external" size={18} />
        </a>
      </nav>
    </header>
  );
}
