import { researchItems } from './research-data.js';
import { latinAmericaResearchItems } from './research-data-latam.js';
import { englishTranslations } from './research-translations-en.js';

const rioCategories = new Set(['festival', 'venue']);

function withGeography(item) {
  if (item.geography) return item;
  return {
    ...item,
    geography: { country: 'Brazil', region: 'South America' },
    scope: rioCategories.has(item.category) ? 'rio' : 'brazil',
  };
}

function localizeItem(item, translation) {
  if (!translation) return item;
  return {
    ...item,
    name: translation.name,
    introduction: translation.introduction,
    influence: { ...item.influence, basis: translation.influenceBasis },
    relevance: translation.relevance,
    activation: translation.activation,
    risks: translation.risks,
    decision: translation.decision,
    tags: translation.tags,
  };
}

export function getCatalog(locale) {
  const items = [...researchItems, ...latinAmericaResearchItems].map(withGeography);
  if (locale === 'zh') return items.filter((item) => rioCategories.has(item.category));
  return items.map((item) => localizeItem(item, englishTranslations[item.id]));
}
