---
description: Arranca el primer Agent Team para este proyecto
allowed-tools: Read, Bash, Grep, Glob
---

Arranca un Agent Team adaptado a FicsitMonitorWeb.

## Pasos que debes hacer como Team Lead

1. **Contexto** — lee en este orden:
   - `CLAUDE.md`
   - `docs/technical-spec.md`
   - `docs/architecture.md` si existe
   - `package.json` (confirmar stack)
   - `.claude/agents/*.md` (conocer los roles disponibles)

2. **Propón el plan de team al usuario antes de spawnar**. Describe:
   - Qué teammates vas a spawnar y por qué (de los 5 definidos: architect, frontend-dev, styles-engineer, qa-engineer, mentor). Para un primer arranque, recomienda: architect (wave 1 solo, con plan approval), luego frontend-dev + styles-engineer en paralelo (wave 2), luego qa-engineer (wave 3). El mentor queda disponible on-demand.
   - Qué tareas iniciales vas a crear para cada uno (5–6 tasks por teammate, cada una de 5–15 minutos).
   - Qué dependencias tiene cada task (blockedBy).

3. **Espera aprobación del usuario** antes de llamar a ninguna herramienta de creación de team.

4. **Crea el team** cuando el usuario apruebe:
   - Usa lenguaje natural (el harness traduce a las tools internas). Ejemplo: "Crea un team llamado ficsitmonitor-wave1 con un teammate architect usando el archivo .claude/agents/architect.md, modelo Opus, y requiere plan approval antes de cualquier cambio."
   - Para las waves siguientes, puedes spawnar más teammates o reusar el mismo team.

5. **Activa plan approval** para el architect en wave 1 y para cualquier tarea que vaya a tocar `vite.config.ts`, `tsconfig*.json`, o `package.json`.

6. **Primera tarea del architect**: "Lee el README de https://github.com/PabloHurtadoGonzalo86/satisfactory-server via WebFetch (o gh CLI si está disponible), enumera los endpoints REST en `routes/web.php` y los canales WebSocket en `routes/channels.php`, y escribe `docs/architecture.md` con las tablas de contratos."

7. **Recuérdale al usuario los keybindings**: `Shift+Down` para ciclar, `Ctrl+T` para task list, `Escape` para interrumpir.

8. **Arguments recibidos del usuario**: $ARGUMENTS. Interprétalos como ajustes al plan por defecto (ej. "solo architect", "sin plan approval", "usa Sonnet para architect").

## Reglas

- NUNCA spawnes sin aprobación del usuario primero.
- NUNCA crees más de 5 teammates en el primer uso.
- Cada teammate debe recibir en su spawn prompt: su rol, ownership, contexto del proyecto (resumen del spec), y worker preamble.
- Respeta el ownership definido en CLAUDE.md — dos teammates nunca tocan el mismo archivo.
