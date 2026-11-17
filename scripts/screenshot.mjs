// Captures the Home hero at its most beautiful scroll position:
//   /screenshot.png  1600 x 1000  (portfolio Work page)
//   /public/og.png   1200 x 630   (social preview image)
// Run after `npm run build`:  npm run screenshot
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const PORT = 4321;
const url = `http://localhost:${PORT}/`;
const alreadyRunning = await fetch(url).then((r) => r.ok).catch(() => false);
// Astro allows one preview server at a time: reuse it if one is already running.
const server = alreadyRunning
  ? null
  : spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'preview', '--port', String(PORT)], { stdio: 'ignore' });

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Preview server did not start');
}

// The moment the cafe is fully awake: warm light, the cup full, steam rising.
const MOMENT = 1.82; // screens scrolled into the hero

async function shoot(width, height, path) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '[data-chat], .grain { display: none !important; }' });
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(MOMENT * height));
  await page.waitForTimeout(2500);
  await page.screenshot({ path });
  await page.close();
  console.log('saved', path);
}

let browser;
try {
  await waitForServer();
  browser = await chromium.launch();
  await shoot(1600, 1000, 'screenshot.png');
  await shoot(1200, 630, 'public/og.png');
} finally {
  await browser?.close();
  if (server) {
    server.kill();
    if (process.platform === 'win32') spawn('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' });
  }
}
