"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useLayoutEffect, useRef, useState, useTransition } from "react";

import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { loginSchema, mfaCodeSchema } from "@/features/authentication";

type FieldErrors = Record<string, string>;
type LoginStep = "credentials" | "mfa";

const CREDENTIALS_EMAIL_ID = "login-email";
const MFA_CODE_ID = "mfa-code";
const MFA_HEADING_ID = "mfa-heading";

/** Google Password Manager dumps credentials into OTP if the value is not digits-only. */
function digitsOnlyOtp(raw: string): string {
  if (raw === "" || /[^\d]/.test(raw)) {
    return "";
  }
  return raw.slice(0, 6);
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<LoginStep>("credentials");
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [maskedHint, setMaskedHint] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const previousStepRef = useRef<LoginStep>("credentials");

  useLayoutEffect(() => {
    if (step === "mfa") {
      previousStepRef.current = step;
      const timer = window.setTimeout(() => {
        document.getElementById(MFA_CODE_ID)?.focus();
      }, 400);
      return () => window.clearTimeout(timer);
    }

    if (previousStepRef.current === "mfa") {
      document.getElementById(CREDENTIALS_EMAIL_ID)?.focus();
    }
    previousStepRef.current = step;
    return undefined;
  }, [step]);

  useLayoutEffect(() => {
    if (step !== "mfa") {
      return undefined;
    }

    const field = document.getElementById(MFA_CODE_ID);
    if (!(field instanceof HTMLInputElement)) {
      return undefined;
    }

    function syncAutofill(target: HTMLInputElement) {
      const next = digitsOnlyOtp(target.value);
      if (target.value !== next) {
        target.value = next;
      }
      setOtpCode((current) => (current === next ? current : next));
    }

    function handleNativeEvent(event: Event) {
      if (event.target instanceof HTMLInputElement) {
        syncAutofill(event.target);
      }
    }

    field.addEventListener("input", handleNativeEvent);
    field.addEventListener("change", handleNativeEvent);
    field.addEventListener("animationstart", handleNativeEvent);

    syncAutofill(field);
    const interval = window.setInterval(() => syncAutofill(field), 50);
    const stop = window.setTimeout(() => window.clearInterval(interval), 2500);

    return () => {
      field.removeEventListener("input", handleNativeEvent);
      field.removeEventListener("change", handleNativeEvent);
      field.removeEventListener("animationstart", handleNativeEvent);
      window.clearInterval(interval);
      window.clearTimeout(stop);
    };
  }, [step]);

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
        const { getRecaptchaToken } = await import("@/lib/recaptcha/client");
        const recaptchaToken = await getRecaptchaToken("login");

        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ ...parsed.data, recaptchaToken }),
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
          setLoginEmail(parsed.data.email);
          setOtpCode("");
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

    const parsed = mfaCodeSchema.safeParse({
      code: otpCode,
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
        const { getRecaptchaToken } = await import("@/lib/recaptcha/client");
        const recaptchaToken = await getRecaptchaToken("mfa_verify");

        const response = await fetch("/api/auth/mfa/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ ...parsed.data, recaptchaToken }),
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
        const { getRecaptchaToken } = await import("@/lib/recaptcha/client");
        const recaptchaToken = await getRecaptchaToken("mfa_resend");

        const response = await fetch("/api/auth/mfa/resend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ recaptchaToken }),
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

  const mfaForm = (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleMfaSubmit}
      noValidate
      autoComplete="off"
      aria-labelledby={MFA_HEADING_ID}
    >
        <div className="flex flex-col gap-2">
          <Heading level="h1" id={MFA_HEADING_ID}>
            Verify sign-in
          </Heading>
          <Text variant="small">
            Enter the 6-digit code sent to your MFA notify email.
          </Text>
          {maskedHint ? <Text variant="caption">{maskedHint}</Text> : null}
        </div>

        {/*
          Google Password Manager infers a login pair. A username-only decoy
          made it dump the password into the visible OTP field. Keep both
          username and password off-screen (unnamed, so they are not submitted)
          and reject non-digit OTP values.
        */}
        <div className="sr-only" aria-hidden="true">
          <input
            type="email"
            autoComplete="username"
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
            tabIndex={-1}
          />
          <input
            type="password"
            autoComplete="current-password"
            tabIndex={-1}
          />
        </div>

        <Input
          id={MFA_CODE_ID}
          name="otp"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-1p-ignore="true"
          data-lpignore="true"
          data-form-type="other"
          label="Verification code"
          placeholder="000000"
          value={otpCode}
          onChange={(event) => setOtpCode(digitsOnlyOtp(event.target.value))}
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
              setOtpCode("");
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

  return (
    <>
      <div
        className={step === "credentials" ? undefined : "sr-only"}
        inert={step !== "credentials"}
        aria-hidden={step !== "credentials"}
      >
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
            id={CREDENTIALS_EMAIL_ID}
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
      </div>
      {step === "mfa" ? mfaForm : null}
    </>
  );
}
