# Modelo de contenido

## Principio

El catálogo es estático, tipado y versionado en Git. No requiere base de datos, CMS ni almacenamiento persistente.

## Entidades públicas

| Entidad | Identidad | Relación |
| --- | --- | --- |
| `ProductFamily` | `slug` | Contiene líneas y marcas a través de sus relaciones. |
| `Brand` | `slug` | Puede pertenecer a una o más familias. |
| `CatalogLine` | `familySlug/brandSlug/lineSlug` | Pertenece a una marca dentro de una familia. |

La línea no es global. Por ejemplo, `estetica-vehicular/k78/perfumes` y `estetica-vehicular/jarama/perfumes` son entidades distintas aunque compartan nombre visible. En código, la identidad se conserva en `CatalogLine.id`; los destinos públicos actuales llevan a su marca hasta que exista una página de línea justificada.

## Implementación

- `src/data/catalog.ts` contiene familias, marcas, líneas y helpers de URL.
- El índice de búsqueda se deriva de esas entidades y presenta `marca · familia` para desambiguar líneas homónimas.
- Los assets públicos viven en `public/images/`; no se publican PDFs hasta recibirlos y validarlos.
- Toda ampliación exige fuente y confirmación comercial en el mismo cambio.

## Reglas

- Slugs ASCII en kebab-case; IDs de línea contextuales y estables.
- Marcas excluidas nunca ingresan al catálogo, búsqueda, metadata ni sitemap.
- Claims, métricas y canales de contacto se publican sólo con evidencia vigente.
