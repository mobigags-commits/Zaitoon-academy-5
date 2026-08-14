import React, { useState } from 'react';
import { PageId } from '../types';
import { Compass, Trophy, Music, Cpu, Sparkles, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface StudentLifePageProps {
  onNavigate: (page: PageId) => void;
}

export const StudentLifePage: React.FC<StudentLifePageProps> = ({ onNavigate }) => {
  const [selectedClub, setSelectedClub] = useState(0);

  const clubs = [
    {
      name: 'ZRA Robotics & AI Intelligence Society',
      icon: '🤖',
      members: '650+ Active Members',
      tag: 'Tech & Engineering',
      desc: 'Building autonomous combat robots, drone delivery prototypes, and competing in global NASA/IEEE robotics olympiads.',
      activities: ['Weekly Coding Hackathons', 'Autonomous Drone Racing', 'AI Model Competitions']
    },
    {
      name: 'Literary & Parliamentary Debating Union',
      icon: '🎙️',
      members: '420+ Active Members',
      tag: 'Arts & Leadership',
      desc: 'National championship winning parliamentary debate team, hosting annual All-Pakistan Bilingual Declamation Contests.',
      activities: ['National Model UN', 'Urdu & English Debates', 'Creative Writing Workshops']
    },
    {
      name: 'ZRA Sports & Athletics Club',
      icon: '⚽',
      members: '890+ Athletes',
      tag: 'Sports & Fitness',
      desc: 'Cricket, Football, Table Tennis, Basketball, and Martial Arts teams competing at national university games.',
      activities: ['Annual Sports Olympiad', 'Inter-Faculty Football League', 'Martial Arts Tournaments']
    },
    {
      name: 'Young Entrepreneurs & Startup Incubator',
      icon: '🚀',
      members: '340+ Founders',
      tag: 'Business & Ventures',
      desc: 'Connecting aspiring founders with seed funding, venture capitalist pitch days, and product prototyping labs.',
      activities: ['Startup Pitch Nights', 'Angel Investor Meetups', 'Product Prototyping']
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
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  Page 14: Student Life, Clubs & Campus Societies
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-slate-600">25+ Student-Run Societies</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Vibrant Student Life, Cultural Societies & Sports
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                طلباء کی سرگرمیاں، سوسائٹیز و کھیل: Experience a rich, energetic campus community featuring high-tech robotics societies, parliamentary debating unions, annual cultural fests, and sports championships.
              </p>
            </div>

            <button
              onClick={() => onNavigate('admissions')}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Join ZRA Community</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Societies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {clubs.map((club, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{club.icon}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                    {club.tag}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg leading-snug">{club.name}</h3>
                <p className="text-xs font-bold text-slate-500">{club.members}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{club.desc}</p>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Key Annual Events</span>
                  <div className="flex flex-wrap gap-1.5">
                    {club.activities.map((act, i) => (
                      <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700">Open for Session 2026</span>
                <button
                  onClick={() => onNavigate('admissions')}
                  className="text-xs font-bold text-amber-800 hover:text-amber-900"
                >
                  Join Club →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
