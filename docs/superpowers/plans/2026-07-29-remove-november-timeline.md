# 删除11月时间轴 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 从线上资源资料库完整移除独立11月时间轴，同时保留资源卡片日期和日期筛选。

**Architecture:** 直接删除服务端首页中的时间轴派生数据与页面区块，并同步移除导航、首屏次按钮和已废弃样式。通过服务端渲染测试锁定“不再出现时间轴、资源区成为第一模块”，其余资源交互保持原实现。

**Tech Stack:** Next.js/Vinext、React 19、CSS、Node Test Runner、Cloudflare Pages、GitHub Pages

## Global Constraints

- 不增加月历、密度条或其他替代时间可视化。
- 保留资源卡片和资源详情中的日期、日期状态与筛选能力。
- 首屏只保留“浏览全部资源”一个主要行动按钮。
- 修改后更新 Cloudflare 主链接与 GitHub Pages 备用链接。

---

### Task 1: 删除时间轴页面结构

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `ResearchExplorer` 现有资源浏览组件。
- Produces: 不含 `#timeline` 的首页服务端HTML；`#research` 成为编号 `01` 的首个内容模块。

- [ ] **Step 1: 写入失败测试**

在现有首页测试中加入：

```js
assert.doesNotMatch(html, /整个11月，一眼看清|11月时间轴|2026年11月活动时间轴/);
assert.doesNotMatch(html, /查看11月时间轴/);
assert.match(html, /section-index[^>]*>01<\/span><h2>里约四类资源/);
```

- [ ] **Step 2: 运行测试确认失败**

Run: `pnpm build && node --test tests/rendered-html.test.mjs`

Expected: FAIL，因为当前HTML仍包含时间轴标题和入口。

- [ ] **Step 3: 最小化实现删除**

在 `app/page.tsx` 中：

```tsx
// 删除 TimelineItem 类型、timelineItems 派生数组、#timeline 区块。
// 顶部导航只保留：
<a href="#research">里约四类资源</a>
// 首屏只保留：
<div className="hero-actions"><a className="button primary" href="#research">浏览全部资源</a></div>
// 资源模块编号改为01；信息边界编号改为02。
```

- [ ] **Step 4: 运行测试确认通过**

Run: `pnpm build && node --test tests/rendered-html.test.mjs`

Expected: 相关测试全部 PASS。

- [ ] **Step 5: 提交**

```bash
git add app/page.tsx tests/rendered-html.test.mjs
git commit -m "feat: remove November timeline"
```

### Task 2: 清理样式并完成发布验证

**Files:**
- Modify: `app/globals.css`
- Modify: `qa/local-review.md`

**Interfaces:**
- Consumes: Task 1 完成后的无时间轴首页。
- Produces: 无废弃时间轴样式、经手机与桌面复核并发布的在线版本。

- [ ] **Step 1: 删除废弃样式**

从 `app/globals.css` 删除 `.timeline`、`.timeline-item` 及对应平板、手机覆盖规则；不修改资源卡片中的 `.card-date` 和 `.status-pill`。

- [ ] **Step 2: 更新QA记录**

在 `qa/local-review.md` 记录：独立时间轴、导航入口和首屏次按钮已删除；资源日期与筛选仍可用。

- [ ] **Step 3: 运行完整验证**

Run: `pnpm test && pnpm lint && git diff --check`

Expected: 24项或更多测试全部 PASS，lint 和 diff 检查退出码为0。

- [ ] **Step 4: 复核响应式页面**

在桌面默认视口和 `390×844` 手机视口检查：首页仅一个行动按钮，资源区紧随首屏之后，无横向溢出；收藏、图片详情与日期筛选仍可操作。

- [ ] **Step 5: 提交并发布**

```bash
git add app/globals.css qa/local-review.md
git commit -m "docs: verify timeline-free resource library"
git push origin main
pnpm exec wrangler pages deploy cloudflare-dist --project-name jetour-rio-research --branch main
```

- [ ] **Step 6: 验证线上版本**

确认 `https://jetour-rio-research.pages.dev/` 和 `https://ryanwgs.github.io/jetour-rio-research-web/` 均返回 HTTP 200，新页面源码不含“11月时间轴”。
