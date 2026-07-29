# Latin America Research Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立可供英文版使用的拉丁美洲体育与演艺IP、媒体及Content Creator资源池，并为全部英文版资源补齐可核验英文内容。

**Architecture:** 保留现有里约中文数据为基础，新增拉丁美洲资源文件、英文翻译映射和统一目录合并层。所有新增事实先进入来源登记，再进入数据文件；测试负责锁定数量、地域、翻译、四平台状态和来源完整性。

**Tech Stack:** JavaScript ES Modules、Node Test Runner、官方网页与官方社交账号、现有React数据消费层

## Global Constraints

- Sports & Entertainment IP最终总量为20–25项。
- Media & Content Creators最终总量为45–55项。
- 范围包含南美洲、中美洲、墨西哥和加勒比地区。
- 重点覆盖巴西、墨西哥、阿根廷、哥伦比亚、智利和秘鲁。
- 原有Mainstream Media、Automotive & Mobility Industry Media及Content Creator全部保留。
- 新增8–10位Sports Creators及8–10位Entertainment & Music Creators。
- 粉丝量只使用核验当日可见公开数据，不作估算。
- 每项新增资源至少包含一个可点击公开来源、国家/地区和核验日期。

---

### Task 1: 建立拉丁美洲数据契约

**Files:**
- Create: `src/research-data-latam.js`
- Create: `src/research-translations-en.js`
- Create: `src/research-catalog.js`
- Modify: `tests/data.test.mjs`

**Interfaces:**
- Produces: `latinAmericaResearchItems: ResearchItem[]`、`englishTranslations: Record<string, Translation>`、`getCatalog(locale): ResearchItem[]`。
- `ResearchItem`新增 `geography: { country: string; region: string }`、`scope: 'rio' | 'brazil' | 'latin_america'`、可选 `creatorVertical`。
- `Translation`包含 `name`、`introduction`、`influenceBasis`、`relevance`、`activation`、`risks`、`decision`、`tags`。

- [ ] **Step 1: 写失败测试**

```js
import { getCatalog } from '../src/research-catalog.js';

test('English catalog has complete geography and translations', () => {
  const items = getCatalog('en');
  assert.ok(items.every((item) => item.geography?.country && item.geography?.region));
  assert.ok(items.every((item) => item.name && item.introduction && item.influence.basis));
});

test('Latin America category totals match the approved ranges', () => {
  const items = getCatalog('en');
  assert.ok(items.filter((item) => item.category === 'ip').length >= 20);
  assert.ok(items.filter((item) => item.category === 'ip').length <= 25);
  assert.ok(items.filter((item) => ['media', 'creator'].includes(item.category)).length >= 45);
  assert.ok(items.filter((item) => ['media', 'creator'].includes(item.category)).length <= 55);
});
```

- [ ] **Step 2: 运行测试并确认因模块不存在而失败**

Run: `node --test tests/data.test.mjs`

- [ ] **Step 3: 创建最小目录接口**

```js
import { researchItems } from './research-data.js';
import { latinAmericaResearchItems } from './research-data-latam.js';
import { englishTranslations } from './research-translations-en.js';

export function getCatalog(locale) {
  const items = [...researchItems, ...latinAmericaResearchItems];
  if (locale === 'zh') return items.filter((item) => ['festival', 'venue'].includes(item.category));
  return items.map((item) => localizeItem(item, englishTranslations[item.id]));
}
```

- [ ] **Step 4: 运行数据测试，确认只剩内容数量与翻译完整性失败**

Run: `node --test tests/data.test.mjs`

- [ ] **Step 5: 提交数据骨架**

```bash
git add src/research-data-latam.js src/research-translations-en.js src/research-catalog.js tests/data.test.mjs
git commit -m "feat: add bilingual research catalog contract"
```

### Task 2: 扩展Sports & Entertainment IP

**Files:**
- Modify: `src/research-data-latam.js`
- Create: `research/latam-ip-source-register.md`
- Modify: `tests/data.test.mjs`

**Interfaces:**
- Consumes: Task 1的`ResearchItem`字段。
- Produces: 英文目录中20–25项IP；新增项全部为`scope: 'latin_america'`。

- [ ] **Step 1: 扩充失败测试**

