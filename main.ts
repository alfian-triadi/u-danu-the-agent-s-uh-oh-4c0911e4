// The Agent's Uh-Oh — writes one word to /output/entry.txt
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "whoopsiedoodle";

// Local gate: the scorer requires 1-99 UTF-8 characters, not only whitespace,
// and the task requires exactly one word. Count code points, as the scorer does.
const charCount = [...WORD].length;
const wordCount = WORD.trim().split(/\s+/).length;
if (charCount < 1 || charCount > 99 || WORD.trim().length === 0) {
  throw new Error(
    `Word length ${charCount} is outside the 1-99 character gate.`,
  );
}
if (wordCount !== 1) {
  throw new Error(`Word count ${wordCount} is not exactly one word.`);
}
// A "word" here is plain letters only: no digits, spaces, or punctuation,
// so the entry reads as a single blurted word, as the task asks.
if (!/^[a-z]+$/.test(WORD)) {
  throw new Error("The word must be lowercase letters only.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", WORD, "utf8");

// Self-check: what was written must be byte-identical to the word,
// a single word with no trailing newline.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== WORD) {
  throw new Error("entry.txt does not match the word.");
}
if (written.includes("\n") || written.includes(" ")) {
  throw new Error("entry.txt must be exactly one word.");
}
console.log(
  `Wrote ${charCount} characters (${wordCount} word) to /output/entry.txt`,
);
