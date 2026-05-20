import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const IMAGE_MAP = {
  home: 'hero',
  cash: 'cash',
  gov: 'government-employee',
  waqf: 'waqf-services',
  liquidity: 'real-estate-liquidity',
};

const ArrowSvg = () => (
  <svg className="arrow" viewBox="0 0 16 10" fill="none">
    <path d="M15 5H1M1 5l4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export default function Hero({ page = 'home' }) {
  const { lang, t } = useLanguage();
  const heroT = t.hero[page];
  const base = IMAGE_MAP[page];

  const getDesktopImage = () => {
    if (page === 'liquidity') return `/images/${base}_desc.png`;
    return lang === 'ar'
      ? `/images/${base}_desc.png`
      : `/images/${base}_desc_mirrored.png`;
  };

  const getMobileImage = () => `/images/${base}_mobil.png`;

  return (
    <section className="hero" id="hero">
      <div className="hero-photo">
        <picture>
          <source media="(max-width: 767px)" srcSet={getMobileImage()} />
          <img
            src={getDesktopImage()}
            alt={heroT.imageAlt}
            loading="eager"
          />
        </picture>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-eyebrow eyebrow on-dark">
            <span className="num">{heroT.eyebrow}</span>
          </div>
          <h1 className="display-1" data-reveal>
            {heroT.headline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroT.headline.split('\n').length - 1 && <br />}</span>
            ))}
          </h1>
          <p className="lede on-dark" data-reveal style={{ '--delay': '120ms' }}>
            {heroT.subheadline}
          </p>
          <div className="hero-ctas" data-reveal style={{ '--delay': '240ms' }}>
            <Link to="/#lead" className="btn btn-primary">
              {heroT.ctaPrimary || t.hero.ctaPrimary}
              <ArrowSvg />
            </Link>
            <Link to="/#services" className="btn btn-ghost">
              {heroT.ctaSecondary || t.hero.scrollHint}
            </Link>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-line" />
        <span className="en">SCROLL</span>
      </div>
    </section>
  );
}
