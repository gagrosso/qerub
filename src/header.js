function LangToggle({ onDark = false }) {
  const { lang, setLang } = useT();
  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: 3,
        background: onDark ? 'rgba(246,244,239,0.08)' : 'rgba(14,20,22,0.04)',
        border: onDark ? '1px solid rgba(246,244,239,0.18)' : '1px solid var(--line)',
        borderRadius: 999,
      }}
    >
      {['es', 'en'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          style={{
            border: 'none',
            background: lang === l ? (onDark ? 'var(--bg)' : 'var(--ink)') : 'transparent',
            color: lang === l ? (onDark ? 'var(--ink)' : 'var(--bg)') : (onDark ? 'rgba(246,244,239,0.65)' : 'var(--ink-3)'),
            padding: '6px 12px',
            borderRadius: 999,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.16s ease',
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Header() {
  const { t } = useT();
  const { route, goto } = useRoute();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { k: 'services', label: t.nav.services, anchor: 'services' },
    { k: 'method', label: t.nav.method, anchor: 'method' },
    { k: 'sectors', label: t.nav.sectors, anchor: 'sectors' },
    { k: 'resources', label: t.nav.resources, anchor: 'resources' },
    { k: 'about', label: t.nav.about, anchor: 'about' },
  ];

  const overDark = route === 'home' && !scrolled && !open;

  const handleNav = (anchor) => {
    setOpen(false);
    if (route !== 'home') {
      goto('home', anchor);
    } else {
      const el = document.getElementById(anchor);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(246, 244, 239, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(140%) blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(140%) blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
          gap: 24,
        }}
      >
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); goto('home'); }}
          aria-label="Qerub home"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <QWordmark height={24} onDark={overDark} />
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navItems.map((it) => (
            <button
              key={it.k}
              onClick={() => handleNav(it.anchor)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '8px 14px',
                color: overDark ? 'rgba(246,244,239,0.82)' : 'var(--ink-2)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '0.01em',
                borderRadius: 8,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = overDark ? '#8cc0cf' : 'var(--teal-deep)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = overDark ? 'rgba(246,244,239,0.82)' : 'var(--ink-2)')}
            >
              {it.label}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LangToggle onDark={overDark} />
          <Btn
            variant="primary"
            onDark={overDark}
            onClick={() => goto('contact')}
            style={{ padding: '10px 18px', fontSize: 13.5 }}
          >
            {t.nav.cta}
            <ArrowRight />
          </Btn>
          <button
            className="mobile-toggle"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            style={{
              display: 'none',
              border: overDark ? '1px solid rgba(246,244,239,0.3)' : '1px solid var(--line-strong)',
              background: 'transparent',
              color: overDark ? 'var(--bg)' : 'var(--ink)',
              borderRadius: 999,
              padding: 10,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 7h16M4 17h16'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }} className="mobile-menu">
          <Container style={{ padding: '16px 32px 24px' }}>
            <div style={{ display: 'grid', gap: 4 }}>
              {navItems.map((it) => (
                <button
                  key={it.k}
                  onClick={() => handleNav(it.anchor)}
                  style={{
                    textAlign: 'left',
                    border: 'none',
                    background: 'transparent',
                    padding: '14px 0',
                    borderBottom: '1px solid var(--line)',
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  {it.label}
                </button>
              ))}
            </div>
          </Container>
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
        }
        @media (min-width: 981px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </header>
  );
}

Object.assign(window, { Header, LangToggle });
