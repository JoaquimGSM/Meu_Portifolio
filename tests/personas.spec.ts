import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const worlds = [
  ['guitarrista', 'Guitarrista'],
  ['boxeador', 'Boxeador'],
  ['tenista', 'Tenista'],
] as const;
const storageKey = 'joaquim:persona:v1';
const mainSelector = (page: Page) => page.locator('.world-selector-row');
async function settle(page: Page) {
  await page.evaluate(() => Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => {}))));
}
async function choose(page: Page, index: number, animated = true) {
  const [id, name] = worlds[index];
  await mainSelector(page).getByRole('button', { name, exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-persona', id);
  await settle(page);
  if (animated) await expect(page.locator(`.character-${id} img`)).toHaveAttribute('src', `/personagens/${id}.gif`);
}

for (const width of [320, 360, 768, 1024, 1280, 1440]) {
  test(`três mundos e galeria visual em ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    for (let index = 0; index < worlds.length; index++) {
      await choose(page, index);
      await expect(page.locator('img[src$=".gif"]')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await page.locator('h1, h2, h3').evaluateAll((headings) => headings.filter((heading) => heading.scrollWidth > heading.clientWidth + 2).map((heading) => heading.textContent))).toEqual([]);
      const gallery = page.locator('#projetos');
      await expect(gallery.locator('article')).toHaveCount(5);
      await expect(gallery.locator('a')).toHaveCount(4);
      await expect(gallery.locator('p, button')).toHaveCount(0);
      await expect(gallery.locator('.project-cityzer')).toContainText('Em desenvolvimento');
      await expect(gallery.locator('.project-cityzer a, .project-cityzer img')).toHaveCount(0);
      await expect(gallery.locator('.project-entrear')).toContainText('Website demonstrativo');
      await expect(gallery.locator('.project-lamina')).toContainText('Website demonstrativo');
      for (const image of await gallery.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty('complete', true);
        expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
      }
    }
    expect(await page.locator('.project-cover').evaluateAll((links) => links.map((link) => link.getAttribute('href')))).toEqual([
      'https://web-dev-sprint3-zeryon.vercel.app/', 'https://naruto-connections.vercel.app/', 'https://entrear.vercel.app/', 'https://lamina-chi.vercel.app/',
    ]);
    for (const href of await page.locator('a[href^="#"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')!))) await expect(page.locator(href)).toHaveCount(1);
    await expect(page.locator('dialog, .tech-tags, .case-dialog')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('trocas rápidas preservam scroll e geometria sem recarregar', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await settle(page);
  await mainSelector(page).scrollIntoViewIfNeeded();
  const measure = () => page.evaluate(() => ({ scroll: scrollY, height: document.documentElement.scrollHeight, galleryTop: document.getElementById('projetos')!.offsetTop }));
  const before = await measure();
  let navigations = 0;
  page.on('framenavigated', (frame) => { if (frame === page.mainFrame()) navigations++; });
  for (const index of [1, 2, 0, 1, 0, 2, 1, 2]) {
    const bounds = await mainSelector(page).getByRole('button', { name: worlds[index][1], exact: true }).boundingBox();
    if (!bounds) throw new Error('Personagem fora da viewport');
    await page.mouse.click(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  }
  await settle(page);
  await expect(page.locator('.character-tenista img')).toHaveAttribute('src', '/personagens/tenista.gif');
  await expect(page.locator('.persona-option[aria-pressed="true"]')).toHaveCount(2);
  expect(await measure()).toEqual(before);
  expect(navigations).toBe(0);
});

test('persistência e restauração no head antes de carregar o React', async ({ page }) => {
  await page.goto('/');
  await choose(page, 1);
  expect(await page.evaluate((key) => localStorage.getItem(key), storageKey)).toBe('boxeador');
  await page.reload();
  await expect(mainSelector(page).getByRole('button', { name: worlds[1][1], exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.route('**/assets/*.js', (route) => route.abort());
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-persona', 'boxeador');
  expect(await page.locator('html').evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgb(246, 201, 52)');
});

test('armazenamento bloqueado mantém seleção funcional', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage bloqueado no teste'); };
    Storage.prototype.setItem = () => { throw new Error('Storage bloqueado no teste'); };
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-persona', 'guitarrista');
  await choose(page, 2);
  expect(errors).toEqual([]);
});

test('teclado, popover, Escape e troca longe da abertura', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await page.locator('#projetos').scrollIntoViewIfNeeded();
  await settle(page);
  const scroll = await page.evaluate(() => scrollY);
  const toggle = page.getByRole('button', { name: /trocar personagem/ });
  // Locator.click scrolls sticky descendants in Chromium; use the actual visible pointer target.
  const bounds = await toggle.boundingBox();
  if (!bounds) throw new Error('Seletor fora da viewport');
  await page.mouse.click(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  const option = page.locator('#world-menu').getByRole('button', { name: worlds[2][1], exact: true });
  await option.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-persona', 'tenista');
  await expect(page.locator('#world-menu')).not.toBeVisible();
  expect(await page.evaluate(() => scrollY)).toBe(scroll);
  await toggle.click();
  await page.keyboard.press('Escape');
  await expect(page.locator('#world-menu')).not.toBeVisible();
  await expect(toggle).toBeFocused();
});

test('toque seleciona os três personagens e navega aos projetos', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173');
  for (const [id, name] of worlds) {
    await mainSelector(page).getByRole('button', { name, exact: true }).tap();
    await expect(page.locator('html')).toHaveAttribute('data-persona', id);
  }
  await page.getByRole('navigation').getByRole('link', { name: 'Projetos', exact: true }).tap();
  await expect(page).toHaveURL(/#projetos$/);
  await context.close();
});

test('GIFs realmente mudam de frame; pausa e saída da viewport', async ({ page }) => {
  await page.goto('/');
  for (let index = 0; index < worlds.length; index++) {
    await choose(page, index);
    const hashes = new Set<string>();
    for (let frame = 0; frame < 3; frame++) {
      hashes.add(createHash('sha256').update(await page.locator('.character-window').screenshot()).digest('hex'));
      await page.waitForTimeout(160);
    }
    expect(hashes.size).toBeGreaterThan(1);
  }
  await page.getByRole('button', { name: 'Pausar personagem', exact: true }).click();
  await expect(page.locator('img[src$=".gif"]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Reproduzir personagem', exact: true }).click();
  await expect(page.locator('.character-tenista img')).toHaveAttribute('src', '/personagens/tenista.gif');
  await page.locator('#sobre').scrollIntoViewIfNeeded();
  await expect(page.locator('img[src$=".gif"]')).toHaveCount(0);
});

test('movimento reduzido usa pôsteres e nenhuma animação ambiental', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (let index = 0; index < worlds.length; index++) {
    await choose(page, index, false);
    await expect(page.locator('img[src$=".gif"]')).toHaveCount(0);
    await expect(page.locator(`.character-${worlds[index][0]} img`)).toHaveAttribute('src', `/personagens/${worlds[index][0]}-poster.png`);
    expect(await page.evaluate(() => document.getAnimations().filter((animation) => animation.playState === 'running').length)).toBe(0);
  }
});

for (const width of [360, 1440]) {
  test(`axe WCAG AA nos três mundos e seletor aberto em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    for (let index = 0; index < worlds.length; index++) {
      await choose(page, index, false);
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(result.violations, JSON.stringify(result.violations, null, 2)).toEqual([]);
      await page.getByRole('button', { name: /trocar personagem/ }).click();
      const menuResult = await new AxeBuilder({ page }).analyze();
      expect(menuResult.violations, JSON.stringify(menuResult.violations, null, 2)).toEqual([]);
      await page.keyboard.press('Escape');
    }
  });
}

test('arquivos servidos preservam os três GIFs aprovados', async ({ request }) => {
  const hashes = ['22b346e982e72f8125e115271c8f5b9488f5e4cd7e0451eb765e2b6b3343cb69', '4a01e9bfb0a6ff1078b84cd50dd0ce59d6311cb3eb0ea36a3c786e219e99a0b0', '8e4b9f9cfa328ebe2134090dc66edf0fe3a3042baab85ca591d91fb2b547c215'];
  for (const [index, [id]] of worlds.entries()) {
    const original = await readFile(`public/personagens/${id}.gif`);
    expect(createHash('sha256').update(original).digest('hex')).toBe(hashes[index]);
    const response = await request.get(`/personagens/${id}.gif`);
    expect(response.ok()).toBe(true);
    expect(await response.body()).toEqual(original);
  }
});

test('hero direto, redes no card e conteúdo idêntico entre personagens', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Joaquim\s*Moura/);
  await expect(page.locator('.hero-copy')).toContainText('Engenharia de Software');
  await expect(page.locator('.hero-copy')).toContainText('2026–2029');
  await expect(page.locator('.card-socials a')).toHaveCount(2);
  expect(await page.locator('.card-socials a').evaluateAll((links) => links.map((link) => link.getAttribute('href')))).toEqual(['https://github.com/JoaquimGSM', 'https://www.linkedin.com/in/joaquimgsm']);
  expect(await page.locator('main > section').evaluateAll((sections) => sections.map((section) => section.id))).toEqual(['inicio', 'projetos', 'sobre']);
  const content = () => page.locator('.hero-copy, #projetos, #sobre, footer').allTextContents();
  const initial = await content();
  for (let index = 0; index < worlds.length; index++) {
    await choose(page, index);
    expect(await content()).toEqual(initial);
  }
  await expect(page.locator('body')).not.toContainText(/arquivo de projetos|seleção pessoal|três versões de mim|qual versão|fora da tela|um pouco de|por aqui|meu universo/i);
  expect(await page.evaluate(() => document.fonts.check('12px "Press Start 2P"'))).toBe(true);
});
