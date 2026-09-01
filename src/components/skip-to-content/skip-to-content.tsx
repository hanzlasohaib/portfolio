"use client";

/**
 * Skip-to-content control. Visual treatment lives in `.skip-link`
 * (`src/styles/globals.css`) so this component does not duplicate styles.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={() => {
        const main = document.getElementById("main-content");
        if (!(main instanceof HTMLElement)) {
          return;
        }

        window.requestAnimationFrame(() => {
          main.focus();
        });
      }}
    >
      Skip to main content
    </a>
  );
}
