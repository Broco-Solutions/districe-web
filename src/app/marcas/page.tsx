import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/catalog";
import { PageShell } from "@/components/catalog/page-shell";
export const metadata: Metadata = { title: "Marcas", description: "Marcas confirmadas en la oferta pública actual de Districe." };
const visuals: Record<string, { src: string; width: number; height: number }> = {
  k78: { src: "/logos/brands/k78-transparent.png", width: 299, height: 124 },
  jarama: { src: "/logos/brands/jarama.png", width: 1307, height: 220 },
  revigal: { src: "/logos/brands/revigal.png", width: 500, height: 123 },
  veslee: { src: "/logos/brands/veslee.webp", width: 545, height: 344 },
};
export default function BrandsPage() { return <PageShell><section className="catalog-hero"><p>Distribuciones</p><h1>Marcas con líneas para el canal profesional.</h1><span>Mostramos únicamente marcas confirmadas en las fuentes públicas actuales.</span></section><section className="brand-hub">{brands.map((brand) => <Link href={`/marcas/${brand.slug}`} className="brand-tile" key={brand.slug}><div className={`brand-tile-mark ${visuals[brand.slug] ? "has-logo" : "wordmark"}`}>{visuals[brand.slug] ? <Image src={visuals[brand.slug].src} width={visuals[brand.slug].width} height={visuals[brand.slug].height} alt={`Logo ${brand.name}`} /> : <><span>Familia</span><b>{brand.description}</b></>}</div><div><p>{brand.description}</p><h2>{brand.name}</h2><span>{brand.lines.slice(0, 3).join(" · ") || (brand.catalogItems ? "Difusores de auto" : "Aditivos")}</span></div><b className="brand-tile-arrow">↗</b></Link>)}</section></PageShell>; }
