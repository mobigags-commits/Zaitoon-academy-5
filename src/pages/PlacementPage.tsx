import React, { useState } from 'react';
import { PageId } from '../types';
import { Briefcase, Building2, TrendingUp, Users, CheckCircle2, ArrowRight, Upload, Sparkles } from 'lucide-react';

interface PlacementPageProps {
  onNavigate: (page: PageId) => void;
}

export const PlacementPage: React.FC<PlacementPageProps> = ({ onNavigate }) => {
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const partners = [
    { name: 'Google Cloud', logo: '🌐', roles: 'Cloud & AI Scientists', hires: '42+ Hired' },
    { name: 'Microsoft', logo: '💻', roles: 'Software Engineers & SREs', hires: '38+ Hired' },
    { name: 'Saudi Aramco', logo: '⚡', roles: 'Petroleum & Mech Engineers', hires: '29+ Hired' },
    { name: 'Emirates NBD', logo: '🏦', roles: 'Fintech & Risk Analysts', hires: '35+ Hired' },
    { name: 'NHS UK', logo: '🏥', roles: 'Doctors, Nurses & DPTs', hires: '64+ Hired' },
    { name: 'Amazon AWS', logo: '📦', roles: 'Solutions Architects', hires: '22+ Hired' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  Page 11: Career Placement & Corporate Liaison
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-blue-600">96.4% Graduate Employment Rate</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Career Placement & Corporate Internship Cell
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                ملازمتوں کے مواقع و انٹرن شپ سیل: Direct industry pipelines, annual job fairs, on-campus corporate recruitment with global tech giants, multinational banks, and clinical hospital networks.
              </p>
            </div>

            <button
              onClick={() => setResumeUploaded(true)}
              className="px-6 py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{resumeUploaded ? 'Resume Dropped in Cell!' : 'Drop Resume to Placement Cell'}</span>
            </button>
          </div>
        </div>

        {/* Hiring Partners Showcase */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Key Global Employer Linkages</h3>
            <span className="text-xs text-slate-500 font-semibold">180+ Enterprise Recruiters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{p.logo}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{p.name}</h4>
                      <p className="text-xs text-slate-500">{p.roles}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-bold">
                    {p.hires}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Statistics Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-2">
            <p className="text-3xl font-black text-blue-700">Rs. 1.8M - 4.5M</p>
            <p className="text-xs font-bold text-slate-800 uppercase">Average Graduate Starting Package</p>
            <p className="text-[11px] text-slate-500">For BS AI, CS, Cyber Security & Engineering</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-2">
            <p className="text-3xl font-black text-emerald-700">100% Guaranteed</p>
            <p className="text-xs font-bold text-slate-800 uppercase">Clinical Hospital Rotations</p>
            <p className="text-[11px] text-slate-500">For MBBS, DPT, Pharm-D & Nursing</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-2">
            <p className="text-3xl font-black text-purple-700">300+ Startups</p>
            <p className="text-xs font-bold text-slate-800 uppercase">Incubated at ZRA Tech Park</p>
            <p className="text-[11px] text-slate-500">Over $12M Raised in Seed Capital</p>
          </div>
        </div>
      </div>
    </div>
  );
};
