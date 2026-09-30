import type { Metadata } from "next";
import "./globals.css";
import "./interactions.css";
import "./catalog.css";

export const metadata: Metadata = {
  title: { default: "Districe | Repuestos y accesorios automotor", template: "%s | Districe" },
  description: "Distribución mayorista de repuestos y accesorios automotor desde 1987.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body>{children}</body></html>;
}
