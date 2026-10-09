import React, { useState, useEffect } from 'react';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  History,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Building2,
  Clock,
  Printer,
  X,
  CreditCard,
  QrCode,
  Zap,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Lock
} from 'lucide-react';
import { WalletTransaction } from '../data/paymentMethodsData';

interface DepositWithdrawDeskProps {
  initialTab?: 'deposit' | 'withdraw' | 'history' | 'overview';
  onClose?: () => void;
  isModal?: boolean;
}

const DEFAULT_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'TXN-101',
    type: 'deposit',
    amountPkr: 2500,
    method: 'JazzCash',
    accountTitle: 'ZAITOON ROOTS ACADEMY',
    accountNumber: '0344-7956085',
    purpose: 'Student Account Advance Deposit (فیس ایڈوانس)',
    status: 'Completed',
    timestamp: '2026-10-06 14:32',
    referenceId: 'ZRA-DEP-884219',
    notes: 'Verified via JazzCash Till 984521'
  },
  {
    id: 'TXN-102',
    type: 'withdraw',
    amountPkr: 1000,
    method: 'EasyPaisa',
    accountTitle: 'Muhammad Usman',
    accountNumber: '0312-9876543',
    purpose: 'Merit Scholarship Stipend (ماہانہ وظیفہ)',
    status: 'Completed',
    timestamp: '2026-10-07 10:15',
    referenceId: 'ZRA-WTH-552190',
    notes: 'Approved & Sent to EasyPaisa'
  }
];

