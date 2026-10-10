# Auditoría UI, assets y faltantes — octubre de 2026

## Diagnóstico del hero anterior

El hero anterior usaba una única botella aislada sobre una composición con mucho vacío. El caption funcionaba como una etiqueta separada del producto y no había señal visual de surtido, familias ni navegación editorial. La nueva composición preserva las imágenes reales disponibles y las convierte en una selección: producto principal, producto secundario en profundidad, familia activa, indicador de progreso y cambio lento entre tres referencias de Jarama. Así comunica variedad sin convertirse en un carrusel promocional.

## Estándar aplicado

- Logos: se aceptan SVG o PNG con alfa, proporción intacta, borde limpio y tamaño óptico consistente dentro de contenedores neutros.
- Imágenes: los productos del hero son recortes reales; las familias usan una serie editorial generada específicamente para navegación y documentada en provenance.
- Movimiento: transición suave, pausas de interacción y respeto de `prefers-reduced-motion`; no hay scroll-jacking ni parallax.

## Logo Districe

| Asset | Uso |
| --- | --- |
| `public/logos/districe/primary.png` | Header claro y menú mobile |
| `public/logos/districe/reversed.png` | Footer oscuro |

Ambas variantes son PNG RGBA/alpha de alta resolución (2163 × 706). No se encontró un SVG de fuente verificable, por lo que no se vectorizó ni rediseñó la marca. Falta un favicon/app icon oficial: no debe derivarse arbitrariamente del wordmark.

## Logos de marcas

Se conservan y normalizan dentro de un marco común: Jarama, K78, Revigal, Veslee, LOCX y Bioepecuén. K78, Revigal, Veslee, LOCX y Bioepecuén usan archivos descargados de fuentes oficiales; LOCX reemplaza la denominación provisoria anterior y usa su variante clara oficial sobre soporte oscuro.

La búsqueda externa confirmó fuentes oficiales vigentes para K78 (`k78argentina.com`), Revigal (`revigal.com.ar`), Veslee (`vesleeaditivos.com`) y Bioepecuén (`bioepecuenaromas.com.ar`). Se descargó una selección de logos y productos oficiales de esos sitios; cada URL y transformación está en `docs/ASSET_PROVENANCE.md`.

## Faltantes

### A. Críticos

- Master vectorial de LOCX, si la marca lo comparte; la versión PNG oficial actual ya es apta para web.
- SVG oficial de Districe y favicon/app icon autorizado.
- Fotografías reales de producto para Aditivos, Higiene y seguridad, Repuestos y accesorios, Anaeróbicos, y Cintas y films. Hoy esas familias usan un sistema gráfico, no fotografía.

### B. Deseables

- Fotografías propias del depósito, equipo y preparación de pedidos.
- Recortes de producto homogéneos por cada familia y mejores fondos/editoriales de marca.
- Catálogos actuales validados para las marcas publicadas.

### C. Resolubles con búsqueda externa

- Masters vectoriales de LOCX y Veslee, si estuvieran disponibles.
- Catálogos públicos actualizados de K78 y Revigal.
- Press kits o imágenes de producto autorizadas por cada marca.

### D. Dependientes del cliente

- Autorización y archivos maestros de marcas distribuidas.
- Fotos reales del depósito/operación y lineamientos de uso.
- WhatsApp y contactos comerciales definitivos.
- Catálogos propios, stock y disponibilidad comercial actualizados.

## Inventario de imágenes usado

- Reales existentes: Jarama Lava Coches, Espuma Activa y Brillo; se usan en el hero y la familia Estética vehicular.
- Reales externos: K78 Bug Remover y Veslee Sella Fuga Radiador se usan en el hero junto al producto Jarama provisto; Veslee Lubricante Multiuso continúa en Aditivos. El packshot de Revigal se reservó para páginas internas porque su resolución no sostiene la escala protagonista del hero.
- IA: dos imágenes editoriales de operación/distribución y seis escenas de familia. Se documentan internamente y el contenido no las atribuye a instalaciones de Districe ni a marcas reales.
