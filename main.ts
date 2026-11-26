// One Line to Your Younger Self
// Writes a single line of advice to my younger self to entry.txt
// and prints it to stdout. The line must be 1-200 characters,
// a single line, and not only whitespace, or the program refuses
// to run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "Don't sell the red bike \u2014 the summer you do is the last summer anyone waits for you at the gate.";

const MAX_CHARS = 200;

function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("refusing to run: line is empty or only whitespace");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `refusing to run: line is ${line.length} characters, over the 200-character limit`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("refusing to run: line must be a single line");
  }
}

function main(): void {
  validate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output/entry.txt";
  const outFile = outDir.endsWith(".txt")
    ? outDir
    : join(outDir, "entry.txt");
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, LINE, "utf8");
  console.log(LINE);
}

main();
