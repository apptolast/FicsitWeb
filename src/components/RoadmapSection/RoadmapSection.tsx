import { useLang } from '../../lib/i18n';
import styles from './RoadmapSection.module.scss';

type Quarter = {
  q: string;
  titleEs: string;
  titleEn: string;
  featuresEs: string[];
  featuresEn: string[];
  active: boolean;
};

const QUARTERS: Quarter[] = [
  {
    q: 'Q2 2026',
    titleEs: 'MVP Live',
    titleEn: 'MVP Live',
    featuresEs: [
      'Dashboard de servidor, jugadores y energía',
      'Reverb WebSocket + TimescaleDB',
      'Despliegue Kubernetes bare-metal',
    ],
    featuresEn: [
      'Server, players and power dashboard',
      'Reverb WebSocket + TimescaleDB',
      'Bare-metal Kubernetes deploy',
    ],
    active: true,
  },
  {
    q: 'Q3 2026',
    titleEs: 'Alertas & Logística',
    titleEn: 'Alerts & Logistics',
    featuresEs: [
      'Reglas de alerta por umbral configurables',
      'Mapa de trenes y drones en vivo',
      'Notificaciones Discord / Slack',
    ],
    featuresEn: [
      'Configurable threshold alert rules',
      'Live trains and drones map',
      'Discord / Slack notifications',
    ],
    active: false,
  },
  {
    q: 'Q4 2026',
    titleEs: 'Mobile Companion',
    titleEn: 'Mobile Companion',
    featuresEs: [
      'Sync con la app Android FICSIT Monitor',
      'Push notifications cross-device',
      'Versión iOS nativa',
    ],
    featuresEn: [
      'Sync with the Android FICSIT Monitor app',
      'Cross-device push notifications',
      'Native iOS version',
    ],
    active: false,
  },
  {
    q: 'Q1 2027',
    titleEs: '3D Factory View',
    titleEn: '3D Factory View',
    featuresEs: [
      'Mapa 3D interactivo del mundo',
      'Overlay de flujo de items',
      'Vista de zonas de producción',
    ],
    featuresEn: [
      'Interactive 3D world map',
      'Item flow overlay',
      'Production zone view',
    ],
    active: false,
  },
];

const T = {
  es: {
    eyebrow: 'Roadmap',
    title: 'Lo que viene en FICSIT.monitor',
    sub: 'El proyecto está en desarrollo activo. Así es como crece, trimestre a trimestre, y hacia dónde va a continuación.',
    now: 'Ahora',
    planned: 'Planificado',
  },
  en: {
    eyebrow: 'Roadmap',
    title: "What's coming to FICSIT.monitor",
    sub: 'The project is under active development. Here is how it grows, quarter by quarter, and where it is headed next.',
    now: 'Now',
    planned: 'Planned',
  },
} as const;

export function RoadmapSection() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={styles.section} aria-label="Roadmap">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.sub}>{t.sub}</p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.line} aria-hidden="true"></div>

          {QUARTERS.map((q) => (
            <div key={q.q} className={`${styles.item} ${q.active ? styles.itemActive : ''}`}>
              <div className={styles.node} aria-hidden="true">
                <span className={styles.nodeDot}></span>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.qLabel}>{q.q}</span>
                  {q.active && (
                    <span className={styles.nowBadge}>{t.now}</span>
                  )}
                </div>
                <h3 className={styles.cardTitle}>
                  {lang === 'es' ? q.titleEs : q.titleEn}
                </h3>
                <ul className={styles.featureList}>
                  {(lang === 'es' ? q.featuresEs : q.featuresEn).map((f) => (
                    <li key={f} className={styles.featureItem}>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {q.active ? 'radio_button_checked' : 'radio_button_unchecked'}
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
