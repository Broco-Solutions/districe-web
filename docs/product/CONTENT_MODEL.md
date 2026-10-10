# Modelo de contenido

## Principio

El catálogo es estático, tipado y versionado en Git. No requiere base de datos, CMS ni almacenamiento persistente.

## Entidades públicas

| Entidad | Identidad | Relación |
| --- | --- | --- |
| `ProductFamily` | `slug` | Contiene líneas y marcas a través de sus relaciones. |
| `Brand` | `slug` | Puede pertenecer a una o más familias; puede tener líneas y familias de catálogo respaldadas por fuente. |
| `CatalogLine` | `familySlug/brandSlug/lineSlug` | Pertenece a una marca dentro de una familia. |
| `CatalogItem` | `brandSlug/id` | Ítem de catálogo sin SKU ni precio cuando la fuente sólo respalda una familia de producto o aroma. |

La línea no es global. Por ejemplo, `estetica-vehicular/k78/perfumes` y `estetica-vehicular/jarama/perfumes` son entidades distintas aunque compartan nombre visible. En código, la identidad se conserva en `CatalogLine.id`; los destinos públicos actuales llevan a su marca hasta que exista una página de línea justificada.

## Implementación

- `src/data/catalog.ts` contiene familias, marcas, líneas y helpers de URL.
- El índice de búsqueda se deriva de esas entidades y presenta `marca · familia` para desambiguar líneas homónimas.
- Los assets públicos viven en `public/images/` y `public/catalogos/`; el PDF de Bioepecuén se sirve como `/catalogos/bioepecuen-difusores-auto.pdf`.
- Toda ampliación exige fuente y confirmación comercial en el mismo cambio.

## Reglas

- Slugs ASCII en kebab-case; IDs de línea contextuales y estables.
- Marcas excluidas nunca ingresan al catálogo, búsqueda, metadata ni sitemap.
- Claims, métricas y canales de contacto se publican sólo con evidencia vigente.
- LOCX está confirmada dentro de Aditivos y se publica con identidad oficial obtenida de `locx.com.ar`.
- Servex permanece fuera de publicación mientras su familia no esté clasificada con evidencia suficiente.
