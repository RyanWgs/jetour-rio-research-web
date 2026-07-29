'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { getCatalog } from '@/src/research-catalog.js';
import { selectItems } from '@/src/filters.js';
import { FAVORITES_STORAGE_KEY, parseFavoriteIds, serializeFavoriteIds, toggleFavoriteId } from '@/src/favorites.js';
import { getResearchMedia } from '@/src/research-media.js';
import { ResearchImage, type ResearchMedia } from './research-image';

type Locale = 'zh' | 'en';
type Source = { label: string; url: string; claim: string };
type SocialPlatform = { status: 'verified' | 'not_public' | 'not_found'; url?: string; display?: string; raw?: string };
type SocialReach = { checkedAt: string; platforms: Record<string, SocialPlatform> };
type ResearchItem = {
  id: string; name: string; category: string; subcategory: string; creatorVertical?: string; dateStatus: string;
  dateStart: string | null; dateEnd: string | null; location: string; introduction: string;
  geography: { country: string; region: string }; influence: { level: string; score: number; basis: string }; socialReach?: SocialReach;
  relevance: string; activation: string; risks: string; recommendation: number;
  decision: string; checkedAt: string; tags: string[]; sources: Source[];
};
type ScoreStyle = CSSProperties & { '--score': number };

const modules = {
  zh: [
    { id: 'festival', label: '音乐节与本地庆典', eyebrow: 'EVENTS', description: '整个11月值得借势的城市文化与公共活动。' },
    { id: 'venue', label: '项目选地', eyebrow: 'VENUES', description: '户外、室内与沙滩三类700人项目场景。' },
  ],
  en: [
    { id: 'festival', label: 'Events & Local Celebrations', eyebrow: 'EVENTS', description: 'November cultural moments and public events worth aligning with.' },
    { id: 'venue', label: 'Venue Options', eyebrow: 'VENUES', description: 'Outdoor, indoor and beach settings for a 700-person programme.' },
    { id: 'ip', label: 'Sports & Entertainment IP', eyebrow: 'SPORTS + ENTERTAINMENT', description: 'High-recognition partnership properties across Latin America.' },
    { id: 'communication', label: 'Media & Content Creators', eyebrow: 'MEDIA + CREATORS', description: 'Mainstream, automotive and creator resources across Latin America.' },
  ],
};

const labels = {
  zh: {
    all: '全部', result: '项结果', search: '搜索', searchPlaceholder: '名称、地点、标签…', type: '类型', scene: '场景', status: '日期状态', sort: '排序', country: '国家 / 地区', vertical: '创作者方向',
    allCommunication: '全部传播资源', mainstream_media: '主流媒体', industry_media: '行业媒体', creator: '内容创作者', sports_ip: '体育IP', entertainment_ip: '演艺IP',
    outdoor: '户外', indoor: '室内', beach: '沙滩', confirmed: '已官宣', likely_recurring: '周期性高概率', pending_announcement: '待官宣',
    recommended: '推荐优先', influenceSort: '影响力', date: '日期', name: '名称', favorites: '仅看收藏', saved: '已收藏', save: '收藏',
    official: '访问官网 ↗', officialCreator: '访问官方账号 ↗', detail: '查看资源详情', intro: '资源简介', influence: '影响力判断', value: '借势价值', activation: '建议玩法', risks: '风险与前置条件', sources: '公开来源', social: '社媒影响力', checked: '核验于',
    noPublic: '平台暂不公开', notFound: '未确认官方账号', emptySaved: '这里还没有收藏', empty: '没有匹配项', emptySavedCopy: '浏览资源并点击星标，收藏会保存在这台设备上。', emptyCopy: '试试清除搜索词或切换筛选条件。', allCountries: '全部国家 / 地区', allVerticals: '全部创作者方向',
    automotive: '汽车', travel_lifestyle: '旅行与生活方式', sports: '体育', entertainment_music: '演艺与音乐', procurement: '采购前需再次确认档期、价格、权益与排他。', imageRights: '图片使用说明', close: '关闭资源详情',
  },
  en: {
    all: 'All', result: 'results', search: 'Search', searchPlaceholder: 'Name, location or tag…', type: 'Type', scene: 'Setting', status: 'Date status', sort: 'Sort', country: 'Country / Region', vertical: 'Creator vertical',
    allCommunication: 'All communication resources', mainstream_media: 'Mainstream media', industry_media: 'Automotive media', creator: 'Content creators', sports_ip: 'Sports IP', entertainment_ip: 'Entertainment IP',
    outdoor: 'Outdoor', indoor: 'Indoor', beach: 'Beach', confirmed: 'Confirmed', likely_recurring: 'Likely recurring', pending_announcement: 'Pending announcement',
    recommended: 'Recommended', influenceSort: 'Influence', date: 'Date', name: 'Name', favorites: 'Saved only', saved: 'Saved', save: 'Save',
    official: 'Visit official site ↗', officialCreator: 'Visit official account ↗', detail: 'View resource profile', intro: 'Resource profile', influence: 'Influence assessment', value: 'Strategic value', activation: 'Activation ideas', risks: 'Risks and conditions', sources: 'Public sources', social: 'Social reach', checked: 'Checked',
    noPublic: 'Count not public', notFound: 'Official account not confirmed', emptySaved: 'No saved resources yet', empty: 'No matching resources', emptySavedCopy: 'Select the star on any card to save it on this device.', emptyCopy: 'Clear the search or adjust the filters.', allCountries: 'All countries / regions', allVerticals: 'All creator verticals',
    automotive: 'Automotive', travel_lifestyle: 'Travel & lifestyle', sports: 'Sports', entertainment_music: 'Entertainment & music', procurement: 'Refresh availability, pricing, rights and exclusivity before procurement.', imageRights: 'Image note', close: 'Close resource profile',
  },
};

