import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getFamily, productFamilies } from "@/data/catalog";
import { company } from "@/data/company";
import { PageShell } from "@/components/catalog/page-shell";

export function generateStaticParams() { return productFamilies.map((family) => ({ slug: family.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const family = getFamily((await params).slug); return { title: family ? `${family.name} | Productos` : "Productos", description: family?.description }; }
export default async function FamilyPage({ params }: { params: Promise<{ slug: string }> }) { const family = getFamily((await params).slug); if (!family) notFound(); const detailed = family.slug === "estetica-vehicular"; return <PageShell><section className="catalog-hero"><p>Productos / {family.name}</p><h1>{family.name}</h1><span>{family.description}</span></section><section className="catalog-grid">{detailed ? <div><Image src="/images/products/jarama-lava-coches.webp" width={480} height={720} alt="Producto Jarama Lava Coches" priority /></div> : <div className={`family-visual tone-${family.tone}`}><span>{family.index}</span><b>{family.name}</b></div>}<div><p className="eyebrow"><span /> {detailed ? "Marcas y líneas confirmadas" : "Consulta comercial"}</p><h2>{detailed ? "Una familia, distintas especialidades." : "Encontrá la línea adecuada para tu operación."}</h2>{detailed ? brands.map((brand) => <article key={brand.slug}><Link href={`/marcas/${brand.slug}`}><b>{brand.name}</b><span>Ver marca ↗</span></Link><p>{brand.lines.join(" · ")}</p></article>) : <p className="catalog-copy">Esta familia forma parte del catálogo público de Districe. Para conocer las líneas disponibles, contactá al equipo comercial.</p>}<a className="button" href={company.whatsappHref}>Solicitar cotización ↗</a><Link className="catalog-back" href="/productos">Ver todas las familias</Link></div></section></PageShell>; }
