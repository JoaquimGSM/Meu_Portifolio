import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

// Teste de deploys públicos em contextos descartáveis: apenas GET/HEAD são permitidos.
// Nenhum dado de formulário é enviado e nenhum projeto remoto é modificado.
await mkdir('docs/research', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];

async function runFlow(id, url, verify) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
    serviceWorkers: 'block',
  });
  const blockedRequests = [];
  await context.route('**/*', async route => {
    const request = route.request();
    if (!['GET', 'HEAD'].includes(request.method())) {
      blockedRequests.push({ method: request.method(), url: request.url() });
      await route.abort('blockedbyclient');
    } else {
      await route.continue();
    }
  });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  const runtimeErrors = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  const result = { id, url, status: 'pending', blockedRequests, runtimeErrors };
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    result.httpStatus = response?.status();
    expect(response?.ok()).toBe(true);
    await page.evaluate(() => document.fonts.ready);
    result.checks = await verify(page);
    result.status = 'passed';
  } catch (error) {
    result.status = 'failed';
    result.error = String(error);
    result.visibleText = (await page.locator('body').innerText().catch(() => '')).slice(0, 4000);
  } finally {
    result.screenshot = `docs/research/${id}-interaction.png`;
    await page.screenshot({ path: result.screenshot, fullPage: true }).catch(error => {
      result.screenshotError = String(error);
    });
    await context.close();
    results.push(result);
    console.log(JSON.stringify(result));
  }
}

try {
  await runFlow('zeryon', 'https://web-dev-sprint3-zeryon.vercel.app/', async page => {
    await page.getByRole('button', { name: 'Criar meus perfis', exact: true }).click();
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: 'Começar perfil 1', exact: true }).click();
    const answers = [];
    for (let step = 0; step < 10; step++) {
      const question = page.locator('.quiz-question h2');
      await expect(question).toBeVisible();
      const questionText = await question.innerText();
      const next = page.getByRole('button', { name: step === 9 ? 'Criar meu perfil' : 'Continuar', exact: true });
      await expect(next).toBeDisabled();
      const answer = page.locator('.quiz-options button').first();
      const answerText = await answer.innerText();
      await answer.click();
      await expect(answer).toHaveAttribute('aria-pressed', 'true');
      await expect(next).toBeEnabled();
      answers.push({ question: questionText, answer: answerText });
      await next.click();
    }
    expect(new Set(answers.map(answer => answer.question)).size).toBe(10);
    await page.getByRole('textbox', { name: 'Editar nome do perfil', exact: true }).fill('Perfil de teste local');
    await page.getByRole('button', { name: 'Salvar perfil', exact: true }).click();
    await expect(page.getByText('Perfil salvo com sucesso.', { exact: true })).toBeVisible();
    const storedProfiles = await page.evaluate(() => JSON.parse(localStorage.getItem('zeryonProfiles') ?? '[]'));
    expect(storedProfiles).toHaveLength(1);
    expect(storedProfiles[0].nome).toBe('Perfil de teste local');
    expect(storedProfiles[0].respostas).toHaveLength(10);
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByRole('button', { name: 'Gerenciar perfis', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Gerenciar perfis', exact: true }).click();
    await expect(page.getByText('Perfil de teste local', { exact: true })).toBeVisible();
    await expect.poll(() => page.locator('.profile-card-image').evaluate(image =>
      image.complete && image.naturalWidth > 0,
    ), { timeout: 20000 }).toBe(true);
    return {
      quizQuestionsCompleted: answers.length,
      answers,
      editedNameBeforeSaving: true,
      savedProfileCount: storedProfiles.length,
      persistenceAfterReload: true,
      savedProfileThumbnailLoaded: true,
      storage: 'localStorage em contexto descartável do navegador',
      limitation: 'Este teste não usa câmera física ou processamento de IA e não comprova esses recursos.',
    };
  });

  await runFlow('naruto', 'https://naruto-connections.vercel.app/', async page => {
    await page.locator('.react-flow__node[data-id="jiraiya"]').click();
    await page.locator('.react-flow__node[data-id="itachi"]').click();
    await expect(page.getByText('Selecionados: Jiraiya, Itachi Uchiha', { exact: true })).toBeVisible();
    const initialText = 'Conexão de teste local entre dois personagens.';
    const editedText = 'Justificativa revisada em teste local.';
    await page.getByPlaceholder('Explique a relação entre os personagens...').fill(initialText);
    await page.getByRole('button', { name: 'Criar conexão', exact: true }).click();
    const edge = page.locator('.react-flow__edge[data-id="jiraiya-itachi"]');
    await expect(edge).toHaveCount(1);
    // Uma aresta SVG horizontal tem bounding box de altura zero. A interação
    // continua clicável pelo traço: usamos um clique real do mouse no seu centro.
    const edgeCenter = await edge.locator('.react-flow__edge-interaction').evaluate(path => {
      const center = path.getPointAtLength(path.getTotalLength() / 2);
      const screen = new DOMPoint(center.x, center.y).matrixTransform(path.getScreenCTM());
      return { x: screen.x, y: screen.y };
    });
    await page.mouse.click(edgeCenter.x, edgeCenter.y);
    await expect(page.getByText(`Justificativa: ${initialText}`, { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Editar justificativa', exact: true }).click();
    // O editor atual tem duas textareas; a de criação é a única com placeholder.
    await page.locator('textarea:not([placeholder])').fill(editedText);
    await page.getByRole('button', { name: 'Salvar alteração', exact: true }).click();
    await expect(page.getByText(`Justificativa: ${editedText}`, { exact: true })).toBeVisible();
    await expect(page.locator('textarea:not([placeholder])')).toHaveCount(0);
    return {
      selectedCharacters: ['Jiraiya', 'Itachi Uchiha'],
      connectionCreated: true,
      edgeId: 'jiraiya-itachi',
      selectionMethod: 'Clique real no centro do traço SVG da conexão',
      initialJustification: initialText,
      editedJustification: editedText,
      editingConfirmedOnScreen: true,
      limitation: 'Estado local da sessão; o teste não afirma persistência após recarregar.',
    };
  });
} finally {
  await browser.close();
  await writeFile('docs/research/interaction-checks.json', JSON.stringify({
    checkedOn: '2026-11-16',
    browser: 'Microsoft Edge / Chromium headless via Playwright',
    isolation: 'Contextos descartáveis; requisições de escrita bloqueadas; nenhum dado pessoal.',
    results,
  }, null, 2));
}

if (results.some(result => result.status !== 'passed')) process.exitCode = 1;
