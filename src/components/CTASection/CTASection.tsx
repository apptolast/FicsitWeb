import { useLang } from '../../lib/i18n';
import styles from './CTASection.module.scss';

const T = {
  es: {
    headline: '¿Listo para ver tu factoría en vivo?',
    sub: 'FICSIT.monitor es open source y está en desarrollo activo. Despliégalo tú en tu Kubernetes o espera a la versión gestionada — tú eliges.',
  },
  en: {
    headline: 'Ready to see your factory live?',
    sub: 'FICSIT.monitor is open source and under active development. Deploy it yourself on your Kubernetes cluster or wait for the managed version — your call.',
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
      </div>
    </section>
  );
}
