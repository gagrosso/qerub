// All home sections: trust, pains, services, method, deliverable, sectors, resources, faq, finalCta

function TrustStrip() {
  const { t } = useT();
  const items = t.trust.items;
  return (
    <section className="tight" style={{ paddingTop: 0, paddingBottom: 56 }}>
      <Container>
        <Reveal>
          <div
            className="trust-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
              padding: '24px 32px',
              borderTop: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', flex: '0 0 auto' }}>
              {t.trust.title}
            </span>
            <div className="marquee">
              <div className="marquee-track">
                {[...items, ...items].map((it, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--teal)', opacity: 0.55 }} />
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, letterSpacing: '0.02em', color: 'var(--ink-2)', opacity: 0.82 }}>{it}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
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
  const { goto } = useRoute();
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
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {t.services.items.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <Tilt max={6} style={{ height: '100%' }}>
              <div
                className="card"
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
            </Reveal>
          ))}
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
            const sectorHrefs = { 0: '/sectores/asesorias', 2: '/sectores/clinicas' };
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

Object.assign(window, {
  TrustStrip, StatsBand, Pains, Services, Method, Deliverable, DeliverableMock, Stat,
  Sectors, Resources, FAQ, FinalCTA, About,
});
