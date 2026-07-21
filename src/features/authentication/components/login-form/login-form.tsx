"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { loginSchema } from "@/features/authentication";

type FieldErrors = Record<string, string>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    const raw = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    const parsed = loginSchema.safeParse(raw);
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "_form");
        if (!errors[key]) {
          errors[key] = issue.message;
        }
      }
      setFieldErrors(errors);
      setFormError("Please correct the email and password fields.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
        const payload = (await response.json()) as {
          success: boolean;
          message: string;
          errors?: FieldErrors;
        };

        if (!response.ok || !payload.success) {
          if (payload.errors) {
            setFieldErrors(payload.errors);
          }
          setFormError(payload.message || "Unable to sign in.");
          return;
        }

        setSuccessMessage("Signed in successfully. Redirecting…");
        const next = searchParams.get("next");
        const destination =
          next && next.startsWith("/dashboard") ? next : "/dashboard";
        router.replace(destination);
        router.refresh();
      } catch {
        setFormError("Network error. Please try signing in again.");
      }
    });
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Heading level="h1">Sign in</Heading>
        <Text variant="small">
          Admin access to the portfolio dashboard.
        </Text>
      </div>

      <Input
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        fullWidth
        required
        error={fieldErrors.email}
      />

      <Input
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        fullWidth
        required
        error={fieldErrors.password}
      />

      {formError ? (
        <Alert variant="error" title="Sign-in failed">
          {formError}
        </Alert>
      ) : null}

      {successMessage ? (
        <Alert variant="success" title="Success">
          {successMessage}
        </Alert>
      ) : null}

      <Button type="submit" size="lg" fullWidth disabled={isPending}>
        {isPending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
