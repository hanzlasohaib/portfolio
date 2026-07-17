"use client";

import { useId } from "react";

import { Label } from "@/components/label";
import { cn } from "@/lib/utils";

import {
  choiceControlClassName,
  choiceRowClassName,
  fieldMessageClassName,
  fieldWrapperClassName,
} from "../input/field-styles";
import type { RadioProps } from "./radio.types";

export function Radio({
  label,
  helperText,
  error,
  className,
  id,
  disabled,
  ...props
}: RadioProps) {
  const generatedId = useId();
  const radioId = id ?? generatedId;
  const helperId = `${radioId}-helper`;
  const errorId = `${radioId}-error`;
  const hasError = Boolean(error);
  const describedBy = hasError ? errorId : helperText ? helperId : undefined;

  return (
    <div className={fieldWrapperClassName}>
      <div className={choiceRowClassName}>
        <input
          type="radio"
          id={radioId}
          disabled={disabled}
          aria-describedby={describedBy}
          className={cn(
            choiceControlClassName(hasError, "rounded-pill"),
            className,
          )}
          {...props}
        />

        {label ? <Label htmlFor={radioId}>{label}</Label> : null}
      </div>

      {hasError ? (
        <p id={errorId} className={fieldMessageClassName.error} role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className={fieldMessageClassName.helper}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
