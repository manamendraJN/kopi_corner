/**
 * Scene 3: stacking cards. As each card rises over the one before,
 * the covered card shrinks slightly and darkens (cards are inset, so no side seams show).
 */
import { gsap } from 'gsap';

export function initProof() {
  const root = document.querySelector<HTMLElement>('[data-scene="proof"]');
  if (!root) return;
  const cards = gsap.utils.toArray<HTMLElement>('[data-card]', root);

  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    const shade = card.querySelector('[data-card-shade]');
    const scrollTrigger = { trigger: next, start: 'top bottom', end: 'top 25%', scrub: 0.4 };
    gsap.fromTo(card, { scale: 1 }, { scale: 0.94, ease: 'none', scrollTrigger });
    if (shade) gsap.fromTo(shade, { opacity: 0 }, { opacity: 0.45, ease: 'none', scrollTrigger: { ...scrollTrigger } });
  });
}
