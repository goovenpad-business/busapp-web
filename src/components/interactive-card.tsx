import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';
import styles from './interactive-card.module.css';

/** A light, tactile lift. Pointer feedback never captures a swipe or blocks scrolling. */
export function InteractiveCard({
  children,
  label,
  className = '',
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const bounds = useRef<DOMRect | null>(null);
  const frame = useRef(0);
  const reducedMotion = useRef(false);

  function reset() {
    cancelAnimationFrame(frame.current);
    if (!ref.current) return;
    ref.current.dataset.engaged = 'false';
    ref.current.style.setProperty('--tilt-x', '0deg');
    ref.current.style.setProperty('--tilt-y', '0deg');
    bounds.current = null;
  }

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reducedMotion.current = preference.matches;
      reset();
    };
    update();
    preference.addEventListener('change', update);
    window.addEventListener('pointerup', reset);
    window.addEventListener('pointercancel', reset);
    window.addEventListener('blur', reset);
    return () => {
      cancelAnimationFrame(frame.current);
      preference.removeEventListener('change', update);
      window.removeEventListener('pointerup', reset);
      window.removeEventListener('pointercancel', reset);
      window.removeEventListener('blur', reset);
    };
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || reducedMotion.current) return;
    const element = ref.current;
    if (!element) return;
    const rect = (bounds.current ??= element.getBoundingClientRect());
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty('--tilt-x', `${-y * 3}deg`);
      element.style.setProperty('--tilt-y', `${x * 3}deg`);
    });
  }

  return (
    <div
      ref={ref}
      className={`${styles.card} ${className}`}
      role="group"
      aria-label={label}
      tabIndex={0}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        event.currentTarget.dataset.engaged = 'true';
        move(event);
      }}
      onPointerMove={move}
      onPointerLeave={reset}
      onLostPointerCapture={reset}
      onBlur={reset}
    >
      <div className={styles.surface}>{children}</div>
    </div>
  );
}
