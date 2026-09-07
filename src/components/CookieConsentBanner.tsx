import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Settings } from 'lucide-react';
import { PageId } from '../types';

interface CookieConsentBannerProps {
  onNavigate: (page: PageId) => void;
}

const STORAGE_CONSENT_KEY = 'zra_cookie_consent_status';

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [adConsent, setAdConsent] = useState(true);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_CONSENT_KEY);
      if (!saved) {
        // Delay 1 second for smooth entry
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_CONSENT_KEY, 'accepted_all');
      // Update Google Consent Mode v2
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted'
        });
      }
    }
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_CONSENT_KEY, `custom_${adConsent}_${analyticsConsent}`);
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          ad_storage: adConsent ? 'granted' : 'denied',
          ad_user_data: adConsent ? 'granted' : 'denied',
          ad_personalization: adConsent ? 'granted' : 'denied',
          analytics_storage: analyticsConsent ? 'granted' : 'denied'
        });
      }
    }
    setIsVisible(false);
  };

  const handleDeclineNonEssential = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_CONSENT_KEY, 'declined_non_essential');
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied'
        });
      }
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      id="cookie-consent-modal"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 max-w-3xl">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Privacy & Cookie Preferences</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                Google Consent Mode v2
              </span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              We use cookies to improve your educational browsing experience, analyze campus portal traffic, and serve relevant academic program advertisements via Google AdSense in compliance with GDPR and DART cookie standards.
            </p>
            <div className="flex items-center gap-3 pt-1 text-[11px]">
              <button
                onClick={() => onNavigate('privacy-policy')}
                className="text-amber-400 hover:text-amber-300 underline font-medium"
              >
                Privacy & Cookie Policy
              </button>
              <span className="text-slate-600">•</span>
              <button
                onClick={() => onNavigate('terms')}
                className="text-slate-400 hover:text-slate-300 underline font-medium"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>Customize</span>
          </button>
          <button
            onClick={handleDeclineNonEssential}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 text-xs font-semibold transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
          >
            Accept All Cookies
          </button>
        </div>
      </div>

      {/* Preferences Drawer */}
      {showPreferences && (
        <div className="mt-4 pt-4 border-t border-slate-800 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs animate-in fade-in">
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-semibold text-white block">Personalized Advertising (Google AdSense)</span>
              <span className="text-[11px] text-slate-400">Allows tailored educational program ads</span>
            </div>
            <input
              type="checkbox"
              checked={adConsent}
              onChange={(e) => setAdConsent(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-700"
            />
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-semibold text-white block">Analytics & Performance (Google Tag)</span>
              <span className="text-[11px] text-slate-400">Helps us optimize portal speed and forms</span>
            </div>
            <input
              type="checkbox"
              checked={analyticsConsent}
              onChange={(e) => setAnalyticsConsent(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-700"
            />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button
              onClick={handleSavePreferences}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
            >
              Save Cookie Choices
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
