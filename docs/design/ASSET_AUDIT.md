# Auditoría de assets — 08-10-2026

## Activos publicados y uso

| Ruta canónica | Fuente / tratamiento | Uso |
| --- | --- | --- |
| `public/logos/districe/primary.png` | Logo Districe institucional de 2161 × 728 px, limpiado desde el JPEG de mayor resolución y exportado con transparencia | Header, menú móvil, footer y shell de páginas |
| `public/logos/brands/jarama.png` | Logo histórico local recortado y limpiado; conservar borde/contorno del arte original | Home, marcas y rail editorial |
| `public/logos/brands/k78-transparent.png` | Logo K78 de la fuente local, recortado y con fondo exterior eliminado; originales blancos internos conservados | Home y página de marcas |
| `public/logos/brands/revigal.png` | Archivo de logo del sitio oficial Revigal, conservando el bloque rojo y sus letras blancas | Home y página de marcas |
| `public/logos/brands/veslee.webp` | Archivo de logo del sitio oficial Veslee | Home y página de marcas |
| `public/images/hero/jarama-lava-coches-cutout.webp` | Foto real del producto local, con fondo blanco exterior quitado por flood-fill; original conservado | Hero de Home |
| `public/images/families/jarama-espuma-activa-cutout.webp` | Foto real de producto Jarama, fondo exterior quitado; original conservado | Card de Estética vehicular |
| `public/images/products/jarama-*.webp` | Originales de producto de la fuente local existente | Respaldo/originales; no borrar |
| `public/catalogos/bioepecuen-difusores-auto.pdf` | Catálogo recibido del cliente, copia local | CTA de descarga en Bioepecuén; no tratar como fotografía institucional |

Los originales de trabajo en `public/brand/` y `public/images/` se conservan como respaldo. El código debe apuntar a las rutas canónicas de `public/logos/` para logos publicados.

## Consistencia y límites

- Los logos se alojan en superficies neutras y se escalan por altura óptica, no por la proporción de sus lienzos originales.
- El logo Districe se usa a 176 px de ancho o más en escritorio y 144 px o más en móvil; evitar reducirlo por debajo de 128 px.
- Para fondos oscuros se usa la misma silueta oficial en blanco mediante filtro CSS, sin alterar el dibujo ni guardar una variante divergente.
- No se creó favicon: el logo disponible es horizontal y no hay un símbolo cuadrado aprobado para abreviarlo.
- Lock y Bioepecuén no tienen logo de calidad/fuente inequívoca en el repo; se muestran como texto, sin marcas gráficas inventadas.
- Veslee usa su logo oficial, pero no se amplían sus claims ni se importan imágenes de producto del fabricante.

## Fotografía y material pendiente

- No hay fotografías verificadas del depósito, equipo, flota, preparación de pedidos ni instalaciones. La composición tipográfica actual se mantiene hasta que el cliente entregue fotos reales.
- Jarama aporta el único conjunto de fotografía real de producto utilizable para esta pasada. No representa instalaciones ni operación de Districe.
- No se generaron imágenes con IA ni se incorporó stock.
- Las familias sin foto disponible siguen usando composición tipográfica y color, no escenas ficticias.
- Para una futura tanda: pedir originales de depósito/logística y versiones oficiales/vectoriales de logo Districe, Jarama y marcas sin asset confiable.
