import { researchItems } from './research-data.js';
import { latinAmericaResearchItems } from './research-data-latam.js';
import { englishTranslations } from './research-translations-en.js';
import { hotelResearchItems } from './research-data-hotels.js';
import { partnershipResearchItems } from './research-data-partnerships.js';
import { hotelPartnershipEnglishTranslations } from './research-translations-hotel-partnership-en.js';
import { beachFestivalCaseItems } from './research-data-beach-cases.js';
import { beachFestivalCaseEnglishTranslations } from './research-translations-beach-cases-en.js';

const rioCategories = new Set(['festival', 'venue', 'hotel', 'beach_case', 'partnership']);
const translations = { ...englishTranslations, ...hotelPartnershipEnglishTranslations, ...beachFestivalCaseEnglishTranslations };
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
    location: translation.location || item.location,
    introduction: translation.introduction,
    influence: { ...item.influence, level: influenceLevels[item.influence.level] || item.influence.level, basis: translation.influenceBasis },
    relevance: translation.relevance,
    activation: translation.activation,
    risks: translation.risks,
    decision: translation.decision,
    tags: translation.tags,
    sources: item.sources.map((entry) => ({ ...entry, label: translation.sourceLabel || 'Official source', claim: translation.sourceClaim || 'Published resource facts' })),
    socialReach: englishSocialReach(item.socialReach),
    ...(translation.hotelRole ? { hotelRole: translation.hotelRole } : {}),
    ...(translation.roomPlan ? { roomPlan: translation.roomPlan } : {}),
    ...(translation.beachRelationship ? { beachRelationship: translation.beachRelationship } : {}),
    ...(translation.eventCapability ? { eventCapability: translation.eventCapability } : {}),
    ...(translation.brandBuildAssessment ? { brandBuildAssessment: translation.brandBuildAssessment } : {}),
    ...(translation.partnershipCategory ? { partnershipCategory: translation.partnershipCategory } : {}),
    ...(translation.barterResources ? { barterResources: translation.barterResources } : {}),
  };
}

export function getCatalog(locale) {
  const items = [...researchItems, ...latinAmericaResearchItems, ...hotelResearchItems, ...beachFestivalCaseItems, ...partnershipResearchItems].map(withGeography);
  if (locale === 'zh') return items.filter((item) => rioCategories.has(item.category));
  return items.map((item) => localizeItem(item, translations[item.id]));
}
