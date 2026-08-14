import React, { useState } from 'react';
import { PageId, VerificationRecord } from '../types';
import { VERIFIED_RECORDS } from '../data/academyData';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Download,
  Printer,
  FileCheck,
  Building,
  Award,
  Sparkles
} from 'lucide-react';

interface VerificationPageProps {
  onNavigate: (page: PageId) => void;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({ onNavigate }) => {
  const [searchCode, setSearchCode] = useState('ZRA-2025-DEG-8910');
  const [verifiedResult, setVerifiedResult] = useState<VerificationRecord | null>(VERIFIED_RECORDS[0]);
  const [hasSearched, setHasSearched] = useState(true);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    const query = searchCode.trim().toUpperCase();
    const match = VERIFIED_RECORDS.find(
      r =>
        r.verificationId.toUpperCase() === query ||
        r.rollNumber.toUpperCase() === query ||
        r.transcriptSerial.toUpperCase() === query
    );

    if (match) {
      setVerifiedResult(match);
      confetti({ particleCount: 80, spread: 60 });
    } else {
      setVerifiedResult(null);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Page 9: Online Credential Verification Portal
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-emerald-600">256-Bit Cryptographic QR System</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Official Degree & Diploma Online Verification System
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                ڈگری و ڈپلوما آن لائن تصدیقی پورٹل: Instant global verification for employers, embassies, and international universities. Enter Roll Number or Certificate Verification ID.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-200">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-emerald-900 block">Tamper-Proof Ledger</span>
                <span className="text-emerald-700">HEC & Foreign Embassy Compliant</span>
              </div>
            </div>
          </div>

          {/* Search Box Form */}
          <form onSubmit={handleVerify} className="mt-8 pt-6 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Enter Verification ID, Roll Number, or Transcript Serial:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="e.g. ZRA-2025-DEG-8910 or ZRA-BSCS-2021-042"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-600 uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Verify Credential Now</span>
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold">Quick Sample Test IDs:</span>
              {VERIFIED_RECORDS.map((rec) => (
                <button
                  type="button"
                  key={rec.verificationId}
                  onClick={() => {
                    setSearchCode(rec.verificationId);
                    setVerifiedResult(rec);
                    setHasSearched(true);
                  }}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-mono text-[11px] font-semibold transition-colors"
                >
                  {rec.verificationId}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Verification Result Display */}
        {hasSearched && (
          <div>
            {verifiedResult ? (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-500/80 shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-emerald-900">
                        OFFICIALLY VERIFIED & GENUINE ACADEMIC CREDENTIAL
                      </h3>
                      <p className="text-xs text-emerald-700">
                        This credential was issued by Zaitoon Roots Academy and is archived in the central registrar ledger.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1.5 bg-emerald-200/80 text-emerald-950 rounded-lg">
                    Status: {verifiedResult.status}
                  </span>
                </div>

                {/* Digital Certificate Sheet View */}
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-300 relative overflow-hidden space-y-6">
                  <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-red-700 text-white flex items-center justify-center text-xl font-black">
                        ZRA
                      </div>
                      <div>
                        <h4 className="font-black text-lg text-slate-900 tracking-tight">ZAITOON ROOTS ACADEMY</h4>
                        <p className="text-xs text-slate-500 font-medium">
                          Office of the Controller of Examinations & Academic Registrar
                        </p>
                      </div>
                    </div>

                    <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col items-center">
                      <QrCode className="w-14 h-14 text-slate-800" />
                      <span className="text-[9px] font-mono text-slate-400 font-bold mt-1">ZRA-QR-VALID</span>
                    </div>
                  </div>

                  {/* Student & Degree Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Graduate Name</span>
                      <span className="font-bold text-slate-900 text-base">{verifiedResult.studentName}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Father Name</span>
                      <span className="font-bold text-slate-900 text-base">{verifiedResult.fatherName}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Roll Number</span>
                      <span className="font-mono font-bold text-slate-900 text-base">{verifiedResult.rollNumber}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 sm:col-span-2">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Program Conferred</span>
                      <span className="font-bold text-slate-900 text-base">{verifiedResult.programName}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">CGPA / Grade</span>
                      <span className="font-black text-emerald-700 text-base">{verifiedResult.cgpaOrGrade}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Academic Session</span>
                      <span className="font-semibold text-slate-800">{verifiedResult.session}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Date of Issue</span>
                      <span className="font-semibold text-slate-800">{verifiedResult.issueDate}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Issuing Campus</span>
                      <span className="font-semibold text-slate-800">{verifiedResult.campus}</span>
                    </div>
                  </div>
                </div>

                {/* Print & Download Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Official Verification Statement</span>
                  </button>

                  <p className="text-xs text-slate-400 font-mono">
                    Security Hash: SHA256-ZRA-SECURE-LEDGER-VERIFIED
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 border border-red-200 text-center space-y-4">
                <div className="w-14 h-14 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Credential Not Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  No record matches the provided verification code &ldquo;{searchCode}&rdquo;. Please verify your ID or contact the controller of examinations.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-2.5 bg-red-700 text-white text-xs font-bold rounded-xl"
                >
                  Contact Verification Desk
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
