# FicsitMonitorWeb — Technical Spec (v0.1 draft)

> Este documento es el contrato de producto que leen los agentes del team antes
> de planificar su trabajo. Se pre-rellenó con lo descubierto del backend existente
> (`satisfactory-server`) y la app móvil ya publicada (**FICSIT Monitor** en Play Store).
> Pablo rellena los `[TBD]` antes de ejecutar `/init-team`.

## 1. Purpose

FicsitMonitorWeb es el **dashboard web** para servidores dedicados de Satisfactory. Es el **counterpart web** de la app Android FICSIT Monitor (publicada por App To Last, última actualización 2026-03-09). Consume el mismo backend Laravel que alimenta a la app móvil:

- **Backend**: [`PabloHurtadoGonzalo86/satisfactory-server`](https://github.com/PabloHurtadoGonzalo86/satisfactory-server)
  - Stack: Laravel 12 + Reverb (WebSocket) + PostgreSQL/TimescaleDB + Redis + Horizon + Pulse
  - Deploy: Kubernetes bare-metal (Longhorn + MetalLB + Traefik)
  - Ya incluye un frontend React + Inertia.js embebido con Tailwind 4 — **este proyecto es un SPA separado**, no un fork.

**Justificación** de la separación: flexibilidad de deployment independiente, posibilidad de usar SCSS y design system propio, desacoplar release cycles del backend.

## 2. Backend contract (a materializar en `docs/architecture.md` durante wave 1)

### Auth
- **Mecanismo**: sesión Laravel (cookies HttpOnly + CSRF). **NO** JWT.
- **Implicación frontend**: todas las llamadas `fetch` requieren `credentials: 'include'`.
- **CORS**: si el web dashboard vive en dominio distinto del backend, el backend necesita `SESSION_DOMAIN=.tudominio.com` y `SANCTUM_STATEFUL_DOMAINS` configurado. [TBD Pablo: ¿dominio de hosting del web? ¿subdominio del backend o separado?]

### REST endpoints
- Paths no enumerados en el README del backend. **Tarea architect wave 1**: descubrir leyendo `routes/web.php` + `app/Http/Controllers/` del repo backend via WebFetch/gh.
- Esperados por feature set de la app móvil (hipótesis):
  - `GET /api/server/status` — uptime, state
  - `GET /api/players` — lista de jugadores online
  - `GET /api/power/circuits` — circuitos de energía
  - `GET /api/production/items` — rates de producción
  - `GET /api/logistics/trains` / `drones`
  - `GET /api/extraction/miners`
  - `GET /api/buildings` — estado de máquinas
  - `GET /api/inventory` — inventario del mundo
  - `GET /api/awesome-sink` — puntos y coupons
  - `GET /api/events` — feed de eventos
- **Confirmar o ajustar tras wave 1**.

### WebSocket channels (Laravel Reverb)
- **Protocolo**: Reverb implementa Pusher protocol → cliente recomendado `laravel-echo` + `pusher-js`.
- **Auth**: canales privados autorizados via `routes/channels.php` del backend, usando la misma sesión Laravel (cookie).
- **Env del cliente**: necesita `REVERB_APP_KEY`, `REVERB_HOST`, `REVERB_PORT`, `REVERB_SCHEME`. [TBD Pablo: host real del Reverb en producción/dev]
- **Channels esperados** (hipótesis; confirmar wave 1):
  - `server.status` — broadcast de cambios de uptime/state
  - `players.presence` — online/offline events
  - `power.circuits` — actualización de métricas
  - `production.rates`
  - `events` — feed en tiempo real de cambios

## 3. Feature set MVP (portado de la app móvil)

Orden de prioridad (de mayor a menor para el MVP):

1. **Server Health** — uptime, conexión del backend, estado del dedicated server (crítico: sin esto nada tiene sentido).
2. **Player Tracking** — lista de jugadores online con tiempo de sesión.
3. **Power Management** — circuitos, capacidad total, consumo actual, nivel de baterías.
4. **Production Tracking** — rates por item, detección de bottlenecks visual.
5. **Live Event Feed** — stream de eventos de la factoría (construcción, destrucción, overflow).
6. **Resource Extraction** — estado de miners/extractores.
7. **Building Status** — overview de máquinas y su performance.
8. **Logistics (Trains + Drones)** — posiciones, rutas, timetables, actividad de drone stations.
9. **World Inventory** — vista del inventario del mundo sin entrar al juego.
10. **AWESOME Sink** — points y coupons en tiempo real.

Todas las vistas deben ser **reactivas a WebSocket** — sin polling manual.

## 4. Frontend stack (recomendación)

Ya instalados en `package.json` (no tocar sin plan approval del architect):
- React 19.2.4, React DOM 19.2.4
- TypeScript 6.0.2, Vite 8.0.4
- React Compiler (babel-plugin-react-compiler 1.0.0)
- ESLint 9.39.4 + typescript-eslint 8.58.0

A instalar en wave 1 del primer team (con plan approval):
- **Estilos**: `sass-embedded` (ya instalado por el setup) — `@use`/`@forward`, no `@import`.
- **WebSocket**: `laravel-echo` + `pusher-js`.
- **Estado**: `zustand`.
- **Charts**: `react-apexcharts` + `apexcharts` (consistente con el backend Inertia frontend; fallback: `recharts`).
- **Router**: `react-router` v7 (data router API).
- **Testing**: `vitest` + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom`.
- **Opcional para a11y audits**: `@axe-core/react`.

## 5. Open questions / TBD para Pablo

Pablo rellena estas decisiones antes de arrancar el team:

- [ ] **Dominio de hosting del web** (determina CORS): subdominio del backend (`app.tudominio.com`) o dominio separado?
- [ ] **URL base del backend** en dev y prod (para `VITE_API_BASE_URL`).
- [ ] **URL del Reverb WebSocket** (host/port/scheme) y `REVERB_APP_KEY` para el cliente. ¿Expondrás el APP_KEY como env var pública de Vite o requerirá otra capa?
- [ ] **Rate limits esperados** del backend (qué frecuencia de polling/websocket puede aguantar).
- [ ] **Tema visual**: dark-first, light-first, o auto (respetar `prefers-color-scheme`)? Referencia visual de la app móvil?
- [ ] **Idioma**: español-only, inglés-only, o i18n desde el día 1? Si i18n, ¿`react-intl` o `i18next`?
- [ ] **Deploy target** del web: Vercel? Netlify? Nginx en el mismo K8s del backend? GitHub Pages?
- [ ] **Dominio + orientación responsive**: desktop-first (la app móvil ya cubre mobile) o también mobile-friendly en web?
- [ ] **Autenticación UI**: ¿habrá pantalla de login en el web? La sesión Laravel requiere un form que haga POST a `/login` del backend — o asumes que el usuario ya está logueado en otra pestaña?
- [ ] **Analytics / telemetría**: ¿Plausible, PostHog, nada?

## 6. No-goals (explícitos) para MVP

- No hay SSR. Es un SPA puro.
- No hay service worker / PWA en el MVP (posponer a v1.1).
- No hay offline mode (los datos vienen del backend live).
- No hay write operations a la factoría desde el web (solo lectura; acciones de control del servidor se hacen en la app móvil o en el backend directamente).
- No hay integración con otras plataformas (Discord, Twitch) en el MVP.

## 7. Convenciones del proyecto (enlace)

Ver `CLAUDE.md` para:
- Ownership de archivos por agente.
- Reglas de React Compiler (no memoizar a mano).
- Reglas de SCSS (`@use`/`@forward`).
- Quality gates (`pnpm lint && tsc --noEmit && test`).
- Keybindings de Agent Teams.

## 8. Referencias

- Backend repo: https://github.com/PabloHurtadoGonzalo86/satisfactory-server
- App móvil en Play Store: https://play.google.com/store/apps/details?id=com.apptolast.fiscsitmonitor
- Studio móvil / website: https://apptolast.com
- FicsitRemoteMonitoring mod (fuente última de datos del juego): https://github.com/Tom-Neverwinter/FicsitRemoteMonitoring (verificar fork usado por el backend)
- Laravel Reverb: https://laravel.com/docs/reverb
- Laravel Echo: https://laravel.com/docs/broadcasting#client-side-installation
