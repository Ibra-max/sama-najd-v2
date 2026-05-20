import { useLanguage } from '../i18n/LanguageContext';

const PHONE_INTL = '+966550650034';

const ArrowSvg = () => (
  <svg className="arrow" viewBox="0 0 16 10" fill="none">
    <path d="M15 5H1M1 5l4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export default function CtaBlock() {
  const { t } = useLanguage();

  return (
    <section className="cta-block">
      <div className="container">
        <div className="cta-inner">
          <h2 data-reveal>
            {t.ctaBlock.headline.split('\n').map((line, i, arr) => (
              <span key={i}>
                {i === arr.length - 1
                  ? <span style={{ color: 'var(--accent)' }}>{line}</span>
                  : <>{line}<br /></>}
              </span>
            ))}
          </h2>
          <div className="actions" data-reveal style={{ '--delay': '120ms' }}>
            <a href="#lead" className="btn btn-primary">
              {t.ctaBlock.button}
              <ArrowSvg />
            </a>
            <a href={`tel:${PHONE_INTL}`} className="btn btn-ghost on-light">
              <span className="en num" dir="ltr">+966 55 065 0034</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
