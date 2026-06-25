// All home sections: trust, pains, services, method, deliverable, sectors, resources, faq, finalCta

// Monochrome "logo" marks for the standards/frameworks band.
function BadgeMark({ i }) {
  const marks = [
    // shield
    <path d="M11 2.2 4 5v6c0 4.4 3 6.8 7 8.8 4-2 7-4.4 7-8.8V5l-7-2.8Z" />,
    // lock
    <><rect x="4.5" y="9.5" width="13" height="9.5" rx="2" /><path d="M7.5 9.5V7a3.5 3.5 0 0 1 7 0v2.5" /></>,
    // globe
    <><circle cx="11" cy="11" r="8" /><path d="M3 11h16M11 3c2.6 2.2 2.6 13.8 0 16M11 3c-2.6 2.2-2.6 13.8 0 16" /></>,
    // badge-check
    <><path d="M11 2.5 13.4 5l3.4.2.2 3.4L19.5 11l-2.5 2.4-.2 3.4-3.4.2L11 19.5 8.6 17l-3.4-.2-.2-3.4L2.5 11l2.5-2.4.2-3.4L8.6 5 11 2.5Z" /><path d="m8 11 2.2 2.2L15 8.5" /></>,
    // hexagon
    <path d="M11 2.5 18.5 7v8L11 19.5 3.5 15V7L11 2.5Z" />,
    // layers
    <><path d="M11 3 3 7l8 4 8-4-8-4Z" /><path d="m3 12 8 4 8-4M3 16l8 4 8-4" /></>,
  ];
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {marks[i % marks.length]}
    </svg>
  );
}

