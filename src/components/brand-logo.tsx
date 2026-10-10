import Image from "next/image";
import { brandAssets } from "@/data/assets";

type BrandLogoProps = {
  slug: string;
  decorative?: boolean;
  priority?: boolean;
  sizes?: string;
  variant?: "default" | "white";
};

export function BrandLogo({ slug, decorative = false, priority = false, sizes, variant = "default" }: BrandLogoProps) {
  const asset = brandAssets[slug];
  const src = variant === "white" && asset.darkSrc ? asset.darkSrc : asset.src;

  return <Image className={`brand-logo-asset brand-logo-asset-${slug} brand-logo-asset-${slug}-${variant}`} src={src} width={asset.width} height={asset.height} alt={decorative ? "" : asset.alt} priority={priority} sizes={sizes} />;
}
