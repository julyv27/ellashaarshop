import fs from "node:fs";
import { describe, expect, it } from "vitest";

const report = JSON.parse(fs.readFileSync("generated/olaplex-products-import-report.json", "utf8"));
const seed = fs.readFileSync("generated/olaplex-products-seed.sql", "utf8");

describe("olaplex products import", () => {
  it("imports Olaplex plus Blonde Me peroxide products", () => {
    expect(report.importedProducts).toBe(49);
    expect(report.olaplexProducts).toBe(46);
    expect(report.blondeMeProducts).toBe(3);
    expect(report.rejectedRows).toBe(0);
    expect(report.startCode).toBe(1225);
    expect(report.endCode).toBe(1273);
    expect(report.byBrand).toEqual({ OLAPLEX: 46, Schwarzkopf: 3 });
  });

  it("keeps source product names and does not invent supplier data", () => {
    expect(seed).toContain("'Nº.0 Intensive Bond Building Treatment'");
    expect(seed).toContain("'Blonde Me 9%'");
    expect(seed).toContain("'Waterstofperoxide'");
    expect(seed).toContain("NULL,\n  NULL,\n  NULL,\n  1,");
  });
});
