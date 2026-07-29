import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('Cloudflare Pages build emits root-relative assets', async () => {
  const html = await readFile(new URL('../cloudflare-dist/index.html', import.meta.url), 'utf8');
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /(?:src|href)="\/assets\//);
  assert.doesNotMatch(html, /\/jetour-rio-research-web\/assets\//);
  const assets = [...html.matchAll(/(?:src|href)="\/(assets\/[^"]+)"/g)].map((match) => match[1]);
  assert.ok(assets.length >= 2);
  for (const asset of assets) {
    await access(new URL(`../cloudflare-dist/${asset}`, import.meta.url));
  }
});
