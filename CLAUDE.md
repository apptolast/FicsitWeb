# FicsitMonitorWeb

## Project

Dashboard web SPA para servidores dedicados de Satisfactory. Counterpart web de la app Android **FICSIT Monitor** (Play Store, publicada por App To Last). Consume el backend Laravel **`satisfactory-server`** via Reverb WebSocket + REST.

Este proyecto **NO** es un fork del frontend Inertia.js embebido en `satisfactory-server`; es un SPA independiente con divergencias deliberadas: SCSS en lugar de Tailwind, Vite puro sin Inertia, estado con Zustand, charts con ApexCharts.

## Stack

- **Core**: React 19.2 + TypeScript 6.0 + Vite 8 + pnpm
- **Estilos**: SCSS con `sass-embedded` — `@use`/`@forward`, nunca `@import`
- **WebSocket**: `laravel-echo` + `pusher-js` (Reverb implementa protocolo Pusher)
- **HTTP**: `fetch` nativo con `credentials: 'include'` (sesión Laravel)
- **State**: `zustand`
- **Charts**: `react-apexcharts`
- **Router**: `react-router` v7
- **Lint/type**: ESLint 9 flat config + `tsc --noEmit`
- **React Compiler**: activo (`babel-plugin-react-compiler` en devDeps)

## Commands

| Acción | Comando |
|---|---|
| Dev server | `pnpm dev` |
| Build | `pnpm build` (`tsc -b && vite build`) |
| Lint | `pnpm lint` |
| Typecheck aislado | `pnpm exec tsc --noEmit` |
| Tests | `pnpm test` (añadir vitest en wave 1 del primer team) |

**Gestor de paquetes es pnpm**. No uses `npm` ni `yarn` — están denegados en permissions.

## Conventions

- **React 19 + React Compiler**: **NO memoizar a mano**. `useMemo`/`useCallback` son redundantes y pueden confundir al compiler. Deja que el compiler haga su trabajo.
- **SCSS**: siempre `@use "./_tokens" as tokens;` (con alias), nunca `@import`. Tokens globales en `src/styles/_tokens.scss`. Dark mode via tokens + `prefers-color-scheme`.
- **TypeScript**: strict, sin `any`. Prefiere `type` a `interface` salvo para extensión.
- **Fetch**: todo con `credentials: 'include'`. La auth es sesión Laravel por cookie; sin esto, el WebSocket se autentica como guest y falla al suscribirse a canales privados.
- **Commits**: atómicos, mensaje descriptivo (qué + por qué). Nunca bypass hooks (`--no-verify`).
- **No trailing comments** describiendo qué hace el código cuando el nombre ya lo dice.

## Imports

- @docs/technical-spec.md
- @docs/architecture.md

## File ownership (Agent Teams)

Dos agentes NUNCA tocan el mismo archivo a la vez. Ownership:

| Path | Owner |
|---|---|
| `docs/**`, `src/types/**` | architect (Opus) |
| `src/App.tsx`, `src/main.tsx`, `src/components/**`, `src/hooks/**`, `src/lib/**` | frontend-dev (Sonnet) |
| `src/styles/**`, `*.scss` | styles-engineer (Sonnet) |
| `tests/**`, `*.test.ts(x)`, `eslint.config.js` | qa-engineer (Sonnet) |
| `vite.config.ts`, `tsconfig*.json`, `package.json` (deps) | architect — requiere **plan approval** |
| `.agents/skills/**` | SIN TOCAR — gestionado por `autoskills` CLI |
| `.claude/**` | humano (Pablo) o architect con confirmación |

## Quality gates

Todo código debe pasar, como mínimo:

```bash
pnpm lint && pnpm exec tsc --noEmit
```

Cuando haya tests: añadir `&& pnpm test`. El hook `TaskCompleted` corre estos checks automáticamente en **warning mode** (no bloquea). Para endurecer a bloqueante, editar `.claude/hooks/validate-task.cjs` y cambiar los `process.exit(0)` finales por `process.exit(2)`.

## Agent Teams rules

- **Versión mínima Claude Code**: 2.1.32+ (verificado ✅ 2.1.105).
- **Enable flag**: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (en `.claude/settings.json`).
- **Display mode**: `in-process` forzado (Windows no soporta split panes tmux/iTerm2).
- **Keybindings**:
  - `Shift+Down` — ciclar entre teammates (y vuelta al lead)
  - `Ctrl+T` — toggle task list
  - `Enter` — entrar a la sesión del teammate activo
  - `Escape` — interrumpir turno del teammate
- **1 team por sesión**. No hay nested teams.
- **Plan approval** activo para tareas que tocan: `vite.config.ts`, `tsconfig*.json`, `package.json` (cualquier cambio de deps).
- **Session resumption no restaura teammates** (limitación oficial). Si matas la sesión, al volver pide al lead "re-spawn teammates".
- **Worker preamble**: cada teammate spawneado tiene que entender que NO spawnea otros agentes. No hay nested teams.

## Skills de referencia

Las 9 skills están instaladas por `autoskills` en `.agents/skills/` (no en `.claude/skills/`). Claude Code no las carga automáticamente desde ese path — cada agente las cita explícitamente en su prompt. Asignación:

| Agente | Skills relevantes |
|---|---|
| architect | `.agents/skills/vite/`, `.agents/skills/nodejs-best-practices/` |
| frontend-dev | `.agents/skills/vercel-react-best-practices/`, `.agents/skills/vercel-composition-patterns/`, `.agents/skills/typescript-advanced-types/` |
| styles-engineer | `.agents/skills/frontend-design/`, `.agents/skills/accessibility/` |
| qa-engineer | `.agents/skills/accessibility/`, `.agents/skills/seo/` |
| (parked) | `.agents/skills/nodejs-backend-patterns/` — no aplica (SPA sin backend) |

## Mentoring note protocol

Cada teammate termina sus reports con una sección:

```markdown
## Mentoring note (for Pablo)
- **Por qué**: 2–3 líneas explicando la razón de la decisión.
- **Trade-off**: alternativa considerada y por qué la descartaste.
- **Lectura recomendada**: link/skill/archivo para profundizar.
```

Esto es obligatorio para `architect` y `mentor`. Opcional pero recomendado para el resto.

## Learnings

Ver `docs/solutions/` para resoluciones de issues previos. Cuando se resuelva un problema no trivial (bug raro, workaround de Vite, issue de typing), documentar un archivo nuevo ahí con formato `YYYY-MM-DD-short-title.md`.

## Compaction

Cuando el contexto se compacte, preservar siempre:
- Lista completa de archivos modificados en la sesión
- Estado actual del task list
- Comandos pnpm exactos (dev/build/lint/tsc/test)
- Decisiones de arquitectura tomadas (CORS, auth, WebSocket setup)
- Links al backend repo y a la app móvil
