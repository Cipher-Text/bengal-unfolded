import Image from "next/image";

type BrandIconProps = {
  className?: string;
};

export function BrandIcon({ className }: BrandIconProps) {
  return <Image src="/icon.svg" alt="" aria-hidden="true" width={56} height={56} className={className} unoptimized />;
}
