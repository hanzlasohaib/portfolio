# Threat Model

> Version: 1.0

---

# Threats

## SQL Injection

Mitigation

Prisma ORM

---

## XSS

Mitigation

React escaping

Input validation

Output encoding

---

## CSRF

Mitigation

HTTP-only cookies

SameSite cookies

Origin validation

---

## JWT Theft

Mitigation

Secure cookies

HTTPS

Short expiration

---

## Rate Limiting

Protect

- Login
- Contact Form

---

## Secrets

Store only in environment variables.

---

# Status

Approved