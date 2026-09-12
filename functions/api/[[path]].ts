import { z } from "zod";
import { searchTerms } from "../../src/shared/search";

interface Env {
  ELLAS_DB: D1Database;
  ALLOWED_EMAILS?: string;
  ADMIN_EMAILS?: string;
  DEV_USER_EMAIL?: string;
}

type PagesContext = EventContext<Env, string, unknown>;
type AuthOk = { user: { email: string; isAdmin: boolean } };
type AuthFail = { response: Response };

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "x-content-type-options": "nosniff",
  "referrer-policy": "same-origin",
  "cache-control": "no-store"
};

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { ...jsonHeaders, ...(init.headers ?? {}) }
  });
}

function splitEmails(value?: string) {
  return new Set((value ?? "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean));
}

function currentUser(request: Request, env: Env) {
  const email = request.headers.get("cf-access-authenticated-user-email")
    ?? request.headers.get("x-dev-user-email")
    ?? env.DEV_USER_EMAIL
    ?? "";
  const normalized = email.trim().toLowerCase();
  const allowed = splitEmails(env.ALLOWED_EMAILS);
  const admins = splitEmails(env.ADMIN_EMAILS);

  if (!normalized) return null;
  if (allowed.size > 0 && !allowed.has(normalized)) return null;
  return { email: normalized, isAdmin: admins.has(normalized) || admins.size === 0 };
}

async function requireUser(context: PagesContext): Promise<AuthOk | AuthFail> {
  const user = currentUser(context.request, context.env);
  if (!user) return { response: json({ error: "Niet geautoriseerd." }, { status: 401 }) };
  return { user };
}

async function requireAdmin(context: PagesContext): Promise<AuthOk | AuthFail> {
  const auth = await requireUser(context);
  if ("response" in auth) return auth;
  if (!auth.user.isAdmin) return { response: json({ error: "Beheerrechten vereist." }, { status: 403 }) };
  return auth;
}

function numberParam(url: URL, name: string) {
  const value = url.searchParams.get(name);
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

const productSelect = `
SELECT
  p.id,
  p.internal_product_code,
  p.brand_id,
  b.name AS brand_name,
  p.product_line_id,
  pl.name AS product_line_name,
  p.category_id,
  c.name AS category_name,
  p.product_type_id,
  pt.name AS product_type_name,
  p.variant_group,
  p.product_name,
  p.shade_code,
  p.content_value,
  p.content_unit,
  p.order_unit,
  p.supplier_id,
  s.name AS supplier_name,
  p.supplier_sku,
  p.barcode_gtin,
  p.active,
  p.search_text,
  COALESCE(os.total_ordered, 0) AS total_ordered
FROM products p
JOIN brands b ON b.id = p.brand_id
JOIN categories c ON c.id = p.category_id
JOIN product_types pt ON pt.id = p.product_type_id
LEFT JOIN product_lines pl ON pl.id = p.product_line_id
LEFT JOIN suppliers s ON s.id = p.supplier_id
LEFT JOIN (
  SELECT product_id, SUM(quantity) AS total_ordered
  FROM order_items
  WHERE product_id IS NOT NULL
  GROUP BY product_id
) os ON os.product_id = p.id
`;

async function listProducts(context: PagesContext, url: URL) {
  const search = url.searchParams.get("q")?.trim() ?? "";
  const brandId = numberParam(url, "brandId");
  const categoryId = numberParam(url, "categoryId");
  const productTypeId = numberParam(url, "productTypeId");
  const includeInactive = url.searchParams.get("includeInactive") === "true";
  const limit = Math.min(numberParam(url, "limit") ?? 120, 240);
  const offset = Math.max(numberParam(url, "offset") ?? 0, 0);

  const where = includeInactive ? ["1=1"] : ["p.active = 1"];
  const binds: unknown[] = [];
  if (brandId) {
    where.push("p.brand_id = ?");
    binds.push(brandId);
  }
  if (categoryId) {
    where.push("p.category_id = ?");
    binds.push(categoryId);
  }
  if (productTypeId) {
    where.push("p.product_type_id = ?");
    binds.push(productTypeId);
  }

  const hasFilters = Boolean(search || brandId || categoryId || productTypeId || includeInactive);
  let order = hasFilters
    ? "b.name, COALESCE(pl.name, ''), p.product_name, COALESCE(p.shade_code, '')"
    : "COALESCE(os.total_ordered, 0) DESC, b.name, COALESCE(pl.name, ''), p.product_name, COALESCE(p.shade_code, '')";
  if (search) {
    const terms = searchTerms(search);
    const like = `%${search.toLowerCase()}%`;
    for (const term of terms) {
      const shadeVariantChecks = term.variants.map(() => "lower(COALESCE(p.shade_code, '')) LIKE ?").join(" OR ");
      if (/^\d{1,2}$/.test(term.lower)) {
        where.push(`(${shadeVariantChecks} OR lower(p.product_name) LIKE ? OR p.search_text LIKE ?)`);
        binds.push(...term.variants.map((variant) => `${variant}%`));
        binds.push(`% ${term.lower}%`, `% ${term.lower}%`);
      } else {
        const variantChecks = term.variants.map(() => "p.search_text LIKE ?").join(" OR ");
        where.push(`(${variantChecks} OR ${shadeVariantChecks} OR lower(p.product_name) LIKE ?)`);
        binds.push(...term.variants.map((variant) => `%${variant}%`));
        binds.push(...term.variants.map((variant) => `${variant}%`));
        binds.push(`%${term.lower}%`);
      }
    }
    order = `CASE
      WHEN p.shade_code = ? THEN 0
      WHEN lower(p.product_name) = lower(?) THEN 1
      WHEN lower(p.product_name) LIKE lower(?) THEN 2
      WHEN lower(COALESCE(p.shade_code, '')) LIKE ? THEN 3
      WHEN p.search_text LIKE ? THEN 4
      WHEN ${terms.map(() => "p.search_text LIKE ?").join(" AND ")} THEN 5
      ELSE 6
    END, ${order}`;
    const firstNumericTerm = terms.find((term) => /^\d{1,2}$/.test(term.lower));
    binds.push(search, search, `${search}%`, firstNumericTerm ? `${firstNumericTerm.lower}%` : `${search.toLowerCase()}%`, like);
    binds.push(...terms.map((term) => `%${term.lower}%`));
  }

  binds.push(limit + 1, offset);
  const result = await context.env.ELLAS_DB.prepare(`${productSelect} WHERE ${where.join(" AND ")} ORDER BY ${order} LIMIT ? OFFSET ?`).bind(...binds).all();
  const products = result.results.slice(0, limit);
  return json({ products, hasMore: result.results.length > limit, nextOffset: offset + products.length });
}

async function filters(context: PagesContext) {
  const [brands, categories, productTypes, lines] = await Promise.all([
    context.env.ELLAS_DB.prepare("SELECT id, name, active FROM brands ORDER BY name").all(),
    context.env.ELLAS_DB.prepare("SELECT id, name, active, sort_order FROM categories ORDER BY sort_order, name").all(),
    context.env.ELLAS_DB.prepare("SELECT pt.id, pt.category_id, c.name AS category_name, pt.name, pt.active, pt.sort_order FROM product_types pt JOIN categories c ON c.id = pt.category_id ORDER BY c.sort_order, pt.sort_order, pt.name").all(),
    context.env.ELLAS_DB.prepare("SELECT pl.id, pl.brand_id, b.name AS brand_name, pl.name, pl.active FROM product_lines pl JOIN brands b ON b.id = pl.brand_id ORDER BY b.name, pl.name").all()
  ]);
  return json({ brands: brands.results, categories: categories.results, productTypes: productTypes.results, lines: lines.results });
}

const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive().max(999)
  })).min(1)
});

