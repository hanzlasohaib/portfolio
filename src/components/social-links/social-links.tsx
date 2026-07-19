import {
  iconButtonBaseClassName,
  iconButtonSizeClassName,
} from "@/components/button/button-variants";
import type { SocialPlatform } from "@/constants/social-links";
import { SOCIAL_LINKS } from "@/constants/social-links";
import { cn } from "@/lib/utils";

import type { SocialLinksProps } from "./social-links.types";

const iconClassName = "size-[18px]";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.92 3.19 9.09 7.62 10.56.56.1.76-.24.76-.54 0-.27-.01-1.15-.02-2.08-3.1.67-3.75-1.32-3.75-1.32-.51-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.24.92.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.21 1.15-2.99-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.08 1.14a10.7 10.7 0 0 1 5.6 0c2.14-1.44 3.08-1.14 3.08-1.14.61 1.53.23 2.66.11 2.94.72.78 1.15 1.78 1.15 2.99 0 4.27-2.61 5.22-5.09 5.5.4.35.75 1.03.75 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.2.65.76.54A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V9H3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className={iconClassName}
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6 8.5 6.5L20.5 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PLATFORM_ICON: Record<SocialPlatform, typeof GitHubIcon> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
};

/**
 * Reusable social / contact link list. Presentation-only — no business
 * logic (docs/architecture/component-architecture.md § UI Primitives).
 */
export function SocialLinks({
  links = SOCIAL_LINKS,
  size = "md",
  className,
  ...props
}: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)} {...props}>
      {links.map((link) => {
        const Icon = PLATFORM_ICON[link.platform];
        const isExternal = link.platform !== "email";

        return (
          <li key={link.platform}>
            <a
              href={link.href}
              aria-label={link.label}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                iconButtonBaseClassName,
                "border border-border bg-transparent text-text-secondary hover:border-border-strong hover:bg-surface hover:text-text-primary active:bg-surface-hover",
                iconButtonSizeClassName[size],
              )}
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
