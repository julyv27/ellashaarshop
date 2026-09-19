import type { Product } from "../shared/types";

export type ProductImage = {
  src: string;
  alt: string;
};

function has(value: string, needle: string) {
  return value.toLowerCase().includes(needle.toLowerCase());
}

const bonacureImages: Record<string, ProductImage> = {
  "EH-1051": { src: "/assets/products/schwarzkopf-bonacure-clean-balance-shampoo-250ml.png", alt: "Schwarzkopf Bonacure Clean Balance Deep Cleansing Shampoo 250 ml" },
  "EH-1052": { src: "/assets/products/schwarzkopf-bonacure-clean-balance-shampoo-1000ml.png", alt: "Schwarzkopf Bonacure Clean Balance Deep Cleansing Shampoo 1000 ml" },
  "EH-1053": { src: "/assets/products/schwarzkopf-bonacure-color-freeze-conditioner-200ml.png", alt: "Schwarzkopf Bonacure Color Freeze Conditioner pH 4.5 200 ml" },
  "EH-1054": { src: "/assets/products/schwarzkopf-bonacure-color-freeze-conditioner-1000ml.jpg", alt: "Schwarzkopf Bonacure Color Freeze Conditioner pH 4.5 1000 ml" },
  "EH-1055": { src: "/assets/products/schwarzkopf-bonacure-color-freeze-shampoo-250ml.png", alt: "Schwarzkopf Bonacure Color Freeze Shampoo pH 4.5 250 ml" },
  "EH-1056": { src: "/assets/products/schwarzkopf-bonacure-color-freeze-shampoo-1000ml.jpg", alt: "Schwarzkopf Bonacure Color Freeze Shampoo pH 4.5 1000 ml" },
  "EH-1057": { src: "/assets/products/schwarzkopf-bonacure-color-freeze-treatment-200ml.jpg", alt: "Schwarzkopf Bonacure Color Freeze Treatment pH 4.5 200 ml" },
  "EH-1058": { src: "/assets/products/schwarzkopf-bonacure-color-freeze-treatment-500ml.jpg", alt: "Schwarzkopf Bonacure Color Freeze Treatment pH 4.5 500 ml" },
  "EH-1059": { src: "/assets/products/schwarzkopf-bonacure-frizz-away-conditioner-200ml.jpg", alt: "Schwarzkopf Bonacure Frizz Away Conditioner 200 ml" },
  "EH-1060": { src: "/assets/products/schwarzkopf-bonacure-frizz-away-conditioner-1000ml.webp", alt: "Schwarzkopf Bonacure Frizz Away Conditioner 1000 ml" },
  "EH-1061": { src: "/assets/products/schwarzkopf-bonacure-frizz-away-shampoo-250ml.jpg", alt: "Schwarzkopf Bonacure Frizz Away Shampoo 250 ml" },
  "EH-1062": { src: "/assets/products/schwarzkopf-bonacure-frizz-away-shampoo-1000ml.png", alt: "Schwarzkopf Bonacure Frizz Away Shampoo 1000 ml" },
  "EH-1063": { src: "/assets/products/schwarzkopf-bonacure-moisture-kick-shampoo-250ml.jpg", alt: "Schwarzkopf Bonacure Moisture Kick Shampoo 250 ml" },
  "EH-1064": { src: "/assets/products/schwarzkopf-bonacure-moisture-kick-shampoo-1000ml.jpg", alt: "Schwarzkopf Bonacure Moisture Kick Shampoo 1000 ml" },
  "EH-1065": { src: "/assets/products/schwarzkopf-bonacure-moisture-kick-spray-conditioner-200ml.jpg", alt: "Schwarzkopf Bonacure Moisture Kick Spray Conditioner 200 ml" },
  "EH-1066": { src: "/assets/products/schwarzkopf-bonacure-repair-rescue-sealed-ends-100ml.jpg", alt: "Schwarzkopf Bonacure Repair Rescue Sealed Ends+ 100 ml" },
  "EH-1067": { src: "/assets/products/schwarzkopf-bonacure-repair-rescue-shampoo-250ml.jpg", alt: "Schwarzkopf Bonacure Repair Rescue Shampoo 250 ml" },
  "EH-1068": { src: "/assets/products/schwarzkopf-bonacure-repair-rescue-shampoo-1000ml.jpg", alt: "Schwarzkopf Bonacure Repair Rescue Shampoo 1000 ml" },
  "EH-1069": { src: "/assets/products/schwarzkopf-bonacure-repair-rescue-spray-conditioner-200ml.jpg", alt: "Schwarzkopf Bonacure Repair Rescue Spray Conditioner 200 ml" },
  "EH-1070": { src: "/assets/products/schwarzkopf-bonacure-repair-rescue-treatment-200ml.jpg", alt: "Schwarzkopf Bonacure Repair Rescue Treatment 200 ml" },
  "EH-1071": { src: "/assets/products/schwarzkopf-bonacure-repair-rescue-treatment-500ml.jpg", alt: "Schwarzkopf Bonacure Repair Rescue Treatment 500 ml" },
  "EH-1072": { src: "/assets/products/schwarzkopf-bonacure-volume-boost-shampoo-250ml.png", alt: "Schwarzkopf Bonacure Volume Boost Shampoo 250 ml" },
  "EH-1073": { src: "/assets/products/schwarzkopf-bonacure-volume-boost-shampoo-1000ml.png", alt: "Schwarzkopf Bonacure Volume Boost Shampoo 1000 ml" }
};

export function productImage(product: Product): ProductImage | null {
  const brand = product.brand_name;
  const line = product.product_line_name ?? "";
  const name = product.product_name;
  const combined = `${line} ${name}`;

  if (bonacureImages[product.internal_product_code]) {
    return bonacureImages[product.internal_product_code];
  }

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
  if (has(brand, "Schwarzkopf") && has(combined, "Blonde Me") && product.content_value === "1000" && product.content_unit === "ml") {
    return { src: "/assets/products/schwarzkopf-blonde-me-developer-1000ml.png", alt: "Schwarzkopf Blonde Me Premium Developer 1000 ml" };
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
  if (has(brand, "L'Oréal") && has(combined, "iNOA")) {
    return { src: "/assets/products/loreal-inoa.webp", alt: "L'Oréal Professionnel iNOA" };
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
