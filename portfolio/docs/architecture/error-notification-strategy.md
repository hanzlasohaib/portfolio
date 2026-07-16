# Error & Notification Strategy

> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-07-16
>
> Owner: Project Team
>
> Category: Architecture

---

# Purpose

Define a consistent strategy for validation, errors, logging, and user notifications.

---

# Principles

- Errors should be actionable.
- Messages should be concise.
- Never expose internal implementation details.
- Log detailed errors on the server only.

---

# Notification Types

## Inline Validation

Used for form field validation.

Examples

- Invalid email
- Required field
- Password too short

Displayed directly beneath the affected field.

---

## Toast Notifications

Library

Sonner

Use for non-blocking feedback.

Examples

- Contact message sent
- Settings saved
- Login successful
- Project updated

Keep messages short and positive.

---

## Modal Dialogs

Use for destructive or high-impact actions.

Examples

- Delete project
- Delete blog post
- Logout confirmation

Require explicit user confirmation.

---

## Full-Page Error Boundaries

Use for unexpected rendering failures.

Provide

- Friendly message
- Retry action
- Link back to home page

---

## Loading States

Always show loading indicators for async actions.

Examples

- Skeletons for page data
- Button loading spinners during form submission

---

# API Error Contract

All API responses should follow the shared `ApiResponse<T>` structure.

Example

```ts
type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
  requestId?: string;
};
```

---

# Logging

Server logs should include

- Timestamp
- Request ID
- Route
- HTTP Method
- User ID (if authenticated)
- Error Stack (server only)

---

# Request Correlation

Generate a unique Request ID for every incoming request.

Include it in

- Server logs
- API responses
- Error reports

This simplifies debugging across the application.

---

# User-Facing Messages

Avoid technical wording.

Instead of

"PrismaClientKnownRequestError"

Display

"Something went wrong. Please try again."

---

# Security

Never expose

- Stack traces
- SQL errors
- Environment variables
- Internal file paths

---

# Success Notifications

Examples

- Message sent successfully.
- Changes saved successfully.
- Login successful.
- Project published.

---

# Error Notifications

Examples

- Unable to send your message. Please try again.
- Network error. Check your connection.
- Your session has expired. Please sign in again.

---

# Status

Approved (Draft v1.0)