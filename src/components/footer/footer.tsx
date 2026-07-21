import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { NavbarBrand } from "@/components/navbar-brand";
import { ScrollToTopControl } from "@/components/scroll-to-top-control";
import { SocialLinks } from "@/components/social-links";
import { Text } from "@/components/text";
import { PUBLIC_NAV_LINKS } from "@/constants/navigation";
import { PERSONAL } from "@/constants/personal";
import { cn } from "@/lib/utils";

import type { FooterProps } from "./footer.types";

/**
 * Site footer (docs/project-design/pages.md § Footer): brand, short sentence,
 * quick links, social links (including email via icon), copyright, and Back
 * to Top. Pair with the floating `BackToTopButton` in `PublicLayout`.
 */
export function Footer({ className, children, ...props }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "mt-auto w-full shrink-0 border-t border-border bg-surface",
        "py-10 sm:py-12",
        className,
      )}
      {...props}
    >
      <Container className="flex flex-col gap-10">
        {children ?? (
          <>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-3">
                <NavbarBrand label={PERSONAL.name} />
                <Text variant="small" className="max-w-xs">
                  {PERSONAL.tagline}
                </Text>
              </div>

              <nav aria-label="Footer">
                <p className="mb-3 text-small font-medium text-text-primary">
                  Quick Links
                </p>
                <ul className="flex flex-col gap-2">
                  {PUBLIC_NAV_LINKS.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} variant="muted" underline={false}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex flex-col gap-3">
                <p className="text-small font-medium text-text-primary">
                  Connect
                </p>
                <SocialLinks />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <p className="m-0 text-caption text-text-disabled">
                  © {year} {PERSONAL.name}. All rights reserved.
                </p>
                <p className="m-0 text-caption text-text-disabled">
                  Built with Next.js, React, and Tailwind CSS.
                </p>
              </div>
              <ScrollToTopControl className="self-start sm:self-auto" />
            </div>
          </>
        )}
      </Container>
    </footer>
  );
}
