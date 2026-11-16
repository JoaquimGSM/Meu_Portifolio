import type { ReactNode } from 'react';
import { Arrow } from './Icon';

export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a className={`external-link ${className}`} href={href} target="_blank" rel="noopener noreferrer">{children}<Arrow diagonal /><span className="sr-only"> (abre em nova aba)</span></a>;
}
