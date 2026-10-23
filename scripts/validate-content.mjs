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
const expectedOriginalProductIds = ["arranca-motores", "desengrasante-aerosol", "niebla-lubricante", "grasa-litio-aerosol", "kit-proteccion-automotor-5-en-1", "ya-tapo"];
const expectedVesleeProducts = [
  ["veslee-limpia-inyectores-nafta", "VSL-22", "limpia-inyectores-nafta.webp", "https://vesleeaditivos.com/shop/mantenimiento-del-motor/aditivos-de-combustible/limpia-inyectores-nafta/"],
  ["veslee-limpia-inyectores-diesel", "VSL-30", "limpia-inyectores-diesel.webp", "https://vesleeaditivos.com/shop/mantenimiento-del-motor/aditivos-de-combustible/limpia-inyectores-diesel/"],
  ["veslee-lubricante-multiuso", "VSL-26A", "lubricante-multiuso.webp", "https://vesleeaditivos.com/shop/proteccion-y-lubricacion/anticorrosivos/lubricante-en-aerosol-multiuso/"],
  ["veslee-limpia-contactos", null, "limpia-contactos.webp", "https://vesleeaditivos.com/shop/limpieza-y-cuidado/componentes-electricos/limpia-contactos/"],
  ["veslee-espuma-multiuso", "VSL-6", "espuma-multiuso.webp", "https://vesleeaditivos.com/shop/limpieza-y-cuidado/cuidado-del-vehiculo/espuma-limpiadora-multiuso/"],
  ["veslee-grasa-litio-blanca", "VSL-38", "grasa-litio-blanca.webp", "https://vesleeaditivos.com/shop/proteccion-y-lubricacion/grasas-industriales/grasa-de-litio-blanca/"],
  ["veslee-limpia-discos-frenos", "VSL-13", "limpia-frenos.webp", "https://vesleeaditivos.com/shop/limpieza-y-cuidado/neumaticos-y-llantas/limpia-discos-y-frenos/"],
  ["veslee-antiempanante-cristales", "VSL-49", "antiempanante.webp", "https://vesleeaditivos.com/shop/limpieza-y-cuidado/cuidado-del-vehiculo/antiempanante-para-cristales/"],
  ["veslee-limpia-carburadores-partes", "VSL-2", "limpia-carburadores-partes.webp", "https://vesleeaditivos.com/shop/mantenimiento-del-motor/motor-y-carburador/limpia-carburadores-y-partes/"],
];
const expectedPhilipsProducts = [
  ["philips-h4", "h4.webp"], ["philips-h1", "h1.webp"], ["philips-h3", "h3.webp"], ["philips-h7", "h7.webp"],
  ["philips-p21-5w", "p21-5w.webp"], ["philips-p25", "p25.webp"], ["philips-t4w", "t4w.webp"], ["philips-r10w", "r10w.webp"], ["philips-w5w", "w5w.webp"], ["philips-c5w", "c5w.webp"],
];
const expectedHellaProducts = [["hella-cleantech", "cleantech.webp"], ["hella-estandar", "estandar.webp"]];
const expectedFeaturedProductIds = [...expectedOriginalProductIds, ...expectedVesleeProducts.map(([id]) => id), ...expectedPhilipsProducts.map(([id]) => id), ...expectedHellaProducts.map(([id]) => id)];
const productBlock = (id) => featuredBlock.match(new RegExp(`id: "${id}"[\\s\\S]*?\\n  },`))?.[0] ?? "";

if (publishedBrandSlugs.length !== 6 || publishedBrandSlugs.some((slug, index) => slug !== expectedBrandSlugs[index])) errors.push(`Las marcas públicas deben ser exactamente: ${expectedBrandSlugs.join(", ")}.`);
if (publishedFamilySlugs.length !== 6 || publishedFamilySlugs.some((slug, index) => slug !== expectedFamilySlugs[index])) errors.push(`Las familias públicas deben ser exactamente: ${expectedFamilySlugs.join(", ")}.`);
if (brandBlock.includes('slug: "anken"') || brandBlock.includes('name: "anken"')) errors.push("ANKEN no debe publicarse como marca del directorio.");
if (brandBlock.includes('slug: "ran"') || brandBlock.includes('name: "ran"')) errors.push("RAN no debe publicarse como marca del directorio.");
if (brandBlock.includes('slug: "loctite"') || brandBlock.includes('name: "loctite"')) errors.push("Loctite no debe publicarse como marca del directorio.");
if (brandBlock.includes('slug: "philips"') || brandBlock.includes('name: "philips"') || brandBlock.includes('slug: "hella"') || brandBlock.includes('name: "hella"')) errors.push("Philips y HELLA no deben incorporarse al directorio de marcas.");
if (existsSync(new URL("../src/app/marcas/anken", import.meta.url))) errors.push("No debe existir la ruta /marcas/anken.");
if (existsSync(new URL("../src/app/marcas/ran", import.meta.url))) errors.push("No debe existir la ruta /marcas/ran.");
if (existsSync(new URL("../src/app/marcas/loctite", import.meta.url))) errors.push("No debe existir la ruta /marcas/loctite.");

