import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const outputPath = process.argv[2] ?? 'docs/qa/performance.json';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const session = await page.context().newCDPSession(page);
  await session.send('Network.enable');
  await session.send('Network.setCacheDisabled', { cacheDisabled: true });
  await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    window.__qaMetrics = { lcp: 0, cls: 0 };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__qaMetrics.lcp = entry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__qaMetrics.cls += entry.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    return {
      ...window.__qaMetrics,
      domContentLoaded: navigation.domContentLoadedEventEnd,
      load: navigation.loadEventEnd,
      transferBytes: navigation.transferSize + resources.reduce((total, resource) => total + resource.transferSize, 0),
      resources: resources.map(({ name, transferSize, duration }) => ({ name: new URL(name).pathname, transferSize, duration })),
    };
  });
  const report = {
    environment: 'Edge Chromium headless, localhost, cache desabilitado, CPU 4x, viewport 390x844. Medição de laboratório; não é Lighthouse nem dados de usuários reais.',
    metrics,
  };
  await writeFile(outputPath, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
