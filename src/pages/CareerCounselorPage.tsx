import React, { useState } from 'react';
import { PageId } from '../types';
import { ALL_DEGREES } from '../data/degreesData';
import { ALL_DIPLOMAS } from '../data/diplomasData';
import confetti from 'canvas-confetti';
import { Sparkles, Brain, CheckCircle2, ArrowRight, Compass, Target, Award, RefreshCw, Calendar, User, Phone, MessageSquare } from 'lucide-react';
import { apiClient } from '../utils/apiClient';

interface CareerCounselorPageProps {
  onNavigate: (page: PageId) => void;
}

export const CareerCounselorPage: React.FC<CareerCounselorPageProps> = ({ onNavigate }) => {
  const [interestArea, setInterestArea] = useState<'tech' | 'medical' | 'business' | 'engineering' | 'law'>('tech');
  const [learningStyle, setLearningStyle] = useState<'4-year-degree' | 'fast-track-diploma'>('4-year-degree');
  const [budgetTier, setBudgetTier] = useState<'standard' | 'scholarship'>('scholarship');
  const [matchedResults, setMatchedResults] = useState<any[] | null>(null);

  const handleMatch = () => {
    let results: any[] = [];

    if (interestArea === 'tech') {
      if (learningStyle === '4-year-degree') {
        results = ALL_DEGREES.filter(d => d.faculty === 'Computer Science & AI').slice(0, 3);
      } else {
        results = ALL_DIPLOMAS.filter(dp => dp.category === 'Information Technology & AI').slice(0, 3);
      }
    } else if (interestArea === 'medical') {
      if (learningStyle === '4-year-degree') {
        results = ALL_DEGREES.filter(d => d.faculty === 'Medical & Health Sciences').slice(0, 3);
      } else {
        results = ALL_DIPLOMAS.filter(dp => dp.category === 'Healthcare & Paramedical').slice(0, 3);
      }
    } else if (interestArea === 'engineering') {
      if (learningStyle === '4-year-degree') {
        results = ALL_DEGREES.filter(d => d.faculty === 'Engineering & Tech' || d.faculty === 'Aviation & Aerospace').slice(0, 3);
      } else {
        results = ALL_DIPLOMAS.filter(dp => dp.category === 'Engineering & Industrial').slice(0, 3);
      }
    } else if (interestArea === 'business') {
      if (learningStyle === '4-year-degree') {
        results = ALL_DEGREES.filter(d => d.faculty === 'Business & Management').slice(0, 3);
      } else {
        results = ALL_DIPLOMAS.filter(dp => dp.category === 'Business & Finance').slice(0, 3);
      }
    } else {
      results = ALL_DEGREES.filter(d => d.faculty === 'Law & Shariah').slice(0, 3);
    }

    setMatchedResults(results);
    confetti({ particleCount: 70, spread: 50 });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
                Page 16: AI Career Path & Degree Matcher
              </span>
              <span className="text-xs font-bold text-slate-400">|</span>
              <span className="text-xs font-semibold text-red-600">Personalized Aptitude Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Interactive AI Career Counselor & Program Matcher
            </h1>
            <p className="text-slate-600 text-sm max-w-3xl">
              سمارٹ کیریئر کونسلر و رہنمائی: Discover the ideal degree or high-paying diploma based on your passion, desired job roles, budget, and learning roadmap.
            </p>
          </div>
        </div>

        {/* Aptitude Question Blocks */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 mb-12">
          {/* Question 1 */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Brain className="w-4 h-4 text-red-600" />
              <span>1. What is your primary field of interest and future ambition?</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { id: 'tech', label: '💻 AI & Computer Science' },
                { id: 'medical', label: '🩺 Healthcare & Medicine' },
                { id: 'engineering', label: '⚡ Engineering & Robotics' },
                { id: 'business', label: '📈 Fintech & Business' },
                { id: 'law', label: '⚖️ Law & Corporate Governance' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setInterestArea(item.id as any)}
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                    interestArea === item.id
                      ? 'bg-red-50 border-red-500 text-red-800 ring-2 ring-red-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-red-600" />
              <span>2. Preferred Academic Path & Time Horizon</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setLearningStyle('4-year-degree')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  learningStyle === '4-year-degree'
                    ? 'bg-red-50 border-red-500 text-red-900 ring-2 ring-red-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <h4 className="font-bold text-sm">Full 4-Year BS / 5-Year Clinical Degree</h4>
                <p className="text-xs text-slate-500 mt-0.5">Comprehensive foundational mastery, HEC degree & global master&apos;s pathways</p>
              </button>

              <button
                type="button"
                onClick={() => setLearningStyle('fast-track-diploma')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  learningStyle === 'fast-track-diploma'
                    ? 'bg-red-50 border-red-500 text-red-900 ring-2 ring-red-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <h4 className="font-bold text-sm">Fast-Track 6-Month to 2-Year Diploma</h4>
                <p className="text-xs text-slate-500 mt-0.5">High-speed practical skill building, portfolio creation & immediate job market entry</p>
              </button>
            </div>
          </div>

          {/* Match Action Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-center">
            <button
              onClick={handleMatch}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-800 hover:to-rose-800 text-white font-black text-sm flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Run AI Career Match Algorithm</span>
            </button>
          </div>
        </div>

        {/* Results Section */}
        {matchedResults && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200 mb-12">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Top Tailored Academic Recommendations for You
              </h3>
              <button
                onClick={() => setMatchedResults(null)}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Matcher</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchedResults.map((prog, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border-2 border-red-200 shadow-md space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="px-2.5 py-1 rounded bg-red-100 text-red-800 text-xs font-bold">
                      98% Fit Match • {prog.code}
                    </span>
                    <h4 className="font-bold text-slate-900 text-base">{prog.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-3">{prog.description}</p>
                  </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{prog.duration}</span>
                      <button
                        onClick={() => onNavigate('admissions')}
                        className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 1-on-1 Academic Counseling Booking Form */}
          <CounselingSessionSection />
        </div>
      </div>
    );
  };

  const CounselingSessionSection: React.FC = () => {
    const [counselingName, setCounselingName] = useState('');
    const [counselingPhone, setCounselingPhone] = useState('');
    const [currentEducation, setCurrentEducation] = useState('Intermediate (FSc/ICS)');
    const [preferredMode, setPreferredMode] = useState('Online Zoom Video Session');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBooked, setIsBooked] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await apiClient.createContact({
          name: counselingName,
          email: 'counseling.applicant@zra.edu.pk',
          phone: counselingPhone,
          subject: `1-on-1 Career Counseling Request (${preferredMode})`,
          message: `Applicant Background: ${currentEducation} • Consultation Mode: ${preferredMode}. Requesting personal academic roadmap session.`
        });
        setIsBooked(true);
      } catch (err) {
        console.error(err);
        setIsBooked(true);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="bg-gradient-to-br from-slate-900 to-red-950 text-white rounded-3xl p-6 sm:p-10 border border-red-900/40 shadow-xl space-y-6 mb-12">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            Personal Mentorship
          </span>
          <h3 className="text-2xl font-black text-white">
            Book a 1-on-1 Personalized Career Counseling Session
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Discuss your career trajectory, foreign credit transfers, merit scholarships, and future industry demands directly with our senior Academic Deans.
          </p>
        </div>

        {isBooked ? (
          <div className="p-8 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Counseling Appointment Dispatched!</h4>
            <p className="text-xs text-emerald-300 max-w-md mx-auto">
              Thank you, <strong>{counselingName}</strong>. Your session request has been queued in the Dean Office calendar. Our senior counselor will contact you via WhatsApp ({counselingPhone}) with meeting credentials.
            </p>
            <button
              onClick={() => {
                setIsBooked(false);
                setCounselingName('');
                setCounselingPhone('');
              }}
              className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold cursor-pointer"
            >
              Book Another Session
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={counselingName}
                  onChange={(e) => setCounselingName(e.target.value)}
                  placeholder="e.g. Zainab Bibi"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  value={counselingPhone}
                  onChange={(e) => setCounselingPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Current Qualification</label>
                <select
                  value={currentEducation}
                  onChange={(e) => setCurrentEducation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400 font-semibold"
                >
                  <option>Intermediate (FSc / ICS / ICom)</option>
                  <option>Matriculation / O-Levels</option>
                  <option>A-Levels / Cambridge</option>
                  <option>Bachelor’s Graduate (BS/BA/BSc)</option>
                  <option>Working Professional / Career Switcher</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Preferred Consultation Mode</label>
                <select
                  value={preferredMode}
                  onChange={(e) => setPreferredMode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400 font-semibold"
                >
                  <option>Online Zoom Video Session</option>
                  <option>Physical Meeting (Islamabad Flagship)</option>
                  <option>Physical Meeting (Lahore Campus)</option>
                  <option>Direct Phone Call from Counselor</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving Appointment to Database...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Reserve 1-on-1 Academic Counseling Session</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    );
  };
