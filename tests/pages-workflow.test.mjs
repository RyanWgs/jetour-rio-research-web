import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Pages workflow builds and deploys the static mirror', async () => {
  const workflow = await readFile(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
  assert.match(workflow, /pages:\s*write/);
  assert.match(workflow, /id-token:\s*write/);
  assert.match(workflow, /pnpm build:pages/);
  assert.match(workflow, /path:\s*pages-dist/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});
