export type SearchTerm = {
  raw: string;
  lower: string;
  variants: string[];
};

function unique(values: string[]) {
  return [...new Set(values.map((value) => value.trim().toLowerCase()).filter(Boolean))];
}

export function searchTerms(query: string): SearchTerm[] {
  return query
    .trim()
    .split(/\s+/)
    .map((raw) => {
      const lower = raw.toLowerCase();
      const variants = unique([
        lower,
        lower.replace(/[./]/g, "-"),
        lower.replace(/[-/]/g, "."),
        lower.replace(/[-.]/g, "/")
      ]);
      return { raw, lower, variants };
    })
    .filter((term) => term.variants.length > 0);
}
