export const siteMeta = {
  title: '捷途国际 2026 里约全球用户节 Research',
  windowStart: '2026-11-01',
  windowEnd: '2026-11-30',
  checkedAt: '2026-07-28'
};

export const moduleSummaries = [
  { id: 'events', title: '音乐节与本地庆典', description: '聚焦整个11月可借势的里约城市文化势能。' },
  { id: 'ips', title: '体育与演艺大IP', description: '评估可参与、可包场或可合作的头部资源。' },
  { id: 'media', title: '媒体与Content Creator', description: '分开主流、行业和创作者资源。' },
  { id: 'venues', title: '项目选地', description: '分开户外、室内和沙滩场景。' }
];

const seed = (item) => ({
  dateStatus: 'confirmed',
  influence: { level: '高', score: 4, basis: '官方公开信息与行业知名度综合判断' },
  relevance: '可为全球用户节提供在地文化或传播借势价值。',
  recommendation: 3,
  checkedAt: '2026-07-28',
  ...item
});

export const researchItems = [
  seed({ id: 'rock-the-mountain', name: 'Rock The Mountain 2026', category: 'festival', subcategory: 'music_festival', sources: [{ label: '官方网站', url: 'https://www.rockthemountain.com.br/', claim: '2026日期与活动信息' }] }),
  seed({ id: 'ssl-gold-cup', name: 'SSL Gold Cup 2026', category: 'ip', subcategory: 'sports_ip', sources: [{ label: 'World Sailing', url: 'https://www.sailing.org/2025/09/03/second-edition-of-the-football-world-cup-in-sailing-heads-to-brazil-in-november-2026/', claim: '2026里约赛事信息' }] }),
  seed({ id: 'g1-rio', name: 'g1 / g1 Rio', category: 'media', subcategory: 'mainstream_media', sources: [{ label: 'g1 Rio', url: 'https://g1.globo.com/rj/rio-de-janeiro/', claim: '媒体定位与本地频道' }] }),
  seed({ id: 'acelerados', name: 'Acelerados', category: 'creator', subcategory: 'creator', sources: [{ label: 'YouTube频道', url: 'https://www.youtube.com/@Acelerados', claim: '频道与内容定位' }] }),
  seed({ id: 'marina-da-gloria', name: 'Marina da Glória', category: 'venue', subcategory: 'outdoor', sources: [{ label: '官方网站', url: 'https://marinadagloria.com.br/', claim: '场地定位与活动能力' }] })
];
