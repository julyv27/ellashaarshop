PRAGMA foreign_keys = ON;

UPDATE products
SET
  product_name = 'INDOLA Care Repair Keratin Filler Spray',
  search_text = REPLACE(search_text, 'indola care repair keratin filler', 'indola care repair keratin filler spray'),
  updated_at = datetime('now')
WHERE internal_product_code = 'EH-0989';

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
WHERE p.internal_product_code = 'EH-0989';
