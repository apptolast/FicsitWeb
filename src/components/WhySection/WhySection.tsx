import { useLang } from '../../lib/i18n';
import styles from './WhySection.module.scss';

const T = {
  es: {
    title: '¿Por qué FicsitOps?',
    para: 'La mayoría de los administradores de servidores dependen de APIs vanilla con latencia impredecible y sin alertas proactivas. FicsitOps cambia eso: infraestructura de monitoreo de nivel industrial, lista para producción desde el día uno.',
    vanilla: 'API Vainilla',
    ficsit: 'FicsitOps Cloud',
    items: [
      { bad: 'Polling manual con latencia >2s', good: 'WebSocket en tiempo real <200ms' },
      { bad: 'Sin alertas proactivas', good: 'Alertas configurables por umbral' },
      { bad: 'Datos volátiles en memoria', good: 'TimescaleDB con historial completo' },
      { bad: 'Dashboard básico sin gráficas', good: 'Visualización avanzada con ApexCharts' },
    ],
    latencyLabel: 'Latencia Global',
    latencySub: 'promedio websocket',
    uptimeLabel: 'Cloud Uptime',
    uptimeSub: 'garantía SLA',
  },
  en: {
    title: 'Why FicsitOps?',
    para: 'Most server admins rely on vanilla APIs with unpredictable latency and no proactive alerts. FicsitOps changes that: industrial-grade monitoring infrastructure, production-ready from day one.',
    vanilla: 'Vanilla API',
    ficsit: 'FicsitOps Cloud',
    items: [
      { bad: 'Manual polling with >2s latency', good: 'Real-time WebSocket <200ms' },
      { bad: 'No proactive alerts', good: 'Configurable threshold alerts' },
      { bad: 'Volatile in-memory data', good: 'TimescaleDB with full history' },
      { bad: 'Basic dashboard without charts', good: 'Advanced visualization with ApexCharts' },
    ],
    latencyLabel: 'Global Latency',
    latencySub: 'avg websocket',
    uptimeLabel: 'Cloud Uptime',
    uptimeSub: 'SLA guarantee',
  },
} as const;

export function WhySection() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={styles.section} id="features" aria-label="Why FicsitOps">
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.para}>{t.para}</p>

          <div className={styles.comparison}>
            <div className={styles.colHeader}>
              <div className={styles.colBad}>
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
                {t.vanilla}
              </div>
              <div className={styles.colGood}>
                <span className="material-symbols-outlined" aria-hidden="true">check</span>
                {t.ficsit}
              </div>
            </div>

            {t.items.map((item, i) => (
              <div key={i} className={styles.row}>
                <div className={styles.badItem}>
                  <span className={styles.iconBad} aria-hidden="true">
                    <span className="material-symbols-outlined">close</span>
                  </span>
                  {item.bad}
                </div>
                <div className={styles.goodItem}>
                  <span className={styles.iconGood} aria-hidden="true">
                    <span className="material-symbols-outlined">check_circle</span>
                  </span>
                  {item.good}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.statCard}>
            <div className={styles.statNum} style={{ color: 'var(--secondary)' }}>0.2s</div>
            <div className={styles.statLabel}>{t.latencyLabel}</div>
            <div className={styles.statSub}>{t.latencySub}</div>
          </div>

          <div className={styles.statCard} style={{ borderColor: 'rgba(249, 115, 22, 0.3)', background: 'rgba(249, 115, 22, 0.05)' }}>
            <div className={styles.statNum} style={{ color: 'var(--primary-container)' }}>100%</div>
            <div className={styles.statLabel}>{t.uptimeLabel}</div>
            <div className={styles.statSub}>{t.uptimeSub}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
