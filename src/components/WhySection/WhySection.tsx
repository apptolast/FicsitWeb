import { useLang } from '../../lib/i18n';
import styles from './WhySection.module.scss';

const T = {
  es: {
    title: '¿Por qué FICSIT.monitor?',
    para: 'Administrar un servidor dedicado de Satisfactory suele ser una caja negra: no sabes si está vivo, quién está conectado ni cómo rinde la fábrica sin entrar al juego. FICSIT.monitor conecta el mod FicsitRemoteMonitoring con un backend Laravel + Reverb y te entrega un dashboard accesible desde cualquier dispositivo, con datos que cambian en vivo sin refrescar.',
    vanilla: 'FRM Mod en crudo',
    ficsit: 'FICSIT.monitor',
    items: [
      { bad: 'Polling manual al FRM con latencia >2s', good: 'Laravel Reverb WebSocket <200ms en vivo' },
      { bad: 'Sin alertas — revisas a ojo', good: 'Alertas configurables por umbral con historial' },
      { bad: 'Datos volátiles en memoria', good: 'TimescaleDB con series temporales completas' },
      { bad: 'Sin dashboard visual', good: 'ApexCharts + vistas interactivas por feature' },
    ],
    latencyLabel: 'Latencia WebSocket',
    latencySub: 'objetivo de diseño',
    uptimeLabel: 'Licencia',
    uptimeSub: 'MIT · self-hosted o gestionado',
  },
  en: {
    title: 'Why FICSIT.monitor?',
    para: 'Managing a dedicated Satisfactory server is usually a black box: you can\'t tell if it\'s alive, who is connected, or how the factory is performing without launching the game. FICSIT.monitor wires the FicsitRemoteMonitoring mod to a Laravel + Reverb backend and gives you a dashboard accessible from any device, with data that updates live without refreshing.',
    vanilla: 'Raw FRM mod',
    ficsit: 'FICSIT.monitor',
    items: [
      { bad: 'Manual FRM polling with >2s latency', good: 'Laravel Reverb WebSocket <200ms live' },
      { bad: 'No alerts — you eyeball it', good: 'Configurable threshold alerts with history' },
      { bad: 'Volatile in-memory data', good: 'TimescaleDB with full time-series history' },
      { bad: 'No visual dashboard', good: 'ApexCharts + interactive per-feature views' },
    ],
    latencyLabel: 'WebSocket latency',
    latencySub: 'design target',
    uptimeLabel: 'License',
    uptimeSub: 'MIT · self-hosted or managed',
  },
} as const;

export function WhySection() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={styles.section} id="features" aria-label="Why FICSIT.monitor">
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
            <div className={styles.statNum} style={{ color: 'var(--secondary)' }}>&lt;200ms</div>
            <div className={styles.statLabel}>{t.latencyLabel}</div>
            <div className={styles.statSub}>{t.latencySub}</div>
          </div>

          <div className={styles.statCard} style={{ borderColor: 'rgba(249, 115, 22, 0.3)', background: 'rgba(249, 115, 22, 0.05)' }}>
            <div className={styles.statNum} style={{ color: 'var(--primary-container)' }}>MIT</div>
            <div className={styles.statLabel}>{t.uptimeLabel}</div>
            <div className={styles.statSub}>{t.uptimeSub}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
