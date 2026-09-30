import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Districe | Distribución automotor", template: "%s | Districe" },
  description: "Distribución mayorista de repuestos y accesorios automotor.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body>{children}</body></html>;
}
