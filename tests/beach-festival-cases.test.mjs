import test from 'node:test';
import assert from 'node:assert/strict';
import { beachFestivalCaseItems } from '../src/research-data-beach-cases.js';
import { beachFestivalCaseEnglishTranslations } from '../src/research-translations-beach-cases-en.js';
import { getCatalog } from '../src/research-catalog.js';
import { getResearchMedia } from '../src/research-media.js';

const expectedIds = [
  'case-tim-music-rio',
  'case-madonna-copacabana',
  'case-lady-gaga-copacabana',
  'case-copacabana-new-year',
  'case-rio-das-ostras-jazz',
  'case-universo-paralello',
  'case-recife-pe-na-areia',
];

test('beach festival case module contains the seven approved references', () => {
  assert.deepEqual(beachFestivalCaseItems.map((item) => item.id), expectedIds);
  assert.ok(beachFestivalCaseItems.every((item) => item.category === 'beach_case'));
});

test('every case is decision-ready, sourced and explicitly historical', () => {
  for (const item of beachFestivalCaseItems) {
    assert.equal(item.dateStatus, 'historical_case', item.id);
    assert.ok(item.introduction.length >= 45, item.id);
    assert.ok(item.influence.score >= 3, item.id);
    assert.ok(item.relevance && item.activation && item.risks, item.id);
    assert.ok(item.sources.length >= 1, item.id);
    assert.ok(item.sources.every((source) => /^https:\/\//.test(source.url)), item.id);
  }
});

test('all cases have complete English display copy', () => {
  const han = /[\u3400-\u9fff]/;
  for (const item of beachFestivalCaseItems) {
    const copy = beachFestivalCaseEnglishTranslations[item.id];
    assert.ok(copy, item.id);
    for (const field of ['name', 'location', 'introduction', 'influenceBasis', 'relevance', 'activation', 'risks', 'decision']) {
      assert.equal(typeof copy[field], 'string', `${item.id}:${field}`);
      assert.equal(han.test(copy[field]), false, `${item.id}:${field}`);
    }
    assert.ok(copy.tags.every((tag) => !han.test(tag)), item.id);
  }
});

test('both localized catalogs expose the case module', () => {
  for (const locale of ['zh', 'en']) {
    const cases = getCatalog(locale).filter((item) => item.category === 'beach_case');
    assert.equal(cases.length, 7, locale);
    assert.deepEqual(cases.map((item) => item.id), expectedIds, locale);
  }
  assert.equal(getCatalog('en').find((item) => item.id === expectedIds[0]).name, 'TIM Music Rio');
});

test('all approved cases have colour photo records with provenance', () => {
  for (const id of expectedIds) {
    const media = getResearchMedia(id);
    assert.ok(media, id);
    assert.equal(media.kind, 'photo', id);
    assert.match(media.src, /^https:\/\//, id);
    assert.match(media.sourceUrl, /^https:\/\//, id);
    assert.ok(media.sourceLabel && media.licenseNote, id);
  }
});
