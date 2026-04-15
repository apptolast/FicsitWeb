import { Link } from 'react-router';
import { useLang } from '../../lib/i18n';
import styles from './NavBar.module.scss';

const T = {
  es: {
    product: 'Producto',
    features: 'Funcionalidades',
    pricing: 'Precios',
    integrations: 'Integraciones',
    docs: 'Docs',
    status: 'Estado',
    login: 'Login',
    cta: 'Empezar gratis',
  },
  en: {
    product: 'Product',
    features: 'Features',
    pricing: 'Pricing',
    integrations: 'Integrations',
    docs: 'Docs',
    status: 'Status',
    login: 'Login',
    cta: 'Get started',
  },
} as const;

export function NavBar() {
  const { lang, setLang } = useLang();
  const t = T[lang];

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <Link to="/" className={styles.logo}>FICSIT.monitor</Link>

      <div className={styles.links}>
        <a href="#features" className={styles.linkActive}>{t.product}</a>
        <a href="#features">{t.features}</a>
        <a href="#pricing">{t.pricing}</a>
        <a href="#integrations">{t.integrations}</a>
        <a href="#docs">{t.docs}</a>
        <a href="#status">{t.status}</a>
      </div>

      <div className={styles.actions}>
        <div className={styles.langSwitch} role="group" aria-label="Language selector">
          <button
            type="button"
            className={lang === 'es' ? styles.langActive : styles.langBtn}
            onClick={() => setLang('es')}
            aria-pressed={lang === 'es'}
          >ES</button>
          <span aria-hidden="true">|</span>
          <button
            type="button"
            className={lang === 'en' ? styles.langActive : styles.langBtn}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
          >EN</button>
        </div>
        <Link to="/dashboard" className={styles.loginLink}>{t.login}</Link>
        <Link to="/dashboard" className={styles.ctaBtn}>{t.cta}</Link>
      </div>
    </nav>
  );
}
