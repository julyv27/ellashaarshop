import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CatalogImportRow } from "../src/shared/types";
import { readWorkbook, sheetRows } from "./import-catalog";

const workbookPath = process.argv[2] ?? "/Users/julia/Downloads/Salon_producten_fotos_aparte_ml_varianten (1).xlsx";
const startCode = Number(process.argv[3] ?? "970");
const outputDir = "generated";
const seedPath = path.join(outputDir, "salon-products-seed.sql");
const reportPath = path.join(outputDir, "salon-products-import-report.json");

function clean(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text === "" ? null : text;
}

function sqlString(value: string | null): string {
  if (value === null) return "NULL";
  return `'${value.replaceAll("'", "''")}'`;
}

function insert(table: string, fields: Record<string, string | number | null>) {
  const columns = Object.keys(fields).join(", ");
  const values = Object.values(fields).map((value) => typeof value === "number" ? String(value) : sqlString(value)).join(", ");
  return `INSERT OR IGNORE INTO ${table} (${columns}) VALUES (${values});`;
}

function normalizeBrand(value: string) {
  if (value === "Schwarzkopf Professional") return "Schwarzkopf";
  if (value === "Wella Professionals") return "Wella";
  return value;
}

function parseContent(value: string | null): { contentValue: string | null; contentUnit: string | null } {
  if (!value) return { contentValue: null, contentUnit: null };
  const match = value.match(/^(.+?)\s*([a-zA-Z]+)$/);
  if (!match) return { contentValue: value, contentUnit: null };
  return { contentValue: match[1].trim(), contentUnit: match[2].trim() };
}

function productTypeFor(category: string, name: string): { category: string; productType: string } {
  const text = name.toLowerCase();
  if (category === "Color Styling") return { category: "Styling", productType: "Mousse" };
  if (category === "Styling") return { category: "Styling", productType: stylingType(text) };
  if (category === "Care / Styling" && /\b(foam|mousse)\b/.test(text) && !/leave-in/.test(text)) return { category: "Styling", productType: "Mousse" };
  return { category: "Haarverzorging", productType: careType(text) };
}

function careType(text: string) {
  if (/shampoo|cleanser/.test(text)) return "Shampoo";
  if (/conditioner/.test(text)) return "Conditioner";
  if (/mask|masque/.test(text)) return "Haarmasker";
  if (/leave-in|10-in-1 spray|spray conditioner|cream-in-mousse/.test(text)) return "Leave-in";
  if (/oil|serum/.test(text)) return "Haarolie / serum";
  if (/treatment|therapy|clay|filler|sealed ends|reboost/.test(text)) return "Treatment";
  return "Treatment";
}

function stylingType(text: string) {
  if (/thermal|heat|super shield/.test(text)) return "Hittebescherming";
  if (/hairspray|hair spray|lacquer|session|freeze|elastic|mistify|super set|dynamic fix/.test(text)) return "Haarlak";
  if (/mousse|foam|whip|extra volume|natural volume|shape control/.test(text)) return "Mousse";
  if (/gel|g\. force|rock hard|sculpt force|fix max/.test(text)) return "Gel";
  if (/wax|paste|mess up|mighty matte|thrill|grip cream|pearl styler|rugged texture|flexwax/.test(text)) return "Wax / paste";
  if (/spray|rootlift|body crafter|texture|volume|sparkler|sugar lift|setting lotion|fix design|fix anti-frizz|fix polish|pump up|upload|hairbody/.test(text)) return "Styling spray";
  return "Styling spray";
}

function searchText(row: Omit<CatalogImportRow, "searchText">): string {
  return [
    row.internalProductCode,
    row.brand,
    row.productLine,
    row.category,
    row.productType,
    row.variantGroup,
    row.productName,
    row.shadeCode,
    row.contentValue,
    row.contentUnit
  ].filter(Boolean).join(" ").toLowerCase();
}

