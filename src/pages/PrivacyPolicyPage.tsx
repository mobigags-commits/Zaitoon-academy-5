import React from 'react';
import { PageId } from '../types';
import { Shield, Lock, Eye, CheckCircle2, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageId) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            Google AdSense & GDPR Certified Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Privacy & Cookie Policy
          </h1>
          <p className="mt-2 text-base text-slate-400">
            Last Updated & Verified: <span className="text-slate-200 font-mono">September 6, 2026</span> • Applicable to Zaitoon Roots Academy and All 9 Connected Academic Domains
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-amber-400" />
            Our Commitment to Privacy & Strict Security
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            At <strong>Zaitoon Roots Academy</strong> (and its network of 9 digital subdomains including admissions, degrees, diplomas, LMS, verification, and research), we prioritize the safety and privacy of our students, applicants, faculty, and website visitors. This Privacy Policy details how we collect, handle, protect, and use your data in full compliance with <strong>Google AdSense Program Policies</strong>, <strong>Google Ads Advertising Policies</strong>, the General Data Protection Regulation (<strong>GDPR</strong>), and the California Consumer Privacy Act (<strong>CCPA</strong>).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs">
            <div className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Zero password or credential sharing with third-party tools</span>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Strict Google Consent Mode v2 integration</span>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Full user opt-out control for personalized ads</span>
            </div>
          </div>
        </div>

        {/* Section 1: Google AdSense & Third-Party Advertising (Critical AdSense Mandate) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
            1. Google AdSense & DoubleClick DART Cookie Policy
          </h2>
          <div className="prose prose-invert prose-slate max-w-none text-slate-300 text-sm leading-relaxed space-y-3">
            <p>
              Google is a third-party vendor on our 9 websites. Google uses cookies, specifically the <strong>DoubleClick DART cookie</strong>, to serve ads to our site visitors based on their visit to our digital portals and other websites on the Internet.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong>Third-Party Vendors:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
              </li>
              <li>
                <strong>Google Advertising Cookies:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.
              </li>
              <li>
                <strong>User Opt-Out Choice:</strong> Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 underline hover:text-amber-300"
                >
                  Google Ads Settings
                </a>
                . Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 underline hover:text-amber-300"
                >
                  www.aboutads.info
                </a>
                .
              </li>
            </ul>
          </div>
        </section>

        {/* Non-intrusive in-article Ad Placement */}
        <AdSenseBanner format="in-article" showPreviewNotice={true} />

        {/* Section 2: Log Files & Web Analytics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            2. Log Files and Web Analytics
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Zaitoon Roots Academy follows standard procedures of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information for educational program planning.
          </p>
        </section>

        {/* Section 3: Google Ads & Conversion Tracking */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            3. Google Ads Conversion Tracking & Google Tag (gtag.js)
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Where active, our domains utilize Google Ads conversion tracking (via official Google Tag scripts). This allows us to measure whether visitors interested in educational degrees, diplomas, or scholarships complete admission inquiry submissions or WhatsApp counseling requests.
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Shield className="w-4 h-4" />
              <span>IP Anonymization & Privacy Safeguards</span>
            </div>
            <p>
              Google Tag tracking is configured with strict IP anonymization (<code className="text-amber-400">anonymize_ip: true</code>). We do NOT transmit personally identifiable student records, grades, CNIC numbers, or payment data to Google Ads.
            </p>
          </div>
        </section>

        {/* Section 4: Children's Online Privacy Protection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            4. Children's Privacy (COPPA)
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Zaitoon Roots Academy does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </section>

        {/* Section 5: GDPR & CCPA Data Rights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            5. GDPR & CCPA Data Protection Rights
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            We want to ensure you are fully aware of all your data protection rights. Every user is entitled to the following:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
              <strong className="text-amber-400 block mb-1">The Right to Access:</strong>
              You have the right to request copies of your personal inquiry records and admissions data.
            </div>
            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
              <strong className="text-amber-400 block mb-1">The Right to Rectification:</strong>
              You have the right to request correction of any information you believe is inaccurate or incomplete.
            </div>
            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
              <strong className="text-amber-400 block mb-1">The Right to Erasure:</strong>
              You have the right to request that we erase your personal data under certain lawful conditions.
            </div>
            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
              <strong className="text-amber-400 block mb-1">The Right to Object / Opt-Out:</strong>
              You have the right to object to our processing of your personal data or personalized advertising.
            </div>
          </div>
        </section>

        {/* Section 6: Contact Information */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Have Privacy or Compliance Questions?</h3>
            <p className="text-xs text-slate-400 mt-1">
              Contact our Data Protection Officer & Academic Registry Desk:
            </p>
            <p className="text-xs text-slate-300 mt-2 font-mono">
              Email: privacy@zaitoonroots.edu | Helpline: +92-344-7956085
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shrink-0"
          >
            <span>Contact Helpdesk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
