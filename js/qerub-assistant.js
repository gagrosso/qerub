// Qerub — widget del asistente (vanilla JS, sin dependencias).
// Burbuja flotante + panel de chat. Llama SIEMPRE a /api/chat (same-origin);
// la clave de IA vive en el servidor (functions/api/chat.js), nunca aquí.
// Para activarlo: incluir <script src="/js/qerub-assistant.js" defer></script>.
(function () {
  'use strict';
  if (window.__qerubAssistant) return; window.__qerubAssistant = true;

  var TEAL = '#4d7e8a', DARK = '#0e1416', CREAM = '#f6f4ef';
  var history = [];   // [{role:'user'|'assistant', content}]
  var busy = false;

  var css = '' +
    '.qa-btn{position:fixed;right:20px;bottom:20px;width:58px;height:58px;border-radius:50%;background:' + DARK + ';border:1px solid rgba(140,192,207,.4);box-shadow:0 10px 30px -8px rgba(0,0,0,.5);cursor:pointer;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:0}' +
    '.qa-btn img{width:30px;height:30px}' +
    '.qa-panel{position:fixed;right:20px;bottom:88px;width:min(380px,calc(100vw - 40px));height:min(560px,calc(100vh - 120px));background:' + DARK + ';border:1px solid rgba(246,244,239,.14);border-radius:16px;box-shadow:0 24px 60px -16px rgba(0,0,0,.6);z-index:2147483000;display:none;flex-direction:column;overflow:hidden;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '.qa-open .qa-panel{display:flex}' +
    '.qa-head{padding:14px 16px;border-bottom:1px solid rgba(246,244,239,.12);display:flex;align-items:center;gap:10px;color:' + CREAM + '}' +
    '.qa-head b{font-size:14px;font-weight:600}.qa-head span{font-size:11px;color:rgba(246,244,239,.55)}' +
    '.qa-x{margin-left:auto;background:transparent;border:0;color:rgba(246,244,239,.6);font-size:20px;cursor:pointer;line-height:1}' +
    '.qa-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}' +
    '.qa-m{max-width:84%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}' +
    '.qa-u{align-self:flex-end;background:' + TEAL + ';color:#fff;border-bottom-right-radius:4px}' +
    '.qa-a{align-self:flex-start;background:rgba(246,244,239,.08);color:' + CREAM + ';border-bottom-left-radius:4px}' +
    '.qa-a a{color:#8cc0cf}' +
    '.qa-foot{padding:12px;border-top:1px solid rgba(246,244,239,.12);display:flex;gap:8px}' +
    '.qa-in{flex:1;background:rgba(246,244,239,.06);border:1px solid rgba(246,244,239,.16);border-radius:10px;color:' + CREAM + ';padding:10px 12px;font-size:14px;resize:none;font-family:inherit;max-height:100px}' +
    '.qa-in:focus{outline:none;border-color:' + TEAL + '}' +
    '.qa-send{background:' + TEAL + ';border:0;border-radius:10px;color:#fff;padding:0 14px;cursor:pointer;font-size:14px}' +
    '.qa-send:disabled{opacity:.5;cursor:default}' +
    '.qa-dots span{display:inline-block;width:6px;height:6px;margin:0 2px;border-radius:50%;background:rgba(246,244,239,.6);animation:qablink 1.2s infinite}' +
    '.qa-dots span:nth-child(2){animation-delay:.2s}.qa-dots span:nth-child(3){animation-delay:.4s}' +
    '@keyframes qablink{0%,60%,100%{opacity:.25}30%{opacity:1}}';

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  // Enlaces internos /ruta y correo → <a>
  function fmt(s) {
    s = esc(s);
    s = s.replace(/(^|\s)(\/[a-z0-9\-\/]+)/g, '$1<a href="$2">$2</a>');
    s = s.replace(/([\w.+-]+@[\w.-]+\.\w+)/g, '<a href="mailto:$1">$1</a>');
    return s;
  }

  var icon = (window.__resources && window.__resources.qerubIcon) || '/assets/img/qerub-icon.png';
  var root = el('div'); root.id = 'qa-root';
  root.appendChild(el('style', null, css));
  var btn = el('button', 'qa-btn'); btn.setAttribute('aria-label', 'Abrir el asistente de Qerub');
  btn.innerHTML = '<img src="' + icon + '" alt="" aria-hidden="true">';
  var panel = el('div', 'qa-panel'); panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Asistente de Qerub');
  panel.innerHTML =
    '<div class="qa-head"><div><b>Asistente de Qerub</b><br><span>Responde sobre Qerub · no es asesoramiento</span></div><button class="qa-x" aria-label="Cerrar">×</button></div>' +
    '<div class="qa-msgs" id="qa-msgs"></div>' +
    '<div class="qa-foot"><textarea class="qa-in" id="qa-in" rows="1" placeholder="Pregunta sobre Qerub…" aria-label="Escribe tu mensaje"></textarea><button class="qa-send" id="qa-send">Enviar</button></div>';
  root.appendChild(btn); root.appendChild(panel);
  (document.body || document.documentElement).appendChild(root);

  var msgsEl = panel.querySelector('#qa-msgs');
  var input = panel.querySelector('#qa-in');
  var sendBtn = panel.querySelector('#qa-send');
  var greeted = false;

  function add(role, text) {
    var m = el('div', 'qa-m ' + (role === 'user' ? 'qa-u' : 'qa-a'));
    m.innerHTML = role === 'user' ? esc(text) : fmt(text);
    msgsEl.appendChild(m); msgsEl.scrollTop = msgsEl.scrollHeight; return m;
  }
  function open() {
    root.classList.add('qa-open'); btn.style.display = 'none';
    if (!greeted) { greeted = true; add('assistant', 'Hola 👋 Soy el asistente de Qerub. Puedo contarte qué hacemos: IA y datos, software, equipos senior y ciberseguridad. ¿En qué te ayudo?'); }
    setTimeout(function () { input.focus(); }, 50);
  }
  function close() { root.classList.remove('qa-open'); btn.style.display = 'flex'; }
  btn.addEventListener('click', open);
  panel.querySelector('.qa-x').addEventListener('click', close);

  input.addEventListener('input', function () { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 100) + 'px'; });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
  sendBtn.addEventListener('click', send);

  function send() {
    if (busy) return;
    var text = input.value.trim(); if (!text) return;
    input.value = ''; input.style.height = 'auto';
    add('user', text); history.push({ role: 'user', content: text });
    busy = true; sendBtn.disabled = true;
    var typing = el('div', 'qa-m qa-a qa-dots', '<span></span><span></span><span></span>'); msgsEl.appendChild(typing); msgsEl.scrollTop = msgsEl.scrollHeight;
    fetch('/api/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: history.slice(-16) }) })
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
