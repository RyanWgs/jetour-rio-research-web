import type { Metadata } from 'next';
import { blackoutWindows, decisionHighlights, researchItems, siteMeta } from '@/src/research-data.js';
import { ResearchExplorer } from './research-explorer';

type TimelineItem = { id: string; category: string; dateStart: string | null; dateStatus: string; name: string; location: string };
type DecisionHighlight = { label: string; value: string; note: string };
type BlackoutWindow = { range: string; reason: string; severity: string };

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.subtitle,
};

const timelineItems = (researchItems as TimelineItem[])
  .filter((entry) => entry.category === 'festival' && entry.dateStart)
  .sort((a, b) => (a.dateStart || '').localeCompare(b.dateStart || ''));

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">跳至主要内容</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回顶部"><span className="brand-mark">J</span><span>JETOUR · RIO 2026</span></a>
        <nav aria-label="主要导航">
          <a href="#decision">决策结论</a><a href="#timeline">11月时间轴</a><a href="#research">四项调研</a>
        </nav>
        <span className="header-meta">更新至 2026.07.28</span>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="eyebrow"><span className="live-dot" />LEADERSHIP RESEARCH · RIO DE JANEIRO</div>
          <h1>11月，<br />借里约的势。</h1>
          <p className="hero-lede">为捷途国际 700 人全球用户节筛选整个 2026 年 11 月可借势的本地活动、头部 IP、传播资源与项目场地。</p>
          <div className="hero-actions"><a className="button primary" href="#decision">先看决策</a><a className="button ghost" href="#research">浏览全部候选</a></div>
          <div className="hero-stats" aria-label="研究覆盖">
            <div><strong>64</strong><span>候选资源</span></div><div><strong>4</strong><span>决策模块</span></div><div><strong>30</strong><span>天完整窗口</span></div><div><strong>700</strong><span>目标人数</span></div>
          </div>
        </section>

        <section className="section decision-section" id="decision">
          <div className="section-heading"><div><span className="section-index">01</span><h2>先做四个决定</h2></div><p>从“资料列表”转成“下一步该怎么选”。</p></div>
          <div className="decision-grid">
            {(decisionHighlights as DecisionHighlight[]).map((entry, index) => <article className={`decision-card decision-card-${index + 1}`} key={entry.label}>
              <span>{entry.label}</span><strong>{entry.value}</strong><p>{entry.note}</p>
            </article>)}
          </div>
          <div className="window-board">
            <div><span className="mini-label">RECOMMENDED</span><h3>优先锁定 11月9–12日</h3><p>避开月初三大活动与亡灵节长周末，也尚未进入 11 月 13 日后的文化、体育与演出密集期。</p></div>
            <div className="blackout-list"><span className="mini-label">AVOID / WATCH</span>{(blackoutWindows as BlackoutWindow[]).map((entry) => <div className="blackout-row" key={entry.range}><strong>{entry.range}</strong><span>{entry.reason}</span><i className={`severity ${entry.severity}`} /></div>)}</div>
          </div>
        </section>

        <section className="section" id="timeline">
          <div className="section-heading"><div><span className="section-index">02</span><h2>整个11月，一眼看清</h2></div><p>实线日期为已官宣；周期性活动另作标记。</p></div>
          <div className="timeline" role="list" aria-label="2026年11月活动时间轴">
            {timelineItems.map((entry) => <article className="timeline-item" role="listitem" key={entry.id}>
              <time>{entry.dateStart.slice(8)}<small>NOV</small></time><div><h3>{entry.name}</h3><p>{entry.location}</p></div><span className={`status-pill ${entry.dateStatus}`}>{entry.dateStatus === 'confirmed' ? '已官宣' : '周期性'}</span>
            </article>)}
          </div>
        </section>

        <section className="section research-section" id="research">
          <div className="section-heading"><div><span className="section-index">03</span><h2>四项调研，按决策展开</h2></div><p>可搜索、筛选、排序，并展开查看借势方式、影响力依据与风险。</p></div>
          <ResearchExplorer />
        </section>

        <section className="section methodology">
          <span className="section-index">04</span><h2>信息边界</h2>
          <div className="method-grid"><p><strong>已官宣</strong>2026 日期或场地安排已有主办方、政府或官方票务来源。</p><p><strong>周期性高概率</strong>资源稳定存在，但 2026 年 11 月具体档期待锁。</p><p><strong>待官宣</strong>赛程、活动、场地空档或合作权益尚未公开。</p></div>
          <p className="footnote">影响力为公开信源与行业辨识度的决策级评估，不代替采购尽调。报价、档期、排他、肖像权、音乐权、许可与车辆进场均须书面确认。</p>
        </section>
      </main>
      <footer><span>JETOUR INTERNATIONAL · RIO 2026</span><span>Local decision prototype · Not yet published</span></footer>
    </>
  );
}
