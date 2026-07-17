"use client";

import { useId } from "react";

import { Label } from "@/components/label";
import { cn } from "@/lib/utils";

import {
  fieldControlClassName,
  fieldMessageClassName,
  fieldWrapperClassName,
  textareaControlClassName,
} from "../input/field-styles";
import type { TextareaProps } from "./textarea.types";

export function Textarea({
  label,
  helperText,
  error,
  fullWidth = false,
  className,
  id,
  disabled,
  readOnly,
  rows = 4,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const helperId = `${textareaId}-helper`;
  const errorId = `${textareaId}-error`;
  const hasError = Boolean(error);
  const describedBy = hasError ? errorId : helperText ? helperId : undefined;

  return (
    <div className={cn(fieldWrapperClassName, fullWidth && "w-full")}>
      {label ? <Label htmlFor={textareaId}>{label}</Label> : null}

      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        className={cn(
          fieldControlClassName(hasError),
          textareaControlClassName,
          "resize-y",
          className,
        )}
        {...props}
      />

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
