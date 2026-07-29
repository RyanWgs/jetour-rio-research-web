import test from 'node:test';
import assert from 'node:assert/strict';
import { hotelResearchItems } from '../src/research-data-hotels.js';
import { partnershipResearchItems } from '../src/research-data-partnerships.js';
import { hotelPartnershipEnglishTranslations } from '../src/research-translations-hotel-partnership-en.js';

const venueIds = new Set([
  'marina', 'jockey', 'parque-olimpico', 'aterro-flamengo', 'parque-lage',
  'riocentro', 'roxy-venue', 'farmasi-arena', 'pier-maua', 'windsor-barra',
  'copacabana-palace', 'copacabana-beach', 'ipanema-beach', 'barra-beach',
  'recreio-beach',
]);

test('hotels expose explicit venue distance records', () => {
  assert.ok(hotelResearchItems.length >= 8);
  for (const hotel of hotelResearchItems) {
    assert.equal(hotel.category, 'hotel');
    assert.ok(Number.isInteger(hotel.roomCountPublic) && hotel.roomCountPublic > 0, hotel.id);
    assert.ok(hotel.beachRelationship && hotel.hotelRole, hotel.id);
    assert.ok(hotel.venueConnections.length >= 1, hotel.id);
    for (const link of hotel.venueConnections) {
      assert.ok(venueIds.has(link.venueId), `${hotel.id}:${link.venueId}`);
      assert.ok(link.distanceKm >= 0 && link.driveMinutes >= 0, hotel.id);
      assert.match(link.checkedAt, /^2026-\d{2}-\d{2}$/);
      assert.match(link.sourceUrl, /^https:\/\//);
    }
  }
});

test('partnership pool covers the five approved categories', () => {
  assert.ok(partnershipResearchItems.length >= 12);
  assert.deepEqual(
    new Set(partnershipResearchItems.map((item) => item.partnershipCategory)),
    new Set(['food_retail', 'beach_lifestyle', 'outdoor_camping', 'sports_lifestyle', 'travel_mobility']),
  );
  for (const partner of partnershipResearchItems) {
    assert.equal(partner.category, 'partnership');
    assert.ok(partner.barterResources.length >= 1, partner.id);
    assert.ok(partner.sources.length >= 1, partner.id);
  }
});

test('every new resource has complete English copy', () => {
  const items = [...hotelResearchItems, ...partnershipResearchItems];
  const han = /[\u3400-\u9fff]/;
  for (const item of items) {
    const translation = hotelPartnershipEnglishTranslations[item.id];
    assert.ok(translation, item.id);
    for (const key of ['name', 'location', 'introduction', 'influenceBasis', 'relevance', 'activation', 'risks', 'decision']) {
      assert.ok(translation[key] && !han.test(translation[key]), `${item.id}:${key}`);
    }
    assert.ok(Array.isArray(translation.tags) && translation.tags.every((tag) => !han.test(tag)), item.id);
  }
});
