// The 4 fronts that lead the site, in priority order.
function heroFronts(es) {
  return [
    {
      code: 'Q-Intelligence',
      name: es ? 'IA + Analítica Avanzada' : 'AI + Advanced Analytics',
      title: es ? 'Decisiones con IA y datos, no con corazonadas.' : 'Decisions driven by AI and data, not hunches.',
      sub: es ? 'Modelos, analítica avanzada y automatización aplicados a tu negocio, con resultados medibles.' : 'Models, advanced analytics and automation applied to your business, with measurable results.',
      icon: 'ai',
    },
    {
      code: 'Q-Build',
      name: es ? 'Software con Agentes IA' : 'Software built with AI agents',
      title: es ? 'Software a medida, construido con agentes de IA.' : 'Custom software, built with AI agents.',
      sub: es ? 'Producto y modernización más rápidos, con alcance y precio cerrados. El código es tuyo.' : 'Faster product and modernization, with fixed scope and price. The code is yours.',
      icon: 'agents',
    },
    {
      code: 'Q-Pod',
      name: es ? 'Staff Augmentation' : 'Staff Augmentation',
      title: es ? 'Talento senior integrado en tu equipo, en días.' : 'Senior talent embedded in your team, in days.',
      sub: es ? 'Especialistas de IA, datos, cloud y software que trabajan en tu huso horario. Sin junior facturados.' : 'AI, data, cloud and software specialists working in your time zone. No junior staff billed.',
      icon: 'staff',
    },
    {
      code: 'Q-Secure',
      name: es ? 'Ciberseguridad' : 'Cybersecurity',
      title: es ? 'Seguridad como ventaja, no como freno.' : 'Security as an advantage, not a brake.',
      sub: es ? 'Auditoría, Microsoft 365, anti-fraude y vCISO. Nuestro pilar más maduro.' : 'Assessment, Microsoft 365, anti-fraud and vCISO. Our most mature pillar.',
      icon: 'secure',
    },
  ];
}

// Line-icon set for the hero fronts (stroke = currentColor).
function HeroFrontIcon({ name }) {
  const paths = {
    ai:     <><path d="M11 3.5 12.7 8.3 17.5 10 12.7 11.7 11 16.5 9.3 11.7 4.5 10 9.3 8.3Z" /><path d="M18 13.5 18.7 15.3 20.5 16 18.7 16.7 18 18.5 17.3 16.7 15.5 16 17.3 15.3Z" /></>,
    agents: <><path d="m8.5 8-3.5 4 3.5 4" /><path d="m15.5 8 3.5 4-3.5 4" /><path d="M12 3.6l.6 1.7L14.3 6l-1.7.7L12 8.3l-.6-1.6L9.7 6l1.7-.7Z" /></>,
    staff:  <><path d="M9.5 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="M4 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><path d="M16 5.6a3 3 0 0 1 0 6.2" /><path d="M17 15.4c2.1.5 3.8 2.3 3.8 4.6" /></>,
    secure: <><path d="M12 3 5 5.6v5.4c0 4 2.9 6.6 7 8 4.1-1.4 7-4 7-8V5.6L12 3Z" /><path d="m9 11.6 2 2 4-4" /></>,
  };
  return paths[name] || null;
}

