import { useLang } from '../../lib/i18n';
import styles from './FeaturesGrid.module.scss';

type Feature = {
  icon: string;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
};

const FEATURES: Feature[] = [
  {
    icon: 'bolt',
    titleEs: 'Horizon Workers',
    titleEn: 'Horizon Workers',
    descEs: 'Laravel Horizon sobre Redis orquesta el polling del mod FRM sin saturar tu servidor de juego.',
    descEn: 'Laravel Horizon on Redis orchestrates FRM mod polling without overloading your game server.',
  },
  {
    icon: 'sync',
    titleEs: 'Reverb WebSocket',
    titleEn: 'Reverb WebSocket',
    descEs: 'Laravel Reverb difunde los cambios en directo al dashboard con latencia sub-200ms.',
    descEn: 'Laravel Reverb broadcasts changes live to the dashboard with sub-200ms latency.',
  },
  {
    icon: 'database',
    titleEs: 'TimescaleDB',
    titleEn: 'TimescaleDB',
    descEs: 'PostgreSQL + extensión TimescaleDB para series temporales de métricas industriales a alta frecuencia.',
    descEn: 'PostgreSQL with the TimescaleDB extension for high-frequency industrial time-series metrics.',
  },
  {
    icon: 'notifications_active',
    titleEs: 'Alertas Inteligentes',
    titleEn: 'Smart Alerts',
    descEs: 'Notificaciones configurables por umbral para fábricas detenidas, caídas de energía o trenes bloqueados.',
    descEn: 'Configurable threshold notifications for halted factories, power drops or stuck trains.',
  },
  {
    icon: 'electric_bolt',
    titleEs: 'Monitor de Energía',
    titleEn: 'Power Monitor',
    descEs: 'Circuitos, capacidad total, consumo y nivel de baterías del mundo, al instante.',
    descEn: 'Circuits, total capacity, consumption and world battery levels, at a glance.',
  },
  {
    icon: 'factory',
    titleEs: 'Rates de Producción',
    titleEn: 'Production Rates',
    descEs: 'Producción por item, detección de cuellos de botella y estado de cada máquina.',
    descEn: 'Per-item production, bottleneck detection and per-machine status.',
  },
  {
    icon: 'groups',
    titleEs: 'Sesiones de Jugadores',
    titleEn: 'Player Sessions',
    descEs: 'Lista de jugadores online, tiempo de sesión y estadísticas per-usuario.',
    descEn: 'Online players, session time and per-user statistics.',
  },
  {
    icon: 'local_shipping',
    titleEs: 'Logística Live',
    titleEn: 'Live Logistics',
    descEs: 'Trenes, drones y rutas activas expuestas por el mod FRM y visualizadas en vivo.',
    descEn: 'Trains, drones and active routes exposed by the FRM mod and visualised live.',
  },
  {
    icon: 'terminal',
    titleEs: 'API REST /v1',
    titleEn: 'REST API /v1',
    descEs: 'Endpoints REST formales + canal Reverb privado para integrar FICSIT.monitor con tus herramientas.',
    descEn: 'Formal REST endpoints + private Reverb channel to plug FICSIT.monitor into your tooling.',
  },
];

const T = {
  es: {
    eyebrow: 'Funcionalidades',
    title: 'Todo lo que necesitas para gestionar tu servidor dedicado',
    sub: 'Desde Laravel Horizon hasta ApexCharts en vivo, FICSIT.monitor cubre cada aspecto de tu servidor dedicado de Satisfactory sin que toques una sola API vanilla.',
  },
  en: {
    eyebrow: 'Features',
    title: 'Everything you need to run your dedicated server',
    sub: 'From Laravel Horizon to live ApexCharts, FICSIT.monitor covers every aspect of your dedicated Satisfactory server without you touching a single vanilla API.',
  },
} as const;

export function FeaturesGrid() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={styles.section} aria-label="Features">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.sub}>{t.sub}</p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((f) => (
            <div key={f.icon} className={styles.card}>
              <span className={`material-symbols-outlined ${styles.icon}`} aria-hidden="true">
                {f.icon}
              </span>
              <h3 className={styles.cardTitle}>
                {lang === 'es' ? f.titleEs : f.titleEn}
              </h3>
              <p className={styles.cardDesc}>
                {lang === 'es' ? f.descEs : f.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
