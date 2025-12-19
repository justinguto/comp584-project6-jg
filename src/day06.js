"use strict";

const { readInput } = require("./utils/readInput");

/**
 * AoC 2020 Day 6:
 * Groups separated by blank lines; each person is a line of letters a-z.
 *
 * Part 1: count questions answered "yes" by anyone in group (union)
 * Part 2: count questions answered "yes" by everyone in group (intersection)
 *
 * MDN docs:
 * - Set: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set
 * - Array.prototype.every: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/every
 * - String.prototype.split: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/split
 */

const raw = readInput("inputs/day06.txt").trim();
const groups = raw.split(/\n\s*\n/);

function part1() {
  let sum = 0;
  for (const g of groups) {
    const s = new Set();
    for (const ch of g.replace(/\s+/g, "")) s.add(ch);
    sum += s.size;
  }
  return sum;
}

function part2() {
  let sum = 0;
  for (const g of groups) {
    const people = g.trim().split("\n").map((line) => line.trim());
    // Start with first person's answers as a Set, then keep only letters that appear in every person.
    const common = new Set(people[0]);
    for (const letter of [...common]) {
      if (!people.every((p) => p.includes(letter))) {
        common.delete(letter);
      }
    }
    sum += common.size;
  }
  return sum;
}

console.log("Day 06");
console.log("Part 1:", part1());
console.log("Part 2:", part2());
