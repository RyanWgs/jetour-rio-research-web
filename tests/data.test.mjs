import test from 'node:test';
import assert from 'node:assert/strict';
import { researchItems, moduleSummaries, siteMeta } from '../src/research-data.js';

const statuses = new Set(['confirmed', 'likely_recurring', 'pending_announcement']);
const categories = new Set(['festival', 'ip', 'media', 'creator', 'venue']);

test('dataset covers the four requested research modules', () => {
  assert.ok(researchItems.some((item) => item.category === 'festival'));
  assert.ok(researchItems.some((item) => item.category === 'ip'));
  assert.ok(researchItems.some((item) => item.category === 'media'));
  assert.ok(researchItems.some((item) => item.category === 'creator'));
  assert.ok(researchItems.some((item) => item.category === 'venue'));
  assert.equal(moduleSummaries.length, 4);
});

test('every item has decision and provenance fields', () => {
  for (const item of researchItems) {
    assert.ok(item.id && item.name);
    assert.ok(categories.has(item.category));
    assert.ok(statuses.has(item.dateStatus));
    assert.ok(item.influence.level && item.influence.basis);
    assert.ok(item.relevance && item.recommendation);
    assert.ok(Array.isArray(item.sources) && item.sources.length > 0);
    assert.match(item.checkedAt, /^2026-\d{2}-\d{2}$/);
  }
});

test('site metadata locks the requested November window', () => {
  assert.equal(siteMeta.windowStart, '2026-11-01');
  assert.equal(siteMeta.windowEnd, '2026-11-30');
});

const count = (category, subcategory) => researchItems.filter((item) =>
  item.category === category && (!subcategory || item.subcategory === subcategory)
).length;

test('candidate pool meets agreed minimum coverage', () => {
  assert.ok(count('festival') >= 8);
  assert.ok(count('ip') >= 10);
  assert.ok(count('media', 'mainstream_media') >= 8);
  assert.ok(count('media', 'industry_media') >= 8);
  assert.ok(count('creator') >= 12);
  assert.ok(count('venue', 'outdoor') >= 5);
  assert.ok(count('venue', 'indoor') >= 6);
  assert.ok(count('venue', 'beach') >= 4);
});
