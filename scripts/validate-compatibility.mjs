import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];
const passes = [];
const check = (condition, success, failure) =>
  (condition ? passes : failures).push(condition ? success : failure);
const capture = (text, pattern) => text.match(pattern)?.[1]?.trim()
  .replace(/^["']|["']$/g, "");

const version = read("VERSION.yaml");
const matrix = read("docs/06-traceability/compatibility-matrix.yaml");
const implementation = read("docs/06-traceability/implementation-baseline.yaml");
const figma = capture(version, /^\s{2}figma_design_system:\s*(.+)$/m);
const backend = capture(version, /^\s{2}backend_api:\s*(.+)$/m);
const backendStatus = capture(version, /^\s{2}backend_status:\s*(.+)$/m);
const contractRevision = capture(version, /^\s{2}backend_contract_revision:\s*(.+)$/m);
const frontend = capture(version, /^\s{2}frontend_app:\s*(.+)$/m);
const baseline = capture(version, /^\s{2}baseline_id:\s*(.+)$/m);

for (const [label, candidate] of [
  ["Figma", figma], ["Backend", backend], ["Frontend", frontend],
  ["baseline", baseline],
]) {
  check(Boolean(candidate && matrix.includes(candidate)),
    `${label} current value exists in compatibility matrix`,
    `${label} current value is missing from compatibility matrix`);
}

const expected = `DS${figma}_API${backend}_FE${frontend}`;
check(baseline === expected, "machine baseline uses current semantic versions",
  `machine baseline must be ${expected}`);
check(matrix.includes(`active_baseline_id: ${baseline}`),
  "active matrix baseline matches VERSION.yaml",
  "active matrix baseline does not match VERSION.yaml");

const display = capture(matrix, /^\s{4}human_display_name:\s*(.+)$/m);
check(Boolean(display && display !== baseline),
  "human display name is separate from machine baseline",
  "human display name must be present and separate from machine baseline");

for (const field of [
  `figma_semantic_version: ${figma}`,
  `backend_semantic_version: ${backend}`,
  `backend_contract_revision: ${contractRevision}`,
  `frontend_semantic_version: ${frontend}`,
]) {
  check(matrix.includes(field), `matrix contains ${field}`,
    `matrix is missing ${field}`);
}

const approvedBlocks = matrix.split(/\n\s{2}- baseline_id:/).slice(1)
  .filter((block) => /\n\s{4}approval_status:\s*approved\s*$/m.test(block));
for (const block of approvedBlocks) {
  check(/figma_semantic_version:\s*\d+\.\d+\.\d+/.test(block) &&
    /backend_semantic_version:\s*\d+\.\d+\.\d+/.test(block) &&
    /frontend_semantic_version:\s*\d+\.\d+\.\d+/.test(block),
  "approved baseline contains all semantic versions",
  "approved baseline is missing a semantic version");
  check(!/backend_semantic_version:\s*0\.0\.0/.test(block),
    "approved baseline does not use unassigned backend placeholder",
    "approved baseline cannot use backend 0.0.0");
}
if (approvedBlocks.length === 0) passes.push("no baselines claim approval");

if (backend === "0.0.0" || /unassigned|unverified/.test(backendStatus ?? "")) {
  check(matrix.includes("compatibility_status: pending_backend_version_assignment"),
    "backend version status is respected by compatibility status",
    "unassigned backend requires pending_backend_version_assignment");
  check(matrix.includes("approval_status: not_approved"),
    "unassigned backend baseline is not approved",
    "unassigned backend baseline must not be approved");
}

for (const field of [
  `baseline_id: ${baseline}`, `figma: ${figma}`, `backend: ${backend}`,
  `backend_contract_revision: ${contractRevision}`, `frontend: ${frontend}`,
]) {
  check(implementation.includes(field),
    `implementation baseline references ${field}`,
    `implementation baseline is missing ${field}`);
}

for (const message of passes) console.log(`[PASS] ${message}`);
for (const message of failures) console.error(`[FAIL] ${message}`);
console.log(`Result: ${passes.length} passed, ${failures.length} failed`);
process.exit(failures.length === 0 ? 0 : 1);
