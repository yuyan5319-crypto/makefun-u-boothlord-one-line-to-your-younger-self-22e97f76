// One Line to Your Younger Self
// Writes a single line of advice to my younger self to entry.txt
// and prints it to stdout. The line must be 1-200 characters,
// a single line, and not only whitespace, or the program refuses
// to run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "Don't sell the red bike \u2014 the summer you do is the last summer anyone waits for you at the gate.";

const MAX_CHARS = 200;

function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("refusing to run: line is empty or only whitespace");
  }
  // The gate counts characters, not UTF-16 code units: count code points.
  const chars = [...line].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(
      `refusing to run: line is ${chars} characters, outside the 1-200 range`,
    );
  }
  if (line !== line.trim()) {
    throw new Error("refusing to run: line must not start or end with whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("refusing to run: line must be a single line");
  }
}

function main(): void {
  validate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outFile = outDir.endsWith(".txt")
    ? outDir
    : join(outDir, "entry.txt");
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, LINE, "utf8");
  // Verify the round-trip: what the grader will read must be the line.
  const written = readFileSync(outFile, "utf8");
  if (written !== LINE) {
    throw new Error("refusing to run: written file does not match the line");
  }
  validate(written);
  console.log(LINE);
}

main();
