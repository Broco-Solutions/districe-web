import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands } from "@/data/catalog";
import { company } from "@/data/company";

export function generateStaticParams() { return brands.map((brand) => ({ slug: brand.slug })); }
export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const brand = brands.find((item) => item.slug === slug); if (!brand) notFound(); const image = slug === "jarama" ? "/images/products/jarama-espuma-activa.webp" : slug === "k78" ? "/images/brands/k78-source.png" : "/images/brands/revigal-source.png"; return <main className="catalog-page"><header className="catalog-header"><Link href="/">DISTRICE</Link><Link href="/productos/estetica-vehicular">← Estética vehicular</Link></header><section className="catalog-grid brand-page"><div className="brand-image"><Image src={image} width={480} height={720} alt={`Marca ${brand.name}`} priority /></div><div><p className="eyebrow"><span /> Marca confirmada</p><h1>{brand.name}</h1><p>{brand.description} · Estética vehicular</p><h2>Líneas relevadas</h2><ul>{brand.lines.map((line) => <li key={line}>{line}</li>)}</ul><a className="button" href={company.whatsappHref}>Consultar esta marca ↗</a></div></section></main>; }
