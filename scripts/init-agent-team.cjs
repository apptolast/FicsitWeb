#!/usr/bin/env node
/**
 * init-agent-team.cjs — bootstrap idempotente para Agent Teams en FicsitMonitorWeb.
 *
 * Este script es un ARTIFACT REUTILIZABLE. El bootstrap inicial ya lo hizo Claude
 * manualmente durante la sesión de setup. Este script existe para:
 *   - Re-bootstrapear si alguien clona el repo limpio y falta .claude/ o archivos.
 *   - Servir de referencia sobre qué archivos componen el entorno Agent Teams.
 *   - Facilitar a Pablo aplicar el mismo setup en otros proyectos.
 *
 * Uso:
 *   node scripts/init-agent-team.cjs [--force] [--no-interactive]
 *
 * Verifica: Claude Code ≥ 2.1.32, Node ≥ 20, pnpm presente.
 * Revisa: presencia de archivos esperados y sugiere qué falta.
 * NO sobrescribe archivos existentes salvo --force.
 */

const { execSync, spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

const ROOT = path.resolve(__dirname, "..");
const isWin = process.platform === "win32";
const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const INTERACTIVE = !args.includes("--no-interactive");

const COLOR = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  dim: "\x1b[2m",
};

function log(color, icon, msg) {
  process.stdout.write(`${COLOR[color]}${icon} ${msg}${COLOR.reset}\n`);
}
const ok = (m) => log("green", "✅", m);
const warn = (m) => log("yellow", "⚠️ ", m);
const err = (m) => log("red", "❌", m);
const info = (m) => log("blue", "ℹ️ ", m);
const dim = (m) => log("dim", "  ", m);

