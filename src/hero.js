function Hero() {
  const { t } = useT();
  const { goto } = useRoute();
  const h = t.hero;

  return (
    <section id="home" className="dark" style={{ paddingTop: 150, paddingBottom: 90, position: 'relative', overflow: 'hidden', background: 'var(--dark)' }}>
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
          {/* Left: text */}
          <div>
            <Reveal>
              <Pill theme="dark">{h.eyebrow}</Pill>
            </Reveal>
            <Reveal delay={80}>
              <h1
                className="pre"
                style={{
                  fontSize: 'clamp(40px, 5.5vw, 72px)',
                  marginTop: 24,
                  maxWidth: '14ch',
                }}
              >
                {h.title}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p
                style={{
                  marginTop: 28,
                  fontSize: 19,
                  color: 'rgba(246,244,239,0.72)',
                  maxWidth: 580,
                  lineHeight: 1.55,
                }}
              >
                {h.sub}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
                <Btn variant="primary" onDark onClick={() => goto('contact')}>
                  {h.primary} <ArrowRight />
                </Btn>
                <Btn variant="ghost" onDark onClick={() => {
                  const el = document.getElementById('services');
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}>
                  {h.secondary}
                </Btn>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 18px',
                    borderRadius: 999,
                    background: 'var(--dark-2)',
                    border: '1px solid rgba(246,244,239,0.14)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '0.04em',
                    color: 'rgba(246,244,239,0.85)',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 8, height: 8, borderRadius: 999,
                      background: '#5db58e',
                      boxShadow: '0 0 0 4px rgba(93,181,142,0.18)',
                      animation: 'pulse 1.8s ease-in-out infinite',
                    }}
                  />
                  {h.tag}
                </div>
                {h.presence && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '14px 18px',
                      borderRadius: 999,
                      border: '1px solid rgba(246,244,239,0.10)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      letterSpacing: '0.04em',
                      color: 'rgba(246,244,239,0.6)',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.2"></circle><path d="M1.6 8h12.8M8 1.6c2.2 1.8 2.2 11 0 12.8M8 1.6c-2.2 1.8-2.2 11 0 12.8" stroke="currentColor" strokeWidth="1.2"></path></svg>
                    {h.presence}
                  </div>
                )}
              </div>
              <style>{`
                @keyframes pulse {
                  0%, 100% { box-shadow: 0 0 0 4px rgba(93,181,142,0.18); }
                  50% { box-shadow: 0 0 0 7px rgba(93,181,142,0.05); }
                }
              `}</style>
            </Reveal>
          </div>

          {/* Right: visual */}
          <Reveal delay={200}>
            <HeroVisual />
          </Reveal>
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
    <div style={{ position: 'relative', minHeight: 540 }}>
      {/* Decorative ring backdrop */}
      <div style={{ position: 'absolute', inset: -40, opacity: 0.7, pointerEvents: 'none' }}>
        <QHeroMark size="100%" theme="dark" />
      </div>

      {/* Scorecard card */}
      <div
        className="glass"
        style={{
          position: 'absolute',
          right: 0,
          top: 40,
          width: 'min(380px, 90%)',
          borderRadius: 18,
          padding: 24,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            Q-Start · Scorecard
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--teal-deep)' }}>v1.0</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 64, fontWeight: 700, lineHeight: 1, color: 'var(--ink)' }}>{scoreInt}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-3)' }}>/ 100</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#b88a3a', background: 'rgba(184,138,58,0.12)', padding: '4px 8px', borderRadius: 6 }}>
            +44 pts roadmap
          </span>
        </div>

        <div style={{ marginTop: 14, height: 8, background: 'rgba(14,20,22,0.06)', borderRadius: 999, overflow: 'hidden' }}>
          <div
            style={{
              width: `${scoreInt}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #b88a3a, #78a5b0)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        <div style={{ marginTop: 22, display: 'grid', gap: 10 }}>
          {[
            { k: 'Identity & MFA', v: 62, c: '#b88a3a' },
            { k: 'Email (SPF/DKIM/DMARC)', v: 28, c: '#c4574a' },
            { k: 'Microsoft 365 hardening', v: 71, c: '#78a5b0' },
            { k: 'Backups & continuity', v: 55, c: '#b88a3a' },
            { k: 'Incident response', v: 12, c: '#c4574a' },
          ].map((row) => (
            <div key={row.k} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink)' }}>{row.k}</div>
                <div style={{ marginTop: 4, height: 4, background: 'rgba(14,20,22,0.06)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${row.v}%`, height: '100%', background: row.c }} />
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: row.c, minWidth: 30, textAlign: 'right' }}>{row.v}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 22,
            paddingTop: 14,
            borderTop: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            color: 'var(--ink-3)',
            letterSpacing: '0.05em',
          }}
        >
          <span>NIST CSF 2.0 · CIS IG1</span>
          <span style={{ color: 'var(--teal-deep)' }}>15 acciones priorizadas →</span>
        </div>
      </div>

      {/* Small chip card */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 40,
          background: 'var(--dark-3)',
          color: 'var(--bg)',
          borderRadius: 14,
          padding: '16px 18px',
          maxWidth: 240,
          border: '1px solid rgba(246,244,239,0.12)',
          boxShadow: '0 20px 40px -20px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8cc0cf' }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: '#8cc0cf' }} />
          MFA enforced
        </div>
        <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.4 }}>
          17 / 17 cuentas privilegiadas con MFA activado en las últimas 48h.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Hero, HeroVisual });
