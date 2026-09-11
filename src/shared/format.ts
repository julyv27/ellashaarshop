import type { CartItem, OrderItemSnapshot, Product } from "./types";

export function contentLabel(item: Pick<Product, "content_value" | "content_unit"> | Pick<OrderItemSnapshot, "content_value" | "content_unit">): string {
  if (!item.content_value) return "";
  return [item.content_value, item.content_unit].filter(Boolean).join(" ");
}

export function productDisplayName(item: Pick<Product, "brand_name" | "product_line_name" | "product_name" | "shade_code" | "content_value" | "content_unit"> | Pick<OrderItemSnapshot, "brand_name" | "product_line_name" | "product_name" | "shade_code" | "content_value" | "content_unit">): string {
  return [
    item.brand_name,
    item.product_line_name,
    item.product_name,
    item.shade_code ? `kleur ${item.shade_code}` : "",
    contentLabel(item)
  ].filter(Boolean).join(" - ");
}

export function exportRows(items: CartItem[]) {
  return items.map(({ product, quantity }) => ({
    Merk: product.brand_name,
    "Lijn / submerk": product.product_line_name ?? "",
    Productnaam: product.product_name,
    Kleurcode: product.shade_code ?? "",
    Inhoud: contentLabel(product),
    Aantal: quantity
  }));
}

export function plainTextOrder(items: CartItem[], date = new Date()): string {
  const lines = [
    "Ella's Haarshop",
    "Bestelling",
    `Datum: ${date.toLocaleDateString("nl-NL")}`,
    ""
  ];

  for (const { product, quantity } of items) {
    lines.push(`${quantity}x ${productDisplayName(product)}`);
  }

  return lines.join("\n");
}
