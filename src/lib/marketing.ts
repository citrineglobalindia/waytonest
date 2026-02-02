// Marketing utilities for tracking and analytics

// Cookie utilities
export const setCookie = (name: string, value: string, days: number = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Generate unique visitor ID
export const getVisitorId = (): string => {
  let visitorId = getCookie('wtn_visitor_id');
  if (!visitorId) {
    visitorId = `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setCookie('wtn_visitor_id', visitorId, 365);
  }
  return visitorId;
};

// Session tracking
export const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('wtn_session_id');
  if (!sessionId) {
    sessionId = `s_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('wtn_session_id', sessionId);
  }
  return sessionId;
};

// Track page view
export const trackPageView = (page: string) => {
  const consent = getCookie('wtn_cookie_consent');
  if (consent !== 'accepted') return;

  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  
  const pageViews = JSON.parse(localStorage.getItem('wtn_page_views') || '[]');
  pageViews.push({
    page,
    visitorId,
    sessionId,
    timestamp: new Date().toISOString(),
    referrer: document.referrer,
    userAgent: navigator.userAgent,
  });
  
  // Keep only last 100 page views
  if (pageViews.length > 100) {
    pageViews.shift();
  }
  
  localStorage.setItem('wtn_page_views', JSON.stringify(pageViews));
  console.log('[Marketing] Page view tracked:', page);
};

// Track events (clicks, form submissions, etc.)
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  const consent = getCookie('wtn_cookie_consent');
  if (consent !== 'accepted') return;

  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  
  const events = JSON.parse(localStorage.getItem('wtn_events') || '[]');
  events.push({
    event: eventName,
    data: eventData,
    visitorId,
    sessionId,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
  });
  
  // Keep only last 200 events
  if (events.length > 200) {
    events.shift();
  }
  
  localStorage.setItem('wtn_events', JSON.stringify(events));
  console.log('[Marketing] Event tracked:', eventName, eventData);
};

// Track lead popup shown
export const hasSeenLeadPopup = (): boolean => {
  return getCookie('wtn_lead_popup_shown') === 'true';
};

export const markLeadPopupShown = () => {
  setCookie('wtn_lead_popup_shown', 'true', 7); // Reset after 7 days
};

// Track lead submission
export const trackLeadSubmission = (leadData: {
  name: string;
  email: string;
  phone: string;
  source: string;
  page: string;
}) => {
  const leads = JSON.parse(localStorage.getItem('wtn_leads') || '[]');
  leads.push({
    ...leadData,
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem('wtn_leads', JSON.stringify(leads));
  trackEvent('lead_submitted', leadData);
  console.log('[Marketing] Lead captured:', leadData);
};

// Get all tracking data (for admin panel)
export const getTrackingData = () => {
  return {
    pageViews: JSON.parse(localStorage.getItem('wtn_page_views') || '[]'),
    events: JSON.parse(localStorage.getItem('wtn_events') || '[]'),
    leads: JSON.parse(localStorage.getItem('wtn_leads') || '[]'),
  };
};

// UTM parameter tracking
export const captureUTMParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      utmParams[param] = value;
      setCookie(`wtn_${param}`, value, 30); // Store for 30 days
    }
  });
  
  if (Object.keys(utmParams).length > 0) {
    trackEvent('utm_captured', utmParams);
  }
  
  return utmParams;
};

// Get stored UTM params
export const getStoredUTMParams = () => {
  const params: Record<string, string | null> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    params[param] = getCookie(`wtn_${param}`);
  });
  return params;
};
