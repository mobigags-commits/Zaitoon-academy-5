import React from 'react';
import { PageId } from '../types';
import { Award, Compass, ShieldCheck, HeartHandshake, Sparkles, ArrowRight, Target, Eye } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
                Page 19: About Zaitoon Roots Academy & Leadership
              </span>
              <span className="text-xs font-bold text-slate-400">|</span>
              <span className="text-xs font-semibold text-slate-600">Founded 2004 • 22+ Years of Excellence</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              About Zaitoon Roots Academy (ZRA)
            </h1>
            <p className="text-slate-600 text-sm max-w-3xl">
              تعارف اکیڈمی و ویژن: A world-class multidisciplinary higher education institution dedicated to empowering generations through cutting-edge knowledge, global degree programs, ethical leadership, and high-impact skills.
            </p>
          </div>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Institutional Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be internationally recognized as a premier cradle of modern scientific innovation, clinical medical excellence, ethical governance, and vocational mastery—fostering leaders who shape the future of society and global industry.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Academic Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Deliver accessible, world-standard undergraduate degrees, doctoral research, and industry diplomas backed by advanced AI laboratories, clinical rotations, distinguished faculty, and generous merit scholarships for all deserving youth.
            </p>
          </div>
        </div>

        {/* Chancellor's Message */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 space-y-6 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
              alt="Chancellor"
              className="w-36 h-36 rounded-3xl object-cover border-4 border-amber-400/50 shadow-2xl shrink-0"
            />
            <div className="space-y-3 text-center md:text-left">
              <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-full border border-amber-400/30">
                Message from the Chancellor & Founder
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">
                &ldquo;Education is the ultimate catalyst for human dignity and global advancement.&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                At Zaitoon Roots Academy, we believe no passionate student should be deprived of world-class education due to financial boundaries. We have built an ecosystem where knowledge meets practice, preparing you for the frontiers of artificial intelligence, healthcare, and engineering.
              </p>
              <div className="pt-2">
                <p className="text-base font-bold text-amber-300">Prof. Dr. Tariq Mahmood Zaitoon</p>
                <p className="text-xs text-slate-400">Chancellor & Chairman Board of Governors, ZRA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
