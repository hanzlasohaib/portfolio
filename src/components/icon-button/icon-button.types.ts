import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { ButtonSize, ButtonVariant } from "../button/button-variants";

export type IconButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "disabled" | "aria-label"
> & {
  /** Accessible name — required for icon-only buttons. */
  "aria-label": string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children: ReactNode;
};
