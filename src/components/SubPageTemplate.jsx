import SubHero from './SubHero';
import CtaBlock from './CtaBlock';
import LeadForm from './LeadForm';
import { useLanguage } from '../i18n/LanguageContext';
import { useReveal } from '../hooks/useReveal';

export default function SubPageTemplate({ pageId, heroKey, serviceData }) {
  const { lang, t } = useLanguage();
  useReveal();

  const benefits = serviceData.benefits[lang];
  const docs = serviceData.docs[lang];

  return (
    <>
      <SubHero pageId={pageId} heroKey={heroKey} serviceData={serviceData} />

      {/* Benefits */}
      <section className="benefits section-pad">
        <div className="container">
          <div className="section-head">
            <div data-reveal>
              <div className="label">
                <span className="num-tag num">BENEFITS / المزايا</span>
              </div>
              <h2 className="h-section" style={{ marginTop: 16 }}>
                {t.subPage.benefits}
              </h2>
            </div>
          </div>
          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit" data-reveal style={{ '--delay': `${i * 80}ms` }}>
                <div className="num">0{i + 1}</div>
                <div>
                  <h3>{b.h}</h3>
                  <p>{b.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="docs">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 40 }}>
            <div data-reveal>
              <div className="label">
                <span className="num-tag num">DOCS / المستندات</span>
              </div>
              <h2 className="h-section" style={{ marginTop: 16 }}>
                {t.subPage.docs}
              </h2>
            </div>
          </div>
          <ul className="docs-list">
            {docs.map((doc, i) => (
              <li key={i} data-reveal style={{ '--delay': `${i * 60}ms` }}>
                <svg className="check" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9.5l4 4 8-9" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBlock />
      <LeadForm service={pageId} badgeLabel={`FORM · ${pageId.toUpperCase()}`} />
    </>
  );
}
