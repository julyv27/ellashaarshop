import fs from "node:fs";
import { describe, expect, it } from "vitest";

const report = JSON.parse(fs.readFileSync("generated/color-fresh-mask-import-report.json", "utf8"));
const seed = fs.readFileSync("generated/color-fresh-mask-seed.sql", "utf8");

describe("color fresh mask import", () => {
  it("imports Wella Color Fresh Mask products", () => {
    expect(report.importedProducts).toBe(14);
    expect(report.rejectedRows).toBe(0);
    expect(report.startCode).toBe(1205);
    expect(report.endCode).toBe(1218);
    expect(report.byBrand).toEqual({ Wella: 14 });
    expect(report.byProductType).toEqual({ Haarmasker: 14 });
  });

  it("keeps tint names as text", () => {
    expect(seed).toContain("'Wella Color Fresh Mask Golden Gloss'");
    expect(seed).toContain("'Cool Expresso'");
  });
});
