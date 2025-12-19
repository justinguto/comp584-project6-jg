"use strict";

const { readInput } = require("./utils/readInput");

/**
 * AoC 2020 Day 4:
 * Passports are blocks separated by blank lines.
 *
 * Part 1: required fields present (cid optional)
 * Part 2: field values must be valid per rules
 *
 * MDN docs:
 * - String.prototype.split: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/split
 * - String.prototype.trim: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/trim
 * - Object.hasOwn / hasOwnProperty: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
 */

const raw = readInput("inputs/day04.txt").trim();
const blocks = raw.split(/\n\s*\n/);

function parsePassport(block) {
  const fields = block.split(/\s+/);
  const obj = {};
  for (const f of fields) {
    const [k, v] = f.split(":");
    obj[k] = v;
  }
  return obj;
}

const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function hasRequired(passport) {
  return required.every((k) => Object.prototype.hasOwnProperty.call(passport, k));
}

function validYear(v, min, max) {
  if (!/^\d{4}$/.test(v)) return false;
  const n = Number(v);
  return n >= min && n <= max;
}

function validHeight(v) {
  const m = /^(\d+)(cm|in)$/.exec(v);
  if (!m) return false;
  const num = Number(m[1]);
  const unit = m[2];
  if (unit === "cm") return num >= 150 && num <= 193;
  return num >= 59 && num <= 76; // in
}

function validHcl(v) {
  return /^#[0-9a-f]{6}$/.test(v);
}

function validEcl(v) {
  return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(v);
}

function validPid(v) {
  return /^\d{9}$/.test(v);
}

function isValidPart2(p) {
  // Only validate if required fields exist; keeps logic clean.
  if (!hasRequired(p)) return false;

  return (
    validYear(p.byr, 1920, 2002) &&
    validYear(p.iyr, 2010, 2020) &&
    validYear(p.eyr, 2020, 2030) &&
    validHeight(p.hgt) &&
    validHcl(p.hcl) &&
    validEcl(p.ecl) &&
    validPid(p.pid)
  );
}

const passports = blocks.map(parsePassport);

function part1() {
  return passports.filter(hasRequired).length;
}

function part2() {
  return passports.filter(isValidPart2).length;
}

console.log("Day 04");
console.log("Part 1:", part1());
console.log("Part 2:", part2());
