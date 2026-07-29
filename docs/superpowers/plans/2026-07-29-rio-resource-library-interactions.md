# 11月里约资源资料库互动改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把现有领导决策页面改成“11月里约资源调研”纯资料库，为64项资源增加中文简介，为13项Content Creator和10项体育/演艺IP增加官方社媒快照，并提供图片详情、收藏、仅看收藏和轻量动态交互。

**Architecture:** 保持 `src/research-data.js` 为Cloudflare、GitHub Pages和vinext应用共用的单一内容源；将收藏持久化与收藏筛选拆成可独立测试的纯函数，再由 `ResearchExplorer` 协调卡片、详情和筛选状态。社媒数据采用四平台固定槽位和显式状态，任何已核验数字都必须附官方账号链接及核验日期。

**Tech Stack:** React 19、TypeScript、Next/vinext、Vite静态构建、原生 `<dialog>`、浏览器 `localStorage`、Node.js `node:test`、CSS。

## Global Constraints

- 页面及浏览器标题必须统一为“11月里约资源调研”。
- 删除“先做4个决定”完整章节和“64 / 4 / 30 / 700”统计模块。
- 页面顺序固定为：主视觉标题、11月时间轴、里约四类资源、信息边界。
- 64项资源均需有50至100字左右的独立中文简介，只使用已核验事实。
- 13项Content Creator和10项体育/演艺IP均需具备YouTube、Instagram、Facebook、TikTok四个平台的明确状态。
- 已核验社媒数字必须来自官方账号，带官方链接、显示值、主页原始显示值和 `2026-07-29` 核验日期；不可核验时使用 `not_found` 或 `not_public`，不得填0或估算。
- 收藏只在同一浏览器设备持久化，不新增账号、登录、导出、分享、比较或跨设备同步。
- 图片来源链接继续直接打开来源页，不得触发资源详情。
- 动画必须遵循 `prefers-reduced-motion`，390px宽度不得横向溢出。
- 所有内容和交互继续由Cloudflare Pages主链接与GitHub Pages备用链接共用，不复制页面数据。

---

## File Map

- Modify: `src/research-data.js` — 标题、64项中文简介、23项资源的四平台社媒快照。
- Create: `src/favorites.js` — 收藏解析、序列化、切换和筛选纯函数。
- Modify: `src/filters.js` — 将收藏集合纳入现有选择管线。
- Modify: `app/page.tsx` — 删除决策与统计区，调整标题、导航、章节顺序和文案。
- Modify: `app/research-image.tsx` — 提供键盘可用的图片详情入口，并隔离图片来源链接。
- Modify: `app/research-explorer.tsx` — 收藏状态、详情简介、社媒展示、仅看收藏和空状态。
- Modify: `app/globals.css` — 资料库布局、吸顶分类、收藏、社媒栏、点击提示、动画及响应式。
- Modify: `github-pages/index.html` — GitHub Pages浏览器标题和描述。
- Modify: `tests/data.test.mjs` — 中文简介和社媒数据契约。
- Create: `tests/favorites.test.mjs` — 收藏纯函数与异常输入。
- Modify: `tests/filters.test.mjs` — 收藏与现有筛选组合。
- Modify: `tests/rendered-html.test.mjs` — 新标题、移除区块、资源详情文案和服务端安全。
- Modify: `tests/media.test.mjs` — 图片入口与来源链接契约所需的代表性数据检查。
- Modify: `README.md` and `qa/local-review.md` — 功能、社媒快照边界和最终QA记录。

---

### Task 1: 锁定资料库内容与社媒数据契约

**Files:**
- Modify: `tests/data.test.mjs`
- Modify: `src/research-data.js`

**Interfaces:**
- Produces: 每个 `ResearchItem` 新增 `introduction: string`。
- Produces: 适用资源新增 `socialReach: { checkedAt: string, platforms: Record<SocialPlatform, SocialAccount> }`。
- Produces: `SocialPlatform = 'youtube' | 'instagram' | 'facebook' | 'tiktok'`。
- Produces: `SocialAccount = { status: 'verified', url: string, display: string, raw: string } | { status: 'not_found' | 'not_public' }`。

- [ ] **Step 1: 先写会失败的中文简介和社媒契约测试**

在 `tests/data.test.mjs` 增加：

