PRAGMA foreign_keys = ON;

UPDATE products
SET
  variant_group = 'Voor Natural Styling-product 0',
  product_name = 'Schwarzkopf Natural Styling Hydrowave Natural Styling Neutraliser Fixing Lotion 0',
  shade_code = '0',
  search_text = 'eh-1154 schwarzkopf natural styling hydrowave omvorming neutralisatie / fixatie voor natural styling-product 0 schwarzkopf natural styling hydrowave natural styling neutraliser fixing lotion 0 0 1000 ml',
  updated_at = datetime('now')
WHERE internal_product_code = 'EH-1154';

WITH new_products(product_code, product_name, shade_code, variant_group) AS (
  VALUES
    ('EH-1291', 'Schwarzkopf Natural Styling Hydrowave Natural Styling Neutraliser Fixing Lotion 1', '1', 'Voor Natural Styling-product 1'),
    ('EH-1292', 'Schwarzkopf Natural Styling Hydrowave Natural Styling Neutraliser Fixing Lotion 2', '2', 'Voor Natural Styling-product 2')
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
  new_products.product_code,
  b.id,
  pl.id,
  c.id,
  pt.id,
  new_products.variant_group,
  new_products.product_name,
  new_products.shade_code,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  LOWER(new_products.product_code || ' schwarzkopf natural styling hydrowave omvorming neutralisatie / fixatie ' || new_products.variant_group || ' ' || new_products.product_name || ' ' || new_products.shade_code || ' 1000 ml')
FROM new_products
JOIN brands b ON b.name = 'Schwarzkopf'
JOIN categories c ON c.name = 'Omvorming'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Neutralisatie / fixatie'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'Natural Styling Hydrowave'
WHERE 1 = 1
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
WHERE p.internal_product_code IN ('EH-1154', 'EH-1291', 'EH-1292');
