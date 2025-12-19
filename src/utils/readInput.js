"use strict";

const fs = require("fs");
const path = require("path");

/**
 * Read an input file as UTF-8 text.
 *
 * Node docs:
 * - fs.readFileSync: https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
 * - path.join: https://nodejs.org/api/path.html#pathjoinpaths
 *
 * @param {string} relativePath - e.g. "inputs/day01.txt"
 * @returns {string}
 */
function readInput(relativePath) {
  const fullPath = path.join(process.cwd(), relativePath);
  return fs.readFileSync(fullPath, "utf8");
}

module.exports = { readInput };
