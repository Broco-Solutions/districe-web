import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/data/catalog";
import { PageShell } from "@/components/catalog/page-shell";

const images: Record<string, { src: string; alt: string; width: number; height: number }> = {
  jarama: { src: "/images/products/jarama-espuma-activa.webp", alt: "Producto Jarama espuma activa", width: 437, height: 800 },
  k78: { src: "/images/brands/k78-source.png", alt: "Logo K78", width: 360, height: 280 },
  revigal: { src: "/images/brands/revigal-source.png", alt: "Logo Revigal", width: 360, height: 280 },
};

export function generateStaticParams() { return brands.map((brand) => ({ slug: brand.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const brand = getBrand((await params).slug); return brand ? { title: `${brand.name} | Marcas`, description: `Líneas ${brand.name} relevadas dentro de Estética vehicular en Districe.` } : {}; }

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const brand = getBrand((await params).slug); if (!brand) notFound(); const image = images[brand.slug];
  return <PageShell><section className="catalog-hero"><p>Marcas / {brand.name}</p><h1>{brand.name}</h1><span>Marca confirmada dentro de Estética vehicular.</span></section><section className="catalog-grid brand-page"><div className="brand-image"><Image src={image.src} width={image.width} height={image.height} alt={image.alt} priority /></div><div><p className="eyebrow"><span /> Líneas relevadas</p><h2>Una selección para estética vehicular.</h2><p className="catalog-copy">Las líneas disponibles se presentan según las fuentes públicas actuales. Consultá por disponibilidad comercial.</p><ul>{brand.lines.map((line) => <li key={line}>{line}</li>)}</ul><Link className="button" href="/contacto">Consultar esta marca ↗</Link><Link className="catalog-back" href="/productos/estetica-vehicular">Volver a Estética vehicular</Link></div></section></PageShell>;
}
