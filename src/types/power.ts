/**
 * PowerCircuit — row from TimescaleDB `power_metrics` hypertable.
 * Source: database/migrations/2026_02_26_180002_create_power_metrics_table.php.
 */
export type PowerCircuit = {
  time: string; // ISO 8601
  server_id: number;
  circuit_group_id: number;
  power_production: number; // MW
  power_consumed: number; // MW
  power_capacity: number; // MW
  power_max_consumed: number; // MW peak
  battery_percent: number | null; // 0-100
  battery_capacity: number | null; // MWh
  battery_differential: number | null; // MW
  fuse_triggered: boolean;
};

/**
 * Payload of `power.updated` event.
 * Source: app/Events/PowerUpdated.php → { circuits: array }.
 */
export type PowerUpdatedPayload = {
  circuits: PowerCircuit[];
};
