PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO brands (name, active) VALUES ('Totex', 1);
INSERT OR IGNORE INTO brands (name, active) VALUES ('KIS', 1);
INSERT OR IGNORE INTO brands (name, active) VALUES ('Fanola', 1);

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'Totex Styling', 1 FROM brands WHERE name = 'Totex';

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'Color', 1 FROM brands WHERE name = 'KIS';

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'No Yellow', 1 FROM brands WHERE name = 'Fanola';

WITH new_products(
  internal_product_code,
  brand_name,
  product_line_name,
  category_name,
  product_type_name,
  variant_group,
  product_name,
  content_value,
  content_unit,
  supplier_sku,
  barcode_gtin
) AS (
  VALUES
    ('EH-1307', 'Totex', 'Totex Styling', 'Styling', 'Wax / paste', 'Sterke hold met matte finish', 'Totex Totex Styling Hair Wax Strong Matte', '150', 'ml', NULL, '8697444367381'),
    ('EH-1308', 'KIS', 'Color', 'Kleur', 'Blondeerpoeder', 'Vegan, stuifvrij; tot 9+ tinten oplichting', 'KIS Color Magic Mud Lightener', '50', 'g', 'KIS95827', '8717496447142'),
    ('EH-1309', 'Fanola', 'No Yellow', 'Haarverzorging', 'Shampoo', 'Neutraliseert ongewenste gele tonen in blond, geblondeerd en grijs haar', 'Fanola No Yellow No Yellow Shampoo', '350', 'ml', NULL, NULL),
    ('EH-1310', 'Fanola', 'No Yellow', 'Haarverzorging', 'Shampoo', 'Neutraliseert ongewenste gele tonen in blond, geblondeerd en grijs haar', 'Fanola No Yellow No Yellow Shampoo', '1000', 'ml', NULL, NULL)
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
  np.supplier_sku,
  np.barcode_gtin,
  1,
  LOWER(np.internal_product_code || ' ' || np.brand_name || ' ' || np.product_line_name || ' ' || np.category_name || ' ' || np.product_type_name || ' ' || np.variant_group || ' ' || np.product_name || ' ' || np.content_value || ' ' || np.content_unit || ' ' || COALESCE(np.supplier_sku, '') || ' ' || COALESCE(np.barcode_gtin, ''))
FROM new_products np
JOIN brands b ON b.name = np.brand_name
JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = np.product_line_name
JOIN categories c ON c.name = np.category_name
JOIN product_types pt ON pt.category_id = c.id AND pt.name = np.product_type_name
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
WHERE p.internal_product_code IN ('EH-1307', 'EH-1308', 'EH-1309', 'EH-1310');
