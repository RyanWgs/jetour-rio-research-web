# GitHub Pages Mobile Mirror Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a GitHub Pages mirror of the existing Jetour Rio research site that can be opened directly from mainland-China mobile networks without changing the report data or the current Sites deployment.

**Architecture:** Add a dedicated Vite client entry that renders the existing `app/page.tsx` and reuses the current React components, research data, media registry, and CSS. Build it with the repository subpath `/jetour-rio-research-web/`, then deploy the generated `pages-dist/` directory through GitHub Actions. Keep the existing vinext build and Sites URL unchanged.

**Tech Stack:** React 19, Vite 8, TypeScript, Node test runner, GitHub Actions, GitHub Pages, Globalping HTTP probes.

## Global Constraints

- The existing `chatgpt.site` deployment remains live and unchanged.
- The mirror is public and read-only; it adds no authentication, database, or editing capability.
- The mirror must reuse `app/page.tsx`, `app/research-explorer.tsx`, `src/research-data.js`, and `src/research-media.js` instead of copying report content.
- The GitHub Pages base path is exactly `/jetour-rio-research-web/`.
- Images remain full color and source links remain clickable.
- A failed remote image continues to disappear through the existing `ResearchImage` fallback.
- Success requires HTTP 200 from mobile User-Agents and no Cloudflare 403 from at least three mainland-China probes.

---

### Task 1: Static mirror build

**Files:**
- Create: `github-pages/index.html`
- Create: `github-pages/main.tsx`
- Create: `vite.pages.config.ts`
- Create: `tests/pages-build.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: default `Home` export from `app/page.tsx` and shared styles from `app/globals.css`.
- Produces: `pnpm build:pages`, which writes a deployable static site to `pages-dist/`.

- [ ] **Step 1: Write the failing static-build contract test**

Create `tests/pages-build.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the test to verify RED**

Run:

```bash
node --test tests/pages-build.test.mjs
```

Expected: FAIL with `ENOENT` for `pages-dist/index.html`.

- [ ] **Step 3: Add the minimal reusable client entry**

Create `github-pages/index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="捷途国际2026里约全球用户节：11月借势资源与项目选址领导决策版" />
    <link rel="icon" href="/jetour-rio-research-web/favicon.svg" />
    <title>捷途国际 2026 里约全球用户节 Research</title>
  </head>
  <body>
    <div id="root"></div>
    <noscript>请启用 JavaScript 查看完整研究报告。</noscript>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

Create `github-pages/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from '../app/page';
import '../app/globals.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root mount point');

createRoot(root).render(<StrictMode><Home /></StrictMode>);
```

Create `vite.pages.config.ts`:

```ts
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.join(projectRoot, 'github-pages'),
  base: '/jetour-rio-research-web/',
  plugins: [react()],
  resolve: { alias: { '@': projectRoot } },
  publicDir: path.join(projectRoot, 'public'),
  build: { outDir: path.join(projectRoot, 'pages-dist'), emptyOutDir: true },
});
```

Add package scripts:

```json
"build:pages": "vite build --config vite.pages.config.ts",
"test": "vinext build && vite build --config vite.pages.config.ts && node --test tests/*.test.mjs"
```

- [ ] **Step 4: Build and verify GREEN**

Run:

```bash
pnpm build:pages
node --test tests/pages-build.test.mjs
```

Expected: build exits 0 and the test passes.

- [ ] **Step 5: Commit the static mirror build**

```bash
git add github-pages/index.html github-pages/main.tsx vite.pages.config.ts tests/pages-build.test.mjs package.json
git commit -m "feat: add static pages mirror build"
```

---

### Task 2: GitHub Pages deployment workflow

**Files:**
- Create: `.github/workflows/pages.yml`
- Create: `tests/pages-workflow.test.mjs`

**Interfaces:**
- Consumes: `pnpm build:pages` and the generated `pages-dist/` directory from Task 1.
- Produces: a GitHub Pages deployment on every push to `main`, plus a manually runnable workflow.

- [ ] **Step 1: Write the failing workflow contract test**

Create `tests/pages-workflow.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the workflow test to verify RED**

Run:

```bash
node --test tests/pages-workflow.test.mjs
```

