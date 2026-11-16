import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const round = process.argv[2] ?? 'final';
const folder = `docs/qa/atmospheres/${round}`;
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
try {
  const sizes = round === 'final' ? [[1440, 1000], [768, 1024], [390, 844]] : [[1440, 1000], [390, 844]];
  for (const [width, height] of sizes) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${folder}/${width}-hero.png` });
    for (const image of await page.locator('main .project-image img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) => element.decode());
    }
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `${folder}/${width}-full.jpg`, fullPage: true, type: 'jpeg', quality: 84 });
    if (round !== 'before' && width === 1440) {
      for (const selector of ['.zeryon-feature', '.naruto-feature', '.cityzer-feature', '.web-projects', '#sobre', '#contato']) {
        const section = page.locator(selector);
        await section.scrollIntoViewIfNeeded();
        await section.screenshot({ path: `${folder}/${width}-${selector.replace(/[.#]/g, '')}.png` });
      }
    }
    if (round === 'final') {
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      if (width === 1440) await page.screenshot({ path: 'public/og-cover.jpg', type: 'jpeg', quality: 88 });
    }
    results.push(await page.evaluate((errors) => ({
      width: innerWidth, pageWidth: document.documentElement.scrollWidth,
      fontsLoaded: document.fonts.check('700 80px "Syne Variable"') && document.fonts.check('400 16px "DM Sans Variable"'),
      brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
      errors,
    }), errors));
    await page.close();
  }
} finally { await browser.close(); }
await writeFile(`${folder}/measurements.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
