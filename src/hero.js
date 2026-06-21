function Hero() {
  const { t } = useT();
  const { goto } = useRoute();
  const h = t.hero;
  const slides = h.slides && h.slides.length ? h.slides : [{ title: h.title, sub: h.sub }];
  const heroRef = useRef(null);
  const slidesRef = useRef(null);

  const scrollToServices = () => {
    const el = document.getElementById('pillars') || document.getElementById('services');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  // Pinned, scrub-linked message conveyor (GSAP + ScrollTrigger).
  // Fails open: without GSAP / a real viewport / motion, only the first
  // message shows in normal flow (CSS), no pin. Desktop only.
  useEffect(() => {
    const g = window.gsap, ST = window.ScrollTrigger;
    if (!g || !ST || !window.innerHeight || slides.length < 2) return;
    g.registerPlugin(ST);
    const section = heroRef.current, wrap = slidesRef.current;
    if (!section || !wrap) return;
    const slideEls = Array.from(wrap.querySelectorAll('.hero-slide'));
    const dots = Array.from(section.querySelectorAll('.hero-dot'));
    const label = section.querySelector('.hero-progress-label');
    const n = slideEls.length;
    const mm = g.matchMedia();
    mm.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
      section.classList.add('hero-carousel-on');
      const hMax = Math.max.apply(null, slideEls.map((s) => s.offsetHeight));
      wrap.style.height = hMax + 'px';
      g.set(slideEls, { display: 'block', position: 'absolute', top: 0, left: 0, width: '100%' });
      g.set(slideEls, { xPercent: (i) => (i === 0 ? 0 : -110), autoAlpha: (i) => (i === 0 ? 1 : 0) });
      const setActive = (idx) => {
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        if (label) label.textContent = '0' + (idx + 1) + ' / 0' + n;
      };
      const tl = g.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=' + window.innerHeight * (n - 1),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.round(self.progress * (n - 1))),
        },
      });
      for (let i = 0; i < n - 1; i++) {
        tl.to(slideEls[i], { xPercent: 110, autoAlpha: 0, duration: 0.6 }, i);
        tl.to(slideEls[i + 1], { xPercent: 0, autoAlpha: 1, duration: 0.6 }, i + 0.18);
      }
      return () => {
        section.classList.remove('hero-carousel-on');
        wrap.style.height = '';
        g.set(slideEls, { clearProps: 'all' });
        dots.forEach((d) => d.classList.remove('active'));
      };
    });
    return () => mm.revert();
  }, [slides.length]);

  return (
    <section id="home" className="dark hero-section" ref={heroRef} style={{ position: 'relative', overflow: 'hidden', background: 'var(--dark)' }}>
      {/* Background micro-grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(246,244,239,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(246,244,239,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 30% 30%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 30% 30%, #000 30%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />
      {/* Aurora glow */}
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob a1" />
        <div className="aurora-blob a2" />
        <div className="aurora-blob a3" />
      </div>

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
            gap: 64,
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left: cycling messages */}
          <div>
            <Pill theme="dark">{h.eyebrow}</Pill>

            <div className="hero-slides" ref={slidesRef} style={{ marginTop: 18 }}>
              {slides.map((s, i) => (
                <div className="hero-slide" key={i}>
                  <h1 className="pre" style={{ fontSize: 'clamp(32px, 4vw, 52px)', maxWidth: '600px' }}>{s.title}</h1>
                  <p style={{ marginTop: 18, fontSize: 16.5, color: 'rgba(246,244,239,0.72)', maxWidth: 540, lineHeight: 1.5 }}>{s.sub}</p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
                    <Btn variant="primary" onDark onClick={() => goto('contact')}>{h.primary} <ArrowRight /></Btn>
                    <Btn variant="ghost" onDark onClick={scrollToServices}>{h.secondary}</Btn>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress (only shown when the carousel is active) */}
            <div className="hero-progress" aria-hidden="true">
              <div className="hero-dots">
                {slides.map((_, i) => <span className={'hero-dot' + (i === 0 ? ' active' : '')} key={i} />)}
              </div>
              <span className="hero-progress-label">01 / 0{slides.length}</span>
            </div>

            {/* Persistent trust chips */}
            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 999,
                  background: 'var(--dark-2)', border: '1px solid rgba(246,244,239,0.14)',
                  fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em', color: 'rgba(246,244,239,0.85)',
                }}
              >
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 999, background: '#5db58e', boxShadow: '0 0 0 4px rgba(93,181,142,0.18)', animation: 'pulse 1.8s ease-in-out infinite' }} />
                {h.tag}
              </div>
              {h.presence && (
                <div
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderRadius: 999,
                    border: '1px solid rgba(246,244,239,0.10)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em', color: 'rgba(246,244,239,0.6)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.2"></circle><path d="M1.6 8h12.8M8 1.6c2.2 1.8 2.2 11 0 12.8M8 1.6c-2.2 1.8-2.2 11 0 12.8" stroke="currentColor" strokeWidth="1.2"></path></svg>
                  {h.presence}
                </div>
              )}
            </div>
            <style>{`@keyframes pulse { 0%, 100% { box-shadow: 0 0 0 4px rgba(93,181,142,0.18); } 50% { box-shadow: 0 0 0 7px rgba(93,181,142,0.05); } }`}</style>
          </div>

          {/* Right: visual */}
          <HeroVisual />
        </div>
      </Container>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function HeroVisual() {
  const { t } = useT();
  const es = t.locale === 'es';
  const [score, setScore] = useState(34);
  useEffect(() => {
    let raf, start;
    const tick = (ts) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setScore(34 + (78 - 34) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scoreInt = Math.round(score);

  return (
    <div style={{ position: 'relative', minHeight: 470 }}>
      {/* Decorative ring backdrop */}
      <div style={{ position: 'absolute', inset: -40, opacity: 0.7, pointerEvents: 'none' }}>
        <QHeroMark size="100%" theme="dark" />
      </div>

      {/* Scorecard card */}
      <Tilt className="tilt-3d" style={{ position: 'absolute', right: 0, top: 4, width: 'min(348px, 88%)' }}>
      <div
        className="glass"
        style={{
          borderRadius: 18,
          padding: 24,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            {es ? 'Informe Q-Start' : 'Q-Start report'}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal-deep)', background: 'var(--teal-soft)', padding: '3px 9px', borderRadius: 999 }}>
            {es ? 'Ejemplo' : 'Sample'}
          </span>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 6 }}>
          {es ? 'Nivel de seguridad' : 'Security level'}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 60, fontWeight: 900, lineHeight: 1, color: 'var(--ink)' }}>{scoreInt}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-3)' }}>/ 100</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--teal-deep)', background: 'var(--teal-soft)', padding: '5px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>
            {es ? '+44 con el plan' : '+44 with the plan'}
          </span>
        </div>

        <div style={{ marginTop: 12, height: 8, background: 'rgba(14,20,22,0.06)', borderRadius: 999, overflow: 'hidden' }}>
          <div
            style={{
              width: `${scoreInt}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #c4574a, #b88a3a, #4d7e8a)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-4)', letterSpacing: '0.04em' }}>
          <span>0 · {es ? 'expuesto' : 'exposed'}</span>
          <span>{es ? 'sólido' : 'solid'} · 100</span>
        </div>

        <div style={{ marginTop: 20, marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          {es ? '5 áreas revisadas' : '5 areas reviewed'}
        </div>
        <div style={{ display: 'grid', gap: 11 }}>
          {[
            { k: es ? 'Correo y antifraude' : 'Email & anti-fraud', v: 28, s: es ? 'Crítico' : 'Critical', c: '#c4574a' },
            { k: es ? 'Identidades y MFA' : 'Identity & MFA', v: 62, s: es ? 'Mejorable' : 'Fair', c: '#b88a3a' },
            { k: 'Microsoft 365', v: 71, s: es ? 'Bien' : 'Good', c: '#4d7e8a' },
            { k: es ? 'Copias de seguridad' : 'Backups', v: 55, s: es ? 'Mejorable' : 'Fair', c: '#b88a3a' },
            { k: es ? 'Plan ante incidentes' : 'Incident plan', v: 12, s: es ? 'Crítico' : 'Critical', c: '#c4574a' },
          ].map((row) => (
            <div key={row.k} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink)' }}>{row.k}</div>
                <div style={{ marginTop: 4, height: 4, background: 'rgba(14,20,22,0.06)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${row.v}%`, height: '100%', background: row.c }} />
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, color: row.c, background: `${row.c}1f`, padding: '4px 9px', borderRadius: 5, minWidth: 70, textAlign: 'center' }}>{row.s}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 20,
            paddingTop: 14,
            borderTop: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--ink-3)',
            letterSpacing: '0.04em',
          }}
        >
          <span>{es ? 'Base: NIST CSF 2.0 · CIS' : 'Based on NIST CSF 2.0 · CIS'}</span>
          <span style={{ color: 'var(--teal-deep)' }}>{es ? '15 acciones priorizadas →' : '15 prioritised actions →'}</span>
        </div>
      </div>
      </Tilt>

      {/* Small chip card */}
      <div
        style={{
          position: 'absolute',
          left: -12,
          bottom: 18,
          background: 'var(--dark-3)',
          color: 'var(--bg)',
          borderRadius: 14,
          padding: '14px 16px',
          maxWidth: 196,
          border: '1px solid rgba(246,244,239,0.12)',
          boxShadow: '0 20px 40px -20px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8cc0cf' }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: '#8cc0cf' }} />
          {es ? 'MFA activado' : 'MFA enforced'}
        </div>
        <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.4 }}>
          {es ? '17 / 17 cuentas con acceso de administrador protegidas con MFA en 48 h.' : '17 / 17 admin accounts protected with MFA in 48h.'}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Hero, HeroVisual });
