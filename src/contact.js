// ── CONFIG ────────────────────────────────────────────────────────────────
// Endpoint del formulario. Crea uno gratis en https://formspree.io
// (New form → copia la URL "https://formspree.io/f/XXXXXXX") y pégalo aquí.
// Mientras tenga el valor de ejemplo, el envío fallará y se mostrará el aviso
// de error con el correo de contacto como alternativa.
const QERUB_FORM_ENDPOINT = 'https://formspree.io/f/xjgdrjpz';
// ──────────────────────────────────────────────────────────────────────────

function ContactPage() {
  const { t } = useT();
  const c = t.contact;
  // honeypot `website`: campo trampa oculto; si un bot lo rellena, descartamos.
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', size: '', msg: '', consent: false, website: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.company.trim()) e.company = true;
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = true;
    if (!form.size) e.size = true;
    if (!form.consent) e.consent = true;
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (form.website) { setStatus('sent'); return; } // honeypot: bot detectado
    if (QERUB_FORM_ENDPOINT.includes('TU_FORM_ID')) {
      console.warn('[Qerub] Configura QERUB_FORM_ENDPOINT en js/contact.js con tu endpoint real de Formspree.');
    }
    setStatus('sending');
    try {
      const res = await fetch(QERUB_FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.name,
          empresa: form.company,
          email: form.email,
          telefono: form.phone,
          tamano: form.size,
          mensaje: form.msg,
          _subject: `Nueva solicitud de diagnóstico — ${form.company || form.name}`,
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div style={{ paddingTop: 130, paddingBottom: 100, background: 'var(--bg)', minHeight: '100vh' }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)', gap: 56, alignItems: 'flex-start' }} className="contact-grid">
          {/* Left */}
          <div style={{ position: 'sticky', top: 100 }}>
            <Reveal><span className="eyebrow">{c.eyebrow}</span></Reveal>
            <Reveal delay={80}>
              <h1 className="pre" style={{ marginTop: 18, fontSize: 'clamp(36px, 4.5vw, 56px)' }}>{c.title}</h1>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ marginTop: 20, fontSize: 17, color: 'var(--ink-3)', maxWidth: 460 }}>{c.sub}</p>
            </Reveal>

            <Reveal delay={200}>
              <div
                style={{
                  marginTop: 40,
                  padding: 24,
                  border: '1px solid var(--line)',
                  borderRadius: 14,
                  background: 'var(--bg-card)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                  {c.altTitle}
                </div>
                <div style={{ marginTop: 18, display: 'grid', gap: 12 }}>
                  <ContactRow icon="mail" label={c.altMail} href={`mailto:${c.altMail}`} />
                  <ContactRow icon="phone" label={c.altPhone} href={`tel:${c.altPhone.replace(/\s/g, '')}`} />
                  {c.altWhatsapp && (
                    <ContactRow
                      icon="chat"
                      label={c.altWhatsapp}
                      href={`https://wa.me/${window.QERUB_CONTACT.phone.replace(/[+\s]/g, '')}`}
                    />
                  )}
                  <ContactRow icon="clock" label={c.altHours} />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={120}>
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--line)',
                borderRadius: 18,
                padding: 36,
                boxShadow: '0 30px 60px -30px rgba(14,20,22,0.1)',
              }}
            >
              {status !== 'sent' ? (
                <form onSubmit={submit} noValidate style={{ display: 'grid', gap: 18 }}>
                  {/* Honeypot antispam: invisible para humanos, tentador para bots */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }} className="form-row">
                    <Field
                      label={c.fields.name}
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      error={errors.name}
                    />
                    <Field
                      label={c.fields.company}
                      value={form.company}
                      onChange={(v) => setForm({ ...form, company: v })}
                      error={errors.company}
                    />
                  </div>
                  <Field
                    type="email"
                    label={c.fields.email}
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    error={errors.email}
                  />
                  {c.fields.phone && (
                    <Field
                      type="tel"
                      label={c.fields.phone}
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                    />
                  )}
                  <SelectField
                    label={c.fields.size}
                    value={form.size}
                    options={c.fields.sizeOpts}
                    onChange={(v) => setForm({ ...form, size: v })}
                    error={errors.size}
                  />
                  <TextareaField
                    label={c.fields.msg}
                    placeholder={c.fields.msgPh}
                    value={form.msg}
                    onChange={(v) => setForm({ ...form, msg: v })}
                  />
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--ink-2)', userSelect: 'none', marginTop: 4 }}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      style={{ marginTop: 3, accentColor: 'var(--teal-deep)' }}
                    />
                    <span style={{ color: errors.consent ? '#c4574a' : 'var(--ink-2)' }}>
                      {c.fields.consent}{' '}
                      <a href="/legal/politica-privacidad.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal-deep)', textDecoration: 'underline' }}>
                        {t.locale === 'es' ? 'Leer política' : 'Read policy'}
                      </a>
                    </span>
                  </label>
                  {status === 'error' && (
                    <p role="alert" style={{ fontSize: 13.5, color: '#c4574a', lineHeight: 1.5 }}>
                      {t.locale === 'es'
                        ? 'No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos a '
                        : 'We couldn’t send your message. Please try again or email us at '}
                      <a href={`mailto:${c.altMail}`} style={{ color: '#c4574a', textDecoration: 'underline' }}>{c.altMail}</a>.
                    </p>
                  )}
                  <div style={{ marginTop: 8 }}>
                    <Btn variant="primary" type="submit" disabled={status === 'sending'} style={{ width: '100%', padding: '16px 24px', opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'wait' : 'pointer' }}>
                      {status === 'sending' ? (t.locale === 'es' ? 'Enviando…' : 'Sending…') : c.fields.submit} <ArrowRight />
                    </Btn>
                  </div>
                  {c.fields.trustNote && (
                    <p style={{ marginTop: 2, fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.04em', color: 'var(--ink-4)', textAlign: 'center', lineHeight: 1.6 }}>
                      {c.fields.trustNote}
                    </p>
                  )}
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div
                    style={{
                      width: 56, height: 56,
                      borderRadius: 999,
                      background: 'rgba(93,181,142,0.16)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5l3.5 3L13 5" stroke="#5db58e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 600 }}>
                    {t.locale === 'es' ? 'Mensaje enviado' : 'Message sent'}
                  </h3>
                  <p style={{ marginTop: 14, fontSize: 15, color: 'var(--ink-3)', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
                    {t.locale === 'es'
                      ? 'Te respondemos en menos de 24 horas hábiles con una propuesta concreta y una agenda de llamada.'
                      : 'We will reply within 24 business hours with a concrete proposal and a call agenda.'}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Field({ label, value, onChange, error, type = 'text' }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontSize: 12.5, fontWeight: 500, color: error ? '#c4574a' : 'var(--ink-2)', letterSpacing: '0.02em' }}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '13px 14px',
          fontFamily: 'inherit',
          fontSize: 15,
          color: 'var(--ink)',
          background: 'var(--bg)',
          border: `1px solid ${error ? '#c4574a' : 'var(--line)'}`,
          borderRadius: 10,
          outline: 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--teal-deep)'; e.target.style.boxShadow = '0 0 0 3px rgba(120,165,176,0.18)'; }}
        onBlur={(e) => { e.target.style.borderColor = error ? '#c4574a' : 'var(--line)'; e.target.style.boxShadow = 'none'; }}
      />
    </label>
  );
}

function SelectField({ label, value, options, onChange, error }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontSize: 12.5, fontWeight: 500, color: error ? '#c4574a' : 'var(--ink-2)' }}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '13px 14px',
          fontFamily: 'inherit',
          fontSize: 15,
          color: value ? 'var(--ink)' : 'var(--ink-4)',
          background: 'var(--bg)',
          border: `1px solid ${error ? '#c4574a' : 'var(--line)'}`,
          borderRadius: 10,
          outline: 'none',
          appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'><path d=\'M1 1l5 5 5-5\' stroke=\'%235b5b5f\' stroke-width=\'1.5\' fill=\'none\' stroke-linecap=\'round\'/></svg>")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
          paddingRight: 40,
        }}
      >
        <option value="">—</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function TextareaField({ label, placeholder, value, onChange }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink-2)' }}>{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        style={{
          padding: '13px 14px',
          fontFamily: 'inherit',
          fontSize: 15,
          color: 'var(--ink)',
          background: 'var(--bg)',
          border: '1px solid var(--line)',
          borderRadius: 10,
          outline: 'none',
          resize: 'vertical',
          minHeight: 110,
        }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--teal-deep)'; e.target.style.boxShadow = '0 0 0 3px rgba(120,165,176,0.18)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; e.target.style.boxShadow = 'none'; }}
      />
    </label>
  );
}

