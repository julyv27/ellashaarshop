PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO brands (name, active) VALUES ('DELUXE', 1);
INSERT OR IGNORE INTO brands (name, active) VALUES ('Keune', 1);
INSERT OR IGNORE INTO brands (name, active) VALUES ('L''Oréal Professionnel', 1);
INSERT OR IGNORE INTO brands (name, active) VALUES ('Schwarzkopf', 1);
INSERT OR IGNORE INTO brands (name, active) VALUES ('Wella', 1);

INSERT OR IGNORE INTO categories (name, active, sort_order) VALUES ('Kleur', 1, 2);
INSERT OR IGNORE INTO categories (name, active, sort_order) VALUES ('Haarverzorging', 1, 1);
INSERT OR IGNORE INTO categories (name, active, sort_order) VALUES ('Styling', 1, 3);
INSERT OR IGNORE INTO categories (name, active, sort_order) VALUES ('Permanent- en ontkrulbehandelingen', 1, 6);

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Kleurbooster', 1, 7 FROM categories WHERE name = 'Kleur';

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Blondeerpoeder', 1, 3 FROM categories WHERE name = 'Kleur';

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Haarmasker', 1, 4 FROM categories WHERE name = 'Haarverzorging';

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Hittebescherming', 1, 6 FROM categories WHERE name = 'Styling';

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Styling spray', 1, 5 FROM categories WHERE name = 'Styling';

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Haarlak', 1, 1 FROM categories WHERE name = 'Styling';

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Permanentlotion', 1, 1 FROM categories WHERE name = 'Permanent- en ontkrulbehandelingen';

INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order)
SELECT id, 'Neutralisatie / fixatie', 1, 3 FROM categories WHERE name = 'Permanent- en ontkrulbehandelingen';

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'Tinta Color', 1 FROM brands WHERE name = 'Keune';

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'DELUXE', 1 FROM brands WHERE name = 'DELUXE';

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'Natural Styling Hydrowave Classic', 1 FROM brands WHERE name = 'Schwarzkopf';

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'Metal Detox', 1 FROM brands WHERE name = 'L''Oréal Professionnel';

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'EIMI Smooth', 1 FROM brands WHERE name = 'Wella';

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'Tecni.Art', 1 FROM brands WHERE name = 'L''Oréal Professionnel';

INSERT OR IGNORE INTO product_lines (brand_id, name, active)
SELECT id, 'OSiS+ Hold', 1 FROM brands WHERE name = 'Schwarzkopf';