// Hero centerpiece: a shield-diamond with the Q logo at its core. Each of the four
// triangular facets carries one front and lights up as the hero scrubs through it.
function HeroNucleo({ fronts }) {
  // [path, fill, icon, icon-x, icon-y] per facet (clockwise from upper-left).
  const facets = [
    { d: 'M58 66 L170 66 L170 170 L44 170 Q46 110 58 66 Z', fill: '#6aa0ac', x: 112, y: 116 },
    { d: 'M170 66 L282 66 Q294 110 296 170 L170 170 Z',     fill: '#4d7e8a', x: 228, y: 116 },
    { d: 'M170 170 L296 170 Q286 252 170 304 Z',            fill: '#5d8b97', x: 224, y: 220 },
    { d: 'M170 170 L170 304 Q54 252 44 170 Z',              fill: '#588f9b', x: 116, y: 220 },
  ];
  const tiltRef = useRef(null);
  // 3D tilt + parallax: el escudo se inclina siguiendo el cursor por todo el hero.
  useEffect(() => {
    const tilt = tiltRef.current; if (!tilt) return;
    const section = tilt.closest('section') || tilt.parentElement;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!mq.matches || !section) return;
    const MAX = 9; let raf = 0, rx = 0, ry = 0;
    const apply = () => { raf = 0; tilt.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)'; };
    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      ry = nx * MAX * 2; rx = -ny * MAX * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => { tilt.style.transform = 'rotateX(0deg) rotateY(0deg)'; };
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    return () => { section.removeEventListener('pointermove', onMove); section.removeEventListener('pointerleave', onLeave); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="hn-scene" style={{ width: 'min(460px, 92%)', margin: '0 auto', perspective: '1000px' }}>
      <div className="hn-tilt" ref={tiltRef}>
        <div className="hn-wrap" style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
      <svg viewBox="0 0 340 340" width="100%" height="100%" role="img" aria-label="Núcleo Qerub: IA y analítica, software con agentes IA, staff augmentation y ciberseguridad">
        <defs>
          <radialGradient id="hnGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8cc0cf" stopOpacity="0.20" />
            <stop offset="65%" stopColor="#78a5b0" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#78a5b0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="170" cy="170" r="168" fill="url(#hnGlow)" />
        <circle cx="170" cy="170" r="158" fill="none" stroke="rgba(246,244,239,0.08)" strokeWidth="1" />
        {facets.map((f, i) => (
          <path
            key={'f' + i}
            className="hn-facet"
            data-i={i}
            d={f.d}
            fill={f.fill}
            stroke="rgba(246,244,239,0.24)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ transition: 'opacity 0.45s ease' }}
          />
        ))}
        {/* Always-on shield outline so the silhouette reads at any state */}
        <path d="M58 66 L282 66 Q294 110 296 170 Q286 252 170 304 Q54 252 44 170 Q46 110 58 66 Z" fill="none" stroke="rgba(246,244,239,0.24)" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Center cutout for the Q */}
        <circle cx="170" cy="170" r="52" fill="var(--dark)" stroke="rgba(140,192,207,0.55)" strokeWidth="1.5" />
        {facets.map((f, i) => (
          <g
            key={'i' + i}
            className="hn-ic"
            data-i={i}
            transform={`translate(${f.x - 16},${f.y - 16}) scale(1.33)`}
            fill="none"
            stroke="#eef4f3"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'opacity 0.45s ease' }}
          >
            <HeroFrontIcon name={fronts[i].icon} />
          </g>
        ))}
      </svg>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%) translateZ(42px)', width: '20%', display: 'flex', justifyContent: 'center' }}>
          <QMark size="100%" />
        </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const { t } = useT();
  const { goto } = useRoute();
  const h = t.hero;
  const es = t.locale === 'es';
  const fronts = heroFronts(es);
  const heroRef = useRef(null);
  const slidesRef = useRef(null);

  const scrollToServices = () => {
    const el = document.getElementById('pillars') || document.getElementById('services');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  // Pinned, scrub-linked conveyor: the left message hands off front by front while the
  // matching facet of the shield lights up. Fails open (CSS shows the first front only,
  // shield fully lit, no pin) without GSAP / a real viewport / motion. Desktop only.
  useEffect(() => {
    const g = window.gsap, ST = window.ScrollTrigger;
    if (!g || !ST || !window.innerHeight) return;
    g.registerPlugin(ST);
    const section = heroRef.current, wrap = slidesRef.current;
    if (!section || !wrap) return;
    const slideEls = Array.from(wrap.querySelectorAll('.hero-slide'));
    const dots = Array.from(section.querySelectorAll('.hero-dot'));
    const label = section.querySelector('.hero-progress-label');
    const facetEls = Array.from(section.querySelectorAll('.hn-facet'));
    const iconEls = Array.from(section.querySelectorAll('.hn-ic'));
    const n = slideEls.length;
    const lightTo = (idx) => {
      facetEls.forEach((f, i) => {
        const on = i === idx;
        f.style.opacity = on ? 1 : 0.26;
        f.style.filter = on ? 'drop-shadow(0 0 10px rgba(140,192,207,0.6))' : 'none';
      });
      iconEls.forEach((ic, i) => { ic.style.opacity = i === idx ? 1 : 0.28; });
    };
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
        lightTo(idx);
      };
      lightTo(0);
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
        facetEls.forEach((f) => { f.style.opacity = 1; f.style.filter = 'none'; });
        iconEls.forEach((ic) => { ic.style.opacity = 1; });
      };
    });
    return () => mm.revert();
  }, [fronts.length, es]);

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
          {/* Left: cycling fronts */}
          <div>
            <Pill theme="dark">{h.eyebrow}</Pill>

            <div className="hero-slides" ref={slidesRef} style={{ marginTop: 18 }}>
              {fronts.map((f, i) => (
                <div className="hero-slide" key={i}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8cc0cf', marginBottom: 14 }}>
                    0{i + 1} · {f.name}
                  </div>
                  <h1 className="pre" style={{ fontSize: 'clamp(30px, 3.6vw, 48px)', maxWidth: '600px' }}>{f.title}</h1>
                  <p style={{ marginTop: 18, fontSize: 16.5, color: 'rgba(246,244,239,0.72)', maxWidth: 540, lineHeight: 1.55 }}>{f.sub}</p>
                </div>
              ))}
            </div>

            {/* Persistent CTAs */}
            <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
              <Btn variant="primary" onDark onClick={() => goto('contact')}>{h.primary} <ArrowRight /></Btn>
              <Btn variant="ghost" onDark onClick={scrollToServices}>{h.secondary}</Btn>
            </div>

            {/* Progress (only shown when the carousel is active) */}
            <div className="hero-progress" aria-hidden="true">
              <div className="hero-dots">
                {fronts.map((_, i) => <span className={'hero-dot' + (i === 0 ? ' active' : '')} key={i} />)}
              </div>
              <span className="hero-progress-label">01 / 0{fronts.length}</span>
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

          {/* Right: animated shield-diamond núcleo */}
          <HeroNucleo fronts={fronts} />
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

Object.assign(window, { Hero, HeroNucleo, HeroFrontIcon });
