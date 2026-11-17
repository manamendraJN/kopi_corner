/**
 * Scene 4 — the signature moment.
 * For each menu line: a wisp of steam leaves the cup, drifts up to the board,
 * stretches flat like a chalk stroke and fades as the line is written left to right.
 * Lines are written strictly top to bottom; scrolling back un-writes them in reverse.
 */
import { gsap } from 'gsap';

export function initOffer() {
  const root = document.querySelector<HTMLElement>('[data-scene="offer"]');
  if (!root) return;
  const track = root.querySelector<HTMLElement>('[data-offer-track]')!;
  const origin = root.querySelector<HTMLElement>('[data-steam-origin]')!;
  const lines = gsap.utils.toArray<HTMLElement>('[data-line]', root);
  const wisps = gsap.utils.toArray<SVGElement>('[data-wisp]', root);

  const delta = (i: number) => {
    const o = origin.getBoundingClientRect();
    const l = lines[i].getBoundingClientRect();
    return {
      x: l.left + Math.min(l.width * 0.22, 120) - o.left,
      y: l.top + l.height / 2 - o.top,
    };
  };

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: track,
      start: 'top 35%',
      end: 'bottom bottom',
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });

  lines.forEach((line, i) => {
    const wisp = wisps[i];
    const mask = line.querySelector('[data-mask]');
    const inner = line.querySelector('[data-mask-inner]');
    const t = i * 1;

    if (wisp) {
      tl.fromTo(
        wisp,
        { x: 0, y: 0, scaleX: 0.8, scaleY: 0.8, rotation: 0 },
        {
          x: () => delta(i).x,
          y: () => delta(i).y,
          scaleX: 2.8,
          scaleY: 0.22,
          rotation: -8,
          duration: 0.85,
          ease: 'power1.inOut',
        },
        t,
      );
      tl.fromTo(wisp, { opacity: 0 }, { opacity: 0.9, duration: 0.25 }, t);
      tl.fromTo(wisp, { opacity: 0.9 }, { opacity: 0, duration: 0.3, immediateRender: false }, t + 0.65);
    }
    tl.fromTo(mask, { xPercent: -101 }, { xPercent: 0, duration: 0.5, ease: 'power1.out' }, t + 0.55);
    tl.fromTo(inner, { xPercent: 101 }, { xPercent: 0, duration: 0.5, ease: 'power1.out' }, t + 0.55);
  });
  tl.set({}, {}, lines.length + 0.6);

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}
