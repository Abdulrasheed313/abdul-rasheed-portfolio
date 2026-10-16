import { useEffect, useRef } from 'react';

// Desktop-only soft glow that follows the pointer. Uses transform
// updates via rAF so it does not trigger React re-renders.
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || reduced || !ref.current) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let frame = 0;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          if (ref.current) ref.current.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
          frame = 0;
        });
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[400px] w-[400px] rounded-full bg-neon-purple/10 blur-3xl lg:block"
    />
  );
}
