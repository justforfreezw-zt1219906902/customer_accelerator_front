import { spawnSync } from "node:child_process";
import process from "node:process";

const scripts = [
  "validate-version.mjs",
  "validate-docs.mjs",
  "validate-compatibility.mjs",
  "validate-registries.mjs",
  "validate-openapi.mjs",
];
const results = [];

for (const script of scripts) {
  console.log(`\n=== ${script} ===`);
  const result = spawnSync(process.execPath, [`scripts/${script}`], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  results.push({ script, status: result.status ?? 1 });
}

console.log("\n=== Management validation summary ===");
for (const result of results) {
  console.log(`[${result.status === 0 ? "PASS" : "FAIL"}] ${result.script}`);
}
const failed = results.filter((result) => result.status !== 0);
console.log(`Result: ${results.length - failed.length} passed, ${failed.length} failed`);
process.exit(failed.length === 0 ? 0 : 1);
