import { describe, expect, it } from "vitest";
import { plainTextOrder, productDisplayName } from "../src/shared/format";
import type { CartItem, Product } from "../src/shared/types";

const product: Product = {
  id: 1,
  internal_product_code: "EH-0001",
  brand_id: 1,
  brand_name: "INDOLA",
  product_line_id: 1,
  product_line_name: "PCC",
  category_id: 1,
  category_name: "Kleur",
  product_type_id: 1,
  product_type_name: "Verf",
  variant_group: "Natural",
  product_name: "INDOLA PCC 7.0",
  shade_code: "7.0",
  content_value: "60",
  content_unit: "ml",
  order_unit: "stuk",
  supplier_id: 1,
  supplier_name: "Topline",
  supplier_sku: null,
  barcode_gtin: null,
  active: true,
  search_text: "indola pcc natural indola pcc 7.0 7.0 verf"
};

describe("order formatting", () => {
  it("does not include supplier in visible product line", () => {
    expect(productDisplayName(product)).toBe("INDOLA - PCC - INDOLA PCC 7.0 - kleur 7.0 - 60 ml");
    expect(productDisplayName(product)).not.toContain("Topline");
  });

  it("creates copyable plain text order without prices or supplier", () => {
    const items: CartItem[] = [{ product, quantity: 3 }];
    const text = plainTextOrder(items, new Date("2026-09-11T12:00:00Z"));
    expect(text).toContain("Ella's Haarshop");
    expect(text).toContain("3x INDOLA - PCC - INDOLA PCC 7.0 - kleur 7.0 - 60 ml");
    expect(text).not.toContain("Topline");
    expect(text).not.toContain("€");
  });
});
