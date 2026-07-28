import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: '捷途国际 2026 里约全球用户节 Research', description: '11月借势资源与项目选址领导决策版', icons: { icon: '/favicon.svg' } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
