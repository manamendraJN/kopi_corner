// Renders the favicon SVG into PNG icons (favicon-32, apple-touch-icon, PWA icons).
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url));
// apple-touch-icon: full-bleed square (iOS rounds the corners itself)
const square = Buffer.from(
  svg.toString().replace('rx="7"', 'rx="0"'),
);
const out = (name) => new URL(`../public/${name}`, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
await sharp(svg, { density: 600 }).resize(32, 32).png().toFile(out('favicon-32.png'));
await sharp(square, { density: 1200 }).resize(180, 180).png().toFile(out('apple-touch-icon.png'));
await sharp(square, { density: 1200 }).resize(192, 192).png().toFile(out('icon-192.png'));
await sharp(square, { density: 1200 }).resize(512, 512).png().toFile(out('icon-512.png'));
console.log('Icons written to /public');
