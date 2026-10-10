import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brandsForFamily, getFamily, productFamilies } from "@/data/catalog";
import { familyAssets } from "@/data/assets";
import { PageShell } from "@/components/catalog/page-shell";

export function generateStaticParams() { return productFamilies.map((family) => ({ slug: family.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const family = getFamily((await params).slug); return { title: family ? `${family.name} | Productos` : "Productos", description: family?.description }; }
export default async function FamilyPage({ params }: { params: Promise<{ slug: string }> }) { const family = getFamily((await params).slug); if (!family) notFound(); const familyBrands = brandsForFamily(family.slug); const visual = familyAssets[family.slug]; return <PageShell><section className="catalog-hero"><p>Productos / {family.name}</p><h1>{family.name}</h1><span>{family.description}</span></section><section className="catalog-grid"><div className="family-editorial-visual"><Image src={visual.src} width={visual.width} height={visual.height} sizes="(max-width: 800px) 100vw, 44vw" alt={visual.alt} priority /></div><div><p className="eyebrow"><span /> {familyBrands.length ? "Marcas y líneas confirmadas" : "Consulta comercial"}</p><h2>{familyBrands.length ? "Una familia, distintas especialidades." : "Encontrá la línea adecuada para tu operación."}</h2>{familyBrands.length ? familyBrands.map((brand) => <article key={brand.slug}><Link href={`/marcas/${brand.slug}`}><b>{brand.name}</b><span>Ver marca ↗</span></Link><p>{brand.lines.join(" · ")}</p></article>) : <p className="catalog-copy">Esta familia forma parte del catálogo público de Districe. Para conocer las líneas disponibles, contactá al equipo comercial.</p>}<Link className="button" href="/contacto">Solicitar cotización ↗</Link><Link className="catalog-back" href="/productos">Ver todas las familias</Link></div></section></PageShell>; }
