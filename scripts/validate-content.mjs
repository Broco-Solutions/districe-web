import { readFileSync } from "node:fs";

const catalog = readFileSync(new URL("../src/data/catalog.ts", import.meta.url), "utf8").toLowerCase();
const forbidden = ["trampolímp", "ferrecentro", "cepillos cariño", "vicuña seguridad industrial", "campanita", "tacsa", "pitts", "team fundas"];
const errors = forbidden.filter((brand) => catalog.includes(brand)).map((brand) => `Marca excluida encontrada: ${brand}`);

if (!catalog.includes("familyslug") || !catalog.includes("brandslug") || !catalog.includes("id: `${familyslug}/${brand.slug}/${slug}`")) errors.push("El modelo de líneas no conserva identidad contextual.");
if (!catalog.includes("detail: `${brands.find")) errors.push("La búsqueda no incluye contexto de marca para líneas.");
if (!catalog.includes("bioepecuen") || !catalog.includes("difusores de auto") || !catalog.includes("catalogos/bioepecuen-difusores-auto.pdf")) errors.push("Bioepecuén no está integrado con su catálogo confirmado.");

if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Content validation passed: exclusions, contextual lines and search labels are valid.");
