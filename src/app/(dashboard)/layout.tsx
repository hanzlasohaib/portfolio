import type { Metadata } from "next";

import { DashboardLayout } from "@/components";

/**
 * Dashboard must not be indexed (robots.txt already disallows /dashboard).
 * Explicit noindex keeps Lighthouse SEO expectations clear for admin routes.
 */
export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DashboardRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
