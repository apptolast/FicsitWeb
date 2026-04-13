import { create } from "zustand";
import type { Server, ServerMetrics, ServerStatus } from "../../types";

type LoadState = "idle" | "loading" | "ready" | "error";

type ServerState = {
  // Currently selected server (for now the first one the user owns).
  server: Server | null;
  metrics: ServerMetrics | null;
  wsStatus: ServerStatus | null;
  wsLastSeenAt: string | null;
  loadState: LoadState;
  error: string | null;

  setServer: (server: Server | null) => void;
  setMetrics: (metrics: ServerMetrics | null) => void;
  setWsStatus: (status: ServerStatus, lastSeenAt: string | null) => void;
  setLoadState: (state: LoadState, error?: string | null) => void;
};

export const useServerStore = create<ServerState>((set) => ({
  server: null,
  metrics: null,
  wsStatus: null,
  wsLastSeenAt: null,
  loadState: "idle",
  error: null,

  setServer: (server) => set({ server }),
  setMetrics: (metrics) => set({ metrics }),
  setWsStatus: (wsStatus, wsLastSeenAt) => set({ wsStatus, wsLastSeenAt }),
  setLoadState: (loadState, error = null) => set({ loadState, error }),
}));
