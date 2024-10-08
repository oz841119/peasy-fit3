import { cn } from "@/lib/utils";
interface Props {
  text: string
  className?: string;
}
export const ExerciseChip = ({ className, text }: Props) => {
  return (
    <div className={cn('px-3 py-2 text-sm inline-block border rounded-xl cursor-pointer select-none', className)}>{ text }</div>
  )
}