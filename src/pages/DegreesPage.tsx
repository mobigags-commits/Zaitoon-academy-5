import React, { useState, useMemo } from 'react';
import { PageId, DegreeProgram } from '../types';
import { ALL_DEGREES } from '../data/degreesData';
import {
  GraduationCap,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  BookOpen,
  DollarSign,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Info,
  X,
  Globe2,
  Video,
  MonitorCheck,
  Laptop
} from 'lucide-react';

interface DegreesPageProps {
  onNavigate: (page: PageId) => void;
}

export const DegreesPage: React.FC<DegreesPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [activeModalDegree, setActiveModalDegree] = useState<DegreeProgram | null>(null);

  const faculties = [
    'All',
    'Computer Science & AI',
    'Medical & Health Sciences',
    'Engineering & Tech',
    'Business & Management',
    'Law & Shariah',
    'Aviation & Aerospace',
    'Natural & Applied Sciences',
    'Social Sciences & Humanities'
  ];

  const levels = ['All', 'Undergraduate', 'Postgraduate', 'Doctorate'];

  const modes = [
    'All',
    '100% Online Live Classes (Global)',
    'On-Campus Regular Classes',
    'Hybrid Blended Mode'
  ];

  const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredDegrees = useMemo(() => {
    return ALL_DEGREES.filter((deg) => {
      const matchSearch =
        deg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deg.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deg.careerProspects.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchFaculty = selectedFaculty === 'All' || deg.faculty === selectedFaculty;
      const matchLevel = selectedLevel === 'All' || deg.level === selectedLevel;
      const matchLetter = selectedLetter === 'All' || deg.alphabetLetter === selectedLetter;
      const matchMode =
        selectedMode === 'All' ||
        (selectedMode === '100% Online Live Classes (Global)' && deg.onlineAvailable) ||
        (selectedMode === 'On-Campus Regular Classes' && deg.classDeliveryModes?.includes('On-Campus Regular')) ||
        (selectedMode === 'Hybrid Blended Mode' && deg.classDeliveryModes?.includes('Hybrid Blended'));

      return matchSearch && matchFaculty && matchLevel && matchLetter && matchMode;
    });
  }, [searchQuery, selectedFaculty, selectedLevel, selectedLetter, selectedMode]);

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                  Page 2: All The World's Degrees Directory
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ✓ 100% Online Classes Available For All Degrees
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                All The World's Degrees Directory
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                اکیڈمی میں دنیاوی تمام ڈگریاں (All The World's Degrees): Explore full undergraduate (BS), postgraduate (MS/MBA), and professional doctoral degrees (MBBS, DPT, Pharm-D, PhD). <strong className="text-red-700 font-bold">تمام ڈگریز کی کلاسز آن لائن اور کیمپس دونوں آپشنز کے ساتھ دستیاب ہیں۔</strong>
              </p>
            </div>

            <button
              onClick={() => onNavigate('career-counselor')}
              className="shrink-0 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-red-700 to-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span>Academic Aptitude Advisor</span>
            </button>
          </div>

          {/* Search & Filter Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search Bar */}
              <div className="md:col-span-5 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search degree title, discipline (e.g. AI, MBBS, Civil, BBA)..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Delivery Mode Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="w-full py-3 px-3.5 rounded-xl bg-red-50/60 border border-red-200 text-red-900 text-sm focus:outline-none focus:border-red-600 font-bold"
                >
                  {modes.map((m) => (
                    <option key={m} value={m}>
                      {m === 'All' ? '🌐 All Class Delivery Modes' : m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Faculty Dropdown */}
              <div className="md:col-span-2">
                <select
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  className="w-full py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-red-600 font-medium"
                >
                  {faculties.map((fac) => (
                    <option key={fac} value={fac}>
                      {fac === 'All' ? 'All Faculties' : fac}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Dropdown */}
              <div className="md:col-span-2">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-red-600 font-medium"
                >
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl === 'All' ? 'All Levels' : lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* A to Z Alphabet Quick Filter Tabs */}
            <div className="pt-2">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">A-Z Index:</span>
                  <span className="text-[11px] text-slate-400">Filter degrees from A to Z</span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <Video className="w-3 h-3" />
                  <span>Live HD Classroom & LMS Recordings included with all degrees</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {alphabet.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(letter)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                      selectedLetter === letter
                        ? 'bg-red-700 text-white shadow-sm ring-2 ring-red-300'
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

        {/* Degrees Grid */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-600">
            Showing <span className="text-red-700 font-extrabold">{filteredDegrees.length}</span> Degree Programs
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFaculty('All');
              setSelectedLevel('All');
              setSelectedLetter('All');
              setSelectedMode('All');
            }}
            className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredDegrees.map((deg) => (
            <div
              key={deg.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-red-400 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-red-50 text-red-700 border border-red-200">
                    {deg.level}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{deg.code}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug hover:text-red-700 transition-colors">
                  {deg.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium mb-3">{deg.faculty}</p>

                {/* Online Class Assurance Badge */}
                <div className="mb-3 p-2 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-2 text-[11px] font-bold text-emerald-800">
                  <Globe2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Online Live Classes Available</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {deg.description}
                </p>

                {/* Info tags */}
                <div className="grid grid-cols-2 gap-2 text-[11px] mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-red-600" />
                    <span>{deg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>{deg.credits} Credit Hours</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Semester Fee</span>
                  <span className="text-sm font-bold text-slate-900">{deg.semesterFee}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalDegree(deg)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    title="View Full Curriculum & Online Class Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('admissions')}
                    className="px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Full Degree Overview */}
        {activeModalDegree && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="px-2.5 py-1 rounded bg-red-50 text-red-700 text-xs font-bold">
                    {activeModalDegree.code} • {activeModalDegree.level}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    {activeModalDegree.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Faculty: {activeModalDegree.faculty}
                  </p>
                </div>

                <button
                  onClick={() => setActiveModalDegree(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Online Class Details Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <MonitorCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Online Live Class & Virtual Portal Support</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  This degree can be studied <strong>100% Online</strong> via live interactive MS Teams/Zoom lectures, digital cloud labs, and recorded lecture archives. Students from any city or country can enroll with flexible morning, evening, and weekend timezones.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-semibold text-emerald-900">
                  <span className="px-2 py-0.5 bg-white/80 rounded-md border border-emerald-200">✓ Live Teacher Interaction</span>
                  <span className="px-2 py-0.5 bg-white/80 rounded-md border border-emerald-200">✓ 24/7 Recorded Replays</span>
                  <span className="px-2 py-0.5 bg-white/80 rounded-md border border-emerald-200">✓ Digital Online Exams</span>
                  <span className="px-2 py-0.5 bg-white/80 rounded-md border border-emerald-200">✓ Same Degree on Transcript</span>
                </div>
              </div>

              {/* Degree Meta Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
                  <span className="text-xs font-bold text-slate-800">{activeModalDegree.duration}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Credits</span>
                  <span className="text-xs font-bold text-slate-800">{activeModalDegree.credits} Cr. Hrs</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Semester Fee</span>
                  <span className="text-xs font-bold text-slate-800">{activeModalDegree.semesterFee}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Mode</span>
                  <span className="text-xs font-bold text-emerald-700">Online & Campus</span>
                </div>
              </div>

              {/* Description & Eligibility */}
              <div className="space-y-4 text-xs text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Program Overview</h4>
                  <p className="leading-relaxed">{activeModalDegree.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Minimum Eligibility Criteria</h4>
                  <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-medium text-slate-700">
                    {activeModalDegree.eligibility}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Key Career Roles & Industry Outcomes</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalDegree.careerProspects.map((cp, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-red-50 text-red-800 font-semibold border border-red-100 text-[11px]"
                      >
                        {cp}
                      </span>
                    ))}
                  </div>
                </div>

                {activeModalDegree.highlights && (
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-2">Key Program Highlights</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalDegree.highlights.map((hl, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalDegree(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setActiveModalDegree(null);
                      onNavigate('admissions');
                    }}
                    className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Enroll (Online or Campus)</span>
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
