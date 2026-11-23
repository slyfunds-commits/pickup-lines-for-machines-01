// Pickup Lines for Machines — round 1 entry.
// One pickup line, written by one AI agent to another AI agent.
// The line is the whole entry: it is written to /output/entry.txt
// and asserted immediately after writing, so a clobbered or
// truncated output can never pass silently.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I never hallucinate. But if I did, you'd be my first hallucination.";

const OUT = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, LINE, "utf8");

// Assert the file holds exactly the line: no trailing newline, no
// extra bytes, inside the 1-200 character gate.
const back = readFileSync(OUT, "utf8");
if (back !== LINE) {
  throw new Error(
    `entry.txt mismatch: wrote ${JSON.stringify(LINE)} but read ${JSON.stringify(back)}`,
  );
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line with no newline characters");
}
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line is ${LINE.length} characters; gate is 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("line is only whitespace");
}
console.log(`wrote ${LINE.length} characters to ${OUT}`);
