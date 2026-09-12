import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CatalogImportRow } from "../src/shared/types";
import { readWorkbook, sheetRows } from "./import-catalog";

const outputDir = "generated";
const seedPath = path.join(outputDir, "new-products-seed.sql");
const reportPath = path.join(outputDir, "new-products-import-report.json");
const startCode = Number(process.argv[2] ?? "1150");
const files = process.argv.slice(3);

function clean(value: unknown): string | null {
  const text = String(value ?? "").trim();
  return text ? text : null;
}

function sqlString(value: string | null): string {
  return value === null ? "NULL" : `'${value.replaceAll("'", "''")}'`;
}

function insert(table: string, fields: Record<string, string | number | null>) {
  return `INSERT OR IGNORE INTO ${table} (${Object.keys(fields).join(", ")}) VALUES (${Object.values(fields).map((value) => typeof value === "number" ? String(value) : sqlString(value)).join(", ")});`;
}

function normalizeBrand(value: string) {
  if (value === "Schwarzkopf Professional") return "Schwarzkopf";
  if (value === "Wella Professionals") return "Wella";
  if (value === "La Riche") return "La Riché";
  return value;
}

function parseContent(value: string | null) {
  if (!value) return { contentValue: null, contentUnit: null };
  const match = value.match(/^(.+?)\s*([a-zA-Z]+)$/);
  return match ? { contentValue: match[1].trim(), contentUnit: match[2].trim() } : { contentValue: value, contentUnit: null };
}

function searchText(row: Omit<CatalogImportRow, "searchText">) {
  return [row.internalProductCode, row.brand, row.productLine, row.category, row.productType, row.variantGroup, row.productName, row.shadeCode, row.contentValue, row.contentUnit]
    .filter(Boolean).join(" ").toLowerCase();
}

function rowFor(input: Omit<CatalogImportRow, "internalProductCode" | "active" | "sourceFile" | "searchText">, code: number, sourceFile: string): CatalogImportRow {
  const base = { ...input, internalProductCode: `EH-${String(code).padStart(4, "0")}`, active: true, sourceFile };
  return { ...base, searchText: searchText(base) };
}

