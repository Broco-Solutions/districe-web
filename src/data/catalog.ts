export type ProductFamily = { slug: string; name: string; index: string; description: string; lines: string[]; tone: "blue" | "lime" | "orange" | "silver" | "red" | "ink" };
export type CatalogItem = { id: string; name: string; kind: "familia de producto" | "aroma" };
export type CatalogDocument = { url: string; title: string; heading: string; summary?: string };
export type Brand = { slug: string; name: string; description: string; familySlugs: string[]; lines: string[]; catalog?: CatalogDocument; catalogItems?: CatalogItem[] };
export type SearchEntry = { id: string; label: string; type: "Familia" | "Marca" | "Línea" | "Catálogo"; detail: string; target: string };

const toSlug = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export type CatalogLine = { id: string; slug: string; name: string; familySlug: string; brandSlug: string };

export const productFamilies: ProductFamily[] = [
  { slug: "estetica-vehicular", name: "Estética vehicular", index: "01", description: "Cuidado, terminación y presentación del vehículo.", lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Accesorios para lavado", "Lubricantes", "Aromatizantes", "Renovadores", "Lustre y pulido"], tone: "blue" },
  { slug: "aditivos-lubricantes-fluidos", name: "Aditivos, lubricantes y fluidos", index: "02", description: "Una familia para acompañar el mantenimiento y la operación del vehículo.", lines: ["Aditivos"], tone: "lime" },
  { slug: "higiene-seguridad", name: "Higiene y seguridad", index: "03", description: "Soluciones para el cuidado del entorno de trabajo y la operación cotidiana.", lines: [], tone: "orange" },
  { slug: "repuestos-accesorios", name: "Repuestos y accesorios", index: "04", description: "Una selección para resolver necesidades del canal automotor profesional.", lines: [], tone: "silver" },
  { slug: "anaerobicos-automotor", name: "Anaeróbicos automotor", index: "05", description: "Una familia específica dentro de la propuesta comercial de Districe.", lines: [], tone: "red" },
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
  ...catalogItems.map((item) => ({ id: `catalog-${item.id}`, label: item.name, type: "Catálogo" as const, detail: `${brands.find((brand) => brand.slug === item.brandSlug)?.name} · ${item.kind}`, target: `/marcas/${item.brandSlug}` })),
];

export const getFamily = (slug: string) => productFamilies.find((family) => family.slug === slug);
export const getBrand = (slug: string) => brands.find((brand) => brand.slug === slug);
export const brandsForFamily = (slug: string) => brands.filter((brand) => brand.familySlugs.includes(slug));
export const familyUrl = (slug: string) => `/productos/${slug}`;
export const brandUrl = (slug: string) => `/marcas/${slug}`;
