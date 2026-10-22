import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brandsForFamily, getFamily, productFamilies, productsForFamily } from "@/data/catalog";
import { familyAssets } from "@/data/assets";
import { BrandLogo } from "@/components/brand-logo";
import { CatalogActions } from "@/components/catalog/catalog-actions";
import { PageShell } from "@/components/catalog/page-shell";

export function generateStaticParams() {
  return productFamilies.map((family) => ({ slug: family.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const family = getFamily((await params).slug);
  return { title: family ? `${family.name} | Productos` : "Productos", description: family?.description };
}

export default async function FamilyPage({ params }: { params: Promise<{ slug: string }> }) {
  const family = getFamily((await params).slug);
  if (!family) notFound();

  const familyBrands = brandsForFamily(family.slug);
  const familyProducts = productsForFamily(family.slug);
  const visual = familyAssets[family.slug];
  const catalog = family.catalog;

  return <PageShell>
    <section className={`family-opening ${familyBrands.length ? "family-opening-split" : "family-opening-wide"} family-opening-${family.slug}`}>
      <div className="family-opening-photo">
        <Image src={visual.src} fill sizes={familyBrands.length ? "(max-width: 800px) 100vw, 55vw" : "100vw"} alt={visual.alt} priority />
      </div>
      <div className="family-opening-copy">
        <Link className="eyebrow" href="/productos">Productos / Familia {family.index}</Link>
        <h1>{family.name}</h1>
        <p>{family.description}</p>
        <a className="text-link" href={familyProducts.length ? "#productos-destacados" : "#lineas"}>Explorar esta familia ↓</a>
      </div>
    </section>

    <section className="family-detail section-shell" id="lineas">
      <aside>
        <p className="eyebrow">Catálogo Districe / {family.index}</p>
        <p>{family.description}</p>
        <Link className="catalog-back" href="/productos">← Todas las familias</Link>
      </aside>
      <div>
        <p className="eyebrow"><span /> {catalog ? "Documentación comercial" : familyBrands.length ? "Marcas y líneas" : "Consulta comercial"}</p>
        <h2>{catalog?.heading ?? (familyBrands.length ? "Una familia, distintas especialidades." : "Encontrá la línea adecuada para tu operación.")}</h2>
        {catalog ? <section className="family-document" id="documentacion" aria-label={`Documentación comercial de ${family.name}`}>
          <div className="family-document-copy">
            <p className="catalog-copy">{catalog.summary}</p>
            {catalog.topics && <ul className="family-document-topics">{catalog.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>}
            <p className="family-document-source">Catálogo provisto por {catalog.source}. Consultá disponibilidad y alcance comercial con Districe.</p>
            <CatalogActions catalog={catalog} />
          </div>
          {catalog.image && <Image className="family-document-image" src={catalog.image.src} width={catalog.image.width} height={catalog.image.height} sizes="(max-width: 800px) calc(100vw - 3rem), 280px" alt={catalog.image.alt} />}
        </section> : familyBrands.length ? <div className="family-brand-list">{familyBrands.map((brand) => <article key={brand.slug}>
          <Link href={`/marcas/${brand.slug}`}>
            <span className={`family-brand-logo brand-surface-${brand.slug}`}><BrandLogo slug={brand.slug} decorative sizes="88px" /></span>
            <span className="family-brand-copy"><b className="sr-only">{brand.name}</b><small>{brand.lines.join(" · ") || "Difusores de auto · Ver catálogo"}</small></span>
            <span className="family-brand-arrow">↗</span>
          </Link>
        </article>)}</div> : <p className="catalog-copy">Contanos qué necesitás para tu trabajo. El equipo comercial te orienta sobre las líneas y la disponibilidad de esta familia.</p>}
        <Link className="button" href="/contacto">Solicitar cotización ↗</Link>
        <Link className="catalog-back" href="/productos">Ver todas las familias</Link>
      </div>
    </section>

    {familyProducts.length > 0 && <section className="family-products section-shell" id="productos-destacados" aria-labelledby="featured-products-title">
      <header className="family-products-heading">
        <div>
          <p className="eyebrow"><span /> Selección comercial</p>
          <h2 id="featured-products-title">Productos destacados<br /><i>para el cuidado vehicular.</i></h2>
          <p>Una selección puntual solicitada por Districe. Consultanos por disponibilidad y alcance comercial.</p>
        </div>
        <figure>
          <Image src="/images/products/ran/ran-logo.webp" width={480} height={238} alt="RAN" />
          <figcaption>Fabricante verificado de cinco productos de esta selección.</figcaption>
        </figure>
      </header>
      <div className="featured-product-grid">
        {familyProducts.map((product, index) => <article className="featured-product-card" id={product.id} key={product.id}>
          <div className={`featured-product-media${product.image ? "" : " featured-product-media-pending"}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {product.image ? <Image src={product.image.src} width={product.image.width} height={product.image.height} sizes="(max-width: 520px) 54vw, (max-width: 1000px) 26vw, 220px" alt={product.image.alt} /> : <div aria-label="Imagen del producto pendiente de verificación"><b>5<small>/1</small></b><span>Imagen en verificación</span></div>}
          </div>
          <div className="featured-product-copy">
            <p>{product.manufacturer ? `Fabricado por ${product.manufacturer}` : "Fabricante pendiente de confirmación"}</p>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            {product.technicalData && <ul>{product.technicalData.map((datum) => <li key={datum}>{datum}</li>)}</ul>}
            <Link className="featured-product-link" href="/contacto" aria-label={`Consultar disponibilidad de ${product.name}`}>Consultar disponibilidad <span aria-hidden="true">↗</span></Link>
          </div>
        </article>)}
      </div>
    </section>}
  </PageShell>;
}
