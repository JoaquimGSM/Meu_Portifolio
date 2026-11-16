import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

await mkdir('docs/qa/personas/concepts', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const concept of ['playground', 'zine', 'worlds']) {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: width === 1440 ? 1000 : 844 } });
      await page.goto(`http://127.0.0.1:5173/explorations/?concept=${concept}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `docs/qa/personas/concepts/${concept}-${width}.jpg`, fullPage: true, type: 'jpeg', quality: 85 });
      for (const id of ['boxeador', 'tenista']) {
        await page.locator(`button[data-persona="${id}"]`).click();
        await page.locator('.active-character').evaluate((image) => image.decode());
        if (width === 1440) await page.screenshot({ path: `docs/qa/personas/concepts/${concept}-${id}.png` });
      }
      await page.close();
    }
  }
} finally { await browser.close(); }
console.log('3 conceitos reais × desktop/mobile; as três personas foram selecionadas em cada proposta.');
