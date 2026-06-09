// Cookie banner + customise modal. Mounts at root level.

function useCookieConsent() {
  const [consent, setConsent] = useState(() => {
    try {
      const raw = localStorage.getItem('qerub_consent');
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  });
  const save = useCallback((value) => {
    try { localStorage.setItem('qerub_consent', JSON.stringify({ ...value, at: Date.now() })); } catch (e) {}
    setConsent(value);
  }, []);
  const reset = useCallback(() => {
    try { localStorage.removeItem('qerub_consent'); } catch (e) {}
    setConsent(null);
  }, []);
  return { consent, save, reset };
}

// Holds the consent helpers globally so the footer can reopen the panel
window.__qerubConsent = window.__qerubConsent || { request: () => {} };

function CookieRoot() {
  const { t } = useT();
  const c = t.cookies;
  const { consent, save } = useCookieConsent();
  const [open, setOpen] = useState(false);          // banner shown?
  const [customise, setCustomise] = useState(false); // modal shown?

  // Show banner on first visit
  useEffect(() => {
    if (consent === null) {
      const tm = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(tm);
    }
  }, [consent]);

  // Expose a global to reopen from the footer link
  useEffect(() => {
    window.__qerubConsent.request = () => { setCustomise(true); setOpen(false); };
  }, []);

  const acceptAll = () => {
    save({ necessary: true, analytics: true, marketing: true, preferences: true });
    setOpen(false);
    setCustomise(false);
  };
  const rejectAll = () => {
    save({ necessary: true, analytics: false, marketing: false, preferences: false });
    setOpen(false);
    setCustomise(false);
  };

  return (
    <>
      {open && !customise && (
        <CookieBanner
          t={t}
          c={c}
          onAccept={acceptAll}
          onReject={rejectAll}
          onCustomise={() => setCustomise(true)}
        />
      )}
      {customise && (
        <CookieModal
          t={t}
          c={c}
          initial={consent || { necessary: true, analytics: false, marketing: false, preferences: false }}
          onSave={(v) => { save(v); setCustomise(false); setOpen(false); }}
          onAccept={acceptAll}
          onReject={rejectAll}
          onClose={() => { setCustomise(false); if (consent === null) setOpen(true); }}
        />
      )}
    </>
  );
}

function CookieBanner({ t, c, onAccept, onReject, onCustomise }) {
  return (
    <div
      role="dialog"
      aria-label={c.title}
      style={{
        position: 'fixed',
        left: 24,
        right: 24,
        bottom: 24,
        zIndex: 80,
        display: 'flex',
        justifyContent: 'center',
        animation: 'qSlideUp 0.4s cubic-bezier(.22,.61,.36,1) both',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          maxWidth: 880,
          width: '100%',
          background: 'var(--dark)',
          color: 'var(--bg)',
          border: '1px solid rgba(246,244,239,0.10)',
          borderRadius: 18,
          padding: '22px 26px',
          boxShadow: '0 30px 60px -30px rgba(0,0,0,0.5)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 24,
          alignItems: 'center',
        }}
        className="cookie-banner"
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <span
            style={{
              flex: '0 0 auto',
              width: 36, height: 36, borderRadius: 999,
              background: 'rgba(140,192,207,0.14)',
              color: 'var(--teal-2)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2a8 8 0 108 8c0-.5-.05-1-.14-1.48a3 3 0 01-3.86-3.86A8 8 0 0010 2z" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="7" cy="9" r="1" fill="currentColor" />
              <circle cx="11" cy="13" r="1" fill="currentColor" />
              <circle cx="13" cy="8" r="0.8" fill="currentColor" />
            </svg>
          </span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
              {c.title}
            </div>
            <p style={{ fontSize: 13.5, color: 'rgba(246,244,239,0.78)', lineHeight: 1.55 }}>
              {c.body}{' '}
              <a
                href="/legal/politica-cookies.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--teal-2)', textDecoration: 'underline', textUnderlineOffset: 2 }}
              >
                {c.policyLink}
              </a>
              .
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }} className="cookie-actions">
          <button
            onClick={onCustomise}
            style={cookieBtnStyle('ghost')}
          >
            {c.customize}
          </button>
          <button
            onClick={onReject}
            style={cookieBtnStyle('ghost')}
          >
            {c.reject}
          </button>
          <button
            onClick={onAccept}
            style={cookieBtnStyle('primary')}
          >
            {c.accept}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes qSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 720px) {
          .cookie-banner {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
          }
          .cookie-actions {
            justify-content: stretch !important;
          }
          .cookie-actions button {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}

function cookieBtnStyle(kind) {
  const base = {
    border: '1px solid transparent',
    padding: '10px 18px',
    borderRadius: 999,
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: 13.5,
    cursor: 'pointer',
    transition: 'all 0.16s ease',
    whiteSpace: 'nowrap',
  };
  if (kind === 'primary') {
    return { ...base, background: 'var(--bg)', color: 'var(--ink)' };
  }
  return { ...base, background: 'transparent', color: 'var(--bg)', borderColor: 'rgba(246,244,239,0.25)' };
}

function CookieModal({ t, c, initial, onSave, onAccept, onReject, onClose }) {
  const [prefs, setPrefs] = useState(initial);
  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={c.title}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        background: 'rgba(14,20,22,0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        animation: 'qFadeBg 0.18s ease both',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: 'var(--bg)',
          color: 'var(--ink)',
          maxWidth: 640,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 20,
          border: '1px solid var(--line)',
          boxShadow: '0 40px 80px -30px rgba(14,20,22,0.4)',
          animation: 'qScaleIn 0.22s cubic-bezier(.22,.61,.36,1) both',
        }}
      >
        {/* Header */}
        <div style={{ padding: '28px 32px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div>
            <span className="eyebrow">Qerub</span>
            <h3 style={{ marginTop: 12, fontSize: 24, fontWeight: 700 }}>{c.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              border: '1px solid var(--line-strong)',
              background: 'transparent',
              width: 36, height: 36,
              borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 32px' }}>
          <p style={{ fontSize: 14.5, color: 'var(--ink-3)', lineHeight: 1.65 }}>{c.body}</p>
          <p style={{ marginTop: 12, fontSize: 14.5, color: 'var(--ink-3)', lineHeight: 1.65 }}>{c.bodyMore}</p>

          <div style={{ marginTop: 24, display: 'grid', gap: 10 }}>
            {c.categories.map((cat) => {
              const checked = !!prefs[cat.k];
              const locked = !!cat.locked;
              return (
                <div
                  key={cat.k}
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: 12,
                    padding: '14px 16px',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 16,
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)' }}>{cat.t}</div>
                    <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>{cat.d}</p>
                  </div>
                  <Toggle
                    checked={locked ? true : checked}
                    locked={locked}
                    onChange={(v) => !locked && setPrefs({ ...prefs, [cat.k]: v })}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '20px 32px',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
          className="cookie-modal-foot"
        >
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={onReject} style={modalBtnStyle('ghost')}>{c.reject}</button>
            <button onClick={onAccept} style={modalBtnStyle('ghost')}>{c.accept}</button>
          </div>
          <button onClick={() => onSave(prefs)} style={modalBtnStyle('primary')}>{c.save}</button>
        </div>
      </div>

      <style>{`
        @keyframes qFadeBg { from { opacity: 0; } to { opacity: 1; } }
        @keyframes qScaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (max-width: 520px) {
          .cookie-modal-foot { flex-direction: column-reverse; align-items: stretch; }
          .cookie-modal-foot button { width: 100%; }
        }
      `}</style>
    </div>
  );
}

function modalBtnStyle(kind) {
  const base = {
    border: '1px solid transparent',
    padding: '11px 18px',
    borderRadius: 999,
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: 13.5,
    cursor: 'pointer',
    transition: 'all 0.16s ease',
    whiteSpace: 'nowrap',
  };
  if (kind === 'primary') {
    return { ...base, background: 'var(--ink)', color: 'var(--bg)' };
  }
  return { ...base, background: 'transparent', color: 'var(--ink)', borderColor: 'var(--line-strong)' };
}

function Toggle({ checked, onChange, locked = false }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-disabled={locked}
      disabled={locked}
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 26,
        border: 'none',
        borderRadius: 999,
        padding: 0,
        background: checked ? 'var(--teal-deep)' : 'rgba(14,20,22,0.18)',
        position: 'relative',
        cursor: locked ? 'not-allowed' : 'pointer',
        transition: 'background 0.18s ease',
        opacity: locked ? 0.65 : 1,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: checked ? 21 : 3,
          width: 20, height: 20,
          background: '#fff',
          borderRadius: 999,
          transition: 'left 0.18s cubic-bezier(.22,.61,.36,1)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
        }}
      />
    </button>
  );
}

Object.assign(window, { CookieRoot, CookieBanner, CookieModal, Toggle, useCookieConsent });
