import React, { useState } from 'react';
import { PageId } from '../types';
import {
  AlertTriangle,
  Home,
  GraduationCap,
  Award,
  BookOpen,
  FileCheck2,
  CreditCard,
  PhoneCall,
  Search,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Sparkles
} from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: PageId) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');

  const popularPortals: Array<{ id: PageId; title: string; path: string; icon: React.ReactNode; desc: string }> = [
    {
      id: 'home',
      title: 'Academy Homepage',
      path: '/',
      icon: <Home className="w-5 h-5 text-red-600" />,
      desc: 'Admissions 2026-27, key highlights, and institutional overview'
    },
    {
      id: 'admissions',
      title: 'Online Admissions 2026-27',
      path: '/admissions',
      icon: <FileCheck2 className="w-5 h-5 text-emerald-600" />,
      desc: 'Digital 4-step application with instant merit scholarship calculator'
    },
    {
      id: 'degrees',
      title: "All The World's Degrees",
      path: '/degrees',
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      desc: '120+ accredited BS, MS, MPhil, and PhD degree programs'
    },
    {
      id: 'diplomas',
      title: "All The World's Diplomas",
      path: '/diplomas',
      icon: <Award className="w-5 h-5 text-amber-600" />,
      desc: '80+ 1-2 year technical and industry-certified diploma certifications'
    },
    {
      id: 'lms-portal',
      title: 'Student LMS Portal',
      path: '/lms-portal',
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
      desc: 'Lectures, academic calendar, timetable, and interactive CGPA calculator'
    },
    {
      id: 'payment-portal',
      title: 'Global Payment Portal',
      path: '/payment-portal',
      icon: <CreditCard className="w-5 h-5 text-teal-600" />,
      desc: 'Pay fee online via JazzCash, EasyPaisa, Raast, Cards, or PayPal'
    },
    {
      id: 'verification',
      title: 'Degree Verification Desk',
      path: '/verification',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      desc: '24/7 cryptographic QR roll number credential verification'
    },
    {
      id: 'contact',
      title: 'Contact & Campuses',
      path: '/contact',
      icon: <PhoneCall className="w-5 h-5 text-rose-600" />,
      desc: 'Campuses in Islamabad, Lahore, Karachi, Dubai & 24/7 Helpline'
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onNavigate('degrees');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans text-slate-900" id="not-found-page-container">
      <div className="max-w-4xl mx-auto text-center">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-widest mb-6 border border-red-200 shadow-sm">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span>HTTP 404 - Academic Route Not Found</span>
        </div>

        {/* Hero Code & Heading */}
        <div className="relative mb-6">
          <div className="text-8xl sm:text-9xl font-black text-red-950/10 select-none tracking-tighter">
            404
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight" id="not-found-heading">
              Page Not Found
            </h1>
            <p className="text-sm sm:text-base font-semibold text-red-700 mt-1">
              مطلوبہ صفحہ دستیاب نہیں ہے
            </p>
          </div>
        </div>

        {/* Descriptive Guidance (Prevents Soft 404) */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          The requested page or URL could not be located on the Zaitoon Roots Academy academic portal.
          The link may be outdated, mistyped, or relocated. Please use the directory below or return to the main admissions desk.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-red-800 hover:bg-red-900 text-white shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            id="not-found-home-btn"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </a>

          <a
            href="/admissions"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('admissions');
            }}
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all flex items-center gap-2 cursor-pointer"
            id="not-found-admissions-btn"
          >
            <Sparkles className="w-4 h-4" />
            <span>Apply Online (Admissions 2026-27)</span>
          </a>

          <a
            href="https://wa.me/923447956085?text=Assalam-o-Alaikum%2C%20I%20encountered%20a%20missing%20page%20on%20the%20ZRA%20Portal"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all flex items-center gap-2"
            id="not-found-whatsapp-btn"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Helpline WhatsApp: 0344-7956085</span>
          </a>
        </div>

        {/* Quick Search */}
        <div className="max-w-xl mx-auto mb-14">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search degrees, diplomas, admissions, fee structure..."
              className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white border border-slate-300 shadow-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-800 text-white text-xs font-bold transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Popular Valid Academic Portals Directory */}
        <div className="text-left bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Explore Valid Academic Portals</h2>
              <p className="text-xs text-slate-500">Select any official section below to continue your navigation</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
              27 Active Portals
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularPortals.map((portal) => (
              <a
                key={portal.id}
                href={portal.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(portal.id);
                }}
                className="p-4 rounded-2xl border border-slate-100 hover:border-red-200 bg-slate-50/50 hover:bg-red-50/30 transition-all flex items-start gap-3.5 group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-white shadow-xs group-hover:scale-110 transition-transform">
                  {portal.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-700 transition-colors truncate">
                      {portal.title}
                    </h3>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {portal.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
