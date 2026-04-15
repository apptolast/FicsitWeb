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
    titleEs: 'Polling Adaptativo',
    titleEn: 'Adaptive Polling',
    descEs: 'Frecuencia de actualización inteligente según la actividad del servidor.',
    descEn: 'Smart update frequency based on server activity.',
  },
  {
    icon: 'sync',
    titleEs: 'WebSockets Live',
    titleEn: 'Live WebSockets',
    descEs: 'Eventos en tiempo real vía Laravel Reverb con latencia sub-200ms.',
    descEn: 'Real-time events via Laravel Reverb with sub-200ms latency.',
  },
  {
    icon: 'database',
    titleEs: 'TimescaleDB',
    titleEn: 'TimescaleDB',
    descEs: 'Series temporales optimizadas para métricas industriales a alta frecuencia.',
    descEn: 'Time-series optimized for high-frequency industrial metrics.',
  },
  {
    icon: 'notifications_active',
    titleEs: 'Alertas Inteligentes',
    titleEn: 'Smart Alerts',
    descEs: 'Notificaciones configurables por umbral con historial de eventos.',
    descEn: 'Configurable threshold notifications with event history.',
  },
  {
    icon: 'electric_bolt',
    titleEs: 'Monitor de Energía',
    titleEn: 'Power Monitor',
    descEs: 'Circuitos, capacidad total, consumo y nivel de baterías en un vistazo.',
    descEn: 'Circuits, total capacity, consumption, and battery levels at a glance.',
  },
  {
    icon: 'factory',
    titleEs: 'Producción Total',
    titleEn: 'Full Production',
    descEs: 'Rates por item, detección de bottlenecks y estado de máquinas.',
    descEn: 'Rates per item, bottleneck detection, and machine status.',
  },
  {
    icon: 'groups',
    titleEs: 'Tracking de Jugadores',
    titleEn: 'Player Tracking',
    descEs: 'Lista de jugadores online con tiempo de sesión y posición en el mundo.',
    descEn: 'Online player list with session time and world position.',
  },
  {
    icon: 'local_shipping',
    titleEs: 'Logística',
    titleEn: 'Logistics',
    descEs: 'Trenes, drones y rutas activas visualizadas en tiempo real.',
    descEn: 'Trains, drones, and active routes visualized in real time.',
  },
  {
    icon: 'terminal',
    titleEs: 'API Abierta',
    titleEn: 'Open API',
    descEs: 'REST completa + WebSocket para integrar con tus propias herramientas.',
    descEn: 'Full REST + WebSocket to integrate with your own tools.',
  },
];

const T = {
  es: {
    eyebrow: 'Funcionalidades',
    title: 'Todo lo que necesitas para gestionar tu factoría',
    sub: 'Desde métricas en tiempo real hasta alertas inteligentes, FICSIT.monitor cubre cada aspecto de tu servidor dedicado.',
  },
  en: {
    eyebrow: 'Features',
    title: 'Everything you need to manage your factory',
    sub: 'From real-time metrics to smart alerts, FICSIT.monitor covers every aspect of your dedicated server.',
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
