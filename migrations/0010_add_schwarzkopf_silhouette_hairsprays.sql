PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'Silhouette', 1
FROM brands
WHERE name = 'Schwarzkopf';

WITH new_products(
  internal_product_code,
  product_name,
  variant_group,
  content_value,
  content_unit
) AS (
  VALUES
    ('EH-1305', 'Schwarzkopf Silhouette Super Hold Hairspray', 'Super Hold', '300', 'ml'),
    ('EH-1306', 'Schwarzkopf Silhouette Flexible Hold Hairspray', 'Flexible Hold', '300', 'ml')
)
INSERT INTO products (
  internal_product_code,
  brand_id,
  product_line_id,
  category_id,
  product_type_id,
  variant_group,
  product_name,
  shade_code,
  content_value,
  content_unit,
  order_unit,
  supplier_id,
  supplier_sku,
  barcode_gtin,
  active,
  search_text
)
SELECT
  np.internal_product_code,
  b.id,
  pl.id,
  c.id,
  pt.id,
  np.variant_group,
  np.product_name,
  NULL,
  np.content_value,
  np.content_unit,
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  LOWER(np.internal_product_code || ' Schwarzkopf Silhouette Styling Haarlak ' || np.variant_group || ' ' || np.product_name || ' ' || np.content_value || ' ' || np.content_unit)
FROM new_products np
JOIN brands b ON b.name = 'Schwarzkopf'
JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'Silhouette'
JOIN categories c ON c.name = 'Styling'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Haarlak'
ON CONFLICT(internal_product_code) DO UPDATE SET
  brand_id = excluded.brand_id,
  product_line_id = excluded.product_line_id,
  category_id = excluded.category_id,
  product_type_id = excluded.product_type_id,
  variant_group = excluded.variant_group,
  product_name = excluded.product_name,
  shade_code = excluded.shade_code,
  content_value = excluded.content_value,
  content_unit = excluded.content_unit,
  order_unit = excluded.order_unit,
  supplier_id = excluded.supplier_id,
  supplier_sku = excluded.supplier_sku,
  barcode_gtin = excluded.barcode_gtin,
  active = excluded.active,
  search_text = excluded.search_text,
  updated_at = datetime('now');

INSERT OR REPLACE INTO products_fts (
  rowid,
  internal_product_code,
  brand,
  product_line,
  category,
  product_type,
  variant_group,
  product_name,
  shade_code,
  content,
  search_text
)
SELECT
  p.id,
  p.internal_product_code,
  b.name,
  COALESCE(pl.name, ''),
  c.name,
  pt.name,
  COALESCE(p.variant_group, ''),
  p.product_name,
  COALESCE(p.shade_code, ''),
  TRIM(COALESCE(p.content_value, '') || ' ' || COALESCE(p.content_unit, '')),
  p.search_text
FROM products p
JOIN brands b ON b.id = p.brand_id
JOIN categories c ON c.id = p.category_id
JOIN product_types pt ON pt.id = p.product_type_id
LEFT JOIN product_lines pl ON pl.id = p.product_line_id
WHERE p.internal_product_code IN ('EH-1305', 'EH-1306');
