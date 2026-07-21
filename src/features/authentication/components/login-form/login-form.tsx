"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { loginSchema, mfaCodeSchema } from "@/features/authentication";

type FieldErrors = Record<string, string>;
type LoginStep = "credentials" | "mfa";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<LoginStep>("credentials");
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [maskedHint, setMaskedHint] = useState<string | null>(null);

  function redirectToDashboard() {
    const next = searchParams.get("next");
    const destination =
      next && next.startsWith("/dashboard") ? next : "/dashboard";
    router.replace(destination);
    router.refresh();
  }

  async function handleCredentialsSubmit(event: FormEvent<HTMLFormElement>) {
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
          credentials: "same-origin",
          body: JSON.stringify(parsed.data),
        });

        const contentType = response.headers.get("content-type") ?? "";
        if (!contentType.includes("application/json")) {
          setFormError(
            "Sign-in failed on the server. Check that DATABASE_URL, DIRECT_URL, and JWT_SECRET are set in Vercel, then redeploy.",
          );
          return;
        }

        const payload = (await response.json()) as {
          success: boolean;
          message: string;
          errors?: FieldErrors;
          data?: {
            needsMfa?: boolean;
            user?: { fullName?: string; email?: string };
          };
        };

        if (!response.ok || !payload.success) {
          if (payload.errors) {
            setFieldErrors(payload.errors);
          }
          setFormError(payload.message || "Unable to sign in.");
          return;
        }

        if (payload.data?.needsMfa) {
          setMaskedHint(
            payload.data.user?.email
              ? `Code sent to your MFA notify inbox (login: ${payload.data.user.email}).`
              : "Code sent to your MFA notify inbox.",
          );
          setSuccessMessage(payload.message);
          setStep("mfa");
          return;
        }

        setSuccessMessage("Signed in successfully. Redirecting…");
        redirectToDashboard();
      } catch {
        setFormError("Network error. Please try signing in again.");
      }
    });
  }

  async function handleMfaSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    const parsed = mfaCodeSchema.safeParse({
      code: String(formData.get("code") ?? ""),
    });

    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "_form");
        if (!errors[key]) {
          errors[key] = issue.message;
        }
      }
      setFieldErrors(errors);
      setFormError("Enter the 6-digit code from your email.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/mfa/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
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
          setFormError(payload.message || "Unable to verify code.");
          return;
        }

        setSuccessMessage("Signed in successfully. Redirecting…");
        redirectToDashboard();
      } catch {
        setFormError("Network error. Please try again.");
      }
    });
  }

  function handleResend() {
    setFormError(null);
    setSuccessMessage(null);
    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/mfa/resend", {
          method: "POST",
          credentials: "same-origin",
        });
        const payload = (await response.json()) as {
          success: boolean;
          message: string;
        };
        if (!response.ok || !payload.success) {
          setFormError(payload.message || "Unable to resend code.");
          return;
        }
        setSuccessMessage(payload.message);
      } catch {
        setFormError("Network error while resending code.");
      }
    });
  }

  if (step === "mfa") {
    return (
      <form
        className="flex flex-col gap-5"
        onSubmit={handleMfaSubmit}
        noValidate
      >
        <div className="flex flex-col gap-2">
          <Heading level="h1">Verify sign-in</Heading>
          <Text variant="small">
            Enter the 6-digit code sent to your MFA notify email.
          </Text>
          {maskedHint ? <Text variant="caption">{maskedHint}</Text> : null}
        </div>

        <Input
          name="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          label="Verification code"
          placeholder="000000"
          fullWidth
          required
          maxLength={6}
          error={fieldErrors.code}
        />

        {formError ? (
          <Alert variant="error" title="Verification failed">
            {formError}
          </Alert>
        ) : null}

        {successMessage ? (
          <Alert variant="success" title="Success">
            {successMessage}
          </Alert>
        ) : null}

        <Button type="submit" size="lg" fullWidth disabled={isPending}>
          {isPending ? "Verifying…" : "Verify and continue"}
        </Button>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={handleResend}
          >
            Resend code
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isPending}
            onClick={() => {
              setStep("credentials");
              setFormError(null);
              setSuccessMessage(null);
              setFieldErrors({});
            }}
          >
            Back to sign in
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleCredentialsSubmit}
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
