import React from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../utils/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenModal: () => void;
  variant?: 'header' | 'drawer' | 'footer' | 'floating';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onOpenModal,
  variant = 'header',
  className = '',
}) => {
  const { isInstallable, isStandalone, install } = usePWAInstall();

  // If already installed and running standalone, do not clutter
  if (isStandalone) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenModal();
  };

  if (variant === 'drawer') {
    return (
      <button
        onClick={handleClick}
        className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${className}`}
        id="drawer-install-app-btn"
      >
        <Download className="w-4 h-4 animate-bounce" />
        <span>Install App (ایپ ڈاؤنلوڈ اور انسٹال کریں)</span>
      </button>
    );
  }

  if (variant === 'floating') {
    return (
      <button
        onClick={handleClick}
        className={`fixed bottom-20 left-4 z-40 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white border border-amber-400/50 shadow-2xl flex items-center gap-2 text-xs font-bold transition-all transform hover:scale-105 backdrop-blur-md cursor-pointer ${className}`}
        id="floating-install-app-btn"
        title="Download and Install Zaitoon Roots Academy App"
      >
        <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
          <Download className="w-3.5 h-3.5" />
        </div>
        <span className="hidden sm:inline">Install App</span>
        <span className="text-amber-300">ایپ انسٹال</span>
      </button>
    );
  }

  if (variant === 'footer') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer ${className}`}
        id="footer-install-app-btn"
      >
        <Smartphone className="w-4 h-4" />
        <span>Download Mobile App (موبائل ایپ)</span>
      </button>
    );
  }

  // Default: Header button
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm transform hover:-translate-y-0.5 cursor-pointer bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 border border-amber-300/40 ${className}`}
      id="header-install-app-btn"
      title="Install Zaitoon Roots Academy App on Android, iOS, or PC"
    >
      <Download className="w-3.5 h-3.5 animate-pulse text-red-900" />
      <span className="hidden md:inline">Install App</span>
      <span className="text-[11px] font-extrabold">(ایپ انسٹال)</span>
    </button>
  );
};