```js
test('Latin America IP pool covers priority markets and both verticals', () => {
  const ips = getCatalog('en').filter((item) => item.category === 'ip');
  const countries = new Set(ips.map((item) => item.geography.country));
  for (const country of ['Brazil', 'Mexico', 'Argentina', 'Colombia', 'Chile', 'Peru']) assert.ok(countries.has(country));
  assert.ok(ips.some((item) => item.subcategory === 'sports_ip'));
  assert.ok(ips.some((item) => item.subcategory === 'entertainment_ip'));
});
```

- [ ] **Step 2: 运行测试确认优先市场覆盖不足**

Run: `node --test tests/data.test.mjs`

- [ ] **Step 3: 研究并登记候选**

从官方俱乐部、赛事、艺人、场馆和组织页面核验以下种子池，并按“区域影响力、国际辨识度、品牌合作可行性、内容联动价值”选出使总量达到20–25项的组合：Club América、Chivas、Boca Juniors、River Plate、Liga MX、Copa Libertadores、CONMEBOL、Inter Miami/MLS拉美影响力、Shakira、Bad Bunny、Karol G、J Balvin、Feid、Duki、Bizarrap、Mon Laferte及区域性文化演出IP。每项在`research/latam-ip-source-register.md`记录官方URL、国家、选择理由、核验日期和排除风险。

- [ ] **Step 4: 写入结构化IP数据**

每项使用以下完整结构，不省略字段：

```js
{
  id: 'club-america', name: 'Club América', category: 'ip', subcategory: 'sports_ip',
  geography: { country: 'Mexico', region: 'North America / Latin America' }, scope: 'latin_america',
  dateStatus: 'pending_announcement', dateStart: null, dateEnd: null,
  location: 'Mexico City, Mexico', influence: { level: 'Very High', score: 5, basis: '...' },
  introduction: '...', relevance: '...', activation: '...', risks: '...', recommendation: 4,
  decision: 'Priority outreach', checkedAt: '2026-07-29', tags: ['Football', 'Mexico'],
  sources: [{ label: 'Official website', url: 'https://www.clubamerica.com.mx/', claim: 'Official identity and activities' }]
}
```

- [ ] **Step 5: 运行测试并提交**

Run: `node --test tests/data.test.mjs`

```bash
git add src/research-data-latam.js research/latam-ip-source-register.md tests/data.test.mjs
git commit -m "research: expand Latin America sports and entertainment IPs"
```

### Task 3: 扩展Mainstream与Industry Media

**Files:**
- Modify: `src/research-data-latam.js`
- Create: `research/latam-media-source-register.md`
- Modify: `tests/data.test.mjs`

**Interfaces:**
- Produces: 保留现有17家媒体并新增区域媒体，使英文版04总量向45–55项推进。

- [ ] **Step 1: 写失败测试**

```js
test('English media pool covers mainstream and automotive outlets across priority markets', () => {
  const media = getCatalog('en').filter((item) => item.category === 'media');
  assert.ok(media.some((item) => item.subcategory === 'mainstream_media'));
  assert.ok(media.some((item) => item.subcategory === 'industry_media'));
  for (const country of ['Mexico', 'Argentina', 'Colombia', 'Chile', 'Peru']) {
    assert.ok(media.some((item) => item.geography.country === country || item.geography.country === 'Latin America'));
  }
});
```

- [ ] **Step 2: 运行测试确认地域覆盖失败**

Run: `node --test tests/data.test.mjs`

- [ ] **Step 3: 研究媒体种子池**

优先核验Reuters/AFP拉美服务、CNN en Español、TelevisaUnivision、Grupo Globo、Clarín、La Nación Argentina、El Tiempo、El Espectador、El Mercurio、La Tercera、El Comercio Perú，以及Motor1拉美网络、Autocosmos各国站、Motorpasión México、Parabrisas、CarsDrive等汽车与出行媒体。只保留具有官方自有页面、明确目标市场和项目相关性的资源，并登记到`research/latam-media-source-register.md`。

- [ ] **Step 4: 写入媒体数据并验证**

新增媒体使用`category: 'media'`，并严格标记`mainstream_media`或`industry_media`；地区型媒体使用`geography.country: 'Latin America'`。

Run: `node --test tests/data.test.mjs`

- [ ] **Step 5: 提交**

```bash
git add src/research-data-latam.js research/latam-media-source-register.md tests/data.test.mjs
git commit -m "research: expand Latin America media pool"
```

### Task 4: 扩展四类Content Creators及社媒影响力

**Files:**
- Modify: `src/research-data-latam.js`
- Create: `research/latam-creators-social-register.md`
- Modify: `tests/data.test.mjs`

