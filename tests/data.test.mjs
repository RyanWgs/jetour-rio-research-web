import test from 'node:test';
import assert from 'node:assert/strict';
import { researchItems, moduleSummaries, siteMeta } from '../src/research-data.js';
import { getCatalog } from '../src/research-catalog.js';

const statuses = new Set(['confirmed', 'likely_recurring', 'pending_announcement']);
const categories = new Set(['festival', 'ip', 'media', 'creator', 'venue']);
const socialPlatforms = ['youtube', 'instagram', 'facebook', 'tiktok'];
const socialIds = new Set([
  'acelerados', 'lucas-fontana', 'juliano-barata', 'maria-clara',
  'carioca-nomundo', 'mundo-sem-fim', 'giro-carioca', 'carioquess',
  'cazetv', 'futparodias', 'gabriel-medina', 'pedro-sampaio', 'samanta-alves',
  'ssl-gold-cup', 'roxy-dinner-show', 'carnaval-experience', 'botafogo',
  'flamengo', 'fluminense', 'vasco', 'nilton-santos',
  'theatro-municipal-ip', 'futevolei'
]);

test('dataset covers the four requested research modules', () => {
  assert.ok(researchItems.some((item) => item.category === 'festival'));
  assert.ok(researchItems.some((item) => item.category === 'ip'));
  assert.ok(researchItems.some((item) => item.category === 'media'));
  assert.ok(researchItems.some((item) => item.category === 'creator'));
  assert.ok(researchItems.some((item) => item.category === 'venue'));
  assert.equal(moduleSummaries.length, 4);
});

test('bilingual catalog exposes the approved Chinese scope', () => {
  const chinese = getCatalog('zh');
  assert.equal(chinese.length, researchItems.filter((item) => ['festival', 'venue'].includes(item.category)).length);
  assert.deepEqual([...new Set(chinese.map((item) => item.category))].sort(), ['festival', 'venue']);
});

test('catalog normalizes geography without changing stable ids', () => {
  const english = getCatalog('en');
  assert.ok(english.length >= researchItems.length);
  assert.deepEqual(english.slice(0, researchItems.length).map((item) => item.id), researchItems.map((item) => item.id));
  assert.ok(english.every((item) => item.geography?.country && item.geography?.region));
});

test('Latin America IP pool meets the approved size and priority-market coverage', () => {
  const ips = getCatalog('en').filter((item) => item.category === 'ip');
  assert.ok(ips.length >= 20 && ips.length <= 25, `IP count: ${ips.length}`);
  const countries = new Set(ips.map((item) => item.geography.country));
  for (const country of ['Brazil', 'Mexico', 'Argentina', 'Colombia', 'Chile', 'Peru', 'Puerto Rico']) {
    assert.ok(countries.has(country), country);
  }
  assert.ok(ips.some((item) => item.subcategory === 'sports_ip'));
  assert.ok(ips.some((item) => item.subcategory === 'entertainment_ip'));
});

test('new Latin America IP records are traceable and decision-ready', () => {
  const additions = getCatalog('en').filter((item) => item.category === 'ip' && item.scope === 'latin_america');
  assert.ok(additions.length >= 10);
  for (const item of additions) {
    assert.ok(item.introduction.length >= 80, item.id);
    assert.ok(item.relevance && item.activation && item.risks, item.id);
    assert.ok(item.sources.length >= 1, item.id);
    assert.ok(item.sources.every((source) => /^https:\/\//.test(source.url)), item.id);
  }
});

test('English media pool covers priority Latin America markets and both media types', () => {
  const media = getCatalog('en').filter((item) => item.category === 'media');
  assert.ok(media.length >= 23, `Media count: ${media.length}`);
  const countries = new Set(media.map((item) => item.geography.country));
  for (const country of ['Mexico', 'Argentina', 'Colombia', 'Chile', 'Peru', 'Latin America']) {
    assert.ok(countries.has(country), country);
  }
  assert.ok(media.some((item) => item.subcategory === 'mainstream_media'));
  assert.ok(media.some((item) => item.subcategory === 'industry_media'));
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

test('every resource has a decision-ready Chinese introduction', () => {
  assert.equal(researchItems.length, 64);
  for (const item of researchItems) {
    assert.equal(typeof item.introduction, 'string', item.id);
    assert.ok(item.introduction.length >= 35, item.id);
    assert.ok(item.introduction.length <= 140, item.id);
  }
});

test('creators and sports-entertainment IPs have explicit four-platform snapshots', () => {
  assert.equal(socialIds.size, 23);
  for (const item of researchItems.filter((entry) => socialIds.has(entry.id))) {
    assert.equal(item.socialReach.checkedAt, '2026-07-29', item.id);
    assert.deepEqual(Object.keys(item.socialReach.platforms).sort(), [...socialPlatforms].sort(), item.id);
    for (const platform of socialPlatforms) {
      const account = item.socialReach.platforms[platform];
      assert.ok(['verified', 'not_found', 'not_public'].includes(account.status), `${item.id}:${platform}`);
      if (account.status === 'verified') {
        assert.match(account.url, /^https:\/\//, `${item.id}:${platform}`);
        assert.ok(account.display && account.raw, `${item.id}:${platform}`);
      }
    }
  }
});
