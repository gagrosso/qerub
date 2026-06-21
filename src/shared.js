// Shared components for Qerub site
const { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo, createContext, useContext } = React;

// i18n context
const I18nContext = createContext({ t: window.QERUB_COPY.es, lang: 'es', setLang: () => {} });

function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const stored = localStorage.getItem('qerub_lang');
      if (stored === 'en') return 'en-US';            // migrate legacy key
      if (window.QERUB_COPY[stored]) return stored;
    } catch (e) {}
    return 'es';
  });
  useEffect(() => {
    try { localStorage.setItem('qerub_lang', lang); } catch (e) {}
    document.documentElement.lang = lang;
  }, [lang]);
  const t = window.QERUB_COPY[lang] || window.QERUB_COPY.es;
  return <I18nContext.Provider value={{ t, lang, setLang }}>{children}</I18nContext.Provider>;
}

const useT = () => useContext(I18nContext);

// Route context — single-page sections + service detail pages
const RouteContext = createContext({ route: 'home', goto: () => {} });
function RouteProvider({ children }) {
  const [route, setRoute] = useState(() => {
    const h = (window.location.hash || '').replace('#', '');
    if (['home', 'services', 'about', 'contact'].includes(h)) return h;
    return 'home';
  });
  const goto = useCallback((r, anchor) => {
    setRoute(r);
    if (anchor) {
      // wait a tick for render
      requestAnimationFrame(() => {
        const el = document.getElementById(anchor);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.location.hash = r;
  }, []);
  return <RouteContext.Provider value={{ route, goto }}>{children}</RouteContext.Provider>;
}
const useRoute = () => useContext(RouteContext);

// Reveal — fades + lifts its children into view on scroll (IntersectionObserver).
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fails open: content is visible by default. We only "arm" the hidden→reveal
// animation when the environment is healthy (real viewport + IntersectionObserver
// + motion allowed). If anything is off, content simply shows — never blank.
function Reveal({ children, as: As = 'div', className = '', style, delay = 0 }) {
  const ref = useRef(null);
  const [state, setState] = useState('idle'); // idle (visible) | armed (hidden) | visible
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const healthy =
      typeof IntersectionObserver !== 'undefined' &&
      window.innerHeight > 0 &&
      !prefersReducedMotion();
    if (!healthy) return; // stay visible, no animation
    setState('armed'); // hide before paint to avoid flash
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setState('visible'); io.disconnect(); }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls =
    'reveal' +
    (state === 'armed' || state === 'visible' ? ' armed' : '') +
    (state === 'visible' ? ' is-visible' : '') +
    (className ? ' ' + className : '');
  return (
    <As ref={ref} className={cls} style={{ ...style, transitionDelay: state === 'visible' ? `${delay}ms` : '0ms' }}>
      {children}
    </As>
  );
}

// Counter — animates a number from 0 → `to` the first time it scrolls into view.
function Counter({ to = 0, prefix = '', suffix = '', dur = 1500 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined' || !window.innerHeight || prefersReducedMotion()) {
      setVal(to);
      return;
    }
    let raf, start, fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !fired) {
            fired = true; io.disconnect();
            const tick = (ts) => {
              if (!start) start = ts;
              const p = Math.min((ts - start) / dur, 1);
              setVal(to * (1 - Math.pow(1 - p, 3)));
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{prefix}{Math.round(val)}{suffix}</span>;
}

// 3D cursor-tilt for showcase cards. Desktop pointer only; honours reduced motion.
function Tilt({ children, max = 9, className = '', style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1100px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`;
      });
    };
    const leave = () => { if (raf) cancelAnimationFrame(raf); el.style.transform = ''; };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max]);
  return (
    <div ref={ref} className={`tilt ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

// Slim scroll-progress bar fixed at the top of the viewport.
function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return <div id="q-progress" ref={ref} aria-hidden="true" />;
}

// Container
function Container({ children, style, className = '' }) {
  return <div className={`container ${className}`} style={style}>{children}</div>;
}

// Button
function Btn({ as: As = 'button', variant = 'primary', onDark = false, children, ...rest }) {
  const cls = `btn btn-${variant} ${onDark ? 'btn-on-dark' : ''}`;
  return (
    <As className={cls} {...rest}>
      {children}
    </As>
  );
}

// Arrow icon
function ArrowRight({ size = 14 }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Pill / badge
function Pill({ children, theme = 'light' }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 12px',
        borderRadius: 999,
        border: `1px solid ${theme === 'light' ? 'rgba(14,20,22,0.12)' : 'rgba(246,244,239,0.18)'}`,
        background: theme === 'light' ? 'rgba(120,165,176,0.08)' : 'rgba(140,192,207,0.08)',
        color: theme === 'light' ? 'var(--teal-deep)' : 'var(--teal-2)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: theme === 'light' ? '#4d7e8a' : '#8cc0cf' }} />
      {children}
    </span>
  );
}

Object.assign(window, {
  I18nProvider, I18nContext, useT,
  RouteProvider, RouteContext, useRoute,
  Reveal, Counter, ScrollProgress, Tilt, Container, Btn, ArrowRight, Pill,
});
