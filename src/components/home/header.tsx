"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { searchEntries, type SearchEntry } from "@/data/catalog";
import { company } from "@/data/company";

const navigation = [{ label: "Productos", href: "#familias" }, { label: "Marcas", href: "#marcas" }, { label: "Empresa", href: "#empresa" }, { label: "Contacto", href: "#contacto" }];

function SearchPanel({ onNavigate }: { onNavigate?: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = query.trim().length === 0 ? [] : searchEntries.filter((entry) => `${entry.label} ${entry.type} ${entry.detail}`.toLocaleLowerCase("es").includes(query.toLocaleLowerCase("es"))).slice(0, 6);
  const goTo = (entry: SearchEntry) => { window.location.hash = entry.target; setQuery(""); onNavigate?.(); inputRef.current?.blur(); };
  return <div className="search-panel"><label className="sr-only" htmlFor="site-search">Buscar familia, marca o línea</label><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.2" /><path d="m16 16 4.2 4.2" /></svg><input ref={inputRef} id="site-search" role="combobox" aria-expanded={results.length > 0} aria-controls="search-results" aria-activedescendant={results[activeIndex]?.id} autoComplete="off" value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} onKeyDown={(event) => { if (event.key === "ArrowDown" && results.length) { event.preventDefault(); setActiveIndex((activeIndex + 1) % results.length); } if (event.key === "ArrowUp" && results.length) { event.preventDefault(); setActiveIndex((activeIndex - 1 + results.length) % results.length); } if (event.key === "Enter" && results[activeIndex]) { event.preventDefault(); goTo(results[activeIndex]); } if (event.key === "Escape") { setQuery(""); inputRef.current?.blur(); } }} placeholder="Buscar familia, marca o línea" />{query.trim().length > 0 && <div id="search-results" role="listbox" className="search-results">{results.length > 0 ? results.map((entry, index) => <button key={entry.id} id={entry.id} role="option" aria-selected={index === activeIndex} className={index === activeIndex ? "active" : ""} onMouseEnter={() => setActiveIndex(index)} onClick={() => goTo(entry)}><span><b>{entry.label}</b><small>{entry.detail}</small></span><em>{entry.type}</em></button>) : <p>Sin resultados. Probá con una familia o marca.</p>}</div>}</div>;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header"><div className="header-inner"><a href="#inicio" className="brand" aria-label="Districe, inicio"><Image src="/brand/districe-logo.jpg" width={2161} height={728} priority alt="Districe — Repuestos y Accesorios Automotor" /></a><nav className="desktop-nav" aria-label="Navegación principal">{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><div className="header-actions"><div className="desktop-search"><SearchPanel /></div><a className="quote-button desktop-quote" href="#contacto">Solicitar cotización <span>↗</span></a><button className="menu-button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button></div></div>{menuOpen && <div className="mobile-menu"><SearchPanel onNavigate={() => setMenuOpen(false)} /><nav aria-label="Navegación móvil">{navigation.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item.label}<b>↗</b></a>)}</nav><a className="quote-button" href={company.whatsappHref} target="_blank" rel="noreferrer">Consultar por WhatsApp <span>↗</span></a><p>{company.contactStatus}</p></div>}</header>;
}
