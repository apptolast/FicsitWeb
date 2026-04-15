import { useState, useEffect, startTransition } from 'react';
import { Link, useLocation } from 'react-router';
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
    openMenu: 'Abrir menú de navegación',
    closeMenu: 'Cerrar menú de navegación',
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
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
  },
} as const;

type TKey = keyof (typeof T)['es'];

const NAV_LINKS: Array<{ key: TKey; href: string }> = [
  { key: 'product', href: '#features' },
  { key: 'features', href: '#features' },
  { key: 'pricing', href: '#pricing' },
  { key: 'integrations', href: '#integrations' },
  { key: 'docs', href: '#docs' },
  { key: 'status', href: '#status' },
];

export function NavBar() {
  const { lang, setLang } = useLang();
  const t = T[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Cierra menú al cambiar de ruta
  useEffect(() => {
    startTransition(() => setIsMenuOpen(false));
  }, [location.pathname]);

  // Scroll lock + Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          FICSIT.monitor
        </Link>

        {/* Desktop links */}
        <div className={styles.links}>
          {NAV_LINKS.map(({ key, href }) => (
            <a key={key} href={href} className={styles.link}>
              {t[key]}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className={styles.actions}>
          <div className={styles.langSwitch} role="group" aria-label="Language selector">
            <button
              type="button"
              className={lang === 'es' ? styles.langActive : styles.langBtn}
              onClick={() => setLang('es')}
              aria-pressed={lang === 'es'}
            >
              ES
            </button>
            <span aria-hidden="true">|</span>
            <button
              type="button"
              className={lang === 'en' ? styles.langActive : styles.langBtn}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
          <Link to="/dashboard" className={styles.loginLink}>
            {t.login}
          </Link>
          <Link to="/dashboard" className={styles.ctaBtn}>
            {t.cta}
          </Link>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
        >
          <span
            className={`${styles.bar} ${isMenuOpen ? styles.bar1Open : ''}`}
          />
          <span
            className={`${styles.bar} ${isMenuOpen ? styles.bar2Open : ''}`}
          />
          <span
            className={`${styles.bar} ${isMenuOpen ? styles.bar3Open : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className={styles.mobileMenu}
          role="dialog"
          aria-modal="false"
          aria-label="Navigation menu"
        >
          <nav className={styles.mobileLinks} aria-label="Mobile navigation">
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className={styles.mobileLink}
                onClick={closeMenu}
              >
                {t[key]}
              </a>
            ))}
          </nav>

          <div className={styles.mobileDivider} aria-hidden="true" />

          <div className={styles.mobileActions}>
            <div
              className={styles.langSwitch}
              role="group"
              aria-label="Language selector"
            >
              <button
                type="button"
                className={lang === 'es' ? styles.langActive : styles.langBtn}
                onClick={() => setLang('es')}
                aria-pressed={lang === 'es'}
              >
                ES
              </button>
              <span aria-hidden="true">|</span>
              <button
                type="button"
                className={lang === 'en' ? styles.langActive : styles.langBtn}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
            </div>
            <Link
              to="/dashboard"
              className={styles.mobileLoginLink}
              onClick={closeMenu}
            >
              {t.login}
            </Link>
            <Link
              to="/dashboard"
              className={styles.mobileCtaBtn}
              onClick={closeMenu}
            >
              {t.cta}
            </Link>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className={styles.backdrop}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
