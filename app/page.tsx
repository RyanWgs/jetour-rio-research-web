import type { Metadata } from 'next';
import { siteMeta } from '@/src/research-data.js';
import { ResearchExplorer } from './research-explorer';

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.subtitle,
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">跳至主要内容</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回顶部"><span className="brand-mark">J</span><span>JETOUR · RIO 2026</span></a>
        <nav aria-label="主要导航">
          <a href="#research">里约四类资源</a>
        </nav>
        <span className="header-meta">更新至 2026.07.29</span>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="eyebrow"><span className="live-dot" />RESOURCE LIBRARY · RIO DE JANEIRO</div>
          <h1>11月里约资源调研</h1>
          <p className="hero-lede">为捷途国际全球用户节汇集整个 2026 年 11 月可借势的本地活动、体育与演艺 IP、传播资源及项目场地。</p>
          <div className="hero-actions"><a className="button primary" href="#research">浏览全部资源</a></div>
        </section>

        <section className="section research-section" id="research">
          <div className="section-heading"><div><span className="section-index">01</span><h2>里约四类资源</h2></div><p>可搜索、筛选、排序、收藏；点击图片进入中文资源详情。</p></div>
          <ResearchExplorer />
        </section>

        <section className="section methodology">
          <span className="section-index">02</span><h2>信息边界</h2>
          <div className="method-grid"><p><strong>已官宣</strong>2026 日期或场地安排已有主办方、政府或官方票务来源。</p><p><strong>周期性高概率</strong>资源稳定存在，但 2026 年 11 月具体档期待锁。</p><p><strong>待官宣</strong>赛程、活动、场地空档或合作权益尚未公开。</p></div>
          <p className="footnote">影响力为公开信源与行业辨识度的决策级评估，不代替采购尽调。报价、档期、排他、肖像权、音乐权、许可与车辆进场均须书面确认。</p>
        </section>
      </main>
      <footer><span>JETOUR INTERNATIONAL · RIO 2026</span><span>November resource library · Updated 2026.07.29</span></footer>
    </>
  );
}
