import test from 'node:test';
import assert from 'node:assert/strict';
import { filterItems, searchItems, sortItems } from '../src/filters.js';

const fixtures = [
  { id: 'a', name: 'Alpha', category: 'media', subcategory: 'mainstream_media', dateStatus: 'confirmed', recommendation: 3, influence: { score: 5 }, location: 'Rio' },
  { id: 'b', name: 'Beta Creator', category: 'creator', subcategory: 'creator', dateStatus: 'pending_announcement', recommendation: 2, influence: { score: 4 }, location: 'Brazil' }
];

test('filters categories without mixing creators into media', () => {
  assert.deepEqual(filterItems(fixtures, { category: 'media' }).map((item) => item.id), ['a']);
});

test('search matches name and location case-insensitively', () => {
  assert.deepEqual(searchItems(fixtures, 'creator').map((item) => item.id), ['b']);
});

test('default sorting prioritizes recommendation then influence', () => {
  assert.deepEqual(sortItems(fixtures, 'recommended').map((item) => item.id), ['a', 'b']);
});
