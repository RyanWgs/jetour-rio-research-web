'use client';

/* eslint-disable @next/next/no-img-element -- mixed external research sources need native error fallback */

import { useState } from 'react';

export type ResearchMedia = {
  src: string;
  alt: string;
  kind: 'photo' | 'logo' | 'avatar';
  sourceLabel: string;
  sourceUrl: string;
  licenseNote: string;
  checkedAt: string;
};

export function ResearchImage({ media, locale = 'zh', compact = false, onOpen, openLabel }: { media: ResearchMedia; locale?: 'zh' | 'en'; compact?: boolean; onOpen?: () => void; openLabel?: string }) {
  const [imageState, setImageState] = useState({ source: media.src, current: media.src, failed: false });
  const imageSrc = imageState.source === media.src ? imageState.current : media.src;
  const failed = imageState.source === media.src && imageState.failed;
  if (failed) return null;

  const image = <img src={imageSrc} alt={media.alt} loading="lazy" onError={() => {
    const fallback = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(media.sourceUrl)}&sz=256`;
    if (imageSrc !== fallback) setImageState({ source: media.src, current: fallback, failed: false });
    else setImageState({ source: media.src, current: fallback, failed: true });
  }} />;
  return <figure className={`research-image ${media.kind}${compact ? ' compact' : ''}`}>
    {onOpen ? <button className="research-image-open" type="button" onClick={onOpen} aria-label={openLabel || `查看${media.alt}资源详情`}>
      {image}<span>{locale === 'en' ? 'Open resource profile' : '点击查看资源详情'}</span>
    </button> : image}
    <figcaption>
      <a href={media.sourceUrl} target="_blank" rel="noopener noreferrer">{locale === 'en' ? 'Image source' : '图片来源'} · {media.sourceLabel} ↗</a>
    </figcaption>
  </figure>;
}
