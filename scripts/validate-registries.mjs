import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];
const passes = [];
const check = (condition, success, failure) =>
  (condition ? passes : failures).push(condition ? success : failure);
const values = (text, pattern) => [...text.matchAll(pattern)].map((match) => match[1].trim());
const unique = (items) => new Set(items).size === items.length;

const componentText = read("docs/03-design-system/component-registry.yaml");
const sectionText = read("docs/03-design-system/section-registry.yaml");
const pageText = read("docs/03-design-system/page-registry.yaml");
const routeText = read("docs/04-frontend/route-map.yaml");
const dependencyText = read("docs/04-frontend/component-dependency-map.yaml");
const components = values(componentText, /^\s{2}- component_id:\s*(\S+)\s*$/gm);
const sections = values(sectionText, /^\s{2}- section_id:\s*(\S+)\s*$/gm);
const pages = values(pageText, /^\s{2}- page_id:\s*(\S+)\s*$/gm);
const routes = values(routeText, /^\s{2}- path:\s*(\S+)\s*$/gm);

for (const [label, entries] of [
  ["component IDs", components], ["section IDs", sections],
  ["page IDs", pages], ["routes", routes],
]) {
  check(entries.length > 0, `${label} are registered`, `${label} registry is empty`);
  check(unique(entries), `${label} are unique`, `${label} contain duplicates`);
}

const expectedLayers = new Map([
  ["tokens", "[]"],
  ["core", "[tokens]"],
  ["composite", "[core]"],
  ["product", "[core, composite]"],
  ["sections", "[core, composite, product]"],
  ["pages", "[sections, composite]"],
]);
for (const [layer, dependencies] of expectedLayers) {
  const pattern = new RegExp(`^\\s{2}${layer}:\\s*${dependencies.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "m");
  check(pattern.test(dependencyText), `${layer} dependency layer is valid`,
    `${layer} dependency layer must equal ${dependencies}`);
}

const componentBlocks = componentText.split(/(?=^\s{2}- component_id:)/m).slice(1);
for (const block of componentBlocks) {
  const id = block.match(/component_id:\s*(\S+)/)?.[1] ?? "unknown";
  const layer = block.match(/^\s{4}layer:\s*(\S+)/m)?.[1];
  const deps = block.match(/^\s{4}dependencies:\s*(\[[^\]]*\])/m)?.[1];
  if (layer === "core") {
    check(deps === "[tokens]", `${id} depends only on tokens`,
      `${id} is Core and must depend only on tokens`);
  }
}

for (const [label, text] of [
  ["component", componentText], ["section", sectionText], ["page", pageText],
]) {
  const blocks = text.split(/(?=^\s{2}- (?:component|section|page)_id:)/m).slice(1);
  for (const block of blocks) {
    const id = block.match(/(?:component|section|page)_id:\s*(\S+)/)?.[1] ?? "unknown";
    const plannedPath = block.match(/^\s{4}planned_path:\s*(.+)$/m)?.[1]?.trim();
    const status = block.match(/^\s{4}implementation_status:\s*(\S+)/m)?.[1];
    if (plannedPath && status === "implemented") {
      check(fs.existsSync(path.join(root, plannedPath)),
        `${label} ${id} implemented path exists`,
        `${label} ${id} is implemented but its planned path does not exist`);
    } else if (plannedPath) {
      check(status === "not_started",
        `${label} ${id} planned path is not represented as implemented`,
        `${label} ${id} has unexpected implementation status ${status}`);
    }
  }
}

for (const message of passes) console.log(`[PASS] ${message}`);
for (const message of failures) console.error(`[FAIL] ${message}`);
console.log(`Result: ${passes.length} passed, ${failures.length} failed`);
process.exit(failures.length === 0 ? 0 : 1);
