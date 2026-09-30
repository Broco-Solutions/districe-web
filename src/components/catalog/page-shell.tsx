import Link from "next/link";
import { company } from "@/data/company";

export function PageShell({ children }: { children: React.ReactNode }) {
  return <main className="catalog-page"><header className="catalog-header"><Link href="/">DISTRICE</Link><nav aria-label="Navegación"><Link href="/productos">Productos</Link><Link href="/marcas">Marcas</Link><Link href="/empresa">Empresa</Link><Link href="/contacto">Contacto</Link></nav></header>{children}<footer className="catalog-footer"><span>Desde 1987 · Districe</span><Link href="/contacto">Solicitar cotización</Link><a href={`mailto:${company.email}`}>{company.email}</a></footer></main>;
}
