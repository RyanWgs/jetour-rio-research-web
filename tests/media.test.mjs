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
