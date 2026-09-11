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

  if (has(brand, "INDOLA") && has(combined, "Highlift")) {
    return { src: "/assets/products/indola-highlift.webp", alt: "INDOLA Blonde Expert Highlift" };
  }
  if (has(brand, "Schwarzkopf") && has(combined, "Igora") && has(combined, "Absolut")) {
    return { src: "/assets/products/schwarzkopf-igora-absolutes.webp", alt: "Schwarzkopf Igora Royal Absolutes" };
  }
  if (has(brand, "Schwarzkopf") && has(combined, "Igora") && has(combined, "Vibrance")) {
    return { src: "/assets/products/schwarzkopf-igora-vibrance.webp", alt: "Schwarzkopf Igora Vibrance" };
  }
  if (has(brand, "Schwarzkopf") && has(combined, "Igora")) {
    return { src: "/assets/products/schwarzkopf-igora-royal.webp", alt: "Schwarzkopf Igora Royal" };
  }
  if (has(brand, "KIS") && has(combined, "KeraCream")) {
    return { src: "/assets/products/kis-keracream.webp", alt: "KIS KeraCream Color" };
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
  if (has(brand, "Wella") && has(combined, "Koleston")) {
    return { src: "/assets/products/wella-koleston.webp", alt: "Wella Koleston Perfect" };
  }
  if (has(brand, "Wella") && has(combined, "Shinefinity")) {
    return { src: "/assets/products/wella-shinefinity.jpg", alt: "Wella Shinefinity" };
  }
  if (has(brand, "Wella") && has(combined, "Color Touch")) {
    return { src: "/assets/products/wella-color-touch.jpg", alt: "Wella Color Touch" };
  }

  return null;
}
