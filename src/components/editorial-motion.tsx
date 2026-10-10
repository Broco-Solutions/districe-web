"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function formatCount(value: number, minimumDigits: number) {
  return String(value).padStart(minimumDigits, "0");
}

/** Keeps every new section predictable: route changes begin at the page top. */
export function RouteScrollReset() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    // A hash is an intentional in-page destination, so it must keep its target.
    if (window.location.hash) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    const release = window.requestAnimationFrame(() => { root.style.scrollBehavior = previousScrollBehavior; });

    return () => {
      window.cancelAnimationFrame(release);
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [pathname]);

  return null;
}

/** A short, viewport-triggered number reveal. The accessible value is never animated. */
export function CountUp({ value, minimumDigits = 0, duration = 720 }: { value: number; minimumDigits?: number; duration?: number }) {
  const output = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = output.current;
    if (!element) return;
    let frame = 0;
    let started = false;

    const finish = () => { element.textContent = formatCount(value, minimumDigits); };
    const run = () => {
      if (started) return;
      started = true;
      if (reduced) { finish(); return; }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = formatCount(Math.round(value * eased), minimumDigits);
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    };

    if (reduced) { finish(); return; }
    // The server sends the final value for no-JavaScript resilience. Reset only
    // after hydration, while the element is normally still outside the viewport.
    element.textContent = formatCount(0, minimumDigits);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        run();
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(element);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [duration, minimumDigits, reduced, value]);

  return <><span ref={output} aria-hidden="true">{formatCount(value, minimumDigits)}</span><span className="sr-only">{formatCount(value, minimumDigits)}</span></>;
}

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
    <aside className="journey-index"><p className="eyebrow">Una trayectoria en movimiento</p><strong>Desde<br /><span><CountUp value={1987} duration={800} />.</span></strong><nav aria-label="Recorrido de Districe">{["El origen", "La evolución", "El alcance"].map((label, index) => <a key={label} href={`#capitulo-${index}`} aria-current={active === index ? "step" : undefined}><span>0{index + 1}</span>{label}<i aria-hidden="true" /></a>)}</nav></aside>
    <div className="journey-chapters">{children}</div>
  </div>;
}
