export function connectionForVenue(hotel, venueId) {
  return hotel?.venueConnections?.find((entry) => entry.venueId === venueId) || null;
}

export function hotelsForVenue(items, venueId) {
  return items.filter((item) => item.category === 'hotel' && connectionForVenue(item, venueId));
}

export function venuesForHotel(hotel, venueItems) {
  return (hotel?.venueConnections || []).flatMap((connection) => {
    const venue = venueItems.find((item) => item.category === 'venue' && item.id === connection.venueId);
    return venue ? [{ venue, connection }] : [];
  });
}
