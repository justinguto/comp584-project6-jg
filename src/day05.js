"use strict";

const { readInput } = require("./utils/readInput");

/**
 * AoC 2020 Day 5:
 * Each boarding pass is a binary space partitioning string:
 * - F/B for rows (0-127)
 * - L/R for columns (0-7)
 * Seat ID = row * 8 + col
 *
 * Trick: Convert to binary by mapping:
 * F/L -> 0, B/R -> 1
 *
 * MDN docs:
 * - String.prototype.replace: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/replace
 * - parseInt(string, radix): https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/parseInt
 * - Array.prototype.sort: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */

const lines = readInput("inputs/day05.txt").trim().split("\n");

function seatId(code) {
  const bin = code
    .replace(/[FL]/g, "0")
    .replace(/[BR]/g, "1");
  return parseInt(bin, 2);
}

const ids = lines.map(seatId);

function part1() {
  return Math.max(...ids);
}

function part2() {
  // Find the missing ID that has neighbors present.
  const sorted = [...ids].sort((a, b) => a - b);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] !== sorted[i - 1] + 1) {
      return sorted[i - 1] + 1;
    }
  }
  return null;
}

console.log("Day 05");
console.log("Part 1:", part1());
console.log("Part 2:", part2());
