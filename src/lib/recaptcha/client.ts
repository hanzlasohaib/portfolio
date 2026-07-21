/**
 * Client-side Google reCAPTCHA v3 helper (ADR-010).
 */

const SCRIPT_ID = "recaptcha-v3-script";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

function getSiteKey(): string | null {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return key && key.length > 0 ? key : null;
}

function loadScript(siteKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("reCAPTCHA requires a browser."));
  }

  if (window.grecaptcha) {
    return new Promise((resolve) => {
      window.grecaptcha?.ready(() => resolve());
    });
  }

  const existing = document.getElementById(SCRIPT_ID);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => {
        window.grecaptcha?.ready(() => resolve());
      });
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load reCAPTCHA.")),
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.onload = () => {
      window.grecaptcha?.ready(() => resolve());
    };
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA."));
    document.head.appendChild(script);
  });
}

/**
 * Returns a reCAPTCHA v3 token for the given action, or undefined when
 * the public site key is not configured.
 */
export async function getRecaptchaToken(
  action: string,
): Promise<string | undefined> {
  const siteKey = getSiteKey();
  if (!siteKey) {
    return undefined;
  }

  await loadScript(siteKey);

  if (!window.grecaptcha) {
    throw new Error("reCAPTCHA failed to initialize.");
  }

  return window.grecaptcha.execute(siteKey, { action });
}
