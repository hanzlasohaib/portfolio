export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
  /** Prefix the first item with `/` (e.g. brand already names the root). */
  leadingSeparator?: boolean;
};
