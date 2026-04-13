/**
 * Thin fetch wrapper for the FicsitMonitorWeb SPA.
 *
 * - Always sends `credentials: 'include'` so Laravel's session cookie
 *   flows to the backend. This is mandatory — without it, the backend's
 *   OwnedByUserScope would filter every query to zero results.
 * - Parses JSON responses and throws on non-2xx.
 * - Unwraps Laravel ResourceCollection/Resource shape (`{ data: ... }`)
 *   when the caller expects raw entities.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  readonly status: number;
  readonly body?: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

type ApiInit = Omit<RequestInit, "method" | "body"> & {
  unwrap?: boolean;
};

async function request<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  body?: unknown,
  init: ApiInit = {},
): Promise<T> {
  const { unwrap = true, headers, ...rest } = init;

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!response.ok) {
    let errBody: unknown = undefined;
    try {
      errBody = await response.json();
    } catch {
      // non-JSON error body, ignore
    }
    throw new ApiError(
      `${method} ${path} → ${response.status} ${response.statusText}`,
      response.status,
      errBody,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const json = (await response.json()) as unknown;

  // Laravel Resource / ResourceCollection wrap: `{ data: T }`.
  // Unwrap if present unless the caller explicitly opts out.
  if (
    unwrap &&
    typeof json === "object" &&
    json !== null &&
    "data" in json &&
    Object.keys(json).length <= 3 // data + optional meta/links
  ) {
    return (json as { data: T }).data;
  }

  return json as T;
}

export const api = {
  get: <T>(path: string, init?: ApiInit) => request<T>("GET", path, undefined, init),
  post: <T>(path: string, body?: unknown, init?: ApiInit) =>
    request<T>("POST", path, body, init),
  put: <T>(path: string, body?: unknown, init?: ApiInit) =>
    request<T>("PUT", path, body, init),
  delete: <T>(path: string, init?: ApiInit) => request<T>("DELETE", path, undefined, init),
};