```js
const socialPlatforms = ['youtube', 'instagram', 'facebook', 'tiktok'];
const socialIds = new Set([
  'acelerados', 'lucas-fontana', 'juliano-barata', 'maria-clara',
  'carioca-nomundo', 'mundo-sem-fim', 'giro-carioca', 'carioquess',
  'cazetv', 'futparodias', 'gabriel-medina', 'pedro-sampaio', 'samanta-alves',
  'ssl-gold-cup', 'roxy-dinner-show', 'carnaval-experience', 'botafogo',
  'flamengo', 'fluminense', 'vasco', 'nilton-santos',
  'theatro-municipal-ip', 'futevolei'
]);

test('every resource has a decision-ready Chinese introduction', () => {
  assert.equal(researchItems.length, 64);
  for (const item of researchItems) {
    assert.equal(typeof item.introduction, 'string', item.id);
    assert.ok(item.introduction.length >= 35, item.id);
    assert.ok(item.introduction.length <= 140, item.id);
  }
});

test('creators and sports-entertainment IPs have explicit four-platform snapshots', () => {
  assert.equal(socialIds.size, 23);
  for (const item of researchItems.filter((entry) => socialIds.has(entry.id))) {
    assert.equal(item.socialReach.checkedAt, '2026-07-29', item.id);
    assert.deepEqual(Object.keys(item.socialReach.platforms).sort(), [...socialPlatforms].sort(), item.id);
    for (const platform of socialPlatforms) {
      const account = item.socialReach.platforms[platform];
      assert.ok(['verified', 'not_found', 'not_public'].includes(account.status), `${item.id}:${platform}`);
      if (account.status === 'verified') {
        assert.match(account.url, /^https:\/\//, `${item.id}:${platform}`);
        assert.ok(account.display && account.raw, `${item.id}:${platform}`);
      }
    }
  }
});
```

- [ ] **Step 2: 运行测试并确认因字段缺失而失败**

Run:

```bash
node --test tests/data.test.mjs
```

Expected: FAIL at `item.introduction` or `item.socialReach` because the new fields do not yet exist.

- [ ] **Step 3: 为64项资源写独立中文简介**

在 `item()` 默认配置中不提供通用简介；逐项在 `researchItems` 配置中写入 `introduction`。每条按“主体性质 + 本地地位或场景 + 项目关注价值”组织，例如：

```js
introduction: 'Rock The Mountain 是在里约州山地举行的大型户外音乐节，横跨两个周末并聚集多舞台演出。它连接年轻、户外与可持续生活方式人群，适合作为捷途SUV内容和小规模车主体验的借势资源。'
```

不得把 `relevance` 原样复制为简介；不得添加现有 `sources` 和 `influence.basis` 未支持的新数字。

- [ ] **Step 4: 为23项适用资源先加入四平台显式状态骨架**

在 `src/research-data.js` 增加小型构造函数并逐项赋值：

```js
const social = (platforms) => ({ checkedAt: '2026-07-29', platforms });
const verified = (url, display, raw) => ({ status: 'verified', url, display, raw });
const notFound = () => ({ status: 'not_found' });
const notPublic = () => ({ status: 'not_public' });
```

每个适用资源必须显式列出四个平台，不允许构造函数暗中补全缺失键。

- [ ] **Step 5: 运行数据测试并确认仅真实数据项仍需完成**

Run: `node --test tests/data.test.mjs`

Expected: PASS only when 64条简介与23×4个平台状态全部存在且符合契约。

- [ ] **Step 6: 提交内容契约与中文简介**

```bash
git add src/research-data.js tests/data.test.mjs
git commit -m "content: add resource introductions and social schema"
```

---

### Task 2: 核验23项资源的官方社媒快照

**Files:**
- Modify: `src/research-data.js`
- Create: `research/social-reach-register.md`

**Interfaces:**
- Consumes: Task 1的 `socialReach`、`verified()`、`notFound()`、`notPublic()`。
- Produces: 92个平台槽位的可追溯状态，以及每个已核验账号的官方链接和公开粉丝快照。

- [ ] **Step 1: 生成固定核验清单**

Run:

```bash
node --input-type=module -e "import {researchItems} from './src/research-data.js'; console.log(researchItems.filter(x=>x.category==='creator'||x.category==='ip').map(x=>x.id+' | '+x.name).join('\\n'))"
```

