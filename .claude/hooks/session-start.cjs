#!/usr/bin/env node
// SessionStart hook: imprime un banner de recordatorio con keybindings y comandos útiles.
// Exit 0 siempre (informativo, no bloquea).

const banner = `
╔══════════════════════════════════════════════════════════════╗
║  FicsitMonitorWeb — Claude Code Agent Teams ready            ║
╠══════════════════════════════════════════════════════════════╣
║  Keybindings (in-process mode):                              ║
║    Shift+Down   ciclar entre teammates                       ║
║    Ctrl+T       toggle task list                             ║
║    Enter        entrar a sesión del teammate activo          ║
║    Escape       interrumpir turno                            ║
║                                                              ║
║  Slash commands:                                             ║
║    /init-team      arrancar el primer agent team             ║
║    /status-report  resumen del estado del team               ║
║    /quality-gate   lint + typecheck + test manual            ║
║                                                              ║
║  Antes de /init-team: lee CLAUDE.md y docs/technical-spec.md ║
╚══════════════════════════════════════════════════════════════╝
`;

process.stderr.write(banner + "\n");
process.exit(0);
