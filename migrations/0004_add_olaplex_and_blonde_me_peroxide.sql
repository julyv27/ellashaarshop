PRAGMA foreign_keys = ON;
INSERT OR IGNORE INTO brands (name, active) VALUES ('OLAPLEX', 1);
INSERT OR IGNORE INTO brands (name, active) VALUES ('Schwarzkopf', 1);
INSERT OR IGNORE INTO categories (name, active, sort_order) VALUES ('Haarverzorging', 1, 5);
INSERT OR IGNORE INTO categories (name, active, sort_order) VALUES ('Kleur', 1, 3);
INSERT OR IGNORE INTO categories (name, active, sort_order) VALUES ('Styling', 1, 4);
INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, 'Treatment', 1, 1 FROM categories WHERE name = 'Haarverzorging';
INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, 'Shampoo', 1, 2 FROM categories WHERE name = 'Haarverzorging';
INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, 'Conditioner', 1, 3 FROM categories WHERE name = 'Haarverzorging';
INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, 'Droogshampoo', 1, 4 FROM categories WHERE name = 'Haarverzorging';
INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, 'Leave-in', 1, 5 FROM categories WHERE name = 'Haarverzorging';
INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, 'Haarolie / serum', 1, 6 FROM categories WHERE name = 'Haarverzorging';
INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, 'Gel', 1, 7 FROM categories WHERE name = 'Styling';
INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, 'Styling spray', 1, 8 FROM categories WHERE name = 'Styling';
INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, 'Haarmasker', 1, 9 FROM categories WHERE name = 'Haarverzorging';
INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, 'Waterstofperoxide', 1, 10 FROM categories WHERE name = 'Kleur';
INSERT OR IGNORE INTO product_lines (brand_id, name, active) SELECT id, 'OLAPLEX', 1 FROM brands WHERE name = 'OLAPLEX';
INSERT OR IGNORE INTO product_lines (brand_id, name, active) SELECT id, 'Blonde Me', 1 FROM brands WHERE name = 'Schwarzkopf';
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
  'EH-1225',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Treatment',
  'Nº.0 Intensive Bond Building Treatment',
  NULL,
  '155',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1225 olaplex olaplex haarverzorging treatment treatment nº.0 intensive bond building treatment 155 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Treatment'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1226',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Treatment',
  'N°.3PLUS Complete Repair Treatment',
  NULL,
  '100',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1226 olaplex olaplex haarverzorging treatment treatment n°.3plus complete repair treatment 100 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Treatment'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1227',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Treatment',
  'N°.3PLUS Complete Repair Treatment',
  NULL,
  '250',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1227 olaplex olaplex haarverzorging treatment treatment n°.3plus complete repair treatment 250 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Treatment'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1228',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Shampoo',
  'Nº.4 Bond Maintenance™ Strengthening Shampoo',
  NULL,
  '100',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1228 olaplex olaplex haarverzorging shampoo shampoo nº.4 bond maintenance™ strengthening shampoo 100 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1229',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Shampoo',
  'Nº.4 Bond Maintenance™ Strengthening Shampoo',
  NULL,
  '250',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1229 olaplex olaplex haarverzorging shampoo shampoo nº.4 bond maintenance™ strengthening shampoo 250 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1230',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Shampoo',
  'Nº.4 Bond Maintenance™ Strengthening Shampoo',
  NULL,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1230 olaplex olaplex haarverzorging shampoo shampoo nº.4 bond maintenance™ strengthening shampoo 1000 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1231',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Conditioner',
  'Nº.5 Bond Maintenance™ Strengthening Conditioner',
  NULL,
  '100',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1231 olaplex olaplex haarverzorging conditioner conditioner nº.5 bond maintenance™ strengthening conditioner 100 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1232',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Conditioner',
  'Nº.5 Bond Maintenance™ Strengthening Conditioner',
  NULL,
  '250',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1232 olaplex olaplex haarverzorging conditioner conditioner nº.5 bond maintenance™ strengthening conditioner 250 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1233',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Conditioner',
  'Nº.5 Bond Maintenance™ Strengthening Conditioner',
  NULL,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1233 olaplex olaplex haarverzorging conditioner conditioner nº.5 bond maintenance™ strengthening conditioner 1000 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1234',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Clarifying shampoo',
  'Nº.4C Bond Maintenance™ Clarifying Shampoo',
  NULL,
  '250',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1234 olaplex olaplex haarverzorging shampoo clarifying shampoo nº.4c bond maintenance™ clarifying shampoo 250 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1235',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Clarifying shampoo',
  'Nº.4C Bond Maintenance™ Clarifying Shampoo',
  NULL,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1235 olaplex olaplex haarverzorging shampoo clarifying shampoo nº.4c bond maintenance™ clarifying shampoo 1000 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1236',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Droogshampoo',
  'Nº.4D Clean Volume Detox Dry Shampoo',
  NULL,
  '50',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1236 olaplex olaplex haarverzorging droogshampoo droogshampoo nº.4d clean volume detox dry shampoo 50 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Droogshampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1237',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Droogshampoo',
  'Nº.4D Clean Volume Detox Dry Shampoo',
  NULL,
  '250',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1237 olaplex olaplex haarverzorging droogshampoo droogshampoo nº.4d clean volume detox dry shampoo 250 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Droogshampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1238',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Purple shampoo',
  'Nº.4P Blonde Enhancer™ Purple Toning Shampoo',
  NULL,
  '250',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1238 olaplex olaplex haarverzorging shampoo purple shampoo nº.4p blonde enhancer™ purple toning shampoo 250 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1239',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Purple shampoo',
  'Nº.4P Blonde Enhancer™ Purple Toning Shampoo',
  NULL,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1239 olaplex olaplex haarverzorging shampoo purple shampoo nº.4p blonde enhancer™ purple toning shampoo 1000 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1240',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Purple conditioner',
  'Nº.5P Blonde Enhancer™ Purple Toning Conditioner',
  NULL,
  '250',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1240 olaplex olaplex haarverzorging conditioner purple conditioner nº.5p blonde enhancer™ purple toning conditioner 250 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1241',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Purple conditioner',
  'Nº.5P Blonde Enhancer™ Purple Toning Conditioner',
  NULL,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1241 olaplex olaplex haarverzorging conditioner purple conditioner nº.5p blonde enhancer™ purple toning conditioner 1000 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1242',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Shampoo fijn haar',
  'Nº.4FINE Bond Maintenance™ Volumizing Shampoo',
  NULL,
  '100',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1242 olaplex olaplex haarverzorging shampoo shampoo fijn haar nº.4fine bond maintenance™ volumizing shampoo 100 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1243',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Shampoo fijn haar',
  'Nº.4FINE Bond Maintenance™ Volumizing Shampoo',
  NULL,
  '250',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1243 olaplex olaplex haarverzorging shampoo shampoo fijn haar nº.4fine bond maintenance™ volumizing shampoo 250 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1244',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Shampoo fijn haar',
  'Nº.4FINE Bond Maintenance™ Volumizing Shampoo',
  NULL,
  '525',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1244 olaplex olaplex haarverzorging shampoo shampoo fijn haar nº.4fine bond maintenance™ volumizing shampoo 525 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1245',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Shampoo fijn haar',
  'Nº.4FINE Bond Maintenance™ Volumizing Shampoo',
  NULL,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1245 olaplex olaplex haarverzorging shampoo shampoo fijn haar nº.4fine bond maintenance™ volumizing shampoo 1000 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1246',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Conditioner fijn haar',
  'Nº.5FINE Bond Maintenance™ Volumizing Conditioner',
  NULL,
  '100',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1246 olaplex olaplex haarverzorging conditioner conditioner fijn haar nº.5fine bond maintenance™ volumizing conditioner 100 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1247',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Conditioner fijn haar',
  'Nº.5FINE Bond Maintenance™ Volumizing Conditioner',
  NULL,
  '250',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1247 olaplex olaplex haarverzorging conditioner conditioner fijn haar nº.5fine bond maintenance™ volumizing conditioner 250 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1248',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Conditioner fijn haar',
  'Nº.5FINE Bond Maintenance™ Volumizing Conditioner',
  NULL,
  '525',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1248 olaplex olaplex haarverzorging conditioner conditioner fijn haar nº.5fine bond maintenance™ volumizing conditioner 525 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1249',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Conditioner fijn haar',
  'Nº.5FINE Bond Maintenance™ Volumizing Conditioner',
  NULL,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1249 olaplex olaplex haarverzorging conditioner conditioner fijn haar nº.5fine bond maintenance™ volumizing conditioner 1000 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1250',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Krullenshampoo',
  'Nº.4CURL Bond Shaper™ Hydrating Curl Shampoo',
  NULL,
  '100',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1250 olaplex olaplex haarverzorging shampoo krullenshampoo nº.4curl bond shaper™ hydrating curl shampoo 100 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1251',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Krullenshampoo',
  'Nº.4CURL Bond Shaper™ Hydrating Curl Shampoo',
  NULL,
  '250',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1251 olaplex olaplex haarverzorging shampoo krullenshampoo nº.4curl bond shaper™ hydrating curl shampoo 250 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1252',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Krullenshampoo',
  'Nº.4CURL Bond Shaper™ Hydrating Curl Shampoo',
  NULL,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1252 olaplex olaplex haarverzorging shampoo krullenshampoo nº.4curl bond shaper™ hydrating curl shampoo 1000 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Shampoo'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1253',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Krullenconditioner',
  'Nº.5CURL Bond Shaper™ Hydrating Curl Conditioner',
  NULL,
  '100',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1253 olaplex olaplex haarverzorging conditioner krullenconditioner nº.5curl bond shaper™ hydrating curl conditioner 100 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1254',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Krullenconditioner',
  'Nº.5CURL Bond Shaper™ Hydrating Curl Conditioner',
  NULL,
  '250',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1254 olaplex olaplex haarverzorging conditioner krullenconditioner nº.5curl bond shaper™ hydrating curl conditioner 250 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1255',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Krullenconditioner',
  'Nº.5CURL Bond Shaper™ Hydrating Curl Conditioner',
  NULL,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1255 olaplex olaplex haarverzorging conditioner krullenconditioner nº.5curl bond shaper™ hydrating curl conditioner 1000 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1256',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Leave-in conditioner',
  'Nº.5 Leave-In™ Moisturize & Mend Leave-In Conditioner',
  NULL,
  '30',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1256 olaplex olaplex haarverzorging conditioner leave-in conditioner nº.5 leave-in™ moisturize & mend leave-in conditioner 30 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1257',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Leave-in conditioner',
  'Nº.5 Leave-In™ Moisturize & Mend Leave-In Conditioner',
  NULL,
  '100',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1257 olaplex olaplex haarverzorging conditioner leave-in conditioner nº.5 leave-in™ moisturize & mend leave-in conditioner 100 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Conditioner'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1258',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Leave-in stylingcrème',
  'Nº.6 Bond Smoother®',
  NULL,
  '100',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1258 olaplex olaplex haarverzorging leave-in leave-in stylingcrème nº.6 bond smoother® 100 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Leave-in'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1259',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Haarolie / styling',
  'Nº.7 Bonding Oil™',
  NULL,
  '30',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1259 olaplex olaplex haarverzorging haarolie / serum haarolie / styling nº.7 bonding oil™ 30 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Haarolie / serum'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1260',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Haarolie / styling',
  'Nº.7 Bonding Oil™',
  NULL,
  '60',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1260 olaplex olaplex haarverzorging haarolie / serum haarolie / styling nº.7 bonding oil™ 60 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Haarolie / serum'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1261',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Glansserum / oliemist',
  'Nº.7 Shine Serum Oil Mist',
  NULL,
  '80',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1261 olaplex olaplex haarverzorging haarolie / serum glansserum / oliemist nº.7 shine serum oil mist 80 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Haarolie / serum'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1262',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Haarserum / styling',
  'Nº.9 Bond Protector Nourishing Hair Serum',
  NULL,
  '90',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1262 olaplex olaplex haarverzorging haarolie / serum haarserum / styling nº.9 bond protector nourishing hair serum 90 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Haarolie / serum'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1263',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Krullengel / styling',
  'Nº.10 Bond Shaper™ Curl Defining Gel',
  NULL,
  '200',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1263 olaplex olaplex styling gel krullengel / styling nº.10 bond shaper™ curl defining gel 200 ml'
