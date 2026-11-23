import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useStore();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-modal border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-white/95 border-bakery-sage/30 text-bakery-blackberry'
              : toast.type === 'error'
              ? 'bg-white/95 border-bakery-raspberry/40 text-bakery-raspberry'
              : 'bg-white/95 border-bakery-border text-bakery-blackberry'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-bakery-sage shrink-0" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-bakery-raspberry shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-bakery-caramel shrink-0" />
            )}
            <span className="text-sm font-medium leading-snug">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 hover:bg-black/5 rounded-full text-bakery-muted hover:text-bakery-blackberry transition-colors ml-2 shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
