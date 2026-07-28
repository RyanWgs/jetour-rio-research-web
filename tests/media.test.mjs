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

const countVisuals = (predicate) => researchItems.filter((item) =>
  predicate(item) && getResearchMedia(item.id)
).length;

test('approved visual coverage is met by content type', () => {
  assert.ok(countVisuals((item) => item.category === 'festival') >= 4);
  assert.ok(countVisuals((item) => item.category === 'ip') >= 3);
  assert.equal(countVisuals((item) => item.category === 'media'), 17);
  assert.ok(countVisuals((item) => item.category === 'creator') >= 10);
  assert.ok(countVisuals((item) => item.category === 'venue') >= 6);
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
