import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Steps() {
  const { t } = useLanguage();
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const steps = grid.querySelectorAll('.step');
    function update() {
      const r = grid.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh * 0.5;
      const passed = vh * 0.7 - r.top;
      const p = Math.max(0, Math.min(1, passed / total));
      grid.style.setProperty('--fill', p * 100 + '%');
      const n = steps.length;
      steps.forEach((s, i) => {
        const threshold = (i + 1) / (n + 1);
        s.classList.toggle('is-active', p >= threshold || i === 0);
      });
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="steps section-pad" id="how" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="section-head">
          <div data-reveal>
            <div className="label">
              <span className="num-tag num">03 / PROCESS</span>
            </div>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              {t.steps.sectionTitle.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
          </div>
          <p className="lede on-dark" data-reveal style={{ '--delay': '120ms' }}>
            {t.steps.sectionDesc}
          </p>
        </div>

        <div className="steps-grid" ref={gridRef} style={{ '--fill': '0%' }}>
          <div className="steps-line" aria-hidden="true" />
          {t.steps.items.map((step, i) => (
            <div
              key={i}
              className={`step${i === 0 ? ' is-active' : ''}`}
              data-reveal
              style={{ '--delay': `${i * 100}ms` }}
            >
              <div className="step-dot" />
              <div className="step-num">STEP / 0{i + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
