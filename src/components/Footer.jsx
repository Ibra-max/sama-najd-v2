import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const PHONE_INTL = '+966550650034';
const WA_URL = 'https://wa.me/966550650034';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div>
            <Link to="/" className="logo">
              <img className="logo-img logo-dark" src="/images/logo-white.png" alt={t.nav.logoAlt} style={{ display: 'block' }} />
            </Link>
            <p className="blurb">{t.footer.blurb}</p>
            <div className="socials" style={{ marginTop: 28 }}>
<a className="social-btn" href="#" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="2" width="12" height="12" rx="3" /><circle cx="8" cy="8" r="2.6" /><circle cx="11.5" cy="4.5" r=".6" fill="currentColor" /></svg>
              </a>
              <a className="social-btn" href="#" aria-label="Twitter X">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="m1.5 1.5 5 6.4-5 6.6h1.7l4.1-5.4 4.2 5.4h3l-5.3-6.8 4.8-6.2h-1.7L8.6 6.4 4.5 1.5h-3Z" /></svg>
              </a>
              <a className="social-btn" href="#" aria-label="Snapchat">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 1.5C5.5 1.5 4 3.5 4 6c0 1 .2 2.2-.2 2.8-.4.5-1.3.3-1.3.8 0 .5 1.4.6 1.7 1.2.2.6-.4 1.5-.4 1.5s2 .2 2.3.7c.3.6.7 1.5 1.9 1.5s1.6-.9 1.9-1.5c.3-.5 2.3-.7 2.3-.7s-.6-.9-.4-1.5c.3-.6 1.7-.7 1.7-1.2 0-.5-.9-.3-1.3-.8-.4-.6-.2-1.8-.2-2.8 0-2.5-1.5-4.5-4-4.5Z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4>{t.footer.services}</h4>
            <ul>
              <li><Link to="/real-estate-liquidity">{t.nav.realEstate}</Link></li>
              <li><Link to="/cash">{t.nav.cash}</Link></li>
              <li><Link to="/waqf-services">{t.nav.waqf}</Link></li>
              <li><Link to="/government-employee">{t.nav.gov}</Link></li>
              <li><a href="#lead">{t.services.items[4]?.title}</a></li>
            </ul>
          </div>

          <div>
            <h4>{t.footer.company}</h4>
            <ul>
              <li><a href="#">{t.footer.about}</a></li>
              <li><a href="#">{t.footer.partners}</a></li>
              <li><a href="#">{t.footer.privacy}</a></li>
              <li><a href="#">{t.footer.terms}</a></li>
            </ul>
          </div>

          <div>
            <h4>{t.footer.contact}</h4>
            <ul>
              <li><a href={`tel:${PHONE_INTL}`} className="num en" dir="ltr">+966 55 065 0034</a></li>
              <li><a href={WA_URL} className="en num" dir="ltr" target="_blank" rel="noopener">WhatsApp · 0550650034</a></li>
              <li><a href="mailto:info@samanajd.sa" className="en">info@samanajd.sa</a></li>
              <li><a href="#">{t.footer.location}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>{t.footer.rights}</div>
          <div>{t.footer.builtWith}</div>
        </div>

        <div className="footer-made">
          <a
            href="https://nest.aschuweiter.de"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-made-link"
            aria-label="Made with love by nest"
          >
            <span className="footer-made-text">made with</span>
            <svg className="footer-made-heart" viewBox="0 0 16 16" fill="currentColor" width="13" height="13" aria-hidden="true">
              <path d="M8 13.7C7.6 13.4 1 9.1 1 5a3.9 3.9 0 0 1 7-2.4A3.9 3.9 0 0 1 15 5c0 4.1-6.6 8.4-7 8.7Z"/>
            </svg>
            <img src="/nest.svg" alt="nest" className="footer-made-logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}
