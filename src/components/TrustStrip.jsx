import { useLanguage } from '../i18n/LanguageContext';

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 1.5 L17 5v5c0 4-3 7.5-7 9-4-1.5-7-5-7-9V5l7-3.5Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M7 10.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4" />
    <path d="M10 5v5l3 2" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const FlexIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2 16V8l8-5 8 5v8M2 16h16M6 16v-5h8v5" stroke="currentColor" strokeWidth="1.4" fill="none" />
  </svg>
);

export default function TrustStrip() {
  const { t } = useLanguage();

  const items = [
    { icon: <ShieldIcon />, title: t.trust.secure, desc: t.trust.secureDesc },
    { icon: <ClockIcon />, title: t.trust.fast, desc: t.trust.fastDesc },
    { icon: <FlexIcon />, title: t.trust.flexible, desc: t.trust.flexibleDesc },
  ];

  return (
    <section className="trust">
      <div className="container">
        <div className="trust-grid">
          {items.map(({ icon, title, desc }, i) => (
            <div key={i} className="trust-item" data-reveal style={{ '--delay': `${i * 100}ms` }}>
              <div className="trust-icon">{icon}</div>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
