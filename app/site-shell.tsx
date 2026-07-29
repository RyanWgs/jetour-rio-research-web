'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { ResearchExplorer } from './research-explorer';

type Locale = 'zh' | 'en';
const routes: Record<Locale, string> = { zh: '/zh/', en: '/en/' };

const copy = {
  zh: {
    title: '11月里约资源调研',
    lede: '聚焦整个 2026 年 11 月：可借势的音乐节与本地庆典，以及适合 700 人全球用户节的里约项目场地。',
    kicker: 'RIO DE JANEIRO · NOVEMBER 2026',
    library: '资源资料库',
    note: '可搜索、筛选、排序与收藏；点击彩色图片查看中文资源详情。',
    switch: 'English',
  },
  en: {
    title: 'November Rio & Latin America Resource Library',
    lede: 'A planning library for November 2026: Rio events and venues, plus sports, entertainment, media and creators across Latin America.',
    kicker: 'RIO + LATIN AMERICA · NOVEMBER 2026',
    library: 'Resource Library',
    note: 'Search, filter, compare and save. Select any colour image to open the full resource profile.',
    switch: '中文',
  },
};

function localeFromLocation(): Locale | null {
  if (typeof window === 'undefined') return null;
  const marker = `${window.location.pathname}${window.location.hash}`;
  if (/(?:\/|#)zh(?:\/|$)/.test(marker)) return 'zh';
  if (/(?:\/|#)en(?:\/|$)/.test(marker)) return 'en';
  return null;
}

function localePath(locale: Locale) {
  if (typeof window === 'undefined') return routes[locale];
  const baseMatch = window.location.pathname.match(/^\/jetour-rio-research-web(?:\/|$)/);
  return `${baseMatch ? '/jetour-rio-research-web' : ''}/${locale}/`;
}

function subscribeToRoute(callback: () => void) {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}

export function SiteShell() {
  const locale = useSyncExternalStore(subscribeToRoute, localeFromLocation, () => null);
  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
    document.title = locale === 'en' ? 'November Rio & Latin America Resource Library · JETOUR' : '11月里约资源调研 · JETOUR';
  }, [locale]);

  function navigate(next: Locale | null) {
    const nextPath = next ? localePath(next) : localePath('zh').replace(/zh\/$/, '');
    window.history.pushState({}, '', nextPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!locale) return <LanguageGate onSelect={(next) => navigate(next)} />;
  const t = copy[locale];

  return <>
    <a className="skip-link" href="#research">{locale === 'zh' ? '跳至资源资料库' : 'Skip to resource library'}</a>
    <header className="site-header">
      <button className="brand" type="button" onClick={() => navigate(null)} aria-label={locale === 'zh' ? '返回语言选择' : 'Return to language selection'}><span className="brand-mark">J</span><span>JETOUR · RIO 2026</span></button>
      <span className="header-edition">{locale === 'zh' ? '中文版' : 'ENGLISH EDITION'}</span>
      <button className="language-switch" type="button" onClick={() => navigate(locale === 'zh' ? 'en' : 'zh')}>{t.switch} ↗</button>
    </header>
    <main>
      <section className="hero library-hero" id="top">
        <div className="eyebrow"><span className="live-dot" />{t.kicker}</div>
        <h1>{t.title}</h1>
        <p className="hero-lede">{t.lede}</p>
        <a className="button primary" href="#research">{locale === 'zh' ? '浏览资源' : 'Explore resources'}</a>
      </section>
      <section className="section research-section" id="research">
        <div className="section-heading"><div><span className="section-index">01</span><h2>{t.library}</h2></div><p>{t.note}</p></div>
        <ResearchExplorer key={locale} locale={locale} />
      </section>
    </main>
    <footer><span>JETOUR INTERNATIONAL · RIO 2026</span><span>{locale === 'zh' ? '资料核验至 2026.07.29' : 'Research checked through 29 Jul 2026'}</span></footer>
  </>;
}

function LanguageGate({ onSelect }: { onSelect: (locale: Locale) => void }) {
  return <main className="language-gate">
    <div className="language-gate-mark">J</div>
    <div className="eyebrow"><span className="live-dot" />捷途国际 · JETOUR INTERNATIONAL · RIO 2026</div>
    <h1>11月里约资源调研</h1>
    <p>选择语言进入对应版本</p>
    <div className="language-options">
      <button type="button" onClick={() => onSelect('zh')}><span>01</span><strong>中文版</strong><small>活动与项目选地</small><i>进入 ↗</i></button>
      <button type="button" onClick={() => onSelect('en')}><span>02</span><strong>English Version</strong><small>Four resource modules</small><i>Enter ↗</i></button>
    </div>
    <div className="language-gate-foot">RIO DE JANEIRO · NOVEMBER 2026</div>
  </main>;
}
