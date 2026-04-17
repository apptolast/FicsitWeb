import { useLang } from '../../lib/i18n';
import styles from './HeroSection.module.scss';

const T = {
  es: {
    badge: 'System Online · v1.0 alpha',
    headline1: 'Tu servidor dedicado de',
    headline2: 'en tiempo real.',
    sub: 'Dashboard de monitorización para servidores dedicados de Satisfactory desplegados sobre Kubernetes. Métricas de producción, jugadores, energía y alertas actualizadas en vivo — sin abrir el juego.',
  },
  en: {
    badge: 'System Online · v1.0 alpha',
    headline1: 'Your dedicated',
    headline2: 'server in real time.',
    sub: 'Monitoring dashboard for dedicated Satisfactory servers deployed on Kubernetes. Production metrics, player tracking, power draw and alerts updated live — without launching the game.',
  },
} as const;

export function HeroSection() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.ping} aria-hidden="true">
              <span className={styles.pingRing}></span>
              <span className={styles.pingDot}></span>
            </span>
            {t.badge}
          </div>

          <h1 className={styles.headline}>
            {t.headline1}{' '}
            <span className={styles.highlight}>Satisfactory</span>{' '}
            {t.headline2}
          </h1>

          <p className={styles.sub}>{t.sub}</p>

        </div>

        <div className={styles.preview} aria-hidden="true">
          <div className={styles.glowOrb}></div>
          <div className={styles.browserWindow}>
            <div className={styles.browserChrome}>
              <div className={styles.dot} style={{ background: 'var(--error)' }}></div>
              <div className={styles.dot} style={{ background: '#fbbf24' }}></div>
              <div className={styles.dot} style={{ background: 'var(--tertiary)' }}></div>
            </div>
            <img
              className={styles.dashImg}
              src="/img/PonerFicsitPrincipal.webp"
              alt="FICSIT.monitor dashboard showing power and production metrics"
              width="500"
              height="300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
