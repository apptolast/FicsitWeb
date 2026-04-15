import { useState } from 'react';
import { Link } from 'react-router';
import { useLang } from '../../lib/i18n';
import styles from './PricingSection.module.scss';

const T = {
  es: {
    eyebrow: 'Precios',
    title: 'Sin sorpresas. Sin contratos.',
    sub: 'Empieza gratis y escala cuando tu factoría lo necesite.',
    monthly: 'Mensual',
    annual: 'Anual',
    annualSave: '-20%',
    mo: '/mes',
    recommended: 'Recomendado',
    freeTier: {
      name: 'Free Tier',
      price: '0',
      features: ['1 servidor', '7 días de historial', 'WebSocket básico', 'Soporte comunidad'],
      cta: 'Empezar gratis',
    },
    hobby: {
      name: 'Hobby',
      price: '4.99',
      priceAnnual: '3.99',
      features: ['3 servidores', '30 días de historial', 'Alertas básicas', 'Email soporte'],
      cta: 'Elegir Hobby',
    },
    industrial: {
      name: 'Industrial Pro',
      price: '12.99',
      priceAnnual: '10.39',
      features: ['10 servidores', '1 año de historial', 'Alertas avanzadas', 'API completa', 'Soporte prioritario'],
      cta: 'Elegir Industrial',
    },
    team: {
      name: 'Factory Team',
      price: '29.99',
      priceAnnual: '23.99',
      features: ['Servidores ilimitados', '5 años de historial', 'SSO + RBAC', 'SLA 99.9%', 'Soporte dedicado'],
      cta: 'Elegir Team',
    },
    enterprise: 'Instalación on-premise o requisitos enterprise personalizados',
    contactEnterprise: 'Contactar ventas',
  },
  en: {
    eyebrow: 'Pricing',
    title: 'No surprises. No contracts.',
    sub: 'Start free and scale when your factory demands it.',
    monthly: 'Monthly',
    annual: 'Annual',
    annualSave: '-20%',
    mo: '/mo',
    recommended: 'Recommended',
    freeTier: {
      name: 'Free Tier',
      price: '0',
      features: ['1 server', '7-day history', 'Basic WebSocket', 'Community support'],
      cta: 'Get started free',
    },
    hobby: {
      name: 'Hobby',
      price: '4.99',
      priceAnnual: '3.99',
      features: ['3 servers', '30-day history', 'Basic alerts', 'Email support'],
      cta: 'Choose Hobby',
    },
    industrial: {
      name: 'Industrial Pro',
      price: '12.99',
      priceAnnual: '10.39',
      features: ['10 servers', '1-year history', 'Advanced alerts', 'Full API', 'Priority support'],
      cta: 'Choose Industrial',
    },
    team: {
      name: 'Factory Team',
      price: '29.99',
      priceAnnual: '23.99',
      features: ['Unlimited servers', '5-year history', 'SSO + RBAC', '99.9% SLA', 'Dedicated support'],
      cta: 'Choose Team',
    },
    enterprise: 'On-premise installation or custom enterprise requirements',
    contactEnterprise: 'Contact sales',
  },
} as const;

export function PricingSection() {
  const { lang } = useLang();
  const t = T[lang];
  const [annual, setAnnual] = useState(false);

  return (
    <section className={styles.section} id="pricing" aria-label="Pricing">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.sub}>{t.sub}</p>

          <div className={styles.toggle} role="group" aria-label="Billing period">
            <button
              type="button"
              className={!annual ? styles.toggleActive : styles.toggleBtn}
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
            >
              {t.monthly}
            </button>
            <button
              type="button"
              className={annual ? styles.toggleActive : styles.toggleBtn}
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
            >
              {t.annual}
              <span className={styles.saveBadge}>{t.annualSave}</span>
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Free Tier */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.tier}>{t.freeTier.name}</span>
              <div className={styles.priceRow}>
                <span className={styles.price}>${t.freeTier.price}</span>
                <span className={styles.mo}>{t.mo}</span>
              </div>
            </div>
            <ul className={styles.features}>
              {t.freeTier.features.map((f) => (
                <li key={f} className={styles.feature}>
                  <span className="material-symbols-outlined" aria-hidden="true">check</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/dashboard" className={styles.cardCta}>{t.freeTier.cta}</Link>
          </div>

          {/* Hobby */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.tier}>{t.hobby.name}</span>
              <div className={styles.priceRow}>
                <span className={styles.price}>
                  ${annual ? t.hobby.priceAnnual : t.hobby.price}
                </span>
                <span className={styles.mo}>{t.mo}</span>
              </div>
            </div>
            <ul className={styles.features}>
              {t.hobby.features.map((f) => (
                <li key={f} className={styles.feature}>
                  <span className="material-symbols-outlined" aria-hidden="true">check</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/dashboard" className={styles.cardCta}>{t.hobby.cta}</Link>
          </div>

          {/* Industrial Pro — featured */}
          <div className={`${styles.card} ${styles.cardFeatured}`}>
            <span className={styles.recommendedBadge}>{t.recommended}</span>
            <div className={styles.cardHeader}>
              <span className={styles.tier}>{t.industrial.name}</span>
              <div className={styles.priceRow}>
                <span className={styles.price}>
                  ${annual ? t.industrial.priceAnnual : t.industrial.price}
                </span>
                <span className={styles.mo}>{t.mo}</span>
              </div>
            </div>
            <ul className={styles.features}>
              {t.industrial.features.map((f) => (
                <li key={f} className={styles.feature}>
                  <span className="material-symbols-outlined" aria-hidden="true">check</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/dashboard" className={styles.cardCtaFeatured}>{t.industrial.cta}</Link>
          </div>

          {/* Factory Team */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.tier}>{t.team.name}</span>
              <div className={styles.priceRow}>
                <span className={styles.price}>
                  ${annual ? t.team.priceAnnual : t.team.price}
                </span>
                <span className={styles.mo}>{t.mo}</span>
              </div>
            </div>
            <ul className={styles.features}>
              {t.team.features.map((f) => (
                <li key={f} className={styles.feature}>
                  <span className="material-symbols-outlined" aria-hidden="true">check</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/dashboard" className={styles.cardCta}>{t.team.cta}</Link>
          </div>
        </div>

        <div className={styles.enterprise}>
          <p className={styles.enterpriseText}>{t.enterprise}</p>
          <a href="#contact" className={styles.enterpriseCta}>{t.contactEnterprise}</a>
        </div>
      </div>
    </section>
  );
}
