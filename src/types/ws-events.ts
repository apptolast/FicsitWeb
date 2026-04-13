/**
 * WebSocket event name registry.
 * Each string matches a Laravel event's `broadcastAs()` return value.
 * Source: app/Events/*.php in PabloHurtadoGonzalo86/satisfactory-server.
 *
 * Using string literal type ensures typos are caught at compile time.
 */
export const WS_EVENT = {
  serverStatus: "server.status.updated",
  serverMetrics: "server_metrics.updated",
  players: "players.updated",
  power: "power.updated",
  production: "production.updated",
  trains: "trains.updated",
  drones: "drones.updated",
  generators: "generators.updated",
  extractors: "extractors.updated",
  factoryStatus: "factory.status.updated",
  worldInventory: "world_inventory.updated",
  resourceSink: "resource_sink.updated",
} as const;

export type WsEventName = (typeof WS_EVENT)[keyof typeof WS_EVENT];

/**
 * Channel name builder.
 * The backend channel is defined as `servers.{server}` in routes/channels.php.
 * Laravel Echo auto-adds the `private-` prefix when using `.private()`.
 */
export function serverChannel(serverId: number): string {
  return `servers.${serverId}`;
}
