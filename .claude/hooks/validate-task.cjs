#!/usr/bin/env node
// TaskCompleted hook: quality gate en WARNING MODE.
// Corre lint + typecheck + test, pero nunca bloquea (exit 0 siempre).
// Para endurecer a bloqueante: cambia los `process.exit(0)` finales por `process.exit(2)`.

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
// With shell:true below, Windows PATHEXT auto-resolves `pnpm` → `pnpm.cmd`.
const pnpm = "pnpm";

function hasScript(name) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(projectDir, "package.json"), "utf8"));
    return Boolean(pkg.scripts && pkg.scripts[name]);
  } catch {
    return false;
  }
}

function run(args, label) {
  // On Windows, pnpm is a .cmd file and requires shell:true to be resolvable via cmd.exe.
  // shell:true implies the args are joined into a command string; we quote each arg defensively.
  const quoted = args.map((a) => (/[\s"]/.test(a) ? `"${a.replace(/"/g, '\\"')}"` : a));
  const result = spawnSync(pnpm, quoted, {
    cwd: projectDir,
    stdio: "pipe",
    shell: true,
    timeout: 90_000,
    encoding: "utf8",
  });
  return {
    label,
    ok: result.status === 0,
    status: result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
  };
}

// Read stdin but don't require it — the TaskCompleted payload isn't used here.
const chunks = [];
process.stdin.on("data", (chunk) => chunks.push(chunk));
process.stdin.on("end", () => {
  const steps = [
    { args: ["lint"], label: "pnpm lint", when: () => hasScript("lint") },
    { args: ["exec", "tsc", "--noEmit"], label: "pnpm exec tsc --noEmit", when: () => true },
    { args: ["test", "--silent"], label: "pnpm test", when: () => hasScript("test") },
  ].filter((s) => s.when());

  const failures = [];
  for (const step of steps) {
    const r = run(step.args, step.label);
    if (!r.ok) {
      failures.push(r);
    }
  }

  if (failures.length === 0) {
    process.stderr.write("[validate-task] quality gate passed\n");
    process.exit(0);
  }

  process.stderr.write(
    "\n[QUALITY WARNING] Hay fallos en el quality gate, pero el task se marca completado igual (warning mode).\n" +
      "Para endurecer a bloqueante, edita .claude/hooks/validate-task.cjs y cambia los process.exit(0) por process.exit(2).\n\n",
  );
  for (const f of failures) {
    process.stderr.write(`--- ${f.label} (exit ${f.status}) ---\n`);
    if (f.stdout.trim()) process.stderr.write(f.stdout.trim() + "\n");
    if (f.stderr.trim()) process.stderr.write(f.stderr.trim() + "\n");
    process.stderr.write("\n");
  }
  process.exit(0);
});
