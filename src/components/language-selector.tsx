import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/i18n/language';
import { languages, type Language } from '@/i18n';
import { Arrow, Icon } from './icons';

const labels: Record<Language, string> = { fr: 'Français', en: 'English' };

export function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'en' ? 'en' : 'fr';
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const initialFocus = useRef(0);

  useEffect(() => {
    if (!open) return;
    options.current[initialFocus.current]?.focus({ preventScroll: true });
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  function show(index = languages.indexOf(language)) {
    initialFocus.current = index;
    setOpen(true);
  }

  function close() {
    trigger.current?.focus({ preventScroll: true });
    setOpen(false);
  }

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    const index = options.current.findIndex((option) => option === event.target);
    let next: number | undefined;
    if (event.key === 'ArrowDown') next = (index + 1) % languages.length;
    if (event.key === 'ArrowUp') next = (index - 1 + languages.length) % languages.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = languages.length - 1;
    if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
      const match = languages.findIndex((value) =>
        labels[value].toLowerCase().startsWith(event.key.toLowerCase()),
      );
      if (match !== -1) next = match;
    }
    if (next !== undefined) {
      event.preventDefault();
      options.current[next]?.focus({ preventScroll: true });
    }
  }

  return (
    <div
      className="language-selector"
      ref={container}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (!open) return;
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          close();
        }
        // Let the browser move to the next/previous control from the trigger.
        if (event.key === 'Tab') close();
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="language-trigger"
        aria-label={`${t('language.label')} : ${labels[language]}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? close() : show())}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            show(event.key === 'ArrowDown' ? 0 : languages.length - 1);
          }
        }}
      >
        <Icon name="language" size={21} />
        <span lang={language}>{labels[language]}</span>
        <Arrow name="down" size={12} />
      </button>
      {open && (
        <div className="language-popover">
          <p className="language-caption" aria-hidden="true">
            {t('language.label')}
          </p>
          <div id={menuId} role="menu" aria-label={t('language.label')} onKeyDown={navigate}>
            {languages.map((value, index) => (
              <button
                key={value}
                ref={(element) => {
                  options.current[index] = element;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={language === value}
                lang={value}
                tabIndex={-1}
                className="language-option"
                onClick={() => {
                  close();
                  void changeLanguage(i18n, value);
                }}
              >
                <span className="language-code" aria-hidden="true">
                  {value.toUpperCase()}
                </span>
                <span>{labels[value]}</span>
                {language === value && (
                  <span className="language-check">
                    <Arrow name="check" size={14} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
