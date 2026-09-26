import assert from "node:assert";
import { accumulate } from "../accumulate.js";
import { countCrossings } from "../cross.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("accumulate returns a list", () => {
  assert.ok(Array.isArray(accumulate([1, 2])));
});

check("countCrossings returns hits", () => {
  assert.ok(Array.isArray(countCrossings([1, 2], 5).hits));
});

check("countCrossings returns total", () => {
  assert.strictEqual(typeof countCrossings([1, 2], 5).total, "number");
});

check("render counts crossings", () => {
  assert.strictEqual(typeof render({ values: [1], step: 5 }).count, "number");
});

check("render exposes checked flag", () => {
  assert.strictEqual(typeof render({ values: [1], step: 5 }).checked, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
