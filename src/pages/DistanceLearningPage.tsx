import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Globe,
  Video,
  Laptop,
  Clock,
  Award,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  MonitorCheck,
  BookOpen,
  Calendar,
  Users,
  CheckCircle2,
  Headphones,
  FileCheck2
} from 'lucide-react';

interface DistanceLearningPageProps {
  onNavigate: (page: PageId) => void;
}

export const DistanceLearningPage: React.FC<DistanceLearningPageProps> = ({ onNavigate }) => {
  const [selectedTab, setSelectedTab] = useState<'features' | 'schedule' | 'labs' | 'faq'>('features');

  const perks = [
    {
      icon: Video,
      title: '100% Online Global Live Lectures',
      desc: 'Attend live bidirectional HD video classes with direct mic/chat interaction with professors, or watch recorded lecture archives 24/7.'
    },
    {
      icon: Award,
      title: 'Identical Degree & Diploma Parchment',
      desc: 'Your degree and diploma carry equal HEC/Chartered prestige with zero distinction or distance watermark, verified through global barcode registries.'
    },
    {
      icon: Users,
      title: 'Dedicated Online Academic Tutors',
      desc: 'Weekly 1-on-1 scheduled office hours, homework review sessions, and dedicated WhatsApp & LMS discussion forums for prompt guidance.'
    },
    {
      icon: Laptop,
      title: 'Cloud Virtual Sandbox Labs',
      desc: 'Browser-accessible high-performance cloud IDEs, GPU AI clusters, medical 3D anatomy suites, and enterprise financial SAP terminals.'
    }
  ];

  const onlineSlots = [
    {
      slot: 'Morning Batch',
      time: '09:00 AM – 01:00 PM PKT (GMT+5)',
      audience: 'Full-time online students & local candidates',
      badge: 'Fast Track'
    },
    {
      slot: 'Evening Executive Batch',
      time: '06:30 PM – 10:00 PM PKT (GMT+5)',
      audience: 'Working professionals, employees & career transitioners',
      badge: 'Most Popular'
    },
    {
      slot: 'Overseas Weekend Batch',
      time: 'Saturdays & Sundays (Flexible Timings for GCC, UK & Europe)',
      audience: 'International overseas Pakistanis & foreign nationals',
      badge: 'International'
    },
    {
      slot: 'Self-Paced Async Stream',
      time: '24/7 On-Demand HD Recordings + Weekly Live Q&A',
      audience: 'Students in varying global time zones',
      badge: 'Flexible'
    }
  ];

  const virtualLabs = [
    {
      name: 'AI & Data Science Jupyter GPU Cloud',
      desc: 'High-speed Nvidia A100 GPU clusters pre-configured with PyTorch, TensorFlow, and HuggingFace for real-world model training directly in browser.',
      tag: 'Computing Degrees'
    },
    {
      name: 'Cybersecurity Range & SOC Sandbox',
      desc: 'Isolated Kali Linux virtual machines and ethical hacking simulation topologies for real-time penetration testing and threat analysis.',
      tag: 'IT & Cyber Security'
    },
    {
      name: '3D Human Anatomy & Bio-Sim Virtual Lab',
      desc: 'Interactive 3D anatomical organ dissections, biochemical reaction simulations, and genetic sequencing visualization tools.',
      tag: 'Healthcare & Nursing'
    },
    {
      name: 'FinTech Bloomberg & ERP Simulation Terminal',
      desc: 'Live financial stock ticker feeds, QuickBooks/Tally cloud ledgers, and algorithmic trading simulators for commerce students.',
      tag: 'Business & Finance'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  Page 15: Distance & Global Online Campus
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ✓ Available for All The World's Degrees & Diplomas
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Global Distance Learning & Live Online Class Portal
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                آن لائن و فاصلاتی نظامِ تعلیم: Study prestigious degrees and professional diplomas from the comfort of your home anywhere in Pakistan or worldwide with interactive live sessions, digital cloud labs, and worldwide recognized certification.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onNavigate('degrees')}
                className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
              >
                Browse Degrees
              </button>
              <button
                onClick={() => onNavigate('admissions')}
                className="px-6 py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span>Apply for Online Admissions</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
            {[
              { id: 'features', label: 'Online Ecosystem & Benefits' },
              { id: 'schedule', label: 'Live Timetable & Global Batches' },
              { id: 'labs', label: 'Virtual Cloud Sandboxes & Labs' },
              { id: 'faq', label: 'Examinations & Verification' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedTab === tab.id
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Perks */}
        {selectedTab === 'features' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {perks.map((p, idx) => {
                const IconComponent = p.icon;
                return (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-blue-300 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-base">{p.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* How Online Class Works Infographic */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">How Online Learning Works at Zaitoon Roots Academy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-100 text-blue-900">Step 1</span>
                  <h5 className="font-bold text-sm text-slate-900">Online Registration</h5>
                  <p className="text-xs text-slate-600">Submit your online admission form, select your preferred degree or diploma, and upload CNIC/Matric marksheets.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-100 text-blue-900">Step 2</span>
                  <h5 className="font-bold text-sm text-slate-900">LMS Account & Kit</h5>
                  <p className="text-xs text-slate-600">Receive student credentials, official @zra.edu.pk email, digital course pack, and cloud server access keys.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-100 text-blue-900">Step 3</span>
                  <h5 className="font-bold text-sm text-slate-900">Interactive Live Classes</h5>
                  <p className="text-xs text-slate-600">Join real-time lecture halls, work on collaborative group repositories, and participate in live faculty Q&A.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">Step 4</span>
                  <h5 className="font-bold text-sm text-slate-900">Degree Conferred</h5>
                  <p className="text-xs text-slate-600">Pass proctored online semester evaluations and receive your original HEC-accredited degree dispatched to your doorstep.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Schedule */}
        {selectedTab === 'schedule' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Online Batch Timings & Global Shift Availability</h3>
                <p className="text-xs text-slate-500 mt-1">All programs offer multiple batch timings to suit domestic students, overseas workers, and working professionals.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {onlineSlots.map((slot, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">{slot.slot}</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">{slot.badge}</span>
                      </div>
                      <h4 className="text-base font-black text-slate-900">{slot.time}</h4>
                      <p className="text-xs text-slate-600">{slot.audience}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Recorded Backups Available</span>
                      </span>
                      <button
                        onClick={() => onNavigate('admissions')}
                        className="font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
                      >
                        Enroll in this slot →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Virtual Labs */}
        {selectedTab === 'labs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Browser-Based High-Performance Virtual Laboratories</h3>
                <p className="text-xs text-slate-500 mt-1">No heavy hardware required. Students access state-of-the-art software terminals securely from their web browser.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {virtualLabs.map((lab, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-900">{lab.tag}</span>
                      <span className="text-[11px] font-bold text-emerald-700">✓ 24/7 Cloud Uptime</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{lab.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{lab.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: FAQ & Proctored Exams */}
        {selectedTab === 'faq' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Examinations, Proctored Testing & Global Degree Delivery</h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900">How are semester examinations conducted for online learners?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Midterm and final examinations are conducted via our AI-proctored secure examination portal with dual-camera monitoring and screen lock. Students can also opt to take written exams at any of our affiliated testing centers across 40+ major global cities.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900">Will my degree mention "Online" or "Distance"?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    No. The degree parchment and final transcript issued are identical in legal status, credit hours, and formatting to regular on-campus graduates, backed by official university charter and international equivalency credentials.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900">How are physical degrees delivered to overseas students?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Original degree certificates, verified transcripts, and character certificates are packed in tamper-proof diplomatic grade seals and dispatched via DHL Express International directly to the student's verified international postal address.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Student Map Callout */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-full border border-amber-400/30">
              Overseas Admissions Open
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Start Your Online Degree or Diploma Today from Anywhere
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Join students across 65+ countries advancing their higher education and technical career credentials through Zaitoon Roots Academy's digital distance learning faculty.
            </p>
          </div>

          <button
            onClick={() => onNavigate('admissions')}
            className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shrink-0 shadow-lg cursor-pointer transition-all"
          >
            Start Online Admission Form →
          </button>
        </div>
      </div>
    </div>
  );
};
