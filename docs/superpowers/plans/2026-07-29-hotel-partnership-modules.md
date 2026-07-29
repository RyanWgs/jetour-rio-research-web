# Hotel Support and Partnership Modules Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add bilingual 03 Hotel Support and 06 Cross-industry Partnerships modules, link every hotel to existing Rio venues with explicit distance and drive-time data, complete the nationwide beach-resort Excel appendix, and publish the verified site to GitHub and Cloudflare Pages.

**Architecture:** Keep the existing resource-card model and split the new researched records into focused data modules. Add a pure venue-connection helper used by the React explorer to switch from a venue detail to filtered supporting hotels. Keep the Brazil-wide resort study in the Excel deliverable while the website hotel module remains tied only to existing Rio venue IDs.

**Tech Stack:** React 19, TypeScript, Vinext/Vite, Node test runner, CSS, `@oai/artifact-tool` for Excel, GitHub Pages, Cloudflare Pages/Sites.

## Global Constraints

- Chinese module numbers are exactly `01`, `02`, `03`, `06`; English module numbers are exactly `01` through `06`.
- Existing Rio venue scope must not expand.
- Every hotel-to-venue relationship includes road distance in kilometres, normal-traffic drive time in minutes, source URL, and checked date.
- Drive times are planning references, not event-day guarantees; the UI must show the peak-traffic/road-closure caveat.
- Public room count is not November 2026 availability; the UI must show the RFP caveat.
- New visual assets must be official colour visuals with provenance; omit an image when rights/source cannot be verified.
- The website uses the established black/white Apple-style system and must have no horizontal overflow at 390×844.
- The repository contains `.openai/hosting.json`; implementation and publishing must use the Sites building and hosting workflows.

---

### Task 1: Establish Tested Hotel and Partnership Data Contracts

**Files:**
- Create: `src/research-data-hotels.js`
- Create: `src/research-data-partnerships.js`
- Create: `tests/hotel-partnership-data.test.mjs`

**Interfaces:**
- Produces: `hotelResearchItems: ResearchItem[]` with `category: 'hotel'`, `hotelRole`, `roomCountPublic`, `beachRelationship`, and `venueConnections`.
- Produces: `partnershipResearchItems: ResearchItem[]` with `category: 'partnership'`, `partnershipCategory`, and `barterResources`.
- `venueConnections` is an array of `{ venueId: string, distanceKm: number, driveMinutes: number, checkedAt: '2026-07-29', sourceUrl: string }`.

- [ ] **Step 1: Write the failing contract tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { hotelResearchItems } from '../src/research-data-hotels.js';
import { partnershipResearchItems } from '../src/research-data-partnerships.js';

const venueIds = new Set(['marina','jockey','parque-olimpico','aterro-flamengo','parque-lage','riocentro','roxy-venue','farmasi-arena','pier-maua','windsor-barra','copacabana-palace','copacabana-beach','ipanema-beach','barra-beach','recreio-beach']);

