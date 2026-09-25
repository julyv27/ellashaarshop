PRAGMA foreign_keys = ON;

WITH source_product AS (
  SELECT
    brand_id,
    product_line_id,
    category_id,
    product_type_id,
    content_value,
    content_unit,
    order_unit
  FROM products
  WHERE internal_product_code = 'EH-1154'
),
new_products(product_code, product_name, shade_code, variant_group) AS (
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
  source_product.brand_id,
  source_product.product_line_id,
  source_product.category_id,
  source_product.product_type_id,
  new_products.variant_group,
  new_products.product_name,
  new_products.shade_code,
  source_product.content_value,
  source_product.content_unit,
  source_product.order_unit,
  NULL,
  NULL,
  NULL,
  1,
  LOWER(new_products.product_code || ' schwarzkopf natural styling hydrowave permanent- en ontkrulbehandelingen neutralisatie / fixatie ' || new_products.variant_group || ' ' || new_products.product_name || ' ' || new_products.shade_code || ' ' || source_product.content_value || ' ' || source_product.content_unit)
FROM new_products
CROSS JOIN source_product
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
WHERE p.internal_product_code IN ('EH-1291', 'EH-1292');
