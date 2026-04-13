/**
 * Server — persisted entity from backend `servers` table + ServerResource.
 * Source: app/Modules/Server/Models/Server.php (fillable fields) +
 *         app/Http/Resources/ServerResource.php (public shape; inferred).
 */
export type Server = {
  id: number;
  name: string;
  host: string;
  api_port: number;
  frm_http_port: number;
  frm_ws_port: number;
  status: ServerStatus;
  is_active: boolean;
  last_seen_at: string | null;
  // NOTE: api_token is `encrypted` cast and MUST NEVER be exposed by ServerResource.
};

export type ServerStatus = "online" | "offline" | "starting" | "error" | "unknown";

/**
 * ServerMetrics — latest row from TimescaleDB `server_metrics` hypertable.
 * Source: database/migrations/2026_02_26_180001_create_server_metrics_table.php +
 *         ServerController::latestMetrics response.
 */
export type ServerMetrics = {
  time: string; // ISO 8601 (TimestampTz)
  tick_rate: number | null;
  player_count: number;
  tech_tier: number;
  game_phase: string | null;
  is_running: boolean;
  is_paused: boolean;
  total_duration: number; // seconds since world start
};

/**
 * Health DTO broadcasted on `server.status.updated` event.
 * Source: app/Events/ServerStatusUpdated.php → broadcastWith().
 */
export type ServerHealthPayload = {
  status: ServerStatus;
  last_seen_at: string | null;
};
