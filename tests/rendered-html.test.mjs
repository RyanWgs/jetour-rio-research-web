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
  assert.match(html, /里约四类资源/);
  assert.match(html, /音乐节与本地庆典/);
  assert.match(html, /体育与演艺大IP/);
  assert.match(html, /媒体与Content Creator/);
  assert.match(html, /项目选地/);
  assert.match(html, /Rock The Mountain/);
  assert.match(html, /访问官网|访问官方账号/);
  assert.match(html, /图片来源/);
  assert.match(html, /查看资源详情/);
  assert.match(html, /点击查看资源详情/);
  assert.match(html, /仅看收藏/);
  assert.match(html, /收藏/);
  assert.match(html, /billboard-com-br\.s3|carioca-matsuri-backend|storage-ndt/);
  assert.doesNotMatch(html, /先做四个决定|先做4个决定/);
  assert.doesNotMatch(html, /候选资源<\/span>|决策模块|目标人数/);
  assert.doesNotMatch(html, /查看决策详情/);
  assert.doesNotMatch(html, /#timeline|11月时间轴|整个11月，一眼看清|2026年11月活动时间轴/);
  assert.match(html, /section-index">01<\/span><h2>里约四类资源/);
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
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /position:sticky/);
});
