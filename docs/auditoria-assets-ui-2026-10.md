# Auditoría UI, assets y faltantes — octubre de 2026

## Diagnóstico del hero anterior

La primera versión rotativa seguía dependiendo de packshots aislados con transparencias y calidades dispares. A escala hero, los bordes de esos recortes se volvían visibles y la composición se percibía más promocional que editorial. La versión actual rota tres historias completas —Estética, Aditivos y Distribución— con imágenes ambientales consistentes, contexto de marcas y acceso directo a cada sección. Districe conserva la jerarquía principal y el catálogo aparece como amplitud de oferta, no como publicidad de un SKU.

## Estándar aplicado

- Logos: se aceptan SVG o PNG con alfa, proporción intacta, borde limpio y tamaño óptico consistente dentro de contenedores neutros.
- Imágenes: el hero y las familias usan una serie editorial consistente, sin packaging de marca inventado; los packshots reales quedan reservados para contextos donde su resolución es adecuada.
- Movimiento: transición suave, pausas de interacción y respeto de `prefers-reduced-motion`; no hay scroll-jacking ni parallax.

## Logo Districe

| Asset | Uso |
| --- | --- |
| `public/logos/districe/primary.png` | Header claro y menú mobile |
| `public/logos/districe/reversed.png` | Footer oscuro |

Ambas variantes son PNG RGBA/alpha de alta resolución (2163 × 706). No se encontró un SVG de fuente verificable, por lo que no se vectorizó ni rediseñó la marca. Falta un favicon/app icon oficial: no debe derivarse arbitrariamente del wordmark.

## Logos de marcas

Se conservan y normalizan dentro de un marco óptico común: Jarama, K78, Revigal, Veslee, LOCX y Bioepecuén. LOCX y Bioepecuén usan los nuevos masters transparentes entregados directamente en el repositorio; K78, Revigal y Veslee conservan archivos de fuentes oficiales y Jarama el mejor master local disponible.

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

- Reales existentes: Jarama Lava Coches, Espuma Activa y Brillo permanecen en la biblioteca de producto; no se fuerzan a escala hero.
- Reales externos: K78, Revigal y Veslee permanecen en la biblioteca de producto para usos de menor escala. El hero ya no depende de recortes heterogéneos.
- IA: dos imágenes editoriales de operación/distribución y seis escenas de familia. Se documentan internamente y el contenido no las atribuye a instalaciones de Districe ni a marcas reales.
