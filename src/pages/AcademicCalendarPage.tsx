import React, { useState } from 'react';
import { PageId } from '../types';
import { ACADEMIC_CALENDAR_DATES } from '../data/academyData';
import { Calendar, Clock, Download, CheckCircle2, AlertCircle, Bell, ArrowRight } from 'lucide-react';

interface AcademicCalendarPageProps {
  onNavigate: (page: PageId) => void;
}

export const AcademicCalendarPage: React.FC<AcademicCalendarPageProps> = ({ onNavigate }) => {
  const [selectedTerm, setSelectedTerm] = useState<string>('All');
  const [remindedItem, setRemindedItem] = useState<string | null>(null);

  const terms = ['All', 'Fall Semester 2026', 'Spring Semester 2027', 'Annual 2027'];

  const filteredEvents = ACADEMIC_CALENDAR_DATES.filter(
    e => selectedTerm === 'All' || e.term === selectedTerm
  );

  const handleSetReminder = (eventTitle: string) => {
    setRemindedItem(eventTitle);
    setTimeout(() => setRemindedItem(null), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
                  Page 8: Academic Calendar & Examination Timetable
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-slate-600">Session 2026 - 2027</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Official Academic Calendar & Examination Schedules
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                تعلیمی کیلنڈر و امتحانات شیڈول: Semester schedules, midterm/final examination weeks, project submission deadlines, convocation dates, and gazetted university holidays.
              </p>
            </div>

            <button
              onClick={() => onNavigate('downloads')}
              className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Calendar</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
            {terms.map((term) => (
              <button
                key={term}
                onClick={() => setSelectedTerm(term)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedTerm === term
                    ? 'bg-purple-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Events List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100">
            {filteredEvents.map((item, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0 border border-purple-200">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.term}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{item.event}</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-600" />
                      <span>{item.date}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSetReminder(item.event)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-purple-100 hover:text-purple-800 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>{remindedItem === item.event ? 'Reminder Added!' : 'Set Reminder'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
