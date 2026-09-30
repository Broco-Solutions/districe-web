export type ProductFamily = {
  slug: string;
  name: string;
  children?: string[];
};

export type Brand = {
  slug: string;
  name: string;
  lines: string[];
};

// Source of truth for the initial catalog. Values are deliberately content-only:
// UI components consume these types rather than owning product taxonomy.
export const productFamilies: ProductFamily[] = [
  { slug: "estetica-vehicular", name: "Estética vehicular", children: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Accesorios para lavado"] },
  { slug: "aditivos-lubricantes-fluidos", name: "Aditivos, lubricantes y fluidos" },
  { slug: "higiene-seguridad", name: "Higiene y seguridad" },
  { slug: "repuestos-accesorios", name: "Repuestos y accesorios" },
  { slug: "anaerobicos-automotor", name: "Anaeróbicos automotor" },
  { slug: "cintas-films", name: "Cintas y films" },
];

export const brands: Brand[] = [
  { slug: "anken", name: "Anken", lines: ["Absorbentes industriales"] },
  { slug: "cruzmaster", name: "Crossmaster", lines: ["Herramientas"] },
  { slug: "extrima", name: "Extrima", lines: ["Aceites para motor"] },
  { slug: "gen-rod", name: "Gen Rod", lines: ["Fusibles"] },
  { slug: "hella", name: "Hella", lines: ["Escobillas limpiaparabrisas"] },
  { slug: "jarama", name: "Jarama", lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Lubricantes"] },
  { slug: "k78", name: "K78", lines: ["Perfumes", "Limpiadores", "Revividores", "Ceras", "Accesorios para lavado"] },
  { slug: "loctite", name: "Loctite", lines: ["Adhesivos y selladores"] },
  { slug: "maxfil", name: "Maxfil", lines: ["Filtros línea liviana y pesada"] },
  { slug: "perfecto", name: "Abrazaderas Perfecto", lines: ["Abrazaderas"] },
  { slug: "pertrak", name: "Pertrak", lines: ["Filtros para motores Perkins"] },
  { slug: "philips", name: "Philips", lines: ["Lámparas"] },
  { slug: "pitts", name: "Pitts", lines: ["Aditivos"] },
  { slug: "ran", name: "Ran", lines: ["Limpiadores y auxiliares automotor"] },
  { slug: "revigal", name: "Revigal", lines: ["Cosmética automotor"] },
  { slug: "sol-tec", name: "Sol Tec", lines: ["Crema limpiamanos", "Limpia inyectores", "Desoxidantes automotor"] },
  { slug: "team-hnos", name: "Team Hnos", lines: ["Fundas y accesorios"] },
  { slug: "tribuno", name: "Tribuno", lines: ["Líquidos de freno", "Refrigerantes", "Limpia contactos", "Aditivos"] }
];
