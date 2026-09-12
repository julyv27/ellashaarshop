UPDATE products
SET active = 0, updated_at = datetime('now')
WHERE brand_id = (SELECT id FROM brands WHERE name = 'KIS')
  AND product_name IN (
    'KIS KeraCream Color 100A',
    'KIS KeraCream Color 100B',
    'KIS KeraCream Color 100V',
    'KIS KeraCream Color 100N',
    'KIS KeraCream Color 100G',
    'KIS KeraCream Color 10.7',
    'KIS KeraCream Color 10A',
    'KIS KeraCream Color 10B',
    'KIS KeraCream Color 10G',
    'KIS KeraCream Color 4M',
    'KIS KeraCream Color 5B',
    'KIS KeraCream Color 5M',
    'KIS KeraCream Color 6B',
    'KIS KeraCream Color 6M',
    'KIS KeraCream Color 7B',
    'KIS KeraCream Color 7M',
    'KIS KeraCream Color 8M',
    'KIS KeraCream Color 9A'
  );
