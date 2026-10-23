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
  const ranProducts = familyProducts.filter((product) => product.manufacturer === "RAN");
  const serviceProtectionProducts = familyProducts.filter((product) => product.id === "kit-proteccion-automotor-5-en-1");
  const vesleeProducts = familyProducts.filter((product) => product.manufacturer === "Veslee");
  const philipsProducts = familyProducts.filter((product) => product.manufacturer === "Philips");
  const hellaProducts = familyProducts.filter((product) => product.manufacturer === "HELLA");
  const vesleeGroups = ["Combustible e inyección", "Lubricación y protección", "Limpieza técnica", "Cuidado y visibilidad"] as const;
  const philipsHeadlightProducts = philipsProducts.filter((product) => product.displayGroup === "Faros delanteros");
  const philipsSignalProducts = philipsProducts.filter((product) => product.displayGroup === "Señalización e interior");
  const firstProductSection = ranProducts.length || serviceProtectionProducts.length ? "#productos-destacados" : vesleeProducts.length ? "#productos-veslee" : philipsProducts.length || hellaProducts.length ? "#productos-repuestos" : "#lineas";
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
        <a className="text-link" href={familyProducts.length ? firstProductSection : "#lineas"}>Explorar esta familia ↓</a>
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
        {catalog ? <section className={`family-document family-document-${family.slug}`} id="documentacion" aria-label={`Documentación comercial de ${family.name}`}>
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

    {(ranProducts.length > 0 || serviceProtectionProducts.length > 0) && <section className="family-products section-shell" id="productos-destacados" aria-labelledby="featured-products-title">
      <header className="family-products-heading">
        <div>
          <p className="eyebrow"><span /> Productos RAN</p>
          <h2 id="featured-products-title">Soluciones RAN<br /><i>para el cuidado vehicular.</i></h2>
          <p>Una selección de productos RAN para acompañar las tareas de cuidado y mantenimiento vehicular.</p>
        </div>
        <figure>
          <Image src="/images/products/ran/ran-logo.webp" width={480} height={238} alt="RAN" />
          <figcaption>Fabricante verificado de los cinco productos de esta selección.</figcaption>
        </figure>
      </header>
      <div className="featured-product-grid">
        {ranProducts.map((product, index) => <article className="featured-product-card" id={product.id} key={product.id}>
          <div className="featured-product-media">
            <span>{String(index + 1).padStart(2, "0")}</span>
            {product.image && <Image src={product.image.src} width={product.image.width} height={product.image.height} sizes="(max-width: 520px) 54vw, (max-width: 1000px) 26vw, 220px" alt={product.image.alt} />}
          </div>
          <div className="featured-product-copy">
            <p>Fabricado por {product.manufacturer}</p>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            {product.technicalData && <ul>{product.technicalData.map((datum) => <li key={datum}>{datum}</li>)}</ul>}
            <Link className="featured-product-link" href="/contacto" aria-label={`Consultar disponibilidad de ${product.name}`}>Consultar disponibilidad <span aria-hidden="true">↗</span></Link>
          </div>
        </article>)}
      </div>
      {serviceProtectionProducts.map((product) => <section className="service-protection" id={product.id} key={product.id} aria-labelledby={`${product.id}-title`}>
        <div className="service-protection-media">
          {product.image && <Image src={product.image.src} width={product.image.width} height={product.image.height} sizes="(max-width: 800px) calc(100vw - 3rem), 50vw" alt={product.image.alt} />}
        </div>
        <div className="service-protection-copy">
          <p className="eyebrow"><span /> Protección interior durante el servicio</p>
          <h3 id={`${product.id}-title`}>{product.name}</h3>
          <p>{product.description}</p>
          {product.protectedItems && <div className="service-protection-items" aria-label="Elementos protegidos">
            <strong>Protege:</strong>
            <ul>{product.protectedItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>}
          <Link className="button" href="/contacto" aria-label={`Consultar disponibilidad de ${product.name}`}>Consultar disponibilidad ↗</Link>
        </div>
      </section>)}
    </section>}

    {vesleeProducts.length > 0 && <section className="veslee-products section-shell" id="productos-veslee" aria-labelledby="veslee-products-title">
      <header className="veslee-products-heading">
        <div>
          <p className="eyebrow"><span /> Productos Veslee</p>
          <h2 id="veslee-products-title">Una selección para el<br /><i>mantenimiento preciso.</i></h2>
          <p>Nueve soluciones Veslee para consultas comerciales: combustible, lubricación, limpieza técnica y cuidado del vehículo.</p>
        </div>
        <figure>
          <BrandLogo slug="veslee" decorative sizes="(max-width: 700px) 180px, 240px" />
          <figcaption>Consultá disponibilidad y la referencia adecuada con Districe.</figcaption>
        </figure>
      </header>
      <div className="veslee-product-groups">
        {vesleeGroups.map((group) => {
          const products = vesleeProducts.filter((product) => product.displayGroup === group);
          return products.length > 0 && <section className="veslee-product-group" key={group} aria-labelledby={`veslee-${group.toLowerCase().replace(/[^a-záéíóúñ]+/g, "-")}`}>
            <h3 id={`veslee-${group.toLowerCase().replace(/[^a-záéíóúñ]+/g, "-")}`}>{group}</h3>
            <div className={`veslee-product-grid veslee-product-grid-${products.length}`}>
              {products.map((product) => <article className="veslee-product-card" id={product.id} key={product.id}>
                <div className="veslee-product-media">
                  {product.image && <Image src={product.image.src} width={product.image.width} height={product.image.height} sizes="(max-width: 680px) 86vw, (max-width: 1100px) 42vw, 27vw" alt={product.image.alt} />}
                </div>
                <div className="veslee-product-copy">
                  <p>Veslee</p>
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  {(product.code || product.presentation || product.technicalData) && <ul>
                    {product.code && <li>Código {product.code}</li>}
                    {product.presentation && <li>{product.presentation}</li>}
                    {product.technicalData?.map((datum) => <li key={datum}>{datum}</li>)}
                  </ul>}
                  <Link className="veslee-product-link" href="/contacto" aria-label={`Consultar disponibilidad de ${product.name}`}>Consultar disponibilidad <span aria-hidden="true">↗</span></Link>
                </div>
              </article>)}
            </div>
          </section>;
        })}
      </div>
    </section>}

    {(philipsProducts.length > 0 || hellaProducts.length > 0) && <section className="parts-products section-shell" id="productos-repuestos" aria-label="Selección de repuestos y accesorios">
      {philipsProducts.length > 0 && <section className="manufacturer-section manufacturer-section-philips" id="iluminacion-philips" aria-labelledby="philips-products-title">
        <header className="manufacturer-section-heading">
          <div>
            <p className="manufacturer-wordmark manufacturer-wordmark-philips">PHILIPS</p>
            <p className="eyebrow"><span /> Iluminación automotor</p>
            <h2 id="philips-products-title">Lámparas para<br /><i>cada señal.</i></h2>
            <p>Una selección de lámparas Philips para faros delanteros, señalización e iluminación interior.</p>
          </div>
          <p className="manufacturer-section-note">Las especificaciones corresponden a cada referencia; consultanos para confirmar la aplicación adecuada.</p>
        </header>
        <section className="philips-product-group" aria-labelledby="philips-headlights-title">
          <h3 id="philips-headlights-title">Faros delanteros</h3>
          <div className="philips-headlight-grid">
            {philipsHeadlightProducts.map((product) => <article className="philips-headlight-card" id={product.id} key={product.id}>
              <div>{product.image && <Image src={product.image.src} width={product.image.width} height={product.image.height} sizes="(max-width: 680px) 76vw, (max-width: 1100px) 40vw, 22vw" alt={product.image.alt} />}</div>
              <h4>{product.name}</h4>
              <ul>{product.technicalData?.map((datum) => <li key={datum}>{datum}</li>)}</ul>
            </article>)}
          </div>
        </section>
        <section className="philips-product-group" aria-labelledby="philips-signal-title">
          <h3 id="philips-signal-title">Señalización e interior</h3>
          <div className="philips-signal-grid">
            {philipsSignalProducts.map((product) => <article className="philips-signal-card" id={product.id} key={product.id}>
              {product.image && <Image src={product.image.src} width={product.image.width} height={product.image.height} sizes="(max-width: 680px) 34vw, (max-width: 1100px) 25vw, 15vw" alt={product.image.alt} />}
              <div><h4>{product.name}</h4><ul>{product.technicalData?.map((datum) => <li key={datum}>{datum}</li>)}</ul></div>
            </article>)}
          </div>
        </section>
        <Link className="button" href="/contacto">Consultar disponibilidad <span aria-hidden="true">↗</span></Link>
      </section>}

      {hellaProducts.length > 0 && <section className="manufacturer-section manufacturer-section-hella" id="escobillas-hella" aria-labelledby="hella-products-title">
        <header className="manufacturer-section-heading">
          <div>
            <p className="manufacturer-wordmark manufacturer-wordmark-hella">HELLA</p>
            <p className="eyebrow"><span /> Visibilidad y limpieza</p>
            <h2 id="hella-products-title">Escobillas para<br /><i>ver con claridad.</i></h2>
          </div>
          <p className="manufacturer-section-note">Dos líneas de escobillas HELLA para consultas comerciales según el sistema de montaje requerido.</p>
        </header>
        <div className="hella-product-list">
          {hellaProducts.map((product) => <article className="hella-product-card" id={product.id} key={product.id}>
            <div className="hella-product-media">{product.image && <Image src={product.image.src} width={product.image.width} height={product.image.height} sizes="(max-width: 800px) calc(100vw - 3rem), 44vw" alt={product.image.alt} />}</div>
            <div className="hella-product-copy"><p>HELLA · Escobillas limpiaparabrisas</p><h3>{product.name}</h3><p>{product.description}</p><ul>{product.technicalData?.map((datum) => <li key={datum}>{datum}</li>)}</ul><Link className="button" href="/contacto" aria-label={`Consultar disponibilidad de ${product.name}`}>Consultar disponibilidad <span aria-hidden="true">↗</span></Link></div>
          </article>)}
        </div>
      </section>}
    </section>}
  </PageShell>;
}
