import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const ArrowSvg = () => (
  <svg className="arrow" viewBox="0 0 16 10" fill="none">
    <path d="M15 5H1M1 5l4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const icons = [
  <svg viewBox="0 0 48 48" fill="none"><path d="M8 22L24 10l16 12v18H8V22Z" stroke="currentColor" strokeWidth="1.6"/><path d="M19 40V28h10v12" stroke="currentColor" strokeWidth="1.6"/><circle cx="24" cy="33" r="1.4" fill="currentColor"/></svg>,
  <svg viewBox="0 0 48 48" fill="none"><rect x="6" y="14" width="36" height="22" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><circle cx="24" cy="25" r="5" stroke="currentColor" strokeWidth="1.6"/><path d="M11 19v12M37 19v12" stroke="currentColor" strokeWidth="1.6"/></svg>,
  <svg viewBox="0 0 48 48" fill="none"><rect x="10" y="8" width="28" height="32" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M16 18h16M16 24h16M16 30h10" stroke="currentColor" strokeWidth="1.6"/><path d="M30 36l4 4 8-9" stroke="currentColor" strokeWidth="1.8"/></svg>,
  <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="18" r="7" stroke="currentColor" strokeWidth="1.6"/><path d="M8 40c1-8 8-12 16-12s15 4 16 12" stroke="currentColor" strokeWidth="1.6"/></svg>,
  <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.6"/><path d="M19 19a5 5 0 1 1 6 5v3M24 31v.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section className="services section-pad" id="services">
      <div className="container">
        <div className="section-head">
          <div data-reveal>
            <div className="label">
              <span className="num-tag num">02 / SERVICES</span>
            </div>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              {t.services.sectionTitle.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
          </div>
          <p className="lede" data-reveal style={{ '--delay': '120ms' }}>
            {t.services.sectionDesc}
          </p>
        </div>

        <div className="services-grid">
          {t.services.items.map((item, i) => {
            const inner = (
              <>
                <span className="svc-num num">0{i + 1}</span>
                <div className="svc-icon">{icons[i]}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="svc-cta">
                  {t.services.cta} <ArrowSvg />
                </span>
              </>
            );

            return item.link ? (
              <Link
                key={i}
                to={item.link}
                className="service-card"
                data-reveal
                style={{ '--delay': `${(i % 3) * 80}ms` }}
              >
                {inner}
              </Link>
            ) : (
              <a
                key={i}
                href="#lead"
                className="service-card"
                data-reveal
                style={{ '--delay': `${(i % 3) * 80}ms` }}
              >
                {inner}
              </a>
            );
          })}

          <div
            className="service-card"
            style={{ background: 'var(--navy)', color: 'var(--text-on-dark)', justifyContent: 'space-between' }}
          >
            <div>
              <span className="svc-num num" style={{ color: 'var(--text-on-dark-2)' }}>— TALK</span>
              <h3 style={{ marginTop: 28, fontSize: 26, lineHeight: 1.25 }}>
                {t.services.notSure.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h3>
            </div>
            <a href="#lead" className="svc-cta" style={{ color: 'var(--brand)' }}>
              {t.services.contactConsultant} <ArrowSvg />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
