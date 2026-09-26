import type { Product } from "../shared/types";

export type ProductImage = {
  src: string;
  alt: string;
};

function has(value: string, needle: string) {
  return value.toLowerCase().includes(needle.toLowerCase());
}

const exactProductImages: Record<string, ProductImage> = {
  "EH-1219": { src: "/assets/products/deluxe-tone-on-tone-developer-box.png", alt: "3DeLuXe Tone On Tone Developer 1 Doos" },
  "EH-1225": { src: "/assets/products/olaplex-eh-1225-no0-155ml.png", alt: "OLAPLEX Nº.0 Intensive Bond Building Treatment 155 ml" },
  "EH-1226": { src: "/assets/products/olaplex-eh-1226-no3plus-100ml.png", alt: "OLAPLEX Nº.3PLUS Complete Repair Treatment 100 ml" },
  "EH-1227": { src: "/assets/products/olaplex-eh-1227-no3plus-250ml.png", alt: "OLAPLEX Nº.3PLUS Complete Repair Treatment 250 ml" },
  "EH-1228": { src: "/assets/products/olaplex-eh-1228-no4-shampoo-100ml.jpg", alt: "OLAPLEX Nº.4 Bond Maintenance Shampoo 100 ml" },
  "EH-1229": { src: "/assets/products/olaplex-eh-1229-no4-shampoo-250ml.jpg", alt: "OLAPLEX Nº.4 Bond Maintenance Shampoo 250 ml" },
  "EH-1230": { src: "/assets/products/olaplex-eh-1230-no4-shampoo-1000ml.jpg", alt: "OLAPLEX Nº.4 Bond Maintenance Shampoo 1000 ml" },
  "EH-1231": { src: "/assets/products/olaplex-eh-1231-no5-conditioner-100ml.jpg", alt: "OLAPLEX Nº.5 Bond Maintenance Conditioner 100 ml" },
  "EH-1232": { src: "/assets/products/olaplex-eh-1232-no5-conditioner-250ml.png", alt: "OLAPLEX Nº.5 Bond Maintenance Conditioner 250 ml" },
  "EH-1233": { src: "/assets/products/olaplex-eh-1233-no5-conditioner-1000ml.jpg", alt: "OLAPLEX Nº.5 Bond Maintenance Conditioner 1000 ml" },
  "EH-1234": { src: "/assets/products/olaplex-eh-1234-no4c-shampoo-250ml.png", alt: "OLAPLEX Nº.4C Bond Maintenance Clarifying Shampoo 250 ml" },
  "EH-1235": { src: "/assets/products/olaplex-eh-1235-no4c-shampoo-1000ml.webp", alt: "OLAPLEX Nº.4C Bond Maintenance Clarifying Shampoo 1000 ml" },
  "EH-1236": { src: "/assets/products/olaplex-eh-1236-no4d-dry-shampoo-50ml.png", alt: "OLAPLEX Nº.4D Clean Volume Detox Dry Shampoo 50 ml" },
  "EH-1237": { src: "/assets/products/olaplex-eh-1237-no4d-dry-shampoo-250ml.jpg", alt: "OLAPLEX Nº.4D Clean Volume Detox Dry Shampoo 250 ml" },
  "EH-1238": { src: "/assets/products/olaplex-eh-1238-no4p-shampoo-250ml.jpg", alt: "OLAPLEX Nº.4P Blonde Enhancer Toning Shampoo 250 ml" },
  "EH-1239": { src: "/assets/products/olaplex-eh-1239-no4p-shampoo-1000ml.png", alt: "OLAPLEX Nº.4P Blonde Enhancer Toning Shampoo 1000 ml" },
  "EH-1240": { src: "/assets/products/olaplex-eh-1240-no5p-conditioner-250ml.png", alt: "OLAPLEX Nº.5P Blonde Enhancer Toning Conditioner 250 ml" },
  "EH-1241": { src: "/assets/products/olaplex-eh-1241-no5p-conditioner-1000ml.jpg", alt: "OLAPLEX Nº.5P Blonde Enhancer Toning Conditioner 1000 ml" },
  "EH-1242": { src: "/assets/products/olaplex-eh-1242-no4fine-shampoo-100ml.png", alt: "OLAPLEX Nº.4FINE Bond Maintenance Volumizing Shampoo 100 ml" },
  "EH-1243": { src: "/assets/products/olaplex-eh-1243-no4fine-shampoo-250ml.png", alt: "OLAPLEX Nº.4FINE Bond Maintenance Volumizing Shampoo 250 ml" },
  "EH-1244": { src: "/assets/products/olaplex-eh-1244-no4fine-shampoo-525ml.png", alt: "OLAPLEX Nº.4FINE Bond Maintenance Volumizing Shampoo 525 ml" },
  "EH-1245": { src: "/assets/products/olaplex-eh-1245-no4fine-shampoo-1000ml.png", alt: "OLAPLEX Nº.4FINE Bond Maintenance Volumizing Shampoo 1000 ml" },
  "EH-1246": { src: "/assets/products/olaplex-eh-1246-no5fine-conditioner-100ml.png", alt: "OLAPLEX Nº.5FINE Bond Maintenance Volumizing Conditioner 100 ml" },
  "EH-1247": { src: "/assets/products/olaplex-eh-1247-no5fine-conditioner-250ml.png", alt: "OLAPLEX Nº.5FINE Bond Maintenance Volumizing Conditioner 250 ml" },
  "EH-1248": { src: "/assets/products/olaplex-eh-1248-no5fine-conditioner-525ml.png", alt: "OLAPLEX Nº.5FINE Bond Maintenance Volumizing Conditioner 525 ml" },
  "EH-1249": { src: "/assets/products/olaplex-eh-1249-no5fine-conditioner-1000ml.png", alt: "OLAPLEX Nº.5FINE Bond Maintenance Volumizing Conditioner 1000 ml" },
  "EH-1250": { src: "/assets/products/olaplex-eh-1250-no4curl-shampoo-100ml.png", alt: "OLAPLEX Nº.4CURL Bond Shaper Hydrating Curl Shampoo 100 ml" },
  "EH-1251": { src: "/assets/products/olaplex-eh-1251-no4curl-shampoo-250ml.png", alt: "OLAPLEX Nº.4CURL Bond Shaper Hydrating Curl Shampoo 250 ml" },
  "EH-1252": { src: "/assets/products/olaplex-eh-1252-no4curl-shampoo-1000ml.png", alt: "OLAPLEX Nº.4CURL Bond Shaper Hydrating Curl Shampoo 1000 ml" },
  "EH-1253": { src: "/assets/products/olaplex-eh-1253-no5curl-conditioner-100ml.png", alt: "OLAPLEX Nº.5CURL Bond Shaper Hydrating Curl Conditioner 100 ml" },
  "EH-1254": { src: "/assets/products/olaplex-eh-1254-no5curl-conditioner-250ml.png", alt: "OLAPLEX Nº.5CURL Bond Shaper Hydrating Curl Conditioner 250 ml" },
  "EH-1255": { src: "/assets/products/olaplex-eh-1255-no5curl-conditioner-1000ml.jpg", alt: "OLAPLEX Nº.5CURL Bond Shaper Hydrating Curl Conditioner 1000 ml" },
  "EH-1256": { src: "/assets/products/olaplex-eh-1256-no5-leave-in-30ml.jpg", alt: "OLAPLEX Nº.5 Leave-In Moisturize & Mend Conditioner 30 ml" },
  "EH-1257": { src: "/assets/products/olaplex-eh-1257-no5-leave-in-100ml.jpg", alt: "OLAPLEX Nº.5 Leave-In Moisturize & Mend Conditioner 100 ml" },
  "EH-1258": { src: "/assets/products/olaplex-eh-1258-no6-bond-smoother-100ml.png", alt: "OLAPLEX Nº.6 Bond Smoother 100 ml" },
  "EH-1259": { src: "/assets/products/olaplex-eh-1259-no7-bonding-oil-30ml.png", alt: "OLAPLEX Nº.7 Bonding Oil 30 ml" },
  "EH-1260": { src: "/assets/products/olaplex-eh-1260-no7-bonding-oil-60ml.png", alt: "OLAPLEX Nº.7 Bonding Oil 60 ml" },
  "EH-1261": { src: "/assets/products/olaplex-eh-1261-no7-shine-serum-oil-mist-80ml.jpg", alt: "OLAPLEX Nº.7 Shine Serum Oil Mist 80 ml" },
  "EH-1262": { src: "/assets/products/olaplex-eh-1262-no9-serum-90ml.png", alt: "OLAPLEX Nº.9 Bond Protector Nourishing Hair Serum 90 ml" },
  "EH-1263": { src: "/assets/products/olaplex-eh-1263-no10-gel-200ml.png", alt: "OLAPLEX Nº.10 Bond Shaper Curl Defining Gel 200 ml" },
  "EH-1264": { src: "/assets/products/olaplex-eh-1264-volumizing-blow-dry-mist-150ml.png", alt: "OLAPLEX Volumizing Blow Dry Mist 150 ml" },
  "EH-1265": { src: "/assets/products/olaplex-eh-1265-scalp-longevity-treatment-50ml.png", alt: "OLAPLEX Scalp Longevity Treatment 50 ml" },
  "EH-1266": { src: "/assets/products/olaplex-eh-1266-rich-hydration-mask-200ml.png", alt: "OLAPLEX Rich Hydration Mask 200 ml" },
  "EH-1267": { src: "/assets/products/olaplex-eh-1267-weightless-nourishing-mask-200ml.png", alt: "OLAPLEX Weightless Nourishing Mask 200 ml" },
  "EH-1268": { src: "/assets/products/olaplex-eh-1268-no1-bond-multiplier-525ml.jpg", alt: "OLAPLEX Nº.1 Bond Multiplier 525 ml" },
  "EH-1269": { src: "/assets/products/olaplex-eh-1269-no2-bond-perfector-525ml.jpg", alt: "OLAPLEX Nº.2 Bond Perfector 525 ml" },
  "EH-1270": { src: "/assets/products/olaplex-eh-1270-no2-bond-perfector-backbar-2000ml.png", alt: "OLAPLEX Nº.2 Bond Perfector Backbar 2000 ml" },
  "EH-1294": { src: "/assets/products/deluxe-bleach-500g.webp", alt: "DELUXE Deluxe Bleach 500 g" },
  "EH-1306": { src: "/assets/products/schwarzkopf-silhouette-flexible-hold-hairspray.jpg", alt: "Schwarzkopf Silhouette Flexible Hold Hairspray" },
  "EH-1309": { src: "/assets/products/fanola-no-yellow-shampoo.jpg", alt: "Fanola No Yellow Shampoo 350 ml" },
  "EH-1310": { src: "/assets/products/fanola-no-yellow-shampoo.jpg", alt: "Fanola No Yellow Shampoo 1000 ml" }
};

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

  if (exactProductImages[product.internal_product_code]) {
    return exactProductImages[product.internal_product_code];
  }

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
  if (has(brand, "Schwarzkopf") && has(combined, "Silhouette") && has(combined, "Flexible Hold Hairspray")) {
    return { src: "/assets/products/schwarzkopf-silhouette-flexible-hold-hairspray.jpg", alt: "Schwarzkopf Silhouette Flexible Hold Hairspray" };
  }
  if (has(brand, "Schwarzkopf") && has(combined, "Silhouette") && has(combined, "Flexible Hold Mousse")) {
    return { src: "/assets/products/schwarzkopf-silhouette-flexible-hold-mousse.avif", alt: "Schwarzkopf Silhouette Flexible Hold Mousse" };
  }
  if (has(brand, "Fanola") && has(combined, "No Yellow") && has(combined, "Shampoo")) {
    return { src: "/assets/products/fanola-no-yellow-shampoo.jpg", alt: "Fanola No Yellow Shampoo" };
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
