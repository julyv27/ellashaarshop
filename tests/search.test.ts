import { describe, expect, it } from "vitest";
import { searchTerms } from "../src/shared/search";

describe("search terms", () => {
  it("splits multi-word searches and keeps shade-code variants searchable", () => {
    expect(searchTerms("igora 7")).toEqual([
      { raw: "igora", lower: "igora", variants: ["igora"] },
      { raw: "7", lower: "7", variants: ["7"] }
    ]);
    expect(searchTerms("7.0")[0].variants).toContain("7-0");
    expect(searchTerms("07/0")[0].variants).toContain("07.0");
  });
});
