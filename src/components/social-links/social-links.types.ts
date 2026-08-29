import type { ComponentPropsWithoutRef } from "react";

import type { ButtonSize } from "@/components/button/button-variants";
import type { SocialLinkItem } from "@/constants/social-links";

export type SocialLinksProps = Omit<ComponentPropsWithoutRef<"ul">, "children"> & {
  /** Defaults to the static `SOCIAL_LINKS` fallback when omitted. */
  links?: SocialLinkItem[];
  size?: ButtonSize;
};
