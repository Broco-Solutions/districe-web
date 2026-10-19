import type { CatalogDocument } from "@/data/catalog";

type CatalogActionsProps = {
  catalog: CatalogDocument;
};

export function CatalogActions({ catalog }: CatalogActionsProps) {
  return <div className="catalog-actions">
    <a className="button" href={catalog.url} target="_blank" rel="noopener noreferrer">
      Ver {catalog.title} <span aria-hidden="true">↗</span>
    </a>
    <a className="catalog-download" href={catalog.url} download>
      Descargar PDF <span aria-hidden="true">↓</span>
    </a>
  </div>;
}
