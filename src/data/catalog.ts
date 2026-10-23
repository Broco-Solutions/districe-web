export type CatalogItem = { id: string; name: string; kind: "familia de producto" | "aroma" };
export type CatalogDocument = { url: string; title: string; heading: string; summary?: string; source?: string; topics?: string[]; searchTerms?: string[]; image?: { src: string; width: number; height: number; alt: string } };
export type ProductFamily = { slug: string; name: string; index: string; description: string; lines: string[]; tone: "blue" | "lime" | "orange" | "silver" | "red" | "ink"; catalog?: CatalogDocument };
export type Brand = { slug: string; name: string; description: string; familySlugs: string[]; lines: string[]; catalog?: CatalogDocument; catalogItems?: CatalogItem[] };
export type ProductSource = { label: string; urls?: string[] };
export type ProductDisplayGroup = "Combustible e inyección" | "Lubricación y protección" | "Limpieza técnica" | "Cuidado y visibilidad" | "Faros delanteros" | "Señalización e interior" | "Escobillas limpiaparabrisas";
export type FeaturedProduct = {
  id: string;
  name: string;
  familySlug: string;
  manufacturer?: string;
  displayGroup?: ProductDisplayGroup;
  description: string;
  image?: { src: string; width: number; height: number; alt: string };
  source: ProductSource;
  code?: string;
  presentation?: string;
  searchTerms?: string[];
  technicalData?: string[];
  protectedItems?: string[];
};
export type SearchEntry = { id: string; label: string; type: "Familia" | "Marca" | "Línea" | "Catálogo" | "Producto"; detail: string; target: string; searchTerms?: string[] };

const toSlug = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export type CatalogLine = { id: string; slug: string; name: string; familySlug: string; brandSlug: string };

