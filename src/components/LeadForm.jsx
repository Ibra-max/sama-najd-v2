import { useState, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const PHONE_INTL = '+966550650034';

const ArrowSvg = () => (
  <svg className="arrow" viewBox="0 0 16 10" fill="none">
    <path d="M15 5H1M1 5l4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

function validate(name, value, errors, t) {
  const v = (value || '').trim();
  if (!v) return t.form.errors.required;
  if (name === 'phone' && !/^(05|5|\+9665)[0-9]{8}$/.test(v.replace(/\s/g, ''))) {
    return t.form.errors.phone;
  }
  return '';
}

export default function LeadForm({ service = 'home', badgeLabel = 'FORM · 05' }) {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [fields, setFields] = useState({ name: '', phone: '', service: '', amount: '' });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    setErrors(err => ({ ...err, [name]: '' }));
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    const err = validate(name, value, errors, t);
    if (err) setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    ['name', 'phone', 'service'].forEach(name => {
      const err = validate(name, fields[name], errors, t);
      if (err) newErrors[name] = err;
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    try {
      window.dataLayer?.push({ event: 'lead_submit', service });
    } catch (_) {}
    setSent(true);
  };

  return (
    <section className="form-section section-pad" id="lead">
      <div className="container">
        <div className="form-card" data-reveal>
          <span className="badge">{badgeLabel}</span>
          <h2>{t.form.sectionTitle}</h2>
          <p className="lede">{t.form.sectionDesc}</p>

          {sent ? (
            <div className="form-success">
              <h3 style={{ marginBottom: 8 }}>{t.form.successTitle}</h3>
              <p style={{ margin: 0, color: 'var(--text-2)' }}>
                {t.form.successDesc}{' '}
                <a className="en num" dir="ltr" href={`tel:${PHONE_INTL}`} style={{ color: 'var(--accent)' }}>
                  +966 55 065 0034
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid-2">
                <div className="field">
                  <label>
                    {t.form.name.label}
                    <span className="opt">{t.form.requiredLabel}</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t.form.name.placeholder}
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.name ? 'error' : ''}
                  />
                  <div className="err">{errors.name}</div>
                </div>

                <div className="field">
                  <label>
                    {t.form.phone.label}
                    <span className="opt">{t.form.requiredLabel}</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder={t.form.phone.placeholder}
                    dir="ltr"
                    value={fields.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.phone ? 'error' : ''}
                  />
                  <div className="err">{errors.phone}</div>
                </div>

                <div className="field">
                  <label>
                    {t.form.service.label}
                    <span className="opt">{t.form.requiredLabel}</span>
                  </label>
                  <select
                    name="service"
                    required
                    value={fields.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.service ? 'error' : ''}
                  >
                    <option value="">{t.form.service.placeholder}</option>
                    {t.form.service.options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="err">{errors.service}</div>
                </div>

                <div className="field">
                  <label>
                    {t.form.amount.label}
                    <span className="opt">{t.form.optionalLabel}</span>
                  </label>
                  <select
                    name="amount"
                    value={fields.amount}
                    onChange={handleChange}
                  >
                    <option value="">{t.form.amount.placeholder}</option>
                    {t.form.amount.options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="err" />
                </div>
              </div>

              <div className="form-actions">
                <p className="note">
                  {t.form.privacyNote}{' '}
                  <a href="#" style={{ color: 'var(--text)', textDecoration: 'underline' }}>
                    {t.form.privacy}
                  </a>{' '}
                  {t.form.privacyNote2}
                </p>
                <button type="submit" className="btn btn-primary">
                  {t.form.submit}
                  <ArrowSvg />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
