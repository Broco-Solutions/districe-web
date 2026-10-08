export type ProductFamily = { slug: string; name: string; index: string; description: string; lines: string[]; tone: "blue" | "lime" | "orange" | "silver" | "red" | "ink" };
export type CatalogItem = { id: string; name: string; kind: "familia de producto" | "aroma" };
export type Brand = { slug: string; name: string; description: string; familySlugs: string[]; lines: string[]; catalogItems?: CatalogItem[]; catalogUrl?: string };
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
  { slug: "k78", name: "K78", description: "Estética vehicular", familySlugs: ["estetica-vehicular"], lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Accesorios para lavado"] },
  { slug: "jarama", name: "Jarama", description: "Estética vehicular", familySlugs: ["estetica-vehicular"], lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Lubricantes"] },
  { slug: "revigal", name: "Revigal", description: "Estética vehicular", familySlugs: ["estetica-vehicular"], lines: ["Productos para lavado", "Aromatizantes", "Renovadores", "Lustre y pulido"] },
  { slug: "veslee", name: "Veslee", description: "Aditivos", familySlugs: ["aditivos-lubricantes-fluidos"], lines: ["Aditivos"] },
  { slug: "lock", name: "Lock", description: "Aditivos", familySlugs: ["aditivos-lubricantes-fluidos"], lines: ["Aditivos"] },
  { slug: "bioepecuen", name: "Bioepecuén", description: "Estética vehicular", familySlugs: ["estetica-vehicular"], lines: [], catalogUrl: "/catalogos/bioepecuen-difusores-auto.pdf", catalogItems: [
    { id: "bioepecuen-difusores-de-auto", name: "Difusores de auto", kind: "familia de producto" },
    { id: "bioepecuen-display-expositor-20-unidades", name: "Display expositor de 20 unidades", kind: "familia de producto" },
    ...["Citric Car", "Peras y Flores Blancas", "Vainilla y Azúcar", "Pasión Frutal", "Verbena", "Limón", "Uva y Frutos del Bosque"].map((name) => ({ id: `bioepecuen-${toSlug(name)}`, name, kind: "aroma" as const })),
  ] },
];

// A line belongs to a brand within a family. Its id is contextual, so two
// "Perfumes" entries never collapse into one catalogue entity.
export const catalogLines: CatalogLine[] = brands.flatMap((brand) => brand.lines.map((name) => {
  const slug = toSlug(name);
  return { id: `estetica-vehicular/${brand.slug}/${slug}`, slug, name, familySlug: "estetica-vehicular", brandSlug: brand.slug };
}));

export const catalogItems = brands.flatMap((brand) => (brand.catalogItems ?? []).map((item) => ({ ...item, brandSlug: brand.slug, familySlug: brand.familySlugs[0] })));

export const searchEntries: SearchEntry[] = [
  ...productFamilies.map((family) => ({ id: `family-${family.slug}`, label: family.name, type: "Familia" as const, detail: "Productos", target: `/productos/${family.slug}` })),
  ...brands.map((brand) => ({ id: `brand-${brand.slug}`, label: brand.name, type: "Marca" as const, detail: brand.description, target: `/marcas/${brand.slug}` })),
  ...catalogLines.map((line) => ({ id: `line-${line.id}`, label: line.name, type: "Línea" as const, detail: `${brands.find((brand) => brand.slug === line.brandSlug)?.name} · ${productFamilies.find((family) => family.slug === line.familySlug)?.name ?? "Catálogo"}`, target: `/marcas/${line.brandSlug}` })),
  ...catalogItems.map((item) => ({ id: `catalog-${item.id}`, label: item.name, type: "Catálogo" as const, detail: `Bioepecuén · ${item.kind}`, target: "/marcas/bioepecuen" })),
];

export const getFamily = (slug: string) => productFamilies.find((family) => family.slug === slug);
export const getBrand = (slug: string) => brands.find((brand) => brand.slug === slug);
export const brandsForFamily = (slug: string) => brands.filter((brand) => brand.familySlugs.includes(slug));
export const familyUrl = (slug: string) => `/productos/${slug}`;
export const brandUrl = (slug: string) => `/marcas/${slug}`;
