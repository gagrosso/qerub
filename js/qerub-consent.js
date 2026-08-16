/* Qerub · Consentimiento de cookies + Google Consent Mode v2
 * ---------------------------------------------------------------------------
 * Autónomo (sin dependencias, sin React): funciona igual en la SPA y en las
 * páginas estáticas, que son las landings de Google Ads.
 *
 * Reglas que implementa:
 *  - Consent Mode v2 en modo BÁSICO: gtag NO se carga hasta que hay aceptación.
 *    A volumen bajo el modo avanzado no aporta modelado y sí obliga a enviar
 *    señales antes del consentimiento; no compensa.
 *  - AEPD: rechazar es tan fácil como aceptar (mismo nivel, misma prominencia),
 *    consentimiento previo, granularidad por categorías y revocación permanente.
 *  - El consentimiento caduca a los 24 meses y se invalida si sube CONSENT_VERSION
 *    (p. ej. al añadir una finalidad nueva).
 *
 * Para activar la medición: rellena MEASUREMENT_IDS. Mientras esté vacío, el
 * sitio no carga absolutamente nada de terceros aunque el usuario acepte.
 */
(function () {
  'use strict';

  // --- Configuración -------------------------------------------------------
  // Añade aquí los IDs cuando exista la cuenta. Ejemplos:
  //   ads:       'AW-XXXXXXXXXX'
  //   analytics: 'G-XXXXXXXXXX'
  var MEASUREMENT_IDS = { ads: '', analytics: '' };

  var STORAGE_KEY = 'qerub_consent';
  var CONSENT_VERSION = 2;              // súbelo al cambiar finalidades
  var MAX_AGE_MS = 24 * 30 * 24 * 60 * 60 * 1000; // ~24 meses

  var T = {
    es: {
      title: 'Cookies y privacidad',
      body: 'Usamos almacenamiento técnico necesario para que la web funcione. Si nos das permiso, añadimos medición para saber qué contenidos te resultan útiles.',
      accept: 'Aceptar todo', reject: 'Rechazar todo', config: 'Configurar', save: 'Guardar preferencias',
      policy: 'Política de cookies', close: 'Cerrar',
      cats: [
        { k: 'necessary', t: 'Necesarias', d: 'Imprescindibles para que la web funcione y para protegerla frente a abusos. No se pueden desactivar.', locked: true },
        { k: 'analytics', t: 'Medición', d: 'Nos dicen qué páginas se leen y por dónde se abandona, en conjunto. Sin ellas trabajamos a ciegas.' },
        { k: 'marketing', t: 'Publicidad', d: 'Permiten saber si un anuncio nuestro te trajo hasta aquí. Sin ellas no podemos medir lo que invertimos.' }
      ]
    },
    en: {
      title: 'Cookies and privacy',
      body: 'We use the technical storage the site needs to work. With your permission, we add measurement so we can tell which content actually helps you.',
      accept: 'Accept all', reject: 'Reject all', config: 'Customize', save: 'Save preferences',
      policy: 'Cookie policy', close: 'Close',
      cats: [
        { k: 'necessary', t: 'Necessary', d: 'Required for the site to work and to protect it from abuse. These cannot be turned off.', locked: true },
        { k: 'analytics', t: 'Measurement', d: 'Tell us which pages get read and where people leave, in aggregate. Without them we work blind.' },
        { k: 'marketing', t: 'Advertising', d: 'Let us know whether one of our ads brought you here. Without them we cannot measure what we spend.' }
      ]
    }
  };

  var lang = (document.documentElement.lang || 'es').toLowerCase().indexOf('en') === 0 ? 'en' : 'es';
  var t = T[lang];

  // --- Consent Mode v2: denegado por defecto, ANTES de cualquier etiqueta ---
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  // --- Estado --------------------------------------------------------------
  function read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var v = JSON.parse(raw);
      if (v.v !== CONSENT_VERSION) return null;               // finalidades nuevas
      if (!v.at || Date.now() - v.at > MAX_AGE_MS) return null; // caducado
      return v;
    } catch (e) { return null; }
  }

  function write(value) {
    var payload = {
      v: CONSENT_VERSION, at: Date.now(),
      necessary: true,
      analytics: !!value.analytics,
      marketing: !!value.marketing
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch (e) {}
    apply(payload);
    return payload;
  }

  var gtagLoaded = false;
  function loadGtag() {
    if (gtagLoaded) return;
    var id = MEASUREMENT_IDS.ads || MEASUREMENT_IDS.analytics;
    if (!id) return;                     // sin IDs no se carga nada de terceros
    gtagLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    gtag('js', new Date());
    if (MEASUREMENT_IDS.analytics) gtag('config', MEASUREMENT_IDS.analytics);
    if (MEASUREMENT_IDS.ads) gtag('config', MEASUREMENT_IDS.ads);
  }

  function clearGoogleCookies() {
    try {
      var host = location.hostname.replace(/^www\./, '');
      document.cookie.split(';').forEach(function (c) {
        var name = c.split('=')[0].trim();
        if (/^(_ga|_gid|_gcl_|_gac_)/.test(name)) {
          ['/', location.pathname].forEach(function (p) {
            document.cookie = name + '=; Max-Age=0; path=' + p;
            document.cookie = name + '=; Max-Age=0; path=' + p + '; domain=.' + host;
          });
        }
      });
    } catch (e) {}
  }

  function apply(v) {
    gtag('consent', 'update', {
      ad_storage: v.marketing ? 'granted' : 'denied',
      ad_user_data: v.marketing ? 'granted' : 'denied',
      ad_personalization: v.marketing ? 'granted' : 'denied',
      analytics_storage: v.analytics ? 'granted' : 'denied'
    });
    if (v.analytics || v.marketing) {
      loadGtag();
      // El gclid es almacenamiento en el equipo terminal (art. 22.2 LSSI):
      // solo se guarda con consentimiento de publicidad.
      if (v.marketing) {
        try {
          var g = new URLSearchParams(location.search).get('gclid');
          if (g) sessionStorage.setItem('qerub_gclid', g);
        } catch (e) {}
      }
    } else {
      try { sessionStorage.removeItem('qerub_gclid'); } catch (e) {}
      clearGoogleCookies();
    }
  }

  // --- Interfaz ------------------------------------------------------------
  var root = null;

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

  function destroy() { if (root) { root.remove(); root = null; } }

  function showBanner() {
    destroy();
    var actions = el('div', { class: 'qc-actions' }, [
      el('button', { type: 'button', class: 'qc-btn qc-ghost', text: t.config }),
      el('button', { type: 'button', class: 'qc-btn qc-ghost', text: t.reject }),
      el('button', { type: 'button', class: 'qc-btn qc-primary', text: t.accept })
    ]);
    var btns = actions.querySelectorAll('button');
    btns[0].addEventListener('click', showModal);
    btns[1].addEventListener('click', function () { write({ analytics: false, marketing: false }); destroy(); });
    btns[2].addEventListener('click', function () { write({ analytics: true, marketing: true }); destroy(); });

    root = el('div', { class: 'qc-banner', role: 'dialog', 'aria-label': t.title }, [
      el('div', { class: 'qc-box' }, [
        el('div', { class: 'qc-copy' }, [
          el('strong', { text: t.title }),
          el('p', { html: t.body + ' <a href="/legal/politica-cookies.html">' + t.policy + '</a>.' })
        ]),
        actions
      ])
    ]);
    document.body.appendChild(root);
  }

  function showModal() {
    var current = read() || { analytics: false, marketing: false };
    destroy();
    var rows = t.cats.map(function (c) {
      var on = c.locked ? true : !!current[c.k];
      var sw = el('button', {
        type: 'button', class: 'qc-switch' + (on ? ' on' : ''), role: 'switch',
        'aria-checked': String(on), 'aria-label': c.t
      });
      if (c.locked) { sw.disabled = true; sw.setAttribute('aria-disabled', 'true'); }
      else sw.addEventListener('click', function () {
        var next = sw.getAttribute('aria-checked') !== 'true';
        sw.setAttribute('aria-checked', String(next));
        sw.classList.toggle('on', next);
      });
      sw.dataset.key = c.k;
      return el('div', { class: 'qc-cat' }, [
        el('div', {}, [el('strong', { text: c.t }), el('p', { text: c.d })]), sw
      ]);
    });

    var save = el('button', { type: 'button', class: 'qc-btn qc-primary', text: t.save });
    var reject = el('button', { type: 'button', class: 'qc-btn qc-ghost', text: t.reject });
    var accept = el('button', { type: 'button', class: 'qc-btn qc-ghost', text: t.accept });
    var close = el('button', { type: 'button', class: 'qc-close', 'aria-label': t.close, text: '×' });

    var panel = el('div', { class: 'qc-panel' }, [
      el('div', { class: 'qc-head' }, [el('h2', { text: t.title }), close]),
      el('div', { class: 'qc-body' }, rows),
      el('div', { class: 'qc-foot' }, [
        el('div', { class: 'qc-foot-left' }, [reject, accept]), save
      ])
    ]);
    root = el('div', { class: 'qc-overlay', role: 'dialog', 'aria-modal': 'true', 'aria-label': t.title }, [panel]);

    save.addEventListener('click', function () {
      var v = {};
      panel.querySelectorAll('.qc-switch').forEach(function (s) {
        v[s.dataset.key] = s.getAttribute('aria-checked') === 'true';
      });
      write(v); destroy();
    });
    reject.addEventListener('click', function () { write({ analytics: false, marketing: false }); destroy(); });
    accept.addEventListener('click', function () { write({ analytics: true, marketing: true }); destroy(); });
    close.addEventListener('click', function () { destroy(); if (!read()) showBanner(); });
    root.addEventListener('click', function (e) { if (e.target === root) { destroy(); if (!read()) showBanner(); } });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape' && root) { destroy(); document.removeEventListener('keydown', esc); if (!read()) showBanner(); }
    });
    document.body.appendChild(root);
  }

  // --- API pública (enlace «Configuración de privacidad» del pie) ----------
  window.qerubConsent = {
    open: showModal,
    get: read,
    // Dispara una conversión solo si hay consentimiento de publicidad.
    track: function (name, params) {
      var v = read();
      if (!v || !v.marketing) return false;
      if (!MEASUREMENT_IDS.ads) return false;
      gtag('event', name, params || {});
      return true;
    }
  };
  // Compatibilidad con el enlace del footer de la SPA
  window.__qerubConsent = window.__qerubConsent || {};
  window.__qerubConsent.request = showModal;

  // --- Arranque ------------------------------------------------------------
  function boot() {
    var saved = read();
    if (saved) apply(saved);
    else setTimeout(showBanner, 600);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
