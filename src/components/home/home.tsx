"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { brands, brandUrl, familyUrl, productFamilies } from "@/data/catalog";
import { brandAssets, familyAssets } from "@/data/assets";
import { company } from "@/data/company";
import { Header } from "./header";
import { BrocoCredit, InstagramIcon } from "../brand-icons";

const heroStories = [
  { image: "/images/families/editorial/estetica-vehicular.webp", alt: "Sector de cuidado y estética vehicular", title: "Cuidado que se ve.", family: "Estética vehicular", detail: "Soluciones para limpieza, terminación y presentación profesional.", context: "Jarama · K78 · Revigal · Bioepecuén", href: "/productos/estetica-vehicular", accent: "01", position: "center" },
  { image: "/images/families/editorial/aditivos-lubricantes-fluidos.webp", alt: "Productos para mantenimiento mecánico automotor", title: "Rendimiento que acompaña.", family: "Aditivos, lubricantes y fluidos", detail: "Líneas específicas para mantenimiento y operación del vehículo.", context: "Veslee · LOCX", href: "/productos/aditivos-lubricantes-fluidos", accent: "02", position: "center" },
  { image: "/images/editorial/distribucion-deposito-generated.webp", alt: "Operación de distribución de productos automotores", title: "Una selección que llega.", family: "Distribución mayorista", detail: "Producto, variedad y criterio comercial para el canal profesional.", context: "Desde 1987 · Córdoba", href: "/empresa", accent: "03", position: "center" },
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
        <motion.div className="hero-v3-showcase" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.12 }}>
          <div className="hero-v3-showcase-head"><span>CATÁLOGO EN MOVIMIENTO</span><b>{story.accent} / 0{heroStories.length}</b></div>
          <div className="hero-v3-media">
            {heroStories.map((item, index) => <motion.div className="hero-v3-frame" key={item.title} aria-hidden={index !== heroIndex} initial={false} animate={reduced ? { opacity: index === heroIndex ? 1 : 0 } : { opacity: index === heroIndex ? 1 : 0, scale: index === heroIndex ? 1 : 1.035, x: index === heroIndex ? 0 : 8 }} transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}><Image src={item.image} fill priority={index === 0} sizes="(max-width: 800px) calc(100vw - 2rem), 42vw" alt={index === heroIndex ? item.alt : ""} style={{ objectPosition: item.position }} /></motion.div>)}
            <div className="hero-v3-media-shade" />
            <AnimatePresence mode="wait">
              <motion.div className="hero-v3-story" key={story.title} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: .42 }}>
                <p>{story.family}</p><h2>{story.title}</h2><span>{story.detail}</span><small>{story.context}</small><Link href={story.href}>Explorar <Arrow /></Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hero-v3-progress" aria-label={`Historia destacada ${heroIndex + 1} de ${heroStories.length}`}>{heroStories.map((item, index) => <button key={item.title} onClick={() => setHeroIndex(index)} className={index === heroIndex ? "is-active" : ""} aria-label={`Ver ${item.family}`} aria-current={index === heroIndex ? "true" : undefined}><i /></button>)}</div>
        </motion.div>
      </div>
    </section>

    <section className="families-v3" aria-labelledby="familias-title">
      <div className="section-shell"><div className="section-heading"><div><p className="eyebrow"><span /> Catálogo por necesidad</p><h2 id="familias-title">Seis familias. Una forma más directa de <i>encontrar.</i></h2></div><div className="track-controls"><p>Arrastrá o deslizá para recorrer</p><button onClick={() => scrollFamilies(-1)} aria-label="Ver familias anteriores">←</button><button onClick={() => scrollFamilies(1)} aria-label="Ver familias siguientes">→</button></div></div></div>
      <div className="families-v3-track" ref={trackRef} role="region" aria-labelledby="familias-title" tabIndex={0} onMouseEnter={() => setTrackPaused(true)} onMouseLeave={() => setTrackPaused(false)} onTouchStart={() => setTrackPaused(true)} onTouchEnd={() => setTrackPaused(false)}>{productFamilies.map((family) => { const visual = familyAssets[family.slug]; return <Link className={`family-v3-card tone-${family.tone}`} href={familyUrl(family.slug)} key={family.slug}><div className="family-v3-top"><span>{family.index}</span><Arrow /></div><Image className="family-v3-image" src={visual.src} width={visual.width} height={visual.height} alt={visual.alt} sizes="(max-width: 700px) 84vw, 410px" /><div className="family-v3-content"><h3>{family.name}</h3><p>{family.description}</p>{family.lines.length > 0 && <small>{family.lines.slice(0, 3).join(" · ")}</small>}</div></Link>; })}</div>
      <div className="section-shell families-v3-foot"><p>Las familias responden a la taxonomía pública actual de Districe.</p><Link className="text-link" href="/productos">Ver todo el catálogo <Arrow /></Link></div>
    </section>

    <section className="brands-v3 section-shell" aria-labelledby="marcas-title"><div className="brands-v3-intro"><p className="eyebrow"><span /> Marcas confirmadas</p><h2 id="marcas-title">Líneas que suman valor a <i>tu operación.</i></h2><p>Presentamos las marcas verificadas en las fuentes públicas actuales. El catálogo está preparado para crecer con validación comercial.</p><Link className="text-link" href="/marcas">Explorar marcas <Arrow /></Link></div><div className="brands-v3-list">{brands.map((brand, index) => { const visual = brandAssets[brand.slug]; return <Link className="brand-v3-row" href={brandUrl(brand.slug)} key={brand.slug}><span>0{index + 1}</span><div className={`brand-v3-logo brand-surface-${brand.slug}`}><Image src={visual.src} width={visual.width} height={visual.height} alt={visual.alt} /></div><div><h3>{brand.name}</h3><p>{brand.lines.slice(0, 3).join(" · ")}</p></div><Arrow /></Link>; })}</div></section>

    <section className="story-v3"><div className="section-shell story-v3-grid"><div><p className="eyebrow"><span /> Una empresa en movimiento</p><h2>La experiencia empieza antes de que el producto llegue a destino.</h2></div><div><p>Districe inició su actividad en 1987 con distribución mayorista de filtros para línea liviana y pesada. Su propuesta fue ampliándose para acompañar los cambios del mercado automotor.</p><p className="logistics-note">{company.logistics}</p><ul>{company.differentiators.map((item) => <li key={item}>{item}</li>)}</ul><Link className="text-link" href="/empresa">Conocé Districe <Arrow /></Link></div><div className="story-v3-image"><Image src="/images/editorial/preparacion-pedidos-generated.webp" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 31vw" alt="Preparación de pedidos en una operación de distribución automotor" /></div></div></section>

    <section className="contact-v3" id="contacto"><div className="section-shell contact-v3-inner"><div><p className="eyebrow"><span /> Contacto comercial</p><h2>¿Buscás una línea para tu negocio?</h2></div><div><p>Contanos qué necesitás. Podemos orientarte hacia la familia, marca o línea adecuada.</p><Link className="button button-light" href="/contacto">Contactar a Districe <Arrow /></Link><a className="contact-email" href={`mailto:${company.email}`}>{company.email} <Arrow /></a></div></div></section>
  </main><footer className="site-footer"><div className="section-shell footer-top"><Link href="/" className="footer-brand" aria-label="Districe, inicio"><Image src="/logos/districe/reversed.png" width={2163} height={706} alt="Districe — Repuestos y Accesorios Automotor" /></Link><nav className="footer-links" aria-label="Navegación de pie"><Link href="/productos">Productos</Link><Link href="/marcas">Marcas</Link><Link href="/empresa">Empresa</Link><Link href="/contacto">Contacto</Link></nav><div className="footer-contact"><a href={`mailto:${company.email}`}>{company.email}</a><a href={`tel:${company.phone.replace(/[^\d+]/g, "")}`}>{company.phone}</a>{company.mobiles.map((phone) => <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>)}<a className="social-link" href={company.instagram} target="_blank" rel="noreferrer"><InstagramIcon /> <span>Instagram</span></a></div></div><div className="section-shell footer-bottom"><span>© {new Date().getFullYear()} Districe</span><span>{company.contactStatus}</span><BrocoCredit /></div></footer></>;
}
