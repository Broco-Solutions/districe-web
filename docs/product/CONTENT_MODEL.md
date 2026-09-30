# Modelo de contenido

## Principio

Todo contenido público vive como módulos TypeScript/MDX y activos versionados en el repositorio. No hay fuente externa de datos ni persistencia.

## Entidades

| Entidad | Campos mínimos | Relaciones |
| --- | --- | --- |
| `ProductFamily` | `slug`, `name`, `description`, `image`, `children[]` | Tiene muchas líneas/subfamilias y marcas relacionadas. |
| `ProductLine` | `slug`, `name`, `familySlug`, `brandSlug`, `synonyms[]` | La identidad pública es compuesta: familia + marca + línea. |
| `Brand` | `slug`, `name`, `logo`, `description`, `lineSlugs[]`, `featured` | Tiene muchas líneas; se relaciona con familias a través de ellas. |
| `CatalogAsset` | `title`, `file`, `brandSlug?`, `familySlug?`, `updatedAt` | PDF local opcional; indexable y descargable. |
| `ProofPoint` | `label`, `value`, `source`, `approved` | Sólo se publica con `approved: true`. |
| `ContactChannel` | `type`, `label`, `value`, `href`, `primary` | Alimenta CTA, header, footer y páginas de contacto. |

## Búsqueda

Índice derivado en build desde familias, líneas y marcas. Cada documento indexa nombre, sinónimos, descripción y relaciones. Autocompletado local, con grupos “Familias”, “Marcas” y “Líneas”; los resultados llevan a una página de exploración, nunca a compra.

## Convenciones

- Slugs estables, ASCII y kebab-case.
- Imágenes locales en `public/images/`; logos en `public/brands/`; PDFs en `public/catalogs/`.
- Ningún texto comercial, métrica o logo se agrega sin fuente/confirmación en el commit correspondiente.
- `src/data/catalog.ts` contiene el primer conjunto tipado y desacoplado de la UI.
