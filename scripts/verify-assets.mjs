import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const approved = {
  guitarrista: '22b346e982e72f8125e115271c8f5b9488f5e4cd7e0451eb765e2b6b3343cb69',
  boxeador: '4a01e9bfb0a6ff1078b84cd50dd0ce59d6311cb3eb0ea36a3c786e219e99a0b0',
  tenista: '8e4b9f9cfa328ebe2134090dc66edf0fe3a3042baab85ca591d91fb2b547c215',
};
function gifFrames(buffer) {
  let offset = 13 + ((buffer[10] & 128) ? 3 * 2 ** ((buffer[10] & 7) + 1) : 0);
  let frames = 0;
  const skipBlocks = () => { while (buffer[offset]) offset += buffer[offset] + 1; offset++; };
  while (offset < buffer.length) {
    const marker = buffer[offset++];
    if (marker === 0x3b) break;
    if (marker === 0x21) { offset++; skipBlocks(); }
    else if (marker === 0x2c) {
      frames++;
      const packed = buffer[offset + 8];
      offset += 9 + ((packed & 128) ? 3 * 2 ** ((packed & 7) + 1) : 0);
      offset++;
      skipBlocks();
    } else throw new Error(`Bloco GIF inesperado em ${offset - 1}`);
  }
  return frames;
}
const results = [];
for (const [id, hash] of Object.entries(approved)) {
  const file = await readFile(`public/personagens/${id}.gif`);
  const sha256 = createHash('sha256').update(file).digest('hex');
  assert.equal(sha256, hash, `GIF aprovado modificado: ${id}`);
  assert.equal(gifFrames(file), 9, `${id}: quantidade de frames`);
  assert(file.includes(Buffer.from('NETSCAPE2.0')), `${id}: extensão de loop ausente`);
  const poster = await readFile(`public/personagens/${id}-poster.png`);
  assert.equal(poster.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  results.push({ id, unchanged: true, sha256, bytes: file.length, frames: 9, width: file.readUInt16LE(6), height: file.readUInt16LE(8), posterBytes: poster.length });
}
await writeFile('docs/qa/pixel/verified-assets.json', JSON.stringify(results, null, 2));
console.log('3 GIFs idênticos aos aprovados; 9 frames por personagem; 3 pôsteres PNG.');
