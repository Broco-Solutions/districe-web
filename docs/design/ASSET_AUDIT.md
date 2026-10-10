# Auditoría de assets — 08-10-2026

## Activos publicados y uso

| Ruta canónica | Fuente / tratamiento | Uso |
| --- | --- | --- |
| `public/logos/districe/primary.png` | Logo Districe institucional de 2161 × 728 px, limpiado desde el JPEG de mayor resolución y exportado con transparencia | Header, menú móvil, footer y shell de páginas |
| `public/logos/districe/reversed.png` | Variante blanca transparente generada a partir del logo institucional; el fondo y los contraformas internas quedan transparentes | Footer sobre navy |
| `public/images/brands/jarama-logo.png` | Master transparente RGBA de 2400 × 397 px entregado para uso principal | Home, hub/listado de marcas, familias y página Jarama sobre superficies claras |
| `public/images/brands/jarama-logo-white.png` | Variante transparente RGBA de 2400 × 397 px para contraste invertido | Variante reservada para superficies oscuras; V7 usa el master rojo en la página Jarama |
| `public/logos/brands/k78-transparent.png` | Logo K78 de la fuente local, recortado y con fondo exterior eliminado; originales blancos internos conservados | Home y página de marcas |
| `public/logos/brands/revigal.png` | Archivo de logo del sitio oficial Revigal, conservando el bloque rojo y sus letras blancas | Home y página de marcas |
| `public/logos/brands/veslee.webp` | Archivo de logo del sitio oficial Veslee | Home y página de marcas |
| `public/images/brands/bioepecuen-logo.png` | Nuevo master transparente entregado en el repositorio, 2172 × 724 px | Home, marcas, familias y página de Bioepecuén |
| `public/images/brands/locx-logo.png` | Nuevo master transparente entregado en el repositorio, 2172 × 724 px | Home, marcas, familias y página LOCX |
| `public/logos/broco/bs-mark-neg.svg` | Mark blanco oficial de Broco Solutions obtenido de su sitio público | Crédito del footer, enlazado a `www.brocosolutions.com` |
| `public/images/families/jarama-espuma-activa-cutout.webp` | Foto real de producto Jarama, fondo exterior quitado; original conservado | Card de Estética vehicular |
| `public/images/families/editorial/estetica-vehicular.webp` | Escena editorial coherente, sin marcas ficticias | Hero, Home, hub y familia Estética |
| `public/images/families/editorial/aditivos-lubricantes-fluidos.webp` | Escena editorial coherente, sin marcas ficticias | Hero, Home, hub y familia Aditivos |
| `public/images/editorial/distribucion-deposito-generated.webp` | Escena editorial de distribución; no se presenta como instalación real | Hero y Open Graph |
| `public/images/products/jarama-*.webp` | Originales de producto de la fuente local existente | Respaldo/originales; no borrar |
| `public/catalogos/bioepecuen-difusores-auto.pdf` | Catálogo recibido del cliente, copia local | CTA de descarga en Bioepecuén; no tratar como fotografía institucional |

Los originales de trabajo en `public/brand/` y `public/images/` se conservan como respaldo. El código debe apuntar a las rutas canónicas de `public/logos/` para logos publicados.

## Consistencia y límites

- Los logos se alojan en superficies neutras y se escalan por altura óptica, no por la proporción de sus lienzos originales.
- Los raster históricos `public/logos/brands/jarama.png` y `public/images/brands/jarama-source.jpg` se retiraron al quedar sin referencias; no existe fallback publicado para Jarama.
- El logo Districe se usa a 176 px de ancho o más en escritorio y 144 px o más en móvil; evitar reducirlo por debajo de 128 px.
- Para fondos oscuros se usa la variante canónica transparente `reversed.png`, sin filtros que puedan rellenar los contraformas internas.
- No se creó favicon: el logo disponible es horizontal y no hay un símbolo cuadrado aprobado para abreviarlo.
- LOCX reemplaza la denominación provisoria “Lock”: la fuente oficial confirma la identidad y su relación con aditivos automotor.
- Bioepecuén usa el logo transparente disponible en su sitio oficial; no se incorporaron claims ni productos fuera del catálogo confirmado.
- Veslee usa su logo oficial, pero no se amplían sus claims ni se importan imágenes de producto del fabricante.

## Fotografía y material pendiente

- No hay fotografías verificadas del depósito, equipo, flota, preparación de pedidos ni instalaciones. La composición tipográfica actual se mantiene hasta que el cliente entregue fotos reales.
- Jarama aporta el único conjunto de fotografía real de producto utilizable para esta pasada. No representa instalaciones ni operación de Districe.
- Las seis familias usan escenas editoriales generadas específicamente para esta interfaz, sin logos ni marcas ficticias; están documentadas en `docs/ASSET_PROVENANCE.md`.
- Para una futura tanda: pedir originales de depósito/logística y versiones oficiales/vectoriales de logo Districe, Jarama y marcas sin asset confiable.
