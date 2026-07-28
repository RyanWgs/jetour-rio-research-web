# Research Card Links & Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a clear official link to every research card and add sourced real photos, official logos, or public avatars according to the approved content-type rules.

**Architecture:** Keep research claims in `src/research-data.js`, place visual metadata in a separate `src/research-media.js` manifest keyed by research item ID, and merge both at render time. Use a focused `ResearchImage` client component to handle photo/logo/avatar presentation and hide failed images without affecting the card. Store approved local assets under `public/research-media/` and record source, rights note, and verification status in the manifest and source register.

**Tech Stack:** React 19, Next/vinext, TypeScript, CSS, Node `node:test`, public image assets, Git.

## Global Constraints

- Events, local celebrations, sports/entertainment IP, and venues use real subject-specific photos where a reliable source exists.
- Mainstream and industry media use official logos.
- Content creators use public avatars or official channel logos.
- Every research card displays at least one clickable official website, official account, or public source link.
- No generated images, generic stock photos, search-result thumbnails, watermarked assets, or assets obtained by bypassing access controls.
- Every image record includes source URL, descriptive alt text, visual kind, rights note, and verification date.
- Failed images disappear and the card falls back to the existing text-only layout.
- External links open in a new tab with `rel="noopener noreferrer"`.
- Desktop, tablet, and mobile layouts must not introduce horizontal overflow.
- This plan must not create a GitHub repository or publish the site.

---

## File Structure

```text
src/research-media.js              # ID-keyed visual metadata and lookup helper
public/research-media/             # Optimized local photos, logos, and avatars
app/research-image.tsx             # Resilient image renderer with failure fallback
app/research-explorer.tsx          # Card and detail integration, official links
app/globals.css                    # Photo/logo/avatar and link presentation
tests/media.test.mjs               # Visual metadata, coverage, and source validation
tests/rendered-html.test.mjs       # Official link and image-source SSR assertions
research/source-register.md        # Visual source and publication-rights notes
qa/local-review.md                 # Updated responsive, interaction, and asset QA
README.md                          # Image update and rights-review instructions
```

### Task 1: Visual Metadata Contract and Official-Link Contract

**Files:**
- Create: `src/research-media.js`
- Create: `tests/media.test.mjs`
- Modify: `tests/data.test.mjs`

**Interfaces:**
- Produces: `researchMedia: Record<string, ResearchMedia>` and `getResearchMedia(id: string): ResearchMedia | null`.
- `ResearchMedia` shape: `{ src, alt, kind, sourceLabel, sourceUrl, licenseNote, checkedAt }`.
- Consumes: every `researchItems[].id` and `researchItems[].sources[0]` from `src/research-data.js`.

- [ ] **Step 1: Write failing official-link and media-contract tests**

Create `tests/media.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { researchItems } from '../src/research-data.js';
import { researchMedia, getResearchMedia } from '../src/research-media.js';

const kinds = new Set(['photo', 'logo', 'avatar']);

test('every card has a valid clickable primary source', () => {
  for (const item of researchItems) {
    assert.ok(item.sources[0]);
    assert.doesNotThrow(() => new URL(item.sources[0].url));
    assert.match(item.sources[0].url, /^https:\/\//);
  }
});

test('visual records have complete provenance', () => {
  for (const [id, media] of Object.entries(researchMedia)) {
    assert.ok(researchItems.some((item) => item.id === id));
    assert.ok(media.src && media.alt && media.sourceLabel && media.sourceUrl);
    assert.ok(kinds.has(media.kind));
    assert.ok(media.licenseNote);
    assert.match(media.checkedAt, /^2026-\d{2}-\d{2}$/);
    assert.equal(getResearchMedia(id), media);
  }
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `node --test tests/media.test.mjs`

Expected: FAIL because `src/research-media.js` does not exist.

- [ ] **Step 3: Implement the empty manifest and lookup helper**

Create `src/research-media.js`:

```js
export const researchMedia = {};

