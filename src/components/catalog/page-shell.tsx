import Link from "next/link";
import { company } from "@/data/company";

export function PageShell({ children }: { children: React.ReactNode }) {
  return <><a className="skip-link" href="#main-content">Saltar al contenido</a><header className="catalog-header"><Link href="/">DISTRICE</Link><nav aria-label="Navegación"><Link href="/productos">Productos</Link><Link href="/marcas">Marcas</Link><Link href="/empresa">Empresa</Link><Link href="/contacto">Contacto</Link></nav></header><main id="main-content" className="catalog-page">{children}</main><footer className="catalog-footer"><span>Desde 1987 · Districe</span><Link href="/contacto">Solicitar cotización</Link><a href={`mailto:${company.email}`}>{company.email}</a><a href={company.instagram} target="_blank" rel="noreferrer">Instagram</a></footer></>;
}
