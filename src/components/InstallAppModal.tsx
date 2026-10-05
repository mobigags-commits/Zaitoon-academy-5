import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  Laptop,
  Apple,
  CheckCircle2,
  X,
  Share,
  PlusSquare,
  Sparkles,
  ShieldCheck,
  Zap,
  WifiOff,
  BellRing,
  CreditCard,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  Receipt,
  Lock,
  Unlock,
  AlertCircle
} from 'lucide-react';
import { usePWAInstall } from '../utils/usePWAInstall';
import { PageId } from '../types';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: PageId) => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { isInstallable, isInstalled, isStandalone, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'payment' | 'auto' | 'android' | 'ios' | 'pc'>('payment');
  const [installSuccess, setInstallSuccess] = useState(false);

  // Fee & License State
  const APP_FEE_PKR = 100;
  const [isLicensePaid, setIsLicensePaid] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zra_app_license_paid') === 'true';
    }
    return false;
  });

  const [licenseTxId, setLicenseTxId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zra_app_license_txid') || '';
    }
    return '';
  });

  // Payment method selection inside modal
  const [selectedMethod, setSelectedMethod] = useState<'jazzcash' | 'easypaisa' | 'raast'>('jazzcash');
  const [senderDetail, setSenderDetail] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // If already paid when opened, show installation/features tab first
  useEffect(() => {
    if (isLicensePaid) {
      setActiveTab('auto');
    } else {
      setActiveTab('payment');
    }
  }, [isLicensePaid, isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError('');

    const cleanInput = senderDetail.trim();
    if (!cleanInput || cleanInput.length < 4) {
      setVerificationError('برائے مہربانی اپنا درست جاز کیش/ایزی پیسہ موبائل نمبر یا ٹرانزیکشن ID (TID) درج کریں۔');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      // Generate Official License ID
      const generatedPassId = `ZRA-APP100-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().slice(-4)}`;
      localStorage.setItem('zra_app_license_paid', 'true');
      localStorage.setItem('zra_app_license_txid', cleanInput.toUpperCase());
      localStorage.setItem('zra_app_license_pass', generatedPassId);
      localStorage.setItem('zra_app_license_date', new Date().toISOString());

      setIsLicensePaid(true);
      setLicenseTxId(cleanInput.toUpperCase());
      setIsVerifying(false);
      setActiveTab('auto');
    }, 1200);
  };

  const handleInstallClick = async () => {
    // If not paid yet, guide them to pay the Rs. 100 fee first
    if (!isLicensePaid) {
      setActiveTab('payment');
      return;
    }

    if (isInstallable) {
      const res = await install();
      if (res) {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2500);
      }
    } else {
      // If prompt isn't directly triggerable, guide the user to the correct device tab
      if (isIOS) {
        setActiveTab('ios');
      } else {
        setActiveTab('android');
      }
    }
  };

  const handleDownloadShortcut = () => {
    if (!isLicensePaid) {
      setActiveTab('payment');
      return;
    }

    const urlContent = `[InternetShortcut]\nURL=${window.location.origin}\nIconIndex=0\nIconFile=${window.location.origin}/favicon.ico\n`;
    const blob = new Blob([urlContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ZRA-Zaitoon-Roots-Academy.url';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const ownerWhatsAppUrl = `https://wa.me/923447956085?text=${encodeURIComponent(
    `Assalam-o-Alaikum, I am paying Rs. ${APP_FEE_PKR} App downloading & installation fee for Zaitoon Roots Academy App. Please verify my payment. Sender detail / TID: ${senderDetail || 'Pending'}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-800 dark:text-slate-100 max-h-[92vh] flex flex-col font-sans">
        {/* Header with App Branding & Fee Notice */}
        <div className="relative bg-gradient-to-r from-[#8B0000] via-[#A00000] to-[#550000] text-white p-5 sm:p-6 pb-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 sm:gap-4 pr-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 shadow-xl border-2 border-amber-400 flex-shrink-0">
              <img
                src="/pwa-192x192.png"
                alt="Zaitoon Roots Academy App Icon"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Zaitoon Roots Academy App
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950">
                  Fee: Rs. {APP_FEE_PKR}
                </span>
              </div>
              <p className="text-xs text-rose-100 mt-0.5">
                موبائل و کمپیوٹر پر آفیشل ایپ ڈاؤنلوڈ اور لائف ٹائم انسٹالیشن پاس
              </p>
              <div className="flex items-center gap-2 mt-1">
                {isLicensePaid ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/50">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>لائسنس فعال ہے (Paid & Unlocked)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-200 bg-black/30 px-2 py-0.5 rounded-full border border-amber-400/40">
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>ڈاؤنلوڈ و انسٹالیشن فیس: صرف 100 روپے</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-5">
          {installSuccess ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-2xl p-5 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-2 animate-bounce" />
              <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                ایپ کامیابی سے انسٹال ہو گئی ہے!
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                ZRA App has been successfully installed on your device.
              </p>
            </div>
          ) : isStandalone || isInstalled ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-2xl p-3.5 flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  یہ ایپ آپ کی ڈیوائس پر پہلے سے انسٹال شدہ ہے!
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                  Application is installed and active on your home screen or apps launcher.
                </p>
              </div>
            </div>
          ) : null}

          {/* Fee & Owner Direct Payment Box (If not yet paid) */}
          {!isLicensePaid ? (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/70 dark:from-slate-800/80 dark:to-slate-800/40 border-2 border-amber-400/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-amber-200/80 dark:border-slate-700 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                    <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                      ایپ ڈاؤنلوڈ و انسٹالیشن فیس: صرف 100 روپے (Rs. 100)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    یہ نامینل فیس ویب سائٹ کے ذریعے براہ راست اکیڈمی اونر کے رجسٹرڈ آفیشل اکاؤنٹ (<strong>0344-7956085</strong>) کو موصول ہوتی ہے۔ فیس ادا کرنے کے بعد آپ لائف ٹائم ایپ ڈاؤنلوڈ و انسٹال کر سکتے ہیں۔
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xl sm:text-2xl font-black text-red-700 dark:text-amber-400">
                    Rs. 100
                  </span>
                  <p className="text-[10px] text-slate-500 font-semibold">One-time / Lifetime</p>
                </div>
              </div>

              {/* Owner Payment Accounts Selector */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  1. اونر کو فیس بھیجنے کے لیے اکاؤنٹ منتخب کریں:
                </p>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('jazzcash')}
                    className={`py-2 px-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      selectedMethod === 'jazzcash'
                        ? 'border-red-600 bg-red-600 text-white shadow-sm'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-red-400'
                    }`}
                  >
                    <span>JazzCash</span>
                    <span className="text-[9px] font-normal opacity-90">جاز کیش</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('easypaisa')}
                    className={`py-2 px-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      selectedMethod === 'easypaisa'
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    <span>EasyPaisa</span>
                    <span className="text-[9px] font-normal opacity-90">ایزی پیسہ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('raast')}
                    className={`py-2 px-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      selectedMethod === 'raast'
                        ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-sky-400'
                    }`}
                  >
                    <span>Raast (SBP)</span>
                    <span className="text-[9px] font-normal opacity-90">راست زیرو فیس</span>
                  </button>
                </div>

                {/* Selected Method Details Box */}
                <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
                  {selectedMethod === 'jazzcash' && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">JazzCash Mobile Number:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-red-600 text-sm">0344-7956085</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('03447956085', 'jc-num')}
                            className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300"
                            title="Copy number"
                          >
                            {copiedKey === 'jc-num' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">JazzCash Till ID:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-slate-800 dark:text-slate-200">984521</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('984521', 'jc-till')}
                            className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300"
                          >
                            {copiedKey === 'jc-till' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Account Title:</span>
                        <span className="font-bold text-slate-900 dark:text-white">ZAITOON ROOTS ACADEMY</span>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'easypaisa' && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">EasyPaisa Mobile Number:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-emerald-600 text-sm">0344-7956085</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('03447956085', 'ep-num')}
                            className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300"
                          >
                            {copiedKey === 'ep-num' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Merchant Till ID:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-slate-800 dark:text-slate-200">652190</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('652190', 'ep-till')}
                            className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300"
                          >
                            {copiedKey === 'ep-till' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Account Title:</span>
                        <span className="font-bold text-slate-900 dark:text-white">ZAITOON ROOTS ACADEMY</span>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'raast' && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Raast ID (State Bank):</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-sky-600 text-sm">03447956085</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('03447956085', 'raast-num')}
                            className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300"
                          >
                            {copiedKey === 'raast-num' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Beneficiary Title:</span>
                        <span className="font-bold text-slate-900 dark:text-white">ZAITOON ROOTS ACADEMY</span>
                      </div>
                      <p className="text-[10px] text-sky-600 dark:text-sky-400">
                        کسی بھی بینک ایپ (HBL, Meezan, UBL, Alfalah) سے راست کے ذریعے 03447956085 پر زیرو فیس ٹرانسفر کریں۔
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Instant Verification Form */}
              <form onSubmit={handleVerifyPayment} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    2. فیس 100 روپے بھیجنے کے بعد بھیجنے والا نمبر یا Trx ID (TID) لکھیں:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={senderDetail}
                      onChange={(e) => {
                        setSenderDetail(e.target.value);
                        setVerificationError('');
                      }}
                      placeholder="مثلاً: 03001234567 یا TID: 40982348712"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 font-medium"
                    />
                  </div>
                  {verificationError && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{verificationError}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
                  >
                    {isVerifying ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>فیس تصدیق ہو رہی ہے...</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 text-emerald-200" />
                        <span>Confirm 100 Rs Payment & Unlock App</span>
                      </>
                    )}
                  </button>

                  <a
                    href={ownerWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-700/10 hover:bg-emerald-700/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-600/30 flex items-center justify-center gap-2 transition text-center"
                    title="WhatsApp Owner Direct"
                  >
                    <MessageCircle className="w-4 h-4 fill-current text-emerald-600" />
                    <span>اونر واٹس ایپ تصدیق</span>
                  </a>
                </div>

                {/* Direct Portal Payment Option */}
                {onNavigate && (
                  <div className="pt-1 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigate('payment-portal');
                      }}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>یا ویب سائٹ کے آفیشل فیس پورٹل (کارڈز / 1Bill) سے 100 روپے ادا کریں</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </form>
            </div>
          ) : (
            /* License Active Banner */
            <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                    <span>آفیشل ایپ لائسنس فعال ہے (License Active)</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-emerald-600 text-white rounded font-medium">Paid 100 Rs</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                    Ref ID: <span className="font-mono font-bold">{licenseTxId || 'ZRA-APP-LIFETIME'}</span> • Beneficiary: Owner (0344-7956085)
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg shrink-0">
                ✓ Full Access Unlocked
              </span>
            </div>
          )}

          {/* Action Buttons (Install & Shortcut) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleInstallClick}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 cursor-pointer ${
                isLicensePaid
                  ? 'bg-gradient-to-r from-red-700 hover:from-red-800 to-red-600 text-white hover:shadow-red-700/25'
                  : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed'
              }`}
            >
              <Download className={`w-5 h-5 ${isLicensePaid ? 'animate-bounce' : ''}`} />
              <span>
                {!isLicensePaid
                  ? 'پہلے 100 روپے فیس ادا کریں (Locked)'
                  : isInstallable
                  ? 'Install App Now (ابھی ایپ انسٹال کریں)'
                  : 'Install App (موبائل ایپ انسٹال کریں)'}
              </span>
            </button>

            <button
              onClick={handleDownloadShortcut}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition border cursor-pointer ${
                isLicensePaid
                  ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700'
                  : 'bg-slate-200/50 dark:bg-slate-800/40 text-slate-400 border-slate-200 dark:border-slate-800 cursor-not-allowed'
              }`}
              title="Download Desktop / Mobile Quick Launcher Shortcut"
            >
              <Smartphone className="w-5 h-5 text-amber-500" />
              <span>Download Shortcut (شارٹ کٹ ڈاؤنلوڈ)</span>
            </button>
          </div>

          {/* Device Tabs & Instructions */}
          <div>
            <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold overflow-x-auto">
              <button
                onClick={() => setActiveTab('auto')}
                className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition shrink-0 ${
                  activeTab === 'auto'
                    ? 'border-red-700 text-red-700 dark:text-red-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Features (خصوصیات)</span>
              </button>
              <button
                onClick={() => setActiveTab('android')}
                className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition shrink-0 ${
                  activeTab === 'android'
                    ? 'border-red-700 text-red-700 dark:text-red-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                <span>Android (اینڈرائیڈ)</span>
              </button>
              <button
                onClick={() => setActiveTab('ios')}
                className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition shrink-0 ${
                  activeTab === 'ios'
                    ? 'border-red-700 text-red-700 dark:text-red-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Apple className="w-3.5 h-3.5 text-slate-800 dark:text-white" />
                <span>iPhone / iPad</span>
              </button>
              <button
                onClick={() => setActiveTab('pc')}
                className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition shrink-0 ${
                  activeTab === 'pc'
                    ? 'border-red-700 text-red-700 dark:text-red-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Laptop className="w-3.5 h-3.5 text-blue-500" />
                <span>Windows / PC</span>
              </button>
              {!isLicensePaid && (
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition shrink-0 ${
                    activeTab === 'payment'
                      ? 'border-red-700 text-red-700 dark:text-red-400 font-black'
                      : 'border-transparent text-red-600 dark:text-amber-400'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>100 Rs Payment (فیس تفصیل)</span>
                </button>
              )}
            </div>

            <div className="pt-4">
              {activeTab === 'auto' && (
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <Zap className="w-5 h-5 text-amber-500 mb-1" />
                    <h5 className="text-xs font-bold">بجلی جیسی تیز رفتار</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      براؤزر کے بغیر فل اسکرین نیٹیو ایپ کا تجربہ۔
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <WifiOff className="w-5 h-5 text-blue-500 mb-1" />
                    <h5 className="text-xs font-bold">آف لائن رسائی</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      انٹرنیٹ کے بغیر بھی 120+ ڈگریز اور 80+ کورسز دیکھیں۔
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 mb-1" />
                    <h5 className="text-xs font-bold">ڈگری و ڈپلوما ویریفکیشن</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      طالب علم کے سرٹیفکیٹ کی فوری اصلیت تصدیق۔
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <BellRing className="w-5 h-5 text-red-500 mb-1" />
                    <h5 className="text-xs font-bold">داخلہ اور فیس الرٹس</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      ایڈمیشن، امتحانات اور 100% اسکالرشپ کی تازہ ترین اپڈیٹس۔
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'android' && (
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-500" />
                    <span>How to Install on Android (Chrome / Samsung Internet):</span>
                  </h5>
                  <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300">
                    <li>
                      100 روپے فیس ادائیگی کی تصدیق کے بعد <strong>"Install App Now"</strong> بٹن دبائیں۔
                    </li>
                    <li>
                      اگر خودکار پرامپٹ نہ آئے، تو براؤزر کے اوپر دائیں کونے میں <strong>3 ڈاٹس (⋮)</strong> پر ٹیپ کریں۔
                    </li>
                    <li>
                      <strong>"Install app"</strong> یا <strong>"Add to Home screen"</strong> (ہوم اسکرین پر شامل کریں) منتخب کریں۔
                    </li>
                    <li>
                      ایپ کا آئیکن فوری طور پر آپ کے فون کے ہوم پیج پر لگ جائے گا۔
                    </li>
                  </ol>
                </div>
              )}

              {activeTab === 'ios' && (
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Apple className="w-4 h-4 text-slate-900 dark:text-white" />
                    <span>How to Install on iPhone / iPad (Safari):</span>
                  </h5>
                  <div className="space-y-2 text-slate-600 dark:text-slate-300">
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="p-1 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-600">
                        <Share className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">مرحلہ 1: Safari میں Share بٹن دبائیں</p>
                        <p className="text-[11px] text-slate-500">
                          نیچے ٹول بار میں Share (مربع جس میں اوپر تیر کا نشان ہے) پر ٹیپ کریں۔
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="p-1 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600">
                        <PlusSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">مرحلہ 2: "Add to Home Screen" منتخب کریں</p>
                        <p className="text-[11px] text-slate-500">
                          مینو میں نیچے سکرول کریں اور "Add to Home Screen" دبائیں، پھر اوپر "Add" پر کلک کریں۔
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pc' && (
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-blue-500" />
                    <span>How to Install on Windows / Mac / Chromebook:</span>
                  </h5>
                  <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300">
                    <li>
                      Google Chrome یا Microsoft Edge میں اوپر ایڈریس بار (URL Bar) کے دائیں جانب <strong>کمپیوٹر/ڈاؤنلوڈ آئیکن</strong> پر کلک کریں۔
                    </li>
                    <li>
                      <strong>"Install Zaitoon Roots Academy"</strong> پر کلک کریں۔
                    </li>
                    <li>
                      ایپ آپ کے ڈیسک ٹاپ اور اسٹارٹ مینو میں پن ہو جائے گی جسے براؤزر کھولے بغیر براہ راست چلایا جا سکتا ہے۔
                    </li>
                  </ol>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <p>
                    ایپ ڈاؤنلوڈ اور انسٹالیشن کی معمولی فیس صرف 100 روپے مقرر ہے۔ یہ فیس اکیڈمی کے سرور، آف لائن ڈیٹا بیس اور آفیشل PWA کنٹینر مینٹیننس کے لیے براہ راست اکیڈمی اونر کے اکاؤنٹ میں جمع ہوتی ہے۔
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                    جاز کیش / ایزی پیسہ / راست: 0344-7956085 (Title: ZAITOON ROOTS ACADEMY)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500">
            ZRA Islamabad • Owner Helpline: 0344-7956085
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer"
          >
            بند کریں (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
