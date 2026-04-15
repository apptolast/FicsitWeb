import { Link } from 'react-router';
import { useLang } from '../../lib/i18n';
import styles from './SiteFooter.module.scss';

const T = {
  es: {
    tagline: 'Control industrial en tiempo real para servidores dedicados de Satisfactory.',
    copyright: '© 2026 App To Last. Todos los derechos reservados.',
    product: 'Producto',
    links: {
      features: 'Características',
      integrations: 'Integraciones',
      pricing: 'Precios',
    },
    resources: 'Recursos',
    resourcesLinks: {
      docs: 'Documentación',
      api: 'API Reference',
      blog: 'Blog',
    },
    company: 'Empresa',
    companyLinks: {
      privacy: 'Privacidad',
      terms: 'Términos',
      contact: 'Contacto',
    },
  },
  en: {
    tagline: 'Real-time industrial control for dedicated Satisfactory servers.',
    copyright: '© 2026 App To Last. All rights reserved.',
    product: 'Product',
    links: {
      features: 'Features',
      integrations: 'Integrations',
      pricing: 'Pricing',
    },
    resources: 'Resources',
    resourcesLinks: {
      docs: 'Documentation',
      api: 'API Reference',
      blog: 'Blog',
    },
    company: 'Company',
    companyLinks: {
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
    },
  },
} as const;

export function SiteFooter() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>FICSIT.monitor</Link>
          <p className={styles.tagline}>{t.tagline}</p>
          <p className={styles.copyright}>{t.copyright}</p>
        </div>

        <nav className={styles.col} aria-label="Product links">
          <span className={styles.colTitle}>{t.product}</span>
          <ul className={styles.linkList}>
            <li><a href="#features" className={styles.link}>{t.links.features}</a></li>
            <li><a href="#integrations" className={styles.link}>{t.links.integrations}</a></li>
            <li><a href="#pricing" className={styles.link}>{t.links.pricing}</a></li>
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Resources links">
          <span className={styles.colTitle}>{t.resources}</span>
          <ul className={styles.linkList}>
            <li><a href="#docs" className={styles.link}>{t.resourcesLinks.docs}</a></li>
            <li><a href="#api" className={styles.link}>{t.resourcesLinks.api}</a></li>
            <li><a href="#blog" className={styles.link}>{t.resourcesLinks.blog}</a></li>
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Company links">
          <span className={styles.colTitle}>{t.company}</span>
          <ul className={styles.linkList}>
            <li><a href="#privacy" className={styles.link}>{t.companyLinks.privacy}</a></li>
            <li><a href="#terms" className={styles.link}>{t.companyLinks.terms}</a></li>
            <li><a href="#contact" className={styles.link}>{t.companyLinks.contact}</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
