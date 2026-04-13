/**
 * ProductionMetric — row from `production_metrics` hypertable.
 * ASSUMPTION: fields below inferred from typical FRM data + production_metrics
 * migration (not read in detail during discovery). Verify on first live event.
 */
export type ProductionMetric = {
  time: string; // ISO 8601
  server_id: number;
  item_class: string; // e.g. "Desc_IronIngot_C"
  item_name: string; // display name
  produced_per_min: number;
  consumed_per_min: number;
  current_stock: number;
  max_stock: number | null;
};

/**
 * Payload of `production.updated` event.
 * Source: app/Events/ProductionUpdated.php (shape not directly verified).
 */
export type ProductionUpdatedPayload = {
  items: ProductionMetric[];
};
