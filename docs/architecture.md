# FicsitMonitorWeb — Architecture

> Autoría: `architect` (en modo team-of-one, sesión 2026-04-14).
> Basado en discovery real del repo backend `PabloHurtadoGonzalo86/satisfactory-server`
> (rama `main`, commit en el momento de la lectura vía `gh api`). Complementa `docs/technical-spec.md`.

## 1. System diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                    Satisfactory Dedicated Server                 │
│                      (FRM mod en 8080/8081)                      │
└──────────────────────────────┬───────────────────────────────────┘
                               │ HTTP poll + WebSocket
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│  satisfactory-server (Laravel 12 + Horizon workers)              │
│  ├─ Scheduled jobs polean FRM, persisten en TimescaleDB          │
│  ├─ Broadcast events → Reverb (private-servers.{id})             │
│  └─ REST API /api/v1/* (ServerResource, PowerResource, …)        │
└──────────┬───────────────────────────────────┬───────────────────┘
           │ HTTP (JSON + session cookie)       │ WebSocket (Reverb)
           ▼                                    ▼
┌──────────────────────────────────────────────────────────────────┐
│  FicsitMonitorWeb  (ESTE REPO)                                   │
│  React 19 + Vite 8 + TS + SCSS + Zustand                         │
│  ├─ src/lib/api.ts  ─── fetch wrapper con credentials: include   │
│  ├─ src/lib/echo.ts ─── laravel-echo + pusher-js singleton       │
│  ├─ src/hooks/useChannel.ts ── suscripción a eventos             │
│  └─ src/lib/stores/*.ts ── Zustand stores por feature            │
└──────────────────────────────────────────────────────────────────┘
```

## 2. Backend REST API (descubierta)

Archivo de rutas: `routes/api.php`, prefix `v1`. **Todas las rutas son GET** (read-only dashboard).

| Endpoint | Controller | Response shape |
|---|---|---|
| `GET /api/v1/servers` | `ServerController::index` | `ResourceCollection<ServerResource>` → `{ data: Server[] }` |
| `GET /api/v1/servers/{id}` | `ServerController::show` | `ServerResource` → `{ data: Server }` |
| `GET /api/v1/servers/{id}/metrics/latest` | `ServerController::latestMetrics` | `ServerMetrics \| null` (literal JSON) |
| `GET /api/v1/servers/{id}/players` | `PlayerController::index` | `ResourceCollection<PlayerResource>` |
| `GET /api/v1/servers/{id}/power/latest` | `PowerController::latest` | `ResourceCollection<PowerMetricResource>` |
| `GET /api/v1/servers/{id}/production/latest` | `ProductionController::latest` | `ResourceCollection<ProductionMetricResource>` |
| `GET /api/v1/servers/{id}/trains` | `TrainController::index` | `ResourceCollection<TrainResource>` |
| `GET /api/v1/servers/{id}/drones` | `DroneStationController::index` | `ResourceCollection<DroneStationResource>` |

### Gaps identificados en el API REST
El `DashboardController` (Inertia) también expone estos datos, pero **NO están en `/api/v1/*`** — viven solo en cache Redis del backend y se reciben por WebSocket:

- `generators` (cache key `generators:{serverId}`)
- `extractors` (cache key `extractors:{serverId}`)
- `worldInv` (cache key `world_inv:{serverId}`)
- `resourceSink` (cache key `resource_sink:{serverId}`)
- `factoryBuildings` (no expuesto)
- `alertRules` (no expuesto)

**Implicación**: para estas features, el SPA **no puede hacer initial fetch REST** — tiene que suscribirse al canal WebSocket y esperar el próximo broadcast, mostrando skeleton loaders mientras tanto.

**TODO backend**: añadir endpoints a `routes/api.php`:
```
GET /api/v1/servers/{id}/generators
GET /api/v1/servers/{id}/extractors
GET /api/v1/servers/{id}/world-inventory
GET /api/v1/servers/{id}/resource-sink
GET /api/v1/servers/{id}/buildings
```
Pueden simplemente devolver el contenido de Redis cache (mismo comportamiento que DashboardController). Tarea para el repo backend, no para este.

### Auth del API
**Ambiguo en la discovery**. `routes/api.php` no muestra `->middleware('auth')` explícito. En Laravel 12 el `api` group por defecto es **stateless** (sin sesión web). Pero el `OwnedByUserScope` filtra `Server::query()` por `auth()->id()`, lo que devolvería vacío si no hay auth.

**Hipótesis más probable**: el backend debería añadir `->middleware(['web', 'auth'])` al group de `api.php` para que las cookies de sesión fluyan. Sin eso, el SPA no podrá listar servers aunque el usuario esté logueado.

**TODO backend** (confirmar con Pablo): asegurar que `routes/api.php` está dentro del middleware `web` + `auth`. Un parche mínimo:
```php
Route::middleware(['web', 'auth'])->prefix('v1')->group(function () {
    Route::get('servers', [ServerController::class, 'index']);
    // ...
});
```

Hasta confirmar esto, el SPA asumirá que el API necesita cookie de sesión y hará todas las llamadas con `credentials: 'include'`.

## 3. WebSocket (Reverb)

### Canal
**Un único canal privado por servidor**: `private-servers.{serverId}`.
- Definido en `routes/channels.php` como `Broadcast::channel('servers.{server}', ...)`.
- Autorización: `$user->ownsServer($serverId)` — consulta DB que verifica ownership.
- **Pusher protocol**: el nombre real del canal al suscribirse es `private-servers.{id}` (prefix `private-` añadido automáticamente por `PrivateChannel`).

### Eventos broadcasteados
12 eventos confirmados en `app/Events/`. Cada uno implementa `ShouldBroadcast` y define `broadcastAs()` (nombre Pusher-style con dots) y `broadcastWith()` (payload JSON). Lista:

| Clase PHP | `broadcastAs()` | Payload shape (ver §4 types) |
|---|---|---|
| `ServerStatusUpdated` | `server.status.updated` | `{ status, last_seen_at }` |
| `ServerMetricsUpdated` | `server_metrics.updated` | `ServerMetrics` (hipótesis; verificar) |
| `PlayersUpdated` | `players.updated` | `{ players: Player[] }` |
| `PowerUpdated` | `power.updated` | `{ circuits: PowerMetric[] }` |
| `ProductionUpdated` | `production.updated` | `{ items: ProductionMetric[] }` (verificar) |
| `TrainsUpdated` | `trains.updated` | `{ trains: Train[] }` (verificar) |
| `DronesUpdated` | `drones.updated` | `{ drones: DroneStation[] }` (verificar) |
| `GeneratorsUpdated` | `generators.updated` | `{ generators: Generator[] }` (verificar) |
| `ExtractorsUpdated` | `extractors.updated` | `{ extractors: Extractor[] }` (verificar) |
| `FactoryStatusUpdated` | `factory.status.updated` | `{ buildings: FactoryBuilding[] }` (verificar) |
| `WorldInventoryUpdated` | `world_inventory.updated` | `{ items: InventoryItem[] }` (verificar) |
| `ResourceSinkUpdated` | `resource_sink.updated` | `ResourceSinkStatus` (verificar) |

**Confirmados 3 eventos** (ServerStatusUpdated, PowerUpdated, PlayersUpdated) leyendo su fuente. Los otros 9 siguen el mismo patrón por convención — **verificar caso por caso cuando el SPA se conecte por primera vez y haga logging del primer payload**.

### Autenticación del WebSocket
Laravel Reverb (protocolo Pusher) autoriza canales privados vía HTTP callback al endpoint `/broadcasting/auth` del backend. Este endpoint está dentro del middleware `web` (confirmado en `bootstrap/app.php`: `->withBroadcasting(..., ['prefix' => 'broadcasting', 'middleware' => ['web']])`).

Por tanto:
1. El cliente Pusher.js hace un POST a `https://backend/broadcasting/auth` con la cookie de sesión.
2. Backend valida que `auth()` no es null y ejecuta el closure de `channels.php` (`ownsServer`).
3. Si OK, devuelve el signed auth token.
4. El cliente usa ese token para suscribirse al canal.

**Implicación crítica**: el SPA debe haber hecho login antes de conectarse a Reverb. Y para que el POST `/broadcasting/auth` funcione cross-domain, el backend debe tener CORS configurado con `supports_credentials = true` y `allowed_origins` incluyendo el dominio del web.

## 4. CORS y dominio — requerimiento backend (crítico)

**Estado actual del backend**: NO existe `config/cors.php`, `SESSION_DOMAIN=null`. Esto significa que las cookies solo funcionan en el mismo dominio.

**Para que FicsitMonitorWeb funcione desde `app.ficsitmonitor.com` consumiendo backend en `api.ficsitmonitor.com`** (ASSUMPTION: subdominio del mismo root):

1. **Backend: crear `config/cors.php`** con:
   ```php
   return [
       'paths' => ['api/*', 'broadcasting/auth', 'login', 'logout'],
       'allowed_methods' => ['*'],
       'allowed_origins' => [env('WEB_APP_URL', 'http://localhost:5173')],
       'allowed_origins_patterns' => [],
       'allowed_headers' => ['*'],
       'exposed_headers' => [],
       'max_age' => 0,
       'supports_credentials' => true,
   ];
   ```
2. **Backend: `.env`** debe tener `SESSION_DOMAIN=.ficsitmonitor.com` (nota el punto inicial — cubre todos los subdominios).
3. **Backend: `SESSION_SAME_SITE=lax`** (default en Laravel 12) funciona si backend y web comparten root domain. Si NO lo comparten, necesitas `none` + HTTPS obligatorio.

**ASSUMPTION**: hosting del web será `app.ficsitmonitor.com` (o similar bajo el mismo root del backend). Si Pablo elige un dominio separado (ej. Vercel en `ficsit-web.vercel.app`), CORS sigue funcionando pero el SPA debe manejar el login flow diferente (window.open o redirect).

## 5. Frontend architecture

### Capas

```
src/
├── types/            Interfaces TS de cada entidad (contrato compartido)
├── lib/
│   ├── api.ts        Fetch wrapper con credentials: include
│   ├── echo.ts       Laravel Echo singleton
│   └── stores/       Zustand stores por feature
├── hooks/
│   ├── useChannel.ts Wrapper de suscripción a canal Pusher
│   └── useBootstrap.ts Initial snapshot fetch
├── components/       UI components (Layout, ServerHealth, PlayerList, …)
├── styles/           SCSS tokens/mixins/reset/main
└── App.tsx           Router + layout root
```

### Flujo de datos para una feature típica (ej. ServerHealth)
1. Al montar la app, `useBootstrap()` llama `api.get('/api/v1/servers')`, guarda el primer server en `useServerStore`.
2. Llama `api.get('/api/v1/servers/{id}/metrics/latest')` para tener un snapshot inicial.
3. `useChannel('servers.{id}', 'server.status.updated', cb)` se suscribe al canal privado y actualiza el store cada vez que llega un evento.
4. El componente `<ServerHealth />` lee del store con `useServerStore(s => s.metrics)`.
5. Cuando llega `power.updated`, otro hook actualiza `usePowerStore`, que `<PowerPanel />` lee.

### Zustand store pattern
Un store por feature, no un monolito:
```ts
// src/lib/stores/useServerStore.ts
export const useServerStore = create<ServerState>((set) => ({
  server: null,
  metrics: null,
  status: 'loading',
  setServer: (server) => set({ server }),
  setMetrics: (metrics) => set({ metrics }),
  setStatus: (status) => set({ status }),
}));
```

### Component ownership por feature MVP
| Feature | Component | Store | Channel event |
|---|---|---|---|
| Server health | `ServerHealth` | `useServerStore` | `server.status.updated`, `server_metrics.updated` |
| Player tracking | `PlayerList` | `usePlayerStore` | `players.updated` |
| Power mgmt | `PowerPanel` | `usePowerStore` | `power.updated` |
| Production | `ProductionBoard` | `useProductionStore` | `production.updated` |
| Logistics | `LogisticsMap` | `useLogisticsStore` | `trains.updated`, `drones.updated` |
| Live events | `EventFeed` | `useEventFeedStore` | TODOS (agregador) |
| Resource sink | `ResourceSinkCard` | `useResourceSinkStore` | `resource_sink.updated` |
| Extractors | `ExtractorsList` | `useExtractorsStore` | `extractors.updated` |
| Generators | `GeneratorsList` | `useGeneratorsStore` | `generators.updated` |
| Buildings | `BuildingsGrid` | `useBuildingsStore` | `factory.status.updated` |
| World inventory | `InventoryPanel` | `useInventoryStore` | `world_inventory.updated` |

## 6. Assumptions & TBD

Decisiones tomadas por el architect en modo team-of-one durante la discovery. **Pablo debe confirmar antes de wave 3+**:

1. **Hosting**: `app.ficsitmonitor.com` como subdominio del backend. Si diferente, ajustar CORS y SESSION_DOMAIN.
2. **Tema visual**: dark-first (alineado con app móvil), con respect de `prefers-color-scheme` para override a light.
3. **Idioma**: español-only en MVP, i18n diferido a v1.1. El backend tiene `APP_LOCALE=en` pero es independiente del texto de UI.
4. **Login UI**: el web NO implementa form de login propio en MVP. Asume que el usuario está logueado en el backend (cookie preexistente) o redirige a `https://backend/login` si `api.get('/servers')` devuelve 401. Form de login en web queda para v1.1.
5. **Deploy target**: Nginx pod separado en el mismo K8s del backend, sirviendo el output de `pnpm build`. Alternativa: Vercel con CORS cross-origin.
6. **Reverb config en dev**: se lee de env vars `VITE_REVERB_*` (ver §7).
7. **Responsive**: desktop-first (la app móvil cubre mobile), pero el SPA debe ser usable en tablet. No mobile-first.
8. **Analytics**: ninguno en MVP.
9. **React Router v7**: data router API (no legacy `<BrowserRouter>`). Rutas: `/` (dashboard principal), `/servers/:id` (detail). No hay `/login` propio (ver punto 4).

## 7. Environment variables del SPA

Archivo `.env.local` (crear manualmente, gitignored por `.env.*`):

```bash
# URL base del API del backend
VITE_API_BASE_URL=http://localhost:8000

# Reverb WebSocket — alineado con REVERB_* del backend
VITE_REVERB_APP_KEY=local-key
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

En producción, los valores se inyectan vía CI/CD o en el pipeline de build. **Los env vars de Vite son públicos** (van al bundle del cliente); no poner secretos ahí.

## 8. Testing strategy

- **Unit**: utils puras en `src/lib/` (formatters, type guards).
- **Integration**: hooks custom (`useChannel`, `useBootstrap`) con mocks de Echo y fetch.
- **Component**: componentes críticos con `@testing-library/react` + `axe-core` para a11y.
- **E2E (v1.1)**: Playwright contra un backend mock o docker-compose del real.

## 9. Rollout plan (waves)

- **Wave 1 (ESTE turno, architect solo)**: discovery backend ✅, architecture.md ✅, types TS ✅, api.ts + echo.ts stubs ✅.
- **Wave 2 (próximo turno, styles-engineer + frontend-dev)**: SCSS tokens/mixins/reset, useChannel hook, useBootstrap hook, useServerStore, Layout component, ServerHealth component, App.tsx rewrite mínimo.
- **Wave 3 (qa-engineer)**: install vitest, smoke test de App y api.ts, configure `pnpm test` script.
- **Wave 4 (frontend-dev)**: PlayerList, PowerPanel, ProductionBoard.
- **Wave 5 (frontend-dev)**: Logistics, EventFeed, remaining features.
- **Wave 6 (Pablo)**: deploy config, env vars de prod, CORS backend.

## 10. Mentoring note

**Por qué Inertia-over-fetch no, API REST sí**: mi primera lectura del repo backend vio `routes/web.php` minimalista y asumí que no había API. Resulta que sí hay un `routes/api.php` con 8 endpoints formales (Laravel Resources), que es lo correcto para un SPA externo. Lección: nunca asumir sobre la existencia de un archivo si la estructura del proyecto sugiere modularidad (app/Modules/Server/...) — ahí los controllers y routes pueden estar donde no esperas.

**Por qué Zustand y no Redux Toolkit**: 12 eventos de WebSocket × 10 features = muchos updates por segundo. Redux tiene overhead de reducers + action creators + middleware; Zustand es un objeto con `set()`, punto. Para un dashboard read-only en tiempo real, Zustand es matemáticamente más eficiente porque cada store re-render es aislado (los componentes se suscriben a slices con selectores, no al árbol entero). Alternativa considerada: Context API pura → descartada porque Context re-renderiza todo el árbol cada vez.

**Por qué eventos como `server.status.updated` y no `ServerStatusUpdated`**: Laravel Reverb usa Pusher protocol. En Pusher, los eventos son strings arbitrarios y la convention es `noun.verb[.adjective]` lowercase con dots. El backend respeta esto con `broadcastAs()`. Si el cliente se suscribe a `ServerStatusUpdated` (el nombre de la clase PHP), no recibirá nada — hay que usar exactamente el string que devuelve `broadcastAs()`.
