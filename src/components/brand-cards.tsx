import Link from "next/link";
import { brands } from "@/data/catalog";
import { BrandLogo } from "@/components/brand-logo";

export function BrandCards({ compact = false }: { compact?: boolean }) {
  return <div className={`brand-collection${compact ? " brand-collection-compact" : ""}`}>
    {brands.map((brand, index) => <Link className="brand-card" href={`/marcas/${brand.slug}`} key={brand.slug} aria-labelledby={`brand-${compact ? "home" : "hub"}-${brand.slug}`}>
      <div className="brand-card-meta"><span>0{index + 1}</span><span>{brand.description}</span></div>
      <div className="brand-card-logo"><BrandLogo slug={brand.slug} decorative sizes={compact ? "(max-width: 600px) 65vw, 200px" : "(max-width: 600px) 65vw, 240px"} /></div>
      <h2 className="sr-only" id={`brand-${compact ? "home" : "hub"}-${brand.slug}`}>{brand.name}</h2>
      <div className="brand-card-bottom"><p>{brand.lines.slice(0, 3).join(" · ") || "Difusores de auto"}</p><span className="brand-card-arrow" aria-hidden="true">↗</span></div>
    </Link>)}
  </div>;
}
