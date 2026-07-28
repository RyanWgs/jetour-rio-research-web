# Research Image Coverage Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add every reliably sourced subject-specific visual that can be found for the current 64 research candidates while preserving color, provenance, graceful fallback, and local-only publication status.

**Architecture:** Keep visual metadata in `src/research-media.js` keyed by research item ID and render it through the existing resilient `ResearchImage` component. Extend coverage by researching only official, authoritative-media, or explicitly licensed sources; use tests to enforce provenance, category-kind rules, minimum expanded coverage, and the exclusion of screenshot-placeholder services.

**Tech Stack:** React 19, vinext/Next-compatible rendering, JavaScript data manifests, TypeScript components, CSS, Node `node:test`, browser-based responsive QA, Git.

## Global Constraints

- Official/organizer/venue/club/government/account imagery is the first choice.
- Authoritative-media event, match, performance, or venue photography is allowed when the original report page and available photographer or `Divulgação` credit are recorded.
- Wikimedia Commons is allowed only when the subject and license are explicit.
- Do not use search-result thumbnails, unattributed reposts, webpage screenshot services, generic stock images, watermarked assets, or images whose subject cannot be confirmed.
- Photos, logos, and avatars remain in original color; no grayscale or black-and-white filter.
- Every visual record contains `src`, `alt`, `kind`, `sourceLabel`, `sourceUrl`, `licenseNote`, and `checkedAt`.
- Failed external images hide without removing card text or official links.
- This work remains local: no GitHub push, repository creation, PR, or public deployment.

---

### Task 1: Missing-Visual Inventory and Expanded Coverage Contract

**Files:**
- Modify: `tests/media.test.mjs`
- Inspect: `src/research-data.js`
- Inspect: `src/research-media.js`

**Interfaces:**
- Consumes: `researchItems`, `researchMedia`, and `getResearchMedia(id)`.
- Produces: expanded category coverage assertions and a deterministic missing-ID audit printed from the data manifests.

- [ ] **Step 1: Generate the current missing-visual inventory**

Run:

```bash
node --input-type=module -e "import {researchItems} from './src/research-data.js'; import {researchMedia} from './src/research-media.js'; console.log(researchItems.filter(item => !researchMedia[item.id]).map(item => [item.category,item.id,item.name,item.sources[0]?.url]))"
```

Expected: the output lists every candidate that still has no visual, grouped manually by category for sourcing.

- [ ] **Step 2: Raise the failing coverage assertions**

Update the existing coverage test to require at least:

```js
assert.ok(countVisuals((item) => item.category === 'festival') >= 8);
assert.ok(countVisuals((item) => item.category === 'ip') >= 8);
assert.equal(countVisuals((item) => item.category === 'media'), 17);
assert.ok(countVisuals((item) => item.category === 'creator') >= 12);
assert.ok(countVisuals((item) => item.category === 'venue') >= 12);
```

- [ ] **Step 3: Run the media test and verify the coverage test fails**

Run: `node --test tests/media.test.mjs`

Expected: FAIL because the existing manifest has only 4 festival, 3 IP, 11 creator, and 6 venue visuals.

- [ ] **Step 4: Commit the expanded contract**

```bash
git add tests/media.test.mjs
git commit -m "test: require expanded research image coverage"
```

---

### Task 2: Source and Register All Reliable Missing Visuals

**Files:**
- Modify: `src/research-media.js`
- Modify: `research/source-register.md`
- Test: `tests/media.test.mjs`

**Interfaces:**
- Consumes: missing IDs from Task 1 and each item’s official/public source list.
- Produces: additional `ResearchMedia` records compatible with `getResearchMedia(id)` and a provenance register for every added asset.

- [ ] **Step 1: Research each missing event and celebration**

For each missing festival ID, search in order: organizer/government/ticketing page, authoritative-media report, Wikimedia Commons. Record a direct HTTPS image URL plus its original page, credit, rights note, and checked date; reject screenshot services and generic city imagery.

- [ ] **Step 2: Research each missing sports and entertainment IP**

Use official club/venue/production imagery first. If direct official imagery is unavailable, use an authoritative sports or entertainment report whose photograph clearly identifies the club, event, performance, or stadium and preserve the stated credit.

