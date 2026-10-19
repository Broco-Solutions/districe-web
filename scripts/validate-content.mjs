import { readFileSync } from "node:fs";

const catalog = readFileSync(new URL("../src/data/catalog.ts", import.meta.url), "utf8").toLowerCase();
const forbidden = ["trampolímp", "ferrecentro", "cepillos cariño", "vicuña seguridad industrial", "campanita", "tacsa", "pitts", "team fundas"];
const errors = forbidden.filter((brand) => catalog.includes(brand)).map((brand) => `Marca excluida encontrada: ${brand}`);

if (!catalog.includes("familyslug") || !catalog.includes("brandslug") || !catalog.includes("id: `${familyslug}/${brand.slug}/${slug}`")) errors.push("El modelo de líneas no conserva identidad contextual.");
if (!catalog.includes("detail: `${brands.find")) errors.push("La búsqueda no incluye contexto de marca para líneas.");
if (!catalog.includes("bioepecuen") || !catalog.includes("difusores de auto") || !catalog.includes("catalogos/bioepecuen-difusores-auto.pdf")) errors.push("Bioepecuén no está integrado con su catálogo confirmado.");
if (!catalog.includes("jarama") || !catalog.includes("catalogos/catalogo-jarama.pdf")) errors.push("Jarama no está integrada con su catálogo oficial.");
if (!catalog.includes("k78") || !catalog.includes("catalogos/catalogo-k78-2026.pdf")) errors.push("K78 no está integrada con su catálogo oficial 2026.");
if (!catalog.includes('slug: "locx"') || !catalog.includes('name: "locx"')) errors.push("LOCX no está integrada como marca confirmada.");
if (!catalog.includes("catalogos/catalogo-locx.pdf")) errors.push("LOCX no está integrada con su catálogo oficial.");
if (catalog.includes('slug: "lock"') || catalog.includes('name: "lock"')) errors.push("La identidad provisoria Lock sigue publicada; debe ser LOCX.");

if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Content validation passed: exclusions, LOCX, contextual lines and search labels are valid.");