async function saveOrder(context: PagesContext) {
  const auth = await requireUser(context);
  if ("response" in auth) return auth.response;
  const body = orderSchema.safeParse(await context.request.json());
  if (!body.success) return json({ error: "Ongeldige bestelling.", details: body.error.flatten() }, { status: 400 });

  const order = await context.env.ELLAS_DB.prepare("INSERT INTO orders (created_by_email, status) VALUES (?, 'saved') RETURNING id, created_at, created_by_email, status")
    .bind(auth.user.email)
    .first<{ id: number; created_at: string; created_by_email: string; status: string }>();
  if (!order) return json({ error: "Bestelling kon niet worden opgeslagen." }, { status: 500 });

  for (const item of body.data.items) {
    await context.env.ELLAS_DB.prepare(`
      INSERT INTO order_items (
        order_id, product_id, quantity, internal_product_code, brand_name, product_line_name,
        category_name, product_type_name, variant_group, product_name, shade_code,
        content_value, content_unit, order_unit, supplier_sku, barcode_gtin
      )
      SELECT ?, p.id, ?, p.internal_product_code, b.name, pl.name, c.name, pt.name, p.variant_group,
        p.product_name, p.shade_code, p.content_value, p.content_unit, p.order_unit, p.supplier_sku, p.barcode_gtin
      FROM products p
      JOIN brands b ON b.id = p.brand_id
      JOIN categories c ON c.id = p.category_id
      JOIN product_types pt ON pt.id = p.product_type_id
      LEFT JOIN product_lines pl ON pl.id = p.product_line_id
      WHERE p.id = ?
    `).bind(order.id, item.quantity, item.productId).run();
  }

  return json({ order });
}

