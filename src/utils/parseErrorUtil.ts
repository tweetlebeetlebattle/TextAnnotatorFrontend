import { BackendErrorResponse } from "../types/types";

export function parseBackendError(
  err: any,
  defaultMessage = "This is a default message. An error occurred."
): BackendErrorResponse {
  const maybeData = err?.response?.data;

  if (maybeData && typeof maybeData.error === "string") {
    return { error: maybeData.error };
  }

  return { error: defaultMessage };
}
