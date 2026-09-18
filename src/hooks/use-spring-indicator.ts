import { useCallback, useEffect, useRef } from 'react';

/** Same spring response as the app; pointer tracking bypasses React renders. */
export function useSpringIndicator() {
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const reduced = useRef(false);
  const motion = useRef({ value: 0, target: 0, velocity: 0, time: 0 });

  const write = useCallback((value: number) => {
    motion.current.value = value;
    // Only the pill moves; no inherited CSS variable invalidates the card subtree.
    if (indicatorRef.current)
      indicatorRef.current.style.transform = `translate3d(${value * 100}%, 0, 0)`;
  }, []);

  const follow = useCallback(
    (value: number) => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      motion.current = { value, target: value, velocity: 0, time: 0 };
      write(value);
    },
    [write],
  );

  function tick(time: number) {
    const state = motion.current;
    let elapsed = state.time ? Math.min((time - state.time) / 1000, 0.032) : 1 / 60;
    state.time = time;
    // Small integration steps keep the spring stable on slower mobile frames.
    while (elapsed > 0) {
      const dt = Math.min(elapsed, 1 / 120);
      state.velocity += ((260 * (state.target - state.value) - 23 * state.velocity) / 0.7) * dt;
      state.value += state.velocity * dt;
      elapsed -= dt;
    }
    if (Math.abs(state.value - state.target) < 0.0005 && Math.abs(state.velocity) < 0.005) {
      follow(state.target);
      return;
    }
    write(state.value);
    frame.current = requestAnimationFrame(tick);
  }

  function settle(value: number) {
    if (reduced.current) {
      follow(value);
      return;
    }
    motion.current.target = value;
    if (!frame.current) {
      motion.current.time = 0;
      frame.current = requestAnimationFrame(tick);
    }
  }

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reduced.current = preference.matches;
      if (preference.matches) follow(motion.current.target);
    };
    update();
    preference.addEventListener('change', update);
    return () => {
      cancelAnimationFrame(frame.current);
      preference.removeEventListener('change', update);
    };
  }, [follow]);

  return { indicatorRef, follow, settle };
}
