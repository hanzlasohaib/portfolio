"use client";

import { useEffect } from "react";

import { Button } from "@/components/button";
import {
  buttonBaseClassName,
  buttonSizeClassName,
  buttonVariantClassName,
} from "@/components/button/button-variants";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

export type ErrorFallbackProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Shared error UI for App Router `error.tsx` files.
 * Client Component so `reset()` can remount the segment.
 */
export function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[50svh] flex-col items-start justify-center gap-5 py-16">
      <Text variant="overline">Error</Text>
      <Heading level="h1">Something went wrong</Heading>
      <Text variant="body-lg" className="measure-prose">
        The page could not be loaded. Try again, or go back to the homepage.
      </Text>
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={() => reset()}>
          Try again
        </Button>
        <Link
          href="/"
          variant="inherit"
          underline={false}
          className={cn(
            buttonBaseClassName,
            buttonVariantClassName.secondary,
            buttonSizeClassName.md,
          )}
        >
          Home
        </Link>
      </div>
    </Container>
  );
}