Expected: exactly 23 lines: 13 creators and 10 IP resources.

- [ ] **Step 2: 按平台核验官方账号**

对每个资源依次检查官方站点已链接账号、YouTube About/频道主页、Instagram主页、Facebook主页和TikTok主页。仅接受下列证据之一：

1. 资源官方网站直接链接该账号；
2. 平台认证主页明确对应资源主体；
3. 已核验官方账号的简介反向链接资源官网。

YouTube优先读取频道公开订阅数；Instagram、Facebook和TikTok读取公开主页显示值。平台页面因登录墙或地区限制无法读取时使用 `not_public`；官方账号经官网和平台搜索均未找到时使用 `not_found`。

- [ ] **Step 3: 写入真实快照并登记证据**

数据示例格式：

```js
socialReach: social({
  youtube: verified('https://www.youtube.com/@OfficialHandle', '1.2百万', '1.2M subscribers'),
  instagram: verified('https://www.instagram.com/officialhandle/', '845万', '8.45M followers'),
  facebook: notPublic(),
  tiktok: notFound()
})
```

`research/social-reach-register.md` 每个资源写一行，字段固定为：资源ID、平台、官方URL、页面显示值、状态、官方身份依据、核验日期。不得记录搜索结果页作为来源。

- [ ] **Step 4: 复核单位换算和官方身份**

对所有 `verified` 项逐一确认：

- `display` 的“万/百万”与 `raw` 一致；
- URL不是粉丝站、短链跳转或搜索页；
- 同一主体没有把个人账号与机构账号混用；
- `checkedAt` 为 `2026-07-29`。

- [ ] **Step 5: 运行数据测试**

Run: `node --test tests/data.test.mjs`

Expected: PASS, with exactly 23 applicable resources and four explicit platform states each.

- [ ] **Step 6: 提交社媒快照**

```bash
git add src/research-data.js research/social-reach-register.md tests/data.test.mjs
git commit -m "research: add verified social reach snapshots"
```

---

### Task 3: 实现收藏持久化与收藏筛选纯函数

**Files:**
- Create: `src/favorites.js`
- Create: `tests/favorites.test.mjs`
- Modify: `src/filters.js`
- Modify: `tests/filters.test.mjs`

**Interfaces:**
- Produces: `parseFavoriteIds(raw: string | null): Set<string>`。
- Produces: `serializeFavoriteIds(ids: Iterable<string>): string`。
- Produces: `toggleFavoriteId(ids: Iterable<string>, id: string): Set<string>`。
- Produces: `filterFavoriteItems(items, favoriteIds, onlyFavorites)`。
- Extends: `selectItems(items, state)` accepts `favoriteIds` and `onlyFavorites`.

- [ ] **Step 1: 写收藏纯函数失败测试**

Create `tests/favorites.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFavoriteIds, serializeFavoriteIds, toggleFavoriteId } from '../src/favorites.js';

test('favorite ids survive serialization without duplicates', () => {
  assert.deepEqual([...parseFavoriteIds(serializeFavoriteIds(['b', 'a', 'a']))], ['a', 'b']);
});

test('invalid storage falls back to an empty set', () => {
  assert.deepEqual([...parseFavoriteIds('{broken')], []);
  assert.deepEqual([...parseFavoriteIds(JSON.stringify({ ids: 'wrong' }))], []);
});

test('toggle returns a new set and flips one id', () => {
  const original = new Set(['a']);
  assert.deepEqual([...toggleFavoriteId(original, 'a')], []);
  assert.deepEqual([...original], ['a']);
  assert.deepEqual([...toggleFavoriteId(original, 'b')].sort(), ['a', 'b']);
});
```

- [ ] **Step 2: 运行测试并确认模块不存在**

Run: `node --test tests/favorites.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `src/favorites.js`.

- [ ] **Step 3: 实现最小收藏模块**

Create `src/favorites.js`:

```js
export const FAVORITES_STORAGE_KEY = 'jetour-rio-favorites-v1';

export function parseFavoriteIds(raw) {
  try {
    const parsed = JSON.parse(raw || 'null');
    if (!parsed || !Array.isArray(parsed.ids)) return new Set();
    return new Set(parsed.ids.filter((id) => typeof id === 'string').sort());
  } catch {
    return new Set();
  }
}

