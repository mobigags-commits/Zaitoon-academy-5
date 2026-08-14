import React, { useState } from 'react';
import { PageId } from '../types';
import { PAGES_MANIFEST } from '../data/academyData';
import {
  GraduationCap,
  Award,
  BookOpen,
  PhoneCall,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  Layers,
  Globe2,
  CalendarDays,
  FileText
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [academicsDropdownOpen, setAcademicsDropdownOpen] = useState(false);

  const isHome = currentPage === 'home';

  const handlePageSelect = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    setPagesDropdownOpen(false);
    setAcademicsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 font-sans shadow-md">
      {/* Top Notification & Announcements Bar */}
      <div className="bg-[#1e293b] text-slate-200 text-xs py-2 px-4 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600/90 text-white font-semibold text-[11px] animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              ADMISSIONS OPEN 2026-27
            </span>
            <span className="hidden sm:inline text-slate-300 font-medium truncate max-w-md">
              داخلے جاری ہیں | 100% Merit & Need-Based Scholarships Available Across All The World's Degrees & Diplomas
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium ml-auto">
            <button
              onClick={() => handlePageSelect('verification')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verify Credential</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handlePageSelect('lms-portal')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
              <span>Student LMS</span>
            </button>
            <span className="text-slate-600 hidden md:inline">|</span>
            <button
              onClick={() => handlePageSelect('distance-learning')}
              className="hidden md:flex items-center gap-1 text-slate-300 hover:text-amber-400 cursor-pointer"
            >
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Global Online Campus</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`${
          isHome
            ? 'bg-[#7a0614] text-white border-b border-red-900/60 shadow-xl'
            : 'bg-white text-slate-800 border-b border-slate-200 shadow-sm'
        } transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handlePageSelect('home')}
            className="flex items-center gap-3.5 text-left group cursor-pointer"
            id="brand-logo-btn"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${
                isHome
                  ? 'bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-red-950 font-black'
                  : 'bg-gradient-to-tr from-red-700 to-red-600 text-white font-black'
              }`}
            >
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-xl sm:text-2xl leading-none">
                  ZAITOON ROOTS
                </span>
                <span
                  className={`text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded ${
                    isHome ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  Academy
                </span>
              </div>
              <p className={`text-xs mt-0.5 font-medium ${isHome ? 'text-rose-200' : 'text-slate-500'}`}>
                زیتون روٹس اکیڈمی | Premier Global Higher Education & Skills
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handlePageSelect('home')}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                currentPage === 'home'
                  ? isHome
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'bg-red-50 text-red-700 font-bold'
                  : isHome
                  ? 'text-rose-100 hover:bg-white/10 hover:text-white'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Home
            </button>

            {/* Academics Dropdown (Degrees & Diplomas) */}
            <div className="relative">
              <button
                onClick={() => setAcademicsDropdownOpen(!academicsDropdownOpen)}
                onMouseEnter={() => setAcademicsDropdownOpen(true)}
                className={`px-3 py-2 rounded-lg font-semibold text-sm flex items-center gap-1 transition-all ${
                  currentPage === 'degrees' || currentPage === 'diplomas' || currentPage === 'career-counselor'
                    ? isHome
                      ? 'bg-white/20 text-white font-bold'
                      : 'bg-red-50 text-red-700 font-bold'
                    : isHome
                    ? 'text-rose-100 hover:bg-white/10'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>World Programs</span>
                <ChevronDown className="w-4 h-4 opacity-80" />
              </button>

              {academicsDropdownOpen && (
                <div
                  onMouseLeave={() => setAcademicsDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-80 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/70">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">All The World's Programs</p>
                  </div>
                  <button
                    onClick={() => handlePageSelect('degrees')}
                    className="w-full text-left px-4 py-3 hover:bg-red-50/80 flex items-start gap-3 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-red-700">All The World's Degrees</p>
                      <p className="text-xs text-slate-500">BS, MS, MPhil, PhD, MBBS, Engineering & Law</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handlePageSelect('diplomas')}
                    className="w-full text-left px-4 py-3 hover:bg-red-50/80 flex items-start gap-3 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-800 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-amber-700">All The World's Diplomas</p>
                      <p className="text-xs text-slate-500">AI, Cyber, Full-Stack, EV, ACCA, MLT & Media</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handlePageSelect('career-counselor')}
                    className="w-full text-left px-4 py-3 hover:bg-red-50/80 flex items-start gap-3 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-purple-700">AI Career Path Matcher</p>
                      <p className="text-xs text-slate-500">Smart aptitude test to find your ideal program</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handlePageSelect('admissions')}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                currentPage === 'admissions'
                  ? isHome
                    ? 'bg-white/20 text-white font-bold'
                    : 'bg-red-50 text-red-700 font-bold'
                  : isHome
                  ? 'text-rose-100 hover:bg-white/10'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Admissions
            </button>

            <button
              onClick={() => handlePageSelect('fee-scholarship')}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                currentPage === 'fee-scholarship'
                  ? isHome
                    ? 'bg-white/20 text-white font-bold'
                    : 'bg-red-50 text-red-700 font-bold'
                  : isHome
                  ? 'text-rose-100 hover:bg-white/10'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Fee & Scholarships
            </button>

            <button
              onClick={() => handlePageSelect('faculty')}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                currentPage === 'faculty'
                  ? isHome
                    ? 'bg-white/20 text-white font-bold'
                    : 'bg-red-50 text-red-700 font-bold'
                  : isHome
                  ? 'text-rose-100 hover:bg-white/10'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Faculty
            </button>

            {/* All 20 Pages Mega Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                className={`px-3 py-2 rounded-lg font-semibold text-sm flex items-center gap-1.5 transition-all ${
                  pagesDropdownOpen
                    ? isHome
                      ? 'bg-white/25 text-white'
                      : 'bg-slate-100 text-slate-900'
                    : isHome
                    ? 'bg-white/10 text-amber-200 border border-amber-400/40 hover:bg-white/20'
                    : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                }`}
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>All 20 Pages</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {pagesDropdownOpen && (
                <div
                  onMouseLeave={() => setPagesDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-[720px] max-h-[80vh] overflow-y-auto bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-5 z-50 grid grid-cols-2 gap-3 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="col-span-2 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Zaitoon Roots Academy — All 20 Institutional Pages</h4>
                      <p className="text-xs text-slate-500">مکمل 20 صفحات ڈائرکٹری اور فوری نیویگیشن</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-red-100 text-red-700 rounded-full">
                      20 Comprehensive Portals
                    </span>
                  </div>

                  {PAGES_MANIFEST.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => handlePageSelect(page.id)}
                      className={`text-left p-2.5 rounded-xl flex items-start gap-3 transition-all border ${
                        currentPage === page.id
                          ? 'bg-red-50 border-red-300 text-red-800 font-semibold'
                          : 'bg-slate-50/50 border-slate-100 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {page.pageNumber}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{page.title}</p>
                        <p className="text-[10px] text-slate-500 truncate">{page.urduTitle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Apply Now Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                isHome
                  ? 'bg-white/10 hover:bg-white/20 text-rose-100 hover:text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Search Degrees & Diplomas"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => handlePageSelect('admissions')}
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer ${
                isHome
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400'
                  : 'bg-gradient-to-r from-red-700 to-red-600 text-white hover:from-red-800 hover:to-red-700'
              }`}
              id="header-apply-btn"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply Online</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-colors ${
                isHome ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-800'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white border-b border-slate-800 px-4 py-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <span className="text-sm font-bold text-slate-300">Zaitoon Roots Academy Menu</span>
            <span className="text-xs px-2 py-0.5 bg-red-600 rounded text-white font-medium">20 Pages</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PAGES_MANIFEST.map((page) => (
              <button
                key={page.id}
                onClick={() => handlePageSelect(page.id)}
                className={`text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors ${
                  currentPage === page.id
                    ? 'bg-red-700 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="w-6 h-6 rounded bg-slate-700 text-[11px] font-bold flex items-center justify-center">
                  {page.pageNumber}
                </span>
                <div>
                  <p className="text-xs font-semibold">{page.title}</p>
                  <p className="text-[10px] text-slate-400">{page.urduTitle}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => handlePageSelect('admissions')}
              className="w-full py-3 rounded-xl font-bold text-center bg-amber-400 text-slate-950 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply Online for Admissions 2026-27</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
