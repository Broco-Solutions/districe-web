import type { Metadata } from "next";
import "./globals.css";
import "./interactions.css";
import "./catalog.css";
import "./site-pages.css";
import "./home-v3.css";
import "./a11y.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.districe.com.ar"),
  title: { default: "Districe | Repuestos y accesorios automotor", template: "%s | Districe" },
  description: "Distribución mayorista de repuestos y accesorios automotor desde 1987.",
  openGraph: { type: "website", locale: "es_AR", siteName: "Districe" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body>{children}</body></html>;
}
