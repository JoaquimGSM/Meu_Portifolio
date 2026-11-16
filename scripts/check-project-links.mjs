import { writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
const links = [
  ['Zeryon', 'https://web-dev-sprint3-zeryon.vercel.app/'],
  ['Naruto Connections', 'https://naruto-connections.vercel.app/'],
  ['Entrear', 'https://entrear.vercel.app/'],
  ['Lâmina', 'https://lamina-chi.vercel.app/'],
];
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
try {
for (const [name, url] of links) {
  const page = await browser.newPage();
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    results.push({ name, url, finalUrl: page.url(), status: response?.status(), title: await page.title(), checkedAt: new Date().toISOString() });
  } catch (error) { results.push({ name, url, error: error.message, checkedAt: new Date().toISOString() }); }
  finally { await page.close(); }
}
} finally { await browser.close(); }
await writeFile('docs/qa/personas/project-links.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
if (results.some((result) => result.status !== 200)) process.exitCode = 1;
