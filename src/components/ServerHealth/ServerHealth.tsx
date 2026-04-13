import { useCallback } from "react";
import { useServerStore } from "../../lib/stores/useServerStore";
import { useChannel } from "../../hooks/useChannel";
import { serverChannel, WS_EVENT } from "../../types";
import type { ServerHealthPayload, ServerMetrics, ServerStatus } from "../../types";
import styles from "./ServerHealth.module.scss";

const STATUS_LABEL: Record<ServerStatus, string> = {
  online: "En línea",
  offline: "Desconectado",
  starting: "Arrancando",
  error: "Error",
  unknown: "Desconocido",
};

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function ServerHealth() {
  const server = useServerStore((s) => s.server);
  const metrics = useServerStore((s) => s.metrics);
  const wsStatus = useServerStore((s) => s.wsStatus);
  const setWsStatus = useServerStore((s) => s.setWsStatus);
  const setMetrics = useServerStore((s) => s.setMetrics);

  const onStatusUpdate = useCallback(
    (payload: ServerHealthPayload) => {
      setWsStatus(payload.status, payload.last_seen_at);
    },
    [setWsStatus],
  );

  const onMetricsUpdate = useCallback(
    (payload: ServerMetrics) => {
      setMetrics(payload);
    },
    [setMetrics],
  );

  // Only subscribe once we have a server. The hook is called unconditionally
  // with a null-safe channel name — when server is null, useChannel subscribes
  // to a dummy channel that never fires (cheap).
  const channel = server ? serverChannel(server.id) : "servers.0";

  useChannel<ServerHealthPayload>(channel, WS_EVENT.serverStatus, onStatusUpdate);
  useChannel<ServerMetrics>(channel, WS_EVENT.serverMetrics, onMetricsUpdate);

  const status: ServerStatus = wsStatus ?? (server?.status ?? "unknown");
  const badgeClass =
    status === "online"
      ? styles.badgeOnline
      : status === "offline" || status === "error"
        ? styles.badgeOffline
        : styles.badgeUnknown;

  return (
    <section className={styles.card} aria-labelledby="server-health-title">
      <header className={styles.header}>
        <h2 id="server-health-title" className={styles.title}>
          Estado del servidor
        </h2>
        <span className={`${styles.badge} ${badgeClass}`} aria-live="polite">
          {STATUS_LABEL[status]}
        </span>
      </header>

      {!server ? (
        <p className={styles.placeholder}>
          No hay servidor seleccionado. Añade uno desde el backend.
        </p>
      ) : !metrics ? (
        <p className={styles.placeholder}>Esperando primera métrica…</p>
      ) : (
        <div className={styles.grid}>
          <Metric label="Jugadores" value={metrics.player_count.toString()} />
          <Metric label="Tick rate" value={metrics.tick_rate?.toFixed(1) ?? "–"} />
          <Metric label="Tech tier" value={metrics.tech_tier.toString()} />
          <Metric label="Fase" value={metrics.game_phase ?? "–"} />
          <Metric label="Duración" value={formatDuration(metrics.total_duration)} />
          <Metric label="Pausado" value={metrics.is_paused ? "Sí" : "No"} />
        </div>
      )}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.metric}>
      <span className={styles.metricLabel}>{label}</span>
      <span className={styles.metricValue}>{value}</span>
    </div>
  );
}
