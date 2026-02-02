import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, trackEvent, captureUTMParams, getCookie } from "@/lib/marketing";

export const PageTracker = () => {
  const location = useLocation();

  // Capture UTM params on initial load
  useEffect(() => {
    captureUTMParams();
  }, []);

  // Track page views
  useEffect(() => {
    const consent = getCookie('wtn_cookie_consent');
    if (consent === 'accepted') {
      trackPageView(location.pathname);
    }
  }, [location.pathname]);

  // Track time on page
  useEffect(() => {
    const consent = getCookie('wtn_cookie_consent');
    if (consent !== 'accepted') return;

    const startTime = Date.now();
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 5) { // Only track if more than 5 seconds
        trackEvent('time_on_page', {
          page: location.pathname,
          seconds: timeSpent,
        });
      }
    };
  }, [location.pathname]);

  // Track scroll depth
  useEffect(() => {
    const consent = getCookie('wtn_cookie_consent');
    if (consent !== 'accepted') return;

    let maxScroll = 0;
    
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      maxScroll = Math.max(maxScroll, scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (maxScroll > 10) {
        trackEvent('scroll_depth', {
          page: location.pathname,
          maxDepth: maxScroll,
        });
      }
    };
  }, [location.pathname]);

  // Track clicks on important elements
  useEffect(() => {
    const consent = getCookie('wtn_cookie_consent');
    if (consent !== 'accepted') return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Track button clicks
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button');
        trackEvent('button_click', {
          text: button?.textContent?.trim().slice(0, 50),
          page: location.pathname,
        });
      }
      
      // Track link clicks
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target : target.closest('a');
        const href = (link as HTMLAnchorElement)?.href;
        if (href && !href.startsWith(window.location.origin)) {
          trackEvent('external_link_click', {
            href,
            page: location.pathname,
          });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [location.pathname]);

  return null;
};
