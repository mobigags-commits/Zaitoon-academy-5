import React, { useState } from 'react';
import { PageId } from '../types';
import { NEWS_EVENTS_DATA } from '../data/academyData';
import { Newspaper, Calendar, Bell, ArrowRight, Sparkles, Filter } from 'lucide-react';

interface NewsEventsPageProps {
  onNavigate: (page: PageId) => void;
}

export const NewsEventsPage: React.FC<NewsEventsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Notice', 'Convocation', 'News', 'Event'];

  const filteredNews = NEWS_EVENTS_DATA.filter(
    n => selectedCategory === 'All' || n.category === selectedCategory
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
                  Page 15: News, Circulars & Media Hub
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-slate-600">Official Press Room</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Institutional News, Circulars & Press Releases
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                تازہ ترین خبریں و نوٹیفیکیشنز: Keep up to date with institutional announcements, international symposiums, convocation notices, and university awards.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="px-2.5 py-0.5 rounded bg-red-50 text-red-700 font-bold">
                      {news.category}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {news.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-red-700 transition-colors">
                    {news.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {news.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => onNavigate('admissions')}
                  className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Full Circular Notice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
