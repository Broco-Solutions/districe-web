import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/catalog/page-shell";
import { CompanyJourney } from "@/components/editorial-motion";
import { company } from "@/data/company";
import { productFamilies } from "@/data/catalog";

export const metadata: Metadata = { title: "Empresa", description: "Districe: distribución mayorista de repuestos y accesorios automotor desde 1987." };
export default function CompanyPage() {
  return <PageShell>
    <section className="company-opening section-shell"><div><p className="eyebrow">Districe / Desde {company.founded}</p><h1>El mercado cambia.<br /><i>Nosotros acompañamos.</i></h1><p>Una trayectoria en distribución mayorista, ligada a las necesidades del canal automotor.</p><a className="text-link" href="#capitulo-0">Conocé nuestra historia <span aria-hidden="true">↓</span></a></div><figure><Image src="/images/editorial/preparacion-pedidos-generated.webp" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 50vw" alt="Preparación y organización de productos automotores" priority /><figcaption>Producto. Criterio. Distribución.</figcaption></figure></section>
    <CompanyJourney>
      <section id="capitulo-0" data-chapter="0"><p className="eyebrow">01 / El origen</p><h2>Todo empezó<br />con filtros.</h2><p>Districe inició su actividad en 1987 con distribución mayorista de filtros para línea liviana y pesada. Ese fue el punto de partida de una propuesta dedicada al mercado automotor.</p></section>
      <section id="capitulo-1" data-chapter="1"><p className="eyebrow">02 / La evolución</p><h2>Más necesidades.<br />Más especialidades.</h2><p>Con el tiempo, la oferta se amplió hacia repuestos y accesorios automotor. Hoy, {productFamilies.length} familias organizan el catálogo para encontrar la línea adecuada a cada trabajo.</p><Link className="text-link" href="/productos">Recorrer las familias <span aria-hidden="true">↗</span></Link><div className="journey-photo"><Image src="/images/families/editorial/repuestos-accesorios.webp" width={1536} height={1024} sizes="(max-width: 800px) 90vw, 50vw" alt="Repuestos y accesorios sobre una mesa de trabajo" /></div></section>
      <section id="capitulo-2" data-chapter="2"><p className="eyebrow">03 / El alcance</p><h2>Desde Córdoba.<br />A todo el país.</h2><p>{company.logistics}</p><p>Atención personalizada para orientar cada consulta por familia, marca o línea.</p><Link className="button" href="/contacto">Hablemos de tu pedido ↗</Link></section>
    </CompanyJourney>
    <section className="company-principles"><div className="section-shell"><p className="eyebrow">Nuestra forma de trabajar</p><h2>El servicio también<br />es parte del producto.</h2><ul>{company.differentiators.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul></div></section>
  </PageShell>;
}
