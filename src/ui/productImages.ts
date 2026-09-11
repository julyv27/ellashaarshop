import type { Product } from "../shared/types";

export type ProductImage = {
  src: string;
  alt: string;
};

function has(value: string, needle: string) {
  return value.toLowerCase().includes(needle.toLowerCase());
}

export function productImage(product: Product): ProductImage | null {
  const brand = product.brand_name;
  const line = product.product_line_name ?? "";
  const name = product.product_name;
  const combined = `${line} ${name}`;

  if (has(brand, "Schwarzkopf") && has(combined, "Igora") && has(combined, "Absolut")) {
    return { src: "/assets/products/schwarzkopf-igora-absolutes.webp", alt: "Schwarzkopf Igora Royal Absolutes" };
  }
  if (has(brand, "Schwarzkopf") && has(combined, "Igora")) {
    return { src: "/assets/products/schwarzkopf-igora-royal.webp", alt: "Schwarzkopf Igora Royal" };
  }
  if (has(brand, "INDOLA") && has(combined, "PCC")) {
    return { src: "/assets/products/indola-pcc.webp", alt: "INDOLA PCC" };
  }
  if (has(brand, "L'Oréal") && has(combined, "Dia Light")) {
    return { src: "/assets/products/loreal-dia-light.jpg", alt: "L'Oréal Professionnel Dia Light" };
  }
  if (has(brand, "L'Oréal") && has(combined, "Majirel")) {
    return { src: "/assets/products/loreal-majirel.jpg", alt: "L'Oréal Professionnel Majirel" };
  }

  return null;
}
