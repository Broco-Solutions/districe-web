import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getBrand, productsForFamily } from "@/data/catalog";
import { BrandLogo } from "@/components/brand-logo";
import { CatalogActions } from "@/components/catalog/catalog-actions";
import { PageShell } from "@/components/catalog/page-shell";

export function generateStaticParams() { return brands.map((brand) => ({ slug: brand.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const brand = getBrand((await params).slug); return brand ? { title: `${brand.name} | Marcas`, description: `Conocé las líneas de ${brand.name} en ${brand.description}. Distribución Districe.` } : {}; }

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const brand = getBrand((await params).slug); if (!brand) notFound();
  const vesleeSelection = brand.slug === "veslee" ? productsForFamily(brand.familySlugs[0]).filter((product) => product.manufacturer === "Veslee") : [];
  return <PageShell><nav className="brand-breadcrumb section-shell" aria-label="Ruta de navegación"><Link href="/marcas">Marcas</Link><span aria-hidden="true">/</span><span>{brand.name}</span></nav><section className="catalog-grid brand-page v7-brand-page"><div className={`brand-image brand-surface-${brand.slug}`}><h1 className="sr-only">{brand.name}</h1><BrandLogo slug={brand.slug} priority sizes="(max-width: 720px) 76vw, 440px" /><span className="brand-feature-category">{brand.description}</span></div><div><p className="eyebrow"><span /> {brand.catalog ? "Catálogo oficial" : "Líneas de producto"}</p><h2>{brand.catalog?.heading ?? (vesleeSelection.length ? "Una selección Veslee para mantenimiento y cuidado." : "Una selección para el canal profesional.")}</h2><p className="catalog-copy">Conocé las líneas de esta marca y consultanos por disponibilidad para tu negocio.</p>{brand.lines.length > 0 && <ul>{brand.lines.map((line) => <li key={line}>{line}</li>)}</ul>}{vesleeSelection.length > 0 && <aside className="veslee-brand-callout"><b>{vesleeSelection.length} productos seleccionados</b><span>Combustible, lubricación, limpieza técnica, cuidado y visibilidad.</span><Link href={`/productos/${brand.familySlugs[0]}#productos-veslee`}>Explorar productos Veslee ↗</Link></aside>}{brand.catalog?.summary && <p className="catalog-copy">{brand.catalog.summary}</p>}{brand.catalogItems && <><h3>Del catálogo {brand.name}</h3><ul>{brand.catalogItems.map((item) => <li key={item.id}>{item.name}</li>)}</ul></>}{brand.catalog && <CatalogActions catalog={brand.catalog} />}<Link className="button" href="/contacto">Consultar esta marca <span aria-hidden="true">↗</span></Link><Link className="catalog-back" href={`/productos/${brand.familySlugs[0]}`}>Volver a {brand.description}</Link></div></section></PageShell>;
}
