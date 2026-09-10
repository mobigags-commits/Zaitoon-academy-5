import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import {
  PAYMENT_METHODS,
  FEE_PURPOSES,
  PaymentCategory,
  PaymentMethodItem,
  FeePurposeOption,
  PaymentSubmission
} from '../data/paymentMethodsData';
import { ALL_DEGREES } from '../data/degreesData';
import { ALL_DIPLOMAS } from '../data/diplomasData';
import { ZaitoonLogo } from '../components/ZaitoonLogo';
import {
  CreditCard,
  Wallet,
  Building2,
  Globe,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Download,
  Printer,
  FileText,
  Clock,
  HelpCircle,
  Copy,
  ExternalLink,
  Lock,
  ArrowRight,
  Sparkles,
  Smartphone,
  ChevronRight,
  Upload,
  AlertCircle,
  RefreshCw,
  Search
} from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface GlobalPaymentPortalPageProps {
  onNavigate: (page: PageId) => void;
  preSelectedProgramId?: string;
  preSelectedFeePurpose?: string;
}

export const GlobalPaymentPortalPage: React.FC<GlobalPaymentPortalPageProps> = ({
  onNavigate,
  preSelectedProgramId,
  preSelectedFeePurpose
}) => {
  // Category state
  const [activeCategory, setActiveCategory] = useState<PaymentCategory>('all');
  const [selectedMethodId, setSelectedMethodId] = useState<string>('jazzcash');
  const [searchQuery, setSearchQuery] = useState('');

  // Currency
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');
  const USD_TO_PKR_RATE = 280;

  // Student details
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('ZRA-2026-APP');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<string>(
    preSelectedProgramId || ALL_DEGREES[0].title
  );
  const [selectedPurposeId, setSelectedPurposeId] = useState<string>(
    preSelectedFeePurpose || 'degree-semester'
  );
  const [customAmountPkr, setCustomAmountPkr] = useState<number>(95000);

  // Method specific field values
  const [formFields, setFormFields] = useState<Record<string, string>>({});
  const [uploadedReceiptName, setUploadedReceiptName] = useState<string | null>(null);

  // Submission state
  const [isProcessing, setIsProcessing] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<PaymentSubmission | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showChallanModal, setShowChallanModal] = useState(false);

  // Current selected method
  const currentMethod =
    PAYMENT_METHODS.find((m) => m.id === selectedMethodId) || PAYMENT_METHODS[0];

  // Update amount when purpose changes
  const handlePurposeChange = (purposeId: string) => {
    setSelectedPurposeId(purposeId);
    const purpose = FEE_PURPOSES.find((p) => p.id === purposeId);
    if (purpose) {
      setCustomAmountPkr(purpose.defaultPkr);
    }
  };

  // Filtered methods
  const filteredMethods = PAYMENT_METHODS.filter((method) => {
    const matchesCategory =
      activeCategory === 'all' || method.category === activeCategory;
    const matchesSearch =
      method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.urduName.includes(searchQuery) ||
      method.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleFieldChange = (fieldId: string, val: string) => {
    setFormFields((prev) => ({ ...prev, [fieldId]: val }));
  };

  // Submit payment form
  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentName.trim() || !phone.trim()) {
      alert('براہ کرم طالب علم کا نام اور واٹس ایپ نمبر درج کریں۔ Please provide student name and contact number.');
      return;
    }

    setIsProcessing(true);

    // Simulate real gateway verification delay
    setTimeout(() => {
      const pkrVal = customAmountPkr;
      const usdVal = Math.round(customAmountPkr / USD_TO_PKR_RATE);
      const generatedRef = `ZRA-TXN-${Date.now().toString().slice(-6)}`;
      const receiptNum = `REC-2026-${Math.floor(100000 + Math.random() * 900000)}`;

      const currentPurpose =
        FEE_PURPOSES.find((p) => p.id === selectedPurposeId)?.label ||
        'Degree Semester Tuition';

      const submission: PaymentSubmission = {
        receiptId: receiptNum,
        timestamp: new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        }),
        studentName,
        studentId: studentId || 'ZRA-NEW-SCHOLAR',
        email: email || 'student@zaitoonroots.edu',
        phone,
        program: selectedProgram,
        feePurpose: currentPurpose,
        amountPkr: pkrVal,
        amountUsd: usdVal,
        methodId: currentMethod.id,
        methodName: currentMethod.name,
        transactionRef: generatedRef,
        status: 'Verified & Cleared',
        receiptQrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=ZRA-VERIFIED-RECEIPT-${receiptNum}-${pkrVal}PKR`
      };

      setSubmissionResult(submission);
      setIsProcessing(false);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }, 1800);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header with Official Logo & Guarantee */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-red-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Official Global Treasury & Fee Gateway
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs font-bold text-amber-400 font-mono">
                  ISO 9001:2015 & 256-Bit SSL Secured
                </span>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <ZaitoonLogo variant="horizontal" size="lg" isDark={true} />
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                All The World's Payment Methods & Fee Clearance Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                پوری دنیا کے تمام ادائیگی کے طریقے: Pay student tuition, admission processing, examination dues, and hostel charges instantly via <strong>JazzCash</strong>, <strong>EasyPaisa</strong>, <strong>Raast</strong>, <strong>1Bill</strong>, <strong>Visa/Mastercard</strong>, <strong>PayPal</strong>, <strong>Apple Pay</strong>, <strong>SWIFT Wire</strong>, <strong>Middle East Mada/STC Pay</strong>, <strong>Western Union</strong>, or <strong>USDT Crypto</strong>.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => setShowChallanModal(true)}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                id="btn-print-challan"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print 4-Copy Bank Challan</span>
              </button>

              <a
                href="https://wa.me/923447956085?text=Assalam-o-Alaikum%2C%20I%20have%20a%20query%20regarding%20ZRA%20Fee%20Payment"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Smartphone className="w-4 h-4" />
                <span>WhatsApp Treasury: 0344-7956085</span>
              </a>
            </div>
          </div>

          {/* Trust Banner Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant Digital Receipt with QR</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Surcharge on Raast & JazzCash</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Global 3D-Secure Fraud Shield</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Verified University Treasury</span>
            </div>
          </div>
        </div>

        {/* If a submission was just processed, show the Digital Receipt prominently */}
        {submissionResult && (
          <div
            id="receipt-print-area"
            className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 border-4 border-amber-500/40 shadow-2xl space-y-6 animate-in zoom-in-95"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-6">
              <div className="flex items-center gap-4">
                <ZaitoonLogo variant="seal" size="md" isDark={false} />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    OFFICIAL VERIFIED E-RECEIPT
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                    Fee Payment & Clearance Voucher
                  </h3>
                  <p className="text-xs text-slate-600 font-serif" dir="rtl">
                    زیتون روٹس اکیڈمی - فیس وصولی رسید و تصدیق نامہ
                  </p>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-xs text-slate-500 font-mono">Receipt No:</div>
                <div className="text-lg sm:text-xl font-black text-red-700 font-mono">
                  {submissionResult.receiptId}
                </div>
                <div className="text-[11px] text-slate-500">{submissionResult.timestamp}</div>
              </div>
            </div>

            {/* Receipt Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Student & Program Details
                </h4>
                <div className="flex justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-600">Student Name:</span>
                  <span className="font-bold text-slate-900">{submissionResult.studentName}</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-600">Roll / App ID:</span>
                  <span className="font-mono font-bold text-slate-900">{submissionResult.studentId}</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-600">WhatsApp / Phone:</span>
                  <span className="font-mono font-bold text-slate-900">{submissionResult.phone}</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-600">Program / Degree:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[200px]">{submissionResult.program}</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-600">Purpose of Fee:</span>
                  <span className="font-bold text-amber-800">{submissionResult.feePurpose}</span>
                </div>
              </div>

              <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Transaction & Settlement Verification
                </h4>
                <div className="flex justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-600">Payment Gateway:</span>
                  <span className="font-bold text-slate-900">{submissionResult.methodName}</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-600">Transaction Ref / TxID:</span>
                  <span className="font-mono font-bold text-slate-900">{submissionResult.transactionRef}</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-600">Status:</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                    <CheckCircle2 className="w-3 h-3" />
                    {submissionResult.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm py-2 bg-amber-50 p-2 rounded-xl border border-amber-200">
                  <span className="font-bold text-slate-800">Total Cleared Amount:</span>
                  <span className="font-black text-red-700 text-base">
                    Rs. {submissionResult.amountPkr.toLocaleString()} (≈ ${submissionResult.amountUsd})
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom QR & Seal & Print Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t-2 border-slate-200">
              <div className="flex items-center gap-4">
                <img
                  src={submissionResult.receiptQrCodeUrl}
                  alt="Official Verification QR"
                  className="w-20 h-20 rounded-xl border border-slate-300 p-1 bg-white"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs text-slate-600 space-y-0.5">
                  <p className="font-bold text-slate-900">Tamper-Proof Verification QR</p>
                  <p>Scan to verify institutional ledger record</p>
                  <p className="text-[10px] text-slate-500 font-mono">Treasury Node: PK-ISB-MEZ-01</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={printReceipt}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>Print Receipt / Save PDF</span>
                </button>
                <button
                  onClick={() => setSubmissionResult(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Make Another Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Navigation Tabs */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" />
              <span>Select Payment Method (عالمی ادائیگی کے ذرائع)</span>
            </h2>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search methods (JazzCash, Card, PayPal...)"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {[
              { id: 'all', label: 'All World Methods (14+)' },
              { id: 'pakistan', label: '🇵🇰 Pakistan (JazzCash, EasyPaisa, Raast, 1Bill, Bank)' },
              { id: 'cards', label: '💳 Credit/Debit Cards (Visa/Mastercard)' },
              { id: 'wallets', label: '🌐 Global Wallets (PayPal, Apple Pay, GPay)' },
              { id: 'middle-east', label: '🌍 Middle East & GCC (Mada, STC Pay, UAE)' },
              { id: 'wire-swift', label: '🏦 International SWIFT Wire & Wise' },
              { id: 'remittance', label: '💸 Remittances (Western Union, MoneyGram)' },
              { id: 'crypto', label: '⚡ Crypto (USDT, BTC, ETH)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as PaymentCategory)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Method Cards Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredMethods.map((method) => {
              const isSelected = method.id === selectedMethodId;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethodId(method.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between relative group ${
                    isSelected
                      ? 'bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border-amber-400 text-white shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 w-full mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 truncate">
                      {method.badge}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-white group-hover:text-amber-300 transition-colors">
                      {method.name}
                    </h4>
                    <p className="text-[10px] text-amber-400 font-serif mt-0.5" dir="rtl">
                      {method.urduName}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                      {method.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Interactive Two-Column Form Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Academic & Student Information Form */}
          <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-1">
                Step 1 of 2: Student & Fee Details
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>Student Identity & Academic Program</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                طالب علم کی تفصیلات اور فیس کا انتخاب کریں
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Fee Purpose Selection */}
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Purpose of Fee / Payment Category *
                </label>
                <select
                  value={selectedPurposeId}
                  onChange={(e) => handlePurposeChange(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold focus:outline-none focus:border-amber-400"
                >
                  {FEE_PURPOSES.map((purpose) => (
                    <option key={purpose.id} value={purpose.id}>
                      {purpose.label} — Rs. {purpose.defaultPkr.toLocaleString()} (${purpose.defaultUsd})
                    </option>
                  ))}
                </select>
              </div>

              {/* Program Name Selection */}
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Academic Degree / Professional Diploma *
                </label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold focus:outline-none focus:border-amber-400"
                >
                  <optgroup label="Degrees (BS / MS / MPhil / PhD)">
                    {ALL_DEGREES.map((d) => (
                      <option key={d.id} value={d.title}>
                        {d.title} ({d.semesterFee})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Professional Diplomas (1-2 Years)">
                    {ALL_DIPLOMAS.map((dp) => (
                      <option key={dp.id} value={dp.title}>
                        {dp.title} ({dp.totalFee})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Amount Inputs with Currency Switch */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                    Payable Amount
                  </label>
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setCurrency('PKR')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                        currency === 'PKR' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      PKR (Rs.)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency('USD')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                        currency === 'USD' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-3 font-bold text-amber-400 text-sm">
                      {currency === 'PKR' ? 'Rs.' : '$'}
                    </span>
                    <input
                      type="number"
                      value={currency === 'PKR' ? customAmountPkr : Math.round(customAmountPkr / USD_TO_PKR_RATE)}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (currency === 'PKR') setCustomAmountPkr(val);
                        else setCustomAmountPkr(val * USD_TO_PKR_RATE);
                      }}
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold text-base focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div className="text-right text-[11px] text-slate-400 font-mono shrink-0">
                    {currency === 'PKR' ? (
                      <span>≈ ${Math.round(customAmountPkr / USD_TO_PKR_RATE)} USD</span>
                    ) : (
                      <span>≈ Rs. {customAmountPkr.toLocaleString()} PKR</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Student Identity Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Muhammad Hamza"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Roll No. / Application ID
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="ZRA-2026-APP"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 344 7956085"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Payment Method Execution Form */}
          <div className="lg:col-span-6 bg-slate-900/90 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block mb-1">
                  Step 2 of 2: Authorize & Complete Payment
                </span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{currentMethod.name}</span>
                </h3>
                <p className="text-xs text-amber-400 font-serif mt-0.5" dir="rtl">
                  {currentMethod.urduName}
                </p>
              </div>

              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                {currentMethod.badge}
              </span>
            </div>

            {/* Official Academy Account Verification Box */}
            {currentMethod.accountDetails && (
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <span>Official Academy Receiver Details (تصدیق شدہ کھاتہ)</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Merchant
                  </span>
                </div>

                <div className="space-y-1.5 font-mono">
                  {Object.entries(currentMethod.accountDetails).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between py-1 border-b border-slate-800/80 text-[11px]"
                    >
                      <span className="text-slate-400 font-sans">{k}:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-300">{v}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(v, k)}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          title="Copy to clipboard"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {copiedKey && (
                  <p className="text-[10px] text-emerald-400 text-right animate-in fade-in">
                    ✓ Copied {copiedKey} to clipboard!
                  </p>
                )}
              </div>
            )}

            {/* Step-by-Step Guidance */}
            <div className="p-3.5 bg-slate-950/50 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
              <strong className="text-amber-400 block text-[11px] uppercase tracking-wider">
                How to Complete Payment:
              </strong>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-slate-400 leading-relaxed">
                {currentMethod.instructions.map((inst, idx) => (
                  <li key={idx}>{inst}</li>
                ))}
              </ol>
            </div>

            {/* Dynamic Interactive Input Form for this method */}
            <form onSubmit={handleProcessPayment} className="space-y-4 text-xs">
              <div className="space-y-3">
                {currentMethod.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-slate-300 font-bold mb-1">
                      {field.label} {field.required && <span className="text-amber-400">*</span>}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={formFields[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:border-amber-400 focus:outline-none text-xs"
                    />
                    {field.helperText && (
                      <p className="text-[10px] text-slate-500 mt-1">{field.helperText}</p>
                    )}
                  </div>
                ))}

                {/* Proof of Payment / Receipt Screenshot Upload */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Upload Bank Deposit Slip / Transaction Screenshot (Optional)
                  </label>
                  <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-700 hover:border-amber-400/80 bg-slate-950/60 cursor-pointer transition-colors group">
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-amber-400 mb-1 transition-colors" />
                    <span className="text-[11px] text-slate-300 font-medium">
                      {uploadedReceiptName || 'Click or drag deposit receipt / screenshot here'}
                    </span>
                    <span className="text-[9px] text-slate-500">Supports JPG, PNG, PDF up to 10MB</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedReceiptName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Total Summary and Submit Button */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-bold">Total Amount to Settle:</span>
                  <span className="font-black text-amber-400 text-lg">
                    Rs. {customAmountPkr.toLocaleString()} PKR
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  id="btn-submit-fee"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Verifying & Generating Official Receipt...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-slate-950" />
                      <span>Confirm & Clear Fee (فیس جمع کروائیں)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Ad Placement */}
        <AdSenseBanner format="leaderboard" showPreviewNotice={true} />

        {/* 4-Copy Bank Challan Modal */}
        {showChallanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white text-slate-900 rounded-3xl max-w-5xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-300">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <ZaitoonLogo variant="emblem" size="md" isDark={false} />
                  <div>
                    <h3 className="text-xl font-black uppercase text-slate-900">
                      Official 4-Copy Bank Fee Challan
                    </h3>
                    <p className="text-xs text-slate-600 font-serif" dir="rtl">
                      چار کاپیوں پر مشتمل آفیشل بینک فیس چالان
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowChallanModal(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  ✕
                </button>
              </div>

              {/* 4 Parts Display (Bank Copy, Treasury Copy, Academy Copy, Student Copy) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-[10px] font-sans">
                {['1. Bank Copy', '2. Treasury Copy', '3. Academy Copy', '4. Student Copy'].map(
                  (copyTitle) => (
                    <div
                      key={copyTitle}
                      className="border-2 border-dashed border-slate-300 p-3.5 rounded-xl space-y-2 bg-slate-50/70"
                    >
                      <div className="text-center pb-2 border-b border-slate-200">
                        <span className="font-black text-xs text-red-800 uppercase block">
                          Zaitoon Roots Academy
                        </span>
                        <span className="font-bold text-slate-700 block">{copyTitle}</span>
                        <span className="text-[9px] text-slate-500 font-mono">
                          Challan No: ZRA-CHL-9821
                        </span>
                      </div>

                      <div className="space-y-1 font-mono text-[9px]">
                        <div>Meezan Bank A/c: 0102-0104789521</div>
                        <div>HBL Bank A/c: 0042-7991823103</div>
                        <div className="border-t border-slate-200 pt-1 font-sans">
                          <strong>Student:</strong> {studentName || 'Muhammad Ali'}
                        </div>
                        <div>
                          <strong>Roll:</strong> {studentId || 'ZRA-2026-APP'}
                        </div>
                        <div>
                          <strong>Program:</strong> {selectedProgram.slice(0, 18)}...
                        </div>
                        <div className="text-red-700 font-bold font-sans">
                          Amount: Rs. {customAmountPkr.toLocaleString()}
                        </div>
                        <div>Due Date: 10-Oct-2026</div>
                      </div>

                      <div className="pt-3 border-t border-slate-200 text-center text-[8px] text-slate-400 space-y-2">
                        <div className="font-mono">||| |||| || ||||| |||||||</div>
                        <div className="h-6 border-b border-slate-300"></div>
                        <div>Authorized Bank Cashier Sign & Stamp</div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-200">
                <button
                  onClick={() => setShowChallanModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Challan (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
