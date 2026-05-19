/* ===================================================================
   Sama Najd — Landing app
   - Hash router for 5 pages
   - Scroll reveal (IntersectionObserver) with cleanup per page
   - Sticky CTA + mobile bar visibility
   - Steps progress line fill on scroll
   - Form validation + WhatsApp deeplink
   - Dynamic rendering of sub-pages from a single template
   =================================================================== */
(function () {
  'use strict';

  const PHONE_INTL = '+966550650034';
  const PHONE_LOCAL = '0550650034';
  const WA_URL = 'https://wa.me/966550650034';

  // ---------- Sub-page definitions ----------
    const SERVICES = {
    'real-estate-liquidity': {
      id: 'real-estate-liquidity',
      eyebrow: '01 — السيولة العقارية',
      eyebrow_en: '01 — Real Estate Liquidity',
      title: 'حوّل عقارك إلى<br/>سيولة فورية.',
      title_en: 'Convert your real estate into<br/>immediate liquidity.',
      lede: 'بدون تنازل عن ملكية عقارك. نوفّر لك تمويلاً نقدياً بضمان قرضك العقاري بإجراءات نظامية وسريعة.',
      lede_en: 'Without giving up ownership. We provide cash financing backed by your real estate loan with fast and legal procedures.',
      meta: [
        { k: 'مبلغ التمويل', k_en: 'Financing Amount', v: 'حتى ٢ مليون ر.س', v_en: 'Up to 2M SAR' },
        { k: 'مدة الدراسة', k_en: 'Assessment Time', v: '٢٤ — ٤٨ ساعة', v_en: '24 - 48 hours' },
        { k: 'فترة السداد', k_en: 'Repayment Period', v: 'حتى ٦٠ شهر', v_en: 'Up to 60 months' }
      ],
      benefits: [
        { h: 'احتفظ بعقارك', h_en: 'Keep your real estate', p: 'لا تنازل عن ملكية العقار — فقط ضمان نظامي معتمد لدى الجهات التمويلية.', p_en: 'No giving up ownership — only a legal guarantee approved by financing entities.' },
        { h: 'مبالغ مرنة', h_en: 'Flexible amounts', p: 'برامج تمويلية حسب قيمة العقار ووضعك المالي وحاجة السيولة.', p_en: 'Financing programs based on the value of the property and your financial situation.' },
        { h: 'سداد مريح', h_en: 'Comfortable repayment', p: 'فترات سداد ممتدة تتناسب مع دخلك الشهري وتلتزماتك الحالية.', p_en: 'Extended repayment periods tailored to your monthly income and current obligations.' },
        { h: 'متوافق شرعاً', h_en: 'Sharia-compliant', p: 'جميع المنتجات متوافقة مع أحكام الشريعة الإسلامية ومعتمدة.', p_en: 'All products are Sharia-compliant and certified.' }
      ],
      docs: [
        'الهوية الوطنية سارية', 'Valid National ID',
        'صك العقار محل التمويل', 'Real Estate Deed',
        'تعريف بالراتب حديث', 'Recent Salary Certificate',
        'كشف حساب لآخر ٣ أشهر', 'Bank statement for last 3 months',
        'بيانات التمويل العقاري القائم', 'Existing Real Estate Financing Details',
        'بيان التزامات من البنك المركزي', 'Obligations statement from Central Bank'
      ]
    },
    'cash': {
      id: 'cash',
      eyebrow: '02 — التمويل النقدي',
      eyebrow_en: '02 — Cash Financing',
      title: 'سيولة نقدية فورية.<br/>بإجراءات بسيطة.',
      title_en: 'Immediate cash liquidity.<br/>With simple procedures.',
      lede: 'حلول صرف سيولة سريعة لتغطية احتياجاتك العاجلة — استشارة مجانية ودراسة وضعك المالي.',
      lede_en: 'Fast liquidity disbursement solutions for urgent needs — free consultation and financial assessment.',
      meta: [
        { k: 'التحويل', k_en: 'Transfer', v: 'خلال ٧٢ ساعة', v_en: 'Within 72 hours' },
        { k: 'بدون تحويل راتب', k_en: 'No Salary Transfer', v: 'متاح', v_en: 'Available' },
        { k: 'موافقة سريعة', k_en: 'Fast Approval', v: 'نعم', v_en: 'Yes' }
      ],
      benefits: [
        { h: 'سرعة فائقة', h_en: 'Super Fast', p: 'موافقة مبدئية خلال ساعات وتحويل المبلغ خلال أيام عمل قليلة.', p_en: 'Initial approval within hours and transfer within a few business days.' },
        { h: 'بدون شروط معقدة', h_en: 'No Complex Conditions', p: 'لا نطلب تحويل راتب أو ضمانات إضافية في معظم الحالات.', p_en: 'We do not require a salary transfer or additional guarantees in most cases.' },
        { h: 'مرونة في المبلغ', h_en: 'Amount Flexibility', p: 'برامج صرف من ٥٠ ألف ر.س وحتى ٢ مليون ر.س حسب الوضع.', p_en: 'Disbursement programs from 50k SAR up to 2M SAR depending on the situation.' },
        { h: 'خصوصية تامة', h_en: 'Complete Privacy', p: 'بياناتك ومعاملتك سرية ولا تُشارك مع أي طرف خارجي.', p_en: 'Your data and transaction are confidential and not shared with any third party.' }
      ],
      docs: [
        'الهوية الوطنية سارية', 'Valid National ID',
        'تعريف بالراتب أو إثبات الدخل', 'Salary certificate or proof of income',
        'كشف حساب البنك لآخر ٣ أشهر', 'Bank statement for last 3 months',
        'بيان التزامات بسيط', 'Simple obligations statement'
      ]
    },
    'waqf-services': {
      id: 'waqf-services',
      eyebrow: '03 — فك الإيقاف الخدمي',
      eyebrow_en: '03 — Services Unblocking',
      title: 'فك إيقاف الخدمات.<br/>بسرعة وخصوصية.',
      title_en: 'Services unblocking.<br/>With speed and privacy.',
      lede: 'نساعدك في تسوية مديونياتك ورفع الإيقاف الخدمي عن حساباتك بإجراءات نظامية وموثوقة.',
      lede_en: 'We help you settle your debts and lift service suspensions from your accounts with reliable legal procedures.',
      meta: [
        { k: 'المدة الزمنية', k_en: 'Timeframe', v: '٥ — ١٠ أيام', v_en: '5 - 10 days' },
        { k: 'حلول نظامية', k_en: 'Legal Solutions', v: '١٠٠٪ آمنة', v_en: '100% Safe' },
        { k: 'خصوصية', k_en: 'Privacy', v: 'تامة', v_en: 'Complete' }
      ],
      benefits: [
        { h: 'تسوية شاملة', h_en: 'Comprehensive Settlement', p: 'دراسة كاملة لالتزاماتك وتقديم خطة سداد تناسب وضعك.', p_en: 'Complete study of your obligations and presentation of a repayment plan suitable for your situation.' },
        { h: 'حلول نظامية', h_en: 'Legal Solutions', p: 'تعاملنا مع جهات تمويل مرخصة من البنك المركزي السعودي.', p_en: 'We deal with financing entities licensed by the Saudi Central Bank.' },
        { h: 'استعادة الخدمات', h_en: 'Services Restoration', p: 'فتح الإيقاف الخدمي يفتح لك أبواب التوظيف والسفر والمعاملات.', p_en: 'Lifting service suspensions opens the doors to employment, travel, and transactions.' },
        { h: 'متابعة شخصية', h_en: 'Personal Follow-up', p: 'مستشار مختص يتابع ملفك من البداية وحتى رفع الإيقاف.', p_en: 'A dedicated consultant follows your file from the beginning until the suspension is lifted.' }
      ],
      docs: [
        'الهوية الوطنية سارية', 'Valid National ID',
        'بيان التزامات حديث', 'Recent obligations statement',
        'تعريف بالعمل أو إثبات الدخل', 'Proof of employment or income',
        'كشف حساب لآخر ٣ أشهر', 'Bank statement for last 3 months',
        'كشف الإيقاف الخدمي', 'Service suspension statement'
      ]
    },
    'government-employee': {
      id: 'government-employee',
      eyebrow: '04 — الموظف الحكومي',
      eyebrow_en: '04 — Government Employee Financing',
      title: 'تمويل مخصص<br/>للموظف الحكومي.',
      title_en: 'Financing customized<br/>for government employees.',
      lede: 'برامج تمويل خاصة بمنسوبي القطاع الحكومي — موافقة أسرع، شروط مرنة، وحلول مفصّلة لطبيعة دخلك.',
      lede_en: 'Special financing programs for government sector employees — faster approval, flexible terms, and tailored solutions.',
      meta: [
        { k: 'موافقة', k_en: 'Approval', v: 'خلال ٤٨ ساعة', v_en: 'Within 48 hours' },
        { k: 'بدون كفيل', k_en: 'No Guarantor', v: 'متاح', v_en: 'Available' },
        { k: 'التحويل', k_en: 'Transfer', v: 'سريع', v_en: 'Fast' }
      ],
      benefits: [
        { h: 'مصمم للقطاع الحكومي', h_en: 'Designed for Government Sector', p: 'برامج مفصّلة على طبيعة الوظائف الحكومية ومدد الخدمة.', p_en: 'Programs tailored to the nature of government jobs and service durations.' },
        { h: 'سرعة فائقة', h_en: 'Super Fast', p: 'علاقات مباشرة مع جهات التمويل تختصر مدة الموافقة.', p_en: 'Direct relationships with financing entities shorten the approval period.' },
        { h: 'شروط مرنة', h_en: 'Flexible Terms', p: 'فترات سداد طويلة وإمكانية السداد المبكر بدون رسوم في معظم البرامج.', p_en: 'Long repayment periods and the possibility of early repayment without fees in most programs.' },
        { h: 'استشارة مجانية', h_en: 'Free Consultation', p: 'مستشار مختص يدرس وضعك ويرشّح أفضل البرامج المتاحة لك.', p_en: 'A dedicated consultant studies your situation and recommends the best available programs.' }
      ],
      docs: [
        'الهوية الوطنية سارية', 'Valid National ID',
        'تعريف بالراتب من جهة العمل', 'Salary certificate from employer',
        'كشف حساب البنك (٣ أشهر)', 'Bank statement (3 months)',
        'بيان التزامات من سمة', 'Obligations statement from SIMAH',
        'صك ملكية (للتمويل العقاري)', 'Property deed (for real estate financing)'
      ]
    }
  };
  // ---------- Templates ----------
  const arrowSvg = '<svg class="arrow" viewBox="0 0 16 10" fill="none"><path d="M15 5H1M1 5l4-4M1 5l4 4" stroke="currentColor" stroke-width="1.4"/></svg>';

  function renderSubPage(s) {
    return `
      <section class="sub-hero">
        <div class="hero-photo">
        </div>
        <div class="container">
          <div class="sub-hero-grid">
            <div>
              <div class="crumbs">
                <a href="#/">الرئيسية</a>
                <span aria-hidden="true">/</span>
                <span class="en">${escapeHTML(s.id.toUpperCase())}</span>
              </div>
              <div class="hero-eyebrow eyebrow on-dark" data-reveal>
                <span class="num">${escapeHTML(s.eyebrow)}</span>
              </div>
              <h1 data-reveal style="--delay: 80ms">${s.title}</h1>
              <p class="lede on-dark" data-reveal style="--delay: 160ms">${escapeHTML(s.lede)}</p>
              <div class="hero-ctas" data-reveal style="--delay: 240ms">
                <a href="#lead" class="btn btn-primary" data-scroll-to="lead">
                  اطلب الخدمة الآن
                  ${arrowSvg}
                </a>
                <a href="${WA_URL}" class="btn btn-ghost" target="_blank" rel="noopener">
                  واتساب مباشر
                </a>
              </div>
              <div class="sub-hero-meta">
                ${s.meta.map((m,i) => `
                  <div class="item" data-reveal style="--delay: ${300 + i*80}ms">
                    <div class="k">${escapeHTML(m.k)}</div>
                    <div class="v">${escapeHTML(m.v)}</div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="sub-hero-photo" data-reveal style="--delay: 120ms">
              <picture>
                <source media="(max-width: 768px)" srcset="assets/${s.id}_mobil.png">
                <img src="assets/${s.id}_desc.png" alt="${escapeHTML(s.id)}" style="width:100%; height:100%; object-fit:cover;">
              </picture>
            </div>
          </div>
        </div>
      </section>

      <section class="benefits section-pad">
        <div class="container">
          <div class="section-head">
            <div data-reveal>
              <div class="label"><span class="num-tag num">BENEFITS / لماذا نحن</span></div>
              <h2 class="h-section" style="margin-top:16px">ما الذي تحصل عليه.</h2>
            </div>
            <p class="lede" data-reveal style="--delay: 120ms">
              نقدّم خدمة تمويل بمعايير مهنية عالية تضمن لك سرعة الإنجاز والخصوصية التامة، مع متابعة شخصية حتى استلام التمويل.
            </p>
          </div>
          <div class="benefits-grid">
            ${s.benefits.map((b,i) => `
              <div class="benefit" data-reveal style="--delay: ${i*80}ms">
                <div class="num">0${i+1}</div>
                <div>
                  <h3>${escapeHTML(b.h)}</h3>
                  <p>${escapeHTML(b.p)}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="docs">
        <div class="container">
          <div class="section-head" style="margin-bottom: 40px">
            <div data-reveal>
              <div class="label"><span class="num-tag num">DOCS / المستندات</span></div>
              <h2 class="h-section" style="margin-top:16px">المستندات المطلوبة.</h2>
            </div>
            <p class="lede" data-reveal style="--delay: 120ms">
              قائمة المستندات الأساسية لبدء دراسة طلبك — قد نطلب مستندات إضافية حسب نوع التمويل ووضعك المالي.
            </p>
          </div>
          <ul class="docs-list">
            ${s.docs.map((d,i) => `
              <li data-reveal style="--delay: ${i*60}ms">
                <svg class="check" viewBox="0 0 18 18" fill="none"><path d="M3 9.5l4 4 8-9" stroke="currentColor" stroke-width="1.8"/></svg>
                <span>${escapeHTML(d)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </section>

      <section class="cta-block">
        <div class="container">
          <div class="cta-inner">
            <h2 data-reveal>جاهز تبدأ؟<br/><span style="color: var(--accent);">احصل على عرضك الآن.</span></h2>
            <div class="actions" data-reveal style="--delay: 120ms">
              <a href="#lead" class="btn btn-primary" data-scroll-to="lead">
                تقديم الطلب ${arrowSvg}
              </a>
              <a href="tel:${PHONE_INTL}" class="btn btn-ghost on-light">
                <span class="en num" dir="ltr">+966 55 065 0034</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="form-section section-pad" id="lead">
        <div class="container">
          <div class="form-card" data-reveal>
            <span class="badge">FORM · ${escapeHTML(s.id.toUpperCase())}</span>
            <h2>${escapeHTML(stripTags(s.title))}</h2>
            <p class="lede">اترك بياناتك وسيتواصل معك مستشار مختص بهذه الخدمة خلال ساعات العمل الرسمية.</p>
            <form data-lead-form data-service="${escapeHTML(s.id)}">
              <div class="form-grid">
                <div class="field">
                  <label>الاسم الكامل <span class="opt">REQUIRED</span></label>
                  <input type="text" name="name" required placeholder="مثال: عبدالله محمد" />
                  <div class="err"></div>
                </div>
                <div class="field">
                  <label>رقم الجوال <span class="opt">REQUIRED</span></label>
                  <input type="tel" name="phone" required pattern="^(05|5|\\+9665)[0-9]{8}$" placeholder="05XXXXXXXX" />
                  <div class="err"></div>
                </div>
                <div class="field">
                  <label>المدينة <span class="opt">OPTIONAL</span></label>
                  <input type="text" name="city" placeholder="الرياض" />
                  <div class="err"></div>
                </div>
                <div class="field">
                  <label>المبلغ التقريبي <span class="opt">OPTIONAL</span></label>
                  <select name="amount">
                    <option value="">اختر النطاق...</option>
                    <option>أقل من 100 ألف ريال</option>
                    <option>100 — 300 ألف ريال</option>
                    <option>300 — 700 ألف ريال</option>
                    <option>700 ألف — 1.5 مليون ريال</option>
                    <option>أكثر من 1.5 مليون ريال</option>
                  </select>
                  <div class="err"></div>
                </div>
              </div>
              <div class="form-actions">
                <p class="note">
                  بإرسالك الطلب، أنت توافق على
                  <a href="#" style="color: var(--text); text-decoration: underline;">سياسة الخصوصية</a>
                  ومعالجة بياناتك للتواصل معك.
                </p>
                <button type="submit" class="btn btn-primary">
                  إرسال الطلب ${arrowSvg}
                </button>
              </div>
            </form>
            <div class="form-success">
              <h3 style="margin-bottom: 8px;">شكراً لك. تم استلام طلبك.</h3>
              <p style="margin: 0; color: var(--text-2);">سيتواصل معك مستشارنا خلال ساعات العمل. للاستفسار العاجل: <a class="en num" dir="ltr" href="tel:${PHONE_INTL}" style="color: var(--accent);">+966 55 065 0034</a></p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function escapeHTML(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function stripTags(s) { return String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }

  // ---------- Router ----------
  let revealObserver = null;

  function parseHash() {
    const h = (location.hash || '#/').replace(/^#/, '');
    // strip leading "/"
    const parts = h.split('/').filter(Boolean);
    return parts[0] || ''; // '' means home, else service id
  }

  function route() {
    const slug = parseHash();
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('is-active'));

    let activePage;
    if (!slug || slug === 'lead') {
      activePage = document.getElementById('page-home');
    } else if (SERVICES[slug]) {
      activePage = document.getElementById('page-' + slug);
      if (activePage && !activePage.dataset.rendered) {
        activePage.innerHTML = renderSubPage(SERVICES[slug]);
        activePage.dataset.rendered = '1';
      }
    } else {
      activePage = document.getElementById('page-home');
    }
    if (!activePage) activePage = document.getElementById('page-home');
    activePage.classList.add('is-active');

    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(a => {
      const href = a.getAttribute('href') || '';
      a.classList.toggle('is-active', href === '#/' + slug || (slug === '' && href === '#/'));
    });

    // Reset header dark/light
    refreshHeaderTheme();

    // If hash has a sub-anchor like #/, scroll handling:
    if (slug === 'lead') {
      // legacy direct anchor
      requestAnimationFrame(() => {
        const el = document.getElementById('lead');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }

    // Re-bind reveals for new content
    setupReveals();
    setupStepsLine();
    bindForms();
  }

  // ---------- Header theme ----------
  function refreshHeaderTheme() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    const isScrolled = window.scrollY > 80;
    // Active page's first section determines theme
    const activePage = document.querySelector('.page.is-active');
    let firstDark = false;
    if (activePage) {
      const firstSec = activePage.querySelector('section');
      if (firstSec) {
        const cls = firstSec.className;
        firstDark = /\b(hero|sub-hero|steps)\b/.test(cls);
      }
    }
    header.classList.toggle('is-scrolled', isScrolled);
    header.classList.toggle('is-dark', !isScrolled && firstDark);
    header.classList.toggle('is-light', !isScrolled && !firstDark);
    // Show header CTA after scroll
    const cta = document.getElementById('headerCta');
    if (cta) cta.classList.toggle('is-visible', isScrolled);
    // Mobile bar visibility after first scroll
    const mob = document.getElementById('mobileCta');
    if (mob) mob.classList.toggle('is-visible', isScrolled);
  }

  // ---------- Reveal animations ----------
  function setupReveals() {
    if (revealObserver) revealObserver.disconnect();
    const els = document.querySelectorAll('.page.is-active [data-reveal]');
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => revealObserver.observe(el));
  }

  // ---------- Steps line progressive fill ----------
  function setupStepsLine() {
    const grid = document.querySelector('.page.is-active #stepsGrid');
    if (!grid) return;
    const steps = grid.querySelectorAll('.step');
    function update() {
      const r = grid.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when bottom of grid is below viewport, 1 when top of grid above center
      const total = r.height + vh * 0.5;
      const passed = vh * 0.7 - r.top;
      const p = Math.max(0, Math.min(1, passed / total));
      grid.style.setProperty('--fill', (p * 100) + '%');
      // activate dots in sequence
      const n = steps.length;
      steps.forEach((s, i) => {
        const threshold = (i + 1) / (n + 1);
        s.classList.toggle('is-active', p >= threshold || i === 0);
      });
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  // ---------- Lead form ----------
  function bindForms() {
    document.querySelectorAll('form[data-lead-form], form#leadForm form, .form-card form').forEach(form => {
      if (form.dataset.bound) return;
      form.dataset.bound = '1';
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmit(form);
      });
      // live validation
      form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
      });
    });
  }

  function clearError(input) {
    const err = input.parentElement.querySelector('.err');
    if (err) err.textContent = '';
    input.style.borderColor = '';
  }

  function validateField(input) {
    const v = (input.value || '').trim();
    const err = input.parentElement.querySelector('.err');
    let msg = '';
    if (input.required && !v) msg = 'هذا الحقل مطلوب';
    else if (input.name === 'phone' && v) {
      if (!/^(05|5|\+9665)[0-9]{8}$/.test(v.replace(/\s/g, ''))) msg = 'رقم جوال غير صحيح';
    }
    if (err) err.textContent = msg;
    input.style.borderColor = msg ? 'var(--accent)' : '';
    return !msg;
  }

  function handleSubmit(form) {
    const inputs = form.querySelectorAll('input, select');
    let ok = true;
    inputs.forEach(i => { if (!validateField(i)) ok = false; });
    if (!ok) {
      const firstErr = form.querySelector('.err:not(:empty)');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    // Get values
    const data = {};
    inputs.forEach(i => { if (i.name) data[i.name] = i.value; });
    data.service = data.service || form.dataset.service || 'general';

    // (Real integration would POST here — placeholders for now)
    try {
      window.dataLayer && window.dataLayer.push({ event: 'lead_submit', service: data.service });
      // fbq, snaptr placeholders would fire here
    } catch (e) {}

    // Show success
    const card = form.closest('.form-card');
    if (card) card.classList.add('is-sent');
  }

  // ---------- Smooth scroll for in-page links ----------
  function bindSmoothScroll() {
    document.body.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#lead"], a[href="#hero"], a[href="#services"], a[href="#how"]');
      if (!link) return;
      const href = link.getAttribute('href');
      const id = href.replace('#', '');
      // If we're on home, smooth scroll
      if (parseHash() === '' || parseHash() === 'lead') {
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (id === 'lead') {
        // Sub-page lead form
        e.preventDefault();
        const el = document.querySelector('.page.is-active #lead');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }


  // ---------- i18n Init ----------
  const defaultLang = 'ar';
  
  i18next.init({
    lng: defaultLang,
    fallbackLng: 'ar',
    resources: resources
  }).then(function(t) {
    updateContent();
  });

  function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key.startsWith('[')) {
        const parts = key.split(']');
        const attr = parts[0].substring(1);
        const transKey = parts[1];
        el.setAttribute(attr, i18next.t(transKey));
      } else {
        el.innerHTML = i18next.t(key);
      }
    });
  }

  // ---------- Lang toggle (visual placeholder) ----------
  function bindLangToggle() {
    const t = document.getElementById('langToggle');
    if (!t) return;
    t.addEventListener('click', (e) => {
      e.preventDefault();
      const html = document.documentElement;
      const isAr = html.getAttribute('lang') === 'ar';
      if (isAr) {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        t.textContent = 'EN / AR';
        i18next.changeLanguage('en').then(updateContent);
      } else {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        t.textContent = 'AR / EN';
        i18next.changeLanguage('ar').then(updateContent);
      }
      
      // Re-render subpage if we are on one, to update dynamic content
      const path = window.location.hash.replace('#/', '') || '';
      if (SERVICES[path]) {
        router();
      }
    });
  }

  // ---------- Init ----------
  function init() {
    window.addEventListener('hashchange', route);
    window.addEventListener('scroll', refreshHeaderTheme, { passive: true });
    window.addEventListener('resize', refreshHeaderTheme);
    bindSmoothScroll();
    bindLangToggle();
    bindForms();

    // hook tweaks
    window.applyTweaks = function (t) {
      if (!t) return;
      const body = document.body;
      if (t.accent) body.setAttribute('data-accent', t.accent);
      if (t.divider) body.setAttribute('data-divider', t.divider);
      if (t.heroStyle) body.setAttribute('data-hero', t.heroStyle);
    };
    if (window.__TWEAKS__) window.applyTweaks(window.__TWEAKS__);

    route();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
