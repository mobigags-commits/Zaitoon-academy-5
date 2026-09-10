import React from 'react';
import { PageId } from '../types';
import { PAGES_MANIFEST, CAMPUS_LOCATIONS } from '../data/academyData';
import { ZaitoonLogo } from './ZaitoonLogo';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Award,
  Globe,
  ArrowUpRight,
  Heart,
  MessageCircle,
  CreditCard,
  Lock
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f172a] text-slate-300 font-sans border-t border-slate-800">
      {/* Accreditation & Quality Trust Banner */}
      <div className="bg-[#0b1120] border-b border-slate-800/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Officially Recognized & Accredited</p>
              <p className="text-xs text-slate-400">HEC Recognized Standards • WES Verified Equivalency • ISO 9001:2015 Certified</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200">PEC Aligned</span>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200">PNC & PCP Recognized</span>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200">Pakistan Bar Council</span>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200">UK / Canada Credit Transfer</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Motto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <ZaitoonLogo variant="horizontal" size="md" isDark={true} showUrdu={true} showMotto={true} />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Zaitoon Roots Academy is a premier international higher education and professional training institution offering complete All The World's Degrees, cutting-edge technology diplomas, executive certifications, and distance learning programs worldwide.
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Main Campus: Zaitoon Academic Boulevard, Sector H-12, Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>UAN Helpline: +92 51 8892000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-emerald-400">Owner WhatsApp:</span>
                  <a
                    href="https://wa.me/923447956085?text=Assalam-o-Alaikum%2C%20I%20want%20information%20regarding%20Zaitoon%20Roots%20Academy%20Admissions%20and%20Programs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-white hover:text-emerald-300 underline underline-offset-2 flex items-center gap-1"
                  >
                    <span>0344-7956085</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-600/80 text-white font-sans no-underline font-bold">Chat Now</span>
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Admissions: admissions@zaitoonroots.edu | Info: info@zaitoonroots.edu</span>
              </div>
            </div>
          </div>

          {/* Academic Portals Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              World Academics
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('degrees')} className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>All The World's Degrees</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('diplomas')} className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>All The World's Diplomas</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('distance-learning')} className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Global Distance Campus</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('career-counselor')} className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>AI Career Path Matcher</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faculty')} className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>PhD Faculty & Research</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('calendar')} className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Academic Calendar & Exams</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Admissions & Student Hub */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              Student Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('admissions')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Online Admission Desk</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('fee-scholarship')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Fee & Scholarships 2026-27</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('payment-portal')} className="text-amber-400 font-bold hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Global Payment Portal (فیس ادائیگی)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('lms-portal')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Student LMS & Grades Portal</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('verification')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Online Degree Verification</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('library')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Digital E-Library Vault</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('placement')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Corporate Placement Cell</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Directory */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              Institution
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('research')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Research & Innovations Wing</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('campus-tour')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Campus Tour & Facilities</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('hostel-life')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Hostels & Campus Residencies</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('accreditations')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>International Accreditations</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('student-life')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Clubs, Societies & Sports</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('downloads')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Prospectus & Downloads Hub</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('news-events')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>News & Convocation Gallery</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('alumni')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Alumni Global Hall of Fame</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>About ZRA & Leadership</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Contact Campuses & Helpdesk</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Payment Methods Showcase Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 bg-slate-950/60 rounded-3xl p-6 border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                INSTITUTIONAL TREASURY & GLOBAL FINANCIAL CLEARANCE
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>All The World's Payment Gateways Accepted (تمام عالمی ادائیگی کے طریقے)</span>
              </h4>
            </div>
            <button
              onClick={() => handleNav('payment-portal')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 self-start lg:self-auto shadow-md transition-colors"
            >
              <span>Launch Global Payment Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-rose-400">
              JazzCash
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
              EasyPaisa
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400">
              Raast (SBP)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400">
              Visa & Mastercard
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-blue-400">
              1Bill (30+ Banks)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-red-400">
              Meezan & HBL Challan
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400">
              PayPal
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
              Apple & Google Pay
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400">
              Middle East Mada / STC
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-blue-300">
              SWIFT Wire
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-yellow-500">
              Western Union
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300">
              Wise & Payoneer
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-orange-400">
              Crypto (USDT / BTC)
            </span>
          </div>
        </div>

        {/* 24 Pages Quick Bottom Bar & Legal */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Zaitoon Roots Academy (زیتون روٹس اکیڈمی). All Rights Reserved Worldwide.</p>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => handleNav('payment-portal')} className="text-amber-400 font-bold hover:underline">Pay Fee</button>
            <span>•</span>
            <button onClick={() => handleNav('privacy-policy')} className="hover:text-white">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => handleNav('terms')} className="hover:text-white">Terms of Service</button>
            <span>•</span>
            <button onClick={() => handleNav('google-ecosystem')} className="text-sky-400 hover:underline">Google Ecosystem Hub</button>
            <span>•</span>
            <button onClick={() => handleNav('verification')} className="hover:text-white">Verify Certificate</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
