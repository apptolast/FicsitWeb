/**
 * Laravel Echo singleton for FicsitMonitorWeb.
 *
 * - Configured for Reverb (Pusher protocol compatible).
 * - Uses cookie-based authorization: the POST to /broadcasting/auth
 *   automatically includes the Laravel session cookie.
 * - Env vars come from .env.local (see docs/architecture.md §7).
 *
 * IMPORTANT: do not call `initEcho()` at module level — call it from
 * a top-level effect once the user is authenticated, to avoid
 * connecting before login is complete.
 */

import Echo from "laravel-echo";
import Pusher from "pusher-js";

type EchoInstance = InstanceType<typeof Echo<"reverb">>;

let instance: EchoInstance | null = null;

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export function initEcho(): EchoInstance {
  if (instance) return instance;

  // Pusher is required on window for laravel-echo to pick it up.
  // Using `globalThis` + cast to avoid polluting `window` types globally.
  (globalThis as unknown as { Pusher: typeof Pusher }).Pusher = Pusher;

  instance = new Echo({
    broadcaster: "reverb",
    key: import.meta.env.VITE_REVERB_APP_KEY ?? "local-key",
    wsHost: import.meta.env.VITE_REVERB_HOST ?? "localhost",
    wsPort: Number(import.meta.env.VITE_REVERB_PORT ?? 8080),
    wssPort: Number(import.meta.env.VITE_REVERB_PORT ?? 8080),
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "http") === "https",
    enabledTransports: ["ws", "wss"],
    // Authorize private channels via the backend endpoint. The cookie
    // is sent automatically because same-origin or credentials:include.
    authEndpoint: `${BASE_URL}/broadcasting/auth`,
    auth: {
      headers: {
        Accept: "application/json",
      },
    },
  });

  return instance;
}

export function getEcho(): EchoInstance | null {
  return instance;
}

export function disconnectEcho(): void {
  if (instance) {
    instance.disconnect();
    instance = null;
  }
}
