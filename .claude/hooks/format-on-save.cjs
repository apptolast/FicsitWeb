#!/usr/bin/env node
// PostToolUse hook para Write|Edit|MultiEdit.
// Ejecuta prettier sobre el archivo editado si existe como devDep en el proyecto.
// Exit 0 siempre (no bloquea), incluso si prettier no está instalado o falla.

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const chunks = [];
process.stdin.on("data", (chunk) => chunks.push(chunk));
process.stdin.on("end", () => {
  let input;
  try {
    input = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    process.exit(0);
  }

  const toolInput = input.tool_input || {};
  const filePath = toolInput.file_path || toolInput.filePath || "";
  if (!filePath) process.exit(0);

  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) process.exit(0);

  const ext = path.extname(resolved).toLowerCase();
  const supported = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".json",
    ".jsonc",
    ".css",
    ".scss",
    ".md",
    ".mdx",
    ".yaml",
    ".yml",
    ".html",
  ];
  if (!supported.includes(ext)) process.exit(0);

  const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const prettierBin = path.join(projectDir, "node_modules", ".bin", "prettier");
  const prettierExists =
    fs.existsSync(prettierBin) ||
    fs.existsSync(prettierBin + ".cmd") ||
    fs.existsSync(prettierBin + ".ps1");

  if (!prettierExists) process.exit(0);

  // On Windows, pnpm is a .cmd — requires shell:true. Quote the resolved path defensively.
  const quotedPath = /[\s"]/.test(resolved) ? `"${resolved.replace(/"/g, '\\"')}"` : resolved;
  const result = spawnSync("pnpm", ["exec", "prettier", "--write", quotedPath], {
    cwd: projectDir,
    stdio: "ignore",
    shell: true,
    timeout: 20000,
  });

  if (result.status !== 0) {
    process.stderr.write(`[format-on-save] prettier skipped on ${path.basename(resolved)}\n`);
  }
  process.exit(0);
});
