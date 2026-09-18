PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO brands (name, active)
VALUES ('Deluxe', 1);

INSERT OR IGNORE INTO categories (name, active, sort_order)
VALUES ('Kleur', 1, 3);

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Developer', 1, 6
FROM categories
WHERE name = 'Kleur';

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
  'EH-1219',
  b.id,
  NULL,
  c.id,
  pt.id,
  NULL,
  'Tone On Tone Developer 1 Doos',
  NULL,
  NULL,
  NULL,
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1219 deluxe kleur developer tone on tone developer 1 doos'
FROM brands b
JOIN categories c ON c.name = 'Kleur'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Developer'
WHERE b.name = 'Deluxe'
  AND NOT EXISTS (
    SELECT 1
    FROM products
    WHERE internal_product_code = 'EH-1219'
  );

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
WHERE p.internal_product_code = 'EH-1219';
