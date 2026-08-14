import React, { useState } from 'react';
import { PageId } from '../types';
import { ALL_DEGREES } from '../data/degreesData';
import { ALL_DIPLOMAS } from '../data/diplomasData';
import confetti from 'canvas-confetti';
import {
  FileCheck2,
  UploadCloud,
  DollarSign,
  User,
  GraduationCap,
  Sparkles,
  Printer,
  CheckCircle2,
  Search,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface AdmissionsPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [programType, setProgramType] = useState<'Degree' | 'Diploma'>('Degree');
  const [selectedProgramId, setSelectedProgramId] = useState<string>(ALL_DEGREES[0].id);

  // Form State
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [cnic, setCnic] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [campus, setCampus] = useState('Islamabad Central Flagship Campus');
  const [prevDegree, setPrevDegree] = useState('Intermediate (FSc / ICS / A-Levels)');
  const [percentage, setPercentage] = useState<number>(82);
  const [address, setAddress] = useState('');

  // Generated Application State
  const [submittedApp, setSubmittedApp] = useState<{
    id: string;
    challanNo: string;
    programTitle: string;
    fee: string;
    scholarshipAwarded: string;
    payableAmount: string;
    date: string;
  } | null>(null);

  // Tracking State
  const [trackCode, setTrackCode] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);

  const selectedDegree = ALL_DEGREES.find((d) => d.id === selectedProgramId);
  const selectedDiploma = ALL_DIPLOMAS.find((d) => d.id === selectedProgramId);

  const currentFee = programType === 'Degree' ? selectedDegree?.semesterFee || 'Rs. 90,000' : selectedDiploma?.totalFee || 'Rs. 60,000';

  // Calculate scholarship discount
  const discountPercent = percentage >= 85 ? 50 : percentage >= 75 ? 30 : percentage >= 65 ? 15 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const appId = `ZR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const challan = `CH-ZRA-${Math.floor(100000 + Math.random() * 900000)}`;
    const programName = programType === 'Degree' ? selectedDegree?.title || '' : selectedDiploma?.title || '';

    setSubmittedApp({
      id: appId,
      challanNo: challan,
      programTitle: programName,
      fee: currentFee,
      scholarshipAwarded: discountPercent > 0 ? `${discountPercent}% Merit Scholarship Qualified` : 'Standard Tuition',
      payableAmount: discountPercent > 0 ? `Reduced by ${discountPercent}% (Verified at Campus Desk)` : currentFee,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setCurrentStep(4);
  };

  const handleTrack = () => {
    if (!trackCode.trim()) return;
    if (trackCode.toUpperCase().includes('ZR') || trackCode.length >= 6) {
      setTrackResult('Status: Admission Form Verified • Merit Entry Test Slip Issued (Venue: ZRA Hall A)');
    } else {
      setTrackResult('Application ID not found. Please verify your tracking code or contact admissions helpdesk.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Page 4: Online Admissions & Application Portal
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-emerald-600">Fall 2026 / Spring 2027</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Online Admission Application & Digital Challan Portal
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                داخلہ فارم و فیس چالان: Complete your fast-track digital application for any of our World Degrees or Professional Diplomas with automatic scholarship evaluation.
              </p>
            </div>

            {/* Quick Tracking Widget */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-xs w-full space-y-2">
              <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-red-600" />
                <span>Track Existing Application</span>
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackCode}
                  onChange={(e) => setTrackCode(e.target.value)}
                  placeholder="e.g. ZR-2026-8942"
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-600"
                />
                <button
                  onClick={handleTrack}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Track
                </button>
              </div>
              {trackResult && (
                <p className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  {trackResult}
                </p>
              )}
            </div>
          </div>

          {/* Stepper Header */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-4 gap-2 sm:gap-4 text-center">
            {[
              { num: 1, label: 'Choose Program' },
              { num: 2, label: 'Personal & Bio' },
              { num: 3, label: 'Academic & Review' },
              { num: 4, label: 'Challan & Status' }
            ].map((st) => (
              <div
                key={st.num}
                className={`p-3 rounded-2xl border transition-all ${
                  currentStep === st.num
                    ? 'bg-red-50 border-red-400 text-red-800 font-bold shadow-sm'
                    : currentStep > st.num
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span className="w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-extrabold mx-auto mb-1 bg-white shadow-xs">
                  {currentStep > st.num ? '✓' : st.num}
                </span>
                <p className="text-xs truncate">{st.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Step Wizard Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          {/* STEP 1: CHOOSE PROGRAM */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 1: Select Academic Category & Program</h3>
                <p className="text-xs text-slate-500 mt-1">Select whether you wish to apply for an A-Z Degree or Professional Diploma</p>
              </div>

              {/* Degree vs Diploma Toggle */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setProgramType('Degree');
                    setSelectedProgramId(ALL_DEGREES[0].id);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    programType === 'Degree'
                      ? 'bg-red-50/80 border-red-500 ring-2 ring-red-500/20'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <GraduationCap className={`w-7 h-7 mb-2 ${programType === 'Degree' ? 'text-red-700' : 'text-slate-500'}`} />
                  <h4 className="font-bold text-slate-900 text-base">A-Z World Degree Program</h4>
                  <p className="text-xs text-slate-500 mt-1">4-Year BS, 2-Year MS, MPhil & 5-Year Clinical Doctorates</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProgramType('Diploma');
                    setSelectedProgramId(ALL_DIPLOMAS[0].id);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    programType === 'Diploma'
                      ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <FileCheck2 className={`w-7 h-7 mb-2 ${programType === 'Diploma' ? 'text-amber-700' : 'text-slate-500'}`} />
                  <h4 className="font-bold text-slate-900 text-base">A-Z Professional Diploma</h4>
                  <p className="text-xs text-slate-500 mt-1">6-Month to 2-Year Industry Skill & Executive Certifications</p>
                </button>
              </div>

              {/* Program Dropdown Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Select Specific Program from Directory
                </label>
                <select
                  value={selectedProgramId}
                  onChange={(e) => setSelectedProgramId(e.target.value)}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-red-600"
                >
                  {programType === 'Degree'
                    ? ALL_DEGREES.map((d) => (
                        <option key={d.id} value={d.id}>
                          [{d.level}] {d.title} — {d.duration} ({d.semesterFee})
                        </option>
                      ))
                    : ALL_DIPLOMAS.map((dp) => (
                        <option key={dp.id} value={dp.id}>
                          [{dp.duration}] {dp.title} ({dp.totalFee})
                        </option>
                      ))}
                </select>
              </div>

              {/* Selected Program Preview Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-red-700 uppercase">Estimated Program Fee</span>
                  <p className="text-2xl font-black text-slate-900">{currentFee}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Flexible 3-Installment Semester Plan Available</p>
                </div>
                <div className="bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Eligible for up to 100% Merit Scholarship</span>
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Continue to Personal Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PERSONAL BIO */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 2: Applicant Personal Information</h3>
                <p className="text-xs text-slate-500 mt-1">Please enter verified information matching your official CNIC/B-Form</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Muhammad Ali Khan"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Father / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood Khan"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CNIC / B-Form / Passport No *</label>
                  <input
                    type="text"
                    required
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    placeholder="61101-1234567-1"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="applicant@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Contact Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Campus Location</label>
                  <select
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600 font-medium"
                  >
                    <option>Islamabad Central Flagship Campus</option>
                    <option>Lahore Executive Campus</option>
                    <option>Karachi Coastal & Tech Campus</option>
                    <option>Dubai Global Liaison Campus</option>
                    <option>Global Online Distance Campus</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Residential Postal Address</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House No, Street, City, Country"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Continue to Academic Record</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ACADEMIC & REVIEW */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 3: Prior Academic Record & Scholarship Check</h3>
                <p className="text-xs text-slate-500 mt-1">Provide your last completed qualification marks for merit scholarship tier calculation</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Highest Completed Qualification</label>
                  <select
                    value={prevDegree}
                    onChange={(e) => setPrevDegree(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600 font-medium"
                  >
                    <option>Matriculation / O-Levels (Science)</option>
                    <option>Intermediate (FSc Pre-Engineering)</option>
                    <option>Intermediate (FSc Pre-Medical)</option>
                    <option>Intermediate (ICS Computer Science)</option>
                    <option>A-Levels / Cambridge Assessment</option>
                    <option>Bachelor’s Degree (14 or 16 Years)</option>
                    <option>DAE 3-Year Diploma</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Percentage Marks (%): {percentage}%</label>
                    <span className="text-[11px] font-bold text-red-700">
                      {discountPercent > 0 ? `${discountPercent}% Scholarship Applied!` : 'Standard Merit'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={45}
                    max={100}
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-700"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                    <span>45% Min</span>
                    <span>65% (15% Off)</span>
                    <span>75% (30% Off)</span>
                    <span>85%+ (50% Off)</span>
                  </div>
                </div>
              </div>

              {/* Upload Document Simulator */}
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-2 bg-slate-50/50">
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700">Upload Transcript / Result Card Copy (Optional)</p>
                <p className="text-[11px] text-slate-400">PDF, JPG or PNG up to 10MB • Can also be presented at campus verification</p>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 shadow-xs">
                    📁 1 Document Ready for Submission
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-800 hover:to-rose-800 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Submit Application & Generate Challan</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CHALLAN & STATUS (SUCCESS) */}
          {currentStep === 4 && submittedApp && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="text-center space-y-2 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Admission Application Submitted Successfully!</h3>
                <p className="text-xs text-slate-500">
                  آپ کی آن لائن درخواست کامیابی کے ساتھ درج کر لی گئی ہے۔ فیس چالان اور داخلہ رول سلپ نیچے موجود ہے
                </p>
              </div>

              {/* Digital Fee Challan Card */}
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border-2 border-red-200 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-700 text-white flex items-center justify-center font-black text-sm">
                      ZRA
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">ZAITOON ROOTS ACADEMY</h4>
                      <p className="text-[11px] text-slate-500 font-mono">Official Admission Fee Challan (Bank / Online Copy)</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-red-100 text-red-800 rounded-lg">
                      Challan No: {submittedApp.challanNo}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">App ID: {submittedApp.id}</p>
                  </div>
                </div>

                {/* Details Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase block text-[10px]">Applicant Name</span>
                    <span className="font-bold text-slate-900 text-sm">{fullName || 'Muhammad Ali Khan'}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase block text-[10px]">CNIC / Form-B</span>
                    <span className="font-bold text-slate-900 text-sm">{cnic || '61101-1234567-1'}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase block text-[10px]">Selected Program</span>
                    <span className="font-bold text-slate-900 truncate block text-sm">{submittedApp.programTitle}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase block text-[10px]">Campus Allotted</span>
                    <span className="font-semibold text-slate-800 text-xs">{campus}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase block text-[10px]">Scholarship Tier</span>
                    <span className="font-bold text-emerald-700 text-xs">{submittedApp.scholarshipAwarded}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase block text-[10px]">Payable Fee</span>
                    <span className="font-black text-red-700 text-base">{submittedApp.payableAmount}</span>
                  </div>
                </div>

                <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Payment Instructions:</strong> Payable at any HBL / Meezan Bank branch or online via 1Link 1Bill using Challan No: <code>{submittedApp.challanNo}</code> within 14 banking days.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Fee Challan / PDF Copy</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => onNavigate('lms-portal')}
                    className="px-5 py-3 rounded-xl bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold text-xs cursor-pointer"
                  >
                    View Student LMS Demo
                  </button>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
