'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { researchItems } from '@/src/research-data.js';
import { selectItems } from '@/src/filters.js';

const modules = [
  { id: 'festival', label: '音乐节与本地庆典', eyebrow: 'EVENTS', description: '整个11月值得借势的城市文化与公共活动。' },
  { id: 'ip', label: '体育与演艺大IP', eyebrow: 'SPORTS + ENTERTAINMENT', description: '可合作、可包场、可共创的本地头部资源。' },
  { id: 'communication', label: '媒体与Content Creator', eyebrow: 'MEDIA + CREATORS', description: '主流媒体、行业媒体与内容创作者三条线。' },
  { id: 'venue', label: '项目选地', eyebrow: 'VENUES', description: '户外、室内与沙滩三类700人项目场景。' },
];

const statusLabel: Record<string, string> = { confirmed: '已官宣', likely_recurring: '周期性高概率', pending_announcement: '待官宣' };
const subLabel: Record<string, string> = { mainstream_media: '主流媒体', industry_media: '行业媒体', creator: '内容创作者', outdoor: '户外', indoor: '室内', beach: '沙滩' };

type Source = { label: string; url: string; claim: string };
type ResearchItem = {
  id: string; name: string; category: string; subcategory: string; dateStatus: string;
  dateStart: string | null; dateEnd: string | null; location: string;
  influence: { level: string; score: number; basis: string };
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

export function ResearchExplorer() {
  const [module, setModule] = useState('festival');
  const [subcategory, setSubcategory] = useState('all');
  const [dateStatus, setDateStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recommended');
  const [selected, setSelected] = useState<ResearchItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => { if (selected) dialogRef.current?.showModal(); }, [selected]);
  const active = modules.find((entry) => entry.id === module)!;
  const base = useMemo(() => (researchItems as ResearchItem[]).filter((entry) => module === 'communication' ? ['media', 'creator'].includes(entry.category) : entry.category === module), [module]);
  const results = useMemo(() => selectItems(base, { subcategory, dateStatus, query, sort }), [base, subcategory, dateStatus, query, sort]);

  function switchModule(id: string) { setModule(id); setSubcategory('all'); setDateStatus('all'); setQuery(''); }
  function closeDialog() { dialogRef.current?.close(); setSelected(null); }

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
    </div>
    {results.length ? <div className="card-grid">
      {results.map((entry: ResearchItem) => <article className="research-card" key={entry.id}>
        <div className="card-top"><span className={`status-pill ${entry.dateStatus}`}>{statusLabel[entry.dateStatus]}</span><span className="decision-chip">{entry.decision}</span></div>
        <div className="card-main"><span className="card-date">{dateText(entry)}</span><h4>{entry.name}</h4><p className="location">{entry.location}</p></div>
        <div className="influence"><span>影响力</span><strong>{entry.influence.level}</strong><i style={{ '--score': entry.influence.score } as ScoreStyle} /></div>
        <p className="card-copy">{entry.relevance}</p>
        <div className="tags">{(entry.tags || []).slice(0, 3).map((tag: string) => <span key={tag}>{tag}</span>)}</div>
        <button className="card-button" onClick={() => setSelected(entry)}>查看决策详情 <span>↗</span></button>
      </article>)}
    </div> : <div className="empty-state"><strong>没有匹配项</strong><p>试试清除搜索词或切换筛选条件。</p></div>}
    <dialog ref={dialogRef} className="detail-dialog" onClose={() => setSelected(null)}>
      {selected && <div className="dialog-inner">
        <button className="dialog-close" aria-label="关闭详情" onClick={closeDialog}>×</button>
        <span className={`status-pill ${selected.dateStatus}`}>{statusLabel[selected.dateStatus]}</span>
        <p className="dialog-kicker">{subLabel[selected.subcategory] || active.eyebrow} · {dateText(selected)}</p>
        <h3>{selected.name}</h3><p className="dialog-location">{selected.location}</p>
        <dl><div><dt>影响力判断</dt><dd><strong>{selected.influence.level}</strong>{selected.influence.basis}</dd></div><div><dt>借势价值</dt><dd>{selected.relevance}</dd></div><div><dt>建议玩法</dt><dd>{selected.activation}</dd></div><div><dt>风险与前置条件</dt><dd>{selected.risks}</dd></div></dl>
        <div className="dialog-sources"><span>公开来源</span>{selected.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div>
        <p className="dialog-note">核验时间：{selected.checkedAt} · 采购前需再次确认档期、价格、权益与排他。</p>
      </div>}
    </dialog>
  </div>;
}
