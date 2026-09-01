"use client";

import type { RefObject } from "react";
import { usePathname } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { DASHBOARD_NAV_LINKS } from "@/components/dashboard-nav/dashboard-nav.constants";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";
import { Link } from "@/components/link";
import { NavbarBrand } from "@/components/navbar-brand";
import { isNavLinkActive } from "@/components/nav-link/nav-link-styles";
import { LogoutButton } from "@/features/authentication";

type DashboardHeaderProps = {
  navOpen: boolean;
  onOpenNav: () => void;
  menuId: string;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
};

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {open ? (
        <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
      ) : (
        <>
          <path strokeLinecap="round" d="M4 7h16" />
          <path strokeLinecap="round" d="M4 12h16" />
          <path strokeLinecap="round" d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function dashboardBreadcrumbItems(pathname: string) {
  const current = DASHBOARD_NAV_LINKS.find((item) =>
    isNavLinkActive(pathname, item.href, item.exact),
  );

  if (!current || current.href === "/dashboard") {
    return [{ label: "Dashboard" }];
  }

  return [
    { label: "Dashboard", href: "/dashboard" },
    { label: current.label },
  ];
}

/**
 * Dashboard chrome header: hamburger (below md), brand, section breadcrumb,
 * and account actions (audit D-1 / D-2).
 */
export function DashboardHeader({
  navOpen,
  onOpenNav,
  menuId,
  menuButtonRef,
}: DashboardHeaderProps) {
  const pathname = usePathname();

  return (
    <Header className="border-b border-border-neutral bg-surface">
      <div className="flex w-full min-h-[var(--nav-height)] items-center gap-3">
        <IconButton
          ref={menuButtonRef}
          type="button"
          variant="ghost"
          size="sm"
          className="md:hidden"
          aria-expanded={navOpen}
          aria-controls={menuId}
          aria-haspopup="dialog"
          aria-label={navOpen ? "Close dashboard menu" : "Open dashboard menu"}
          onClick={onOpenNav}
        >
          <MenuIcon open={navOpen} />
        </IconButton>

        <NavbarBrand href="/dashboard" label="Dashboard" className="shrink-0" />

        <Breadcrumb
          items={dashboardBreadcrumbItems(pathname)}
          className="hidden min-w-0 flex-1 overflow-hidden md:block"
        />

        <div
          className="ml-auto flex shrink-0 items-center gap-2"
          aria-label="Account"
        >
          <Link
            href="/dashboard/settings"
            variant="muted"
            underline={false}
            className="hidden text-small sm:inline-flex"
          >
            Settings
          </Link>
          <LogoutButton />
        </div>
      </div>
    </Header>
  );
}
