import { Link } from 'react-router';
import { useLang } from '../../lib/i18n';
import styles from './HeroSection.module.scss';

const T = {
  es: {
    badge: 'System Online v4.0.2',
    headline1: 'Monitoriza tu mundo de',
    headline2: 'en tiempo real.',
    sub: 'Control total sobre tu producción industrial. Datos precisos, telemetría avanzada y alertas instantáneas integradas directamente en tu servidor.',
    cta1: 'Empezar gratis',
    cta2: 'Ver demo',
  },
  en: {
    badge: 'System Online v4.0.2',
    headline1: 'Monitor your',
    headline2: 'world in real time.',
    sub: 'Total control over your industrial production. Precise data, advanced telemetry, and instant alerts integrated directly into your server.',
    cta1: 'Get started',
    cta2: 'View demo',
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

          <div className={styles.ctas}>
            <Link to="/dashboard" className={styles.ctaPrimary}>{t.cta1}</Link>
            <button type="button" className={styles.ctaSecondary}>{t.cta2}</button>
          </div>
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
