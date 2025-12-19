"use strict";

const { readInput } = require("./utils/readInput");


const raw = readInput("inputs/day01.txt").trim();
const nums = raw.split(/\s+/).map(Number);

function part1(values) {
  const seen = new Set();
  for (const x of values) {
    const need = 2020 - x;
    if (seen.has(need)) return x * need;
    seen.add(x);
  }
  return null;
}

function part2(values) {
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
