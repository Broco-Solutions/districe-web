import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/data/catalog";
import { BrandLogo } from "@/components/brand-logo";
import { PageShell } from "@/components/catalog/page-shell";

export function generateStaticParams() { return brands.map((brand) => ({ slug: brand.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const brand = getBrand((await params).slug); return brand ? { title: `${brand.name} | Marcas`, description: `Conocé las líneas de ${brand.name} en ${brand.description}. Distribución Districe.` } : {}; }

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const brand = getBrand((await params).slug); if (!brand) notFound();
  return <PageShell><nav className="brand-breadcrumb section-shell" aria-label="Ruta de navegación"><Link href="/marcas">Marcas</Link><span aria-hidden="true">/</span><span>{brand.name}</span></nav><section className="catalog-grid brand-page v7-brand-page"><div className={`brand-image brand-surface-${brand.slug}`}><h1 className="sr-only">{brand.name}</h1><BrandLogo slug={brand.slug} priority sizes="(max-width: 720px) 76vw, 440px" /><span className="brand-feature-category">{brand.description}</span></div><div><p className="eyebrow"><span /> {brand.catalogItems ? "Catálogo de aromas" : "Líneas de producto"}</p><h2>{brand.catalogItems ? "Difusores para el interior del auto." : "Una selección para el canal profesional."}</h2><p className="catalog-copy">Conocé las líneas de esta marca y consultanos por disponibilidad para tu negocio.</p><ul>{brand.lines.map((line) => <li key={line}>{line}</li>)}</ul>{brand.catalogItems && <><h3>Del catálogo Bioepecuén</h3><ul>{brand.catalogItems.map((item) => <li key={item.id}>{item.name}</li>)}</ul><a className="button" href={brand.catalogUrl} target="_blank" rel="noreferrer">Ver catálogo ↗</a></>}<Link className="button" href="/contacto">Consultar esta marca ↗</Link><Link className="catalog-back" href={`/productos/${brand.familySlugs[0]}`}>Volver a {brand.description}</Link></div></section></PageShell>;
}
