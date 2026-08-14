import React, { useState } from 'react';
import { PageId } from '../types';
import { Microscope, Globe, Award, Sparkles, BookOpen, Download, CheckCircle2, ArrowRight } from 'lucide-react';

interface ResearchPageProps {
  onNavigate: (page: PageId) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate }) => {
  const [activeDomain, setActiveDomain] = useState('All');

  const projects = [
    {
      title: 'Brain-Computer Neural Interface for Robotic Prosthetics',
      lab: 'ZRA Neural Engineering Lab',
      lead: 'Dr. Tariq Mahmood Zaitoon & Team',
      domain: 'AI & Neural Systems',
      grant: '$450,000 Global STEM Grant',
      summary: 'Developing ultra-low latency EEG signal processing algorithms to control multi-articulated bionic hands with tactile sensation feedback.'
    },
    {
      title: 'Nanoparticle Targeted Drug Delivery in Oncology',
      lab: 'Precision Oncology Center',
      lead: 'Dr. Mariam Farooq Qureshi',
      domain: 'Medical Sciences',
      grant: 'Rs. 25M National Health Grant',
      summary: 'Synthesizing functionalized gold-liposome carriers for site-specific delivery of chemotherapeutic agents with zero renal cytotoxicity.'
    },
    {
      title: 'Quantum-Resistant Lattice Cryptography for Financial Ledgers',
      lab: 'Cyber Warfare & Quantum Lab',
      lead: 'Prof. Engr. Salman Rafiq Khan',
      domain: 'Cyber & Quantum',
      grant: '$300,000 Fintech Security Grant',
      summary: 'Standardizing post-quantum signature schemes for high-throughput banking settlements and state document archival.'
    },
    {
      title: 'Green Hydrogen Catalyst Synthesis & Micro-Grid Storage',
      lab: 'Renewable Energy & Solar Bay',
      lead: 'Dr. Haris Arshad & Fellows',
      domain: 'Renewable Energy',
      grant: 'Rs. 18M CleanTech Grant',
      summary: 'Fabricating non-precious nickel-iron electrocatalysts for alkaline water splitting with 84% energy conversion efficiency.'
    }
  ];

  const filteredProjects = projects.filter(
    p => activeDomain === 'All' || p.domain === activeDomain
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
                  Page 13: Research, Patents & Innovations
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-indigo-600">85+ International Patents Filed</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Advanced Research Labs & Patent Innovation Wing
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                تحقیق و انوویشن سیل: High-impact interdisciplinary scientific laboratories funded by international research grants, HEC NRPU, and multinational tech consortiums.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Submit Research Collaboration RFP</span>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
            {['All', 'AI & Neural Systems', 'Medical Sciences', 'Cyber & Quantum', 'Renewable Energy'].map((dom) => (
              <button
                key={dom}
                onClick={() => setActiveDomain(dom)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeDomain === dom
                    ? 'bg-indigo-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>

        {/* Research Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredProjects.map((proj, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-800 text-xs font-bold">
                    {proj.domain}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                    {proj.grant}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {proj.summary}
                </p>

                <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 space-y-1">
                  <p><strong>Lead Investigator:</strong> {proj.lead}</p>
                  <p><strong>Primary Lab:</strong> {proj.lab}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Peer-Reviewed Journal Publication Available</span>
                <button
                  onClick={() => onNavigate('library')}
                  className="text-xs font-bold text-indigo-700 hover:underline flex items-center gap-1"
                >
                  <span>Read Paper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
