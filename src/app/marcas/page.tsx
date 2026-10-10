import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/data/catalog";
import { BrandLogo } from "@/components/brand-logo";
import { PageShell } from "@/components/catalog/page-shell";
export const metadata: Metadata = { title: "Marcas", description: "Marcas confirmadas en la oferta pública actual de Districe." };
export default function BrandsPage() { return <PageShell><section className="catalog-hero"><p>Distribuciones</p><h1>Marcas con líneas para el canal profesional.</h1><span>Mostramos únicamente marcas confirmadas en las fuentes públicas actuales.</span></section><section className="brand-hub">{brands.map((brand, index) => <Link href={`/marcas/${brand.slug}`} className={`brand-tile brand-tile-${brand.slug}`} key={brand.slug}><div className={`brand-tile-mark brand-surface-${brand.slug}`}><BrandLogo slug={brand.slug} decorative sizes="(max-width: 720px) 70vw, 260px" /></div><div className="brand-tile-copy"><p><span>0{index + 1}</span>{brand.description}</p><h2>{brand.name}</h2><small>{brand.lines.slice(0, 3).join(" · ") || (brand.catalogItems ? "Difusores de auto" : "Aditivos")}</small></div><b className="brand-tile-arrow" aria-hidden="true">↗</b></Link>)}</section></PageShell>; }
