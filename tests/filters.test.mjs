import test from 'node:test';
import assert from 'node:assert/strict';
import { filterItems, searchItems, sortItems, selectItems } from '../src/filters.js';

const fixtures = [
  { id: 'a', name: 'Alpha', category: 'media', subcategory: 'mainstream_media', dateStatus: 'confirmed', recommendation: 3, influence: { score: 5 }, location: 'Rio' },
  { id: 'b', name: 'Beta Creator', category: 'creator', subcategory: 'creator', dateStatus: 'pending_announcement', recommendation: 2, influence: { score: 4 }, location: 'Brazil' }
];

const hotelFixtures = [
  { id: 'h1', name: 'City Hotel', category: 'hotel', subcategory: 'main_hotel', hotelRole: 'main_hotel', dateStatus: 'pending_announcement', recommendation: 3, influence: { score: 4 }, location: 'Rio' },
  { id: 'h2', name: 'Beach Resort', category: 'hotel', subcategory: 'resort_hotel', hotelRole: 'resort_hotel', dateStatus: 'pending_announcement', recommendation: 3, influence: { score: 5 }, location: 'Rio' }
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

test('favorites combine with category and query filters', () => {
  const result = selectItems(fixtures, {
    onlyFavorites: true,
    favoriteIds: new Set(['a']),
    query: 'creator'
  });
  assert.deepEqual(result.map((item) => item.id), []);
});

test('filters hotels by their explicit role', () => {
  assert.deepEqual(filterItems(hotelFixtures, { hotelRole: 'resort_hotel' }).map((item) => item.id), ['h2']);
  assert.deepEqual(filterItems(hotelFixtures, { hotelRole: 'all' }).map((item) => item.id), hotelFixtures.map((item) => item.id));
});
