import fs from "node:fs";
import { describe, expect, it } from "vitest";

const report = JSON.parse(fs.readFileSync("generated/salon-products-import-report.json", "utf8"));
const seed = fs.readFileSync("generated/salon-products-seed.sql", "utf8");

describe("salon products import", () => {
  it("maps the supplemental salon products into existing catalog structures", () => {
    expect(report.importedProducts).toBe(180);
    expect(report.rejectedRows).toBe(0);
    expect(report.startCode).toBe(970);
    expect(report.endCode).toBe(1149);
    expect(report.byBrand).toEqual({
      INDOLA: 37,
      "L'Oréal Professionnel": 43,
      Schwarzkopf: 48,
      Wella: 52
    });
    expect(report.byCategory).toEqual({ Haarverzorging: 124, Styling: 56 });
  });

  it("does not create duplicate professional brand names or invented supplier data", () => {
    expect(seed).not.toContain("Schwarzkopf Professional");
    expect(seed).not.toContain("Wella Professionals");
    expect(seed).toContain("'EH-0970'");
    expect(seed).toContain("'Schwarzkopf OSiS+ Flexwax'");
    expect(seed).toContain("NULL,\n  NULL,\n  NULL,\n  1,");
  });
});
