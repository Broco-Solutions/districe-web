import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/catalog";
import { company } from "@/data/company";

export default function EsteticaVehicularPage() {
  return <main className="catalog-page"><header className="catalog-header"><Link href="/">DISTRICE</Link><Link href="/">← Inicio</Link></header><section className="catalog-hero"><p>Productos / Estética vehicular</p><h1>Estética vehicular</h1><span>Familia confirmada en la taxonomía pública actual de Districe.</span></section><section className="catalog-grid"><div><Image src="/images/products/jarama-lava-coches.webp" width={480} height={720} alt="Producto Jarama Lava Coches" priority /></div><div><p className="eyebrow"><span /> Marcas y líneas</p><h2>Una familia, distintas especialidades.</h2>{brands.map((brand) => <article key={brand.slug}><Link href={`/marcas/${brand.slug}`}><b>{brand.name}</b><span>Ver marca ↗</span></Link><p>{brand.lines.join(" · ")}</p></article>)}<a className="button" href={company.whatsappHref}>Solicitar cotización ↗</a></div></section></main>;
}
