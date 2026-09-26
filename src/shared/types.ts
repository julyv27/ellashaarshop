export type Id = number;

export interface UserInfo {
  email: string;
  isAdmin: boolean;
}

export interface Brand {
  id: Id;
  name: string;
  active: boolean;
}

export interface ProductLine {
  id: Id;
  brand_id: Id;
  brand_name?: string;
  name: string;
  active: boolean;
}

export interface Category {
  id: Id;
  name: string;
  active: boolean;
  sort_order: number;
}

export interface ProductType {
  id: Id;
  category_id: Id;
  category_name?: string;
  name: string;
  active: boolean;
  sort_order: number;
}

export interface Supplier {
  id: Id;
  name: string;
  active: boolean;
}

export interface Product {
  id: Id;
  internal_product_code: string;
  brand_id: Id;
  brand_name: string;
  product_line_id: Id | null;
  product_line_name: string | null;
  category_id: Id;
  category_name: string;
  product_type_id: Id;
  product_type_name: string;
  variant_group: string | null;
  product_name: string;
  shade_code: string | null;
  content_value: string | null;
  content_unit: string | null;
  order_unit: string;
  supplier_id: Id | null;
  supplier_name?: string | null;
  supplier_sku: string | null;
  barcode_gtin: string | null;
  sale_price_cents: number | null;
  active: boolean;
  search_text: string;
}

export interface FiltersPayload {
  brands: Brand[];
  categories: Category[];
  productTypes: ProductType[];
  lines: ProductLine[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItemSnapshot {
  id: Id;
  quantity: number;
  internal_product_code: string;
  brand_name: string;
  product_line_name: string | null;
  category_name: string;
  product_type_name: string;
  variant_group: string | null;
  product_name: string;
  shade_code: string | null;
  content_value: string | null;
  content_unit: string | null;
  order_unit: string;
}

export interface OrderSummary {
  id: Id;
  created_at: string;
  created_by_email: string;
  status: string;
  unique_products: number;
  total_quantity: number;
}

export interface OrderDetail extends OrderSummary {
  items: OrderItemSnapshot[];
}

export interface CatalogImportRow {
  internalProductCode: string;
  brand: string;
  category: string;
  productType: string;
  productLine: string | null;
  variantGroup: string | null;
  productName: string;
  shadeCode: string | null;
  contentValue: string | null;
  contentUnit: string | null;
  orderUnit: string;
  supplier: string | null;
  supplierSku: string | null;
  barcodeGtin: string | null;
  active: boolean;
  sourceFile: string | null;
  searchText: string;
}
