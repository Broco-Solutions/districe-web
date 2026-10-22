import { existsSync, readFileSync } from "node:fs";

const catalog = readFileSync(new URL("../src/data/catalog.ts", import.meta.url), "utf8").toLowerCase();
const forbidden = ["trampolímp", "ferrecentro", "cepillos cariño", "vicuña seguridad industrial", "campanita", "tacsa", "pitts", "team fundas"];
const errors = forbidden.filter((brand) => catalog.includes(brand)).map((brand) => `Marca excluida encontrada: ${brand}`);
const expectedBrandSlugs = ["k78", "jarama", "revigal", "veslee", "locx", "bioepecuen"];
const expectedFamilySlugs = ["estetica-vehicular", "aditivos-lubricantes-fluidos", "higiene-seguridad", "repuestos-accesorios", "anaerobicos-automotor", "cintas-films"];
const brandBlock = catalog.match(/export const brands: brand\[\] = \[([\s\S]*?)\n\];\n\nexport const featuredproducts/)?.[1] ?? "";
const publishedBrandSlugs = [...brandBlock.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
const familyBlock = catalog.match(/export const productfamilies: productfamily\[\] = \[([\s\S]*?)\n\];/)?.[1] ?? "";
const publishedFamilySlugs = [...familyBlock.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
const featuredBlock = catalog.match(/export const featuredproducts: featuredproduct\[\] = \[([\s\S]*?)\n\];/)?.[1] ?? "";
const featuredProductIds = [...featuredBlock.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);
const expectedFeaturedProductIds = ["arranca-motores", "desengrasante-aerosol", "niebla-lubricante", "grasa-litio-aerosol", "kit-proteccion-automotor-5-en-1", "ya-tapo"];

if (publishedBrandSlugs.length !== 6 || publishedBrandSlugs.some((slug, index) => slug !== expectedBrandSlugs[index])) errors.push(`Las marcas públicas deben ser exactamente: ${expectedBrandSlugs.join(", ")}.`);
if (publishedFamilySlugs.length !== 6 || publishedFamilySlugs.some((slug, index) => slug !== expectedFamilySlugs[index])) errors.push(`Las familias públicas deben ser exactamente: ${expectedFamilySlugs.join(", ")}.`);
if (brandBlock.includes('slug: "anken"') || brandBlock.includes('name: "anken"')) errors.push("ANKEN no debe publicarse como marca del directorio.");
if (brandBlock.includes('slug: "ran"') || brandBlock.includes('name: "ran"')) errors.push("RAN no debe publicarse como marca del directorio.");
if (existsSync(new URL("../src/app/marcas/anken", import.meta.url))) errors.push("No debe existir la ruta /marcas/anken.");
if (existsSync(new URL("../src/app/marcas/ran", import.meta.url))) errors.push("No debe existir la ruta /marcas/ran.");

if (!catalog.includes("familyslug") || !catalog.includes("brandslug") || !catalog.includes("id: `${familyslug}/${brand.slug}/${slug}`")) errors.push("El modelo de líneas no conserva identidad contextual.");
if (!catalog.includes("detail: `${brands.find")) errors.push("La búsqueda no incluye contexto de marca para líneas.");
if (!catalog.includes("bioepecuen") || !catalog.includes("difusores de auto") || !catalog.includes("catalogos/bioepecuen-difusores-auto.pdf")) errors.push("Bioepecuén no está integrado con su catálogo confirmado.");
if (!catalog.includes("jarama") || !catalog.includes("catalogos/catalogo-jarama.pdf")) errors.push("Jarama no está integrada con su catálogo oficial.");
if (!catalog.includes("k78") || !catalog.includes("catalogos/catalogo-k78-2026.pdf")) errors.push("K78 no está integrada con su catálogo oficial 2026.");
if (!catalog.includes('slug: "revigal"') || !catalog.includes("catalogos/catalogo-revigal.pdf")) errors.push("Revigal no está integrada con su catálogo oficial.");
if (!catalog.includes('slug: "locx"') || !catalog.includes('name: "locx"')) errors.push("LOCX no está integrada como marca confirmada.");
if (!catalog.includes("catalogos/catalogo-locx.pdf")) errors.push("LOCX no está integrada con su catálogo oficial.");
if (!catalog.includes("catalogos/catalogo-anken-higiene-seguridad.pdf") || !catalog.includes('source: "anken"')) errors.push("El catálogo ANKEN no está integrado como documento de Higiene y seguridad.");
if (featuredProductIds.length !== 6 || featuredProductIds.some((id, index) => id !== expectedFeaturedProductIds[index])) errors.push(`Los productos destacados deben ser exactamente: ${expectedFeaturedProductIds.join(", ")}.`);
if ([...featuredBlock.matchAll(/familyslug: "([^"]+)"/g)].some((match) => match[1] !== "estetica-vehicular")) errors.push("Todos los productos destacados solicitados deben pertenecer a Estética vehicular.");
const kitBlock = featuredBlock.match(/id: "kit-proteccion-automotor-5-en-1"[\s\S]*?\n  },/)?.[0] ?? "";
if ((featuredBlock.match(/manufacturer: "ran"/g) ?? []).length !== 5 || kitBlock.includes("manufacturer:")) errors.push("RAN debe atribuirse sólo a los cinco productos verificados; el kit 5 en 1 debe quedar sin fabricante.");
if (!catalog.includes('type: "producto" as const') || !catalog.includes('target: `/productos/${product.familyslug}#${product.id}`')) errors.push("La búsqueda no integra los productos destacados con su destino de familia.");
for (const asset of ["arranca-motores.webp", "desengrasante-aerosol.webp", "niebla-lubricante.webp", "grasa-litio-aerosol.webp", "ya-tapo.webp", "ran-logo.webp"]) {
  if (!existsSync(new URL(`../public/images/products/ran/${asset}`, import.meta.url))) errors.push(`Falta el asset RAN: ${asset}.`);
}
if (catalog.includes('slug: "lock"') || catalog.includes('name: "lock"')) errors.push("La identidad provisoria Lock sigue publicada; debe ser LOCX.");

if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Content validation passed: six families, six public brands, family documents, six featured products, exclusions and search destinations are valid.");
