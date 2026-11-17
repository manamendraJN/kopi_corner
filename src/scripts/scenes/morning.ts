/**
 * About page: "A morning at Kopi Corner" — a horizontal walk through the hours.
 * Desktop only (phones get a vertical timeline). The light behind the cards warms
 * from dawn blue to amber as the morning passes.
 */
import { gsap } from 'gsap';

export function initMorning() {
  const root = document.querySelector<HTMLElement>('[data-scene="morning"]');
  if (!root) return;
  const pinEl = root.querySelector<HTMLElement>('[data-morning-pin]')!;
  const strip = root.querySelector<HTMLElement>('[data-strip]')!;
  const dawn = root.querySelector<HTMLElement>('[data-morning-dawn]');

  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    const distance = () => Math.max(0, strip.scrollWidth - pinEl.clientWidth);
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: pinEl,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });
    tl.fromTo(strip, { x: 0 }, { x: () => -distance(), duration: 1 }, 0);
    if (dawn) tl.fromTo(dawn, { opacity: 1 }, { opacity: 0, duration: 0.7 }, 0);
  });
  return () => mm.revert();
}
