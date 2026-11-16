import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('public/projects', { recursive: true });
await mkdir('docs/research', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
try {
  for (const [id, url] of Object.entries({
    zeryon: 'https://web-dev-sprint3-zeryon.vercel.app/',
    naruto: 'https://naruto-connections.vercel.app/',
    entrear: 'https://entrear.vercel.app/',
    lamina: 'https://lamina-chi.vercel.app/',
  })) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1600);
      const text = await page.locator('body').innerText();
      await page.screenshot({ path: `public/projects/${id}.jpg`, type: 'jpeg', quality: 88 });
      const result = { id, url, status: response?.status(), title: await page.title(), text, screenshot: `public/projects/${id}.jpg` };
      results.push(result);
      console.log(JSON.stringify({ ...result, text: text.slice(0, 3000) }));
    } catch (error) {
      results.push({ id, url, error: String(error) });
      console.log(id, String(error));
    } finally { await page.close(); }
  }
} finally { await browser.close(); }
await writeFile('docs/research/deploys.json', JSON.stringify(results, null, 2));