Expected: FAIL with `ENOENT` for `.github/workflows/pages.yml`.

- [ ] **Step 3: Add the minimal Pages workflow**

Create `.github/workflows/pages.yml`:

```yaml
name: Deploy GitHub Pages mirror

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10.20.0
      - uses: actions/setup-node@v4
        with:
          node-version: 22.22.0
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build:pages
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: pages-dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Verify GREEN and the complete local suite**

Run:

```bash
node --test tests/pages-workflow.test.mjs
pnpm test
pnpm lint
```

Expected: all commands exit 0.

- [ ] **Step 5: Commit the deployment workflow**

```bash
git add .github/workflows/pages.yml tests/pages-workflow.test.mjs
git commit -m "ci: publish pages mirror"
```

---

### Task 3: Publish and validate the mobile mirror

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: green local build, workflow, and the public GitHub repository.
- Produces: `https://ryanwgs.github.io/jetour-rio-research-web/` and documented primary/backup links.

- [ ] **Step 1: Enable workflow-based Pages and push `main`**

Run:

```bash
gh api --method POST repos/RyanWgs/jetour-rio-research-web/pages -f build_type=workflow
git push origin main
```

If the Pages endpoint already exists, run:

```bash
gh api --method PUT repos/RyanWgs/jetour-rio-research-web/pages -f build_type=workflow
git push origin main
```

- [ ] **Step 2: Wait for the deployment workflow**

Run:

```bash
run_id=$(gh run list --workflow pages.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$run_id" --exit-status
```

Expected: `conclusion` is `success`.

- [ ] **Step 3: Verify the public mirror with mobile User-Agents**

Run:

```bash
for user_agent in \
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 Version/18.5 Mobile/15E148 Safari/604.1' \
  'Mozilla/5.0 (Linux; Android 15; Pixel 9 Pro) AppleWebKit/537.36 Chrome/138.0.0.0 Mobile Safari/537.36'; do
  response_file=$(mktemp)
  status=$(curl -L -sS --max-time 30 -A "$user_agent" -o "$response_file" -w '%{http_code}' 'https://ryanwgs.github.io/jetour-rio-research-web/')
  test "$status" = 200
  rg -q '捷途国际 2026 里约全球用户节 Research' "$response_file"
  rm "$response_file"
done
```

Expected for both: HTTP 200, effective URL remains on `ryanwgs.github.io`, and the response contains `捷途国际 2026 里约全球用户节 Research`.

- [ ] **Step 4: Verify from mainland-China probes**

Run:

```bash
measurement_id=$(curl -sS -X POST 'https://api.globalping.io/v1/measurements' \
  -H 'Content-Type: application/json' \
  --data '{"target":"ryanwgs.github.io","type":"http","locations":[{"country":"CN","limit":3}],"measurementOptions":{"protocol":"HTTPS","request":{"method":"GET","path":"/jetour-rio-research-web/"}}}' \
  | jq -r '.id')
sleep 5
curl -sS "https://api.globalping.io/v1/measurements/$measurement_id" \
  | jq '{status, probes: [.results[] | {city: .probe.city, code: .result.statusCode, body: .result.rawBody[0:80]}]}'
```

Expected: measurement finishes; all three probes return HTTP 200 and none returns the Cloudflare `Attention Required` or `Sorry, you have been blocked` page.

- [ ] **Step 5: Add the verified link to README**

Replace the online-version section with:

```markdown
## 在线版本

- 国内手机备用镜像：<https://ryanwgs.github.io/jetour-rio-research-web/>
- 正式在线页面：<https://jetour-rio-research-2026.ryan19921230.chatgpt.site>
- GitHub 源码：<https://github.com/RyanWgs/jetour-rio-research-web>
```

- [ ] **Step 6: Commit, push, and verify the documentation deployment**

```bash
git add README.md
git commit -m "docs: add mobile mirror link"
git push origin main
run_id=$(gh run list --workflow pages.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$run_id" --exit-status
curl -L -sS --max-time 30 -o /dev/null -w '%{http_code}\n' 'https://ryanwgs.github.io/jetour-rio-research-web/'
```

Wait for the new Pages run and verify the same public URL still returns HTTP 200.
