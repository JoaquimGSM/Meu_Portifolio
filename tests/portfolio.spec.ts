import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const viewports = [
  { width: 360, height: 800 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 320, height: 720 },
];

const cases = [
  { name: 'Zeryon', button: 'Ver case Zeryon', links: 2 },
  { name: 'Naruto Connections', button: 'Ver case Naruto Connections', links: 2 },
  { name: 'Cityzer', button: 'Conhecer proposta Cityzer', links: 0 },
  { name: 'Entrear', button: 'Ver case Entrear', links: 1 },
  { name: 'Lâmina', button: 'Ver case Lâmina', links: 1 },
];

async function visit(page: Page) {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

async function assertNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    width: window.innerWidth,
    html: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(dimensions.html, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.width + 1);
  expect(dimensions.body, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.width + 1);
}

for (const viewport of viewports) {
  test(`conteúdo, imagens, links e console em ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await visit(page);
    await assertNoHorizontalOverflow(page);

    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      await expect.poll(async () => image.evaluate((element: HTMLImageElement) =>
        element.complete && element.naturalWidth > 0 && element.naturalHeight > 0,
      )).toBe(true);
      await expect(image).toHaveAttribute('alt', /\S/);
    }

    const anchors = await page.locator('a[href]').evaluateAll(elements => elements.map(element => ({
      href: element.getAttribute('href') ?? '',
      label: element.textContent?.trim(),
      target: element.getAttribute('target'),
      rel: element.getAttribute('rel'),
      destinationExists: element.getAttribute('href')?.startsWith('#')
        ? Boolean(document.getElementById(element.getAttribute('href')!.slice(1)))
        : true,
    })));
    for (const anchor of anchors) {
      expect(anchor.href, JSON.stringify(anchor)).not.toMatch(/^(#$|javascript:|https?:\/\/.*\.example)/);
      expect(anchor.destinationExists, JSON.stringify(anchor)).toBe(true);
      if (anchor.target === '_blank') expect(anchor.rel).toContain('noopener');
    }
    const destinations = anchors.filter(anchor => anchor.href.startsWith('https://')).map(anchor => anchor.href);
    expect(destinations).toEqual(expect.arrayContaining([
      'https://github.com/JoaquimGSM',
      'https://www.linkedin.com/in/joaquimgsm',
      'https://web-dev-sprint3-zeryon.vercel.app/',
      'https://naruto-connections.vercel.app/',
      'https://entrear.vercel.app/',
      'https://lamina-chi.vercel.app/',
    ]));
    await expect(page.locator('#projetos')).toContainText('Em desenvolvimento');
    await expect(page.locator('.cityzer-feature img')).toHaveCount(0);
    await expect(page.locator('.project-feature, .cityzer-feature, .web-heading')).toHaveCount(4);
    await assertNoHorizontalOverflow(page);
    expect(errors).toEqual([]);
  });

  test(`cinco cases: conteúdo, teclado, foco e Escape em ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await visit(page);
    for (const project of cases) {
      const trigger = page.getByRole('button', { name: project.button, exact: true }).first();
      await trigger.click();
      const dialog = page.getByRole('dialog', { name: project.name, exact: true });
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('heading', { name: project.name, exact: true })).toBeVisible();
      const headingFits = await dialog.locator('#case-title').evaluate(element => element.scrollWidth <= element.clientWidth + 1);
      expect(headingFits, `Título do case ${project.name} em ${viewport.width}px`).toBe(true);
      await expect(dialog.getByRole('heading', { name: 'O ponto de partida', exact: true })).toHaveCount(1);
      await expect(dialog.locator('.case-links a')).toHaveCount(project.links);
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
      const hasFocusInside = () => dialog.evaluate(element => element.contains(document.activeElement));
      await expect.poll(hasFocusInside).toBe(true);
      for (let index = 0; index < 8; index++) {
        await page.keyboard.press(index < 4 ? 'Tab' : 'Shift+Tab');
        expect(await hasFocusInside(), JSON.stringify({ project: project.name, index, active: await page.evaluate(() => ({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.slice(0, 120) })) })).toBe(true);
      }
      const bounds = await dialog.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width + 1);
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
    }
  });
}

