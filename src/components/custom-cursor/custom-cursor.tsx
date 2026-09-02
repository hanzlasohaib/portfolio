"use client";

import { useEffect, useRef, useState } from "react";

const DOCUMENT_CURSOR_CLASS = "has-custom-cursor";
const RING_LERP = 0.18;
const SETTLE_DISTANCE_SQ = 0.09;
const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button:not(:disabled)",
  "[role='button']",
  "summary",
  "label",
  "input[type='button']",
  "input[type='submit']",
  "input[type='reset']",
  "input[type='checkbox']",
  "input[type='radio']",
  "select",
].join(",");
const TEXT_FIELD_SELECTOR = [
  "input:not([type='button']):not([type='submit']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='file'])",
  "textarea",
  "[contenteditable='true']",
].join(",");

function canUseCustomCursor(): boolean {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function isElement(target: EventTarget | null): target is Element {
  return target instanceof Element;
}

/**
 * Public-page pointer: a `--primary` dot with a lagging ring.
 * Disabled on touch, coarse pointers, and reduced motion.
 * Native cursor returns over text fields.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringShapeRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncCapability = () => {
      setEnabled(canUseCustomCursor());
    };

    syncCapability();
    pointerQuery.addEventListener("change", syncCapability);
    motionQuery.addEventListener("change", syncCapability);

    return () => {
      pointerQuery.removeEventListener("change", syncCapability);
      motionQuery.removeEventListener("change", syncCapability);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    const ringShape = ringShapeRef.current;

    if (!dot || !ring || !ringShape) {
      return;
    }

    const root = document.documentElement;
    root.classList.add(DOCUMENT_CURSOR_CLASS);

    let pointerX = 0;
    let pointerY = 0;
    let ringX = 0;
    let ringY = 0;
    let ringInitialized = false;
    let frame = 0;
    let running = false;
    let visible = false;

    const setVisible = (next: boolean) => {
      if (visible === next) {
        return;
      }

      visible = next;
      dot.classList.toggle("is-visible", next);
      ring.classList.toggle("is-visible", next);
    };

    const applyTransforms = () => {
      const dotTransform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      const ringTransform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = dotTransform;
      ring.style.transform = ringTransform;
    };

    const tick = () => {
      ringX += (pointerX - ringX) * RING_LERP;
      ringY += (pointerY - ringY) * RING_LERP;
      applyTransforms();

      const dx = pointerX - ringX;
      const dy = pointerY - ringY;

      if (dx * dx + dy * dy > SETTLE_DISTANCE_SQ) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      ringX = pointerX;
      ringY = pointerY;
      applyTransforms();
      running = false;
    };

    const startLoop = () => {
      if (running) {
        return;
      }

      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const target = event.target;
      const overTextField = isElement(target) && Boolean(target.closest(TEXT_FIELD_SELECTOR));

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!ringInitialized) {
        ringX = pointerX;
        ringY = pointerY;
        ringInitialized = true;
        applyTransforms();
      }

      setVisible(!overTextField);
      ringShape.classList.toggle(
        "is-active",
        !overTextField && isElement(target) && Boolean(target.closest(INTERACTIVE_SELECTOR)),
      );
      startLoop();
    };

    const onPointerLeave = () => {
      setVisible(false);
      ringShape.classList.remove("is-active");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
      root.classList.remove(DOCUMENT_CURSOR_CLASS);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={ringShapeRef} className="cursor-ring-shape" />
      </div>
    </>
  );
}
