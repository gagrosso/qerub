/* Qerub · formulario de contacto en la propia landing
 * ---------------------------------------------------------------------------
 * Las páginas de servicio son el destino del tráfico de pago. Hasta ahora su
 * único CTA saltaba a /#contact, que recarga la SPA entera (React + GSAP) y
 * obliga al visitante a volver a buscar el formulario. Este script inyecta un
 * formulario corto en la propia página, publica en el mismo endpoint de
 * Formspree y centraliza el disparo de la conversión en qerubConsent.lead().
 *
 * Sin dependencias. Si el script falla, los CTA originales siguen apuntando a
 * /#contact y el visitante puede convertir igual.
 */
(function () {
  'use strict';

  var ENDPOINT = 'https://formspree.io/f/xjgdrjpz';
  var ANCHOR = 'solicitar';

  var T = {
    es: {
      eyebrow: 'Solicitar propuesta',
      title: 'Cuéntanos tu caso',
      sub: 'Te respondemos en menos de 24 horas hábiles con un alcance concreto y un precio cerrado. Sin compromiso.',
      name: 'Nombre y apellidos', company: 'Empresa', email: 'Correo profesional',
      phone: 'Teléfono (opcional)', size: 'Tamaño de plantilla', msg: 'Qué necesitas (opcional)',
      msgPh: 'Contexto, plazos, si tenéis proveedor IT…',
      sizeOpts: ['1-9', '10-49', '50-99', '100-299', '300+'],
      consent: 'He leído y acepto la',
      policy: 'política de privacidad',
      submit: 'Solicitar propuesta',
      sending: 'Enviando…',
      okTitle: 'Solicitud enviada',
      okBody: 'Te respondemos en menos de 24 horas hábiles con una propuesta concreta y una propuesta de agenda para la llamada.',
      err: 'No se pudo enviar. Inténtalo de nuevo o escríbenos a ',
      req: 'Revisa los campos marcados.',
      cta: 'Solicitar propuesta'
    },
    en: {
      eyebrow: 'Request a proposal',
      title: 'Tell us about your case',
      sub: 'We reply within 24 business hours with a concrete scope and a fixed price. No commitment.',
      name: 'Full name', company: 'Company', email: 'Work email',
      phone: 'Phone (optional)', size: 'Headcount', msg: 'What you need (optional)',
      msgPh: 'Context, timeline, whether you have an IT provider…',
      sizeOpts: ['1-9', '10-49', '50-99', '100-299', '300+'],
      consent: 'I have read and accept the',
      policy: 'privacy policy',
      submit: 'Request a proposal',
      sending: 'Sending…',
      okTitle: 'Request sent',
      okBody: 'We will reply within 24 business hours with a concrete proposal and a suggested time for the call.',
      err: 'We couldn’t send it. Please try again or email us at ',
      req: 'Please review the highlighted fields.',
      cta: 'Request a proposal'
    }
  };

  var lang = (document.documentElement.lang || 'es').toLowerCase().indexOf('en') === 0 ? 'en' : 'es';
  var t = T[lang];

  // El nombre del servicio sale del h1 («Q-Start — Auditoría…»), así no hay que
  // tocar las 21 páginas para añadir un atributo.
  function servicio() {
    var h1 = document.querySelector('main h1, h1');
    var txt = h1 ? h1.textContent.trim() : '';
    var code = txt.split(/\s+[—–-]\s+/)[0];
    return (code && /^Q-/.test(code)) ? code : (location.pathname.split('/').filter(Boolean).pop() || 'web');
  }

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }

  function field(name, label, type, required) {
    var id = 'qlf-' + name;
    var input = el(type === 'textarea' ? 'textarea' : 'input', {
      id: id, name: name, class: 'qlf-input'
    });
    if (type === 'textarea') { input.rows = 3; input.placeholder = t.msgPh; }
    else input.type = type || 'text';
    if (required) input.required = true;
    if (name === 'email') input.autocomplete = 'email';
    if (name === 'nombre') input.autocomplete = 'name';
    if (name === 'empresa') input.autocomplete = 'organization';
    if (name === 'telefono') input.autocomplete = 'tel';
    return el('label', { class: 'qlf-field', for: id }, [
      el('span', { class: 'qlf-label', text: label + (required ? ' *' : '') }), input
    ]);
  }

  function selectField() {
    var sel = el('select', { id: 'qlf-tamano', name: 'tamano', class: 'qlf-input' });
    sel.required = true;
    sel.appendChild(el('option', { value: '', text: '—' }));
    t.sizeOpts.forEach(function (o) { sel.appendChild(el('option', { value: o, text: o })); });
    return el('label', { class: 'qlf-field', for: 'qlf-tamano' }, [
      el('span', { class: 'qlf-label', text: t.size + ' *' }), sel
    ]);
  }

  function build() {
    var form = el('form', { class: 'qlf-form', novalidate: 'novalidate' });

    // Honeypot: invisible para personas, tentador para bots.
    var hp = el('input', { type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true', class: 'qlf-hp' });
    form.appendChild(hp);

    var row = el('div', { class: 'qlf-row' }, [
      field('nombre', t.name, 'text', true),
      field('empresa', t.company, 'text', true)
    ]);
    var row2 = el('div', { class: 'qlf-row' }, [
      field('email', t.email, 'email', true),
      field('telefono', t.phone, 'tel', false)
    ]);
    form.appendChild(row);
    form.appendChild(row2);
    form.appendChild(selectField());
    form.appendChild(field('mensaje', t.msg, 'textarea', false));

    var chk = el('input', { type: 'checkbox', id: 'qlf-consent', class: 'qlf-check' });
    chk.required = true;
    var consent = el('label', { class: 'qlf-consent', for: 'qlf-consent' }, [
      chk,
      el('span', {
        html: t.consent + ' <a href="/legal/politica-privacidad.html" target="_blank" rel="noopener">' + t.policy + '</a>.'
      })
    ]);
    form.appendChild(consent);

    var msg = el('p', { class: 'qlf-msg', role: 'alert', hidden: 'hidden' });
    form.appendChild(msg);

    var btn = el('button', { type: 'submit', class: 'btn qlf-submit', text: t.submit });
    form.appendChild(btn);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      msg.hidden = true;
      form.querySelectorAll('.qlf-input, .qlf-check').forEach(function (i) { i.classList.remove('qlf-bad'); });

      var bad = [];
      form.querySelectorAll('[required]').forEach(function (i) {
        var ok = i.type === 'checkbox' ? i.checked : !!i.value.trim();
        if (ok && i.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value);
        if (!ok) { bad.push(i); i.classList.add('qlf-bad'); }
      });
      if (bad.length) {
        msg.textContent = t.req; msg.hidden = false;
        bad[0].focus();
        return;
      }
      if (hp.value) { done(); return; }   // bot: no se envía nada, ni conversión

      btn.disabled = true;
      btn.textContent = t.sending;

      var data = {
        nombre: form.nombre.value.trim(),
        empresa: form.empresa.value.trim(),
        email: form.email.value.trim(),
        telefono: form.telefono.value.trim(),
        tamano: form.tamano.value,
        mensaje: form.mensaje.value.trim(),
        servicio: servicio(),
        origen: location.pathname,
        gclid: (window.qerubConsent && window.qerubConsent.gclid()) || '',
        _subject: 'Solicitud desde ' + servicio() + ' — ' + (form.empresa.value.trim() || form.nombre.value.trim())
      };

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (res) {
        if (!res.ok) throw new Error('http ' + res.status);
        if (window.qerubConsent && window.qerubConsent.lead) {
          // transaction_id deduplica si el visitante reenvía o recarga.
          window.qerubConsent.lead({ transaction_id: 'lead-' + Date.now() });
        }
        done();
      }).catch(function () {
        btn.disabled = false;
        btn.textContent = t.submit;
        msg.innerHTML = t.err + '<a href="mailto:info@qerub.com">info@qerub.com</a>.';
        msg.hidden = false;
      });
    });

    function done() {
      form.replaceWith(el('div', { class: 'qlf-ok' }, [
        el('strong', { text: t.okTitle }),
        el('p', { text: t.okBody })
      ]));
    }

    return form;
  }

  function mount() {
    var cta = document.querySelector('.cta-final');
    if (!cta) return;

    var section = el('section', { class: 'qlf-section', id: ANCHOR }, [
      el('div', { class: 'container' }, [
        el('div', { class: 'qlf-head' }, [
          el('span', { class: 'eyebrow', text: t.eyebrow }),
          el('h2', { text: t.title }),
          el('p', { text: t.sub })
        ]),
        build()
      ])
    ]);
    cta.parentNode.insertBefore(section, cta);

    // Los CTA de la página dejan de recargar la SPA: llevan al formulario que
    // ya está debajo. Si este script no cargara, siguen funcionando como antes.
    document.querySelectorAll('a[href="/#contact"]').forEach(function (a) {
      a.setAttribute('href', '#' + ANCHOR);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
