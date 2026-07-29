import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('GitHub Pages build emits a subpath-safe research site', async () => {
  const html = await readFile(new URL('../pages-dist/index.html', import.meta.url), 'utf8');
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /id="root"/);
  assert.match(html, /\/jetour-rio-research-web\/assets\//);
  assert.doesNotMatch(html, /(?:src|href)="\/assets\//);
  const assets = [...html.matchAll(/(?:src|href)="([^"]+\/assets\/[^"]+)"/g)].map((match) => match[1]);
  assert.ok(assets.length >= 2);
  for (const asset of assets) {
    const relative = asset.replace('/jetour-rio-research-web/', '');
    await access(new URL(`../pages-dist/${relative}`, import.meta.url));
  }
});