WITH new_products(
  internal_product_code,
  brand_name,
  product_line_name,
  category_name,
  product_type_name,
  variant_group,
  product_name,
  shade_code,
  content_value,
  content_unit,
  supplier_sku,
  barcode_gtin
) AS (
  VALUES
    ('EH-1293', 'Keune', 'Tinta Color', 'Kleur', 'Kleurbooster', 'Professioneel; capsules voor intensivering van rode Tinta Color-tinten', 'Keune Tinta Color Red Booster', 'Red Booster', '10 x 3', 'ml', NULL, NULL),
    ('EH-1294', 'DELUXE', 'DELUXE', 'Kleur', 'Blondeerpoeder', 'Blondeerpoeder 500 g. Merk door gebruiker bevestigd als DELUXE.', 'DELUXE Deluxe Bleach', NULL, '500', 'g', NULL, NULL),
    ('EH-1295', 'Schwarzkopf', 'Natural Styling Hydrowave Classic', 'Permanent- en ontkrulbehandelingen', 'Permanentlotion', 'Voor weerbarstig haar', 'Schwarzkopf Natural Styling Hydrowave Classic Natural Styling Classic 0', '0', '1000', 'ml', '3050528', NULL),
    ('EH-1296', 'Schwarzkopf', 'Natural Styling Hydrowave Classic', 'Permanent- en ontkrulbehandelingen', 'Permanentlotion', 'Voor normaal haar', 'Schwarzkopf Natural Styling Hydrowave Classic Natural Styling Classic 1', '1', '1000', 'ml', '3050530', NULL),
    ('EH-1297', 'Schwarzkopf', 'Natural Styling Hydrowave Classic', 'Permanent- en ontkrulbehandelingen', 'Permanentlotion', 'Voor gekleurd/opgelicht haar', 'Schwarzkopf Natural Styling Hydrowave Classic Natural Styling Classic 2', '2', '1000', 'ml', '3050541', NULL),
    ('EH-1298', 'Schwarzkopf', 'Natural Styling Hydrowave Classic', 'Permanent- en ontkrulbehandelingen', 'Neutralisatie / fixatie', 'Neutraliser voor Natural Styling 0 en 1', 'Schwarzkopf Natural Styling Hydrowave Classic Natural Styling Neutraliser Fixing Lotion 0/1', '0/1', '1000', 'ml', '3050543', NULL),
    ('EH-1299', 'Schwarzkopf', 'Natural Styling Hydrowave Classic', 'Permanent- en ontkrulbehandelingen', 'Neutralisatie / fixatie', 'Neutraliser+ voor Natural Styling 2 en 3', 'Schwarzkopf Natural Styling Hydrowave Classic Natural Styling Neutraliser+ Fixing Lotion 2/3', '2/3', '1000', 'ml', '3050546', NULL),
    ('EH-1300', 'L''Oréal Professionnel', 'Metal Detox', 'Haarverzorging', 'Haarmasker', 'Professioneel anti-metaal masker voor alle haartypes', 'L''Oréal Professionnel Metal Detox Metal Detox Masker', NULL, '250', 'ml', '30160606', NULL),
    ('EH-1301', 'L''Oréal Professionnel', 'Metal Detox', 'Haarverzorging', 'Haarmasker', 'Professioneel anti-metaal masker voor alle haartypes', 'L''Oréal Professionnel Metal Detox Metal Detox Masker', NULL, '500', 'ml', '30163478', NULL),
    ('EH-1302', 'Wella', 'EIMI Smooth', 'Styling', 'Hittebescherming', '2-fasen spray; hittebescherming tot 220°C; fixatieniveau 2', 'Wella EIMI Smooth Thermal Image', NULL, '150', 'ml', NULL, '8005610574875'),
    ('EH-1303', 'L''Oréal Professionnel', 'Tecni.Art', 'Styling', 'Styling spray', 'Voor vormgeheugen, grip, volume en wortellift', 'L''Oréal Professionnel Tecni.Art Pli Shaper Tecni.Art thermo-modellerende spray', NULL, '190', 'ml', '30160255', '3474630736221'),
    ('EH-1304', 'Schwarzkopf', 'OSiS+ Hold', 'Styling', 'Haarlak', 'Strong hold; fijne sneldrogende mist; hittebescherming tot 230°C', 'Schwarzkopf OSiS+ Hold OSiS Freeze Pump', NULL, '200', 'ml', '3066441', '4045787999082')
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
  np.shade_code,
  np.content_value,
  np.content_unit,
  'stuk',
  NULL,
  np.supplier_sku,
  np.barcode_gtin,
  1,
  LOWER(np.internal_product_code || ' ' || np.brand_name || ' ' || np.product_line_name || ' ' || np.category_name || ' ' || np.product_type_name || ' ' || COALESCE(np.variant_group, '') || ' ' || np.product_name || ' ' || COALESCE(np.shade_code, '') || ' ' || COALESCE(np.content_value, '') || ' ' || COALESCE(np.content_unit, '') || ' ' || COALESCE(np.supplier_sku, '') || ' ' || COALESCE(np.barcode_gtin, ''))
FROM new_products np
JOIN brands b ON b.name = np.brand_name
JOIN categories c ON c.name = np.category_name
JOIN product_types pt ON pt.category_id = c.id AND pt.name = np.product_type_name
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = np.product_line_name
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
WHERE p.internal_product_code BETWEEN 'EH-1293' AND 'EH-1304';
