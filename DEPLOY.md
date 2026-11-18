# Deploying Kopi Corner to Cloudflare Pages

The site builds to plain static files (`dist/`), so no server or adapter is needed.

## 1. Before the first deploy

1. **Put the code on the branch you will deploy.** Cloudflare deploys one production branch (usually `main`).
   Merge `build/kopi-corner-site` into `main`, or choose that branch as the production branch in step 2.
2. **Set the site address.** In `astro.config.mjs`, replace the placeholder:

   ```js
   site: 'https://kopi-corner.example',
   ```

   with the real address, for example `https://kopi-corner.pages.dev` or your own domain.
   It is used for canonical links and the social preview image (`og.png`). Commit and push.
3. **Check it builds locally:**

   ```bash
   npm install
   npm run check
   npm run build
   npm run preview   # http://localhost:4321
   ```

## 2. Option A: connect GitHub (recommended)

Every push then deploys automatically, and other branches get their own preview address.

1. Open **dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git**.
2. Authorise GitHub and choose the `kopi_corner` repository.
3. Build settings:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Astro |
   | Production branch | `main` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

4. Environment variables (Production and Preview):

   | Name | Value | Why |
   | --- | --- | --- |
   | `NODE_VERSION` | `24` | The project needs Node 22.23.4 or newer. |
   | `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD` | `1` | Playwright is only used locally for screenshots; this keeps the build fast. |

5. Click **Save and Deploy**. After about a minute you get a `*.pages.dev` address.

## 3. Option B: upload from your computer

No Git connection; run this each time you want to update the live site.

```bash
npm run build
npx wrangler login
npx wrangler pages deploy dist --project-name kopi-corner
```

## 4. Custom domain (optional)

1. In the Pages project, open **Custom domains → Set up a custom domain** and enter the domain.
2. If the domain's DNS is on Cloudflare, the record is created for you. Otherwise add the CNAME
   record Cloudflare shows you at your domain registrar.
3. Update `site` in `astro.config.mjs` to the new domain, then commit and push.

## 5. Already handled in the repo

- `public/_headers`: long-term caching for built assets in `/_astro/`, plus basic security headers.
- `/contact` redirects to `/visit#contact`.
- `404.astro` becomes the site's "page not found" page automatically.
- Fonts are downloaded at build time and served from your own domain.

## 6. After the first deploy

- [ ] Click through Home, Menu, About and Visit.
- [ ] Open `/menu#beans` directly and check it lands just below the header.
- [ ] Paste the live address into a social preview checker (for example opengraph.xyz) to confirm `og.png` appears.
- [ ] Scroll the Home hero forward and back on a real phone.
- [ ] When you add a Formspree form ID (`business.formspreeEndpoint` in `src/content/site.ts`),
      add the live domain to that form's allowed domains in Formspree.

## Updating the portfolio screenshot

After changing the hero, rebuild and re-capture the images:

```bash
npx playwright install chromium   # once
npm run build
npm run screenshot                # writes screenshot.png and public/og.png
```

Commit both images so the next deploy uses them.
