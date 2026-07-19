import type { ComponentPropsWithoutRef } from "react";

import type { ButtonSize } from "@/components/button/button-variants";
import type { SocialLinkItem } from "@/constants/social-links";

export type SocialLinksProps = Omit<ComponentPropsWithoutRef<"ul">, "children"> & {
  /** Defaults to the canonical `SOCIAL_LINKS` constant. */
  links?: SocialLinkItem[];
  size?: ButtonSize;
};
