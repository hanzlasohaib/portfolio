import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { CtaLink } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

/**
 * Branded 404 body used by the root and public `not-found` files
 * (docs/design/uiux-redesign-plan.md Stage 4, audit CC-6 / PD-2).
 */
export function NotFoundView() {
  return (
    <Container className="flex min-h-[50svh] flex-col items-start justify-center gap-5 py-16">
      <Text variant="overline">404</Text>
      <Heading level="h1">Page not found</Heading>
      <Text variant="body-lg" className="measure-prose">
        That URL does not match anything on this site. It may have moved, or
        the link may be out of date.
      </Text>
      <div className="flex flex-wrap gap-3">
        <CtaLink href="/" size="md">
          Home
        </CtaLink>
        <Link
          href="/projects"
          variant="inherit"
          underline={false}
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.secondary,
            buttonSizeClassName.md,
          )}
        >
          Projects
        </Link>
      </div>
    </Container>
  );
}
