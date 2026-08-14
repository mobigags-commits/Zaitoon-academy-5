import React, { useState } from 'react';
import { PageId } from '../types';
import { ALUMNI_STORIES } from '../data/academyData';
import { Award, Globe, Building, ArrowRight, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';

interface AlumniPageProps {
  onNavigate: (page: PageId) => void;
}

export const AlumniPage: React.FC<AlumniPageProps> = ({ onNavigate }) => {
  const [joinedDirectory, setJoinedDirectory] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  Page 14: Global Alumni Network & Hall of Fame
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-slate-600">35,000+ Alumni in 48 Countries</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                ZRA Global Alumni Network & Hall of Fame
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                عالمی ایلومنائی نیٹ ورک و کامیابی کی کہانیاں: Our graduates lead Silicon Valley unicorns, NHS hospital departments, supreme court law chambers, and aerospace defense labs worldwide.
              </p>
            </div>

            <button
              onClick={() => setJoinedDirectory(true)}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>{joinedDirectory ? 'Directory Record Updated!' : 'Register as ZRA Alumnus'}</span>
            </button>
          </div>
        </div>

        {/* Hall of Fame Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ALUMNI_STORIES.map((alumnus) => (
            <div
              key={alumnus.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={alumnus.image}
                    alt={alumnus.name}
                    className="w-full h-48 rounded-2xl object-cover border border-slate-100 shadow-sm"
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-amber-300 text-[11px] font-bold">
                    Batch: {alumnus.batch}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base">{alumnus.name}</h3>
                  <p className="text-xs font-bold text-amber-700">{alumnus.currentRole}</p>
                  <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>{alumnus.company} ({alumnus.country})</span>
                  </p>
                </div>

                <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                  &ldquo;{alumnus.testimonial}&rdquo;
                </p>

                <div className="text-[11px] text-slate-500">
                  <span className="font-bold text-slate-700 block">Degree Conferred:</span>
                  <span>{alumnus.degree}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">ZRA Mentorship Mentor</span>
                <span className="text-amber-800 font-bold">Connected</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
