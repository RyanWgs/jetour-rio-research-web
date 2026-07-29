# Bilingual Resource Library Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在同一域名提供语言选择首页、中文双类目资料库和英文四类目拉丁美洲资料库，并保持现有互动与双渠道发布能力。

**Architecture:** 使用三个可分享路径`/`、`/zh/`、`/en/`。共享`LanguageLanding`和`ResourceLibraryPage`组件；`ResearchExplorer`改为接收locale、items及moduleOrder，避免在组件内部硬编码中文数据。Cloudflare使用App Router路径，GitHub Pages生成三个静态HTML入口并由同一客户端路由器选择页面。

**Tech Stack:** Next.js/Vinext、React 19、TypeScript、CSS、Vite multi-page build、Cloudflare Pages、GitHub Pages

## Global Constraints

- 首页必须先选择语言。
- 中文版只显示音乐节与本地庆典、项目选地。
- 英文版类目顺序必须为Events、Venues、Sports & Entertainment IP、Media & Content Creators。
- 英文版第三、四类必须支持Country / Region筛选。
- 两个版本保留搜索、排序、收藏、仅看收藏、彩色图片和资源详情。
- 390×844手机端不得横向溢出。
- `/`、`/zh/`、`/en/`必须能直接访问和分享。

---

### Task 1: 建立语言入口和三条路由

**Files:**
- Create: `app/language-landing.tsx`
- Create: `app/resource-library-page.tsx`
- Create: `app/zh/page.tsx`
- Create: `app/en/page.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- `LanguageLanding(): JSX.Element`
- `ResourceLibraryPage({ locale }: { locale: 'zh' | 'en' }): JSX.Element`

- [ ] **Step 1: 写三路径失败测试**

```js
for (const [path, expected] of [['/', '选择语言'], ['/zh/', '11月里约资源调研'], ['/en/', 'November Rio Resource Research']]) {
  test(`${path} renders its expected page`, async () => {
    const html = await renderPath(path);
    assert.match(html, new RegExp(expected));
  });
}
```

- [ ] **Step 2: 构建并确认`/zh/`和`/en/`失败**

Run: `pnpm build && node --test tests/rendered-html.test.mjs`

- [ ] **Step 3: 创建共享页面和路由**

```tsx
export default function ZhPage() { return <ResourceLibraryPage locale="zh" />; }
export default function EnPage() { return <ResourceLibraryPage locale="en" />; }
```

入口页链接使用`href="/zh/"`和`href="/en/"`，两个资料库页提供返回`/`的语言入口。

- [ ] **Step 4: 运行路由测试并提交**

Run: `pnpm build && node --test tests/rendered-html.test.mjs`

```bash
git add app/page.tsx app/language-landing.tsx app/resource-library-page.tsx app/zh/page.tsx app/en/page.tsx tests/rendered-html.test.mjs
git commit -m "feat: add language landing and bilingual routes"
```

### Task 2: 参数化Explorer与模块顺序

**Files:**
- Modify: `app/research-explorer.tsx`
- Modify: `app/resource-library-page.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- `ResearchExplorer({ locale, items, modules }: { locale: 'zh' | 'en'; items: ResearchItem[]; modules: ModuleDefinition[] })`
- `ModuleDefinition = { id: 'festival' | 'venue' | 'ip' | 'communication'; label: string; eyebrow: string; description: string }`

- [ ] **Step 1: 写模块可见性和顺序失败测试**

```js
assert.doesNotMatch(zhHtml, /体育与演艺大IP|媒体与Content Creator/);
assert.ok(enHtml.indexOf('Festivals & Local Celebrations') < enHtml.indexOf('Venues'));
assert.ok(enHtml.indexOf('Venues') < enHtml.indexOf('Sports & Entertainment IP'));
assert.ok(enHtml.indexOf('Sports & Entertainment IP') < enHtml.indexOf('Media & Content Creators'));
```

- [ ] **Step 2: 运行测试确认当前硬编码模块失败**

Run: `pnpm build && node --test tests/rendered-html.test.mjs`

- [ ] **Step 3: 将items与modules改为props**

`ResourceLibraryPage`调用`getCatalog(locale)`，中文版传入`['festival','venue']`，英文版传入`['festival','venue','ip','communication']`；Explorer不再直接导入`researchItems`。

- [ ] **Step 4: 运行测试并提交**

Run: `pnpm build && node --test tests/rendered-html.test.mjs`

```bash
git add app/research-explorer.tsx app/resource-library-page.tsx tests/rendered-html.test.mjs
git commit -m "feat: configure bilingual resource modules"
```

### Task 3: 英文UI与地域、Creator筛选

**Files:**
- Create: `src/ui-copy.js`
- Modify: `src/filters.js`
- Modify: `tests/filters.test.mjs`
- Modify: `app/research-explorer.tsx`

