import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/data/catalog";
import { PageShell } from "@/components/catalog/page-shell";

const images: Record<string, { src: string; alt: string; width: number; height: number }> = {
  jarama: { src: "/images/families/jarama-espuma-activa-cutout.webp", alt: "Producto Jarama espuma activa", width: 437, height: 800 },
  k78: { src: "/logos/brands/k78-transparent.png", alt: "Logo K78", width: 299, height: 124 },
  revigal: { src: "/logos/brands/revigal.png", alt: "Logo Revigal", width: 500, height: 123 },
  veslee: { src: "/logos/brands/veslee.webp", alt: "Logo Veslee", width: 545, height: 344 },
  bioepecuen: { src: "/logos/brands/bioepecuen.png", alt: "Logo Bioepecuén", width: 512, height: 484 },
};

export function generateStaticParams() { return brands.map((brand) => ({ slug: brand.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const brand = getBrand((await params).slug); return brand ? { title: `${brand.name} | Marcas`, description: `Líneas ${brand.name} relevadas dentro de Estética vehicular en Districe.` } : {}; }

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const brand = getBrand((await params).slug); if (!brand) notFound(); const image = images[brand.slug];
  return <PageShell><section className="catalog-hero"><p>Marcas / {brand.name}</p><h1>{brand.name}</h1><span>Marca confirmada dentro de {brand.description}.</span></section><section className="catalog-grid brand-page">{image ? <div className={`brand-image brand-image-${brand.slug}`}><Image src={image.src} width={image.width} height={image.height} alt={image.alt} priority /></div> : <div className="brand-image brand-image-wordmark"><span>Marca confirmada</span><b>{brand.name}</b><small>{brand.description}</small></div>}<div><p className="eyebrow"><span /> {brand.catalogItems ? "Catálogo confirmado" : "Líneas relevadas"}</p><h2>{brand.catalogItems ? "Difusores para el interior del auto." : "Una selección para el canal profesional."}</h2><p className="catalog-copy">Las líneas disponibles se presentan según las fuentes confirmadas. Consultá por disponibilidad comercial.</p><ul>{brand.lines.map((line) => <li key={line}>{line}</li>)}</ul>{brand.catalogItems && <><h3>Del catálogo Bioepecuén</h3><ul>{brand.catalogItems.map((item) => <li key={item.id}>{item.name}</li>)}</ul><a className="button" href={brand.catalogUrl} target="_blank" rel="noreferrer">Ver catálogo ↗</a></>}<Link className="button" href="/contacto">Consultar esta marca ↗</Link><Link className="catalog-back" href={`/productos/${brand.familySlugs[0]}`}>Volver a {brand.description}</Link></div></section></PageShell>;
}
