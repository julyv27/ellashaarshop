import type { CartItem, Product } from "../shared/types";

const key = "ellas-cart-v1";

export function loadCart(): Record<number, CartItem> {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? "{}") as Record<string, CartItem>;
    return Object.fromEntries(Object.entries(parsed).map(([id, item]) => [Number(id), item]));
  } catch {
    return {};
  }
}

export function saveCart(cart: Record<number, CartItem>) {
  localStorage.setItem(key, JSON.stringify(cart));
}

export function setQuantity(cart: Record<number, CartItem>, product: Product, quantity: number) {
  const next = { ...cart };
  if (quantity <= 0) delete next[product.id];
  else next[product.id] = { product, quantity };
  saveCart(next);
  return next;
}

export function totals(cart: Record<number, CartItem>) {
  const items = Object.values(cart);
  return {
    unique: items.length,
    quantity: items.reduce((sum, item) => sum + item.quantity, 0)
  };
}
