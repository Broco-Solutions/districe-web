# Modelo de contenido

## Principio

El catálogo es estático, tipado y versionado en Git. No requiere base de datos, CMS ni almacenamiento persistente.

## Entidades públicas

| Entidad | Identidad | Relación |
| --- | --- | --- |
| `ProductFamily` | `slug` | Contiene líneas y marcas a través de sus relaciones; puede tener documentación comercial propia. |
| `Brand` | `slug` | Puede pertenecer a una o más familias; puede tener líneas y familias de catálogo respaldadas por fuente. |
| `CatalogLine` | `familySlug/brandSlug/lineSlug` | Pertenece a una marca dentro de una familia. |
| `CatalogItem` | `brandSlug/id` | Ítem de catálogo sin SKU ni precio cuando la fuente sólo respalda una familia de producto o aroma. |
| `FeaturedProduct` | `id` | Selección comercial dentro de una familia; puede declarar fabricante, grupo visual, imagen, términos de búsqueda y datos técnicos verificados sin convertirse en marca pública. |

La línea no es global. Por ejemplo, `estetica-vehicular/k78/perfumes` y `estetica-vehicular/jarama/perfumes` son entidades distintas aunque compartan nombre visible. En código, la identidad se conserva en `CatalogLine.id`; los destinos públicos actuales llevan a su marca hasta que exista una página de línea justificada.

## Implementación

- `src/data/catalog.ts` contiene familias, marcas, líneas y helpers de URL.
- El índice de búsqueda se deriva de esas entidades y presenta `marca · familia` para desambiguar líneas homónimas.
- Los assets públicos viven en `public/images/` y `public/catalogos/`. Los PDF de Bioepecuén, Jarama, K78, LOCX y Revigal se registran en `Brand.catalog`, que alimenta el CTA compartido de apertura y descarga en cada página de marca.
- Los documentos que pertenecen a una familia se registran en `ProductFamily.catalog`. El catálogo de Anken se presenta como fuente técnica de Higiene y seguridad, sin sumar a Anken al directorio de seis marcas.
- Los productos seleccionados para una familia se registran en `featuredProducts` y se consultan con `productsForFamily()`. Los cinco productos RAN verificados y el kit 5 en 1 solicitado se presentan en Estética vehicular; el kit queda sin fabricante hasta contar con evidencia.
- El catálogo Loctite se registra en `ProductFamily.catalog` para Anaeróbicos automotor. Loctite y LOCX conservan identidades y destinos independientes.
- Toda ampliación exige fuente y confirmación comercial en el mismo cambio.
- Philips y HELLA se registran como fabricantes de productos en `repuestos-accesorios`; no se agregan a `brands` ni crean rutas de marca públicas.

## Reglas

- Slugs ASCII en kebab-case; IDs de línea contextuales y estables.
- Marcas excluidas nunca ingresan al catálogo, búsqueda, metadata ni sitemap.
- Claims, métricas y canales de contacto se publican sólo con evidencia vigente.
- LOCX está confirmada dentro de Aditivos y se publica con identidad oficial obtenida de `locx.com.ar`.
- Servex permanece fuera de publicación mientras su familia no esté clasificada con evidencia suficiente.
