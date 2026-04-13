---
description: Genera un reporte del estado actual del Agent Team
allowed-tools: Read, Bash, Grep, Glob, TaskList, TaskGet
---

Genera un reporte ejecutivo del estado del team activo (si existe) o del proyecto.

## Pasos

1. **Listar tasks** con TaskList. Si no hay team activo, reporta que no hay tasks y para aquí.
2. **Agrupar por estado**: pending, in_progress, completed. Identifica quién posee cada una.
3. **Detectar bloqueos**: cualquier task `pending` con `blockedBy` no resuelto. Indica qué bloquea a quién.
4. **Resumen por teammate**: para cada owner, cuenta tasks completed / total y qué está haciendo ahora.
5. **Riesgos actuales**: si alguna task lleva >30 min en `in_progress`, márcala como posible stuck.
6. **Quality gate status**: corre `pnpm lint && pnpm exec tsc --noEmit` y reporta si pasa.
7. **Git state**: `git status --short` y `git log --oneline -5`.

## Formato del reporte

```markdown
# Status report — <timestamp>

## Progreso general
- X/Y tasks completadas (Z%)
- Waves activas: [...]

## Por teammate
| Teammate | Done | In progress | Pending | Blocked |
|---|---|---|---|---|
| architect | 3 | 1 | 0 | 0 |
| ... |

## Tasks en progreso ahora mismo
- **#12 (frontend-dev)**: Implementar useChannel hook
- ...

## Bloqueos activos
- **#15** bloqueado por #12 desde hace 20 min

## Quality gate
- ✅ lint clean
- ❌ tsc: 3 errors in src/lib/echo.ts (ver log)

## Git
[output de git status y log]

## Recomendaciones
- ...
```

Arguments: $ARGUMENTS (ej. "solo bloqueos", "incluye diff completo").
