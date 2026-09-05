import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { LinkProps } from "@/components/link/link.types";

import type { ButtonSize } from "./button-variants";

export type CtaLinkProps = Omit<LinkProps, "variant" | "underline"> & {
  size?: ButtonSize;
};

export type CtaAnchorProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "children" | "className"
> & {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
};
