"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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
  exiting?: boolean;
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
const TOAST_EXIT_MS = 160;
const MAX_VISIBLE_TOASTS = 3;

export type ToastProviderProps = {
  children: ReactNode;
};

/**
 * Renders the toast region in-tree (fixed positioning) so SSR and client
 * markup match — no portal / mount effect required.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => {
      const target = current.find((item) => item.id === id);
      if (!target || target.exiting) {
        return current;
      }

      return current.map((item) =>
        item.id === id ? { ...item, exiting: true } : item,
      );
    });

    window.setTimeout(() => {
      setToasts((open) => open.filter((item) => item.id !== id));
    }, TOAST_EXIT_MS);
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const variant = input.variant ?? "info";
      const durationMs = input.durationMs ?? DEFAULT_DURATION_MS;

      setToasts((current) => {
        const active = current.filter((item) => !item.exiting);
        const overflowIds = active
          .slice(0, Math.max(0, active.length - MAX_VISIBLE_TOASTS + 1))
          .map((item) => item.id);

        const marked = current.map((item) =>
          overflowIds.includes(item.id) ? { ...item, exiting: true } : item,
        );

        if (overflowIds.length > 0) {
          queueMicrotask(() => {
            for (const overflowId of overflowIds) {
              window.setTimeout(() => {
                setToasts((open) =>
                  open.filter((item) => item.id !== overflowId),
                );
              }, TOAST_EXIT_MS);
            }
          });
        }

        return [
          ...marked,
          {
            id,
            title: input.title,
            message: input.message,
            variant,
            durationMs,
          },
        ];
      });

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
              item.exiting ? "animate-toast-out" : "animate-toast-in",
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
      </div>
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
