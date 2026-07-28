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

export function ResearchImage({ media, compact = false }: { media: ResearchMedia; compact?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return <figure className={`research-image ${media.kind}${compact ? ' compact' : ''}`}>
    <img src={media.src} alt={media.alt} loading="lazy" onError={() => setFailed(true)} />
    <figcaption>
      <a href={media.sourceUrl} target="_blank" rel="noopener noreferrer">图片来源 · {media.sourceLabel} ↗</a>
    </figcaption>
  </figure>;
}
