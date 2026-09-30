export type ProductFamily = { slug: string; name: string; index: string; description: string; lines: string[]; tone: "blue" | "lime" | "orange" | "silver" | "red" | "ink" };
export type Brand = { slug: string; name: string; description: string; lines: string[] };
export type SearchEntry = { id: string; label: string; type: "Familia" | "Marca" | "Línea"; detail: string; target: string };
export type CatalogLine = { id: string; slug: string; name: string; familySlug: string; brandSlug: string };

export const productFamilies: ProductFamily[] = [
  { slug: "estetica-vehicular", name: "Estética vehicular", index: "01", description: "Cuidado, terminación y presentación del vehículo.", lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Accesorios para lavado", "Lubricantes", "Aromatizantes", "Renovadores", "Lustre y pulido"], tone: "blue" },
  { slug: "aditivos-lubricantes-fluidos", name: "Aditivos, lubricantes y fluidos", index: "02", description: "Una familia para acompañar el mantenimiento y la operación del vehículo.", lines: [], tone: "lime" },
  { slug: "higiene-seguridad", name: "Higiene y seguridad", index: "03", description: "Soluciones para el cuidado del entorno de trabajo y la operación cotidiana.", lines: [], tone: "orange" },
  { slug: "repuestos-accesorios", name: "Repuestos y accesorios", index: "04", description: "Una selección para resolver necesidades del canal automotor profesional.", lines: [], tone: "silver" },
  { slug: "anaerobicos-automotor", name: "Anaeróbicos automotor", index: "05", description: "Una familia específica dentro de la propuesta comercial de Districe.", lines: [], tone: "red" },
  { slug: "cintas-films", name: "Cintas y films", index: "06", description: "Alternativas para la preparación, protección y terminación de cada trabajo.", lines: [], tone: "ink" },
];

// Only brands confirmed in both current public sources are public in Home V1.
export const brands: Brand[] = [
  { slug: "k78", name: "K78", description: "Estética vehicular", lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Accesorios para lavado"] },
  { slug: "jarama", name: "Jarama", description: "Estética vehicular", lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Lubricantes"] },
  { slug: "revigal", name: "Revigal", description: "Estética vehicular", lines: ["Productos para lavado", "Aromatizantes", "Renovadores", "Lustre y pulido"] },
];

const toSlug = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// A line belongs to a brand within a family. Its id is contextual, so two
// "Perfumes" entries never collapse into one catalogue entity.
export const catalogLines: CatalogLine[] = brands.flatMap((brand) => brand.lines.map((name) => {
  const slug = toSlug(name);
  return { id: `estetica-vehicular/${brand.slug}/${slug}`, slug, name, familySlug: "estetica-vehicular", brandSlug: brand.slug };
}));

export const searchEntries: SearchEntry[] = [
  ...productFamilies.map((family) => ({ id: `family-${family.slug}`, label: family.name, type: "Familia" as const, detail: "Productos", target: `/productos/${family.slug}` })),
  ...brands.map((brand) => ({ id: `brand-${brand.slug}`, label: brand.name, type: "Marca" as const, detail: brand.description, target: `/marcas/${brand.slug}` })),
  ...catalogLines.map((line) => ({ id: `line-${line.id}`, label: line.name, type: "Línea" as const, detail: `${brands.find((brand) => brand.slug === line.brandSlug)?.name} · Estética vehicular`, target: `/marcas/${line.brandSlug}` })),
];

export const getFamily = (slug: string) => productFamilies.find((family) => family.slug === slug);
export const getBrand = (slug: string) => brands.find((brand) => brand.slug === slug);
export const familyUrl = (slug: string) => `/productos/${slug}`;
export const brandUrl = (slug: string) => `/marcas/${slug}`;
