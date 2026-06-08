// Qerub brand assets.
// - assets/qerub-icon.png  : standalone mark (leaf + Q glyph). Transparent BG.
// - assets/qerub-logo.png  : mark + wordmark + tagline lockup. Transparent BG.

// Standalone mark — favicons, decorative spots, header.
function QMark({ size = 32, onDark = false, style }) {
  return (
    <img
      src={window.__resources.qerubIcon}
      alt=""
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
    />
  );
}

// Full lockup (mark + wordmark, optional tagline). Used in the footer.
function QWordmark({ height = 28, onDark = false, withTagline = false }) {
  const visibleRatio = 0.744;
  const fullImageH = withTagline ? height * 1.55 : Math.round(height / visibleRatio);
  const cropBottomPct = withTagline ? 0 : 25.6;
  return (
    <img
      src={window.__resources.qerubLogo}
      alt="Qerub"
      style={{
        height: fullImageH,
        width: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle',
        clipPath: `inset(0 0 ${cropBottomPct}% 0)`,
        marginBottom: -Math.round(fullImageH * cropBottomPct / 100),
        filter: onDark ? 'brightness(0) invert(1)' : 'none',
        imageRendering: '-webkit-optimize-contrast',
      }}
    />
  );
}

// Header lockup — mark left of wordmark, with the icon visible at every viewport.
function QHeaderMark({ height = 24 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <QMark size={Math.round(height * 1.25)} />
      <QWordmark height={height} />
    </span>
  );
}

// Large decorative Q used in the hero backdrop. Uses the real icon as the centerpiece,
// surrounded by a generated orbital ring/ticks/glow that reads as "security posture".
function QHeroMark({ size = 520, theme = 'light' }) {
  const stroke = theme === 'light' ? '#0e1416' : '#f6f4ef';
  const teal = '#78a5b0';
  const teal2 = '#8cc0cf';
  const muted = theme === 'light' ? 'rgba(14,20,22,0.10)' : 'rgba(246,244,239,0.10)';
  return (
    <div style={{ position: 'relative', width: size, height: size, maxWidth: '100%' }}>
      <svg viewBox="0 0 600 600" width="100%" height="100%" aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="qglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={teal2} stopOpacity="0.22" />
            <stop offset="60%" stopColor={teal} stopOpacity="0.06" />
            <stop offset="100%" stopColor={teal} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="280" fill="url(#qglow)" />
        {[180, 220, 260].map((r) => (
          <circle key={r} cx="300" cy="300" r={r} stroke={muted} strokeWidth="1" fill="none" />
        ))}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const x1 = 300 + Math.cos(angle) * 280;
          const y1 = 300 + Math.sin(angle) * 280;
          const x2 = 300 + Math.cos(angle) * 288;
          const y2 = 300 + Math.sin(angle) * 288;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="1" opacity={i % 6 === 0 ? 0.45 : 0.15} />
          );
        })}
        <text x="300" y="540" textAnchor="middle" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="11" letterSpacing="3" fill={stroke} opacity="0.5">
          QERUB · SECURITY POSTURE · OK
        </text>
      </svg>
      <img
        src={window.__resources.qerubIcon}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '46%',
          height: '46%',
          transform: 'translate(-50%, -50%)',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

Object.assign(window, { QMark, QWordmark, QHeaderMark, QHeroMark });
