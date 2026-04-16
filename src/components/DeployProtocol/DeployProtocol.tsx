import { useLang } from '../../lib/i18n';
import styles from './DeployProtocol.module.scss';

const T = {
  es: {
    eyebrow: 'Protocolo de Despliegue',
    title: 'Operativo en 3 pasos',
    sub: 'Sin configuración compleja. Sin DevOps requerido. Tu servidor conectado en minutos.',
    steps: [
      {
        num: '01',
        title: 'Conecta',
        desc: 'Apunta FICSIT.monitor a tu servidor dedicado con la URL de Reverb y las credenciales de la sesión Laravel.',
        img: '/img/Conecta.webp',
        imgAlt: 'Server connection configuration screen',
      },
      {
        num: '02',
        title: 'Recolecta',
        desc: 'El backend Laravel con Horizon workers procesa y persiste métricas en TimescaleDB de forma continua y automática.',
        img: '/img/Recolecta.webp',
        imgAlt: 'Data collection and metrics pipeline visualization',
      },
      {
        num: '03',
        title: 'Alerta',
        desc: 'Recibe notificaciones instantáneas cuando una fábrica se detiene, la energía cae o los trenes se bloquean.',
        img: '/img/Alerta.webp',
        imgAlt: 'Alert notification panel showing factory events',
      },
    ],
  },
  en: {
    eyebrow: 'Deploy Protocol',
    title: 'Operational in 3 steps',
    sub: 'No complex configuration. No DevOps required. Your server connected in minutes.',
    steps: [
      {
        num: '01',
        title: 'Connect',
        desc: 'Point FICSIT.monitor at your dedicated server with the Reverb URL and Laravel session credentials.',
        img: '/img/Conecta.webp',
        imgAlt: 'Server connection configuration screen',
      },
      {
        num: '02',
        title: 'Collect',
        desc: 'The Laravel backend with Horizon workers processes and persists metrics in TimescaleDB continuously and automatically.',
        img: '/img/Recolecta.webp',
        imgAlt: 'Data collection and metrics pipeline visualization',
      },
      {
        num: '03',
        title: 'Alert',
        desc: 'Receive instant notifications when a factory stops, power drops, or trains get stuck.',
        img: '/img/Alerta.webp',
        imgAlt: 'Alert notification panel showing factory events',
      },
    ],
  },
} as const;

export function DeployProtocol() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={styles.section} aria-label="Deploy Protocol">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.sub}>{t.sub}</p>
        </div>

        <div className={styles.steps}>
          {t.steps.map((step) => (
            <div key={step.num} className={styles.step}>
              <div className={styles.stepNum}>
                <span>{step.num}</span>
              </div>
              <div className={styles.imgWrapper}>
                <img
                  src={step.img}
                  alt={step.imgAlt}
                  className={styles.stepImg}
                  width="400"
                  height="280"
                />
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
