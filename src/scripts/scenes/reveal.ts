/**
 * Small scroll reveals for inner pages: [data-reveal] blocks rise into place in reading order.
 * Scrubbed with fromTo() so scrolling back reverses cleanly.
 */
import { gsap } from 'gsap';

export function initReveals() {
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  items.forEach((el) => {
    // Anything already on screen when the page opens stays put: all first-screen text is readable at once.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
    gsap.fromTo(
      el,
      { y: 36, opacity: 0.001 },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 70%', scrub: 0.5 },
      },
    );
  });
}
