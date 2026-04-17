import { useLang } from '../../lib/i18n';
import styles from './DeployProtocol.module.scss';

const T = {
  es: {
    eyebrow: 'Protocolo de Despliegue',
    title: 'Operativo en 3 pasos',
    sub: 'Sin APIs vanilla que llamar ni dashboards que construir. Conecta tu servidor dedicado y empieza a ver datos en minutos.',
    steps: [
      {
        num: '01',
        title: 'Conecta',
        desc: 'Instala el mod FicsitRemoteMonitoring en tu servidor dedicado de Satisfactory y apunta FICSIT.monitor al backend Laravel + Reverb con la sesión autenticada.',
        img: '/img/Conecta.webp',
        imgAlt: 'Server connection configuration screen',
      },
      {
        num: '02',
        title: 'Recolecta',
        desc: 'Laravel Horizon sondea el FRM, procesa los datos con reglas de negocio y los persiste en TimescaleDB. Cero configuración extra por tu parte.',
        img: '/img/Recolecta.webp',
        imgAlt: 'Data collection and metrics pipeline visualization',
      },
      {
        num: '03',
        title: 'Alerta',
        desc: 'Reverb difunde cambios al dashboard en tiempo real y dispara notificaciones cuando una fábrica se detiene, la energía cae o los trenes se bloquean.',
        img: '/img/Alerta.webp',
        imgAlt: 'Alert notification panel showing factory events',
      },
    ],
  },
  en: {
    eyebrow: 'Deploy Protocol',
    title: 'Operational in 3 steps',
    sub: "No vanilla APIs to poke at, no dashboards to build. Connect your dedicated server and start seeing data in minutes.",
    steps: [
      {
        num: '01',
        title: 'Connect',
        desc: 'Install the FicsitRemoteMonitoring mod on your dedicated Satisfactory server and point FICSIT.monitor at the Laravel + Reverb backend with the authenticated session.',
        img: '/img/Conecta.webp',
        imgAlt: 'Server connection configuration screen',
      },
      {
        num: '02',
        title: 'Collect',
        desc: 'Laravel Horizon polls the FRM mod, processes the data with business rules, and persists it in TimescaleDB. Zero extra configuration on your side.',
        img: '/img/Recolecta.webp',
        imgAlt: 'Data collection and metrics pipeline visualization',
      },
      {
        num: '03',
        title: 'Alert',
        desc: 'Reverb broadcasts changes to the dashboard in real time and fires notifications when a factory stops, power drops, or trains get stuck.',
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
