import React, { useState } from 'react';
import { PageId } from '../types';
import { FACULTY_MEMBERS } from '../data/academyData';
import { Users, Mail, BookOpen, Award, Globe, Search, Send, CheckCircle2 } from 'lucide-react';

interface FacultyPageProps {
  onNavigate: (page: PageId) => void;
}

export const FacultyPage: React.FC<FacultyPageProps> = ({ onNavigate }) => {
  const [facultySearch, setFacultySearch] = useState('');
  const [messageSentId, setMessageSentId] = useState<string | null>(null);

  const filteredFaculty = FACULTY_MEMBERS.filter(
    f =>
      f.name.toLowerCase().includes(facultySearch.toLowerCase()) ||
      f.department.toLowerCase().includes(facultySearch.toLowerCase()) ||
      f.specialization.toLowerCase().includes(facultySearch.toLowerCase())
  );

  const handleMessageTeacher = (id: string) => {
    setMessageSentId(id);
    setTimeout(() => setMessageSentId(null), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  Page 7: Faculty & Research Wing
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-slate-600">PhD Scholars & International Deans</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Distinguished Faculty & Academic Research Wing
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                اساتذہ کرام و ریسرچ ڈیپارٹمنٹ: Learn from internationally recognized professors, postdoctoral fellows from MIT, Oxford, and Imperial College, leading breakthrough research in AI, Medicine, Engineering, and Law.
              </p>
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={facultySearch}
                onChange={(e) => setFacultySearch(e.target.value)}
                placeholder="Search faculty name, PhD, AI..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredFaculty.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.designation}, ${member.department} at Zaitoon Roots Academy`}
                    loading="lazy"
                    decoding="async"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-red-100 shadow-sm shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{member.name}</h3>
                    <p className="text-xs font-bold text-red-700 mt-0.5">{member.designation}</p>
                    <p className="text-[11px] text-slate-500 truncate">{member.department}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div>
                    <span className="font-bold text-slate-400 block text-[10px] uppercase">Education & Alma Mater</span>
                    <span className="font-semibold text-slate-800">{member.qualification}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block text-[10px] uppercase">Research Specialization</span>
                    <span className="text-slate-700">{member.specialization}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500 font-medium">Published Scopus Papers</span>
                    <span className="font-black text-slate-900">{member.publicationsCount}+ Articles</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                <span className="text-[11px] text-slate-500 font-mono truncate">{member.email}</span>
                <button
                  onClick={() => handleMessageTeacher(member.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{messageSentId === member.id ? 'Message Sent!' : 'Contact'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
