PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO brands (name, active)
VALUES ('Wella', 1);

INSERT OR IGNORE INTO categories (name, active, sort_order)
VALUES ('Styling', 1, 4);

INSERT OR IGNORE INTO categories (name, active, sort_order)
VALUES ('Kleur', 1, 3);

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Styling spray', 1, 8
FROM categories
WHERE name = 'Styling';

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Waterstofperoxide', 1, 7
FROM categories
WHERE name = 'Kleur';

UPDATE products
SET
  product_name = 'Tone On Tone Developer 1 Doos',
  content_value = NULL,
  content_unit = NULL,
  search_text = 'eh-1219 deluxe kleur developer tone on tone developer 1 doos',
  updated_at = datetime('now')
WHERE internal_product_code = 'EH-1219';

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
  'EH-1220',
  b.id,
  NULL,
  c.id,
  pt.id,
  NULL,
  'Wella Ocean Spritz',
  NULL,
  '150',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1220 wella styling styling spray wella ocean spritz 150 ml'
FROM brands b
JOIN categories c ON c.name = 'Styling'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Styling spray'
WHERE b.name = 'Wella'
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
  active = excluded.active,
  search_text = excluded.search_text,
  updated_at = datetime('now');

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
  product_code,
  b.id,
  NULL,
  c.id,
  pt.id,
  NULL,
  product_name,
  NULL,
  content_value,
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  search_text
FROM (
  SELECT 'EH-1221' AS product_code, 'Wella CT Emulsie 4%' AS product_name, '1000' AS content_value, 'eh-1221 wella kleur waterstofperoxide wella ct emulsie 4% 1000 ml' AS search_text
  UNION ALL
  SELECT 'EH-1222', 'Wella CT Emulsie 4%', '60', 'eh-1222 wella kleur waterstofperoxide wella ct emulsie 4% 60 ml'
  UNION ALL
  SELECT 'EH-1223', 'Wella Welloxon 6%', '1000', 'eh-1223 wella kleur waterstofperoxide wella welloxon 6% 1000 ml'
  UNION ALL
  SELECT 'EH-1224', 'Wella Welloxon 6%', '60', 'eh-1224 wella kleur waterstofperoxide wella welloxon 6% 60 ml'
) new_products
JOIN brands b ON b.name = 'Wella'
JOIN categories c ON c.name = 'Kleur'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Waterstofperoxide'
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
WHERE p.internal_product_code IN ('EH-1219', 'EH-1220', 'EH-1221', 'EH-1222', 'EH-1223', 'EH-1224');
