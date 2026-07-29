import test from 'node:test';
import assert from 'node:assert/strict';
import { hotelsForVenue, connectionForVenue, venuesForHotel } from '../src/venue-connections.js';

const hotels = [
  { id: 'h1', category: 'hotel', venueConnections: [{ venueId: 'v1', distanceKm: 2.4, driveMinutes: 8 }] },
  { id: 'h2', category: 'hotel', venueConnections: [{ venueId: 'v2', distanceKm: 5, driveMinutes: 15 }] },
  { id: 'not-a-hotel', category: 'venue', venueConnections: [{ venueId: 'v1', distanceKm: 0, driveMinutes: 0 }] },
];
const venues = [{ id: 'v1', category: 'venue' }, { id: 'v2', category: 'venue' }];

test('filters hotels by the selected venue', () => {
  assert.deepEqual(hotelsForVenue(hotels, 'v1').map((item) => item.id), ['h1']);
});

test('returns the selected venue distance or null', () => {
  assert.equal(connectionForVenue(hotels[0], 'v1').driveMinutes, 8);
  assert.equal(connectionForVenue(hotels[0], 'missing'), null);
});

test('resolves all venue records for a hotel and omits missing ids', () => {
  const hotel = { ...hotels[0], venueConnections: [...hotels[0].venueConnections, { venueId: 'missing', distanceKm: 1, driveMinutes: 2 }] };
  assert.deepEqual(venuesForHotel(hotel, venues).map((item) => item.venue.id), ['v1']);
});
