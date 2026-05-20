import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const ArrowSvg = () => (
  <svg className="arrow" viewBox="0 0 16 10" fill="none">
    <path d="M15 5H1M1 5l4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const BurgerIcon = ({ open }) =>
  open ? (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="4" y1="4" x2="18" y2="18" />
      <line x1="18" y1="4" x2="4" y2="18" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="6" x2="19" y2="6" />
      <line x1="3" y1="11" x2="19" y2="11" />
      <line x1="3" y1="16" x2="19" y2="16" />
    </svg>
  );

export default function Navbar() {
  const { t, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const headerClass = [
    'site-header',
    scrolled ? 'is-scrolled' : 'is-dark',
    menuOpen ? 'menu-open' : '',
  ].filter(Boolean).join(' ');

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/real-estate-liquidity', label: t.nav.realEstate },
    { href: '/cash', label: t.nav.cash },
    { href: '/waqf-services', label: t.nav.waqf },
    { href: '/government-employee', label: t.nav.gov },
  ];

  return (
    <>
      <header className={headerClass} id="siteHeader">
        <div className="container">
          <Link to="/" className="logo" aria-label={t.nav.logoAlt}>
            <img className="logo-img logo-light" src="/images/logo.png" alt={t.nav.logoAlt} />
            <img className="logo-img logo-dark" src="/images/logo-white.png" alt="" aria-hidden="true" />
          </Link>
          <nav className="nav" aria-label={t.nav.home}>
            {navLinks.map(({ href, label }) => (
              <NavLink
                key={href}
                to={href}
                end={href === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              >
                {label}
              </NavLink>
            ))}
            <button className="lang" onClick={toggleLang} aria-label="Switch language">
              {t.nav.langSwitch}
            </button>
            <Link to="/#lead" className={`header-cta${scrolled ? ' is-visible' : ''}`}>
              {t.nav.apply}
              <ArrowSvg />
            </Link>
          </nav>
          <button
            className="burger-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-drawer-nav">
          {navLinks.map(({ href, label }) => (
            <NavLink
              key={href}
              to={href}
              end={href === '/'}
              className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-drawer-footer">
          <button className="lang mobile-lang" onClick={() => { toggleLang(); setMenuOpen(false); }}>
            {t.nav.langSwitch}
          </button>
          <Link to="/#lead" className="btn btn-primary mobile-drawer-cta" onClick={() => setMenuOpen(false)}>
            {t.nav.apply}
            <ArrowSvg />
          </Link>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}
    </>
  );
}
