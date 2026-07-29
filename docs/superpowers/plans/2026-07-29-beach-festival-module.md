# Beach Festival Case Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone bilingual beach-festival case module and renumber the Chinese and English module navigation continuously.

**Architecture:** Store the seven historical cases in a focused data file with matching English translations, then merge them through the existing catalog. Reuse the current explorer, media, favorites and detail-dialog contracts by introducing a `beach_case` category and explicit module metadata.

**Tech Stack:** React 19, TypeScript, JavaScript ES modules, Node test runner, CSS, Vite/vinext, Cloudflare Pages.

## Global Constraints

- Chinese navigation order is 01 events, 02 venues, 03 hotels, 04 beach festival cases, 05 partnerships.
- English navigation order is 01 events, 02 venues, 03 hotels, 04 beach festival cases, 05 IP, 06 media/creators, 07 partnerships.
- Include exactly seven verified cases from the approved design.
- Beach cases are historical operating references, not November 2026 event-date resources.
- Preserve black-background Apple-minimal styling, colour visuals, favorites, detail dialogs and mobile two-column navigation.
- Do not add dependencies.

---

### Task 1: Beach festival case data and translations

**Files:**
- Create: `src/research-data-beach-cases.js`
- Create: `src/research-translations-beach-cases-en.js`
- Test: `tests/beach-festival-cases.test.mjs`

**Interfaces:**
- Produces: `beachFestivalCaseItems: ResearchItem[]` with `category: 'beach_case'`.
- Produces: `beachFestivalCaseEnglishTranslations: Record<string, Translation>`.

- [ ] **Step 1: Write the failing data test**

```js
test('beach festival module contains the seven approved historical cases', () => {
  assert.equal(beachFestivalCaseItems.length, 7);
  assert.deepEqual(new Set(beachFestivalCaseItems.map((item) => item.id)), new Set([
    'case-tim-music-rio', 'case-madonna-copacabana', 'case-lady-gaga-copacabana',
    'case-copacabana-new-year', 'case-rio-das-ostras-jazz',
    'case-universo-paralello', 'case-recife-pe-na-areia',
  ]));
});
```

- [ ] **Step 2: Run the test and verify the missing-module failure**

Run: `node --test tests/beach-festival-cases.test.mjs`

Expected: FAIL because `research-data-beach-cases.js` does not exist.

- [ ] **Step 3: Add the seven source-backed case records**

Each record must include stable id, name, `category: 'beach_case'`, historical date label, location, influence, introduction, relevance, activation, risks, recommendation, tags, `checkedAt: '2026-07-29'` and at least one HTTPS source.

- [ ] **Step 4: Add complete English translations and completeness assertions**

```js
for (const item of beachFestivalCaseItems) {
  const translation = beachFestivalCaseEnglishTranslations[item.id];
  assert.ok(translation?.name && translation?.introduction && translation?.risks, item.id);
}
```

- [ ] **Step 5: Run the test and commit**

Run: `node --test tests/beach-festival-cases.test.mjs`

Expected: PASS.

Commit: `feat: add beach festival case research data`

---

### Task 2: Catalog and colour visuals

**Files:**
- Modify: `src/research-catalog.js`
- Modify: `src/research-media.js`
- Modify: `tests/media.test.mjs`
- Modify: `tests/data.test.mjs`

**Interfaces:**
- Consumes: `beachFestivalCaseItems` and `beachFestivalCaseEnglishTranslations`.
- Produces: beach cases in `getCatalog('zh')` and `getCatalog('en')`, each with a visual record.

- [ ] **Step 1: Write failing catalog and media tests**

```js
assert.equal(getCatalog('zh').filter((item) => item.category === 'beach_case').length, 7);
assert.equal(getCatalog('en').filter((item) => item.category === 'beach_case').length, 7);
for (const item of getCatalog('en').filter((item) => item.category === 'beach_case')) {
  assert.equal(getResearchMedia(item.id)?.kind, 'photo');
}
```

