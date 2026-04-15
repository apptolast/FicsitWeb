import { useLang } from '../../lib/i18n';
import styles from './SocialProof.module.scss';

const T = {
  es: {
    trusted: 'Utilizado por equipos de toda la galaxia industrial',
    servers: '42.8k Servidores Activos',
  },
  en: {
    trusted: 'Trusted by teams across the industrial galaxy',
    servers: '42.8k Servers Active',
  },
} as const;

type Company = {
  name: string;
};

const COMPANIES: Company[] = [
  { name: 'LUMEN-CORP' },
  { name: 'STEEL-SYNC' },
  { name: 'HYPER-PIPE' },
  { name: 'FICSIT-HUB' },
  { name: 'IRON-NEXUS' },
  { name: 'VOLT-CHAIN' },
];

export function SocialProof() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={styles.section} aria-label="Social proof">
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
          <span className="material-symbols-outlined" aria-hidden="true">dns</span>
          <span className={styles.counterNum}>{t.servers}</span>
        </div>
      </div>
    </section>
  );
}
