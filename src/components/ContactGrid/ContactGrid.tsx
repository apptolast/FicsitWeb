import { useLang } from '../../lib/i18n';
import styles from './ContactGrid.module.scss';

type ContactItem = {
  icon: string;
  labelEs: string;
  labelEn: string;
  href: string;
};

const CONTACTS: ContactItem[] = [
  { icon: 'mail', labelEs: 'Email', labelEn: 'Email', href: 'mailto:hello@ficsitmonitor.com' },
  { icon: 'forum', labelEs: 'Discord', labelEn: 'Discord', href: '#discord' },
  { icon: 'share', labelEs: 'X/Twitter', labelEn: 'X/Twitter', href: '#twitter' },
  { icon: 'code', labelEs: 'GitHub', labelEn: 'GitHub', href: '#github' },
  { icon: 'live_tv', labelEs: 'Twitch', labelEn: 'Twitch', href: '#twitch' },
  { icon: 'support_agent', labelEs: 'Soporte', labelEn: 'Support', href: '#support' },
];

const T = {
  es: {
    eyebrow: 'Contacto',
    title: 'Siempre conectados',
  },
  en: {
    eyebrow: 'Contact',
    title: 'Always connected',
  },
} as const;

export function ContactGrid() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={styles.section} id="contact" aria-label="Contact">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.title}>{t.title}</h2>
        </div>

        <div className={styles.grid}>
          {CONTACTS.map((c) => (
            <a
              key={c.icon}
              href={c.href}
              className={styles.item}
              aria-label={lang === 'es' ? c.labelEs : c.labelEn}
            >
              <span className={`material-symbols-outlined ${styles.icon}`} aria-hidden="true">
                {c.icon}
              </span>
              <span className={styles.label}>
                {lang === 'es' ? c.labelEs : c.labelEn}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