export function getResearchMedia(id) {
  return researchMedia[id] || null;
}
```

- [ ] **Step 4: Run the contract tests**

Run: `node --test tests/media.test.mjs tests/data.test.mjs`

Expected: PASS with zero failures.

- [ ] **Step 5: Commit the contracts**

```bash
git add src/research-media.js tests/media.test.mjs tests/data.test.mjs
git commit -m "test: define research visual and link contracts"
```

### Task 2: Source, Optimize, and Register Real Visual Assets

**Files:**
- Modify: `src/research-media.js`
- Modify: `research/source-register.md`
- Create: `public/research-media/*.{webp,png,svg}`
- Modify: `tests/media.test.mjs`

**Interfaces:**
- Consumes: the Task 1 `ResearchMedia` contract.
- Produces: locally served `/research-media/<id>.<ext>` assets with complete provenance.

- [ ] **Step 1: Add failing coverage assertions**

Append to `tests/media.test.mjs`:

```js
const countVisuals = (predicate) => researchItems.filter((item) =>
  predicate(item) && getResearchMedia(item.id)
).length;

test('approved visual coverage is met by content type', () => {
  assert.ok(countVisuals((item) => item.category === 'festival') >= 7);
  assert.ok(countVisuals((item) => item.category === 'ip') >= 8);
  assert.equal(countVisuals((item) => item.category === 'media'), 17);
  assert.ok(countVisuals((item) => item.category === 'creator') >= 10);
  assert.ok(countVisuals((item) => item.category === 'venue') >= 12);
});

test('visual kind matches the approved category rule', () => {
  for (const item of researchItems) {
    const media = getResearchMedia(item.id);
    if (!media) continue;
    if (item.category === 'media') assert.equal(media.kind, 'logo');
    if (item.category === 'creator') assert.ok(['avatar', 'logo'].includes(media.kind));
    if (['festival', 'ip', 'venue'].includes(item.category)) assert.equal(media.kind, 'photo');
  }
});
```

- [ ] **Step 2: Run coverage tests and verify failure**

Run: `node --test tests/media.test.mjs`

Expected: FAIL because the manifest is empty.

- [ ] **Step 3: Research visual sources by content type**

For every chosen asset, record in `research/source-register.md`:

```text
Item ID | Asset path | Kind | Original page URL | Source owner | Rights note | Checked 2026-07-28
```

Use official press/venue pages first, Wikimedia Commons where licensing is explicit, and official account avatars/logos for media and creators. Do not use a search-result image URL as the source record.

- [ ] **Step 4: Add and optimize the local assets**

Save assets with deterministic names:

```text
public/research-media/rock-the-mountain.webp
public/research-media/ssl-gold-cup.webp
public/research-media/g1.svg
public/research-media/acelerados.png
public/research-media/riocentro.webp
```

Resize photos to a maximum width of 1200px and convert to WebP where possible. Preserve SVG/PNG for logos when conversion would damage transparency or brand rendering.

- [ ] **Step 5: Populate the manifest**

Use this exact record structure:

```js
'rock-the-mountain': {
  src: '/research-media/rock-the-mountain.webp',
  alt: 'Rock The Mountain音乐节现场舞台与观众',
  kind: 'photo',
  sourceLabel: 'Rock The Mountain官方',
  sourceUrl: 'https://www.rockthemountain.com.br/',
  licenseNote: '官方公开图片；公开发布前复核品牌使用许可',
  checkedAt: '2026-07-28'
}
```

- [ ] **Step 6: Run media tests**

Run: `node --test tests/media.test.mjs`

Expected: PASS with zero failures and all five coverage assertions satisfied.

- [ ] **Step 7: Commit assets and provenance**

```bash
git add src/research-media.js public/research-media research/source-register.md tests/media.test.mjs
git commit -m "content: add sourced research visuals"
```

### Task 3: Card Images, Official Links, and Detail Provenance

**Files:**
- Create: `app/research-image.tsx`
- Modify: `app/research-explorer.tsx`
- Modify: `app/globals.css`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `getResearchMedia(item.id)` and `item.sources[0]`.
- Produces: `ResearchImage({ media, compact }): JSX.Element | null` and visible official-link/source-link controls.

- [ ] **Step 1: Add failing server-render assertions**

Append to `tests/rendered-html.test.mjs`:

```js
assert.match(html, /访问官网|访问官方账号/);
assert.match(html, /图片来源/);
assert.match(html, /research-media\//);
```

- [ ] **Step 2: Run the rendered HTML test and verify failure**

Run: `pnpm run build && node --test tests/rendered-html.test.mjs`

Expected: FAIL because cards do not yet render images or primary links.

- [ ] **Step 3: Implement the resilient image component**

Create `app/research-image.tsx`:

```tsx
'use client';

import { useState } from 'react';

export function ResearchImage({ media }: { media: ResearchMedia }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <figure className={`research-image ${media.kind}`}>
    <img src={media.src} alt={media.alt} loading="lazy" onError={() => setFailed(true)} />
    <figcaption><a href={media.sourceUrl} target="_blank" rel="noopener noreferrer">图片来源 · {media.sourceLabel} ↗</a></figcaption>
  </figure>;
}
```

Define the matching `ResearchMedia` TypeScript type in this file or a nearby shared type module before compilation.

- [ ] **Step 4: Integrate visual and primary-link rendering**

In `app/research-explorer.tsx`:

```tsx
const media = getResearchMedia(entry.id);
const primarySource = entry.sources[0];

{media && <ResearchImage media={media} />}
<a className="official-link" href={primarySource.url} target="_blank" rel="noopener noreferrer">
  {entry.category === 'creator' ? '访问官方账号 ↗' : '访问官网 ↗'}
</a>
```

Add image source, rights note, and official link to the detail dialog without removing the existing full research-source list.

- [ ] **Step 5: Implement visual treatment and fallback layout**

Add CSS for:

```css
.research-image { margin: -25px -25px 22px; position: relative; overflow: hidden; aspect-ratio: 16/9; background: #111; }
.research-image img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) saturate(.35); transition: filter .25s ease, transform .25s ease; }
.research-card:hover .research-image img { filter: grayscale(.25) saturate(.8); transform: scale(1.015); }
.research-image.logo img, .research-image.avatar img { object-fit: contain; padding: 28px; }
.research-image figcaption { position: absolute; right: 10px; bottom: 10px; padding: 6px 8px; border-radius: 8px; background: rgba(0,0,0,.72); font-size: 9px; }
.official-link { display: inline-flex; min-height: 40px; align-items: center; color: var(--text); font-size: 11px; }
```

Retain the current text-only card spacing when `ResearchImage` returns `null`.

- [ ] **Step 6: Run build, rendered HTML tests, and lint**

Run:

```bash
pnpm test
pnpm run lint
```

Expected: build succeeds; all tests pass; ESLint reports zero errors.

- [ ] **Step 7: Commit the UI**

```bash
git add app tests/rendered-html.test.mjs
git commit -m "feat: add sourced visuals and official card links"
```

### Task 4: Responsive, Failure, and Local Delivery QA

**Files:**
- Modify: `qa/local-review.md`
- Modify: `README.md`
- Modify if required: `app/globals.css`

**Interfaces:**
- Consumes: completed visual cards and existing local preview server.
- Produces: updated QA evidence and the user-reviewable local candidate.

- [ ] **Step 1: Run the full verification suite**

Run:

```bash
pnpm test
pnpm run lint
```

Expected: all tests pass, zero failures, and ESLint exits zero.

- [ ] **Step 2: Audit local asset responses**

Request every `researchMedia[].src` from `http://localhost:4173` and confirm HTTP 200. Record any missing file as a failure; do not ship broken paths.

- [ ] **Step 3: Verify image-failure fallback**

Temporarily test one invalid image path in the browser and verify its figure disappears while the card text and official link remain usable. Restore the valid path before the final test run.

- [ ] **Step 4: Inspect desktop, tablet, and mobile layouts**

Inspect:

```text
1440 × 1000
1024 × 1366
390 × 844
```

Verify no horizontal overflow; photo cards, logo cards, avatar cards, source captions, official links, filters, and detail dialogs remain readable.

- [ ] **Step 5: Update documentation and rights gate**

Update `README.md` and `qa/local-review.md` with:

- local preview command;
- visual coverage counts by category;
- asset and source audit result;
- items whose `licenseNote` requires public-release approval;
- explicit note that GitHub publication remains blocked pending user approval and rights review.

- [ ] **Step 6: Commit the polished local candidate**

```bash
git add app/globals.css README.md qa/local-review.md
git commit -m "fix: polish research visual presentation"
```

- [ ] **Step 7: Stop for local review**

Return the local preview URL and summarize visual coverage. Do not create a GitHub repository or publish the site.

## Plan Self-Review

- Spec coverage: all four image-type rules, card links, provenance, failure fallback, responsive behavior, testing, and public-release rights review have implementation steps.
- Placeholder scan: no TBD, TODO, “implement later,” or undefined task remains.
- Type consistency: `ResearchMedia`, `researchMedia`, and `getResearchMedia(id)` use the same field names across data, UI, and tests.
- Scope: this plan changes only visual assets, links, presentation, tests, and documentation; research conclusions and GitHub publication remain untouched.
