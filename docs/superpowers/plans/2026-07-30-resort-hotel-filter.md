# Bilingual Resort Hotel Filter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual hotel-role filter to Hotel Support so users can isolate Resort properties and combine that choice with venue, search, sort and favorites.

**Architecture:** Extend the existing pure `filterItems` pipeline with an optional `hotelRole` criterion, then expose that criterion through local state in `ResearchExplorer`. Keep the current hotel records and `hotelRole` values unchanged; the new UI reads the existing data contract and resets the role whenever navigation changes context.

**Tech Stack:** TypeScript/React, JavaScript data helpers, Node test runner, Vinext/Vite, ESLint, Cloudflare Pages and Sites hosting.

## Global Constraints

- Both Chinese and English versions must expose the same five hotel-role choices.
- Chinese copy: 全部酒店、主酒店、VIP酒店、补充酒店、度假型酒店.
- English copy: All Hotels、Main Hotel、VIP Hotel、Support Hotel、Resort.
- `hotelRole` remains the only classification source: `main_hotel`, `vip_hotel`, `support_hotel`, `resort_hotel`.
- The role filter and linked-venue filter use intersection logic.
- Entering Hotel Support, switching modules, or arriving from a venue detail resets the role to all hotels.
- Do not add a new resource module or reclassify hotels without new evidence.

---

### Task 1: Add hotel-role filtering to the pure selection pipeline

**Files:**
- Modify: `src/filters.js`
- Modify: `tests/filters.test.mjs`

**Interfaces:**
- Consumes: resource items with optional `hotelRole: string` and `filterItems(items, state)`.
- Produces: `filterItems(items, { hotelRole })`, where `hotelRole` is `'all'` or one of the four stable role IDs.

- [ ] **Step 1: Add hotel fixtures and a failing role-filter test**

Extend `fixtures` with:

```js
{ id: 'h1', name: 'City Hotel', category: 'hotel', subcategory: 'main_hotel', hotelRole: 'main_hotel', dateStatus: 'pending_announcement', recommendation: 3, influence: { score: 4 }, location: 'Rio' },
{ id: 'h2', name: 'Beach Resort', category: 'hotel', subcategory: 'resort_hotel', hotelRole: 'resort_hotel', dateStatus: 'pending_announcement', recommendation: 3, influence: { score: 5 }, location: 'Rio' }
```

Add:

```js
test('filters hotels by their explicit role', () => {
  assert.deepEqual(filterItems(fixtures, { hotelRole: 'resort_hotel' }).map((item) => item.id), ['h2']);
  assert.deepEqual(filterItems(fixtures, { hotelRole: 'all' }).map((item) => item.id), fixtures.map((item) => item.id));
});
```

- [ ] **Step 2: Run the focused test and confirm the new assertion fails**

Run:

```bash
node --test tests/filters.test.mjs
```

Expected: the Resort assertion fails because `filterItems` does not inspect `state.hotelRole`.

- [ ] **Step 3: Implement the minimal hotel-role predicate**

Add this guard in `filterItems`, alongside the existing category and subcategory checks:

```js
if (state.hotelRole && state.hotelRole !== 'all' && item.hotelRole !== state.hotelRole) return false;
```

- [ ] **Step 4: Run the focused test and confirm it passes**

Run:

```bash
node --test tests/filters.test.mjs
```

Expected: all filter tests pass.

- [ ] **Step 5: Commit the filter behavior**

```bash
git add src/filters.js tests/filters.test.mjs
git commit -m "feat: filter hotels by role"
```

---

### Task 2: Add the bilingual Hotel Type control and reset behavior

**Files:**
- Modify: `app/research-explorer.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `selectItems(items, { hotelRole, ...state })` from Task 1 and existing `hotelRole` values from hotel records.
- Produces: a controlled `hotelRole` select shown only when `module === 'hotel'`.

- [ ] **Step 1: Add failing source-level assertions for bilingual options and state wiring**

Add a test to `tests/rendered-html.test.mjs`:

```js
test('hotel support exposes a bilingual role filter including Resort', async () => {
  const explorer = await readFile(new URL('../app/research-explorer.tsx', import.meta.url), 'utf8');
  for (const copy of ['酒店类型', '全部酒店', '度假型酒店', 'Hotel Type', 'All Hotels', 'Resort']) {
    assert.match(explorer, new RegExp(copy));
  }
  assert.match(explorer, /hotelRole/);
  assert.match(explorer, /value="resort_hotel"/);
});
```

- [ ] **Step 2: Run the focused test and confirm it fails**

Run:

```bash
pnpm test -- tests/rendered-html.test.mjs
```

Expected: failure because the Hotel Type copy and control are absent.

- [ ] **Step 3: Add localized copy and controlled state**

Add these label entries:

```ts
// zh
hotelType: '酒店类型', allHotels: '全部酒店'

