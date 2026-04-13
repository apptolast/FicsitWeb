import { beforeEach, describe, expect, it } from "vitest";
import { useServerStore } from "./useServerStore";
import type { Server, ServerMetrics } from "../../types";

const sampleServer: Server = {
  id: 1,
  name: "Main",
  host: "10.0.0.10",
  api_port: 7777,
  frm_http_port: 8080,
  frm_ws_port: 8081,
  status: "online",
  is_active: true,
  last_seen_at: "2026-04-14T00:00:00Z",
};

const sampleMetrics: ServerMetrics = {
  time: "2026-04-14T00:00:00Z",
  tick_rate: 30.0,
  player_count: 3,
  tech_tier: 5,
  game_phase: "Project Assembly",
  is_running: true,
  is_paused: false,
  total_duration: 10_000,
};

describe("useServerStore", () => {
  beforeEach(() => {
    useServerStore.setState({
      server: null,
      metrics: null,
      wsStatus: null,
      wsLastSeenAt: null,
      loadState: "idle",
      error: null,
    });
  });

  it("starts with null server and idle load state", () => {
    const state = useServerStore.getState();
    expect(state.server).toBeNull();
    expect(state.loadState).toBe("idle");
  });

  it("setServer updates the current server", () => {
    useServerStore.getState().setServer(sampleServer);
    expect(useServerStore.getState().server).toEqual(sampleServer);
  });

  it("setMetrics stores the latest snapshot", () => {
    useServerStore.getState().setMetrics(sampleMetrics);
    expect(useServerStore.getState().metrics?.player_count).toBe(3);
  });

  it("setWsStatus updates status and last seen atomically", () => {
    useServerStore.getState().setWsStatus("offline", "2026-04-14T01:00:00Z");
    const s = useServerStore.getState();
    expect(s.wsStatus).toBe("offline");
    expect(s.wsLastSeenAt).toBe("2026-04-14T01:00:00Z");
  });

  it("setLoadState clears error on non-error transitions", () => {
    useServerStore.getState().setLoadState("error", "boom");
    expect(useServerStore.getState().error).toBe("boom");
    useServerStore.getState().setLoadState("ready");
    expect(useServerStore.getState().error).toBeNull();
  });
});