FROM brands b
JOIN categories c ON c.name = 'Styling'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Gel'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1264',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Föhnspray / styling',
  'Volumizing Blow Dry Mist',
  NULL,
  '150',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1264 olaplex olaplex styling styling spray föhnspray / styling volumizing blow dry mist 150 ml'
FROM brands b
JOIN categories c ON c.name = 'Styling'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Styling spray'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1265',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Hoofdhuidserum',
  'Scalp Longevity Treatment',
  NULL,
  '50',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1265 olaplex olaplex haarverzorging haarolie / serum hoofdhuidserum scalp longevity treatment 50 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Haarolie / serum'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1266',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Haarmasker',
  'Rich Hydration Mask',
  NULL,
  '200',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1266 olaplex olaplex haarverzorging haarmasker haarmasker rich hydration mask 200 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Haarmasker'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1267',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Haarmasker',
  'Weightless Nourishing Mask',
  NULL,
  '200',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1267 olaplex olaplex haarverzorging haarmasker haarmasker weightless nourishing mask 200 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Haarmasker'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1268',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Professionele bond treatment',
  'Nº.1 Bond Multiplier®',
  NULL,
  '525',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1268 olaplex olaplex haarverzorging treatment professionele bond treatment nº.1 bond multiplier® 525 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Treatment'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1269',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Professionele bond treatment',
  'Nº.2 Bond Perfector®',
  NULL,
  '525',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1269 olaplex olaplex haarverzorging treatment professionele bond treatment nº.2 bond perfector® 525 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Treatment'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1270',
  b.id,
  pl.id,
  c.id,
  pt.id,
  'Professionele bond treatment',
  'Nº.2 Bond Perfector® Backbar',
  NULL,
  '2000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1270 olaplex olaplex haarverzorging treatment professionele bond treatment nº.2 bond perfector® backbar 2000 ml'
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Treatment'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'OLAPLEX'
WHERE b.name = 'OLAPLEX'
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
  'EH-1271',
  b.id,
  pl.id,
  c.id,
  pt.id,
  NULL,
  'Blonde Me 3%',
  NULL,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1271 schwarzkopf blonde me kleur waterstofperoxide blonde me 3% 1000 ml'
