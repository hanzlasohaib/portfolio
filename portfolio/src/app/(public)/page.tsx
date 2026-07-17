import { Container } from "@/components/container";
import { PageWrapper } from "@/components/page-wrapper";
import { Section } from "@/components/section";

/**
 * Temporary scaffold content. Public page content belongs to Phase 2.
 * Adjusted only so it composes with the Layout System (no nested <main>).
 */
export default function Home() {
  return (
    <PageWrapper>
      <Section>
        <Container className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-display text-h1">Developing my Portfolio.</h1>
          <p className="text-body-lg max-w-md">
            I am implementing first phase of this project.
          </p>
        </Container>
      </Section>
    </PageWrapper>
  );
}