function ContactRow({ icon, label, href }) {
  const ICONS = {
    mail: <path d="M2 5l8 6 8-6M2 5v10h16V5M2 5h16" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />,
    phone: <path d="M5 3h3l1.5 4-2 1.5a10 10 0 005 5L14 11.5l4 1.5v3a2 2 0 01-2 2A14 14 0 013 5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />,
    clock: <g><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" fill="none" /><path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></g>,
    chat: <path d="M10 3a7 7 0 00-6 10.5L3 17l3.6-1A7 7 0 1010 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />,
  };
  const content = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: 'var(--ink)' }}>
      <span
        style={{
          width: 32, height: 32, borderRadius: 8,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--teal-soft)', color: 'var(--teal-deep)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">{ICONS[icon]}</svg>
      </span>
      <span style={{ fontSize: 15, fontWeight: 500 }}>{label}</span>
    </span>
  );
  return href ? <a href={href}>{content}</a> : <div>{content}</div>;
}

// Services detail page
function ServicesDetailPage() {
  const { t } = useT();
  return (
    <div style={{ paddingTop: 130, paddingBottom: 60, minHeight: '100vh' }}>
      <Container>
        <div style={{ maxWidth: 760, marginBottom: 56 }}>
          <Reveal><span className="eyebrow">{t.services.eyebrow}</span></Reveal>
          <Reveal delay={80}>
            <h1 className="pre" style={{ marginTop: 18, fontSize: 'clamp(36px, 4.5vw, 56px)' }}>{t.services.title}</h1>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ marginTop: 20, fontSize: 17, color: 'var(--ink-3)' }}>{t.services.sub}</p>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {t.services.items.map((s, i) => (
            <Reveal key={i} delay={i * 50}>
              <div
                id={s.code.toLowerCase().replace(/\s/g, '-')}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--line)',
                  borderRadius: 18,
                  padding: 40,
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.6fr)',
                  gap: 40,
                  scrollMarginTop: 100,
                }}
                className="service-detail"
              >
                <div>
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
                  <h2 style={{ fontSize: 30, fontWeight: 600, marginTop: 16, lineHeight: 1.15 }}>{s.t}</h2>
                  <div style={{ marginTop: 18, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.08em' }}>
                    {t.locale === 'es' ? 'Duración' : 'Duration'} · {s.time}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.65 }}>{s.d}</p>
                  <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                    {s.bullets.map((b, j) => (
                      <div key={j} style={{ padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8.5l3.5 3L13 5" stroke="var(--teal-deep)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 13.5, color: 'var(--ink)' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .service-detail { grid-template-columns: 1fr !important; padding: 28px !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { ContactPage, ServicesDetailPage });
