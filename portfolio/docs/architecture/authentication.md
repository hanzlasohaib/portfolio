# Authentication Architecture

> Version: 1.0.0
>
> Status: Approved
>
> Last Updated: 2026-07-16
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

JWT Generation

↓

HTTP-only Cookie

↓

Dashboard
```

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

# Protected Resources

- Dashboard
- Blog Management
- Journey Management
- Projects
- Messages
- Settings

---

# Password Security

- bcrypt hashing
- minimum length policy
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

- MFA
- OAuth
- Password Reset
- Email Verification

---

# Status

Approved