function main() {
  const workbook = readWorkbook(workbookPath);
  const sourceRows = sheetRows(workbook, "Productoverzicht");
  if (sourceRows.length === 0) throw new Error("Tabblad Productoverzicht ontbreekt of is leeg.");

  const rows: CatalogImportRow[] = [];
  const rejected: Array<{ row: number; reason: string }> = [];
  const seen = new Set<string>();

  sourceRows.forEach((source, index) => {
    const brand = clean(source["Merk"]);
    const line = clean(source["Lijn"]);
    const productName = clean(source["Productnaam"]);
    const sourceCategory = clean(source["Categorie"]);
    const content = parseContent(clean(source["Inhoud (ml)"]));
    const missing = [
      ["Merk", brand],
      ["Lijn", line],
      ["Productnaam", productName],
      ["Categorie", sourceCategory]
    ].filter(([, value]) => !value).map(([name]) => name);
    if (missing.length > 0) {
      rejected.push({ row: index + 2, reason: `Ontbrekende verplichte velden: ${missing.join(", ")}` });
      return;
    }

    const normalizedBrand = normalizeBrand(brand!);
    const type = productTypeFor(sourceCategory!, productName!);
    const duplicateKey = [normalizedBrand, line, productName, content.contentValue, content.contentUnit].join("|").toLowerCase();
    if (seen.has(duplicateKey)) {
      rejected.push({ row: index + 2, reason: `Dubbele regel in importbestand: ${duplicateKey}` });
      return;
    }
    seen.add(duplicateKey);

    const internalProductCode = `EH-${String(startCode + rows.length).padStart(4, "0")}`;
    const base = {
      internalProductCode,
      brand: normalizedBrand,
      category: type.category,
      productType: type.productType,
      productLine: line,
      variantGroup: null,
      productName: `${normalizedBrand} ${line} ${productName}`,
      shadeCode: null,
      contentValue: content.contentValue,
      contentUnit: content.contentUnit,
      orderUnit: "stuk",
      supplier: null,
      supplierSku: null,
      barcodeGtin: null,
      active: true,
      sourceFile: path.basename(workbookPath)
    };
    rows.push({ ...base, searchText: searchText(base) });
  });

  const categories = [...new Set(rows.map((row) => row.category))].sort();
  const productTypes = [...new Map(rows.map((row) => [`${row.category}|||${row.productType}`, { category: row.category, name: row.productType }] as const)).values()];
  const brands = [...new Set(rows.map((row) => row.brand))].sort();
  const lines = [...new Map(rows.filter((row) => row.productLine).map((row) => [`${row.brand}|||${row.productLine}`, { brand: row.brand, name: row.productLine! }] as const)).values()];

  fs.mkdirSync(outputDir, { recursive: true });
  const sql = ["PRAGMA foreign_keys = ON;"];
  for (const brand of brands) sql.push(insert("brands", { name: brand, active: 1 }));
  categories.forEach((name, index) => sql.push(insert("categories", { name, active: 1, sort_order: name === "Haarverzorging" ? 5 : 4 + index })));
  productTypes.forEach((type, index) => {
    sql.push(`INSERT OR IGNORE INTO product_types (category_id, name, active, sort_order) SELECT id, ${sqlString(type.name)}, 1, ${index + 1} FROM categories WHERE name = ${sqlString(type.category)};`);
  });
  for (const line of lines) {
    sql.push(`INSERT OR IGNORE INTO product_lines (brand_id, name, active) SELECT id, ${sqlString(line.name)}, 1 FROM brands WHERE name = ${sqlString(line.brand)};`);
  }

  for (const row of rows) {
    sql.push(`INSERT INTO products (
  internal_product_code, brand_id, product_line_id, category_id, product_type_id, variant_group,
  product_name, shade_code, content_value, content_unit, order_unit, supplier_id, supplier_sku,
  barcode_gtin, active, search_text
) SELECT
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
  product_name = excluded.product_name,
  content_value = excluded.content_value,
  content_unit = excluded.content_unit,
  order_unit = excluded.order_unit,
  active = excluded.active,
  search_text = excluded.search_text,
  updated_at = datetime('now');`);
    sql.push(`INSERT OR REPLACE INTO products_fts (rowid, internal_product_code, brand, product_line, category, product_type, variant_group, product_name, shade_code, content, search_text)
SELECT p.id, p.internal_product_code, b.name, COALESCE(pl.name, ''), c.name, pt.name, COALESCE(p.variant_group, ''), p.product_name, COALESCE(p.shade_code, ''), TRIM(COALESCE(p.content_value, '') || ' ' || COALESCE(p.content_unit, '')), p.search_text
FROM products p
JOIN brands b ON b.id = p.brand_id
JOIN categories c ON c.id = p.category_id
JOIN product_types pt ON pt.id = p.product_type_id
LEFT JOIN product_lines pl ON pl.id = p.product_line_id
WHERE p.internal_product_code = ${sqlString(row.internalProductCode)};`);
  }

  const byBrand = rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.brand] = (acc[row.brand] ?? 0) + 1;
    return acc;
  }, {});
  const byCategory = rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.category] = (acc[row.category] ?? 0) + 1;
    return acc;
  }, {});
  const byProductType = rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.productType] = (acc[row.productType] ?? 0) + 1;
    return acc;
  }, {});

  const report = {
    source: workbookPath,
    startCode,
    endCode: startCode + rows.length - 1,
    importedProducts: rows.length,
    rejectedRows: rejected.length,
    byBrand,
    byCategory,
    byProductType,
    preparedMasterdata: {
      brands: brands.length,
      categories: categories.length,
      productTypes: productTypes.length,
      productLines: lines.length
    },
    rejected
  };

  fs.writeFileSync(seedPath, `${sql.join("\n")}\n`);
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
