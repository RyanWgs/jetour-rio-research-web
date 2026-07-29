import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function render() {
  const workerUrl = new URL('../dist/server/index.js', import.meta.url);
  workerUrl.searchParams.set('test', `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request('http://localhost/', { headers: { accept: 'text/html' } }), {
    ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test('server renders the rio resource library shell', async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /捷途国际/);
  assert.match(html, /11月里约资源调研/);
  assert.match(html, /选择语言/);
  assert.match(html, /中文版/);
  assert.match(html, /English Version/);
  assert.doesNotMatch(html, /先做四个决定|先做4个决定/);
  assert.doesNotMatch(html, /候选资源<\/span>|决策模块|目标人数/);
  assert.doesNotMatch(html, /查看决策详情/);
  assert.doesNotMatch(html, /#timeline|11月时间轴|整个11月，一眼看清|2026年11月活动时间轴/);
  assert.doesNotMatch(html, /Your site is taking shape|SkeletonPreview/);
});

test('interactive resource details and motion styles are present', async () => {
  const [explorer, styles] = await Promise.all([
    readFile(new URL('../app/research-explorer.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/globals.css', import.meta.url), 'utf8'),
  ]);
  assert.match(explorer, /资源简介/);
  assert.match(explorer, /YouTube/);
  assert.match(explorer, /Instagram/);
  assert.match(explorer, /Facebook/);
  assert.match(explorer, /TikTok/);
  assert.match(explorer, /localStorage/);
  assert.match(explorer, /geography/);
  assert.match(explorer, /creatorVertical/);
  assert.match(explorer, /locale/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /position:sticky/);
  assert.match(styles, /\.library-hero h1 \{ max-width:100%/);
  assert.match(styles, /\.language-switch \{ flex:none/);
});

test('bilingual routes and approved module order are present', async () => {
  const shell = await readFile(new URL('../app/site-shell.tsx', import.meta.url), 'utf8');
  assert.match(shell, /\/zh\//);
  assert.match(shell, /\/en\//);
  const explorer = await readFile(new URL('../app/research-explorer.tsx', import.meta.url), 'utf8');
  assert.match(explorer, /festival[\s\S]+venue[\s\S]+ip[\s\S]+communication/);
});
