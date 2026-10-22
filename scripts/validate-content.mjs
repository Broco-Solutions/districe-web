import { existsSync, readFileSync } from "node:fs";

const catalog = readFileSync(new URL("../src/data/catalog.ts", import.meta.url), "utf8").toLowerCase();
const forbidden = ["trampolímp", "ferrecentro", "cepillos cariño", "vicuña seguridad industrial", "campanita", "tacsa", "pitts", "team fundas"];
const errors = forbidden.filter((brand) => catalog.includes(brand)).map((brand) => `Marca excluida encontrada: ${brand}`);
const expectedBrandSlugs = ["k78", "jarama", "revigal", "veslee", "locx", "bioepecuen"];
const brandBlock = catalog.match(/export const brands: brand\[\] = \[([\s\S]*?)\n\];\n\n\/\/ a line/)?.[1] ?? "";
const publishedBrandSlugs = [...brandBlock.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);

if (publishedBrandSlugs.length !== 6 || publishedBrandSlugs.some((slug, index) => slug !== expectedBrandSlugs[index])) errors.push(`Las marcas públicas deben ser exactamente: ${expectedBrandSlugs.join(", ")}.`);
if (brandBlock.includes("anken")) errors.push("ANKEN no debe publicarse como marca del directorio.");
if (existsSync(new URL("../src/app/marcas/anken", import.meta.url))) errors.push("No debe existir la ruta /marcas/anken.");

if (!catalog.includes("familyslug") || !catalog.includes("brandslug") || !catalog.includes("id: `${familyslug}/${brand.slug}/${slug}`")) errors.push("El modelo de líneas no conserva identidad contextual.");
if (!catalog.includes("detail: `${brands.find")) errors.push("La búsqueda no incluye contexto de marca para líneas.");
if (!catalog.includes("bioepecuen") || !catalog.includes("difusores de auto") || !catalog.includes("catalogos/bioepecuen-difusores-auto.pdf")) errors.push("Bioepecuén no está integrado con su catálogo confirmado.");
if (!catalog.includes("jarama") || !catalog.includes("catalogos/catalogo-jarama.pdf")) errors.push("Jarama no está integrada con su catálogo oficial.");
if (!catalog.includes("k78") || !catalog.includes("catalogos/catalogo-k78-2026.pdf")) errors.push("K78 no está integrada con su catálogo oficial 2026.");
if (!catalog.includes('slug: "revigal"') || !catalog.includes("catalogos/catalogo-revigal.pdf")) errors.push("Revigal no está integrada con su catálogo oficial.");
if (!catalog.includes('slug: "locx"') || !catalog.includes('name: "locx"')) errors.push("LOCX no está integrada como marca confirmada.");
if (!catalog.includes("catalogos/catalogo-locx.pdf")) errors.push("LOCX no está integrada con su catálogo oficial.");
if (!catalog.includes("catalogos/catalogo-anken-higiene-seguridad.pdf") || !catalog.includes('source: "anken"')) errors.push("El catálogo ANKEN no está integrado como documento de Higiene y seguridad.");
if (catalog.includes('slug: "lock"') || catalog.includes('name: "lock"')) errors.push("La identidad provisoria Lock sigue publicada; debe ser LOCX.");

if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Content validation passed: six public brands, exclusions, family documents, contextual lines and search labels are valid.");
