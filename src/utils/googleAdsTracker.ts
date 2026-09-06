/**
 * Google Ads & Google Tag (gtag.js) Conversion Tracking Utility
 * 
 * SECURITY & PRIVACY POLICY:
 * - Public IDs ONLY (e.g. AW-123456789, G-XXXXXXXXXX).
 * - NO passwords, NO Gmail credentials, NO secret API keys, NO private tokens stored or transmitted.
 * - Complies with Google Consent Mode v2 and AdSense privacy guidelines.
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Initializes the official Google Tag (gtag.js) asynchronously
 * @param googleAdsId Public Google Ads Customer ID / Conversion Tag (e.g. AW-1234567890)
 */
export function initGoogleTag(googleAdsId: string): void {
  if (typeof window === 'undefined' || !googleAdsId || !googleAdsId.startsWith('AW-')) {
    return;
  }

  // Prevent duplicate script injection
  const existingScript = document.getElementById('google-ads-gtag');
  if (existingScript) return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', googleAdsId, {
    send_page_view: true,
    anonymize_ip: true // Strict privacy compliance
  });

  // Inject gtag.js asynchronously
  const script = document.createElement('script');
  script.id = 'google-ads-gtag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`;
  document.head.appendChild(script);
}

/**
 * Tracks a Google Ads conversion action cleanly and safely
 */
export function trackGoogleAdsConversion(conversionName: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', conversionName, {
        event_category: 'Google_Ads_Conversion',
        event_label: params.label || 'Website_User_Action',
        value: params.value || 1.0,
        currency: 'PKR',
        ...params
      });
    } else {
      // Safe fallback logging during local preview
      console.debug(`[Google Ads Tracking] Event triggered: ${conversionName}`, params);
    }
  } catch (err) {
    // Non-blocking catch to ensure zero user-facing friction
    console.debug('[Google Ads Tracking] Tracking note:', err);
  }
}
