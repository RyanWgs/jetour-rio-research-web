'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { getCatalog } from '@/src/research-catalog.js';
import { selectItems } from '@/src/filters.js';
import { FAVORITES_STORAGE_KEY, parseFavoriteIds, serializeFavoriteIds, toggleFavoriteId } from '@/src/favorites.js';
import { getResearchMedia } from '@/src/research-media.js';
import { connectionForVenue, hotelsForVenue, venuesForHotel } from '@/src/venue-connections.js';
import { ResearchImage, type ResearchMedia } from './research-image';

type Locale = 'zh' | 'en';
type Source = { label: string; url: string; claim: string };
type SocialPlatform = { status: 'verified' | 'not_public' | 'not_found'; url?: string; display?: string; raw?: string };
type SocialReach = { checkedAt: string; platforms: Record<string, SocialPlatform> };
type VenueConnection = { venueId: string; distanceKm: number; driveMinutes: number; checkedAt: string; sourceUrl: string };
type ResearchItem = {
  id: string; name: string; category: string; subcategory: string; creatorVertical?: string; dateStatus: string;
  dateStart: string | null; dateEnd: string | null; location: string; introduction: string;
  geography: { country: string; region: string }; influence: { level: string; score: number; basis: string }; socialReach?: SocialReach;
  relevance: string; activation: string; risks: string; recommendation: number;
  decision: string; checkedAt: string; tags: string[]; sources: Source[];
  hotelRole?: string; roomCountPublic?: number; roomPlan?: string; beachRelationship?: string; eventCapability?: string; brandBuildAssessment?: string;
  venueConnections?: VenueConnection[]; relatedVenueIds?: string[]; partnershipCategory?: string; barterResources?: string[];
};
type ScoreStyle = CSSProperties & { '--score': number };

const modules = {
  zh: [
    { id: 'festival', number: '01', label: '音乐节与本地庆典', eyebrow: 'EVENTS', description: '整个11月值得借势的城市文化与公共活动。' },
    { id: 'venue', number: '02', label: '项目选地', eyebrow: 'VENUES', description: '户外、室内与沙滩三类700人项目场景。' },
    { id: 'hotel', number: '03', label: '酒店配套', eyebrow: 'HOTEL SUPPORT', description: '根据02场地匹配住宿、距离、接驳和品牌落地条件。' },
    { id: 'beach_case', number: '04', label: '沙滩音乐节案例', eyebrow: 'BEACH FESTIVAL CASES', description: '巴西已发生的沙滩音乐与庆典运营参考；不属于2026年11月活动档期。' },
    { id: 'partnership', number: '05', label: '异业合作', eyebrow: 'PARTNERSHIPS', description: '餐饮、沙滩户外、运动及旅行品牌合作资源。' },
  ],
  en: [
    { id: 'festival', number: '01', label: 'Events & Local Celebrations', eyebrow: 'EVENTS', description: 'November cultural moments and public events worth aligning with.' },
    { id: 'venue', number: '02', label: 'Venue Options', eyebrow: 'VENUES', description: 'Outdoor, indoor and beach settings for a 700-person programme.' },
    { id: 'hotel', number: '03', label: 'Hotel Support', eyebrow: 'HOTEL SUPPORT', description: 'Hotels matched to each venue with room, distance, transport and build conditions.' },
    { id: 'beach_case', number: '04', label: 'Beach Festival Cases', eyebrow: 'BEACH FESTIVAL CASES', description: 'Brazilian beach music and celebration references; not part of the November 2026 event calendar.' },
    { id: 'ip', number: '05', label: 'Sports & Entertainment IP', eyebrow: 'SPORTS + ENTERTAINMENT', description: 'High-recognition partnership properties across Latin America.' },
    { id: 'communication', number: '06', label: 'Media & Content Creators', eyebrow: 'MEDIA + CREATORS', description: 'Mainstream, automotive and creator resources across Latin America.' },
    { id: 'partnership', number: '07', label: 'Cross-industry Partnerships', eyebrow: 'PARTNERSHIPS', description: 'Food, beach, outdoor, sports and travel partners across Brazil.' },
  ],
};