**Interfaces:**
- Produces: `creatorVertical`为`automotive`、`travel_lifestyle`、`sports`或`entertainment_music`的创作者；每人都有四平台状态。

- [ ] **Step 1: 写失败测试**

```js
test('Creator pool includes approved verticals and four-platform snapshots', () => {
  const creators = getCatalog('en').filter((item) => item.category === 'creator');
  for (const vertical of ['automotive', 'travel_lifestyle', 'sports', 'entertainment_music']) {
    assert.ok(creators.some((item) => item.creatorVertical === vertical));
  }
  assert.ok(creators.filter((item) => item.creatorVertical === 'sports').length >= 8);
  assert.ok(creators.filter((item) => item.creatorVertical === 'sports').length <= 10);
  assert.ok(creators.filter((item) => item.creatorVertical === 'entertainment_music').length >= 8);
  assert.ok(creators.filter((item) => item.creatorVertical === 'entertainment_music').length <= 10);
  assert.ok(creators.every((item) => ['youtube', 'instagram', 'facebook', 'tiktok'].every((key) => item.socialReach?.platforms[key])));
});
```

- [ ] **Step 2: 运行测试确认新增垂类与数量失败**

Run: `node --test tests/data.test.mjs`

- [ ] **Step 3: 研究Creator种子池**

保留现有13位创作者。新增池优先从重点市场筛选：体育类包括Fútbol Picante/ESPN talent、La Gambeta、Werevertumorro体育内容、Davoo Xeneize、Momo、Juan Guarnizo体育直播内容、哥伦比亚/智利/秘鲁代表性足球与综合体育创作者；演艺音乐类包括MoluscoTV、Chente Ydrach、Pepe Garza、Gabo Ramos及区域性音乐、娱乐访谈和现场文化创作者。必须核验其内容方向、官方账号和品牌安全风险后再入选。

- [ ] **Step 4: 核验四平台状态**

对每位创作者记录YouTube、Instagram、Facebook、TikTok：

```js
socialReach: {
  checkedAt: '2026-07-29',
  platforms: {
    youtube: { status: 'verified', url: 'https://...', display: '1.2M', raw: '1.2M subscribers' },
    instagram: { status: 'not_public', url: 'https://...' },
    facebook: { status: 'not_found' },
    tiktok: { status: 'verified', url: 'https://...', display: '850K', raw: '850K followers' }
  }
}
```

所有原始显示值、账号URL和核验日期写入`research/latam-creators-social-register.md`。

- [ ] **Step 5: 运行测试并提交**

Run: `node --test tests/data.test.mjs`

```bash
git add src/research-data-latam.js research/latam-creators-social-register.md tests/data.test.mjs
git commit -m "research: add Latin America sports and entertainment creators"
```

### Task 5: 完成英文翻译、图片与最终数据审计

**Files:**
- Modify: `src/research-translations-en.js`
- Modify: `src/research-media.js`
- Modify: `tests/data.test.mjs`
- Modify: `tests/media.test.mjs`
- Modify: `README.md`

**Interfaces:**
- Produces: 所有英文目录资源的完整英文文本及符合现有来源规则的彩色图片记录。

- [ ] **Step 1: 写翻译与图片失败测试**

```js
test('Every English item has decision-ready English copy', () => {
  for (const item of getCatalog('en')) {
    assert.match(item.introduction, /[A-Za-z]/);
    assert.match(item.relevance, /[A-Za-z]/);
    assert.ok(item.sources.length >= 1);
  }
});
```

在`tests/media.test.mjs`加入：新增图片记录必须含`src`、`alt`、`sourceUrl`、`licenseNote`、`checkedAt`，并保持`filter:none`。

- [ ] **Step 2: 运行测试确认英文映射和图片记录不完整**

Run: `node --test tests/data.test.mjs tests/media.test.mjs`

- [ ] **Step 3: 翻译全部现有资源并补图**

为现有64项及全部新增项写入完整英文映射；不直译专有名词。只为有可靠直接图片来源的新增资源登记彩色图片，无法确认权利或直链的资源保持文字卡片。

- [ ] **Step 4: 完整数据验证**

Run: `node --test tests/data.test.mjs tests/media.test.mjs`

Expected: 数量、地域、英文、来源、Creator垂类和四平台测试全部PASS。

- [ ] **Step 5: 更新README并提交**

```bash
git add src/research-translations-en.js src/research-media.js tests/data.test.mjs tests/media.test.mjs README.md
git commit -m "research: complete English catalog and provenance"
```