export function serializeFavoriteIds(ids) {
  return JSON.stringify({ ids: [...new Set(ids)].sort() });
}

export function toggleFavoriteId(ids, id) {
  const next = new Set(ids);
  if (next.has(id)) next.delete(id); else next.add(id);
  return next;
}
```

- [ ] **Step 4: 扩展筛选测试**

在 `tests/filters.test.mjs` 增加：

```js
test('favorites combine with category and query filters', () => {
  const result = selectItems(fixtures, {
    onlyFavorites: true,
    favoriteIds: new Set(['b']),
    query: 'creator'
  });
  assert.deepEqual(result.map((item) => item.id), ['b']);
});
```

- [ ] **Step 5: 将收藏筛选接入选择管线**

在 `src/filters.js` 导出并使用：

```js
export function filterFavoriteItems(items, favoriteIds = new Set(), onlyFavorites = false) {
  if (!onlyFavorites) return [...items];
  return items.filter((item) => favoriteIds.has(item.id));
}

export function selectItems(items, state = {}) {
  const filtered = filterItems(items, state);
  const searched = searchItems(filtered, state.query);
  const favorited = filterFavoriteItems(searched, state.favoriteIds, state.onlyFavorites);
  return sortItems(favorited, state.sort);
}
```

- [ ] **Step 6: 运行收藏与筛选测试**

Run: `node --test tests/favorites.test.mjs tests/filters.test.mjs`

Expected: all tests PASS.

- [ ] **Step 7: 提交收藏核心**

```bash
git add src/favorites.js src/filters.js tests/favorites.test.mjs tests/filters.test.mjs
git commit -m "feat: add persistent favorite data model"
```

---

### Task 4: 把页面外壳改成纯资源资料库

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Modify: `app/page.tsx`
- Modify: `src/research-data.js`
- Modify: `github-pages/index.html`

**Interfaces:**
- Consumes: `siteMeta.title = '11月里约资源调研'`。
- Produces: 页面顺序为hero → timeline → research → methodology。

- [ ] **Step 1: 将服务端渲染测试改为新页面契约**

把原测试名称改为 `server renders the rio resource library shell`，并增加：

```js
assert.match(html, /11月里约资源调研/);
assert.match(html, /里约四类资源/);
assert.doesNotMatch(html, /先做四个决定|先做4个决定/);
assert.doesNotMatch(html, /候选资源<\/span>|决策模块|目标人数/);
assert.doesNotMatch(html, /查看决策详情/);
```

同时把原来的 `assert.match(html, /11月借势资源与项目选址/)` 替换为新标题或新subtitle断言，不能保留旧定位文案。

- [ ] **Step 2: 运行渲染测试并确认旧文案导致失败**

Run: `pnpm build && node --test tests/rendered-html.test.mjs`

Expected: FAIL because the old hero, decision section and detail copy still render.

- [ ] **Step 3: 简化 `app/page.tsx`**

- 删除 `decisionHighlights`、`blackoutWindows` imports和相关类型。
- 删除 `hero-stats`、`decision-section`、`window-board` JSX。
- 顶部导航只保留“11月时间轴”和“里约四类资源”。
- hero使用单行主标题 `11月里约资源调研`，主按钮文案为“浏览全部资源”并指向 `#research`。
- 时间轴章节编号改为 `01`，资源章节编号改为 `02`，信息边界编号改为 `03`。
- 资源标题改为“里约四类资源”，说明改为“按活动、体育与演艺IP、传播资源和项目场地浏览完整资料。”

- [ ] **Step 4: 更新站点元数据和静态入口**

在 `src/research-data.js`：

```js
title: '11月里约资源调研',
subtitle: '2026年11月里约活动、体育与演艺IP、传播资源及项目场地资料库'
```

在 `github-pages/index.html` 使用相同 `<title>` 和description。

- [ ] **Step 5: 构建并运行渲染测试**

Run: `pnpm build && node --test tests/rendered-html.test.mjs`

Expected: PASS.

- [ ] **Step 6: 提交资料库外壳**

```bash
git add app/page.tsx src/research-data.js github-pages/index.html tests/rendered-html.test.mjs
git commit -m "feat: refocus site as rio resource library"
```

---

