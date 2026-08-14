import React, { useState, useMemo } from 'react';
import { PageId, DiplomaProgram, DiplomaCategory } from '../types';
import { ALL_DIPLOMAS } from '../data/diplomasData';
import {
  Award,
  Search,
  CheckCircle2,
  Clock,
  Briefcase,
  Zap,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Sparkles,
  Info,
  X,
  Globe2,
  Video,
  MonitorCheck,
  BookOpen
} from 'lucide-react';

interface DiplomasPageProps {
  onNavigate: (page: PageId) => void;
}

export const DiplomasPage: React.FC<DiplomasPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [activeDiplomaModal, setActiveDiplomaModal] = useState<DiplomaProgram | null>(null);

  const categories = [
    'All',
    'Information Technology & AI',
    'Business & Finance',
    'Healthcare & Paramedical',
    'Engineering & Industrial',
    'Creative Arts & Media',
    'Languages & Linguistics',
    'Vocational & Management'
  ];

  const levels = [
    'All',
    'Professional Diploma',
    'Executive Certification',
    'Advanced Diploma',
    'Fast-Track Certificate'
  ];

  const modes = [
    'All',
    '100% Online Live Classes (Worldwide)',
    'On-Campus Hands-on Lab',
    'Hybrid Blended Weekend'
  ];

  const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredDiplomas = useMemo(() => {
    return ALL_DIPLOMAS.filter((dip) => {
      const matchSearch =
        dip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dip.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dip.skillsGained.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        dip.careerRoles.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCat = selectedCategory === 'All' || dip.category === selectedCategory;
      const matchLvl = selectedLevel === 'All' || dip.level === selectedLevel;
      const matchLetter = selectedLetter === 'All' || dip.alphabetLetter === selectedLetter;
      const matchMode =
        selectedMode === 'All' ||
        (selectedMode === '100% Online Live Classes (Worldwide)' && dip.onlineAvailable) ||
        (selectedMode === 'On-Campus Hands-on Lab' && dip.classDeliveryModes?.includes('On-Campus Regular')) ||
        (selectedMode === 'Hybrid Blended Weekend' && dip.classDeliveryModes?.includes('Hybrid Blended'));

      return matchSearch && matchCat && matchLvl && matchLetter && matchMode;
    });
  }, [searchQuery, selectedCategory, selectedLevel, selectedLetter, selectedMode]);

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  Page 3: All The World's Professional Diplomas & Certifications
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ✓ 100% Online Live Classes & Recorded Lectures
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                All The World's Professional Diplomas & Certifications
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                اکیڈمی میں تمام عالمی پروفیشنل ڈپلوماز (All The World's Diplomas): High-impact vocational, executive, and technological diplomas in AI Prompt Engineering, Cyber Security, Cloud DevOps, Electric Vehicles, Nursing, ACCA & Digital Media. <strong className="text-amber-900 font-bold">تمام ڈپلوماز کی کلاسز دنیا بھر میں آن لائن دستیاب ہیں۔</strong>
              </p>
            </div>

            <button
              onClick={() => onNavigate('admissions')}
              className="shrink-0 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Direct Diploma Enrollment</span>
            </button>
          </div>

          {/* Filters & Search */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search diploma, skills (e.g. AI Prompting, SOC, EV, SEO, MLT)..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="md:col-span-3">
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="w-full py-3 px-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-amber-950 text-sm focus:outline-none focus:border-amber-600 font-bold"
                >
                  {modes.map((m) => (
                    <option key={m} value={m}>
                      {m === 'All' ? '🌐 All Class Delivery Modes' : m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-amber-600 font-medium"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c === 'All' ? 'All Skills Categories' : c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-amber-600 font-medium"
                >
                  {levels.map((l) => (
                    <option key={l} value={l}>
                      {l === 'All' ? 'All Formats' : l}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Alphabet quick bar */}
            <div className="pt-2">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">A-Z Index:</span>
                  <span className="text-[11px] text-slate-400">Filter diplomas alphabetically</span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <Video className="w-3 h-3" />
                  <span>Interactive Live Classes + LMS 24/7 Portal Access</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {alphabet.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(letter)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                      selectedLetter === letter
                        ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
                        : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Diplomas Grid */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-600">
            Showing <span className="text-amber-800 font-extrabold">{filteredDiplomas.length}</span> Professional Diplomas
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedLevel('All');
              setSelectedLetter('All');
              setSelectedMode('All');
            }}
            className="text-xs font-bold text-amber-700 hover:text-amber-900 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredDiplomas.map((dip) => (
            <div
              key={dip.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900">
                    {dip.duration}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{dip.code}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug hover:text-amber-700 transition-colors">
                  {dip.title}
                </h3>

                <p className="text-xs text-amber-800 font-semibold mb-2">{dip.category}</p>

                {/* Online Badge */}
                <div className="mb-3 p-2 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-2 text-[11px] font-bold text-emerald-800">
                  <Globe2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Online Live Interactive Classes Available</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {dip.description}
                </p>

                {/* Skills tags */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Practical Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dip.skillsGained.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Diploma Fee</span>
                  <span className="text-sm font-bold text-amber-900">{dip.totalFee}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveDiplomaModal(dip)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    title="View Full Syllabus & Online Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('admissions')}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Diploma Details */}
        {activeDiplomaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold">
                    {activeDiplomaModal.code} • {activeDiplomaModal.level}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    {activeDiplomaModal.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Category: {activeDiplomaModal.category}
                  </p>
                </div>

                <button
                  onClick={() => setActiveDiplomaModal(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Online Class Details Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <MonitorCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Online Live Class & Virtual Lab Access</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Join live instructor-led weekend or evening batches from anywhere in the world. Includes 24/7 cloud lab environments, real client projects, downloadable source files, and physical diploma couriered to your doorstep.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-semibold text-emerald-900">
                  <span className="px-2 py-0.5 bg-white/80 rounded-md border border-emerald-200">✓ Live Instructor Support</span>
                  <span className="px-2 py-0.5 bg-white/80 rounded-md border border-emerald-200">✓ Cloud Sandbox Environments</span>
                  <span className="px-2 py-0.5 bg-white/80 rounded-md border border-emerald-200">✓ International Verifiable Diploma</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
                  <span className="text-xs font-bold text-slate-800">{activeDiplomaModal.duration}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Accreditation</span>
                  <span className="text-[11px] font-bold text-slate-800">{activeDiplomaModal.certificationBody}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Fee</span>
                  <span className="text-xs font-bold text-amber-900">{activeDiplomaModal.totalFee}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Class Mode</span>
                  <span className="text-xs font-bold text-emerald-700">Online & Campus</span>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-4 text-xs text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Course Description</h4>
                  <p className="leading-relaxed">{activeDiplomaModal.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Minimum Eligibility</h4>
                  <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-medium text-slate-700">
                    {activeDiplomaModal.eligibility}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Practical Skills & Tool Stack</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeDiplomaModal.skillsGained.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Target Career Roles</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDiplomaModal.careerRoles.map((role, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 font-semibold border border-amber-100 text-[11px]"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setActiveDiplomaModal(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setActiveDiplomaModal(null);
                      onNavigate('admissions');
                    }}
                    className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Enroll (Online or On-Campus)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
