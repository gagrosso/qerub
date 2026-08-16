function Footer() {
  const { t } = useT();
  const { goto } = useRoute();
  const f = t.footer;
  return (
    <footer style={{ background: 'var(--dark)', color: 'rgba(246,244,239,0.72)', paddingTop: 80, paddingBottom: 40, marginTop: 0 }}>
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))',
            gap: 48,
            paddingBottom: 56,
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <QWordmark height={26} onDark withTagline />
            <p style={{ marginTop: 20, fontSize: 14.5, maxWidth: 320, lineHeight: 1.6, color: 'rgba(246,244,239,0.68)' }}>
              {f.base}
            </p>
          </div>

          <FooterCol title={f.cols.services} items={f.links.services} onClick={(idx) => {
            const hubs = [null, '/servicios/consultoria-ia-datos-empresa', '/servicios/desarrollo-software-medida-empresa', '/servicios/staff-augmentation-nearshore'];
            if (idx === 0) goto('services');
            else if (hubs[idx]) window.location.href = hubs[idx];
          }} />
          <FooterCol title={f.cols.company} items={f.links.company} onClick={(idx) => {
            if (idx === 0) goto('home', 'about');
            if (idx === 1) goto('home', 'sectors');
            if (idx === 2) goto('contact');
          }} />
          <FooterCol title={f.cols.resources} items={f.links.resources} onClick={() => goto('home', 'resources')} />
        </div>

        <div
          style={{
            paddingTop: 28,
            borderTop: '1px solid rgba(246,244,239,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.06em',
            color: 'rgba(246,244,239,0.5)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span>© {new Date().getFullYear()} Qerub</span>
            <a href="/legal/aviso-legal.html" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>{t.locale === 'es' ? 'Aviso legal' : 'Legal notice'}</a>
            <a href="/legal/politica-privacidad.html" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>{t.locale === 'es' ? 'Privacidad' : 'Privacy'}</a>
            <a href="/legal/politica-cookies.html" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>Cookies</a>
            <a href="/legal/condiciones-contratacion.html" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>{t.locale === 'es' ? 'Condiciones' : 'Terms'}</a>
          </span>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <button
              onClick={() => window.__qerubConsent && window.__qerubConsent.request()}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(246,244,239,0.72)',
                fontFamily: 'inherit',
                fontSize: 11,
                letterSpacing: '0.06em',
                padding: 0,
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(246,244,239,0.72)')}
            >
              {f.privacy}
            </button>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999, background: '#5db58e' }} />
              {t.locale === 'es' ? 'Todo operativo' : 'All systems normal'} · {window.QERUB_CONTACT.email}
            </span>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, items, onClick }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(246,244,239,0.5)',
          marginBottom: 16,
        }}
      >
        {title}
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12 }}>
        {items.map((it, i) => (
          <li key={i}>
            <button
              onClick={() => onClick && onClick(i)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(246,244,239,0.78)',
                fontSize: 14,
                padding: 0,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(246,244,239,0.78)')}
            >
              {it}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, { Footer, FooterCol });
