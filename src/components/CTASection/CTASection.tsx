import { Link } from 'react-router';
import { useLang } from '../../lib/i18n';
import styles from './CTASection.module.scss';

const T = {
  es: {
    headline: '¿Listo para controlar tu factoría?',
    sub: 'Únete a miles de administradores que ya monitorizan sus servidores de Satisfactory en tiempo real con FICSIT.monitor.',
    cta1: 'Empezar gratis — sin tarjeta',
    cta2: 'Ver demo en vivo',
  },
  en: {
    headline: 'Ready to control your factory?',
    sub: 'Join thousands of admins already monitoring their Satisfactory servers in real time with FICSIT.monitor.',
    cta1: 'Get started free — no card needed',
    cta2: 'See live demo',
  },
} as const;

export function CTASection() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={styles.section} aria-label="Call to action">
      <div className={styles.glow} aria-hidden="true"></div>
      <div className={styles.inner}>
        <h2 className={styles.headline}>{t.headline}</h2>
        <p className={styles.sub}>{t.sub}</p>
        <div className={styles.ctas}>
          <Link to="/dashboard" className={styles.ctaPrimary}>{t.cta1}</Link>
          <button type="button" className={styles.ctaSecondary}>{t.cta2}</button>
        </div>
      </div>
    </section>
  );
}
