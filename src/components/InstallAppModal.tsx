import React, { useState } from 'react';
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
  BellRing
} from 'lucide-react';
import { usePWAInstall } from '../utils/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isStandalone, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'auto' | 'android' | 'ios' | 'pc'>('auto');
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const res = await install();
      if (res) {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2500);
      }
    } else {
      // If prompt isn't directly triggerable, guide the user to the correct tab
      if (isIOS) {
        setActiveTab('ios');
      } else {
        setActiveTab('android');
      }
    }
  };

  const handleDownloadShortcut = () => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-800 dark:text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header with App Branding */}
        <div className="relative bg-gradient-to-r from-[#8B0000] via-[#A00000] to-[#600000] text-white p-6 pb-7">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-lg border-2 border-amber-400/80 flex-shrink-0">
              <img
                src="/pwa-192x192.png"
                alt="Zaitoon Roots Academy App Icon"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white tracking-tight">Zaitoon Roots Academy App</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                  Official PWA
                </span>
              </div>
              <p className="text-xs text-rose-100 mt-0.5">
                زیتون روٹس اکیڈمی کی آفیشل موبائل و کمپیوٹر ایپ انسٹال اور ڈاؤنلوڈ کریں
              </p>
              <p className="text-[11px] text-amber-200 font-medium mt-1">
                Version 2026.2 • Fast • Lightweight (&lt;1MB) • Free
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {installSuccess ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-2xl p-5 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
              <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                ایپ کامیابی سے انسٹال ہو گئی ہے!
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                Zaitoon Roots Academy app has been added to your Home Screen.
              </p>
            </div>
          ) : isStandalone || isInstalled ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-2xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  یہ ایپ آپ کی ڈیوائس پر پہلے سے انسٹال شدہ ہے!
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                  You are already running or have installed this app. You can find it on your home screen or apps list.
                </p>
              </div>
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleInstallClick}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-700 hover:from-red-800 to-red-600 text-white font-bold text-sm shadow-lg hover:shadow-red-700/25 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Download className="w-5 h-5 animate-bounce" />
              <span>{isInstallable ? 'Install App (ابھی انسٹال کریں)' : 'Get Mobile / PC App'}</span>
            </button>

            <button
              onClick={handleDownloadShortcut}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm flex items-center justify-center gap-2 transition border border-slate-300 dark:border-slate-700 cursor-pointer"
              title="Download Desktop / Mobile Quick Launcher Shortcut"
            >
              <Smartphone className="w-5 h-5 text-amber-500" />
              <span>Download Shortcut (شارٹ کٹ)</span>
            </button>
          </div>

          {/* Device Tabs */}
          <div>
            <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('auto')}
                className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition ${
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
                className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition ${
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
                className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition ${
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
                className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition ${
                  activeTab === 'pc'
                    ? 'border-red-700 text-red-700 dark:text-red-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Laptop className="w-3.5 h-3.5 text-blue-500" />
                <span>Windows / PC</span>
              </button>
            </div>

            <div className="pt-4">
              {activeTab === 'auto' && (
                <div className="grid grid-cols-2 gap-3">
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
                      اوپر دیے گئے <strong>"Install App"</strong> بٹن پر کلک کریں۔
                    </li>
                    <li>
                      اگر پرامپٹ ظاہر نہ ہو، تو براؤزر کے اوپر دائیں کونے میں <strong>3 ڈاٹس (⋮)</strong> پر ٹیپ کریں۔
                    </li>
                    <li>
                      <strong>"Install app"</strong> یا <strong>"Add to Home screen"</strong> (ہوم اسکرین پر شامل کریں) منتخب کریں۔
                    </li>
                    <li>
                      ایپ کا آئیکن آپ کے موبائل کے ہوم پیج پر شامل ہو جائے گا۔
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
                      ایپ آپ کے ڈیسک ٹاپ اور اسٹارٹ مینو میں بطور آزاد ایپلی کیشن پن ہو جائے گی۔
                    </li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            ZRA Islamabad Official App Portal
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
          >
            بند کریں (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
