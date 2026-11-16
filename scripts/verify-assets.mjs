import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const results = [];
for (const file of ['guitarrista_pixel_transparente.webp', 'guitarrista_pixel_transparente.gif', 'guitarrista_pixel_estatico.png']) {
  const original = await readFile(`assets/${file}`);
  const published = await readFile(`public/personagem/${file}`);
  const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');
  assert.equal(sha256(original), sha256(published), `Arquivo aprovado modificado: ${file}`);
  results.push({ file, unchanged: true, sha256: sha256(original), bytes: original.length });
  if (file.endsWith('.webp')) {
    assert(original.includes(Buffer.from('ANIM')), 'WebP sem bloco de animação');
    assert(original.includes(Buffer.from('ANMF')), 'WebP sem frames animados');
  }
}
await writeFile('docs/qa/assets.json', JSON.stringify(results, null, 2));
console.log('3 assets idênticos aos originais. WebP animado confirmado.');
