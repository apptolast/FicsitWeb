/**
 * Train — entity from `trains` table + TrainResource.
 * ASSUMPTION: shape inferred from FRM mod conventions + DashboardController usage.
 * Verify with first live broadcast of `trains.updated`.
 */
export type Train = {
  id: number;
  server_id: number;
  name: string;
  status: "running" | "docked" | "stopped" | "derailed" | "unknown";
  current_station: string | null;
  next_station: string | null;
  speed_kmh: number;
  position?: { x: number; y: number; z: number } | null;
  consist?: Array<{
    item_class: string;
    current: number;
    capacity: number;
  }>;
};

/**
 * DroneStation — entity from `drone_stations` table + DroneStationResource.
 * ASSUMPTION: inferred shape.
 */
export type DroneStation = {
  id: number;
  server_id: number;
  name: string;
  paired_station_id: number | null;
  battery_rate: number; // drain rate
  last_drone_arrival_at: string | null;
  average_round_trip_s: number | null;
  position?: { x: number; y: number; z: number } | null;
};

export type TrainsUpdatedPayload = { trains: Train[] };
export type DronesUpdatedPayload = { drones: DroneStation[] };
