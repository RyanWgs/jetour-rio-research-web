import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { researchItems } from '../src/research-data.js';
import { getCatalog } from '../src/research-catalog.js';
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
  const ids = new Set(getCatalog('en').map((item) => item.id));
  for (const [id, media] of Object.entries(researchMedia)) {
    assert.ok(ids.has(id));
    assert.ok(media.src && media.alt && media.sourceLabel && media.sourceUrl);
    assert.ok(kinds.has(media.kind));
    assert.ok(media.licenseNote);
    assert.match(media.checkedAt, /^2026-\d{2}-\d{2}$/);
    assert.equal(getResearchMedia(id), media);
  }
});

const countVisuals = (predicate) => researchItems.filter((item) =>
  predicate(item) && getResearchMedia(item.id)
).length;

test('approved visual coverage is met by content type', () => {
  assert.ok(countVisuals((item) => item.category === 'festival') >= 8);
  assert.ok(countVisuals((item) => item.category === 'ip') >= 8);
  assert.equal(countVisuals((item) => item.category === 'media'), 17);
  assert.ok(countVisuals((item) => item.category === 'creator') >= 12);
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

test('photo records use direct visuals instead of screenshot placeholders', () => {
  const photoRecords = Object.values(researchMedia).filter((media) => media.kind === 'photo');
  assert.ok(photoRecords.length > 0);
  for (const media of photoRecords) {
    assert.doesNotMatch(media.src, /mshots\/v1/, `${media.alt} still uses a screenshot placeholder`);
  }
});

test('research visuals explicitly preserve their original colour', async () => {
  const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
  const imageRule = css.match(/\.research-image img\s*\{[^}]+\}/)?.[0] || '';
  assert.match(imageRule, /filter:\s*none/);
  assert.doesNotMatch(imageRule, /grayscale\s*\(/);
});

test('every English resource has a visual record', () => {
  for (const item of getCatalog('en')) assert.ok(getResearchMedia(item.id), item.id);
});

test('hotel and partnership modules use coloured visual records', () => {
  const catalog = getCatalog('en');
  const hotels = catalog.filter((item) => item.category === 'hotel');
  const partners = catalog.filter((item) => item.category === 'partnership');

  assert.equal(hotels.length, 8);
  assert.equal(partners.length, 12);
  for (const item of hotels) {
    const media = getResearchMedia(item.id);
    assert.ok(media, item.id);
    assert.ok(['photo', 'logo'].includes(media.kind), item.id);
  }
  for (const item of partners) assert.equal(getResearchMedia(item.id)?.kind, 'logo', item.id);
});

test('module navigation supports four Chinese and six English modules responsively', async () => {
  const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
  assert.match(css, /\.locale-en \.module-tabs\s*\{[^}]*repeat\(6,/s);
  assert.match(css, /\.locale-zh \.module-tabs\s*\{[^}]*repeat\(4,/s);
  assert.match(css, /@media \(max-width:700px\)[\s\S]*\.locale-en \.module-tabs,\s*\.locale-zh \.module-tabs\s*\{[^}]*repeat\(2,/s);
});
