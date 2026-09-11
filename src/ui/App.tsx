import { Archive, Boxes, ClipboardList, Download, FileSpreadsheet, History, Minus, PackagePlus, Plus, Search, Settings, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { contentLabel, plainTextOrder, productDisplayName } from "../shared/format";
import type { CartItem, FiltersPayload, OrderDetail, OrderSummary, Product, UserInfo } from "../shared/types";
import { api } from "./api";
import { exportExcel, exportPdf } from "./exports";
import { loadCart, saveCart, setQuantity, totals } from "./cart";

type View = "products" | "cart" | "history" | "admin";

export function App() {
  const [view, setView] = useState<View>("products");
  const [user, setUser] = useState<UserInfo | null>(null);
  const [filters, setFilters] = useState<FiltersPayload>({ brands: [], categories: [], productTypes: [], lines: [] });
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Record<number, CartItem>>(() => loadCart());
  const [query, setQuery] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productTypeId, setProductTypeId] = useState("");
  const [includeInactive, setIncludeInactive] = useState(false);
  const [message, setMessage] = useState("");
  const count = totals(cart);

  useEffect(() => {
    Promise.all([api.me(), api.filters()])
      .then(([me, data]) => {
        setUser(me.user);
        setFilters(data);
      })
      .catch((error) => setMessage(error.message));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (brandId) params.set("brandId", brandId);
    if (categoryId) params.set("categoryId", categoryId);
    if (productTypeId) params.set("productTypeId", productTypeId);
    if (includeInactive) params.set("includeInactive", "true");
    params.set("limit", "180");
    api.products(params).then((data) => setProducts(data.products)).catch((error) => setMessage(error.message));
  }, [query, brandId, categoryId, productTypeId, includeInactive]);

  const visibleTypes = useMemo(() => filters.productTypes.filter((type) => !categoryId || String(type.category_id) === categoryId), [filters.productTypes, categoryId]);

  function changeQuantity(product: Product, quantity: number) {
    setCart(setQuantity(cart, product, quantity));
  }

  function refreshFilters() {
    api.filters().then(setFilters).catch((error) => setMessage(error.message));
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Ella's Haarshop</h1>
          <p>{user?.email ?? "Private bestelsysteem"}</p>
        </div>
        <nav>
          <button className={view === "products" ? "active" : ""} onClick={() => setView("products")}><Boxes size={20} />Producten</button>
          <button className={view === "cart" ? "active" : ""} onClick={() => setView("cart")}><ClipboardList size={20} />Bestellijst <span>{count.unique}</span></button>
          <button className={view === "history" ? "active" : ""} onClick={() => setView("history")}><History size={20} />Historie</button>
          {user?.isAdmin && <button className={view === "admin" ? "active" : ""} onClick={() => setView("admin")}><Settings size={20} />Beheer</button>}
        </nav>
      </header>

      {message && <div className="message" onClick={() => setMessage("")}>{message}</div>}

      <main>
        {view === "products" && (
          <ProductsView
            products={products}
            filters={filters}
            visibleTypes={visibleTypes}
            query={query}
            setQuery={setQuery}
            brandId={brandId}
            setBrandId={setBrandId}
            categoryId={categoryId}
            setCategoryId={(value) => {
              setCategoryId(value);
              setProductTypeId("");
            }}
            productTypeId={productTypeId}
            setProductTypeId={setProductTypeId}
            includeInactive={includeInactive}
            setIncludeInactive={setIncludeInactive}
            cart={cart}
            changeQuantity={changeQuantity}
            count={count}
          />
        )}
        {view === "cart" && <CartView cart={cart} setCart={setCart} setView={setView} setMessage={setMessage} />}
        {view === "history" && <HistoryView />}
        {view === "admin" && user?.isAdmin && <AdminView filters={filters} products={products} refreshFilters={refreshFilters} setMessage={setMessage} />}
      </main>
    </div>
  );
}

