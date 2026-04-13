import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { api, ApiError } from "./api";

type FetchArgs = [string, RequestInit];

describe("api client", () => {
  const fetchMock = vi.fn<(...args: FetchArgs) => Promise<Response>>();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends GET with credentials and unwraps { data } envelope", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ data: { id: 1, name: "Main" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );

    const result = await api.get<{ id: number; name: string }>("/api/v1/servers/1");

    expect(result).toEqual({ id: 1, name: "Main" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toContain("/api/v1/servers/1");
    expect(init.credentials).toBe("include");
    expect(init.method).toBe("GET");
  });

  it("returns raw body when unwrap:false", async () => {
    const body = {
      time: "2026-04-14T00:00:00Z",
      tick_rate: 30,
      player_count: 2,
      tech_tier: 4,
      game_phase: "phase 4",
      is_running: true,
      is_paused: false,
      total_duration: 3600,
    };
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );

    const result = await api.get("/api/v1/servers/1/metrics/latest", { unwrap: false });

    expect(result).toEqual(body);
  });

  it("throws ApiError with status on non-2xx", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ message: "Unauthenticated." }), {
        status: 401,
        statusText: "Unauthorized",
        headers: { "content-type": "application/json" },
      }),
    );

    await expect(api.get("/api/v1/servers")).rejects.toMatchObject({
      name: "ApiError",
      status: 401,
    });
  });

  it("handles 204 No Content", async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }));

    const result = await api.delete("/api/v1/servers/1");
    expect(result).toBeUndefined();
  });

  it("ApiError exposes status and body", () => {
    const err = new ApiError("boom", 500, { trace: "x" });
    expect(err.status).toBe(500);
    expect(err.body).toEqual({ trace: "x" });
    expect(err.name).toBe("ApiError");
  });
});
