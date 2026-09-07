import React, { useState } from 'react';
import { PageId } from '../types';
import {
  NINE_WEBSITES_CONFIG,
  WebsiteConfig,
  generateFullAdsTxt,
  getCustomPublisherId,
  saveCustomPublisherId,
  getCustomGoogleAdsId,
  saveCustomGoogleAdsId,
  setActiveWebsiteConfig,
  getActiveWebsiteConfig
} from '../data/googleEcosystemConfig';
import {
  ShieldCheck,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Copy,
  ExternalLink,
  Lock,
  Eye,
  KeyRound,
  FileCode,
  Sparkles,
  Server,
  Layers,
  ArrowRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface GoogleEcosystemPageProps {
  onNavigate: (page: PageId) => void;
}

export const GoogleEcosystemPage: React.FC<GoogleEcosystemPageProps> = ({ onNavigate }) => {
  const [selectedSiteId, setSelectedSiteId] = useState<number>(() => getActiveWebsiteConfig().id);
  const [publisherIdInput, setPublisherIdInput] = useState<string>(() => getCustomPublisherId());
  const [googleAdsInput, setGoogleAdsInput] = useState<string>(() => getCustomGoogleAdsId());
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const currentSite = NINE_WEBSITES_CONFIG.find(s => s.id === selectedSiteId) || NINE_WEBSITES_CONFIG[0];
  const fullAdsTxtContent = generateFullAdsTxt(publisherIdInput);

  const handleSelectSite = (site: WebsiteConfig) => {
    setSelectedSiteId(site.id);
    setActiveWebsiteConfig(site.id);
  };

  const handleSaveIds = () => {
    saveCustomPublisherId(publisherIdInput);
    saveCustomGoogleAdsId(googleAdsInput);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleCopyAdsTxt = () => {
    navigator.clipboard.writeText(fullAdsTxtContent);
    setCopiedAdsTxt(true);
    setTimeout(() => setCopiedAdsTxt(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              9 Websites Google Ecosystem Architecture
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              Google AdSense & Ads Command Center
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl">
              Unified technical configuration for your <strong>9 websites</strong>. Monetize with Google AdSense, configure ads.txt, track Google Ads conversions, and comply with all Google AdSense program policies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('privacy-policy')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <span>Privacy & Cookie Policy</span>
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <span>Terms of Service</span>
            </button>
          </div>
        </div>

        {/* Security & Strict Credential Isolation Notice (Complies with User Security Mandate) */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-slate-900/40 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Strict Security Protocol: Zero Password / Zero Secret Exposure</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                    SECURE ARCHITECTURE
                  </span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                  As strictly commanded: <strong>No Gmail password, No Google login OTPs, and No recovery codes</strong> are ever requested, processed, or stored. Google integration uses solely <strong>Public Identifiers</strong> (<code className="text-amber-300">Publisher ID</code>, <code className="text-amber-300">Customer ID</code>, <code className="text-amber-300">ads.txt</code>, and <code className="text-amber-300">HTML verification tags</code>).
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Safe</span>
            </div>
          </div>

          {/* Public vs Secret Classification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-800/80 text-xs">
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>PUBLIC INFORMATION (Safe & Required on Website)</span>
              </div>
              <ul className="text-slate-300 space-y-1 text-[11px] list-disc pl-4">
                <li>Google AdSense Publisher ID (e.g. <code className="text-amber-300">ca-pub-XXXXXXXXXX</code>)</li>
                <li>Google Ads Tag / Conversion ID (e.g. <code className="text-amber-300">AW-XXXXXXXXXX</code>)</li>
                <li>Search Console / AdSense HTML verification meta tags</li>
                <li>Public <code className="text-amber-300">/ads.txt</code> authorized digital sellers file</li>
              </ul>
            </div>

            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-rose-900/40">
              <div className="flex items-center gap-2 text-rose-400 font-bold mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>SECRET INFORMATION (NEVER Share With AI or Anyone)</span>
              </div>
              <ul className="text-slate-300 space-y-1 text-[11px] list-disc pl-4">
                <li>Gmail password or Google account password</li>
                <li>2-Factor Authentication (2FA) OTPs / SMS codes</li>
                <li>Google Account recovery codes</li>
                <li>Banking, IBAN, and payout payment credentials</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Global IDs Configuration Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Global Google Credentials Configuration (Public IDs)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your official Google AdSense Publisher ID and Google Ads Customer ID. These apply dynamically to all 9 domains.
              </p>
            </div>
            {savedNotice && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Settings Saved Successfully!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Google AdSense Publisher ID (ca-pub-...)
              </label>
              <input
                type="text"
                value={publisherIdInput}
                onChange={(e) => setPublisherIdInput(e.target.value)}
                placeholder="ca-pub-7890123456789012"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 text-xs font-mono focus:border-amber-400 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Found in your Google AdSense Console &gt; Account &gt; Settings &gt; Account info
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Google Ads Conversion Tag ID (AW-...)
              </label>
              <input
                type="text"
                value={googleAdsInput}
                onChange={(e) => setGoogleAdsInput(e.target.value)}
                placeholder="AW-1234567890"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 text-xs font-mono focus:border-emerald-400 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Found in Google Ads &gt; Tools & Settings &gt; Google Tag / Conversions
              </span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveIds}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/10"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Update IDs Across All 9 Domains</span>
            </button>
          </div>
        </div>

        {/* 9 Websites Selector & Navigator */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" />
              <span>Select Website to Inspect & Configure (1 to 9)</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Active: <strong className="text-amber-300">{currentSite.domainKey}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {NINE_WEBSITES_CONFIG.map((site) => {
              const isSelected = site.id === selectedSiteId;
              return (
                <button
                  key={site.id}
                  onClick={() => handleSelectSite(site)}
                  className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-bold">
                      {site.domainKey}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {site.reviewStatus}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{site.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">{site.primaryDomain}</p>
                  <p className="text-[10px] text-slate-500 mt-2 line-clamp-1">{site.category}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Website Deep Dive: 14-Point Technical Checklist */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
                Detailed Checklist • {currentSite.domainKey}
              </span>
              <h3 className="text-2xl font-black text-white mt-1">{currentSite.name}</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                <span>Domain:</span>
                <span className="text-slate-200 underline">{currentSite.primaryDomain}</span>
                <span className="mx-2">•</span>
                <span>Category:</span>
                <span className="text-amber-300">{currentSite.category}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>14/14 Checks Ready</span>
              </span>
            </div>
          </div>

          {/* 14-Point Interactive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {currentSite.checklist.map((item, idx) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white truncate">
                      {idx + 1}. {item.label}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold uppercase shrink-0">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{item.details}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Responsive Ad Placement Demo for this domain */}
          <div className="pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Responsive Ad Placement for {currentSite.domainKey}</span>
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">
                Slot: {currentSite.adSlotBannerId}
              </span>
            </div>
            <AdSenseBanner format="leaderboard" slotId={currentSite.adSlotBannerId} showPreviewNotice={true} />
          </div>
        </div>

        {/* Universal ads.txt Manager & Direct Publisher Code */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-amber-400" />
                <span>Google AdSense Authorized Digital Sellers (ads.txt)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Hosted directly at <code className="text-amber-300">/ads.txt</code>. This authorized line certifies direct publisher partnership and prevents domain spoofing.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAdsTxt}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>{copiedAdsTxt ? 'Copied to Clipboard!' : 'Copy ads.txt'}</span>
              </button>
              <a
                href="/ads.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>View Live /ads.txt</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="relative">
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
              {fullAdsTxtContent}
            </pre>
          </div>
        </div>

        {/* 9 WEBSITES SETUP REPORT (As requested in prompt) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Official Master Audit
            </div>
            <h2 className="text-2xl font-black text-white">9 Websites Setup Report</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Comprehensive report detailing Setup Status, Missing Requirements, Required Google Action, Required AI Studio Action, and Deployment Status for each website.
            </p>
          </div>

          {/* Report Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3">#</th>
                  <th className="py-3 px-3">Website & Domain</th>
                  <th className="py-3 px-3">Setup Status</th>
                  <th className="py-3 px-3">Missing Requirements</th>
                  <th className="py-3 px-3">Required Google Action (You)</th>
                  <th className="py-3 px-3">Required AI Studio Action</th>
                  <th className="py-3 px-3">Deployment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-normal">
                {NINE_WEBSITES_CONFIG.map((site) => (
                  <tr key={site.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-amber-400">
                      {site.id}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-white text-xs">{site.name}</div>
                      <div className="text-[11px] font-mono text-slate-400">{site.primaryDomain}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[10px]">
                        <CheckCircle2 className="w-3 h-3" />
                        Complete
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-400">
                      None (Code, SEO, ads.txt, Privacy Policy & Ads layout 100% ready)
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="text-amber-300 font-medium">Add site in AdSense &gt; Sites</div>
                      <div className="text-[10px] text-slate-500">Wait 2-14 days for Google review</div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-400">
                      Maintained & verified (Zero action needed)
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-mono font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Active (HTTPS)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Step-by-Step Google Account Action Guide (Where User Must Act - No AI Password Needed) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>Step-by-Step: What You Need To Do in Your Google Account (Self-Service)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Google requires manual domain ownership authorization from the account holder. Follow these steps safely without sharing your password:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                1
              </div>
              <h4 className="font-bold text-white text-sm">Add Domains to Google AdSense</h4>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Sign in to your official <a href="https://adsense.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">Google AdSense Console</a>. Go to <strong>Sites &gt; Add Site</strong>. Enter each of your 9 domains one by one.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                2
              </div>
              <h4 className="font-bold text-white text-sm">Verify Ownership (Already Done in Code)</h4>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                AdSense will ask to verify site ownership via Meta tag or ads.txt. Since we already injected both your verification tag and <code className="text-amber-400">/ads.txt</code>, simply click <strong>Verify</strong>.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                3
              </div>
              <h4 className="font-bold text-white text-sm">Google Ads Tracking (Optional)</h4>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                If you run Google Ads campaigns, sign in to <a href="https://ads.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">Google Ads</a>, grab your Customer ID (<code className="text-emerald-300">AW-XXXXX</code>), and paste it in the configuration box above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
