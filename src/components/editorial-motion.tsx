"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** The server-rendered content remains visible without JavaScript. */
export function EditorialMotion({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const reduced = useReducedMotion();
  return <motion.div key={path} initial={false} animate={{ y: reduced ? 0 : [8, 0] }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }} className="editorial-route">{children}</motion.div>;
}

export function CompanyJourney({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const sections = root.current?.querySelectorAll<HTMLElement>("[data-chapter]");
    if (!sections) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.chapter));
    }, { rootMargin: "-25% 0px -45% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <div className="company-journey section-shell" ref={root}>
    <aside className="journey-index"><p className="eyebrow">Una trayectoria en movimiento</p><strong>Desde<br /><span>1987.</span></strong><nav aria-label="Recorrido de Districe">{["El origen", "La evolución", "El alcance"].map((label, index) => <a key={label} href={`#capitulo-${index}`} aria-current={active === index ? "step" : undefined}><span>0{index + 1}</span>{label}<i aria-hidden="true" /></a>)}</nav></aside>
    <div className="journey-chapters">{children}</div>
  </div>;
}
