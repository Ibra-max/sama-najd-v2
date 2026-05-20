import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { trackWhatsAppClick } from '../utils/tracking';

const WA_URL = 'https://wa.me/966550650034';

const IMAGE_MAP = {
  cash: 'cash',
  'government-employee': 'government-employee',
  'waqf-services': 'waqf-services',
  'real-estate-liquidity': 'real-estate-liquidity',
};

const ArrowSvg = () => (
  <svg className="arrow" viewBox="0 0 16 10" fill="none">
    <path d="M15 5H1M1 5l4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export default function SubHero({ pageId, heroKey, serviceData }) {
  const { lang, t } = useLanguage();
  const heroT = t.hero[heroKey];
  const base = IMAGE_MAP[pageId];

  const getDesktopImage = () => {
    // waqf-services: mirror in AR (not EN) — image composition requires opposite orientation
    // real-estate-liquidity: never mirror
    // all others: mirror in EN
    let mirrored = false;
    if (pageId === 'waqf-services') mirrored = lang === 'ar';
    else if (pageId !== 'real-estate-liquidity') mirrored = lang === 'en';
    return `/images/${base}_desc${mirrored ? '_mirrored' : ''}.png`;
  };
  const getMobileImage = () => `/images/${base}_mobil.png`;

  const meta = serviceData.meta[lang];

  return (
    <section className="sub-hero">
      <div className="hero-photo">
        <picture key={getDesktopImage()}>
          <source media="(max-width: 767px)" srcSet={getMobileImage()} />
          <img
            key={getDesktopImage()}
            src={getDesktopImage()}
            alt={heroT.imageAlt}
            loading="eager"
          />
        </picture>
      </div>

      <div className="container">
        <div style={{ maxWidth: 660, position: 'relative', zIndex: 2 }}>
          <div className="crumbs">
            <Link to="/">{t.subPage.breadcrumb}</Link>
            <span aria-hidden="true">/</span>
            <span>{heroT.eyebrow.replace(/^\d+\s*[—–-]+\s*/, '')}</span>
          </div>

          <div className="hero-eyebrow eyebrow on-dark" data-reveal>
            <span className="num">{heroT.eyebrow}</span>
          </div>
          <h1 data-reveal style={{ '--delay': '80ms' }}>
            {heroT.headline.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>
          <p className="lede on-dark" data-reveal style={{ '--delay': '160ms' }}>
            {heroT.subheadline}
          </p>

          <div className="hero-ctas" data-reveal style={{ '--delay': '240ms' }}>
            <a href="#lead" className="btn btn-primary">
              {t.hero.ctaPrimary}
              <ArrowSvg />
            </a>
            <a href={WA_URL} className="btn btn-ghost" target="_blank" rel="noopener" onClick={trackWhatsAppClick}>
              {t.subPage.ctaWhatsapp}
            </a>
          </div>

          <div className="sub-hero-meta">
            {meta.map((m, i) => (
              <div key={i} className="item" data-reveal style={{ '--delay': `${300 + i * 80}ms` }}>
                <div className="k">{m.k}</div>
                <div className="v">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
