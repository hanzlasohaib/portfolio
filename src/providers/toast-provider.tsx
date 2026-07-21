"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info";

export type ToastInput = {
  title?: string;
  message: string;
  variant?: ToastVariant;
  durationMs?: number;
};

type ToastItem = ToastInput & {
  id: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const variantClassName: Record<ToastVariant, string> = {
  success: "border-success/40 bg-success/15 text-success",
  error: "border-danger/40 bg-danger/15 text-danger",
  info: "border-border bg-surface text-text-primary",
};

const DEFAULT_DURATION_MS = 4200;

export type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const variant = input.variant ?? "info";
      const durationMs = input.durationMs ?? DEFAULT_DURATION_MS;

      setToasts((current) => [
        ...current,
        {
          id,
          title: input.title,
          message: input.message,
          variant,
          durationMs,
        },
      ]);

      window.setTimeout(() => dismiss(id), durationMs);
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toast,
      success: (message, title = "Success") =>
        toast({ message, title, variant: "success" }),
      error: (message, title = "Error") =>
        toast({ message, title, variant: "error" }),
      info: (message, title = "Notice") =>
        toast({ message, title, variant: "info" }),
    }),
    [toast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted
        ? createPortal(
            <div
              className="pointer-events-none fixed inset-x-0 bottom-0 flex flex-col items-end gap-2 p-4 sm:p-6"
              style={{ zIndex: "var(--z-toast)" }}
              aria-live="polite"
              aria-relevant="additions"
            >
              {toasts.map((item) => (
                <div
                  key={item.id}
                  role={item.variant === "error" ? "alert" : "status"}
                  className={cn(
                    "pointer-events-auto w-full max-w-sm rounded-lg border px-4 py-3 shadow-medium",
                    variantClassName[item.variant],
                  )}
                >
                  {item.title ? (
                    <p className="m-0 mb-1 text-small font-medium">{item.title}</p>
                  ) : null}
                  <p className="m-0 text-small">{item.message}</p>
                  <button
                    type="button"
                    className="mt-2 text-caption underline-offset-2 hover:underline"
                    onClick={() => dismiss(item.id)}
                  >
                    Dismiss
                  </button>
                </div>
              ))}
            </div>,
            document.body,
          )
        : null}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider.");
  }
  return context;
}
