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
import type { CheckboxProps } from "./checkbox.types";

export function Checkbox({
  label,
  helperText,
  error,
  className,
  id,
  disabled,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const helperId = `${checkboxId}-helper`;
  const errorId = `${checkboxId}-error`;
  const hasError = Boolean(error);
  const describedBy = hasError ? errorId : helperText ? helperId : undefined;

  return (
    <div className={fieldWrapperClassName}>
      <div className={choiceRowClassName}>
        <input
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cn(
            choiceControlClassName(hasError, "rounded-sm"),
            className,
          )}
          {...props}
        />

        {label ? <Label htmlFor={checkboxId}>{label}</Label> : null}
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
