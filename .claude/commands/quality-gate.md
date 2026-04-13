---
description: Corre el quality gate manualmente (lint + typecheck + test)
allowed-tools: Bash, Read
---

Ejecuta el quality gate completo del proyecto y reporta resultados. Equivalente a lo que hace el hook `TaskCompleted` pero invocable manualmente sin team activo.

## Pasos

1. Correr en secuencia (no detengas al primer fallo, corre los 3 y agrega resultados):
   ```bash
   pnpm lint
   pnpm exec tsc --noEmit
   pnpm test --silent --if-present
   ```

2. Para cada comando, reporta:
   - ✅ / ❌ Status
   - Exit code
   - Últimas 20 líneas de stderr si falló

3. Si hay fallos:
   - Clasifica por severidad: 🔴 error (rompe CI) vs 🟡 warning
   - Lista archivos afectados con línea:columna
   - Sugiere qué agent del team debería arreglarlo (según ownership en CLAUDE.md):
     - errores en `src/styles/**` o `*.scss` → styles-engineer
     - errores en `src/components/**`, `src/hooks/**`, `src/lib/**`, `src/App.tsx`, `src/main.tsx` → frontend-dev
     - errores en `tests/**`, `*.test.tsx`, `eslint.config.js` → qa-engineer
     - errores en `vite.config.ts`, `tsconfig*.json`, `package.json` → architect (con plan approval)

4. Si todo pasa: confirma con `✅ Quality gate OK — listo para commit`.

Arguments: $ARGUMENTS (ej. "solo lint", "incluye coverage").
