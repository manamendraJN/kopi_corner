/**
 * Mouse parallax for the hero depth layers: near layers shift more than far ones.
 * Only on devices with a fine pointer. Moves the inner .mp wrappers (transform only),
 * so it never fights the scroll timeline on the outer layers.
 */
import { gsap } from 'gsap';

export function initMouseParallax() {
  const stage = document.querySelector<HTMLElement>('[data-hero-stage]');
  if (!stage || !window.matchMedia('(pointer: fine)').matches) return;

  const layers = Array.from(stage.querySelectorAll<HTMLElement>('[data-depth]')).map((el) => {
    const depth = Number(el.dataset.depth || 0);
    return {
      depth,
      x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
    };
  });

  const onMove = (e: PointerEvent) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    layers.forEach((l) => {
      l.x(-nx * l.depth);
      l.y(-ny * l.depth * 0.5);
    });
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  return () => window.removeEventListener('pointermove', onMove);
}
