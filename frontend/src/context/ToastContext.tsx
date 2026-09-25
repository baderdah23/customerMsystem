import React, { createContext, useContext, useState, useCallback } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastFunctions: ToastContextType["toast"] = {
  success: () => {},
  error: () => {},
  info: () => {},
};

export const toast = {
  success: (msg: string) => toastFunctions.success(msg),
  error: (msg: string) => toastFunctions.error(msg),
  info: (msg: string) => toastFunctions.info(msg),
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toastMethods = {
    success: (msg: string) => addToast(msg, "success"),
    error: (msg: string) => addToast(msg, "error"),
    info: (msg: string) => addToast(msg, "info"),
  };

  toastFunctions = toastMethods;

  return (
    <ToastContext.Provider value={{ toast: toastMethods }}>
      {children}
      {/* Toast Container Top-Right */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-x-0 animate-in fade-in slide-in-from-top-3 ${
              t.type === "success"
                ? "bg-[#18221c]/95 border-emerald-500/30 text-emerald-100"
                : t.type === "error"
                ? "bg-[#28181c]/95 border-rose-500/30 text-rose-100"
                : "bg-[#18202c]/95 border-blue-500/30 text-blue-100"
            }`}
          >
            <div className="flex items-center gap-3">
              {t.type === "success" && (
                <FaCheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {t.type === "error" && (
                <FaExclamationCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              {t.type === "info" && (
                <FaInfoCircle className="w-5 h-5 text-blue-400 shrink-0" />
              )}
              <span className="text-sm font-medium leading-tight">{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-md"
            >
              <FaTimes className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
};
