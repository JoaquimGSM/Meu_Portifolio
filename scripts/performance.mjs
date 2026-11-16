import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const outputPath = process.argv[2] ?? 'docs/qa/personas/final/performance.json';
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
  const switches = [];
  for (const id of ['boxeador', 'tenista', 'guitarrista']) {
    switches.push(await page.evaluate(async (id) => {
      const before = { scroll: scrollY, height: document.documentElement.scrollHeight };
      const intervals = [];
      const start = performance.now();
      let previous = start;
      await new Promise((resolve) => {
        const frame = (now) => {
          intervals.push(now - previous);
          previous = now;
          if (now - start < 850) requestAnimationFrame(frame);
          else resolve();
        };
        requestAnimationFrame(frame);
        const names = { guitarrista: 'Guitarrista', boxeador: 'Boxeador', tenista: 'Tenista' };
        document.querySelector(`.world-selector-row [aria-label$="${names[id]}"]`).click();
      });
      const sorted = [...intervals].sort((a, b) => a - b);
      return { persona: id, sampledFrames: intervals.length, approximateFps: 1000 / (intervals.reduce((sum, n) => sum + n, 0) / intervals.length), medianFrameMs: sorted[Math.floor(sorted.length / 2)], p95FrameMs: sorted[Math.floor(sorted.length * .95)], longestFrameMs: sorted.at(-1), stableScroll: scrollY === before.scroll, stableHeight: document.documentElement.scrollHeight === before.height, activeGifs: document.querySelectorAll('img[src$=".gif"]').length };
    }, id));
  }
  const report = {
    environment: 'Edge Chromium headless, localhost, cache desabilitado, CPU 4x, viewport 390x844. Medição de laboratório; não é Lighthouse nem dados de usuários reais.',
    metrics,
    switches,
  };
  await writeFile(outputPath, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
