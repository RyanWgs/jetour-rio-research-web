import { researchItems } from './research-data.js';
import { latinAmericaResearchItems } from './research-data-latam.js';
import { englishTranslations } from './research-translations-en.js';

const rioCategories = new Set(['festival', 'venue']);
const influenceLevels = { '极高': 'Very High', '高': 'High', '中高': 'High', '中': 'Medium', '中低': 'Medium-Low', '低': 'Low' };
const creatorVerticals = {
  'acelerados': 'automotive', 'lucas-fontana': 'automotive', 'juliano-barata': 'automotive', 'maria-clara': 'automotive',
  'carioca-nomundo': 'travel_lifestyle', 'mundo-sem-fim': 'travel_lifestyle', 'giro-carioca': 'travel_lifestyle', 'carioquess': 'travel_lifestyle',
  'cazetv': 'sports', 'futparodias': 'sports', 'gabriel-medina': 'sports',
  'pedro-sampaio': 'entertainment_music', 'samanta-alves': 'entertainment_music',
};

function withGeography(item) {
  const vertical = item.category === 'creator' && !item.creatorVertical ? creatorVerticals[item.id] : item.creatorVertical;
  if (item.geography) return vertical ? { ...item, creatorVertical: vertical } : item;
  return {
    ...item,
    geography: { country: 'Brazil', region: 'South America' },
    scope: rioCategories.has(item.category) ? 'rio' : 'brazil',
    ...(vertical ? { creatorVertical: vertical } : {}),
  };
}

function englishSocialReach(socialReach) {
  if (!socialReach) return socialReach;
  const platforms = Object.fromEntries(Object.entries(socialReach.platforms).map(([platform, value]) => {
    if (value.status !== 'verified' || !/[万亿]/.test(value.display || '')) return [platform, value];
    const match = String(value.display).replace(/,/g, '').match(/([\d.]+)(万|亿)/);
    if (!match) return [platform, value];
    const amount = Number(match[1]) * (match[2] === '亿' ? 100 : 0.01);
    const display = amount >= 1 ? `${Number(amount.toFixed(2))}M` : `${Math.round(amount * 1000)}K`;
    return [platform, { ...value, display }];
  }));
  return { ...socialReach, platforms };
}

function localizeItem(item, translation) {
  if (!translation) return item;
  return {
    ...item,
    name: translation.name,
    introduction: translation.introduction,
    influence: { ...item.influence, level: influenceLevels[item.influence.level] || item.influence.level, basis: translation.influenceBasis },
    relevance: translation.relevance,
    activation: translation.activation,
    risks: translation.risks,
    decision: translation.decision,
    tags: translation.tags,
    sources: item.sources.map((entry) => ({ ...entry, label: translation.sourceLabel, claim: translation.sourceClaim })),
    socialReach: englishSocialReach(item.socialReach),
  };
}

export function getCatalog(locale) {
  const items = [...researchItems, ...latinAmericaResearchItems].map(withGeography);
  if (locale === 'zh') return items.filter((item) => rioCategories.has(item.category));
  return items.map((item) => localizeItem(item, englishTranslations[item.id]));
}
