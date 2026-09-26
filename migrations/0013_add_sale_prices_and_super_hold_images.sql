ALTER TABLE products ADD COLUMN sale_price_cents INTEGER;

UPDATE products
SET sale_price_cents = 1665,
    updated_at = datetime('now')
WHERE brand_id = (SELECT id FROM brands WHERE name = 'Schwarzkopf')
  AND product_line_id = (
    SELECT pl.id
    FROM product_lines pl
    JOIN brands b ON b.id = pl.brand_id
    WHERE b.name = 'Schwarzkopf'
      AND pl.name = 'IGORA ROYAL'
  )
  AND active = 1;

UPDATE products
SET sale_price_cents = 1595,
    updated_at = datetime('now')
WHERE brand_id = (SELECT id FROM brands WHERE name = 'Schwarzkopf')
  AND product_line_id = (
    SELECT pl.id
    FROM product_lines pl
    JOIN brands b ON b.id = pl.brand_id
    WHERE b.name = 'Schwarzkopf'
      AND pl.name = 'IGORA VIBRANCE'
  )
  AND active = 1;

UPDATE products
SET active = 0,
    updated_at = datetime('now')
WHERE internal_product_code = 'EH-1097'
  AND product_name = 'Schwarzkopf Silhouette Super Hold Spray'
  AND content_value = '200'
  AND content_unit = 'ml';