async function listOrders(context: PagesContext) {
  const result = await context.env.ELLAS_DB.prepare(`
    SELECT o.id, o.created_at, o.created_by_email, o.status,
      COUNT(oi.id) AS unique_products,
      COALESCE(SUM(oi.quantity), 0) AS total_quantity
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    GROUP BY o.id
    ORDER BY o.created_at DESC
    LIMIT 100
  `).all();
  return json({ orders: result.results });
}

async function orderDetail(context: PagesContext, id: number) {
  const order = await context.env.ELLAS_DB.prepare(`
    SELECT o.id, o.created_at, o.created_by_email, o.status,
      COUNT(oi.id) AS unique_products,
      COALESCE(SUM(oi.quantity), 0) AS total_quantity
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    WHERE o.id = ?
    GROUP BY o.id
  `).bind(id).first();
  if (!order) return json({ error: "Bestelling niet gevonden." }, { status: 404 });
  const items = await context.env.ELLAS_DB.prepare("SELECT * FROM order_items WHERE order_id = ? ORDER BY brand_name, product_line_name, product_name, shade_code").bind(id).all();
  return json({ order: { ...order, items: items.results } });
}

const productInput = z.object({
  internal_product_code: z.string().trim().min(1).optional(),
  brand_id: z.number().int().positive(),
  product_line_id: z.number().int().positive().nullable().optional(),
  category_id: z.number().int().positive(),
  product_type_id: z.number().int().positive(),
  variant_group: z.string().trim().nullable().optional(),
  product_name: z.string().trim().min(1),
  shade_code: z.string().nullable().optional(),
  content_value: z.string().nullable().optional(),
  content_unit: z.string().nullable().optional(),
  order_unit: z.string().trim().min(1).default("stuk"),
  supplier_id: z.number().int().positive().nullable().optional(),
  supplier_sku: z.string().nullable().optional(),
  barcode_gtin: z.string().nullable().optional(),
  active: z.boolean().default(true)
});

async function nextProductCode(db: D1Database) {
  const row = await db.prepare("SELECT internal_product_code FROM products WHERE internal_product_code LIKE 'EH-%' ORDER BY internal_product_code DESC LIMIT 1").first<{ internal_product_code: string }>();
  const last = row?.internal_product_code.match(/EH-(\d+)/)?.[1] ?? "0";
  return `EH-${String(Number(last) + 1).padStart(4, "0")}`;
}

