# Auditoría UI, assets y faltantes — octubre de 2026

## Diagnóstico del hero anterior

El hero anterior usaba una única botella aislada sobre una composición con mucho vacío. El caption funcionaba como una etiqueta separada del producto y no había señal visual de surtido, familias ni navegación editorial. La nueva composición preserva las imágenes reales disponibles y las convierte en una selección: producto principal, producto secundario en profundidad, familia activa, indicador de progreso y cambio lento entre tres referencias de Jarama. Así comunica variedad sin convertirse en un carrusel promocional.

## Estándar aplicado

- Logos: se aceptan SVG o PNG con alfa, proporción intacta, borde limpio y tamaño óptico consistente dentro de contenedores neutros.
- Imágenes: se usan únicamente recortes reales de producto disponibles en el proyecto. No se usan renders ni imágenes IA.
- Movimiento: transición suave, pausas de interacción y respeto de `prefers-reduced-motion`; no hay scroll-jacking ni parallax.

## Logo Districe

| Asset | Uso |
| --- | --- |
| `public/logos/districe/primary.png` | Header claro y menú mobile |
| `public/logos/districe/reversed.png` | Footer oscuro |

Ambas variantes son PNG RGBA/alpha de alta resolución (2163 × 706). No se encontró un SVG de fuente verificable, por lo que no se vectorizó ni rediseñó la marca. Falta un favicon/app icon oficial: no debe derivarse arbitrariamente del wordmark.

## Logos de marcas

Se conservan y normalizan dentro de un marco común: Jarama, K78, Revigal, Veslee y Bioepecuén. K78, Revigal, Veslee y Bioepecuén se actualizaron con archivos descargados de fuentes oficiales durante la segunda pasada. Lock es una marca publicada y confirmada en el catálogo, pero no cuenta con logo fuente local ni oficial verificable; se muestra como wordmark editorial, no como un logo inventado.

La búsqueda externa confirmó fuentes oficiales vigentes para K78 (`k78argentina.com`), Revigal (`revigal.com.ar`), Veslee (`vesleeaditivos.com`) y Bioepecuén (`bioepecuenaromas.com.ar`). Se descargó una selección de logos y productos oficiales de esos sitios; cada URL y transformación está en `docs/ASSET_PROVENANCE.md`.

## Faltantes

### A. Críticos

- Logo oficial de Lock en vector o PNG transparente.
- SVG oficial de Districe y favicon/app icon autorizado.
- Fotografías reales de producto para Aditivos, Higiene y seguridad, Repuestos y accesorios, Anaeróbicos, y Cintas y films. Hoy esas familias usan un sistema gráfico, no fotografía.

### B. Deseables

- Fotografías propias del depósito, equipo y preparación de pedidos.
- Recortes de producto homogéneos por cada familia y mejores fondos/editoriales de marca.
- Catálogos actuales validados para las marcas publicadas.

### C. Resolubles con búsqueda externa

- Logos oficiales de Lock y Veslee en SVG/PNG transparentes.
- Catálogos públicos actualizados de K78 y Revigal.
- Press kits o imágenes de producto autorizadas por cada marca.

### D. Dependientes del cliente

- Autorización y archivos maestros de marcas distribuidas.
- Fotos reales del depósito/operación y lineamientos de uso.
- WhatsApp y contactos comerciales definitivos.
- Catálogos propios, stock y disponibilidad comercial actualizados.

## Inventario de imágenes usado

- Reales existentes: Jarama Lava Coches, Espuma Activa y Brillo; se usan en el hero y la familia Estética vehicular.
- Reales externos: K78 Bug Remover, Revigal Espuma Activa y Veslee Limpia Inyectores se usan en el hero; Veslee Lubricante Multiuso en Aditivos. Se sumaron selecciones adicionales para futuras tarjetas.
- IA: dos imágenes editoriales de operación/distribución, claramente rotuladas como generadas. Se usan en Home y Empresa; no se atribuyen a instalaciones de Districe.
