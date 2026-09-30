import React from 'react';
import { useOnlineStatus } from '../utils/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-amber-600/95 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-white shadow-xl border border-amber-400/40 animate-bounce"
    >
      <WifiOff className="w-4 h-4 text-white" />
      <span>آپ آف لائن ہیں — آف لائن موڈ میں محفوظ شدہ ڈیٹا دستیاب ہے۔</span>
    </div>
  );
};
