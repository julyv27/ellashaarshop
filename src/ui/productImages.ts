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
  if (has(brand, "Wella") && has(combined, "Perform+ Perm") && product.shade_code === "N") {
    return { src: "/assets/products/wella-perform-perm-n.jpg", alt: "Wella Perform+ Perm Lotion N" };
  }
  if (has(brand, "Wella") && has(combined, "Perform+ Perm") && product.shade_code === "C") {
    return { src: "/assets/products/wella-perform-perm-c.jpg", alt: "Wella Perform+ Perm Lotion C" };
  }
  if (has(brand, "Schwarzkopf") && has(combined, "Strait Styling Glatt") && product.shade_code === "0") {
    return { src: "/assets/products/schwarzkopf-glatt-0.jpg", alt: "Schwarzkopf Strait Styling Glatt 0" };
  }
  if (has(brand, "Schwarzkopf") && has(combined, "Strait Styling Glatt") && product.shade_code === "1") {
    return { src: "/assets/products/schwarzkopf-glatt-1.jpg", alt: "Schwarzkopf Strait Styling Glatt 1" };
  }
  if (has(brand, "Schwarzkopf") && has(combined, "Natural Styling") && has(combined, "Neutraliser")) {
    return { src: "/assets/products/schwarzkopf-natural-styling-neutraliser.jpg", alt: "Schwarzkopf Natural Styling Hydrowave Neutraliser" };
  }
  if (has(brand, "Schwarzkopf") && has(combined, "Glamour Wave") && product.shade_code === "0") {
    return { src: "/assets/products/schwarzkopf-glamour-wave-0.webp", alt: "Schwarzkopf Natural Styling Glamour Wave 0" };
  }
  if (has(brand, "Schwarzkopf") && has(combined, "Glamour Wave") && product.shade_code === "1") {
    return { src: "/assets/products/schwarzkopf-glamour-wave-1.jpg", alt: "Schwarzkopf Natural Styling Glamour Wave 1" };
  }
  if (has(brand, "Schwarzkopf") && has(combined, "Glamour Wave") && product.shade_code === "2") {
    return { src: "/assets/products/schwarzkopf-glamour-wave-2.jpg", alt: "Schwarzkopf Natural Styling Glamour Wave 2" };
  }
  if (has(brand, "La Riché") && has(combined, "Directions")) {
    return { src: "/assets/products/la-riche-directions.jpg", alt: "La Riché Directions" };
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
  if (has(brand, "INDOLA") && has(combined, "Color Style Mousse")) {
    return { src: "/assets/products/indola-color-style-mousse.jpg", alt: "INDOLA Color Style Mousse" };
  }
  if (has(brand, "INDOLA") && has(combined, "Blonde Expert")) {
    return { src: "/assets/products/indola-blonde-expert-care.jpg", alt: "INDOLA Blonde Expert" };
  }
  if (has(brand, "INDOLA") && has(combined, "Care & Style")) {
    return { src: "/assets/products/indola-care-style.webp", alt: "INDOLA Care & Style" };
  }
  if (has(brand, "INDOLA") && has(combined, "Care")) {
    return { src: "/assets/products/indola-care.jpg", alt: "INDOLA Care" };
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