export const DepositWithdrawDesk: React.FC<DepositWithdrawDeskProps> = ({
  initialTab = 'overview',
  onClose,
  isModal = false
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'withdraw' | 'history'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Wallet Balance (Stored in localStorage)
  const [balance, setBalance] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zra_wallet_balance');
      if (saved) return Number(saved);
    }
    return 3500; // Default active demo balance in PKR
  });

  // Transactions History (Stored in localStorage)
  const [transactions, setTransactions] = useState<WalletTransaction[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zra_wallet_transactions');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_TRANSACTIONS;
        }
      }
    }
    return DEFAULT_TRANSACTIONS;
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('zra_wallet_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('zra_wallet_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // ----------------- DEPOSIT STATE -----------------
  const [depositAmount, setDepositAmount] = useState<number>(1000);
  const [depositPurpose, setDepositPurpose] = useState('Student Fee Advance (فیس ایڈوانس)');
  const [depositMethod, setDepositMethod] = useState<'jazzcash' | 'easypaisa' | 'raast' | 'bank'>('jazzcash');
  const [depositorName, setDepositorName] = useState('');
  const [depositorPhone, setDepositorPhone] = useState('');
  const [depositTxId, setDepositTxId] = useState('');
  const [depositSuccessVoucher, setDepositSuccessVoucher] = useState<WalletTransaction | null>(null);
  const [depositError, setDepositError] = useState('');
  const [isProcessingDeposit, setIsProcessingDeposit] = useState(false);

  // ----------------- WITHDRAW STATE -----------------
  const [withdrawAmount, setWithdrawAmount] = useState<number>(500);
  const [withdrawPurpose, setWithdrawPurpose] = useState('Fee Refund (فیس ریفنڈ درخواست)');
  const [withdrawChannel, setWithdrawChannel] = useState<'jazzcash' | 'easypaisa' | 'raast' | 'bank'>('jazzcash');
  const [withdrawAccountTitle, setWithdrawAccountTitle] = useState('');
  const [withdrawAccountNumber, setWithdrawAccountNumber] = useState('');
  const [withdrawBankName, setWithdrawBankName] = useState('Meezan Bank');
  const [studentRollNo, setStudentRollNo] = useState('');
  const [securityPin, setSecurityPin] = useState('');
  const [withdrawSuccessVoucher, setWithdrawSuccessVoucher] = useState<WalletTransaction | null>(null);
  const [withdrawError, setWithdrawError] = useState('');
  const [isProcessingWithdraw, setIsProcessingWithdraw] = useState(false);

  // Handle Deposit Submission
  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDepositError('');

    if (!depositorName.trim() || !depositorPhone.trim()) {
      setDepositError('براہ کرم اپنا نام اور رابطہ فون نمبر درج کریں۔');
      return;
    }
    if (!depositTxId.trim() || depositTxId.trim().length < 4) {
      setDepositError('براہ کرم درست جاز کیش/ایزی پیسہ/راست ٹرانزیکشن ID (TID) درج کریں۔');
      return;
    }
    if (depositAmount < 100) {
      setDepositError('کم سے کم ڈپازٹ رقم 100 روپے ہے۔');
      return;
    }

    setIsProcessingDeposit(true);
    setTimeout(() => {
      const generatedRef = `ZRA-DEP-${Math.floor(100000 + Math.random() * 900000)}`;
      const newTxn: WalletTransaction = {
        id: `TXN-${Date.now().toString().slice(-5)}`,
        type: 'deposit',
        amountPkr: depositAmount,
        method:
          depositMethod === 'jazzcash'
            ? 'JazzCash (0344-7956085)'
            : depositMethod === 'easypaisa'
            ? 'EasyPaisa (0344-7956085)'
            : depositMethod === 'raast'
            ? 'Raast (03447956085)'
            : 'Bank Transfer (Meezan)',
        accountTitle: depositorName,
        accountNumber: depositorPhone,
        purpose: depositPurpose,
        status: 'Completed',
        timestamp: new Date().toLocaleString('en-US', {
          dateStyle: 'short',
          timeStyle: 'short'
        }),
        referenceId: generatedRef,
        notes: `TID: ${depositTxId.toUpperCase()} • Depositor: ${depositorName}`
      };

      setBalance((prev) => prev + depositAmount);
      setTransactions((prev) => [newTxn, ...prev]);
      setDepositSuccessVoucher(newTxn);
      setIsProcessingDeposit(false);
    }, 1200);
  };

  // Handle Withdraw Submission
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError('');

    if (withdrawAmount < 100) {
      setWithdrawError('کم از کم ودڈرا رقم 100 روپے مقرر ہے۔');
      return;
    }
    if (withdrawAmount > balance) {
      setWithdrawError(`آپ کے والٹ میں ناکافی بیلنس ہے۔ دستیاب بیلنس: Rs. ${balance.toLocaleString()}`);
      return;
    }
    if (!withdrawAccountTitle.trim() || !withdrawAccountNumber.trim()) {
      setWithdrawError('براہ کرم اکاؤنٹ ہولڈر کا نام اور اکاؤنٹ نمبر/IBAN درج کریں۔');
      return;
    }

    setIsProcessingWithdraw(true);
    setTimeout(() => {
      const generatedRef = `ZRA-WTH-${Math.floor(100000 + Math.random() * 900000)}`;
      const newTxn: WalletTransaction = {
        id: `TXN-${Date.now().toString().slice(-5)}`,
        type: 'withdraw',
        amountPkr: withdrawAmount,
        method:
          withdrawChannel === 'jazzcash'
            ? `JazzCash (${withdrawAccountNumber})`
            : withdrawChannel === 'easypaisa'
            ? `EasyPaisa (${withdrawAccountNumber})`
            : withdrawChannel === 'raast'
            ? `Raast ID (${withdrawAccountNumber})`
            : `${withdrawBankName} (${withdrawAccountNumber})`,
        accountTitle: withdrawAccountTitle,
        accountNumber: withdrawAccountNumber,
        purpose: withdrawPurpose,
        status: 'Processing',
        timestamp: new Date().toLocaleString('en-US', {
          dateStyle: 'short',
          timeStyle: 'short'
        }),
        referenceId: generatedRef,
        notes: `Recipient: ${withdrawAccountTitle} • Roll/ID: ${studentRollNo || 'General'} • Owner Clearance Pending`
      };

      setBalance((prev) => Math.max(0, prev - withdrawAmount));
      setTransactions((prev) => [newTxn, ...prev]);
      setWithdrawSuccessVoucher(newTxn);
      setIsProcessingWithdraw(false);
    }, 1400);
  };

  const handlePrint = () => {
    window.print();
  };

  // Quick stats
  const totalDeposited = transactions
    .filter((t) => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amountPkr, 0);

  const totalWithdrawn = transactions
    .filter((t) => t.type === 'withdraw')
    .reduce((sum, t) => sum + t.amountPkr, 0);

  const pendingWithdrawals = transactions.filter(
    (t) => t.type === 'withdraw' && t.status === 'Processing'
  ).length;

  return (
    <div className={`w-full font-sans ${isModal ? 'p-1 sm:p-2' : 'py-6'}`}>
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#8B0000] via-[#550000] to-slate-900 p-6 sm:p-8 border-b border-red-900/60 relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-wider">
                  Official Financial Desk
                </span>
                <span className="text-xs text-rose-200">
                  Instant Top-up & Same-Day Withdrawal Payout
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Deposit & Withdraw Portal (ڈپازٹ و ودڈرا ڈیسک)
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 max-w-2xl leading-relaxed">
                زیتون روٹس اکیڈمی کے آفیشل پورٹل سے فیس اور فنڈز ڈپازٹ (جمع) کروائیں یا ریفنڈ، اسکالرشپ وظائف اور سیکیورٹی ڈیپازٹ اپنے جاز کیش، ایزی پیسہ، یا بینک اکاؤنٹ میں فوری ودڈرا کریں۔
              </p>
            </div>

            {/* Live Wallet Balance Pill */}
            <div className="bg-black/40 backdrop-blur-md border border-amber-400/50 rounded-2xl p-4 sm:p-5 text-right shrink-0 min-w-[220px]">
              <span className="text-xs text-amber-300 font-bold block">
                دستیاب والٹ بیلنس (Available Balance)
              </span>
              <div className="flex items-baseline justify-end gap-1 mt-1">
                <span className="text-xs text-slate-400 font-bold">PKR</span>
                <span className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight font-mono">
                  {balance.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span>Account Status:</span>
                <span className="text-emerald-400 font-bold">✓ Active & Verified</span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
            <button
              onClick={() => {
                setActiveTab('overview');
                setDepositSuccessVoucher(null);
                setWithdrawSuccessVoucher(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Overview (ڈیش بورڈ)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('deposit');
                setDepositSuccessVoucher(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'deposit'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Deposit Funds (ڈپازٹ جمع کروائیں)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('withdraw');
                setWithdrawSuccessVoucher(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'withdraw'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Withdraw Funds (ودڈرا رقم نکلوائیں)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('history');
                setDepositSuccessVoucher(null);
                setWithdrawSuccessVoucher(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Ledger & History ({transactions.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Overview Dashboard */}
        {activeTab === 'overview' && (
          <div className="p-6 sm:p-8 space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>کل جمع شدہ رقم (Total Deposited)</span>
                  <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-black text-white font-mono">
                  Rs. {totalDeposited.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-400">All cleared deposits to academy</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>کل نکلوائی گئی رقم (Total Withdrawn)</span>
                  <ArrowUpRight className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl font-black text-white font-mono">
                  Rs. {totalWithdrawn.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-400">Refunds, stipends & releases</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>زیرِ کارروائی ودڈرا (Pending Requests)</span>
                  <Clock className="w-4 h-4 text-sky-400" />
                </div>
                <p className="text-2xl font-black text-white font-mono">
                  {pendingWithdrawals} Request{pendingWithdrawals === 1 ? '' : 's'}
                </p>
                <p className="text-[11px] text-slate-400">Owner payout dispatch window: 1-24h</p>
              </div>
            </div>

            {/* Quick Action Split Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deposit Action Card */}
              <div className="bg-gradient-to-br from-emerald-950/40 to-slate-800/60 border border-emerald-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <ArrowDownLeft className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white">
                    Deposit Funds (فنڈز جمع کروائیں)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    اکیڈمی اونر کے آفیشل اکاؤنٹس (JazzCash, EasyPaisa, Raast, Bank) کے ذریعے فیس پیشگی جمع کروائیں، ہاسٹل سیکیورٹی ادا کریں، یا والٹ ریچارج کریں۔
                  </p>
                  <ul className="text-xs text-emerald-300/90 space-y-1.5 pt-1">
                    <li className="flex items-center gap-1.5">✓ انسٹنٹ والٹ ٹاپ اپ اور ڈیجیٹل سلپ</li>
                    <li className="flex items-center gap-1.5">✓ اونر آفیشل نمبر: 0344-7956085</li>
                    <li className="flex items-center gap-1.5">✓ کم از کم ڈپازٹ: صرف 100 روپے</li>
                  </ul>
                </div>

                <button
                  onClick={() => setActiveTab('deposit')}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>ابھی فنڈز ڈپازٹ کریں (Deposit Now)</span>
                </button>
              </div>

              {/* Withdraw Action Card */}
              <div className="bg-gradient-to-br from-red-950/40 to-slate-800/60 border border-red-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white">
                    Withdraw Funds (رقم نکلوائیں)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    اپنے دستیاب والٹ بیلنس سے اسکالرشپ وظیفہ، اضافی فیس ریفنڈ، یا ہاسٹل سیکیورٹی ڈپازٹ براہ راست اپنے جاز کیش، ایزی پیسہ یا بینک اکاؤنٹ میں حاصل کریں۔
                  </p>
                  <ul className="text-xs text-rose-300/90 space-y-1.5 pt-1">
                    <li className="flex items-center gap-1.5">✓ براہ راست اونر اکاؤنٹ سے ٹرانسفر</li>
                    <li className="flex items-center gap-1.5">✓ زیرو سروس چارجز (100% شفاف)</li>
                    <li className="flex items-center gap-1.5">✓ 1-کلک واٹس ایپ نوٹیفکیشن تصدیق</li>
                  </ul>
                </div>

                <button
                  onClick={() => setActiveTab('withdraw')}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>ودڈرا درخواست جمع کروائیں (Withdraw Now)</span>
                </button>
              </div>
            </div>

            {/* Official Owner Payment Accounts Summary Box */}
            <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>آفیشل اکیڈمی اونر ڈپازٹ اکاؤنٹس (Official Owner Accounts)</span>
                </h4>
                <span className="text-[11px] text-amber-400 font-bold">Helpline: 0344-7956085</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[11px]">JazzCash Account & Till:</span>
                  <span className="font-mono font-bold text-red-400">0344-7956085</span>
                  <span className="block text-[10px] text-slate-400">Till ID: 984521 • Title: ZRA</span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[11px]">EasyPaisa Account & Till:</span>
                  <span className="font-mono font-bold text-emerald-400">0344-7956085</span>
                  <span className="block text-[10px] text-slate-400">Till ID: 652190 • Title: ZRA</span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[11px]">Raast Direct (State Bank):</span>
                  <span className="font-mono font-bold text-sky-400">03447956085</span>
                  <span className="block text-[10px] text-slate-400">Zero Fee from Any Bank App</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Deposit Form & Flow */}
        {activeTab === 'deposit' && (
          <div className="p-6 sm:p-8 space-y-6">
            {depositSuccessVoucher ? (
              /* Deposit Success Slip */
              <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Deposit Successfully Recorded & Credited
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">
                    ڈپازٹ کامیابی سے مکمل ہو گیا ہے!
                  </h3>
                  <p className="text-xs text-slate-300">
                    آپ کے والٹ بیلنس میں <strong>Rs. {depositSuccessVoucher.amountPkr.toLocaleString()}</strong> کا اضافہ کر دیا گیا ہے۔
                  </p>
                </div>

                {/* Printable Deposit Voucher Card */}
                <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left text-xs space-y-2.5 font-mono shadow-inner">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Voucher Ref:</span>
                    <span className="font-bold text-amber-400">{depositSuccessVoucher.referenceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amount Deposited:</span>
                    <span className="font-bold text-emerald-400 text-sm">Rs. {depositSuccessVoucher.amountPkr.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Method:</span>
                    <span className="text-white">{depositSuccessVoucher.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Purpose:</span>
                    <span className="text-slate-300">{depositSuccessVoucher.purpose}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Depositor:</span>
                    <span className="text-white">{depositSuccessVoucher.accountTitle}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-2">
                    <span className="text-slate-400">New Wallet Balance:</span>
                    <span className="font-bold text-emerald-400">Rs. {balance.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/923447956085?text=${encodeURIComponent(
                      `Assalam-o-Alaikum, I have deposited Rs. ${depositSuccessVoucher.amountPkr} to ZRA Owner account. Deposit Ref: ${depositSuccessVoucher.referenceId}. Depositor: ${depositSuccessVoucher.accountTitle}. Please confirm.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Confirm Deposit via WhatsApp (0344-7956085)</span>
                  </a>

                  <button
                    onClick={handlePrint}
                    className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Deposit Slip</span>
                  </button>

                  <button
                    onClick={() => {
                      setDepositSuccessVoucher(null);
                      setActiveTab('overview');
                    }}
                    className="py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition cursor-pointer"
                  >
                    <span>Back to Dashboard</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Deposit Form */
              <form onSubmit={handleDepositSubmit} className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
                    <span>فنڈز ڈپازٹ فارم (Deposit Funds to Academy)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    نیچے دیے گئے اکیڈمی اونر اکاؤنٹ پر رقم منتقل کریں اور فارم جمع کر کے فوری والٹ بیلنس ٹاپ اپ کریں۔
                  </p>
                </div>

                {depositError && (
                  <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-600 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{depositError}</span>
                  </div>
                )}

                {/* 1. Deposit Purpose */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300">
                    1. ڈپازٹ کی نوعیت (Purpose of Deposit):
                  </label>
                  <select
                    value={depositPurpose}
                    onChange={(e) => setDepositPurpose(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Student Fee Advance (فیس ایڈوانس)">Student Fee Advance (فیس ایڈوانس ڈپازٹ)</option>
                    <option value="Degree / Diploma Installment Advance">Degree / Diploma Installment Advance (اقساط ایڈوانس)</option>
                    <option value="Hostel & Room Security Deposit">Hostel & Room Security Deposit (ہاسٹل سیکیورٹی ڈپازٹ)</option>
                    <option value="LMS / App Pass & Portal Credits">LMS / App Pass & Portal Credits (پورٹل کریڈٹس)</option>
                    <option value="General Wallet Balance Top-up">General Wallet Balance Top-up (عام والٹ ریچارج)</option>
                  </select>
                </div>

                {/* 2. Amount Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300">
                    2. ڈپازٹ کی رقم (Deposit Amount PKR):
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {[100, 500, 1000, 2500, 5000, 10000, 25000, 50000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setDepositAmount(amt)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                          depositAmount === amt
                            ? 'bg-emerald-500 text-white shadow'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                        }`}
                      >
                        Rs. {amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm font-mono font-bold text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter custom deposit amount"
                  />
                </div>

                {/* 3. Official Deposit Method Details */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-300">
                    3. فیس بھیجنے کا طریقہ منتخب کریں (Select Payment Channel):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setDepositMethod('jazzcash')}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        depositMethod === 'jazzcash'
                          ? 'border-red-600 bg-red-600/20 text-red-400 shadow-sm'
                          : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>JazzCash</span>
                      <span className="block text-[10px] font-normal opacity-80">ٹِل ID: 984521</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDepositMethod('easypaisa')}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        depositMethod === 'easypaisa'
                          ? 'border-emerald-600 bg-emerald-600/20 text-emerald-400 shadow-sm'
                          : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>EasyPaisa</span>
                      <span className="block text-[10px] font-normal opacity-80">ٹِل ID: 652190</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDepositMethod('raast')}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        depositMethod === 'raast'
                          ? 'border-sky-600 bg-sky-600/20 text-sky-400 shadow-sm'
                          : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>Raast Instant</span>
                      <span className="block text-[10px] font-normal opacity-80">Zero Fee SBP</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDepositMethod('bank')}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        depositMethod === 'bank'
                          ? 'border-amber-600 bg-amber-600/20 text-amber-400 shadow-sm'
                          : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>Bank Transfer</span>
                      <span className="block text-[10px] font-normal opacity-80">Meezan Bank</span>
                    </button>
                  </div>

                  {/* Channel Details Card */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
                    {depositMethod === 'jazzcash' && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Official JazzCash Number:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-red-400 text-sm">0344-7956085</span>
                            <button
                              type="button"
                              onClick={() => handleCopy('03447956085', 'dep-jc')}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                            >
                              {copiedKey === 'dep-jc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-400">Merchant Till ID:</span>
                          <span className="font-mono font-bold text-white">984521</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-400">Account Title:</span>
                          <span className="font-bold text-white">ZAITOON ROOTS ACADEMY</span>
                        </div>
                      </div>
                    )}

                    {depositMethod === 'easypaisa' && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Official EasyPaisa Number:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-emerald-400 text-sm">0344-7956085</span>
                            <button
                              type="button"
                              onClick={() => handleCopy('03447956085', 'dep-ep')}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                            >
                              {copiedKey === 'dep-ep' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-400">Merchant Till ID:</span>
                          <span className="font-mono font-bold text-white">652190</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-400">Account Title:</span>
                          <span className="font-bold text-white">ZAITOON ROOTS ACADEMY</span>
                        </div>
                      </div>
                    )}

                    {depositMethod === 'raast' && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Raast ID (State Bank of Pakistan):</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-sky-400 text-sm">03447956085</span>
                            <button
                              type="button"
                              onClick={() => handleCopy('03447956085', 'dep-raast')}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                            >
                              {copiedKey === 'dep-raast' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-400">Beneficiary:</span>
                          <span className="font-bold text-white">ZAITOON ROOTS ACADEMY</span>
                        </div>
                        <p className="text-[10px] text-sky-400">
                          کسی بھی بینک ایپ سے راست کے ذریعے بغیر کسی فیس کے فوری ٹرانسفر کریں۔
                        </p>
                      </div>
                    )}

                    {depositMethod === 'bank' && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Bank Name:</span>
                          <span className="font-bold text-white">Meezan Bank Ltd (Islamic Banking)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Account Title:</span>
                          <span className="font-bold text-amber-400">ZAITOON ROOTS ACADEMY</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">IBAN Number:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-white">PK72MEZN00010900234871</span>
                            <button
                              type="button"
                              onClick={() => handleCopy('PK72MEZN00010900234871', 'dep-iban')}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                            >
                              {copiedKey === 'dep-iban' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Depositor Details & Transaction Verification */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      ڈپازٹ کرنے والے کا نام (Depositor Name):
                    </label>
                    <input
                      type="text"
                      required
                      value={depositorName}
                      onChange={(e) => setDepositorName(e.target.value)}
                      placeholder="e.g. Ali Ahmed"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      واٹس ایپ / موبائل نمبر (WhatsApp / Phone):
                    </label>
                    <input
                      type="tel"
                      required
                      value={depositorPhone}
                      onChange={(e) => setDepositorPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      ٹرانزیکشن ID / Trx ID (TID):
                    </label>
                    <input
                      type="text"
                      required
                      value={depositTxId}
                      onChange={(e) => setDepositTxId(e.target.value)}
                      placeholder="e.g. 9845217894"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isProcessingDeposit}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
                  >
                    {isProcessingDeposit ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>ڈپازٹ تصدیق ہو رہا ہے...</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownLeft className="w-4 h-4" />
                        <span>Confirm Deposit of Rs. {depositAmount.toLocaleString()}</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://wa.me/923447956085?text=Assalam-o-Alaikum%2C%20I%20want%20to%20deposit%20funds%20in%20Zaitoon%20Roots%20Academy%20account"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Owner WhatsApp (0344-7956085)</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 3: Withdraw Form & Flow */}
        {activeTab === 'withdraw' && (
          <div className="p-6 sm:p-8 space-y-6">
            {withdrawSuccessVoucher ? (
              /* Withdraw Success Slip */
              <div className="bg-gradient-to-br from-red-950/60 to-slate-900 border-2 border-red-500 rounded-3xl p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-red-500/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                    Withdrawal Request Generated & Queued
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">
                    ودڈرا درخواست کامیابی سے جمع ہو گئی ہے!
                  </h3>
                  <p className="text-xs text-slate-300">
                    رقم <strong>Rs. {withdrawSuccessVoucher.amountPkr.toLocaleString()}</strong> اکیڈمی اونر کے ذریعے آپ کے فراہم کردہ اکاؤنٹ میں بھیج دی جائے گی۔
                  </p>
                </div>

                {/* Printable Withdrawal Slip Card */}
                <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left text-xs space-y-2.5 font-mono shadow-inner">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Withdrawal Voucher:</span>
                    <span className="font-bold text-amber-400">{withdrawSuccessVoucher.referenceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amount Payout:</span>
                    <span className="font-bold text-red-400 text-sm">Rs. {withdrawSuccessVoucher.amountPkr.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Destination:</span>
                    <span className="text-white">{withdrawSuccessVoucher.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account Title:</span>
                    <span className="text-white">{withdrawSuccessVoucher.accountTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account / Phone:</span>
                    <span className="text-white">{withdrawSuccessVoucher.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Purpose / Category:</span>
                    <span className="text-slate-300">{withdrawSuccessVoucher.purpose}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-2">
                    <span className="text-slate-400">Remaining Balance:</span>
                    <span className="font-bold text-emerald-400">Rs. {balance.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/923447956085?text=${encodeURIComponent(
                      `Assalam-o-Alaikum, I have submitted a Withdrawal Request of Rs. ${withdrawSuccessVoucher.amountPkr} from ZRA portal. Payout Voucher: ${withdrawSuccessVoucher.referenceId}. Method: ${withdrawSuccessVoucher.method}. Account: ${withdrawSuccessVoucher.accountTitle} (${withdrawSuccessVoucher.accountNumber}). Please approve and send payment.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Instant Notify Owner on WhatsApp (0344-7956085)</span>
                  </a>

                  <button
                    onClick={handlePrint}
                    className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Withdrawal Slip</span>
                  </button>

                  <button
                    onClick={() => {
                      setWithdrawSuccessVoucher(null);
                      setActiveTab('overview');
                    }}
                    className="py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition cursor-pointer"
                  >
                    <span>Back to Dashboard</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Withdraw Form */
              <form onSubmit={handleWithdrawSubmit} className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <ArrowUpRight className="w-5 h-5 text-red-400" />
                    <span>ودڈرا فارم (Withdraw Funds / Payout Request)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    اپنے دستیاب والٹ بیلنس سے رقم اپنے جاز کیش، ایزی پیسہ یا بینک اکاؤنٹ میں منتقل کروائیں۔
                  </p>
                </div>

                {withdrawError && (
                  <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-600 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{withdrawError}</span>
                  </div>
                )}

                {/* Available Balance Notice */}
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                  <span className="text-slate-300">موجودہ والٹ بیلنس (Max Cashout):</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    Rs. {balance.toLocaleString()}
                  </span>
                </div>

                {/* 1. Withdrawal Category */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300">
                    1. ودڈرا کی وجہ (Reason / Payout Category):
                  </label>
                  <select
                    value={withdrawPurpose}
                    onChange={(e) => setWithdrawPurpose(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Fee Refund (فیس ریفنڈ درخواست)">Fee Refund (فیس ریفنڈ / داخلہ واپسی)</option>
                    <option value="Scholarship Monthly Stipend (ماہانہ وظیفہ)">Scholarship Monthly Stipend (ماہانہ اسکالرشپ وظیفہ)</option>
                    <option value="Hostel Security Deposit Refund (ہاسٹل سیکیورٹی واپسی)">Hostel Security Deposit Refund (ہاسٹل سیکیورٹی واپسی)</option>
                    <option value="Campus Ambassador / Referral Payout (کمیشن ادائیگی)">Campus Ambassador / Referral Payout (ایمبیسیڈر کمیشن)</option>
                    <option value="Excess Fee Balance Cashout (اضافی بیلنس واپسی)">Excess Fee Balance Cashout (اضافی فیس بیلنس واپسی)</option>
                  </select>
                </div>

                {/* 2. Amount to Withdraw */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300">
                    2. ودڈرا کی رقم (Withdrawal Amount PKR):
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setWithdrawAmount(Math.round(balance * 0.25))}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                    >
                      25% (Rs. {Math.round(balance * 0.25).toLocaleString()})
                    </button>
                    <button
                      type="button"
                      onClick={() => setWithdrawAmount(Math.round(balance * 0.5))}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                    >
                      50% (Rs. {Math.round(balance * 0.5).toLocaleString()})
                    </button>
                    <button
                      type="button"
                      onClick={() => setWithdrawAmount(Math.round(balance * 0.75))}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                    >
                      75% (Rs. {Math.round(balance * 0.75).toLocaleString()})
                    </button>
                    <button
                      type="button"
                      onClick={() => setWithdrawAmount(balance)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600/30 text-red-300 border border-red-500 hover:bg-red-600/50 cursor-pointer"
                    >
                      100% Full Balance (Rs. {balance.toLocaleString()})
                    </button>
                  </div>
                  <input
                    type="number"
                    min="100"
                    max={balance}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm font-mono font-bold text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter amount to withdraw"
                  />
                  <span className="text-[10px] text-slate-400">
                    کم از کم ودڈرا رقم: Rs. 100 • پروسیسنگ فیس: 0 روپے (بالکل مفت)
                  </span>
                </div>

                {/* 3. Destination Channel */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-300">
                    3. رقم وصول کرنے کا اکاؤنٹ منتخب کریں (Payout Destination):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setWithdrawChannel('jazzcash')}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        withdrawChannel === 'jazzcash'
                          ? 'border-red-600 bg-red-600/20 text-red-400 shadow-sm'
                          : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>JazzCash</span>
                      <span className="block text-[10px] font-normal opacity-80">موبائل اکاؤنٹ</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setWithdrawChannel('easypaisa')}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        withdrawChannel === 'easypaisa'
                          ? 'border-emerald-600 bg-emerald-600/20 text-emerald-400 shadow-sm'
                          : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>EasyPaisa</span>
                      <span className="block text-[10px] font-normal opacity-80">موبائل اکاؤنٹ</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setWithdrawChannel('raast')}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        withdrawChannel === 'raast'
                          ? 'border-sky-600 bg-sky-600/20 text-sky-400 shadow-sm'
                          : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>Raast ID</span>
                      <span className="block text-[10px] font-normal opacity-80">انسٹنٹ ٹرانسفر</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setWithdrawChannel('bank')}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        withdrawChannel === 'bank'
                          ? 'border-amber-600 bg-amber-600/20 text-amber-400 shadow-sm'
                          : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>Bank Account</span>
                      <span className="block text-[10px] font-normal opacity-80">IBAN ٹرانسفر</span>
                    </button>
                  </div>
                </div>

                {/* 4. Recipient Account Details Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      اکاؤنٹ ہولڈر کا نام (Account Title):
                    </label>
                    <input
                      type="text"
                      required
                      value={withdrawAccountTitle}
                      onChange={(e) => setWithdrawAccountTitle(e.target.value)}
                      placeholder="e.g. Muhammad Usman"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      {withdrawChannel === 'bank' ? 'بینک اکاؤنٹ یا IBAN نمبر:' : 'موبائل اکاؤنٹ نمبر / Raast ID:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={withdrawAccountNumber}
                      onChange={(e) => setWithdrawAccountNumber(e.target.value)}
                      placeholder={withdrawChannel === 'bank' ? 'PK00MEZN00010900...' : '0300-1234567'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {withdrawChannel === 'bank' && (
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        بینک کا نام (Bank Name):
                      </label>
                      <input
                        type="text"
                        value={withdrawBankName}
                        onChange={(e) => setWithdrawBankName(e.target.value)}
                        placeholder="Meezan Bank, HBL, Allied Bank, UBL, etc."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      سٹوڈنٹ رجسٹریشن / رول نمبر (Student / Roll ID):
                    </label>
                    <input
                      type="text"
                      value={studentRollNo}
                      onChange={(e) => setStudentRollNo(e.target.value)}
                      placeholder="e.g. ZRA-2026-CS-410"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      سیکیورٹی پن کوڈ (Security PIN):
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={securityPin}
                      onChange={(e) => setSecurityPin(e.target.value)}
                      placeholder="4 Digits (e.g. 1234)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isProcessingWithdraw || balance < 100}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
                  >
                    {isProcessingWithdraw ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>ودڈرا درخواست پروسیس ہو رہی ہے...</span>
                      </>
                    ) : (
                      <>
                        <ArrowUpRight className="w-4 h-4" />
                        <span>Submit Withdrawal Request for Rs. {withdrawAmount.toLocaleString()}</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://wa.me/923447956085?text=Assalam-o-Alaikum%2C%20I%20have%20a%20query%20regarding%20withdrawal%20or%20refund%20from%20ZRA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Owner WhatsApp Support</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 4: Ledger & Transactions History */}
        {activeTab === 'history' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-400" />
                  <span>والٹ ٹرانزیکشن لیجر (Financial History)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  تمام ڈپازٹ اور ودڈرا ٹرانزیکشنز کا مکمل ڈیجیٹل آڈٹ ٹریل
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Ledger</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('کیا آپ ٹرانزیکشن ہسٹری ری سیٹ کرنا چاہتے ہیں؟')) {
                      setTransactions(DEFAULT_TRANSACTIONS);
                      setBalance(3500);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                  title="Reset Demo Data"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              </div>
            </div>

            {/* Transactions List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Method / Details</th>
                    <th className="py-3 px-3">Purpose</th>
                    <th className="py-3 px-3">Ref ID</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3 font-sans">
                        {tx.type === 'deposit' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                            <ArrowDownLeft className="w-3 h-3" />
                            <span>Deposit</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-[11px] font-bold">
                            <ArrowUpRight className="w-3 h-3" />
                            <span>Withdraw</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-bold text-sm">
                        <span className={tx.type === 'deposit' ? 'text-emerald-400' : 'text-red-400'}>
                          {tx.type === 'deposit' ? '+' : '-'}Rs. {tx.amountPkr.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-sans">
                        <p className="font-semibold text-white">{tx.method}</p>
                        <p className="text-[10px] text-slate-400">{tx.accountTitle}</p>
                      </td>
                      <td className="py-3 px-3 font-sans text-slate-300 max-w-xs truncate">
                        {tx.purpose}
                      </td>
                      <td className="py-3 px-3 text-amber-400 font-bold">
                        {tx.referenceId}
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px]">
                        {tx.timestamp}
                      </td>
                      <td className="py-3 px-3 text-right font-sans">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            tx.status === 'Completed' || tx.status === 'Approved'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer info strip */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ZRA Secure Treasury • Direct Owner Verification: 0344-7956085</span>
          </div>
          <p>State Bank of Pakistan Raast Aligned • Zero Service Fee on Payouts</p>
        </div>
      </div>
    </div>
  );
};
