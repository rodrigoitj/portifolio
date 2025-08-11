'use client';
/* eslint-disable */

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

type GoogleAnalyticsProps = {
  gaId?: string;
};

function sendPageview(gaId: string, url: string): void {
  if (!gaId || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('config', gaId, {
    page_path: url,
  });
}

function sendLinkClick(gaId: string, href: string, linkText: string, isOutbound: boolean): void {
  if (!gaId || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'link_click', {
    event_category: isOutbound ? 'outbound' : 'inbound',
    event_label: href,
    link_text: linkText,
  });
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Send page_view on route change
  useEffect(() => {
    if (!gaId) return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname || '/';
    sendPageview(gaId, url);
  }, [gaId, pathname, searchParams]);

  // Track link clicks site-wide
  useEffect(() => {
    if (!gaId) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      const href = anchor.href;
      const linkText = (anchor.textContent || '').trim();

      let isOutbound = false;
      try {
        const linkUrl = new URL(href);
        isOutbound = linkUrl.hostname !== window.location.hostname;
      } catch {
        // ignore URL parsing errors
      }

      sendLinkClick(gaId, href, linkText, isOutbound);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [gaId]);

  return null;
}


