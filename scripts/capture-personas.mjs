import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const round = process.argv[2] ?? 'final';
const baseURL = process.argv[3] ?? 'http://127.0.0.1:4173';
const folder = `docs/qa/pixel/${round}`;
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
try {
  const sizes = round === 'final' ? [[1440, 900], [1280, 800], [1024, 768], [768, 1024], [390, 844], [320, 800]] : [[1440, 900], [360, 800]];
  for (const [width, height] of sizes) {
    for (const id of ['guitarrista', 'boxeador', 'tenista']) {
      const page = await browser.newPage({ viewport: { width, height } });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(baseURL, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.locator(`.world-selector-row .persona-option[aria-label$="${{guitarrista:'Guitarrista',boxeador:'Boxeador',tenista:'Tenista'}[id]}"]`).click();
      await page.mouse.move(width - 4, 4);
      await expect(page.locator(`.character-${id} img`)).toHaveAttribute('src', `/personagens/${id}.gif`);
      await page.evaluate(() => Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => {}))));
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: `${folder}/${id}-${width}-hero.png` });
      if (round === 'final' || width === 1440 || width === 360) {
        for (const image of await page.locator('.project-cover img').all()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate((element) => element.decode());
          await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          await page.waitForTimeout(100);
        }
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await expect(page.locator(`.character-${id} img`)).toHaveAttribute('src', `/personagens/${id}.gif`);
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        await page.screenshot({ path: `${folder}/${id}-${width}-full.jpg`, fullPage: true, type: 'jpeg', quality: 84 });
      }
      if (round === 'final' && width === 1440 && id === 'guitarrista') await page.screenshot({ path: 'public/og-cover.jpg', type: 'jpeg', quality: 88 });
      results.push(await page.evaluate(({ id, errors }) => ({ persona: id, width: innerWidth, pageWidth: document.documentElement.scrollWidth, errors, brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src), animatedImages: document.querySelectorAll('img[src$=".gif"]').length }), { id, errors }));
      await page.close();
    }
  }
} finally { await browser.close(); }
await writeFile(`${folder}/measurements.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
