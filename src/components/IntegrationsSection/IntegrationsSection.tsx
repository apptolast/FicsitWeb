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
  { icon: 'webhook', nameEs: 'Webhooks', nameEn: 'Webhooks' },
  { icon: 'code', nameEs: 'GitHub', nameEn: 'GitHub' },
  { icon: 'terminal', nameEs: 'REST /v1', nameEn: 'REST /v1' },
  { icon: 'hub', nameEs: 'Kubernetes', nameEn: 'Kubernetes' },
];

const T = {
  es: {
    eyebrow: 'Integraciones',
    title: 'Enchufa FICSIT.monitor a tu stack',
    sub: 'Notificaciones en Discord y Slack, webhooks a medida, código abierto en GitHub, API REST /v1 versionada, y despliegue nativo en Kubernetes con Longhorn, MetalLB y Traefik.',
    connect: 'Contactar',
  },
  en: {
    eyebrow: 'Integrations',
    title: 'Plug FICSIT.monitor into your stack',
    sub: 'Discord and Slack notifications, custom webhooks, open source on GitHub, a versioned REST /v1 API, and native Kubernetes deployment with Longhorn, MetalLB and Traefik.',
    connect: 'Contact us',
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