if (!catalog.includes("familyslug") || !catalog.includes("brandslug") || !catalog.includes("id: `${familyslug}/${brand.slug}/${slug}`")) errors.push("El modelo de líneas no conserva identidad contextual.");
if (!catalog.includes("detail: `${brands.find")) errors.push("La búsqueda no incluye contexto de marca para líneas.");
if (!catalog.includes("bioepecuen") || !catalog.includes("difusores de auto") || !catalog.includes("catalogos/bioepecuen-difusores-auto.pdf")) errors.push("Bioepecuén no está integrado con su catálogo confirmado.");
if (!catalog.includes("jarama") || !catalog.includes("catalogos/catalogo-jarama.pdf")) errors.push("Jarama no está integrada con su catálogo oficial.");
if (!catalog.includes("k78") || !catalog.includes("catalogos/catalogo-k78-2026.pdf")) errors.push("K78 no está integrada con su catálogo oficial 2026.");
if (!catalog.includes('slug: "revigal"') || !catalog.includes("catalogos/catalogo-revigal.pdf")) errors.push("Revigal no está integrada con su catálogo oficial.");
if (!catalog.includes('slug: "locx"') || !catalog.includes('name: "locx"')) errors.push("LOCX no está integrada como marca confirmada.");
if (!catalog.includes("catalogos/catalogo-locx.pdf")) errors.push("LOCX no está integrada con su catálogo oficial.");
if (!catalog.includes("catalogos/catalogo-anken-higiene-seguridad.pdf") || !catalog.includes('source: "anken"')) errors.push("El catálogo ANKEN no está integrado como documento de Higiene y seguridad.");
if (!catalog.includes("catalogos/catalogo-loctite-anaerobicos.pdf") || !catalog.includes('source: "loctite"')) errors.push("El catálogo Loctite no está integrado como documento de Anaeróbicos automotor.");
if (!catalog.includes('searchterms: ["fijadores de roscas", "selladores anaeróbicos"]')) errors.push("La búsqueda de Loctite no incluye los términos técnicos requeridos.");
if (featuredProductIds.length !== expectedFeaturedProductIds.length || featuredProductIds.some((id, index) => id !== expectedFeaturedProductIds[index])) errors.push(`Los productos publicados deben ser exactamente: ${expectedFeaturedProductIds.join(", ")}.`);
if (new Set(featuredProductIds).size !== featuredProductIds.length) errors.push("No puede haber IDs de productos duplicados.");
for (const id of expectedOriginalProductIds) {
  const block = productBlock(id);
  if (!block.includes('familyslug: "estetica-vehicular"')) errors.push(`${id} debe conservar su familia Estética vehicular.`);
}
for (const [id, code, image, source] of expectedVesleeProducts) {
  const block = productBlock(id);
  if (!block.includes('familyslug: "aditivos-lubricantes-fluidos"') || !block.includes('manufacturer: "veslee"')) errors.push(`${id} debe pertenecer a Veslee dentro de Aditivos, lubricantes y fluidos.`);
  if (!block.includes(image) || !existsSync(new URL(`../public/images/products/veslee/${image}`, import.meta.url))) errors.push(`Falta la fotografía oficial Veslee: ${image}.`);
  if (!block.includes(source)) errors.push(`${id} debe conservar su fuente oficial Veslee.`);
  if (code && !block.includes(`code: "${code.toLowerCase()}"`)) errors.push(`${id} debe incluir el código verificado ${code}.`);
}
const contactsBlock = productBlock("veslee-limpia-contactos");
if (!contactsBlock.includes("referencia a confirmar: vsl-11 / vsl-11a") || contactsBlock.includes('code: "vsl-11"') || contactsBlock.includes('code: "vsl-11a"')) errors.push("Limpia Contactos debe conservar la discrepancia VSL-11 / VSL-11A como pendiente comercial, sin publicar un código no confirmado.");
if (!productBlock("veslee-limpia-carburadores-partes").includes("cuerpos de mariposa")) errors.push("Limpia Carburadores y Partes debe documentar su uso para cuerpos de mariposa.");
for (const [id, image] of expectedPhilipsProducts) {
  const block = productBlock(id);
  if (!block.includes('familyslug: "repuestos-accesorios"') || !block.includes('manufacturer: "philips"')) errors.push(`${id} debe pertenecer a Philips dentro de Repuestos y accesorios.`);
  if (!block.includes(image) || !existsSync(new URL(`../public/images/products/philips/${image}`, import.meta.url))) errors.push(`Falta el asset Philips: ${image}.`);
  if (!block.includes("https://www.districe.com.ar/lamparas-philips/")) errors.push(`${id} debe conservar la fuente histórica de Districe.`);
  if (!block.includes("searchterms:")) errors.push(`${id} debe ser encontrable en el buscador.`);
}
for (const [id, image] of expectedHellaProducts) {
  const block = productBlock(id);
  if (!block.includes('familyslug: "repuestos-accesorios"') || !block.includes('manufacturer: "hella"')) errors.push(`${id} debe pertenecer a HELLA dentro de Repuestos y accesorios.`);
  if (!block.includes(image) || !existsSync(new URL(`../public/images/products/hella/${image}`, import.meta.url))) errors.push(`Falta el asset HELLA: ${image}.`);
  if (!block.includes("https://www.districe.com.ar/hella/")) errors.push(`${id} debe conservar la fuente histórica de Districe.`);
  if (!block.includes("searchterms:")) errors.push(`${id} debe ser encontrable en el buscador.`);
}
const kitBlock = featuredBlock.match(/id: "kit-proteccion-automotor-5-en-1"[\s\S]*?\n  },/)?.[0] ?? "";
if ((featuredBlock.match(/manufacturer: "ran"/g) ?? []).length !== 5 || kitBlock.includes("manufacturer:")) errors.push("RAN debe atribuirse sólo a los cinco productos verificados; el kit 5 en 1 debe quedar sin fabricante.");
if (!catalog.includes("kit-proteccion-automotor-5-en-1.webp") || !existsSync(new URL("../public/images/products/proteccion/kit-proteccion-automotor-5-en-1.webp", import.meta.url))) errors.push("Falta la fotografía verificada del kit de protección automotor 5 en 1.");
if (!catalog.includes("protecteditems") || !catalog.includes("guvalormi") || !catalog.includes("districe.com.ar/guvalormi")) errors.push("El kit 5 en 1 debe conservar sus elementos protegidos y fuentes documentales verificables.");
if (!catalog.includes('type: "producto" as const') || !catalog.includes('target: `/productos/${product.familyslug}#${product.id}`') || !catalog.includes('productfamilies.find((family) => family.slug === product.familyslug)') || !catalog.includes('searchterms: product.searchterms')) errors.push("La búsqueda no integra los productos con su destino de familia, contexto y términos correctos.");
for (const asset of ["arranca-motores.webp", "desengrasante-aerosol.webp", "niebla-lubricante.webp", "grasa-litio-aerosol.webp", "ya-tapo.webp", "ran-logo.webp"]) {
  if (!existsSync(new URL(`../public/images/products/ran/${asset}`, import.meta.url))) errors.push(`Falta el asset RAN: ${asset}.`);
}
if (!existsSync(new URL("../public/catalogos/catalogo-loctite-anaerobicos.pdf", import.meta.url))) errors.push("Falta el PDF público de Loctite.");
if (!existsSync(new URL("../public/images/catalogos/loctite-catalogo-portada.webp", import.meta.url))) errors.push("Falta la portada local del catálogo Loctite.");
if (catalog.includes('slug: "lock"') || catalog.includes('name: "lock"')) errors.push("La identidad provisoria Lock sigue publicada; debe ser LOCX.");

if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Content validation passed: six families, six public brands, original products, nine Veslee products, ten Philips references, two HELLA lines, exclusions and search destinations are valid.");
