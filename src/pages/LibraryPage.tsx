import React, { useState } from 'react';
import { PageId, LibraryBook } from '../types';
import { LIBRARY_BOOKS } from '../data/academyData';
import { BookOpen, Search, Download, FileText, CheckCircle2, Bookmark, Eye, Sparkles } from 'lucide-react';

interface LibraryPageProps {
  onNavigate: (page: PageId) => void;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [downloadedBookId, setDownloadedBookId] = useState<string | null>(null);

  const types = ['All', 'E-Book', 'Research Paper', 'Lecture Notes', 'Past Paper'];

  const filteredBooks = LIBRARY_BOOKS.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType = selectedType === 'All' || b.type === selectedType;
    return matchSearch && matchType;
  });

  const handleDownload = (id: string) => {
    setDownloadedBookId(id);
    setTimeout(() => setDownloadedBookId(null), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  Page 10: Central Digital E-Library & Papers Repository
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-slate-600">50,000+ Digital Titles Indexed</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Digital E-Library & Academic Knowledge Vault
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                ڈیجیٹل ای لائبریری و پاسٹ پیپرز: Free 24/7 access to international textbooks, IEEE research articles, medical reference manuals, and past 5-year solved examination papers.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('Past Paper')}
                className="px-5 py-3 rounded-2xl bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Solved Past Papers</span>
              </button>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by book title, author, or subject (e.g. AI, Guyton, Past Paper)..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-600"
              />
            </div>

            <div className="sm:col-span-4 flex flex-wrap gap-1.5 items-center">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedType === t
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Books List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBooks.map((bk) => (
            <div
              key={bk.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 text-xs font-bold">
                    {bk.type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono font-medium">{bk.pages} Pages</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-amber-800 transition-colors">
                  {bk.title}
                </h3>

                <p className="text-xs text-slate-600 font-medium">By {bk.author}</p>
                <p className="text-xs text-slate-500 font-mono">Subject: {bk.subject}</p>

                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span>Downloaded {bk.downloads.toLocaleString()} times</span>
                  <span className="font-bold text-slate-700">{bk.format}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                <button
                  onClick={() => handleDownload(bk.id)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-amber-600 hover:text-slate-950 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadedBookId === bk.id ? 'Downloading PDF...' : 'Read / Download E-Book'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
