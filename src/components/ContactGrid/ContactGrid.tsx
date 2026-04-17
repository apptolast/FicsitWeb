import { useLang } from '../../lib/i18n';
import styles from './ContactGrid.module.scss';

type ContactItem = {
  icon: string;
  labelEs: string;
  labelEn: string;
  href: string;
  external?: boolean;
};

const CONTACTS: ContactItem[] = [
  { icon: 'mail', labelEs: 'Email', labelEn: 'Email', href: 'mailto:pablohurtadohg@gmail.com' },
  { icon: 'forum', labelEs: 'Discord', labelEn: 'Discord', href: 'https://discord.gg/CPBCGnK5', external: true },
  { icon: 'share', labelEs: 'X/Twitter', labelEn: 'X/Twitter', href: 'https://x.com/FicsitMonitor', external: true },
  { icon: 'code', labelEs: 'GitHub', labelEn: 'GitHub', href: 'https://github.com/PabloHurtadoGonzalo86', external: true },
  { icon: 'photo_camera', labelEs: 'Instagram', labelEn: 'Instagram', href: 'https://www.instagram.com/ficsitmonitor', external: true },
  { icon: 'music_video', labelEs: 'TikTok', labelEn: 'TikTok', href: 'https://www.tiktok.com/@ficsitmonitor', external: true },
];

const T = {
  es: {
    eyebrow: 'Comunidad',
    title: 'Únete a la fábrica',
  },
  en: {
    eyebrow: 'Community',
    title: 'Join the factory',
  },
} as const;

export function ContactGrid() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={styles.section} aria-label="Contact channels">
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
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
