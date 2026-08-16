#!/usr/bin/env bash
# Activa la medición de Google Ads en qerub.com.
#
# Es lo último que queda, y solo se puede hacer cuando la cuenta de Google Ads
# existe, porque los dos valores que pide no existen antes.
#
#   ./activar-ads.sh AW-123456789 AW-123456789/AbC-D_efGhIjKlMnOp
#                    └─ ID de conversión   └─ ID + etiqueta, con la barra
#
# El segundo valor sale de: Google Ads › Objetivos › Conversiones › tu conversión
# › «Configurar la etiqueta» › «Instalar la etiqueta manualmente». Dentro del
# fragmento de código busca la línea que dice send_to: y copia lo que va entre
# comillas — eso es exactamente lo que hay que pasar aquí.
#
# Opcional, si además quieres Google Analytics 4:
#   ./activar-ads.sh AW-123456789 AW-123456789/AbC-D_efGhIjKlMnOp G-XXXXXXXXXX
#
set -euo pipefail
cd "$(dirname "$0")"

ADS="${1:-}"
CONV="${2:-}"
GA4="${3:-}"
ARCHIVO="js/qerub-consent.js"

rojo()  { printf '\033[31m%s\033[0m\n' "$*"; }
verde() { printf '\033[32m%s\033[0m\n' "$*"; }

if [ -z "$ADS" ] || [ -z "$CONV" ]; then
  rojo "Faltan datos."
  echo
  echo "Uso:  ./activar-ads.sh <ID-de-conversión> <ID/etiqueta> [ID-de-GA4]"
  echo "Ej.:  ./activar-ads.sh AW-123456789 AW-123456789/AbC-D_efGhIjKlMnOp"
  exit 1
fi

# --- Comprobaciones de formato -------------------------------------------
# El error más común es pegar el ID de cliente de 10 dígitos (123-456-7890),
# que es el número de la cuenta y NO sirve para medir. El que sirve empieza
# por AW- y lo da la propia pantalla de la conversión.
if [[ "$ADS" =~ ^[0-9]{3}-[0-9]{3}-[0-9]{4}$ ]]; then
  rojo "Eso es el ID de cliente de la cuenta ($ADS), no el de conversión."
  echo "El que necesito empieza por AW- y aparece en la pantalla de la etiqueta."
  exit 1
fi
if [[ ! "$ADS" =~ ^AW-[0-9]+$ ]]; then
  rojo "El primer valor debería tener la forma AW-123456789. Recibido: $ADS"
  exit 1
fi
if [[ ! "$CONV" =~ ^AW-[0-9]+/.+$ ]]; then
  rojo "El segundo valor debería tener la forma AW-123456789/EtiquetaDeConversion."
  echo "Recibido: $CONV"
  echo "Tiene que llevar la barra. Es el contenido de send_to: en el código de Google."
  exit 1
fi
if [ "${CONV%%/*}" != "$ADS" ]; then
  rojo "Los dos valores no coinciden: '$CONV' no empieza por '$ADS'."
  echo "Son de cuentas distintas, o uno está mal copiado."
  exit 1
fi
if [ -n "$GA4" ] && [[ ! "$GA4" =~ ^G-[A-Z0-9]+$ ]]; then
  rojo "El ID de Analytics debería tener la forma G-XXXXXXXXXX. Recibido: $GA4"
  exit 1
fi

# --- Aplicar --------------------------------------------------------------
cp "$ARCHIVO" "$ARCHIVO.bak"

sed -i '' -E "s#(var MEASUREMENT_IDS = \{ ads: ')[^']*(', analytics: ')[^']*('.*)#\1$ADS\2$GA4\3#" "$ARCHIVO"
sed -i '' -E "s#(var CONVERSION_LEAD = ')[^']*(';)#\1$CONV\2#" "$ARCHIVO"

# Verificar que el sed hizo lo que dice que hizo, antes de compilar nada.
if ! grep -q "ads: '$ADS'" "$ARCHIVO" || ! grep -q "CONVERSION_LEAD = '$CONV'" "$ARCHIVO"; then
  rojo "El archivo no quedó como debía. Lo dejo como estaba."
  mv "$ARCHIVO.bak" "$ARCHIVO"
  exit 1
fi
rm -f "$ARCHIVO.bak"

echo
verde "Configurado en $ARCHIVO:"
grep -n "MEASUREMENT_IDS = \|CONVERSION_LEAD = " "$ARCHIVO" | sed 's/^/  /'
echo

./build.sh

echo
git add -A
git commit -q -m "Activar medición de Google Ads: ID de conversión y etiqueta de lead

Con esto el sitio ya carga gtag —solo tras aceptar publicidad— y el envío
de formulario, tanto en la web como en las 28 landings, cuenta como
conversión Lead_Formulario.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push -q origin main

echo
verde "✓ Desplegado. Cloudflare tarda entre 20 y 40 segundos en propagarlo."
echo
echo "Comprueba antes de gastar un euro:"
echo "  1. Abre qerub.com en una ventana de incógnito."
echo "  2. Sin tocar nada: no debe haber ninguna cookie ni petición a Google."
echo "  3. Acepta: ahora sí aparecen gtag y las cookies _ga y _gcl_au."
echo "  4. Envía el formulario de una landing y mira si la conversión llega"
echo "     a Google Ads. Tarda hasta 3 horas en verse."
