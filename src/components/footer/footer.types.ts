import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { SocialLinkItem } from "@/constants/social-links";

export type FooterProps = ComponentPropsWithoutRef<"footer"> & {
  /** Optional override for the default footer content. */
  children?: ReactNode;
  name?: string;
  tagline?: string;
  socialLinks?: SocialLinkItem[];
};
