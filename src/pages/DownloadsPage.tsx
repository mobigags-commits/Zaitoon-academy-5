import React, { useState } from 'react';
import { PageId } from '../types';
import { Download, FileText, CheckCircle2, Search, BookOpen, ShieldCheck } from 'lucide-react';

interface DownloadsPageProps {
  onNavigate: (page: PageId) => void;
}

export const DownloadsPage: React.FC<DownloadsPageProps> = ({ onNavigate }) => {
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const docs = [
    { id: '1', title: 'ZRA Official Undergraduate Prospectus 2026-27 (Complete A-Z Degrees)', size: '18.4 MB', type: 'PDF Document', category: 'Prospectus' },
    { id: '2', title: 'A-Z Professional Diplomas & Technical Certifications Catalog', size: '12.1 MB', type: 'PDF Document', category: 'Prospectus' },
    { id: '3', title: 'HEC Credit Transfer & Equivalence Policy Guidelines', size: '2.4 MB', type: 'PDF Document', category: 'Rules' },
    { id: '4', title: 'Semester Fee Schedule & 3-Installment Challan Form', size: '1.2 MB', type: 'PDF Form', category: 'Finance' },
    { id: '5', title: 'Student Hostel Admission & Resident Code of Conduct', size: '3.1 MB', type: 'PDF Document', category: 'Campus Life' },
    { id: '6', title: 'Scholarship Application & Financial Need Assessment Dossier', size: '1.8 MB', type: 'Editable Form', category: 'Finance' },
    { id: '7', title: 'Convocation & Degree Clearance Clearance Form', size: '950 KB', type: 'PDF Form', category: 'Graduation' },
    { id: '8', title: 'Research Ethical Committee (REC) Approval Application Template', size: '1.5 MB', type: 'DOCX Template', category: 'Research' }
  ];

  const handleDownload = (id: string) => {
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                Page 17: Official Document Downloads & Resource Bank
              </span>
              <span className="text-xs font-bold text-slate-400">|</span>
              <span className="text-xs font-semibold text-blue-600">Updated Session 2026-27</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Official Prospectus, Forms & Policy Downloads
            </h1>
            <p className="text-slate-600 text-sm max-w-3xl">
              سرکاری دستاویزات و پراسپیکٹس: Download official undergraduate prospectuses, diploma guides, scholarship dossiers, hostel forms, and statutory academic rulebooks.
            </p>
          </div>
        </div>

        {/* Download Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {doc.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{doc.size}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{doc.title}</h3>
                </div>
              </div>

              <button
                onClick={() => handleDownload(doc.id)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{downloadedId === doc.id ? 'Downloaded!' : 'Download PDF'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
