import React from 'react';
import { PageId } from '../types';
import { ShieldCheck, Award, Globe, Building2, CheckCircle2, FileCheck } from 'lucide-react';

interface AffiliationsPageProps {
  onNavigate: (page: PageId) => void;
}

export const AffiliationsPage: React.FC<AffiliationsPageProps> = ({ onNavigate }) => {
  const councils = [
    { name: 'Higher Education Commission (HEC)', status: 'W4 Category / Top Ranking', detail: 'Chartered & recognized by HEC Pakistan with highest accreditation grade.' },
    { name: 'Pakistan Engineering Council (PEC)', status: 'Level-II Washington Accord Tier', detail: 'International recognition for all Electrical, Mechanical, and Software engineering degrees.' },
    { name: 'Pakistan Medical & Dental Council (PMDC)', status: 'Registered Clinical Center', detail: 'Accreditation for MBBS, BDS, and clinical rotations in attached teaching hospitals.' },
    { name: 'Pharmacy Council of Pakistan (PCP)', status: 'Tier 1 Recognition', detail: 'Pharm-D 5-year degree compliant with global pharmacy practice standards.' },
    { name: 'National Computing Education Accreditation Council (NCEAC)', status: 'W-Category Accredited', detail: 'Top-tier accreditation for BS Computer Science, AI, and Software Engineering.' },
    { name: 'Pakistan Bar Council (PBC)', status: 'Recognized Faculty of Law', detail: 'Accredited for LL.B 5-Year Bar Council Law Program.' }
  ];

  const internationalPartners = [
    { uni: 'University of Oxford (UK)', collab: 'Biomedical & AI Dual Research Exchange' },
    { uni: 'Massachusetts Institute of Technology (USA)', collab: 'Deep Neural Computing & Quantum Lab Linkage' },
    { uni: 'National University of Singapore (NUS)', collab: 'Fintech, Supply Chain & Logistics Fellowship' },
    { uni: 'Technical University of Munich (TUM Germany)', collab: 'Renewable Clean Energy & EV Powertrains' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Page 16: International Accreditations & Statutory Recognitions
              </span>
              <span className="text-xs font-bold text-slate-400">|</span>
              <span className="text-xs font-semibold text-emerald-600">Global Washington Accord Tier</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Accreditations, Charters & International Linkages
            </h1>
            <p className="text-slate-600 text-sm max-w-3xl">
              تسلیم شدہ الحاق و بین الاقوامی معاہدے: ZRA degrees and diplomas enjoy statutory recognition by federal regulatory bodies, professional councils, and foreign university articulation agreements.
            </p>
          </div>
        </div>

        {/* National Regulatory Councils */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Statutory Councils & Regulatory Accreditations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {councils.map((c, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                    {c.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">{c.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* International Articulations */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Global University Articulations & Dual Degree Paths</h3>
              <p className="text-xs text-slate-500 mt-1">Study 2 years at ZRA + 2 years abroad with seamless credit transfers</p>
            </div>
            <Globe className="w-6 h-6 text-blue-600" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {internationalPartners.map((ip, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{ip.uni}</h4>
                  <p className="text-xs text-slate-500">{ip.collab}</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-800 text-[11px] font-bold shrink-0">
                  Credit Transfer Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
