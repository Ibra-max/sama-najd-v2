import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const PHONE_INTL = '+966550650034';

const ArrowSvg = () => (
  <svg className="arrow" viewBox="0 0 16 10" fill="none">
    <path d="M15 5H1M1 5l4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export default function StickyCtaMobile() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`mobile-cta-bar${visible ? ' is-visible' : ''}`}>
      <a href={`tel:${PHONE_INTL}`} className="btn btn-ghost" aria-label={t.footer.contact}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M3 3.5a1.5 1.5 0 0 1 1.5-1.5h1.7c.6 0 1.1.4 1.3 1l.6 2c.2.6-.1 1.3-.6 1.6L6.4 7.4a8 8 0 0 0 2.2 2.2l.8-1.1c.3-.5 1-.8 1.6-.6l2 .6c.6.2 1 .7 1 1.3v1.7a1.5 1.5 0 0 1-1.5 1.5C7.6 13 3 8.4 3 3.5Z" />
        </svg>
      </a>
      <a href="#lead" className="btn btn-primary">
        {t.nav.apply}
        <ArrowSvg />
      </a>
    </div>
  );
}
