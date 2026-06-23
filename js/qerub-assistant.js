// Qerub — widget del asistente (vanilla JS, sin dependencias).
// Píldora flotante (estilo Globant) + panel de chat con saludo y preguntas rápidas.
// Llama SIEMPRE a /api/chat (same-origin); la clave de IA vive en el servidor
// (functions/api/chat.js), nunca aquí.
// Activar: <script src="/js/qerub-assistant.js" defer></script> en cada página.
(function () {
  'use strict';
  if (window.__qerubAssistant) return; window.__qerubAssistant = true;

  var TEAL = '#4d7e8a', DARK = '#0e1416', CREAM = '#f6f4ef';
  var ENDPOINT = 'https://assistant.qerub.com/api/chat'; // Worker del asistente
  var LABEL = 'Asistente IA';                 // texto de la píldora
  var QUICK = [                               // preguntas rápidas (chips)
    '¿Qué hace Qerub?',
    '¿Cuánto cuesta una auditoría?',
    '¿Qué es Q-Pod?'
  ];
  var history = [], busy = false, greeted = false;

  var css = '' +
    '.qa-btn{position:fixed;right:20px;bottom:20px;height:54px;padding:0 20px 0 8px;border-radius:999px;background:' + DARK + ';border:1px solid rgba(140,192,207,.45);box-shadow:0 12px 30px -8px rgba(0,0,0,.55);cursor:pointer;z-index:2147483000;display:inline-flex;align-items:center;gap:11px;transition:transform .15s ease,box-shadow .15s ease}' +
    '.qa-btn:hover{transform:translateY(-2px);box-shadow:0 16px 36px -8px rgba(0,0,0,.6)}' +
    '.qa-ic{width:38px;height:38px;border-radius:50%;background:rgba(140,192,207,.16);display:flex;align-items:center;justify-content:center;flex:0 0 auto}' +
    '.qa-ic img{width:24px;height:24px}' +
    '.qa-btn b{color:' + CREAM + ';font-size:14.5px;font-weight:600;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '.qa-pip{position:absolute;top:-2px;right:-2px;width:12px;height:12px;border-radius:50%;background:#5db58e;border:2px solid ' + DARK + '}' +
    '.qa-panel{position:fixed;right:20px;bottom:88px;width:min(384px,calc(100vw - 40px));height:min(580px,calc(100vh - 120px));background:' + DARK + ';border:1px solid rgba(246,244,239,.14);border-radius:18px;box-shadow:0 24px 60px -16px rgba(0,0,0,.6);z-index:2147483000;display:none;flex-direction:column;overflow:hidden;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;transform-origin:bottom right}' +
    '.qa-open .qa-panel{display:flex;animation:qaIn .18s ease-out}' +
    '@keyframes qaIn{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:none}}' +
    '.qa-head{padding:14px 16px;border-bottom:1px solid rgba(246,244,239,.12);display:flex;align-items:center;gap:11px;color:' + CREAM + '}' +
    '.qa-head .qa-ic{width:34px;height:34px}.qa-head .qa-ic img{width:21px;height:21px}' +
    '.qa-head b{font-size:14px;font-weight:600;display:block}.qa-head span{font-size:11px;color:rgba(246,244,239,.55)}' +
    '.qa-x{margin-left:auto;background:transparent;border:0;color:rgba(246,244,239,.6);font-size:22px;cursor:pointer;line-height:1}' +
    '.qa-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}' +
    '.qa-m{max-width:84%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}' +
    '.qa-u{align-self:flex-end;background:' + TEAL + ';color:#fff;border-bottom-right-radius:4px}' +
    '.qa-a{align-self:flex-start;background:rgba(246,244,239,.08);color:' + CREAM + ';border-bottom-left-radius:4px}' +
    '.qa-a a{color:#8cc0cf}' +
    '.qa-chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 4px}' +
    '.qa-chip{background:transparent;border:1px solid rgba(140,192,207,.4);color:#bfe0e8;border-radius:999px;padding:7px 12px;font-size:12.5px;cursor:pointer;font-family:inherit}' +
    '.qa-chip:hover{background:rgba(140,192,207,.12)}' +
    '.qa-foot{padding:12px;border-top:1px solid rgba(246,244,239,.12);display:flex;gap:8px}' +
    '.qa-in{flex:1;background:rgba(246,244,239,.06);border:1px solid rgba(246,244,239,.16);border-radius:10px;color:' + CREAM + ';padding:10px 12px;font-size:14px;resize:none;font-family:inherit;max-height:100px}' +
    '.qa-in:focus{outline:none;border-color:' + TEAL + '}' +
    '.qa-send{background:' + TEAL + ';border:0;border-radius:10px;color:#fff;padding:0 14px;cursor:pointer;font-size:14px}' +
    '.qa-send:disabled{opacity:.5;cursor:default}' +
    '.qa-dots span{display:inline-block;width:6px;height:6px;margin:0 2px;border-radius:50%;background:rgba(246,244,239,.6);animation:qablink 1.2s infinite}' +
    '.qa-dots span:nth-child(2){animation-delay:.2s}.qa-dots span:nth-child(3){animation-delay:.4s}' +
    '@keyframes qablink{0%,60%,100%{opacity:.25}30%{opacity:1}}';

  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function fmt(s) {
    s = esc(s);
    s = s.replace(/(^|\s)(\/[a-z0-9\-\/]+)/g, '$1<a href="$2">$2</a>');
    s = s.replace(/([\w.+-]+@[\w.-]+\.\w+)/g, '<a href="mailto:$1">$1</a>');
    return s;
  }

  var icon = (window.__resources && window.__resources.qerubIcon) || '/assets/img/qerub-icon.png';
  var iconHTML = '<span class="qa-ic"><img src="' + icon + '" alt="" aria-hidden="true"></span>';
  var root = el('div'); root.id = 'qa-root';
  root.appendChild(el('style', null, css));

  var btn = el('button', 'qa-btn'); btn.setAttribute('aria-label', 'Abrir el asistente de Qerub');
  btn.innerHTML = iconHTML + '<b>' + LABEL + '</b><span class="qa-pip" aria-hidden="true"></span>';

  var panel = el('div', 'qa-panel'); panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Asistente de Qerub');
  panel.innerHTML =
    '<div class="qa-head">' + iconHTML + '<div><b>Asistente de Qerub</b><span>Responde sobre Qerub · no es asesoramiento</span></div><button class="qa-x" aria-label="Cerrar">×</button></div>' +
    '<div class="qa-msgs" id="qa-msgs"></div>' +
    '<div class="qa-chips" id="qa-chips"></div>' +
    '<div class="qa-foot"><textarea class="qa-in" id="qa-in" rows="1" placeholder="Pregunta sobre Qerub…" aria-label="Escribe tu mensaje"></textarea><button class="qa-send" id="qa-send">Enviar</button></div>';

  root.appendChild(btn); root.appendChild(panel);
  (document.body || document.documentElement).appendChild(root);

  var msgsEl = panel.querySelector('#qa-msgs');
  var chipsEl = panel.querySelector('#qa-chips');
  var input = panel.querySelector('#qa-in');
  var sendBtn = panel.querySelector('#qa-send');

  function add(role, text) {
    var m = el('div', 'qa-m ' + (role === 'user' ? 'qa-u' : 'qa-a'));
    m.innerHTML = role === 'user' ? esc(text) : fmt(text);
    msgsEl.appendChild(m); msgsEl.scrollTop = msgsEl.scrollHeight; return m;
  }
  function renderChips() {
    chipsEl.innerHTML = '';
    QUICK.forEach(function (q) {
      var c = el('button', 'qa-chip', esc(q));
      c.addEventListener('click', function () { send(q); });
      chipsEl.appendChild(c);
    });
  }
  function clearChips() { chipsEl.innerHTML = ''; }

  function open() {
    root.classList.add('qa-open'); btn.style.display = 'none';
    if (!greeted) {
      greeted = true;
      add('assistant', 'Hola 👋 Soy el asistente de Qerub. Puedo contarte qué hacemos: IA y datos, software, equipos senior y ciberseguridad. ¿En qué te ayudo?');
      renderChips();
    }
    setTimeout(function () { input.focus(); }, 60);
  }
  function close() { root.classList.remove('qa-open'); btn.style.display = 'inline-flex'; }
  btn.addEventListener('click', open);
  panel.querySelector('.qa-x').addEventListener('click', close);

  input.addEventListener('input', function () { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 100) + 'px'; });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
  sendBtn.addEventListener('click', function () { send(); });

  function send(text) {
    if (busy) return;
    text = (text != null ? text : input.value).trim(); if (!text) return;
    clearChips();
    input.value = ''; input.style.height = 'auto';
    add('user', text); history.push({ role: 'user', content: text });
    busy = true; sendBtn.disabled = true;
    var typing = el('div', 'qa-m qa-a qa-dots', '<span></span><span></span><span></span>');
    msgsEl.appendChild(typing); msgsEl.scrollTop = msgsEl.scrollHeight;
    fetch(ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: history.slice(-16) }) })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (d) {
        typing.remove();
        var reply = (d && d.reply) || 'Ahora mismo no puedo responder. Escríbenos a info@qerub.com.';
        add('assistant', reply); history.push({ role: 'assistant', content: reply });
      })
      .catch(function () { typing.remove(); add('assistant', 'Ahora mismo no puedo responder. Escríbenos a info@qerub.com.'); })
      .then(function () { busy = false; sendBtn.disabled = false; input.focus(); });
  }
})();
