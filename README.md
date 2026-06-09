# Qerub — sitio web

Sitio de marketing de Qerub (ciberseguridad práctica para pymes). Web **estática**, bilingüe
(ES/EN), hecha con React. El JSX se **precompila** a un único bundle minificado (`js/app.min.js`)
con [esbuild]; no hay Babel en el navegador. No hay backend: el formulario de contacto se envía a
un servicio externo (Formspree).

## Estructura

```
index.html        # punto de entrada (carga React de producción + js/app.min.js)
src/              # FUENTE editable (JSX): copy, shared, brand, header, hero,
                  #   sections, contact, footer, cookies, main
build.sh          # compila src/ → js/app.min.js (esbuild)
css/              # fonts.css · styles.css · legal.css
js/
  app.min.js      # bundle compilado (generado por build.sh — no editar a mano)
  vendor/         # react.production.min.js · react-dom.production.min.js
assets/           # fonts/ (woff2) e img/ (icono, logo, favicons)
legal/            # aviso-legal · politica-privacidad · politica-cookies
resources/        # PDFs y DOCX descargables
Qerub.html        # export original de un solo archivo (copia de seguridad, no se usa)
```

## Editar y compilar

1. Edita los componentes en **`src/*.js`** (incluido `src/copy.js`: textos, `QERUB_CONTACT`,
   `QERUB_FORM_ENDPOINT` está en `src/contact.js`).
2. Recompila el bundle:

   ```bash
   ./build.sh            # requiere Node; usa esbuild vía npx
   ```

3. Sirve en local (por HTTP, no abrir el archivo directamente):

   ```bash
   python3 -m http.server 8765   # luego http://localhost:8765
   ```

## Desplegar

Sitio estático: **sin comando de build en el host** y **directorio de salida = raíz (`/`)**.
Cloudflare Pages (gratis, ancho de banda ilimitado). Cada `git push` redespliega.
El bundle ya viene compilado y commiteado, así que el host solo sirve archivos.

## Pendiente

- [ ] `legal/*.html`: completar los campos en rojo (`[...]`) — razón social, NIF, domicilio,
      datos registrales, ciudad, DPD, proveedor de correo — y revisión legal.
- [ ] Confirmar el dominio en las metaetiquetas de `index.html` (se asume `qerub.com`).
- [ ] (Opcional) Prerender/SSR para SEO: hoy el contenido se renderiza en cliente.
- [ ] (Opcional) Versiones en inglés de los 3 recursos descargables.

## Peso

JS total ≈ 220 KB sin comprimir (~67 KB gzip): `app.min.js` 81 KB + ReactDOM 128 KB + React 10 KB.
