import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/catalog";
import { PageShell } from "@/components/catalog/page-shell";
export const metadata: Metadata = { title: "Marcas", description: "Marcas confirmadas en la oferta pública actual de Districe." };
const visuals: Record<string, string> = { k78: "/images/brands/k78-source.png", jarama: "/images/brands/jarama-source.jpg", revigal: "/images/brands/revigal-source.png" };
export default function BrandsPage() { return <PageShell><section className="catalog-hero"><p>Distribuciones</p><h1>Marcas con líneas para el canal profesional.</h1><span>Mostramos únicamente marcas confirmadas en las fuentes públicas actuales.</span></section><section className="brand-hub">{brands.map((brand) => <Link href={`/marcas/${brand.slug}`} className="brand-tile" key={brand.slug}><Image src={visuals[brand.slug]} width={480} height={300} alt={`Logo ${brand.name}`} /><div><p>{brand.description}</p><h2>{brand.name}</h2><span>{brand.lines.slice(0, 3).join(" · ")}</span></div><b>↗</b></Link>)}</section></PageShell>; }