FROM brands b
JOIN categories c ON c.name = 'Kleur'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Waterstofperoxide'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'Blonde Me'
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
  'EH-1272',
  b.id,
  pl.id,
  c.id,
  pt.id,
  NULL,
  'Blonde Me 6%',
  NULL,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1272 schwarzkopf blonde me kleur waterstofperoxide blonde me 6% 1000 ml'
FROM brands b
JOIN categories c ON c.name = 'Kleur'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Waterstofperoxide'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'Blonde Me'
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
  'EH-1273',
  b.id,
  pl.id,
  c.id,
  pt.id,
  NULL,
  'Blonde Me 9%',
  NULL,
  '1000',
  'ml',
  'stuk',
  NULL,
  NULL,
  NULL,
  1,
  'eh-1273 schwarzkopf blonde me kleur waterstofperoxide blonde me 9% 1000 ml'
FROM brands b
JOIN categories c ON c.name = 'Kleur'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Waterstofperoxide'
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'Blonde Me'
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
WHERE p.internal_product_code IN ('EH-1225', 'EH-1226', 'EH-1227', 'EH-1228', 'EH-1229', 'EH-1230', 'EH-1231', 'EH-1232', 'EH-1233', 'EH-1234', 'EH-1235', 'EH-1236', 'EH-1237', 'EH-1238', 'EH-1239', 'EH-1240', 'EH-1241', 'EH-1242', 'EH-1243', 'EH-1244', 'EH-1245', 'EH-1246', 'EH-1247', 'EH-1248', 'EH-1249', 'EH-1250', 'EH-1251', 'EH-1252', 'EH-1253', 'EH-1254', 'EH-1255', 'EH-1256', 'EH-1257', 'EH-1258', 'EH-1259', 'EH-1260', 'EH-1261', 'EH-1262', 'EH-1263', 'EH-1264', 'EH-1265', 'EH-1266', 'EH-1267', 'EH-1268', 'EH-1269', 'EH-1270', 'EH-1271', 'EH-1272', 'EH-1273');
