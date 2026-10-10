export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  darkSrc?: string;
};

export const brandAssets: Record<string, ImageAsset> = {
  k78: { src: "/logos/brands/k78-transparent.png", width: 299, height: 124, alt: "Logo K78" },
  jarama: { src: "/images/brands/jarama-logo.png", darkSrc: "/images/brands/jarama-logo-white.png", width: 2400, height: 397, alt: "Logo Jarama" },
  revigal: { src: "/logos/brands/revigal-official.png", width: 500, height: 123, alt: "Logo Revigal" },
  veslee: { src: "/logos/brands/veslee-official.webp", width: 545, height: 344, alt: "Logo Veslee" },
  locx: { src: "/images/brands/locx-logo.png", width: 2172, height: 724, alt: "Logo LOCX" },
  bioepecuen: { src: "/images/brands/bioepecuen-logo.png", width: 2172, height: 724, alt: "Logo Bioepecuén" },
};

export const familyAssets: Record<string, ImageAsset> = {
  "estetica-vehicular": { src: "/images/families/editorial/estetica-vehicular.webp", width: 1536, height: 1024, alt: "Productos y herramientas para estética vehicular" },
  "aditivos-lubricantes-fluidos": { src: "/images/families/editorial/aditivos-lubricantes-fluidos.webp", width: 1536, height: 1024, alt: "Aditivos, lubricantes y fluidos en un entorno de taller" },
  "higiene-seguridad": { src: "/images/families/editorial/higiene-seguridad.webp", width: 1536, height: 1024, alt: "Elementos de higiene y seguridad para el trabajo" },
  "repuestos-accesorios": { src: "/images/families/editorial/repuestos-accesorios.webp", width: 1536, height: 1024, alt: "Selección de repuestos y accesorios automotor" },
  "anaerobicos-automotor": { src: "/images/families/editorial/anaerobicos-automotor.webp", width: 1536, height: 1024, alt: "Selladores anaeróbicos en una mesa de trabajo automotor" },
  "cintas-films": { src: "/images/families/editorial/cintas-films.webp", width: 1536, height: 1024, alt: "Cintas y films para preparación y protección" },
};
