import { useTranslation } from 'react-i18next';
import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { serviceModes } from '@/config/services';
import { useSpringIndicator } from '@/hooks/use-spring-indicator';
import { Icon } from './icons';
import styles from './service-showcase.module.css';

type Gesture = {
  pointerId: number;
  x: number;
  y: number;
  origin: number;
  surface: 'tabs' | 'content';
  dragging: boolean;
  bounds: DOMRect;
};

const clamp = (value: number) => Math.max(0, Math.min(serviceModes.length - 1, value));

export function ServiceShowcase({ panels }: { panels: ReactNode[] }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const { indicatorRef, follow, settle: settleIndicator } = useSpringIndicator();
  const [announced, setAnnounced] = useState<number | null>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);

  function select(index: number, announce = true, settle = true) {
    const next = clamp(index);
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
    if (settle) settleIndicator(next);
    if (announce) setAnnounced(next);
  }

  function keyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % serviceModes.length;
    else if (event.key === 'ArrowLeft')
      next = (index + serviceModes.length - 1) % serviceModes.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = serviceModes.length - 1;
    else return;
    event.preventDefault();
    select(next);
    buttons.current[next]?.focus({ preventScroll: true });
  }

  function pointerDown(event: PointerEvent<HTMLDivElement>, surface: Gesture['surface']) {
    if (!event.isPrimary || event.button !== 0 || gesture.current) return;
    suppressClick.current = false;
    if (surface === 'content' && (event.target as HTMLElement).closest('a, button, input, summary'))
      return;
    gesture.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      origin: activeRef.current,
      surface,
      dragging: false,
      bounds: event.currentTarget.getBoundingClientRect(),
    };
  }

  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (!current.dragging) {
      // Let the browser own vertical scrolling; a tap is still an ordinary button click.
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        gesture.current = null;
        return;
      }
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      current.dragging = true;
      setDragging(true);
      suppressClick.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const bounds = current.bounds;
    const position =
      current.surface === 'tabs'
        ? (event.clientX - bounds.left - 4) / ((bounds.width - 8) / serviceModes.length) - 0.5
        : current.origin - dx / Math.min(180, Math.max(90, bounds.width * 0.3));
    follow(clamp(position));
    select(Math.round(clamp(position)), false, false);
  }

  function finish(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    gesture.current = null;
    setDragging(false);
    if (current.dragging) {
      select(cancelled ? current.origin : activeRef.current);
      if (!cancelled && current.surface === 'tabs')
        buttons.current[activeRef.current]?.focus({ preventScroll: true });
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  const pointerEvents = {
    onPointerMove: pointerMove,
    onPointerUp: (event: PointerEvent<HTMLDivElement>) => finish(event),
    onPointerCancel: (event: PointerEvent<HTMLDivElement>) => finish(event, true),
    onLostPointerCapture: (event: PointerEvent<HTMLDivElement>) => {
      // Touch starts with implicit capture on the pressed icon/button. Its bubbling
      // lost-capture event is expected when we transfer capture to this surface.
      if (event.target === event.currentTarget) finish(event, true);
    },
  };

  return (
    <div className={styles.showcase} data-dragging={dragging}>
      <div className="container">
        <div className={styles.strip}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label={t('services.tabs')}
            onPointerDown={(event) => pointerDown(event, 'tabs')}
            {...pointerEvents}
          >
            <span ref={indicatorRef} className={styles.indicator} aria-hidden="true" />
            {serviceModes.map((mode, index) => (
              <button
                key={mode.id}
                ref={(element) => {
                  buttons.current[index] = element;
                }}
                className={styles.tab}
                type="button"
                role="tab"
                id={`service-tab-${mode.id}`}
                aria-controls={`service-panel-${mode.id}`}
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                onKeyDown={(event) => keyDown(event, index)}
                onClick={(event) => {
                  if (suppressClick.current && event.detail !== 0) {
                    event.preventDefault();
                    suppressClick.current = false;
                    return;
                  }
                  select(index);
                }}
              >
                <Icon name={mode.icon} size={36} />
                <span className={styles.tabCopy}>
                  <span>{t(mode.label)}</span>
                  <small>{t(mode.category)}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <section
        className={`section container ${styles.section}`}
        id="decouvrir"
        aria-label={t('services.label')}
      >
        <div
          className={styles.panels}
          onPointerDown={(event) => pointerDown(event, 'content')}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={(event) => {
            if (suppressClick.current && event.detail !== 0) {
              event.preventDefault();
              event.stopPropagation();
              suppressClick.current = false;
            }
          }}
          {...pointerEvents}
        >
          {serviceModes.map((mode, index) => (
            <div
              className={styles.panel}
              key={mode.id}
              role="tabpanel"
              id={`service-panel-${mode.id}`}
              aria-labelledby={`service-tab-${mode.id}`}
              aria-hidden={active !== index}
              inert={active !== index}
              tabIndex={active === index ? 0 : -1}
              data-active={active === index}
              style={{ '--panel-side': Math.sign(index - active) } as CSSProperties}
            >
              {panels[index]}
            </div>
          ))}
        </div>
      </section>
      <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">
        {announced !== null &&
          t('services.announcement', { service: t(serviceModes[announced].announcement) })}
      </p>
    </div>
  );
}
