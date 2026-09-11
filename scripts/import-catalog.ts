import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { strFromU8, unzipSync } from "fflate";
import type { CatalogImportRow } from "../src/shared/types";

const workbookPath = process.argv[2] ?? "Ellas_Haarshop_master_productcatalogus_merken_en_lijnen.xlsx";
const outputDir = "generated";
const seedPath = path.join(outputDir, "catalog-seed.sql");
const reportPath = path.join(outputDir, "catalog-import-report.json");

type Sheet = Record<string, { t?: string; v: string }> & { "!ref"?: string };
type Workbook = { Sheets: Record<string, Sheet> };

function xmlDecode(value: string): string {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

function textFromXml(fragment: string): string {
  return [...fragment.matchAll(/<(?:\w+:)?t\b[^>]*>([\s\S]*?)<\/(?:\w+:)?t>/g)].map((match) => xmlDecode(match[1] ?? "")).join("");
}

function columnNumber(ref: string): number {
  const letters = ref.replace(/[^A-Z]/gi, "").toUpperCase();
  let value = 0;
  for (const char of letters) value = value * 26 + char.charCodeAt(0) - 64;
  return value - 1;
}

function rowNumber(ref: string): number {
  return Number(ref.replace(/\D/g, "")) - 1;
}

function encodeCell(cell: { r: number; c: number }): string {
  let n = cell.c + 1;
  let letters = "";
  while (n > 0) {
    const mod = (n - 1) % 26;
    letters = String.fromCharCode(65 + mod) + letters;
    n = Math.floor((n - mod) / 26);
  }
  return `${letters}${cell.r + 1}`;
}

function decodeRange(ref: string) {
  const [start, end = start] = ref.split(":");
  return {
    s: { r: rowNumber(start), c: columnNumber(start) },
    e: { r: rowNumber(end), c: columnNumber(end) }
  };
}

function attr(tag: string, name: string): string | null {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`));
  return match ? xmlDecode(match[1]) : null;
}

export function readWorkbook(filePath: string): Workbook {
  const zip = unzipSync(new Uint8Array(fs.readFileSync(filePath)));
  const read = (name: string) => {
    const file = zip[name];
    if (!file) throw new Error(`Ontbrekend xlsx-onderdeel: ${name}`);
    return strFromU8(file);
  };
  const sharedXml = zip["xl/sharedStrings.xml"] ? strFromU8(zip["xl/sharedStrings.xml"]) : "";
  const shared = [...sharedXml.matchAll(/<(?:\w+:)?si\b[^>]*>([\s\S]*?)<\/(?:\w+:)?si>/g)].map((match) => textFromXml(match[1] ?? ""));
  const rels = read("xl/_rels/workbook.xml.rels");
  const relMap = new Map([...rels.matchAll(/<(?:\w+:)?Relationship\b[^>]*\/?>/g)].map((match) => [attr(match[0], "Id"), attr(match[0], "Target")]).filter((entry): entry is [string, string] => Boolean(entry[0] && entry[1])));
  const workbookXml = read("xl/workbook.xml");
  const sheets: Record<string, Sheet> = {};

  for (const sheetMatch of workbookXml.matchAll(/<(?:\w+:)?sheet\b[^>]*\/?>/g)) {
    const tag = sheetMatch[0];
    const name = attr(tag, "name");
    const relationshipId = attr(tag, "r:id");
    const target = relationshipId ? relMap.get(relationshipId) : null;
    if (!name || !target) continue;
    const normalizedTarget = target.startsWith("/") ? target.slice(1) : `xl/${target}`;
    const xml = read(normalizedTarget);
    const sheet: Sheet = {};
    const dimension = xml.match(/<(?:\w+:)?dimension\b[^>]*ref="([^"]+)"/);
    if (dimension) sheet["!ref"] = dimension[1];
    for (const cellMatch of xml.matchAll(/<(?:\w+:)?c\b(?=[^>]*>)(?![^>]*\/>)[^>]*>[\s\S]*?<\/(?:\w+:)?c>/g)) {
      const cellXml = cellMatch[0];
      const openTag = cellXml.match(/<(?:\w+:)?c\b[^>]*>/)?.[0] ?? "";
      const ref = attr(openTag, "r");
      if (!ref) continue;
      const type = attr(openTag, "t") ?? undefined;
      const valueMatch = cellXml.match(/<(?:\w+:)?v>([\s\S]*?)<\/(?:\w+:)?v>/);
      let value = valueMatch ? xmlDecode(valueMatch[1] ?? "") : "";
      if (type === "s") value = shared[Number(value)] ?? "";
      if (type === "inlineStr") value = textFromXml(cellXml);
      sheet[ref] = { t: type, v: value };
    }
    if (!sheet["!ref"]) {
      const refs = Object.keys(sheet).filter((key) => key !== "!ref");
      if (refs.length) {
        const rows = refs.map(rowNumber);
        const columns = refs.map(columnNumber);
        sheet["!ref"] = `${encodeCell({ r: Math.min(...rows), c: Math.min(...columns) })}:${encodeCell({ r: Math.max(...rows), c: Math.max(...columns) })}`;
      } else {
        sheet["!ref"] = "A1:A1";
      }
    }
    sheets[name] = sheet;
  }
  return { Sheets: sheets };
}

function clean(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text === "" ? null : text;
}

function boolFromDutch(value: unknown): boolean {
  return (clean(value) ?? "").toLowerCase() !== "nee";
}

function sqlString(value: string | null): string {
  if (value === null) return "NULL";
  return `'${value.replaceAll("'", "''")}'`;
}

function readTextCell(sheet: Sheet, address: string): string | null {
  const cell = sheet[address];
  if (!cell) return null;
  return clean(cell.v);
}

export function sheetRows(workbook: Workbook, sheetName: string): Record<string, string | null>[] {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet?.["!ref"]) return [];
  const range = decodeRange(sheet["!ref"]);
  const headers: string[] = [];
  for (let c = range.s.c; c <= range.e.c; c += 1) {
    headers.push(readTextCell(sheet, encodeCell({ r: 0, c })) ?? "");
  }
  const output: Record<string, string | null>[] = [];
  for (let r = 1; r <= range.e.r; r += 1) {
    const row: Record<string, string | null> = {};
    let hasValue = false;
    for (let c = range.s.c; c <= range.e.c; c += 1) {
      const value = readTextCell(sheet, encodeCell({ r, c }));
      row[headers[c] ?? ""] = value;
      if (value) hasValue = true;
    }
    if (hasValue) output.push(row);
  }
  return output;
}

