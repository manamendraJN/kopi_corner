/**
 * Client-only motion bootstrap.
 * - Starts on astro:page-load, cleans up on astro:before-swap (Astro ClientRouter).
 * - Lenis drives smooth scrolling; GSAP ScrollTrigger reads from it.
 * - In-page #links land just below the fixed header, on the same page and across pages.
 * - With prefers-reduced-motion, nothing animates and the still version is shown.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initHero } from './scenes/hero';
import { initProof } from './scenes/proof';
import { initOffer } from './scenes/offer';
import { initEase, initInvitation } from './scenes/arrive';
import { initMorning } from './scenes/morning';
import { initReveals } from './scenes/reveal';
import { initMouseParallax } from './scenes/parallax';
import { initSteamPause } from './scenes/steam';
import { setupShutter } from './shutter';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
export const motionOK = () => !reducedQuery.matches;

let lenis: Lenis | null = null;
let ctx: gsap.Context | null = null;
let tick: ((time: number) => void) | null = null;
let cleanups: Array<() => void> = [];

function headerOffset() {
  const bar = document.querySelector<HTMLElement>('[data-header] .bar');
  return (bar?.offsetHeight ?? 72) + 16;
}

export function scrollToTarget(target: HTMLElement, immediate = false) {
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset();
  if (lenis) {
    lenis.scrollTo(Math.max(0, top), { immediate, duration: 1.1 });
  } else {
    window.scrollTo({ top: Math.max(0, top), behavior: immediate || !motionOK() ? 'auto' : 'smooth' });
  }
}

function focusTarget(target: HTMLElement) {
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

function targetFromHash(hash: string) {
  if (!hash || hash === '#') return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

/* Same-page anchor links: handled here (capture phase) so the router and Lenis don't fight. */
window.addEventListener(
  'click',
  (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
    if (!a || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname.replace(/\/$/, '') !== location.pathname.replace(/\/$/, '')) return;
    const target = targetFromHash(url.hash);
    if (!target) return;
    e.preventDefault();
    e.stopPropagation();
    history.pushState(history.state, '', url.hash);
    scrollToTarget(target);
    focusTarget(target);
  },
  { capture: true },
);

/* Mobile menu / chat on phones can lock scrolling. */
window.addEventListener('kc:scroll-lock', (e) => {
  const locked = (e as CustomEvent<boolean>).detail;
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
});

function start() {
  document.documentElement.classList.toggle('motion', motionOK());

  if (motionOK()) {
    lenis = new Lenis({ lerp: 0.11, smoothWheel: true, anchors: false, autoRaf: false });
    lenis.on('scroll', ScrollTrigger.update);
    tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ctx = gsap.context(() => {
      cleanups = [
        initHero(),
        initProof(),
        initOffer(),
        initEase(),
        initInvitation(),
        initMorning(),
        initReveals(),
        initMouseParallax(),
        initSteamPause(),
      ].filter((fn): fn is () => void => typeof fn === 'function');
    });
  }

  // Land #hash arrivals (from another page) just below the header, after layout settles.
  const arrive = () => {
    ScrollTrigger.refresh();
    const target = targetFromHash(location.hash);
    if (target) {
      scrollToTarget(target, true);
      ScrollTrigger.update();
    }
  };
  requestAnimationFrame(arrive);
  document.fonts?.ready.then(() => {
    if (!lenis && !motionOK()) return;
    ScrollTrigger.refresh();
  });
}

function stop() {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  ctx?.revert();
  ctx = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  if (tick) gsap.ticker.remove(tick);
  tick = null;
  lenis?.destroy();
  lenis = null;
}

document.addEventListener('astro:page-load', start);
document.addEventListener('astro:before-swap', stop);
document.addEventListener('astro:after-swap', () => {
  // The router copies <html> attributes from the new page; put the motion flag back before paint.
  document.documentElement.classList.toggle('motion', motionOK());
});

reducedQuery.addEventListener('change', () => {
  stop();
  start();
});

setupShutter(motionOK);
