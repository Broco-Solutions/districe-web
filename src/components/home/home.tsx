"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { brands, brandUrl, familyUrl, productFamilies } from "@/data/catalog";
import { company } from "@/data/company";
import { Header } from "./header";
import { BrocoCredit, InstagramIcon } from "../brand-icons";

const brandAssets: Record<string, { src: string; width: number; height: number }> = {
  k78: { src: "/logos/brands/k78-transparent.png", width: 299, height: 124 },
  jarama: { src: "/logos/brands/jarama.png", width: 1307, height: 220 },
  revigal: { src: "/logos/brands/revigal.png", width: 500, height: 123 },
  veslee: { src: "/logos/brands/veslee.webp", width: 545, height: 344 },
  bioepecuen: { src: "/logos/brands/bioepecuen.png", width: 512, height: 484 },
};

const heroStories = [
  { image: "/images/hero/jarama-lava-coches-cutout.webp", width: 480, height: 720, alt: "Jarama Lava Coches", brand: "Jarama", product: "Lava Coches", family: "Estética vehicular", detail: "Cuidado y presentación para el vehículo.", accent: "01" },
  { image: "/images/products/jarama-espuma-activa.webp", width: 437, height: 800, alt: "Jarama Espuma Activa", brand: "Jarama", product: "Espuma Activa", family: "Estética vehicular", detail: "Líneas que acompañan cada etapa del cuidado.", accent: "02" },
  { image: "/images/products/jarama-brillo.webp", width: 480, height: 535, alt: "Jarama Brillo", brand: "Jarama", product: "Brillo", family: "Estética vehicular", detail: "Terminación y presencia para el canal profesional.", accent: "03" },
] as const;

function Arrow() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg>; }

