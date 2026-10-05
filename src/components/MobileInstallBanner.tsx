import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from '../utils/usePWAInstall';

interface MobileInstallBannerProps {
  onOpenModal: () => void;
}

export const MobileInstallBanner: React.FC<MobileInstallBannerProps> = ({ onOpenModal }) => {
  const { isStandalone, isInstallable, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('pwa_banner_dismissed') === 'true';
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  if (isStandalone || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      const res = await install();
      if (!res) {
        onOpenModal();
      }
    } else {
      onOpenModal();
    }
  };

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-slate-900/95 backdrop-blur-md text-white p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 min-w-0">
        <img
          src="/pwa-192x192.png"
          alt="ZRA App Icon"
          className="w-10 h-10 rounded-xl flex-shrink-0 border border-amber-400/60 shadow"
        />
        <div className="min-w-0">
          <p className="text-xs font-bold text-white truncate flex items-center gap-1.5">
            <span>ZRA Official App</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-amber-400 text-slate-950 font-black rounded">Rs. 100</span>
          </p>
          <p className="text-[11px] text-amber-300 truncate">
            آفیشل موبائل ایپ (فیس صرف 100 روپے)
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onOpenModal}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow transition transform active:scale-95 flex items-center gap-1 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-950" />
          <span>انسٹال (100 Rs)</span>
        </button>

        <button
          onClick={handleDismiss}
          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
