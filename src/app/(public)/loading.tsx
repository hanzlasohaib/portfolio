import { Container } from "@/components/container";
import { PageWrapper } from "@/components/page-wrapper";
import { Section } from "@/components/section";
import { Skeleton } from "@/components/skeleton";

/**
 * Public-route loading UI (docs/design/uiux-redesign-plan.md Stage 4, audit CC-6).
 */
export default function PublicLoading() {
  return (
    <PageWrapper>
      <Section aria-busy="true" aria-label="Loading" aria-live="polite">
        <Container className="flex flex-col gap-8">
          <Skeleton height="1rem" width="12rem" />
          <Skeleton className="w-3/4 max-w-xl" height="2.75rem" />
          <Skeleton className="w-full max-w-2xl" height="1.5rem" />
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col gap-3 lg:col-span-4">
              <Skeleton className="w-full" height="10rem" />
            </div>
            <Skeleton className="aspect-video w-full lg:col-span-8" />
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