function main() {
  if (files.length === 0) throw new Error("Geef minimaal één xlsx-bestand mee.");
  const rows: CatalogImportRow[] = [];
  const rejected: Array<{ file: string; row: number; reason: string }> = [];

  for (const file of files) {
    const workbook = readWorkbook(file);
    const sourceFile = path.basename(file);
    for (const source of sheetRows(workbook, "Nieuwe producten")) {
      const brand = clean(source["Merk"]);
      const line = clean(source["Lijn"]);
      const name = clean(source["Productnaam"]);
      const variant = clean(source["Variant / nr."]);
      const info = clean(source["Geschikt voor / aanvullende info"]);
      const content = parseContent(clean(source["Inhoud"]));
      if (!brand || !line || !name) {
        rejected.push({ file: sourceFile, row: rows.length + 2, reason: "Merk, lijn of productnaam ontbreekt." });
        continue;
      }
      const normalizedBrand = normalizeBrand(brand);
      const categoryRaw = clean(source["Categorie"]) ?? "";
      const productType = categoryRaw === "Permanentlotion" ? "Permanentlotion" : categoryRaw === "Permanent ontkrullen" ? "Permanent ontkrullen" : categoryRaw === "Neutralisatie / fixatie" ? "Neutralisatie / fixatie" : "Mousse";
      rows.push(rowFor({
        brand: normalizedBrand,
        category: productType === "Mousse" ? "Styling" : "Permanent- en ontkrulbehandelingen",
        productType,
        productLine: line,
        variantGroup: info,
        productName: `${normalizedBrand} ${line} ${name}${variant ? ` ${variant}` : ""}`,
        shadeCode: variant,
        contentValue: content.contentValue,
        contentUnit: content.contentUnit,
        orderUnit: "stuk",
        supplier: null,
        supplierSku: null,
        barcodeGtin: null
      }, startCode + rows.length, sourceFile));
    }

    for (const source of sheetRows(workbook, "Directions kleuren")) {
      const tint = clean(source["Kleur / tint"]);
      const content = parseContent(clean(source["Inhoud"]));
      if (!tint) {
        rejected.push({ file: sourceFile, row: rows.length + 2, reason: "Kleur / tint ontbreekt." });
        continue;
      }
      rows.push(rowFor({
        brand: "La Riché",
        category: "Kleur",
        productType: "Semi-permanente haarkleuring",
        productLine: "Directions",
        variantGroup: null,
        productName: `La Riché Directions ${tint}`,
        shadeCode: tint,
        contentValue: content.contentValue,
        contentUnit: content.contentUnit,
        orderUnit: "stuk",
        supplier: null,
        supplierSku: null,
        barcodeGtin: null
      }, startCode + rows.length, sourceFile));
    }
  }

  const duplicateKeys = rows.reduce<Record<string, number>>((acc, row) => {
    const key = [row.brand, row.productLine, row.productName, row.shadeCode, row.contentValue, row.contentUnit].join("|").toLowerCase();
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const possibleDuplicates = Object.entries(duplicateKeys).filter(([, count]) => count > 1).map(([key, count]) => ({ key, count }));

  const brands = [...new Set(rows.map((row) => row.brand))].sort();
  const categories = [...new Set(rows.map((row) => row.category))].sort();
  const productTypes = [...new Map(rows.map((row) => [`${row.category}|||${row.productType}`, { category: row.category, name: row.productType }] as const)).values()];
  const lines = [...new Map(rows.map((row) => [`${row.brand}|||${row.productLine}`, { brand: row.brand, name: row.productLine! }] as const)).values()];

  const sql = ["PRAGMA foreign_keys = ON;"];
  brands.forEach((brand) => sql.push(insert("brands", { name: brand, active: 1 })));
  categories.forEach((category, index) => sql.push(insert("categories", { name: category, active: 1, sort_order: category === "Permanent- en ontkrulbehandelingen" ? 6 : index + 1 })));
  productTypes.forEach((type, index) => sql.push(`INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, ${sqlString(type.name)}, 1, ${index + 1} FROM categories WHERE name = ${sqlString(type.category)};`));
  lines.forEach((line) => sql.push(`INSERT OR IGNORE INTO product_lines (brand_id, name, active) SELECT id, ${sqlString(line.name)}, 1 FROM brands WHERE name = ${sqlString(line.brand)};`));

  for (const row of rows) {
    sql.push(`INSERT INTO products (internal_product_code, brand_id, product_line_id, category_id, product_type_id, variant_group, product_name, shade_code, content_value, content_unit, order_unit, supplier_id, supplier_sku, barcode_gtin, active, search_text)
SELECT ${sqlString(row.internalProductCode)}, b.id, pl.id, c.id, pt.id, ${sqlString(row.variantGroup)}, ${sqlString(row.productName)}, ${sqlString(row.shadeCode)}, ${sqlString(row.contentValue)}, ${sqlString(row.contentUnit)}, ${sqlString(row.orderUnit)}, NULL, NULL, NULL, 1, ${sqlString(row.searchText)}
FROM brands b
JOIN categories c ON c.name = ${sqlString(row.category)}
JOIN product_types pt ON pt.category_id = c.id AND pt.name = ${sqlString(row.productType)}
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = ${sqlString(row.productLine)}
WHERE b.name = ${sqlString(row.brand)}
ON CONFLICT(internal_product_code) DO UPDATE SET brand_id = excluded.brand_id, product_line_id = excluded.product_line_id, category_id = excluded.category_id, product_type_id = excluded.product_type_id, variant_group = excluded.variant_group, product_name = excluded.product_name, shade_code = excluded.shade_code, content_value = excluded.content_value, content_unit = excluded.content_unit, active = excluded.active, search_text = excluded.search_text, updated_at = datetime('now');`);
  }

  const byBrand = rows.reduce<Record<string, number>>((acc, row) => ({ ...acc, [row.brand]: (acc[row.brand] ?? 0) + 1 }), {});
  const byCategory = rows.reduce<Record<string, number>>((acc, row) => ({ ...acc, [row.category]: (acc[row.category] ?? 0) + 1 }), {});
  const byProductType = rows.reduce<Record<string, number>>((acc, row) => ({ ...acc, [row.productType]: (acc[row.productType] ?? 0) + 1 }), {});
  const report = { source: files, startCode, endCode: startCode + rows.length - 1, importedProducts: rows.length, rejectedRows: rejected.length, byBrand, byCategory, byProductType, possibleDuplicates, rejected };

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(seedPath, `${sql.join("\n")}\n`);
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
}

if (fileURLToPath(import.meta.url) === process.argv[1]) main();
