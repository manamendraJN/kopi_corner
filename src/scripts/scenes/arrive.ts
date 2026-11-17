/**
 * Scenes 5–6.
 * Ease: the example WhatsApp message "sends" (rises and settles) and the counter docket slides in.
 * Invitation: rises over the Ease scene, which sinks back and darkens; "See you tomorrow." lifts into place.
 */
import { gsap } from 'gsap';

export function initEase() {
  const root = document.querySelector<HTMLElement>('[data-scene="ease"]');
  if (!root) return;
  const bubble = root.querySelector('[data-bubble]');
  const docket = root.querySelector('[data-docket]');

  if (bubble) {
    gsap.fromTo(
      bubble,
      { y: 40, scale: 0.92, opacity: 0.001, transformOrigin: '100% 100%' },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: bubble, start: 'top 95%', end: 'top 65%', scrub: 0.4 },
      },
    );
  }
  if (docket) {
    gsap.fromTo(
      docket,
      { y: 60, rotation: 5 },
      {
        y: 0,
        rotation: () => (window.innerWidth >= 900 ? -2 : 1.5),
        ease: 'power2.out',
        scrollTrigger: { trigger: docket, start: 'top bottom', end: 'top 60%', scrub: 0.4, invalidateOnRefresh: true },
      },
    );
  }
}

export function initInvitation() {
  const root = document.querySelector<HTMLElement>('[data-scene="invite"]');
  if (!root) return;

  // The previous scene sinks back and darkens as this one rises over it.
  const prevInner = document.querySelector<HTMLElement>('[data-ease-inner]');
  const prevShade = document.querySelector<HTMLElement>('[data-ease-shade]');
  const handover = { trigger: root, start: 'top bottom', end: 'top top', scrub: true };
  if (prevInner) {
    gsap.fromTo(prevInner, { y: 0 }, { y: () => window.innerHeight * 0.3, ease: 'none', scrollTrigger: { ...handover, invalidateOnRefresh: true } });
  }
  if (prevShade) {
    gsap.fromTo(prevShade, { opacity: 0 }, { opacity: 0.55, ease: 'none', scrollTrigger: { ...handover } });
  }

  // "See you / tomorrow." lifts into place, line by line, in reading order.
  const words = gsap.utils.toArray<HTMLElement>('[data-word]', root);
  words.forEach((w, i) => {
    gsap.fromTo(
      w,
      { yPercent: 105 },
      {
        yPercent: 0,
        ease: 'power2.out',
        scrollTrigger: { trigger: root, start: `top ${85 - i * 8}%`, end: `top ${45 - i * 8}%`, scrub: 0.5 },
      },
    );
  });
}
