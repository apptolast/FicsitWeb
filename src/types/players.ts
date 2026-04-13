/**
 * Player — shape from PlayerResource + database/migrations/*players_table.php.
 * ASSUMPTION: fields below are the most likely; verify on first live event.
 */
export type Player = {
  id: number;
  server_id: number;
  name: string;
  is_online: boolean;
  session_started_at: string | null;
  last_seen_at: string | null;
  position?: { x: number; y: number; z: number } | null;
};

/**
 * Payload of `players.updated` event.
 * Source: app/Events/PlayersUpdated.php → broadcastWith() returns { players: array }.
 */
export type PlayersUpdatedPayload = {
  players: Player[];
};
