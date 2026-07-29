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

export function ResearchImage({ media, compact = false, onOpen, openLabel }: { media: ResearchMedia; compact?: boolean; onOpen?: () => void; openLabel?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  const image = <img src={media.src} alt={media.alt} loading="lazy" onError={() => setFailed(true)} />;
  return <figure className={`research-image ${media.kind}${compact ? ' compact' : ''}`}>
    {onOpen ? <button className="research-image-open" type="button" onClick={onOpen} aria-label={openLabel || `查看${media.alt}资源详情`}>
      {image}<span>点击查看资源详情</span>
    </button> : image}
    <figcaption>
      <a href={media.sourceUrl} target="_blank" rel="noopener noreferrer">图片来源 · {media.sourceLabel} ↗</a>
    </figcaption>
  </figure>;
}
