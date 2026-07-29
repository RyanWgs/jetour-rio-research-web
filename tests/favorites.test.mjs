import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFavoriteIds, serializeFavoriteIds, toggleFavoriteId } from '../src/favorites.js';

test('favorite ids survive serialization without duplicates', () => {
  assert.deepEqual([...parseFavoriteIds(serializeFavoriteIds(['b', 'a', 'a']))], ['a', 'b']);
});

test('invalid storage falls back to an empty set', () => {
  assert.deepEqual([...parseFavoriteIds('{broken')], []);
  assert.deepEqual([...parseFavoriteIds(JSON.stringify({ ids: 'wrong' }))], []);
});

test('toggle returns a new set and flips one id', () => {
  const original = new Set(['a']);
  assert.deepEqual([...toggleFavoriteId(original, 'a')], []);
  assert.deepEqual([...original], ['a']);
  assert.deepEqual([...toggleFavoriteId(original, 'b')].sort(), ['a', 'b']);
});
