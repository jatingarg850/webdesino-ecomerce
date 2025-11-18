'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    info: <AlertCircle className="w-5 h-5 text-blue-600" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md animate-slide-in-right`}>
      <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg ${bgColors[type]}`}>
        {icons[type]}
        <p className={`flex-1 font-medium ${textColors[type]}`}>{message}</p>
        <button
          onClick={onClose}
          className={`p-1 rounded hover:bg-white/50 transition ${textColors[type]}`}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