// en
hotelType: 'Hotel Type', allHotels: 'All Hotels'
```

Add state near the existing filter state:

```ts
const [hotelRole, setHotelRole] = useState('all');
```

Pass it to the selection pipeline:

```ts
return selectItems(base, {
  subcategory,
  hotelRole: module === 'hotel' ? hotelRole : 'all',
  dateStatus: ['hotel', 'beach_case', 'partnership'].includes(module) ? 'all' : dateStatus,
  query, sort, favoriteIds, onlyFavorites,
});
```

Include `hotelRole` in the `results` memo dependencies and reveal-card effect dependencies.

- [ ] **Step 4: Render the role selector beside Linked Venue**

Inside the filters block, before the linked-venue selector, add:

```tsx
{module === 'hotel' && <label>
  <span>{t.hotelType}</span>
  <select value={hotelRole} onChange={(event) => setHotelRole(event.target.value)}>
    <option value="all">{t.allHotels}</option>
    <option value="main_hotel">{t.main_hotel}</option>
    <option value="vip_hotel">{t.vip_hotel}</option>
    <option value="support_hotel">{t.support_hotel}</option>
    <option value="resort_hotel">{t.resort_hotel}</option>
  </select>
</label>}
```

- [ ] **Step 5: Reset role state when context changes**

Add `setHotelRole('all')` to `switchModule` and `showHotelsForVenue`. This guarantees direct hotel entry and venue-to-hotel navigation never inherit a hidden Resort-only state.

- [ ] **Step 6: Run focused tests**

Run:

```bash
node --test tests/filters.test.mjs tests/rendered-html.test.mjs tests/hotel-partnership-data.test.mjs
```

Expected: all focused tests pass, and the existing data test still identifies `hotel-sheraton-grand-rio` as `resort_hotel`.

- [ ] **Step 7: Commit the bilingual control**

```bash
git add app/research-explorer.tsx tests/rendered-html.test.mjs
git commit -m "feat: add bilingual resort hotel filter"
```

---

### Task 3: Verify, publish and confirm the live bilingual pages

**Files:**
- Verify: all project files
- Build output: `dist/`, `pages-dist/`, `cloudflare-dist/`
- Hosting metadata: `.openai/hosting.json`

**Interfaces:**
- Consumes: completed commits from Tasks 1–2.
- Produces: updated GitHub main branch, Cloudflare Pages deployment and Sites version with the same commit SHA.

- [ ] **Step 1: Run the complete verification suite**

```bash
pnpm test
pnpm lint
```

Expected: build succeeds, all Node tests pass and ESLint exits without errors.

- [ ] **Step 2: Confirm repository scope before publishing**

```bash
git status --short
git log -3 --oneline
```

Expected: no uncommitted product changes and the two feature commits are present.

- [ ] **Step 3: Integrate according to the user-selected branch option**

Follow `superpowers:finishing-a-development-branch`. For a local merge choice, merge the feature branch into `main`, rerun `pnpm test`, then remove only the owned feature worktree and branch.

- [ ] **Step 4: Publish the validated main commit**

Push `main` to GitHub, deploy `cloudflare-dist` to the existing `jetour-rio-research` Cloudflare Pages project, and use the existing `.openai/hosting.json` project ID to save and deploy a new Sites version from the identical pushed commit.

- [ ] **Step 5: Verify the live bilingual pages**

Check these stable routes return HTTP 200 and the deployed bundle contains both `度假型酒店` and `Resort`:

```text
https://jetour-rio-research.pages.dev/zh/
https://jetour-rio-research.pages.dev/en/
```

Expected: both routes respond successfully and the bilingual control copy is present in production.