- [ ] **Step 3: Research remaining creators**

Use the creator’s public YouTube/Instagram/TikTok avatar or official site mark. The image source link must point to the public account or official site, and the record `kind` must be `avatar` or `logo`.

- [ ] **Step 4: Research each missing venue**

Use official venue/hotel/tourism imagery first; use Wikimedia Commons or an authoritative venue report only when the subject is unambiguous. Beach images must represent the named beach rather than generic Rio coastline.

- [ ] **Step 5: Add only verified records to the manifest**

Use this exact shape for each accepted item:

```js
'candidate-id': visual(
  'https://direct-image.example/subject.jpg',
  '准确描述主体、场景和地点的替代文字',
  'photo',
  '来源机构 / 摄影或Divulgação署名',
  'https://original-report-or-official-page.example/',
  '公开页面所载主体图片；公开发布前复核转载、品牌与肖像许可'
),
```

- [ ] **Step 6: Update the provenance register**

For each category, list the IDs added, source type, credit practice, remaining text-only IDs, and the reason each remaining ID was rejected or could not be verified.

- [ ] **Step 7: Run the media contract**

Run: `node --test tests/media.test.mjs`

Expected: PASS with expanded thresholds met, all records complete, category-kind rules valid, and no screenshot-placeholder URL present.

- [ ] **Step 8: Commit visuals and provenance**

```bash
git add src/research-media.js research/source-register.md tests/media.test.mjs
git commit -m "content: expand sourced research visuals"
```

---

### Task 3: Color, Link, and Fallback Regression Checks

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Inspect: `app/research-image.tsx`
- Inspect: `app/research-explorer.tsx`
- Inspect: `app/globals.css`

**Interfaces:**
- Consumes: the expanded manifest from Task 2.
- Produces: rendering assertions that protect image-source links, official links, native failure fallback, and color presentation.

- [ ] **Step 1: Add a rendered coverage assertion for new source families**

Extend the SSR test with representative direct-image host patterns from the newly accepted records, while keeping assertions for `图片来源`, `访问官网`, and `访问官方账号`.

- [ ] **Step 2: Add a CSS regression assertion for original color**

Read `app/globals.css` in the test and assert that `.research-image img` does not declare `grayscale(`:

```js
const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
assert.doesNotMatch(css, /\.research-image img[^}]*grayscale\(/s);
```

- [ ] **Step 3: Run the full automated suite**

Run: `pnpm test && pnpm run lint && git diff --check`

Expected: build succeeds, all tests pass, lint has zero errors, and no whitespace errors are reported.

- [ ] **Step 4: Commit regression checks**

```bash
git add tests/rendered-html.test.mjs
git commit -m "test: protect color image rendering"
```

---

### Task 4: Browser QA and Local Handoff

**Files:**
- Modify: `qa/local-review.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: the built local site at `http://localhost:4173/#research`.
- Produces: verified coverage totals, remaining text-only exceptions, responsive results, and publication-rights gate documentation.

- [ ] **Step 1: Check each of the four modules**

In the local browser, open every module and verify the number of visible figures, successful images, official links, and source links. Confirm images are subject-specific and are not screenshots, placeholders, broken files, or watermarked thumbnails.

- [ ] **Step 2: Check responsive color rendering**

At 1440×1000, 1024×1366, and 390×844, verify no horizontal overflow and confirm computed `filter` for representative photo, logo, and avatar images is `none`.

- [ ] **Step 3: Check image failure and dialog interaction**

Confirm failed images hide without removing card text, open a photo card and a logo/avatar card, verify source and rights notes, and close both dialogs using the visible close button.

- [ ] **Step 4: Record final coverage and exceptions**

Update `qa/local-review.md` and `README.md` with per-category visual counts, remaining text-only IDs and reasons, original-color confirmation, source audit status, and the unchanged local-only publication gate.

- [ ] **Step 5: Run final verification**

Run: `pnpm test && pnpm run lint && git status --short`

Expected: build and tests pass, lint has zero errors, and only the intended QA/documentation changes remain before commit.

- [ ] **Step 6: Commit QA documentation**

```bash
git add qa/local-review.md README.md
git commit -m "docs: record expanded visual QA"
```

