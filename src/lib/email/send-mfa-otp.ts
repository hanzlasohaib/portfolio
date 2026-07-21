import { getMfaEnv } from "@/config/env";

/**
 * Thin Resend wrapper for transactional MFA email
 * (docs/architecture/authentication.md § Email OTP MFA).
 */

export async function sendMfaOtpEmail(code: string): Promise<void> {
  const mfa = getMfaEnv();
  if (!mfa) {
    throw new Error(
      "MFA email is not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and MFA_NOTIFY_EMAIL.",
    );
  }

  const { Resend } = await import("resend");
  const resend = new Resend(mfa.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: mfa.RESEND_FROM_EMAIL,
    to: mfa.MFA_NOTIFY_EMAIL,
    subject: "Your portfolio admin sign-in code",
    text: [
      "Your one-time sign-in code is:",
      "",
      code,
      "",
      "This code expires in 10 minutes. If you did not request it, you can ignore this email.",
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message || "Unable to send MFA email.");
  }
}
