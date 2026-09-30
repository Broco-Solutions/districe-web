import type { Metadata } from "next";
import Link from "next/link";
import { brands, productFamilies } from "@/data/catalog";
import { PageShell } from "@/components/catalog/page-shell";
export const metadata: Metadata = { title: "Productos", description: "Familias de productos para el canal profesional automotor." };
export default function ProductsPage() { return <PageShell><section className="catalog-hero"><p>Catálogo Districe</p><h1>Productos para encontrar, consultar y avanzar.</h1><span>Explorá por familia o marca. La selección comercial se confirma con el equipo Districe.</span></section><section className="hub-grid">{productFamilies.map((family) => <Link className={`hub-card tone-${family.tone}`} href={`/productos/${family.slug}`} key={family.slug}><span>{family.index}</span><h2>{family.name}</h2><p>{family.description}</p><b>Explorar ↗</b></Link>)}</section><section className="hub-brand-strip"><p>Marcas confirmadas</p>{brands.map((brand) => <Link href={`/marcas/${brand.slug}`} key={brand.slug}>{brand.name}</Link>)}<Link href="/contacto">Consultar catálogo ↗</Link></section></PageShell>; }
