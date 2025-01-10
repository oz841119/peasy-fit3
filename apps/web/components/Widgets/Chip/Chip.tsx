import { cn } from "@/lib/utils";
import { MouseEventHandler, ReactNode } from "react";
interface Props {
  text: string
  className?: string;
  onClick: MouseEventHandler<HTMLDivElement>
  Icon?: ReactNode
}
export const Chip = ({ className, text, onClick, Icon }: Props) => {
  return (
    <div
      onClick={onClick}
      className={cn('px-3 py-2 text-sm border rounded-xl cursor-pointer select-none flex gap-2 items-center w-fit', className)}
    >
      {text}{Icon}
    </div>
  )
}