test('hotels expose explicit venue distance records', () => {
  assert.ok(hotelResearchItems.length >= 8);
  for (const hotel of hotelResearchItems) {
    assert.equal(hotel.category, 'hotel');
    assert.ok(Number.isInteger(hotel.roomCountPublic) && hotel.roomCountPublic > 0, hotel.id);
    assert.ok(hotel.beachRelationship && hotel.hotelRole, hotel.id);
    assert.ok(hotel.venueConnections.length >= 1, hotel.id);
    for (const link of hotel.venueConnections) {
      assert.ok(venueIds.has(link.venueId), `${hotel.id}:${link.venueId}`);
      assert.ok(link.distanceKm >= 0 && link.driveMinutes >= 0, hotel.id);
      assert.match(link.checkedAt, /^2026-\d{2}-\d{2}$/);
      assert.match(link.sourceUrl, /^https:\/\//);
    }
  }
});

test('partnership pool covers the five approved categories', () => {
  assert.ok(partnershipResearchItems.length >= 12);
  assert.deepEqual(new Set(partnershipResearchItems.map(x => x.partnershipCategory)), new Set(['food_retail','beach_lifestyle','outdoor_camping','sports_lifestyle','travel_mobility']));
  for (const partner of partnershipResearchItems) {
    assert.equal(partner.category, 'partnership');
    assert.ok(partner.barterResources.length >= 1, partner.id);
    assert.ok(partner.sources.length >= 1, partner.id);
  }
});
```

- [ ] **Step 2: Run the new test and verify it fails**

Run: `node --test tests/hotel-partnership-data.test.mjs`

Expected: FAIL because both data modules do not exist.

- [ ] **Step 3: Research and write the hotel records**

Use official hotel/brand meeting pages for room and venue capacity. Use a public map route URL for every hotel–venue pair and record road kilometres plus normal-traffic minutes. Include at least Windsor Barra, Windsor Oceanico, Grand Hyatt Rio, Hilton Barra, Hilton Copacabana, Fairmont Rio, Windsor Excelsior and Sheraton Grand Rio; add another Rio beachfront or convention hotel only if its official room count and venue relationship can be verified.

Each hotel record must reuse the existing card fields (`introduction`, `influence`, `relevance`, `activation`, `risks`, `recommendation`, `decision`, `checkedAt`, `tags`, `sources`) and include an explicit risk sentence that public inventory is not November availability.

- [ ] **Step 4: Research and write the partnership records**

Use the already verified pool: iFood, Zé Delivery/Ambev, Cacau Show, Havaianas, NTK/Grupo Nautika, Decathlon Brasil, Centauro, Track&Field, Localiza&Co, Azul/Azul Viagens, GOL/Smiles and CVC Corp. Preserve the five approved categories and encode proposed barter resources as string arrays.

- [ ] **Step 5: Run the contract tests**

Run: `node --test tests/hotel-partnership-data.test.mjs`

Expected: PASS with at least eight hotels and twelve partners.

- [ ] **Step 6: Commit the data contracts and researched records**

```bash
git add src/research-data-hotels.js src/research-data-partnerships.js tests/hotel-partnership-data.test.mjs
git commit -m "feat: add hotel and partnership research data"
```

---

### Task 2: Register Sources and English Copy

**Files:**
- Create: `research/hotel-partnership-source-register.md`
- Create: `src/research-translations-hotel-partnership-en.js`
- Modify: `tests/hotel-partnership-data.test.mjs`

**Interfaces:**
- Produces: `hotelPartnershipEnglishTranslations: Record<string, Translation>` keyed by the stable IDs from Task 1.
- Source register columns: resource ID, claim, primary URL, distance URL where applicable, checked date, and qualification note.

- [ ] **Step 1: Add failing translation and provenance tests**

```js
import { hotelPartnershipEnglishTranslations } from '../src/research-translations-hotel-partnership-en.js';

test('every new resource has complete English copy', () => {
  const items = [...hotelResearchItems, ...partnershipResearchItems];
  const han = /[\u3400-\u9fff]/;
  for (const item of items) {
    const translation = hotelPartnershipEnglishTranslations[item.id];
    assert.ok(translation, item.id);
    for (const key of ['name','location','introduction','influenceBasis','relevance','activation','risks','decision']) {
      assert.ok(translation[key] && !han.test(translation[key]), `${item.id}:${key}`);
    }
  }
});
```

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/hotel-partnership-data.test.mjs`

Expected: FAIL because the translation module does not exist.

- [ ] **Step 3: Write the source register**

Record every room count, event capacity, beach relationship, distance route and brand-scale claim. For map routes, store the route URL and label time values as normal-traffic planning references. Mark display/build permissions, group inventory and event-day drive time as RFP/site-inspection items.

- [ ] **Step 4: Write full English translations**

Translate all visible card/detail fields, hotel roles, beach relationships, partner categories and barter resources. Do not leave Chinese text in English-visible records.

- [ ] **Step 5: Run translation and provenance tests**

Run: `node --test tests/hotel-partnership-data.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add research/hotel-partnership-source-register.md src/research-translations-hotel-partnership-en.js tests/hotel-partnership-data.test.mjs
git commit -m "docs: register hotel and partnership sources"
```

---

### Task 3: Merge New Categories into the Bilingual Catalog

**Files:**
- Modify: `src/research-catalog.js`
- Modify: `tests/data.test.mjs`

**Interfaces:**
- Consumes: `hotelResearchItems`, `partnershipResearchItems`, `hotelPartnershipEnglishTranslations`.
- Produces: `getCatalog('zh')` containing categories `festival`, `venue`, `hotel`, `partnership`.
- Produces: `getCatalog('en')` containing all existing categories plus `hotel` and `partnership`.

- [ ] **Step 1: Update catalog-scope tests to fail first**

Replace the current Chinese-scope assertion with:

```js
test('bilingual catalog exposes the approved Chinese scope', () => {
  const chinese = getCatalog('zh');
  assert.deepEqual([...new Set(chinese.map(item => item.category))].sort(), ['festival','hotel','partnership','venue']);
  assert.ok(chinese.some(item => item.category === 'hotel'));
  assert.ok(chinese.some(item => item.category === 'partnership'));
});
```

Extend `categories` to include `hotel` and `partnership`, and replace the fixed `researchItems.length === 64` assertion with a check limited to the original array so the established dataset remains stable.

- [ ] **Step 2: Run the data tests and verify failure**

Run: `node --test tests/data.test.mjs`

Expected: FAIL because the catalog does not merge the new modules.

- [ ] **Step 3: Merge and localize new records**

Import the Task 1 arrays and Task 2 translations. Extend geography normalization so hotels and partners default to Brazil/South America, and extend `localizeItem` to translate `hotelRole`, `beachRelationship`, `partnershipCategory`, and `barterResources` without changing numeric distance data.

- [ ] **Step 4: Run catalog tests**

Run: `node --test tests/data.test.mjs tests/hotel-partnership-data.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/research-catalog.js tests/data.test.mjs
git commit -m "feat: expose hotel and partner modules bilingually"
```

---

### Task 4: Build and Test Venue–Hotel Connection Helpers

**Files:**
- Create: `src/venue-connections.js`
- Create: `tests/venue-connections.test.mjs`

**Interfaces:**
- Produces: `hotelsForVenue(items, venueId): ResearchItem[]`.
- Produces: `connectionForVenue(hotel, venueId): VenueConnection | null`.
- Produces: `venuesForHotel(hotel, venueItems): Array<{ venue, connection }>`.

- [ ] **Step 1: Write failing helper tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { hotelsForVenue, connectionForVenue, venuesForHotel } from '../src/venue-connections.js';

const hotels = [
  { id:'h1', category:'hotel', venueConnections:[{ venueId:'v1', distanceKm:2.4, driveMinutes:8 }] },
  { id:'h2', category:'hotel', venueConnections:[{ venueId:'v2', distanceKm:5, driveMinutes:15 }] },
];
const venues = [{ id:'v1', category:'venue' }, { id:'v2', category:'venue' }];

test('filters hotels by the selected venue', () => assert.deepEqual(hotelsForVenue(hotels, 'v1').map(x => x.id), ['h1']));
test('returns the selected venue distance', () => assert.equal(connectionForVenue(hotels[0], 'v1').driveMinutes, 8));
test('resolves all venue records for a hotel', () => assert.deepEqual(venuesForHotel(hotels[0], venues).map(x => x.venue.id), ['v1']));
```

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/venue-connections.test.mjs`

Expected: FAIL because the helper module does not exist.

- [ ] **Step 3: Implement pure helpers**

Use array filtering and exact stable-ID matching. Return `null` for missing connections and omit unresolved venue IDs from `venuesForHotel`.

- [ ] **Step 4: Run the helper tests**

Run: `node --test tests/venue-connections.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/venue-connections.js tests/venue-connections.test.mjs
git commit -m "feat: add venue hotel connection helpers"
```

---

### Task 5: Add Six-Module Navigation and Venue-to-Hotel Interaction

**Files:**
- Modify: `app/research-explorer.tsx`
- Modify: `app/site-shell.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: Task 4 helpers and Task 3 catalogs.
- Produces: explicit module descriptor `{ id, number, label, eyebrow, description }`.
- Produces UI state `linkedVenueId: string | null` and handler `showHotelsForVenue(venueId: string): void`.

- [ ] **Step 1: Add failing static/UI assertions**

Add assertions that the source contains explicit numbers `01`, `02`, `03`, `04`, `05`, `06`, Chinese hotel/partnership labels, English hotel/partnership labels, `showHotelsForVenue`, `linkedVenueId`, and the bilingual CTA text `查看配套酒店` / `View supporting hotels`.

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/rendered-html.test.mjs`

Expected: FAIL because the modules and CTA do not exist.

- [ ] **Step 3: Replace index-derived module numbering**

Set the Chinese module descriptors to `festival:01`, `venue:02`, `hotel:03`, `partnership:06`; set English to `festival:01`, `venue:02`, `hotel:03`, `ip:04`, `communication:05`, `partnership:06`. Render `entry.number` instead of `index + 1`.

- [ ] **Step 4: Add hotel and partnership filters**

For hotels, provide an “All venue links” selector plus every venue referenced by the hotel dataset. For partnerships, provide the five approved category options. Keep date-status filtering hidden for `hotel` and `partnership`, because these are resources rather than November calendar events.

- [ ] **Step 5: Add the cross-module CTA and linked state**

On a venue detail, show the CTA only when `hotelsForVenue(catalog, selected.id)` is non-empty. On click: close the dialog, set `module='hotel'`, set `linkedVenueId=selected.id`, reset other filters, and scroll the explorer into view. Display a linked-venue banner with a clear action.

- [ ] **Step 6: Add distance information to hotel cards and details**

When `linkedVenueId` is active, show the exact `distanceKm km · driveMinutes min` record on every hotel card. In hotel details, list all connected venue names, distance, drive time and checked date. Add the bilingual caveat about normal traffic, event-day testing and November inventory.

- [ ] **Step 7: Update language-gate copy**

Chinese small copy becomes `活动、选址、酒店与异业合作`; English small copy becomes `Six resource modules`.

- [ ] **Step 8: Run UI source tests**

Run: `node --test tests/rendered-html.test.mjs tests/venue-connections.test.mjs`

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add app/research-explorer.tsx app/site-shell.tsx tests/rendered-html.test.mjs
git commit -m "feat: link venues to supporting hotels"
```

---

### Task 6: Add Official Visuals and Responsive Styling

**Files:**
- Modify: `src/research-media.js`
- Modify: `app/globals.css`
- Modify: `tests/media.test.mjs`

**Interfaces:**
- Consumes: stable resource IDs from Task 1.
- Produces: optional official-colour `ResearchMedia` records with source URL, source label, licence note and checked date.

- [ ] **Step 1: Add failing media and CSS tests**

Require all hotel records to have official property photography when a direct official asset is available, require partnership visuals to use `logo`, and assert `.locale-en .module-tabs` renders a six-column desktop grid while the mobile rule keeps two columns.

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/media.test.mjs`

Expected: FAIL for missing new visual coverage and layout rules.

- [ ] **Step 3: Register sourced visuals**

Use official hotel property photography and official brand logos only. Every media record includes `sourceUrl`, `licenseNote`, and `checkedAt: '2026-07-29'`. Do not add search-engine thumbnails or monochrome filters.

- [ ] **Step 4: Style navigation and connection components**

Use six equal columns for English desktop, four equal columns for Chinese desktop, and two columns on mobile. Add compact styles for the linked-venue banner, distance chip, hotel connection list and caveat. Preserve the established line, radius and grayscale tokens.

- [ ] **Step 5: Run media tests and lint**

Run: `node --test tests/media.test.mjs && pnpm lint`

Expected: PASS with no ESLint errors.

- [ ] **Step 6: Commit**

```bash
git add src/research-media.js app/globals.css tests/media.test.mjs
git commit -m "feat: style hotel and partner resource modules"
```

---

### Task 7: Complete the Nationwide Beach-Resort Excel Appendix

**Files:**
- Modify: `/tmp/jetour-resource-research.*/build_research.mjs` or recreate one conversation-specific builder if that temporary directory no longer exists
- Output: `/Users/ryan/Documents/社媒运营/outputs/jetour-resource-research-20260729/资源说明_Research补充.xlsx`

**Interfaces:**
- Produces worksheet `02全国海滨度假村` with a formula-based weighted score and top-three decision panel.
- Preserves and renames the current urban hotel sheet to `02附录-里约城市酒店`.

- [ ] **Step 1: Re-import and inspect the current workbook**

Use `@oai/artifact-tool` to inspect sheet names, the existing hotel table and original `Sheet1!G9:I21`. Render the existing workbook before editing.

- [ ] **Step 2: Research the nationwide resort shortlist**

Cover A- and B-tier Brazilian beachfront resorts. For every candidate record official room count, direct beach relationship, indoor/outdoor event capacity, airport/ground access, November weather risk, display/build caveat and source URL. Do not classify a normal seafront city hotel as a resort.

- [ ] **Step 3: Add formula-backed evaluation**

Use editable 1–5 inputs for beach integration, 700-room capacity, event/music space, display/vehicle logistics, airport access and November risk. Compute the weighted total with `25%`, `20%`, `20%`, `15%`, `10%`, `10%` weights; do not hardcode total scores.

- [ ] **Step 4: Render and inspect every sheet**

Render all sheets, visually verify title bands, row wrapping, source columns and top-three panel. Inspect the scoring range and scan for `#REF!`, `#DIV/0!`, `#VALUE!`, `#NAME?` and `#N/A`.

- [ ] **Step 5: Verify preservation and export**

Re-import the exported workbook and confirm `Sheet1!G9:I21` matches the original values and formulas exactly.

---

### Task 8: Full QA, Mobile Review and Publication

**Files:**
- Modify: `README.md`
- Modify: `qa/local-review.md`
- Generated: `dist/`, `pages-dist/`, `cloudflare-dist/`

**Interfaces:**
- Produces: a tested GitHub Pages build and Cloudflare/Sites deployment.
- Produces: an updated public URL at `https://jetour-rio-research.pages.dev/`.

- [ ] **Step 1: Run the complete automated suite**

Run: `pnpm test && pnpm lint`

Expected: all Vinext, GitHub Pages, Cloudflare, data, filter, favourites, media and interaction tests PASS.

- [ ] **Step 2: Start local preview and inspect both languages**

Run: `pnpm exec vinext dev --port 4173`

Check `/zh/` and `/en/` at desktop and 390×844. Verify module numbering, hotel filters, 02→03 CTA, distance chips, hotel detail connections, partnership filters, images, links, favourites and no horizontal overflow.

- [ ] **Step 3: Record QA evidence**

Update `qa/local-review.md` with tested paths, viewport sizes, interaction checks, known procurement caveats and the test command result.

- [ ] **Step 4: Update documentation**

Update `README.md` to describe the Chinese 01/02/03/06 scope, English six-module scope, venue–hotel distances, source register, Excel resort appendix and current data check date.

- [ ] **Step 5: Commit QA and documentation**

```bash
git add README.md qa/local-review.md
git commit -m "docs: update hotel and partnership module guidance"
```

- [ ] **Step 6: Push GitHub and verify Pages**

Run: `git push origin main`

Verify the GitHub Pages workflow succeeds and `https://ryanwgs.github.io/jetour-rio-research-web/` loads the new modules on mobile.

- [ ] **Step 7: Publish with the Sites hosting workflow**

Use the Sites hosting skill against the project containing `.openai/hosting.json`, publish the verified build, and confirm `https://jetour-rio-research.pages.dev/zh/` and `/en/` return the updated version.

- [ ] **Step 8: Final smoke check**

Open the public Cloudflare URL, switch both languages, activate 02→03 linkage, open one hotel detail and one partnership detail, verify the external links, and confirm the saved-resource count persists after refresh.
