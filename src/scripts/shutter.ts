/**
 * Page transitions in the cafe's own language: a shutter rolls down, the next page loads,
 * and the shutter rolls up again. Skipped entirely with reduced motion.
 */
import { gsap } from 'gsap';

export function setupShutter(motionOK: () => boolean) {
  const el = () => document.querySelector<HTMLElement>('[data-page-shutter]');
  let closed = false;

  document.addEventListener('astro:before-preparation', (event) => {
    const shutter = el();
    if (!shutter || !motionOK()) return;
    const original = event.loader;
    event.loader = async () => {
      closed = true;
      const down = new Promise<void>((resolve) => {
        gsap.fromTo(
          shutter,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0, duration: 0.5, ease: 'power2.inOut', onComplete: resolve },
        );
      });
      await Promise.all([down, original()]);
    };
  });

  document.addEventListener('astro:page-load', () => {
    const shutter = el();
    if (!shutter || !closed) return;
    closed = false;
    gsap.fromTo(
      shutter,
      { yPercent: 0 },
      { yPercent: -100, duration: 0.65, delay: 0.05, ease: 'power2.inOut', onComplete: () => gsap.set(shutter, { visibility: 'hidden' }) },
    );
  });
}
