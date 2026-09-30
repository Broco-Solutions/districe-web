export type ProductFamily = { slug: string; name: string; index: string; description: string; lines: string[]; tone: "blue" | "lime" | "orange" | "silver" | "red" | "ink" };
export type Brand = { slug: string; name: string; description: string; lines: string[] };
export type SearchEntry = { id: string; label: string; type: "Familia" | "Marca" | "Línea"; detail: string; target: string };

export const productFamilies: ProductFamily[] = [
  { slug: "estetica-vehicular", name: "Estética vehicular", index: "01", description: "Cuidado, terminación y presentación del vehículo.", lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Accesorios para lavado", "Lubricantes", "Aromatizantes", "Renovadores", "Lustre y pulido"], tone: "blue" },
  { slug: "aditivos-lubricantes-fluidos", name: "Aditivos, lubricantes y fluidos", index: "02", description: "Familia disponible para explorar y cotizar.", lines: [], tone: "lime" },
  { slug: "higiene-seguridad", name: "Higiene y seguridad", index: "03", description: "Familia disponible para explorar y cotizar.", lines: [], tone: "orange" },
  { slug: "repuestos-accesorios", name: "Repuestos y accesorios", index: "04", description: "Familia disponible para explorar y cotizar.", lines: [], tone: "silver" },
  { slug: "anaerobicos-automotor", name: "Anaeróbicos automotor", index: "05", description: "Familia disponible para explorar y cotizar.", lines: [], tone: "red" },
  { slug: "cintas-films", name: "Cintas y films", index: "06", description: "Familia disponible para explorar y cotizar.", lines: [], tone: "ink" },
];

// Only brands confirmed in both current public sources are public in Home V1.
export const brands: Brand[] = [
  { slug: "k78", name: "K78", description: "Estética vehicular", lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Accesorios para lavado"] },
  { slug: "jarama", name: "Jarama", description: "Estética vehicular", lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Lubricantes"] },
  { slug: "revigal", name: "Revigal", description: "Estética vehicular", lines: ["Productos para lavado", "Aromatizantes", "Renovadores", "Lustre y pulido"] },
];

export const searchEntries: SearchEntry[] = [
  ...productFamilies.map((family) => ({ id: `family-${family.slug}`, label: family.name, type: "Familia" as const, detail: "Productos", target: "#familias" })),
  ...brands.map((brand) => ({ id: `brand-${brand.slug}`, label: brand.name, type: "Marca" as const, detail: brand.description, target: "#marcas" })),
  ...Array.from(new Set(brands.flatMap((brand) => brand.lines))).map((line) => ({ id: `line-${line.toLowerCase().replaceAll(" ", "-")}`, label: line, type: "Línea" as const, detail: "Estética vehicular", target: "#familias" })),
];
