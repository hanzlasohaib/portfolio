# Authentication Architecture

> Version: 1.2.0
>
> Status: Approved
>
> Last Updated: 2026-07-21
>
> Owner: Project Team
>
> Category: Architecture

---

# Purpose

Provide secure administrator authentication while keeping the public portfolio accessible without login.

---

# Authentication Type

JWT Authentication

Stored in:

- HTTP-only Cookie

Never:

- localStorage
- sessionStorage

---

# Login Flow

```text
Admin

↓

Login Form (email + password)

↓

Validation (Zod)

↓

Credential Verification (bcrypt)

↓

Account Active Check (`isActive`)

↓

If MFA configured (RESEND_API_KEY + MFA_NOTIFY_EMAIL):

  Create MfaChallenge (hashed OTP)
  ↓
  Send 6-digit code to MFA_NOTIFY_EMAIL via Resend
  ↓
  Set short-lived HTTP-only `mfa_challenge` cookie
  ↓
  Login UI OTP step
  ↓
  POST /api/auth/mfa/verify
  ↓
  Validate OTP + challenge cookie
  ↓
  JWT Generation + clear challenge cookie

Else:

  JWT Generation immediately

↓

HTTP-only session cookie

↓

Dashboard
```

Login identity remains the Test Admin `User.email` / password.

OTP codes are delivered to `MFA_NOTIFY_EMAIL` (owner-controlled real inbox), **not** to `User.email`.

A deactivated account (`isActive: false`) is rejected with the same generic error as an incorrect password, to avoid revealing account status to an unauthenticated caller.

When MFA env vars are incomplete, login stays password-only so local development without Resend continues to work.

---

# Logout Flow

```text
Logout

↓

Invalidate Cookie

↓

Redirect Login
```

---

# Protected Resources (V1)

- `/dashboard`
- `/dashboard/projects`
- `/dashboard/journey`
- `/dashboard/messages`
- `/dashboard/settings`

`/login` is public.

Validation rules for login fields: `docs/architecture/validation-strategy.md`.

---

# Password Security

- bcrypt hashing
- minimum length: 8 characters (see validation strategy)
- no plaintext passwords

---

# Email OTP MFA

- 6-digit numeric code
- 10 minute TTL
- Single-use (`consumedAt`)
- Max 5 verify attempts per challenge
- Resend cooldown: 60 seconds
- Codes hashed at rest (`MfaChallenge.codeHash`)
- Pending session: signed HTTP-only `mfa_challenge` cookie (~10 min), not the admin JWT

Environment (optional as a set — all required to enable MFA):

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | Verified sender |
| `MFA_NOTIFY_EMAIL` | Real inbox for OTP delivery |

---

# JWT Claims

- userId
- role
- issuedAt
- expiresAt

---

# Middleware

Middleware responsibilities

- Verify JWT
- Check expiry
- Attach user context
- Redirect unauthorized users

Middleware does **not** accept the MFA challenge cookie as authentication for `/dashboard`.

---

# Session Lifetime

Access Token

7 Days

Future

Refresh Token support if needed.

---

# Security

- HTTP-only Cookies
- Secure Cookies
- SameSite=Lax
- HTTPS in production

---

# Future

- Authenticator app (TOTP)
- OAuth
- Password Reset
- Email Verification

---

# Status

Approved
