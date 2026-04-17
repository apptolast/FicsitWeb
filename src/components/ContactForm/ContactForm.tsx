import { useState } from 'react';
import type { FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { useLang } from '../../lib/i18n';
import styles from './ContactForm.module.scss';

const T = {
  es: {
    eyebrow: 'Contacto',
    title: 'Hablemos de tu factoría',
    sub: '¿Tienes un cuello de botella técnico, una idea ambiciosa o un servidor dedicado de Satisfactory que quieras monitorizar a nivel industrial? Escríbenos.',
    name: 'Nombre completo',
    namePh: 'Tu nombre',
    email: 'Email',
    emailPh: 'nombre@empresa.com',
    challenge: 'Reto técnico',
    challengePh: 'Describe tu reto en al menos 20 caracteres…',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    success: 'Mensaje recibido. Te responderemos lo antes posible.',
    error: 'No se pudo enviar. Inténtalo de nuevo en unos minutos.',
    privacy: 'Tus datos solo se usan para responderte. No los compartimos con terceros.',
  },
  en: {
    eyebrow: 'Contact',
    title: "Let's talk strategy",
    sub: 'Have a technical bottleneck, an ambitious idea or a dedicated Satisfactory server you want to monitor at industrial level? Drop us a line.',
    name: 'Your full name',
    namePh: 'Your name',
    email: 'Email',
    emailPh: 'name@company.com',
    challenge: 'Tech challenge',
    challengePh: 'Describe your challenge in at least 20 characters…',
    send: 'Send message',
    sending: 'Sending…',
    success: "Message received. We'll get back to you as soon as possible.",
    error: 'Could not send. Please try again in a few minutes.',
    privacy: 'Your data is only used to reply to you. We never share it with third parties.',
  },
} as const;

type Status = 'idle' | 'sending' | 'success' | 'error';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function ContactForm() {
  const { lang } = useLang();
  const t = T[lang];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [challenge, setChallenge] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const isSending = status === 'sending';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSending) return;
    setStatus('sending');

    const templateParams = {
      from_name: name,
      from_email: email,
      message: challenge,
      reply_to: email,
    };

    try {
      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
          publicKey: PUBLIC_KEY,
        });
      } else {
        console.warn(
          '[ContactForm] EmailJS env vars missing — running mock send. ' +
            'Copy .env.example to .env.local and fill VITE_EMAILJS_* to enable real delivery.'
        );
        await new Promise((resolve) => setTimeout(resolve, 900));
      }
      setStatus('success');
      setName('');
      setEmail('');
      setChallenge('');
    } catch (err) {
      console.error('[ContactForm] send failed', err);
      setStatus('error');
    }
  }

  return (
    <section className={styles.section} id="contact" aria-label="Contact form">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.sub}>{t.sub}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="cf-name" className={styles.label}>
              {t.name}
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              className={styles.input}
              placeholder={t.namePh}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              autoComplete="name"
              disabled={isSending}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="cf-email" className={styles.label}>
              {t.email}
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              className={styles.input}
              placeholder={t.emailPh}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={isSending}
            />
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label htmlFor="cf-challenge" className={styles.label}>
              {t.challenge}
            </label>
            <textarea
              id="cf-challenge"
              name="challenge"
              className={styles.textarea}
              placeholder={t.challengePh}
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              required
              minLength={20}
              rows={5}
              disabled={isSending}
            />
          </div>

          <div className={styles.footer}>
            <p className={styles.privacy}>{t.privacy}</p>
            <button
              type="submit"
              className={styles.submit}
              disabled={isSending}
              aria-busy={isSending}
            >
              {isSending ? t.sending : t.send}
            </button>
          </div>

          {status === 'success' && (
            <p role="status" className={styles.success}>
              {t.success}
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className={styles.errorMsg}>
              {t.error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
