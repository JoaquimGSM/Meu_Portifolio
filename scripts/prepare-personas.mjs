import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

await mkdir('docs/qa/personas', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const inventory = [];
try {
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5173');
  for (const id of ['guitarrista', 'boxeador', 'tenista']) {
    const result = await page.evaluate(async (id) => {
      const response = await fetch(`/personagens/${id}.gif`);
      const decoder = new ImageDecoder({ data: await response.arrayBuffer(), type: 'image/gif' });
      await decoder.tracks.ready;
      const { image } = await decoder.decode({ frameIndex: 0 });
      const canvas = document.createElement('canvas');
      canvas.width = image.displayWidth;
      canvas.height = image.displayHeight;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const corners = [0, canvas.width - 1, canvas.width * (canvas.height - 1), canvas.width * canvas.height - 1].map((index) => [...pixels.slice(index * 4, index * 4 + 4)]);
      const data = canvas.toDataURL('image/png').split(',')[1];
      const metadata = { width: canvas.width, height: canvas.height, frames: decoder.tracks.selectedTrack.frameCount, corners };
      image.close();
      decoder.close();
      return { data, ...metadata };
    }, id);
    await writeFile(`public/personagens/${id}-poster.png`, Buffer.from(result.data, 'base64'));
    const original = await readFile(`public/personagens/${id}.gif`);
    inventory.push({ id, ...Object.fromEntries(Object.entries(result).filter(([key]) => key !== 'data')), bytes: original.length, sha256: createHash('sha256').update(original).digest('hex') });
  }
} finally { await browser.close(); }
await writeFile('docs/qa/personas/assets.json', JSON.stringify(inventory, null, 2));
console.log(JSON.stringify(inventory, null, 2));
