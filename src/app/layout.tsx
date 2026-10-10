import type { Metadata } from "next";
import "./globals.css";
import "./interactions.css";
import "./catalog.css";
import "./site-pages.css";
import "./home-v3.css";
import "./a11y.css";
import "./visual-system.css";
import "./refinement.css";
import "./v7.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.districe.com.ar"),
  title: { default: "Districe | Repuestos y accesorios automotor", template: "%s | Districe" },
  description: "Distribución mayorista de repuestos y accesorios automotor desde 1987.",
  icons: { icon: "/icons/districe-mark.png", apple: "/icons/apple-touch-icon.png" },
  openGraph: { type: "website", locale: "es_AR", siteName: "Districe", images: [{ url: "/images/editorial/distribucion-deposito-generated.webp", width: 1536, height: 1024, alt: "Distribución automotor — imagen editorial" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body>{children}</body></html>;
}
