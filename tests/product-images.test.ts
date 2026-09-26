import fs from "node:fs";
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
  sale_price_cents: null,
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
    expect(productImage({ ...base, brand_name: "L'Oréal Professionnel", product_line_name: "iNOA", product_name: "L'Oréal Professionnel iNOA 7.0" })?.src).toBe("/assets/products/loreal-inoa.webp");
    expect(productImage({ ...base, brand_name: "INDOLA", product_line_name: "Blonde Expert", product_name: "INDOLA Blonde Expert Highlift +Blend" })?.src).toBe("/assets/products/indola-highlift.webp");
    expect(productImage({ ...base, product_line_name: "IGORA VIBRANCE", product_name: "Schwarzkopf Igora Vibrance 7-0" })?.src).toBe("/assets/products/schwarzkopf-igora-vibrance.webp");
    expect(productImage({ ...base, brand_name: "Schwarzkopf", product_line_name: "Blonde Me", product_name: "Schwarzkopf Blonde Me 6%", content_value: "1000", content_unit: "ml" })?.src).toBe("/assets/products/schwarzkopf-blonde-me-developer-1000ml.png");
    expect(productImage({ ...base, brand_name: "Schwarzkopf", product_line_name: "Blonde Me", product_name: "Schwarzkopf Blonde Me 6%", content_value: "60", content_unit: "ml" })).toBeNull();
    expect(productImage({ ...base, brand_name: "KIS", product_line_name: "KeraCream Color", product_name: "KIS KeraCream Color 7N" })?.src).toBe("/assets/products/kis-keracream.webp");
    expect(productImage({ ...base, brand_name: "Wella", product_line_name: "Koleston Perfect", product_name: "Wella Koleston Perfect 7/0" })?.src).toBe("/assets/products/wella-koleston.webp");
    expect(productImage({ ...base, brand_name: "Wella", product_line_name: "Shinefinity", product_name: "Wella Shinefinity 07/0" })?.src).toBe("/assets/products/wella-shinefinity.jpg");
    expect(productImage({ ...base, brand_name: "Wella", product_line_name: "Color Touch Plus", product_name: "Wella Color Touch Plus 77/07" })?.src).toBe("/assets/products/wella-color-touch.jpg");
    expect(productImage({ ...base, brand_name: "INDOLA", product_line_name: "Blonde Expert", product_name: "INDOLA Blonde Expert Insta Cool Shampoo" })?.src).toBe("/assets/products/indola-blonde-expert-care.jpg");
    expect(productImage({ ...base, brand_name: "INDOLA", product_line_name: "Care", product_name: "INDOLA Care Color Shampoo" })?.src).toBe("/assets/products/indola-care.jpg");
    expect(productImage({ ...base, brand_name: "INDOLA", product_line_name: "Care & Style", product_name: "INDOLA Care & Style Hair Spray" })?.src).toBe("/assets/products/indola-care-style.webp");
    expect(productImage({ ...base, brand_name: "INDOLA", product_line_name: "Color Style Mousse", product_name: "INDOLA Color Style Mousse" })?.src).toBe("/assets/products/indola-color-style-mousse.jpg");
    expect(productImage({ ...base, brand_name: "Wella", product_line_name: "Perform+ Perm", product_name: "Wella Perform+ Perm Perform+ Perm Lotion N", shade_code: "N" })?.src).toBe("/assets/products/wella-perform-perm-n.jpg");
    expect(productImage({ ...base, brand_name: "Wella", product_line_name: "Perform+ Perm", product_name: "Wella Perform+ Perm Perform+ Perm Lotion C", shade_code: "C" })?.src).toBe("/assets/products/wella-perform-perm-c.jpg");
    expect(productImage({ ...base, product_line_name: "Strait Styling Glatt", product_name: "Schwarzkopf Strait Styling Glatt Strait Styling Glatt 0", shade_code: "0" })?.src).toBe("/assets/products/schwarzkopf-glatt-0.jpg");
    expect(productImage({ ...base, product_line_name: "Strait Styling Glatt", product_name: "Schwarzkopf Strait Styling Glatt Strait Styling Glatt 1", shade_code: "1" })?.src).toBe("/assets/products/schwarzkopf-glatt-1.jpg");
    expect(productImage({ ...base, product_line_name: "Natural Styling Hydrowave", product_name: "Schwarzkopf Natural Styling Hydrowave Natural Styling Neutraliser Fixing Lotion 0", shade_code: "0" })?.src).toBe("/assets/products/schwarzkopf-natural-styling-neutraliser.jpg");
    expect(productImage({ ...base, product_line_name: "Natural Styling Hydrowave", product_name: "Schwarzkopf Natural Styling Hydrowave Natural Styling Neutraliser Fixing Lotion 1", shade_code: "1" })?.src).toBe("/assets/products/schwarzkopf-natural-styling-neutraliser.jpg");
    expect(productImage({ ...base, product_line_name: "Natural Styling Hydrowave", product_name: "Schwarzkopf Natural Styling Hydrowave Natural Styling Neutraliser Fixing Lotion 2", shade_code: "2" })?.src).toBe("/assets/products/schwarzkopf-natural-styling-neutraliser.jpg");
    expect(productImage({ ...base, product_line_name: "Natural Styling Hydrowave Glamour Wave", product_name: "Schwarzkopf Natural Styling Hydrowave Glamour Wave Glamour Wave Perm Lotion 0", shade_code: "0" })?.src).toBe("/assets/products/schwarzkopf-glamour-wave-0.webp");
    expect(productImage({ ...base, product_line_name: "Natural Styling Hydrowave Glamour Wave", product_name: "Schwarzkopf Natural Styling Hydrowave Glamour Wave Glamour Wave Perm Lotion 1", shade_code: "1" })?.src).toBe("/assets/products/schwarzkopf-glamour-wave-1.jpg");
    expect(productImage({ ...base, product_line_name: "Natural Styling Hydrowave Glamour Wave", product_name: "Schwarzkopf Natural Styling Hydrowave Glamour Wave Glamour Wave Perm Lotion 2", shade_code: "2" })?.src).toBe("/assets/products/schwarzkopf-glamour-wave-2.jpg");
    expect(productImage({ ...base, brand_name: "La Riché", product_line_name: "Directions", product_name: "La Riché Directions Alpine Green", shade_code: "Alpine Green" })?.src).toBe("/assets/products/la-riche-directions.jpg");
  });

  it("maps every Schwarzkopf Bonacure product to a product-specific image", () => {
    const mappings = [
      ["EH-1051", "Clean Balance Deep Cleansing Shampoo", "250", "/assets/products/schwarzkopf-bonacure-clean-balance-shampoo-250ml.png"],
      ["EH-1052", "Clean Balance Deep Cleansing Shampoo", "1000", "/assets/products/schwarzkopf-bonacure-clean-balance-shampoo-1000ml.png"],
      ["EH-1053", "Color Freeze Conditioner pH 4.5", "200", "/assets/products/schwarzkopf-bonacure-color-freeze-conditioner-200ml.png"],
      ["EH-1054", "Color Freeze Conditioner pH 4.5", "1000", "/assets/products/schwarzkopf-bonacure-color-freeze-conditioner-1000ml.jpg"],
      ["EH-1055", "Color Freeze Shampoo pH 4.5", "250", "/assets/products/schwarzkopf-bonacure-color-freeze-shampoo-250ml.png"],
      ["EH-1056", "Color Freeze Shampoo pH 4.5", "1000", "/assets/products/schwarzkopf-bonacure-color-freeze-shampoo-1000ml.jpg"],
      ["EH-1057", "Color Freeze Treatment pH 4.5", "200", "/assets/products/schwarzkopf-bonacure-color-freeze-treatment-200ml.jpg"],
      ["EH-1058", "Color Freeze Treatment pH 4.5", "500", "/assets/products/schwarzkopf-bonacure-color-freeze-treatment-500ml.jpg"],
      ["EH-1059", "Frizz Away Conditioner", "200", "/assets/products/schwarzkopf-bonacure-frizz-away-conditioner-200ml.jpg"],
      ["EH-1060", "Frizz Away Conditioner", "1000", "/assets/products/schwarzkopf-bonacure-frizz-away-conditioner-1000ml.webp"],
      ["EH-1061", "Frizz Away Shampoo", "250", "/assets/products/schwarzkopf-bonacure-frizz-away-shampoo-250ml.jpg"],
      ["EH-1062", "Frizz Away Shampoo", "1000", "/assets/products/schwarzkopf-bonacure-frizz-away-shampoo-1000ml.png"],
      ["EH-1063", "Moisture Kick Shampoo", "250", "/assets/products/schwarzkopf-bonacure-moisture-kick-shampoo-250ml.jpg"],
      ["EH-1064", "Moisture Kick Shampoo", "1000", "/assets/products/schwarzkopf-bonacure-moisture-kick-shampoo-1000ml.jpg"],
      ["EH-1065", "Moisture Kick Spray Conditioner", "200", "/assets/products/schwarzkopf-bonacure-moisture-kick-spray-conditioner-200ml.jpg"],
      ["EH-1066", "Repair Rescue Sealed Ends+", "100", "/assets/products/schwarzkopf-bonacure-repair-rescue-sealed-ends-100ml.jpg"],
      ["EH-1067", "Repair Rescue Shampoo", "250", "/assets/products/schwarzkopf-bonacure-repair-rescue-shampoo-250ml.jpg"],
      ["EH-1068", "Repair Rescue Shampoo", "1000", "/assets/products/schwarzkopf-bonacure-repair-rescue-shampoo-1000ml.jpg"],
      ["EH-1069", "Repair Rescue Spray Conditioner", "200", "/assets/products/schwarzkopf-bonacure-repair-rescue-spray-conditioner-200ml.jpg"],
      ["EH-1070", "Repair Rescue Treatment", "200", "/assets/products/schwarzkopf-bonacure-repair-rescue-treatment-200ml.jpg"],
      ["EH-1071", "Repair Rescue Treatment", "500", "/assets/products/schwarzkopf-bonacure-repair-rescue-treatment-500ml.jpg"],
      ["EH-1072", "Volume Boost Shampoo", "250", "/assets/products/schwarzkopf-bonacure-volume-boost-shampoo-250ml.png"],
      ["EH-1073", "Volume Boost Shampoo", "1000", "/assets/products/schwarzkopf-bonacure-volume-boost-shampoo-1000ml.png"]
    ] as const;

    for (const [code, name, content, src] of mappings) {
      expect(productImage({
        ...base,
        internal_product_code: code,
        brand_name: "Schwarzkopf",
        product_line_name: `Bonacure ${name.split(" ")[0]}`,
        product_name: `Schwarzkopf Bonacure ${name}`,
        content_value: content,
        content_unit: "ml"
      })?.src).toBe(src);
      expect(fs.existsSync(`public${src}`)).toBe(true);
    }
  });

  it("maps the developer box and every OLAPLEX product to an existing image", () => {
    const codes = ["EH-1219", ...Array.from({ length: 46 }, (_, index) => `EH-${1225 + index}`)];

    for (const code of codes) {
      const image = productImage({
        ...base,
        internal_product_code: code,
        brand_name: code === "EH-1219" ? "3DeLuXe" : "OLAPLEX",
        product_line_name: code === "EH-1219" ? null : "OLAPLEX",
        product_name: code === "EH-1219" ? "Tone On Tone Developer 1 Doos" : "OLAPLEX product"
      });

      expect(image?.src).toBeTruthy();
      expect(fs.existsSync(`public${image?.src}`)).toBe(true);
    }
  });

  it("maps the newly supplied salon product photos", () => {
    const mappings = [
      {
        product: {
          ...base,
          internal_product_code: "EH-1294",
          brand_name: "DELUXE",
          product_line_name: "DELUXE",
          product_name: "DELUXE Deluxe Bleach",
          content_value: "500",
          content_unit: "g"
        },
        src: "/assets/products/deluxe-bleach-500g.webp"
      },
      {
        product: {
          ...base,
          internal_product_code: "EH-1305",
          brand_name: "Schwarzkopf",
          product_line_name: "Silhouette",
          product_name: "Schwarzkopf Silhouette Super Hold Hairspray",
          content_value: "300"
        },
        src: "/assets/products/schwarzkopf-silhouette-super-hold-hairspray.webp"
      },
      {
        product: {
          ...base,
          internal_product_code: "EH-1095",
          brand_name: "Schwarzkopf",
          product_line_name: "Silhouette",
          product_name: "Schwarzkopf Silhouette Super Hold Hairspray",
          content_value: "500"
        },
        src: "/assets/products/schwarzkopf-silhouette-super-hold-hairspray.webp"
      },
      {
        product: {
          ...base,
          internal_product_code: "EH-1096",
          brand_name: "Schwarzkopf",
          product_line_name: "Silhouette",
          product_name: "Schwarzkopf Silhouette Super Hold Mousse",
          content_value: "200"
        },
        src: "/assets/products/schwarzkopf-silhouette-super-hold-mousse.webp"
      },
      {
        product: {
          ...base,
          internal_product_code: "EH-1306",
          brand_name: "Schwarzkopf",
          product_line_name: "Silhouette",
          product_name: "Schwarzkopf Silhouette Flexible Hold Hairspray",
          content_value: "300"
        },
        src: "/assets/products/schwarzkopf-silhouette-flexible-hold-hairspray.jpg"
      },
      {
        product: {
          ...base,
          internal_product_code: "EH-9998",
          brand_name: "Schwarzkopf",
          product_line_name: "Silhouette",
          product_name: "Schwarzkopf Silhouette Flexible Hold Hairspray",
          content_value: "500"
        },
        src: "/assets/products/schwarzkopf-silhouette-flexible-hold-hairspray.jpg"
      },
      {
        product: {
          ...base,
          internal_product_code: "EH-9999",
          brand_name: "Schwarzkopf",
          product_line_name: "Silhouette",
          product_name: "Schwarzkopf Silhouette Flexible Hold Mousse"
        },
        src: "/assets/products/schwarzkopf-silhouette-flexible-hold-mousse.avif"
      },
      {
        product: {
          ...base,
          internal_product_code: "EH-1309",
          brand_name: "Fanola",
          product_line_name: "No Yellow",
          product_name: "Fanola No Yellow No Yellow Shampoo",
          content_value: "350"
        },
        src: "/assets/products/fanola-no-yellow-shampoo.jpg"
      },
      {
        product: {
          ...base,
          internal_product_code: "EH-1310",
          brand_name: "Fanola",
          product_line_name: "No Yellow",
          product_name: "Fanola No Yellow No Yellow Shampoo",
          content_value: "1000"
        },
        src: "/assets/products/fanola-no-yellow-shampoo.jpg"
      }
    ] as const;

    for (const { product, src } of mappings) {
      expect(productImage(product)?.src).toBe(src);
      expect(fs.existsSync(`public${src}`)).toBe(true);
    }
  });
});
