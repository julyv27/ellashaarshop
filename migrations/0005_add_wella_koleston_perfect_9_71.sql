PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO brands (name, active)
VALUES ('Wella', 1);

INSERT OR IGNORE INTO categories (name, active, sort_order)
VALUES ('Kleur', 1, 3);

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Verf', 1, 1
FROM categories
WHERE name = 'Kleur';

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'Koleston Perfect', 1
FROM brands
WHERE name = 'Wella';

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
  'EH-1274',
  b.id,
  pl.id,
  c.id,
  pt.id,
  NULL,
  'Wella Koleston Perfect 9/71',
  '9/71',
  '60',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1274 wella koleston perfect kleur verf wella koleston perfect 9/71 9/71 60 ml'
FROM brands b
JOIN categories c ON c.name = 'Kleur'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Verf'
JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'Koleston Perfect'
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
WHERE p.internal_product_code = 'EH-1274';
