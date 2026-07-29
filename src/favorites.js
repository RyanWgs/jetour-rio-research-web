export const FAVORITES_STORAGE_KEY = 'jetour-rio-favorites-v1';

export function parseFavoriteIds(raw) {
  try {
    const parsed = JSON.parse(raw || 'null');
    if (!parsed || !Array.isArray(parsed.ids)) return new Set();
    return new Set(parsed.ids.filter((id) => typeof id === 'string').sort());
  } catch {
    return new Set();
  }
}

export function serializeFavoriteIds(ids) {
  return JSON.stringify({ ids: [...new Set(ids)].sort() });
}

export function toggleFavoriteId(ids, id) {
  const next = new Set(ids);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}
