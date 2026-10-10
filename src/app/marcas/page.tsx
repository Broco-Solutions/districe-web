import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/catalog";
import { brandAssets } from "@/data/assets";
import { PageShell } from "@/components/catalog/page-shell";
export const metadata: Metadata = { title: "Marcas", description: "Marcas confirmadas en la oferta pública actual de Districe." };
export default function BrandsPage() { return <PageShell><section className="catalog-hero"><p>Distribuciones</p><h1>Marcas con líneas para el canal profesional.</h1><span>Mostramos únicamente marcas confirmadas en las fuentes públicas actuales.</span></section><section className="brand-hub">{brands.map((brand) => { const visual = brandAssets[brand.slug]; return <Link href={`/marcas/${brand.slug}`} className="brand-tile" key={brand.slug}><div className={`brand-tile-mark has-logo brand-surface-${brand.slug}`}><Image src={visual.src} width={visual.width} height={visual.height} alt={visual.alt} /></div><div><p>{brand.description}</p><h2>{brand.name}</h2><span>{brand.lines.slice(0, 3).join(" · ") || (brand.catalogItems ? "Difusores de auto" : "Aditivos")}</span></div><b className="brand-tile-arrow">↗</b></Link>; })}</section></PageShell>; }
