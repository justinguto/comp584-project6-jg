"use strict";

const { readInput } = require("./utils/readInput");



const lines = readInput("inputs/day07.txt").trim().split("\n");

const forward = new Map(); 
const reverse = new Map(); 

function ensureMapArray(map, key) {
  if (!map.has(key)) map.set(key, []);
  return map.get(key);
}

function ensureMapSet(map, key) {
  if (!map.has(key)) map.set(key, new Set());
  return map.get(key);
}

for (const line of lines) {
  const [outerPart, innerPart] = line.split(" bags contain ");
  const outer = outerPart.trim();

  const inner = [];
  if (!innerPart.startsWith("no other bags")) {
    const pieces = innerPart.split(",").map((s) => s.trim());
    for (const p of pieces) {
      const m = p.match(/^(\d+)\s+(.+?)\s+bag/);
      if (!m) continue;
      const count = Number(m[1]);
      const color = m[2];
      inner.push({ color, count });

  
      ensureMapSet(reverse, color).add(outer);
    }
  }

  forward.set(outer, inner);
}

function part1(target) {
  const seen = new Set();
  const stack = [target];

  while (stack.length > 0) {
    const cur = stack.pop();
    const parents = reverse.get(cur);
    if (!parents) continue;

    for (const p of parents) {
      if (!seen.has(p)) {
        seen.add(p);
        stack.push(p);
      }
    }
  }
  return seen.size;
}

function part2(target) 
  const memo = new Map();

  function totalInside(color) {
    if (memo.has(color)) return memo.get(color);
    const children = forward.get(color) || [];
    let total = 0;
    for (const { color: child, count } of children) {
      total += count * (1 + totalInside(child));
    }
    memo.set(color, total);
    return total;
  }

  return totalInside(target);
}

console.log("Day 07");
console.log("Part 1:", part1("shiny gold"));
console.log("Part 2:", part2("shiny gold"));
