import { FC } from "react";

// Heroicons outline SVGs, minimal set for group icons
const icons: Record<string, FC<{ className?: string }>> = {
  "code-bracket-square": ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.75V6.25A2.25 2.25 0 0018.75 8.5H19.25M7.5 19.25V17.75A2.25 2.25 0 005.25 15.5H4.75M19.25 8.5V15.5A2.25 2.25 0 0117 17.75H16.5M4.75 8.5V15.5A2.25 2.25 0 007 17.75H7.5M16.5 19.25V17.75A2.25 2.25 0 0018.75 15.5H19.25M7.5 4.75V6.25A2.25 2.25 0 005.25 8.5H4.75" /></svg>
  ),
  "finger-print": ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25v.75m0 0c0 2.485-2.015 4.5-4.5 4.5S3 14.485 3 12c0-4.418 3.582-8 8-8s8 3.582 8 8c0 2.485-2.015 4.5-4.5 4.5s-4.5-2.015-4.5-4.5z" /></svg>
  ),
  "arrow-path": ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 017.5-7.5m0 0V3m0 1.5l-1.5-1.5M12 4.5l1.5-1.5M19.5 12a7.5 7.5 0 01-7.5 7.5m0 0v1.5m0-1.5l1.5 1.5M12 19.5l-1.5 1.5" /></svg>
  ),
  "hashtag": ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 9h9m-9 6h9m-7.5-9l-1.5 12m9-12l-1.5 12" /></svg>
  ),
  "swatch": ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m-15 0l15 15" /></svg>
  ),
  "document-text": ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25A2.25 2.25 0 009 7.5h6a2.25 2.25 0 002.25-2.25V3m-9 0A2.25 2.25 0 003 5.25v13.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V5.25A2.25 2.25 0 0018.75 3h-13.5z" /></svg>
  ),
  "clock": ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
  ),
  "key": ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v9A2.25 2.25 0 0113.5 20.25h-3A2.25 2.25 0 018.25 18V9m7.5 0H8.25" /></svg>
  ),
};

export function ToolGroupIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = icons[icon] || icons["code-bracket-square"];
  return <Icon className={className} />;
}
