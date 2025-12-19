"use strict";

const { readInput } = require("./utils/readInput");

/**
 * AoC 2020 Day 3:
 * Grid repeats infinitely to the right.
 * Count trees (#) encountered on slope (right, down).
 *
 * MDN docs:
 * - Array.prototype.length: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/length
 * - String.prototype.charAt: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
 * - Arithmetic remainder (%): https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Remainder
 */

const grid = readInput("inputs/day03.txt").trim().split("\n");
const height = grid.length;
const width = grid[0].length;

function treesOnSlope(right, down) {
  let r = 0;
  let c = 0;
  let trees = 0;

  while (r < height) {
    if (grid[r].charAt(c % width) === "#") trees++;
    r += down;
    c += right;
  }
  return trees;
}

function part1() {
  return treesOnSlope(3, 1);
}

function part2() {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ];

  // MDN Array.prototype.reduce: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  return slopes.reduce((prod, [rt, dn]) => prod * treesOnSlope(rt, dn), 1);
}

console.log("Day 03");
console.log("Part 1:", part1());
console.log("Part 2:", part2());
