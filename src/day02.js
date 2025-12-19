"use strict";

const { readInput } = require("./utils/readInput");

/**
 * AoC 2020 Day 2:
 * Each line: "min-max char: password"
 *
 * Part 1: char count must be between min and max (inclusive)
 * Part 2: exactly one of positions min or max (1-indexed) must contain char
 *
 * MDN docs:
 * - String.prototype.match: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/match
 * - RegExp: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * - String.prototype.charAt: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
 */

const lines = readInput("inputs/day02.txt").trim().split("\n");

const ruleRe = /^(\d+)-(\d+)\s+([a-zA-Z]):\s+(.+)$/;

function parseLine(line) {
  const m = line.match(ruleRe);
  if (!m) throw new Error("Bad line: " + line);
  return {
    a: Number(m[1]),
    b: Number(m[2]),
    ch: m[3],
    pw: m[4]
  };
}

function part1(ls) {
  let valid = 0;
  for (const line of ls) {
    const { a: min, b: max, ch, pw } = parseLine(line);
    let count = 0;
    for (const c of pw) if (c === ch) count++;
    if (count >= min && count <= max) valid++;
  }
  return valid;
}

function part2(ls) {
  let valid = 0;
  for (const line of ls) {
    const { a: p1, b: p2, ch, pw } = parseLine(line);
    // Positions are 1-indexed in the problem, so subtract 1.
    const hit1 = pw.charAt(p1 - 1) === ch;
    const hit2 = pw.charAt(p2 - 1) === ch;
    // XOR logic: exactly one must be true.
    if ((hit1 && !hit2) || (!hit1 && hit2)) valid++;
  }
  return valid;
}

console.log("Day 02");
console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));