- [ ] **Step 2: Run tests and verify they fail because the catalog has no beach cases**

Run: `node --test tests/data.test.mjs tests/media.test.mjs`

Expected: FAIL with zero case records or missing media ids.

- [ ] **Step 3: Merge the data and translations through the existing catalog**

Import both new modules, append case records to the base catalog and apply translations through the same normalization path used by hotels and partnerships.

- [ ] **Step 4: Add seven colour media records with provenance**

Use existing official or source-published colour images for each case. Preserve `sourceLabel`, `sourceUrl`, `licenseNote` and `checkedAt`.

- [ ] **Step 5: Run tests and commit**

Run: `node --test tests/data.test.mjs tests/media.test.mjs`

Expected: PASS.

Commit: `feat: expose beach festival cases bilingually`

---

### Task 3: Bilingual module navigation and explorer behavior

**Files:**
- Modify: `app/research-explorer.tsx`
- Modify: `app/site-shell.tsx`
- Modify: `app/globals.css`
- Modify: `tests/rendered-html.test.mjs`
- Modify: `tests/media.test.mjs`

**Interfaces:**
- Consumes: catalog items with `category: 'beach_case'`.
- Produces: `beach_case` module routing, search/sort/favorites/details and continuous module numbering.

- [ ] **Step 1: Write failing module-order tests**

```js
assert.match(explorer, /number: '04', label: '沙滩音乐节案例'/);
assert.match(explorer, /number: '05', label: '异业合作'/);
assert.match(explorer, /number: '04', label: 'Beach Festival Cases'/);
assert.match(explorer, /number: '07', label: 'Cross-industry Partnerships'/);
```

Also require desktop 5-column Chinese and 7-column English tab grids plus the existing mobile 2-column override.

- [ ] **Step 2: Run tests and verify the old 06 partnership numbering fails**

Run: `node --test tests/rendered-html.test.mjs tests/media.test.mjs`

Expected: FAIL because Chinese partnerships are numbered 06 and no case module exists.

- [ ] **Step 3: Add the case module and renumber both locales**

Map `beach_case` directly to the new module. Hide date-status and venue/partner filters for this module while retaining search, sort and favorites.

- [ ] **Step 4: Add historical-case copy and responsive tab styling**

Use a 5-column Chinese grid and 7-column English grid on desktop; retain two columns below 700px. Add a module description explicitly stating these are historical operating references.

- [ ] **Step 5: Update language-gate module summaries**

Chinese gate copy must mention five modules; English gate copy must mention seven modules.

- [ ] **Step 6: Run tests, lint, build and commit**

Run: `node --test tests/rendered-html.test.mjs tests/media.test.mjs && pnpm lint && pnpm build`

Expected: PASS.

Commit: `feat: add beach festival case module navigation`

---

### Task 4: Full QA and production publishing

**Files:**
- Verify: all source and test files
- Publish: existing GitHub, Cloudflare Pages and Sites projects

**Interfaces:**
- Consumes: completed bilingual static build.
- Produces: updated public URLs on the existing domains.

- [ ] **Step 1: Run complete verification**

Run: `pnpm test && pnpm lint`

Expected: all tests pass, lint exits 0 and Cloudflare build emits direct `/zh/` and `/en/` routes.

- [ ] **Step 2: Perform 390×844 browser QA**

Verify Chinese five-module order, English seven-module order, no horizontal overflow, case detail opening, favorite count change and colour-image rendering.

- [ ] **Step 3: Push the verified commit to GitHub main**

Confirm `git status -sb` is clean and `HEAD` equals `origin/main` after push.

- [ ] **Step 4: Publish to existing Cloudflare Pages and Sites projects**

Deploy the exact verified build; do not create new project slugs or URLs.

- [ ] **Step 5: Verify public routes**

Require HTTP 200 for the root, `/zh/` and `/en/` on the stable Cloudflare domain.
