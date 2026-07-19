import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { ButtonSize, ButtonVariant } from "./button-variants";

export type ButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "disabled"
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

export type { ButtonSize, ButtonVariant };
