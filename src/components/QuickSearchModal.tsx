import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import { ALL_DEGREES } from '../data/degreesData';
import { ALL_DIPLOMAS } from '../data/diplomasData';
import { PAGES_MANIFEST, FACULTY_MEMBERS } from '../data/academyData';
import { Search, X, GraduationCap, Award, Layers, Users, ArrowRight } from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, targetId?: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return { pages: [], degrees: [], diplomas: [], faculty: [] };
    const q = query.toLowerCase();

    const matchedPages = PAGES_MANIFEST.filter(
      p => p.title.toLowerCase().includes(q) || p.urduTitle.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedDegrees = ALL_DEGREES.filter(
      d => d.title.toLowerCase().includes(q) || d.faculty.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
    ).slice(0, 6);

    const matchedDiplomas = ALL_DIPLOMAS.filter(
      dp => dp.title.toLowerCase().includes(q) || dp.category.toLowerCase().includes(q) || dp.skillsGained.some(s => s.toLowerCase().includes(q))
    ).slice(0, 6);

    const matchedFaculty = FACULTY_MEMBERS.filter(
      f => f.name.toLowerCase().includes(q) || f.department.toLowerCase().includes(q) || f.specialization.toLowerCase().includes(q)
    ).slice(0, 3);

    return { pages: matchedPages, degrees: matchedDegrees, diplomas: matchedDiplomas, faculty: matchedFaculty };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-6 h-6 text-red-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all the world's degrees (AI, CS, MBBS, BBA), diplomas, pages..."
            className="w-full text-base sm:text-lg bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 rounded-lg bg-slate-200 hover:bg-slate-300"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-6">
          {!query.trim() ? (
            <div className="py-6 text-center text-slate-500 space-y-3">
              <p className="text-sm font-medium">Type any keyword to search across the entire academy catalog:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Artificial Intelligence', 'Cyber Security', 'MBBS', 'Cloud DevOps', 'Law & LLB', 'ACCA', 'Electric Vehicle'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-700 border border-slate-200 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Pages */}
              {results.pages.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-red-600" />
                    <span>Matched Institutional Pages ({results.pages.length})</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.pages.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onNavigate(p.id);
                          onClose();
                        }}
                        className="text-left p-2.5 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 transition-all flex items-center justify-between group"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-800 group-hover:text-red-700">{p.title}</p>
                          <p className="text-[10px] text-slate-500">{p.urduTitle}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Degrees */}
              {results.degrees.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <span>A-Z Degree Programs ({results.degrees.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {results.degrees.map((deg) => (
                      <button
                        key={deg.id}
                        onClick={() => {
                          onNavigate('degrees');
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-300 transition-all flex items-center justify-between group"
                      >
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 mr-2">
                            {deg.level}
                          </span>
                          <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                            {deg.title}
                          </span>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{deg.description}</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 shrink-0 ml-3">{deg.duration}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Diplomas */}
              {results.diplomas.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>A-Z Diplomas & Certifications ({results.diplomas.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {results.diplomas.map((dip) => (
                      <button
                        key={dip.id}
                        onClick={() => {
                          onNavigate('diplomas');
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-xl bg-amber-50/50 hover:bg-amber-50 border border-amber-100 hover:border-amber-300 transition-all flex items-center justify-between group"
                      >
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 mr-2">
                            {dip.duration}
                          </span>
                          <span className="text-xs font-bold text-slate-900 group-hover:text-amber-800">
                            {dip.title}
                          </span>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{dip.category}</p>
                        </div>
                        <span className="text-xs font-bold text-amber-700 shrink-0 ml-3">{dip.totalFee}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Faculty */}
              {results.faculty.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Faculty Members ({results.faculty.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {results.faculty.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          onNavigate('faculty');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all flex items-center gap-3 group"
                      >
                        <img
                          src={f.image}
                          alt={`${f.name} - ${f.designation}`}
                          loading="lazy"
                          decoding="async"
                          width={36}
                          height={36}
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">{f.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{f.designation} • {f.department}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.pages.length === 0 && results.degrees.length === 0 && results.diplomas.length === 0 && results.faculty.length === 0 && (
                <div className="py-8 text-center text-slate-500">
                  <p className="text-sm font-semibold">No direct results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-slate-400 mt-1">Try searching for CS, AI, Medical, LLB, Diploma or Faculty</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
