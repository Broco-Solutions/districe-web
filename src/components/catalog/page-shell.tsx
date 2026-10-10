import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { BrocoCredit, InstagramIcon } from "@/components/brand-icons";
import { Header } from "@/components/home/header";

export function PageShell({ children }: { children: React.ReactNode }) {
  return <><Header /><main id="main-content" className="catalog-page">{children}</main><footer className="catalog-footer"><Link className="catalog-footer-brand" href="/"><Image src="/logos/districe/reversed.png" width={2163} height={706} alt="Districe — Repuestos y Accesorios Automotor" /></Link><span>Desde 1987 · Repuestos y Accesorios Automotor</span><Link href="/contacto">Solicitar cotización</Link><a href={`mailto:${company.email}`}>{company.email}</a><a href={`tel:${company.phone.replace(/[^\d+]/g, "")}`}>{company.phone}</a>{company.mobiles.map((phone) => <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>)}<a className="social-link" href={company.instagram} target="_blank" rel="noreferrer"><InstagramIcon /> <span>Instagram</span></a><BrocoCredit /></footer></>;
}
