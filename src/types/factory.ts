/**
 * Generator, Extractor, FactoryBuilding, InventoryItem, ResourceSinkStatus —
 * all ASSUMPTION shapes based on FRM mod output and DashboardController cache keys.
 * None of these are exposed via /api/v1/* yet (§2 gaps in architecture.md).
 * Received only via WebSocket broadcast events. Verify on first live event.
 */

export type Generator = {
  id: string;
  server_id: number;
  type: string; // e.g. "BP_GeneratorCoal_C"
  location_hash: string;
  is_producing: boolean;
  power_mw: number;
  fuel_percent: number | null;
};

export type Extractor = {
  id: string;
  server_id: number;
  type: string; // e.g. "Build_MinerMk3_C"
  resource: string; // e.g. "Desc_OreIron_C"
  extraction_rate_per_min: number;
  is_operating: boolean;
  purity: "impure" | "normal" | "pure";
};

export type FactoryBuilding = {
  id: number;
  server_id: number;
  type: string;
  display_name: string;
  recipe: string | null;
  current_production_rate: number;
  productivity: number; // 0-100
  is_paused: boolean;
};

export type InventoryItem = {
  item_class: string;
  item_name: string;
  total_count: number;
  location_count: number;
};

export type ResourceSinkStatus = {
  total_points: number;
  points_per_min: number;
  available_coupons: number;
  next_coupon_at: number; // points threshold
};

export type GeneratorsUpdatedPayload = { generators: Generator[] };
export type ExtractorsUpdatedPayload = { extractors: Extractor[] };
export type FactoryStatusUpdatedPayload = { buildings: FactoryBuilding[] };
export type WorldInventoryUpdatedPayload = { items: InventoryItem[] };
export type ResourceSinkUpdatedPayload = ResourceSinkStatus;
