"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { brands, brandUrl, familyUrl, productFamilies } from "@/data/catalog";
import { company } from "@/data/company";
import { Header } from "./header";

const brandAssets: Record<string, string> = {
  k78: "/images/brands/k78-source.png",
  jarama: "/images/brands/jarama-source.jpg",
  revigal: "/images/brands/revigal-source.png",
};

function Arrow() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg>; }

export function Home() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const scrollFamilies = (direction: number) => trackRef.current?.scrollBy({ left: direction * 380, behavior: reduced ? "auto" : "smooth" });

  return <><Header /><main id="main-content">
    <section className="hero-v3" aria-labelledby="hero-title">
      <div className="hero-v3-grid" aria-hidden="true" />
      <div className="section-shell hero-v3-inner">
        <motion.div className="hero-v3-copy" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.56 }}>
          <p className="eyebrow"><span /> Distribución mayorista automotor</p>
          <h1 id="hero-title">Producto, marcas y respuesta para el <i>canal profesional.</i></h1>
          <p>Desde {company.founded}, Districe acompaña al mercado automotor con una propuesta especializada de repuestos, accesorios y líneas de consumo.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/productos">Explorar productos <Arrow /></Link><Link className="text-link" href="/contacto">Hacer una consulta <Arrow /></Link></div>
          <Link className="hero-search-link" href="/productos"><span>⌕</span> Buscá una familia, marca o línea <b>/</b></Link>
        </motion.div>
        <motion.div className="hero-v3-product" initial={reduced ? false : { opacity: 0, scale: 0.96, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.7, delay: 0.12 }}>
          <span className="hero-v3-tag">DISTRICE / DESDE {company.founded}</span>
          <div className="hero-v3-orbit orbit-one" /><div className="hero-v3-orbit orbit-two" />
          <Image src="/images/products/jarama-lava-coches.webp" width={480} height={720} priority sizes="(max-width: 700px) 54vw, 420px" alt="Producto Jarama para lavado vehicular" />
          <div className="hero-v3-caption"><b>Productos para el canal profesional</b><span>Imagen real de línea disponible</span></div>
        </motion.div>
      </div>
    </section>

    <section className="families-v3" aria-labelledby="familias-title">
      <div className="section-shell"><div className="section-heading"><div><p className="eyebrow"><span /> Catálogo por necesidad</p><h2 id="familias-title">Seis familias. Una forma más directa de <i>encontrar.</i></h2></div><div className="track-controls"><p>Arrastrá o deslizá para recorrer</p><button onClick={() => scrollFamilies(-1)} aria-label="Ver familias anteriores">←</button><button onClick={() => scrollFamilies(1)} aria-label="Ver familias siguientes">→</button></div></div></div>
      <div className="families-v3-track" ref={trackRef} role="region" aria-labelledby="familias-title" tabIndex={0}>{productFamilies.map((family) => <Link className={`family-v3-card tone-${family.tone}`} href={familyUrl(family.slug)} key={family.slug}><div className="family-v3-top"><span>{family.index}</span><Arrow /></div>{family.slug === "estetica-vehicular" ? <Image src="/images/products/jarama-espuma-activa.webp" width={437} height={800} alt="Producto Jarama para estética vehicular" sizes="(max-width: 700px) 58vw, 330px" /> : <div className="family-v3-graphic" aria-hidden="true"><i /><i /><i /></div>}<div className="family-v3-content"><h3>{family.name}</h3><p>{family.description}</p>{family.lines.length > 0 && <small>{family.lines.slice(0, 3).join(" · ")}</small>}</div></Link>)}</div>
      <div className="section-shell families-v3-foot"><p>Las familias responden a la taxonomía pública actual de Districe.</p><Link className="text-link" href="/productos">Ver todo el catálogo <Arrow /></Link></div>
    </section>

    <section className="brands-v3 section-shell" aria-labelledby="marcas-title"><div className="brands-v3-intro"><p className="eyebrow"><span /> Marcas confirmadas</p><h2 id="marcas-title">Líneas que suman valor a <i>tu operación.</i></h2><p>Presentamos las marcas verificadas en las fuentes públicas actuales. El catálogo está preparado para crecer con validación comercial.</p><Link className="text-link" href="/marcas">Explorar marcas <Arrow /></Link></div><div className="brands-v3-list">{brands.map((brand, index) => <Link className="brand-v3-row" href={brandUrl(brand.slug)} key={brand.slug}><span>0{index + 1}</span><div className="brand-v3-logo"><Image src={brandAssets[brand.slug]} width={brand.slug === "jarama" ? 1285 : 360} height={brand.slug === "jarama" ? 256 : 280} alt={`Logo ${brand.name}`} /></div><div><h3>{brand.name}</h3><p>{brand.lines.slice(0, 3).join(" · ")}</p></div><Arrow /></Link>)}</div></section>

    <section className="story-v3"><div className="section-shell story-v3-grid"><div><p className="eyebrow"><span /> Una empresa en movimiento</p><h2>La experiencia empieza antes de que el producto llegue a destino.</h2></div><div><p>Districe inició su actividad en 1987 con distribución mayorista de filtros para línea liviana y pesada. Su propuesta fue ampliándose para acompañar los cambios del mercado automotor.</p><ul>{company.differentiators.map((item) => <li key={item}>{item}</li>)}</ul><Link className="text-link" href="/empresa">Conocé Districe <Arrow /></Link></div></div></section>

    <section className="contact-v3" id="contacto"><div className="section-shell contact-v3-inner"><div><p className="eyebrow"><span /> Contacto comercial</p><h2>¿Buscás una línea para tu negocio?</h2></div><div><p>Contanos qué necesitás. Podemos orientarte hacia la familia, marca o línea adecuada.</p><Link className="button button-light" href="/contacto">Contactar a Districe <Arrow /></Link><a className="contact-email" href={`mailto:${company.email}`}>{company.email} <Arrow /></a></div></div></section>
  </main><footer className="site-footer"><div className="section-shell footer-top"><Link href="/" className="footer-brand">DISTRICE<span>Repuestos y Accesorios Automotor</span></Link><nav className="footer-links" aria-label="Navegación de pie"><Link href="/productos">Productos</Link><Link href="/marcas">Marcas</Link><Link href="/empresa">Empresa</Link><Link href="/contacto">Contacto</Link></nav><div className="footer-contact"><a href={`mailto:${company.email}`}>{company.email}</a><a href="tel:+543514895039">{company.phone}</a></div></div><div className="section-shell footer-bottom"><span>© {new Date().getFullYear()} Districe</span><span>{company.contactStatus}</span><span>Desarrollo por Broco Solutions</span></div></footer></>;
}
