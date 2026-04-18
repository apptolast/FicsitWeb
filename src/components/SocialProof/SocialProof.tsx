import { useLang } from '../../lib/i18n';
import styles from './SocialProof.module.scss';

const T = {
  es: {
    trusted: 'Construido con tecnología industrial y production-grade',
    servers: 'Software propietario · Licencia SaaS · En desarrollo activo',
  },
  en: {
    trusted: 'Built with industrial, production-grade tech',
    servers: 'Proprietary Software · SaaS Licensed · Actively developed',
  },
} as const;

type Company = {
  name: string;
};

const COMPANIES: Company[] = [
  { name: 'LARAVEL 12' },
  { name: 'REACT 19' },
  { name: 'TYPESCRIPT' },
  { name: 'KUBERNETES' },
  { name: 'TIMESCALEDB' },
  { name: 'REDIS' },
];

export function SocialProof() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={styles.section} aria-label="Tech stack">
      <div className={styles.inner}>
        <p className={styles.label}>{t.trusted}</p>

        <div className={styles.logos}>
          {COMPANIES.map((c) => (
            <div key={c.name} className={styles.logo} aria-label={c.name}>
              <span className={styles.logoText}>{c.name}</span>
            </div>
          ))}
        </div>

        <div className={styles.counter}>
          <span className="material-symbols-outlined" aria-hidden="true">code</span>
          <span className={styles.counterNum}>{t.servers}</span>
        </div>
      </div>
    </section>
  );
}
