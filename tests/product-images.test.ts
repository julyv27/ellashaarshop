import { describe, expect, it } from "vitest";
import type { Product } from "../src/shared/types";
import { productImage } from "../src/ui/productImages";

const base: Product = {
  id: 1,
  internal_product_code: "EH-0001",
  brand_id: 1,
  brand_name: "Schwarzkopf",
  product_line_id: 1,
  product_line_name: "IGORA ROYAL",
  category_id: 1,
  category_name: "Verf",
  product_type_id: 1,
  product_type_name: "Verf",
  variant_group: null,
  product_name: "Schwarzkopf Igora Royal 7-00",
  shade_code: "7-00",
  content_value: "60",
  content_unit: "ml",
  order_unit: "stuk",
  supplier_id: null,
  supplier_sku: null,
  barcode_gtin: null,
  active: true,
  search_text: ""
};

describe("product images", () => {
  it("maps known color lines to their preview image", () => {
    expect(productImage(base)?.src).toBe("/assets/products/schwarzkopf-igora-royal.webp");
    expect(productImage({ ...base, product_name: "Schwarzkopf Igora Royal Absolutes 7-560" })?.src).toBe("/assets/products/schwarzkopf-igora-absolutes.webp");
    expect(productImage({ ...base, brand_name: "INDOLA", product_line_name: "PCC", product_name: "INDOLA PCC 7.0" })?.src).toBe("/assets/products/indola-pcc.webp");
    expect(productImage({ ...base, brand_name: "L'Oréal Professionnel", product_line_name: "Dia Light", product_name: "L'Oréal Professionnel Dia Light 7.01" })?.src).toBe("/assets/products/loreal-dia-light.jpg");
    expect(productImage({ ...base, brand_name: "L'Oréal Professionnel", product_line_name: "Majirel", product_name: "L'Oréal Professionnel Majirel 7.0" })?.src).toBe("/assets/products/loreal-majirel.jpg");
    expect(productImage({ ...base, brand_name: "INDOLA", product_line_name: "Blonde Expert", product_name: "INDOLA Blonde Expert Highlift +Blend" })?.src).toBe("/assets/products/indola-highlift.webp");
    expect(productImage({ ...base, product_line_name: "IGORA VIBRANCE", product_name: "Schwarzkopf Igora Vibrance 7-0" })?.src).toBe("/assets/products/schwarzkopf-igora-vibrance.webp");
    expect(productImage({ ...base, brand_name: "KIS", product_line_name: "KeraCream Color", product_name: "KIS KeraCream Color 7N" })?.src).toBe("/assets/products/kis-keracream.webp");
    expect(productImage({ ...base, brand_name: "Wella", product_line_name: "Koleston Perfect", product_name: "Wella Koleston Perfect 7/0" })?.src).toBe("/assets/products/wella-koleston.webp");
    expect(productImage({ ...base, brand_name: "Wella", product_line_name: "Shinefinity", product_name: "Wella Shinefinity 07/0" })?.src).toBe("/assets/products/wella-shinefinity.jpg");
    expect(productImage({ ...base, brand_name: "Wella", product_line_name: "Color Touch Plus", product_name: "Wella Color Touch Plus 77/07" })?.src).toBe("/assets/products/wella-color-touch.jpg");
  });
});
