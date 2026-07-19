import { Link } from "@/components/link";

import type { BreadcrumbProps } from "./breadcrumb.types";

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const showSeparator = index > 0;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {showSeparator ? (
                <span
                  aria-hidden="true"
                  className="text-small text-text-disabled"
                >
                  /
                </span>
              ) : null}

              {isLast || !item.href ? (
                <span
                  aria-current="page"
                  className="text-small font-medium text-text-primary"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  variant="muted"
                  underline={false}
                  className="text-small"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
