const fs = require("fs");
const path = require("path");

function loadEnv(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) return env;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const REQUIRED_VARS = ["CONTACT_EMAIL", "FORM_ACTION"];

const env = { ...loadEnv(path.join(__dirname, ".env")), ...process.env };

const missing = REQUIRED_VARS.filter((key) => !env[key]);
if (missing.length) {
  console.error(
    `Missing required env vars: ${missing.join(", ")}\n` +
      "Copy .env.example to .env and fill in real values, then rerun the build."
  );
  process.exit(1);
}

let html = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");
for (const key of REQUIRED_VARS) {
  html = html.split(`__${key}__`).join(env[key]);
}

fs.writeFileSync(path.join(__dirname, "index.html"), html);
console.log("Built index.html from template.html");