const labels = {
  zh: {
    all: '全部', result: '项结果', search: '搜索', searchPlaceholder: '名称、地点、标签…', type: '类型', scene: '场景', status: '日期状态', sort: '排序', country: '国家 / 地区', vertical: '创作者方向',
    allCommunication: '全部传播资源', mainstream_media: '主流媒体', industry_media: '行业媒体', creator: '内容创作者', sports_ip: '体育IP', entertainment_ip: '演艺IP',
    outdoor: '户外', indoor: '室内', beach: '沙滩', confirmed: '已官宣', likely_recurring: '周期性高概率', pending_announcement: '待官宣', historical_case: '历史/运营案例',
    recommended: '推荐优先', influenceSort: '影响力', date: '日期', name: '名称', favorites: '仅看收藏', saved: '已收藏', save: '收藏',
    official: '访问官网 ↗', officialCreator: '访问官方账号 ↗', detail: '查看资源详情', intro: '资源简介', influence: '影响力判断', value: '借势价值', activation: '建议玩法', risks: '风险与前置条件', sources: '公开来源', social: '社媒影响力', checked: '核验于',
    noPublic: '平台暂不公开', notFound: '未确认官方账号', emptySaved: '这里还没有收藏', empty: '没有匹配项', emptySavedCopy: '浏览资源并点击星标，收藏会保存在这台设备上。', emptyCopy: '试试清除搜索词或切换筛选条件。', allCountries: '全部国家 / 地区', allVerticals: '全部创作者方向',
    automotive: '汽车', travel_lifestyle: '旅行与生活方式', sports: '体育', entertainment_music: '演艺与音乐', procurement: '采购前需再次确认档期、价格、权益与排他。', imageRights: '图片使用说明', close: '关闭资源详情',
    venueLink: '对应项目场地', allVenueLinks: '全部场地配套', linkedVenue: '正在查看该场地的配套酒店', clearLink: '清除关联', viewHotels: '查看配套酒店', distance: '道路距离', normalTraffic: '正常交通预计', route: '查看路线 ↗', publicRooms: '公开客房数', rooms: '间', roomPlan: '700间解决方式', beachRelation: '沙滩关系', eventCapability: '会务与接待', brandBuild: '品牌搭建初判', hotelConnections: '对应场地距离', trafficCaveat: '公里数和车程为公开路线的正常交通计划值；活动日须结合高峰、封路和大巴路测复核。公开客房量不等于2026年11月可售库存。',
    partnershipType: '合作类别', food_retail: '餐饮与即时零售', beach_lifestyle: '沙滩生活方式', outdoor_camping: '户外与露营', sports_lifestyle: '运动生活方式', travel_mobility: '航空旅行与出行', barter: '可争取置换资源',
    main_hotel: '主酒店', vip_hotel: 'VIP酒店', support_hotel: '补充酒店', resort_hotel: '度假型酒店', resourceChecked: '资料核验',
  },
  en: {
    all: 'All', result: 'results', search: 'Search', searchPlaceholder: 'Name, location or tag…', type: 'Type', scene: 'Setting', status: 'Date status', sort: 'Sort', country: 'Country / Region', vertical: 'Creator vertical',
    allCommunication: 'All communication resources', mainstream_media: 'Mainstream media', industry_media: 'Automotive media', creator: 'Content creators', sports_ip: 'Sports IP', entertainment_ip: 'Entertainment IP',
    outdoor: 'Outdoor', indoor: 'Indoor', beach: 'Beach', confirmed: 'Confirmed', likely_recurring: 'Likely recurring', pending_announcement: 'Pending announcement', historical_case: 'Historical operating case',
    recommended: 'Recommended', influenceSort: 'Influence', date: 'Date', name: 'Name', favorites: 'Saved only', saved: 'Saved', save: 'Save',
    official: 'Visit official site ↗', officialCreator: 'Visit official account ↗', detail: 'View resource profile', intro: 'Resource profile', influence: 'Influence assessment', value: 'Strategic value', activation: 'Activation ideas', risks: 'Risks and conditions', sources: 'Public sources', social: 'Social reach', checked: 'Checked',
    noPublic: 'Count not public', notFound: 'Official account not confirmed', emptySaved: 'No saved resources yet', empty: 'No matching resources', emptySavedCopy: 'Select the star on any card to save it on this device.', emptyCopy: 'Clear the search or adjust the filters.', allCountries: 'All countries / regions', allVerticals: 'All creator verticals',
    automotive: 'Automotive', travel_lifestyle: 'Travel & lifestyle', sports: 'Sports', entertainment_music: 'Entertainment & music', procurement: 'Refresh availability, pricing, rights and exclusivity before procurement.', imageRights: 'Image note', close: 'Close resource profile',
    venueLink: 'Linked venue', allVenueLinks: 'All venue links', linkedVenue: 'Supporting hotels for this venue', clearLink: 'Clear link', viewHotels: 'View supporting hotels', distance: 'Road distance', normalTraffic: 'Normal-traffic estimate', route: 'View route ↗', publicRooms: 'Published rooms', rooms: 'rooms', roomPlan: '700-room approach', beachRelation: 'Beach relationship', eventCapability: 'Meetings & hospitality', brandBuild: 'Brand-build assessment', hotelConnections: 'Venue connections', trafficCaveat: 'Distances and drive times are normal-traffic planning values from public routes. Re-test peak traffic, road closures and coaches for event day. Published rooms are not November 2026 availability.',
    partnershipType: 'Partnership category', food_retail: 'Food & instant retail', beach_lifestyle: 'Beach lifestyle', outdoor_camping: 'Outdoor & camping', sports_lifestyle: 'Sports lifestyle', travel_mobility: 'Travel & mobility', barter: 'Potential barter resources',
    main_hotel: 'Main hotel', vip_hotel: 'VIP hotel', support_hotel: 'Support hotel', resort_hotel: 'Resort hotel', resourceChecked: 'Research checked',
  },
};

