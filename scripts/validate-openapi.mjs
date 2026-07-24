import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const document = fs.readFileSync(path.join(root, "docs/05-backend/openapi.yaml"), "utf8");
const failures = [];
const passes = [];
const check = (condition, success, failure) =>
  (condition ? passes : failures).push(condition ? success : failure);

check(/^openapi:\s*3\.(?:0|1)\.\d+\s*$/m.test(document),
  "OpenAPI 3.x declaration exists", "OpenAPI 3.0 or 3.1 declaration is required");
check(/^\s{2}\/api\/lead:\s*$[\s\S]*?^\s{4}post:\s*$/m.test(document),
  "POST /api/lead is documented", "POST /api/lead is missing");
check(/application\/json:/.test(document),
  "application/json content is documented", "application/json content is missing");

const requestStart = document.indexOf("    LeadRequest:");
const responseStart = document.indexOf("    LeadSuccessResponse:");
const request = requestStart >= 0 && responseStart > requestStart
  ? document.slice(requestStart, responseStart) : "";
check(Boolean(request), "LeadRequest schema exists", "LeadRequest schema is missing");

const expectedFields = ["firstName", "familyName", "company", "workEmail", "owner"];
for (const field of expectedFields) {
  check(new RegExp(`^\\s{8}${field}:\\s*$`, "m").test(request),
    `LeadRequest contains ${field}`, `LeadRequest is missing ${field}`);
}
const requiredBlock = request.match(/^\s{6}required:\s*$([\s\S]*?)^\s{6}properties:\s*$/m)?.[1] ?? "";
for (const field of ["firstName", "familyName", "company", "workEmail"]) {
  check(new RegExp(`^\\s{8}- ${field}\\s*$`, "m").test(requiredBlock),
    `${field} is required`, `${field} must be required`);
}
check(!/^\s{8}- owner\s*$/m.test(requiredBlock),
  "owner is optional", "owner must remain optional");
check(/^\s{8}workEmail:\s*$[\s\S]*?^\s{10}format:\s*email\s*$/m.test(request),
  "workEmail uses email format", "workEmail must use email format");

for (const status of ["200", "400", "500", "502"]) {
  check(new RegExp(`^\\s{8}"${status}":\\s*$`, "m").test(document),
    `${status} response is documented`, `${status} response is missing`);
}

const propertyNames = [...request.matchAll(/^\s{8}([A-Za-z_][A-Za-z0-9_]*):\s*$/gm)]
  .map((match) => match[1]);
const unexpected = propertyNames.filter((name) => !expectedFields.includes(name));
check(unexpected.length === 0, "LeadRequest has no unconfirmed fields",
  `LeadRequest contains unconfirmed fields: ${unexpected.join(", ")}`);
check(!/securitySchemes:|^\s+security:\s*$/m.test(document),
  "no authentication scheme is invented",
  "authentication must not be added until confirmed");

for (const message of passes) console.log(`[PASS] ${message}`);
for (const message of failures) console.error(`[FAIL] ${message}`);
console.log(`Result: ${passes.length} passed, ${failures.length} failed`);
process.exit(failures.length === 0 ? 0 : 1);
