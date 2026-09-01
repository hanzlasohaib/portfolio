"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";

/**
 * Moves focus to the first field of a dashboard editor form and scrolls it
 * into view (audit D-6).
 */
export function focusDashboardForm(form: HTMLFormElement | null) {
  if (!form) {
    return;
  }

  form.scrollIntoView({ behavior: "smooth", block: "start" });

  const field = form.querySelector<HTMLElement>(
    "input:not([type='hidden']):not([disabled]), textarea:not([disabled]), select:not([disabled])",
  );
  field?.focus();
}

/**
 * Call `requestFormFocus()` in the same event as `setDraft` so the form is
 * focused after the next paint, without an extra React state flag.
 */
export function useDashboardFormFocus(
  formRef: RefObject<HTMLFormElement | null>,
) {
  const pendingRef = useRef(false);

  useLayoutEffect(() => {
    if (!pendingRef.current) {
      return;
    }
    pendingRef.current = false;
    focusDashboardForm(formRef.current);
  });

  return function requestFormFocus() {
    pendingRef.current = true;
  };
}
