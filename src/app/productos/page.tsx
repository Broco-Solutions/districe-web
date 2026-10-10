import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { brands, productFamilies } from "@/data/catalog";
import { familyAssets } from "@/data/assets";
import { PageShell } from "@/components/catalog/page-shell";
export const metadata: Metadata = { title: "Productos", description: "Familias de productos para el canal profesional automotor." };
export default function ProductsPage() { return <PageShell><section className="catalog-hero"><p>Catálogo Districe</p><h1>Productos para encontrar, consultar y avanzar.</h1><span>Explorá por familia o marca. La selección comercial se confirma con el equipo Districe.</span></section><section className="hub-grid">{productFamilies.map((family) => { const visual = familyAssets[family.slug]; return <Link className={`hub-card tone-${family.tone}`} href={`/productos/${family.slug}`} key={family.slug}><Image src={visual.src} width={visual.width} height={visual.height} alt={visual.alt} sizes="(max-width: 720px) 100vw, 33vw" /><span>{family.index}</span><div><h2>{family.name}</h2><p>{family.description}</p><b>Explorar ↗</b></div></Link>; })}</section><section className="hub-brand-strip"><p>Marcas confirmadas</p>{brands.map((brand) => <Link href={`/marcas/${brand.slug}`} key={brand.slug}>{brand.name}</Link>)}<Link href="/contacto">Consultar catálogo ↗</Link></section></PageShell>; }
