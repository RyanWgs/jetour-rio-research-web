import type { Metadata } from 'next';
import { SiteShell } from './site-shell';

export const metadata: Metadata = {
  title: '11月里约资源调研 · JETOUR',
  description: '2026年11月里约活动、项目场地及中南美传播与IP资源资料库',
};

export default function Home() {
  return <SiteShell />;
}
