import type { Metadata } from "next";
import { BrandCards } from "@/components/brand-cards";
import { PageShell } from "@/components/catalog/page-shell";

export const metadata: Metadata = { title: "Marcas", description: "Conocé las marcas y líneas de estética vehicular y aditivos que distribuimos en Districe." };
export default function BrandsPage() {
  return <PageShell><section className="editorial-intro brands-intro section-shell"><p className="eyebrow">Marcas / Distribuciones</p><div><h1>Especialidades distintas.<br /><i>Un mismo lugar.</i></h1><p>Encontrá las líneas de cuidado y mantenimiento automotor que buscás para tu negocio.</p></div></section><section className="brand-directory section-shell" aria-label="Marcas que distribuimos"><BrandCards /></section></PageShell>;
}
