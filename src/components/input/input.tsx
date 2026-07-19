"use client";

import { useId } from "react";

import { Label } from "@/components/label";
import { cn } from "@/lib/utils";

import {
  adornmentClassName,
  fieldControlClassName,
  fieldMessageClassName,
  fieldWrapperClassName,
  inputControlClassName,
} from "./field-styles";
import type { InputProps } from "./input.types";

export function Input({
  label,
  helperText,
  error,
  startAdornment,
  endAdornment,
  fullWidth = false,
  className,
  id,
  disabled,
  readOnly,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);
  const describedBy = hasError ? errorId : helperText ? helperId : undefined;

  return (
    <div className={cn(fieldWrapperClassName, fullWidth && "w-full")}>
      {label ? <Label htmlFor={inputId}>{label}</Label> : null}

      <div className="relative">
        {startAdornment ? (
          <span className={cn(adornmentClassName, "left-3")}>
            {startAdornment}
          </span>
        ) : null}

        <input
          id={inputId}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cn(
            fieldControlClassName(hasError),
            inputControlClassName,
            startAdornment ? "pl-10" : undefined,
            endAdornment ? "pr-10" : undefined,
            className,
          )}
          {...props}
        />

        {endAdornment ? (
          <span className={cn(adornmentClassName, "right-3")}>
            {endAdornment}
          </span>
        ) : null}
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