function nullable(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

async function productSearchText(db: D1Database, data: z.infer<typeof productInput> & { internal_product_code: string }) {
  const refs = await db.prepare(`
    SELECT b.name AS brand, c.name AS category, pt.name AS product_type, pl.name AS product_line
    FROM brands b
    JOIN categories c ON c.id = ?
    JOIN product_types pt ON pt.id = ?
    LEFT JOIN product_lines pl ON pl.id = ?
    WHERE b.id = ?
  `).bind(data.category_id, data.product_type_id, data.product_line_id ?? null, data.brand_id).first<Record<string, string | null>>();
  return [
    data.internal_product_code,
    refs?.brand,
    refs?.product_line,
    refs?.category,
    refs?.product_type,
    data.variant_group,
    data.product_name,
    data.shade_code,
    data.content_value,
    data.content_unit
  ].filter(Boolean).join(" ").toLowerCase();
}

async function createProduct(context: PagesContext) {
  const auth = await requireAdmin(context);
  if ("response" in auth) return auth.response;
  const parsed = productInput.safeParse(await context.request.json());
  if (!parsed.success) return json({ error: "Ongeldig product.", details: parsed.error.flatten() }, { status: 400 });
  const code = parsed.data.internal_product_code?.trim() || await nextProductCode(context.env.ELLAS_DB);
  const searchText = await productSearchText(context.env.ELLAS_DB, { ...parsed.data, internal_product_code: code });
  await context.env.ELLAS_DB.prepare(`
    INSERT INTO products (internal_product_code, brand_id, product_line_id, category_id, product_type_id, variant_group, product_name, shade_code, content_value, content_unit, order_unit, supplier_id, supplier_sku, barcode_gtin, active, search_text)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(code, parsed.data.brand_id, parsed.data.product_line_id ?? null, parsed.data.category_id, parsed.data.product_type_id, nullable(parsed.data.variant_group), parsed.data.product_name, nullable(parsed.data.shade_code), nullable(parsed.data.content_value), nullable(parsed.data.content_unit), parsed.data.order_unit, parsed.data.supplier_id ?? null, nullable(parsed.data.supplier_sku), nullable(parsed.data.barcode_gtin), parsed.data.active ? 1 : 0, searchText).run();
  const product = await context.env.ELLAS_DB.prepare(`${productSelect} WHERE p.internal_product_code = ?`).bind(code).first();
  return json({ product }, { status: 201 });
}

async function updateProduct(context: PagesContext, id: number) {
  const auth = await requireAdmin(context);
  if ("response" in auth) return auth.response;
  const parsed = productInput.safeParse(await context.request.json());
  if (!parsed.success) return json({ error: "Ongeldig product.", details: parsed.error.flatten() }, { status: 400 });
  const existing = await context.env.ELLAS_DB.prepare("SELECT internal_product_code FROM products WHERE id = ?").bind(id).first<{ internal_product_code: string }>();
  if (!existing) return json({ error: "Product niet gevonden." }, { status: 404 });
  const code = parsed.data.internal_product_code?.trim() || existing.internal_product_code;
  const searchText = await productSearchText(context.env.ELLAS_DB, { ...parsed.data, internal_product_code: code });
  await context.env.ELLAS_DB.prepare(`
    UPDATE products SET internal_product_code = ?, brand_id = ?, product_line_id = ?, category_id = ?, product_type_id = ?, variant_group = ?, product_name = ?, shade_code = ?, content_value = ?, content_unit = ?, order_unit = ?, supplier_id = ?, supplier_sku = ?, barcode_gtin = ?, active = ?, search_text = ?, updated_at = datetime('now')
    WHERE id = ?
  `).bind(code, parsed.data.brand_id, parsed.data.product_line_id ?? null, parsed.data.category_id, parsed.data.product_type_id, nullable(parsed.data.variant_group), parsed.data.product_name, nullable(parsed.data.shade_code), nullable(parsed.data.content_value), nullable(parsed.data.content_unit), parsed.data.order_unit, parsed.data.supplier_id ?? null, nullable(parsed.data.supplier_sku), nullable(parsed.data.barcode_gtin), parsed.data.active ? 1 : 0, searchText, id).run();
  const product = await context.env.ELLAS_DB.prepare(`${productSelect} WHERE p.id = ?`).bind(id).first();
  return json({ product });
}

const entitySchema = z.object({
  name: z.string().trim().min(1),
  active: z.boolean().default(true),
  sort_order: z.number().int().optional(),
  brand_id: z.number().int().positive().optional(),
  category_id: z.number().int().positive().optional()
});

async function createEntity(context: PagesContext, entity: string) {
  const auth = await requireAdmin(context);
  if ("response" in auth) return auth.response;
  const parsed = entitySchema.safeParse(await context.request.json());
  if (!parsed.success) return json({ error: "Ongeldige invoer.", details: parsed.error.flatten() }, { status: 400 });
  const db = context.env.ELLAS_DB;
  if (entity === "brands") await db.prepare("INSERT INTO brands (name, active) VALUES (?, ?)").bind(parsed.data.name, parsed.data.active ? 1 : 0).run();
  if (entity === "suppliers") await db.prepare("INSERT INTO suppliers (name, active) VALUES (?, ?)").bind(parsed.data.name, parsed.data.active ? 1 : 0).run();
  if (entity === "categories") await db.prepare("INSERT INTO categories (name, active, sort_order) VALUES (?, ?, ?)").bind(parsed.data.name, parsed.data.active ? 1 : 0, parsed.data.sort_order ?? 0).run();
  if (entity === "product-lines") await db.prepare("INSERT INTO product_lines (brand_id, name, active) VALUES (?, ?, ?)").bind(parsed.data.brand_id, parsed.data.name, parsed.data.active ? 1 : 0).run();
  if (entity === "product-types") await db.prepare("INSERT INTO product_types (category_id, name, active, sort_order) VALUES (?, ?, ?, ?)").bind(parsed.data.category_id, parsed.data.name, parsed.data.active ? 1 : 0, parsed.data.sort_order ?? 0).run();
  if (!["brands", "suppliers", "categories", "product-lines", "product-types"].includes(entity)) return json({ error: "Onbekende stamdata." }, { status: 404 });
  return json({ ok: true }, { status: 201 });
}

async function masterdataCsv(context: PagesContext) {
  const auth = await requireAdmin(context);
  if ("response" in auth) return auth.response;
  const result = await context.env.ELLAS_DB.prepare(`${productSelect} ORDER BY p.internal_product_code`).all<Record<string, unknown>>();
  const columns = ["internal_product_code", "brand_name", "category_name", "product_type_name", "product_line_name", "variant_group", "product_name", "shade_code", "content_value", "content_unit", "order_unit", "supplier_name", "supplier_sku", "barcode_gtin", "active"];
  const escape = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [columns.join(","), ...result.results.map((row) => columns.map((column) => escape(row[column])).join(","))].join("\n");
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="ellas-haarshop-masterdata.csv"`,
      "x-content-type-options": "nosniff",
      "referrer-policy": "same-origin",
      "cache-control": "no-store"
    }
  });
}