export function Home() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [heroIndex, setHeroIndex] = useState(0);
  const [trackPaused, setTrackPaused] = useState(false);
  const story = heroStories[heroIndex];
  const scrollFamilies = (direction: number) => trackRef.current?.scrollBy({ left: direction * 380, behavior: reduced ? "auto" : "smooth" });

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setHeroIndex((index) => (index + 1) % heroStories.length), 5600);
    return () => window.clearInterval(timer);
  }, [reduced]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced || trackPaused) return;
    const timer = window.setInterval(() => {
      const next = track.scrollLeft + Math.min(track.clientWidth * 0.68, 380);
      track.scrollTo({ left: next >= track.scrollWidth - track.clientWidth - 8 ? 0 : next, behavior: "smooth" });
    }, 6400);
    return () => window.clearInterval(timer);
  }, [reduced, trackPaused]);

  return <><Header /><main id="main-content">
    <section className="hero-v3" aria-labelledby="hero-title">
      <div className="hero-v3-grid" aria-hidden="true" />
      <div className="section-shell hero-v3-inner">
        <motion.div className="hero-v3-copy" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.56 }}>
          <p className="eyebrow"><span /> Distribución mayorista automotor</p>
          <h1 id="hero-title">La respuesta precisa para <i>cada parte de tu operación.</i></h1>
          <p>Desde {company.founded}, Districe reúne producto, marcas y criterio comercial para el mercado automotor profesional.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/productos">Explorar productos <Arrow /></Link><Link className="text-link" href="/contacto">Hacer una consulta <Arrow /></Link></div>
          <Link className="hero-search-link" href="/productos"><span>⌕</span> Buscá una familia, marca o línea <b>/</b></Link>
        </motion.div>
        <motion.div className="hero-v3-product" initial={reduced ? false : { opacity: 0, scale: 0.96, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.7, delay: 0.12 }}>
          <span className="hero-v3-tag">SELECCIÓN EN MOVIMIENTO / {story.accent}—0{heroStories.length}</span>
          <div className="hero-v3-orbit orbit-one" /><div className="hero-v3-orbit orbit-two" /><div className="hero-v3-orbit orbit-three" />
          <div className="hero-v3-secondary" aria-hidden="true"><Image src="/images/products/jarama-espuma-activa.webp" width={437} height={800} alt="" sizes="160px" /></div>
          <AnimatePresence mode="wait">
            <motion.div className="hero-v3-primary" key={story.product} initial={reduced ? false : { opacity: 0, y: 16, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={reduced ? undefined : { opacity: 0, y: -10, rotate: 3 }} transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}>
              <Image src={story.image} width={story.width} height={story.height} priority={heroIndex === 0} sizes="(max-width: 700px) 48vw, 410px" alt={story.alt} />
            </motion.div>
          </AnimatePresence>
          <div className="hero-v3-caption"><b>{story.brand} · {story.product}</b><span>{story.detail}</span></div>
          <div className="hero-v3-progress" aria-label={`Producto destacado ${heroIndex + 1} de ${heroStories.length}`}>{heroStories.map((item, index) => <button key={item.product} onClick={() => setHeroIndex(index)} className={index === heroIndex ? "is-active" : ""} aria-label={`Ver ${item.product}`} aria-current={index === heroIndex ? "true" : undefined}><i /></button>)}</div>
          <div className="hero-v3-family"><span>Familia activa</span><b>{story.family}</b></div>
        </motion.div>
      </div>
    </section>

    <section className="families-v3" aria-labelledby="familias-title">
      <div className="section-shell"><div className="section-heading"><div><p className="eyebrow"><span /> Catálogo por necesidad</p><h2 id="familias-title">Seis familias. Una forma más directa de <i>encontrar.</i></h2></div><div className="track-controls"><p>Arrastrá o deslizá para recorrer</p><button onClick={() => scrollFamilies(-1)} aria-label="Ver familias anteriores">←</button><button onClick={() => scrollFamilies(1)} aria-label="Ver familias siguientes">→</button></div></div></div>
      <div className="families-v3-track" ref={trackRef} role="region" aria-labelledby="familias-title" tabIndex={0} onMouseEnter={() => setTrackPaused(true)} onMouseLeave={() => setTrackPaused(false)} onTouchStart={() => setTrackPaused(true)} onTouchEnd={() => setTrackPaused(false)}>{productFamilies.map((family) => <Link className={`family-v3-card tone-${family.tone}`} href={familyUrl(family.slug)} key={family.slug}><div className="family-v3-top"><span>{family.index}</span><Arrow /></div>{family.slug === "estetica-vehicular" ? <Image src="/images/families/jarama-espuma-activa-cutout.webp" width={437} height={800} alt="Producto Jarama para estética vehicular" sizes="(max-width: 700px) 58vw, 330px" /> : <div className="family-v3-graphic" aria-hidden="true"><span>{family.index}</span></div>}<div className="family-v3-content"><h3>{family.name}</h3><p>{family.description}</p>{family.lines.length > 0 && <small>{family.lines.slice(0, 3).join(" · ")}</small>}</div></Link>)}</div>
      <div className="section-shell families-v3-foot"><p>Las familias responden a la taxonomía pública actual de Districe.</p><Link className="text-link" href="/productos">Ver todo el catálogo <Arrow /></Link></div>
    </section>

    <section className="brands-v3 section-shell" aria-labelledby="marcas-title"><div className="brands-v3-intro"><p className="eyebrow"><span /> Marcas confirmadas</p><h2 id="marcas-title">Líneas que suman valor a <i>tu operación.</i></h2><p>Presentamos las marcas verificadas en las fuentes públicas actuales. El catálogo está preparado para crecer con validación comercial.</p><Link className="text-link" href="/marcas">Explorar marcas <Arrow /></Link></div><div className="brands-v3-list">{brands.map((brand, index) => <Link className="brand-v3-row" href={brandUrl(brand.slug)} key={brand.slug}><span>0{index + 1}</span><div className="brand-v3-logo">{brandAssets[brand.slug] ? <Image src={brandAssets[brand.slug].src} width={brandAssets[brand.slug].width} height={brandAssets[brand.slug].height} alt={`Logo ${brand.name}`} /> : <span className="brand-v3-placeholder"><small>Marca confirmada</small><b>{brand.name}</b></span>}</div><div><h3>{brand.name}</h3><p>{brand.lines.slice(0, 3).join(" · ")}</p></div><Arrow /></Link>)}</div></section>

    <section className="story-v3"><div className="section-shell story-v3-grid"><div><p className="eyebrow"><span /> Una empresa en movimiento</p><h2>La experiencia empieza antes de que el producto llegue a destino.</h2></div><div><p>Districe inició su actividad en 1987 con distribución mayorista de filtros para línea liviana y pesada. Su propuesta fue ampliándose para acompañar los cambios del mercado automotor.</p><p className="logistics-note">{company.logistics}</p><ul>{company.differentiators.map((item) => <li key={item}>{item}</li>)}</ul><Link className="text-link" href="/empresa">Conocé Districe <Arrow /></Link></div></div></section>

    <section className="contact-v3" id="contacto"><div className="section-shell contact-v3-inner"><div><p className="eyebrow"><span /> Contacto comercial</p><h2>¿Buscás una línea para tu negocio?</h2></div><div><p>Contanos qué necesitás. Podemos orientarte hacia la familia, marca o línea adecuada.</p><Link className="button button-light" href="/contacto">Contactar a Districe <Arrow /></Link><a className="contact-email" href={`mailto:${company.email}`}>{company.email} <Arrow /></a></div></div></section>
  </main><footer className="site-footer"><div className="section-shell footer-top"><Link href="/" className="footer-brand" aria-label="Districe, inicio"><Image src="/logos/districe/reversed.png" width={2163} height={706} alt="Districe — Repuestos y Accesorios Automotor" /></Link><nav className="footer-links" aria-label="Navegación de pie"><Link href="/productos">Productos</Link><Link href="/marcas">Marcas</Link><Link href="/empresa">Empresa</Link><Link href="/contacto">Contacto</Link></nav><div className="footer-contact"><a href={`mailto:${company.email}`}>{company.email}</a><a href={`tel:${company.phone.replace(/[^\d+]/g, "")}`}>{company.phone}</a>{company.mobiles.map((phone) => <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>)}<a className="social-link" href={company.instagram} target="_blank" rel="noreferrer"><InstagramIcon /> <span>Instagram</span></a></div></div><div className="section-shell footer-bottom"><span>© {new Date().getFullYear()} Districe</span><span>{company.contactStatus}</span><BrocoCredit /></div></footer></>;
}
