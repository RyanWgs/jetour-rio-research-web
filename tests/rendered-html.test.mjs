import assert from 'node:assert/strict';
import test from 'node:test';

async function render() {
  const workerUrl = new URL('../dist/server/index.js', import.meta.url);
  workerUrl.searchParams.set('test', `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request('http://localhost/', { headers: { accept: 'text/html' } }), {
    ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test('server renders the leadership research shell', async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /捷途国际/);
  assert.match(html, /11月借势资源与项目选址/);
  assert.match(html, /音乐节与本地庆典/);
  assert.match(html, /体育与演艺大IP/);
  assert.match(html, /媒体与Content Creator/);
  assert.match(html, /项目选地/);
  assert.match(html, /SSL Gold Cup/);
  assert.doesNotMatch(html, /Your site is taking shape|SkeletonPreview/);
});