function ProductsView(props: {
  products: Product[];
  filters: FiltersPayload;
  visibleTypes: FiltersPayload["productTypes"];
  query: string;
  setQuery: (value: string) => void;
  brandId: string;
  setBrandId: (value: string) => void;
  categoryId: string;
  setCategoryId: (value: string) => void;
  productTypeId: string;
  setProductTypeId: (value: string) => void;
  includeInactive: boolean;
  setIncludeInactive: (value: boolean) => void;
  cart: Record<number, CartItem>;
  changeQuantity: (product: Product, quantity: number) => void;
  count: { unique: number; quantity: number };
}) {
  return (
    <>
      <section className="toolbar">
        <label className="searchbox"><Search size={22} /><input value={props.query} onChange={(event) => props.setQuery(event.target.value)} placeholder="Zoek merk, lijn, product of kleurcode" /></label>
        <select value={props.brandId} onChange={(event) => props.setBrandId(event.target.value)}>
          <option value="">Alle merken</option>
          {props.filters.brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
        </select>
        <select value={props.categoryId} onChange={(event) => props.setCategoryId(event.target.value)}>
          <option value="">Alle categorieën</option>
          {props.filters.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <select value={props.productTypeId} onChange={(event) => props.setProductTypeId(event.target.value)}>
          <option value="">Alle producttypes</option>
          {props.visibleTypes.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
        </select>
        <label className="toggle"><input type="checkbox" checked={props.includeInactive} onChange={(event) => props.setIncludeInactive(event.target.checked)} /> Inactief</label>
      </section>

      <section className="summarybar">
        <strong>{props.count.unique}</strong> unieke producten, <strong>{props.count.quantity}</strong> stuks geselecteerd
      </section>

      <section className="product-grid">
        {props.products.map((product) => {
          const quantity = props.cart[product.id]?.quantity ?? 0;
          return (
            <article className={product.active ? "product-card" : "product-card inactive"} key={product.id}>
              <div>
                <p className="eyebrow">{product.brand_name}{product.product_line_name ? ` - ${product.product_line_name}` : ""}</p>
                <h2>{product.product_name}</h2>
                <p>{[product.variant_group, product.shade_code ? `Kleur ${product.shade_code}` : "", contentLabel(product)].filter(Boolean).join(" - ")}</p>
                <small>{product.internal_product_code} - {product.product_type_name}</small>
              </div>
              <Quantity value={quantity} onChange={(next) => props.changeQuantity(product, next)} />
            </article>
          );
        })}
      </section>
    </>
  );
}

function Quantity({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="quantity">
      <button aria-label="Verlaag aantal" onClick={() => onChange(Math.max(0, value - 1))}><Minus size={20} /></button>
      <input aria-label="Aantal" inputMode="numeric" value={value} onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))} />
      <button aria-label="Verhoog aantal" onClick={() => onChange(value + 1)}><Plus size={20} /></button>
    </div>
  );
}

function CartView({ cart, setCart, setView, setMessage }: { cart: Record<number, CartItem>; setCart: (cart: Record<number, CartItem>) => void; setView: (view: View) => void; setMessage: (message: string) => void }) {
  const items = Object.values(cart);
  const count = totals(cart);
  const text = plainTextOrder(items);

  function update(product: Product, quantity: number) {
    setCart(setQuantity(cart, product, quantity));
  }

  async function save() {
    const result = await api.saveOrder(items.map((item) => ({ productId: item.product.id, quantity: item.quantity })));
    saveCart({});
    setCart({});
    setMessage(`Bestelling #${result.order.id} opgeslagen.`);
    setView("history");
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <div><h2>Bestellijst</h2><p>{count.unique} unieke producten, {count.quantity} stuks</p></div>
        <button onClick={() => setView("products")}><PackagePlus size={20} />Verder zoeken</button>
      </div>
      <div className="cart-list">
        {items.map(({ product, quantity }) => (
          <article className="cart-row" key={product.id}>
            <div><strong>{productDisplayName(product)}</strong><small>{product.internal_product_code}</small></div>
            <Quantity value={quantity} onChange={(next) => update(product, next)} />
            <button className="icon" aria-label="Verwijder product" onClick={() => update(product, 0)}><Trash2 size={20} /></button>
          </article>
        ))}
      </div>
      <div className="actions">
        <button disabled={!items.length} onClick={() => exportExcel(items)}><FileSpreadsheet size={20} />Excel</button>
        <button disabled={!items.length} onClick={() => exportPdf(items)}><Download size={20} />PDF</button>
        <button disabled={!items.length} onClick={() => navigator.clipboard.writeText(text).then(() => setMessage("Tekst gekopieerd."))}><ClipboardList size={20} />Kopieer tekst</button>
        <button disabled={!items.length} onClick={save}><Archive size={20} />Bestelling opslaan</button>
        <button disabled={!items.length} onClick={() => { saveCart({}); setCart({}); }}><Trash2 size={20} />Leegmaken</button>
      </div>
      <textarea className="copytext" readOnly value={text} />
    </section>
  );
}

function HistoryView() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [detail, setDetail] = useState<OrderDetail | null>(null);
  useEffect(() => { api.orders().then((data) => setOrders(data.orders)); }, []);
  return (
    <section className="history-layout">
      <div className="panel">
        <h2>Bestelhistorie</h2>
        {orders.map((order) => (
          <button className="history-item" key={order.id} onClick={() => api.order(order.id).then((data) => setDetail(data.order))}>
            <strong>Bestelling #{order.id}</strong>
            <span>{new Date(order.created_at).toLocaleString("nl-NL")}</span>
            <small>{order.unique_products} producten - {order.total_quantity} stuks</small>
          </button>
        ))}
      </div>
      <div className="panel">
        {detail ? (
          <>
            <h2>Bestelling #{detail.id}</h2>
            <p>{detail.created_by_email} - {new Date(detail.created_at).toLocaleString("nl-NL")}</p>
            {detail.items.map((item) => <article className="detail-row" key={item.id}><strong>{item.quantity}x {productDisplayName(item)}</strong><small>{item.internal_product_code}</small></article>)}
          </>
        ) : <p>Selecteer een bestelling.</p>}
      </div>
    </section>
  );
}

