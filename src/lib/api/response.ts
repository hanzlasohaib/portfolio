import { NextResponse } from "next/server";

import { createRequestId } from "@/lib/request-id";

/**
 * Standardized API response helpers (docs/api/response-format.md).
 */

export type ApiSuccessBody<T> = {
  success: true;
  message: string;
  data: T;
  requestId: string;
};

export type ApiErrorBody = {
  success: false;
  message: string;
  errors?: Record<string, string>;
  requestId: string;
};

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string> };

export function apiSuccess<T>(
  data: T,
  message: string,
  status = 200,
  requestId = createRequestId(),
): NextResponse<ApiSuccessBody<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      requestId,
    },
    { status },
  );
}

export function apiError(
  message: string,
  status = 400,
  errors?: Record<string, string>,
  requestId = createRequestId(),
): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(errors ? { errors } : {}),
      requestId,
    },
    { status },
  );
}

export function zodFieldErrors(
  issues: { path: PropertyKey[]; message: string }[],
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const issue of issues) {
    const key = issue.path.map(String).join(".") || "_form";
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}
