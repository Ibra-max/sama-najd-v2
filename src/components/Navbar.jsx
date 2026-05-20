import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const ArrowSvg = () => (
  <svg className="arrow" viewBox="0 0 16 10" fill="none">
    <path d="M15 5H1M1 5l4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export default function Navbar() {
  const { t, toggleLang } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = location.pathname === '/';
  const headerClass = [
    'site-header',
    scrolled ? 'is-scrolled' : isHome ? 'is-dark' : 'is-light',
  ].join(' ');

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/real-estate-liquidity', label: t.nav.realEstate },
    { href: '/cash', label: t.nav.cash },
    { href: '/waqf-services', label: t.nav.waqf },
    { href: '/government-employee', label: t.nav.gov },
  ];

  return (
    <header className={headerClass} id="siteHeader">
      <div className="container">
        <Link to="/" className="logo" aria-label={t.nav.logoAlt}>
          <img className="logo-img logo-light" src="/images/logo.png" alt={t.nav.logoAlt} />
          <img className="logo-img logo-dark" src="/images/logo-white.png" alt="" aria-hidden="true" />
        </Link>
        <nav className="nav" aria-label={t.nav.home}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} to={href} className="nav-link">
              {label}
            </Link>
          ))}
          <button className="lang" onClick={toggleLang} aria-label="Switch language">
            {t.nav.langSwitch}
          </button>
          <Link to="/#lead" className={`header-cta${scrolled ? ' is-visible' : ''}`}>
            {t.nav.apply}
            <ArrowSvg />
          </Link>
        </nav>
      </div>
    </header>
  );
}
