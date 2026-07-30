export function filterItems(items, state = {}) {
  return items.filter((item) => {
    if (state.category && state.category !== 'all' && item.category !== state.category) return false;
    if (state.subcategory && state.subcategory !== 'all' && item.subcategory !== state.subcategory) return false;
    if (state.hotelRole && state.hotelRole !== 'all' && item.hotelRole !== state.hotelRole) return false;
    if (state.dateStatus && state.dateStatus !== 'all' && item.dateStatus !== state.dateStatus) return false;
    if (state.influence && state.influence !== 'all' && item.influence?.level !== state.influence) return false;
    if (state.recommendation && state.recommendation !== 'all' && Number(item.recommendation) !== Number(state.recommendation)) return false;
    return true;
  });
}

export function searchItems(items, query = '') {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return [...items];
  return items.filter((item) => [
    item.name, item.location, item.relevance, item.activation, item.decision,
    ...(item.tags || [])
  ].filter(Boolean).join(' ').toLocaleLowerCase().includes(needle));
}

export function sortItems(items, mode = 'recommended') {
  const result = [...items];
  if (mode === 'influence') return result.sort((a, b) => (b.influence?.score || 0) - (a.influence?.score || 0));
  if (mode === 'date') return result.sort((a, b) => (a.dateStart || '9999').localeCompare(b.dateStart || '9999'));
  if (mode === 'name') return result.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans'));
  return result.sort((a, b) => (b.recommendation || 0) - (a.recommendation || 0) || (b.influence?.score || 0) - (a.influence?.score || 0));
}

export function filterFavoriteItems(items, favoriteIds = new Set(), onlyFavorites = false) {
  if (!onlyFavorites) return [...items];
  return items.filter((item) => favoriteIds.has(item.id));
}

export function selectItems(items, state = {}) {
  const filtered = filterItems(items, state);
  const searched = searchItems(filtered, state.query);
  const favorited = filterFavoriteItems(searched, state.favoriteIds, state.onlyFavorites);
  return sortItems(favorited, state.sort);
}
