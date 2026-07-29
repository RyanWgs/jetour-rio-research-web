'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { researchItems } from '@/src/research-data.js';
import { selectItems } from '@/src/filters.js';
import { FAVORITES_STORAGE_KEY, parseFavoriteIds, serializeFavoriteIds, toggleFavoriteId } from '@/src/favorites.js';
import { getResearchMedia } from '@/src/research-media.js';
import { ResearchImage, type ResearchMedia } from './research-image';

const modules = [
  { id: 'festival', label: '音乐节与本地庆典', eyebrow: 'EVENTS', description: '整个11月值得借势的城市文化与公共活动。' },
  { id: 'ip', label: '体育与演艺大IP', eyebrow: 'SPORTS + ENTERTAINMENT', description: '可合作、可包场、可共创的本地头部资源。' },
  { id: 'communication', label: '媒体与Content Creator', eyebrow: 'MEDIA + CREATORS', description: '主流媒体、行业媒体与内容创作者三条线。' },
  { id: 'venue', label: '项目选地', eyebrow: 'VENUES', description: '户外、室内与沙滩三类700人项目场景。' },
];

const statusLabel: Record<string, string> = { confirmed: '已官宣', likely_recurring: '周期性高概率', pending_announcement: '待官宣' };
const subLabel: Record<string, string> = { mainstream_media: '主流媒体', industry_media: '行业媒体', creator: '内容创作者', outdoor: '户外', indoor: '室内', beach: '沙滩' };
const platformLabel: Record<string, string> = { youtube: 'YouTube', instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok' };
const reachStatusLabel: Record<string, string> = { not_public: '平台暂不公开', not_found: '未确认官方账号' };

type Source = { label: string; url: string; claim: string };
type SocialPlatform = { status: 'verified' | 'not_public' | 'not_found'; url?: string; display?: string; raw?: string };
type SocialReach = { checkedAt: string; platforms: Record<string, SocialPlatform> };
type ResearchItem = {
  id: string; name: string; category: string; subcategory: string; dateStatus: string;
  dateStart: string | null; dateEnd: string | null; location: string; introduction: string;
  influence: { level: string; score: number; basis: string }; socialReach?: SocialReach;
  relevance: string; activation: string; risks: string; recommendation: number;
  decision: string; checkedAt: string; tags: string[]; sources: Source[];
};
type ScoreStyle = CSSProperties & { '--score': number };

function dateText(entry: ResearchItem) {
  if (!entry.dateStart) return statusLabel[entry.dateStatus];
  const start = entry.dateStart.slice(5).replace('-', '.');
  const end = entry.dateEnd && entry.dateEnd !== entry.dateStart ? `–${entry.dateEnd.slice(5).replace('-', '.')}` : '';
  return `${start}${end}`;
}

function SocialReachView({ reach, compact = false }: { reach: SocialReach; compact?: boolean }) {
  const entries = Object.entries(reach.platforms);
  const verified = entries.filter(([, item]) => item.status === 'verified');
  if (compact && !verified.length) return null;
  const visible = compact ? verified.slice(0, 2) : entries;
  return <div className={`social-reach${compact ? ' compact' : ''}`}>
    {!compact && <div className="social-reach-head"><strong>社媒影响力</strong><span>核验于 {reach.checkedAt}</span></div>}
    <div className="social-reach-grid">
      {visible.map(([platform, item]) => {
        const content = <><span>{platformLabel[platform]}</span><strong>{item.status === 'verified' ? item.display : reachStatusLabel[item.status]}</strong></>;
        return item.url ? <a key={platform} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${platformLabel[platform]}官方账号`}>{content}<i>↗</i></a> : <div key={platform}>{content}</div>;
      })}
    </div>
  </div>;
}

export function ResearchExplorer() {
  const [module, setModule] = useState('festival');
  const [subcategory, setSubcategory] = useState('all');
  const [dateStatus, setDateStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recommended');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favoritesReady, setFavoritesReady] = useState(false);
  const [selected, setSelected] = useState<ResearchItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFavoriteIds(parseFavoriteIds(window.localStorage.getItem(FAVORITES_STORAGE_KEY)));
      setFavoritesReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (favoritesReady) window.localStorage.setItem(FAVORITES_STORAGE_KEY, serializeFavoriteIds(favoriteIds));
  }, [favoriteIds, favoritesReady]);
  useEffect(() => { if (selected && !dialogRef.current?.open) dialogRef.current?.showModal(); }, [selected]);
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('[data-reveal-card]');
    if (!cards?.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { rootMargin: '80px 0px' });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [module, subcategory, dateStatus, query, sort, onlyFavorites]);

  const active = modules.find((entry) => entry.id === module)!;
  const base = useMemo(() => (researchItems as ResearchItem[]).filter((entry) => module === 'communication' ? ['media', 'creator'].includes(entry.category) : entry.category === module), [module]);
  const results = useMemo(() => selectItems(base, { subcategory, dateStatus, query, sort, favoriteIds, onlyFavorites }), [base, subcategory, dateStatus, query, sort, favoriteIds, onlyFavorites]);

  function switchModule(id: string) { setModule(id); setSubcategory('all'); setDateStatus('all'); setQuery(''); }
  function closeDialog() { dialogRef.current?.close(); setSelected(null); }
  function toggleFavorite(id: string) { setFavoriteIds((current) => toggleFavoriteId(current, id)); }

  return <div className="explorer">
    <div className="module-tabs" role="tablist" aria-label="调研模块">
      {modules.map((entry, index) => <button role="tab" aria-selected={module === entry.id} key={entry.id} onClick={() => switchModule(entry.id)}><span>0{index + 1}</span>{entry.label}</button>)}
    </div>
    <div className="explorer-head"><div><span className="mini-label">{active.eyebrow}</span><h3>{active.label}</h3><p>{active.description}</p></div><strong>{results.length}<small>项结果</small></strong></div>
    <div className="filters">
      <label className="search"><span>搜索</span><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="名称、地点、标签…" /></label>
      {module === 'communication' && <label><span>类型</span><select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}><option value="all">全部传播资源</option><option value="mainstream_media">主流媒体</option><option value="industry_media">行业媒体</option><option value="creator">内容创作者</option></select></label>}
      {module === 'venue' && <label><span>场景</span><select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}><option value="all">全部场景</option><option value="outdoor">户外</option><option value="indoor">室内</option><option value="beach">沙滩</option></select></label>}
      <label><span>日期状态</span><select value={dateStatus} onChange={(e) => setDateStatus(e.target.value)}><option value="all">全部状态</option><option value="confirmed">已官宣</option><option value="likely_recurring">周期性高概率</option><option value="pending_announcement">待官宣</option></select></label>
      <label><span>排序</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">推荐优先</option><option value="influence">影响力</option><option value="date">日期</option><option value="name">名称</option></select></label>
      <button className={`favorites-filter${onlyFavorites ? ' active' : ''}`} type="button" aria-pressed={onlyFavorites} onClick={() => setOnlyFavorites((value) => !value)}><span>★</span>仅看收藏 <strong>{favoriteIds.size}</strong></button>
    </div>
    {results.length ? <div className="card-grid" ref={gridRef}>
      {results.map((entry: ResearchItem) => {
        const media = getResearchMedia(entry.id) as ResearchMedia | null;
        const primarySource = entry.sources[0];
        const isFavorite = favoriteIds.has(entry.id);
        return <article className={`research-card${media ? ' has-media' : ''}`} key={entry.id} data-reveal-card>
        {media && <ResearchImage media={media} onOpen={() => setSelected(entry)} openLabel={`查看${entry.name}资源详情`} />}
        <button className={`favorite-button${isFavorite ? ' active' : ''}`} type="button" aria-pressed={isFavorite} aria-label={`${isFavorite ? '取消收藏' : '收藏'}${entry.name}`} onClick={() => toggleFavorite(entry.id)}><span>{isFavorite ? '★' : '☆'}</span>{isFavorite ? '已收藏' : '收藏'}</button>
        <div className="card-top"><span className={`status-pill ${entry.dateStatus}`}>{statusLabel[entry.dateStatus]}</span><span className="decision-chip">{entry.decision}</span></div>
        <div className="card-main"><span className="card-date">{dateText(entry)}</span><h4>{entry.name}</h4><p className="location">{entry.location}</p></div>
        <div className="influence"><span>影响力</span><strong>{entry.influence.level}</strong><i style={{ '--score': entry.influence.score } as ScoreStyle} /></div>
        {entry.socialReach && <SocialReachView reach={entry.socialReach} compact />}
        <p className="card-copy">{entry.relevance}</p>
        <div className="tags">{(entry.tags || []).slice(0, 3).map((tag: string) => <span key={tag}>{tag}</span>)}</div>
        <a className="official-link" href={primarySource.url} target="_blank" rel="noopener noreferrer">{entry.category === 'creator' ? '访问官方账号 ↗' : '访问官网 ↗'}</a>
        <button className="card-button" onClick={() => setSelected(entry)}>查看资源详情 <span>↗</span></button>
      </article>})}
    </div> : <div className="empty-state"><strong>{onlyFavorites ? '这里还没有收藏' : '没有匹配项'}</strong><p>{onlyFavorites ? '浏览资源并点击星标，收藏会保存在这台设备上。' : '试试清除搜索词或切换筛选条件。'}</p></div>}
    <dialog ref={dialogRef} className="detail-dialog" onClose={() => setSelected(null)}>
      {selected && <div className="dialog-inner">
        <button className="dialog-close" aria-label="关闭资源详情" onClick={closeDialog}>×</button>
        {getResearchMedia(selected.id) && <ResearchImage media={getResearchMedia(selected.id) as ResearchMedia} compact />}
        <div className="dialog-toolbar"><span className={`status-pill ${selected.dateStatus}`}>{statusLabel[selected.dateStatus]}</span><button className={`favorite-button dialog-favorite${favoriteIds.has(selected.id) ? ' active' : ''}`} type="button" onClick={() => toggleFavorite(selected.id)}><span>{favoriteIds.has(selected.id) ? '★' : '☆'}</span>{favoriteIds.has(selected.id) ? '已收藏' : '收藏'}</button></div>
        <p className="dialog-kicker">{subLabel[selected.subcategory] || active.eyebrow} · {dateText(selected)}</p>
        <h3>{selected.name}</h3><p className="dialog-location">{selected.location}</p>
        <section className="resource-introduction"><span>资源简介</span><p>{selected.introduction}</p></section>
        {selected.socialReach && <SocialReachView reach={selected.socialReach} />}
        <dl><div><dt>影响力判断</dt><dd><strong>{selected.influence.level}</strong>{selected.influence.basis}</dd></div><div><dt>借势价值</dt><dd>{selected.relevance}</dd></div><div><dt>建议玩法</dt><dd>{selected.activation}</dd></div><div><dt>风险与前置条件</dt><dd>{selected.risks}</dd></div></dl>
        <div className="dialog-sources"><span>公开来源</span>{selected.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div>
        {getResearchMedia(selected.id) && <p className="rights-note">图片使用说明：{(getResearchMedia(selected.id) as ResearchMedia).licenseNote}</p>}
        <p className="dialog-note">核验时间：{selected.checkedAt} · 采购前需再次确认档期、价格、权益与排他。</p>
      </div>}
    </dialog>
  </div>;
}
