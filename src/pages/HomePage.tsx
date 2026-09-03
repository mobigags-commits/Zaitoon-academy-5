import React, { useState } from 'react';
import { PageId } from '../types';
import { ALL_DEGREES } from '../data/degreesData';
import { ALL_DIPLOMAS } from '../data/diplomasData';
import { FACULTY_MEMBERS, NEWS_EVENTS_DATA, ALUMNI_STORIES } from '../data/academyData';
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Play,
  Globe2,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  MapPin,
  Building,
  PhoneCall,
  Search
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedFacultyTab, setSelectedFacultyTab] = useState<string>('All');
  const [quickDegreeSearch, setQuickDegreeSearch] = useState('');

  const featuredDegrees = ALL_DEGREES.slice(0, 6);
  const featuredDiplomas = ALL_DIPLOMAS.slice(0, 6);

  return (
    // Front page has rich professional academic RED (#8B0000) background
    <div className="bg-[#8B0000] text-white min-h-screen font-sans selection:bg-amber-400 selection:text-red-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-20 px-4 sm:px-6 lg:px-8 border-b border-red-900/60">
        {/* Background glow effects */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          {/* Badge & Urdu Tagline */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              Fall 2026 / Spring 2027 Admissions Open
            </span>
            <span className="text-rose-200 text-sm font-semibold">
              زیتون روٹس اکیڈمی | تمام عالمی ڈگریاں اور ڈپلوماز (All The World's Degrees & Diplomas)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Main Heading & Intro */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                Empowering Minds with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
                  All The World's Degrees
                </span>{' '}
                & Future-Ready Diplomas
              </h1>

              <p className="text-base sm:text-lg text-rose-100/90 leading-relaxed max-w-2xl font-normal">
                Welcome to <strong>Zaitoon Roots Academy</strong> — A premier international academic institution offering comprehensive undergraduate, postgraduate, doctorate degrees, and professional certifications in AI, Medicine, Engineering, Law, and Emerging Technologies.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('admissions')}
                  className="px-8 py-4 rounded-xl font-extrabold text-base bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-red-950 shadow-2xl hover:shadow-amber-500/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                  id="hero-apply-now"
                >
                  <Sparkles className="w-5 h-5 text-red-900" />
                  <span>Apply Online Now</span>
                  <ArrowRight className="w-5 h-5 text-red-900" />
                </button>

                <button
                  onClick={() => onNavigate('degrees')}
                  className="px-6 py-4 rounded-xl font-bold text-base bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
                  id="hero-explore-degrees"
                >
                  <GraduationCap className="w-5 h-5 text-amber-300" />
                  <span>Browse All World Degrees</span>
                </button>

                <button
                  onClick={() => onNavigate('diplomas')}
                  className="px-6 py-4 rounded-xl font-bold text-base bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
                  id="hero-explore-diplomas"
                >
                  <Award className="w-5 h-5 text-amber-300" />
                  <span>All World Diplomas</span>
                </button>
              </div>

              {/* Quick Key Highlights */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>HEC & WES Verified</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Merit Scholarships</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Global Online & Hybrid</span>
                </div>
              </div>
            </div>

            {/* Hero Quick Search & Program Finder Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-[#5e0410] to-[#45020a] rounded-3xl p-6 sm:p-8 border border-red-700/60 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-red-800/80 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-amber-400" />
                      <span>Quick Program Finder</span>
                    </h3>
                    <p className="text-xs text-rose-200 mt-0.5">فوری طور پر اپنا پسندیدہ کورس تلاش کریں</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-red-900/80 text-amber-300 text-xs font-bold border border-red-700">
                    200+ Programs
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-rose-200 mb-1.5">
                      Search Any Degree or Diploma
                    </label>
                    <div className="relative">
                      <Search className="w-5 h-5 text-rose-300 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={quickDegreeSearch}
                        onChange={(e) => setQuickDegreeSearch(e.target.value)}
                        placeholder="e.g. AI, MBBS, Cyber, EV, ACCA, Law..."
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/30 border border-red-700 text-white placeholder-rose-300/60 text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Program Level Pills */}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-rose-200 mb-2">
                      Popular Academic Categories
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => onNavigate('degrees')}
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span className="font-bold text-white">BS / Bachelor's</span>
                        <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => onNavigate('degrees')}
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span className="font-bold text-white">MS / MPhil & PhD</span>
                        <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => onNavigate('diplomas')}
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span className="font-bold text-white">1-Year Diplomas</span>
                        <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => onNavigate('diplomas')}
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span className="font-bold text-white">Fast-Track Certs</span>
                        <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('career-counselor')}
                      className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center gap-2 hover:opacity-95 shadow-lg cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Take AI Career Aptitude Test</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numerical Stats Ticker */}
      <section className="bg-[#5c0410] border-b border-red-900 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-black/20 border border-red-800/60">
            <p className="text-3xl sm:text-4xl font-black text-amber-300">120+</p>
            <p className="text-xs sm:text-sm font-semibold text-rose-200 mt-1">World Degrees</p>
            <p className="text-[10px] text-rose-300/80">Undergrad, Master & Doctoral</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/20 border border-red-800/60">
            <p className="text-3xl sm:text-4xl font-black text-amber-300">80+</p>
            <p className="text-xs sm:text-sm font-semibold text-rose-200 mt-1">Professional Diplomas</p>
            <p className="text-[10px] text-rose-300/80">Tech, Health, EV & Finance</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/20 border border-red-800/60">
            <p className="text-3xl sm:text-4xl font-black text-amber-300">25,000+</p>
            <p className="text-xs sm:text-sm font-semibold text-rose-200 mt-1">Alumni Worldwide</p>
            <p className="text-[10px] text-rose-300/80">Google, Microsoft, NHS, Aramco</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/20 border border-red-800/60">
            <p className="text-3xl sm:text-4xl font-black text-amber-300">100%</p>
            <p className="text-xs sm:text-sm font-semibold text-rose-200 mt-1">Accredited & Verified</p>
            <p className="text-[10px] text-rose-300/80">HEC, WES & ISO Certified</p>
          </div>
        </div>
      </section>

      {/* Featured All The World Degrees Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Complete Academic Spectrum</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              All The World's Degrees
            </h2>
            <p className="text-rose-200 text-sm mt-1">
              عالمی معیار کے تمام بی ایس، ایم ایس اور پی ایچ ڈی پروگرامز
            </p>
          </div>
          <button
            onClick={() => onNavigate('degrees')}
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>View All The World's Degrees</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDegrees.map((deg) => (
            <div
              key={deg.id}
              className="bg-gradient-to-b from-[#690514] to-[#52030f] rounded-2xl p-6 border border-red-700/80 hover:border-amber-400/80 transition-all hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {deg.level}
                  </span>
                  <span className="text-xs text-rose-200 font-semibold">{deg.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">{deg.title}</h3>
                <p className="text-xs text-rose-100/80 line-clamp-3 leading-relaxed mb-4">
                  {deg.description}
                </p>

                <div className="space-y-1.5 mb-4">
                  {deg.highlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-amber-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-red-800/80 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-rose-300 uppercase block">Semester Fee</span>
                  <span className="text-sm font-bold text-white">{deg.semesterFee}</span>
                </div>
                <button
                  onClick={() => onNavigate('admissions')}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured All The World's Diplomas & Certifications */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#610411] border-y border-red-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Industry & Skills Hub</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                All The World's Professional Diplomas & Certifications
              </h2>
              <p className="text-rose-200 text-sm mt-1">
                مستقبل کے شعبوں میں 6 ماہ تا 2 سال کے تمام عالمی پروفیشنل ڈپلوماز
              </p>
            </div>
            <button
              onClick={() => onNavigate('diplomas')}
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Explore All The World's Diplomas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDiplomas.map((dip) => (
              <div
                key={dip.id}
                className="bg-[#4a030c] rounded-2xl p-6 border border-red-700/60 hover:border-amber-400 transition-all hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-red-900 text-rose-200 border border-red-800">
                      {dip.duration}
                    </span>
                    <span className="text-[11px] font-bold text-amber-400">{dip.level}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{dip.title}</h3>
                  <p className="text-xs text-rose-200/80 mb-3">{dip.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dip.skillsGained.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/40 text-amber-200 border border-red-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-red-800/70 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-rose-300 uppercase block">Total Course Fee</span>
                    <span className="text-sm font-bold text-amber-300">{dip.totalFee}</span>
                  </div>
                  <button
                    onClick={() => onNavigate('admissions')}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors cursor-pointer"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Highlights Grid (23 Pages Quick Launcher) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Complete 23-Page Institutional Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Explore All Academic & Student Portals
          </h2>
          <p className="text-rose-200 text-sm">
            اکیڈمی کے تمام 23 خصوصی ڈیجیٹل پورٹلز، طلباء سہولیات اور آن لائن نظام
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { id: 'admissions', title: 'Online Admissions', icon: GraduationCap, desc: 'Digital Application & Challan' },
            { id: 'lms-portal', title: 'Student Portal (LMS)', icon: Layers, desc: 'Lectures, Timetable & GPA' },
            { id: 'fee-scholarship', title: 'Fee & Scholarships', icon: TrendingUp, desc: '100% Merit Financial Aid' },
            { id: 'research', title: 'Research & Patents', icon: Sparkles, desc: 'AI Labs & Innovation Grants' },
            { id: 'verification', title: 'Degree Verification', icon: ShieldCheck, desc: 'Online QR Credential Check' },
            { id: 'library', title: 'E-Library & Papers', icon: BookOpen, desc: '50,000+ Digital Books & Past Papers' },
            { id: 'hostel-life', title: 'Hostels & Residencies', icon: Building, desc: 'Boys & Girls Secure Residencies' },
            { id: 'placement', title: 'Placement & Jobs', icon: Building, desc: 'Google, MS & Global Linkages' },
            { id: 'distance-learning', title: 'Global Online Campus', icon: Globe2, desc: 'Study Worldwide 100% Online' },
            { id: 'career-counselor', title: 'AI Career Advisor', icon: Sparkles, desc: 'Interactive Aptitude Test' },
            { id: 'campus-tour', title: 'Campus Facilities', icon: Building, desc: 'STEM Labs & Hostels' },
            { id: 'faculty', title: 'Distinguished Faculty', icon: Users, desc: 'PhD Professors & Deans' },
            { id: 'calendar', title: 'Academic Calendar', icon: Calendar, desc: 'Semester Timelines & Exams' },
            { id: 'accreditations', title: 'Accreditations', icon: ShieldCheck, desc: 'HEC, WES & ISO 9001' },
            { id: 'alumni', title: 'Alumni Hall of Fame', icon: Users, desc: 'Global Graduate Stories' },
            { id: 'contact', title: 'Campuses & Helpdesk', icon: PhoneCall, desc: 'ISB, LHR, KHI, DXB' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as PageId)}
                className="p-5 rounded-2xl bg-gradient-to-b from-[#690514] to-[#4f030d] border border-red-700/70 hover:border-amber-400 text-left transition-all hover:scale-102 hover:shadow-xl group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-3 group-hover:bg-amber-400 group-hover:text-red-950 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-rose-200/80 mt-1">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Alumni Global Impact Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#52030e] border-t border-red-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Global Success</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Our Alumni Leading Global Tech & Medicine</h2>
            <p className="text-rose-200 text-xs mt-1">زیتون روٹس اکیڈمی کے کامیاب فارغ التحصیل طلباء</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ALUMNI_STORIES.map((alumni) => (
              <div key={alumni.id} className="p-6 rounded-2xl bg-[#3d020a] border border-red-800 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={alumni.image}
                    alt={`${alumni.name} - Zaitoon Roots Academy Alumnus, ${alumni.currentRole} at ${alumni.company}`}
                    loading="lazy"
                    decoding="async"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">{alumni.name}</h4>
                    <p className="text-[11px] text-amber-300">{alumni.currentRole}</p>
                    <p className="text-[10px] text-rose-300">{alumni.company} • {alumni.country}</p>
                  </div>
                </div>
                <p className="text-xs text-rose-100/90 italic leading-relaxed">
                  &ldquo;{alumni.testimonial}&rdquo;
                </p>
                <div className="pt-2 text-[10px] text-rose-400 font-medium">
                  {alumni.degree}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
