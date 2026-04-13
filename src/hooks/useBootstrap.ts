import { useEffect } from "react";
import { api, ApiError } from "../lib/api";
import { useServerStore } from "../lib/stores/useServerStore";
import type { Server, ServerMetrics } from "../types";

/**
 * Initial snapshot loader for the dashboard.
 *
 * Fetches the list of servers owned by the authenticated user, picks the
 * first one, then fetches its latest metrics. Stores results in
 * `useServerStore`.
 *
 * On 401/403, sets loadState to 'error' with a message instructing the
 * user to log in on the backend. (Login UI in-app is a v1.1 feature —
 * see docs/architecture.md §6.4.)
 */
export function useBootstrap(): void {
  const setServer = useServerStore((s) => s.setServer);
  const setMetrics = useServerStore((s) => s.setMetrics);
  const setLoadState = useServerStore((s) => s.setLoadState);

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      setLoadState("loading");
      try {
        const servers = await api.get<Server[]>("/api/v1/servers");
        if (cancelled) return;

        const first = servers[0] ?? null;
        setServer(first);

        if (!first) {
          setLoadState("ready");
          return;
        }

        const metrics = await api.get<ServerMetrics | null>(
          `/api/v1/servers/${first.id}/metrics/latest`,
          { unwrap: false },
        );
        if (cancelled) return;

        setMetrics(metrics);
        setLoadState("ready");
      } catch (e) {
        if (cancelled) return;
        const msg =
          e instanceof ApiError && (e.status === 401 || e.status === 403)
            ? "No estás autenticado. Inicia sesión en el backend y recarga."
            : e instanceof Error
              ? e.message
              : "Error desconocido al cargar el dashboard.";
        setLoadState("error", msg);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [setServer, setMetrics, setLoadState]);
}
