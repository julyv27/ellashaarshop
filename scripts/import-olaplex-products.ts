import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CatalogImportRow } from "../src/shared/types";
import { readWorkbook, sheetRows } from "./import-catalog";

const workbookPath = process.argv[2] ?? "/Users/julia/Downloads/OLAPLEX_actuele_producten_met_afbeeldingsbronnen.xlsx";
const startCode = Number(process.argv[3] ?? "1225");
const outputDir = "generated";
const seedPath = path.join(outputDir, "olaplex-products-seed.sql");
const migrationPath = path.join("migrations", "0004_add_olaplex_and_blonde_me_peroxide.sql");
const reportPath = path.join(outputDir, "olaplex-products-import-report.json");

function clean(value: unknown): string | null {
  const text = String(value ?? "").trim();
  return text || null;
}

function sqlString(value: string | null): string {
  return value === null ? "NULL" : `'${value.replaceAll("'", "''")}'`;
}

function insert(table: string, fields: Record<string, string | number | null>) {
  return `INSERT OR IGNORE INTO ${table} (${Object.keys(fields).join(", ")}) VALUES (${Object.values(fields).map((value) => typeof value === "number" ? String(value) : sqlString(value)).join(", ")});`;
}

function parseContent(value: string | null) {
  if (!value) return { contentValue: null, contentUnit: null };
  const match = value.match(/^(.+?)\s*([a-zA-Z]+)$/);
  return match ? { contentValue: match[1].trim(), contentUnit: match[2].trim() } : { contentValue: value, contentUnit: null };
}

function productTypeFor(category: string) {
  const text = category.toLowerCase();
  if (/gel/.test(text)) return { category: "Styling", productType: "Gel" };
  if (/föhn|styling/.test(text) && !/olie|serum|leave-in/.test(text)) return { category: "Styling", productType: "Styling spray" };
  if (/shampoo/.test(text)) return { category: "Haarverzorging", productType: text.includes("droog") ? "Droogshampoo" : "Shampoo" };
  if (/conditioner/.test(text)) return { category: "Haarverzorging", productType: "Conditioner" };
  if (/masker/.test(text)) return { category: "Haarverzorging", productType: "Haarmasker" };
  if (/leave-in/.test(text)) return { category: "Haarverzorging", productType: "Leave-in" };
  if (/olie|serum|scalp|hoofdhuid/.test(text)) return { category: "Haarverzorging", productType: "Haarolie / serum" };
  return { category: "Haarverzorging", productType: "Treatment" };
}

function searchText(row: Omit<CatalogImportRow, "searchText">) {
  return [row.internalProductCode, row.brand, row.productLine, row.category, row.productType, row.variantGroup, row.productName, row.shadeCode, row.contentValue, row.contentUnit]
    .filter(Boolean).join(" ").toLowerCase();
}

function rowFor(input: Omit<CatalogImportRow, "internalProductCode" | "active" | "sourceFile" | "searchText">, code: number, sourceFile: string | null): CatalogImportRow {
  const base = { ...input, internalProductCode: `EH-${String(code).padStart(4, "0")}`, active: true, sourceFile };
  return { ...base, searchText: searchText(base) };
}

function productSql(row: CatalogImportRow) {
  return `INSERT INTO products (
  internal_product_code,
  brand_id,
  product_line_id,
  category_id,
  product_type_id,
  variant_group,
  product_name,
  shade_code,
  content_value,
  content_unit,
  order_unit,
  supplier_id,
  supplier_sku,
  barcode_gtin,
  active,
  search_text
)
SELECT
  ${sqlString(row.internalProductCode)},
  b.id,
  pl.id,
  c.id,
  pt.id,
  ${sqlString(row.variantGroup)},
  ${sqlString(row.productName)},
  ${sqlString(row.shadeCode)},
  ${sqlString(row.contentValue)},
  ${sqlString(row.contentUnit)},
  ${sqlString(row.orderUnit)},
  NULL,
  NULL,
  NULL,
  1,
  ${sqlString(row.searchText)}
FROM brands b
JOIN categories c ON c.name = ${sqlString(row.category)}
JOIN product_types pt ON pt.category_id = c.id AND pt.name = ${sqlString(row.productType)}
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = ${sqlString(row.productLine)}
WHERE b.name = ${sqlString(row.brand)}
ON CONFLICT(internal_product_code) DO UPDATE SET
  brand_id = excluded.brand_id,
  product_line_id = excluded.product_line_id,
  category_id = excluded.category_id,
  product_type_id = excluded.product_type_id,
  variant_group = excluded.variant_group,
  product_name = excluded.product_name,
  shade_code = excluded.shade_code,
  content_value = excluded.content_value,
  content_unit = excluded.content_unit,
  order_unit = excluded.order_unit,
  active = excluded.active,
  search_text = excluded.search_text,
  updated_at = datetime('now');`;
}

