import fs from "node:fs";
import { describe, expect, it } from "vitest";

const report = JSON.parse(fs.readFileSync("generated/catalog-import-report.json", "utf8"));
const seed = fs.readFileSync("generated/catalog-seed.sql", "utf8");

describe("catalog import", () => {
  it("imports every product from the source workbook", () => {
    expect(report.importedProducts).toBe(969);
    expect(report.rejectedRows).toBe(0);
    expect(report.byBrand).toEqual({
      INDOLA: 101,
      "L'Oréal Professionnel": 274,
      Schwarzkopf: 228,
      Wella: 310,
      KIS: 56
    });
    expect(report.byProductType).toEqual({ Verf: 651, Toner: 318 });
  });

  it("keeps shade codes as exact text literals in generated SQL", () => {
    expect(seed).toContain("'1.0'");
    expect(seed).toContain("'10.0'");
    expect(seed).toContain("'eh-0001 indola pcc kleur verf natural indola pcc 1.0 1.0 60 ml'");
  });
});
