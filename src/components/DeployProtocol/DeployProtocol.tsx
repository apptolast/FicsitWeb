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
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkmq18lV6P1ebY2ZZ7QeSW5SfF4AlSP0IgobxcjoRmG4PhzlQxt4-VQR1J_cIZY5cLGZTGWs-z749s2Nyj0TJqdUmRUT2bAFoBxDwJcHkvr5sSpECYvJEzlLbAnpppSTbDIkPr8sISB_vo9DYOQvO9ljWtR8SlffmihrLJUAgRsQD1n1B7roACHDZMPpFOEjXyOD1LQKzDqVNHscWWlux7CGCgzKApjguq--RkSdRF7MUIDThFzDgTE34xg7HrZLCVna-hxqqb9hi-',
        imgAlt: 'Server connection configuration screen',
      },
      {
        num: '02',
        title: 'Recolecta',
        desc: 'El backend Laravel con Horizon workers procesa y persiste métricas en TimescaleDB de forma continua y automática.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Uzp0HXE-2A7PGIUUyGA2NpaW8rRHEcNw2I6cY3VtG27zBy9P7BPfrILNSbbiK_84WmAZvwiSrnPYEb1SFSq1qS55DZc5IMUYVu7FnvsEwqioLLaRTeWSoDHVZcPDeSQuJj3S66FzaAq_MLWw3bC10bTdwDaeFlCQRCX9qhZYRaTl3K1Z0jPyNqI3cWrN0XK2v0CiMUqxKhSFzjQpDxj9XKF4J7xCXGQuaN1qpxvIqLa4XAIMvHZ6FmxjZd9N9dNq6H-2hSISyo3Q',
        imgAlt: 'Data collection and metrics pipeline visualization',
      },
      {
        num: '03',
        title: 'Alerta',
        desc: 'Recibe notificaciones instantáneas cuando una fábrica se detiene, la energía cae o los trenes se bloquean.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmQC07-v7-_Uc8QWEhoKQhU2euG1HEHdXVvIYUy811HqG7SJLLPyKydCV2ibl5HoedRcrBZelSvbolgBLOeJCMd4xffLpmIXNsR5E3sFpRzhkNvzAZSbxXlYYMw302guz8de2DTJmBFmIoIMjVK8C4v7xoAi6QNgCYvSKs2KlR0LOrtwyPf61xyKZuj4cRVVPpZtIJ6b8Mh670MoIOTtT7mvQKqmgRm10tkijUiAwAGa5noedhOhTyrZX12Reb8ywtf1SAI15SR3rG',
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
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkmq18lV6P1ebY2ZZ7QeSW5SfF4AlSP0IgobxcjoRmG4PhzlQxt4-VQR1J_cIZY5cLGZTGWs-z749s2Nyj0TJqdUmRUT2bAFoBxDwJcHkvr5sSpECYvJEzlLbAnpppSTbDIkPr8sISB_vo9DYOQvO9ljWtR8SlffmihrLJUAgRsQD1n1B7roACHDZMPpFOEjXyOD1LQKzDqVNHscWWlux7CGCgzKApjguq--RkSdRF7MUIDThFzDgTE34xg7HrZLCVna-hxqqb9hi-',
        imgAlt: 'Server connection configuration screen',
      },
      {
        num: '02',
        title: 'Collect',
        desc: 'The Laravel backend with Horizon workers processes and persists metrics in TimescaleDB continuously and automatically.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Uzp0HXE-2A7PGIUUyGA2NpaW8rRHEcNw2I6cY3VtG27zBy9P7BPfrILNSbbiK_84WmAZvwiSrnPYEb1SFSq1qS55DZc5IMUYVu7FnvsEwqioLLaRTeWSoDHVZcPDeSQuJj3S66FzaAq_MLWw3bC10bTdwDaeFlCQRCX9qhZYRaTl3K1Z0jPyNqI3cWrN0XK2v0CiMUqxKhSFzjQpDxj9XKF4J7xCXGQuaN1qpxvIqLa4XAIMvHZ6FmxjZd9N9dNq6H-2hSISyo3Q',
        imgAlt: 'Data collection and metrics pipeline visualization',
      },
      {
        num: '03',
        title: 'Alert',
        desc: 'Receive instant notifications when a factory stops, power drops, or trains get stuck.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmQC07-v7-_Uc8QWEhoKQhU2euG1HEHdXVvIYUy811HqG7SJLLPyKydCV2ibl5HoedRcrBZelSvbolgBLOeJCMd4xffLpmIXNsR5E3sFpRzhkNvzAZSbxXlYYMw302guz8de2DTJmBFmIoIMjVK8C4v7xoAi6QNgCYvSKs2KlR0LOrtwyPf61xyKZuj4cRVVPpZtIJ6b8Mh670MoIOTtT7mvQKqmgRm10tkijUiAwAGa5noedhOhTyrZX12Reb8ywtf1SAI15SR3rG',
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