function ftsSql(codes: string[]) {
  return `INSERT OR REPLACE INTO products_fts (
  rowid,
  internal_product_code,
  brand,
  product_line,
  category,
  product_type,
  variant_group,
  product_name,
  shade_code,
  content,
  search_text
)
SELECT
  p.id,
  p.internal_product_code,
  b.name,
  COALESCE(pl.name, ''),
  c.name,
  pt.name,
  COALESCE(p.variant_group, ''),
  p.product_name,
  COALESCE(p.shade_code, ''),
  TRIM(COALESCE(p.content_value, '') || ' ' || COALESCE(p.content_unit, '')),
  p.search_text
FROM products p
JOIN brands b ON b.id = p.brand_id
JOIN categories c ON c.id = p.category_id
JOIN product_types pt ON pt.id = p.product_type_id
LEFT JOIN product_lines pl ON pl.id = p.product_line_id
WHERE p.internal_product_code IN (${codes.map(sqlString).join(", ")});`;
}

function main() {
  const workbook = readWorkbook(workbookPath);
  const sourceRows = sheetRows(workbook, "OLAPLEX producten");
  if (sourceRows.length === 0) throw new Error("Tabblad OLAPLEX producten ontbreekt of is leeg.");

  const rows: CatalogImportRow[] = [];
  const rejected: Array<{ row: number; reason: string }> = [];
  const sourceFile = path.basename(workbookPath);

  sourceRows.forEach((source, index) => {
    const brand = clean(source["Merk"]);
    const line = clean(source["Lijn"]);
    const productName = clean(source["Productnaam"]);
    const sourceCategory = clean(source["Categorie"]);
    const content = parseContent(clean(source["Inhoud"]));
    if (!brand || !line || !productName || !sourceCategory) {
      rejected.push({ row: index + 2, reason: "Merk, lijn, productnaam of categorie ontbreekt." });
      return;
    }
    const type = productTypeFor(sourceCategory);
    rows.push(rowFor({
      brand,
      category: type.category,
      productType: type.productType,
      productLine: line,
      variantGroup: sourceCategory,
      productName,
      shadeCode: null,
      contentValue: content.contentValue,
      contentUnit: content.contentUnit,
      orderUnit: "stuk",
      supplier: null,
      supplierSku: null,
      barcodeGtin: null
    }, startCode + rows.length, sourceFile));
  });

  const blondeMeRows = [
    { productName: "Blonde Me 3%", contentValue: "1000" },
    { productName: "Blonde Me 6%", contentValue: "1000" },
    { productName: "Blonde Me 9%", contentValue: "1000" }
  ];
  for (const peroxide of blondeMeRows) {
    rows.push(rowFor({
      brand: "Schwarzkopf",
      category: "Kleur",
      productType: "Waterstofperoxide",
      productLine: "Blonde Me",
      variantGroup: null,
      productName: peroxide.productName,
      shadeCode: null,
      contentValue: peroxide.contentValue,
      contentUnit: "ml",
      orderUnit: "stuk",
      supplier: null,
      supplierSku: null,
      barcodeGtin: null
    }, startCode + rows.length, null));
  }

  const brands = [...new Set(rows.map((row) => row.brand))].sort();
  const categories = [...new Set(rows.map((row) => row.category))].sort();
  const productTypes = [...new Map(rows.map((row) => [`${row.category}|||${row.productType}`, { category: row.category, name: row.productType }] as const)).values()];
  const lines = [...new Map(rows.filter((row) => row.productLine).map((row) => [`${row.brand}|||${row.productLine}`, { brand: row.brand, name: row.productLine! }] as const)).values()];

  const sql = ["PRAGMA foreign_keys = ON;"];
  brands.forEach((brand) => sql.push(insert("brands", { name: brand, active: 1 })));
  categories.forEach((category, index) => sql.push(insert("categories", { name: category, active: 1, sort_order: category === "Kleur" ? 3 : category === "Styling" ? 4 : 5 + index })));
  productTypes.forEach((type, index) => sql.push(`INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, ${sqlString(type.name)}, 1, ${index + 1} FROM categories WHERE name = ${sqlString(type.category)};`));
  lines.forEach((line) => sql.push(`INSERT OR IGNORE INTO product_lines (brand_id, name, active) SELECT id, ${sqlString(line.name)}, 1 FROM brands WHERE name = ${sqlString(line.brand)};`));
  rows.forEach((row) => sql.push(productSql(row)));
  sql.push(ftsSql(rows.map((row) => row.internalProductCode)));

  const byBrand = rows.reduce<Record<string, number>>((acc, row) => ({ ...acc, [row.brand]: (acc[row.brand] ?? 0) + 1 }), {});
  const byCategory = rows.reduce<Record<string, number>>((acc, row) => ({ ...acc, [row.category]: (acc[row.category] ?? 0) + 1 }), {});
  const byProductType = rows.reduce<Record<string, number>>((acc, row) => ({ ...acc, [row.productType]: (acc[row.productType] ?? 0) + 1 }), {});
  const report = {
    source: workbookPath,
    startCode,
    endCode: startCode + rows.length - 1,
    importedProducts: rows.length,
    olaplexProducts: sourceRows.length - rejected.length,
    blondeMeProducts: blondeMeRows.length,
    rejectedRows: rejected.length,
    byBrand,
    byCategory,
    byProductType,
    rejected
  };

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(seedPath, `${sql.join("\n")}\n`);
  fs.writeFileSync(migrationPath, `${sql.join("\n")}\n`);
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
}

if (fileURLToPath(import.meta.url) === process.argv[1]) main();
