# Authentication Architecture

> Version: 1.1.0
>
> Status: Approved
>
> Last Updated: 2026-07-17
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

Login Form

↓

Validation (Zod)

↓

Credential Verification

↓

Password Verification (bcrypt)

↓

Account Active Check (`isActive`)

↓

JWT Generation

↓

HTTP-only Cookie

↓

Dashboard
```

A deactivated account (`isActive: false`) is rejected with the same generic error as an incorrect password, to avoid revealing account status to an unauthenticated caller.

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

- MFA / 2FA (TOTP or email OTP via Resend)
  - Keep Test Admin login identity as-is for V1 continuity.
  - Deliver MFA codes to an owner-controlled mailbox (real email), not
    `admin@example.com` — prefer a dedicated notify address / settings field
    (e.g. `MFA_NOTIFY_EMAIL`) so the login email need not be a real inbox.
- OAuth
- Password Reset
- Email Verification

---

# Status

Approved