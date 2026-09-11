import { beforeEach, describe, expect, it } from "vitest";
import { loadCart, setQuantity, totals } from "../src/ui/cart";
import type { Product } from "../src/shared/types";

const product = {
  id: 42,
  internal_product_code: "EH-0042",
  product_name: "Test",
  brand_name: "Wella"
} as Product;

describe("cart quantities", () => {
  beforeEach(() => localStorage.clear());

  it("selects products by quantity and removes at zero", () => {
    let cart = loadCart();
    cart = setQuantity(cart, product, 3);
    expect(totals(cart)).toEqual({ unique: 1, quantity: 3 });
    cart = setQuantity(cart, product, 0);
    expect(totals(cart)).toEqual({ unique: 0, quantity: 0 });
  });
});
