UPDATE products
SET active = 0, updated_at = datetime('now')
WHERE internal_product_code IN ('EH-0086', 'EH-1050');
