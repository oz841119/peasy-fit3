import { cn } from "@/lib/utils";
import Link from "next/link"
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  href: string;
  className?: string;
}
export const IconLink = ({icon, href, className}: Props) => {
  return (
    <Link className={cn("w-10 h-10 rounded-full flex items-center justify-center", className)} href={href}>
      { icon }
    </Link>
  )
}