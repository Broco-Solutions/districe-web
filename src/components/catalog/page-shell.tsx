import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";

export function PageShell({ children }: { children: React.ReactNode }) {
  return <><a className="skip-link" href="#main-content">Saltar al contenido</a><header className="catalog-header"><Link className="catalog-brand" href="/" aria-label="Districe, inicio"><Image src="/logos/districe/primary.png" width={2163} height={706} alt="Districe — Repuestos y Accesorios Automotor" /></Link><nav aria-label="Navegación"><Link href="/productos">Productos</Link><Link href="/marcas">Marcas</Link><Link href="/empresa">Empresa</Link><Link href="/contacto">Contacto</Link></nav></header><main id="main-content" className="catalog-page">{children}</main><footer className="catalog-footer"><Link className="catalog-footer-brand" href="/"><Image className="logo-on-dark" src="/logos/districe/primary.png" width={2163} height={706} alt="Districe — Repuestos y Accesorios Automotor" /></Link><span>Desde 1987 · Repuestos y Accesorios Automotor</span><Link href="/contacto">Solicitar cotización</Link><a href={`mailto:${company.email}`}>{company.email}</a><a href={company.instagram} target="_blank" rel="noreferrer">Instagram</a></footer></>;
}