const platformLabel: Record<string, string> = { youtube: 'YouTube', instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok' };

function dateText(entry: ResearchItem, locale: Locale) {
  if (!entry.dateStart) return labels[locale][entry.dateStatus as keyof typeof labels.zh] || entry.dateStatus;
  const format = (date: string) => locale === 'zh' ? date.slice(5).replace('-', '.') : new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
  const countries = useMemo(() => [...new Set(moduleItems.map((item) => item.geography.country))].sort((a, b) => a.localeCompare(b)), [moduleItems]);
  const results = useMemo(() => {
    let base = moduleItems;
    if (country !== 'all') base = base.filter((item) => item.geography.country === country);
    if (creatorVertical !== 'all') base = base.filter((item) => item.category === 'creator' && item.creatorVertical === creatorVertical);
    return selectItems(base, { subcategory, dateStatus, query, sort, favoriteIds, onlyFavorites });
  }, [moduleItems, country, creatorVertical, subcategory, dateStatus, query, sort, favoriteIds, onlyFavorites]);

  function switchModule(id: string) { setModule(id); setSubcategory('all'); setCreatorVertical('all'); setCountry('all'); setDateStatus('all'); setQuery(''); }
  function closeDialog() { dialogRef.current?.close(); setSelected(null); }
  function toggleFavorite(id: string) { setFavoriteIds((current) => toggleFavoriteId(current, id)); }

  return <div className={`explorer locale-${locale}`}>
    <div className="module-tabs" role="tablist" aria-label={locale === 'zh' ? '调研模块' : 'Research modules'}>{moduleList.map((entry, index) => <button role="tab" aria-selected={module === entry.id} key={entry.id} onClick={() => switchModule(entry.id)}><span>0{index + 1}</span>{entry.label}</button>)}</div>
    <div className="explorer-head"><div><span className="mini-label">{active.eyebrow}</span><h3>{active.label}</h3><p>{active.description}</p></div><strong>{results.length}<small>{t.result}</small></strong></div>
    <div className="filters">
      <label className="search"><span>{t.search}</span><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchPlaceholder} /></label>
      {module === 'communication' && <label><span>{t.type}</span><select value={subcategory} onChange={(e) => { setSubcategory(e.target.value); if (e.target.value !== 'creator') setCreatorVertical('all'); }}><option value="all">{t.allCommunication}</option><option value="mainstream_media">{t.mainstream_media}</option><option value="industry_media">{t.industry_media}</option><option value="creator">{t.creator}</option></select></label>}
      {module === 'ip' && <label><span>{t.type}</span><select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}><option value="all">{t.all}</option><option value="sports_ip">{t.sports_ip}</option><option value="entertainment_ip">{t.entertainment_ip}</option></select></label>}
      {module === 'venue' && <label><span>{t.scene}</span><select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}><option value="all">{t.all}</option><option value="outdoor">{t.outdoor}</option><option value="indoor">{t.indoor}</option><option value="beach">{t.beach}</option></select></label>}
      {module === 'communication' && <label><span>{t.vertical}</span><select value={creatorVertical} onChange={(e) => { setCreatorVertical(e.target.value); if (e.target.value !== 'all') setSubcategory('creator'); }}><option value="all">{t.allVerticals}</option><option value="automotive">{t.automotive}</option><option value="travel_lifestyle">{t.travel_lifestyle}</option><option value="sports">{t.sports}</option><option value="entertainment_music">{t.entertainment_music}</option></select></label>}
      {locale === 'en' && countries.length > 1 && <label><span>{t.country}</span><select value={country} onChange={(e) => setCountry(e.target.value)}><option value="all">{t.allCountries}</option>{countries.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>}
      <label><span>{t.status}</span><select value={dateStatus} onChange={(e) => setDateStatus(e.target.value)}><option value="all">{t.all}</option><option value="confirmed">{t.confirmed}</option><option value="likely_recurring">{t.likely_recurring}</option><option value="pending_announcement">{t.pending_announcement}</option></select></label>
      <label><span>{t.sort}</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">{t.recommended}</option><option value="influence">{t.influenceSort}</option><option value="date">{t.date}</option><option value="name">{t.name}</option></select></label>
      <button className={`favorites-filter${onlyFavorites ? ' active' : ''}`} type="button" aria-pressed={onlyFavorites} onClick={() => setOnlyFavorites((value) => !value)}><span>★</span>{t.favorites} <strong>{favoriteIds.size}</strong></button>
    </div>
    {results.length ? <div className="card-grid" ref={gridRef}>{results.map((entry: ResearchItem) => {
      const media = displayMedia(getResearchMedia(entry.id) as ResearchMedia | null, locale, entry.name);
      const isFavorite = favoriteIds.has(entry.id);
      return <article className={`research-card${media ? ' has-media' : ''}`} key={entry.id} data-reveal-card>
        {media && <ResearchImage media={media} locale={locale} onOpen={() => setSelected(entry)} openLabel={`${t.detail}: ${entry.name}`} />}
        <button className={`favorite-button${isFavorite ? ' active' : ''}`} type="button" aria-pressed={isFavorite} aria-label={`${isFavorite ? t.saved : t.save}: ${entry.name}`} onClick={() => toggleFavorite(entry.id)}><span>{isFavorite ? '★' : '☆'}</span>{isFavorite ? t.saved : t.save}</button>
        <div className="card-top"><span className={`status-pill ${entry.dateStatus}`}>{t[entry.dateStatus as keyof typeof t] || entry.dateStatus}</span><span className="decision-chip">{entry.decision}</span></div>
        <div className="card-main"><span className="card-date">{dateText(entry, locale)}</span><h4>{entry.name}</h4><p className="location">{entry.location}</p></div>
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
      <dl><div><dt>{t.influence}</dt><dd><strong>{selected.influence.level}</strong>{selected.influence.basis}</dd></div><div><dt>{t.value}</dt><dd>{selected.relevance}</dd></div><div><dt>{t.activation}</dt><dd>{selected.activation}</dd></div><div><dt>{t.risks}</dt><dd>{selected.risks}</dd></div></dl>
      <div className="dialog-sources"><span>{t.sources}</span>{selected.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div>
      {getResearchMedia(selected.id) && <p className="rights-note">{t.imageRights}: {displayMedia(getResearchMedia(selected.id) as ResearchMedia, locale, selected.name)?.licenseNote}</p>}
      <p className="dialog-note">{t.checked}: {selected.checkedAt} · {t.procurement}</p>
    </div>}</dialog>
  </div>;
}
