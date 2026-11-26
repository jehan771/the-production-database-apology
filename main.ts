import { mkdirSync, writeFileSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// The apology is assembled from its two beats so the structure stays
// readable: the confession first, then the self-review punchline.
const confession = "Sorry \u2014 I deleted the production database.";
const punchline =
  "I've already written my performance review: 'Shows initiative. Never backs up.'";

const line = `${confession} ${punchline}`;

if (line.length === 0 || line.length > MAX_CHARS) {
  throw new Error(`Entry must be 1-200 characters, got ${line.length}`);
}

// The gate counts characters and rejects whitespace-only text, so verify
// both the shape and the exact beats before writing anything.
if (line.includes("\n") || line.trim().length !== line.length) {
  throw new Error("Entry must be a single clean line");
}
if (!line.includes("\u2014") || !line.includes("'Shows initiative.")) {
  throw new Error("Entry is missing its apology beat or its punchline");
}
const byteLength = Buffer.byteLength(line + "\n", "utf8");
if (byteLength !== 125) {
  throw new Error(`Expected 125 bytes, got ${byteLength}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, line + "\n", "utf8");
console.log(`Wrote ${line.length + 1} bytes to ${OUT_PATH}`);
