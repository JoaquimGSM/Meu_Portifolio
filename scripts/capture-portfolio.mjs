import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const round = process.argv[2] ?? 'final';
const folder = `docs/qa/${round}`;
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const measurements = [];
try {
  for (const [width, height] of [[1440, 1000], [1024, 900], [768, 1024], [390, 844], [360, 800]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${folder}/${width}-hero.png` });
    if (round === 'final' && width === 1440) await page.screenshot({ path: 'public/og-cover.jpg', type: 'jpeg', quality: 85 });
    // Trigger native lazy loading by actually visiting each part of the page.
    for (const image of await page.locator('main .project-image img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) => element.decode());
    }
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `${folder}/${width}-full.jpg`, fullPage: true, type: 'jpeg', quality: 80 });
    measurements.push(await page.evaluate(() => ({
      width: innerWidth, height: innerHeight,
      pageWidth: document.documentElement.scrollWidth,
      fontsLoaded: document.fonts.check('700 80px "Syne Variable"') && document.fonts.check('400 16px "DM Sans Variable"'),
      brokenImages: [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.src),
    })));
    if (width === 1440 || width === 390) {
      await page.locator('.zeryon-feature').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${folder}/${width}-projects.png` });
      await page.getByRole('button', { name: 'Ver case Zeryon', exact: true }).first().click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      await page.screenshot({ path: `${folder}/${width}-case.png` });
      await page.keyboard.press('Escape');
    }
    await page.close();
  }
} finally { await browser.close(); }
await writeFile(`${folder}/measurements.json`, JSON.stringify(measurements, null, 2));
console.log(JSON.stringify(measurements, null, 2));
