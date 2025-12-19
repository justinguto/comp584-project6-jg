"use strict";

const { readInput } = require("./utils/readInput");

/**
 * AoC 2020 Day 1:
 * Find 2 entries (Part 1) or 3 entries (Part 2) that sum to 2020.
 *
 * MDN docs:
 * - Array.prototype.map: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 * - String.prototype.split: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/split
 * - Number: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
 *
 * We use a Set for O(n) two-sum and a loop+Set for three-sum.
 */

const raw = readInput("inputs/day01.txt").trim();
const nums = raw.split(/\s+/).map(Number);

function part1(values) {
  // Use a Set to store numbers we've seen and check if (2020 - x) exists.
  // MDN Set: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set
  const seen = new Set();
  for (const x of values) {
    const need = 2020 - x;
    if (seen.has(need)) return x * need;
    seen.add(x);
  }
  return null;
}

function part2(values) {
  // For each i, solve two-sum for target (2020 - values[i]).
  for (let i = 0; i < values.length; i++) {
    const target = 2020 - values[i];
    const seen = new Set();
    for (let j = i + 1; j < values.length; j++) {
      const need = target - values[j];
      if (seen.has(need)) return values[i] * values[j] * need;
      seen.add(values[j]);
    }
  }
  return null;
}

console.log("Day 01");
console.log("Part 1:", part1(nums));
console.log("Part 2:", part2(nums));
