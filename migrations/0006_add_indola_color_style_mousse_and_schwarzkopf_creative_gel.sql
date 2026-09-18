PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO brands (name, active)
VALUES ('INDOLA', 1);

INSERT OR IGNORE INTO brands (name, active)
VALUES ('Schwarzkopf', 1);

INSERT OR IGNORE INTO categories (name, active, sort_order)
VALUES ('Styling', 1, 4);

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Mousse', 1, 9
FROM categories
WHERE name = 'Styling';

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Gel', 1, 10
FROM categories
WHERE name = 'Styling';

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Haarolie / serum', 1, 11
FROM categories
WHERE name = 'Styling';

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'Color Style Mousse', 1
FROM brands
WHERE name = 'INDOLA';

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'OSiS+', 1
FROM brands
WHERE name = 'Schwarzkopf';

UPDATE products
SET
  active = 0,
  updated_at = datetime('now')
WHERE internal_product_code = 'EH-1006';

DELETE FROM products_fts
WHERE rowid IN (
  SELECT id
  FROM products
  WHERE internal_product_code = 'EH-1006'
);

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
  'Tijdelijke haarkleuring / stylingmousse',
  new_products.product_name,
  new_products.shade_code,
  '200',
  'ml',
  'stuk',
  NULL,
  new_products.supplier_sku,
  NULL,
  1,
  LOWER(new_products.product_code || ' indola color style mousse styling mousse tijdelijke haarkleuring stylingmousse ' || new_products.product_name || ' ' || new_products.shade_code || ' 200 ml')
FROM (
  SELECT 'EH-1275' AS product_code, 'INDOLA Color Style Mousse Anthracite' AS product_name, 'Anthracite' AS shade_code, '3055213' AS supplier_sku
  UNION ALL
  SELECT 'EH-1276', 'INDOLA Color Style Mousse Beige Blonde', 'Beige Blonde', '3055199'
  UNION ALL
  SELECT 'EH-1277', 'INDOLA Color Style Mousse Copper', 'Copper', '3055195'
  UNION ALL
  SELECT 'EH-1278', 'INDOLA Color Style Mousse Dark Ash', 'Dark Ash', '3055215'
  UNION ALL
  SELECT 'EH-1279', 'INDOLA Color Style Mousse Dark Blonde', 'Dark Blonde', '3054256'
  UNION ALL
  SELECT 'EH-1280', 'INDOLA Color Style Mousse Honey Blonde', 'Honey Blonde', '3054239'
  UNION ALL
  SELECT 'EH-1281', 'INDOLA Color Style Mousse Light Brown Hazel', 'Light Brown Hazel', '3055198'
  UNION ALL
  SELECT 'EH-1282', 'INDOLA Color Style Mousse Medium Blonde', 'Medium Blonde', '3054255'
  UNION ALL
  SELECT 'EH-1283', 'INDOLA Color Style Mousse Medium Brown', 'Medium Brown', '3055196'
  UNION ALL
  SELECT 'EH-1284', 'INDOLA Color Style Mousse Pearl Grey', 'Pearl Grey', '3054254'
  UNION ALL
  SELECT 'EH-1285', 'INDOLA Color Style Mousse Red', 'Red', '3054252'
  UNION ALL
  SELECT 'EH-1286', 'INDOLA Color Style Mousse Silver', 'Silver', '3054253'
  UNION ALL
  SELECT 'EH-1287', 'INDOLA Color Style Mousse Silver Lavender', 'Silver Lavender', '3054257'
  UNION ALL
  SELECT 'EH-1288', 'INDOLA Color Style Mousse Strawberry Rosé', 'Strawberry Rosé', '3055194'
) new_products
JOIN brands b ON b.name = 'INDOLA'
JOIN categories c ON c.name = 'Styling'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Mousse'
JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'Color Style Mousse'
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
  'EH-1289',
  b.id,
  NULL,
  c.id,
  pt.id,
  NULL,
  'Schwarzkopf Creative Gel',
  NULL,
  '50',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1289 schwarzkopf styling gel schwarzkopf creative gel 50 ml'
FROM brands b
JOIN categories c ON c.name = 'Styling'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Gel'
WHERE b.name = 'Schwarzkopf'
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
  'EH-1290',
  b.id,
  pl.id,
  c.id,
  pt.id,
  NULL,
  'Schwarzkopf OSiS+ Glow Frizz Control',
  NULL,
  '50',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1290 schwarzkopf osis+ styling haarolie serum schwarzkopf osis+ glow frizz control 50 ml'
FROM brands b
JOIN categories c ON c.name = 'Styling'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Haarolie / serum'
JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OSiS+'
WHERE b.name = 'Schwarzkopf'
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
WHERE p.internal_product_code BETWEEN 'EH-1275' AND 'EH-1290';
