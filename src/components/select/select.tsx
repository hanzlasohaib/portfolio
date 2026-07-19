"use client";

import { useId } from "react";

import { Label } from "@/components/label";
import { cn } from "@/lib/utils";

import {
  fieldControlClassName,
  fieldMessageClassName,
  fieldWrapperClassName,
  selectControlClassName,
} from "../input/field-styles";
import type { SelectProps } from "./select.types";

export function Select({
  label,
  helperText,
  error,
  fullWidth = false,
  className,
  id,
  disabled,
  children,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = `${selectId}-helper`;
  const errorId = `${selectId}-error`;
  const hasError = Boolean(error);
  const describedBy = hasError ? errorId : helperText ? helperId : undefined;

  return (
    <div className={cn(fieldWrapperClassName, fullWidth && "w-full")}>
      {label ? <Label htmlFor={selectId}>{label}</Label> : null}

      <select
        id={selectId}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        className={cn(
          fieldControlClassName(hasError),
          selectControlClassName,
          className,
        )}
        {...props}
      >
        {children}
      </select>

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
