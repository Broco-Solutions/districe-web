# Guía de uso de logos

## Districe

- Principal: `public/logos/districe/primary.png`, logo institucional azul con descriptor y fondo transparente.
- Fondos claros: usar la imagen a color sin filtro (header, menú móvil y páginas).
- Fondos oscuros: usar `public/logos/districe/reversed.png` (footer). Es una variante blanca transparente del original: conserva transparentes el fondo y los contraformas internas de las letras. No recolorear ni recomponer letras en CSS.
- Ancho recomendado: 176–240 px en escritorio y 144–176 px en móvil. Mínimo recomendado: 128 px; por debajo, el descriptor pierde legibilidad.
- Proteger el margen transparente incluido en el archivo. No comprimir a una caja, estirar ni convertir en un icono cuadrado.
- No hay favicon aprobado: la marca disponible es horizontal y no existe isotipo separado confirmado.

## Marcas

Los masters canónicos de Jarama, LOCX y Bioepecuén están en `public/images/brands/`; las demás marcas conservan sus archivos de `public/logos/brands/`. Jarama usa `jarama-logo.png` sobre superficies claras y `jarama-logo-white.png` únicamente sobre fondos oscuros, resuelto mediante la variante centralizada de `BrandLogo`. Mantener siempre la proporción original y ajustar por tamaño óptico dentro de ese componente; no estirar ni reconstruir el arte. Las superficies deben permanecer neutras y sólo usar contraste controlado cuando el archivo realmente lo necesite.

## Créditos

El footer usa `public/logos/broco/bs-mark-neg.svg`, el mark blanco oficial de Broco Solutions, junto al texto “Broco Solutions”. El bloque completo enlaza a `https://www.brocosolutions.com`.
