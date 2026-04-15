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
    q: 'Q1 2026',
    titleEs: '3D Factory View',
    titleEn: '3D Factory View',
    featuresEs: ['Mapa 3D interactivo', 'Overlay de flujo de items', 'Vista de zonas de producción'],
    featuresEn: ['Interactive 3D map', 'Item flow overlay', 'Production zone view'],
    active: true,
  },
  {
    q: 'Q2 2026',
    titleEs: 'AI Forecaster',
    titleEn: 'AI Forecaster',
    featuresEs: ['Predicción de cuellos de botella', 'Alertas proactivas de ML', 'Sugerencias de optimización'],
    featuresEn: ['Bottleneck prediction', 'ML proactive alerts', 'Optimization suggestions'],
    active: false,
  },
  {
    q: 'Q3 2026',
    titleEs: 'Mobile App Native',
    titleEn: 'Mobile App Native',
    featuresEs: ['iOS y Android nativos', 'Push notifications', 'Widget de pantalla de inicio'],
    featuresEn: ['Native iOS and Android', 'Push notifications', 'Home screen widget'],
    active: false,
  },
  {
    q: 'Q4 2026',
    titleEs: 'Marketplace Tools',
    titleEn: 'Marketplace Tools',
    featuresEs: ['Plugins de comunidad', 'Temas personalizados', 'Dashboards compartibles'],
    featuresEn: ['Community plugins', 'Custom themes', 'Shareable dashboards'],
    active: false,
  },
];

const T = {
  es: {
    eyebrow: 'Roadmap',
    title: 'El futuro de tu factoría',
    sub: 'Construyendo el dashboard más completo para Satisfactory, trimestre a trimestre.',
    now: 'Ahora',
    planned: 'Planificado',
  },
  en: {
    eyebrow: 'Roadmap',
    title: 'The future of your factory',
    sub: 'Building the most complete dashboard for Satisfactory, quarter by quarter.',
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
