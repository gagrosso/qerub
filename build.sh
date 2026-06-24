#!/usr/bin/env bash
# Compila los componentes JSX de src/ en un único js/app.min.js (minificado, sin Babel).
# React/ReactDOM de producción están en js/vendor/ (ya commiteados).
# Requiere Node. Usa esbuild vía npx (se descarga solo la primera vez).
#
#   ./build.sh
#
set -euo pipefail
cd "$(dirname "$0")"

# Orden de dependencias (mismo que cargaban los <script> antes).
ORDER=(copy worldmap shared brand header hero sections contact footer cookies main)

TMP="$(mktemp -t qerub).jsx"
trap 'rm -f "$TMP"' EXIT
: > "$TMP"
for f in "${ORDER[@]}"; do
  cat "src/$f.js" >> "$TMP"
  printf '\n;\n' >> "$TMP"   # separador defensivo entre archivos
done

# Permite inyectar un esbuild local con ESBUILD=...; por defecto usa npx.
ESBUILD="${ESBUILD:-npx --yes esbuild@0.21.5}"

$ESBUILD "$TMP" \
  --jsx=transform \
  --minify \
  --target=es2018 \
  --legal-comments=none \
  --outfile=js/app.min.js

echo "✓ js/app.min.js ($(wc -c < js/app.min.js | tr -d ' ') bytes)"

# Cache-busting: sella los assets locales con una versión (hash del contenido)
# en todas las páginas, para que tras cada despliegue nadie vea versión cacheada.
VER=$(cat js/app.min.js css/styles.css css/seo-page.css js/qerub-assistant.js 2>/dev/null | shasum | cut -c1-10)
for f in index.html en-us/index.html servicios/*.html sectores/*.html; do
  [ -f "$f" ] || continue
  sed -i '' -E \
    -e "s#(/js/app\.min\.js)(\?v=[0-9a-f]+)?#\1?v=$VER#g" \
    -e "s#(/css/styles\.css)(\?v=[0-9a-f]+)?#\1?v=$VER#g" \
    -e "s#(/css/seo-page\.css)(\?v=[0-9a-f]+)?#\1?v=$VER#g" \
    -e "s#(/js/qerub-assistant\.js)(\?v=[0-9a-f]+)?#\1?v=$VER#g" \
    "$f"
done
echo "✓ cache-bust aplicado (v=$VER)"
