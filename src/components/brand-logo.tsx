import Image from "next/image";
import { brandAssets } from "@/data/assets";

type BrandLogoProps = {
  slug: string;
  decorative?: boolean;
  priority?: boolean;
  sizes?: string;
};

export function BrandLogo({ slug, decorative = false, priority = false, sizes }: BrandLogoProps) {
  const asset = brandAssets[slug];

  return <Image className={`brand-logo-asset brand-logo-asset-${slug}`} src={asset.src} width={asset.width} height={asset.height} alt={decorative ? "" : asset.alt} priority={priority} sizes={sizes} />;
}