function AdminView({ filters, products, refreshFilters, setMessage }: { filters: FiltersPayload; products: Product[]; refreshFilters: () => void; setMessage: (message: string) => void }) {
  const [entity, setEntity] = useState("brands");
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [product, setProduct] = useState<Partial<Product>>({ active: true, order_unit: "stuk" });

  async function addEntity() {
    await api.createEntity(entity, { name, brand_id: brandId ? Number(brandId) : undefined, category_id: categoryId ? Number(categoryId) : undefined, active: true });
    setName("");
    refreshFilters();
    setMessage("Toegevoegd.");
  }

  async function addProduct() {
    await api.createProduct({
      brand_id: Number(product.brand_id),
      product_line_id: product.product_line_id ? Number(product.product_line_id) : null,
      category_id: Number(product.category_id),
      product_type_id: Number(product.product_type_id),
      variant_group: product.variant_group ?? null,
      product_name: product.product_name,
      shade_code: product.shade_code ?? null,
      content_value: product.content_value ?? null,
      content_unit: product.content_unit ?? null,
      order_unit: product.order_unit || "stuk",
      supplier_id: product.supplier_id ? Number(product.supplier_id) : null,
      supplier_sku: product.supplier_sku ?? null,
      barcode_gtin: product.barcode_gtin ?? null,
      active: product.active ?? true
    });
    setProduct({ active: true, order_unit: "stuk" });
    setMessage("Product toegevoegd.");
  }

  async function deactivate(id: number, active: boolean) {
    const target = products.find((item) => item.id === id);
    if (!target) return;
    await api.updateProduct(id, { ...target, active });
    setMessage(active ? "Product geactiveerd." : "Product gedeactiveerd.");
  }

  return (
    <section className="admin-layout">
      <div className="panel">
        <h2>Stamdata toevoegen</h2>
        <select value={entity} onChange={(event) => setEntity(event.target.value)}>
          <option value="brands">Merk</option>
          <option value="product-lines">Lijn / submerk</option>
          <option value="categories">Categorie</option>
          <option value="product-types">Producttype</option>
          <option value="suppliers">Leverancier</option>
        </select>
        {entity === "product-lines" && <select value={brandId} onChange={(event) => setBrandId(event.target.value)}><option value="">Kies merk</option>{filters.brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}</select>}
        {entity === "product-types" && <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}><option value="">Kies categorie</option>{filters.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>}
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Naam" />
        <button onClick={addEntity} disabled={!name}><Plus size={20} />Toevoegen</button>
        <a className="button-link" href="/api/admin/masterdata.csv"><Download size={20} />Masterdata CSV</a>
      </div>

      <div className="panel">
        <h2>Nieuw product</h2>
        <div className="form-grid">
          <select value={product.brand_id ?? ""} onChange={(event) => setProduct({ ...product, brand_id: Number(event.target.value) })}><option value="">Merk</option>{filters.brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}</select>
          <select value={product.product_line_id ?? ""} onChange={(event) => setProduct({ ...product, product_line_id: Number(event.target.value) })}><option value="">Lijn</option>{filters.lines.filter((line) => !product.brand_id || line.brand_id === product.brand_id).map((line) => <option key={line.id} value={line.id}>{line.name}</option>)}</select>
          <select value={product.category_id ?? ""} onChange={(event) => setProduct({ ...product, category_id: Number(event.target.value), product_type_id: undefined })}><option value="">Categorie</option>{filters.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
          <select value={product.product_type_id ?? ""} onChange={(event) => setProduct({ ...product, product_type_id: Number(event.target.value) })}><option value="">Producttype</option>{filters.productTypes.filter((type) => !product.category_id || type.category_id === product.category_id).map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}</select>
          <input placeholder="Productnaam" value={product.product_name ?? ""} onChange={(event) => setProduct({ ...product, product_name: event.target.value })} />
          <input placeholder="Kleurcode exact als tekst" value={product.shade_code ?? ""} onChange={(event) => setProduct({ ...product, shade_code: event.target.value })} />
          <input placeholder="Serie / variantgroep" value={product.variant_group ?? ""} onChange={(event) => setProduct({ ...product, variant_group: event.target.value })} />
          <input placeholder="Inhoud" value={product.content_value ?? ""} onChange={(event) => setProduct({ ...product, content_value: event.target.value })} />
          <input placeholder="Eenheid" value={product.content_unit ?? ""} onChange={(event) => setProduct({ ...product, content_unit: event.target.value })} />
          <input placeholder="Besteleenheid" value={product.order_unit ?? "stuk"} onChange={(event) => setProduct({ ...product, order_unit: event.target.value })} />
        </div>
        <button onClick={addProduct} disabled={!product.brand_id || !product.category_id || !product.product_type_id || !product.product_name}><Plus size={20} />Product toevoegen</button>
      </div>

      <div className="panel product-admin">
        <h2>Producten activeren/deactiveren</h2>
        {products.slice(0, 80).map((item) => <article key={item.id}><span>{item.internal_product_code} - {productDisplayName(item)}</span><button onClick={() => deactivate(item.id, !item.active)}>{item.active ? "Deactiveren" : "Activeren"}</button></article>)}
      </div>
    </section>
  );
}