async function prompt(question) {
  if (!INTERACTIVE) return "y";
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${question} (y/N) `, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

function tryExec(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null;
  }
}

function checkPrereqs() {
  info("Checking prerequisites…");

  const claudeVer = tryExec("claude --version");
  if (!claudeVer) {
    err("Claude Code CLI no está instalado o no está en PATH.");
    err("Instala con: npm install -g @anthropic-ai/claude-code");
    process.exit(1);
  }
  const match = claudeVer.match(/(\d+)\.(\d+)\.(\d+)/);
  if (match) {
    const [, maj, min, patch] = match.map(Number);
    const versionOk = maj > 2 || (maj === 2 && min > 1) || (maj === 2 && min === 1 && patch >= 32);
    if (!versionOk) {
      err(`Claude Code ${claudeVer} < 2.1.32. Actualiza con: npm install -g @anthropic-ai/claude-code@latest`);
      process.exit(1);
    }
    ok(`Claude Code ${claudeVer}`);
  } else {
    warn(`Claude Code version string inesperado: ${claudeVer}`);
  }

  const nodeVer = process.versions.node;
  const nodeMaj = Number(nodeVer.split(".")[0]);
  if (nodeMaj < 20) {
    err(`Node ${nodeVer} < 20. Actualiza Node.`);
    process.exit(1);
  }
  ok(`Node v${nodeVer}`);

  const pnpmVer = tryExec("pnpm --version");
  if (!pnpmVer) {
    err("pnpm no está instalado. Instala con: npm install -g pnpm");
    process.exit(1);
  }
  ok(`pnpm ${pnpmVer}`);
}

function checkGit() {
  info("Checking git…");
  const insideRepo = tryExec("git rev-parse --is-inside-work-tree");
  if (insideRepo === "true") {
    ok("Git repo detectado");
    return;
  }
  warn("No hay repo git inicializado.");
  if (!INTERACTIVE) {
    info("Modo no interactivo: saltando git init.");
    return;
  }
  prompt("¿Inicializar git repo ahora?").then((answer) => {
    if (answer === "y" || answer === "yes") {
      execSync("git init -q && git branch -M main", { cwd: ROOT });
      ok("git init completado");
    }
  });
}

function checkFilesPresent() {
  info("Verificando archivos del setup de Agent Teams…");
  const expected = [
    "CLAUDE.md",
    ".claude/settings.json",
    ".claude/agents/architect.md",
    ".claude/agents/frontend-dev.md",
    ".claude/agents/styles-engineer.md",
    ".claude/agents/qa-engineer.md",
    ".claude/agents/mentor.md",
    ".claude/hooks/session-start.cjs",
    ".claude/hooks/security-check.cjs",
    ".claude/hooks/format-on-save.cjs",
    ".claude/hooks/validate-task.cjs",
    ".claude/hooks/teammate-idle.cjs",
    ".claude/commands/init-team.md",
    ".claude/commands/status-report.md",
    ".claude/commands/quality-gate.md",
    ".mcp.json",
    ".gitattributes",
    "docs/technical-spec.md",
  ];
  const missing = expected.filter((rel) => !fs.existsSync(path.join(ROOT, rel)));
  if (missing.length === 0) {
    ok("Todos los archivos esperados están presentes");
    return;
  }
  warn(`Faltan ${missing.length} archivos:`);
  missing.forEach((m) => dim(`- ${m}`));
  warn("Este script no regenera archivos automáticamente — pídele a Claude Code que los reescriba leyendo CLAUDE.md y este script como referencia.");
}

function checkSassInstalled() {
  info("Verificando sass-embedded…");
  const pkgPath = path.join(ROOT, "package.json");
  if (!fs.existsSync(pkgPath)) {
    err("package.json no encontrado");
    return;
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const sass = pkg.devDependencies?.["sass-embedded"] || pkg.devDependencies?.sass;
  if (sass) {
    ok(`SCSS compiler presente: ${sass}`);
  } else {
    warn("sass-embedded no instalado. Instala con: pnpm add -D sass-embedded");
  }
  const appCss = fs.existsSync(path.join(ROOT, "src/App.css"));
  const appScss = fs.existsSync(path.join(ROOT, "src/App.scss"));
  if (appCss && !appScss) {
    warn("src/App.css existe pero no src/App.scss. Migra manualmente renombrando + actualizando el import en src/App.tsx.");
  } else if (appScss) {
    ok("src/App.scss presente (migración OK)");
  }
}

function checkEnvLocal() {
  info("Verificando .claude/.mcp.env.local…");
  const envPath = path.join(ROOT, ".claude/.mcp.env.local");
  const examplePath = path.join(ROOT, ".claude/.mcp.env.local.example");
  if (fs.existsSync(envPath)) {
    ok(".mcp.env.local existe (gitignored)");
    return;
  }
  if (fs.existsSync(examplePath)) {
    warn(".mcp.env.local no existe. Copia desde .mcp.env.local.example y rellena STITCH_API_KEY.");
  }
}

function finalInstructions() {
  process.stdout.write("\n");
  info("Setup verificado.");
  process.stdout.write(`
${COLOR.green}Siguientes pasos:${COLOR.reset}
  1. ${COLOR.yellow}Rellena los [TBD] en docs/technical-spec.md${COLOR.reset} (auth, dominio, features)
  2. Si vas a usar Stitch MCP: crea .claude/.mcp.env.local y pon STITCH_API_KEY
  3. Arranca Claude Code: ${COLOR.blue}claude${COLOR.reset}
  4. Ejecuta: ${COLOR.blue}/init-team${COLOR.reset}
  5. Keybindings: Shift+Down (ciclar teammates), Ctrl+T (task list), Escape (interrumpir)

${COLOR.dim}Lee CLAUDE.md y docs/technical-spec.md antes de /init-team.${COLOR.reset}
`);
}

// Main
(function main() {
  process.stdout.write(`${COLOR.blue}╔══════════════════════════════════════════╗${COLOR.reset}\n`);
  process.stdout.write(`${COLOR.blue}║  FicsitMonitorWeb Agent Teams bootstrap  ║${COLOR.reset}\n`);
  process.stdout.write(`${COLOR.blue}╚══════════════════════════════════════════╝${COLOR.reset}\n\n`);

  checkPrereqs();
  checkGit();
  checkFilesPresent();
  checkSassInstalled();
  checkEnvLocal();
  finalInstructions();
})();