const platformLabel: Record<string, string> = { youtube: 'YouTube', instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok' };

function dateText(entry: ResearchItem, locale: Locale) {
  if (['hotel', 'partnership'].includes(entry.category)) return `${labels[locale].resourceChecked} ${entry.checkedAt}`;
  if (!entry.dateStart) return labels[locale][entry.dateStatus as keyof typeof labels.zh] || entry.dateStatus;
  const historical = entry.category === 'beach_case';
  const format = (date: string) => locale === 'zh'
    ? (historical ? date.replaceAll('-', '.') : date.slice(5).replace('-', '.'))
    : new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', ...(historical ? { year: 'numeric' } : {}), timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
  const end = entry.dateEnd && entry.dateEnd !== entry.dateStart ? ` – ${format(entry.dateEnd)}` : '';
  return `${format(entry.dateStart)}${end}`;
}

function displayMedia(media: ResearchMedia | null, locale: Locale, name: string) {
  if (!media || locale === 'zh') return media;
  return { ...media, alt: `${name} official colour visual`, sourceLabel: 'Official or credited public source', licenseNote: 'Publicly accessible source visual. Reconfirm image, portrait and brand usage rights before external publication.' };
}

function SocialReachView({ reach, locale, compact = false }: { reach: SocialReach; locale: Locale; compact?: boolean }) {
  const t = labels[locale];
  const entries = Object.entries(reach.platforms);
  const verified = entries.filter(([, item]) => item.status === 'verified');
  if (compact && !verified.length) return null;
  const visible = compact ? verified.slice(0, 2) : entries;
  return <div className={`social-reach${compact ? ' compact' : ''}`}>
    {!compact && <div className="social-reach-head"><strong>{t.social}</strong><span>{t.checked} {reach.checkedAt}</span></div>}
    <div className="social-reach-grid">{visible.map(([platform, item]) => {
      const status = item.status === 'verified' ? item.display : item.status === 'not_public' ? t.noPublic : t.notFound;
      const content = <><span>{platformLabel[platform]}</span><strong>{status}</strong></>;
      return item.url ? <a key={platform} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${platformLabel[platform]} official account`}>{content}<i>↗</i></a> : <div key={platform}>{content}</div>;
    })}</div>
  </div>;
}

export function ResearchExplorer({ locale }: { locale: Locale }) {
  const t = labels[locale];
  const moduleList = modules[locale];
  const catalog = useMemo(() => getCatalog(locale) as ResearchItem[], [locale]);
  const [module, setModule] = useState('festival');
  const [subcategory, setSubcategory] = useState('all');
  const [creatorVertical, setCreatorVertical] = useState('all');
  const [country, setCountry] = useState('all');
  const [dateStatus, setDateStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recommended');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favoritesReady, setFavoritesReady] = useState(false);
  const [selected, setSelected] = useState<ResearchItem | null>(null);
  const [linkedVenueId, setLinkedVenueId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const explorerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const timer = window.setTimeout(() => { setFavoriteIds(parseFavoriteIds(window.localStorage.getItem(FAVORITES_STORAGE_KEY))); setFavoritesReady(true); }, 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { if (favoritesReady) window.localStorage.setItem(FAVORITES_STORAGE_KEY, serializeFavoriteIds(favoriteIds)); }, [favoriteIds, favoritesReady]);
  useEffect(() => { if (selected && !dialogRef.current?.open) dialogRef.current?.showModal(); }, [selected]);
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('[data-reveal-card]');
    if (!cards?.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { cards.forEach((card) => card.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { rootMargin: '80px 0px' });
    cards.forEach((card) => observer.observe(card)); return () => observer.disconnect();
  }, [module, subcategory, creatorVertical, country, dateStatus, query, sort, onlyFavorites]);

  const active = moduleList.find((entry) => entry.id === module) || moduleList[0];
  const moduleItems = useMemo(() => catalog.filter((entry) => module === 'communication' ? ['media', 'creator'].includes(entry.category) : entry.category === module), [catalog, module]);
  const venueItems = useMemo(() => catalog.filter((entry) => entry.category === 'venue'), [catalog]);
  const hotelVenueOptions = useMemo(() => {
    const ids = new Set(catalog.filter((entry) => entry.category === 'hotel').flatMap((entry) => entry.relatedVenueIds || []));
    return venueItems.filter((entry) => ids.has(entry.id));
  }, [catalog, venueItems]);
  const linkedVenue = linkedVenueId ? venueItems.find((entry) => entry.id === linkedVenueId) || null : null;
  const countries = useMemo(() => [...new Set(moduleItems.map((item) => item.geography.country))].sort((a, b) => a.localeCompare(b)), [moduleItems]);
  const results = useMemo(() => {
    let base = moduleItems;
    if (module === 'hotel' && linkedVenueId) base = hotelsForVenue(base, linkedVenueId);
    if (country !== 'all') base = base.filter((item) => item.geography.country === country);
    if (creatorVertical !== 'all') base = base.filter((item) => item.category === 'creator' && item.creatorVertical === creatorVertical);
    return selectItems(base, { subcategory, dateStatus: ['hotel', 'beach_case', 'partnership'].includes(module) ? 'all' : dateStatus, query, sort, favoriteIds, onlyFavorites });
  }, [moduleItems, module, linkedVenueId, country, creatorVertical, subcategory, dateStatus, query, sort, favoriteIds, onlyFavorites]);

  function switchModule(id: string) { setModule(id); setLinkedVenueId(null); setSubcategory('all'); setCreatorVertical('all'); setCountry('all'); setDateStatus('all'); setQuery(''); }
  function closeDialog() { dialogRef.current?.close(); setSelected(null); }
  function toggleFavorite(id: string) { setFavoriteIds((current) => toggleFavoriteId(current, id)); }
  function showHotelsForVenue(venueId: string) {
    if (!hotelsForVenue(catalog, venueId).length) return;
    dialogRef.current?.close();
    setSelected(null);
    setModule('hotel');
    setLinkedVenueId(venueId);
    setSubcategory('all');
    setCreatorVertical('all');
    setCountry('all');
    setDateStatus('all');
    setQuery('');
    window.setTimeout(() => explorerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }

  return <div className={`explorer locale-${locale}`} ref={explorerRef}>
    <div className="module-tabs" role="tablist" aria-label={locale === 'zh' ? '调研模块' : 'Research modules'}>{moduleList.map((entry) => <button role="tab" aria-selected={module === entry.id} key={entry.id} onClick={() => switchModule(entry.id)}><span>{entry.number}</span>{entry.label}</button>)}</div>
    <div className="explorer-head"><div><span className="mini-label">{active.eyebrow}</span><h3>{active.label}</h3><p>{active.description}</p></div><strong>{results.length}<small>{t.result}</small></strong></div>
    {module === 'hotel' && linkedVenue && <div className="linked-venue-banner"><div><span>{t.linkedVenue}</span><strong>{linkedVenue.name}</strong></div><button type="button" onClick={() => setLinkedVenueId(null)}>{t.clearLink} ×</button></div>}
    <div className="filters">
      <label className="search"><span>{t.search}</span><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchPlaceholder} /></label>
      {module === 'communication' && <label><span>{t.type}</span><select value={subcategory} onChange={(e) => { setSubcategory(e.target.value); if (e.target.value !== 'creator') setCreatorVertical('all'); }}><option value="all">{t.allCommunication}</option><option value="mainstream_media">{t.mainstream_media}</option><option value="industry_media">{t.industry_media}</option><option value="creator">{t.creator}</option></select></label>}
      {module === 'ip' && <label><span>{t.type}</span><select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}><option value="all">{t.all}</option><option value="sports_ip">{t.sports_ip}</option><option value="entertainment_ip">{t.entertainment_ip}</option></select></label>}
      {module === 'venue' && <label><span>{t.scene}</span><select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}><option value="all">{t.all}</option><option value="outdoor">{t.outdoor}</option><option value="indoor">{t.indoor}</option><option value="beach">{t.beach}</option></select></label>}
      {module === 'hotel' && <label><span>{t.venueLink}</span><select value={linkedVenueId || 'all'} onChange={(e) => setLinkedVenueId(e.target.value === 'all' ? null : e.target.value)}><option value="all">{t.allVenueLinks}</option>{hotelVenueOptions.map((venue) => <option key={venue.id} value={venue.id}>{venue.name}</option>)}</select></label>}
      {module === 'partnership' && <label><span>{t.partnershipType}</span><select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}><option value="all">{t.all}</option><option value="food_retail">{t.food_retail}</option><option value="beach_lifestyle">{t.beach_lifestyle}</option><option value="outdoor_camping">{t.outdoor_camping}</option><option value="sports_lifestyle">{t.sports_lifestyle}</option><option value="travel_mobility">{t.travel_mobility}</option></select></label>}
      {module === 'communication' && <label><span>{t.vertical}</span><select value={creatorVertical} onChange={(e) => { setCreatorVertical(e.target.value); if (e.target.value !== 'all') setSubcategory('creator'); }}><option value="all">{t.allVerticals}</option><option value="automotive">{t.automotive}</option><option value="travel_lifestyle">{t.travel_lifestyle}</option><option value="sports">{t.sports}</option><option value="entertainment_music">{t.entertainment_music}</option></select></label>}
      {locale === 'en' && countries.length > 1 && <label><span>{t.country}</span><select value={country} onChange={(e) => setCountry(e.target.value)}><option value="all">{t.allCountries}</option>{countries.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>}
      {!['hotel', 'beach_case', 'partnership'].includes(module) && <label><span>{t.status}</span><select value={dateStatus} onChange={(e) => setDateStatus(e.target.value)}><option value="all">{t.all}</option><option value="confirmed">{t.confirmed}</option><option value="likely_recurring">{t.likely_recurring}</option><option value="pending_announcement">{t.pending_announcement}</option></select></label>}
      <label><span>{t.sort}</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">{t.recommended}</option><option value="influence">{t.influenceSort}</option><option value="date">{t.date}</option><option value="name">{t.name}</option></select></label>
      <button className={`favorites-filter${onlyFavorites ? ' active' : ''}`} type="button" aria-pressed={onlyFavorites} onClick={() => setOnlyFavorites((value) => !value)}><span>★</span>{t.favorites} <strong>{favoriteIds.size}</strong></button>
    </div>
    {results.length ? <div className="card-grid" ref={gridRef}>{results.map((entry: ResearchItem) => {
      const media = displayMedia(getResearchMedia(entry.id) as ResearchMedia | null, locale, entry.name);
      const isFavorite = favoriteIds.has(entry.id);
      const linkedConnection = linkedVenueId && entry.category === 'hotel' ? connectionForVenue(entry, linkedVenueId) : null;
      const resourcePill = entry.category === 'hotel' ? t[entry.hotelRole as keyof typeof t] : entry.category === 'partnership' ? t[entry.partnershipCategory as keyof typeof t] : t[entry.dateStatus as keyof typeof t];
      return <article className={`research-card${media ? ' has-media' : ''}`} key={entry.id} data-reveal-card>
        {media && <ResearchImage media={media} locale={locale} onOpen={() => setSelected(entry)} openLabel={`${t.detail}: ${entry.name}`} />}
        <button className={`favorite-button${isFavorite ? ' active' : ''}`} type="button" aria-pressed={isFavorite} aria-label={`${isFavorite ? t.saved : t.save}: ${entry.name}`} onClick={() => toggleFavorite(entry.id)}><span>{isFavorite ? '★' : '☆'}</span>{isFavorite ? t.saved : t.save}</button>
        <div className="card-top"><span className={`status-pill ${entry.dateStatus}`}>{resourcePill || entry.subcategory}</span><span className="decision-chip">{entry.decision}</span></div>
        <div className="card-main"><span className="card-date">{dateText(entry, locale)}</span><h4>{entry.name}</h4><p className="location">{entry.location}</p></div>
        {entry.category === 'hotel' && <div className="hotel-card-meta"><span>{t.publicRooms}</span><strong>{entry.roomCountPublic} {t.rooms}</strong>{linkedConnection && <a href={linkedConnection.sourceUrl} target="_blank" rel="noopener noreferrer"><b>{linkedConnection.distanceKm} km</b><small>{linkedConnection.driveMinutes} min · {t.route}</small></a>}</div>}
        <div className="influence"><span>{t.influenceSort}</span><strong>{entry.influence.level}</strong><i style={{ '--score': entry.influence.score } as ScoreStyle} /></div>
        {entry.socialReach && <SocialReachView reach={entry.socialReach} locale={locale} compact />}
        <p className="card-copy">{entry.relevance}</p><div className="tags">{entry.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <a className="official-link" href={entry.sources[0].url} target="_blank" rel="noopener noreferrer">{entry.category === 'creator' ? t.officialCreator : t.official}</a>
        <button className="card-button" onClick={() => setSelected(entry)}>{t.detail} <span>↗</span></button>
      </article>;
    })}</div> : <div className="empty-state"><strong>{onlyFavorites ? t.emptySaved : t.empty}</strong><p>{onlyFavorites ? t.emptySavedCopy : t.emptyCopy}</p></div>}
    <dialog ref={dialogRef} className="detail-dialog" onClose={() => setSelected(null)}>{selected && <div className="dialog-inner">
      <button className="dialog-close" aria-label={t.close} onClick={closeDialog}>×</button>
      {displayMedia(getResearchMedia(selected.id) as ResearchMedia | null, locale, selected.name) && <ResearchImage media={displayMedia(getResearchMedia(selected.id) as ResearchMedia, locale, selected.name) as ResearchMedia} locale={locale} compact />}
      <div className="dialog-toolbar"><span className={`status-pill ${selected.dateStatus}`}>{t[selected.dateStatus as keyof typeof t] || selected.dateStatus}</span><button className={`favorite-button dialog-favorite${favoriteIds.has(selected.id) ? ' active' : ''}`} type="button" onClick={() => toggleFavorite(selected.id)}><span>{favoriteIds.has(selected.id) ? '★' : '☆'}</span>{favoriteIds.has(selected.id) ? t.saved : t.save}</button></div>
      <p className="dialog-kicker">{t[selected.subcategory as keyof typeof t] || active.eyebrow} · {dateText(selected, locale)} · {selected.geography.country}</p>
      <h3>{selected.name}</h3><p className="dialog-location">{selected.location}</p>
      <section className="resource-introduction"><span>{t.intro}</span><p>{selected.introduction}</p></section>
      {selected.socialReach && <SocialReachView reach={selected.socialReach} locale={locale} />}
      {selected.category === 'venue' && hotelsForVenue(catalog, selected.id).length > 0 && <button className="venue-hotels-cta" type="button" onClick={() => showHotelsForVenue(selected.id)}><span>{t.viewHotels}</span><strong>{hotelsForVenue(catalog, selected.id).length}</strong><i>↗</i></button>}
      {selected.category === 'hotel' && <>
        <div className="hotel-facts"><div><span>{t.publicRooms}</span><strong>{selected.roomCountPublic} {t.rooms}</strong></div><div><span>{t.roomPlan}</span><p>{selected.roomPlan}</p></div><div><span>{t.beachRelation}</span><p>{selected.beachRelationship}</p></div><div><span>{t.eventCapability}</span><p>{selected.eventCapability}</p></div><div><span>{t.brandBuild}</span><p>{selected.brandBuildAssessment}</p></div></div>
        <section className="hotel-connections"><span>{t.hotelConnections}</span>{venuesForHotel(selected, venueItems).map(({ venue, connection }) => <a key={venue.id} href={connection.sourceUrl} target="_blank" rel="noopener noreferrer"><strong>{venue.name}</strong><b>{connection.distanceKm} km · {connection.driveMinutes} min</b><small>{connection.checkedAt} · {t.route}</small></a>)}</section>
        <p className="traffic-caveat">{t.trafficCaveat}</p>
      </>}
      {selected.category === 'partnership' && selected.barterResources && <section className="barter-resources"><span>{t.barter}</span><div>{selected.barterResources.map((resource) => <b key={resource}>{resource}</b>)}</div></section>}
      <dl><div><dt>{t.influence}</dt><dd><strong>{selected.influence.level}</strong>{selected.influence.basis}</dd></div><div><dt>{t.value}</dt><dd>{selected.relevance}</dd></div><div><dt>{t.activation}</dt><dd>{selected.activation}</dd></div><div><dt>{t.risks}</dt><dd>{selected.risks}</dd></div></dl>
      <div className="dialog-sources"><span>{t.sources}</span>{selected.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div>
      {getResearchMedia(selected.id) && <p className="rights-note">{t.imageRights}: {displayMedia(getResearchMedia(selected.id) as ResearchMedia, locale, selected.name)?.licenseNote}</p>}
      <p className="dialog-note">{t.checked}: {selected.checkedAt} · {t.procurement}</p>
    </div>}</dialog>
  </div>;
}
