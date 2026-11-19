/**
 * Scenes 1–2: the cafe wakes up as you scroll.
 * One scrubbed timeline over the hero track (story = first 2 units, handover = last unit).
 * Every tween is fromTo() with explicit values so scrolling back reverses exactly.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initHero() {
  const root = document.querySelector<HTMLElement>('[data-scene="hero"]');
  if (!root) return;
  const q = gsap.utils.selector(root);
  const track = root.querySelector<HTMLElement>('[data-hero-track]')!;

  // Keep the illustration below the words: tell the CSS where the text block ends,
  // so on short phone screens the cafe sizes itself to the room that is left.
  const copy = root.querySelector<HTMLElement>('.hero-copy');
  const setCopyEnd = () => {
    if (copy) root.style.setProperty('--copy-end', `${copy.offsetTop + copy.offsetHeight}px`);
  };
  setCopyEnd();
  const ro = copy ? new ResizeObserver(setCopyEnd) : null;
  if (copy) ro?.observe(copy);
  window.addEventListener('resize', setCopyEnd);

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });

  // --- Scene 1: the hook fades as the street begins to wake
  tl.fromTo(q('[data-scroll-cue]'), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.12 }, 0);
  // the sun rises through the haze in clear sky (never behind a building or the tree)
  tl.fromTo(q('[data-sun]'), { y: () => window.innerHeight * 0.12 }, { y: 0, duration: 1.3, ease: 'power1.out' }, 0);
  tl.fromTo(q('[data-sun]'), { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0.05);
  // the sky passes through sunrise (blue -> peach -> gold), never through grey
  tl.fromTo(q('[data-sky-rise]'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.08);
  tl.fromTo(q('[data-sky-day]'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.3);
  tl.fromTo(q('[data-dawn]'), { opacity: 1 }, { opacity: 0, duration: 0.6 }, 0.12);
  tl.fromTo(q('[data-copy-a]'), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: () => -window.innerHeight * 0.06, duration: 0.16 }, 0.18);

  // --- Scene 2: the turn. Shutter up, lights on, the words change.
  tl.fromTo(q('[data-shutter]'), { y: 0 }, { y: -224, duration: 0.45, ease: 'power1.inOut' }, 0.42);
  tl.fromTo(q('.glow'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.55);
  tl.fromTo(q('[data-copy-b]'), { autoAlpha: 0, y: () => window.innerHeight * 0.05 }, { autoAlpha: 1, y: 0, duration: 0.16 }, 0.4);

  // ...and the big cup fills.
  tl.fromTo(q('[data-cup-coffee]'), { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.9);
  tl.fromTo(
    q('[data-cup-coffee]'),
    { y: 64, scale: 0.8, svgOrigin: '300 176' },
    { y: 0, scale: 1, duration: 0.8, ease: 'power1.out', svgOrigin: '300 176' },
    0.9,
  );
  tl.fromTo(q('[data-cup-crema]'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.45);
  tl.fromTo(q('[data-cup-steam]'), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1.25, duration: 0.6 }, 1.4);

  // Camera moves in: near layers grow faster than far ones (real depth), beans pass the lens.
  const cam = (sel: string, from: gsap.TweenVars, to: gsap.TweenVars) =>
    tl.fromTo(q(sel), from, { ...to, duration: 1.4, ease: 'power1.inOut' }, 0.55);
  cam('[data-cam="far"]', { scale: 1, y: 0 }, { scale: 1.04, y: () => window.innerHeight * 0.01 });
  cam('[data-cam="tree"]', { scale: 1 }, { scale: 1.08 });
  cam('[data-cam="cafe"]', { scale: 1, y: 0 }, { scale: 1.12, y: () => window.innerHeight * 0.015 });
  cam('[data-cam="ground"]', { scale: 1 }, { scale: 1.1 });
  cam('[data-cam="counter"]', { scale: 1, y: 0 }, { scale: 1.12, y: () => window.innerHeight * 0.05 });
  cam('[data-cam="jars"]', { scale: 1, x: 0, y: 0 }, { scale: 1.22, x: () => -window.innerWidth * 0.04, y: () => window.innerHeight * 0.06 });
  cam('[data-cam="cup"]', { scale: 1, y: 0 }, { scale: 1.12, y: () => window.innerHeight * 0.02 });

  q('[data-bean]').forEach((bean, i) => {
    const dir = i % 2 === 0 ? -1 : 1;
    tl.fromTo(
      bean,
      { scale: 1, x: 0, y: 0, opacity: 1 },
      {
        scale: 2.1,
        x: () => dir * window.innerWidth * 0.08,
        y: () => window.innerHeight * 0.22,
        opacity: 0,
        duration: 1.3,
        ease: 'power1.in',
      },
      0.6 + i * 0.05,
    );
  });

  // --- Handover: the next scene rises over; this one sinks back and darkens.
  tl.fromTo(q('[data-hero-inner]'), { y: 0 }, { y: () => window.innerHeight * 0.08, duration: 1 }, 2);
  tl.fromTo(q('[data-handover]'), { opacity: 0 }, { opacity: 0.6, duration: 1 }, 2);
  // keep the timeline exactly 3 units long (story 0–2, handover 2–3)
  tl.set({}, {}, 3);

  return () => {
    ro?.disconnect();
    window.removeEventListener('resize', setCopyEnd);
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}

export { ScrollTrigger };
