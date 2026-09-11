import fs from "node:fs";

const toml = fs.readFileSync("wrangler.toml", "utf8");
const match = toml.match(/database_id\s*=\s*"([^"]+)"/);

if (!match) {
  console.error("database_id ontbreekt in wrangler.toml");
  process.exit(1);
}

process.stdout.write(match[1]);
