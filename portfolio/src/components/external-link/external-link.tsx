import { linkClassName } from "../link/link-variants";
import type { ExternalLinkProps } from "./external-link.types";

export function ExternalLink({
  href,
  children,
  className,
  variant = "primary",
  underline = true,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={linkClassName(variant, underline, className)}
      {...props}
    >
      {children}
    </a>
  );
}