### Task 5: 让图片入口和资源详情可访问

**Files:**
- Modify: `app/research-image.tsx`
- Modify: `app/research-explorer.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Extends: `ResearchImage({ media, compact, onOpen, openLabel })`。
- Consumes: `ResearchItem.introduction` and `ResearchItem.socialReach`。

- [ ] **Step 1: 增加失败的渲染契约断言**

在 `tests/rendered-html.test.mjs` 增加：

```js
assert.match(html, /查看资源详情/);
assert.match(html, /资源简介/);
assert.match(html, /点击查看资源详情/);
assert.doesNotMatch(html, /查看决策详情/);
```

- [ ] **Step 2: 构建并确认新详情文案缺失**

Run: `pnpm build && node --test tests/rendered-html.test.mjs`

Expected: FAIL on `查看资源详情` or `资源简介`.

- [ ] **Step 3: 扩展 `ResearchImage` 点击接口**

使用可聚焦按钮包裹主图片，但让figcaption来源链接保持独立并阻止触发详情：

```tsx
export function ResearchImage({ media, compact = false, onOpen, openLabel }: {
  media: ResearchMedia;
  compact?: boolean;
  onOpen?: () => void;
  openLabel?: string;
}) {
  // failed fallback stays unchanged
  return <figure className={`research-image ${media.kind}${compact ? ' compact' : ''}`}>
    {onOpen ? <button className="research-image-open" onClick={onOpen} aria-label={openLabel}>
      <img src={media.src} alt={media.alt} loading="lazy" onError={() => setFailed(true)} />
      <span>点击查看资源详情</span>
    </button> : <img src={media.src} alt={media.alt} loading="lazy" onError={() => setFailed(true)} />}
    <figcaption><a onClick={(event) => event.stopPropagation()} href={media.sourceUrl} target="_blank" rel="noopener noreferrer">图片来源 · {media.sourceLabel} ↗</a></figcaption>
  </figure>;
}
```

- [ ] **Step 4: 在卡片和弹窗接入资源详情**

- 卡片图片传入 `onOpen={() => setSelected(entry)}` 和 `openLabel={`查看${entry.name}资源详情`}`。
- 卡片按钮文案改为“查看资源详情”。
- 弹窗图片保持非嵌套按钮模式。
- 资源名称后新增 `<section className="resource-introduction">`，包含标题“资源简介”和 `selected.introduction`。
- 将影响力、社交影响力、借势价值、建议玩法、风险与前置条件按此顺序展示。

- [ ] **Step 5: 添加社媒展示辅助函数**

在 `research-explorer.tsx` 定义固定平台标签：

```tsx
const socialLabels = { youtube: 'YouTube', instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok' } as const;
```

卡片只渲染 `verified` 项的精简链接；详情显示全部四个平台，非verified状态分别显示“未检索到”或“未公开”，并显示“截至2026年7月核验”。

- [ ] **Step 6: 构建并运行渲染和数据测试**

Run: `pnpm build && node --test tests/rendered-html.test.mjs tests/data.test.mjs`

Expected: PASS.

- [ ] **Step 7: 提交资源详情**

```bash
git add app/research-image.tsx app/research-explorer.tsx tests/rendered-html.test.mjs
git commit -m "feat: open resource details from images"
```

---

### Task 6: 将收藏状态接入卡片、详情和筛选

**Files:**
- Modify: `app/research-explorer.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `FAVORITES_STORAGE_KEY`, `parseFavoriteIds`, `serializeFavoriteIds`, `toggleFavoriteId` from `src/favorites.js`。
- Consumes: `selectItems(..., { favoriteIds, onlyFavorites })`。

- [ ] **Step 1: 添加服务端安全和收藏文案失败断言**

在 `tests/rendered-html.test.mjs` 增加：

```js
assert.match(html, /仅看收藏/);
assert.match(html, /收藏/);
```

保留完整 `pnpm build` 作为SSR访问 `window` 的安全检查。

- [ ] **Step 2: 构建并确认收藏控件尚未渲染**

Run: `pnpm build && node --test tests/rendered-html.test.mjs`

Expected: FAIL on `仅看收藏`.

- [ ] **Step 3: 初始化和持久化收藏**

在 `ResearchExplorer` 增加：

```tsx
const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
const [favoritesReady, setFavoritesReady] = useState(false);
const [onlyFavorites, setOnlyFavorites] = useState(false);

useEffect(() => {
  try { setFavoriteIds(parseFavoriteIds(localStorage.getItem(FAVORITES_STORAGE_KEY))); }
  catch { setFavoriteIds(new Set()); }
  setFavoritesReady(true);
}, []);

useEffect(() => {
  if (!favoritesReady) return;
  try { localStorage.setItem(FAVORITES_STORAGE_KEY, serializeFavoriteIds(favoriteIds)); } catch {}
}, [favoriteIds, favoritesReady]);
```

- [ ] **Step 4: 接入收藏操作和筛选**

- `selectItems` 状态加入 `favoriteIds` 和 `onlyFavorites`。
- 每张卡片增加 `aria-pressed` 收藏按钮，accessible name包含资源名称。
- 弹窗增加同一收藏按钮，状态与卡片实时同步。
- filters区域增加“仅看收藏”按钮，显示 `收藏 {favoriteIds.size}`。
- `switchModule` 不清空收藏或 `onlyFavorites`。
- 收藏按钮必须 `stopPropagation()`，避免误开详情。

- [ ] **Step 5: 实现收藏专用空状态**

当 `onlyFavorites` 为true且结果为空时显示：“当前筛选下没有已收藏资源”，并提供关闭“仅看收藏”的按钮；普通空状态继续提示清除搜索或筛选。

- [ ] **Step 6: 运行核心和渲染测试**

Run:

```bash
pnpm build
node --test tests/favorites.test.mjs tests/filters.test.mjs tests/rendered-html.test.mjs
```

Expected: PASS; build does not throw `window is not defined` or `localStorage is not defined`.

- [ ] **Step 7: 提交收藏界面**

```bash
git add app/research-explorer.tsx tests/rendered-html.test.mjs
git commit -m "feat: add resource favorites and saved filter"
```

---

### Task 7: 完成互动视觉与响应式布局

**Files:**
- Modify: `app/globals.css`
- Modify: `app/research-explorer.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Styles: `.module-tabs`, `.favorite-button`, `.favorites-filter`, `.social-reach`, `.research-image-open`, `.resource-introduction`, `.detail-dialog`。

- [ ] **Step 1: 先增加CSS约束测试**

在 `tests/rendered-html.test.mjs` 之外新增对CSS文本的断言，或在同文件读取 `app/globals.css`：

```js
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
assert.match(css, /\.module-tabs\s*\{[^}]*position:sticky/s);
assert.match(css, /@media\s*\(prefers-reduced-motion:reduce\)/);
assert.match(css, /\.favorite-button/);
assert.match(css, /\.research-image-open/);
```

- [ ] **Step 2: 运行测试并确认吸顶与新控件样式缺失**

Run: `node --test tests/rendered-html.test.mjs`

Expected: FAIL on sticky module tabs or new selectors.

- [ ] **Step 3: 删除废弃样式并调整主视觉**

- 删除 `.hero-stats`、`.decision-grid`、`.decision-card*`、`.window-board`、`.blackout-*`、`.severity*` 及其媒体查询。
- hero不再依靠stats撑底，使用更紧凑的 `min-height` 和上下留白。
- 主标题在桌面和390px手机上保持完整可读，不发生单字横向溢出。

- [ ] **Step 4: 实现互动样式**

- `.module-tabs { position: sticky; top: 72px; z-index: 8; backdrop-filter: blur(18px); }`，手机top改为62px。
- 图片按钮填满figure，清除默认button边框背景；提示在hover、focus-visible和触屏常驻弱显示。
- 收藏按钮触控区域至少44×44px；已收藏使用实心高对比状态。
- 社媒精简栏允许换行；弹窗四平台使用两列，390px改为一列。
- 卡片使用短时 `opacity/transform` 进入动画，dialog使用 `@starting-style` 或等价渐显；不得延迟点击。

- [ ] **Step 5: 只在卡片进入视口时触发渐显**

在 `ResearchExplorer` 为card grid增加ref，并用 `IntersectionObserver` 观察带 `data-reveal-card` 的卡片：首次相交后增加 `is-visible` 并立即取消该卡片的观察。浏览器不支持 `IntersectionObserver` 时直接给全部卡片增加 `is-visible`；effect在结果集变化时清理旧observer。SSR阶段不得访问 `window`。

- [ ] **Step 6: 完善减少动态和手机规则**

在现有媒体查询中保证：

```css
@media (prefers-reduced-motion:reduce) {
  html { scroll-behavior:auto; }
  *,*::before,*::after { animation:none!important; transition:none!important; }
}
```

390px检查要点：无水平滚动；收藏按钮不覆盖状态标签；图片来源与点击提示均可点击；dialog高度不超过视口并内部滚动。

- [ ] **Step 7: 运行CSS契约、构建和lint**

Run:

```bash
node --test tests/rendered-html.test.mjs
pnpm build
pnpm lint
```

Expected: all PASS with no lint errors.

- [ ] **Step 8: 提交互动视觉**

```bash
git add app/globals.css app/research-explorer.tsx tests/rendered-html.test.mjs
git commit -m "style: polish interactive resource browsing"
```

---

### Task 8: 浏览器QA、文档与双平台发布

**Files:**
- Modify: `qa/local-review.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: 完整资料库页面、Cloudflare build和GitHub Pages build。
- Produces: 可复核QA记录、Cloudflare主链接和GitHub Pages备用链接。

- [ ] **Step 1: 运行完整自动化验证**

Run:

```bash
pnpm test
pnpm lint
git diff --check
```

Expected: all builds and tests PASS, including 64 introductions, 23 social snapshots, favorites, static asset paths and SSR.

- [ ] **Step 2: 启动本地预览并做桌面QA**

Run: `pnpm dev`

At `http://localhost:4173/` verify at 1440×1000:

- hero只有“11月里约资源调研”和资源入口；
- 决策区与四项数字统计不存在；
- 时间轴之后直接进入“里约四类资源”；
- 四类分类吸顶，搜索/筛选/排序实时更新；
- 代表性photo、logo、avatar图片均打开正确详情；
- 图片来源链接只打开来源页；
- Creator和IP卡片显示精简社媒数据，详情显示四平台状态和日期；
- 收藏在卡片与详情同步，刷新后保留，仅看收藏可与其他筛选组合。

- [ ] **Step 3: 做手机和可访问性QA**

At 390×844 verify:

- 页面无水平滚动；
- 分类吸顶不遮住内容；
- 收藏、图片详情、关闭和来源链接触控区域可用；
- 弹窗可滚动到底部；
- 关闭弹窗后分类、筛选和滚动上下文仍在；
- 开启减少动态效果后无卡片、图片或dialog非必要动画；
- 键盘Tab可到图片入口、收藏、筛选、来源与关闭按钮，Enter/Space可操作。

- [ ] **Step 4: 记录QA与数据边界**

在 `qa/local-review.md` 记录日期、桌面/手机尺寸、通过项、仍为 `not_found` / `not_public` 的社媒数量及原因。README说明收藏仅本机保存、社媒为2026-07-29动态快照。

- [ ] **Step 5: 提交QA文档并推送主分支**

```bash
git add qa/local-review.md README.md
git commit -m "docs: record resource library qa"
git push origin main
```

- [ ] **Step 6: 部署Cloudflare Pages**

Run:

```bash
pnpm build:cloudflare
npx wrangler pages deploy cloudflare-dist --project-name jetour-rio-research --branch main
```

Expected: deployment succeeds and stable production URL remains `https://jetour-rio-research.pages.dev/`.

- [ ] **Step 7: 等待GitHub Pages工作流成功**

Run: `gh run list --workflow pages.yml --limit 1` followed by `gh run watch <run-id>`.

Expected: latest run for the pushed commit completes with conclusion `success`.

- [ ] **Step 8: 验证两个手机链接**

Run:

```bash
curl -L -A 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148' -o /dev/null -sS -w '%{http_code}\n' https://jetour-rio-research.pages.dev/
curl -L -A 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/126 Mobile Safari/537.36' -o /dev/null -sS -w '%{http_code}\n' https://ryanwgs.github.io/jetour-rio-research-web/
```

Expected: both return HTTP 200.

- [ ] **Step 9: 最终状态核验**

Run:

```bash
git status -sb
git rev-parse HEAD
git ls-remote origin refs/heads/main
```

Expected: clean `main`, local HEAD equals remote main SHA.
