import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CatalogImportRow } from "../src/shared/types";
import { readWorkbook, sheetRows } from "./import-catalog";

const workbookPath = process.argv[2] ?? "/Users/julia/Downloads/Wella_Color_Fresh_Mask_actuele_producten_met_afbeeldingsbronnen.xlsx";
const startCode = Number(process.argv[3] ?? "1205");
const outputDir = "generated";
const seedPath = path.join(outputDir, "color-fresh-mask-seed.sql");
const reportPath = path.join(outputDir, "color-fresh-mask-import-report.json");

function clean(value: unknown) {
  const text = String(value ?? "").trim();
  return text || null;
}

function sqlString(value: string | null) {
  return value === null ? "NULL" : `'${value.replaceAll("'", "''")}'`;
}

function parseContent(value: string | null) {
  const match = value?.match(/^(.+?)\s*([a-zA-Z]+)$/);
  return match ? { contentValue: match[1].trim(), contentUnit: match[2].trim() } : { contentValue: value, contentUnit: null };
}

function insert(table: string, fields: Record<string, string | number | null>) {
  return `INSERT OR IGNORE INTO ${table} (${Object.keys(fields).join(", ")}) VALUES (${Object.values(fields).map((value) => typeof value === "number" ? String(value) : sqlString(value)).join(", ")});`;
}

function searchText(row: Omit<CatalogImportRow, "searchText">) {
  return [row.internalProductCode, row.brand, row.productLine, row.category, row.productType, row.variantGroup, row.productName, row.shadeCode, row.contentValue, row.contentUnit].filter(Boolean).join(" ").toLowerCase();
}

function main() {
  const rows = sheetRows(readWorkbook(workbookPath), "Color Fresh Mask");
  const accepted: CatalogImportRow[] = [];
  const rejected: Array<{ row: number; reason: string }> = [];

  rows.forEach((source, index) => {
    const tint = clean(source["Kleur / tint"]);
    const name = clean(source["Productnaam"]);
    const group = clean(source["Kleurgroep"]);
    const content = parseContent(clean(source["Inhoud"]));
    if (!tint || !name) {
      rejected.push({ row: index + 2, reason: "Productnaam of kleur/tint ontbreekt." });
      return;
    }
    const base = {
      internalProductCode: `EH-${String(startCode + accepted.length).padStart(4, "0")}`,
      brand: "Wella",
      category: "Haarverzorging",
      productType: "Haarmasker",
      productLine: "Color Fresh Mask",
      variantGroup: group,
      productName: `Wella ${name}`,
      shadeCode: tint,
      contentValue: content.contentValue,
      contentUnit: content.contentUnit,
      orderUnit: "stuk",
      supplier: null,
      supplierSku: null,
      barcodeGtin: null,
      active: true,
      sourceFile: path.basename(workbookPath)
    };
    accepted.push({ ...base, searchText: searchText(base) });
  });

  const sql = [
    "PRAGMA foreign_keys = ON;",
    insert("brands", { name: "Wella", active: 1 }),
    insert("categories", { name: "Haarverzorging", active: 1, sort_order: 2 }),
    "INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, 'Haarmasker', 1, 3 FROM categories WHERE name = 'Haarverzorging';",
    "INSERT OR IGNORE INTO product_lines (brand_id, name, active) SELECT id, 'Color Fresh Mask', 1 FROM brands WHERE name = 'Wella';"
  ];

  for (const row of accepted) {
    sql.push(`INSERT INTO products (internal_product_code, brand_id, product_line_id, category_id, product_type_id, variant_group, product_name, shade_code, content_value, content_unit, order_unit, supplier_id, supplier_sku, barcode_gtin, active, search_text)
SELECT ${sqlString(row.internalProductCode)}, b.id, pl.id, c.id, pt.id, ${sqlString(row.variantGroup)}, ${sqlString(row.productName)}, ${sqlString(row.shadeCode)}, ${sqlString(row.contentValue)}, ${sqlString(row.contentUnit)}, ${sqlString(row.orderUnit)}, NULL, NULL, NULL, 1, ${sqlString(row.searchText)}
FROM brands b
JOIN categories c ON c.name = 'Haarverzorging'
JOIN product_types pt ON pt.category_id = c.id AND pt.name = 'Haarmasker'
JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = 'Color Fresh Mask'
WHERE b.name = 'Wella'
ON CONFLICT(internal_product_code) DO UPDATE SET brand_id = excluded.brand_id, product_line_id = excluded.product_line_id, category_id = excluded.category_id, product_type_id = excluded.product_type_id, variant_group = excluded.variant_group, product_name = excluded.product_name, shade_code = excluded.shade_code, content_value = excluded.content_value, content_unit = excluded.content_unit, active = excluded.active, search_text = excluded.search_text, updated_at = datetime('now');`);
  }

  const report = {
    source: workbookPath,
    startCode,
    endCode: startCode + accepted.length - 1,
    importedProducts: accepted.length,
    rejectedRows: rejected.length,
    byBrand: { Wella: accepted.length },
    byCategory: { Haarverzorging: accepted.length },
    byProductType: { Haarmasker: accepted.length },
    rejected
  };
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(seedPath, `${sql.join("\n")}\n`);
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
}

if (fileURLToPath(import.meta.url) === process.argv[1]) main();
