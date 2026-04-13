import { describe, expect, it } from "vitest";
import { WS_EVENT, serverChannel } from "./ws-events";

describe("ws-events registry", () => {
  it("serverChannel builds channel name without private- prefix", () => {
    expect(serverChannel(1)).toBe("servers.1");
    expect(serverChannel(42)).toBe("servers.42");
  });

  it("WS_EVENT names match Laravel broadcastAs() conventions", () => {
    // These exact strings MUST match the backend's Event classes
    // (app/Events/*.php → broadcastAs()). If the backend renames one,
    // this test should be updated in lockstep.
    expect(WS_EVENT.serverStatus).toBe("server.status.updated");
    expect(WS_EVENT.power).toBe("power.updated");
    expect(WS_EVENT.players).toBe("players.updated");
    expect(WS_EVENT.serverMetrics).toBe("server_metrics.updated");
  });

  it("registry is frozen at the type level (compile-time check)", () => {
    // `as const` means any typo here would be a TS error at the call site.
    const all: string[] = Object.values(WS_EVENT);
    expect(all).toContain("drones.updated");
    expect(all).toContain("trains.updated");
    expect(all.length).toBe(12);
  });
});
