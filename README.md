# Qerub — sitio web

Sitio de marketing de Qerub (ciberseguridad práctica para pymes). Web **estática**, bilingüe
(ES/EN), construida con React + Babel renderizando en el navegador. No tiene backend: el
formulario de contacto se envía a un servicio externo (Formspree).

## Estructura

```
index.html        # punto de entrada
css/              # fonts.css · styles.css · legal.css
js/               # componentes (copy, shared, brand, header, hero, sections,
                  #   contact, footer, cookies, main) + vendor/ (React, ReactDOM, Babel)
assets/           # fonts/ e img/ (icono, logo, favicons)
legal/            # aviso-legal · politica-privacidad · politica-cookies
resources/        # PDFs y DOCX descargables
Qerub.html        # export original de un solo archivo (copia de seguridad, no se usa)
```

## Ejecutar en local

Debe servirse por HTTP (no abrir `index.html` con doble clic — Babel necesita `fetch`):

```bash
python3 -m http.server 8765
# luego abre http://localhost:8765
```

## Desplegar

Es un sitio estático: **sin comando de build** y **directorio de salida = raíz (`/`)**.
Recomendado: Cloudflare Pages (gratis, ancho de banda ilimitado). Cada `git push` redespliega.

## Pendiente antes de publicar (TODOs)

- [ ] `js/contact.js` → `QERUB_FORM_ENDPOINT`: pegar el endpoint real de [Formspree](https://formspree.io).
- [ ] `js/copy.js` → `QERUB_CONTACT`: teléfono real y confirmar el email.
- [ ] `legal/*.html`: completar los campos marcados en rojo (`[...]`) y revisión legal.

## Mejoras futuras (P1)

Build de producción: precompilar JSX, usar React de producción minificado y eliminar Babel del
navegador (≈4,3 MB → ≈150 KB de JS), recortar fuentes y añadir prerender/SSR para SEO.
