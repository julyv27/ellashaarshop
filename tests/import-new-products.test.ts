import fs from "node:fs";
import { describe, expect, it } from "vitest";

const report = JSON.parse(fs.readFileSync("generated/new-products-import-report.json", "utf8"));
const seed = fs.readFileSync("generated/new-products-seed.sql", "utf8");

describe("new products import", () => {
  it("imports omvorming, styling and La Riché Directions products", () => {
    expect(report.importedProducts).toBe(55);
    expect(report.rejectedRows).toBe(0);
    expect(report.startCode).toBe(1150);
    expect(report.endCode).toBe(1204);
    expect(report.byBrand).toEqual({ Wella: 2, Schwarzkopf: 6, INDOLA: 1, "La Riché": 46 });
    expect(report.byCategory).toEqual({ Omvorming: 8, Styling: 1, Kleur: 46 });
    expect(report.possibleDuplicates).toEqual([]);
  });

  it("keeps Directions tint names as text and does not invent supplier data", () => {
    expect(seed).toContain("'La Riché Directions Alpine Green'");
    expect(seed).toContain("'Semi-permanente haarkleuring'");
    expect(seed).toContain("'Alpine Green'");
    expect(seed).toContain("NULL, NULL, NULL, 1");
  });
});