function TrustStrip() {
  const { t } = useT();
  const items = t.trust.items;
  return (
    <section className="tight trust-band" style={{ paddingTop: 0, paddingBottom: 56 }}>
      <Container>
        <Reveal>
          <p className="trust-band-title">{t.trust.title}</p>
        </Reveal>
      </Container>
      {/* Full-bleed, infinite right-to-left marquee (grayscale, pause on hover) */}
      <div className="marquee trust-marquee" role="img" aria-label={t.trust.title}>
        <div className="marquee-track">
          {[...items, ...items].map((it, i) => (
            <span className="trust-logo" key={i}>
              <BadgeMark i={i % items.length} />
              <span className="trust-logo-name">{it}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  const { t } = useT();
  const es = t.locale === 'es';
  const stats = [
    { to: 96, suffix: '%', label: es ? 'de las brechas llegan por tres vías conocidas' : 'of breaches come through three known paths' },
    { to: 7, suffix: '', label: es ? 'días hábiles hasta tu diagnóstico' : 'business days to your assessment' },
    { to: 9, suffix: '', label: es ? 'servicios con alcance y precio cerrados' : 'services with closed scope and price' },
    { to: 24, prefix: '<', suffix: 'h', label: es ? 'para responder a tu solicitud' : 'to reply to your request' },
  ];
  return (
    <section className="tight" style={{ paddingTop: 8, paddingBottom: 72 }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 28 }}>
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <div style={{ textAlign: 'center', padding: '8px 12px' }}>
                <div className="stat-num grad-text">
                  <Counter to={s.to} prefix={s.prefix || ''} suffix={s.suffix} />
                </div>
                <p style={{ marginTop: 12, fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.5, maxWidth: 220, margin: '12px auto 0' }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Pains() {
  const { t } = useT();
  return (
    <section className="dark" id="pains" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob a1" />
        <div className="aurora-blob a2" />
      </div>
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div className="sec-head">
          <Reveal><span className="eyebrow">{t.pains.eyebrow}</span></Reveal>
          <Reveal delay={80}>
            <h2 className="pre" style={{ marginTop: 18 }}>{t.pains.title}</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="sub" style={{ marginTop: 20, fontSize: 17, maxWidth: 720 }}>{t.pains.sub}</p>
          </Reveal>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 1,
            background: 'rgba(246,244,239,0.08)',
            border: '1px solid rgba(246,244,239,0.08)',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {t.pains.items.map((item, i) => (
            <Reveal key={i} delay={i * 60} className="pain-cell">
              <div
                style={{
                  background: 'var(--dark)',
                  padding: '36px 32px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dark-2)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--dark)')}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--teal-2)', letterSpacing: '0.16em' }}>{item.k}</span>
                <h3 style={{ fontSize: 22, fontWeight: 600 }}>{item.t}</h3>
                <p style={{ fontSize: 14.5, color: 'rgba(246,244,239,0.68)', lineHeight: 1.6 }}>{item.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Services() {
  const { t } = useT();
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  // Horizontal pinned scrub gallery on desktop. Fails open to the
  // responsive grid (mobile / no GSAP / reduced motion).
  useEffect(() => {
    const g = window.gsap, ST = window.ScrollTrigger;
    if (!g || !ST || !window.innerHeight) return;
    g.registerPlugin(ST);
    const pin = pinRef.current, track = trackRef.current, fill = fillRef.current;
    if (!pin || !track) return;
    const mm = g.matchMedia();
    mm.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
      pin.classList.add('svc-pinned-on');
      const distance = () => Math.max(0, track.scrollWidth - pin.offsetWidth);
      if (distance() <= 0) { pin.classList.remove('svc-pinned-on'); return; }
      const tween = g.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => { if (fill) fill.style.width = (self.progress * 100).toFixed(1) + '%'; },
        },
      });
      return () => {
        pin.classList.remove('svc-pinned-on');
        g.set(track, { clearProps: 'x' });
        if (fill) fill.style.width = '';
      };
    });
    return () => mm.revert();
  }, [t.locale]);

  return (
    <section id="services">
      <Container>
        <div className="sec-head">
          <Reveal><span className="eyebrow">{t.services.eyebrow}</span></Reveal>
          <Reveal delay={80}><h2 className="pre" style={{ marginTop: 18 }}>{t.services.title}</h2></Reveal>
          <Reveal delay={140}><p className="sub">{t.services.sub}</p></Reveal>
          {t.services.priceNote && (
            <Reveal delay={180}>
              <p style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.06em', color: 'var(--teal-deep)' }}>{t.services.priceNote}</p>
            </Reveal>
          )}
          {t.services.families && (
            <Reveal delay={220}>
              <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {t.services.families.map((f, i) => (
                  <div key={i} style={{ flex: '1 1 200px', minWidth: 200, padding: '12px 16px', border: '1px solid var(--line)', borderRadius: 12, background: 'var(--bg-card)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14.5 }}>{f.t}</div>
                    <div style={{ marginTop: 4, fontSize: 12.5, color: 'var(--ink-3)' }}>{f.d}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </Container>

      <Container>
        <div className="svc-pinned" ref={pinRef}>
          <div className="svc-track" ref={trackRef}>
            {t.services.items.map((s, i) => (
              <Tilt key={i} max={6} className="svc-item" style={{ height: '100%' }}>
                <div
                  className="card svc-card"
                  style={{
                    padding: 28,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--teal-deep)',
                        background: 'var(--teal-soft)',
                        padding: '5px 10px',
                        borderRadius: 6,
                      }}
                    >
                      {s.code}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-4)' }}>{s.time}</span>
                  </div>

                  <h3 style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.2 }}>{s.t}</h3>
                  <p style={{ fontSize: 14.5, color: 'var(--ink-3)', lineHeight: 1.6 }}>{s.d}</p>

                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8, marginTop: 4 }}>
                    {s.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'var(--ink-2)' }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8.5l3.5 3L13 5" stroke="var(--teal-deep)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{s.price}</span>
                    <a
                      href={`/servicios/${s.slug}`}
                      style={{
                        color: 'var(--ink)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: 13.5,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      {t.locale === 'es' ? 'Ver alcance' : 'See scope'} <ArrowRight />
                    </a>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>

          {/* Scrub progress (only visible while pinned) */}
          <div className="svc-progress" aria-hidden="true">
            <span className="svc-hint">{t.locale === 'es' ? 'Desplázate para recorrer los 9 servicios' : 'Scroll to move through all 9 services'}</span>
            <span className="svc-progress-bar"><span className="svc-progress-fill" ref={fillRef} /></span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Method() {
  const { t } = useT();
  return (
    <section id="method" style={{ background: 'var(--bg-2)' }}>
      <Container>
        <div className="sec-head">
          <Reveal><span className="eyebrow">{t.method.eyebrow}</span></Reveal>
          <Reveal delay={80}><h2 className="pre" style={{ marginTop: 18 }}>{t.method.title}</h2></Reveal>
          <Reveal delay={140}><p className="sub">{t.method.sub}</p></Reveal>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
            position: 'relative',
          }}
        >
          {t.method.steps.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ position: 'relative', paddingTop: 36 }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: 'var(--line-strong)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: -5,
                    left: 0,
                    width: 10, height: 10,
                    borderRadius: 999,
                    background: 'var(--ink)',
                    border: '2px solid var(--bg-2)',
                  }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--teal-deep)', letterSpacing: '0.16em' }}>{s.k}</span>
                <h3 style={{ fontSize: 24, fontWeight: 600, marginTop: 12 }}>{s.t}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--ink-3)', marginTop: 12, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Deliverable() {
  const { t } = useT();
  return (
    <section>
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.05fr)',
            gap: 56,
            alignItems: 'center',
          }}
          className="deliv-grid"
        >
          <div>
            <Reveal><span className="eyebrow">{t.deliverable.eyebrow}</span></Reveal>
            <Reveal delay={80}>
              <h2 className="pre" style={{ marginTop: 18, fontSize: 'clamp(32px, 4vw, 52px)' }}>{t.deliverable.title}</h2>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ marginTop: 22, fontSize: 17, color: 'var(--ink-3)', maxWidth: 480 }}>{t.deliverable.sub}</p>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ marginTop: 32, display: 'grid', gap: 14, maxWidth: 480 }}>
                {[
                  { k: '01', t: t.locale === 'es' ? 'Scorecard ejecutivo de una página' : 'One-page executive scorecard' },
                  { k: '02', t: t.locale === 'es' ? 'Matriz de los 15 riesgos priorizados' : 'Matrix of the top 15 prioritised risks' },
                  { k: '03', t: t.locale === 'es' ? 'Roadmap 90 días con tiempos y responsables' : '90-day roadmap with timing and owners' },
                  { k: '04', t: t.locale === 'es' ? 'Carpeta de evidencias para auditoría' : 'Audit-ready evidence folder' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 0', borderTop: '1px solid var(--line)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--teal-deep)', letterSpacing: '0.12em', minWidth: 28 }}>{row.k}</span>
                    <span style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 500 }}>{row.t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <DeliverableMock label={t.deliverable.label} />
          </Reveal>
        </div>
      </Container>
      <style>{`
        @media (max-width: 960px) {
          .deliv-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function DeliverableMock({ label }) {
  const { t } = useT();
  const es = t.locale === 'es';
  return (
    <Tilt className="tilt-3d-soft">
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        borderRadius: 18,
        padding: 28,
        boxShadow: '0 30px 60px -30px rgba(14,20,22,0.18)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: 18 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>{es ? 'Informe Q-Start' : 'Q-Start report'}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)' }}>{label}</span>
      </div>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Stat label={es ? 'Nivel' : 'Level'} value="78" unit="/100" color="var(--teal-deep)" />
        <Stat label={es ? 'Riesgos altos' : 'High risks'} value="3" unit="" color="#c4574a" />
        <Stat label={es ? 'Acciones rápidas' : 'Quick wins'} value="12" unit="" color="#b88a3a" />
        <Stat label={es ? 'Plan 90 días' : '90-day plan'} value="15" unit={es ? 'acciones' : 'actions'} color="var(--ink)" />
      </div>

      <div style={{ marginTop: 26, display: 'grid', gap: 10 }}>
        {[
          { p: 'High', t: 'External forwarding habilitado en 3 buzones', tone: '#c4574a' },
          { p: 'High', t: 'DMARC en p=none — sin política activa', tone: '#c4574a' },
          { p: 'Med', t: 'MFA no forzado para 2 cuentas privilegiadas', tone: '#b88a3a' },
          { p: 'Med', t: 'Sin Conditional Access para acceso externo', tone: '#b88a3a' },
          { p: 'Low', t: 'TLS 1.0 habilitado en el dominio público', tone: '#78a5b0' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: r.tone, background: `${r.tone}1f`, padding: '3px 8px', borderRadius: 4, minWidth: 42, textAlign: 'center' }}>{r.p}</span>
            <span style={{ fontSize: 13.5, color: 'var(--ink)' }}>{r.t}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-4)' }}>#{1003 + i}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 22, padding: '14px 16px', background: 'var(--teal-soft)', borderRadius: 10, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--teal-deep)', letterSpacing: '0.04em' }}>
        {es ? '▸ Acciones rápidas (30 días): forzar MFA · cortar reenvíos · activar DMARC' : '▸ Quick wins (30 days): enforce MFA · stop forwarding · enable DMARC'}
      </div>
    </div>
    </Tilt>
  );
}

function Stat({ label, value, unit, color }) {
  return (
    <div style={{ padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 10 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color }}>{value}</span>
        {unit && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>{unit}</span>}
      </div>
    </div>
  );
}

function Sectors() {
  const { t } = useT();
  return (
    <section id="sectors" style={{ background: 'var(--bg-2)' }}>
      <Container>
        <div className="sec-head">
          <Reveal><span className="eyebrow">{t.sectors.eyebrow}</span></Reveal>
          <Reveal delay={80}><h2 style={{ marginTop: 18 }}>{t.sectors.title}</h2></Reveal>
          <Reveal delay={140}><p className="sub">{t.sectors.sub}</p></Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {t.sectors.items.map((s, i) => {
            const sectorHrefs = { 1: '/sectores/clinicas', 4: '/sectores/asesorias' };
            const href = sectorHrefs[i];
            const card = (
              <div
                className="card"
                style={{
                  padding: 26,
                  background: 'var(--bg-card)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  minHeight: 200,
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-4)', letterSpacing: '0.14em' }}>0{i + 1}</span>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 'auto' }}>{s.t}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.55 }}>{s.d}</p>
                {href && (
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--teal-deep)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {t.locale === 'es' ? 'Ver sector' : 'View sector'} <ArrowRight />
                  </span>
                )}
              </div>
            );
            return (
              <Reveal key={i} delay={i * 60}>
                {href ? <a href={href} style={{ display: 'block', height: '100%' }}>{card}</a> : card}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Resources() {
  const { t } = useT();
  return (
    <section id="resources">
      <Container>
        <div className="sec-head">
          <Reveal><span className="eyebrow">{t.resources.eyebrow}</span></Reveal>
          <Reveal delay={80}><h2 style={{ marginTop: 18 }}>{t.resources.title}</h2></Reveal>
          <Reveal delay={140}><p className="sub">{t.resources.sub}</p></Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {t.resources.items.map((r, i) => (
            <Reveal key={i} delay={i * 60}>
              <div
                className="card"
                style={{
                  padding: 28,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  minHeight: 260,
                }}
              >
                <DocIcon i={i} />
                <h3 style={{ fontSize: 19, fontWeight: 600, marginTop: 8 }}>{r.t}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.55 }}>{r.d}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>{r.tag}</span>
                  <a
                    href={r.href}
                    download
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--ink)',
                      fontWeight: 600,
                      fontSize: 13,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: 0,
                    }}
                  >
                    {t.locale === 'es' ? 'Descargar' : 'Download'} <ArrowRight />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function DocIcon({ i }) {
  const colors = ['#78a5b0', '#b88a3a', '#5b5b5f'];
  const c = colors[i % colors.length];
  return (
    <div
      style={{
        width: 56, height: 56,
        borderRadius: 12,
        background: `${c}1a`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 3h8l4 4v14H6V3z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 3v4h4" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 12h6M9 15h6M9 18h4" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function FAQ() {
  const { t } = useT();
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" style={{ background: 'var(--bg-2)' }}>
      <Container>
        <div className="sec-head">
          <Reveal><span className="eyebrow">{t.faq.eyebrow}</span></Reveal>
          <Reveal delay={80}><h2 style={{ marginTop: 18 }}>{t.faq.title}</h2></Reveal>
        </div>

        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          {t.faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 40}>
                <div style={{ borderTop: '1px solid var(--line-strong)' }}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'transparent',
                      border: 'none',
                      padding: '24px 0',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      alignItems: 'center',
                      gap: 24,
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 19,
                      letterSpacing: '-0.01em',
                      color: 'var(--ink)',
                    }}
                  >
                    {it.q}
                    <span
                      style={{
                        display: 'inline-flex',
                        width: 32, height: 32,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 999,
                        border: '1px solid var(--line-strong)',
                        transition: 'all 0.18s ease',
                        background: isOpen ? 'var(--ink)' : 'transparent',
                        color: isOpen ? 'var(--bg)' : 'var(--ink)',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d={isOpen ? 'M4 8h8' : 'M8 4v8M4 8h8'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.32s cubic-bezier(.22,.61,.36,1)',
                    }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ padding: '0 0 24px 0', fontSize: 16, color: 'var(--ink-3)', maxWidth: 740, lineHeight: 1.65 }}>{it.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
          <div style={{ borderTop: '1px solid var(--line-strong)' }} />
        </div>
      </Container>
    </section>
  );
}

function FinalCTA() {
  const { t } = useT();
  const { goto } = useRoute();
  return (
    <section className="dark" style={{ paddingTop: 120, paddingBottom: 120, position: 'relative', overflow: 'hidden' }}>
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob a1" />
        <div className="aurora-blob a2" />
        <div className="aurora-blob a3" />
      </div>
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 880 }}>
          <Reveal>
            <h2 className="pre" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>{t.finalCta.title}</h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ marginTop: 22, fontSize: 18, color: 'rgba(246,244,239,0.7)', maxWidth: 580 }}>{t.finalCta.sub}</p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Btn variant="primary" onDark onClick={() => goto('contact')}>
                {t.finalCta.primary} <ArrowRight />
              </Btn>
              <Btn as="a" href={`mailto:${window.QERUB_CONTACT.email}`} variant="ghost" onDark>
                {t.finalCta.secondary}
              </Btn>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function About() {
  const { t } = useT();
  return (
    <section id="about">
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: 56, alignItems: 'flex-start' }} className="about-grid">
          <div>
            <Reveal><span className="eyebrow">{t.about.eyebrow}</span></Reveal>
            <Reveal delay={80}>
              <h2 className="pre" style={{ marginTop: 18, fontSize: 'clamp(32px, 4vw, 52px)' }}>{t.about.title}</h2>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <div style={{ display: 'grid', gap: 18 }}>
                {t.about.body.map((p, i) => (
                  <p key={i} style={{ fontSize: 16.5, color: 'var(--ink-2)', lineHeight: 1.7 }}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ marginTop: 36, display: 'grid', gap: 16 }}>
                {t.about.values.map((v, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '14px 1fr', gap: 14, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                    <span style={{ marginTop: 8, width: 8, height: 8, borderRadius: 999, background: 'var(--teal-deep)' }} />
                    <div>
                      <h4 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{v.t}</h4>
                      <p style={{ fontSize: 14.5, color: 'var(--ink-3)' }}>{v.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 960px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

// ── Pilares (los 4 frentes de servicio) ──────────────────────────────────────
function Pillars() {
  const { t } = useT();
  const { goto } = useRoute();
  const p = t.pillars;
  if (!p) return null;
  // Lead with the same priority order as the hero (IA → software → staff → cyber).
  const order = ['Q-Intelligence', 'Q-Build', 'Q-Pod', 'Q-Secure'];
  const items = (p.items || []).slice().sort((a, b) => order.indexOf(a.code) - order.indexOf(b.code));
  return (
    <section id="pillars">
      <Container>
        <div className="sec-head">
          <Reveal><span className="eyebrow">{p.eyebrow}</span></Reveal>
          <Reveal delay={80}><h2 className="pre" style={{ marginTop: 18 }}>{p.title}</h2></Reveal>
          <Reveal delay={140}><p className="sub">{p.sub}</p></Reveal>
        </div>

        <div className="caps-list">
          {items.map((it, i) => {
            const MoreTag = it.href ? 'a' : 'button';
            const moreProps = it.href ? { href: it.href } : { type: 'button', onClick: () => goto(it.to) };
            return (
              <Reveal key={it.code} delay={i * 60}>
                <article className="cap-panel">
                  <div className="cap-head">
                    <span className="cap-code">{it.code}</span>
                    <span className="cap-status">{it.status}</span>
                  </div>
                  <h3 className="cap-name">{it.t}</h3>
                  <p className="cap-tagline">{it.tagline}</p>
                  {it.intro && <p className="cap-intro">{it.intro}</p>}
                  <ul className="cap-subs">
                    {(it.subs || []).map((s, j) => {
                      const inner = (<><strong>{s.n}</strong> — {s.d}</>);
                      return (
                        <li className="cap-sub" key={j}>
                          {s.href ? <a className="cap-sub-link" href={s.href}>{inner}</a> : inner}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="cap-foot">
                    <span className="cap-for">{it.forWhom}</span>
                    <MoreTag className="cap-more" {...moreProps}>
                      {t.locale === 'es' ? 'Ver en detalle' : 'See in detail'} <ArrowRight />
                    </MoreTag>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {p.note && (
          <Reveal delay={120}>
            <p style={{ marginTop: 26, fontSize: 13.5, color: 'var(--ink-3)', maxWidth: 760, lineHeight: 1.6, fontStyle: 'italic' }}>{p.note}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

// ── Mensajes por decisor (CEO / CIO / Talento) ───────────────────────────────
function Decisors() {
  const { t } = useT();
  const { goto } = useRoute();
  const d = t.decisors;
  if (!d) return null;
  return (
    <section style={{ background: 'var(--bg-2)' }}>
      <Container>
        <div className="sec-head">
          <Reveal><span className="eyebrow">{d.eyebrow}</span></Reveal>
          <Reveal delay={80}><h2 className="pre" style={{ marginTop: 18 }}>{d.title}</h2></Reveal>
          <Reveal delay={140}><p className="sub">{d.sub}</p></Reveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {d.items.map((it, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="card" style={{ padding: 30, height: '100%', display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--bg-card)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal-deep)' }}>{it.role}</span>
                <h3 style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.25 }}>{it.t}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--ink-3)', lineHeight: 1.6 }}>{it.d}</p>
                <button
                  onClick={() => goto('contact')}
                  style={{ marginTop: 'auto', textAlign: 'left', background: 'transparent', border: 'none', padding: '14px 0 0', color: 'var(--ink)', fontWeight: 600, fontSize: 13.5, display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  {it.cta} <ArrowRight />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ── Prueba honesta: métricas de método + CTA de cierre ───────────────────────
function Proof() {
  const { t } = useT();
  const { goto } = useRoute();
  const pr = t.proof;
  if (!pr) return null;
  return (
    <section className="tight" style={{ paddingTop: 80, paddingBottom: 88 }}>
      <Container>
        <div className="sec-head" style={{ marginBottom: 40 }}>
          <Reveal><span className="eyebrow">{pr.eyebrow}</span></Reveal>
          <Reveal delay={80}><h2 className="pre" style={{ marginTop: 18 }}>{pr.title}</h2></Reveal>
          <Reveal delay={140}><p className="sub">{pr.sub}</p></Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 24 }}>
          {pr.metrics.map((m, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: '8px 4px' }}>
                <div className="stat-num grad-text" style={{ fontSize: 'clamp(36px, 4.6vw, 56px)' }}>{m.v}<span style={{ fontSize: '0.5em' }}>{m.u}</span></div>
                <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.5, maxWidth: 230 }}>{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {pr.cta && (
          <Reveal delay={120}>
            <div
              className="glass"
              style={{ marginTop: 44, padding: '32px 34px', borderRadius: 18, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}
            >
              <div style={{ maxWidth: 640 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal-deep)', background: 'rgba(120,165,176,0.16)', border: '1px solid rgba(120,165,176,0.35)', padding: '4px 10px', borderRadius: 999 }}>{pr.cta.tag}</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginTop: 14 }}>{pr.cta.t}</h3>
                <p style={{ marginTop: 10, fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.6 }}>{pr.cta.d}</p>
              </div>
              <Btn variant="primary" onClick={() => goto('contact')}>{pr.cta.cta} <ArrowRight /></Btn>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

// ── Tres husos horarios (sedes con rol) ──────────────────────────────────────
// Dotted world map as a background layer. Dots react to the cursor (enlarge +
// push away) on canvas; 3 markers pulse. "Cover"-scaled to fill the section;
// markers are placed in px (same transform) so they track the map.
function GeoMap({ items }) {
  const areaRef = useRef(null);
  const cvRef = useRef(null);
  useEffect(() => {
    const W = qerubWorld(), D = W.d;
    const area = areaRef.current, cv = cvRef.current;
    if (!area || !cv) return;
    const section = area.closest('section') || area;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const M = W.m, arcs = [['us', 'es'], ['es', 'ar'], ['us', 'ar']];
    let cw = 0, ch = 0, scale = 1, ox = 0, oy = 0, cursor = null, raf = 0;
    const R = 80, PUSH = 8, BR = 1.4, XR = 2.2, BA = 0.2, XA = 0.7;
    const mp = (k) => [ox + M[k][0] * scale, oy + M[k][1] * scale];
    const drawArc = (a, b) => {
      const A = mp(a), B = mp(b);
      const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2 - Math.hypot(B[0] - A[0], B[1] - A[1]) * 0.22;
      ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.quadraticCurveTo(mx, my, B[0], B[1]); ctx.stroke();
    };
    const render = () => {
      ctx.clearRect(0, 0, cw, ch);
      ctx.strokeStyle = 'rgba(140,192,207,0.18)'; ctx.lineWidth = 1; ctx.setLineDash([2, 5]);
      for (let k = 0; k < arcs.length; k++) drawArc(arcs[k][0], arcs[k][1]);
      ctx.setLineDash([]);
      for (let i = 0; i < D.length; i += 2) {
        let bx = ox + D[i] * scale, by = oy + D[i + 1] * scale, x = bx, y = by, r = BR, a = BA;
        if (cursor) {
          const dx = bx - cursor.x, dy = by - cursor.y, d = Math.hypot(dx, dy);
          if (d < R) { const f = 1 - d / R, p = f * PUSH, inv = d ? 1 / d : 0; x = bx + dx * inv * p; y = by + dy * inv * p; r = BR + f * XR; a = BA + f * XA; }
        }
        ctx.beginPath(); ctx.fillStyle = 'rgba(140,192,207,' + a.toFixed(3) + ')'; ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
      }
    };
    const placeMarkers = () => {
      area.querySelectorAll('.gm').forEach((el) => {
        const k = el.getAttribute('data-mk'); if (!M[k]) return;
        const p = mp(k); el.style.left = p[0] + 'px'; el.style.top = p[1] + 'px'; el.style.opacity = '1';
      });
    };
    const size = () => {
      cw = area.clientWidth; ch = area.clientHeight; if (!cw || !ch) return;
      cv.width = Math.round(cw * dpr); cv.height = Math.round(ch * dpr);
      scale = Math.max(cw / W.w, ch / W.h); ox = (cw - W.w * scale) / 2; oy = (ch - W.h * scale) / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); placeMarkers(); render();
    };
    const onMove = (e) => { const rc = cv.getBoundingClientRect(); cursor = { x: e.clientX - rc.left, y: e.clientY - rc.top }; if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); }); };
    const onLeave = () => { cursor = null; render(); };
    if (!reduce) { section.addEventListener('pointermove', onMove); section.addEventListener('pointerleave', onLeave); }
    size();
    let ro = null;
    if (window.ResizeObserver) { ro = new ResizeObserver(size); ro.observe(area); } else { window.addEventListener('resize', size); }
    return () => {
      section.removeEventListener('pointermove', onMove); section.removeEventListener('pointerleave', onLeave);
      if (ro) ro.disconnect(); else window.removeEventListener('resize', size);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  const keyFor = (c) => /espa|spain/i.test(c) ? 'es' : (/argent/i.test(c) ? 'ar' : 'us');
  const seen = {};
  return (
    <div className="geo-bg" ref={areaRef} aria-hidden="true">
      <canvas ref={cvRef} className="geo-canvas" />
      {(items || []).map((c, i) => {
        const k = keyFor(c.city || '');
        if (seen[k]) return null; seen[k] = 1;
        return (
          <div key={i} className="gm" data-mk={k} style={{ opacity: 0 }}>
            <span className="gm-ring" style={{ animationDelay: (i * 0.8) + 's' }} />
            <span className="gm-dot" />
          </div>
        );
      })}
    </div>
  );
}

function Geo() {
  const { t } = useT();
  const g = t.geo;
  if (!g) return null;
  return (
    <section className="dark geo-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob a1" />
        <div className="aurora-blob a3" />
      </div>
      <GeoMap items={g.items} />
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div className="sec-head">
          <Reveal><span className="eyebrow">{g.eyebrow}</span></Reveal>
          <Reveal delay={80}><h2 className="pre" style={{ marginTop: 18 }}>{g.title}</h2></Reveal>
          <Reveal delay={140}><p className="sub" style={{ maxWidth: 560 }}>{g.sub}</p></Reveal>
        </div>
        <div className="geo-cards">
          {g.items.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="geo-card">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--teal-2)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{c.role}</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginTop: 12 }}>{c.city}</h3>
                <p style={{ fontSize: 14.5, color: 'rgba(246,244,239,0.72)', lineHeight: 1.6, marginTop: 10 }}>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

Object.assign(window, {
  BadgeMark, TrustStrip, StatsBand, Pillars, Decisors, Proof, Geo, Pains, Services, Method, Deliverable, DeliverableMock, Stat,
  Sectors, Resources, FAQ, FinalCTA, About,
});
