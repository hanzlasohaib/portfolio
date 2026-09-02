import { BackToTopButton } from "@/components/back-to-top-button";
import { CustomCursor } from "@/components/custom-cursor";
import { Footer } from "@/components/footer";
import { HashScroll } from "@/components/hash-scroll";
import { LayoutShell } from "@/components/layout-shell";
import { ScrollAwareHeader } from "@/components/scroll-aware-header";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { SkipToContent } from "@/components/skip-to-content";
import { getSiteProfileForUi } from "@/features/site-profile";

import type { PublicLayoutProps } from "./public-layout.types";

/**
 * Public route group shell with primary navigation.
 *
 * The fixed header overlays page content. `<Main>` is padded by
 * `--nav-height` so inner pages clear the bar. The home hero pulls back
 * under the header with a matching negative margin so its gradient sits
 * behind the transparent nav.
 */
export async function PublicLayout({ children }: PublicLayoutProps) {
  const profile = await getSiteProfileForUi();

  return (
    <LayoutShell
      mainClassName="pt-[var(--nav-height)]"
      header={
        <>
          <SkipToContent />
          <ScrollAwareHeader
            brandLabel={profile.name}
            resumeUrl={profile.resumeUrl}
          />
        </>
      }
      footer={
        <Footer
          name={profile.name}
          tagline={profile.tagline}
          socialLinks={profile.socialLinks}
        />
      }
      floating={<BackToTopButton />}
    >
      <ScrollProgressBar />
      <HashScroll />
      <CustomCursor />
      {children}
    </LayoutShell>
  );
}