test('menu móvel: abertura, foco, Escape e navegação real', async ({ page }) => {
  await page.setViewportSize(viewports[0]);
  await visit(page);
  const menuButton = page.getByRole('button', { name: 'Abrir menu', exact: true });
  await menuButton.click();
  const menu = page.locator('#mobile-menu');
  await expect(menu).toBeVisible();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  // Audit the completed menu state; auditing its moving backdrop can include inert background controls.
  await menu.evaluate(element => Promise.all(element.getAnimations().map(animation => animation.finished)));
  const menuAudit = await new AxeBuilder({ page }).analyze();
  expect(menuAudit.violations, JSON.stringify(menuAudit.violations, null, 2)).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(menu).not.toBeVisible();
  await expect(menuButton).toBeFocused();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await menuButton.click();
  await menu.getByRole('link', { name: 'Projetos', exact: true }).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#projetos$/);
  await expect.poll(async () => page.locator('#projetos').evaluate(element => Math.abs(element.getBoundingClientRect().top)))
    .toBeLessThan(140);
});

test('personagem preservado: pausa, retomada e pausa fora da viewport', async ({ page }) => {
  await page.setViewportSize(viewports[2]);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  const avatar = page.locator('.avatar-image');
  await avatar.scrollIntoViewIfNeeded();
  await expect.poll(() => avatar.evaluate((image: HTMLImageElement) => image.currentSrc)).toContain('guitarrista_pixel_transparente.webp');
  await page.getByRole('button', { name: 'Pausar animação do personagem' }).click();
  await expect(avatar).toHaveAttribute('src', /guitarrista_pixel_estatico\.png$/);
  await expect(page.getByRole('button', { name: 'Reproduzir animação do personagem' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Reproduzir animação do personagem' }).click();
  await expect(avatar).toHaveAttribute('src', /guitarrista_pixel_transparente\.webp$/);
  await page.locator('#contato').scrollIntoViewIfNeeded();
  await expect(avatar).toHaveAttribute('src', /guitarrista_pixel_estatico\.png$/);
});

test('movimento reduzido: quadro estático e conteúdo disponível', async ({ page }) => {
  await page.setViewportSize(viewports[0]);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visit(page);
  const avatar = page.locator('.avatar-image');
  await avatar.scrollIntoViewIfNeeded();
  await expect.poll(() => avatar.evaluate((image: HTMLImageElement) => image.currentSrc)).toContain('guitarrista_pixel_estatico.png');
  await expect(page.getByRole('button', { name: /animação do personagem/ })).toHaveCount(0);
  const runningAnimations = await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length);
  expect(runningAnimations).toBe(0);
  const trigger = page.getByRole('button', { name: 'Ver case Zeryon', exact: true }).first();
  await trigger.click();
  await expect(page.getByRole('dialog', { name: 'Zeryon', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

for (const viewport of [viewports[0], viewports[2]]) {
  test(`axe WCAG 2.2 AA: homepage e cases em ${viewport.width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await visit(page);
    const audits: { context: string; violations: unknown[] }[] = [];
    const homepage = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    audits.push({ context: 'homepage', violations: homepage.violations });
    for (const project of cases) {
      await page.getByRole('button', { name: project.button, exact: true }).first().click();
      await expect(page.getByRole('dialog', { name: project.name, exact: true })).toBeVisible();
      const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      audits.push({ context: project.name, violations: audit.violations });
      await page.keyboard.press('Escape');
    }
    await testInfo.attach('axe-audits', { body: JSON.stringify(audits, null, 2), contentType: 'application/json' });
    expect(audits.filter(audit => audit.violations.length), JSON.stringify(audits, null, 2)).toEqual([]);
  });
}
