/**
 * Pause the steam drift on any cup that is off screen, so phones don't spend
 * frames animating something nobody can see. Visuals are unchanged.
 */
export function initSteamPause() {
  const cups = Array.from(document.querySelectorAll<HTMLElement>('[data-cup]'));
  if (!cups.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-offscreen', !e.isIntersecting)),
    { rootMargin: '20% 0px' },
  );
  cups.forEach((c) => io.observe(c));
  return () => io.disconnect();
}
