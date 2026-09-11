PRAGMA foreign_keys = ON;

CREATE TABLE brands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE product_lines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand_id INTEGER NOT NULL REFERENCES brands(id),
  name TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (brand_id, name)
);

CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE product_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  name TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE (category_id, name)
);

CREATE TABLE suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  internal_product_code TEXT NOT NULL UNIQUE,
  brand_id INTEGER NOT NULL REFERENCES brands(id),
  product_line_id INTEGER REFERENCES product_lines(id),
  category_id INTEGER NOT NULL REFERENCES categories(id),
  product_type_id INTEGER NOT NULL REFERENCES product_types(id),
  variant_group TEXT,
  product_name TEXT NOT NULL,
  shade_code TEXT,
  content_value TEXT,
  content_unit TEXT,
  order_unit TEXT NOT NULL DEFAULT 'stuk',
  supplier_id INTEGER REFERENCES suppliers(id),
  supplier_sku TEXT,
  barcode_gtin TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  search_text TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_type ON products(product_type_id);
CREATE INDEX idx_products_line ON products(product_line_id);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_barcode ON products(barcode_gtin);
CREATE INDEX idx_products_search ON products(search_text);

CREATE VIRTUAL TABLE products_fts USING fts5(
  internal_product_code,
  brand,
  product_line,
  category,
  product_type,
  variant_group,
  product_name,
  shade_code,
  content,
  search_text,
  content='',
  tokenize='unicode61 remove_diacritics 2'
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  created_by_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'saved',
  metadata_json TEXT
);

CREATE TABLE order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  internal_product_code TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  product_line_name TEXT,
  category_name TEXT NOT NULL,
  product_type_name TEXT NOT NULL,
  variant_group TEXT,
  product_name TEXT NOT NULL,
  shade_code TEXT,
  content_value TEXT,
  content_unit TEXT,
  order_unit TEXT NOT NULL,
  supplier_sku TEXT,
  barcode_gtin TEXT
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);

CREATE TABLE import_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  source_file TEXT NOT NULL,
  dry_run INTEGER NOT NULL DEFAULT 1,
  total_rows INTEGER NOT NULL DEFAULT 0,
  accepted_rows INTEGER NOT NULL DEFAULT 0,
  rejected_rows INTEGER NOT NULL DEFAULT 0,
  report_json TEXT NOT NULL
);
