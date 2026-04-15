import { useLang } from '../../lib/i18n';
import styles from './IntegrationsSection.module.scss';

type Integration = {
  icon: string;
  nameEs: string;
  nameEn: string;
};

const INTEGRATIONS: Integration[] = [
  { icon: 'forum', nameEs: 'Discord', nameEn: 'Discord' },
  { icon: 'chat', nameEs: 'Slack', nameEn: 'Slack' },
  { icon: 'terminal', nameEs: 'Terminal', nameEn: 'Terminal' },
  { icon: 'hub', nameEs: 'Hub', nameEn: 'Hub' },
  { icon: 'cloud', nameEs: 'Cloud', nameEn: 'Cloud' },
  { icon: 'analytics', nameEs: 'Analytics', nameEn: 'Analytics' },
];

const T = {
  es: {
    eyebrow: 'Integraciones',
    title: 'Conecta con las herramientas que ya usas',
    sub: 'FICSIT.monitor se integra con tu stack actual. Notificaciones en Discord, alertas en Slack, webhooks a medida, y API REST completa para automatizaciones propias.',
    connect: 'Conectar ahora',
  },
  en: {
    eyebrow: 'Integrations',
    title: 'Connect with the tools you already use',
    sub: 'FICSIT.monitor integrates with your current stack. Discord notifications, Slack alerts, custom webhooks, and a full REST API for your own automations.',
    connect: 'Connect now',
  },
} as const;

export function IntegrationsSection() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={styles.section} id="integrations" aria-label="Integrations">
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.sub}>{t.sub}</p>
          <a href="#contact" className={styles.cta}>{t.connect}</a>
        </div>

        <div className={styles.right}>
          <div className={styles.grid}>
            {INTEGRATIONS.map((integration) => (
              <div key={integration.icon} className={styles.item} aria-label={lang === 'es' ? integration.nameEs : integration.nameEn}>
                <span className={`material-symbols-outlined ${styles.icon}`} aria-hidden="true">
                  {integration.icon}
                </span>
                <span className={styles.name}>
                  {lang === 'es' ? integration.nameEs : integration.nameEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