function parseContent(header: string, value: string | null): { contentValue: string | null; contentUnit: string | null } {
  if (!value) return { contentValue: null, contentUnit: null };
  const match = header.match(/\(([^)]+)\)/);
  return { contentValue: value, contentUnit: match?.[1] ?? null };
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

function insert(table: string, fields: Record<string, string | number | null>) {
  const columns = Object.keys(fields).join(", ");
  const values = Object.values(fields).map((value) => typeof value === "number" ? String(value) : sqlString(value)).join(", ");
  return `INSERT OR IGNORE INTO ${table} (${columns}) VALUES (${values});`;
}

function main() {
  const workbook = readWorkbook(workbookPath);
  const sheet = workbook.Sheets.Productcatalogus;
  if (!sheet) throw new Error("Tabblad Productcatalogus ontbreekt.");

  const ref = sheet["!ref"];
  if (!ref) throw new Error("Productcatalogus is leeg.");
  const range = decodeRange(ref);
  const headers: string[] = [];
  for (let c = range.s.c; c <= range.e.c; c += 1) {
    headers.push(readTextCell(sheet, encodeCell({ r: 0, c })) ?? "");
  }

  const rows: CatalogImportRow[] = [];
  const rejected: Array<{ row: number; reason: string }> = [];
  const seenCodes = new Set<string>();
  const duplicateKeys = new Map<string, number>();

  for (let r = 1; r <= range.e.r; r += 1) {
    const values = new Map<string, string | null>();
    for (let c = range.s.c; c <= range.e.c; c += 1) {
      values.set(headers[c], readTextCell(sheet, encodeCell({ r, c })));
    }

    if (![...values.values()].some(Boolean)) continue;

    const required = ["Product-ID", "Merk", "Hoofdcategorie", "Producttype", "Productnaam"];
    const missing = required.filter((header) => !values.get(header));
    if (missing.length > 0) {
      rejected.push({ row: r + 1, reason: `Ontbrekende verplichte velden: ${missing.join(", ")}` });
      continue;
    }

    const internalProductCode = values.get("Product-ID")!;
    if (seenCodes.has(internalProductCode)) {
      rejected.push({ row: r + 1, reason: `Dubbele Product-ID: ${internalProductCode}` });
      continue;
    }
    seenCodes.add(internalProductCode);

    const content = parseContent("Inhoud (ml)", values.get("Inhoud (ml)") ?? null);
    const base = {
      internalProductCode,
      brand: values.get("Merk")!,
      category: values.get("Hoofdcategorie")!,
      productType: values.get("Producttype")!,
      productLine: values.get("Lijn / submerk") ?? null,
      variantGroup: values.get("Serie / variantgroep") ?? null,
      productName: values.get("Productnaam")!,
      shadeCode: values.get("Kleurcode") ?? null,
      contentValue: content.contentValue,
      contentUnit: content.contentUnit,
      orderUnit: values.get("Besteleenheid") ?? "stuk",
      supplier: values.get("Leverancier") ?? null,
      supplierSku: values.get("Artikelnummer leverancier") ?? null,
      barcodeGtin: values.get("EAN / barcode") ?? null,
      active: boolFromDutch(values.get("Actief")),
      sourceFile: values.get("Bronbestand") ?? null
    };

    const duplicateKey = [base.brand, base.productLine, base.productName, base.shadeCode, base.contentValue, base.contentUnit].join("|").toLowerCase();
    duplicateKeys.set(duplicateKey, (duplicateKeys.get(duplicateKey) ?? 0) + 1);
    rows.push({ ...base, searchText: searchText(base) });
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const choiceRows = sheetRows(workbook, "Keuzelijsten");
  const filterRows = sheetRows(workbook, "Filterstructuur");
  const brandLineRows = sheetRows(workbook, "Merken & lijnen");

  const brands = [...new Set([
    ...rows.map((row) => row.brand),
    ...choiceRows.map((row) => row["Merk"]).filter(Boolean) as string[],
    ...brandLineRows.map((row) => row["Merk"]).filter(Boolean) as string[]
  ])].sort();
  const suppliers = [...new Set([
    ...rows.map((row) => row.supplier).filter(Boolean) as string[],
    ...choiceRows.map((row) => row["Leverancier"]).filter(Boolean) as string[]
  ])].sort();
  const categoryNames = [...new Set([
    ...rows.map((row) => row.category),
    ...choiceRows.map((row) => row["Hoofdcategorie"]).filter(Boolean) as string[],
    ...filterRows.map((row) => row["Database-hoofdcategorie"]).filter(Boolean) as string[]
  ])].sort();
  const productTypes = [...new Map([
    ...rows.map((row) => [`${row.category}|||${row.productType}`, { category: row.category, name: row.productType }] as const),
    ...filterRows
      .filter((row) => row["Database-hoofdcategorie"] && row["Subcategorie / producttype"])
      .map((row) => [`${row["Database-hoofdcategorie"]}|||${row["Subcategorie / producttype"]}`, { category: row["Database-hoofdcategorie"]!, name: row["Subcategorie / producttype"]! }] as const)
  ]).values()];
  const lines = [...new Map([
    ...rows.filter((row) => row.productLine).map((row) => [`${row.brand}|||${row.productLine}`, { brand: row.brand, name: row.productLine! }] as const),
    ...brandLineRows.filter((row) => row["Merk"] && row["Lijn / submerk"]).map((row) => [`${row["Merk"]}|||${row["Lijn / submerk"]}`, { brand: row["Merk"]!, name: row["Lijn / submerk"]! }] as const)
  ]).values()];

  const sql: string[] = [
    "PRAGMA foreign_keys = ON;"
  ];

  for (const brand of brands) sql.push(insert("brands", { name: brand, active: 1 }));
  for (const supplier of suppliers) sql.push(insert("suppliers", { name: supplier, active: 1 }));
  categoryNames.forEach((name, index) => sql.push(insert("categories", { name, active: 1, sort_order: index + 1 })));
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
  s.id,
  ${sqlString(row.supplierSku)},
  ${sqlString(row.barcodeGtin)},
  ${row.active ? 1 : 0},
  ${sqlString(row.searchText)}
FROM brands b
JOIN categories c ON c.name = ${sqlString(row.category)}
JOIN product_types pt ON pt.category_id = c.id AND pt.name = ${sqlString(row.productType)}
LEFT JOIN product_lines pl ON pl.brand_id = b.id AND pl.name = ${sqlString(row.productLine)}
LEFT JOIN suppliers s ON s.name = ${sqlString(row.supplier)}
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
  supplier_id = excluded.supplier_id,
  supplier_sku = excluded.supplier_sku,
  barcode_gtin = excluded.barcode_gtin,
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
  const byProductType = rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.productType] = (acc[row.productType] ?? 0) + 1;
    return acc;
  }, {});
  const possibleDuplicates = [...duplicateKeys.entries()].filter(([, count]) => count > 1).map(([key, count]) => ({ key, count }));

  const report = {
    source: workbookPath,
    importedProducts: rows.length,
    rejectedRows: rejected.length,
    byBrand,
    byProductType,
    possibleDuplicates,
    preparedMasterdata: {
      brands: brands.length,
      categories: categoryNames.length,
      productTypes: productTypes.length,
      productLines: lines.length,
      suppliers: suppliers.length
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
