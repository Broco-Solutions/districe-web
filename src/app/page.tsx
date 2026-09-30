import { productFamilies } from "@/data/catalog";

export default function Home() {
  return (
    <main>
      <header className="site-header"><span className="wordmark">DISTRICE</span><span className="status">Foundation · en definición</span></header>
      <section className="hero">
        <p className="eyebrow">Nueva presencia digital B2B</p>
        <h1>Distribución automotor, diseñada para encontrar más rápido.</h1>
        <p>La próxima experiencia Districe se encuentra en etapa de arquitectura, contenido y dirección UX.</p>
      </section>
      <section aria-labelledby="familias-title" className="families">
        <div><p className="eyebrow">Taxonomía inicial</p><h2 id="familias-title">Familias de producto</h2></div>
        <ul>{productFamilies.map((family) => <li key={family.slug}>{family.name}</li>)}</ul>
      </section>
    </main>
  );
}
