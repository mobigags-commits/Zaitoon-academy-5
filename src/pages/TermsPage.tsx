import React from 'react';
import { PageId } from '../types';
import { Scale, BookOpen, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface TermsPageProps {
  onNavigate: (page: PageId) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" />
            Official Academic & User Terms
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Terms of Service & Academic Regulations
          </h1>
          <p className="mt-2 text-base text-slate-400">
            Effective Date: <span className="text-slate-200 font-mono">September 6, 2026</span> • Universal for All 9 Official Network Websites
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            1. Agreement to Terms
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            By accessing or using the digital websites, admissions desks, degrees databases, and student portals of <strong>Zaitoon Roots Academy</strong>, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local academic laws. If you do not agree with any of these terms, you are prohibited from using or accessing these portals.
          </p>
        </div>

        {/* Section 2: Intellectual Property */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. Intellectual Property Rights & Academic Curricula</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            All materials, syllabus outlines, degree program structures, research publications, branding, graphics, and course codes published across our 9 web portals are the intellectual property of Zaitoon Roots Academy or licensed under verified academic partnership agreements. Unauthorized mirroring, commercial redistribution, or automated scraping of our course materials without prior written consent is strictly prohibited.
          </p>
        </section>

        {/* Ad Placement */}
        <AdSenseBanner format="in-article" showPreviewNotice={true} />

        {/* Section 3: Admissions & Degree Verification Accuracy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Admissions Applications & Credential Verification</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Applicants must provide accurate, verifiable, and authentic information during online enrollment and scholarship assessments. Submission of counterfeit academic credentials or impersonation will lead to immediate cancellation of admission and forfeiture of fees under institutional code of ethics. Official credential verification checks conducted via <code className="text-amber-400">verify.zaitoonroots.edu</code> generate tamper-proof audit trails.
          </p>
        </section>

        {/* Section 4: Advertising, Third-Party Links, & Google Ecosystem */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Third-Party Advertisements & Google AdSense</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Our websites may display advertisements served by Google AdSense and third-party advertising networks. We strive to maintain academic integrity and high quality across all displayed ads. However, Zaitoon Roots Academy does not endorse or assume liability for third-party products, services, or claims advertised on external advertiser destinations. User interactions with third-party advertisers are governed by the respective advertiser's privacy and service terms.
          </p>
        </section>

        {/* Section 5: Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Limitation of Liability</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            In no event shall Zaitoon Roots Academy, its trustees, academic council, or faculty be liable for any damages arising out of the use or inability to use the digital materials on its websites, scheduled maintenance downtimes, or technical interruptions.
          </p>
        </section>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <button
            onClick={() => onNavigate('privacy-policy')}
            className="text-amber-400 hover:text-amber-300 text-xs font-semibold underline flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Read Privacy & Cookie Policy</span>
          </button>
          <button
            onClick={() => onNavigate('admissions')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Go to Admissions Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
