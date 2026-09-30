import type { Metadata } from "next";
import { company } from "@/data/company";
import { PageShell } from "@/components/catalog/page-shell";

export const metadata: Metadata = { title: "Contacto", description: "Contactá a Districe para consultar repuestos, accesorios y líneas automotor." };

export default function ContactPage() { return <PageShell><section className="catalog-hero"><p>Contacto comercial</p><h1>Hablemos de lo que necesitás encontrar.</h1><span>Consultá por familias, marcas o líneas para tu operación.</span></section><section className="contact-page"><div><p className="eyebrow"><span /> Canales publicados</p><a href={`mailto:${company.email}`}>{company.email}</a><a href="tel:+543514895039">{company.phone}</a>{company.mobiles.map((phone) => <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>)}<small>{company.contactStatus}</small></div><div className="contact-form"><p className="eyebrow"><span /> Una consulta bien orientada</p><h2>Contanos qué familia, marca o línea estás buscando.</h2><p>Para asegurar que tu consulta llegue al canal correcto, escribinos por email o llamanos a los números publicados.</p><a className="button" href={`mailto:${company.email}?subject=Consulta%20comercial%20Districe`}>Escribir a Districe ↗</a></div></section></PageShell>; }
