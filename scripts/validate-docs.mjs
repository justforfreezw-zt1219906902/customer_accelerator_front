import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const groups = {
  governance: [
    "project-charter.md", "source-of-truth-policy.md",
    "architecture-principles.md", "roles-and-ownership.md",
    "definition-of-done.md", "versioning-policy.md",
    "naming-conventions.md", "ai-working-agreement.md",
  ].map((name) => `docs/00-governance/${name}`),
  roadmap: [
    "implementation-roadmap.md", "current-state.yaml", "phase-status.yaml",
    "milestone-plan.md", "dependency-map.md",
  ].map((name) => `docs/01-roadmap/${name}`),
  inputs: [
    "figma-source-map.yaml", "backend-source-map.yaml", "content-inventory.yaml",
    "asset-inventory.yaml", "environment-inputs.md",
    "assumptions-and-constraints.md",
  ].map((name) => `docs/02-inputs/${name}`),
  design_system: [
    "figma-baseline.md", "figma-changelog.md", "token-map.yaml",
    "component-registry.yaml", "section-registry.yaml", "page-registry.yaml",
    "design-review-log.md", "deviations.md",
  ].map((name) => `docs/03-design-system/${name}`),
  frontend: [
    "architecture.md", "directory-structure.md",
    "component-dependency-map.yaml", "route-map.yaml", "interaction-map.md",
    "state-management.md", "content-architecture.md", "error-handling.md",
    "accessibility-guidelines.md",
  ].map((name) => `docs/04-frontend/${name}`),
  backend: [
    "openapi.yaml", "api-overview.md", "api-changelog.md",
    "api-compatibility.md", "integration-spec.md", "error-catalog.yaml",
    "authentication.md",
  ].map((name) => `docs/05-backend/${name}`),
  traceability: [
    "compatibility-matrix.yaml", "requirements-traceability.yaml",
    "implementation-baseline.yaml", "release-baselines/README.md",
  ].map((name) => `docs/06-traceability/${name}`),
  change_control: [
    "README.md", "risk-register.yaml", "deviation-log.md",
    "change-requests/README.md", "issues/README.md", "incidents/README.md",
    "decisions/README.md", "instructions/README.md",
    ...Array.from({ length: 10 }, (_, index) =>
      `instructions/STEP-${String(index + 1).padStart(3, "0")}-${[
        "bootstrap", "governance", "roadmap", "inputs", "design-frontend",
        "backend-contract", "traceability", "change-control",
        "quality-release-operations", "validation-audit",
      ][index]}.md`),
  ].map((name) => `docs/07-change-control/${name}`),
  quality: [
    "quality-strategy.md", "phase-gates.md", "accessibility-checklist.md",
    "responsive-checklist.md", "visual-regression-plan.md",
    "security-checklist.md", "qa-summary.yaml",
  ].map((name) => `docs/08-quality/${name}`),
  release: [
    "release-plan.md", "deployment-log.md", "rollback-plan.md",
    "environment-matrix.md",
  ].map((name) => `docs/09-release/${name}`),
  operations: [
    "runbook.md", "monitoring.md", "logging-policy.md",
    "privacy-and-data-handling.md", "backup-and-recovery.md",
    "support-playbook.md",
  ].map((name) => `docs/10-operations/${name}`),
  phases: [
    "phase-0-project-audit.md", "phase-1-vue-foundation.md",
    "phase-2-design-tokens.md", "phase-3-core-components.md",
    "phase-4-composite-product-sections.md",
    "phase-5-routing-interaction-map.md", "phase-6-static-pages.md",
    "phase-7-backend-integration.md", "phase-8-qa-deployment.md",
  ].map((name) => `docs/phases/${name}`),
  templates: [
    "change-request-template.md", "issue-template.md", "incident-template.md",
    "deviation-template.md", "adr-template.md", "ai-instruction-template.md",
    "task-completion-template.md", "Figma-change-impact-template.md",
    "backend-change-impact-template.md", "design-review-template.md",
    "release-manifest-template.yaml", "test-report-template.md",
    "phase-approval-template.md", "deployment-record-template.md",
  ].map((name) => `docs/templates/${name}`),
  root: [
    "README.md", "AGENTS.md", "CHANGELOG.md", "VERSION.yaml",
    ".env.example", "docs/README.md", "docs/management-system-audit.md",
  ],
};
const requiredDirectories = [
  "docs/05-backend/migration-guides",
  "docs/08-quality/acceptance-criteria",
  "docs/08-quality/test-reports",
  "docs/09-release/releases",
  "docs/09-release/release-manifests",
  "scripts",
  "tests",
];
const failures = [];
let checked = 0;

for (const [group, files] of Object.entries(groups)) {
  const missing = files.filter((file) => {
    checked += 1;
    return !fs.existsSync(path.join(root, file));
  });
  if (missing.length === 0) {
    console.log(`[PASS] ${group}: ${files.length} required files`);
  } else {
    failures.push(...missing.map((file) => `Missing ${group} file: ${file}`));
  }
}
for (const directory of requiredDirectories) {
  checked += 1;
  const target = path.join(root, directory);
  if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
    failures.push(`Missing required directory: ${directory}`);
  }
}
if (failures.length === 0) {
  console.log(`[PASS] required directories: ${requiredDirectories.length}`);
}
for (const message of failures) console.error(`[FAIL] ${message}`);
console.log(`Result: ${checked - failures.length} passed, ${failures.length} failed, ${checked} checked`);
process.exit(failures.length === 0 ? 0 : 1);
