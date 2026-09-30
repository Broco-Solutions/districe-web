import type { MetadataRoute } from "next";
import { brands, productFamilies } from "@/data/catalog";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://www.districe.com.ar"; return ["", "/productos", "/marcas", "/empresa", "/contacto", ...productFamilies.map((item) => `/productos/${item.slug}`), ...brands.map((item) => `/marcas/${item.slug}`)].map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : .7 })); }
