# API Response Format

> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-07-16
>
> Owner: Project Team
>
> Category: API

## Purpose

Every API endpoint in the application must return a standardized response structure.

This ensures:

- Consistent frontend handling
- Predictable error processing
- Easier debugging
- Better developer experience

---

# Success Response

```ts
export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  requestId: string;
}
```

Example:

```json
{
  "success": true,
  "message": "Contact message submitted successfully.",
  "data": {
    "id": 15
  },
  "requestId": "req_9f2d6c0d"
}
```

---

# Error Response

```ts
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
  requestId: string;
}
```

Example:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {
    "email": "Email is invalid."
  },
  "requestId": "req_9f2d6c0d"
}
```

---

# Shared Result Type

The service layer should avoid throwing expected business errors.

Instead, use:

```ts
export type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
```

This keeps services framework-independent and simplifies route handlers.

---

# Response Principles

- Every response includes `requestId`.
- Never expose internal stack traces.
- Return user-friendly messages.
- Use appropriate HTTP status codes.
- Keep the response shape consistent across all endpoints.