export const onRequest: PagesFunction<Env> = async (context): Promise<Response> => {
  const url = new URL(context.request.url);
  const path = url.pathname.replace(/^\/api\/?/, "");
  const method = context.request.method;

  const auth = await requireUser(context);
  if ("response" in auth) return auth.response;

  if (method === "GET" && path === "me") return json({ user: auth.user });
  if (method === "GET" && path === "filters") return filters(context);
  if (method === "GET" && path === "products") return listProducts(context, url);
  if (method === "POST" && path === "orders") return saveOrder(context);
  if (method === "GET" && path === "orders") return listOrders(context);
  const orderMatch = path.match(/^orders\/(\d+)$/);
  if (method === "GET" && orderMatch) return orderDetail(context, Number(orderMatch[1]));
  if (method === "POST" && path === "admin/products") return createProduct(context);
  const productMatch = path.match(/^admin\/products\/(\d+)$/);
  if (method === "PUT" && productMatch) return updateProduct(context, Number(productMatch[1]));
  const entityMatch = path.match(/^admin\/(brands|suppliers|categories|product-lines|product-types)$/);
  if (method === "POST" && entityMatch) return createEntity(context, entityMatch[1]);
  if (method === "GET" && path === "admin/masterdata.csv") return masterdataCsv(context);

  return json({ error: "Route niet gevonden." }, { status: 404 });
};