export const productFamilies: ProductFamily[] = [
  { slug: "estetica-vehicular", name: "Estética vehicular", index: "01", description: "Cuidado, terminación y presentación del vehículo.", lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Accesorios para lavado", "Lubricantes", "Aromatizantes", "Renovadores", "Lustre y pulido"], tone: "blue" },
  { slug: "aditivos-lubricantes-fluidos", name: "Aditivos, lubricantes y fluidos", index: "02", description: "Una familia para acompañar el mantenimiento y la operación del vehículo.", lines: ["Aditivos"], tone: "lime" },
  { slug: "higiene-seguridad", name: "Higiene y seguridad", index: "03", description: "Soluciones para el cuidado del entorno de trabajo y la operación cotidiana.", lines: [], tone: "orange", catalog: { url: "/catalogos/catalogo-anken-higiene-seguridad.pdf", title: "catálogo de absorbentes industriales", heading: "Absorbentes industriales y control de derrames.", summary: "Soluciones para contener, absorber y limpiar derrames de aceites, combustibles, químicos e hidrocarburos en talleres, industrias y espacios de mantenimiento.", source: "Anken", topics: ["Absorbentes minerales", "Paños y almohadillas", "Barreras y contención", "Kits para derrames"], image: { src: "/images/catalogos/anken-control-derrames.webp", width: 1400, height: 1460, alt: "Kit Anken para control de derrames con absorbente mineral, barreras, paños y elementos de seguridad" } } },
  { slug: "repuestos-accesorios", name: "Repuestos y accesorios", index: "04", description: "Una selección para resolver necesidades del canal automotor profesional.", lines: [], tone: "silver" },
  { slug: "anaerobicos-automotor", name: "Anaeróbicos automotor", index: "05", description: "Soluciones para fijar, retener y sellar componentes en montaje y mantenimiento automotor.", lines: [], tone: "red", catalog: { url: "/catalogos/catalogo-loctite-anaerobicos.pdf", title: "catálogo de anaeróbicos", heading: "Soluciones anaeróbicas para aplicaciones automotrices.", summary: "El catálogo técnico de Loctite reúne soluciones para asegurar, retener y sellar componentes metálicos en tareas de montaje, mantenimiento y reparación.", source: "Loctite", topics: ["Fijación de roscas", "Fijación de piezas cilíndricas", "Sellado de roscas", "Formación de juntas mecanizadas"], searchTerms: ["Fijadores de roscas", "Selladores anaeróbicos"], image: { src: "/images/catalogos/loctite-catalogo-portada.webp", width: 1310, height: 1853, alt: "Portada del catálogo general Loctite con un profesional realizando tareas de mantenimiento" } } },
  { slug: "cintas-films", name: "Cintas y films", index: "06", description: "Alternativas para la preparación, protección y terminación de cada trabajo.", lines: [], tone: "ink" },
];

// Only brands confirmed in both current public sources are public in Home V1.
export const brands: Brand[] = [
  { slug: "k78", name: "K78", description: "Estética vehicular", familySlugs: ["estetica-vehicular"], lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Accesorios para lavado"], catalog: { url: "/catalogos/catalogo-k78-2026.pdf", title: "catálogo K78 2026", heading: "Cosmética automotor y detallado profesional.", summary: "El catálogo 2026 reúne perfumería, siliconas y revividores, limpieza, ceras y brillos, aerosoles especiales, accesorios, neumáticos y cristales, y línea profesional." } },
  { slug: "jarama", name: "Jarama", description: "Estética vehicular", familySlugs: ["estetica-vehicular"], lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Lubricantes"], catalog: { url: "/catalogos/catalogo-jarama.pdf", title: "catálogo Jarama", heading: "Cuidado automotor para cada terminación.", summary: "Líneas principales del catálogo: ceras, lavado, lubricantes, renovadores, limpieza y perfumes." } },
  { slug: "revigal", name: "Revigal", description: "Estética vehicular", familySlugs: ["estetica-vehicular"], lines: ["Productos para lavado", "Aromatizantes", "Renovadores", "Lustre y pulido"], catalog: { url: "/catalogos/catalogo-revigal.pdf", title: "catálogo Revigal", heading: "Cuidado automotor de principio a fin.", summary: "El catálogo reúne productos para lavado, renovadores, accesorios de limpieza, ceras y pulido, limpiadores específicos, aromatizantes, lubricantes y soluciones para emergencias. Incluye, entre otros, Lavacoche Siliconado, Cera Autobrillo y el difusor Revy Fresh." } },
  { slug: "veslee", name: "Veslee", description: "Aditivos", familySlugs: ["aditivos-lubricantes-fluidos"], lines: ["Aditivos"] },
  { slug: "locx", name: "LOCX", description: "Aditivos", familySlugs: ["aditivos-lubricantes-fluidos"], lines: ["Aditivos"], catalog: { url: "/catalogos/catalogo-locx.pdf", title: "catálogo LOCX", heading: "Tecnología química para automotores.", summary: "Incluye líneas de terminación, adhesivos y uso profesional, con soluciones para limpieza, lubricación, combustible y refrigeración." } },
  { slug: "bioepecuen", name: "Bioepecuén", description: "Estética vehicular", familySlugs: ["estetica-vehicular"], lines: [], catalog: { url: "/catalogos/bioepecuen-difusores-auto.pdf", title: "catálogo Bioepecuén", heading: "Difusores para el interior del auto." }, catalogItems: [
    { id: "bioepecuen-difusores-de-auto", name: "Difusores de auto", kind: "familia de producto" },
    { id: "bioepecuen-display-expositor-20-unidades", name: "Display expositor de 20 unidades", kind: "familia de producto" },
    ...["Citric Car", "Peras y Flores Blancas", "Vainilla y Azúcar", "Pasión Frutal", "Verbena", "Limón", "Uva y Frutos del Bosque"].map((name) => ({ id: `bioepecuen-${toSlug(name)}`, name, kind: "aroma" as const })),
  ] },
];

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "arranca-motores",
    name: "Arranca motores",
    familySlug: "estetica-vehicular",
    manufacturer: "RAN",
    description: "Facilita el arranque en frío de motores a combustión de 2 y 4 tiempos.",
    image: { src: "/images/products/ran/arranca-motores.webp", width: 230, height: 1000, alt: "Aerosol RAN Arranca Motores" },
    source: { label: "Productos RAN" },
    technicalData: ["Código AM-1", "Aerosol 440 cc"],
  },
  {
    id: "desengrasante-aerosol",
    name: "Desengrasante en aerosol",
    familySlug: "estetica-vehicular",
    manufacturer: "RAN",
    description: "Para remover grasas, aceites y alquitranes en motores y llantas; se enjuaga con agua.",
    image: { src: "/images/products/ran/desengrasante-aerosol.webp", width: 106, height: 460, alt: "Aerosol desengrasante RAN para motores y llantas" },
    source: { label: "Productos RAN" },
    technicalData: ["Código I-10", "Aerosol 440 cc"],
  },
  {
    id: "niebla-lubricante",
    name: "Niebla lubricante",
    familySlug: "estetica-vehicular",
    manufacturer: "RAN",
    description: "Aceite lubricante multiuso de gran penetración para mecanismos y zonas de difícil acceso.",
    image: { src: "/images/products/ran/niebla-lubricante.webp", width: 229, height: 1000, alt: "Aerosol RAN Niebla Lubricante multifunción" },
    source: { label: "Productos RAN" },
    technicalData: ["Código NL-2", "Aerosol 440 cc"],
  },
  {
    id: "grasa-litio-aerosol",
    name: "Grasa de litio en aerosol",
    familySlug: "estetica-vehicular",
    manufacturer: "RAN",
    description: "Lubricante penetrante para piezas móviles, resistente al agua, el calor y la humedad.",
    image: { src: "/images/products/ran/grasa-litio-aerosol.webp", width: 229, height: 1000, alt: "Aerosol RAN Grasa de Litio" },
    source: { label: "Productos RAN" },
    technicalData: ["Código GL-17", "Aerosol 440 cc"],
  },
  {
    id: "kit-proteccion-automotor-5-en-1",
    name: "Kit de protección automotor 5 en 1",
    familySlug: "estetica-vehicular",
    description: "Kit descartable para proteger el interior del vehículo durante tareas de mantenimiento y reparación. Ayuda a evitar que la suciedad y la grasa entren en contacto con las superficies interiores.",
    image: { src: "/images/products/proteccion/kit-proteccion-automotor-5-en-1.webp", width: 974, height: 730, alt: "Interior de vehículo protegido durante un servicio con funda de asiento, volante, palanca, freno de mano y alfombra descartables" },
    source: {
      label: "Fuentes documentales verificadas: Districe y Guvalormi",
      urls: ["https://www.districe.com.ar/guvalormi/", "https://guvalormi.com/kit-de-servicio-automotriz-5-en-1", "https://guvalormi.com/img/post/1bd_5_en_1.jpg"],
    },
    protectedItems: ["Asiento", "Volante", "Palanca de cambios", "Freno de mano", "Alfombra / piso"],
  },
  {
    id: "ya-tapo",
    name: "Ya Tapó! — sellador de grietas",
    familySlug: "estetica-vehicular",
    manufacturer: "RAN",
    description: "Sellador para grietas, goteras y fisuras del circuito de refrigeración, compatible con refrigerantes y anticongelantes.",
    image: { src: "/images/products/ran/ya-tapo.webp", width: 378, height: 1000, alt: "Envase RAN Ya Tapó, sellador para block y radiador" },
    source: { label: "Productos RAN" },
    technicalData: ["Código SG-9", "Envase 500 cc"],
  },
  {
    id: "veslee-limpia-inyectores-nafta",
    name: "Limpia Inyectores Nafta",
    familySlug: "aditivos-lubricantes-fluidos",
    manufacturer: "Veslee",
    displayGroup: "Combustible e inyección",
    description: "Aditivo para la limpieza de inyectores de motores a nafta y el mantenimiento del sistema de combustible.",
    image: { src: "/images/products/veslee/limpia-inyectores-nafta.webp", width: 1000, height: 1000, alt: "Limpia Inyectores Nafta Veslee VSL-22" },
    code: "VSL-22",
    presentation: "300 ml",
    searchTerms: ["Inyectores nafta", "Limpia inyectores nafta"],
    source: { label: "Ficha oficial Veslee", urls: ["https://vesleeaditivos.com/shop/mantenimiento-del-motor/aditivos-de-combustible/limpia-inyectores-nafta/"] },
  },
  {
    id: "veslee-limpia-inyectores-diesel",
    name: "Limpia Inyectores Diésel",
    familySlug: "aditivos-lubricantes-fluidos",
    manufacturer: "Veslee",
    displayGroup: "Combustible e inyección",
    description: "Aditivo para la limpieza del sistema de inyección diésel y la remoción de depósitos.",
    image: { src: "/images/products/veslee/limpia-inyectores-diesel.webp", width: 1000, height: 1000, alt: "Limpia Inyectores Diésel Veslee VSL-30" },
    code: "VSL-30",
    presentation: "300 ml",
    searchTerms: ["Inyectores diésel", "Inyectores diesel", "Limpia inyectores diésel"],
    source: { label: "Ficha oficial Veslee", urls: ["https://vesleeaditivos.com/shop/mantenimiento-del-motor/aditivos-de-combustible/limpia-inyectores-diesel/"] },
  },
  {
    id: "veslee-lubricante-multiuso",
    name: "Lubricante en Aerosol Multiuso",
    familySlug: "aditivos-lubricantes-fluidos",
    manufacturer: "Veslee",
    displayGroup: "Lubricación y protección",
    description: "Lubricante penetrante para aflojar piezas, proteger superficies metálicas y acompañar tareas de mantenimiento.",
    image: { src: "/images/products/veslee/lubricante-multiuso.webp", width: 1000, height: 1000, alt: "Lubricante en Aerosol Multiuso Veslee VSL-26A" },
    code: "VSL-26A",
    presentation: "450 ml",
    searchTerms: ["Lubricante multiuso", "Lubricante aerosol"],
    source: { label: "Ficha oficial Veslee", urls: ["https://vesleeaditivos.com/shop/proteccion-y-lubricacion/anticorrosivos/lubricante-en-aerosol-multiuso/"] },
  },
  {
    id: "veslee-limpia-contactos",
    name: "Limpia Contactos",
    familySlug: "aditivos-lubricantes-fluidos",
    manufacturer: "Veslee",
    displayGroup: "Limpieza técnica",
    description: "Limpiador de contactos y componentes eléctricos de secado rápido.",
    image: { src: "/images/products/veslee/limpia-contactos.webp", width: 1000, height: 1000, alt: "Limpia Contactos Veslee, referencia VSL-11A" },
    technicalData: ["Referencia a confirmar: VSL-11 / VSL-11A"],
    searchTerms: ["Limpia contactos", "Contactos eléctricos"],
    source: { label: "Ficha oficial Veslee", urls: ["https://vesleeaditivos.com/shop/limpieza-y-cuidado/componentes-electricos/limpia-contactos/"] },
  },
  {
    id: "veslee-espuma-multiuso",
    name: "Espuma Limpiadora Multiuso",
    familySlug: "aditivos-lubricantes-fluidos",
    manufacturer: "Veslee",
    displayGroup: "Cuidado y visibilidad",
    description: "Espuma para limpiar diversas superficies, incluyendo componentes interiores del vehículo.",
    image: { src: "/images/products/veslee/espuma-multiuso.webp", width: 1000, height: 1000, alt: "Espuma Limpiadora Multiuso Veslee VSL-6" },
    code: "VSL-6",
    presentation: "650 ml",
    searchTerms: ["Espuma multiuso", "Espuma limpiadora"],
    source: { label: "Ficha oficial Veslee", urls: ["https://vesleeaditivos.com/shop/limpieza-y-cuidado/cuidado-del-vehiculo/espuma-limpiadora-multiuso/"] },
  },
  {
    id: "veslee-grasa-litio-blanca",
    name: "Grasa de Litio Blanca",
    familySlug: "aditivos-lubricantes-fluidos",
    manufacturer: "Veslee",
    displayGroup: "Lubricación y protección",
    description: "Lubricación y protección para piezas y mecanismos metálicos.",
    image: { src: "/images/products/veslee/grasa-litio-blanca.webp", width: 1000, height: 1000, alt: "Grasa de Litio Blanca Veslee VSL-38" },
    code: "VSL-38",
    presentation: "450 ml",
    searchTerms: ["Grasa de litio", "Grasa litio blanca"],
    source: { label: "Ficha oficial Veslee", urls: ["https://vesleeaditivos.com/shop/proteccion-y-lubricacion/grasas-industriales/grasa-de-litio-blanca/"] },
  },
  {
    id: "veslee-limpia-discos-frenos",
    name: "Limpia Discos y Frenos",
    familySlug: "aditivos-lubricantes-fluidos",
    manufacturer: "Veslee",
    displayGroup: "Limpieza técnica",
    description: "Limpiador para eliminar grasas, aceites y residuos de componentes del sistema de frenos.",
    image: { src: "/images/products/veslee/limpia-frenos.webp", width: 1000, height: 1000, alt: "Limpia Discos y Frenos Veslee VSL-13" },
    code: "VSL-13",
    presentation: "500 ml",
    searchTerms: ["Limpia frenos", "Limpia discos y frenos"],
    source: { label: "Ficha oficial Veslee", urls: ["https://vesleeaditivos.com/shop/limpieza-y-cuidado/neumaticos-y-llantas/limpia-discos-y-frenos/"] },
  },
  {
    id: "veslee-antiempanante-cristales",
    name: "Antiempañante para Cristales",
    familySlug: "aditivos-lubricantes-fluidos",
    manufacturer: "Veslee",
    displayGroup: "Cuidado y visibilidad",
    description: "Tratamiento para reducir el empañamiento en cristales y espejos.",
    image: { src: "/images/products/veslee/antiempanante.webp", width: 1000, height: 1000, alt: "Antiempañante para Cristales Veslee VSL-49" },
    code: "VSL-49",
    presentation: "250 ml",
    searchTerms: ["Antiempañante", "Antiempanante", "Cristales"],
    source: { label: "Ficha oficial Veslee", urls: ["https://vesleeaditivos.com/shop/limpieza-y-cuidado/cuidado-del-vehiculo/antiempanante-para-cristales/"] },
  },
  {
    id: "veslee-limpia-carburadores-partes",
    name: "Limpia Carburadores y Partes",
    familySlug: "aditivos-lubricantes-fluidos",
    manufacturer: "Veslee",
    displayGroup: "Limpieza técnica",
    description: "Limpiador para carburadores, partes de admisión y cuerpos de mariposa; disuelve grasa y depósitos.",
    image: { src: "/images/products/veslee/limpia-carburadores-partes.webp", width: 1000, height: 1000, alt: "Limpia Carburadores y Partes Veslee VSL-2" },
    code: "VSL-2",
    presentation: "450 ml",
    searchTerms: ["Cuerpo mariposa", "Limpia cuerpo mariposa", "Limpia carburadores"],
    source: { label: "Ficha oficial Veslee", urls: ["https://vesleeaditivos.com/shop/mantenimiento-del-motor/motor-y-carburador/limpia-carburadores-y-partes/"] },
  },
  {
    id: "philips-h4",
    name: "H4",
    familySlug: "repuestos-accesorios",
    manufacturer: "Philips",
    displayGroup: "Faros delanteros",
    description: "Lámpara halógena para faros delanteros.",
    image: { src: "/images/products/philips/h4.webp", width: 400, height: 400, alt: "Lámpara Philips H4" },
    technicalData: ["12 V · 60/55 W", "Base P43t-38"],
    searchTerms: ["Philips", "Lámparas", "Iluminación automotor", "Faros"],
    source: { label: "Fuente histórica Districe y Philips Automotive", urls: ["https://www.districe.com.ar/lamparas-philips/", "https://www.philips.com.ar/c-p/12342VPS2_40/visionplus-bombillas-para-faros-delanteros-de-vehiculos"] },
  },
  {
    id: "philips-h1",
    name: "H1",
    familySlug: "repuestos-accesorios",
    manufacturer: "Philips",
    displayGroup: "Faros delanteros",
    description: "Lámpara halógena para faros delanteros.",
    image: { src: "/images/products/philips/h1.webp", width: 400, height: 450, alt: "Lámpara Philips H1" },
    technicalData: ["12 V · 55 W", "Base P14,5s"],
    searchTerms: ["Philips", "Lámparas", "Iluminación automotor", "Faros"],
    source: { label: "Fuente histórica Districe y Philips Automotive", urls: ["https://www.districe.com.ar/lamparas-philips/", "https://www.philips.com.ar/c-p/12258C1_40/standard-bombillas-para-faros-delanteros-de-vehiculos"] },
  },
  {
    id: "philips-h3",
    name: "H3",
    familySlug: "repuestos-accesorios",
    manufacturer: "Philips",
    displayGroup: "Faros delanteros",
    description: "Lámpara halógena para faros delanteros.",
    image: { src: "/images/products/philips/h3.webp", width: 400, height: 450, alt: "Lámpara Philips H3" },
    technicalData: ["12 V · 55 W", "Base PK22s"],
    searchTerms: ["Philips", "Lámparas", "Iluminación automotor", "Faros"],
    source: { label: "Fuente histórica Districe y Philips Automotive", urls: ["https://www.districe.com.ar/lamparas-philips/", "https://www.philips.com.ar/c-p/12336C1_40/standard-bombillas-para-faros-delanteros-de-vehiculos"] },
  },
  {
    id: "philips-h7",
    name: "H7",
    familySlug: "repuestos-accesorios",
    manufacturer: "Philips",
    displayGroup: "Faros delanteros",
    description: "Lámpara halógena para faros delanteros.",
    image: { src: "/images/products/philips/h7.webp", width: 400, height: 450, alt: "Lámpara Philips H7" },
    technicalData: ["12 V · 55 W", "Base PX26d"],
    searchTerms: ["Philips", "Lámparas", "Iluminación automotor", "Faros"],
    source: { label: "Fuente histórica Districe y Philips Automotive", urls: ["https://www.districe.com.ar/lamparas-philips/", "https://www.philips.com.ar/c-p/12972C1_40/standard-bombillas-para-faros-delanteros-de-vehiculos"] },
  },
  {
    id: "philips-p21-5w",
    name: "P21/5W",
    familySlug: "repuestos-accesorios",
    manufacturer: "Philips",
    displayGroup: "Señalización e interior",
    description: "Lámpara convencional para señalización e iluminación interior.",
    image: { src: "/images/products/philips/p21-5w.webp", width: 450, height: 400, alt: "Lámpara Philips P21/5W" },
    technicalData: ["12 V · 21/5 W", "Base BAY15d"],
    searchTerms: ["Philips", "Lámparas", "Señalización", "Interior"],
    source: { label: "Fuente histórica Districe y Philips Automotive", urls: ["https://www.districe.com.ar/lamparas-philips/", "https://www.philips.com.ar/c-p/48159773/standard-senalizacion-e-interior-convencional"] },
  },
  {
    id: "philips-p25",
    name: "P25",
    familySlug: "repuestos-accesorios",
    manufacturer: "Philips",
    displayGroup: "Señalización e interior",
    description: "Lámpara convencional para señalización e iluminación interior.",
    image: { src: "/images/products/philips/p25.webp", width: 450, height: 400, alt: "Lámpara Philips P25" },
    technicalData: ["12 V · 21/5 W", "Base BA15d"],
    searchTerms: ["Philips", "Lámparas", "Señalización", "Interior"],
    source: { label: "Fuente histórica Districe y Philips Automotive", urls: ["https://www.districe.com.ar/lamparas-philips/", "https://www.philips.com.ar/c-m-au/lamparas-para-autos/senalizacion-e-iluminacion-interna/latest"] },
  },
  {
    id: "philips-t4w",
    name: "T4W",
    familySlug: "repuestos-accesorios",
    manufacturer: "Philips",
    displayGroup: "Señalización e interior",
    description: "Lámpara convencional para señalización e iluminación interior.",
    image: { src: "/images/products/philips/t4w.webp", width: 450, height: 400, alt: "Lámpara Philips T4W" },
    technicalData: ["12 V · 4 W", "Base BA9s"],
    searchTerms: ["Philips", "Lámparas", "Señalización", "Interior"],
    source: { label: "Fuente histórica Districe", urls: ["https://www.districe.com.ar/lamparas-philips/"] },
  },
  {
    id: "philips-r10w",
    name: "R10W",
    familySlug: "repuestos-accesorios",
    manufacturer: "Philips",
    displayGroup: "Señalización e interior",
    description: "Lámpara convencional para señalización e iluminación interior.",
    image: { src: "/images/products/philips/r10w.webp", width: 450, height: 400, alt: "Lámpara Philips R10W" },
    technicalData: ["12 V · 10 W", "Base BA15s"],
    searchTerms: ["Philips", "Lámparas", "Señalización", "Interior"],
    source: { label: "Fuente histórica Districe y Philips Automotive", urls: ["https://www.districe.com.ar/lamparas-philips/", "https://www.philips.com.ar/c-m-au/lamparas-para-autos/senalizacion-e-iluminacion-interna/latest"] },
  },
  {
    id: "philips-w5w",
    name: "W5W",
    familySlug: "repuestos-accesorios",
    manufacturer: "Philips",
    displayGroup: "Señalización e interior",
    description: "Lámpara convencional para señalización e iluminación interior.",
    image: { src: "/images/products/philips/w5w.webp", width: 450, height: 400, alt: "Lámpara Philips W5W" },
    technicalData: ["12 V · 5 W", "Base W2,1×9,5d"],
    searchTerms: ["Philips", "Lámparas", "Señalización", "Interior"],
    source: { label: "Fuente histórica Districe", urls: ["https://www.districe.com.ar/lamparas-philips/"] },
  },
  {
    id: "philips-c5w",
    name: "C5W",
    familySlug: "repuestos-accesorios",
    manufacturer: "Philips",
    displayGroup: "Señalización e interior",
    description: "Lámpara convencional para señalización e iluminación interior.",
    image: { src: "/images/products/philips/c5w.webp", width: 450, height: 400, alt: "Lámpara Philips C5W" },
    technicalData: ["12 V · 5 W"],
    searchTerms: ["Philips", "Lámparas", "Señalización", "Interior"],
    source: { label: "Fuente histórica Districe", urls: ["https://www.districe.com.ar/lamparas-philips/"] },
  },
  {
    id: "hella-cleantech",
    name: "HELLA CleanTech",
    familySlug: "repuestos-accesorios",
    manufacturer: "HELLA",
    displayGroup: "Escobillas limpiaparabrisas",
    description: "Escobilla de diseño aerodinámico para acompañar una limpieza uniforme del parabrisas.",
    image: { src: "/images/products/hella/cleantech.webp", width: 1000, height: 1000, alt: "Escobilla limpiaparabrisas HELLA CleanTech" },
    technicalData: ["Goma con revestimiento de grafito", "Estructura aerodinámica", "Adaptadores según presentación"],
    searchTerms: ["HELLA", "Escobillas", "Limpiaparabrisas", "CleanTech"],
    source: { label: "Fuente histórica Districe y HELLA", urls: ["https://www.districe.com.ar/hella/", "https://www.hella.com/lightstyle/ae/cleantech-3-0.html"] },
  },
  {
    id: "hella-estandar",
    name: "HELLA Estándar",
    familySlug: "repuestos-accesorios",
    manufacturer: "HELLA",
    displayGroup: "Escobillas limpiaparabrisas",
    description: "Escobilla tradicional con estructura metálica para aplicaciones de mantenimiento automotor.",
    image: { src: "/images/products/hella/estandar.webp", width: 1000, height: 1000, alt: "Escobilla limpiaparabrisas HELLA estándar" },
    technicalData: ["Goma de caucho natural con grafito", "Marco metálico resistente", "Adaptación según presentación"],
    searchTerms: ["HELLA", "Escobillas", "Limpiaparabrisas", "Estándar", "Estandar"],
    source: { label: "Fuente histórica Districe y HELLA", urls: ["https://www.districe.com.ar/hella/", "https://www.hella.com/lightstyle/dk/metal-wiper.html"] },
  },
];

// A line belongs to a brand within a family. Its id is contextual, so two
// "Perfumes" entries never collapse into one catalogue entity.
export const catalogLines: CatalogLine[] = brands.flatMap((brand) => brand.lines.map((name) => {
  const slug = toSlug(name);
  const familySlug = brand.familySlugs[0];
  return { id: `${familySlug}/${brand.slug}/${slug}`, slug, name, familySlug, brandSlug: brand.slug };
}));

export const catalogItems = brands.flatMap((brand) => (brand.catalogItems ?? []).map((item) => ({ ...item, brandSlug: brand.slug, familySlug: brand.familySlugs[0] })));

export const searchEntries: SearchEntry[] = [
  ...productFamilies.map((family) => ({ id: `family-${family.slug}`, label: family.name, type: "Familia" as const, detail: "Productos", target: `/productos/${family.slug}` })),
  ...brands.map((brand) => ({ id: `brand-${brand.slug}`, label: brand.name, type: "Marca" as const, detail: brand.description, target: `/marcas/${brand.slug}` })),
  ...catalogLines.map((line) => ({ id: `line-${line.id}`, label: line.name, type: "Línea" as const, detail: `${brands.find((brand) => brand.slug === line.brandSlug)?.name} · ${productFamilies.find((family) => family.slug === line.familySlug)?.name ?? "Catálogo"}`, target: `/marcas/${line.brandSlug}` })),
  ...brands.flatMap((brand) => brand.catalog ? [{ id: `catalog-${brand.slug}`, label: brand.catalog.title, type: "Catálogo" as const, detail: `${brand.name} · PDF oficial`, target: `/marcas/${brand.slug}` }] : []),
  ...productFamilies.flatMap((family) => family.catalog ? [{ id: `catalog-family-${family.slug}`, label: family.catalog.title, type: "Catálogo" as const, detail: `${family.catalog.source} · ${family.name}`, target: `/productos/${family.slug}#documentacion` }] : []),
  ...productFamilies.flatMap((family) => (family.catalog?.topics ?? []).map((topic) => ({ id: `catalog-topic-${family.slug}-${toSlug(topic)}`, label: topic, type: "Catálogo" as const, detail: `${family.catalog?.source} · ${family.name}`, target: `/productos/${family.slug}#documentacion` }))),
  ...productFamilies.flatMap((family) => (family.catalog?.searchTerms ?? []).map((term) => ({ id: `catalog-search-${family.slug}-${toSlug(term)}`, label: term, type: "Catálogo" as const, detail: `${family.catalog?.source} · ${family.name}`, target: `/productos/${family.slug}#documentacion` }))),
  ...catalogItems.map((item) => ({ id: `catalog-${item.id}`, label: item.name, type: "Catálogo" as const, detail: `${brands.find((brand) => brand.slug === item.brandSlug)?.name} · ${item.kind}`, target: `/marcas/${item.brandSlug}` })),
  ...featuredProducts.map((product) => ({ id: `product-${product.id}`, label: product.name, type: "Producto" as const, detail: `${product.manufacturer ? `${product.manufacturer} · ` : ""}${productFamilies.find((family) => family.slug === product.familySlug)?.name ?? "Productos"}`, target: `/productos/${product.familySlug}#${product.id}`, searchTerms: product.searchTerms })),
];

export const getFamily = (slug: string) => productFamilies.find((family) => family.slug === slug);
export const getBrand = (slug: string) => brands.find((brand) => brand.slug === slug);
export const brandsForFamily = (slug: string) => brands.filter((brand) => brand.familySlugs.includes(slug));
export const productsForFamily = (slug: string) => featuredProducts.filter((product) => product.familySlug === slug);
export const familyUrl = (slug: string) => `/productos/${slug}`;
export const brandUrl = (slug: string) => `/marcas/${slug}`;
