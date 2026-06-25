import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

let toastId = 0;

/**
 * ToastProvider — wrap App dengan ini agar seluruh komponen bisa pakai useToast().
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} aria-label="Tutup">✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/** Hook untuk menampilkan toast dari komponen mana saja */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast harus dipakai di dalam ToastProvider');
  return {
    toast:        (msg) => ctx.addToast(msg, 'info'),
    toastSuccess: (msg) => ctx.addToast(msg, 'success'),
    toastError:   (msg) => ctx.addToast(msg, 'error'),
    toastWarning: (msg) => ctx.addToast(msg, 'warning'),
  };
}