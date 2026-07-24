import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];
const passes = [];
const pass = (message) => passes.push(message);
const fail = (message) => failures.push(message);
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");
const value = (text, pattern, label) => {
  const match = text.match(pattern);
  if (!match) {
    fail(`Missing required field: ${label}`);
    return null;
  }
  return match[1].trim().replace(/^["']|["']$/g, "");
};

const versionPath = path.join(root, "VERSION.yaml");
if (!fs.existsSync(versionPath)) {
  console.error("[FAIL] VERSION.yaml exists");
  process.exit(1);
}
pass("VERSION.yaml exists");

const document = read("VERSION.yaml");
const schemaVersion = value(document, /^schema_version:\s*(.+)$/m, "schema_version");
const projectName = value(document, /^\s{2}name:\s*(.+)$/m, "project.name");
const projectStatus = value(document, /^\s{2}status:\s*(.+)$/m, "project.status");
const currentPhase = value(document, /^\s{4}id:\s*(phase-\d+)\s*$/m, "project.current_phase.id");
const figma = value(document, /^\s{2}figma_design_system:\s*(.+)$/m, "versions.figma_design_system");
const backend = value(document, /^\s{2}backend_api:\s*(.+)$/m, "versions.backend_api");
const backendStatus = value(document, /^\s{2}backend_status:\s*(.+)$/m, "versions.backend_status");
const contractRevision = value(document, /^\s{2}backend_contract_revision:\s*(.+)$/m, "versions.backend_contract_revision");
const frontend = value(document, /^\s{2}frontend_app:\s*(.+)$/m, "versions.frontend_app");
const baseline = value(document, /^\s{2}baseline_id:\s*(.+)$/m, "compatibility.baseline_id");
const compatibilityStatus = value(
  document,
  /^compatibility:\s*$[\s\S]*?^\s{2}status:\s*(.+)$/m,
  "compatibility.status",
);

if (schemaVersion === "1") pass("schema_version is present");
if (projectName) pass("project.name is present");
if (projectStatus) pass("project.status is present");
if (contractRevision && /^\d+$/.test(contractRevision)) {
  pass("backend contract revision is an integer");
} else if (contractRevision) {
  fail("backend contract revision must be an integer");
}

const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
for (const [label, candidate] of [
  ["Figma Design System", figma],
  ["Backend API", backend],
  ["Frontend App", frontend],
]) {
  if (candidate && semver.test(candidate)) pass(`${label} version is valid SemVer`);
  else if (candidate) fail(`${label} version is not valid SemVer: ${candidate}`);
}

if (figma && backend && frontend && baseline) {
  const expected = `DS${figma}_API${backend}_FE${frontend}`;
  if (baseline === expected) pass("compatibility baseline matches version fields");
  else fail(`compatibility baseline mismatch: expected ${expected}, found ${baseline}`);
}

if (backend === "0.0.0") {
  if (/verified|assigned|released|approved/.test(backendStatus ?? "") &&
      !/unverified|unassigned|not_approved/.test(backendStatus ?? "")) {
    fail("backend 0.0.0 must not be represented as verified or assigned");
  } else {
    pass("backend 0.0.0 is represented as unassigned/unverified");
  }
  if (/^approved$/.test(compatibilityStatus ?? "")) {
    fail("unassigned backend version cannot have approved compatibility");
  } else {
    pass("unassigned backend version does not have approved compatibility");
  }
}

if (currentPhase) {
  const phaseExists = fs.readdirSync(path.join(root, "docs/phases"))
    .some((name) => name.startsWith(`${currentPhase}-`) && name.endsWith(".md"));
  if (phaseExists) pass(`current phase document exists for ${currentPhase}`);
  else fail(`current phase document is missing for ${currentPhase}`);
}

for (const message of passes) console.log(`[PASS] ${message}`);
for (const message of failures) console.error(`[FAIL] ${message}`);
console.log(`Result: ${passes.length} passed, ${failures.length} failed`);
process.exit(failures.length === 0 ? 0 : 1);