**Interfaces:**
- `uiCopy.zh`与`uiCopy.en`提供所有按钮、状态、筛选和详情标签。
- `selectItems`新增`country`、`region`、`creatorVertical`过滤字段。

- [ ] **Step 1: 写筛选失败测试**

```js
test('country and creator vertical filters combine', () => {
  const result = selectItems(fixtures, { country: 'Mexico', creatorVertical: 'sports' });
  assert.deepEqual(result.map((item) => item.id), ['mx-sports-creator']);
});
```

- [ ] **Step 2: 运行测试确认新筛选字段尚未生效**

Run: `node --test tests/filters.test.mjs`

- [ ] **Step 3: 实现组合筛选**

```js
if (state.country && state.country !== 'all' && item.geography?.country !== state.country) return false;
if (state.region && state.region !== 'all' && item.geography?.region !== state.region) return false;
if (state.creatorVertical && state.creatorVertical !== 'all' && item.creatorVertical !== state.creatorVertical) return false;
```

英文版第三、四类显示Country / Region；第四类额外显示Resource Type和Creator Vertical。所有状态、按钮、空结果、资源详情与社媒状态从`uiCopy[locale]`读取。

- [ ] **Step 4: 运行筛选与渲染测试并提交**

Run: `node --test tests/filters.test.mjs && pnpm build && node --test tests/rendered-html.test.mjs`

```bash
git add src/ui-copy.js src/filters.js tests/filters.test.mjs app/research-explorer.tsx
git commit -m "feat: add English UI and regional filters"
```

### Task 4: GitHub Pages三入口静态构建

**Files:**
- Create: `github-pages/zh/index.html`
- Create: `github-pages/en/index.html`
- Create: `github-pages/router.tsx`
- Modify: `github-pages/main.tsx`
- Modify: `vite.pages.config.ts`
- Modify: `tests/pages-build.test.mjs`

**Interfaces:**
- 静态客户端根据`window.location.pathname`渲染Landing、中文或英文共享组件。
- Vite multi-page input输出`index.html`、`zh/index.html`、`en/index.html`。

- [ ] **Step 1: 写静态产物失败测试**

```js
for (const file of ['pages-dist/index.html', 'pages-dist/zh/index.html', 'pages-dist/en/index.html']) {
  assert.equal((await stat(file)).isFile(), true);
}
```

- [ ] **Step 2: 运行构建确认语言子目录缺失**

Run: `pnpm build:pages && node --test tests/pages-build.test.mjs`

- [ ] **Step 3: 配置multi-page输入**

```ts
build: {
  rollupOptions: {
    input: {
      index: path.join(projectRoot, 'github-pages/index.html'),
      zh: path.join(projectRoot, 'github-pages/zh/index.html'),
      en: path.join(projectRoot, 'github-pages/en/index.html'),
    }
  }
}
```

- [ ] **Step 4: 验证Cloudflare与GitHub静态构建并提交**

Run: `pnpm build:pages && pnpm build:cloudflare && node --test tests/pages-build.test.mjs tests/cloudflare-build.test.mjs`

```bash
git add github-pages/zh/index.html github-pages/en/index.html github-pages/router.tsx github-pages/main.tsx vite.pages.config.ts tests/pages-build.test.mjs
git commit -m "feat: build bilingual static entry points"
```

### Task 5: 响应式QA、文档与双渠道发布

**Files:**
- Modify: `app/globals.css`
- Modify: `qa/local-review.md`
- Modify: `README.md`

**Interfaces:**
- Produces: 可公开访问的Cloudflare主站和GitHub Pages备用站。

- [ ] **Step 1: 完善入口页与筛选响应式样式**

入口选择卡在桌面并列、手机纵向排列；英文四模块手机2×2；国家、区域、资源类型和Creator Vertical筛选在390px宽度自动换行。

- [ ] **Step 2: 运行完整验证**

Run: `pnpm test && pnpm lint && git diff --check`

Expected: 所有数据、筛选、路由、图片、收藏和三入口构建测试PASS。

- [ ] **Step 3: 浏览器QA**

逐一检查`/`、`/zh/`、`/en/`的桌面默认视口和390×844手机视口；验证语言选择、模块顺序、国家筛选、Creator Vertical、收藏、图片详情和外链；确认无横向溢出和控制台脚本错误。

- [ ] **Step 4: 更新文档并提交**

```bash
git add app/globals.css qa/local-review.md README.md
git commit -m "docs: verify bilingual resource library"
```

- [ ] **Step 5: 发布并验证**

```bash
git push origin main
pnpm exec wrangler pages deploy cloudflare-dist --project-name jetour-rio-research --branch main
```

确认Cloudflare和GitHub Pages的`/`、`/zh/`、`/en/`均返回HTTP 200，并抽查英文页面不出现中文UI标签。
