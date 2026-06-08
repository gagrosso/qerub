// Shared components for Qerub site
const { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } = React;

// i18n context
const I18nContext = createContext({ t: window.QERUB_COPY.es, lang: 'es', setLang: () => {} });

function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const stored = localStorage.getItem('qerub_lang');
      if (stored === 'es' || stored === 'en') return stored;
    } catch (e) {}
    return 'es';
  });
  useEffect(() => {
    try { localStorage.setItem('qerub_lang', lang); } catch (e) {}
    document.documentElement.lang = lang;
  }, [lang]);
  const t = window.QERUB_COPY[lang];
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

// Reveal — no-op (always visible). Animation removed due to environment issue.
function Reveal({ children, as: As = 'div', className = '', style }) {
  return (
    <As className={className} style={style}>
      {children}
    </As>
  );
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
  Reveal, Container, Btn, ArrowRight, Pill,
});
